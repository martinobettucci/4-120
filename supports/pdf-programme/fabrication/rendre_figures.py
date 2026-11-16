#!/usr/bin/env python3
"""Convertit les SVG du site en PNG et ajuste les légendes à leur cadre."""
from pathlib import Path
import xml.etree.ElementTree as ET
from PIL import ImageFont
import cairosvg, json, copy
BASE=Path(__file__).resolve().parents[1]
NS='{http://www.w3.org/2000/svg}'
fonts={b:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans'+('-Bold' if b else '')+'.ttf',1000) for b in [False,True]}
adjustments=[]
for file in sorted((BASE/'assets/figures').glob('*.svg')):
    root=ET.fromstring(file.read_text()); vw=float(root.attrib['viewBox'].split()[2]); vh=float(root.attrib['viewBox'].split()[3])
    parents={e:p for p in root.iter() for e in p}
    for t in root.iter(NS+'text'):
        txt=''.join(t.itertext())
        if not txt:continue
        x=float(t.attrib.get('x',0)); y=float(t.attrib.get('y',0)); size=float(t.attrib.get('font-size',13)); anchor=t.attrib.get('text-anchor','start')
        left,right=4,vw-4
        # Le cadre immédiat du libellé impose une marge plus stricte.
        for r in parents[t].findall(NS+'rect'):
            rx,ry,rw,rh=[float(r.attrib.get(k,0)) for k in ['x','y','width','height']]
            if rx<=x<=rx+rw and ry+size*.6<y<=ry+rh:
                left=max(left,rx+5);right=min(right,rx+rw-5)
        # Deux colonnes de texte sur la même ligne doivent rester séparées.
        if anchor=='start':
            for other in root.iter(NS+'text'):
                ox=float(other.attrib.get('x',0));oy=float(other.attrib.get('y',0))
                if ox>x+5 and abs(oy-y)<2 and other.attrib.get('text-anchor','start')=='start': right=min(right,ox-7)
        available=2*min(x-left,right-x) if anchor=='middle' else x-left if anchor=='end' else right-x
        if available<=0:continue
        bold=t.attrib.get('font-weight') in ['700','bold','600']
        width=fonts[bold].getlength(txt)/1000*size
        if width>available:
            new=round(size*available/width*.98,2)
            t.set('font-size',str(new));adjustments.append(dict(file=file.name,text=txt,old=size,new=new))
    # CairoSVG ignore paint-order : dessiner le contour, puis le glyphe.
    for t in list(root.iter(NS+'text')):
        if t.attrib.get('paint-order')=='stroke':
            parent=parents[t]; outline=copy.deepcopy(t)
            outline.set('fill','none');outline.attrib.pop('paint-order',None)
            parent.insert(list(parent).index(t),outline)
            t.set('stroke','none');t.attrib.pop('paint-order',None)
    cairosvg.svg2png(bytestring=ET.tostring(root),write_to=str(file.with_suffix('.png')),output_width=1760,output_height=920)
(BASE/'sources/ajustements-figures.json').write_text(json.dumps(adjustments,ensure_ascii=False,indent=2))
print(f'{len(list((BASE/"assets/figures").glob("*.png")))} figures rendues ; {len(adjustments)} légendes ajustées.')
