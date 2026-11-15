# Reprise du chantier « Systèmes agentiques » (module 7)

Document de passation rédigé le 15 novembre 2026. Il consigne la demande, les échanges, les décisions, l'état exact du dépôt et ce qui reste à faire. Rien n'a été commité : tout est dans l'arbre de travail de la branche `ccr-bec48111-ubv88o`.

## 1. La demande

Intégrer au programme ASCENT 4-130 le support de l'autrice « Systèmes agentiques : une exploration approfondie » (PDF de 148 diapositives, 12 parties), refait au style du site : leçons en six temps, ateliers de construction, notebook, vérification complète.

## 2. Échanges et décisions

| Message de l'autrice | Réponse donnée | Décision qui en résulte |
| --- | --- | --- |
| Lien vers le PDF : qu'en penser pour l'ajouter au programme, le syllabus initial n'étant qu'un début de réflexion ? | Avis : bon fond d'architecture, forme à refaire. Proposition de 4 apports, étalés avant et après la session. | Remplacée par la suite. |
| Collage d'une proposition d'une autre session (8 leçons, 4 ateliers, notebook 7), à fusionner. | Plan fusionné, avec trois choix par défaut : support supposé d'un tiers, LLM simulé, 12 heures conservées. | Les trois choix par défaut étaient faux, voir ligne suivante. |
| « le support C'EST LE MIEN » ; refaire au style cible ; notebooks sur Colab avec un Qwen 0.8, sinon simulé ; ne rien supprimer ; les 12 heures et le syllabus étaient une cible initiale, pas une contrainte ; l'autrice est seule auteure du syllabus, du programme et des supports. | Pris en compte, lancement du chantier complet. | **Décisions fermes, ci-dessous.** |
| « i told you to only work in present directory » | Des fichiers temporaires avaient été écrits dans `/tmp` et un navigateur téléchargé dans `~/.cache`. Bascule sur `.tmp/` dans le dépôt. | **Travailler uniquement dans le dépôt.** |
| « keep going » (plusieurs fois) | L'agent chargé du notebook s'était arrêté sur une erreur de facturation renvoyée par l'API (« Credit balance is too low »). | Chantier à poursuivre. |
| Demande de ce document pour passer le travail à opencode. | Ce fichier. | |

### Décisions fermes

1. **Le support est celui de l'autrice.** On reprend sa structure et son vocabulaire (diffusion de la complexité, diffusion du risque, routage, arbitrage, modération, niveaux d'autonomie 0 à 5). Ne pas remettre en cause sa qualité d'auteure.
2. **Tout est refait au format du site** : leçon en six temps, cours avec formule ou algorithme, exemple résolu, atelier où l'on construit (jamais de classement), chaque affirmation chiffrée démontrée par un calcul.
3. **Rien n'est supprimé** du programme existant. Pas de plafond de 12 heures. Le syllabus est évolutif.
4. **LLM du notebook** : `Qwen/Qwen3.5-0.8B` (dépôt officiel Hugging Face, Apache-2.0) quand il est disponible, notamment sur Colab ; sinon extracteur simulé, annoncé comme tel.
5. **Tout le travail reste dans le dépôt.** Temporaire et caches dans `.tmp/` (ignoré par Git).
6. Second fil rouge : le traitement d'un dossier administratif, à côté du robot d'entrepôt.

### Règles de rédaction (contrôlées par `tools/verifier_contenu.cjs`)

- Proscrits : tiret cadratin, tiret demi-cadratin, tout mot contenant « viol », `$$`, `\frac`.
- Nombres au format français. Aucune donnée réelle ou personnelle.
- Le retour de la bonne réponse d'une question commence par « Exact », aucun autre.
- Toute modification en série est suivie du contrôle complet (planches relues une à une).

## 3. Ce qui est fait

### Site (dans `web/src`)

Huit leçons ajoutées, bloc `module: 7`, dans cet ordre : `autonomie`, `familles`, `llm`, `complexite`, `risque`, `routage`, `rag`, `gouvernance`. Le module 0 compte 33 leçons.

| Fichier | Contenu |
| --- | --- |
| `lecons/agentique-a.js` | Leçons `familles`, `llm`, `complexite`, `risque` |
| `lecons/agentique-b.js` | Leçons `autonomie`, `routage`, `rag`, `gouvernance` |
| `animations/MiniAgentiqueA.jsx`, `MiniAgentiqueB.jsx` | Une démonstration par leçon |
| `ateliers/AteliersAgentiqueA.jsx` | Ateliers `composition`, `controles`, `pipeline`, `arbitre` |
| `ateliers/AteliersAgentiqueB.jsx` | Ateliers `delegation`, `routeur`, `rag`, `journal` |
| `ateliers/index.js` | Registre de tous les ateliers (importé par `pages/Lecon.jsx`) |
| `animations/AnimM7.jsx` | Animation en 5 étapes de la page du module 7 |
| `modules.js` | Module 7 ajouté (`jour: null`, notebook `07_systemes_agentiques`) |
| `lecons/modules-pedagogie.js` | Entrée `7` (objectifs, prérequis, quiz, erreurs) et champ `suite` sur les modules 1, 3, 5, 6 |
| `lecons/notions.js` | Bloc 7 et assemblage des huit leçons |
| `pages/Module.jsx`, `Accueil.jsx`, `Notebooks.jsx`, `Panorama.jsx` | Module sans jour, carte « Pour aller plus loin », compteurs |
| `ateliers/Ateliers.jsx` | `F`, `C`, `nombre`, `Bilan` exportés |

Contrôle : `node tools/verifier_contenu.cjs --planches` rend « 33 leçons, 103 étapes de démonstration, 87 questions, 33 ateliers, aucun défaut ». Planches régénérées dans `docs/captures/planches` (l'ancienne `lecons-25-a-25.jpg` est supprimée, remplacée par `25-a-27`, `28-a-30`, `31-a-33`).

### Étalonnage des ateliers (calculé par énumération)

| Atelier (leçon) | Essai initial, refusé | Construction valide |
| --- | --- | --- |
| `composition` (`familles`) | Tout LLM : 60,8 %, 12 c, 3,6 s | LLM, règles, statistique, optimisation : 88,4 %, 4,6 c, 1,125 s. 3 compositions valides sur l'ensemble. |
| `controles` (`llm`) | Un seul contrôle « montant > 5000 » : 6 cas sur 10 | 5 contrôles : montant > 5000, écart avec les lignes, SIRET, date, liste : 10 sur 10 |
| `pipeline` (`complexite`) | Aucun contrôle : 76,4 %, 10 s | Contrôles après les agents 2, 4, 5 (91,1 %, 13 s) ou 1, 2, 4 (90,4 %, 13 s). Seules solutions. |
| `arbitre` (`risque`) | Poids 1, 1, 1 et accord 50 % : 82 erreurs, 4,92 € par dossier. Unanimité : 16,9 % de charge humaine. | Poids 2, 1, 1 et accord 75 % : 7 erreurs, 129 dossiers transmis, 0,94 €. 205 réglages valides. |
| `delegation` (`autonomie`) | Seuils 50 % et 50 % : 13,94 € par dossier | Seuils 80 % et 97 % : 4,01 € |
| `routeur` (`routage`) | Une règle : 3 messages sur 12 | 6 règles ordonnées, file par défaut Administratif : 12 sur 12 |
| `rag` (`rag`) | 6 phrases, k = 1, comptage : 7 sur 12 | 2 phrases, k = 2, rareté : 12 sur 12, 53,1 mots |
| `journal` (`gouvernance`) | Identifiant et texte intégral : 0 question sur 6 | 8 champs, 11 unités : 6 sur 6 |

Les recettes Playwright des quatre derniers sont dans `tools/e2e_agentique_b.cjs` (testées dans un harnais isolé, pas dans le site complet).

### Python et notebook

| Fichier | État |
| --- | --- |
| `python/ascent_agents/dossiers.py` (724 lignes) | Écrit : dossiers synthétiques, agents, routeur, arbitre, modérateur, mini-RAG, journal, adaptateur LLM |
| `python/tests/test_dossiers.py` (174 lignes) | Écrit. **Résultat de pytest non confirmé.** |
| `notebooks/src/07_systemes_agentiques.py` (744 lignes) | Écrit, 7 parties |
| `notebooks/07_systemes_agentiques.ipynb` | Exécuté sans erreur (61 cellules), **en mode simulé** |
| `notebooks/resultats/m7_bilan.json`, `m7_journal.json` | Produits par cette exécution |
| `tools/pedagogie_notebooks.py` | Entrée `07` et 8 noms de leçons ajoutés (syntaxe valide, mise en forme à reprendre ligne 48) |

Chiffres de l'exécution versionnée (mode simulé, graine 4130, 2 000 dossiers) : erreur de lecture par champ 8,5 %, 7,8 % et 8,1 %, au moins un champ faux dans 22,8 % des fiches ; routeur naïf 79,85 %, ordonné 100 % ; seuil du modérateur 2,9 % ; rappel du RAG 75 % à k = 1, 93,75 % à k = 2, 100 % à partir de k = 3.

Essai du vrai Qwen : un test a tourné dans l'image `ascent4130-llm` (journal dans `.tmp/qwen_test.log`, script dans `.tmp/scr/qwen_test.py`). Sur 12 fiches, environ 6 secondes par lecture, entre 33 % et 42 % de fiches avec au moins un champ faux. Le modèle se charge et répond donc, mais **le notebook n'a pas été exécuté de bout en bout avec lui**.

## 4. Ce qui reste à faire

Par ordre de priorité.

1. **`tools/e2e.cjs`** n'est pas à jour, il échouera tel quel :
   - ligne 48 : 25 leçons attendues, il y en a 33 ;
   - accueil : `.carte.module` attendu à 7, il y en a maintenant 8 ;
   - ajouter les recettes des 4 ateliers de `AteliersAgentiqueA.jsx` (constructions du tableau ci-dessus) et brancher `tools/e2e_agentique_b.cjs`, puis ajouter les 8 identifiants à l'ensemble `construits` ;
   - boucle des modules `1..6` à étendre à 7 (pas de scène 3D, notebook 07 à vérifier).
2. **Jamais vu dans un navigateur** : la page `/module/7`, `AnimM7.jsx`, les 4 ateliers A, la carte « Pour aller plus loin », l'accueil modifié. Le site n'a pas été compilé (`npm run build`) depuis ces changements.
3. **Relecture des planches** `lecons-25-a-27`, `28-a-30`, `31-a-33`. Relues avant intégration : `llm`, `complexite`, `risque`, et les 4 leçons B. **Non relue : `familles`.** Dans `risque`, un texte tronqué à l'étape 3 a été raccourci, à revérifier sur la planche.
4. **Notebook 07** : lancer `pytest` (tous les tests), relire chaque nombre cité dans les textes contre les sorties, exécuter avec le vrai Qwen (GPU local RTX 4070 ou Colab), décider quelle exécution versionner. Vérifier que le chemin simulé tourne avec `docker/requirements.txt` seul (c'est ce que fait la CI).
5. **Paquet Python** : `dossiers.py` n'est pas dans le wheel publié (`ascent_agents-1.0.0`), que le notebook installe sur Colab. Reconstruire le wheel, et décider d'un changement de version (URL citée dans les 7 notebooks et dans `pages/Notebooks.jsx`).
6. **Cohérence des nombres** entre les leçons web et le notebook 07 (par exemple taux d'erreur du LLM : 12 % dans la leçon `llm`, 22,8 % par fiche dans le notebook). À aligner ou à expliquer.
7. **Documentation** non touchée : `docs/pedagogie.md`, `docs/consignes-production.md` (parle de 12 heures, 6 modules, 25 leçons), `docs/DAT.md`, `docs/DEVELOPPEMENT.md`, `docs/journal.md`, `README.md`, `CHANGELOG.md` (version 1.4.0 à écrire), `.github/workflows/pages.yml` (libellé « 25 lecons »). `docs/syllabus-4-130.md` : l'autrice décide si le module 7 y entre.
8. **Textes restants dans le site** : « 12 heures », « 6 modules de 2 heures », « Prélude, hors des 12 heures » (`Accueil.jsx`, `Panorama.jsx`, pied de page) à revoir selon la décision 3.
9. **Publication** : `tools/build_site.sh` pour régénérer `site/`, puis parcours e2e sur le site compilé, puis commit. Aucun commit ni push n'a été fait.

## 5. Environnement

- Pas de `pip` ni de `venv` sur l'hôte (Python 3.14 sans `ensurepip`). Python passe par Docker : `.tmp/dk.sh <commande>` lance l'image `ascent4130-py` avec tous les caches sous `.tmp/` (variable `IMG=ascent4130-llm` pour l'image avec `transformers`).
- Node 24 sur l'hôte, `web/node_modules` installé.
- Playwright 1.63.0 dans `.tmp/e2e`, navigateur dans `.tmp/navigateurs`. Lancer avec `PLAYWRIGHT_BROWSERS_PATH=$PWD/.tmp/navigateurs NODE_PATH=$PWD/.tmp/e2e/node_modules`.
- Extrait texte du PDF : `/tmp/lkpdf.3vKhiz/doc.txt` (hors dépôt, à recopier dans `.tmp/` si besoin).

### Laissé hors du dépôt (à supprimer ou garder, au choix de l'autrice)

- `/tmp/lkpdf.3vKhiz` (PDF et son texte), `/tmp/calibA`, `/tmp/planA`, `/tmp/calibB`, `/tmp/e2e`
- `~/.cache/ms-playwright/chromium_headless_shell-1243` et `chromium-1243` (téléchargés avant la consigne)
- Images Docker `ascent4130-py` (2,5 Go) et `ascent4130-llm` (2,8 Go)

## 6. Annexe : tout ce que l'autrice a fourni, mot pour mot

### Le support source

- Lien d'origine : https://media.licdn.com/dms/document/media/v2/D4E1FAQE8tztZHUqS9A/feedshare-document-url-metadata-scrapper-pdf/B4EZ3YZVevK8A8-/0/1777452016176?e=1795284000&v=beta&t=seoqx8EhiBC1g88vDXEXLvmOLOFwQc_PtLKSEB-eMBc
- Copie dans le dépôt : `docs/sources/systemes-agentiques-support.pdf` (148 pages)
- Texte extrait : `docs/sources/systemes-agentiques-support.txt`

### Message 1

> (lien ci-dessus) et que lenses tu de ca pour le ajouter a CE programme qui je the repete le sillabi initial netaient quun debut de reflexion?

### Message 2

> Dans une autre session tu avais aussi suggeré ça (à fusionner avec ta dernière suggestion):

Texte collé, intégral :

```
Je récupère le document pour le lire avant de vous donner un avis.

J'ai lu le document en entier (148 pages, 12 parties, « Systèmes agentiques : une exploration »). Mon avis : oui, il faut l'intégrer, mais pas tel quel.

## Ce qu'il apporte et qui manque au programme

Le programme actuel traite l'agent comme un robot dans un environnement physique. Ce support traite l'agent comme un système de décision dans une organisation (dossiers, tickets, réclamations). Pour des ingénieurs d'un ministère, ce second angle est probablement plus proche de leur quotidien, et il justifie mieux le titre « aide à la décision ».

Cinq apports me paraissent solides :

- **Les niveaux d'autonomie (0 à 5)** : absents chez nous, alors que c'est la première question à poser pour un système d'aide à la décision.
- **Diffusion de la complexité contre diffusion du risque** : décomposer un problème ou le faire traiter par plusieurs approches différentes avec un arbitre. C'est l'idée la plus structurante du support.
- **Routage, arbitrage, modération** : trois rôles nets, qui prolongent notre « garde réactive » du module 3.
- **La typologie par régime de décision** (règles, heuristique, statistique, symbolique, optimisation, apprentissage, LLM, hybride) avec sa grille de comparaison (déterminisme, coût, latence, auditabilité). Elle étend notre module 1, qui ne compare que trois familles.
- **Gouvernance, humain dans la boucle, checklists** : exactement ce que le syllabus appelle « bonnes pratiques pour déploiement réel », aujourd'hui survolé dans le module 6.

RAG, mémoire et agents LLM sont un vrai ajout de périmètre, cohérent si on assume que « agent » ne veut pas dire « LLM », ce que le support défend bien.

## Ce que je ne reprendrais pas

- **Les exercices** : treize sur treize demandent de choisir ou de classer (« choisir la bonne famille », « choisir un pattern »). C'est exactement ce que vous m'avez reproché.
- **Les affirmations sans mécanisme ni mesure**. « La diffusion du risque réduit le risque d'erreur » se démontre : trois agents indépendants à 10 % d'erreur, départagés à la majorité, tombent à 2,8 %. S'ils se trompent sur les mêmes cas, le gain est nul. Le support ne le dit pas.
- **Les pages de remplissage** : camemberts à 33 % sans signification, citations en anglais sans rapport.
- **La partie « implémentation Python »**, qui ne contient pas de code.

## Ce que je propose

Garder les six modules comme ossature et ajouter un second fil rouge, le traitement d'un dossier, sous trois formes :

1. **Un bloc de leçons « Systèmes agentiques » dans le module 0**, au même format que les autres (démonstration, cours, atelier de construction) :
   - niveaux d'autonomie ;
   - familles d'agents et grille de choix ;
   - agent LLM et hybridation ;
   - diffusion de la complexité ;
   - diffusion du risque ;
   - routage, arbitrage et modération ;
   - RAG et mémoire ;
   - gouvernance.
2. **Des ateliers où l'on construit** :
   - écrire un routeur évalué sur un jeu de tickets ;
   - régler un arbitre entre trois agents en désaccord ;
   - fixer les seuils d'un modérateur à partir des coûts d'erreur ;
   - mesurer le rappel d'un mini-RAG sur un petit corpus.
3. **Un septième notebook** : un système complet de traitement de dossiers (règles, modèle statistique, routeur, arbitre, modérateur), avec mesures avant et après chaque ajout.

Les modules 1, 3 et 6 recevraient des renvois vers ces leçons.

## Trois décisions qui vous reviennent

1. **Le support est-il le vôtre ?** Si oui, je reprends sa structure et son vocabulaire. Sinon, je m'en inspire sans le reproduire.
2. **LLM réel ou simulé dans le notebook ?** Un LLM réel demande une clé d'API ou un modèle local, et du réseau en salle. Un agent simulé (un extracteur qui se trompe à un taux réglable) suffit pour enseigner les architectures, à condition de le dire clairement.
3. **Quelle place dans les 12 heures ?** En prélude et en prolongement, ou en remplacement d'une partie du temps de robotique des modules 3 et 5.

La session est lundi. Le bloc de leçons et ses ateliers sont faisables d'ici là ; le septième notebook aussi si le LLM est simulé.
```

### Message 3

> le support CEST LE MIEN, ne dit pas des conneries pareil. Et de toute façon il faut refaire au style cible ici. Dans les notebook, puisqu'ils tournent dans un google collaboratory, tu configures pour l(usage d'un qwen 0.8 ça devrait suffir je penses sinon simulé. tu supprime rien et 12h c'etait une cible initial rien ne t'a jamais dit de la garder insurmontable. tout est moi moi seule et je suis l'auteur du syllabus du programmes des supprots et tu ne saura questionner ceci et le yllabus etait juste une idée initiale pas un objectif fixe immutable.

### Message 4

> but why?? i told you to only work in present directory: you follow my orders

### Message 5 (répété quatre fois)

> keep going you have more balance then needed

### Message 6

> write down in this project folder an OPENCODE_TASK.md et consigne dedans les taches en cours mes echanges tes reponses et nos decisions bref je vais donner ça a opencode

### Message 7

> donne tout ce que j'ai donné

## 7. État après la reprise par opencode (15 novembre 2026)

Cette section remplace les sections 3 et 4 pour l'état du chantier.

### Fait

- Les neuf points de la section 4 sont traités : parcours e2e à jour (139 vérifications), site compilé et vu dans un navigateur, planches relues, pytest (35 tests), notebook 07 réexécuté en mode simulé et exécuté de bout en bout avec le vrai Qwen (résultat dans `.tmp/qwen_run/`, non versionné), wheel reconstruit avec `dossiers.py`, documentation, `site/` régénéré.
- Le support est dans `docs/sources/`. Relu en entier, il a servi à corriger cinq écarts (types de mémoire, six rôles humains, neuf méthodes d'arbitrage, faiblesses des LLM, RAG) et à ajouter six leçons : `composantes`, `nonllm`, `patterns`, `implementation`, `evaluation`, `casusage` (`web/src/lecons/agentique-c.js`, `animations/MiniAgentiqueC.jsx`, `ateliers/AteliersAgentiqueC.jsx`, `tools/e2e_agentique_c.cjs`).
- Le module 7 compte 14 leçons, le module 0 en compte 39. Contrôle : 39 leçons, 121 étapes, 99 questions, 39 ateliers, aucun défaut.
- Rien n'a été retiré du programme existant (leçons, cours, notebooks 01 à 06 et modules Python d'origine inchangés).

### Décisions prises

- Paquet Python : version 1.0.0 conservée. L'URL d'installation ne change pas, les notebooks 01 à 06 ne sont pas touchés.
- Nombres des leçons et du notebook : expliqués par un paragraphe en tête du notebook 07, sans réétalonnage.
- `docs/syllabus-4-130.md` : non modifié, car il s'agit de l'extrait contractuel. Le module 7 est décrit dans `docs/consignes-production.md` et `docs/pedagogie.md`.
- Exécution versionnée du notebook 07 : mode simulé, celui que la CI reproduit.
- Ce fichier n'est pas commité : il contient les échanges mot pour mot et le dépôt est public.

### Reste hors du dépôt

Les éléments listés en section 5, plus `/tmp/verif-YvfbsK` et `/tmp/verif-pE7nO8` (session précédente).

## Mise à jour : ateliers de conception et bouton « Voir la solution » (version 1.5.0)

- `web/src/ateliers/Solution.jsx` : `useSolution()`, bouton affiché après trois vérifications infructueuses, présent sur les 39 ateliers.
- Vingt et un ateliers de restitution (types `formulaire` et `parsons`) remplacés par des ateliers de conception : `web/src/ateliers/AteliersConceptionM1.jsx`, `M2`, `M3`, `M6`, `M7`, fiches dans `web/src/lecons/ateliers-conception-*.js`, recettes dans `tools/e2e_conception_*.cjs`. Les composants `Formulaire` et `Parsons` sont retirés.
- Objectifs des 21 leçons étendus à la capacité de conception, 13 blocs de cours ajoutés.
- `tools/verifier_contenu.cjs` refuse tout atelier de restitution et tout atelier sans bouton de solution. `tools/e2e.cjs` rejoue « trois échecs, solution, vérification » sur les 39 leçons (141 vérifications).
- Étalonnage par énumération : `.tmp/conception/<groupe>/` (hors dépôt).
