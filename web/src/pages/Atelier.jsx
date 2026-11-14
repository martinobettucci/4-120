import { useJSON } from '../composants/outils.jsx';
import Lecteur3D from '../composants/Lecteur3D.jsx';

export default function Atelier() {
  const { donnees } = useJSON('traces/index.json');
  return (
    <div className="page large">
      <p className="surtitre">Scène 3D explorable</p>
      <h1>Atelier 3D</h1>
      <p className="intro">Toutes les traces de référence de la formation, et les vôtres : toute trace exportée depuis un notebook avec <code>trace.enregistrer("ma_trace.json")</code> se rejoue ici. Comparez deux exécutions, isolez les capteurs, ouvrez la vue éclatée du robot.</p>
      {donnees ? <Lecteur3D catalogue={donnees} initialA="m5_robuste" hauteur={600} importer /> : <p>Chargement du catalogue…</p>}
      <div className="carte">
        <h3>Format commun des traces</h3>
        <p>Chaque étape d'une trace <code>ascent-4130-trace/1</code> contient : le numéro d'étape <code>t</code>, l'état de l'environnement <code>etat</code>, les <code>observation</code>s de l'agent, sa <code>decision</code> (raison, couche active, plan), l'<code>action</code> exécutée, le <code>resultat</code> (collision, glissement, arrivée) et les <code>metriques</code> de performance.</p>
      </div>
    </div>
  );
}
