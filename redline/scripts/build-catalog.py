"""Build a compact, traceable catalogue from the official EPA bulk download."""
import csv, io, json, re, sys, zipfile
from pathlib import Path
from datetime import date
root=Path(__file__).resolve().parents[1]
archive=Path(sys.argv[1] if len(sys.argv)>1 else '/private/tmp/redline-vehicles.zip')
with zipfile.ZipFile(archive) as z: rows=list(csv.DictReader(io.TextIOWrapper(z.open('vehicles.csv'))))
makes=['BMW','Mercedes-Benz','Lamborghini','Bugatti','McLaren Automotive','Ferrari','Porsche']
def family(r):
 m=r['model']; make=r['make']
 if make=='BMW':
  match=re.match(r'(M340i|M550i|M2\b|M3\b|M4\b|M5\b|M8\b|X[1-7]\b|XM\b)',m)
  if match and (not m.startswith('X') or re.search(r'\bM\d*',m)): return match[1]
 elif make=='Mercedes-Benz':
  if m.startswith('AMG GT '): return 'AMG GT'
  match=re.match(r'AMG (C63|E63|CLS63|S63|G63|G 63|GLC63|GLE63|GLS63|SL63|GT 63)',m)
  if match:return 'AMG '+match[1].replace('G 63','G63')
 elif make=='Porsche':
  if m.startswith('911'):return '911'
 elif make=='Lamborghini':return m.split()[0]
 elif make=='Bugatti':return m.split()[0]
 elif make=='Ferrari':
  if m=='F175 AHA':return None
  return m.split()[0]
 elif make=='McLaren Automotive':return m.split()[0]
def category(make,f):
 if f.startswith(('X','AMG G','Urus','Purosangue')) and not f.startswith('AMG GT'):return 'SUVs'
 if make=='Bugatti' or f in ['Senna','Speedtail','Elva','Sabre','Revuelto','Daytona','Monza']:return 'Hypercars'
 if make in ['Lamborghini','Ferrari','McLaren Automotive']:return 'Supercars'
 return 'Sports cars'
result=[]
for r in rows:
 if r['make'] not in makes or not 2018<=int(r['year'])<=2024:continue
 f=family(r)
 if not f:continue
 result.append(dict(id=r['id'],make=r['make'],family=f,model=r['model'],year=int(r['year']),category=category(r['make'],f),displacement=float(r['displ']) if r['displ'] else None,cylinders=int(r['cylinders']) if r['cylinders'] else None,drive=r['drive'],transmission=r['trany'],turbo=r['tCharger']=='T',fuel=r['fuelType'],hybrid=r['atvType'],city=int(r['city08']),highway=int(r['highway08']),combined=int(r['comb08']),co2=float(r['co2TailpipeGpm']),source='https://www.fueleconomy.gov/ws/rest/vehicle/'+r['id'],modified=r['modifiedOn']))
(root/'dist/data/catalog.json').write_text(json.dumps({'retrieved':str(date.fromtimestamp(archive.stat().st_mtime)),'source':'https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip','vehicles':result},separators=(',',':')))
print(f'{len(result)} EPA configurations, {len(set((r["make"],r["family"]) for r in result))} model families')
