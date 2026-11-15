// Tous les ateliers, par type : ateliers de construction des fondamentaux et du bloc « Systèmes agentiques »,
// et ateliers de conception (types « conception_<leçon> »).
import { ATELIERS as BASE } from './Ateliers.jsx';
import { ATELIERS_A } from './AteliersAgentiqueA.jsx';
import { ATELIERS_B } from './AteliersAgentiqueB.jsx';
import { ATELIERS_C } from './AteliersAgentiqueC.jsx';
import { ATELIERS_CONCEPTION_M1 } from './AteliersConceptionM1.jsx';
import { ATELIERS_CONCEPTION_M2 } from './AteliersConceptionM2.jsx';
import { ATELIERS_CONCEPTION_M3 } from './AteliersConceptionM3.jsx';
import { ATELIERS_CONCEPTION_M6 } from './AteliersConceptionM6.jsx';
import { ATELIERS_CONCEPTION_M7 } from './AteliersConceptionM7.jsx';

export const ATELIERS = { ...BASE, ...ATELIERS_A, ...ATELIERS_B, ...ATELIERS_C, ...ATELIERS_CONCEPTION_M1, ...ATELIERS_CONCEPTION_M2, ...ATELIERS_CONCEPTION_M3, ...ATELIERS_CONCEPTION_M6, ...ATELIERS_CONCEPTION_M7 };
