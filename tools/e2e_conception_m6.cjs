// Recettes de bout en bout des ateliers de conception des modules 5 et 6.
// Chaque fonction part de l'atelier dans son état initial : un ou plusieurs essais insuffisants
// doivent être refusés (.bilan.faux), puis une construction correcte, saisie par l'interface,
// doit être validée (.bilan.juste). « zone » est la page ou le localisateur qui contient l'atelier.
const verifier = (zone) => zone.locator('[data-testid=verifier]').click();
const refuse = async (zone, extrait) => (await zone.locator('.bilan.faux').count()) === 1 && (await zone.locator('.bilan.faux').textContent()).includes(extrait);
const valide = async (zone) => (await zone.locator('.bilan.juste').count()) === 1 && (await zone.locator('.banc td.ko').count()) === 0;
const regler = (zone, nom, valeur) => zone.getByLabel(nom, { exact: true }).fill(String(valeur));

module.exports = {
  // Exploration : jamais d'exploration d'abord (l'agent reste sur le couloir A), puis toujours explorer
  // (il connaît le meilleur couloir sans l'exploiter), puis une décroissance sans plancher (le couloir
  // dégagé n'est pas détecté), enfin ε de 1 à 0,08 par facteur 0,98.
  exploration: async (zone) => {
    await verifier(zone);
    const jamais = await refuse(zone, 'jamais quitté le couloir A');
    await regler(zone, 'ε initial', 1);
    await verifier(zone);
    const toujours = await refuse(zone, "ne l'exploite pas");
    await regler(zone, 'Décroissance', 0.98);
    await verifier(zone);
    const fige = await refuse(zone, "une chance d'y retourner");
    await regler(zone, 'Plancher', 0.08);
    await verifier(zone);
    return { refuse: jamais && toujours && fige, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 4 };
  },
  // Campagne : 50 simulations et taux mesuré au-dessus de 85 % d'abord (l'agent insuffisant passe 44 fois
  // sur 100), puis la borne basse sur 50 simulations (le bon agent est refusé), puis 600 simulations
  // (budget dépassé), enfin 200 simulations et borne basse au-dessus de 85 %.
  confiance: async (zone) => {
    await verifier(zone);
    const naif = (await refuse(zone, "L'agent insuffisant passe trop souvent")) && (await zone.locator('.banc').textContent()).includes('44,0 %');
    await zone.getByLabel("Règle d'acceptation", { exact: true }).selectOption('borne');
    await verifier(zone);
    const court = await refuse(zone, 'écarte trop souvent un agent qui convient');
    await regler(zone, 'Simulations', 600);
    await verifier(zone);
    const cher = await refuse(zone, 'Le budget est dépassé de 350 simulations');
    await regler(zone, 'Simulations', 200);
    await verifier(zone);
    return { refuse: naif && court && cher, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 3 };
  },
  // Plan de test : trois niveaux nominaux d'abord (les deux agents passent), puis un niveau limite hors
  // du domaine d'emploi (les deux échouent), puis les bons niveaux avec 95 % exigés partout (l'agent
  // robuste est refusé), enfin des seuils de 95 %, 80 % et 60 %.
  robustesse: async (zone) => {
    const niveau = async (nom, bruit, glissement, chariots, seuil) => { for (const [champ, v] of [['Bruit', bruit], ['Glissement', glissement], ['Chariots', chariots], ['Seuil', seuil]]) await regler(zone, `${champ} ${nom}`, v); };
    await verifier(zone);
    const confondus = await refuse(zone, 'Vos trois niveaux se confondent');
    await niveau('dégradé', 10, 45, 16, 95);
    await niveau('limite', 20, 80, 30, 95);
    await verifier(zone);
    const hors = (await refuse(zone, "sort du domaine d'emploi")) && (await refuse(zone, 'cet échec ne prouve rien'));
    await niveau('dégradé', 5, 15, 4, 95);
    await niveau('limite', 10, 45, 16, 95);
    await verifier(zone);
    const severe = await refuse(zone, "Votre plan refuse l'agent robuste au niveau dégradé");
    await regler(zone, 'Seuil dégradé', 80);
    await regler(zone, 'Seuil limite', 60);
    await verifier(zone);
    return { refuse: confondus && hors && severe, valide: (await valide(zone)) && (await zone.locator('.banc td.ok').count()) === 6 };
  },
  // Rejeu : graine au lancement et seul le bilan d'abord (l'essai n° 37 ne se rejoue pas seul), puis la
  // même graine avec tout le nécessaire (le rejeu reproduit l'essai n° 1), puis la même graine à chaque
  // essai (3 déroulements), puis une graine neuve avec la trace complète (stockage dépassé), enfin
  // une graine neuve fixée avant le scénario, avec graine, paramètres, version et bilan.
  graine: async (zone) => {
    const mode = (m) => zone.getByLabel('Fixer la graine', { exact: true }).selectOption(m);
    await verifier(zone);
    const bilanSeul = (await refuse(zone, "ouvre la campagne entière, pas l'essai n° 37")) && (await refuse(zone, 'Les paramètres du scénario ne sont pas conservés'));
    for (const nom of ["Graine de l'essai", 'Paramètres du scénario', "Version de l'agent"]) await zone.getByLabel(nom, { exact: true }).check();
    await verifier(zone);
    const lancement = (await refuse(zone, "ceux de l'essai n° 1")) && !(await zone.locator('.bilan.faux').textContent()).includes('ne sont pas conservés');
    await mode('constante');
    await verifier(zone);
    const repete = await refuse(zone, 'ne compte que 3 déroulements différents');
    await mode('avant');
    await zone.getByLabel('Trace complète, pas à pas', { exact: true }).check();
    await verifier(zone);
    const lourd = await refuse(zone, 'Le plafond de stockage est dépassé');
    await zone.getByLabel('Trace complète, pas à pas', { exact: true }).uncheck();
    await verifier(zone);
    return { refuse: bilanSeul && lancement && repete && lourd, valide: (await valide(zone)) && (await zone.locator('.bilan.juste').textContent()).includes("L'essai n° 37 se rejoue seul") };
  },
};
