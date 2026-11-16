"""Contrôle indépendant des calculs et de la séparation PDF / exemples du site."""
import json, math, itertools
from pathlib import Path
from exemples_pdf import EXEMPLES

BASE = Path(__file__).resolve().parents[1]
source = json.loads((BASE/'sources/programme.json').read_text())
assert set(EXEMPLES) == {n['id'] for n in source['notions']}
calculs = []

def calcul(notion, valeur, attendu, texte):
    assert math.isclose(valeur, attendu, rel_tol=1e-6, abs_tol=1e-8), (notion, valeur, attendu)
    assert texte in json.dumps(EXEMPLES[notion], ensure_ascii=False), (notion, texte)
    calculs.append(dict(notion=notion, valeur=valeur, texte_verifie=texte))

for n in source['notions']:
    ex=EXEMPLES[n['id']]
    assert ex['enonce'] != n['exemple']['enonce']
    assert ex['resultat'] != n['exemple']['resultat']
    assert not set(ex['pas']) & set(n['exemple']['pas'])
    assert all(ex[k] for k in ['question','hypothese','figure','lecture'])
    assert len(ex['pas']) >= 3

calcul('regles', int(31>30)+int(82>75), 2, 'deux conditions vraies')
calcul('bayes', 40*.9, 36, '36')
calcul('bayes', (1000-40)*.05, 48, '48')
calcul('bayes', 36/(36+48)*100, 42.857142857, '42,9 %')
assert EXEMPLES['bayes']['figure'][2][1:] == [(36,48),(4,912)]
calcul('reseau', .1*.7/(.1*.7+.9*.1)*100, 43.75, '43,75 %')
calcul('utilite', .04*600, 24, '24 €')
calcul('utilite', 18/600*100, 3, '3 %')
calcul('supervise', 192/240*100, 80, '80 %')
calcul('neurone', .5*.4+.2*.7-.3, .04, '0,04')
w=1
for cible in [3,4]:
    w-=.25*2*(w-5)
    calcul('gradient', w, cible, f'= {cible}')
calcul('gradient', (w-5)**2, 1, 'perte vaut maintenant 1')
calcul('recommandation', (2+4)/2, 3, '3 sur 5')
calcul('lidar', .30*40/2, 6, '6 mètres')
calcul('etat', sum([47,50,48,49,46])/5, 48, '48 cm')
calcul('astar', 2+7, 9, '9 minutes')
calcul('astar', 4+6, 10, '10 minutes')
calcul('espace', math.factorial(6), 720, '720')
solutions=[p for p in itertools.permutations([9,10,11]) if p[0]<p[1] and p[1]!=10]
assert solutions==[(9,11,10),(10,11,9)]
calcul('contraintes', len(solutions), 2, 'deux plannings')
for t, attendu, texte in [(6,60.65306597,'60,7 %'),(1.5,13.53352832,'13,5 %'),(.3,.004539993,'0,00454 %')]:
    calcul('recuit', math.exp(-3/t)*100, attendu, texte)
calcul('croyance', .25*.75/(.25*.75+3*.25*.15)*100, 62.5, '62,5 %')
calcul('croyance', 62.5+3*12.5, 100, '100 %')
calcul('mdp', .75*8+.20*2+.05*(-4), 6.2, '6,2')
calcul('qlearning', 2+.25*(1+.8*5-2), 2.75, '2,75')
calcul('exploration', (1-.3+.3/5)*100, 76, '76 %')
marge=1.96*math.sqrt(.8*.2/225)
calcul('confiance', marge*100, 5.2266666667, '5,23 points')
calcul('confiance', round((.8-marge)*100,1), 74.8, '74,8 %')
calcul('confiance', round((.8+marge)*100,1), 85.2, '85,2 %')
assert min([95,90,84])>=80 and min([97,92,68])<80
calcul('autonomie', .04*150, 6, '6 €')
calcul('autonomie', .12*150, 18, '18 €')
calcul('autonomie', 9/150*100, 6, '6 %')
calcul('familles', .995*.92*.98, .897092, '0,897092')
calcul('familles', .2+.7+.4, 1.3, '1,3 centime')
calcul('familles', 4+30+90, 124, '124 ms')
assert [2*4+1,2*2+6,2*3+2] == [9,10,8]
assert [4*4+1,4*2+6,4*3+2] == [17,14,14]
calcul('llm', 18*30, 540, '540 €')
calcul('llm', (18-12)*30+(12+6)*2, 216, '216 €')
calcul('llm', round(6/162*100,1), 3.7, '3,7 %')
calcul('complexite', .97*.88*.95, .81092, '0,81092')
calcul('complexite', .97*(.88+.12*.5)*.95, .86621, '0,86621')
calcul('risque', (3*.2**2*.8+.2**3)*100, 10.4, '10,4 %')
calcul('routage', (.85+.75)/(.85+.75+.4)*100, 80, '80 %')
calcul('rag', math.log2(8/4)+math.log2(8/2), 3, 'score 3')
calcul('patterns', 200*.1*.3, 6, '= 6')
calcul('patterns', 200*(.1*.7+.9*.3)+600*.2, 188, '188')
calcul('patterns', 480+6+188+126, 800, '= 800')
calcul('implementation', 3*3+4+1+2**2+2, 20, '20')
calcul('evaluation', 16/400*100, 4, '4 %')
calcul('evaluation', 500*2*.08+100*2, 280, '280 €')
calcul('evaluation', round(280/(50-20),2), 9.33, '9,33 €')
calcul('gouvernance', 320-250, 70, '70 lux')
calcul('gouvernance', (11*60+5)-(10*60+20), 45, '45 minutes')
calcul('casusage', 600+200*3, 1200, '1 200')
calcul('casusage', 200*(.2-.104), 19.2, '19,2')

rapport=dict(notions=len(EXEMPLES),exemples_distincts_du_site=len(EXEMPLES),
             calculs_verifies=len(calculs),calculs=calculs,
             controle_editorial='Scénarios et jeux de données distincts ; relecture visuelle séparée requise.',
             erreurs=[])
(BASE/'sources/verification-exemples.json').write_text(json.dumps(rapport,ensure_ascii=False,indent=2)+'\n')
print(f'{len(EXEMPLES)} exemples distincts ; {len(calculs)} calculs vérifiés.')
