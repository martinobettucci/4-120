"""Simulations paralleles par lots avec PyTorch : le bon usage du GPU.

Des milliers d'environnements evoluent en meme temps sous forme de tenseurs.
Sert a l'apprentissage par renforcement (Q-learning tabulaire vectorise) et aux
campagnes de validation. Tout fonctionne aussi sur CPU, plus lentement.
"""

from __future__ import annotations

import contextlib
import os
import time

import numpy as np
import torch

from .monde import ACTIONS, Entrepot

NOMS_ACTIONS = ["N", "E", "S", "O", "ATTENDRE"]


@contextlib.contextmanager
def fils_limites(appareil):
    """Limite PyTorch a un fil d'execution sur CPU pendant un calcul par lots.

    Les tenseurs manipules ici sont petits : le parallelisme interne de PyTorch n'apporte
    presque rien, et sur une machine deja chargee il peut ralentir le calcul d'un facteur 50.
    La variable d'environnement ASCENT_FILS_CPU permet de choisir une autre valeur.
    """
    if torch.device(appareil).type != "cpu":
        yield
        return
    avant = torch.get_num_threads()
    torch.set_num_threads(max(1, int(os.environ.get("ASCENT_FILS_CPU", "1"))))
    try:
        yield
    finally:
        torch.set_num_threads(avant)


def _deltas(appareil) -> torch.Tensor:
    return torch.tensor([ACTIONS[a] for a in NOMS_ACTIONS], device=appareil, dtype=torch.long)


class SimulationLot:
    """B environnements identiques en carte, differents en aleas, simules en parallele.

    Politique evaluee : descente du champ de distance vers l'objectif, avec evitement
    des cellules percues comme occupees. La perception rate un obstacle mobile avec la
    probabilite `rate_perception`, le deplacement echoue avec la probabilite `glissement`.
    """

    def __init__(
        self,
        monde: Entrepot,
        lot: int = 1024,
        *,
        n_obstacles: int = 4,
        glissement: float = 0.0,
        rate_perception: float = 0.0,
        prudence: bool = True,
        appareil="cpu",
        graine: int = 4130,
    ) -> None:
        self.monde = monde
        self.B = lot
        self.K = n_obstacles
        self.glissement = glissement
        self.rate_perception = rate_perception
        self.prudence = prudence
        self.appareil = torch.device(appareil)
        self.gen = torch.Generator(device=self.appareil).manual_seed(graine)
        self.mur = torch.tensor(monde.grille_statique(), device=self.appareil, dtype=torch.bool)
        champ = monde.champ_distance()
        champ[np.isinf(champ)] = 1e6
        self.champ = torch.tensor(champ, device=self.appareil, dtype=torch.float32)
        self.deltas = _deltas(self.appareil)
        self.objectif = torch.tensor(monde.objectif, device=self.appareil)
        libres = [c for c in monde.cellules_libres() if c not in (monde.depart, monde.objectif)]
        self.libres = torch.tensor(libres, device=self.appareil, dtype=torch.long)

    def _alea(self, *forme) -> torch.Tensor:
        return torch.rand(*forme, device=self.appareil, generator=self.gen)

    def _occupe(self, cellules: torch.Tensor, obstacles: torch.Tensor) -> torch.Tensor:
        """cellules (B, A, 2), obstacles (B, K, 2) : masque (B, A) des cellules prises par un obstacle."""
        if self.K == 0:
            return torch.zeros(cellules.shape[:2], dtype=torch.bool, device=self.appareil)
        return (cellules[:, :, None, :] == obstacles[:, None, :, :]).all(-1).any(-1)

    def executer(self, max_etapes: int = 150, enregistrer: int = 0) -> dict:
        """Lance la campagne. `enregistrer` conserve l'historique des premiers environnements."""
        with fils_limites(self.appareil), torch.no_grad():
            return self._executer(max_etapes, enregistrer)

    def _executer(self, max_etapes: int, enregistrer: int) -> dict:
        B, K = self.B, self.K
        debut = time.perf_counter()
        robot = torch.tensor(self.monde.depart, device=self.appareil).repeat(B, 1)
        if K > 0:
            indices = torch.randint(0, len(self.libres), (B, K), device=self.appareil, generator=self.gen)
            obstacles = self.libres[indices]
        else:
            obstacles = torch.zeros((B, 0, 2), dtype=torch.long, device=self.appareil)
        actif = torch.ones(B, dtype=torch.bool, device=self.appareil)
        etapes = torch.zeros(B, dtype=torch.long, device=self.appareil)
        collisions = torch.zeros(B, dtype=torch.long, device=self.appareil)
        distance = torch.zeros(B, dtype=torch.long, device=self.appareil)
        historique = []
        for _ in range(max_etapes):
            if enregistrer:
                historique.append((robot[:enregistrer].cpu().numpy().copy(), obstacles[:enregistrer].cpu().numpy().copy()))
            cibles = robot[:, None, :] + self.deltas[None, :, :]  # (B, 5, 2)
            x, y = cibles[..., 0], cibles[..., 1]
            mur = self.mur[y, x]
            reel = self._occupe(cibles, obstacles)
            vu = reel & (self._alea(B, 5) >= self.rate_perception)
            score = self.champ[y, x].clone()
            score[mur] = 1e9
            if self.prudence:
                score[vu] = 1e9
            score[:, 4] = self.champ[robot[:, 1], robot[:, 0]] + 0.5  # attendre vaut un peu moins qu'avancer
            action = score.argmin(1)
            glisse = self._alea(B) < self.glissement
            action = torch.where(glisse, torch.full_like(action, 4), action)
            cible = cibles[torch.arange(B, device=self.appareil), action]
            bloque = self.mur[cible[:, 1], cible[:, 0]] | self._occupe(cible[:, None, :], obstacles)[:, 0]
            bouge = (action != 4) & ~bloque & actif
            choc = (action != 4) & bloque & actif
            robot = torch.where(bouge[:, None], cible, robot)
            collisions += choc.long()
            distance += bouge.long()
            etapes += actif.long()
            actif = actif & ~(robot == self.objectif).all(-1)
            if K > 0:  # marche aleatoire des obstacles mobiles
                choix = torch.randint(0, 5, (B, K), device=self.appareil, generator=self.gen)
                vises = obstacles + self.deltas[choix]
                interdit = self.mur[vises[..., 1], vises[..., 0]] | (vises == robot[:, None, :]).all(-1)
                obstacles = torch.where(interdit[..., None], obstacles, vises)
            if not actif.any():
                break
        succes = ~actif
        duree = time.perf_counter() - debut
        resultat = {
            "lot": B,
            "appareil": str(self.appareil),
            "duree_s": round(duree, 4),
            "pas_par_seconde": round(float(etapes.sum().item()) / max(duree, 1e-9)),
            "taux_succes": float(succes.float().mean().item()),
            "collisions_moyennes": float(collisions.float().mean().item()),
            "taux_sans_collision": float((collisions == 0).float().mean().item()),
            "etapes": etapes.cpu().numpy(),
            "collisions": collisions.cpu().numpy(),
            "distance": distance.cpu().numpy(),
            "succes": succes.cpu().numpy(),
        }
        if enregistrer:
            historique.append((robot[:enregistrer].cpu().numpy().copy(), obstacles[:enregistrer].cpu().numpy().copy()))
            resultat["historique"] = historique
        return resultat


def q_learning_lot(monde: Entrepot, *, appareil="cpu", **parametres) -> dict:
    """Q-learning tabulaire vectorise (voir `_q_learning_lot` pour les parametres)."""
    with fils_limites(appareil):
        return _q_learning_lot(monde, appareil=appareil, **parametres)


def _q_learning_lot(
    monde: Entrepot,
    *,
    episodes: int = 300,
    lot: int = 512,
    horizon: int = 80,
    alpha: float = 0.5,
    gamma: float = 0.95,
    epsilon_debut: float = 1.0,
    epsilon_fin: float = 0.05,
    glissement: float = 0.1,
    appareil="cpu",
    graine: int = 4130,
) -> dict:
    """Q-learning tabulaire vectorise : `lot` robots apprennent en parallele dans la meme table Q.

    Recompenses : +10 a l'objectif, -1 en cas de choc contre un mur, -0.05 par pas.
    Retourne la table Q (hauteur, largeur, 5), la politique gloutonne et la courbe d'apprentissage.
    """
    appareil = torch.device(appareil)
    gen = torch.Generator(device=appareil).manual_seed(graine)
    mur = torch.tensor(monde.grille_statique(), device=appareil, dtype=torch.bool)
    deltas = _deltas(appareil)
    objectif = torch.tensor(monde.objectif, device=appareil)
    libres = torch.tensor(monde.cellules_libres(), device=appareil, dtype=torch.long)
    H, W = mur.shape
    Q = torch.zeros((H, W, 5), device=appareil)
    courbe = []
    debut = time.perf_counter()
    for ep in range(episodes):
        eps = epsilon_debut + (epsilon_fin - epsilon_debut) * ep / max(episodes - 1, 1)
        # Departs aleatoires pour explorer tout l'entrepot.
        robot = libres[torch.randint(0, len(libres), (lot,), device=appareil, generator=gen)]
        fini = (robot == objectif).all(-1)
        gain = torch.zeros(lot, device=appareil)
        for _ in range(horizon):
            q = Q[robot[:, 1], robot[:, 0]]
            hasard = torch.rand(lot, device=appareil, generator=gen) < eps
            action = torch.where(hasard, torch.randint(0, 5, (lot,), device=appareil, generator=gen), q.argmax(1))
            glisse = torch.rand(lot, device=appareil, generator=gen) < glissement
            effectif = torch.where(glisse, torch.full_like(action, 4), action)
            cible = robot + deltas[effectif]
            choc = mur[cible[:, 1], cible[:, 0]]
            suivant = torch.where(choc[:, None], robot, cible)
            arrive = (suivant == objectif).all(-1)
            r = torch.full((lot,), -0.05, device=appareil) - choc.float() + 10.0 * arrive.float()
            q_suivant = Q[suivant[:, 1], suivant[:, 0]].max(1).values * (~arrive).float()
            cible_td = r + gamma * q_suivant
            maj = ~fini
            # Moyenne des mises a jour qui visent la meme case (etat, action).
            plat = (robot[:, 1] * W + robot[:, 0]) * 5 + action
            delta = torch.zeros(H * W * 5, device=appareil).index_add_(0, plat[maj], (cible_td - Q.view(-1)[plat])[maj])
            compte = torch.zeros(H * W * 5, device=appareil).index_add_(0, plat[maj], torch.ones_like(cible_td)[maj])
            Q.view(-1).add_(alpha * delta / compte.clamp(min=1))
            gain += r * maj.float()
            robot = torch.where(fini[:, None], robot, suivant)
            fini = fini | arrive
            if fini.all():
                break
        courbe.append({"episode": ep, "epsilon": round(eps, 3), "gain_moyen": float(gain.mean().item()), "taux_arrivee": float(fini.float().mean().item())})
    politique = Q.argmax(-1).cpu().numpy()
    return {
        "Q": Q.cpu().numpy(),
        "politique": politique,
        "courbe": courbe,
        "duree_s": round(time.perf_counter() - debut, 3),
        "appareil": str(appareil),
    }


class AgentAppris:
    """Agent dont la politique vient d'une table Q apprise, protegee par une couche reactive."""

    nom = "appris"
    architecture = "politique apprise (Q-learning) avec garde reactive"

    def __init__(self, table_q: np.ndarray) -> None:
        self.Q = table_q

    def reinitialiser(self, monde: Entrepot) -> None:
        self.monde = monde

    def decider(self, observation: dict):
        x, y = observation["position"]
        valeurs = self.Q[y, x]
        ordre = np.argsort(-valeurs)
        # Les deplacements libres passent avant l'attente, pour eviter un face a face sans fin.
        candidats = [k for k in ordre if NOMS_ACTIONS[int(k)] != "ATTENDRE"] + [4]
        for k in candidats:
            action = NOMS_ACTIONS[int(k)]
            if action == "ATTENDRE" or observation["lidar"][action] > 1:
                garde = k != ordre[0]
                return action, {
                    "couche": "reactive" if garde else "apprise",
                    "raison": (f"Action préférée bloquée, repli sur {action}" if garde else f"Politique apprise : {action}"),
                    "valeurs_q": {NOMS_ACTIONS[i]: round(float(v), 2) for i, v in enumerate(valeurs)},
                    "plan": [],
                }
        return "ATTENDRE", {"couche": "reactive", "raison": "Encerclé : attente", "plan": []}
