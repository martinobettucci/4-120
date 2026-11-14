# Dossier d'architecture technique

ASCENT 4-130, Les agents autonomes et aide à la décision. Version 1.0.0, 14 novembre 2026.

## 1. Contexte et objectifs

Le projet fournit les supports d'une formation de 12 heures : un site interactif, six notebooks et une bibliothèque Python. Trois exigences structurent l'architecture :

- **Synchronisation** : un même exemple doit pouvoir être expliqué par une animation, exécuté dans un notebook et rejoué dans une scène 3D.
- **Reproductibilité** : mêmes graines, mêmes résultats, sur GPU comme sur CPU.
- **Autonomie en salle** : le site est statique, sans serveur applicatif ni dépendance réseau au moment de l'exécution, et les notebooks embarquent leurs résultats pré-calculés.

## 2. Vue d'ensemble

```
                     python/ascent_agents (bibliothèque)
                    /            |                \
        notebooks/src/*.py   tools/export_*.py   tests pytest
               |                 |
     tools/build_notebooks.py    |
               |                 v
     notebooks/*.ipynb     web/public/traces/*.json
     web/public/notebooks  web/public/data/*.json
               \                 /
                web/ (React, Vite, Three.js)
                         |
                  web/dist (site statique)
                 /                    \
        GitHub Pages             nginx (recette, production)
```

Le sens des dépendances est unique : la bibliothèque Python produit des données, le site les consomme. Le site ne calcule rien de ce qui relève des algorithmes de la formation, à l'exception de deux animations d'intuition (filtre bayésien dans un couloir, paysage de coût du recuit) dont les équations sont celles des notebooks.

## 3. Composants

### 3.1 Bibliothèque `ascent_agents`

| Module | Responsabilité |
| --- | --- |
| `monde.py` | Entrepôt sur grille : carte statique, chariots mobiles, événements imprévus, lidar à 8 rayons, bruit, glissement, champ de distance |
| `agents.py` | A*, agents réactif, délibératif et hybride |
| `simulation.py` | Boucle perception, décision, action et production des traces |
| `traces.py` | Format commun `ascent-4130-trace/1`, sérialisation et validation |
| `incertitude.py` | Filtre bayésien discret, agents naïf et robuste |
| `lot.py` | Simulations parallèles et Q-learning vectorisé en PyTorch (GPU ou CPU) |
| `decision.py` | Règles, réseau bayésien, classifieur supervisé, jeux de données synthétiques |
| `optim.py` | Problème de tournée, CP-SAT (OR-Tools), recuit simulé séquentiel et par lots |
| `visualisation.py` | Dessins Matplotlib partagés par les notebooks |
| `materiel.py` | Détection du GPU, graines aléatoires |

Les dépendances obligatoires se limitent à NumPy et Matplotlib. PyTorch et OR-Tools sont déclarés dans l'option `complet`.

### 3.2 Format de traces

Une trace est un fichier JSON :

```json
{
  "schema": "ascent-4130-trace/1",
  "meta": { "id": "...", "module": 3, "titre": "...", "agent": "hybride", "parametres": { "graine": 4130 } },
  "monde": { "largeur": 20, "hauteur": 14, "murs": [[0, 0]], "rayonnages": [[3, 3]], "depart": [1, 1], "objectif": [18, 10], "portee_lidar": 5 },
  "etapes": [
    {
      "t": 0,
      "etat": { "robot": [1, 1], "chariots": [[8, 7]], "palettes": [] },
      "observation": { "lidar": { "N": 1, "NE": 1, "E": 6 }, "position": [1, 1], "position_estimee": [1, 1], "croyance": [[1, 1, 1.0]] },
      "decision": { "couche": "deliberative", "raison": "...", "plan": [[1, 1], [1, 2]] },
      "action": "S",
      "resultat": { "action_executee": "S", "glissement": false, "collision": false, "arrive": false, "evenements": [] },
      "metriques": { "distance": 1, "collisions": 0, "temps_decision_ms": 0.01, "distance_objectif": 25 }
    }
  ],
  "bilan": { "succes": true, "etapes": 32, "collisions": 0, "position_finale": [18, 10] }
}
```

Les champs `position_estimee` et `croyance` ne sont présents que pour les agents qui maintiennent une croyance. Le site valide le champ `schema` avant tout rejeu.

### 3.3 Notebooks

Les sources sont des fichiers Python au format « percent » (`notebooks/src/`), convertis et exécutés par `tools/build_notebooks.py`. Ce choix rend les relectures et les comparaisons Git lisibles. Les fichiers `.ipynb` exécutés sont versionnés : ils constituent la solution de repli en salle.

Chaque notebook commence par une cellule d'installation (sans effet si la bibliothèque est déjà présente), puis par la détection du matériel. Le GPU sert aux calculs tensoriels : entraînement et inférence (modules 1 et 5), chaînes de recuit parallèles (module 4), campagnes de simulation (module 6). Les algorithmes séquentiels restent sur CPU.

### 3.4 Site

| Élément | Fichier | Rôle |
| --- | --- | --- |
| Scène 3D | `web/src/scene/Scene3D.js` | Rendu Three.js d'une ou deux traces, couches explicatives, vue éclatée |
| Lecteur | `web/src/composants/Lecteur3D.jsx` | Transport (lecture, pause, étape, retour), comparaison, import, panneau de décision |
| Cadre d'animation | `web/src/composants/Animation.jsx` | Étapes, lecture automatique, navigation au clavier |
| Animations | `web/src/animations/AnimM1.jsx` à `AnimM6.jsx` | Une séquence par module |
| Contenu | `web/src/modules.js`, `docs/*.md` | Texte des modules, syllabus et consignes (source unique, rendue par `marked`) |

Le routage utilise des ancres (`HashRouter`) et une base relative : le même site fonctionne sous `https://<compte>.github.io/<dépôt>/`, derrière nginx ou ouvert depuis un simple serveur de fichiers.

## 4. Environnements

| Environnement | Composition | Particularités |
| --- | --- | --- |
| Développement | `docker/docker-compose.dev.yml` : `seed`, `web` (Vite), `jupyter`, profils `tests` et `e2e` | Autonome, auto-alimenté, sans secret |
| Recette | `docker/docker-compose.staging.yml` : image `Dockerfile.site` (nginx) | Variables dans `.env.staging` |
| Production | `docker/docker-compose.prod.yml` : même image | Variables dans `.env.prod` |
| GitHub Pages | `.github/workflows/pages.yml` | Publication de référence |

## 5. Chaîne de publication

1. Tests unitaires (`pytest`).
2. `tools/seed.py` : traces, données, notebooks exécutés, paquet Python.
3. `npm run build` : compilation du site.
4. `tools/e2e.cjs` : parcours Playwright sur le site compilé.
5. Publication de `web/dist` sur GitHub Pages (uniquement depuis la branche par défaut).

Un échec à l'une des étapes 1 à 4 bloque la publication.

## 6. Choix d'architecture et alternatives écartées

| Décision | Raison | Alternative écartée |
| --- | --- | --- |
| Simulateur sur grille écrit pour la formation | Lisible en quelques minutes, déterministe, exécutable partout | Isaac Lab, Gazebo : environnement lourd, incompatible avec un poste standard ou un notebook hébergé |
| Animations SVG programmées | Pause, navigation par étape, données réelles des notebooks | Vidéos Manim : non interactives, à régénérer à chaque changement |
| Three.js sans surcouche | Contrôle fin du rendu et des couches, peu de dépendances | react-three-fiber : confort d'écriture, mais une dépendance de plus à maintenir |
| Site statique | Aucune panne de serveur possible en salle | Application avec serveur de calcul |
| Sources de notebooks au format « percent » | Comparaisons Git lisibles, génération reproductible | Édition directe des `.ipynb` |
| Traces JSON | Lisibles, inspectables par les apprenants | Format binaire plus compact |

## 7. Sécurité et données

- Aucune donnée réelle : tous les jeux de données sont synthétiques et générés à partir de graines.
- Aucun secret dans le dépôt ni dans les fichiers `.env`.
- JupyterLab sans jeton est réservé au profil de développement local.
- Le site ne collecte aucune donnée et ne charge aucune ressource tierce.

## 8. Limites connues

- Le simulateur est discret (grille, quatre directions) : il illustre les concepts, sans représenter la dynamique d'un robot réel.
- Les accélérations GPU n'ont pas été mesurées dans l'environnement de construction, qui ne dispose pas de GPU. Les notebooks affichent le débit mesuré sur la machine d'exécution.
- Le rendu 3D demande WebGL. Sur un poste sans accélération graphique, la scène reste utilisable mais moins fluide.
