export const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const shortMake=m=>m==='Mercedes-Benz'?'Mercedes-AMG':m==='McLaren Automotive'?'McLaren':m;
export function applySpecs(car,specs){
 // Match the full EPA carline first. A second match permits only body-name normalization.
 const exact=specs.find(s=>s.make===car.make&&car.year>=s.from&&car.year<=s.to&&new RegExp(s.modelRegex).test(car.model));
 const normalized=car.model.replace(/ Sedan$/,'');
 const s=exact||specs.find(s=>s.make===car.make&&car.year>=s.from&&car.year<=s.to&&new RegExp(s.modelRegex).test(normalized));
 if(!s)return {...car,hp:null,torque:null,zero60:null,zero100:null};
 let zero60=s.zero60;
 if(s.zero60Manual!=null&&/Manual/.test(car.transmission))zero60=s.zero60Manual;
 if(s.zero60Auto!=null&&/Automatic/.test(car.transmission))zero60=s.zero60Auto;
 return {...car,hp:s.hp??(s.powerPS?Math.round(s.powerPS*.98632):null),torque:s.torque??(s.torqueNm?Math.round(s.torqueNm*.73756):null),zero60:zero60??null,zero100:s.zero100??null,powerType:s.powerType??null,specSource:s.source,specNote:s.note,referenceOnly:!!s.referenceOnly};
}
export function modelCurve(hp,torque){
 if(!(hp>0&&torque>0))throw Error('Positive hp and torque required');
 const peakRpm=hp*5252/torque;const maxRpm=Math.max(7000,Math.ceil((peakRpm+1300)/500)*500);
 const at=rpm=>{const shape=Math.min(1,.52+.48*Math.max(0,Math.min(1,(rpm-1000)/1800)));const taper=rpm>maxRpm-700?1-.12*(rpm-(maxRpm-700))/700:1;const tq=Math.min(torque*shape,hp*5252/Math.max(rpm,1))*taper;return {rpm,torque:tq,hp:tq*rpm/5252}};
 return {maxRpm,at,points:Array.from({length:71},(_,i)=>at(1000+(maxRpm-1000)*i/70))};
}
export function depreciation(price,rate,years,current=null){
 if(!Number.isFinite(price)||price<=0||price>100000000||!Number.isFinite(rate)||rate>100||!Number.isFinite(years)||years<0||current!==null&&(!Number.isFinite(current)||current<0||current>100000000))return null;
 const value=current??price*Math.pow(1-rate/100,years),loss=price-value;return {value,loss,percent:loss/price*100};
}
