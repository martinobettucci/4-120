import { useEffect, useState } from 'react';

// Progression de l'apprenant, conservée dans le navigateur (aucune donnée n'est envoyée).
const CLE = 'ascent4130-progression';
const lire = () => { try { return JSON.parse(localStorage.getItem(CLE)) || {}; } catch { return {}; } };
let etat = lire();
const abonnes = new Set();

export function marquer(id, champ, valeur = true) {
  etat = { ...etat, [id]: { ...(etat[id] || {}), [champ]: valeur } };
  try { localStorage.setItem(CLE, JSON.stringify(etat)); } catch { /* stockage indisponible : la page fonctionne sans */ }
  abonnes.forEach((f) => f(etat));
}
export function reinitialiser() {
  etat = {};
  try { localStorage.removeItem(CLE); } catch { /* idem */ }
  abonnes.forEach((f) => f(etat));
}
export function useProgression() {
  const [p, setP] = useState(etat);
  useEffect(() => { abonnes.add(setP); return () => abonnes.delete(setP); }, []);
  return p;
}
