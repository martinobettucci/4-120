"""Bibliotheque pedagogique ASCENT 4-130 : agents autonomes et aide a la decision.

Fil rouge : un robot autonome dans un entrepot logistique simule.
"""

__version__ = "1.0.0"

from .materiel import detecter_appareil, fixer_graines  # noqa: F401
from .monde import ACTIONS, Entrepot, creer_scenario, lister_scenarios  # noqa: F401
from .traces import Trace, charger_trace  # noqa: F401
from .simulation import simuler  # noqa: F401
