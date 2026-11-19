/* ================================================================
   LANGUWAY FRENCH — MAIN APP LOGIC
   ================================================================ */

// ── STATE ─────────────────────────────────────────────────────────
let curPage = 'home';
let lessonState = { lvId:null, step:0, data:null };
let plState = { step:0, scores:{}, startTime:null };
let sitState = { id:null };
let flashState = { idx:0, side:'front', cards:[] };
let aiHistory = [];
let tDir = 'fr-en';
let darkMode = false;

// ── UTILITY ────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
function esc(s){ return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function speak(txt, rate=1){
  if(!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(txt);
  u.lang='fr-FR'; u.rate=rate; u.pitch=1;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
function toast(msg, type='info'){
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = msg;
  document.body.appendChild(el);
  setTimeout(()=>el.classList.add('show'),10);
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.remove(),400); },3200);
}
function xpToast(xp){ toast(`+${xp} XP 🌟`,'xp'); }

// ── NAV ────────────────────────────────────────────────────────────
function nav(page){
  const user = authGetCurrent();
  if(!user && !['auth'].includes(page)){ showAuth(); return; }
  curPage = page;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const el = $(page+'-page');
  if(el) el.classList.add('active');
  document.querySelectorAll('.bnav-btn,.sb-item').forEach(b=>{
    b.classList.toggle('active', b.dataset.p===page);
  });
  closeSB();
  renderPage(page);
  window.scrollTo(0,0);
}

function renderPage(p){
  const fns = {
    home: renderHome, path: renderPath, wordbook: renderWordbook,
    training: renderTraining, situations: renderSits, progress: renderProgress,
    settings: renderSettings, stories: renderStories, explore: renderExplore,
    translator: ()=>openTranslator(), about: renderAbout, share: renderShare,
  };
  if(fns[p]) fns[p]();
}

// ── SIDEBAR ────────────────────────────────────────────────────────
function openSB(){ $('sidebar')?.classList.add('open'); $('overlay')?.classList.add('show'); document.body.style.overflow='hidden'; }
function closeSB(){ $('sidebar')?.classList.remove('open'); $('overlay')?.classList.remove('show'); document.body.style.overflow=''; }

// ── MODALS ─────────────────────────────────────────────────────────
function openM(id){ const m=$(id); if(m){ m.classList.add('open'); document.body.style.overflow='hidden'; } }
function closeM(id){ const m=$(id); if(m){ m.classList.remove('open'); document.body.style.overflow=''; } }

// ── AUTH PAGE ──────────────────────────────────────────────────────
function showAuth(tab='login'){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  $('auth-page')?.classList.add('active');
  switchAuthTab(tab);
  curPage='auth';
}
function switchAuthTab(tab){
  document.querySelectorAll('.auth-tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  $('auth-login-form')?.style.setProperty('display', tab==='login'?'flex':'none');
  $('auth-reg-form')?.style.setProperty('display', tab==='register'?'flex':'none');
}
function doLogin(){
  const email = $('li-email')?.value.trim();
  const pass  = $('li-pass')?.value;
  if(!email||!pass){ toast('Veuillez remplir tous les champs.','err'); return; }
  const res = authLogin(email, pass);
  if(!res.ok){ toast(res.msg,'err'); return; }
  toast('Bon retour! 🎉','ok');
  initApp();
}
function doRegister(){
  const name  = $('rg-name')?.value.trim();
  const email = $('rg-email')?.value.trim();
  const pass  = $('rg-pass')?.value;
  const goal  = $('rg-goal')?.value;
  if(!name||!email||!pass){ toast('Veuillez remplir tous les champs.','err'); return; }
  if(pass.length<6){ toast('Mot de passe: 6 caractères minimum.','err'); return; }
  const res = authRegister(name, email, pass, goal);
  if(!res.ok){ toast(res.msg,'err'); return; }
  toast('Compte créé avec succès! Bienvenue 🎊','ok');
  startPlacement();
}
function doLogout(){
  if(confirm('Voulez-vous vraiment vous déconnecter?')){ authLogout(); }
}

// ── TIERS & XP ─────────────────────────────────────────────────────
const TIERS=[
  {min:0,   max:200,  name:'Débutant',    icon:'🌱', color:'#4F46E5'},
  {min:200, max:600,  name:'Apprenti',    icon:'📚', color:'#1D4ED8'},
  {min:600, max:1200, name:'Intermédiaire',icon:'⚡', color:'#0D9488'},
  {min:1200,max:2500, name:'Avancé',      icon:'🔥', color:'#D97706'},
  {min:2500,max:5000, name:'Expert',      icon:'💎', color:'#7C3AED'},
  {min:5000,max:99999,name:'Maître',      icon:'👑', color:'#B91C1C'},
];
function getTier(xp){ return TIERS.find(t=>xp>=t.min&&xp<t.max)||TIERS[0]; }
function updateChip(){
  const user = authGetCurrent();
  const el = $('lvl-chip');
  if(el) el.textContent = user ? (user.completedLevels?.length||0)+' Niveaux' : '—';
}

// ── HOME ───────────────────────────────────────────────────────────
function getGreet(){
  const h=new Date().getHours();
  if(h<6)  return 'Bonne nuit';
  if(h<12) return 'Bonjour';
  if(h<18) return 'Bon après-midi';
  return 'Bonsoir';
}
function renderHome(){
  const el = $('home-page'); if(!el) return;
  const user = authGetCurrent();
  if(!user){ el.innerHTML=`<div class="auth-prompt"><div class="auth-prompt-ic">🇫🇷</div><h2>Bienvenue dans Languway French</h2><p>Connectez-vous pour accéder à tout le contenu.</p><div style="display:flex;gap:10px;margin-top:16px"><button class="btn btn-p" onclick="showAuth('login')">Se connecter</button><button class="btn btn-o" onclick="showAuth('register')">S\'inscrire</button></div></div>`; return; }
  const tier = getTier(user.xp||0);
  const done = user.completedLevels?.length||0;
  const streak = user.streak||0;
  const totalLessons = done * 6;
  const nextPct = done<30 ? Math.round(((user.xp||0)-tier.min)/(tier.max-tier.min)*100) : 100;
  const wod = WORD_OF_DAY[new Date().getDate()%WORD_OF_DAY.length];

  el.innerHTML=`
  <div class="hero">
    <div class="hero-ornament">✦ ${getGreet()}, ${esc(user.name)} ✦</div>
    <h1 class="hero-title">Continuez votre<br><em>voyage en français</em></h1>
    <p class="hero-sub">Chaque leçon vous rapproche de la maîtrise.</p>
    <div class="hero-divider"><span>AUJOURD'HUI</span></div>
  </div>

  <div class="stats-strip">
    <div class="stat-box"><div class="stat-v">${user.xp||0}</div><div class="stat-l">XP Total</div></div>
    <div class="stat-box"><div class="stat-v">${done}</div><div class="stat-l">Niveaux</div></div>
    <div class="stat-box"><div class="stat-v">${streak}🔥</div><div class="stat-l">Jours</div></div>
    <div class="stat-box"><div class="stat-v">${totalLessons}</div><div class="stat-l">Leçons</div></div>
  </div>

  <div class="card">
    <div class="tier-row">
      <span class="tier-ic">${tier.icon}</span>
      <div class="tier-info">
        <span class="tier-nm">${tier.name}</span>
        <div class="tier-bar"><div class="tier-fill" style="width:${nextPct}%;background:${tier.color}"></div></div>
      </div>
      <span class="tier-xp">${user.xp||0} XP</span>
    </div>
  </div>

  ${done===0?`<div class="card placement-card">
    <div class="pl-ornament">📋 TEST DE PLACEMENT</div>
    <div class="card-title">Découvrez votre niveau</div>
    <p style="font-size:.84rem;color:var(--txt2);margin:8px 0 14px">Passez le test de placement pour commencer au bon niveau.</p>
    <button class="btn btn-p" style="width:100%" onclick="startPlacement()">🎯 Commencer le test</button>
  </div>`:''}

  ${renderNextLessonCard()}

  <div class="card">
    <div class="card-lbl">🗺️ Votre parcours</div>
    ${renderRoadmapMini()}
    <button class="btn btn-o btn-sm" style="width:100%;margin-top:12px" onclick="nav('path')">Voir tout le parcours →</button>
  </div>

  <div class="card" style="border-left:3px solid #EAB308">
    <div class="card-lbl">✨ Mot du jour</div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
      <div class="card-title">${esc(wod.fr)}</div>
      <button class="btn-tts" onclick="speak('${esc(wod.fr)}')">🔊</button>
    </div>
    <div style="font-size:.8rem;color:var(--txt2);margin-bottom:4px">[${esc(wod.pron)}] · ${esc(wod.type)}</div>
    <div style="font-size:.88rem;margin-bottom:6px">${esc(wod.eng)}</div>
    <div style="font-size:.84rem;color:var(--cr);font-style:italic">"${esc(wod.ex)}"</div>
    <div style="font-size:.76rem;color:var(--txt3);margin-top:6px">💡 ${esc(wod.note)}</div>
  </div>

  <div class="quick-grid">
    <div class="quick-btn-card" onclick="nav('training')"><div class="qb-ic">🎯</div><div class="qb-nm">Entraînement</div><div class="qb-ds">Flashcards & Quiz</div></div>
    <div class="quick-btn-card" onclick="nav('situations')"><div class="qb-ic">💬</div><div class="qb-nm">Situations</div><div class="qb-ds">Conversations réelles</div></div>
    <div class="quick-btn-card" onclick="nav('stories')"><div class="qb-ic">📖</div><div class="qb-nm">Histoires</div><div class="qb-ds">Lecture guidée</div></div>
    <div class="quick-btn-card" onclick="nav('explore')"><div class="qb-ic">🔍</div><div class="qb-nm">Explorer</div><div class="qb-ds">Grammaire & Culture</div></div>
  </div>`;
}

function renderNextLessonCard(){
  const user = authGetCurrent(); if(!user) return '';
  const done = user.completedLevels||[];
  const next = LVS.find(l=>!done.includes(l.id));
  if(!next) return `<div class="card nl-card"><div class="nl-row"><span style="font-size:1.6rem">🏆</span><div><div style="font-weight:600">Félicitations!</div><div style="font-size:.82rem;color:var(--txt2)">Tous les niveaux complétés!</div></div></div></div>`;
  const band = BANDS[next.band];
  return `<div class="card nl-card" style="border-left:3px solid ${band.color}">
    <div class="card-lbl">▶ Prochaine leçon</div>
    <div class="nl-row">
      <span style="font-size:1.6rem">${next.icon}</span>
      <div style="flex:1">
        <div style="font-weight:600">${esc(next.name)}</div>
        <div style="font-size:.78rem;color:var(--txt2)">${esc(next.desc)}</div>
        <div style="font-size:.72rem;margin-top:3px"><span style="background:${band.bg};color:${band.color};padding:2px 8px;border-radius:10px">${band.label}</span> <span style="color:var(--txt3)">+${next.xp} XP</span></div>
      </div>
      <button class="btn btn-p btn-sm" onclick="startLevel(${next.id})">▶</button>
    </div>
  </div>`;
}

function renderRoadmapMini(){
  const user = authGetCurrent();
  const done = user?.completedLevels||[];
  return Object.entries(BANDS).map(([key,band])=>{
    const total = LVS.filter(l=>l.band===key).length;
    const comp  = LVS.filter(l=>l.band===key&&done.includes(l.id)).length;
    const pct   = total ? Math.round(comp/total*100) : 0;
    return `<div class="roadmap-row"><div class="rm-label" style="color:${band.color}">${band.label}</div><div class="rm-track"><div style="width:${pct}%;height:100%;background:${band.color};border-radius:4px;transition:width .6s"></div></div><div class="rm-pct">${pct}%</div></div>`;
  }).join('');
}

// ── PATH ───────────────────────────────────────────────────────────
let curBand = 'pre-a1';
function renderPath(){
  const el=$('path-page'); if(!el) return;
  const user=authGetCurrent();
  const done=user?.completedLevels||[];
  el.innerHTML=`
  <div class="page-header"><h2 class="page-title">🗺️ Mon Parcours</h2><p class="page-sub">Pre-A1 → C2 · 30 Niveaux</p></div>
  <div class="band-tabs" id="band-tabs">
    ${Object.entries(BANDS).map(([k,b])=>`<button class="band-tab${k===curBand?' active':''}" onclick="switchBand('${k}')" style="--bc:${b.color}">${b.label}</button>`).join('')}
  </div>
  <div id="band-body"></div>`;
  renderBand(curBand);
}
function switchBand(b){ curBand=b; renderPath(); }
function renderBand(band){
  const el=$('band-body'); if(!el) return;
  const user=authGetCurrent();
  const done=user?.completedLevels||[];
  const levels=LVS.filter(l=>l.band===band);
  const b=BANDS[band];
  el.innerHTML=`
  <div class="band-info"><div style="font-size:.82rem;color:var(--txt2)">${esc(b.desc)}</div></div>
  <div class="levels-grid">
    ${levels.map(lv=>{
      const isD=done.includes(lv.id);
      const isN=!isD&&(lv.id===1||done.includes(lv.id-1));
      return `<div class="level-card${isD?' done':isN?' next':''}">
        <div class="lv-top">
          <span class="lv-ic">${lv.icon}</span>
          <span class="lv-code" style="color:${b.color}">${lv.code}</span>
          ${isD?'<span class="lv-check">✓</span>':''}
        </div>
        <div class="lv-name">${esc(lv.name)}</div>
        <div class="lv-desc">${esc(lv.desc)}</div>
        <div class="lv-footer">
          <span class="lv-xp">+${lv.xp} XP</span>
          <button class="btn btn-sm ${isD?'btn-g':'btn-p'}" onclick="startLevel(${lv.id})">${isD?'🔁 Revoir':'▶ Commencer'}</button>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

// ── LESSON ─────────────────────────────────────────────────────────
function startLevel(id){
  const data = getLesson(id);
  if(!data){ toast('Leçon en cours de développement.','info'); return; }
  lessonState = { lvId:id, step:0, data };
  openM('m-lesson');
  renderLesStep();
}
function renderLesStep(){
  const { data, step } = lessonState;
  const box = $('m-lesson')?.querySelector('.modal-box');
  if(!box) return;
  const s = data.steps[step];
  const total = data.steps.length;
  const pct = Math.round((step/total)*100);
  box.innerHTML=`
  <div class="les-top">
    <button class="btn-ic" onclick="closeM('m-lesson')" style="flex-shrink:0">✕</button>
    <div style="flex:1;margin:0 10px">
      <div style="font-size:.7rem;color:var(--txt3);margin-bottom:4px">${esc(data.title)} · ${step+1}/${total}</div>
      <div style="height:4px;background:var(--bg2);border-radius:2px"><div style="width:${pct}%;height:100%;background:var(--cr);border-radius:2px;transition:width .4s"></div></div>
    </div>
    <button class="btn-ic" onclick="closeM('m-lesson')">✕</button>
  </div>
  <div id="les-body" style="flex:1;overflow-y:auto;padding:16px 16px 8px"></div>
  <div class="les-nav">
    ${step>0?`<button class="btn btn-g btn-sm" onclick="prevLes()">← Retour</button>`:'<div></div>'}
    <button class="btn btn-p" id="les-nxt" onclick="nextLes()">
      ${step===total-1?'Terminer ✓':'Suivant →'}
    </button>
  </div>`;
  renderStep(s);
}
function prevLes(){ if(lessonState.step>0){ lessonState.step--; renderLesStep(); } }
function nextLes(){
  const { data, step } = lessonState;
  if(step>=data.steps.length-1){ finishLesson(); return; }
  lessonState.step++;
  renderLesStep();
}
function finishLesson(){
  const { lvId, data } = lessonState;
  const lv = LVS.find(l=>l.id===lvId);
  authUpdateProgress(lvId, lv?.xp||50);
  xpToast(lv?.xp||50);
  closeM('m-lesson');
  showCompletion(lvId);
  renderHome(); renderPath();
}
function showCompletion(lvId){
  const lv=LVS.find(l=>l.id===lvId);
  const box=$('m-complete')?.querySelector('.modal-box');
  if(!box||!lv) return;
  box.innerHTML=`
  <div style="text-align:center;padding:32px 20px">
    <div style="font-size:4rem;margin-bottom:16px">🎉</div>
    <div style="font-family:var(--ffs);font-size:1.6rem;font-weight:700;margin-bottom:8px">Niveau terminé!</div>
    <div style="color:var(--txt2);margin-bottom:16px">${esc(lv.name)}</div>
    <div style="font-size:2rem;font-weight:800;color:var(--cr);margin-bottom:20px">+${lv.xp} XP 🌟</div>
    <button class="btn btn-p" style="width:100%" onclick="closeM('m-complete')">Continuer →</button>
  </div>`;
  openM('m-complete');
}
function renderStep(s){
  const body=$('les-body'); if(!body) return;
  const fns={intro:renderIntro,vocab:renderVocab,grammar:renderGrammar,exercise:renderExercise,fill:renderFill,dragdrop:renderDD,dialogue:renderDialogue,speak:renderSpeak,summary:renderSummary};
  if(fns[s.type]) fns[s.type](s, body);
  else body.innerHTML=`<div class="card"><h3>${esc(s.title||'')}</h3></div>`;
}
function renderIntro(s,el){
  el.innerHTML=`
  <div class="step-intro">
    <h2 class="step-title">${esc(s.title)}</h2>
    <p class="step-text">${esc(s.text)}</p>
    ${s.tip?`<div class="tip-box">💡 ${esc(s.tip)}</div>`:''}
  </div>`;
}
function renderVocab(s,el){
  el.innerHTML=`<h3 class="step-h3">${esc(s.title)}</h3>
  <div class="vocab-list">
    ${s.words.map(w=>`<div class="vocab-item">
      <div class="vi-top"><span class="vi-fr">${esc(w.fr)}</span><button class="btn-tts" onclick="speak('${esc(w.fr)}')">🔊</button></div>
      <div class="vi-pron">[${esc(w.pron||'')}]</div>
      <div class="vi-mean">${esc(w.meaning)}</div>
      ${w.ex?`<div class="vi-ex">"${esc(w.ex)}"</div>`:''}
    </div>`).join('')}
  </div>`;
}
function renderGrammar(s,el){
  const r=s.rule;
  el.innerHTML=`<h3 class="step-h3">${esc(s.title)}</h3>
  <div class="grammar-box">
    <div class="gb-title">${esc(r.title)}</div>
    <table class="conj-table">
      ${(r.rows||[]).map(row=>`<tr><td class="ct-fr">${esc(row[0])}</td><td class="ct-tr">${esc(row[1])}</td></tr>`).join('')}
    </table>
    ${r.note?`<div class="gb-note">📌 ${esc(r.note)}</div>`:''}
  </div>`;
}
function renderExercise(s,el){
  el.innerHTML=`<h3 class="step-h3">${esc(s.title)}</h3>
  <div class="quiz-q">${esc(s.question)}</div>
  <div class="quiz-opts" id="q-opts">
    ${s.opts.map((o,i)=>`<button class="q-btn" onclick="checkEx(${i},${s.ans},'${esc(s.exp)}',this)">${esc(o)}</button>`).join('')}
  </div>
  <div class="feedback-box" id="ex-fb"></div>`;
}
function checkEx(idx,ans,exp,btn){
  const opts=document.querySelectorAll('#q-opts .q-btn');
  opts.forEach((b,i)=>{ b.disabled=true; b.classList.toggle('correct',i===ans); b.classList.toggle('wrong',i!==ans&&i===idx); });
  const fb=$('ex-fb');
  if(fb) fb.innerHTML=`<div class="${idx===ans?'fb-ok':'fb-err'}">${idx===ans?'✅ Correct!':'❌ Incorrect.'} ${esc(exp)}</div>`;
  if(idx===ans) xpToast(10);
  setTimeout(()=>nextLes(),1800);
}
function renderFill(s,el){
  el.innerHTML=`<h3 class="step-h3">${esc(s.title)}</h3>
  <div class="fill-prompt">${esc(s.prompt)}</div>
  <input class="fill-inp" type="text" placeholder="Votre réponse..." id="fill-ans" onkeydown="if(event.key==='Enter')checkFill()"/>
  <div class="fill-hint">💡 Indice: ${esc(s.hint)}</div>
  <button class="btn btn-p" onclick="checkFill()" style="margin-top:10px">Vérifier</button>
  <div class="feedback-box" id="fill-fb"></div>`;
}
function checkFill(){
  const val=($('fill-ans')?.value||'').trim().toLowerCase();
  const s=lessonState.data.steps[lessonState.step];
  const ans=s.answer.toLowerCase();
  const fb=$('fill-fb');
  if(val===ans||val.replace(/\s+/g,' ')===ans){
    if(fb) fb.innerHTML=`<div class="fb-ok">✅ Parfait!</div>`;
    xpToast(15);
    setTimeout(()=>nextLes(),1400);
  } else {
    if(fb) fb.innerHTML=`<div class="fb-err">❌ La bonne réponse est: <strong>${esc(s.answer)}</strong></div>`;
  }
}
function renderDD(s,el){
  let placed=[]; let bank=[...s.words];
  el.innerHTML=`<h3 class="step-h3">${esc(s.title)}</h3>
  <div class="dd-instr">${esc(s.instruction)}</div>
  <div class="dd-zone" id="dd-zone"><span class="dd-ph">Déposez les mots ici...</span></div>
  <div class="dd-bank" id="dd-bank">${bank.map((w,i)=>`<button class="dd-word" onclick="ddClick(this,'${esc(w)}')">${esc(w)}</button>`).join('')}</div>
  <button class="btn btn-p btn-sm" onclick="checkDD('${esc(s.correct)}')" style="margin-top:10px">Vérifier</button>
  <div class="feedback-box" id="dd-fb"></div>`;
}
function ddClick(el,word){
  const zone=$('dd-zone');
  if(!zone) return;
  const ph=zone.querySelector('.dd-ph');
  if(ph) ph.remove();
  const btn=document.createElement('button');
  btn.className='dd-word placed';
  btn.textContent=word;
  btn.onclick=()=>{ btn.remove(); el.style.display=''; };
  zone.appendChild(btn);
  el.style.display='none';
}
function checkDD(correct){
  const zone=$('dd-zone');
  const placed=Array.from(zone?.querySelectorAll('.dd-word')||[]).map(b=>b.textContent).join(' ');
  const fb=$('dd-fb');
  if(placed===correct){
    if(fb) fb.innerHTML=`<div class="fb-ok">✅ Parfait!</div>`;
    xpToast(15);
    setTimeout(()=>nextLes(),1400);
  } else {
    if(fb) fb.innerHTML=`<div class="fb-err">❌ Réponse correcte: <strong>${esc(correct)}</strong></div>`;
  }
}
function renderDialogue(s,el){
  el.innerHTML=`<h3 class="step-h3">${esc(s.title)}</h3>
  <div class="dialogue">
    ${s.lines.map(l=>`<div class="dl-line ${l.b?'dl-b':'dl-a'}">
      <div class="dl-spk">${esc(l.speaker)}</div>
      <div class="dl-bubble">
        <div class="dl-fr">${esc(l.fr)}</div>
        <div class="dl-tr">${esc(l.tr)}</div>
        <button class="btn-tts" onclick="speak('${esc(l.fr)}')">🔊</button>
      </div>
    </div>`).join('')}
  </div>`;
}
function renderSpeak(s,el){
  el.innerHTML=`<h3 class="step-h3">${esc(s.title)}</h3>
  <div class="speak-box">
    <div class="speak-phrase">${esc(s.phrase)}</div>
    <div class="speak-tr">${esc(s.translation)}</div>
    <div style="display:flex;gap:8px;margin-top:14px">
      <button class="btn btn-o btn-sm" onclick="speak('${esc(s.phrase)}')">🔊 Écouter</button>
      <button class="btn btn-o btn-sm" onclick="speak('${esc(s.phrase)}',0.6)">🐢 Lent</button>
    </div>
    <div class="speak-tip">👆 Répétez la phrase à voix haute après avoir écouté.</div>
  </div>`;
}
function renderSummary(s,el){
  el.innerHTML=`<h3 class="step-h3">${esc(s.title)}</h3>
  <div class="summary-box">
    ${s.points.map(p=>`<div class="sum-row">✅ ${esc(p)}</div>`).join('')}
  </div>
  <div style="text-align:center;margin-top:20px;font-size:2rem">🎊</div>`;
}

// ── PLACEMENT TEST ─────────────────────────────────────────────────
const PL_QS=[
  {q:'Comment dit-on "Hello" en français?',opts:['Merci','Bonjour','Au revoir','Bonsoir'],ans:1,lvl:'pre-a1'},
  {q:'Choisissez le bon article: ___ maison.',opts:['le','la','les','un'],ans:1,lvl:'pre-a1'},
  {q:'Conjuguez "être": Je ___',opts:['es','est','suis','sommes'],ans:2,lvl:'a1'},
  {q:'"I have" en français:',opts:['Je suis','J\'ai','Je veux','Je fais'],ans:1,lvl:'a1'},
  {q:'Le passé composé de "manger": J\'ai ___',opts:['manger','mange','mangé','mangerai'],ans:2,lvl:'a2'},
  {q:'Choisissez le bon temps: Hier, je ___ au cinéma. (aller)',opts:['allais','suis allé','vais aller','irai'],ans:1,lvl:'a2'},
  {q:'"Although it rains, I walk." Utilisez le subjonctif:',opts:['Bien qu\'il pleuve','Bien qu\'il pleut','Parce qu\'il pleut','Quand il pleut'],ans:0,lvl:'b1'},
  {q:'L\'imparfait de "habiter": Quand j\'étais enfant, j\'___ à Lyon.',opts:['habitais','ai habité','habite','habiterai'],ans:0,lvl:'b1'},
  {q:'Le conditionnel de "vouloir": Je ___ visiter Paris.',opts:['veux','voudrais','voulais','voulu'],ans:1,lvl:'b2'},
  {q:'Choisissez le bon mode: Il est important que vous ___ à l\'heure.',opts:['êtes','serez','soyez','étiez'],ans:2,lvl:'b2'},
];
function startPlacement(){
  plState={step:0,scores:{},startTime:Date.now()};
  openM('m-placement');
  renderPl();
}
function renderPl(){
  const box=$('m-placement')?.querySelector('.modal-box');
  if(!box) return;
  if(plState.step>=PL_QS.length){ finishPl(); return; }
  const q=PL_QS[plState.step];
  const pct=Math.round(plState.step/PL_QS.length*100);
  box.innerHTML=`
  <div class="les-top">
    <div style="flex:1">
      <div style="font-size:.7rem;color:var(--cr);font-weight:700;margin-bottom:4px">TEST DE PLACEMENT · ${plState.step+1}/${PL_QS.length}</div>
      <div style="height:4px;background:var(--bg2);border-radius:2px"><div style="width:${pct}%;height:100%;background:var(--cr);border-radius:2px"></div></div>
    </div>
  </div>
  <div style="padding:20px">
    <div class="quiz-q">${esc(q.q)}</div>
    <div class="quiz-opts">
      ${q.opts.map((o,i)=>`<button class="q-btn" onclick="answerPl(${i},${q.ans},'${q.lvl}',this)">${esc(o)}</button>`).join('')}
    </div>
  </div>`;
}
function answerPl(idx,ans,lvl,btn){
  const opts=document.querySelectorAll('#m-placement .q-btn');
  opts.forEach((b,i)=>{ b.disabled=true; b.classList.toggle('correct',i===ans); b.classList.toggle('wrong',i!==ans&&i===idx); });
  if(idx===ans){ plState.scores[lvl]=(plState.scores[lvl]||0)+1; }
  setTimeout(()=>{ plState.step++; renderPl(); },900);
}
function finishPl(){
  const sc=plState.scores;
  let level='pre-a1';
  if((sc['c1']||0)>=1) level='c1';
  else if((sc['b2']||0)>=1) level='b2';
  else if((sc['b1']||0)>=2) level='b1';
  else if((sc['a2']||0)>=1) level='a2';
  else if((sc['a1']||0)>=2) level='a1';
  authUpdateUser({ placementDone:true, currentLevel:level });
  const box=$('m-placement')?.querySelector('.modal-box');
  if(box) box.innerHTML=`
  <div style="text-align:center;padding:36px 20px">
    <div style="font-size:3.5rem;margin-bottom:16px">🎯</div>
    <div style="font-family:var(--ffs);font-size:1.5rem;font-weight:700;margin-bottom:8px">Résultat du test</div>
    <div style="color:var(--txt2);font-size:.88rem;margin-bottom:16px">Votre niveau estimé:</div>
    <div style="font-size:2.5rem;font-weight:800;color:var(--cr);margin-bottom:8px">${(BANDS[level]?.label||level).toUpperCase()}</div>
    <div style="color:var(--txt2);font-size:.84rem;margin-bottom:24px">${esc(BANDS[level]?.desc||'')}</div>
    <button class="btn btn-p" style="width:100%" onclick="closeM('m-placement');nav('path')">Voir mon parcours →</button>
  </div>`;
}

// ── WORDBOOK ───────────────────────────────────────────────────────
function renderWordbook(){
  const el=$('wordbook-page'); if(!el) return;
  const user=authGetCurrent();
  const saved=user?.savedWords||[];
  el.innerHTML=`
  <div class="page-header"><h2 class="page-title">📖 Carnet de Vocabulaire</h2><p class="page-sub">${DICTIONARY.length} mots · ${saved.length} sauvegardés</p></div>
  <input class="wb-search" type="text" placeholder="Rechercher un mot..." oninput="filterDict(this.value)" id="wb-s"/>
  <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
    <select id="wb-type" class="wb-filter" onchange="filterDict($('wb-s').value)">
      <option value="">Tous les types</option>
      <option value="verb">Verbes</option>
      <option value="noun">Noms</option>
      <option value="adj">Adjectifs</option>
      <option value="excl">Exclamations</option>
    </select>
    <select id="wb-lvl" class="wb-filter" onchange="filterDict($('wb-s').value)">
      <option value="">Tous les niveaux</option>
      ${['A1','A2','B1','B2','C1'].map(l=>`<option value="${l}">${l}</option>`).join('')}
    </select>
  </div>
  <div id="dict-list"></div>`;
  filterDict('');
}
function filterDict(q){
  const type=($('wb-type')?.value||'').toLowerCase();
  const lvl=($('wb-lvl')?.value||'').toLowerCase();
  const words=DICTIONARY.filter(w=>{
    const matchQ=!q||(w.fr+w.eng+w.ar).toLowerCase().includes(q.toLowerCase());
    const matchT=!type||w.type===type;
    const matchL=!lvl||w.level.toLowerCase()===lvl;
    return matchQ&&matchT&&matchL;
  });
  const el=$('dict-list'); if(!el) return;
  if(!words.length){ el.innerHTML='<div style="text-align:center;color:var(--txt3);padding:32px">Aucun résultat</div>'; return; }
  el.innerHTML=words.map(w=>`<div class="dict-card">
    <div class="dc-top">
      <div>
        <span class="dc-fr">${esc(w.fr)}</span>
        <span class="dc-pron">[${esc(w.pron)}]</span>
        <span class="dc-type">${w.type}</span>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn-tts" onclick="speak('${esc(w.fr)}')">🔊</button>
        <button class="btn-tts" onclick="saveWord('${esc(w.fr)}')" title="Sauvegarder">🔖</button>
      </div>
    </div>
    <div class="dc-eng">${esc(w.eng)}</div>
    <div class="dc-ar">${esc(w.ar)}</div>
    <div class="dc-ex">"${esc(w.ex)}"</div>
    ${w.note?`<div class="dc-note">💡 ${esc(w.note)}</div>`:''}
    <div class="dc-syn">Synonymes: ${(w.syn||[]).map(s=>`<span class="syn-chip">${esc(s)}</span>`).join('')}</div>
    <div class="dc-lvl" style="margin-top:4px"><span class="level-chip">${w.level}</span></div>
  </div>`).join('');
}
function saveWord(fr){
  const user=authGetCurrent(); if(!user) return;
  const saved=user.savedWords||[];
  if(!saved.includes(fr)){
    authUpdateUser({savedWords:[...saved,fr]});
    toast(`"${fr}" sauvegardé! 🔖`,'ok');
  } else {
    toast('Déjà dans votre carnet.','info');
  }
}

// ── TRAINING ───────────────────────────────────────────────────────
function renderTraining(){
  const el=$('training-page'); if(!el) return;
  el.innerHTML=`
  <div class="page-header"><h2 class="page-title">🎯 Entraînement</h2></div>
  <div class="training-grid">
    <div class="tr-card" onclick="startFlash()">
      <div class="tr-ic">🃏</div><div class="tr-nm">Flashcards</div>
      <div class="tr-ds">Mémorisez le vocabulaire</div>
    </div>
    <div class="tr-card" onclick="startQuiz()">
      <div class="tr-ic">❓</div><div class="tr-nm">Quiz Rapide</div>
      <div class="tr-ds">Testez vos connaissances</div>
    </div>
    <div class="tr-card" onclick="startListening()">
      <div class="tr-ic">🎧</div><div class="tr-nm">Écoute</div>
      <div class="tr-ds">Entraînez votre oreille</div>
    </div>
    <div class="tr-card" onclick="startSpeaking()">
      <div class="tr-ic">🎤</div><div class="tr-nm">Expression Orale</div>
      <div class="tr-ds">Parlez à voix haute</div>
    </div>
    <div class="tr-card" onclick="startGrammarDrill()">
      <div class="tr-ic">📐</div><div class="tr-nm">Grammaire</div>
      <div class="tr-ds">Exercices de grammaire</div>
    </div>
    <div class="tr-card" onclick="startReview()">
      <div class="tr-ic">🔄</div><div class="tr-nm">Révision</div>
      <div class="tr-ds">Revoir les difficultés</div>
    </div>
  </div>`;
}
function startFlash(){
  const cards=DICTIONARY.slice(0,20);
  flashState={idx:0,side:'front',cards};
  openM('m-flash');
  renderFlash();
}
function renderFlash(){
  const box=$('m-flash')?.querySelector('.modal-box'); if(!box) return;
  const c=flashState.cards[flashState.idx];
  box.innerHTML=`
  <div class="les-top">
    <button class="btn-ic" onclick="closeM('m-flash')">✕</button>
    <div style="flex:1;text-align:center;font-size:.8rem;color:var(--txt3)">${flashState.idx+1}/${flashState.cards.length}</div>
    <div style="width:36px"></div>
  </div>
  <div style="padding:20px;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center">
    <div class="flash-card" onclick="flipFlash()">
      ${flashState.side==='front'
        ?`<div style="text-align:center"><div style="font-size:2rem;font-weight:700;color:var(--cr);margin-bottom:8px">${esc(c.fr)}</div><div style="font-size:.82rem;color:var(--txt3)">[${esc(c.pron)}]</div><div style="margin-top:16px;font-size:.78rem;color:var(--txt3)">Tapez pour voir la traduction</div></div>`
        :`<div style="text-align:center"><div style="font-size:1.3rem;font-weight:600;margin-bottom:6px">${esc(c.eng)}</div><div style="font-size:1.1rem;color:var(--txt2)">${esc(c.ar)}</div><div style="font-size:.82rem;font-style:italic;color:var(--txt3);margin-top:12px">"${esc(c.ex)}"</div></div>`
      }
    </div>
    <div style="display:flex;gap:12px;margin-top:20px">
      <button class="btn btn-g btn-sm" onclick="prevFlash()">←</button>
      <button class="btn btn-o btn-sm" onclick="speak('${esc(c.fr)}')">🔊</button>
      <button class="btn btn-p btn-sm" onclick="nextFlash()">→</button>
    </div>
  </div>`;
}
function flipFlash(){ flashState.side=flashState.side==='front'?'back':'front'; renderFlash(); }
function nextFlash(){ if(flashState.idx<flashState.cards.length-1){ flashState.idx++; flashState.side='front'; renderFlash(); } else { toast('Fin des flashcards! 🎉','ok'); closeM('m-flash'); } }
function prevFlash(){ if(flashState.idx>0){ flashState.idx--; flashState.side='front'; renderFlash(); } }

function startQuiz(){
  const qs=DICTIONARY.slice(0,12).map(w=>({
    q:`Que signifie "${w.fr}"?`,
    opts:shuffleArr([w.eng,...DICTIONARY.filter(x=>x!==w).slice(0,3).map(x=>x.eng)]),
    ans:0,
    _correct:w.eng,
  })).map(q=>({...q,ans:q.opts.indexOf(q._correct)}));
  lessonState={lvId:null,step:0,data:{title:'Quiz Rapide',steps:qs.map(q=>({type:'exercise',...q,exp:`La réponse correcte est "${q.opts[q.ans]}"`}))}};
  openM('m-lesson');
  renderLesStep();
}
function shuffleArr(a){ return a.sort(()=>Math.random()-.5); }

function startListening(){
  const words=DICTIONARY.slice(0,10);
  openM('m-lesson');
  lessonState={lvId:null,step:0,data:{title:'Exercice d\'Écoute',steps:words.map(w=>({type:'speak',title:`Écoute et mémorise`,phrase:w.fr,translation:w.eng}))}};
  renderLesStep();
}
function startSpeaking(){
  const phrases=['Bonjour, comment allez-vous?','Je m\'appelle Marie, et vous?','Je voudrais un café, s\'il vous plaît.','Où est la gare, s\'il vous plaît?','C\'est combien?'];
  openM('m-lesson');
  lessonState={lvId:null,step:0,data:{title:'Expression Orale',steps:phrases.map((p,i)=>({type:'speak',title:`Phrase ${i+1}`,phrase:p,translation:''}))}};
  renderLesStep();
}
function startGrammarDrill(){
  openM('m-lesson');
  const tip = GRAMMAR_TIPS[0];
  lessonState={lvId:null,step:0,data:{title:'Exercice de Grammaire',steps:[
    {type:'intro',title:tip.topic,text:tip.rule,tip:`Exemples: ${tip.examples.join(', ')}`},
    ...tip.test.map(t=>({type:'exercise',title:'Testez-vous',question:t.q,opts:t.opts,ans:t.ans,exp:t.exp})),
  ]}};
  renderLesStep();
}
function startReview(){
  const user=authGetCurrent();
  const missed=user?.missedWords||[];
  if(!missed.length){ toast('Aucune révision nécessaire! Continuez comme ça 🌟','ok'); return; }
  toast('Révision des mots difficiles...','info');
  startFlash();
}

// ── SITUATIONS ─────────────────────────────────────────────────────
function renderSits(){
  const el=$('situations-page'); if(!el) return;
  el.innerHTML=`
  <div class="page-header"><h2 class="page-title">💬 Situations Réelles</h2><p class="page-sub">Pratiquez dans des contextes authentiques</p></div>
  <div class="sit-grid">
    ${SITUATIONS.map(s=>`<div class="sit-card" onclick="openSit('${s.id}')">
      <div class="sit-ic">${s.icon}</div>
      <div class="sit-nm">${esc(s.name)}</div>
      <div class="sit-ds">${esc(s.desc)}</div>
    </div>`).join('')}
  </div>`;
}
function openSit(id){
  const s=SITUATIONS.find(x=>x.id===id); if(!s) return;
  sitState={id};
  const box=$('m-sit')?.querySelector('.modal-box'); if(!box) return;
  box.innerHTML=`
  <div class="les-top">
    <button class="btn-ic" onclick="closeM('m-sit')">✕</button>
    <div style="flex:1;text-align:center;font-weight:600">${s.icon} ${esc(s.name)}</div>
    <div style="width:36px"></div>
  </div>
  <div style="padding:16px">
    <div class="dialogue">
      ${s.lines.map(l=>`<div class="dl-line ${l.b?'dl-b':'dl-a'}">
        <div class="dl-spk">${esc(l.speaker)}</div>
        <div class="dl-bubble">
          <div class="dl-fr">${esc(l.fr)}</div>
          <div class="dl-tr">${esc(l.tr)}</div>
          <button class="btn-tts" onclick="speak('${esc(l.fr)}')">🔊</button>
        </div>
      </div>`).join('')}
    </div>
    <button class="btn btn-p" style="width:100%;margin-top:14px" onclick="speakSit('${id}')">🎤 Pratiquer le dialogue</button>
  </div>`;
  openM('m-sit');
}
function speakSit(id){
  const s=SITUATIONS.find(x=>x.id===id); if(!s) return;
  let i=0;
  function next(){ if(i<s.lines.length){ speak(s.lines[i].fr); i++; setTimeout(next,2500); } else { toast('Dialogue terminé! 🎉','ok'); } }
  next();
}

// ── STORIES ────────────────────────────────────────────────────────
function renderStories(){
  const el=$('stories-page'); if(!el) return;
  el.innerHTML=`
  <div class="page-header"><h2 class="page-title">📖 Histoires</h2><p class="page-sub">Lecture guidée et progressive</p></div>
  <div class="stories-grid">
    ${STORIES.map(s=>`<div class="story-card" onclick="openStory('${s.id}')">
      <div class="sc-level">${esc(s.level)}</div>
      <div class="sc-title">${esc(s.title)}</div>
      <div class="sc-eps">${s.episodes.length} épisodes</div>
    </div>`).join('')}
  </div>`;
}
function openStory(id){
  const story=STORIES.find(s=>s.id===id); if(!story) return;
  openM('m-lesson');
  lessonState={lvId:null,step:0,data:{title:story.title,steps:[
    {type:'intro',title:story.title,text:`Niveau: ${story.level} · ${story.episodes.length} épisodes`,tip:'📖 Lisez attentivement et mémorisez le vocabulaire!'},
    ...story.episodes.flatMap(ep=>[
      {type:'intro',title:`Épisode ${ep.ep}: ${ep.title}`,text:ep.text,tip:`Vocabulaire: ${ep.vocab.map(v=>v.fr).join(', ')}`},
      {type:'vocab',title:'Vocabulaire de l\'épisode',words:ep.vocab.map(v=>({fr:v.fr,pron:'',meaning:v.meaning,ex:''}))},
      {type:'exercise',title:`Quiz: ${ep.title}`,question:ep.question,opts:ep.opts,ans:ep.ans,exp:`Relisez l'épisode pour trouver la réponse.`},
    ]),
    {type:'summary',title:'Histoire terminée! 📖',points:[`Histoire: ${story.title}`,`Niveau: ${story.level}`,'Vocabulaire acquis!','Continuez avec d\'autres histoires!']},
  ]}};
  renderLesStep();
}

// ── EXPLORE ────────────────────────────────────────────────────────
function renderExplore(){
  const el=$('explore-page'); if(!el) return;
  const wod=WORD_OF_DAY[new Date().getDate()%WORD_OF_DAY.length];
  const gtip=GRAMMAR_TIPS[Math.floor(Date.now()/604800000)%GRAMMAR_TIPS.length];
  el.innerHTML=`
  <div class="page-header"><h2 class="page-title">🔍 Explorer</h2><p class="page-sub">Grammaire, culture et curiosités</p></div>

  <div class="card" style="border-left:3px solid #EAB308">
    <div class="card-lbl">✨ Mot du jour</div>
    <div style="display:flex;align-items:center;justify-content:space-between">
      <div class="card-title">${esc(wod.fr)}</div>
      <button class="btn-tts" onclick="speak('${esc(wod.fr)}')">🔊</button>
    </div>
    <div style="font-size:.78rem;color:var(--txt2)">[${esc(wod.pron)}] · ${esc(wod.type)} · Niveau ${wod.level}</div>
    <div style="font-size:.88rem;margin:6px 0">${esc(wod.eng)} · ${esc(wod.ar)}</div>
    <div style="font-size:.84rem;color:var(--cr);font-style:italic">"${esc(wod.ex)}"</div>
    <div style="font-size:.76rem;color:var(--txt3);margin-top:6px">💡 ${esc(wod.note)}</div>
  </div>

  <div class="card" style="border-left:3px solid var(--cr)">
    <div class="card-lbl">📐 Règle de grammaire de la semaine</div>
    <div class="card-title">${esc(gtip.topic)}</div>
    <p style="font-size:.84rem;color:var(--txt2);margin:10px 0 12px;line-height:1.6">${esc(gtip.rule)}</p>
    <div style="margin-bottom:12px">
      ${gtip.examples.map(ex=>`<div style="background:var(--bg2);border-radius:var(--rs);padding:8px 12px;margin-bottom:6px;font-size:.82rem;font-style:italic">"${esc(ex)}"</div>`).join('')}
    </div>
    <button class="btn btn-p btn-sm" onclick="startGrammarTest()">📝 Faire le test →</button>
  </div>

  <div class="card">
    <div class="card-lbl">🇫🇷 Culture Française</div>
    ${[
      {t:'La gastronomie',d:'La France est célèbre dans le monde entier pour sa cuisine raffinée. Le pain, le vin, le fromage et les pâtisseries sont des éléments essentiels de l\'identité française.',ic:'🥐'},
      {t:'L\'art de vivre',d:'Les Français accordent une grande importance à la qualité de vie: les repas en famille, les cafés, les promenades... Le concept de "savoir-vivre" est unique.',ic:'☕'},
      {t:'La langue française',d:'Le français est l\'une des langues les plus étudiées au monde. Avec 300 millions de locuteurs dans 50 pays, c\'est la seule langue parlée sur les cinq continents.',ic:'🌍'},
    ].map(c=>`<div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--bdr)">
      <span style="font-size:1.5rem">${c.ic}</span>
      <div><div style="font-weight:600;font-size:.88rem;margin-bottom:4px">${esc(c.t)}</div><div style="font-size:.8rem;color:var(--txt2);line-height:1.5">${esc(c.d)}</div></div>
    </div>`).join('')}
  </div>

  <div class="card">
    <div class="card-lbl">✍️ Exercice d\'Écriture</div>
    <div class="card-title">Pratiquez l\'écriture</div>
    <p style="font-size:.84rem;color:var(--txt2);margin:8px 0">Décrivez votre journée en français (5-10 phrases)</p>
    <textarea id="writing-area" class="write-area" placeholder="Aujourd'hui, je..."></textarea>
    <div style="display:flex;gap:8px;margin-top:8px">
      <button class="btn btn-p btn-sm" onclick="checkWriting()">✓ Vérifier</button>
      <button class="btn btn-g btn-sm" onclick="$('writing-area').value=''">Effacer</button>
    </div>
    <div id="writing-fb" style="margin-top:8px"></div>
  </div>`;
}
function startGrammarTest(){ startGrammarDrill(); }
function checkWriting(){
  const val=($('writing-area')?.value||'').trim();
  const fb=$('writing-fb');
  if(!val){ if(fb) fb.innerHTML=`<div class="fb-err">Écrivez quelque chose d\'abord!</div>`; return; }
  const wordCount=val.split(/\s+/).length;
  if(fb) fb.innerHTML=`<div class="fb-ok">✅ Bien! ${wordCount} mots. Continuez à pratiquer chaque jour! +20 XP</div>`;
  xpToast(20);
}

// ── PROGRESS ───────────────────────────────────────────────────────
function renderProgress(){
  const el=$('progress-page'); if(!el) return;
  const user=authGetCurrent();
  const done=user?.completedLevels?.length||0;
  const tier=getTier(user?.xp||0);
  el.innerHTML=`
  <div class="page-header"><h2 class="page-title">📊 Mes Statistiques</h2></div>

  <div class="card" style="text-align:center">
    <div style="font-size:3rem;margin-bottom:8px">${tier.icon}</div>
    <div style="font-family:var(--ffs);font-size:1.6rem;font-weight:700;color:${tier.color}">${tier.name}</div>
    <div style="font-size:2rem;font-weight:800;color:var(--cr);margin:8px 0">${user?.xp||0} XP</div>
    <div class="tier-bar" style="margin:0 auto;max-width:200px"><div class="tier-fill" style="width:${Math.round(((user?.xp||0)-tier.min)/(tier.max-tier.min)*100)}%;background:${tier.color}"></div></div>
    <div style="font-size:.78rem;color:var(--txt3);margin-top:6px">${tier.max-tier.min} XP pour le prochain niveau</div>
  </div>

  <div class="stats-strip">
    <div class="stat-box"><div class="stat-v">${done}</div><div class="stat-l">Niveaux</div></div>
    <div class="stat-box"><div class="stat-v">${done*6}</div><div class="stat-l">Leçons</div></div>
    <div class="stat-box"><div class="stat-v">${user?.streak||0}🔥</div><div class="stat-l">Jours</div></div>
    <div class="stat-box"><div class="stat-v">${user?.savedWords?.length||0}</div><div class="stat-l">Mots</div></div>
  </div>

  <div class="card">
    <div class="card-lbl">🗺️ Progression par niveau</div>
    ${renderRoadmapMini()}
  </div>

  <div class="card">
    <div class="card-lbl">🏆 Badges</div>
    <div class="badges-grid">
      ${[
        {ic:'🌱',nm:'Premier Pas',       cond:done>=1},
        {ic:'📚',nm:'10 Niveaux',        cond:done>=10},
        {ic:'🔥',nm:'7 Jours de Suite',  cond:(user?.streak||0)>=7},
        {ic:'💎',nm:'1000 XP',           cond:(user?.xp||0)>=1000},
        {ic:'🏆',nm:'Tous les Niveaux',  cond:done>=30},
        {ic:'🌍',nm:'Explorateur',       cond:done>=5},
      ].map(b=>`<div class="badge${b.cond?'':' locked'}"><div class="badge-ic">${b.ic}</div><div class="badge-nm">${b.nm}</div></div>`).join('')}
    </div>
  </div>`;
}

// ── SETTINGS ───────────────────────────────────────────────────────
function renderSettings(){
  const el=$('settings-page'); if(!el) return;
  const user=authGetCurrent();
  const s=user?.settings||{};
  el.innerHTML=`
  <div class="page-header"><h2 class="page-title">⚙️ Paramètres</h2></div>

  ${user?`<div class="card">
    <div class="card-lbl">👤 Profil</div>
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
      <div class="avatar-big">${user.avatar||'?'}</div>
      <div><div style="font-size:1.1rem;font-weight:700">${esc(user.name)}</div><div style="font-size:.82rem;color:var(--txt2)">${esc(user.email)}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
      <div style="text-align:center;background:var(--bg2);border-radius:var(--rs);padding:12px"><div style="font-size:1.2rem;font-weight:700;color:var(--cr)">${user.xp||0}</div><div style="font-size:.7rem;color:var(--txt3)">XP Total</div></div>
      <div style="text-align:center;background:var(--bg2);border-radius:var(--rs);padding:12px"><div style="font-size:1.2rem;font-weight:700;color:var(--cr)">${user.completedLevels?.length||0}</div><div style="font-size:.7rem;color:var(--txt3)">Niveaux</div></div>
    </div>
    <div style="margin-top:12px;display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <label style="font-size:.88rem">Modifier le nom</label>
        <input type="text" id="new-name" value="${esc(user.name)}" class="fill-inp" style="max-width:160px;padding:6px 10px"/>
      </div>
      <button class="btn btn-o btn-sm" onclick="saveName()">Sauvegarder</button>
    </div>
  </div>`:''}

  <div class="card">
    <div class="card-lbl">🎨 Apparence</div>
    <div class="set-row"><span>Mode sombre</span><label class="tog"><input type="checkbox" ${s.darkMode||darkMode?'checked':''} onchange="toggleDark(this.checked)"/><span class="tog-sl"></span></label></div>
    <div class="set-row"><span>Taille du texte: <strong>${s.fontSize||16}px</strong></span></div>
    <input type="range" min="13" max="21" value="${s.fontSize||16}" class="range-inp" oninput="setFS(this.value)"/>
  </div>

  <div class="card">
    <div class="card-lbl">🔊 Audio</div>
    <div class="set-row"><span>Vitesse de synthèse vocale: <strong>${s.speechRate||0.9}x</strong></span></div>
    <input type="range" min="0.5" max="1.5" step="0.1" value="${s.speechRate||0.9}" class="range-inp" oninput="setSR(this.value)"/>
    <div class="set-row"><span>Lecture auto des mots</span><label class="tog"><input type="checkbox" ${s.autoPlay?'checked':''} onchange="toggleAutoPlay(this.checked)"/><span class="tog-sl"></span></label></div>
  </div>

  <div class="card">
    <div class="card-lbl">🌍 Langue & Dialecte</div>
    <div class="set-row"><span>Langue de l\'interface</span>
      <select class="wb-filter" onchange="setUiLang(this.value)">
        <option value="fr" ${(s.uiLang||'fr')==='fr'?'selected':''}>Français</option>
        <option value="en" ${(s.uiLang||'fr')==='en'?'selected':''}>English</option>
        <option value="ar" ${(s.uiLang||'fr')==='ar'?'selected':''}>العربية</option>
      </select>
    </div>
    <div class="set-row"><span>Dialecte français</span>
      <select class="wb-filter" onchange="setDialect(this.value)">
        <option value="fr" ${(s.dialect||'fr')==='fr'?'selected':''}>France (Standard)</option>
        <option value="ca" ${(s.dialect||'fr')==='ca'?'selected':''}>Canada (Québec)</option>
        <option value="be" ${(s.dialect||'fr')==='be'?'selected':''}>Belgique</option>
        <option value="ch" ${(s.dialect||'fr')==='ch'?'selected':''}>Suisse</option>
      </select>
    </div>
  </div>

  <div class="card">
    <div class="card-lbl">🎯 Objectif d\'apprentissage</div>
    ${[
      {v:'travel',l:'🌍 Voyages'},
      {v:'work',l:'💼 Travail'},
      {v:'culture',l:'🎭 Culture'},
      {v:'general',l:'📚 Général'},
      {v:'family',l:'👨‍👩‍👧 Famille'},
      {v:'business',l:'📈 Affaires'},
    ].map(g=>`<div class="goal-opt${user?.goal===g.v?' active':''}" onclick="setGoal('${g.v}')">${g.l}</div>`).join('')}
  </div>

  <div class="card">
    <div class="card-lbl">⏰ Rappels quotidiens</div>
    <div class="set-row"><span>Activer les rappels</span><label class="tog"><input type="checkbox" ${s.notifications?'checked':''} onchange="toggleNotif(this.checked)"/><span class="tog-sl"></span></label></div>
    <div class="set-row"><span>Heure de rappel</span>
      <input type="time" value="08:00" class="fill-inp" style="max-width:100px;padding:6px 10px"/>
    </div>
    <div class="set-row"><span>Objectif XP quotidien</span>
      <select class="wb-filter">
        <option>50 XP</option><option selected>100 XP</option><option>200 XP</option><option>500 XP</option>
      </select>
    </div>
  </div>

  <div class="card">
    <div class="card-lbl">💾 Données</div>
    <div style="display:flex;flex-direction:column;gap:8px">
      <button class="btn btn-o btn-sm" onclick="exportData()">📤 Exporter mes données</button>
      <button class="btn btn-o btn-sm" onclick="importData()">📥 Importer des données</button>
      <button class="btn btn-g btn-sm" onclick="confirmReset()" style="color:#DC2626">🗑️ Réinitialiser la progression</button>
    </div>
  </div>

  <div class="card">
    <div class="card-lbl">📱 Application</div>
    <div id="install-wrap">
      <button class="btn btn-p" id="install-btn" style="display:none;width:100%" onclick="doInstall()">📲 Installer l\'app</button>
    </div>
    <div style="font-size:.78rem;color:var(--txt3);margin-top:8px;text-align:center">Version 4.0 · Languway French</div>
  </div>

  ${user?`<div style="margin-top:16px"><button class="btn btn-g" style="width:100%;color:#DC2626" onclick="doLogout()">🚪 Se déconnecter</button></div>`:''}
  `;

  if(window._installPrompt){ const btn=$('install-btn'); if(btn) btn.style.display='flex'; }
}
function saveName(){ const v=($('new-name')?.value||'').trim(); if(v){ authUpdateUser({name:v,avatar:v.charAt(0).toUpperCase()}); toast('Nom mis à jour!','ok'); renderSettings(); } }
function toggleDark(v){ darkMode=v; document.body.classList.toggle('dark',v); authUpdateUser({settings:{...authGetCurrent()?.settings,darkMode:v}}); }
function setFS(v){ document.documentElement.style.fontSize=v+'px'; authUpdateUser({settings:{...authGetCurrent()?.settings,fontSize:parseFloat(v)}}); renderSettings(); }
function setSR(v){ authUpdateUser({settings:{...authGetCurrent()?.settings,speechRate:parseFloat(v)}}); renderSettings(); }
function setUiLang(v){ authUpdateUser({settings:{...authGetCurrent()?.settings,uiLang:v}}); toast('Langue mise à jour!','ok'); }
function setDialect(v){ authUpdateUser({settings:{...authGetCurrent()?.settings,dialect:v}}); toast('Dialecte mis à jour!','ok'); }
function setGoal(v){ authUpdateUser({goal:v}); toast('Objectif mis à jour!','ok'); renderSettings(); }
function toggleAutoPlay(v){ authUpdateUser({settings:{...authGetCurrent()?.settings,autoPlay:v}}); }
function toggleNotif(v){ authUpdateUser({settings:{...authGetCurrent()?.settings,notifications:v}}); }
function exportData(){ const a=document.createElement('a');a.href='data:text/json,'+encodeURIComponent(JSON.stringify(authGetCurrent(),null,2));a.download='languway-backup.json';a.click(); }
function importData(){ const inp=document.createElement('input');inp.type='file';inp.accept='.json';inp.onchange=e=>{ const r=new FileReader();r.onload=ev=>{ try{ const d=JSON.parse(ev.target.result);authUpdateUser(d);toast('Données importées!','ok');renderSettings();}catch(e){toast('Fichier invalide','err');}}; r.readAsText(e.target.files[0]);}; inp.click(); }
function confirmReset(){ if(confirm('Réinitialiser TOUTE la progression? Cette action est irréversible.')){ localStorage.clear(); location.reload(); } }

// ── ABOUT ──────────────────────────────────────────────────────────
function renderAbout(){
  const el=$('about-page'); if(!el) return;
  el.innerHTML=`
  <div class="page-header"><h2 class="page-title">ℹ️ À Propos</h2></div>
  <div class="card" style="text-align:center">
    <div style="width:72px;height:72px;border-radius:18px;background:var(--cr);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:2rem">🇫🇷</div>
    <div style="font-family:var(--ffs);font-size:1.6rem;font-weight:700;margin-bottom:4px">Languway <span style="color:var(--cr)">French</span></div>
    <div style="font-size:.78rem;letter-spacing:3px;color:var(--txt3);text-transform:uppercase;margin-bottom:16px">Apprenez le français</div>
    <p style="font-size:.84rem;color:var(--txt2);line-height:1.7">Languway French est une application d\'apprentissage complète qui vous guide du niveau débutant absolu (Pré-A1) jusqu\'à la maîtrise (C2) à travers 30 niveaux structurés selon le Cadre Européen Commun de Référence (CECR).</p>
  </div>
  <div class="card">
    <div class="card-lbl">✨ Fonctionnalités</div>
    ${['30 niveaux CECR (Pré-A1 → C2)','180+ leçons interactives','Situations réelles de la vie quotidienne','Histoires progressives animées','Dictionnaire de 20+ mots avec synonymes','Entraînement: Flashcards, Quiz, Écoute','Synthèse vocale en français natif','Comptes utilisateurs avec synchronisation','Mode sombre et personnalisation complète','Application installable (PWA)'].map(f=>`<div class="about-feat">✅ ${f}</div>`).join('')}
  </div>`;
}

// ── SHARE ──────────────────────────────────────────────────────────
function renderShare(){
  const el=$('share-page'); if(!el) return;
  const url='https://2009malek11-source.github.io/languway-French/';
  el.innerHTML=`
  <div class="page-header"><h2 class="page-title">📲 Partager</h2></div>
  <div class="card" style="text-align:center">
    <div style="font-size:1.1rem;font-weight:600;margin-bottom:16px">Partagez Languway French!</div>
    <div style="background:var(--bg2);border-radius:var(--rs);padding:12px;font-size:.82rem;word-break:break-all;margin-bottom:16px;font-family:monospace">${url}</div>
    <div id="qr-wrap" style="margin:16px auto;width:200px;height:200px;background:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;border:2px solid var(--bdr)">
      <canvas id="qr-canvas" width="180" height="180"></canvas>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:16px">
      <button class="btn btn-p btn-sm" onclick="shareNative()">📤 Partager</button>
      <button class="btn btn-o btn-sm" onclick="navigator.clipboard.writeText('${url}').then(()=>toast('Copié!','ok'))">📋 Copier le lien</button>
    </div>
  </div>
  <div class="card">
    <div class="card-lbl">📲 Installer l\'Application</div>
    <div class="install-steps">
      ${[['📱','iOS','Ouvrez dans Safari → Partager → Sur l\'écran d\'accueil'],['🤖','Android','Ouvrez dans Chrome → Menu → Ajouter à l\'écran d\'accueil'],['💻','Desktop','Ouvrez dans Chrome → icône ⊕ dans la barre d\'adresse']].map(s=>`<div class="install-step"><span>${s[0]}</span><div><strong>${s[1]}</strong><br><small>${s[2]}</small></div></div>`).join('')}
    </div>
    <button class="btn btn-p" id="install-btn2" style="display:none;width:100%;margin-top:12px" onclick="doInstall()">📲 Installer maintenant</button>
  </div>`;
  setTimeout(()=>buildQR(url),100);
  if(window._installPrompt){ const btn=$('install-btn2'); if(btn) btn.style.display='flex'; }
}
function buildQR(url){
  const c=$('qr-canvas'); if(!c) return;
  const ctx=c.getContext('2d'); if(!ctx) return;
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,180,180);
  ctx.fillStyle='#B91C1C'; ctx.font='bold 11px sans-serif'; ctx.textAlign='center';
  ctx.fillText('Languway French',90,96); ctx.fillText('Scanner pour accéder',90,112);
  ctx.fillStyle='#1C1917'; ctx.fillRect(10,10,30,30); ctx.fillStyle='#fff'; ctx.fillRect(14,14,22,22); ctx.fillStyle='#1C1917'; ctx.fillRect(18,18,14,14);
  ctx.fillStyle='#1C1917'; ctx.fillRect(140,10,30,30); ctx.fillStyle='#fff'; ctx.fillRect(144,14,22,22); ctx.fillStyle='#1C1917'; ctx.fillRect(148,18,14,14);
  ctx.fillStyle='#1C1917'; ctx.fillRect(10,140,30,30); ctx.fillStyle='#fff'; ctx.fillRect(14,144,22,22); ctx.fillStyle='#1C1917'; ctx.fillRect(18,148,14,14);
}
function shareNative(){
  if(navigator.share){ navigator.share({title:'Languway French',text:'Apprenez le français gratuitement!',url:'https://2009malek11-source.github.io/languway-French/'}); }
  else { navigator.clipboard?.writeText('https://2009malek11-source.github.io/languway-French/'); toast('Lien copié!','ok'); }
}

// ── TRANSLATOR ─────────────────────────────────────────────────────
function openTranslator(){
  const box=$('m-trans')?.querySelector('.modal-box'); if(!box) return;
  box.innerHTML=`
  <div class="les-top">
    <button class="btn-ic" onclick="closeM('m-trans')">✕</button>
    <div style="flex:1;text-align:center;font-weight:600">🔤 Traducteur</div>
    <div style="width:36px"></div>
  </div>
  <div style="padding:16px">
    <div style="display:flex;gap:8px;margin-bottom:12px">
      <button class="btn btn-sm ${tDir==='fr-en'?'btn-p':'btn-o'}" onclick="setTDir('fr-en')">🇫🇷 → 🌍</button>
      <button class="btn btn-sm ${tDir==='en-fr'?'btn-p':'btn-o'}" onclick="setTDir('en-fr')">🌍 → 🇫🇷</button>
      <button class="btn btn-ic" onclick="swapT()" title="Inverser">↔</button>
    </div>
    <textarea id="tr-inp" class="write-area" placeholder="${tDir==='fr-en'?'Entrez du texte en français...':'Enter text to translate...'}" rows="3"></textarea>
    <button class="btn btn-p" style="width:100%;margin-top:8px" onclick="doTranslate()">Traduire</button>
    <div id="tr-out" style="margin-top:12px"></div>
    <div style="margin-top:16px">
      <div style="font-size:.74rem;font-weight:700;color:var(--txt3);margin-bottom:8px;letter-spacing:.5px">TRADUCTIONS RAPIDES</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px">
        ${['Bonjour','Merci','Au revoir','S\'il vous plaît','Comment allez-vous?','Je ne comprends pas.','Où est...?','Combien ça coûte?'].map(p=>`<button class="dd-word" onclick="quickTrans('${esc(p)}')">${esc(p)}</button>`).join('')}
      </div>
    </div>
  </div>`;
  openM('m-trans');
}
function setTDir(d){ tDir=d; openTranslator(); }
function swapT(){ tDir=tDir==='fr-en'?'en-fr':'fr-en'; openTranslator(); }
async function doTranslate(){
  const txt=($('tr-inp')?.value||'').trim();
  if(!txt) return;
  const out=$('tr-out');
  if(out) out.innerHTML=`<div style="color:var(--txt3);font-size:.84rem">⏳ Traduction...</div>`;
  try{
    const resp=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:400,messages:[{role:'user',content:`Translate this text. Direction: ${tDir==='fr-en'?'French to English AND also Arabic':'English/Arabic to French'}.\nText: "${txt}"\n\nRespond in this exact format:\nTranslation: [translation]\nAlternative: [alternative meaning if any]\nNote: [grammar or usage note]\nPronunciation: [pronunciation if French output]`}]})
    });
    const data=await resp.json();
    const result=(data.content?.[0]?.text||'').trim();
    if(out) out.innerHTML=`<div class="trans-result">${result.replace(/\n/g,'<br>')}</div><button class="btn-tts" onclick="speak('${esc(txt)}','${tDir==='fr-en'?'fr-FR':'en-US'}')">🔊 Écouter</button>`;
  }catch(e){
    if(out) out.innerHTML=`<div class="fb-err">Erreur de traduction. Vérifiez votre connexion.</div>`;
  }
}
function quickTrans(phrase){ const inp=$('tr-inp'); if(inp){ inp.value=phrase; doTranslate(); } }

// ── AI TUTOR ───────────────────────────────────────────────────────
function openAI(){
  const box=$('m-ai')?.querySelector('.modal-box'); if(!box) return;
  box.innerHTML=`
  <div class="les-top">
    <button class="btn-ic" onclick="closeM('m-ai')">✕</button>
    <div style="flex:1;text-align:center;font-weight:600">🤖 Tuteur IA</div>
    <div style="width:36px"></div>
  </div>
  <div id="ai-msgs" style="flex:1;overflow-y:auto;padding:12px 16px;display:flex;flex-direction:column;gap:10px">
    <div class="ai-msg ai-bot">Bonjour! Je suis votre tuteur de français. Posez-moi des questions sur la grammaire, le vocabulaire, la conjugaison, ou demandez-moi de vous expliquer n\'importe quel concept en français! 🇫🇷</div>
  </div>
  <div class="ai-input-row">
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px">
      ${['Explique le subjonctif','Comment conjuguer "aller"?','Différence entre "bon" et "bien"','Donne-moi des exemples de passé composé'].map(q=>`<button class="dd-word" onclick="askAI('${esc(q)}')">${esc(q)}</button>`).join('')}
    </div>
    <div style="display:flex;gap:8px">
      <input class="fill-inp" type="text" id="ai-inp" placeholder="Posez votre question..." onkeydown="if(event.key==='Enter')sendAI()"/>
      <button class="btn btn-p btn-sm" onclick="sendAI()">→</button>
    </div>
  </div>`;
  openM('m-ai');
}
function askAI(q){ openAI(); setTimeout(()=>{ const inp=$('ai-inp'); if(inp){ inp.value=q; sendAI(); }},200); }
async function sendAI(){
  const inp=$('ai-inp'); const msg=(inp?.value||'').trim(); if(!msg) return;
  if(inp) inp.value='';
  aiHistory.push({role:'user',content:msg});
  const msgs=$('ai-msgs');
  if(msgs){ msgs.innerHTML+=`<div class="ai-msg ai-user">${esc(msg)}</div>`; msgs.innerHTML+=`<div class="ai-msg ai-bot ai-typing">...</div>`; msgs.scrollTop=msgs.scrollHeight; }
  try{
    const resp=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:600,system:'You are an enthusiastic French language tutor. Explain grammar, vocabulary, and usage clearly. Use examples. Be encouraging. Answer in the same language the student writes (French, English, or Arabic). Format nicely with emojis.',messages:aiHistory.slice(-6)})
    });
    const data=await resp.json();
    const reply=data.content?.[0]?.text||'Je suis désolé, réessayez.';
    aiHistory.push({role:'assistant',content:reply});
    if(msgs){ const typing=msgs.querySelector('.ai-typing'); if(typing) typing.remove(); msgs.innerHTML+=`<div class="ai-msg ai-bot">${esc(reply).replace(/\n/g,'<br>')}</div>`; msgs.scrollTop=msgs.scrollHeight; }
  }catch(e){
    if(msgs){ const typing=msgs.querySelector('.ai-typing'); if(typing) typing.remove(); msgs.innerHTML+=`<div class="ai-msg ai-bot">Erreur de connexion. Réessayez.</div>`; }
  }
}

// ── PWA ─────────────────────────────────────────────────────────────
let _installPrompt=null;
window.addEventListener('beforeinstallprompt',e=>{ e.preventDefault(); _installPrompt=e; window._installPrompt=e; const btn=$('install-btn'); if(btn) btn.style.display='flex'; });
function doInstall(){ if(_installPrompt){ _installPrompt.prompt(); _installPrompt.userChoice.then(r=>{ if(r.outcome==='accepted') toast('App installée! 🎉','ok'); _installPrompt=null; }); } }

// ── INIT ────────────────────────────────────────────────────────────
function initApp(){
  const user=authGetCurrent();
  $('app').style.display='flex';
  $('splash').style.opacity='0';
  setTimeout(()=>{ $('splash').style.display='none'; },600);
  if(user){
    const s=user.settings||{};
    if(s.darkMode){ darkMode=true; document.body.classList.add('dark'); }
    if(s.fontSize) document.documentElement.style.fontSize=s.fontSize+'px';
  }
  updateChip();
  if(!user){ showAuth(); return; }
  nav('home');
  document.querySelectorAll('.fab').forEach(f=>f.style.display='flex');
}
window.addEventListener('load',()=>{
  setTimeout(()=>{
    initApp();
    if('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(()=>{});
  },2600);
});
