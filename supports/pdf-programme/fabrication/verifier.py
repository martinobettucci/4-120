#!/usr/bin/env python3
"""Contrôles du PDF et rendu intégral pour relecture visuelle."""
import json, math
from pathlib import Path
from collections import Counter
import pymupdf
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[3]
BASE=ROOT/'supports/pdf-programme'
PDF=ROOT/'output/pdf/ASCENT-4-130-support-illustre.pdf'
OUT=ROOT/'.tmp/pdf-programme/rendu'
OUT.mkdir(parents=True,exist_ok=True)
for pattern in ['page-*.png','planche-*.jpg']:
    for old in OUT.glob(pattern): old.unlink()
data=json.loads((BASE/'sources/programme.json').read_text())
inv=json.loads((BASE/'sources/inventaire-pdf.json').read_text())
doc=pymupdf.open(PDF)
errors=[]; internal=0;external=0
assert len(doc)==len(inv['pages'])
for n in data['notions']:
    kinds=Counter(p['kind'] for p in inv['pages'] if p['notion']==n['id'])
    if kinds!={'theorie':1,'exemple':1}: errors.append('Couverture notion '+n['id'])
for i,page in enumerate(doc):
    if page.rect.width!=1280 or page.rect.height!=720: errors.append(f'Format page {i+1}')
    if len(page.get_text())<80: errors.append(f'Texte insuffisant page {i+1}')
    for b in page.get_text('dict')['blocks']:
        if b['type']!=0: continue
        x0,y0,x1,y1=b['bbox']
        if min(x0,y0)<-1 or x1>1281 or y1>721: errors.append(f'Texte hors page {i+1}: {b["bbox"]}')
        for line in b['lines']:
            for s in line['spans']:
                if '\ufffd' in s['text'] or '\x00' in s['text']: errors.append(f'Glyphe manquant page {i+1}')
    for l in page.get_links():
        if l['kind']==pymupdf.LINK_GOTO:
            internal+=1
            if not 0<=l.get('page',-1)<len(doc): errors.append(f'Lien interne page {i+1}')
        elif l['kind']==pymupdf.LINK_URI:
            external+=1
            if not l['uri'].startswith('https://'): errors.append(f'URL invalide page {i+1}')
    pix=page.get_pixmap(matrix=pymupdf.Matrix(1,1),alpha=False)
    pix.save(OUT/f'page-{i+1:03}.png')
# Détection des recouvrements entre paragraphes composés (hors images).
for pg in range(1,len(doc)+1):
    boxes=[b for b in inv['textboxes'] if b['page']==pg]
    for i,a in enumerate(boxes):
        for b in boxes[i+1:]:
            ix=min(a['x']+a['w'],b['x']+b['w'])-max(a['x'],b['x'])
            iy=min(a['y']+a['h'],b['y']+b['h'])-max(a['y'],b['y'])
            if ix>2 and iy>2: errors.append(f"Paragraphes superposés p{pg}: {a['text'][:30]} / {b['text'][:30]}")
font=ImageFont.truetype('/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf',17)
for j in range(math.ceil(len(doc)/6)):
    sheet=Image.new('RGB',(1920,1704),'#dce1e8');d=ImageDraw.Draw(sheet)
    for k in range(6):
        i=j*6+k
        if i>=len(doc):break
        img=Image.open(OUT/f'page-{i+1:03}.png').resize((960,540))
        x=(k%2)*960;y=(k//2)*568
        sheet.paste(img,(x,y+28));d.text((x+16,y+3),f'{i+1:03}  {inv["pages"][i]["title"]}',font=font,fill='#111c35')
    sheet.save(OUT/f'planche-{j+1:02}.jpg',quality=93)
report={'pages':len(doc),'notions':len(data['notions']),'chapitres':len(data['modules']),'liens_externes':external,'liens_internes':internal,'erreurs':errors,'pages_rendues':len(doc)}
(BASE/'sources/verification-technique.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps(report,ensure_ascii=False,indent=2))
if errors: raise SystemExit(1)
