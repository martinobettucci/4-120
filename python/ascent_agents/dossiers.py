"""Systemes agentiques : le traitement d'un dossier, du courrier a la decision.

Second fil rouge de la formation (module 7). Un service instruit des demandes d'aide
a la renovation energetique. Chaque dossier contient un formulaire (valeurs declarees),
un courrier en texte libre, des registres externes et quelques signaux chiffres.
Toutes les donnees sont 100 % synthetiques : aucun dossier, aucune personne, aucun bareme reel.

Le module fournit les briques d'un systeme agentique, chacune d'une famille differente :
- un routeur a mots cles (agent heuristique) ;
- un agent a regles (controle de conformite, explicable) ;
- un agent statistique (score d'anomalie, regression logistique) ;
- un extracteur LLM, simule a taux d'erreur reglable, et un adaptateur pour un LLM reel ;
- un arbitre (majorite, priorite, vote pondere, unanimite) ;
- un moderateur (seuils, passage a l'humain) ;
- un mini-RAG lexical (TF-IDF, rappel a k) ;
- un journal structure.
"""

from __future__ import annotations

import json
import math
import re
import time
import unicodedata
from dataclasses import dataclass, field
from pathlib import Path

import numpy as np

ANNEE_REFERENCE = 2026
VERSION_REGLES = "2026.1"
TYPES = ["isolation", "pompe_a_chaleur", "fenetres", "chaudiere"]
LIBELLES = {
    "isolation": "isolation",
    "pompe_a_chaleur": "pompe à chaleur",
    "fenetres": "fenêtres",
    "chaudiere": "chaudière biomasse",
    "humain": "agent instructeur",
}
FILES = TYPES + ["humain"]
# Bareme fictif : plafond de depense eligible par type de travaux, en euros.
PLAFONDS = {"isolation": 12000, "pompe_a_chaleur": 16000, "fenetres": 8000, "chaudiere": 18000}
REVENU_MAX = 45000
ANCIENNETE_MIN = 15
ANNEE_MAX = ANNEE_REFERENCE - ANCIENNETE_MIN  # logement acheve au plus tard cette annee-la
CHAMPS = ["montant", "annee", "certifie"]
DECISIONS = ["ACCEPTER", "REJETER", "HUMAIN"]
# Couts fictifs d'une decision, en euros par dossier.
COUTS = {"accepter_a_tort": 400.0, "rejeter_a_tort": 150.0, "humain": 12.0}
# Temps de calcul indicatifs de chaque brique, en millisecondes par dossier.
LATENCES_MS = {"routeur": 1.0, "regles": 1.0, "score": 2.0, "registre": 150.0, "llm": 800.0}


# --------------------------------------------------------------------------- outils de texte
def normaliser(texte: str) -> str:
    """Minuscules et suppression des accents : « Fenêtres » devient « fenetres »."""
    sans = unicodedata.normalize("NFD", texte.lower())
    return "".join(c for c in sans if unicodedata.category(c) != "Mn")


def _euros(montant: int, rng) -> str:
    milliers = f"{montant:,}".replace(",", " ")
    return [f"{milliers} €", f"{montant} euros", f"{milliers},00 EUR", f"{milliers} euros TTC"][int(rng.integers(4))]


# --------------------------------------------------------------------------- generateur
_TRAVAUX = {
    "isolation": [
        ("l'isolation des combles de ma maison", 0),
        ("l'isolation des murs par l'extérieur", 0),
        ("isoler la toiture, les anciennes fenêtres ayant déjà été changées", 1),
    ],
    "pompe_a_chaleur": [
        ("l'installation d'une pompe à chaleur", 0),
        ("la pose d'une pompe à chaleur air-eau", 0),
        ("une pompe à chaleur en remplacement de ma vieille chaudière au fioul", 1),
    ],
    "fenetres": [
        ("le remplacement de mes fenêtres par du double vitrage", 0),
        ("le changement de six fenêtres", 0),
        ("changer les fenêtres afin d'améliorer l'isolation du séjour", 1),
    ],
    "chaudiere": [
        ("l'installation d'une chaudière à granulés", 0),
        ("la pose d'une chaudière biomasse", 0),
        ("une chaudière à granulés, la pompe à chaleur n'étant pas adaptée à mon logement", 1),
    ],
}
_RECLAMATIONS = [
    "Je conteste le rejet de mon dossier concernant {travaux}.",
    "Réclamation : ma demande portant sur {travaux} est restée sans réponse depuis trois mois.",
    "Je souhaite déposer un recours contre la décision rendue sur {travaux}.",
]
_CERTIFIE = [
    ("L'entreprise retenue est certifiée.", True, 0),
    ("L'artisan dispose de la certification exigée.", True, 0),
    ("L'entreprise, bien que récente, est titulaire de la certification.", True, 1),
    ("L'artisan n'est pas certifié.", False, 0),
    ("L'entreprise ne dispose pas de la certification.", False, 0),
    ("L'entreprise m'indique que sa certification est en cours d'obtention.", False, 1),
]


def _courrier(rng, file_vraie: str, vrai: dict, reclamation: bool) -> tuple[str, dict]:
    """Redige le courrier et retourne les pieges qu'il contient, champ par champ."""
    type_travaux = file_vraie
    travaux, piege_route = _TRAVAUX[type_travaux][int(rng.choice(3, p=[0.4, 0.3, 0.3]))]
    pieges = {"montant": [], "annee": [], "certifie": 0, "route": piege_route}
    if reclamation:
        ouverture = _RECLAMATIONS[int(rng.integers(3))].format(travaux=travaux)
        pieges["route"] = 1
    else:
        ouverture = f"Je sollicite une aide pour {travaux}."
    phrases = []
    montant = vrai["montant"]
    phrases.append([f"Le devis s'élève à {_euros(montant, rng)}.", f"Le montant total des travaux est de {_euros(montant, rng)}.",
                    f"L'entreprise a chiffré l'opération à {_euros(montant, rng)}."][int(rng.integers(3))])
    if rng.random() < 0.35:
        acompte = int(round(montant * rng.uniform(0.2, 0.4), -2))
        phrases.append(f"Un acompte de {_euros(acompte, rng)} a déjà été versé.")
        pieges["montant"].append(acompte)
    if rng.random() < 0.30:
        espere = int(round(montant * rng.uniform(0.3, 0.6), -2))
        phrases.append(f"J'espère obtenir une aide de {_euros(espere, rng)}.")
        pieges["montant"].append(espere)
    annee = vrai["annee"]
    phrases.append([f"La maison a été construite en {annee}.", f"Le logement a été achevé en {annee}.",
                    f"Il s'agit d'une maison de {annee}."][int(rng.integers(3))])
    if rng.random() < 0.30:
        emmenagement = int(min(ANNEE_REFERENCE - 1, annee + rng.integers(1, 25)))
        phrases.append(f"J'y habite depuis {emmenagement}.")
        pieges["annee"].append(emmenagement)
    if rng.random() < 0.25:
        equipement = int(min(ANNEE_REFERENCE - 2, annee + rng.integers(0, 30)))
        phrases.append(f"Le chauffage actuel date de {equipement}.")
        pieges["annee"].append(equipement)
    candidates = [c for c in _CERTIFIE if c[1] == vrai["certifie"]]
    phrase, _, difficile = candidates[int(rng.choice(3, p=[0.4, 0.3, 0.3]))]
    phrases.append(phrase)
    pieges["certifie"] = difficile
    ordre = rng.permutation(len(phrases))
    corps = " ".join(phrases[i] for i in ordre)
    texte = f"Madame, Monsieur, {ouverture} {corps} Je vous prie d'agréer mes salutations distinguées."
    return texte, pieges


def generer_dossiers(n: int = 2000, graine: int = 4130) -> list[dict]:
    """Genere n dossiers synthetiques, de facon reproductible.

    Chaque dossier est un dictionnaire :
    - "id", "texte" (le courrier), "revenu", "pieces_completes" (formulaire, fiables) ;
    - "declare" : montant, annee et certification saisis par le demandeur (parfois optimistes) ;
    - "registre" : les memes champs lus dans des registres externes (parfois perimes) ;
    - "signaux" : ecart de prix, anciennete de l'entreprise, demandes anterieures du foyer ;
    - "vrai", "file_vraie", "anomalie", "pieges" : la verite terrain, invisible pour les agents ;
    - "classe" (CONFORME, NON_CONFORME, A_INSTRUIRE) et "attendu" (ACCEPTER, REJETER, HUMAIN).
    """
    rng = np.random.default_rng(graine)
    dossiers = []
    for i in range(n):
        file_type = TYPES[int(rng.integers(4))]
        reclamation = bool(rng.random() < 0.06)
        plafond = PLAFONDS[file_type]
        hors_plafond = rng.random() < 0.10
        montant = int(round(plafond * (rng.uniform(1.03, 1.40) if hors_plafond else rng.uniform(0.35, 0.99)), -1))
        annee = int(rng.integers(1950, 2023))
        certifie = bool(rng.random() > 0.10)
        vrai = {"montant": montant, "annee": annee, "certifie": certifie}
        revenu = int(round(rng.uniform(12000, 50000), -2))
        pieces = bool(rng.random() > 0.08)
        anomalie = bool(rng.random() < 0.06)
        # Declaration du demandeur : les erreurs vont dans le sens qui l'arrange.
        declare = dict(vrai)
        if montant > plafond and rng.random() < 0.40:
            declare["montant"] = int(round(plafond * rng.uniform(0.90, 1.00), -1))
        if annee > ANNEE_MAX and rng.random() < 0.30:
            declare["annee"] = int(annee - rng.integers(12, 20))
        if not certifie and rng.random() < 0.50:
            declare["certifie"] = True
        # Registres externes : independants de la declaration, parfois perimes.
        registre = dict(vrai)
        if rng.random() < 0.04:
            registre["certifie"] = not certifie
        if rng.random() < 0.04:
            registre["annee"] = int(annee + rng.choice([-20, -10, 10, 20]))
        if rng.random() < 0.03:
            registre["montant"] = int(round(montant * rng.choice([0.8, 1.25]), -1))
        signaux = {
            "ecart_prix": float(np.clip(rng.normal(1.45, 0.25) if anomalie else rng.normal(1.0, 0.12), 0.5, 2.5)),
            "anciennete_entreprise": float(rng.gamma(1.2, 1.5) if anomalie else rng.gamma(3.0, 4.0)),
            "demandes_foyer": int(rng.poisson(1.4 if anomalie else 0.3)),
        }
        texte, pieges = _courrier(rng, file_type, vrai, reclamation)
        conforme = annee <= ANNEE_MAX and certifie and montant <= plafond and revenu <= REVENU_MAX
        if reclamation or not pieces or anomalie:
            classe, attendu = "A_INSTRUIRE", "HUMAIN"
        elif conforme:
            classe, attendu = "CONFORME", "ACCEPTER"
        else:
            classe, attendu = "NON_CONFORME", "REJETER"
        dossiers.append({
            "id": f"D{i + 1:05d}", "indice": i, "texte": texte, "revenu": revenu, "pieces_completes": pieces,
            "declare": declare, "registre": registre, "signaux": signaux,
            "vrai": vrai, "file_vraie": "humain" if reclamation else file_type, "type_travaux": file_type,
            "anomalie": anomalie, "pieges": pieges, "classe": classe, "attendu": attendu,
        })
    return dossiers


# --------------------------------------------------------------------------- agent a regles
REGLES = [
    ("R1", f"logement achevé depuis au moins {ANCIENNETE_MIN} ans", lambda f, d, plafond: f["annee"] is not None and f["annee"] <= ANNEE_MAX),
    ("R2", "entreprise certifiée", lambda f, d, plafond: f["certifie"] is True),
    ("R3", "montant inférieur ou égal au plafond du type de travaux", lambda f, d, plafond: f["montant"] is not None and f["montant"] <= plafond),
    ("R4", f"revenu du foyer inférieur ou égal à {REVENU_MAX} €", lambda f, d, plafond: d["revenu"] <= REVENU_MAX),
]


def verdict_regles(fiche: dict, dossier: dict, file: str, plafonds: dict | None = None) -> tuple[bool, list[str]]:
    """Agent a regles : retourne (conforme, regles non respectees). Chaque refus est explicable."""
    plafond = (plafonds or PLAFONDS)[file]
    refus = [nom for nom, _, test in REGLES if not test(fiche, dossier, plafond)]
    return (not refus), refus


# --------------------------------------------------------------------------- routeur
ROUTEUR_NAIF = [
    (["isolation", "isoler"], "isolation"),
    (["chaudiere"], "chaudiere"),
    (["pompe a chaleur"], "pompe_a_chaleur"),
    (["fenetre"], "fenetres"),
    (["reclamation", "conteste", "recours"], "humain"),
]
ROUTEUR_ORDONNE = [
    (["reclamation", "conteste", "recours"], "humain"),
    (["une pompe a chaleur en remplacement", "d'une pompe a chaleur"], "pompe_a_chaleur"),
    (["chaudiere a granules", "chaudiere biomasse"], "chaudiere"),
    (["isoler la toiture", "isolation des combles", "isolation des murs"], "isolation"),
    (["fenetre", "vitrage"], "fenetres"),
]


@dataclass
class Routeur:
    """Routeur a mots cles : la premiere regle dont un mot figure dans le texte l'emporte.

    regles : liste de (mots, file). Les mots sont compares au texte sans accents ni majuscules.
    defaut : file retenue quand aucune regle ne se declenche.
    """

    regles: list
    defaut: str = "humain"

    def router(self, texte: str) -> tuple[str, int]:
        t = normaliser(texte)
        for i, (mots, file) in enumerate(self.regles):
            if any(normaliser(m) in t for m in mots):
                return file, i
        return self.defaut, -1

    def exactitude(self, dossiers: list[dict]) -> float:
        return float(np.mean([self.router(d["texte"])[0] == d["file_vraie"] for d in dossiers]))

    def erreurs(self, dossiers: list[dict]) -> list[dict]:
        return [d for d in dossiers if self.router(d["texte"])[0] != d["file_vraie"]]


# --------------------------------------------------------------------------- agent statistique
NOMS_SIGNAUX = ["ecart_prix", "anciennete_entreprise", "demandes_foyer"]


def matrice_signaux(dossiers: list[dict]) -> np.ndarray:
    return np.array([[d["signaux"][s] for s in NOMS_SIGNAUX] for d in dossiers], dtype=float)


class ScoreAnomalie:
    """Agent statistique : regression logistique qui estime la probabilite d'anomalie d'un dossier."""

    def __init__(self, taux: float = 0.3, epoques: int = 1500):
        self.taux, self.epoques = taux, epoques
        self.w = self.b = self.moy = self.ect = None

    def entrainer(self, dossiers: list[dict]) -> "ScoreAnomalie":
        X = matrice_signaux(dossiers)
        y = np.array([d["anomalie"] for d in dossiers], dtype=float)
        self.moy, self.ect = X.mean(0), X.std(0) + 1e-9
        Z = (X - self.moy) / self.ect
        self.w, self.b = np.zeros(Z.shape[1]), 0.0
        for _ in range(self.epoques):
            p = 1 / (1 + np.exp(-(Z @ self.w + self.b)))
            self.w -= self.taux * Z.T @ (p - y) / len(y)
            self.b -= self.taux * float(np.mean(p - y))
        return self

    def probabilite(self, dossiers: list[dict]) -> np.ndarray:
        Z = (matrice_signaux(dossiers) - self.moy) / self.ect
        return 1 / (1 + np.exp(-(Z @ self.w + self.b)))


# --------------------------------------------------------------------------- extracteurs LLM
class ExtracteurSimule:
    """Extracteur qui imite un LLM lisant le courrier, avec un taux d'erreur reglable.

    Il ne lit pas le texte : il part de la verite terrain et y injecte des erreurs, plus
    frequentes quand le courrier contient des pieges (autre montant, autre annee, tournure
    ambigue). Deux lectures du meme courrier par le meme modele se trompent souvent au meme
    endroit : `correlation` est la part des erreurs communes aux deux lectures.
    """

    nom = "LLM simulé"

    def __init__(self, taux_erreur: float | dict = 0.08, correlation: float = 0.8, graine: int = 4130):
        self.taux = taux_erreur if isinstance(taux_erreur, dict) else {c: taux_erreur for c in CHAMPS}
        self.correlation, self.graine = correlation, graine

    def extraire(self, dossier: dict, lecture: int = 0) -> dict:
        i = dossier["indice"]
        commun = np.random.default_rng([self.graine, i, 0]).random(len(CHAMPS) + 1)
        tirage = commun
        if lecture > 0:
            propre = np.random.default_rng([self.graine, i, lecture]).random(len(CHAMPS) + 2)
            tirage = commun if propre[-1] < self.correlation else propre
        fiche, pieges = dict(dossier["vrai"]), dossier["pieges"]
        for k, champ in enumerate(CHAMPS):
            difficulte = pieges[champ] if champ == "certifie" else len(pieges[champ])
            # Ponderation de moyenne voisine de 1 : une erreur est plus probable quand le courrier tend un piege.
            poids = 0.6 + 1.3 * difficulte if champ == "certifie" else 0.4 + 0.95 * difficulte
            if tirage[k] < min(0.95, self.taux[champ] * poids):
                if champ == "certifie":
                    fiche[champ] = not fiche[champ]
                elif pieges[champ]:
                    fiche[champ] = pieges[champ][int(tirage[-1 if lecture == 0 else 0] * len(pieges[champ])) % len(pieges[champ])]
                elif champ == "montant":
                    fiche[champ] = fiche[champ] // 10  # un chiffre perdu
                else:
                    fiche[champ] = None  # champ non trouve
        return fiche


CONSIGNE_EXTRACTION = (
    "Tu extrais des informations d'un courrier de demande d'aide à la rénovation. "
    "Réponds uniquement par un objet JSON, sans commentaire, avec exactement trois clés : "
    '"montant" (montant total du devis des travaux en euros, nombre entier, sans acompte ni aide espérée), '
    '"annee" (année de construction du logement, nombre entier), '
    '"certifie" (true si l\'entreprise est certifiée aujourd\'hui, false sinon).'
)
CONSIGNE_EXTRACTION_2 = (
    "Lis ce courrier adressé à un service d'aide à la rénovation et remplis la fiche suivante au format JSON, "
    "sans rien ajouter : {\"montant\": coût total des travaux selon le devis, en euros, entier ; "
    "\"annee\": année d'achèvement du logement, entier ; "
    "\"certifie\": true ou false selon que l'entreprise possède déjà la certification}."
)


def analyser_reponse(texte: str) -> dict:
    """Transforme la reponse brute d'un LLM en fiche. Tout champ illisible vaut None."""
    fiche = {c: None for c in CHAMPS}
    bloc = re.search(r"\{.*?\}", texte, flags=re.S)
    donnees = {}
    if bloc:
        try:
            donnees = json.loads(bloc.group(0))
        except json.JSONDecodeError:
            for cle, valeur in re.findall(r'"(\w+)"\s*:\s*("[^"]*"|[^,}\n]+)', bloc.group(0)):
                donnees[cle] = valeur.strip().strip('"')
    for champ in ("montant", "annee"):
        v = donnees.get(champ)
        if isinstance(v, bool):
            v = None
        if isinstance(v, str):
            chiffres = re.sub(r"[^\d,.]", "", v).split(",")[0].replace(".", "")
            v = int(chiffres) if chiffres.isdigit() else None
        if isinstance(v, (int, float)) and not (isinstance(v, float) and math.isnan(v)):
            fiche[champ] = int(v)
    c = donnees.get("certifie")
    if isinstance(c, str):
        c = {"true": True, "vrai": True, "oui": True, "false": False, "faux": False, "non": False}.get(c.strip().lower())
    if isinstance(c, bool):
        fiche["certifie"] = c
    return fiche


class ExtracteurLLM:
    """Adaptateur pour un LLM reel charge avec la bibliotheque Transformers.

    Le modele lit le courrier et rend une fiche JSON. Le decodage est glouton (sans tirage
    aleatoire) pour que les mesures soient reproductibles. Les reponses sont gardees en
    memoire : relire un courrier deja traite ne coute rien.
    """

    def __init__(self, modele: str = "Qwen/Qwen3.5-0.8B", appareil=None, jetons_max: int = 64):
        import torch
        import transformers

        self.nom, self.jetons_max, self._torch = modele, jetons_max, torch
        # Le texte seul suffit ici : le tokeniseur evite de charger les traitements d'image et de video.
        self.tokeniseur = transformers.AutoTokenizer.from_pretrained(modele)
        classe = getattr(transformers, "AutoModelForMultimodalLM", None) or getattr(transformers, "AutoModelForImageTextToText", None) or transformers.AutoModelForCausalLM
        if appareil is None:
            appareil = "cuda" if torch.cuda.is_available() else "cpu"
        precision = torch.bfloat16 if str(appareil).startswith("cuda") else torch.float32
        self.modele = classe.from_pretrained(modele, dtype=precision).to(appareil).eval()
        self.appareil = str(appareil)
        self.cache: dict = {}
        self.secondes: list[float] = []

    def generer(self, consigne: str, texte: str) -> str:
        messages = [{"role": "system", "content": consigne}, {"role": "user", "content": texte}]
        options = dict(add_generation_prompt=True, tokenize=True, return_dict=True, return_tensors="pt")
        try:
            entrees = self.tokeniseur.apply_chat_template(messages, enable_thinking=False, **options)
        except TypeError:
            entrees = self.tokeniseur.apply_chat_template(messages, **options)
        entrees = entrees.to(self.modele.device)
        debut = time.perf_counter()
        with self._torch.no_grad():
            sortie = self.modele.generate(**entrees, max_new_tokens=self.jetons_max, do_sample=False)
        self.secondes.append(time.perf_counter() - debut)
        return self.tokeniseur.decode(sortie[0][entrees["input_ids"].shape[1]:], skip_special_tokens=True)

    def extraire(self, dossier: dict, lecture: int = 0) -> dict:
        cle = (dossier["id"], lecture)
        if cle not in self.cache:
            brut = self.generer(CONSIGNE_EXTRACTION if lecture == 0 else CONSIGNE_EXTRACTION_2, dossier["texte"])
            self.cache[cle] = (analyser_reponse(brut), brut)
        return dict(self.cache[cle][0])

    def repondre(self, question: str, contexte: str | None = None) -> str:
        consigne = "Réponds en une phrase courte, en français."
        if contexte:
            consigne += " Appuie-toi uniquement sur le règlement suivant. Si la réponse n'y figure pas, dis-le.\n" + contexte
        return self.generer(consigne, question).strip()


def erreurs_extraction(extracteur, dossiers: list[dict], lecture: int = 0) -> dict:
    """Taux d'erreur mesure champ par champ, et part des fiches contenant au moins une erreur."""
    faux = np.array([[extracteur.extraire(d, lecture)[c] != d["vrai"][c] for c in CHAMPS] for d in dossiers])
    bilan = {c: float(faux[:, k].mean()) for k, c in enumerate(CHAMPS)}
    bilan["fiche"] = float(faux.any(1).mean())
    return bilan


def controler_fiche(fiche: dict) -> list[str]:
    """Regles en controle d'une sortie de LLM : retourne la liste des alertes de vraisemblance."""
    alertes = []
    if fiche["montant"] is None or not 2000 <= fiche["montant"] <= 30000:
        alertes.append("montant absent ou invraisemblable")
    if fiche["annee"] is None or not 1800 <= fiche["annee"] <= ANNEE_REFERENCE:
        alertes.append("année absente ou invraisemblable")
    if fiche["certifie"] is None:
        alertes.append("certification non renseignée")
    return alertes


# --------------------------------------------------------------------------- chaine et vote
def fiabilite_chaine(fiabilites, controles=None, detection: float = 0.9) -> float:
    """Fiabilite de bout en bout d'une chaine d'etapes : le produit des fiabilites.

    controles : pour chaque etape, True si un controle la suit. Un controle rattrape
    une part `detection` des erreurs de l'etape.
    """
    total = 1.0
    for i, f in enumerate(fiabilites):
        if controles is not None and controles[i]:
            f = 1 - (1 - f) * (1 - detection)
        total *= f
    return total


def erreur_majorite(p: float, correlation: float = 0.0) -> float:
    """Taux d'erreur d'un vote a la majorite de trois decideurs de meme taux d'erreur p.

    Modele de cause commune : avec la probabilite `correlation`, les trois decideurs
    partagent le meme tirage (ils se trompent ensemble) ; sinon ils sont independants.
    """
    independant = 3 * p**2 * (1 - p) + p**3
    return correlation * p + (1 - correlation) * independant


def simuler_votes(n: int = 100000, erreur: float = 0.10, correlation: float = 0.0, graine: int = 4130) -> dict:
    """Simulation du meme modele : retourne les taux d'erreur individuels et celui de la majorite."""
    rng = np.random.default_rng(graine)
    ensemble = rng.random(n) < correlation
    commun = rng.random(n) < erreur
    propres = rng.random((n, 3)) < erreur
    faux = np.where(ensemble[:, None], commun[:, None], propres)
    return {"individuels": faux.mean(0).tolist(), "majorite": float((faux.sum(1) >= 2).mean()), "accord_dans_l_erreur": float(faux.all(1).mean())}


def arbitrer(verdicts: dict, methode: str = "majorite", *, priorite=None, poids=None, marge: float = 0.0):
    """Arbitre : combine les verdicts (True conforme, False non conforme) de plusieurs sources.

    Retourne True, False, ou None quand l'arbitre s'abstient (le dossier part alors chez un humain).
    - "majorite" : la reponse la plus frequente (None en cas d'egalite) ;
    - "unanimite" : la reponse commune, sinon None ;
    - "priorite" : le verdict de la premiere source de la liste `priorite` ;
    - "pondere" : somme des poids des sources favorables moins celle des defavorables,
      abstention si l'ecart ne depasse pas `marge`.
    """
    sources = list(verdicts)
    if methode == "priorite":
        return verdicts[next(s for s in (priorite or sources) if s in verdicts)]
    if methode == "unanimite":
        valeurs = set(verdicts.values())
        return valeurs.pop() if len(valeurs) == 1 else None
    if methode == "majorite":
        poids, marge = {s: 1.0 for s in sources}, 0.0
    elif methode != "pondere":
        raise ValueError(f"méthode d'arbitrage inconnue : {methode}")
    score = sum((poids or {}).get(s, 1.0) * (1 if v else -1) for s, v in verdicts.items())
    if abs(score) <= marge + 1e-12:
        return None
    return score > 0


def poids_fiabilite(taux_erreur: dict) -> dict:
    """Poids d'un vote pondere : log du rapport entre chances d'avoir raison et d'avoir tort."""
    return {s: math.log((1 - e) / max(e, 1e-6)) for s, e in taux_erreur.items()}


# --------------------------------------------------------------------------- moderation
def seuil_optimal(cout_fausse_alerte: float, cout_manque: float) -> float:
    """Seuil de probabilite au-dessus duquel il faut agir : C_fa / (C_fa + C_m)."""
    return cout_fausse_alerte / (cout_fausse_alerte + cout_manque)


def cout_decision(decision: str, attendu: str, couts: dict | None = None) -> float:
    c = couts or COUTS
    if decision == "HUMAIN":
        return c["humain"]
    if decision == attendu:
        return 0.0
    return c["accepter_a_tort"] if decision == "ACCEPTER" else c["rejeter_a_tort"]


# --------------------------------------------------------------------------- journal
@dataclass
class Journal:
    """Journal structure : une ligne par dossier traite, interrogeable apres coup."""

    lignes: list = field(default_factory=list)

    def noter(self, **champs) -> None:
        self.lignes.append({"sequence": len(self.lignes) + 1, **champs})

    def filtrer(self, **criteres) -> list[dict]:
        return [l for l in self.lignes if all(l.get(k) == v for k, v in criteres.items())]

    def expliquer(self, identifiant: str) -> str:
        l = next((x for x in self.lignes if x["dossier"] == identifiant), None)
        if l is None:
            return f"Aucune trace du dossier {identifiant}."
        verdicts = ", ".join(f"{s} : {'conforme' if v else 'non conforme'}" for s, v in l["verdicts"].items()) or "aucun"
        return (f"Dossier {identifiant}, règles version {l['version_regles']}. File : {l['file']}. Verdicts des sources : {verdicts}. "
                f"Score d'anomalie : {l['score'] if l['score'] is None else round(l['score'], 3)}. Décision : {l['decision']}. Motif : {l['motif']}.")

    def exporter(self, chemin, limite: int | None = None) -> Path:
        chemin = Path(chemin)
        chemin.write_text(json.dumps(self.lignes[:limite], ensure_ascii=False, indent=1), encoding="utf-8")
        return chemin


# --------------------------------------------------------------------------- systeme complet
def traiter_lot(dossiers: list[dict], *, routeur: Routeur, sources=("declare",), extracteur=None, controles: bool = False,
                incomplets_vers_humain: bool = False, arbitrage: str = "majorite", poids=None, marge: float = 0.0, priorite=None,
                score: np.ndarray | None = None, seuil_anomalie: float | None = None, plafonds: dict | None = None,
                journal: Journal | None = None, latences: dict | None = None) -> dict:
    """Traite un lot de dossiers avec la configuration donnee et mesure le resultat.

    sources : sources des champs montant, annee, certification, parmi "declare", "registre",
    "llm" (premiere lecture du courrier) et "llm2" (seconde lecture, autre consigne).
    Retourne les decisions, les motifs et un bilan chiffre (voir `bilan`).
    """
    lat = latences or LATENCES_MS
    decisions, motifs, latence = [], [], 0.0
    for k, d in enumerate(dossiers):
        file, _ = routeur.router(d["texte"])
        latence += lat["routeur"]
        verdicts, refus, valeur_score = {}, {}, None
        if file == "humain":
            decision, motif = "HUMAIN", "routage vers un agent instructeur"
        elif incomplets_vers_humain and not d["pieces_completes"]:
            decision, motif = "HUMAIN", "pièces manquantes"
        else:
            decision, motif = None, ""
            for s in sources:
                if s in ("llm", "llm2"):
                    fiche = extracteur.extraire(d, 0 if s == "llm" else 1)
                    latence += lat["llm"]
                    alertes = controler_fiche(fiche) if controles else []
                    if alertes:
                        decision, motif = "HUMAIN", f"contrôle de la lecture du courrier : {alertes[0]}"
                        break
                else:
                    fiche = d[s]
                    latence += lat["registre"] if s == "registre" else 0.0
                verdicts[s], refus[s] = verdict_regles(fiche, d, file, plafonds)
                latence += lat["regles"]
            if decision is None:
                v = arbitrer(verdicts, arbitrage if len(verdicts) > 1 else "priorite", poids=poids, marge=marge, priorite=priorite)
                if v is None:
                    decision, motif = "HUMAIN", "désaccord entre les sources"
                else:
                    if score is not None and seuil_anomalie is not None:
                        valeur_score = float(score[k])
                        latence += lat["score"]
                    if valeur_score is not None and valeur_score >= seuil_anomalie:
                        decision, motif = "HUMAIN", "score d'anomalie au-dessus du seuil"
                    elif v:
                        decision, motif = "ACCEPTER", "toutes les règles sont respectées"
                    else:
                        regles_refus = sorted({r for s, rs in refus.items() if not verdicts[s] for r in rs})
                        decision, motif = "REJETER", "règles non respectées : " + ", ".join(regles_refus)
        decisions.append(decision)
        motifs.append(motif)
        if journal is not None:
            journal.noter(dossier=d["id"], version_regles=VERSION_REGLES, file=file, verdicts=verdicts, score=valeur_score, decision=decision, motif=motif)
    resultat = bilan(dossiers, decisions)
    resultat.update({"decisions": decisions, "motifs": motifs, "latence_ms": latence / max(1, len(dossiers))})
    return resultat


def bilan(dossiers: list[dict], decisions: list[str], couts: dict | None = None) -> dict:
    """Mesures d'un lot : part automatique, erreurs automatiques, cout moyen par dossier."""
    n = len(dossiers)
    attendus = [d["attendu"] for d in dossiers]
    auto = [dec != "HUMAIN" for dec in decisions]
    faux = [a and dec != att for a, dec, att in zip(auto, decisions, attendus)]
    return {
        "n": n,
        "part_auto": sum(auto) / n,
        "erreur_auto": sum(faux) / n,
        "acceptes_a_tort": sum(f and dec == "ACCEPTER" for f, dec in zip(faux, decisions)) / n,
        "rejetes_a_tort": sum(f and dec == "REJETER" for f, dec in zip(faux, decisions)) / n,
        "exactitude": sum(dec == att for dec, att in zip(decisions, attendus)) / n,
        "cout_moyen": sum(cout_decision(dec, att, couts) for dec, att in zip(decisions, attendus)) / n,
    }


# --------------------------------------------------------------------------- mini-RAG
BASE_CONNAISSANCES = [
    {"id": "P01", "titre": "Objet du dispositif", "texte": "Le dispositif finance une partie des travaux de rénovation énergétique réalisés dans la résidence principale du demandeur."},
    {"id": "P02", "titre": "Plafond pour l'isolation", "texte": "Pour des travaux d'isolation des combles, des murs ou de la toiture, la dépense prise en compte est plafonnée à 12 000 euros."},
    {"id": "P03", "titre": "Plafond pour la pompe à chaleur", "texte": "Pour l'installation d'une pompe à chaleur, la dépense prise en compte est plafonnée à 16 000 euros."},
    {"id": "P04", "titre": "Plafond pour les fenêtres", "texte": "Pour le remplacement des fenêtres par du double vitrage, la dépense prise en compte est plafonnée à 8 000 euros."},
    {"id": "P05", "titre": "Plafond pour la chaudière biomasse", "texte": "Pour l'installation d'une chaudière biomasse ou à granulés, la dépense prise en compte est plafonnée à 18 000 euros."},
    {"id": "P06", "titre": "Ancienneté du logement", "texte": "Le logement doit avoir été achevé depuis au moins quinze ans à la date du dépôt de la demande."},
    {"id": "P07", "titre": "Condition de ressources", "texte": "Le revenu fiscal de référence du foyer ne doit pas dépasser 45 000 euros par an."},
    {"id": "P08", "titre": "Entreprise", "texte": "Les travaux doivent être réalisés par une entreprise titulaire de la certification à la date de signature du devis."},
    {"id": "P09", "titre": "Pièces à fournir", "texte": "Le dossier comprend le devis signé, le dernier avis d'imposition et un justificatif de propriété. Un dossier incomplet est renvoyé à un agent instructeur."},
    {"id": "P10", "titre": "Délai d'instruction", "texte": "L'administration rend sa décision dans un délai de deux mois à compter de la réception du dossier complet."},
    {"id": "P11", "titre": "Recours", "texte": "En cas de rejet, le demandeur peut contester la décision dans un délai de trente jours. Toute réclamation est traitée par un agent instructeur, jamais automatiquement."},
    {"id": "P12", "titre": "Versement", "texte": "L'aide est versée par virement après réception de la facture acquittée, dans un délai de six semaines."},
    {"id": "P13", "titre": "Cumul", "texte": "Un même foyer ne peut déposer qu'une seule demande par type de travaux sur une période de cinq ans."},
    {"id": "P14", "titre": "Contrôle sur place", "texte": "Un contrôle sur place peut être déclenché lorsque le prix du devis s'écarte fortement des prix habituellement constatés."},
    {"id": "P15", "titre": "Début des travaux", "texte": "Les travaux ne doivent pas avoir commencé avant le dépôt de la demande, sous peine de rejet."},
    {"id": "P16", "titre": "Données personnelles", "texte": "Les informations du dossier sont conservées trois ans puis supprimées. Le journal des décisions ne contient aucune pièce justificative."},
]
QUESTIONS = [
    {"question": "Quel est le plafond de dépense pour l'isolation des combles ?", "passage": "P02"},
    {"question": "Jusqu'à quel montant une pompe à chaleur est-elle prise en compte ?", "passage": "P03"},
    {"question": "Quel plafond s'applique au remplacement des fenêtres ?", "passage": "P04"},
    {"question": "Quelle dépense maximale pour une chaudière à granulés ?", "passage": "P05"},
    {"question": "Ma maison a dix ans, puis-je déposer une demande ?", "passage": "P06"},
    {"question": "Quel revenu maximal pour bénéficier de l'aide ?", "passage": "P07"},
    {"question": "L'artisan doit-il être certifié ?", "passage": "P08"},
    {"question": "Quels documents faut-il joindre au dossier ?", "passage": "P09"},
    {"question": "En combien de temps la décision est-elle rendue ?", "passage": "P10"},
    {"question": "Comment contester un rejet ?", "passage": "P11"},
    {"question": "Quand l'argent est-il versé ?", "passage": "P12"},
    {"question": "Puis-je faire deux demandes pour le même type de travaux ?", "passage": "P13"},
    {"question": "Pourquoi un contrôle sur place a-t-il été déclenché pour mon devis ?", "passage": "P14"},
    {"question": "Ai-je le droit de commencer le chantier avant de déposer ma demande ?", "passage": "P15"},
    {"question": "Combien de temps mes informations sont-elles conservées ?", "passage": "P16"},
    {"question": "Qui traite une réclamation ?", "passage": "P11"},
]


def jetons(texte: str) -> list[str]:
    return [m for m in re.split(r"[^a-z0-9]+", normaliser(texte)) if len(m) > 1]


class IndexLexical:
    """Recherche lexicale dans une base de passages, avec ou sans ponderation par la rarete (IDF)."""

    def __init__(self, passages: list[dict], idf: bool = True):
        self.passages = passages
        self.docs = [jetons(p["titre"] + " " + p["texte"]) for p in passages]
        frequences = {}
        for doc in self.docs:
            for mot in set(doc):
                frequences[mot] = frequences.get(mot, 0) + 1
        n = len(self.docs)
        self.idf = {m: (math.log((n + 1) / (f + 1)) + 1 if idf else 1.0) for m, f in frequences.items()}
        self.vecteurs = [self._vecteur(doc) for doc in self.docs]

    def _vecteur(self, mots: list[str]) -> dict:
        v = {}
        for m in mots:
            if m in self.idf:
                v[m] = v.get(m, 0.0) + self.idf[m]
        norme = math.sqrt(sum(x * x for x in v.values())) or 1.0
        return {m: x / norme for m, x in v.items()}

    def chercher(self, question: str, k: int = 3) -> list[tuple[dict, float]]:
        q = self._vecteur(jetons(question))
        scores = [sum(x * v.get(m, 0.0) for m, x in q.items()) for v in self.vecteurs]
        ordre = sorted(range(len(scores)), key=lambda i: (-scores[i], i))[:k]
        return [(self.passages[i], scores[i]) for i in ordre]

    def rappel(self, questions: list[dict], k: int) -> float:
        """Rappel a k : part des questions dont le bon passage figure parmi les k premiers."""
        return float(np.mean([q["passage"] in [p["id"] for p, _ in self.chercher(q["question"], k)] for q in questions]))


def plafonds_depuis_base(index: IndexLexical) -> dict:
    """Lit les plafonds dans la base documentaire plutot que dans le code : la regle suit le reglement."""
    plafonds = {}
    for t in TYPES:
        passage, _ = index.chercher(f"plafond de dépense pour {LIBELLES[t]}", 1)[0]
        nombre = re.search(r"(\d[\d ]*\d) euros", passage["texte"])
        plafonds[t] = int(nombre.group(1).replace(" ", "")) if nombre else None
    return plafonds
