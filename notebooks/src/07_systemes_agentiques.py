# %% [markdown]
# # ASCENT 4-130, Module 7 : Systèmes agentiques, du courrier à la décision
#
# **Prolongement (2 heures).** Familles d'agents, agent LLM et hybridation, diffusion de la complexité, diffusion du risque, routage, arbitrage, modération, niveaux d'autonomie, RAG et mémoire, gouvernance et journalisation.
#
# **Le second fil rouge.** Les modules 1 à 6 suivaient un robot dans un entrepôt. Ici, l'agent est un système de décision dans une organisation : un service reçoit des demandes d'aide à la rénovation énergétique et doit, pour chacune, accepter, rejeter ou confier le dossier à un agent instructeur humain. Les dossiers, le barème et les coûts sont entièrement fictifs.
#
# **Les nombres.** Les leçons du module 7 raisonnent sur des exemples aux chiffres ronds, choisis pour se calculer à la main. Ce notebook mesure son propre lot de dossiers synthétiques : ses taux et ses coûts ne sont donc pas ceux des leçons. Les mécanismes sont les mêmes, et ce sont eux que l'on vérifie ici.
#
# **La méthode.** On part d'un agent unique, volontairement naïf, puis on ajoute une brique à la fois. **Après chaque ajout, on mesure** : part des dossiers traités automatiquement, erreurs automatiques, coût moyen par dossier, latence machine. Une architecture ne se justifie pas par un schéma, mais par un écart mesuré.
#
# **Objectifs.**
# - Écrire un routeur et mesurer son exactitude.
# - Placer un LLM en interface et des règles en contrôle, puis mesurer ce que le contrôle rattrape.
# - Calculer la fiabilité d'une chaîne d'agents (diffusion de la complexité).
# - Régler un arbitre entre plusieurs sources et expliquer pourquoi leur indépendance compte (diffusion du risque).
# - Déduire des coûts d'erreur le seuil de passage à l'humain (modération, niveaux d'autonomie).
# - Mesurer le rappel d'un mini-RAG et relier une règle à sa source documentaire.
# - Tenir un journal qui permet d'expliquer chaque décision.
#
# **Durée indicative du TP (75 minutes).**
#
# | Partie | Contenu | Durée |
# |---|---|---|
# | 1 | Les dossiers, les coûts et l'agent unique de départ | 8 min |
# | 2 | Familles d'agents : règles, score statistique, routeur | 12 min |
# | 3 | Agent LLM et hybridation : LLM en interface, règles en contrôle | 12 min |
# | 4 | Diffusion de la complexité : fiabilité d'une chaîne | 8 min |
# | 5 | Diffusion du risque : redondance et arbitrage | 12 min |
# | 6 | Modération et niveaux d'autonomie | 10 min |
# | 7 | RAG et mémoire | 7 min |
# | 8 | Gouvernance, journal et bilan | 6 min |
#
# Le notebook est livré exécuté : les sorties visibles servent de résultats de repli.

# %%
# Installation automatique (Colab ou poste sans le paquet). Sans effet si tout est déjà installé.
import importlib.util, subprocess, sys
if importlib.util.find_spec("ascent_agents") is None:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "ascent-agents[complet] @ https://martinobettucci.github.io/4-120/dist/ascent_agents-1.0.0-py3-none-any.whl"])

# %%
import json
import platform
from collections import Counter
from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

import ascent_agents
from ascent_agents import detecter_appareil, fixer_graines
from ascent_agents import dossiers as dos
from ascent_agents.dossiers import (
    BASE_CONNAISSANCES, CHAMPS, COUTS, LATENCES_MS, PLAFONDS, QUESTIONS, REGLES, ROUTEUR_NAIF, ROUTEUR_ORDONNE, TYPES,
    ExtracteurSimule, IndexLexical, Journal, Routeur, ScoreAnomalie,
    arbitrer, bilan, controler_fiche, cout_decision, erreur_majorite, erreurs_extraction, fiabilite_chaine,
    generer_dossiers, plafonds_depuis_base, poids_fiabilite, seuil_optimal, simuler_votes, traiter_lot, verdict_regles,
)
from ascent_agents.visualisation import BLEU, GRIS, JAUNE, NOIR, ROUGE, VERT, style

APPAREIL = detecter_appareil()
style()
RESULTATS = Path("resultats")
RESULTATS.mkdir(exist_ok=True)
print(f"ascent_agents {ascent_agents.__version__}, Python {platform.python_version()}")

# %%
# PARAMÈTRES MODIFIABLES. Changez une valeur, relancez le notebook, observez ce qui bouge.
PARAMETRES = {
    "n_dossiers": 2000,            # taille du lot évalué
    "graine": 4130,                # changer la graine change le tirage des dossiers
    "LLM": "auto",                 # "auto" : vrai LLM sur Colab ou s'il est déjà téléchargé, sinon simulé. "reel" ou "simule" pour forcer.
    "modele_llm": "Qwen/Qwen3.5-0.8B",
    "n_llm": None,                 # nombre de courriers lus par le vrai LLM (None : 200 sur GPU, 40 sur CPU)
    "taux_erreur_simule": 0.08,    # taux d'erreur par champ de l'extracteur simulé
    "correlation_lectures": 0.8,   # part des erreurs communes à deux lectures du même courrier par le même modèle
    "cout_validation": 4.0,        # coût d'une validation humaine rapide d'une décision préparée (€)
    "detection_validation": 0.9,   # part des erreurs qu'une validation rapide rattrape
}
GRAINE = fixer_graines(PARAMETRES["graine"])

# %% [markdown]
# ## Partie 1. Les dossiers, les coûts et l'agent unique de départ
#
# Chaque dossier réunit quatre sources d'information :
#
# | Source | Contenu | Défaut |
# |---|---|---|
# | Formulaire | revenu du foyer, pièces complètes ou non | fiable |
# | Déclaration | montant, année du logement, certification de l'entreprise, saisis par le demandeur | parfois optimiste |
# | Courrier | les mêmes informations, en texte libre | il faut savoir lire |
# | Registres externes | les mêmes informations, lues dans des bases tierces | parfois périmés |
#
# La **vérité terrain**, que seul le générateur connaît, range chaque dossier dans une classe : `CONFORME` (à accepter), `NON_CONFORME` (à rejeter) ou `A_INSTRUIRE` (réclamation, pièces manquantes ou devis anormal : seul un humain peut trancher).

# %%
dossiers = generer_dossiers(PARAMETRES["n_dossiers"], GRAINE)
historique = generer_dossiers(PARAMETRES["n_dossiers"], GRAINE + 1)   # dossiers passés, déjà instruits : ils servent à régler les agents
print(f"{len(dossiers)} dossiers à traiter, {len(historique)} dossiers d'historique")
print("Répartition :", dict(Counter(d["classe"] for d in dossiers)))
d = dossiers[3]
print(f"\nDossier {d['id']}")
print("Courrier    :", d["texte"])
print("Déclaration :", d["declare"], "| revenu :", d["revenu"], "| pièces complètes :", d["pieces_completes"])
print("Registres   :", d["registre"])
print("Vérité      :", d["vrai"], "→", d["classe"])
pd.DataFrame([{"id": x["id"], **x["declare"], "revenu": x["revenu"], "pièces": x["pieces_completes"], "classe": x["classe"]} for x in dossiers[:6]])

# %% [markdown]
# ### Ce que coûte une décision
#
# Un système d'aide à la décision ne se juge pas à son exactitude seule : toutes les erreurs ne se valent pas. Le barème fictif de ce notebook :
#
# | Situation | Coût par dossier |
# |---|---|
# | Dossier confié à un agent instructeur humain | 12 € |
# | Dossier accepté à tort (aide versée indûment, ou sans l'instruction requise) | 400 € |
# | Dossier rejeté à tort (recours, nouvelle instruction, usager lésé) | 150 € |
# | Décision automatique juste | 0 € |
#
# **La référence à battre est donc 12 € par dossier**, le coût d'un service entièrement humain. Un système automatique qui coûte davantage, erreurs comprises, ne sert à rien.

# %%
SUIVI = []


def mesurer(version, ajout, **config):
    """Traite le lot avec une configuration, range la mesure dans SUIVI et la compare à la version précédente."""
    r = traiter_lot(dossiers, **config)
    ligne = {"version": version, "ajout": ajout, "part automatique (%)": 100 * r["part_auto"], "erreurs automatiques (%)": 100 * r["erreur_auto"],
             "coût moyen (€)": r["cout_moyen"], "latence machine (ms)": r["latence_ms"]}
    SUIVI[:] = [l for l in SUIVI if l["version"] != version]
    if SUIVI:
        avant = SUIVI[-1]
        print(f"Avant ({avant['version']}) : {avant['part automatique (%)']:.1f} % automatiques, {avant['erreurs automatiques (%)']:.1f} % d'erreurs, {avant['coût moyen (€)']:.2f} € par dossier")
    print(f"Après ({version}) : {ligne['part automatique (%)']:.1f} % automatiques, {ligne['erreurs automatiques (%)']:.1f} % d'erreurs, {ligne['coût moyen (€)']:.2f} € par dossier, {ligne['latence machine (ms)']:.0f} ms")
    SUIVI.append(ligne)
    return r


SUIVI.append({"version": "v0", "ajout": "tout humain (référence)", "part automatique (%)": 0.0, "erreurs automatiques (%)": 0.0, "coût moyen (€)": COUTS["humain"], "latence machine (ms)": 0.0})
# v1 : un seul agent. Il devine le type de travaux par mots clés, puis applique les règles à la déclaration du demandeur.
v1 = mesurer("v1", "agent unique : règles sur la déclaration", routeur=Routeur(ROUTEUR_NAIF), sources=("declare",))

# %% [markdown]
# **Lecture.** L'agent unique traite tout, instantanément, et coûte bien plus cher que le service humain qu'il prétend remplacer : il croit la déclaration sur parole, confond des types de travaux et décide même sur les dossiers qui exigeaient un instructeur. Tout le reste du notebook consiste à faire baisser ce coût, une brique à la fois.
#
# ## Partie 2. Familles d'agents : règles, score statistique, routeur
#
# « Agent » ne veut pas dire « LLM ». Ce système en combine plusieurs familles, chacune à la place où elle est la meilleure :
#
# | Famille | Rôle ici | Force | Limite |
# |---|---|---|---|
# | Règles | contrôle de conformité | explicable, vérifiable, sans données | ne lit pas le texte libre |
# | Statistique | score d'anomalie du devis | capte un faisceau d'indices | demande un historique |
# | Heuristique | routeur à mots clés | rapide, lisible | fragile devant les tournures |
# | LLM | lecture du courrier | absorbe la variété du langage | se trompe sans prévenir |
#
# ### L'agent à règles
#
# Quatre règles, toutes nécessaires. Chaque refus cite les règles non respectées : la décision est explicable par construction.

# %%
for nom, texte, _ in REGLES:
    print(nom, ":", texte)
print("Plafonds par type de travaux :", PLAFONDS)
d = dossiers[3]
conforme, refus = verdict_regles(d["declare"], d, d["type_travaux"])
print(f"\nDossier {d['id']} sur sa déclaration : {'conforme' if conforme else 'non conforme'}, règles non respectées : {refus}")
conforme, refus = verdict_regles(d["vrai"], d, d["type_travaux"])
print(f"Dossier {d['id']} sur la vérité     : {'conforme' if conforme else 'non conforme'}, règles non respectées : {refus}")

# %% [markdown]
# ### L'agent statistique : un score d'anomalie
#
# Certains devis sont anormaux : prix très au-dessus du marché, entreprise toute récente, demandes répétées du même foyer. Aucune règle simple ne les isole, mais un modèle entraîné sur l'historique estime une **probabilité d'anomalie**. C'est une régression logistique (leçons « Du neurone au réseau » et « Descente de gradient » du module 0). Le score ne décide pas encore : il servira au modérateur de la partie 6.

# %%
score_anomalie = ScoreAnomalie().entrainer(historique)
proba = score_anomalie.probabilite(dossiers)
anomalies = np.array([x["anomalie"] for x in dossiers])
print(f"Anomalies réelles : {anomalies.mean():.1%} des dossiers. Probabilité moyenne estimée : {proba.mean():.1%}")
fig, ax = plt.subplots(figsize=(7.5, 3.2))
bornes = np.linspace(0, 1, 41)
ax.hist(proba[~anomalies], bornes, color=BLEU, alpha=0.8, label="dossiers normaux")
ax.hist(proba[anomalies], bornes, color=ROUGE, alpha=0.8, label="dossiers anormaux")
ax.set(xlabel="probabilité d'anomalie estimée", ylabel="dossiers", yscale="log", title="Score d'anomalie sur le lot à traiter")
ax.legend()
plt.tight_layout()

# %% [markdown]
# ### Le routeur : orienter avant de traiter
#
# Le **routage** est la première décision du système : à quelle file envoyer le courrier ? Il y a une file par type de travaux (chacune a son plafond) et une file `humain` pour les réclamations. Le routeur de départ est une heuristique : la première règle dont un mot clé figure dans le texte l'emporte.

# %%
routeur_naif = Routeur(ROUTEUR_NAIF)
for mots, file in ROUTEUR_NAIF:
    print(f"si le courrier contient {mots} → file « {file} »")
print(f"\nExactitude du routeur naïf : {routeur_naif.exactitude(dossiers):.1%}")
for x in routeur_naif.erreurs(dossiers)[:3]:
    print(f"- routé vers « {routeur_naif.router(x['texte'])[0]} » au lieu de « {x['file_vraie']} » : {x['texte'][18:140]}…")

# %% [markdown]
# **Lecture.** Les erreurs ne viennent pas de mots inconnus, mais de l'**ordre** des règles et de mots clés trop larges : un courrier qui parle de changer des fenêtres « afin d'améliorer l'isolation » part en isolation, une réclamation qui cite son dossier d'isolation aussi. Or un mauvais routage se paie plus loin : mauvais plafond, ou réclamation traitée comme une demande.
#
# ### Exercice 1. Écrire un routeur
#
# Écrivez vos règles de routage. Chaque règle est un couple `(mots clés, file)`, les files possibles étant `isolation`, `pompe_a_chaleur`, `fenetres`, `chaudiere` et `humain`. Les mots sont comparés sans accents ni majuscules. Visez 98 % d'exactitude au moins. Méthode : lancez, lisez les courriers mal routés, corrigez l'ordre ou précisez un mot clé, relancez.

# %%
# À COMPLÉTER : la liste ci-dessous est une copie du routeur naïf. Réordonnez, précisez, ajoutez.
MES_REGLES = [
    (["isolation", "isoler"], "isolation"),
    (["chaudiere"], "chaudiere"),
    (["pompe a chaleur"], "pompe_a_chaleur"),
    (["fenetre"], "fenetres"),
    (["reclamation", "conteste", "recours"], "humain"),
]
mon_routeur = Routeur(MES_REGLES, defaut="humain")
print(f"Exactitude de votre routeur : {mon_routeur.exactitude(dossiers):.1%}")
for x in mon_routeur.erreurs(dossiers)[:4]:
    print(f"- routé vers « {mon_routeur.router(x['texte'])[0]} » au lieu de « {x['file_vraie']} » : {x['texte'][18:150]}…")

# %%
# Solution possible : les réclamations d'abord, puis des expressions qui désignent l'objet de la demande
# et non un mot isolé. Tout courrier que rien ne reconnaît part chez un humain (règle par défaut).
for mots, file in ROUTEUR_ORDONNE:
    print(f"si le courrier contient {mots} → file « {file} »")
routeur = Routeur(ROUTEUR_ORDONNE, defaut="humain")
print(f"\nExactitude du routeur ordonné sur le lot       : {routeur.exactitude(dossiers):.1%}")
print(f"Exactitude sur l'historique (jamais consulté)  : {routeur.exactitude(historique):.1%}")

# %% [markdown]
# Le routage est **conditionnel** : il ne dépend pas que du texte. Un dossier dont les pièces sont incomplètes n'a pas à entrer dans la chaîne automatique, quelle que soit sa demande. On ajoute donc au routeur ordonné l'aiguillage des dossiers incomplets vers la file `humain`, et on mesure.

# %%
v2 = mesurer("v2", "routeur ordonné, dossiers incomplets vers l'humain", routeur=routeur, sources=("declare",), incomplets_vers_humain=True)

# %% [markdown]
# **Lecture.** Le routage seul fait nettement baisser le coût : les réclamations et les dossiers incomplets ne sont plus décidés par une machine, et chaque demande est jugée avec le bon plafond. Mais le système croit toujours la déclaration du demandeur. Il faut lire le courrier.
#
# ## Partie 3. Agent LLM et hybridation : LLM en interface, règles en contrôle
#
# Lire un texte libre est ce qu'un LLM fait de mieux, et ce qu'aucune règle ne sait faire. On lui confie donc **une seule tâche** : extraire du courrier trois champs (montant du devis, année du logement, certification), au format JSON. Il ne décide rien. La décision reste aux règles, qui sont vérifiables. C'est le schéma d'hybridation le plus courant : **le LLM en interface, les règles en contrôle**.
#
# Le modèle utilisé est `Qwen/Qwen3.5-0.8B`, un petit modèle ouvert (licence Apache 2.0) qui tient dans la mémoire d'un GPU de Colab. Le paramètre `LLM` règle le mode :
#
# - `"auto"` : sur Colab, le modèle est téléchargé et utilisé. Ailleurs, il est utilisé s'il est déjà présent sur la machine. Sinon, repli sur un **extracteur simulé**.
# - `"reel"` : force le téléchargement. `"simule"` : force la simulation.
#
# L'extracteur simulé ne lit pas le texte : il part de la vérité et y injecte des erreurs à un taux réglable, plus souvent quand le courrier tend un piège (un acompte, une date d'emménagement, une certification « en cours »). Il suffit pour étudier les architectures, à condition de le dire : **la cellule suivante affiche le mode qui a produit les sorties de ce notebook.**

# %%
def charger_llm():
    """Retourne (extracteur réel ou None, explication du mode)."""
    mode = PARAMETRES["LLM"]
    if mode == "simule":
        return None, "choix de PARAMETRES"
    sur_colab = importlib.util.find_spec("google.colab") is not None
    try:
        if sur_colab or mode == "reel":
            # Qwen3.5 demande une version récente de Transformers.
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "-U", "transformers", "accelerate"])
        if importlib.util.find_spec("transformers") is None:
            return None, "bibliothèque transformers absente"
        if not sur_colab and mode == "auto":
            from huggingface_hub import try_to_load_from_cache
            if not isinstance(try_to_load_from_cache(PARAMETRES["modele_llm"], "config.json"), str):
                return None, "modèle non téléchargé sur cette machine (mettre LLM à « reel » pour le télécharger)"
        return dos.ExtracteurLLM(PARAMETRES["modele_llm"], APPAREIL), ""
    except Exception as erreur:  # réseau coupé, mémoire insuffisante, version incompatible : on continue en simulé
        return None, f"chargement impossible ({type(erreur).__name__} : {str(erreur)[:120]})"


llm, raison = charger_llm()
MODE_LLM = "réel" if llm is not None else "simulé"
print("=" * 78)
if llm is not None:
    print(f"MODE LLM : RÉEL. Modèle {llm.nom}, exécuté sur {llm.appareil}.")
else:
    print(f"MODE LLM : SIMULÉ ({raison}).")
    print(f"Taux d'erreur par champ fixé à {PARAMETRES['taux_erreur_simule']:.0%} dans PARAMETRES.")
print("=" * 78)

# %% [markdown]
# ### Mesurer le lecteur avant de lui faire confiance
#
# Un LLM se trompe sans prévenir : il rend toujours une fiche bien formée. La seule façon de connaître son taux d'erreur est de le **mesurer** sur des courriers dont on connaît la vérité.
#
# Quand le vrai modèle est disponible, il lit un échantillon de courriers (deux fois, avec deux consignes différentes) et l'on mesure son taux d'erreur champ par champ. L'extracteur simulé est ensuite **étalonné sur ces taux mesurés** pour traiter le lot complet : on mesure le vrai modèle, on simule à l'échelle. En mode simulé, le taux vient de `PARAMETRES`.

# %%
demandes = [x for x in dossiers if x["file_vraie"] != "humain"]
if llm is not None:
    n_llm = PARAMETRES["n_llm"] or (200 if llm.appareil.startswith("cuda") else 40)
    echantillon = demandes[:n_llm]
    mesure_1, mesure_2 = erreurs_extraction(llm, echantillon, 0), erreurs_extraction(llm, echantillon, 1)
    for x in echantillon[:3]:
        print("Courrier :", x["texte"][18:200], "…")
        print("  réponse brute du modèle :", llm.cache[(x["id"], 0)][1].strip().replace("\n", " ")[:140])
        print("  fiche lue :", llm.extraire(x), "| vérité :", x["vrai"])
    faux_1 = np.array([llm.extraire(x, 0) != x["vrai"] for x in echantillon])
    faux_2 = np.array([llm.extraire(x, 1) != x["vrai"] for x in echantillon])
    p2 = faux_2.mean()
    commun = faux_2[faux_1].mean() if faux_1.any() else 0.0
    correlation = float(np.clip((commun - p2) / max(1e-9, 1 - p2), 0, 1))
    LATENCES = {**LATENCES_MS, "llm": 1000 * float(np.mean(llm.secondes))}
    extracteur = ExtracteurSimule({c: mesure_1[c] for c in CHAMPS}, correlation, GRAINE)
    print(f"\n{len(echantillon)} courriers lus deux fois par {llm.nom}, {np.mean(llm.secondes):.2f} s par lecture en moyenne sur {llm.appareil}.")
    print(pd.DataFrame({"lecture 1 (réel)": mesure_1, "lecture 2 (réel)": mesure_2, "simulé étalonné, même échantillon": erreurs_extraction(extracteur, echantillon)}).rename(index={"fiche": "au moins un champ faux"}).round(3).to_string())
    print(f"Quand la lecture 1 se trompe, la lecture 2 se trompe aussi dans {commun:.0%} des cas (contre {p2:.0%} en moyenne).")
else:
    correlation = PARAMETRES["correlation_lectures"]
    LATENCES = dict(LATENCES_MS)
    extracteur = ExtracteurSimule(PARAMETRES["taux_erreur_simule"], correlation, GRAINE)
    x = next(y for y in demandes if extracteur.extraire(y) != y["vrai"])   # premier courrier mal lu
    print("Courrier :", x["texte"][18:], "…")
    print("  fiche rendue par l'extracteur simulé :", extracteur.extraire(x), "| vérité :", x["vrai"])
taux_lecture = erreurs_extraction(extracteur, demandes)
print(f"\nExtracteur utilisé pour le lot complet ({'simulé, étalonné sur le modèle réel' if llm is not None else 'simulé'}) : erreur par champ {', '.join(f'{c} {taux_lecture[c]:.1%}' for c in CHAMPS)} ; au moins un champ faux dans {taux_lecture['fiche']:.1%} des fiches.")

# %%
v3 = mesurer("v3", "LLM en interface : les règles jugent la fiche lue dans le courrier", routeur=routeur, sources=("llm",), extracteur=extracteur, incomplets_vers_humain=True, latences=LATENCES)

# %% [markdown]
# ### Les règles en contrôle
#
# Une fiche fausse n'est pas toujours détectable, mais certaines erreurs se voient : un montant de 950 € pour une pompe à chaleur, une année absente, un champ manquant. Un **contrôle de vraisemblance**, écrit en quelques règles, intercepte ces fiches et les envoie à un humain au lieu de les laisser décider. C'est une première forme de **modération**, placée entre deux agents.

# %%
fiches = [extracteur.extraire(x) for x in demandes]
fausses = np.array([f != x["vrai"] for f, x in zip(fiches, demandes)])
alertes = np.array([bool(controler_fiche(f)) for f in fiches])
exemple = next(f for f, a in zip(fiches, alertes) if a)
print("Exemple de fiche interceptée :", exemple, "→", controler_fiche(exemple))
print(f"Fiches fausses : {fausses.mean():.1%}. Le contrôle en intercepte {alertes[fausses].mean():.1%}, et arrête à tort {alertes[~fausses].mean():.1%} des fiches justes.")
v4 = mesurer("v4", "règles en contrôle de la sortie du LLM", routeur=routeur, sources=("llm",), extracteur=extracteur, controles=True, incomplets_vers_humain=True, latences=LATENCES)

# %% [markdown]
# **Lecture.** Le contrôle de vraisemblance ne rattrape qu'une partie des erreurs de lecture : celles qui produisent une valeur absurde. Une erreur plausible (l'année d'emménagement prise pour l'année de construction) lui échappe. Pour celles-là, il faudra une autre idée : croiser des sources indépendantes. Avant cela, regardons ce que la mise en chaîne des agents fait à la fiabilité.
#
# ## Partie 4. Diffusion de la complexité : fiabilité d'une chaîne
#
# **Diffuser la complexité**, c'est décomposer : au lieu d'un agent qui fait tout, une chaîne d'agents spécialisés (router, lire, contrôler, décider). Chaque agent est plus simple, plus testable, remplaçable. Mais la décomposition a un prix, que l'on calcule.
#
# Si chaque étape réussit avec une probabilité donnée, et si les erreurs sont indépendantes, la chaîne ne réussit de bout en bout que si **toutes** les étapes réussissent :
#
# `fiabilité de la chaîne = fiabilité 1 × fiabilité 2 × … × fiabilité n`
#
# Cinq étapes fiables à 95 % donnent une chaîne fiable à 77 % seulement.

# %%
print(f"5 étapes à 95 % : {fiabilite_chaine([0.95] * 5):.1%}. 10 étapes à 95 % : {fiabilite_chaine([0.95] * 10):.1%}. 10 étapes à 99 % : {fiabilite_chaine([0.99] * 10):.1%}.")
fig, ax = plt.subplots(figsize=(7.5, 3.4))
etapes = np.arange(1, 13)
for f, couleur in [(0.99, VERT), (0.95, BLEU), (0.90, ROUGE)]:
    ax.plot(etapes, [fiabilite_chaine([f] * k) for k in etapes], "o-", color=couleur, label=f"{f:.0%} par étape")
    ax.plot(etapes, [fiabilite_chaine([f] * k, [True] * k) for k in etapes], "--", color=couleur, alpha=0.6)
ax.set(xlabel="nombre d'étapes de la chaîne", ylabel="fiabilité de bout en bout", ylim=(0, 1.02), title="Une chaîne multiplie les fiabilités (pointillés : un contrôle après chaque étape)")
ax.legend()
plt.tight_layout()

# %% [markdown]
# Vérifions la formule sur notre chaîne, avec le routeur naïf de départ pour que deux étapes soient faillibles : router, puis lire. La chaîne est « tout juste » quand le routage est bon **et** la fiche exacte.

# %%
route_ok = np.array([routeur_naif.router(x["texte"])[0] == x["file_vraie"] for x in demandes])
fiche_ok = ~fausses
produit = fiabilite_chaine([route_ok.mean(), fiche_ok.mean()])
print(f"Routage juste : {route_ok.mean():.1%}. Fiche exacte : {fiche_ok.mean():.1%}.")
print(f"Produit des deux fiabilités : {produit:.1%}. Part mesurée des dossiers où les deux étapes sont justes : {(route_ok & fiche_ok).mean():.1%}.")
# Un contrôle après une étape rattrape une partie de ses erreurs : c'est ce que faisait la v4.
detection = alertes[fausses].mean()
print(f"Avec le routeur ordonné ({routeur.exactitude(demandes):.1%}) et le contrôle de vraisemblance (détection {detection:.0%}) : {fiabilite_chaine([routeur.exactitude(demandes), fiche_ok.mean()], [False, True], detection):.1%} de dossiers sans erreur non détectée.")

# %% [markdown]
# **Lecture.** Le produit calculé et la part mesurée coïncident, à l'aléa d'échantillonnage près : les erreurs de routage et de lecture sont indépendantes. Trois conséquences pratiques.
#
# - Décomposer n'est rentable que si chaque étape devient **nettement** plus fiable que l'agent unique qu'elle remplace.
# - Un **contrôle** entre deux étapes remonte la fiabilité de la chaîne : c'est le rôle des points de modération.
# - Chaque étape ajoute aussi de la latence, un coût et une dépendance. Une chaîne trop fine devient impossible à maintenir.
#
# ## Partie 5. Diffusion du risque : redondance et arbitrage
#
# **Diffuser le risque**, c'est l'inverse : au lieu de découper le problème, on le fait traiter **plusieurs fois, par des voies différentes**, et un **arbitre** tranche. L'idée n'est pas d'avoir trois avis, mais trois avis qui ne se trompent pas au même endroit.
#
# Le calcul, pour trois décideurs qui se trompent chacun dans 10 % des cas et un vote à la majorité. Le vote se trompe si deux décideurs au moins se trompent :
#
# `erreur du vote = 3 × p² × (1 - p) + p³ = 3 × 0,01 × 0,9 + 0,001 = 2,8 %`
#
# Ce résultat suppose des erreurs **indépendantes**. Si les trois décideurs partagent la même cause d'erreur, ils se trompent ensemble et le vote ne corrige rien.

# %%
print(f"Formule, erreurs indépendantes : {erreur_majorite(0.10):.1%}")
for c in (0.0, 0.5, 1.0):
    s = simuler_votes(200_000, 0.10, c, GRAINE)
    print(f"Simulation, corrélation {c:.1f} : chaque décideur {np.mean(s['individuels']):.1%}, vote à la majorité {s['majorite']:.1%} (formule : {erreur_majorite(0.10, c):.1%})")
fig, ax = plt.subplots(figsize=(7.5, 3.2))
cs = np.linspace(0, 1, 21)
ax.plot(cs, [100 * erreur_majorite(0.10, c) for c in cs], color=BLEU, label="formule")
ax.plot(cs[::4], [100 * simuler_votes(100_000, 0.10, c, GRAINE)["majorite"] for c in cs[::4]], "o", color=ROUGE, label="simulation")
ax.axhline(10, color=GRIS, ls="--")
ax.text(0.02, 10.2, "un décideur seul : 10 %", color=GRIS, fontsize=9)
ax.set(xlabel="part des erreurs communes aux trois décideurs", ylabel="erreur du vote (%)", ylim=(0, 11.5), title="Le gain d'un vote disparaît quand les erreurs sont corrélées")
ax.legend(loc="lower right")
plt.tight_layout()

# %% [markdown]
# ### Sur les dossiers : quelles sources croiser ?
#
# Trois sources peuvent donner le montant, l'année et la certification : la **déclaration** du demandeur, la **lecture du courrier** par le LLM, les **registres externes**. On peut aussi faire relire le courrier une seconde fois par le même LLM, avec une autre consigne. Mesurons, pour chaque source, le taux d'erreur du verdict qu'elle produit, puis à quel point ces erreurs coïncident.

# %%
def erreurs_verdict(lot, source):
    """Pour chaque dossier : le verdict tiré de cette source diffère-t-il du verdict tiré de la vérité ?"""
    sortie = []
    for x in lot:
        fiche = extracteur.extraire(x, 0 if source == "llm" else 1) if source in ("llm", "llm2") else x[source]
        sortie.append(verdict_regles(fiche, x, x["type_travaux"])[0] != verdict_regles(x["vrai"], x, x["type_travaux"])[0])
    return np.array(sortie)


SOURCES = ["declare", "llm", "llm2", "registre"]
erreurs_sources = {s: erreurs_verdict(demandes, s) for s in SOURCES}
print("Taux d'erreur du verdict, par source :", {s: f"{e.mean():.1%}" for s, e in erreurs_sources.items()})
correlations = pd.DataFrame([[np.corrcoef(erreurs_sources[a], erreurs_sources[b])[0, 1] for b in SOURCES] for a in SOURCES], index=SOURCES, columns=SOURCES)
print("\nCorrélation entre les erreurs des sources :")
print(correlations.round(2).to_string())

# %%
lignes = []
for nom, trio in [("déclaration + LLM + seconde lecture LLM", ("declare", "llm", "llm2")), ("déclaration + LLM + registres", ("declare", "llm", "registre"))]:
    r = traiter_lot(dossiers, routeur=routeur, sources=trio, extracteur=extracteur, controles=True, incomplets_vers_humain=True, arbitrage="majorite", latences=LATENCES)
    lignes.append({"trio (vote à la majorité)": nom, "erreurs automatiques (%)": 100 * r["erreur_auto"], "coût moyen (€)": r["cout_moyen"], "latence machine (ms)": r["latence_ms"]})
comparaison_trios = pd.DataFrame(lignes).round(2)
print(f"Rappel, LLM seul avec contrôle (v4) : {100 * v4['erreur_auto']:.1f} % d'erreurs automatiques, {v4['cout_moyen']:.2f} € par dossier.")
gain_meme, gain_autre = (100 * v4["erreur_auto"] - comparaison_trios["erreurs automatiques (%)"]).tolist()
print(f"Gain du vote avec une seconde lecture par le même LLM : {gain_meme:.1f} point(s). Avec les registres, source indépendante : {gain_autre:.1f} point(s).")
comparaison_trios

# %% [markdown]
# **Lecture.** Comparez les deux lignes du tableau, puis relisez la corrélation entre `llm` et `llm2` dans la matrice. Deux lectures du même courrier par le même modèle butent sur les mêmes pièges : plus leurs erreurs sont corrélées, moins la seconde lecture apporte, alors qu'elle double la latence. Les registres, eux, se trompent **ailleurs** que le LLM et que le demandeur : leur corrélation avec les autres sources est voisine de zéro, et c'est cette indépendance qui fait baisser l'erreur. Diffuser le risque, c'est diversifier les **causes d'erreur**, pas multiplier les exemplaires d'un même agent.
#
# ### L'arbitre
#
# Quand les sources divergent, l'arbitre applique une méthode. Quatre sont disponibles :
#
# | Méthode | Principe |
# |---|---|
# | `majorite` | la réponse la plus fréquente l'emporte |
# | `priorite` | on suit une source désignée (par exemple les registres) |
# | `unanimite` | décision automatique seulement si toutes les sources sont d'accord, sinon passage à l'humain. Entre deux sources, c'est le pattern de la double validation |
# | `pondere` | chaque source vote avec un poids, et l'arbitre s'abstient si l'écart entre les deux camps ne dépasse pas une marge |

# %%
TRIO = ("declare", "llm", "registre")
base = dict(routeur=routeur, sources=TRIO, extracteur=extracteur, controles=True, incomplets_vers_humain=True, latences=LATENCES)
print("Exemple :", {"declare": True, "llm": False, "registre": False}, "→ majorité :", arbitrer({"declare": True, "llm": False, "registre": False}), "| unanimité :", arbitrer({"declare": True, "llm": False, "registre": False}, "unanimite"))
lignes = []
for nom, options in [("majorité", dict(arbitrage="majorite")), ("priorité aux registres", dict(arbitrage="priorite", priorite=["registre"])), ("unanimité", dict(arbitrage="unanimite"))]:
    r = traiter_lot(dossiers, **base, **options)
    lignes.append({"arbitre": nom, "part automatique (%)": 100 * r["part_auto"], "erreurs automatiques (%)": 100 * r["erreur_auto"], "acceptés à tort (%)": 100 * r["acceptes_a_tort"], "rejetés à tort (%)": 100 * r["rejetes_a_tort"], "coût moyen (€)": r["cout_moyen"]})
comparaison_arbitres = pd.DataFrame(lignes).round(2)
comparaison_arbitres

# %% [markdown]
# ### Exercice 2. Régler un arbitre
#
# Réglez un arbitre pondéré : un poids par source et une marge d'abstention. Si l'écart entre le camp « conforme » et le camp « non conforme » ne dépasse pas la marge, le dossier part chez un humain (12 €). Cherchez le réglage de plus faible coût moyen. Pistes : une source fiable mérite un poids fort, et une marge nulle interdit toute abstention. Les taux d'erreur de chaque source, mesurés sur l'historique, sont affichés pour vous guider.

# %%
demandes_passees = [x for x in historique if x["file_vraie"] != "humain"]
erreurs_passees = {s: float(erreurs_verdict(demandes_passees, s).mean()) for s in TRIO}
print("Taux d'erreur mesurés sur l'historique :", {s: f"{e:.1%}" for s, e in erreurs_passees.items()})

# À COMPLÉTER : vos poids et votre marge.
MES_POIDS = {"declare": 1.0, "llm": 1.0, "registre": 1.0}
MA_MARGE = 0.0
r = traiter_lot(dossiers, **base, arbitrage="pondere", poids=MES_POIDS, marge=MA_MARGE)
print(f"Votre arbitre : {100 * r['part_auto']:.1f} % automatiques, {100 * r['erreur_auto']:.1f} % d'erreurs, {r['cout_moyen']:.2f} € par dossier")

# %%
# Solution possible : le poids d'une source est le logarithme de ses chances d'avoir raison, mesurées sur
# l'historique. La marge se choisit sur l'historique aussi, puis se vérifie sur le lot à traiter.
POIDS = poids_fiabilite(erreurs_passees)
print("Poids :", {s: round(p, 2) for s, p in POIDS.items()})
base_passe = {**base}
essais = []
# Les seules marges utiles sont les trois écarts possibles quand une source s'oppose aux deux autres (arrondis par excès).
for marge in [0.0] + sorted({np.ceil(1000 * abs(sum(POIDS[s] * signe for s, signe in zip(TRIO, signes)))) / 1000 for signes in [(1, 1, -1), (1, -1, 1), (-1, 1, 1)]}):
    passe = traiter_lot(historique, **base_passe, arbitrage="pondere", poids=POIDS, marge=marge)
    present = traiter_lot(dossiers, **base, arbitrage="pondere", poids=POIDS, marge=marge)
    essais.append({"marge": marge, "coût sur l'historique (€)": passe["cout_moyen"], "coût sur le lot (€)": present["cout_moyen"], "part automatique (%)": 100 * present["part_auto"], "erreurs automatiques (%)": 100 * present["erreur_auto"]})
essais = pd.DataFrame(essais)
MARGE = float(essais.loc[essais["coût sur l'historique (€)"].idxmin(), "marge"])
print(f"Marge retenue (celle de moindre coût sur l'historique) : {MARGE}")
essais.round(2)

# %% [markdown]
# **Lecture.** Une marge nulle redonne un vote pondéré sans abstention. En augmentant la marge, l'arbitre s'abstient d'abord quand la source la plus fiable est seule contre les deux autres (les deux camps pèsent alors presque autant), et finit par exiger l'unanimité. L'abstention coûte 12 €, une erreur de 150 à 400 € : avec de tels écarts, un arbitre qui sait dire « je ne sais pas » est souvent le moins cher. Le bon réglage dépend donc des **coûts**, pas seulement des taux d'erreur.
#
# Pour ne changer qu'une chose à la fois, la suite du notebook garde le vote à la majorité. L'arbitre réglé revient dans le bilan final.

# %%
v5 = mesurer("v5", "diffusion du risque : trois sources indépendantes, vote à la majorité", **base, arbitrage="majorite")

# %% [markdown]
# ## Partie 6. Modération et niveaux d'autonomie
#
# Il reste une catégorie d'erreurs que ni la lecture ni le croisement des sources ne voient : les devis **anormaux**, parfaitement conformes sur le papier. C'est le rôle du score d'anomalie de la partie 2, et du **modérateur** : au-dessus d'un seuil, la décision automatique est suspendue et le dossier part chez un instructeur.
#
# Où placer le seuil ? La leçon « Décider sous incertitude : le coût espéré » donne la réponse. Envoyer à tort un dossier normal chez l'humain coûte 12 €. Laisser passer un dossier anormal coûte 400 € s'il est accepté. Le seuil est le point où les deux coûts espérés s'égalisent :
#
# `seuil = coût de la fausse alerte / (coût de la fausse alerte + coût du manque) = 12 / (12 + 400) = 2,9 %`
#
# Un dossier part donc chez l'humain dès que sa probabilité d'anomalie dépasse 2,9 %, bien avant 50 %. Vérifions que ce seuil calculé est proche du seuil de moindre coût mesuré.

# %%
seuil_calcule = seuil_optimal(COUTS["humain"], COUTS["accepter_a_tort"])
seuils = [0.005, 0.01, 0.02, seuil_calcule, 0.05, 0.1, 0.2, 0.5, 1.01]
couts_seuils = [traiter_lot(dossiers, **base, arbitrage="majorite", score=proba, seuil_anomalie=s)["cout_moyen"] for s in seuils]
meilleur = seuils[int(np.argmin(couts_seuils))]
print(f"Seuil calculé à partir des coûts : {seuil_calcule:.1%}. Coût moyen mesuré à ce seuil : {couts_seuils[seuils.index(seuil_calcule)]:.2f} €.")
print(f"Meilleur seuil de la grille mesurée : {meilleur:.1%} ({min(couts_seuils):.2f} €). Sans modérateur : {couts_seuils[-1]:.2f} €. Avec le seuil « naturel » de 50 % : {couts_seuils[seuils.index(0.5)]:.2f} €.")
fig, ax = plt.subplots(figsize=(7.5, 3.2))
ax.plot(seuils[:-1], couts_seuils[:-1], "o-", color=BLEU)
ax.axvline(seuil_calcule, color=VERT, ls="--")
ax.text(seuil_calcule * 1.1, max(couts_seuils[:-1]), "seuil calculé", color=VERT, fontsize=9, va="top")
ax.axhline(COUTS["humain"], color=GRIS, ls=":")
ax.text(0.2, COUTS["humain"] + 0.15, "tout humain : 12 €", color=GRIS, fontsize=9)
ax.set(xscale="log", xlabel="seuil de probabilité d'anomalie (échelle logarithmique)", ylabel="coût moyen (€ par dossier)", title="Coût du système selon le seuil du modérateur")
plt.tight_layout()

# %%
v6 = mesurer("v6", "modération : score d'anomalie et seuil déduit des coûts", **base, arbitrage="majorite", score=proba, seuil_anomalie=seuil_calcule)

# %% [markdown]
# ### Les niveaux d'autonomie
#
# Le modérateur vient de fixer **jusqu'où le système agit seul**. C'est la question des niveaux d'autonomie, à poser avant toute architecture :
#
# | Niveau | Le système… | Dans ce notebook |
# |---|---|---|
# | 0 | outil simple, sans initiative | l'instructeur consulte les règles |
# | 1 | suggère sur demande | |
# | 2 | recommande de lui-même | |
# | 3 | prépare la décision, un humain la valide | validation rapide de chaque décision préparée |
# | 4 | exécute seul, dans des limites fixées | les versions v1 à v6, de mieux en mieux bornées |
# | 5 | s'adapte en continu, supervision à distance | hors du périmètre de ce TP |
#
# Le niveau n'est pas une propriété du système entier : il se règle **dossier par dossier**. Un dossier limpide peut être exécuté seul (niveau 4), un dossier douteux préparé puis validé par un humain en quelques secondes (niveau 3), un dossier suspect instruit entièrement (l'humain décide). La validation rapide coûte 4 € et rattrape 90 % des erreurs de la décision préparée (valeurs de `PARAMETRES`).
#
# ### Exercice 3. Fixer les seuils d'un modérateur à trois issues
#
# Fixez deux seuils sur la probabilité d'anomalie. En dessous de `SEUIL_BAS`, exécution automatique. Entre les deux, décision préparée puis validation rapide. Au-dessus de `SEUIL_HAUT`, instruction complète par un humain. Cherchez le couple de seuils de plus faible coût moyen. Piste : appliquez la formule du seuil à chaque frontière, avec les coûts des deux issues qu'elle sépare.

# %%
decisions_v5 = v5["decisions"]   # décisions du système avant modération par le score


def cout_trois_issues(seuil_bas, seuil_haut, lot=dossiers, decisions=decisions_v5, scores=proba):
    """Coût moyen d'un modérateur à trois issues : automatique, validation rapide, instruction complète."""
    total = 0.0
    for x, decision, p in zip(lot, decisions, scores):
        if decision == "HUMAIN" or p >= seuil_haut:
            total += COUTS["humain"]
        elif p >= seuil_bas:
            total += PARAMETRES["cout_validation"] + (1 - PARAMETRES["detection_validation"]) * cout_decision(decision, x["attendu"])
        else:
            total += cout_decision(decision, x["attendu"])
    return total / len(lot)


# À COMPLÉTER : vos deux seuils.
SEUIL_BAS, SEUIL_HAUT = 0.10, 0.50
print(f"Vos seuils ({SEUIL_BAS:.1%}, {SEUIL_HAUT:.1%}) : {cout_trois_issues(SEUIL_BAS, SEUIL_HAUT):.2f} € par dossier. À battre : {v6['cout_moyen']:.2f} € (un seul seuil).")

# %%
# Solution possible. Frontière basse : valider (4 €) ou laisser faire (400 € si le dossier est anormal).
# Frontière haute : instruire (12 €) ou seulement valider (4 €, plus 10 % de 400 € si le dossier est anormal).
cv, det = PARAMETRES["cout_validation"], PARAMETRES["detection_validation"]
bas_calcule = cv / (cv + det * COUTS["accepter_a_tort"])
haut_calcule = (COUTS["humain"] - cv) / ((1 - det) * COUTS["accepter_a_tort"])
print(f"Seuils calculés : bas {bas_calcule:.1%}, haut {haut_calcule:.1%} → {cout_trois_issues(bas_calcule, haut_calcule):.2f} € par dossier")
grille = [0.003, 0.005, 0.01, 0.02, 0.03, 0.05, 0.1, 0.2, 0.3, 0.5, 0.8]
recherche = min(((cout_trois_issues(b, h), b, h) for b in grille for h in grille if h >= b))
print(f"Meilleur couple de la grille : bas {recherche[1]:.1%}, haut {recherche[2]:.1%} → {recherche[0]:.2f} € par dossier")
# La grille peut faire mieux que le calcul : la validation rattrape aussi les erreurs de lecture et de sources,
# que la formule, fondée sur le seul risque d'anomalie, ne compte pas.
print(f"Rappel : un seul seuil (v6) {v6['cout_moyen']:.2f} €, sans modération (v5) {v5['cout_moyen']:.2f} €, tout humain {COUTS['humain']:.2f} €")

# %% [markdown]
# **Lecture.** Chaque frontière se calcule comme un seuil de coût espéré : on compare les deux issues qu'elle sépare. La frontière basse est très basse, parce qu'une validation à 4 € est une assurance bon marché contre une erreur à 400 €. La frontière haute est élevée, parce que la validation rapide rattrape déjà l'essentiel. Le calcul ne tient compte que du risque d'anomalie : la recherche sur grille descend encore la frontière basse, parce qu'une validation rattrape aussi les erreurs de lecture et de sources. Entre les deux, le système prépare et l'humain valide : c'est le niveau 3, souvent le meilleur compromis quand l'erreur coûte cher.
#
# ## Partie 7. RAG et mémoire
#
# Les plafonds sont écrits en dur dans le code des règles. Le jour où le règlement change, il faut modifier le programme. Le **RAG** (génération augmentée par la recherche) propose autre chose : garder le règlement dans une **base documentaire**, retrouver le passage utile au moment de répondre, et s'appuyer sur lui. Il a deux étages : **retrouver**, puis **utiliser**. Le premier se mesure sans aucun LLM, par le **rappel à k** : la part des questions dont le bon passage figure parmi les k premiers résultats.
#
# L'index ci-dessous est lexical : il compare les mots de la question à ceux des passages. La pondération **IDF** donne plus de poids aux mots rares (« granulés ») qu'aux mots présents partout (« dépense »).

# %%
index = IndexLexical(BASE_CONNAISSANCES, idf=True)
index_brut = IndexLexical(BASE_CONNAISSANCES, idf=False)
print(f"{len(BASE_CONNAISSANCES)} passages dans la base, {len(QUESTIONS)} questions de test")
question = QUESTIONS[4]["question"]
print(f"\nQuestion : {question}")
for passage, s in index.chercher(question, 3):
    print(f"  {s:.2f}  {passage['id']} {passage['titre']} : {passage['texte'][:80]}…")
ks = [1, 2, 3, 4, 5]
rappels = pd.DataFrame({"k": ks, "avec IDF": [index.rappel(QUESTIONS, k) for k in ks], "sans IDF": [index_brut.rappel(QUESTIONS, k) for k in ks]}).set_index("k")
manquees = [q["question"] for q in QUESTIONS if q["passage"] != index.chercher(q["question"], 1)[0][0]["id"]]
print("\nQuestions dont le bon passage n'arrive pas en tête :", manquees)
fig, ax = plt.subplots(figsize=(6.5, 3))
ax.plot(ks, 100 * rappels["avec IDF"], "o-", color=BLEU, label="avec IDF")
ax.plot(ks, 100 * rappels["sans IDF"], "s--", color=ROUGE, label="sans IDF")
ax.set(xlabel="k : nombre de passages retenus", ylabel="rappel (%)", xticks=ks, ylim=(50, 102), title="Rappel à k du mini-RAG")
ax.legend()
plt.tight_layout()
(100 * rappels).round(1)

# %% [markdown]
# **Lecture.** Le rappel monte avec k : plus on retient de passages, plus le bon a de chances d'y être. Mais chaque passage ajouté allonge le contexte fourni au modèle, donc le coût, la latence et le risque de le distraire. Les questions manquées en tête sont celles qui n'emploient pas les mots du règlement (« ma maison a dix ans » pour « achevé depuis au moins quinze ans ») : c'est la limite d'une recherche lexicale, que les recherches par plongements sémantiques repoussent.
#
# ### La règle suit le règlement
#
# Second usage : l'agent à règles va chercher ses plafonds dans la base au lieu de les porter dans son code. On vérifie d'abord qu'il retrouve les bons, puis on modifie le règlement, et seulement lui.

# %%
plafonds_lus = plafonds_depuis_base(index)
print("Plafonds lus dans la base :", plafonds_lus, "| identiques au code :", plafonds_lus == PLAFONDS)
reference = traiter_lot(dossiers, **base, arbitrage="majorite", score=proba, seuil_anomalie=seuil_calcule, plafonds=plafonds_lus)
print("Décisions identiques à la v6 :", reference["decisions"] == v6["decisions"])
# Le règlement change : le plafond des fenêtres passe de 8 000 à 10 000 euros. On ne touche qu'au document.
base_modifiee = [dict(p, texte=p["texte"].replace("8 000 euros", "10 000 euros")) if p["id"] == "P04" else p for p in BASE_CONNAISSANCES]
nouveaux_plafonds = plafonds_depuis_base(IndexLexical(base_modifiee))
apres = traiter_lot(dossiers, **base, arbitrage="majorite", score=proba, seuil_anomalie=seuil_calcule, plafonds=nouveaux_plafonds)
changees = sum(a != b for a, b in zip(apres["decisions"], v6["decisions"]))
print(f"Nouveau plafond lu pour les fenêtres : {nouveaux_plafonds['fenetres']} €. Décisions modifiées sans toucher au code : {changees}")

# %%
# Le second étage du RAG, avec le vrai LLM quand il est disponible : répondre sans, puis avec le passage retrouvé.
if llm is not None:
    for q in [QUESTIONS[2], QUESTIONS[8], QUESTIONS[10]]:
        passage = index.chercher(q["question"], 1)[0][0]
        print("Question      :", q["question"])
        print("  sans contexte :", llm.repondre(q["question"])[:160])
        print("  avec contexte :", llm.repondre(q["question"], passage["texte"])[:160])
        print("  passage fourni:", passage["texte"])
else:
    print("Mode simulé : l'étage « utiliser » du RAG demande un vrai LLM. Passez LLM à « reel » (ou ouvrez le notebook dans Colab) pour comparer les réponses sans et avec le passage retrouvé.")

# %% [markdown]
# ### Et la mémoire ?
#
# Un système agentique s'appuie sur trois types de mémoire. Ce notebook les a utilisés tous les trois :
#
# - la **mémoire de travail** : le contexte immédiat de la tâche en cours, ici ce que le système garde pendant le traitement d'un dossier (la fiche lue, les verdicts des sources) ;
# - la **mémoire d'épisode** : l'historique des dossiers déjà instruits et des décisions prises, sur lequel on a entraîné le score d'anomalie et réglé l'arbitre, et que le journal de la partie 8 alimente ;
# - la **mémoire métier** : les connaissances stables du domaine, règlements, procédures et référentiels. C'est elle que le RAG interroge, et on la tient à jour sans toucher au modèle.
#
# Le cache de l'extracteur, qui ne relit jamais deux fois le même courrier avec la même consigne, n'est pas une quatrième mémoire : c'est une économie de calcul.
#
# Toute mémoire pose les mêmes questions : qui l'écrit, qui la corrige, combien de temps on la garde. Ce sont des questions de gouvernance.
#
# ## Partie 8. Gouvernance, journal et bilan
#
# Un système qui décide doit pouvoir **répondre de chaque décision**. Cela suppose un journal structuré, écrit au moment de la décision : quel dossier, quelle version des règles, quelle file, quel verdict de chaque source, quel score, quelle décision, quel motif. Le journal ne contient ni le courrier ni les pièces : seulement ce qu'il faut pour expliquer.

# %%
journal = Journal()
final = traiter_lot(dossiers, **base, arbitrage="majorite", score=proba, seuil_anomalie=seuil_calcule, journal=journal)
print(f"{len(journal.lignes)} lignes de journal. Une ligne :")
print(json.dumps(journal.lignes[0], ensure_ascii=False))
rejet = journal.filtrer(decision="REJETER")[0]
print("\nUn usager demande pourquoi son dossier a été rejeté :")
print(journal.expliquer(rejet["dossier"]))
print("\nMotifs de passage à l'humain :")
print(pd.Series([l["motif"].split(" : ")[0] for l in journal.filtrer(decision="HUMAIN")]).value_counts().to_string())
chemin = journal.exporter(RESULTATS / "m7_journal.json", limite=50)
print(f"\nExtrait du journal enregistré : {chemin}")

# %% [markdown]
# Le journal répond aux questions d'un audit : pourquoi ce rejet, avec quelle version des règles, sur la foi de quelles sources, et combien de dossiers sont partis chez un humain pour quel motif. Il ne répond pas aux questions de **gouvernance**, qui se tranchent avant la mise en service :
#
# - qui a le pouvoir de modifier une règle, un plafond, un seuil, et qui valide ce changement ;
# - qui répond d'une décision automatique erronée ;
# - qui surveille les dérives (taux de passage à l'humain, désaccords entre sources, taux d'erreur du lecteur) et à quel rythme ;
# - quels rôles humains sont prévus : superviseur, validateur final, arbitre de dernier recours, réviseur de règles, annotateur de données, gestionnaire d'exceptions.
#
# ### Évaluer chaque composant
#
# La leçon « Évaluer un système agentique » donne à chaque composant ses indicateurs. Le journal et la vérité terrain du lot suffisent à les calculer : le taux de routage correct, le taux d'accord trompeur et la réduction des erreurs finales pour l'arbitrage, les blocages à juste titre, les faux positifs et les incidents évités pour la modération.

# %%
# Routage : part des courriers envoyés dans la bonne file, pour chacun des deux routeurs.
print(f"Routage. Taux de routage correct : {routeur_naif.exactitude(dossiers):.1%} pour le routeur naïf, {routeur.exactitude(dossiers):.1%} pour le routeur ordonné.")
# Arbitrage : parmi les dossiers où les trois sources sont d'accord, combien d'accords sont faux ?
def accords(trio):
    """Retourne (dossiers soumis aux trois sources, accords unanimes, accords unanimes et faux)."""
    j = Journal()
    traiter_lot(dossiers, **{**base, "sources": trio}, arbitrage="majorite", journal=j)
    soumis = [(l, x) for l, x in zip(j.lignes, dossiers) if len(l["verdicts"]) == 3]
    unanimes = [(l, x) for l, x in soumis if len(set(l["verdicts"].values())) == 1]
    faux = sum(l["verdicts"][trio[0]] != verdict_regles(x["vrai"], x, x["type_travaux"])[0] for l, x in unanimes)
    return len(soumis), len(unanimes), faux


for nom, trio in [("déclaration, LLM, registres", TRIO), ("déclaration, LLM, seconde lecture LLM", ("declare", "llm", "llm2"))]:
    soumis, unanimes, faux = accords(trio)
    print(f"Arbitrage ({nom}). {soumis} dossiers soumis aux trois sources : {unanimes} accords unanimes, {soumis - unanimes} désaccords détectés.")
    print(f"  Taux d'accord trompeur : {faux} accords faux sur {unanimes}, soit {faux / unanimes:.1%}.")
print(f"  Réduction des erreurs finales, du LLM seul (v4) aux trois sources indépendantes (v5) : {(v4['erreur_auto'] - v5['erreur_auto']) / v4['erreur_auto']:.0%}.")
# Modération : le modérateur suspend la décision quand le score d'anomalie atteint le seuil.
examines = [(l, x) for l, x in zip(journal.lignes, dossiers) if l["score"] is not None]
bloques = [x for l, x in examines if l["decision"] == "HUMAIN"]
a_risque = sum(x["anomalie"] for _, x in examines)
justes = sum(x["anomalie"] for x in bloques)
print(f"Modération. {len(examines)} décisions examinées, dont {a_risque} sur des dossiers anormaux. {len(bloques)} décisions suspendues.")
print(f"  Blocages à juste titre : {justes} sur {len(bloques)}, soit {justes / len(bloques):.1%}. Incidents évités : {justes} sur {a_risque}, soit {justes / a_risque:.1%}.")
print(f"  Faux positifs de blocage : {len(bloques) - justes} dossiers normaux suspendus sur {len(examines) - a_risque}, soit {(len(bloques) - justes) / (len(examines) - a_risque):.1%}.")

# %% [markdown]
# **Lecture.** Le routeur ordonné ne laisse plus d'erreur d'orientation sur ce lot. Comparez ensuite les deux lignes d'arbitrage : avec trois sources indépendantes, un accord unanime est presque toujours juste. Avec deux lectures du même modèle, des accords faux apparaissent, et rien dans le système ne les signale : c'est le taux d'accord trompeur, que seule la vérité terrain permet de mesurer. Le modérateur, lui, évite presque tous les incidents, mais il suspend beaucoup de dossiers normaux, et la part de ses blocages justifiés est faible. C'est le prix d'un seuil très bas, choisi parce qu'un dossier anormal accepté coûte 400 € et une instruction 12 €. Un indicateur ne se lit jamais seul : on le rapporte aux coûts.
#
# ### Bilan : ce que chaque ajout a apporté

# %%
v7 = mesurer("v7", "arbitre pondéré réglé (exercice 2) à la place de la majorité", **base, arbitrage="pondere", poids=POIDS, marge=MARGE, score=proba, seuil_anomalie=seuil_calcule)
suivi = pd.DataFrame(SUIVI).set_index("version")
fig, ax = plt.subplots(figsize=(8.5, 3.6))
couleurs = [GRIS] + [ROUGE if c > COUTS["humain"] else VERT for c in suivi["coût moyen (€)"][1:]]
ax.bar(suivi.index, suivi["coût moyen (€)"], color=couleurs)
ax.axhline(COUTS["humain"], color=NOIR, ls="--", lw=1)
for i, c in enumerate(suivi["coût moyen (€)"]):
    ax.text(i, c + 1, f"{c:.1f} €", ha="center", fontsize=9)
ax.set(ylabel="coût moyen (€ par dossier)", title=f"Coût du système après chaque ajout (LLM {MODE_LLM})")
plt.tight_layout()
suivi.round(2)

# %%
meilleure = suivi["coût moyen (€)"].idxmin()
print(f"Mode LLM de cette exécution : {MODE_LLM}" + (f" ({llm.nom}, taux mesurés sur {len(echantillon)} courriers puis simulés à l'échelle)" if llm is not None else f" (taux d'erreur par champ : {PARAMETRES['taux_erreur_simule']:.0%})"))
print(f"Agent unique de départ : {suivi.loc['v1', 'coût moyen (€)']:.2f} € par dossier, contre {COUTS['humain']:.2f} € pour un service entièrement humain.")
print(f"Meilleure version : {meilleure}, {suivi.loc[meilleure, 'coût moyen (€)']:.2f} € par dossier, {suivi.loc[meilleure, 'part automatique (%)']:.1f} % de dossiers traités sans humain, {suivi.loc[meilleure, 'erreurs automatiques (%)']:.2f} % d'erreurs automatiques.")
if llm is not None:
    # Épreuve de vérité : le système final, sur l'échantillon, avec les fiches réellement lues par le modèle.
    reel = traiter_lot(echantillon, **{**base, "extracteur": llm}, arbitrage="majorite", score=score_anomalie.probabilite(echantillon), seuil_anomalie=seuil_calcule)
    simule = traiter_lot(echantillon, **base, arbitrage="majorite", score=score_anomalie.probabilite(echantillon), seuil_anomalie=seuil_calcule)
    print(f"Système v6 sur les {len(echantillon)} courriers de l'échantillon, lus par le vrai modèle : {reel['cout_moyen']:.2f} € par dossier, {100 * reel['erreur_auto']:.1f} % d'erreurs automatiques (simulé étalonné sur les mêmes dossiers : {simule['cout_moyen']:.2f} €, {100 * simule['erreur_auto']:.1f} %).")
donnees = {
    "mode_llm": MODE_LLM, "modele_llm": llm.nom if llm is not None else None, "graine": GRAINE, "parametres": PARAMETRES, "couts": COUTS,
    "erreurs_lecture": taux_lecture, "routeur_naif": routeur_naif.exactitude(dossiers), "routeur_ordonne": routeur.exactitude(dossiers),
    "seuil_moderateur": seuil_calcule, "rappel_rag": {str(k): float(rappels.loc[k, "avec IDF"]) for k in ks},
    "versions": pd.DataFrame(SUIVI).round(3).to_dict(orient="records"),
}
(RESULTATS / "m7_bilan.json").write_text(json.dumps(donnees, ensure_ascii=False, indent=1), encoding="utf-8")
print(f"Bilan enregistré : {RESULTATS / 'm7_bilan.json'}")

# %% [markdown]
# ### Du notebook au service réel : bonnes pratiques
#
# **Mesurer avant d'ajouter.** Chaque brique a été justifiée par un écart mesuré, pas par un schéma. Une brique qui n'améliore aucune mesure se retire : la seconde lecture par le même LLM, quand ses erreurs répètent celles de la première, en est l'exemple.
#
# **Régler sur le passé, vérifier sur le présent.** Les poids de l'arbitre, sa marge et le score d'anomalie ont été réglés sur l'historique, puis évalués sur le lot à traiter. Régler et évaluer sur les mêmes dossiers aurait flatté les résultats.
#
# **Le LLM là où il est irremplaçable, et nulle part ailleurs.** Il lit le texte libre. Il ne décide pas, ne calcule pas de plafond, n'arbitre pas. Sa sortie est contrôlée par des règles et croisée avec des sources indépendantes.
#
# **Un simulateur n'est pas le terrain.** Les dossiers, les coûts et, en mode simulé, les erreurs du lecteur sont synthétiques. Les ordres de grandeur illustrent des mécanismes. Avant une mise en service, il faut mesurer le vrai modèle sur de vrais courriers annotés, et suivre ses taux dans le temps.
#
# **Surveiller en service.** Le taux de passage à l'humain, le taux de désaccord entre sources et le taux d'alertes du contrôle de vraisemblance sont des signaux de dérive : s'ils bougent, quelque chose a changé dans les courriers, dans le modèle ou dans les registres.
#
# ## Synthèse du module
#
# - Un système agentique combine des familles d'agents : des règles pour ce qui doit être explicable, un modèle statistique pour les faisceaux d'indices, un LLM pour le texte libre, des heuristiques pour orienter.
# - **Diffuser la complexité**, c'est décomposer en étapes. La fiabilité de la chaîne est le produit des fiabilités : chaque étape doit être sûre, et les contrôles placés entre elles rattrapent une partie des erreurs.
# - **Diffuser le risque**, c'est croiser des voies indépendantes et arbitrer. Trois décideurs indépendants à 10 % d'erreur donnent un vote à 2,8 %. Le gain disparaît si leurs erreurs ont la même cause.
# - **Router, arbitrer, modérer** sont trois fonctions distinctes : orienter le dossier, trancher entre des avis, suspendre ou borner une action.
# - Le **niveau d'autonomie** se règle dossier par dossier, par des seuils déduits des coûts d'erreur : exécuter, préparer et faire valider, ou confier à un humain.
# - Un **RAG** se mesure d'abord par le rappel de sa recherche, et permet à une règle de suivre le règlement sans toucher au code.
# - Sans **journal**, pas d'explication, pas d'audit, pas de correction. Sans **gouvernance**, personne ne répond de la décision.
