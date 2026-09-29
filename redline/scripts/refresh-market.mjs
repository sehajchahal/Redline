/** Authenticated build-time price refresh. Never place MARKETCHECK_API_KEY in dist. */
import { readFile, writeFile, rename } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const args=Object.fromEntries(process.argv.slice(2).map(a=>{const i=a.indexOf('=');return [a.slice(0,i),a.slice(i+1)]}));
const fail=message=>{console.error(message);process.exit(1)};
const key=process.env.MARKETCHECK_API_KEY;
if(!key)fail('MARKETCHECK_API_KEY is required. No data changed. Obtain provider access; do not put credentials in public files.');
const catalog=JSON.parse(await readFile(resolve(root,'dist/data/catalog.json'),'utf8')).vehicles;
const supplemental=JSON.parse(await readFile(resolve(root,'dist/data/supplemental.json'),'utf8'));
const car=[...catalog,...supplemental].find(c=>c.id===args['--id']);
if(!car||!args['--model']||!args['--trim'])fail('Use --id=EPA_OR_MFR_ID --model=EXACT_PROVIDER_MODEL --trim=EXACT_PROVIDER_TRIM. The provider model/trim must describe this exact configuration.');
const query={year:String(car.year),make:car.make==='McLaren Automotive'?'McLaren':car.make,model:args['--model'],trim:args['--trim'],car_type:'used',stats:'price',rows:'0'};
// Optional provider body and drivetrain filters improve comparability; don't invent mappings from EPA names.
for(const k of ['body_type','drivetrain','transmission'])if(args['--'+k])query[k]=args['--'+k];
const url=new URL('https://api.marketcheck.com/v2/search/car/active');url.search=new URLSearchParams({...query,api_key:key});
try{
 const response=await fetch(url,{headers:{Accept:'application/json'},signal:AbortSignal.timeout(20000)});
 if(!response.ok)fail(`MarketCheck returned HTTP ${response.status}. No data changed.`);
 const payload=await response.json();const stats=payload.stats?.price;
 if(!stats||!Number.isFinite(stats.median)||stats.median<=0||!Number.isFinite(stats.count)||stats.count<3)fail('Fewer than 3 priced listings or invalid statistics. No estimate published.');
 const path=resolve(root,'dist/data/market.json');const data=JSON.parse(await readFile(path,'utf8'));
 data[car.id]={median:stats.median,sampleCount:stats.count,asOf:new Date().toISOString(),currency:'USD',source:'MarketCheck US active used listings',query,disclaimer:'Advertised asking prices for the supplied provider filters; not an appraisal or sale-price history.'};
 await writeFile(path+'.tmp',JSON.stringify(data,null,2));await rename(path+'.tmp',path);console.log(`Saved ${stats.count} priced listings for ${car.year} ${car.model}. Re-publish the static assets to update the site.`);
}catch{fail('MarketCheck refresh failed. No partial snapshot published. Check provider access and try again.');}
