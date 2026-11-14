// Scène 3D explicative : rejoue une trace (format ascent-4130-trace/1) dans l'entrepôt.
// Elle montre le robot, mais surtout ce qu'il perçoit, ce qu'il croit et ce qu'il prévoit.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const COULEURS = {
  bleu: 0x23468c,
  vert: 0x238c33,
  jaune: 0xd9cf4a,
  rouge: 0xf24141,
  noir: 0x0d0d0d,
  sol: 0xe6e9f0,
  mur: 0x2a2f3d,
  rayonnage: 0x8a93a6,
  compare: 0xe07b1a,
};

const DIRS = { N: [0, -1], NE: [1, -1], E: [1, 0], SE: [1, 1], S: [0, 1], SO: [-1, 1], O: [-1, 0], NO: [-1, -1] };

function etiquette(texte, couleur = '#0D0D0D', echelle = 0.62) {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  const police = '600 44px system-ui, sans-serif';
  ctx.font = police;
  const w = Math.ceil(ctx.measureText(texte).width) + 48;
  c.width = w;
  c.height = 76;
  ctx.font = police;
  ctx.fillStyle = 'rgba(255,255,255,0.94)';
  ctx.beginPath();
  ctx.roundRect(0, 0, w, 76, 18);
  ctx.fill();
  ctx.fillStyle = couleur;
  ctx.textBaseline = 'middle';
  ctx.fillText(texte, 24, 40);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
  sprite.scale.set((w / 76) * echelle, echelle, 1);
  sprite.userData.partage = true;
  sprite.renderOrder = 10;
  return sprite;
}

function creerRobot(couleur) {
  const g = new THREE.Group();
  const mat = (c, extra = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.55, metalness: 0.15, ...extra });
  const pieces = {};
  // Châssis
  pieces.chassis = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.16, 0.56), mat(couleur));
  pieces.chassis.position.y = 0.2;
  // Effecteurs : quatre roues motrices
  pieces.roues = new THREE.Group();
  for (const [x, z] of [[-0.25, -0.3], [0.25, -0.3], [-0.25, 0.3], [0.25, 0.3]]) {
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.07, 20), mat(0x1c1f29));
    r.rotation.x = Math.PI / 2;
    r.position.set(x, 0.11, z);
    pieces.roues.add(r);
  }
  // Batterie
  pieces.batterie = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 0.4), mat(COULEURS.vert));
  pieces.batterie.position.set(-0.17, 0.33, 0);
  // Calculateur : le module de décision
  pieces.calculateur = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.1, 0.34), mat(0xffffff));
  pieces.calculateur.position.set(0.19, 0.33, 0);
  // Capteur : lidar tournant
  pieces.lidar = new THREE.Group();
  const socle = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.08, 24), mat(0x1c1f29));
  const tete = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.07, 24), mat(COULEURS.jaune, { emissive: COULEURS.jaune, emissiveIntensity: 0.35 }));
  tete.position.y = 0.075;
  pieces.lidar.add(socle, tete);
  pieces.lidar.position.set(0.05, 0.44, 0);
  // Repère d'orientation : l'avant du robot
  const nez = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.3), mat(COULEURS.jaune));
  nez.position.set(0.36, 0.2, 0);
  pieces.chassis.add(nez);
  nez.position.set(0.36, 0, 0);
  const base = {};
  for (const [nom, p] of Object.entries(pieces)) {
    p.traverse((o) => { if (o.isMesh) { o.castShadow = true; } });
    base[nom] = p.position.clone();
    g.add(p);
  }
  const labels = {
    lidar: etiquette('Capteur : lidar', '#7a6f00', 0.16),
    calculateur: etiquette('Décision : calculateur', '#23468C', 0.16),
    batterie: etiquette('Énergie : batterie', '#238C33', 0.16),
    chassis: etiquette('Châssis', '#0D0D0D', 0.16),
    roues: etiquette('Effecteurs : roues', '#0D0D0D', 0.16),
  };
  for (const [nom, s] of Object.entries(labels)) { s.visible = false; g.add(s); }
  g.userData = { pieces, base, labels, eclat: 0 };
  return g;
}

const ECLAT = { roues: -0.02, chassis: 0.25, batterie: 0.6, calculateur: 0.95, lidar: 1.3 };

export class Scene3D {
  constructor(conteneur) {
    this.conteneur = conteneur;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    conteneur.appendChild(this.renderer.domElement);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x101827);
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = Math.PI / 2.05;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 60;
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x51607a, 1.15));
    const soleil = new THREE.DirectionalLight(0xffffff, 1.6);
    soleil.position.set(8, 18, 6);
    soleil.castShadow = true;
    soleil.shadow.mapSize.set(2048, 2048);
    Object.assign(soleil.shadow.camera, { left: -16, right: 16, top: 16, bottom: -16, near: 1, far: 50 });
    this.scene.add(soleil);
    this.statique = new THREE.Group();
    this.dynamique = new THREE.Group();
    this.scene.add(this.statique, this.dynamique);
    this.couches = { capteurs: true, plan: true, trajectoire: true, croyance: true, observation: true, eclate: false, suivre: false };
    this.traces = [];
    this.robots = [];
    this.t = 0;
    this.eclatCible = 0;
    this._boucle = this._boucle.bind(this);
    this._ro = new ResizeObserver(() => this._taille());
    this._ro.observe(conteneur);
    this._taille();
    this._raf = requestAnimationFrame(this._boucle);
  }

  _taille() {
    const w = this.conteneur.clientWidth || 800;
    const h = this.conteneur.clientHeight || 500;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  // Segment épais entre deux points (les lignes WebGL font un pixel de large).
  _tube(a, b, couleur, rayon = 0.03, opacite = 1) {
    const dir = b.clone().sub(a);
    const longueur = dir.length() || 0.0001;
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rayon, rayon, longueur, 6), new THREE.MeshBasicMaterial({ color: couleur, transparent: opacite < 1, opacity: opacite }));
    m.position.copy(a).addScaledVector(dir, 0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return m;
  }

  _vider(groupe) {
    groupe.traverse((o) => {
      if (o.userData.partage) return;
      o.geometry?.dispose();
      o.material?.dispose();
    });
    groupe.clear();
  }

  pos(c, y = 0) {
    return new THREE.Vector3(c[0] - this.L / 2 + 0.5, y, c[1] - this.H / 2 + 0.5);
  }

  chargerMonde(monde) {
    this.statique.clear();
    this.L = monde.largeur;
    this.H = monde.hauteur;
    this.portee = monde.portee_lidar || 5;
    const sol = new THREE.Mesh(new THREE.BoxGeometry(this.L, 0.1, this.H), new THREE.MeshStandardMaterial({ color: COULEURS.sol, roughness: 0.9 }));
    sol.position.y = -0.05;
    sol.receiveShadow = true;
    this.statique.add(sol);
    const traits = [];
    for (let x = 0; x <= this.L; x++) traits.push(new THREE.Vector3(x - this.L / 2, 0.003, -this.H / 2), new THREE.Vector3(x - this.L / 2, 0.003, this.H / 2));
    for (let y = 0; y <= this.H; y++) traits.push(new THREE.Vector3(-this.L / 2, 0.003, y - this.H / 2), new THREE.Vector3(this.L / 2, 0.003, y - this.H / 2));
    this.statique.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(traits), new THREE.LineBasicMaterial({ color: 0xc3c9d6 })));
    const murGeo = new THREE.BoxGeometry(1, 0.9, 1);
    const murMat = new THREE.MeshStandardMaterial({ color: COULEURS.mur, roughness: 0.8 });
    const murs = new THREE.InstancedMesh(murGeo, murMat, monde.murs.length);
    const m4 = new THREE.Matrix4();
    monde.murs.forEach((c, i) => { m4.setPosition(this.pos(c, 0.45)); murs.setMatrixAt(i, m4); });
    murs.castShadow = true; murs.receiveShadow = true;
    this.statique.add(murs);
    // Rayonnages : un cadre et des colis colorés.
    const cadre = new THREE.InstancedMesh(new THREE.BoxGeometry(0.9, 1.5, 0.9), new THREE.MeshStandardMaterial({ color: COULEURS.rayonnage, roughness: 0.7, transparent: true, opacity: 0.55 }), monde.rayonnages.length);
    const colis = new THREE.InstancedMesh(new THREE.BoxGeometry(0.62, 0.3, 0.62), new THREE.MeshStandardMaterial({ roughness: 0.8 }), monde.rayonnages.length * 3);
    const teintes = [0xc9a36b, 0x23468c, 0xd9cf4a, 0xb5651d, 0x7f8aa3];
    const coul = new THREE.Color();
    monde.rayonnages.forEach((c, i) => {
      m4.setPosition(this.pos(c, 0.75)); cadre.setMatrixAt(i, m4);
      for (let k = 0; k < 3; k++) {
        m4.setPosition(this.pos(c, 0.22 + k * 0.48)); colis.setMatrixAt(i * 3 + k, m4);
        colis.setColorAt(i * 3 + k, coul.setHex(teintes[(c[0] * 7 + c[1] * 3 + k) % teintes.length]));
      }
    });
    cadre.castShadow = true; colis.castShadow = true;
    this.statique.add(cadre, colis);
    // Départ et objectif.
    const dalle = (c, couleur, texte) => {
      const d = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.03, 0.92), new THREE.MeshStandardMaterial({ color: couleur, emissive: couleur, emissiveIntensity: 0.25 }));
      d.position.copy(this.pos(c, 0.016));
      const e = etiquette(texte, '#' + new THREE.Color(couleur).getHexString());
      e.position.copy(this.pos(c, 1.25));
      this.statique.add(d, e);
    };
    dalle(monde.depart, COULEURS.bleu, 'Départ');
    dalle(monde.objectif, COULEURS.vert, 'Objectif');
    this.vue('trois-quarts');
  }

  vue(nom) {
    const d = Math.max(this.L, this.H);
    if (nom === 'dessus') this.camera.position.set(0, d * 1.25, 0.01);
    else if (nom === 'robot' && this.robots[0]) {
      const p = this.robots[0].position;
      this.camera.position.set(p.x + 2.6, 3.2, p.z + 5.2);
      this.controls.target.set(p.x + 0.5, 0.9, p.z);
      return;
    } else this.camera.position.set(d * 0.1, d * 0.82, d * 0.72);
    this.controls.target.set(0, 0, 0);
  }

  definirTraces(traces) {
    this.traces = traces.filter(Boolean);
    this._vider(this.dynamique);
    this.robots = [];
    this.calques = [];
    if (!this.traces.length) return;
    this.chargerMonde(this.traces[0].monde);
    this.traces.forEach((trace, i) => {
      const couleur = i === 0 ? COULEURS.bleu : COULEURS.compare;
      const robot = creerRobot(couleur);
      this.dynamique.add(robot);
      this.robots.push(robot);
      const calque = { groupe: new THREE.Group(), couleur };
      this.dynamique.add(calque.groupe);
      this.calques.push(calque);
    });
    this.afficher(0);
  }

  // État de la trace à l'indice entier i (0 à n, n étant l'état final).
  _etat(trace, i) {
    const n = trace.etapes.length;
    if (i < n) return trace.etapes[i].etat;
    return { robot: trace.bilan.position_finale, chariots: trace.bilan.chariots_finaux || [], palettes: trace.bilan.palettes_finales || [] };
  }

  afficher(t) {
    this.t = t;
    this.traces.forEach((trace, k) => {
      const n = trace.etapes.length;
      const tt = Math.max(0, Math.min(t, n));
      const i = Math.min(Math.floor(tt), n);
      const f = tt - i;
      const a = this._etat(trace, i);
      const b = this._etat(trace, Math.min(i + 1, n));
      const lerp = (p, q) => [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f];
      const robot = this.robots[k];
      const pr = lerp(a.robot, b.robot);
      robot.position.copy(this.pos(pr));
      const dx = b.robot[0] - a.robot[0];
      const dz = b.robot[1] - a.robot[1];
      if (dx || dz) robot.userData.cap = Math.atan2(-dz, dx);
      else if (i < n) {
        const act = trace.etapes[i].action;
        if (DIRS[act]) robot.userData.cap = Math.atan2(-DIRS[act][1], DIRS[act][0]);
      }
      robot.rotation.y = robot.userData.cap || 0;
      const etape = trace.etapes[Math.min(i, n - 1)];
      const choc = i < n && etape.resultat.collision;
      robot.userData.pieces.chassis.material.emissive.setHex(choc ? COULEURS.rouge : 0x000000);
      robot.userData.pieces.chassis.material.emissiveIntensity = choc ? 0.9 : 0;
      // Calque explicatif de ce robot.
      const g = this.calques[k].groupe;
      this._vider(g);
      const couleur = this.calques[k].couleur;
      // Obstacles dynamiques (affichés une seule fois, d'après la première trace).
      if (k === 0) {
        a.chariots.forEach((c, j) => {
          const p = lerp(c, (b.chariots || [])[j] || c);
          const ch = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.7), new THREE.MeshStandardMaterial({ color: COULEURS.rouge, roughness: 0.6 }));
          ch.position.copy(this.pos(p, 0.3)); ch.castShadow = true;
          g.add(ch);
        });
        a.palettes.forEach((c) => {
          const pl = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.45, 0.8), new THREE.MeshStandardMaterial({ color: 0xb5651d, roughness: 0.9 }));
          pl.position.copy(this.pos(c, 0.225)); pl.castShadow = true;
          this._etiquettePalette ||= etiquette('Palette imprévue', '#b5651d');
          const e = this._etiquettePalette.clone(); e.userData.partage = true; e.position.copy(this.pos(c, 1.1));
          g.add(pl, e);
        });
      }
      if (this.couches.trajectoire) {
        const pts = [];
        for (let j = 0; j <= i; j++) pts.push(this.pos(this._etat(trace, j).robot, 0.05 + k * 0.02));
        pts.push(this.pos(pr, 0.05 + k * 0.02));
        for (let j = 0; j < pts.length - 1; j++) {
          if (pts[j].distanceToSquared(pts[j + 1]) > 1e-6) g.add(this._tube(pts[j], pts[j + 1], couleur, 0.045));
        }
      }
      if (i >= n) return;
      const obs = etape.observation;
      const dec = etape.decision;
      if (this.couches.plan && dec.plan && dec.plan.length) {
        dec.plan.forEach((c, j) => {
          if (j === 0) return;
          const d = new THREE.Mesh(new THREE.CircleGeometry(0.16, 16), new THREE.MeshBasicMaterial({ color: COULEURS.vert, transparent: true, opacity: 0.85 }));
          d.rotation.x = -Math.PI / 2; d.position.copy(this.pos(c, 0.03));
          g.add(d);
        });
      }
      if (this.couches.capteurs && obs.lidar) {
        const origine = this.pos(a.robot, 0.5);
        for (const [nom, d] of Object.entries(obs.lidar)) {
          const [ex, ey] = DIRS[nom];
          const touche = d <= this.portee;
          const longueur = Math.min(d, this.portee) - (touche ? 0.5 : 0);
          const fin = origine.clone().add(new THREE.Vector3((ex * longueur), 0, (ey * longueur)));
          g.add(this._tube(origine, fin, COULEURS.jaune, 0.022, touche ? 0.95 : 0.3));
          if (touche) {
            const impact = new THREE.Mesh(new THREE.SphereGeometry(0.085, 10, 10), new THREE.MeshBasicMaterial({ color: d <= 1 ? COULEURS.rouge : COULEURS.jaune }));
            impact.position.copy(fin);
            g.add(impact);
          }
        }
      }
      if (this.couches.croyance && obs.croyance) {
        obs.croyance.forEach(([x, y, p]) => {
          const tuile = new THREE.Mesh(new THREE.BoxGeometry(0.94, 0.02 + p * 0.12, 0.94), new THREE.MeshBasicMaterial({ color: 0xff8a1f, transparent: true, opacity: 0.25 + 0.6 * Math.min(1, p * 1.5) }));
          tuile.position.copy(this.pos([x, y], 0.01 + (0.02 + p * 0.12) / 2));
          g.add(tuile);
        });
      }
      if (this.couches.observation) {
        const anneau = (c, coul, y) => {
          const r = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.44, 28), new THREE.MeshBasicMaterial({ color: coul, side: THREE.DoubleSide }));
          r.rotation.x = -Math.PI / 2; r.position.copy(this.pos(c, y));
          g.add(r);
        };
        if (obs.position && (obs.position[0] !== a.robot[0] || obs.position[1] !== a.robot[1])) anneau(obs.position, COULEURS.rouge, 0.07);
        if (obs.position_estimee) anneau(obs.position_estimee, COULEURS.vert, 0.09);
      }
    });
  }

  definirCouches(couches) {
    Object.assign(this.couches, couches);
    this.eclatCible = this.couches.eclate ? 1 : 0;
    this.afficher(this.t);
  }

  _boucle() {
    this._raf = requestAnimationFrame(this._boucle);
    // Vue éclatée animée : les composants se séparent verticalement.
    for (const robot of this.robots) {
      const u = robot.userData;
      u.eclat += (this.eclatCible - u.eclat) * 0.12;
      for (const [nom, piece] of Object.entries(u.pieces)) {
        piece.position.y = u.base[nom].y + ECLAT[nom] * u.eclat;
        const label = u.labels[nom];
        label.visible = u.eclat > 0.5 && robot === this.robots[0];
        label.position.set(0.75, piece.position.y + 0.05, 0.16);
      }
      u.pieces.lidar.children[1].rotation.y += 0.15;
      const s = 1.2 + u.eclat * 0.2;
      robot.scale.setScalar(s);
    }
    if (this.couches.suivre && this.robots[0]) {
      const p = this.robots[0].position;
      this.controls.target.lerp(new THREE.Vector3(p.x, 0.4, p.z), 0.08);
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this._raf);
    this._ro.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
