// Recettes de bout en bout des ateliers de conception du module 7 (systèmes agentiques).
// Chaque fonction part de l'atelier dans son état initial : un ou plusieurs essais insuffisants doivent être
// refusés (.bilan.faux), puis une construction correcte, saisie par l'interface, doit être validée (.bilan.juste).
// `zone` est une page Playwright ou le localisateur de l'atelier : const recettes = require('./e2e_conception_m7.cjs'); await recettes[id](zone).
const verifier = (zone) => zone.locator('[data-testid=verifier]').click();
const refuse = async (zone, extrait) => (await zone.locator('.bilan.faux').count()) === 1 && (!extrait || (await zone.locator('.bilan.faux').textContent()).includes(extrait));
const valide = async (zone) => (await zone.locator('.bilan.juste').count()) === 1 && (await zone.locator('.banc td.ko').count()) === 0;
const cocher = async (zone, noms) => { for (const nom of noms) await zone.getByLabel(nom, { exact: true }).check(); };
const decocher = async (zone, noms) => { for (const nom of noms) await zone.getByLabel(nom, { exact: true }).uncheck(); };
const choisir = (zone, nom, valeur) => zone.getByLabel(nom, { exact: true }).selectOption(valeur);

module.exports = {
  // Agent de ressources humaines : l'état initial ne fait que répondre (chatbot), puis l'agent sans planning vide l'équipe,
  // puis l'agent complet qui exécute tout seul inscrit trois congés longs sans validation. Enfin, les congés longs sont soumis.
  composantes: async (zone) => {
    await verifier(zone);
    const chatbot = (await refuse(zone, 'chatbot')) && (await zone.locator('.banc td.ok').count()) === 3;
    await cocher(zone, ['Les décisions de la responsable sur les demandes soumises', 'Le solde de congés de chacun', 'Refuser si le solde ne couvre pas la durée demandée', "Refuser si l'équipe passe sous 3 présents un des jours demandés", 'Inscrire le congé au planning et débiter le solde', 'Transmettre la demande à la responsable']);
    await choisir(zone, "Ce qu'il exécute seul", 'courts');
    await verifier(zone);
    const sansPlanning = await refuse(zone, 'il reste moins de 3 personnes présentes');
    await cocher(zone, ["Le planning des absences de l'équipe"]);
    await choisir(zone, "Ce qu'il exécute seul", 'tout');
    await verifier(zone);
    const toutSeul = await refuse(zone, 'sans que la responsable les voie');
    await choisir(zone, "Ce qu'il exécute seul", 'courts');
    await verifier(zone);
    return { refuse: chatbot && sansPlanning && toutSeul, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 16 };
  },
  // Fonction traiter : le programme naïf s'arrête sur une exception, puis le programme correct qui ne journalise
  // qu'à la fin laisse un journal vide quand un agent tombe en panne. Enfin, une ligne de journal après chaque étape.
  implementation: async (zone) => {
    await verifier(zone);
    const naif = (await refuse(zone, 'exception')) && (await zone.locator('.banc td.ok').count()) === 1;
    await choisir(zone, "Dossier qu'aucune règle de routage ne reconnaît", 'humain');
    await choisir(zone, 'Agent qui lève une exception', 'escalader');
    await choisir(zone, 'Avis en désaccord', 'escalader');
    await choisir(zone, 'Appel du modérateur', 'avant');
    await choisir(zone, 'Écriture dans le journal', 'etape');
    await verifier(zone);
    const avant = await refuse(zone, 'compte bancaire en clair');
    await choisir(zone, 'Appel du modérateur', 'apres');
    await choisir(zone, 'Écriture dans le journal', 'fin');
    await verifier(zone);
    const fin = (await refuse(zone, "ne dit pas où le traitement s'est arrêté")) && (await zone.locator('.banc td.ok').count()) === 3;
    await choisir(zone, 'Écriture dans le journal', 'etape');
    const programme = (await zone.locator('[data-testid=programme]').textContent()).includes('journal.noter(etape="avis", panne=agent.nom)');
    await verifier(zone);
    return { refuse: naif && avant && fin, valide: (await valide(zone)) && programme && (await zone.locator('.banc td.ok').count()) === 6 };
  },
  // Dispositif d'évaluation : les trois compteurs du journal ne révèlent rien, tous les instruments dépassent le budget.
  // Enfin, les deux bancs, le sondage, la revue des blocages et le suivi du délai : cinq défauts révélés en 15 jours.
  evaluation: async (zone) => {
    await verifier(zone);
    const compteurs = (await refuse(zone, 'laisse voir')) && (await zone.locator('.banc td.ko').count()) === 5;
    await cocher(zone, ['Suivi du délai de traitement', 'Enquête de satisfaction auprès des équipes', 'Banc de 1 000 messages étiquetés, rejoué par le routeur', 'Contrôle humain par sondage de 200 accords unanimes', 'Revue humaine des actions bloquées', 'Banc de 100 actions à risque connues, rejoué par le modérateur']);
    await verifier(zone);
    const tout = (await refuse(zone, '20 jours pour 16')) && (await zone.locator('.banc td.ko').count()) === 1;
    await decocher(zone, ['Comptage des retours entre files', 'Comptage des désaccords entre agents', 'Comptage des actions bloquées', 'Enquête de satisfaction auprès des équipes']);
    await verifier(zone);
    return { refuse: compteurs && tout, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 6 };
  },
  // Système complet : l'état initial manque quatre exigences, puis « trois avis sur tous les dossiers » est refusé pour
  // son coût, puis « le LLM décide » pour la justification. Enfin, le vote réservé aux dossiers à risque et le LLM en interface.
  casusage: async (zone) => {
    await verifier(zone);
    const initial = (await refuse(zone)) && (await zone.locator('.banc td.ko').count()) === 4;
    await choisir(zone, 'Diffusion du risque', 'tous');
    await cocher(zone, ['Contrôle après Extraction', 'Contrôle après Scoring']);
    await choisir(zone, 'Rôle du LLM', 'interface');
    await choisir(zone, 'La modération contrôle en sortie', 'perso');
    await zone.getByLabel('Seuil de confiance', { exact: true }).fill('95');
    await verifier(zone);
    const tous = (await refuse(zone, 'Trois avis sur tous les dossiers')) && (await zone.locator('.banc td.ko').count()) === 1;
    await choisir(zone, 'Diffusion du risque', 'risque');
    await choisir(zone, 'Rôle du LLM', 'decision');
    await verifier(zone);
    const llm = (await refuse(zone, 'Le LLM rend la décision')) && (await zone.locator('.banc td.ko').count()) === 1;
    await choisir(zone, 'Rôle du LLM', 'interface');
    await verifier(zone);
    return { refuse: initial && tous && llm, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 5 };
  },
};
