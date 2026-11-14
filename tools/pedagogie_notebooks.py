"""Cellules pedagogiques ajoutees a chaque notebook lors de la construction.

Une cellule d'ouverture (prerequis, methode de travail) apres le titre,
une cellule d'auto-evaluation a la fin. Voir docs/pedagogie.md.
"""

SITE = "https://martinobettucci.github.io/4-120/#/module/0/"

LECONS = {
    "regles": "Système à base de règles", "bayes": "Théorème de Bayes et prévalence", "reseau": "Réseau bayésien",
    "supervise": "Apprentissage supervisé", "agent": "Agent et environnement", "lidar": "Capteurs : le lidar",
    "etat": "État réel et observation", "boucle": "Boucle perception, décision, action", "reactif": "Architecture réactive",
    "astar": "Planifier avec A*", "hybride": "Architecture hybride", "espace": "Espace de recherche et fonction de coût",
    "contraintes": "Programmation sous contraintes", "recuit": "Recuit simulé", "croyance": "Croyance et filtre bayésien",
    "qlearning": "Apprentissage par renforcement", "exploration": "Exploration et exploitation",
    "utilite": "Décider sous incertitude : le coût espéré", "neurone": "Du neurone au réseau de neurones", "gradient": "Entraîner : la descente de gradient",
    "recommandation": "Système de recommandation", "mdp": "Processus de décision markovien et politique",
    "confiance": "Distribution des résultats et intervalle de confiance", "robustesse": "Robustesse", "graine": "Reproductibilité et rejeu",
}

NOTEBOOKS = {
    "01": {
        "prerequis": ["regles", "bayes", "reseau", "utilite", "supervise", "neurone", "gradient", "recommandation"],
        "acquis": ["écrire un système à règles et expliquer la décision qu'il rend", "calculer une probabilité a posteriori et dire comment elle dépend de la prévalence", "entraîner un classifieur et l'évaluer sur des données qu'il n'a jamais vues", "choisir une approche pour un problème donné et justifier ce choix"],
    },
    "02": {
        "prerequis": ["agent", "lidar", "etat", "boucle"],
        "acquis": ["décrire un agent par son environnement, ses capteurs, ses effecteurs et son objectif", "lire une mesure de lidar et en déduire les mouvements possibles", "écrire une boucle perception, décision, action et l'exécuter pas à pas", "montrer sur une trace l'écart entre l'état réel et l'observation"],
    },
    "03": {
        "prerequis": ["boucle", "reactif", "astar", "hybride"],
        "acquis": ["programmer un contrôleur réactif, un contrôleur délibératif et un contrôleur hybride", "prévoir lequel échoue dans un scénario donné et expliquer pourquoi", "comparer des architectures sur des mesures (réussite, collisions, temps de décision)", "proposer une architecture pour un cas pratique et défendre ce choix"],
    },
    "04": {
        "prerequis": ["espace", "contraintes", "recuit"],
        "acquis": ["modéliser un problème par ses variables, ses domaines, ses contraintes et son objectif", "résoudre ce modèle avec CP-SAT et interpréter le statut retourné", "programmer un recuit simulé et régler sa température", "comparer les deux approches en qualité de solution et en temps de calcul"],
    },
    "05": {
        "prerequis": ["etat", "croyance", "mdp", "qlearning", "exploration"],
        "acquis": ["programmer une boucle d'autonomie qui tient compte du bruit et du glissement", "mettre à jour une croyance après une mesure et après un déplacement", "comparer deux politiques sur plusieurs graines et plusieurs niveaux de bruit", "entraîner une politique par Q-learning et l'encadrer par une garde réactive"],
    },
    "06": {
        "prerequis": ["confiance", "robustesse", "graine"],
        "acquis": ["concevoir une grille de scénarios de test, du nominal aux limites", "lancer une campagne de simulations et présenter un taux de réussite avec son intervalle de confiance", "rejouer un échec à partir de sa graine et de sa trace", "rédiger un rapport de validation avec des seuils d'acceptation"],
    },
}


def ouverture(numero: str) -> str:
    n = NOTEBOOKS[numero]
    liens = "\n".join(f"- [{LECONS[i]}]({SITE}{i})" for i in n["prerequis"])
    return f"""## Avant de commencer

**Ce qu'il faut connaître.** Chaque notion utilisée ici a sa leçon guidée dans le module 0 du site. Si l'une d'elles vous est nouvelle, commencez par là (15 à 20 minutes par leçon, théorie et atelier de construction compris) :

{liens}

**Comment travailler dans ce notebook.** Pour chaque partie, suivez quatre temps :

1. **Lire** l'explication qui précède le code.
2. **Prédire** ce que la cellule va afficher, avant de l'exécuter. Notez votre prédiction, même approximative.
3. **Exécuter**, puis comparer le résultat à votre prédiction. Un écart est une information : cherchez d'où il vient.
4. **Modifier** une valeur de la cellule `PARAMETRES`, relancer, et expliquer en une phrase ce qui a changé.

**Dans les exercices**, l'aide est graduée : essayez d'abord seul, relisez ensuite l'exemple qui précède, et n'ouvrez la « Solution possible » qu'après un essai. Comparer sa propre tentative à la solution apprend davantage que la lire directement."""


def cloture(numero: str) -> str:
    n = NOTEBOOKS[numero]
    cases = "\n".join(f"- [ ] Je sais {a}." for a in n["acquis"])
    return f"""## Auto-évaluation

Sans relire le notebook, cochez ce que vous sauriez refaire seul sur un nouveau problème :

{cases}

Pour chaque case que vous hésitez à cocher, reprenez la partie correspondante et refaites son exercice sans regarder la solution. Les trois questions de la section « Vérifiez vos acquis » du module, sur le site, complètent ce bilan."""
