# Support illustré ASCENT 4-130

[Ouvrir le PDF du programme](../../output/pdf/ASCENT-4-130-support-illustre.pdf).

Support complémentaire de théorie pour l'explication orale avant les ateliers : 108 pages au format paysage 16:9, sept chapitres, 39 notions et leurs exemples résolus. Les six modules du programme initial et le prolongement « Systèmes agentiques » sont tous couverts. Auteur et formateur : Martino Bettucci, P2Enjoy.

Le PDF contient un sommaire et des signets, des liens vers chaque leçon du module 0, les sept modules de pratique, les notebooks HTML et les références Wikipédia. Ses 39 exemples synthétiques ont leurs propres scénarios, données et résultats, distincts de ceux des exercices du site : conduites, serres, bibliothèque, musée, archives. Les pages d'exemples explicitent les hypothèses et proposent une question pour la discussion. Les exercices du site ne sont pas modifiés pour créer cette séparation.

## Sources modifiables

- `sources/programme.json` : instantané des données pédagogiques du site, produit par l'exporteur.
- `fabrication/editorial.py` : relations utiles, explications, hypothèses, questions et transitions vers les ateliers.
- `fabrication/exemples_pdf.py` : les 39 cas propres au PDF, leurs étapes de raisonnement, résultats, hypothèses, questions et données de schémas. Cette source remplace les exemples du site dans la fabrication du PDF.
- `fabrication/construire.py` : composition ReportLab, navigation et liens.
- `assets/figures/` : archive des schémas du site. Le PDF compose désormais ses 39 schémas vectoriels directement depuis les cas de `exemples_pdf.py`, pour conserver les mêmes valeurs entre figure et exemple sans importer celles des ateliers.
- `assets/` : couverture, sept ouvertures de chapitre, sept illustrations de pratique et une planche de direction visuelle.
- `sources/prompts-imagegen.json` : jeu complet des prompts et chemins des images, générées avec l'outil imagegen intégré. La planche a servi à préparer la direction visuelle ; elle ne constitue pas une source de faits ou de chiffres.

Les grandes illustrations servent de contexte ou de métaphore. Chaque schéma pédagogique et l'exemple résolu qui le suit utilisent les mêmes données propres au PDF. Ne pas réintroduire les scénarios du site lors d'un export : les règles durables du formateur sont dans `../../docs/consignes-production.md`.

## Reconstruire sans lancer l'application

Prérequis : Python, les polices système Noto Sans et DejaVu Sans, et les dépendances de `fabrication/requirements.txt`.

```bash
python -m pip install -r supports/pdf-programme/fabrication/requirements.txt
python supports/pdf-programme/fabrication/construire.py
python supports/pdf-programme/fabrication/verifier_exemples.py
python supports/pdf-programme/fabrication/verifier.py
```

Pour réexporter les données et les figures après une modification du site, installer d'abord les dépendances de `web/` selon le README principal, puis :

```bash
node supports/pdf-programme/fabrication/exporter.cjs
python supports/pdf-programme/fabrication/rendre_figures.py
python supports/pdf-programme/fabrication/construire.py
python supports/pdf-programme/fabrication/verifier.py
```

La fabrication ne démarre aucun service ni profil de l'application. Ne jamais utiliser PREPROD ou PROD pour ce travail.

Dans l'environnement de fabrication initial, les dépendances Python sont installées localement dans `.tmp/pdf-programme/deps`. Les commandes Python s'y lancent avec le préfixe `PYTHONPATH=.tmp/pdf-programme/deps`.

## Vérification

`verifier_exemples.py` vérifie la séparation des 39 exemples avec l'instantané du site et recalcule 55 résultats numériques. `verifier.py` contrôle la couverture des 39 notions, les dimensions, les liens internes, les URL, les glyphes extraits, les limites des pages et les recouvrements de paragraphes. Il rend chaque page dans `.tmp/pdf-programme/rendu/` et produit des planches de six pages à relire visuellement. Un contrôle technique ne remplace pas cette relecture.

Les rapports sont conservés dans `sources/verification-exemples.json`, `sources/verification-technique.json`, `sources/verification-liens.json` et `sources/relecture-visuelle.json`. L'inventaire complet est dans `sources/inventaire-pdf.json`. Les rendus temporaires ne font pas partie du livrable.
