(()=>{
const listIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 6h12M8 12h12M8 18h12M3 6h1M3 12h1M3 18h1"/></svg>';
const chatIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6 3V6a2 2 0 0 1 2-2Z"/></svg>';
// Navigation is shared by all workspace views through workspaceRail().
let scope='My team',directory=false;
const originalItems=companyItems;
companyItems=function(){const all=originalItems().map(r=>({...r,accuracy:knowledgeRecords.find(k=>k.id===r.id)?.pool?.accuracy,team:r.own?(knowledgeRecords.find(k=>k.id===r.id)?.pool?.team||'Payments team'):r.id==='example-1'?'Payments team':r.id==='example-3'?'Platform team':r.id==='example-4'?'Operations team':'Payroll team'}));return directory?all.filter(r=>scope==='Company'||scope==='My team'&&r.team==='Payments team'||scope==='Collaborating teams'&&['Platform team','Operations team'].includes(r.team)):all};
const originalDirectory=poolDirectory;poolDirectory=function(){directory=true;let html;try{html=originalDirectory()}finally{directory=false}return html.replace('<div class="pool-toolbar">',`<div class="pool-scope" role="group" aria-label="Knowledge scope">${['My team','Collaborating teams','Company'].map(t=>`<button data-wf-scope="${t}" aria-pressed="${scope===t}">${t}</button>`).join('')}</div><p class="scope-caption">${scope==='My team'?'Payments team':scope==='Collaborating teams'?'Platform & Operations · Teams you work with':'All teams across your company'}</p><div class="pool-toolbar">`)};
const originalDetail=poolDetail;poolDetail=function(r){return (r.accuracy&&r.accuracy!=='confirmed'?'<p class="scope-caption">AI-assisted draft · Not yet confirmed by its author</p>':'')+originalDetail(r)};
let permissions;try{permissions=JSON.parse(localStorage.getItem('capture-permissions-v1'))}catch{}permissions=permissions||{record:true,files:false,scope:'selected',folders:['Work projects']};
function persist(){localStorage.setItem('capture-permissions-v1',JSON.stringify(permissions))}
const originalApps=apps;apps=function(){return originalApps().replace('<div class="filterbar">',`<section class="capture-permissions"><h2>Capture permissions</h2><div class="permission-toggles"><label><input type="checkbox" data-permission="record" ${permissions.record?'checked':''}> Record screen activity</label><label><input type="checkbox" data-permission="files" ${permissions.files?'checked':''}> Read linked files</label></div>${permissions.files?`<div class="folder-scope"><label><input type="radio" name="folder-scope" data-folder-scope="all" ${permissions.scope==='all'?'checked':''}> All project folders</label><label><input type="radio" name="folder-scope" data-folder-scope="selected" ${permissions.scope==='selected'?'checked':''}> Choose folders</label>${permissions.scope==='selected'?`<div class="folder-options">${['Work projects','Research','Shared documentation'].map(f=>`<label><input type="checkbox" data-folder="${f}" ${permissions.folders.includes(f)?'checked':''}> ▱ ${f}</label>`).join('')}</div>`:''}</div>`:''}<small>Demo permissions · No device access</small></section><div class="filterbar">`)};
let savedTicket;try{savedTicket=JSON.parse(localStorage.getItem('demo-ticket-progress'))}catch{}
let step=0,finished=false,ticketActive=false,reminder=false,notice='Notes are ready for review.';
let completed=new Set();
window.resetDemoTicket=()=>{step=0;finished=false;ticketActive=false;reminder=false;completed.clear();state.sessionActive=false;state.captureStarted=false;state.recording=false;state.testResult=null;state.code='function add(a, b) {\n  return a - b;\n}';saveTicket()};
function saveTicket(){localStorage.setItem('demo-ticket-progress',JSON.stringify({step,finished,active:ticketActive,completed:[...completed],code:state.code}))}

function milestone(id,title,summary){if(completed.has(id))return;completed.add(id);window.addStageKnowledge?.(id,title,summary);setUnread(true);saveTicket()}

let unread=localStorage.getItem('daily-list-unread')==='true';
function setUnread(value){unread=value;localStorage.setItem('daily-list-unread',String(value))}


function progress(){const current=finished?5:step+1;return `<section class="ticket-progress ticket-progress-minimal"><div class="ticket-progress-meter"><span>${current}/5</span><div class="ticket-track" role="progressbar" aria-label="Ticket progress" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${current}"><i style="width:${current*20}%"></i></div></div><div class="ticket-progress-step"><span>Current status</span><strong>${['Investigating','Implementing','Validating','Summarizing','Complete'][current-1]}</strong></div></section>`}
const baseAgent=agent;agent=function(){return baseAgent().replace('<nav class="agent-tools"',`${ticketActive||finished?progress():''}${reminder&&!state.review?`<section class="agent-daily-note"><p>${esc(notice)}</p><div><button data-nb="review">View today’s list →</button><button data-daily-cancel>Cancel</button></div></section>`:''}<nav class="agent-tools"`).replace('aria-label="Dashboard">',`aria-label="Dashboard" class="daily-list-button">${unread?'<i class="daily-unread-dot"></i>':''}`)};
window.captureAllowed=()=>permissions.record;
window.onRecordingStarted=()=>{finished=false;step=0;completed.clear();ticketActive=true;saveTicket()};
const originalLaunch=launchApp;launchApp=function(id){const appId=id==='chrome'?'browser':id;if(!state.sessionActive&&state.selected.includes(appId)&&permissions.record){state.sessionActive=true;state.sessionId=crypto.randomUUID();state.captureStarted=true;if(!ticketActive&&!finished)window.onRecordingStarted?.()}originalLaunch(id);if(id==='vscode'){ticketActive=true;saveTicket()}if(!permissions.record){state.recording=false}render()};
const previousEndApp=endApp;endApp=function(){const wasCode=state.codeOpen||state.activeApp==='vscode';if(wasCode&&state.sessionActive){const priorStep=step,wasFinished=finished;finishCapture();if(!wasFinished&&!state.testResult?.passed){step=priorStep;finished=false;ticketActive=true;saveTicket()}}previousEndApp();if(wasCode){notice='Notes are ready to review.';reminder=true;setUnread(true);state.agentCollapsed=false;state.agentPanel=null;render()}};
const originalToggle=toggleRecording;toggleRecording=function(){if(!permissions.record){toast('Enable screen recording in Settings first.');return}originalToggle()};
const originalRun=runExercise;runExercise=function(){originalRun();if(state.recording&&state.testResult?.passed){milestone('implementation','Implementation complete','Changed the arithmetic operator from subtraction to addition.');step=Math.max(step,3);milestone('validation','Validation complete','The positive, negative, and zero-input examples passed.')}saveTicket();render();};
const originalFinish=finishCapture;finishCapture=function(){if(!state.sessionActive)return;if(originalFinish()){ticketActive=true;step=4;finished=true;saveTicket();render()}};
document.addEventListener('click',e=>{const scopeButton=e.target.closest('[data-wf-scope]');if(scopeButton){scope=scopeButton.dataset.wfScope;kb.poolItem=null;render()}if(state.recording&&e.target.closest('[data-action="apply-fix"]')){ticketActive=true;step=Math.max(step,2);milestone('investigation','Investigation complete','Identified subtraction where addition was expected.');milestone('implementation','Implementation complete','Changed the arithmetic operator from subtraction to addition.');saveTicket();render()}});
document.addEventListener('input',e=>{if(state.recording&&e.target.id==='practice-code'){ticketActive=true;step=Math.max(step,1);milestone('investigation','Investigation complete','Identified the operator in the addition function as the change to investigate.');saveTicket();const panel=document.querySelector('.desktop-agent');if(panel)panel.outerHTML=agent();}});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.permission){permissions[t.dataset.permission]=t.checked;if(!permissions.record){state.recording=false}persist();render()}if(t.dataset.folderScope){permissions.scope=t.dataset.folderScope;persist();render()}if(t.dataset.folder){permissions.folders=t.checked?[...new Set([...permissions.folders,t.dataset.folder])]:permissions.folders.filter(f=>f!==t.dataset.folder);persist()}});

window.markDailyListUnread=()=>setUnread(true);
window.showDailyListReminder=()=>{notice='New notes are ready to check.';reminder=true;setUnread(true)};
window.markDailyListRead=()=>{reminder=false;setUnread(false)};
document.addEventListener('click',e=>{if(e.target.closest('[data-daily-cancel]')){reminder=false;render();return}if(e.target.closest('[data-nb="review"]')){reminder=false;setUnread(false)}},true);

render();
})();
