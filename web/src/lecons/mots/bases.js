import { BASES_BAYES } from './bayes.js';
import { BASES_SCIENTIFIQUES } from './bases-scientifiques.js';
import { BASES_AGENTIQUES } from './bases-agentiques.js';
import { COMPLEMENTS_DECISION } from './complements-decision.js';
import { COMPLEMENTS_ROBOTIQUE } from './complements-robotique.js';
import { COMPLEMENTS_AGENTIQUES } from './complements-agentiques.js';

// Pré-requis explicitement enseignés avant les termes spécialisés de chaque leçon.
// Chaque entrée possède sa définition et sa simulation, même si elle était absente du glossaire initial.
const introductions = { ...BASES_SCIENTIFIQUES, bayes: BASES_BAYES, ...BASES_AGENTIQUES };
const complements = { ...COMPLEMENTS_DECISION, ...COMPLEMENTS_ROBOTIQUE, ...COMPLEMENTS_AGENTIQUES };
export const BASES = Object.fromEntries(Object.entries(introductions).map(([id, bases]) => [id, [...bases, ...(complements[id] || [])]]));
