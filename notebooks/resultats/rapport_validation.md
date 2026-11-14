# Rapport de validation : navigation autonome en entrepôt simulé

Formation ASCENT 4-130, module 6. Rapport généré automatiquement par le notebook `06_tests_validation`.

## 1. Identification

- Date : 2026-11-14
- Système testé : politique de descente du champ de distance, avec et sans évitement des obstacles perçus
- Bibliothèque : ascent_agents 1.0.0, PyTorch 2.15.0+cpu, Python 3.13.18
- Appareil de calcul : cpu
- Graine : 4130 (campagne reproductible)

## 2. Plan de test

- Carte : entrepôt de référence, 20 × 14 cellules, plus court chemin de 26 pas
- Échéance de mission : 45 étapes
- Missions par niveau et par version : 4000

| nom | domaine | glissement | rate_perception | n_obstacles |
|---|---|---|---|---|
| nominal | nominal | 0.000 | 0.000 | 0 |
| léger | nominal | 0.050 | 0.050 | 2 |
| dégradé | dégradé | 0.150 | 0.200 | 6 |
| sévère | dégradé | 0.300 | 0.400 | 10 |
| limite | limite | 0.450 | 0.600 | 16 |

Critères d'acceptation (comparés à la borne basse de l'intervalle de confiance à 95 %) :

| domaine | succès min | collisions max |
|---|---|---|
| nominal | 0.980 | 0.100 |
| dégradé | 0.600 | 2.500 |

## 3. Résultats de la campagne par lots

| niveau | domaine | version | succès | IC bas | IC haut | mission sûre | collisions | étapes (médiane) | étapes (p95) |
|---|---|---|---|---|---|---|---|---|---|
| nominal | nominal | avant correction | 1.000 | 0.999 | 1.000 | 1.000 | 0.000 | 26.000 | 26.000 |
| nominal | nominal | après correction | 1.000 | 0.999 | 1.000 | 1.000 | 0.000 | 26.000 | 26.000 |
| léger | nominal | avant correction | 0.984 | 0.980 | 0.987 | 0.705 | 1.722 | 28.000 | 37.000 |
| léger | nominal | après correction | 0.992 | 0.988 | 0.994 | 0.949 | 0.058 | 28.000 | 34.000 |
| dégradé | dégradé | avant correction | 0.880 | 0.870 | 0.890 | 0.345 | 4.536 | 33.000 | 43.000 |
| dégradé | dégradé | après correction | 0.938 | 0.930 | 0.945 | 0.652 | 0.659 | 32.000 | 41.000 |
| sévère | dégradé | avant correction | 0.531 | 0.516 | 0.546 | 0.172 | 5.925 | 39.000 | 45.000 |
| sévère | dégradé | après correction | 0.665 | 0.650 | 0.679 | 0.327 | 1.862 | 39.000 | 45.000 |
| limite | limite | avant correction | 0.065 | 0.058 | 0.073 | 0.026 | 6.133 | 43.000 | 45.000 |
| limite | limite | après correction | 0.096 | 0.087 | 0.106 | 0.044 | 3.083 | 43.000 | 45.000 |

## 4. Verdicts

| niveau | domaine | version | verdict | écarts |
|---|---|---|---|---|
| nominal | nominal | avant correction | conforme |  |
| nominal | nominal | après correction | conforme |  |
| léger | nominal | avant correction | NON CONFORME | succès (borne basse 98.0 %) sous le seuil de 98 % ; collisions (1.72) au dessus du seuil de 0.1 |
| léger | nominal | après correction | conforme |  |
| dégradé | dégradé | avant correction | NON CONFORME | collisions (4.54) au dessus du seuil de 2.5 |
| dégradé | dégradé | après correction | conforme |  |
| sévère | dégradé | avant correction | NON CONFORME | succès (borne basse 51.6 %) sous le seuil de 60 % ; collisions (5.93) au dessus du seuil de 2.5 |
| sévère | dégradé | après correction | conforme |  |
| limite | limite | avant correction | observation |  |
| limite | limite | après correction | observation |  |

**Décision pour la version corrigée : ACCEPTÉ dans les domaines nominal et dégradé.**

## 5. Campagne fine sur 30 entrepôts aléatoires

Conditions : densité 0.14, glissement 0.1, bruit du lidar 0.3, palette imprévue sur le plus court chemin.

| agent | succès (%) | IC à 95 % (%) | missions sans collision (%) | collisions (moyenne) | allongement médian | décision moyenne (ms) | décision max (ms) |
|---|---|---|---|---|---|---|---|
| réactif | 83.333 | [66 ; 93] | 63.333 | 1.533 | 1.107 | 0.002 | 0.383 |
| délibératif | 0.000 | [0 ; 11] | 3.333 | 8.067 | nan | 0.001 | 0.028 |
| hybride | 100.000 | [89 ; 100] | 96.667 | 0.033 | 1.179 | 0.023 | 0.769 |
| robuste | 100.000 | [89 ; 100] | 96.667 | 0.033 | 1.179 | 0.225 | 2.749 |

## 6. Échecs analysés

- Campagne par lots, niveau dégradé, mission n° 103 : 7 collision(s). Cause : obstacle mobile voisin non perçu, le robot avance sur la cellule occupée.
- Campagne fine : agent délibératif, entrepôt aléatoire 0. Trace conservée dans `resultats/m6-echec.json`.

## 7. Limites de cette validation

- Résultats obtenus en simulation uniquement : aucun essai sur robot réel.
- Monde discret (grille), obstacles mobiles à marche aléatoire, bruits indépendants d'une étape à l'autre. Un capteur réel présente des erreurs corrélées dans le temps.
- Une seule carte pour la campagne par lots. La campagne fine couvre 30 cartes, ce qui donne des intervalles de confiance larges.
- Le niveau « limite » n'a pas de critère d'acceptation : le système ne doit pas être exploité dans ces conditions.
