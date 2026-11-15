// Tous les ateliers de construction, par type : ceux des fondamentaux et ceux du bloc « Systèmes agentiques ».
import { ATELIERS as BASE } from './Ateliers.jsx';
import { ATELIERS_A } from './AteliersAgentiqueA.jsx';
import { ATELIERS_B } from './AteliersAgentiqueB.jsx';
import { ATELIERS_C } from './AteliersAgentiqueC.jsx';

export const ATELIERS = { ...BASE, ...ATELIERS_A, ...ATELIERS_B, ...ATELIERS_C };
