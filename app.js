/* ================================================================
   LANGUWAY FRENCH — app.js v7
   Complete application logic — no emojis in UI, SVG only
================================================================ */

// ── Utilities ─────────────────────────────────────────────────
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function $id(id){return document.getElementById(id)}
function openModal(id){const m=$id(id);if(m)m.classList.add('open')}
function closeModal(id){const m=$id(id);if(m)m.classList.remove('open')}

function showToast(msg,type='info'){
  let c=$id('toast-container');
  if(!c){c=document.createElement('div');c.id='toast-container';document.body.appendChild(c);}
  const t=document.createElement('div');
  t.className='toast '+type;t.textContent=msg;
  c.appendChild(t);
  requestAnimationFrame(()=>requestAnimationFrame(()=>t.classList.add('show')));
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),350)},2800);
}

function speak(text){
  if(!text||!window.speechSynthesis)return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='fr-FR';u.rate=0.85;u.pitch=1;
  const voices=speechSynthesis.getVoices();
  const fr=voices.find(v=>v.lang.startsWith('fr'));
  if(fr)u.voice=fr;
  speechSynthesis.speak(u);
}

// SVG Icons library
const IC={
  home:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  progress:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none"/></svg>`,
  lessons:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  translate:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>`,
  profile:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  settings:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
  star:`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  lock:`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`,
  check:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  play:`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  book:`<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  sound:`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
  arrow_r:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>`,
  arrow_l:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>`,
  trophy:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="8 21 12 21 16 21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 4H4a2 2 0 0 0-2 2v1a4 4 0 0 0 4 4h1"/><path d="M17 4h3a2 2 0 0 1 2 2v1a4 4 0 0 1-4 4h-1"/><path d="M7 4h10v7a5 5 0 0 1-10 0V4z"/></svg>`,
  cert:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  edit:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  logout:`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  sparkle:`<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6L12 2z"/></svg>`,
};

// ── Router ────────────────────────────────────────────────────
const PAGES=['home','progress','lesson-map','profile','settings'];
let _page='home';

function goTo(page,data={}){
  if(!getSession()&&page!=='home'){openModal('m-auth');return;}
  _page=page;
  PAGES.forEach(p=>{
    const el=$id('page-'+p);
    if(el) el.classList.toggle('active',p===page);
  });
  // Sync nav
  document.querySelectorAll('.bnav-item[data-page], .snav-item[data-page]').forEach(n=>{
    n.classList.toggle('active',n.dataset.page===page);
  });
  if(page==='home')      renderHome();
  if(page==='progress')  renderProgress();
  if(page==='lesson-map')renderLessonMap(data);
  if(page==='profile')   renderProfile();
  if(page==='settings')  renderSettings();
}

// ── Auth Handlers ────────────────────────────────────────────
function switchAuthTab(tab){
  ['login','register'].forEach(t=>{
    $id('auth-tab-'+t)?.classList.toggle('active',t===tab);
    $id('auth-form-'+t) && ($id('auth-form-'+t).style.display=t===tab?'flex':'none');
  });
}
function doLogin(){
  const em=($id('auth-email')?.value||'').trim();
  const pw=$id('auth-pass')?.value||'';
  if(!em||!pw){showToast('Remplissez tous les champs','err');return;}
  const r=authLogin(em,pw);
  if(!r.ok){showToast(r.msg,'err');return;}
  closeModal('m-auth');
  updateStreak();
  goTo('home');
  showToast('Bonjour, '+r.user.name+'!','ok');
}
function doRegister(){
  const name=($id('reg-name')?.value||'').trim();
  const em=($id('reg-email')?.value||'').trim();
  const pw=$id('reg-pass')?.value||'';
  const r=authRegister(name,em,pw);
  if(!r.ok){showToast(r.msg,'err');return;}
  closeModal('m-auth');
  goTo('home');
  showToast('Bienvenue, '+name+'! 🎉','ok');
}
function doLogout(){
  authLogout();
  goTo('home');
  showToast('Déconnecté','info');
}

// ── Home Page ────────────────────────────────────────────────
function renderHome(){
  const s=getSession();
  // Stats
  const sb=$id('home-stats');
  if(sb){
    const done=(s?.completedLessons||[]).length;
    const stats=[
      {v:done,       l:'Leçons'},
      {v:s?.xp||0,   l:'XP'},
      {v:(s?.streak||0)+'j',l:'Série'},
      {v:(s?.level||'Pre-A1').toUpperCase(),l:'Niveau'},
    ];
    sb.innerHTML=stats.map(st=>`<div class="stat-box"><div class="stat-v">${esc(String(st.v))}</div><div class="stat-l">${esc(st.l)}</div></div>`).join('');
  }
  // Next lesson
  renderNextLesson(s);
  // Learning path
  renderLearningPath(s);
  renderPlacementBanner(s);
  // Update topbar login btn
  const btn=$id('topbar-auth-btn');
  if(btn){
    if(s){
      btn.innerHTML=`<div class="profile-av" style="width:30px;height:30px;font-size:.85rem;border:1.5px solid var(--red)">${esc((s.name||'U')[0].toUpperCase())}</div>`;
      btn.onclick=()=>goTo('profile');
    } else {
      btn.innerHTML=IC.profile;
      btn.onclick=()=>openModal('m-auth');
    }
  }
}

function renderNextLesson(s){
  const el=$id('home-next-lesson');
  if(!el)return;
  const next=s?getNextLesson(s):null;
  if(s&&next){
    el.innerHTML=`
    <div class="next-card" onclick="startLesson('${next.levelId}',${next.unitNum},${next.lessonNum})">
      <div class="next-card-lbl">${IC.star} Prochaine leçon</div>
      <div class="next-card-title">${esc(next.title)}</div>
      <div class="next-card-meta">
        <span>${esc(next.levelId.toUpperCase())} · Unité ${next.unitNum} · Leçon ${next.lessonNum}</span>
        <span class="next-card-xp">+${next.xp} XP</span>
      </div>
      <div class="next-card-cta">${IC.play} Commencer maintenant</div>
    </div>`;
  } else {
    el.innerHTML=`
    <div class="next-card" onclick="openModal('m-auth')">
      <div class="next-card-lbl">${IC.sparkle} Commencez votre voyage</div>
      <div class="next-card-title">Bonjour! — Leçon 1</div>
      <div class="next-card-meta"><span>Pre-A1 · Unité 1 · Leçon 1</span><span class="next-card-xp">+50 XP</span></div>
      <div class="next-card-cta">${IC.play} Inscrivez-vous gratuitement</div>
    </div>`;
  }
}

function getNextLesson(s){
  const levels=['pre-a1','a1','a2','b1','b2','c1'];
  for(const lv of levels){
    for(let u=1;u<=10;u++){
      for(let l=1;l<=5;l++){
        const id=`${lv}-u${u}-l${l}`;
        if(!(s.completedLessons||[]).includes(id)){
          const titles=(LESSON_TITLES&&LESSON_TITLES[`${lv}-u${u}`])||[];
          return {levelId:lv,unitNum:u,lessonNum:l,
            title:titles[l-1]||`Leçon ${l}`,xp:50+(['pre-a1','a1','a2','b1','b2','c1'].indexOf(lv))*20};
        }
      }
    }
  }
  return null;
}

function renderLearningPath(s){
  const el=$id('home-lp');
  if(!el)return;
  const levels=[
    {id:'pre-a1',label:'Pré-A1',name:'Absolu Débutant',color:'#9333EA',
     img:'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=70'},
    {id:'a1',label:'A1',name:'Débutant',color:'#D62828',
     img:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=70'},
    {id:'a2',label:'A2',name:'Élémentaire',color:'#F77F00',
     img:'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=400&q=70'},
    {id:'b1',label:'B1',name:'Intermédiaire',color:'#2D9CDB',
     img:'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400&q=70'},
    {id:'b2',label:'B2',name:'Avancé',color:'#27AE60',
     img:'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=400&q=70'},
    {id:'c1',label:'C1',name:'Maîtrise',color:'#F2994A',
     img:'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=400&q=70'},
  ];
  el.innerHTML=levels.map(lv=>{
    const done=(s?.completedLessons||[]).filter(id=>id.startsWith(lv.id+'-')).length;
    const pct=Math.round(done/50*100);
    const locked=!s;
    return `
    <div class="lp-card" style="--lc:${lv.color}"
      onclick="${locked&&lv.id!=='pre-a1'?`openModal('m-auth')`:`goTo('lesson-map',{levelId:'${lv.id}'})`}">
      <img src="${lv.img}" class="lp-card-img" alt="${lv.label}" loading="lazy"/>
      <div class="lp-card-ov"></div>
      <div class="lp-card-body">
        <div class="lp-card-badge">${lv.label}</div>
        <div class="lp-card-name">${esc(lv.name)}</div>
        <div class="lp-bar"><div class="lp-bar-fill" style="width:${pct}%"></div></div>
        <div class="lp-count">${done}/50</div>
      </div>
      ${locked&&lv.id!=='pre-a1'?`<div class="lp-lock">${IC.lock}</div>`:''}
    </div>`;
  }).join('');
}

// ── Lesson Map ───────────────────────────────────────────────
function renderLessonMap(data={}){
  const el=$id('page-lesson-map');
  if(!el)return;
  const s=getSession();
  const levelId=data.levelId||s?.level||'pre-a1';
  const lvNames={'pre-a1':'Pré-A1 — Absolu Débutant','a1':'A1 — Débutant','a2':'A2 — Élémentaire','b1':'B1 — Intermédiaire','b2':'B2 — Avancé','c1':'C1 — Maîtrise'};

  // Level selector tabs
  const lvTabs=['pre-a1','a1','a2','b1','b2','c1'].map(lv=>`
    <button class="lv-tab-btn ${lv===levelId?'active':''}" onclick="goTo('lesson-map',{levelId:'${lv}'})">${lv.toUpperCase()}</button>
  `).join('');

  let units='';
  for(let u=1;u<=10;u++){
    const uTitle=(UNIT_TITLES&&UNIT_TITLES[levelId])?UNIT_TITLES[levelId][u-1]||`Unité ${u}`:`Unité ${u}`;
    let lessons='';
    for(let l=1;l<=5;l++){
      const lid=`${levelId}-u${u}-l${l}`;
      const done=(s?.completedLessons||[]).includes(lid);
      const unlocked=isLessonUnlocked(levelId,u,l);
      const wbOk=isWordbookUnlocked(lid);
      const lTitles=(LESSON_TITLES&&LESSON_TITLES[`${levelId}-u${u}`])||[];
      const lTitle=lTitles[l-1]||`Leçon ${l}`;
      const xp=50+(['pre-a1','a1','a2','b1','b2','c1'].indexOf(levelId))*20;
      lessons+=`
      <div class="lesson-row ${done?'done':''} ${!unlocked?'locked':''}">
        <div class="lesson-row-left" onclick="${unlocked?`startLesson('${levelId}',${u},${l})`:''}">
          <div class="lesson-status">
            ${done
              ?`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="3" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>`
              :unlocked
                ?`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`
                :`<svg width="14" height="14" viewBox="0 0 24 24" fill="#666"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>`
            }
          </div>
          <div class="lesson-info">
            <div class="lesson-row-title">Leçon ${l}: ${esc(lTitle)}</div>
            <div class="lesson-row-meta">10-15 min · +${xp} XP</div>
          </div>
        </div>
        <button class="wb-btn ${wbOk?'unlocked':'locked-wb'}"
          onclick="${wbOk?`openWordbook('${lid}')`:''}"
          title="${wbOk?'Voir le WordBook':'Terminez la leçon pour débloquer'}">
          ${IC.book}
          ${wbOk?'WordBook':'—'}
        </button>
      </div>`;
    }
    units+=`
    <div class="unit-block">
      <div class="unit-hdr">
        <div class="unit-badge">Unité ${u}</div>
        <div class="unit-name">${esc(uTitle)}</div>
      </div>
      <div class="unit-lessons">${lessons}</div>
      <div class="unit-prog"><div class="unit-prog-fill" style="width:${Math.round((s?.completedLessons||[]).filter(id=>id.startsWith(levelId+'-u'+u+'-')).length/5*100)}%"></div></div>
      <button class="exam-btn" onclick="openExam('${levelId}',${u})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        Examen Unité ${u}
      </button>
    </div>`;
  }

  el.innerHTML=`
  <div class="lmap-hdr">
    <button class="back-btn" onclick="goTo('home')">${IC.arrow_l}</button>
    <div class="lmap-title">${esc(lvNames[levelId]||levelId)}</div>
  </div>
  <div style="display:flex;gap:6px;padding:12px 14px 0;overflow-x:auto;scrollbar-width:none">
    ${lvTabs}
  </div>
  <div class="lmap-body">${units}</div>`;
}

// ── Lesson Player ────────────────────────────────────────────
let _lesson=null, _lStep=0, _lSteps=[];

function startLesson(levelId,unitNum,lessonNum){
  if(!getSession()){openModal('m-auth');return;}
  const lTitles=(LESSON_TITLES&&LESSON_TITLES[`${levelId}-u${unitNum}`])||[];
  const vocab=typeof getVocab==='function'?getVocab(levelId,unitNum,lessonNum):[];
  const grammar=typeof getGrammar==='function'?getGrammar(levelId,unitNum):
    {title:'Grammaire',rule:'',examples:[],tip:''};
  const xp=50+(['pre-a1','a1','a2','b1','b2','c1'].indexOf(levelId))*20;

  _lesson={
    id:`${levelId}-u${unitNum}-l${lessonNum}`,
    levelId,unitNum,lessonNum,
    title:lTitles[lessonNum-1]||`Leçon ${lessonNum}`,
    vocab,grammar,xp,
  };

  _lSteps=[
    {type:'intro'},
    {type:'vocab'},
    ...(vocab.map((_,i)=>({type:'vocab-card',idx:i}))),
    {type:'grammar'},
    {type:'ex-mcq'},
    {type:'ex-fill'},
    {type:'ex-listen'},
    {type:'ex-speak'},
    {type:'ex-write'},
    {type:'wordbook-review'},
    {type:'complete'},
  ];
  _lStep=0;
  renderLStep();
  openModal('m-lesson');
}

function renderLStep(){
  const box=document.querySelector('#m-lesson .modal-box');
  if(!box)return;
  const step=_lSteps[_lStep];
  const pct=Math.round((_lStep/_lSteps.length)*100);
  const progBar=`<div class="lp-prog-bar"><div class="lp-prog-fill" style="width:${pct}%"></div></div>`;

  let inner='';

  if(step.type==='intro'){
    inner=`${progBar}
    <div class="lp-step-pad">
      <div class="lp-step-lbl">Introduction</div>
      <div class="ls-intro-icon">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="var(--red)" stroke-width="2" fill="var(--card2)"/>
          <path d="M20 44 L32 20 L44 44" stroke="var(--red)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="32" cy="14" r="4" fill="var(--red)"/>
          <path d="M26 36 L38 36" stroke="var(--red)" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="ls-intro-title">${esc(_lesson.title)}</div>
      <div class="ls-intro-meta">10-15 min · +${_lesson.xp} XP · ${_lesson.vocab.length} mots</div>
      <div class="ls-intro-desc">Dans cette leçon vous apprendrez du vocabulaire essentiel et une règle de grammaire avec des exercices pratiques.</div>
      <button class="btn btn-p btn-w" onclick="nextLStep()">${IC.play} Commencer</button>
    </div>`;
  }

  else if(step.type==='vocab'){
    inner=`${progBar}
    <div class="lp-step-pad">
      <div class="lp-step-lbl">Vocabulaire</div>
      <div class="ls-intro-title" style="font-size:1.1rem;margin-bottom:12px">
        ${_lesson.vocab.length} mots à apprendre
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px">
        ${_lesson.vocab.map((w,i)=>`
        <div style="display:flex;align-items:center;gap:10px;background:var(--card);border-radius:var(--rs);padding:11px">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--red);color:#fff;font-size:.76rem;font-weight:800;display:flex;align-items:center;justify-content:center">${i+1}</div>
          <div style="flex:1">
            <div style="font-size:.95rem;font-weight:700">${esc(w.fr)}</div>
            <div style="font-size:.78rem;color:var(--txt3)">${esc(w.en)}</div>
          </div>
          <button onclick="speak('${esc(w.fr)}')" style="color:var(--red)">${IC.sound}</button>
        </div>`).join('')}
      </div>
      <button class="btn btn-p btn-w" onclick="nextLStep()">Commencer les cartes →</button>
    </div>`;
  }

  else if(step.type==='vocab-card'){
    const w=_lesson.vocab[step.idx];
    const total=_lesson.vocab.length;
    const isLast=step.idx===total-1;
    inner=`${progBar}
    <div class="lp-step-pad">
      <div class="lp-step-lbl">Mot ${step.idx+1} / ${total}</div>
      <div class="vocab-card">
        ${w.img?`<img src="${w.img}" class="vocab-card-img" loading="lazy" onerror="this.style.display='none'"/>`:''}
        <div class="vocab-fr">${esc(w.fr)}</div>
        <div class="vocab-pron">[${esc(w.pron||'')}]</div>
        <button class="vocab-speak-btn" onclick="speak('${esc(w.fr)}')">${IC.sound}</button>
        <div class="vocab-en">${esc(w.en)}</div>
        <div class="vocab-ar">${esc(w.ar||'')}</div>
        <div class="vocab-ex">« ${esc(w.ex||'')} »</div>
        ${w.note?`<div class="vocab-note">${esc(w.note)}</div>`:''}
      </div>
      <div class="vocab-nav">
        ${step.idx>0?`<button class="btn btn-o" onclick="prevVocab()">← Précédent</button>`:'<div></div>'}
        <button class="btn btn-p" onclick="${isLast?'nextLStep()':'nextVocab()'}">
          ${isLast?'Continuer →':'Suivant →'}
        </button>
      </div>
    </div>`;
  }

  else if(step.type==='grammar'){
    const g=_lesson.grammar;
    inner=`${progBar}
    <div class="lp-step-pad">
      <div class="lp-step-lbl">Grammaire</div>
      <div class="grammar-card">
        <div class="grammar-title">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          ${esc(g.title||'Grammaire')}
        </div>
        <div class="grammar-rule">${esc(g.rule||'')}</div>
        ${(g.examples||[]).length?`<div class="grammar-exs">${g.examples.map(e=>`<div class="grammar-ex">${esc(e)}</div>`).join('')}</div>`:''}
        ${g.tip?`<div class="grammar-tip">${esc(g.tip)}</div>`:''}
        ${(g.exceptions||[]).length?`<div class="grammar-exc"><div class="grammar-exc-title">⚠️ Exceptions & Pièges</div><ul>${g.exceptions.map(e=>`<li>${esc(e)}</li>`).join('')}</ul></div>`:''}
      </div>
      <button class="btn btn-p btn-w" onclick="nextLStep()">Compris! →</button>
    </div>`;
  }

  else if(step.type==='ex-mcq'){
    const v=_lesson.vocab[0]||{fr:'bonjour',en:'hello'};
    const opts=shuffle([v.en,...(_lesson.vocab.slice(1,4).map(w=>w.en)||['goodbye','thanks','please'])]);
    const ans=opts.indexOf(v.en);
    inner=`${progBar}
    <div class="lp-step-pad">
      <div class="lp-step-lbl">Exercice — Quiz</div>
      <div class="ex-q">Que signifie "<strong>${esc(v.fr)}</strong>"?</div>
      <div class="ex-opts">
        ${opts.map((o,i)=>`<button class="ex-opt" data-i="${i}" onclick="checkMcq(${i},${ans},'${esc(v.en)} = ${esc(v.fr)}')"> ${esc(o)}</button>`).join('')}
      </div>
      <div id="ex-fb"></div>
    </div>`;
  }

  else if(step.type==='ex-fill'){
    const v=_lesson.vocab[Math.min(1,_lesson.vocab.length-1)]||{fr:'merci',en:'thank you',ex:'Merci beaucoup!'};
    const prompt=(v.ex||v.fr+' = ?').replace(v.fr,'___');
    inner=`${progBar}
    <div class="lp-step-pad">
      <div class="lp-step-lbl">Exercice — Compléter</div>
      <div class="ex-q">${esc(prompt)}</div>
      <div class="fill-hint">Indice: ${esc(v.en||'')}</div>
      <input id="fill-inp" class="field-inp fill-inp" placeholder="Votre réponse..." autocomplete="off"/>
      <button class="btn btn-p btn-w" style="margin-top:10px" onclick="checkFill('${esc(v.fr)}')">Vérifier</button>
      <div id="ex-fb"></div>
    </div>`;
  }

  else if(step.type==='ex-listen'){
    const phrases=_lesson.vocab.slice(0,3);
    inner=`${progBar}
    <div class="lp-step-pad">
      <div class="lp-step-lbl">Exercice — Écouter & Répéter</div>
      <div class="ex-q">Écoutez et répétez chaque phrase:</div>
      <div class="listen-rows">
        ${phrases.map(w=>`
        <div class="listen-row">
          <div style="flex:1">
            <div class="listen-txt">${esc(w.fr)}</div>
            <span class="listen-tr">${esc(w.en)}</span>
          </div>
          <button class="listen-spk" onclick="speak('${esc(w.fr)}')">${IC.sound}</button>
        </div>`).join('')}
      </div>
      <button class="btn btn-p btn-w" onclick="nextLStep()">Continuer →</button>
    </div>`;
  }

  else if(step.type==='ex-speak'){
    const w=_lesson.vocab[0]||{fr:'Bonjour!',ar:'مرحباً',ex:'Bonjour, comment allez-vous?'};
    inner=`${progBar}
    <div class="lp-step-pad">
      <div class="lp-step-lbl">Expression Orale — Prononcez</div>
      <div class="ex-q">Lisez cette phrase à voix haute, puis cliquez pour écouter le modèle:</div>
      <div class="ex-speak-phrase">${esc(w.fr)}</div>
      <div class="ex-speak-tr">${esc(w.ar||w.en)}</div>
      <div class="ex-speak-btns">
        <button class="btn btn-p" onclick="speak('${esc(w.fr)}')">
          ${IC.sound} Écouter le modèle
        </button>
        <button class="btn btn-o" onclick="speak('${esc(w.ex||w.fr)}')">
          ${IC.sound} Écouter l'exemple complet
        </button>
        <div style="background:var(--card);border:1px solid var(--bdr);border-radius:var(--rs);padding:12px;font-size:.84rem;color:var(--txt2);line-height:1.5">
          <strong style="color:var(--red)">Conseil de prononciation:</strong><br/>
          ${esc(w.note||'Prononcez lentement et clairement. Écoutez le modèle plusieurs fois.')}
        </div>
        <button class="btn btn-p btn-w" onclick="nextLStep()">J'ai pratiqué →</button>
      </div>
    </div>`;
  }

  else if(step.type==='ex-write'){
    const w=_lesson.vocab[Math.floor(_lesson.vocab.length/2)]||_lesson.vocab[0]||{fr:'',ex:'',en:''};
    inner=`${progBar}
    <div class="lp-step-pad">
      <div class="lp-step-lbl">Expression Écrite — Produire</div>
      <div class="ex-q">Écrivez une phrase complète avec: <strong>${esc(w.fr)}</strong></div>
      <div class="ex-write-example">
        Exemple: « ${esc(w.ex||'')} »
      </div>
      <textarea id="write-area" class="ex-write-area" placeholder="Écrivez votre phrase ici..."></textarea>
      <div id="write-example-data" data-ex="${esc(w.ex||'')}"></div>
      <button class="btn btn-p btn-w" onclick="checkWrite()">Soumettre</button>
      <div id="ex-fb"></div>
    </div>`;
  }

  else if(step.type==='wordbook-review'){
    inner=`${progBar}
    <div class="lp-step-pad">
      <div class="lp-step-lbl">WordBook — Révision finale</div>
      <div class="wb-rev-desc">Révisez tous les mots de cette leçon avant de terminer:</div>
      <div class="wb-rev-list">
        ${_lesson.vocab.map(w=>`
        <div class="wb-rev-row">
          <div class="wb-rev-fr">${esc(w.fr)}</div>
          <div class="wb-rev-mid">
            <div class="wb-rev-pron">[${esc(w.pron||'')}]</div>
            <div class="wb-rev-en">${esc(w.en)}</div>
          </div>
          <div class="wb-rev-ar">${esc(w.ar||'')}</div>
          <span class="wb-rev-spk" onclick="speak('${esc(w.fr)}')">${IC.sound}</span>
        </div>`).join('')}
      </div>
      <button class="btn btn-p btn-w" onclick="nextLStep()">Terminer la leçon →</button>
    </div>`;
  }

  else if(step.type==='complete'){
    authCompleteLesson(_lesson.id,_lesson.xp);
    inner=`${progBar}
    <div class="ls-complete">
      <div class="ls-complete-anim">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="rgba(39,174,96,.12)" stroke="var(--ok)" stroke-width="2"/>
          <path d="M24 40 L34 50 L56 28" stroke="var(--ok)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="ls-complete-title">Leçon terminée!</div>
      <div class="ls-complete-xp">+${_lesson.xp} XP</div>
      <div class="ls-complete-stars">
        ${IC.star}${IC.star}${IC.star}
      </div>
      <div class="ls-complete-msg">
        Félicitations! Le WordBook de cette leçon est maintenant débloqué.
      </div>
      <div class="ls-complete-btns">
        <button class="btn btn-o" onclick="closeModal('m-lesson');openWordbook('${_lesson.id}')">
          ${IC.book} WordBook
        </button>
        <button class="btn btn-p" onclick="closeModal('m-lesson');goTo('lesson-map',{levelId:'${_lesson.levelId}'})">
          Continuer →
        </button>
      </div>
    </div>`;
  }

  box.innerHTML=inner;
}

function prevVocab(){
  const cur=_lSteps[_lStep];
  if(cur.type==='vocab-card'&&cur.idx>0){_lStep--;renderLStep();}
}
function nextVocab(){
  _lStep++;renderLStep();
}
function nextLStep(){
  if(_lStep<_lSteps.length-1){_lStep++;renderLStep();}
}

function checkMcq(chosen,correct,exp){
  document.querySelectorAll('.ex-opt').forEach((b,i)=>{
    b.disabled=true;
    if(i===correct)b.classList.add('correct');
    else if(i===chosen)b.classList.add('wrong');
  });
  const fb=$id('ex-fb');
  if(fb){
    const ok=chosen===correct;
    fb.innerHTML=`<div style="margin-top:12px" class="${ok?'fb-ok':'fb-err'}">
      ${ok?'Correct! ':'Incorrect. '}${esc(exp)}
    </div>
    <button class="btn btn-p btn-sm" style="margin-top:12px;width:100%" onclick="nextLStep()">Suivant →</button>`;
  }
}
function checkFill(answer){
  const v=($id('fill-inp')?.value||'').trim().toLowerCase();
  const ok=v===answer.toLowerCase()||answer.toLowerCase().includes(v);
  const fb=$id('ex-fb');
  if(fb) fb.innerHTML=`<div style="margin-top:12px" class="${ok?'fb-ok':'fb-err'}">
    ${ok?'Parfait!':'Réponse: '+answer}
  </div>
  <button class="btn btn-p btn-sm" style="margin-top:12px;width:100%" onclick="nextLStep()">Suivant →</button>`;
}
function checkWrite() {
  const val = ($id('write-area')?.value || '').trim();
  const exEl = $id('write-example-data');
  const ex = exEl ? exEl.dataset.ex : '';
  const fb = $id('ex-fb');
  if (!val) { showToast('Écrivez quelque chose!','warn'); return; }
  if (val.length < 5) { showToast('Écrivez une phrase complète!','warn'); return; }
  if (fb) fb.innerHTML = `
    <div class="ex-feedback">
      <div class="fb-ok" style="margin-bottom:8px">Bien! Votre production a été enregistrée.</div>
      ${ex ? `<div style="font-size:.82rem;color:var(--txt2)">Exemple modèle: <em>${esc(ex)}</em></div>` : ''}
      <button class="btn btn-p btn-sm" style="margin-top:12px;width:100%" onclick="nextLStep()">Continuer →</button>
    </div>`;
}

function handleWrite(lessonId) {
  const val = (document.getElementById('write-area')?.value || '').trim();
  const fb = document.getElementById('ex-fb');
  if (!val) { showToast('Écrivez quelque chose!','warn'); return; }
  if (fb) fb.innerHTML = `<div class="ex-feedback"><div class="fb-ok">
    Bien! Votre phrase a été notée. Exemple: <em>${esc(document.getElementById('write-example')?.dataset?.ex||'')}</em>
  </div><button class="btn btn-p btn-sm" style="margin-top:10px;width:100%" onclick="nextLStep()">Suivant →</button></div>`;
}

function shuffle(a){return[...a].sort(()=>Math.random()-.5)}

// ── WordBook ─────────────────────────────────────────────────
function openWordbook(lessonId){
  if(!isWordbookUnlocked(lessonId)){
    showToast('Terminez la leçon pour débloquer le WordBook','err');return;
  }
  const parts=lessonId.split('-');
  const levelId=parts.slice(0,parts.findIndex(p=>p.startsWith('u'))).join('-');
  const unitNum=parseInt((parts.find(p=>p.startsWith('u'))||'u1').slice(1))||1;
  const lessonNum=parseInt((parts.find(p=>p.startsWith('l'))||'l1').slice(1))||1;
  const vocab=typeof getVocab==='function'?getVocab(levelId,unitNum,lessonNum):[];
  const lTitles=(LESSON_TITLES&&LESSON_TITLES[`${levelId}-u${unitNum}`])||[];
  const lTitle=lTitles[lessonNum-1]||`Leçon ${lessonNum}`;

  const box=document.querySelector('#m-wordbook .modal-box');
  if(!box)return;
  box.innerHTML=`
  <div class="drag-bar"></div>
  <div class="mhdr">
    <div class="mhdr-title">${IC.book} WordBook — ${esc(lTitle)}</div>
    <button class="mclose" onclick="closeModal('m-wordbook')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <div class="wb-modal-meta">Unité ${unitNum} · Leçon ${lessonNum} · ${vocab.length} mots</div>
  <div class="wb-entries">
    ${vocab.map((w,i)=>`
    <div class="wb-entry">
      <div class="wb-entry-num">${i+1}</div>
      <div class="wb-entry-body">
        <div class="wb-entry-fr">${esc(w.fr)}</div>
        <div class="wb-entry-pron">[${esc(w.pron||'')}]</div>
        <div class="wb-entry-en">${esc(w.en)}</div>
        <div class="wb-entry-ar">${esc(w.ar||'')}</div>
        <div class="wb-entry-ex">« ${esc(w.ex||'')} »</div>
        ${w.note?`<div class="wb-entry-note">${esc(w.note)}</div>`:''}
      </div>
      <button class="wb-entry-spk" onclick="speak('${esc(w.fr)}')">${IC.sound}</button>
    </div>`).join('')}
  </div>`;
  openModal('m-wordbook');
}

// ── Progress Page ─────────────────────────────────────────────
function renderProgress(){
  const el=$id('page-progress');
  if(!el)return;
  const s=getSession();
  if(!s){el.innerHTML='<div class="center-msg">Connectez-vous pour voir vos progrès.</div>';return;}
  const total=300;
  const done=(s.completedLessons||[]).length;
  const pct=Math.round(done/total*100);
  const circ=2*Math.PI*50;
  const dash=circ*(pct/100);
  const days=s.joinedAt?Math.max(1,Math.ceil((Date.now()-s.joinedAt)/86400000)):1;
  const avg=Math.round(done/days*10)/10;
  const onTrack=avg>=1;
  const levels=['pre-a1','a1','a2','b1','b2','c1'];

  el.innerHTML=`
  <div class="prog-page">
    <div class="prog-hdr"><h2>Ma Progression</h2></div>
    <div class="ring-wrap">
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bdr)" stroke-width="10"/>
        <circle cx="60" cy="60" r="50" fill="none" stroke="var(--red)" stroke-width="10"
          stroke-dasharray="${dash.toFixed(1)} ${circ.toFixed(1)}"
          stroke-dashoffset="${(circ/4).toFixed(1)}"
          stroke-linecap="round" transform="rotate(-90 60 60)"/>
      </svg>
      <div class="ring-txt">
        <div class="ring-pct">${pct}%</div>
        <div class="ring-lbl">Complété</div>
      </div>
    </div>
    <div class="prog-stats">
      <div class="ps-box"><div class="ps-v">${done}</div><div class="ps-l">Leçons</div></div>
      <div class="ps-box"><div class="ps-v">${s.xp||0}</div><div class="ps-l">XP</div></div>
      <div class="ps-box"><div class="ps-v">${s.streak||0}j</div><div class="ps-l">Série</div></div>
      <div class="ps-box"><div class="ps-v">${total-done}</div><div class="ps-l">Restant</div></div>
    </div>
    <div class="analysis-card ${onTrack?'analysis-good':'analysis-warn'}">
      <div class="analysis-ic">
        ${onTrack
          ?`<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--ok)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
          :`<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--warn)" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
        }
      </div>
      <div>
        <div class="analysis-title">${onTrack?'Excellente progression!':'Continuez vos efforts!'}</div>
        <div class="analysis-desc">${onTrack
          ?`Moyenne de ${avg} leçon/jour. Vous êtes sur la bonne voie!`
          :`Essayez de faire au moins 1 leçon par jour pour progresser régulièrement.`
        }</div>
      </div>
    </div>
    <div class="lv-bars-title">Progression par niveau</div>
    ${levels.map(lv=>{
      const d=(s.completedLessons||[]).filter(id=>id.startsWith(lv+'-')).length;
      const p=Math.round(d/50*100);
      return `<div class="lv-bar-row">
        <div class="lv-bar-name">${lv.toUpperCase()}</div>
        <div class="lv-bar-track"><div class="lv-bar-fill" style="width:${p}%"></div></div>
        <div class="lv-bar-count">${d}/50</div>
      </div>`;
    }).join('')}
    <div class="certs-sec">
      <div class="certs-title">Certificats</div>
      ${levels.map(lv=>{
        const d=(s.completedLessons||[]).filter(id=>id.startsWith(lv+'-')).length;
        const earned=d>=50;
        return `<div class="cert-row ${earned?'cert-earned':'cert-locked-row'}">
          <span>${earned?IC.cert:IC.lock} Certificat ${lv.toUpperCase()}</span>
          ${earned
            ?`<button class="btn btn-o btn-xs" onclick="showToast('Certificat téléchargé!','ok')">Télécharger</button>`
            :`<span class="cert-remain">${50-d} leçons restantes</span>`
          }
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

// ── Profile Page ──────────────────────────────────────────────
function renderProfile(){
  const el=$id('page-profile');
  if(!el)return;
  const s=getSession();
  if(!s){el.innerHTML='<div class="center-msg">Connectez-vous pour voir votre profil.</div>';return;}
  const total=300;
  const done=(s.completedLessons||[]).length;
  const pct=Math.round(done/total*100);
  const days=s.joinedAt?Math.max(1,Math.ceil((Date.now()-s.joinedAt)/86400000)):1;
  const avg=Math.round(done/days*10)/10;
  const onTrack=avg>=1;

  el.innerHTML=`
  <div class="profile-page">
    <div class="profile-av-wrap">
      <div class="profile-av">${esc((s.name||'U')[0].toUpperCase())}</div>
      <div class="profile-name">${esc(s.name||'')}</div>
      <div class="profile-email">${esc(s.email||'')}</div>
      <div class="profile-lv-badge">${(s.level||'Pre-A1').toUpperCase()}</div>
    </div>
    <div class="profile-info">
      ${[
        ['Membre depuis', s.joinedAt?new Date(s.joinedAt).toLocaleDateString('fr-FR'):'—'],
        ['XP Total', (s.xp||0)+' XP'],
        ['Leçons complétées', done+' / '+total],
        ['Série actuelle', (s.streak||0)+' jours'],
        ['Moyenne / jour', avg+' leçons'],
        ['Objectif quotidien', (s.settings?.dailyGoal||10)+' min'],
      ].map(([l,v])=>`
      <div class="profile-info-row">
        <span class="pir-lbl">${esc(l)}</span>
        <span class="pir-val">${esc(String(v))}</span>
      </div>`).join('')}
    </div>
    <div class="profile-pbar-wrap">
      <div class="profile-pbar-lbl">Progression globale: ${pct}%</div>
      <div class="profile-pbar"><div class="profile-pbar-fill" style="width:${pct}%"></div></div>
    </div>
    <div class="profile-analysis">
      <div class="profile-analysis-title">Analyse personnalisée</div>
      <div class="profile-analysis-body">
        ${pct<10?'Vous êtes au début de votre voyage. Faites au moins une leçon par jour!':
          pct<30?'Bonne progression! Continuez sur cette lancée.':
          pct<60?'Excellent! Vous êtes à mi-chemin. Ne lâchez pas!':
          pct<90?'Impressionnant! Vous maîtrisez déjà beaucoup de français.':
          'Félicitations! Vous êtes presque expert en français!'}
        ${onTrack?' Votre rythme est excellent. Continuez!':' Essayez d\'augmenter votre rythme d\'étude.'}
      </div>
    </div>
    <div class="profile-certs">
      <div class="profile-certs-title">Certificats obtenus</div>
      ${['pre-a1','a1','a2','b1','b2','c1'].map(lv=>{
        const d=(s.completedLessons||[]).filter(id=>id.startsWith(lv+'-')).length;
        return d>=50?`<div class="cert-earned-card">${IC.cert} Certificat ${lv.toUpperCase()}</div>`:'';
      }).join('')||'<div class="no-certs">Terminez un niveau complet pour obtenir un certificat.</div>'}
    </div>
    <div class="profile-actions">
      <button class="btn btn-o" onclick="openEditProfile()">${IC.edit} Modifier</button>
      <button class="btn btn-err" onclick="doLogout()">${IC.logout} Déconnexion</button>
    </div>
  </div>`;
}

function openEditProfile(){
  const s=getSession();
  if(!s)return;
  const box=document.querySelector('#m-editprofile .modal-box');
  if(!box)return;
  box.innerHTML=`
  <div class="drag-bar"></div>
  <div class="mhdr">
    <div class="mhdr-title">${IC.edit} Modifier le profil</div>
    <button class="mclose" onclick="closeModal('m-editprofile')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <div class="edit-form">
    <div class="field-wrap">
      <label class="field-label">Prénom</label>
      <input id="ep-name" class="field-inp" value="${esc(s.name||'')}"/>
    </div>
    <div class="field-wrap">
      <label class="field-label">Nouveau mot de passe (laisser vide = inchangé)</label>
      <input id="ep-pass" class="field-inp" type="password" placeholder="••••••"/>
    </div>
    <button class="btn btn-p btn-w" onclick="saveEditProfile()">Sauvegarder</button>
  </div>`;
  openModal('m-editprofile');
}

function saveEditProfile(){
  const s=getSession();
  if(!s)return;
  const name=($id('ep-name')?.value||'').trim();
  const pw=$id('ep-pass')?.value||'';
  const updates={};
  if(name)updates.name=name;
  if(pw.length>=6)updates.password=btoa(pw);
  if(Object.keys(updates).length){
    authUpdate(updates);
    showToast('Profil mis à jour!','ok');
    closeModal('m-editprofile');
    renderProfile();
  } else {
    showToast('Aucune modification','info');
  }
}

// ── Settings Page ─────────────────────────────────────────────
function renderSettings(){
  const el=$id('page-settings');
  if(!el)return;
  const s=getSession();
  el.innerHTML=`
  <div class="settings-page">
    <div class="settings-hdr"><h2>Paramètres</h2></div>
    <div class="settings-cards">
      ${[
        {id:'features',ic:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>`,
         title:'Fonctionnalités',desc:'Guide complet de toutes les fonctions'},
        {id:'language',ic:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round"><path d="M5 8l6 6m-6 0l6-6M19 5h-7m7 0a2 2 0 010 4h-7"/></svg>`,
         title:'Langue',desc:`Actuel: ${s?.settings?.uiLang==='en'?'English':'العربية'}`},
        {id:'goal',ic:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
         title:'Objectif quotidien',desc:`${s?.settings?.dailyGoal||10} min par jour`},
        {id:'notifications',ic:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
         title:'Rappels quotidiens',desc:'Gardez votre série active'},
        {id:'about',ic:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8h.01M11 12h1v4h1"/></svg>`,
         title:'À propos',desc:'Languway French v7.0'},
      ].map(c=>`
      <div class="settings-card" onclick="openSettingDetail('${c.id}')">
        <div class="settings-card-ic">${c.ic}</div>
        <div class="settings-card-info">
          <div class="settings-card-title">${esc(c.title)}</div>
          <div class="settings-card-desc">${esc(c.desc)}</div>
        </div>
        ${IC.arrow_r}
      </div>`).join('')}
    </div>
  </div>`;
}

function openSettingDetail(section){
  const box=document.querySelector('#m-settings-det .modal-box');
  if(!box)return;
  const titles={features:'Guide des Fonctionnalités',language:'Langue',goal:'Objectif quotidien',notifications:'Rappels',about:'À propos'};
  const content={
    features:renderFeaturesGuide(),
    language:renderLangSetting(),
    goal:renderGoalSetting(),
    notifications:renderNotifSetting(),
    about:renderAbout(),
  }[section]||'';
  box.innerHTML=`
  <div class="drag-bar"></div>
  <div class="mhdr">
    <button class="back-btn" onclick="closeModal('m-settings-det')">${IC.arrow_l}</button>
    <div class="mhdr-title">${esc(titles[section]||section)}</div>
    <div style="width:38px"></div>
  </div>
  <div class="settings-det-body">${content}</div>`;
  openModal('m-settings-det');
}

function renderFeaturesGuide(){
  const feats=[
    {name:'Leçons (300 au total)',tag:'Fonctionnalité principale',color:'#D62828',
     ic:`<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
     desc:'Le cœur de Languway French. 300 leçons organisées en 6 niveaux (Pre-A1 → C1), chacun avec 10 unités de 5 leçons.',
     how:['Allez sur Accueil → cliquez votre niveau','Choisissez une Unité puis une Leçon débloquée','Suivez: Introduction → Vocabulaire → Grammaire → Exercices → WordBook','Chaque leçon = 50-120 XP selon le niveau'],
     pros:['300 leçons structurées et progressives','Vocabulaire avec audio TTS','Exercices variés (QCM, texte à trous, écoute)','Progression automatiquement sauvegardée'],
     cons:['Les leçons sont séquentielles (pas de saut)','Audio nécessite un navigateur compatible','Contenu fixe (pas de génération IA en leçon)'],
     tip:'Faites au moins 1 leçon par jour pour maintenir votre série!'},
    {name:'WordBook (Cahier de mots)',tag:'Mémorisation',color:'#2D9CDB',
     ic:`<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>`,
     desc:'Chaque leçon possède son WordBook propre. Contient tous les mots avec prononciation IPA, traduction, exemples et notes grammaticales.',
     how:['Terminez une leçon complètement','Le bouton WordBook se débloque dans la liste','Cliquez pour consulter tous les mots','Utilisez le bouton audio pour entendre chaque mot'],
     pros:['Lié à chaque leçon spécifiquement','Prononciation IPA + audio','Traductions arabe et anglais','Exemples de phrases authentiques','Notes grammaticales et culturelles'],
     cons:['Accessible seulement après avoir fini la leçon','Pas de mode révision par flashcard (pour l\'instant)'],
     tip:'Révisez votre WordBook 24h après la leçon pour maximiser la mémorisation (courbe d\'Ebbinghaus)!'},
    {name:'Traducteur Intelligent',tag:'Intelligence Artificielle',color:'#27AE60',
     ic:`<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M5 8l6 6m-6 0l6-6M19 5h-7m7 0a2 2 0 010 4h-7"/></svg>`,
     desc:'Traducteur IA avancé alimenté par Claude. Ne traduit pas seulement — explique en détail, conjugue les verbes, donne des exemples et affiche des images pour les noms.',
     how:['Cliquez Traducteur dans la navigation','Choisissez la direction de traduction','Tapez votre mot ou phrase','Cliquez "Traduire & Expliquer"','Lisez l\'explication, exemples et conjugaison'],
     pros:['Explication détaillée (pas juste la traduction)','Prononciation IPA + audio','Tableau de conjugaison pour les verbes','Images illustratives pour les noms','3 exemples de phrases authentiques','Conseil mémo-technique','Sauvegarde dans votre WordBook personnel'],
     cons:['Nécessite une connexion Internet','2-3 secondes de délai (analyse IA)','Images dépendent du type de mot'],
     tip:'Utilisez le traducteur quand vous rencontrez un mot inconnu — il vous donnera beaucoup plus qu\'un dictionnaire!'},
    {name:'Progression & Certificats',tag:'Suivi',color:'#F77F00',
     ic:`<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
     desc:'Tableau de bord complet pour suivre votre avancement. Anneau de progression, statistiques, analyse IA de votre rythme, certificats par niveau.',
     how:['Allez dans Progression dans la navigation','Consultez votre % global en anneau','Lisez l\'analyse de votre rythme','Téléchargez vos certificats (niveau complété = 50 leçons)'],
     pros:['Visualisation claire en anneau circulaire','Analyse IA personnalisée (bon rythme / encouragement)','Barres de progression par niveau','Système de certificats (1 par niveau)','Statistiques: leçons, XP, série'],
     cons:['Données stockées localement (perdues si cache effacé)','Pas de classement avec d\'autres utilisateurs'],
     tip:'Terminez un niveau complet (50 leçons) pour obtenir votre certificat officiel!'},
    {name:'Profil utilisateur',tag:'Compte',color:'#9333EA',
     ic:`<svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
     desc:'Votre espace personnel complet: informations du compte, statistiques détaillées, analyse de performance et certificats obtenus.',
     how:['Allez dans Profil dans la navigation','Consultez vos statistiques complètes','Lisez l\'analyse IA de votre performance','Modifiez votre nom ou mot de passe si nécessaire'],
     pros:['Avatar initial personnalisé','Statistiques complètes (XP, série, moyenne/jour)','Analyse IA: "Êtes-vous sur la bonne voie?"','Modification du profil facile','Connexion/déconnexion sécurisée'],
     cons:['Pas de photo de profil (initiale seulement)','Pas de synchronisation cloud (données locales)'],
     tip:'Vérifiez votre profil régulièrement pour suivre votre évolution!'},
  ];

  return `
  <div class="fg-intro">
    <div class="fg-intro-ic">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
    </div>
    <div class="fg-intro-txt">
      <strong>Guide complet de Languway French v7</strong><br/>
      Tout ce que vous devez savoir pour utiliser l'application au maximum de ses capacités.
    </div>
  </div>
  ${feats.map(f=>`
  <div class="fg-feat">
    <div class="fg-feat-hdr">
      <div class="fg-feat-ic" style="background:${f.color}">${f.ic}</div>
      <div>
        <div class="fg-feat-name">${esc(f.name)}</div>
        <div class="fg-feat-tag">${esc(f.tag)}</div>
      </div>
    </div>
    <div class="fg-sec-title">Description</div>
    <p class="fg-desc">${esc(f.desc)}</p>
    <div class="fg-sec-title">Comment utiliser</div>
    <ol class="fg-steps">${f.how.map(h=>`<li>${esc(h)}</li>`).join('')}</ol>
    <div class="fg-sec-title">Avantages</div>
    <ul class="fg-ul">${f.pros.map(p=>`<li>${esc(p)}</li>`).join('')}</ul>
    <div class="fg-sec-title">Limitations</div>
    <ul class="fg-ul warn">${f.cons.map(c=>`<li>${esc(c)}</li>`).join('')}</ul>
    <div class="fg-tip">${esc(f.tip)}</div>
  </div>`).join('')}
  <div class="fg-feat">
    <div class="fg-sec-title">Résumé comparatif</div>
    <div class="fg-table-wrap">
      <div class="fg-table-row hdr"><span>Fonctionnalité</span><span>Hors-ligne?</span><span>Gratuit?</span></div>
      ${[
        ['Leçons (300)','Oui','Oui'],
        ['WordBook','Oui','Oui'],
        ['Traducteur IA','Non (Internet)','Oui'],
        ['Progression','Oui','Oui'],
        ['Certificats','Oui','Oui'],
        ['Audio TTS','Oui*','Oui'],
        ['Profil & Compte','Oui','Oui'],
      ].map(r=>`<div class="fg-table-row">${r.map(c=>`<span>${esc(c)}</span>`).join('')}</div>`).join('')}
    </div>
    <p class="fg-desc" style="margin-top:8px;font-size:.76rem">* Audio TTS dépend du navigateur. Certains navigateurs nécessitent une connexion pour les voix de qualité.</p>
  </div>`;
}

function renderLangSetting(){
  const s=getSession();
  const cur=s?.settings?.uiLang||'ar';
  return `
  <p class="fg-desc" style="margin-bottom:16px">Choisissez la langue des explications du traducteur:</p>
  <div class="lang-opts">
    <button class="lang-opt ${cur==='ar'?'active':''}" onclick="setLang('ar')">العربية</button>
    <button class="lang-opt ${cur==='en'?'active':''}" onclick="setLang('en')">English</button>
  </div>`;
}
function setLang(lang){
  const s=getSession();
  if(!s)return;
  authUpdate({settings:{...(s.settings||{}),uiLang:lang}});
  showToast(lang==='ar'?'تم تغيير اللغة':'Language changed','ok');
  openSettingDetail('language');
}

function renderGoalSetting(){
  const s=getSession();
  const cur=s?.settings?.dailyGoal||10;
  return `
  <p class="fg-desc" style="margin-bottom:16px">Combien de minutes par jour souhaitez-vous étudier?</p>
  <div class="goal-opts">
    ${[5,10,15,20,30].map(g=>`<button class="goal-opt ${cur===g?'active':''}" onclick="setGoal(${g})">${g} min</button>`).join('')}
  </div>`;
}
function setGoal(min){
  const s=getSession();
  if(!s)return;
  authUpdate({settings:{...(s.settings||{}),dailyGoal:min}});
  showToast(`Objectif: ${min} min/jour`,'ok');
  openSettingDetail('goal');
}

function renderNotifSetting(){
  const s=getSession();
  const on=s?.settings?.notifications!==false;
  return `
  <p class="fg-desc" style="margin-bottom:16px">Recevez un rappel pour étudier chaque jour:</p>
  <div class="toggle-row">
    <span>Rappels quotidiens</span>
    <div class="tog-btn ${on?'on':''}" onclick="toggleNotif()"><div class="tog-knob"></div></div>
  </div>
  <p class="notif-note">Les rappels utilisent les notifications du navigateur.</p>
  <button class="btn btn-o btn-sm" onclick="Notification.requestPermission().then(p=>showToast('Statut: '+p,'info'))">
    Autoriser les notifications
  </button>`;
}
function toggleNotif(){
  const s=getSession();
  if(!s)return;
  const cur=s.settings?.notifications!==false;
  authUpdate({settings:{...(s.settings||{}),notifications:!cur}});
  openSettingDetail('notifications');
}

function renderAbout(){
  return `
  <div class="about-page">
    <div class="about-logo-wrap">
      <svg width="70" height="70" viewBox="0 0 80 80">
        <defs><linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#D62828"/><stop offset="100%" stop-color="#8B0000"/></linearGradient></defs>
        <rect width="80" height="80" rx="20" fill="url(#ag)"/>
        <path d="M20 58 L40 22 L60 58" stroke="white" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="40" cy="15" r="6" fill="white"/>
        <path d="M31 46 L49 46" stroke="white" stroke-width="3.5" stroke-linecap="round"/>
      </svg>
    </div>
    <div class="about-name">Languway French</div>
    <div class="about-ver">Version 7.0 · 2024</div>
    <div class="about-desc">Application complète d'apprentissage du français — conçue pour les arabophones.</div>
    <div class="about-feats">
      ${[
        '300 leçons en 6 niveaux (Pre-A1 → C1)',
        'WordBook par leçon avec audio',
        'Traducteur IA avec explications détaillées',
        'Système de progression et certificats',
        'Progressive Web App — installable',
        'Mode hors-ligne (Service Worker)',
        'Thème sombre professionnel',
        'Interface responsive mobile et desktop',
      ].map(f=>`<div class="about-feat"><svg width="14" height="14" viewBox="0 0 24 24" fill="var(--ok)"><polyline points="20 6 9 17 4 12"/></svg>${esc(f)}</div>`).join('')}
    </div>
    <div class="about-footer">Fait avec passion pour les apprenants du monde arabe</div>
  </div>`;
}

// ── Streak ───────────────────────────────────────────────────
function updateStreak(){
  const s=getSession();
  if(!s||!s.lastStudy)return;
  const today=new Date().toDateString();
  const last=new Date(s.lastStudy).toDateString();
  const yest=new Date(Date.now()-86400000).toDateString();
  if(last!==today&&last!==yest&&s.streak>0){
    authUpdate({streak:0});
    showToast('Série perdue! Étudiez aujourd\'hui pour en commencer une nouvelle.','warn');
  }
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  // Build nav items
  const navDefs=[
    {page:'home',   label:'Accueil',  ic:IC.home},
    {page:'progress',label:'Progrès',  ic:IC.progress},
    {page:'lesson-map',label:'Leçons', ic:IC.lessons},
    {page:'translate',label:'Traduire',ic:IC.translate,isModal:true},
    {page:'profile', label:'Profil',   ic:IC.profile},
  ];
  const bnav=$id('bottom-nav');
  if(bnav) bnav.innerHTML=navDefs.map(n=>`
    <div class="bnav-item${n.page==='home'?' active':''}" data-page="${n.page}"
      onclick="${n.isModal?`openTranslator('')`:`goTo('${n.page}')`}">
      ${n.ic}<span>${n.label}</span>
    </div>`).join('');

  const snav=$id('sidebar-nav');
  if(snav) snav.innerHTML=[
    ...navDefs,
    {page:'settings',label:'Paramètres',ic:IC.settings},
  ].map(n=>`
    <div class="snav-item${n.page==='home'?' active':''}" data-page="${n.page}"
      onclick="${n.isModal?`openTranslator('')`:`goTo('${n.page}')`}">
      ${n.ic}<span>${n.label}</span>
    </div>`).join('');

  // Nav click (bottom nav)
  document.querySelectorAll('.bnav-item[data-page]').forEach(item=>{
    item.addEventListener('click',()=>{
      const p=item.dataset.page;
      if(p==='translate')return;
      if(p)goTo(p);
    });
  });

  // Speech voices
  if(window.speechSynthesis) speechSynthesis.getVoices();

  // Streak check
  updateStreak();

  // Show app, hide splash after 2.3s
  setTimeout(()=>{
    $id('splash')?.classList.add('gone');
    const app=$id('app');
    if(app) app.classList.add('ready');
    goTo('home');
  },2300);
});

// ── Placement Test ────────────────────────────────────────────
let _ptAnswers = [];
let _ptQ = 0;

function openPlacementTest() {
  _ptAnswers = [];
  _ptQ = 0;
  renderPtQuestion();
  openModal('m-placement');
}

function renderPtQuestion() {
  const content = $id('placement-content');
  if (!content) return;
  const total = PLACEMENT_TEST.length;

  if (_ptQ >= total) {
    // Show results
    const score = _ptAnswers.filter((a, i) => a === PLACEMENT_TEST[i].ans).length;
    const result = getPlacementLevel(score, total);
    content.innerHTML = `
    <div class="pt-result">
      <div class="pt-result-icon">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="rgba(39,174,96,.12)" stroke="var(--ok)" stroke-width="2"/>
          <path d="M24 40 L34 50 L56 28" stroke="var(--ok)" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="pt-result-title">Test terminé!</div>
      <div style="font-size:.88rem;color:var(--txt3);margin-bottom:12px">${score} / ${total} réponses correctes</div>
      <div class="pt-result-level">${esc(result.label)}</div>
      <div class="pt-result-desc">${esc(result.desc)}</div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button class="btn btn-o btn-sm" onclick="closeModal('m-placement');openModal('m-auth')">
          S'inscrire maintenant
        </button>
        <button class="btn btn-p" onclick="closeModal('m-placement');goTo('lesson-map',{levelId:'${result.level}'})">
          Commencer au niveau ${esc(result.label)}
        </button>
      </div>
      <!-- Review wrong answers -->
      <div style="margin-top:20px;text-align:left">
        <div style="font-size:.88rem;font-weight:700;margin-bottom:10px">Révision des réponses:</div>
        ${PLACEMENT_TEST.slice(0, 10).map((q, i) => {
          const userAns = _ptAnswers[i];
          const ok = userAns === q.ans;
          return `<div style="background:var(--card);border:1px solid ${ok ? 'rgba(39,174,96,.3)' : 'rgba(231,76,60,.3)'};border-radius:var(--rs);padding:10px;margin-bottom:7px">
            <div style="font-size:.82rem;font-weight:600;margin-bottom:4px">${esc(q.q)}</div>
            <div style="font-size:.78rem;color:${ok ? 'var(--ok)' : 'var(--err)'}">
              ${ok ? '✓ Correct' : `✗ Votre réponse: "${esc(q.opts[userAns ?? 0])}" | Correct: "${esc(q.opts[q.ans])}"`}
            </div>
            <div style="font-size:.76rem;color:var(--txt3);margin-top:3px">${esc(q.exp)}</div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
    return;
  }

  const q = PLACEMENT_TEST[_ptQ];
  const pct = Math.round((_ptQ / total) * 100);

  content.innerHTML = `
  <div class="pt-prog-bar"><div class="pt-prog-fill" style="width:${pct}%"></div></div>
  <div class="pt-q-num">Question ${_ptQ + 1} / ${total} · ${esc(q.band.toUpperCase())}</div>
  <div class="pt-q">${esc(q.q)}</div>
  <div class="pt-opts">
    ${q.opts.map((o, i) => `
    <button class="pt-opt" onclick="selectPtOpt(${i})">${esc(o)}</button>`).join('')}
  </div>`;
}

function selectPtOpt(idx) {
  const q = PLACEMENT_TEST[_ptQ];
  document.querySelectorAll('.pt-opt').forEach((b, i) => {
    b.disabled = true;
    if (i === q.ans) b.style.borderColor = 'var(--ok)', b.style.color = 'var(--ok)';
    else if (i === idx) b.style.borderColor = 'var(--err)', b.style.color = 'var(--err)';
  });
  _ptAnswers[_ptQ] = idx;

  // Show explanation briefly then next
  const content = $id('placement-content');
  if (content) {
    const expDiv = document.createElement('div');
    expDiv.style.cssText = 'margin-top:12px;padding:10px;border-radius:var(--rs);background:var(--card);font-size:.82rem;line-height:1.5';
    expDiv.innerHTML = `<strong>${idx === q.ans ? '✓ Correct!' : '✗ Incorrect.'}</strong> ${esc(q.exp)}`;
    content.appendChild(expDiv);

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-p btn-w';
    nextBtn.style.marginTop = '12px';
    nextBtn.textContent = _ptQ < PLACEMENT_TEST.length - 1 ? 'Suivant →' : 'Voir mes résultats';
    nextBtn.onclick = () => { _ptQ++; renderPtQuestion(); };
    content.appendChild(nextBtn);
  }
}

// ── Home Placement Banner ─────────────────────────────────────
function renderPlacementBanner(s) {
  const el = $id('home-placement-banner');
  if (!el) return;
  if (s) { el.innerHTML = ''; return; }
  el.innerHTML = `
  <div style="margin:0 14px 14px;background:linear-gradient(135deg,rgba(214,40,40,.15),rgba(147,51,234,.15));
    border:1px solid rgba(214,40,40,.3);border-radius:var(--r);padding:16px;cursor:pointer"
    onclick="openPlacementTest()">
    <div style="display:flex;align-items:center;gap:10px">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
      <div>
        <div style="font-size:.95rem;font-weight:800">Découvrez votre niveau!</div>
        <div style="font-size:.8rem;color:var(--txt2);margin-top:2px">Test de placement gratuit · 40 questions · 5 minutes</div>
      </div>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </div>
  </div>`;
}

// ── Exam System ───────────────────────────────────────────────
function openExam(levelId, unitNum) {
  if (!getSession()) { openModal('m-auth'); return; }
  const content = $id('exam-content');
  if (!content) return;

  // Build exam from vocabulary and grammar
  const questions = [];
  for (let l = 1; l <= 5; l++) {
    const vocab = getVocab(levelId, unitNum, l);
    vocab.forEach(w => {
      if (questions.length < 10) {
        const opts = shuffle([w.ar || w.en, 'incorrect 1', 'incorrect 2', 'incorrect 3']).slice(0, 4);
        questions.push({
          q: `Que signifie "${w.fr}" ?`,
          opts,
          ans: opts.indexOf(w.ar || w.en),
          correct: w.ar || w.en,
          exp: `"${w.fr}" [${w.pron || ''}] = "${w.ar || w.en}". ${w.note || ''}`
        });
      }
    });
  }

  let examStep = 0;
  let examScore = 0;

  function renderExamQ() {
    if (examStep >= questions.length) {
      const pct = Math.round(examScore / questions.length * 100);
      const passed = pct >= 70;
      content.innerHTML = `
      <div class="mhdr">
        <div class="mhdr-title">Résultat de l'examen</div>
        <button class="mclose" onclick="closeModal('m-exam')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div style="text-align:center;padding:28px 16px">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="36" fill="${passed ? 'rgba(39,174,96,.12)' : 'rgba(231,76,60,.12)'}" stroke="${passed ? 'var(--ok)' : 'var(--err)'}" stroke-width="2"/>
          <text x="40" y="47" text-anchor="middle" font-size="22" font-weight="900" fill="${passed ? 'var(--ok)' : 'var(--err)'}">${pct}%</text>
        </svg>
        <div style="font-size:1.3rem;font-weight:800;margin:14px 0 6px">${passed ? 'Bravo! Examen réussi!' : 'Examen non réussi'}</div>
        <div style="font-size:.88rem;color:var(--txt2);margin-bottom:16px">
          ${examScore} / ${questions.length} bonnes réponses — ${passed ? 'Continuez vers l\'unité suivante!' : 'Révisez les leçons et réessayez.'}
        </div>
        <button class="btn btn-p" onclick="closeModal('m-exam');goTo('lesson-map',{levelId:'${levelId}'})">
          Retour aux leçons
        </button>
      </div>`;
      return;
    }

    const q = questions[examStep];
    const pct = Math.round(examStep / questions.length * 100);

    content.innerHTML = `
    <div class="mhdr">
      <div class="mhdr-title">Examen — Unité ${unitNum}</div>
      <button class="mclose" onclick="if(confirm('Abandonner l\\'examen?'))closeModal('m-exam')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="lp-prog-bar"><div class="lp-prog-fill" style="width:${pct}%"></div></div>
    <div style="padding:16px">
      <div class="lp-step-lbl">Question ${examStep + 1} / ${questions.length}</div>
      <div class="ex-q">${esc(q.q)}</div>
      <div class="ex-opts">
        ${q.opts.map((o, i) => `<button class="ex-opt" onclick="
          document.querySelectorAll('.ex-opt').forEach((b,j)=>{b.disabled=true;if(j===${q.ans})b.classList.add('correct');else if(j===${i})b.classList.add('wrong')});
          ${i === q.ans ? 'examScore++' : ''};
          document.getElementById('exam-fb').innerHTML='<div class=\\'ex-feedback\\'><div class=\\"${i === q.ans ? 'fb-ok' : 'fb-err'}\\">${i === q.ans ? '✓ Correct!' : '✗ ' + esc(q.exp)}</div><button class=\\"btn btn-p btn-sm\\" style=\\"margin-top:10px;width:100%\\" onclick=\\"examStep++;renderExamQ()\\">Suivant →</button></div>'
        ">${esc(o)}</button>`).join('')}
      </div>
      <div id="exam-fb"></div>
    </div>`;
  }

  // Expose to closure
  window.examStep = 0;
  window.examScore = 0;
  content.innerHTML = '';
  renderExamQ();
  openModal('m-exam');
}

