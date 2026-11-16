#!/usr/bin/env python3
"""Construit le PDF paysage, ses liens et son inventaire de vérification."""
import io, json, math, re, sys
from pathlib import Path
from html import escape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color, white
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader
from PIL import Image
from editorial import NOTES, CHAPTERS

ROOT = Path(__file__).resolve().parents[3]
BASE = ROOT / 'supports/pdf-programme'
OUT = ROOT / 'output/pdf/ASCENT-4-130-support-illustre.pdf'
TMP = ROOT / '.tmp/pdf-programme'
DATA = json.loads((BASE/'sources/programme.json').read_text())
NOTIONS, MODULES = DATA['notions'], DATA['modules']
SITE = 'https://martinobettucci.github.io/4-120/'
W,H = 1280,720
NAVY, BLUE, GREEN, LIME, INK, MUTED, PAPER, LINE = map(HexColor, ['#111C35','#23468C','#238C33','#D9CF4A','#19253D','#556079','#F7F7F3','#DDE1E8'])
for name,file in [('Noto','NotoSans-Regular.ttf'),('NotoB','NotoSans-Bold.ttf'),('NotoI','NotoSans-Italic.ttf')]:
    pdfmetrics.registerFont(TTFont(name, '/usr/share/fonts/truetype/noto/'+file))
pdfmetrics.registerFontFamily('Noto',normal='Noto',bold='NotoB',italic='NotoI',boldItalic='NotoB')
pdfmetrics.registerFont(TTFont('Math', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))

OUT.parent.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)
c = canvas.Canvas(str(OUT), pagesize=(W,H), pageCompression=1)
c.setTitle('ASCENT 4-130 - Les agents autonomes et aide à la décision')
c.setAuthor('Martino Bettucci - P2Enjoy')
c.setSubject('Support illustré de théorie, exemples commentés et liens vers les modules de pratique')
c.setCreator('P2Enjoy - ReportLab ; illustrations imagegen')
c.setViewerPreference('DisplayDocTitle', 'true')
PAGES=[]; TEXTBOXES=[]; LINKS=[]; CURRENT={}; CACHE={}

def clean(s):
    return str(s).replace('\u2011','-').replace('\u2013','-').replace('\u2014','-').replace('\u202f',' ').replace('\xa0',' ')

def p(txt,x,y,w,size=21,color=INK,bold=False,maxh=None,markup=False,leading=1.32,minsize=None):
    """Coordonnées depuis le haut. Refuse tout débordement, sans tronquer."""
    raw=clean(txt)
    text=raw if markup else escape(raw).replace('\n','<br/>')
    text=re.sub(r'[←→√∝]',lambda m:'<font name="Math">'+m.group(0)+'</font>',text)
    original=size
    while True:
        obj=Paragraph(text, ParagraphStyle('p',fontName='NotoB' if bold else 'Noto',fontSize=size,leading=size*leading,textColor=color,spaceAfter=0,splitLongWords=False))
        _,h=obj.wrap(w,10000)
        if maxh is None or h<=maxh+0.1: break
        if minsize is None or size<=minsize: raise ValueError(f"Page {c.getPageNumber()} overflow {h:.1f}>{maxh}: {raw[:90]}")
        size-=0.5
    if y+h>H-13: raise ValueError(f"Page {c.getPageNumber()} text beyond bottom: {raw[:60]}")
    obj.drawOn(c,x,H-y-h)
    TEXTBOXES.append(dict(page=c.getPageNumber(),x=x,y=y,w=w,h=h,size=size,text=raw))
    return h

def rect(x,y,w,h,color,r=0):
    c.setFillColor(color);c.setStrokeColor(color)
    if r: c.roundRect(x,H-y-h,w,h,r,fill=1,stroke=0)
    else: c.rect(x,H-y-h,w,h,fill=1,stroke=0)

def line(x,y,x2,y2,color=LINE,width=1):
    c.setStrokeColor(color);c.setLineWidth(width);c.line(x,H-y,x2,H-y2)

def image(path,x,y,w,h,art=False):
    path=Path(path)
    if art:
        if str(path) not in CACHE:
            im=Image.open(path).convert('RGB'); buf=io.BytesIO(); im.save(buf,format='JPEG',quality=91,subsampling=0);buf.seek(0);CACHE[str(path)]=ImageReader(buf)
        src=CACHE[str(path)]
    else: src=str(path)
    c.drawImage(src,x,H-y-h,width=w,height=h,mask='auto',preserveAspectRatio=True,anchor='c')

def link(label,url,x,y,w=350,size=16,color=BLUE):
    h=p(label,x,y,w,size,color,bold=True)
    c.linkURL(url,(x,H-y-h,x+w,H-y),relative=0,thickness=0)
    LINKS.append(dict(page=c.getPageNumber(),label=label,url=url))
    return h

def ilink(label,dest,x,y,w=350,size=18,color=BLUE):
    h=p(label,x,y,w,size,color,bold=True)
    c.linkRect('',dest,(x,H-y-h,x+w,H-y),relative=0,thickness=0)
    return h

def start(title,kind,module=None,notion=None,bg=PAPER,bookmark=None,outline=None):
    global CURRENT
    CURRENT=dict(page=c.getPageNumber(),title=title,kind=kind,module=module,notion=notion)
    rect(0,0,W,H,bg)
    if bookmark:
        c.bookmarkPage(bookmark)
        if outline is not None: c.addOutlineEntry(title,bookmark,level=outline,closed=False)

def end(dark=False,notion=None,module=None):
    color=HexColor('#DCE4F4') if dark else MUTED
    if not dark: line(52,671,1228,671)
    p('ASCENT 4-130  ·  Martino Bettucci / P2Enjoy',52,685,430,11,color)
    ilink('Sommaire','sommaire',500,684,100,11,color)
    if notion: link('Module 0 · '+notion['id'],SITE+'#/module/0/'+notion['id'],641,684,265,11,color)
    if module: link('Pratique · Module '+str(module),SITE+'#/module/'+str(module),960,684,205,11,color)
    p(f'{c.getPageNumber():03}',1185,682,44,14,color,bold=True)
    PAGES.append(CURRENT.copy()); c.showPage()

def header(kicker,title,module=None):
    p(kicker.upper(),52,38,1176,14,BLUE,bold=True)
    p(title,52,68,1176,35,INK,bold=True,maxh=88,minsize=30)

def button(label,url,x,y,w=400):
    rect(x,y,w,45,BLUE,4); link(label,url,x+17,y+12,w-34,16,white)

def arrow(x,y,x2,y2,color=BLUE):
    line(x,y,x2,y2,color,3)
    a=math.atan2(y2-y,x2-x); d=10
    line(x2,y2,x2-d*math.cos(a-.45),y2-d*math.sin(a-.45),color,3)
    line(x2,y2,x2-d*math.cos(a+.45),y2-d*math.sin(a+.45),color,3)

def voile_titre():
    """Préserver le contraste du texte sur les ouvertures pleine page."""
    c.saveState()
    c.setFillColor(NAVY)
    for x in range(0,760,4):
        alpha=.62 if x<460 else .62*(760-x)/300
        c.setFillAlpha(alpha);c.rect(x,0,4,H,fill=1,stroke=0)
    c.restoreState()

# Couverture : illustration intégrale, titre composé dans le PDF.
start('Les agents autonomes et aide à la décision','couverture',bg=NAVY,bookmark='couverture',outline=0)
image(BASE/'assets/couverture.png',0,0,W,H,True)
p('ASCENT 4-130',55,55,450,17,LIME,bold=True)
p('Les agents\nautonomes',55,160,555,60,white,bold=True,maxh=160)
p('et l’aide à la décision',58,325,560,34,white,bold=True)
line(58,397,244,397,LIME,5)
p('Comprendre les modèles.\nExpliquer les décisions.\nArgumenter la pratique.',58,425,445,24,white)
p('Martino Bettucci · P2Enjoy\nFormation des 16 et 17 novembre 2026',58,595,560,17,white)
end(True)

start('De la théorie à la pratique argumentée','introduction',bookmark='usage',outline=0)
header('Lire, discuter, expérimenter','De la théorie à la pratique argumentée')
p('Ce support accompagne l’explication orale. Chaque notion relie un modèle, un schéma et un exemple résolu ; l’atelier en ligne permet ensuite de construire, tester et justifier une solution.',52,145,1160,24,maxh=105)
steps=[('Comprendre','Identifier ce que le modèle représente et ce qu’il laisse de côté.'),('Prévoir','Annoncer une décision ou un résultat avant de lancer l’expérience.'),('Expérimenter','Modifier une hypothèse, conserver les mesures et rejouer un cas.'),('Argumenter','Relier l’observation au modèle, à ses limites et au besoin métier.')]
for i,(a,b) in enumerate(steps):
    x=52+i*300
    p(f'0{i+1}',x,296,240,47,BLUE,bold=True)
    p(a,x,361,240,24,INK,bold=True)
    p(b,x,407,240,20,maxh=135)
    if i<3: arrow(x+217,327,x+279,327)
rect(52,575,1176,63,NAVY,4)
p('Les liens bleus ouvrent les leçons, les modules et les notebooks. Le sommaire et les signets servent à naviguer dans le PDF.',75,593,1126,19,white,maxh=50)
end()

# Pages de chapitre prévisibles : 4 pages introductives, puis 2 + 2*N par chapitre.
chapter_pages={};nextpage=5
for m in MODULES:
    chapter_pages[m['n']]=nextpage
    nextpage+=2+2*sum(n['module']==m['n'] for n in NOTIONS)
start('Parcours des sept chapitres','sommaire',bookmark='sommaire',outline=0)
header('Sommaire interactif','Parcours des sept chapitres')
for i in range(1,8):
    y=151+(i-1)*64
    p(f'{i:02}',52,y,65,26,BLUE,bold=True)
    ilink(CHAPTERS[i][0],f'chapitre-{i}',130,y,455,24)
    p(CHAPTERS[i][1],605,y+2,546,17,MUTED,maxh=49)
    p(str(chapter_pages[i]),1180,y+2,48,22,BLUE,bold=True)
    line(130,y+49,1228,y+49)
link('Le module 0 : les 39 fondamentaux, pas à pas',SITE+'#/module/0',52,622,700,17)
ilink('Index des notions et références','index',860,622,368,16)
end()

start('Deux terrains, les mêmes questions','fils-rouges',bookmark='fils',outline=0)
header('Les fils rouges','Deux terrains, les mêmes questions')
for x,title,art,desc in [(52,'Le robot d’entrepôt','chapitre-2.png','Observer des obstacles, estimer sa position, choisir une route et mesurer les conséquences d’une action.'),(664,'Le traitement d’un dossier','chapitre-7.png','Lire une demande, appliquer une règle, confronter les avis, autoriser une action et conserver sa justification.')]:
    image(BASE/'assets'/art,x,150,564,317,True)
    p(title,x,488,564,26,BLUE,bold=True)
    p(desc,x,533,564,21,maxh=94)
p('Dans les deux cas : quelles informations, quelle décision, quelles limites, quelle preuve ?',52,634,1176,18,INK,bold=True)
end()

for m in MODULES:
    num=m['n']; short,sub,practice,experiment,deliverable=CHAPTERS[num]
    group=[n for n in NOTIONS if n['module']==num]
    start(short,'chapitre',num,bg=NAVY,bookmark=f'chapitre-{num}',outline=0)
    image(BASE/f'assets/chapitre-{num}.png',0,0,W,H,True)
    voile_titre()
    p(f'CHAPITRE {num:02}',55,55,470,17,LIME,bold=True)
    p(short,55,167,530,53,white,bold=True,maxh=190,minsize=48)
    p(sub,58,390,430,25,white,maxh=140)
    p(f'{len(group)} notions · théorie et exemples commentés',58,585,500,16,white)
    end(True,module=num)
    for n in group:
        nid=n['id']; formula,mechanism,question,limit=NOTES[nid]
        # Théorie : un schéma exact suffisamment grand pour être projeté.
        start(n['nom'],'theorie',num,nid,bookmark='notion-'+nid,outline=1)
        header(f'Chapitre {num} · Comprendre',n['nom'])
        rect(52,159,658,66,HexColor('#E9EEF7'),3)
        p(formula,68,174,626,21,BLUE,bold=True,maxh=45,minsize=16)
        last=len(n['etapes']); image(BASE/f'assets/figures/{nid}-{last}.png',52,244,658,344)
        e=n['etapes'][-1]
        p('À lire dans le schéma',66,600,634,14,BLUE,bold=True)
        p(e['regard'][0].upper()+e['regard'][1:],66,623,634,15,MUTED,maxh=42,minsize=13)
        y=160
        p('LA NOTION',758,y,470,14,BLUE,bold=True);y+=29
        h=p(n['definition']['texte'][0],758,y,470,19.5,maxh=240,minsize=17);y+=h+27
        p('LE MÉCANISME',758,y,470,14,BLUE,bold=True);y+=29
        p(mechanism,758,y,470,20,maxh=644-y,minsize=17)
        end(notion=n,module=num)
        # Exemple : chaque opération est lisible ; les hypothèses sont explicites.
        start(n['nom']+' - exemple','exemple',num,nid)
        header(f'Chapitre {num} · Exemple résolu',n['nom'])
        enonce=n['exemple']['enonce'].replace('Même test, mais les pannes sont plus fréquentes : 100 robots en panne sur 200.', 'Sur 200 robots, 100 sont en panne. Le test détecte 90 % des pannes et déclenche une fausse alerte pour 10 % des robots sains.')
        h=p(enonce,52,150,1176,21,maxh=112,minsize=19)
        y=150+h+26
        step_count=len(n['exemple']['pas']); available=548-y
        # Choisir une taille commune à tous les pas, sans déséquilibrer la page.
        size=20
        while True:
            heights=[]
            for s in n['exemple']['pas']:
                pp=Paragraph(escape(clean(s)),ParagraphStyle('measure',fontName='Noto',fontSize=size,leading=size*1.3))
                heights.append(pp.wrap(657,10000)[1])
            if sum(heights)+18*(step_count-1)<=available: break
            size-=0.5
            if size<16: raise ValueError('Example too dense '+nid)
        sy=y
        for i,(s,hh) in enumerate(zip(n['exemple']['pas'],heights)):
            rect(53,sy+1,31,31,BLUE,15)
            p(str(i+1),63,sy+5,22,15,white,bold=True)
            p(s,101,sy,657,size,maxh=hh+.1,leading=1.3)
            if i<step_count-1: line(68,sy+35,68,sy+hh+14,LINE,2)
            sy+=hh+18
        line(794,y,794,543)
        p('Ce que l’exemple suppose',826,y,402,17,BLUE,bold=True)
        hy=p(limit,826,y+31,402,18.5,maxh=205,minsize=16)
        qy=y+31+hy+26
        p('À discuter',826,qy,402,15,GREEN,bold=True)
        p(question,826,qy+26,402,19,maxh=543-(qy+26),minsize=16)
        rect(52,557,1176,100,HexColor('#E7F0E7'),4)
        resultats={
            'bayes': '90 % des alertes correspondent ici à une panne réelle. Avec le même détecteur, la prévalence change la valeur d’une alerte.',
            'reseau': 'P(usure | vibration) = 0,73 : la vibration observée fait passer la probabilité d’usure de 25 % à environ 73 %.',
            'supervise': '85 % d’exactitude sur des situations non vues : une estimation du comportement dans les conditions représentées par ce test.',
            'croyance': 'Après cette première correction : 38 % pour chacune des deux cases avec porte, 8 % pour chacune des trois autres.',
            'mdp': 'Valeur : 7,4. Si la fosse était remplacée par une case de valeur 4, on obtiendrait 8,8. Ce danger fait perdre 1,4 point et peut justifier un détour.',
            'robustesse': 'On retient A pour les niveaux testés : il conserve 81 % de réussite au niveau sévère, contre 35 % pour B.',
            'graine': 'Dans ce simulateur déterministe fixé : graine, paramètres et version permettent de retrouver l’échec et d’en expliquer la trajectoire.',
        }
        p(resultats.get(nid,n['exemple']['resultat']),72,570,1136,21,GREEN,bold=True,maxh=78,minsize=17)
        end(notion=n,module=num)
    # Passage à la pratique, une illustration originale par chapitre.
    start(practice,'pratique',num,bookmark=f'pratique-{num}',outline=1)
    image(BASE/f'assets/pratique-{num}.png',0,0,W,H,True)
    # Fond de lecture transparent, limité à la colonne de contenu.
    c.saveState();c.setFillAlpha(.93);rect(32,25,585,636,HexColor('#FAF9F5'),8);c.restoreState()
    p(f'CHAPITRE {num} · PASSER À LA PRATIQUE',54,48,525,14,BLUE,bold=True)
    p(practice,54,96,525,37,INK,bold=True,maxh=103,minsize=32)
    y=223
    p('L’expérience',54,y,520,17,BLUE,bold=True)
    hh=p(experiment,54,y+32,520,21,maxh=139,minsize=19)
    y=y+32+hh+27
    p('La preuve à rapporter',54,y,520,17,BLUE,bold=True)
    p(deliverable,54,y+32,520,21,maxh=536-(y+32),minsize=19)
    button('Ouvrir le module '+str(num),SITE+'#/module/'+str(num),54,559,245)
    button('Notebook '+str(num).zfill(2),SITE+'notebooks/'+m['notebook']+'.html',315,559,245)
    link('Revoir les notions de base',SITE+'#/module/0',54,623,506,16)
    end(module=num)

start('Argumenter une décision de conception','synthese',bookmark='synthese',outline=0)
header('De la mesure à la décision','Argumenter une décision de conception')
rows=[('1. Le besoin','Dire quelle action le système doit aider à choisir et quelles erreurs sont coûteuses.'),('2. Le modèle','Nommer les données, les hypothèses et le domaine dans lequel le raisonnement tient.'),('3. La comparaison','Comparer une référence simple et une proposition sur les mêmes situations.'),('4. La preuve','Présenter résultats, dispersion, cas d’échec et conditions de reproduction.'),('5. La décision','Accepter, modifier ou limiter l’autonomie en expliquant le compromis retenu.')]
for i,(a,b) in enumerate(rows):
    y=159+i*83
    p(a,52,y,277,24,BLUE,bold=True)
    p(b,359,y,869,23,maxh=70)
    line(359,y+64,1228,y+64)
p('Une démonstration montre un comportement. Une campagne permet de défendre une affirmation précise.',52,615,1176,21,GREEN,bold=True,maxh=50,minsize=19)
end()

start('Choisir sans confondre les familles','comparaison',bookmark='choisir',outline=0)
header('Repère de synthèse','Choisir sans confondre les familles')
table=[('Règles','Connaissance explicite, contraintes stables','Seuils, priorités, cas oubliés'),('Bayésien','Dépendances et incertitude à représenter','Probabilités et hypothèses du graphe'),('Supervisé','Exemples représentatifs disponibles','Fuite de données, dérive, erreurs par classe'),('Optimisation','Objectif et contraintes formalisables','Coût choisi, faisabilité, budget de recherche'),('Renforcement','Décisions séquentielles et récompenses','Exploration, simulation, récompense mal définie'),('LLM / RAG','Langage variable et appui documentaire','Preuves, contrôle des sorties, autorisations')]
rect(52,151,1176,51,NAVY)
for x,w,t in [(70,235,'Famille'),(330,420,'Utile lorsque…'),(796,414,'À vérifier')]: p(t,x,164,w,19,white,bold=True)
for i,(a,b,d) in enumerate(table):
    y=214+i*65
    if i%2==0: rect(52,y-2,1176,63,HexColor('#ECEFF3'))
    p(a,70,y+7,235,21,BLUE,bold=True,maxh=51)
    p(b,330,y+7,420,19,maxh=51)
    p(d,796,y+7,414,19,maxh=51)
p('Une architecture peut combiner plusieurs familles ; son résultat final doit être mesuré comme un tout.',52,629,1176,21,GREEN,bold=True,maxh=33,minsize=18)
end()

start('Un protocole de comparaison défendable','protocole',bookmark='protocole',outline=0)
header('Avant de lancer les essais','Un protocole de comparaison défendable')
left=[('Fixer','Le besoin, les scénarios et les critères d’acceptation avant de voir les résultats.'),('Contrôler','Les paramètres communs, les graines, les versions et le budget de calcul.'),('Mesurer','Les erreurs, les délais, les coûts et les résultats par niveau de difficulté.')]
right=[('Séparer','Les données utilisées pour concevoir, régler et évaluer le système.'),('Rejouer','Une réussite et un échec en reliant chaque décision à l’information disponible.'),('Conclure','Sur le domaine effectivement testé, avec les limites et les cas restant à examiner.')]
for x,items in [(52,left),(665,right)]:
    for i,(a,b) in enumerate(items):
        y=171+i*145
        p(a,x,y,550,27,BLUE,bold=True)
        p(b,x,y+45,550,22,maxh=92)
end()

# Index : un lien direct vers la leçon, un retour vers le PDF et Wikipédia.
for num in range(1,8):
    group=[n for n in NOTIONS if n['module']==num]
    for part in range(math.ceil(len(group)/8)):
        start(f'Index et références - chapitre {num}'+(' (suite)' if part else ''),'references',num,bookmark='index' if num==1 and part==0 else None,outline=0 if num==1 and part==0 else None)
        header('Pour retrouver et approfondir',f'{num}. {CHAPTERS[num][0]}'+(' · suite' if part else ''))
        for i,n in enumerate(group[part*8:(part+1)*8]):
            y=150+i*61
            ilink(n['nom'],'notion-'+n['id'],52,y,688,20)
            link('Leçon du module 0',SITE+'#/module/0/'+n['id'],52,y+32,255,14)
            refs=n['definition']['liens']
            ref=refs[0]
            link('Wikipédia ('+ref['langue']+') · '+ref['titre'],ref['url'],766,y+5,462,15)
            line(52,y+56,1228,y+56)
        end(module=num)

start('Sources, repères et accès','sources',bookmark='sources',outline=0)
header('Crédits et prolongements','Sources, repères et accès')
p('Conception et formation',52,159,550,22,BLUE,bold=True)
p('Martino Bettucci · P2Enjoy\nASCENT 4-130 · 16 et 17 novembre 2026\nLes six modules du programme initial sont complétés par le chapitre 7 sur les systèmes agentiques.',52,201,550,21,maxh=155)
p('Contenus et exemples',52,383,550,22,BLUE,bold=True)
p('Leçons du module 0, ateliers et notebooks du programme. Le chapitre 7 reprend le support « Systèmes agentiques : une exploration approfondie ». Les situations et chiffres pédagogiques sont synthétiques.',52,425,550,21,maxh=165)
p('Illustrations et schémas',668,159,560,22,BLUE,bold=True)
p('Illustrations de contexte réalisées avec imagegen. Les schémas de mécanismes proviennent des animations du cours ; leurs valeurs sont distinctes, lorsque précisé, de celles des exemples résolus. Les images d’ouverture sont des métaphores visuelles.',668,201,560,21,maxh=191)
p('Pour approfondir',668,414,560,22,BLUE,bold=True)
p('Les références Wikipédia de l’index donnent des portes d’entrée en français, ou en anglais selon la notion. Les modèles simplifiés sont accompagnés de leurs hypothèses dans les pages d’exemples.',668,456,560,20,maxh=139)
button('Accéder au programme en ligne',SITE,52,607,550)
button('Retrouver les 39 fondamentaux',SITE+'#/module/0',668,607,560)
end()

c.save()
(BASE/'sources/inventaire-pdf.json').write_text(json.dumps(dict(pages=PAGES,links=LINKS,textboxes=TEXTBOXES),ensure_ascii=False,indent=2))
print(json.dumps(dict(pdf=str(OUT),pages=len(PAGES),notions=len(NOTIONS),liens_externes=len(LINKS),taille_mo=round(OUT.stat().st_size/1e6,2)),ensure_ascii=False))
