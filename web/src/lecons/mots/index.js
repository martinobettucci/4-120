import { MODULE1 } from './module1.js';
import { MODULES23 } from './modules23.js';
import { MODULES456 } from './modules456.js';
import { AGENTIQUE1 } from './agentique1.js';
import { AGENTIQUE2 } from './agentique2.js';
import { AGENTIQUE3 } from './agentique3.js';
import { AGENTIQUE4 } from './agentique4.js';
import { BASES } from './bases.js';
const VOCABULAIRE = { ...MODULE1, ...MODULES23, ...MODULES456, ...AGENTIQUE1, ...AGENTIQUE2, ...AGENTIQUE3, ...AGENTIQUE4 };
export const MOTS_ANIMES = Object.fromEntries(Object.entries(VOCABULAIRE).map(([id, mots]) => {
  const bases = BASES[id] || [];
  return [id, [...bases, ...mots.filter((m) => !bases.some((b) => b.nom === m.nom))]];
}));
