const fs=require('fs'),vm=require('vm'),assert=require('assert');
const nodes=new Map(),handlers={};
const node=()=>({innerHTML:'',style:{},classList:{add(){},remove(){}},focus(){},matches(){return false},querySelectorAll(){return []}});
const ctx={console,structuredClone,Date,Intl,setTimeout(){},clearTimeout(){},localStorage:{getItem(){return null},setItem(){}},window:{scrollTo(){}},document:{body:node(),activeElement:null,querySelector(s){if(!nodes.has(s))nodes.set(s,node());return nodes.get(s)},querySelectorAll(){return []},addEventListener(k,fn){handlers[k]=fn}}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/app.js','utf8'),ctx);
const run=code=>vm.runInContext(code,ctx);
const removed=['finance','actions','projects','pulse','huddle','board','issues'];
const removedAction=/data-(?:nav|action)="(?:finance|actions|projects|pulse|huddle|board|issues|goto:(?:finance|actions|projects|pulse|huddle|board|issues)|newaction|action:|project:|issue:|task:|tracker-new-plan:|tracker-edit-plan:|tracker-remarks:)/;
const before=run('JSON.stringify(db)');
let views=0;
for(const mode of ['ged','gos'])for(const page of ['overview','targets','pace','review','reports','sources']){
 if(mode==='gos'&&['overview','targets'].includes(page)||mode==='ged'&&['pace','review'].includes(page))continue;
 run(`state.mode='${mode}'; navigate('${page}')`);
 const html=nodes.get('#app').innerHTML;
 assert(html.includes('<h1>'));assert(!html.includes('undefined'),page);assert(!removedAction.test(html),`removed control in ${mode}/${page}`);assert(!/data-portfolio=/.test(html));assert(!/data-(project|issue|task)=/.test(html));
 assert(!html.includes('Strategic projects'));assert(!html.includes('data-nav="issues"'));
 fs.writeFileSync(`/tmp/gencys-${mode}-${page}.html`,html);views++;
}
for(const p of removed){run(`state.mode='ged'; navigate('${p}')`);assert.equal(run('state.page'),'overview');run(`state.mode='gos'; navigate('${p}')`);assert.equal(run('state.page'),'pace');}
run("state.mode='ged';navigate('targets');state.trackerTab='register';render()");assert(!removedAction.test(nodes.get('#app').innerHTML));
run("trackerKpiModal(trackerData().kpis[0].id)");assert(!nodes.get('#modal-root').innerHTML.includes('Linked action plans'));assert(!removedAction.test(nodes.get('#modal-root').innerHTML));
run("closeModal();state.mode='gos';navigate('pace');paceModal(hrisPaceReports[0].id)");assert(nodes.get('#modal-root').innerHTML.includes('Read-only'));assert(!nodes.get('#modal-root').innerHTML.includes('<form'));
run('closeModal();exceptionModal()');assert(!removedAction.test(nodes.get('#modal-root').innerHTML));
assert.equal(run('JSON.stringify(db)'),before,'Navigation must not mutate stored sample data');
// Responsive rules stay intact; actual mobile layout requires browser acceptance.
const css=fs.readFileSync('dist/styles.css','utf8');assert(css.includes('@media'));assert(css.includes('.mobile-menu'));assert(css.includes('.mobile-overlay'));
console.log(`PASS: ${views} mode/view combinations, all removed route fallbacks, KPI and PACE details, exception modal, unchanged sample data, responsive CSS retained.`);
