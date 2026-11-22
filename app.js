/* ================================================================
   LANGUWAY FRENCH — app.js v6
   Main application logic
================================================================ */

// ── Utilities ──────────────────────────────────────────────────
function esc(s){ return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function $(id){ return document.getElementById(id); }
function openM(id){ const m=$(id); if(m) m.style.display='flex'; }
function closeM(id){ const m=$(id); if(m) m.style.display='none'; }
function getSession(){ try{ return JSON.parse(localStorage.getItem('lw_session')||'null'); }catch{ return null; } }
function saveSession(s){ localStorage.setItem('lw_session', JSON.stringify(s)); }

function toast(msg, type='info'){
  const t=document.createElement('div');
  t.className=`toast toast-${type}`;
  t.textContent=msg;
  document.body.appendChild(t);
  setTimeout(()=>t.classList.add('show'),10);
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),300); },3000);
}

function speak(text){
  if(!text) return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='fr-FR'; u.rate=0.85; u.pitch=1;
  const voices=speechSynthesis.getVoices();
  const fr=voices.find(v=>v.lang.startsWith('fr'));
  if(fr) u.voice=fr;
  speechSynthesis.speak(u);
}

// ── Router ────────────────────────────────────────────────────
const PAGES = ['home','progress','lesson-map','profile','settings'];
let currentPage = 'home';
let currentLesson = null;

function goTo(page, data={}){
  if(!getSession() && page !== 'home'){
    openM('m-auth'); return;
  }
  currentPage = page;
  PAGES.forEach(p => {
    const el = $('page-'+p);
    if(el) el.style.display = p===page ? 'block' : 'none';
  });
  document.querySelectorAll('.nav-item').forEach(n=>{
    n.classList.toggle('active', n.dataset.page===page);
  });
  if(page==='home') renderHome();
  if(page==='progress') renderProgress();
  if(page==='lesson-map') renderLessonMap(data);
  if(page==='profile') renderProfile();
  if(page==='settings') renderSettings();
}

// ── Auth ──────────────────────────────────────────────────────
function doLogin(){
  const em=($('auth-email')?.value||'').trim();
  const pw=$('auth-pass')?.value||'';
  if(!em||!pw){ toast('Please fill all fields','err'); return; }
  const users=JSON.parse(localStorage.getItem('lw_users')||'{}');
  const u=users[em];
  if(!u||u.password!==btoa(pw)){ toast('Wrong email or password','err'); return; }
  const session={...u, email:em, loginAt:Date.now()};
  saveSession(session);
  closeM('m-auth');
  goTo('home');
  toast(`Bonjour, ${u.name}! 👋`,'ok');
}

function doRegister(){
  const name=($('reg-name')?.value||'').trim();
  const em=($('reg-email')?.value||'').trim();
  const pw=$('reg-pass')?.value||'';
  if(!name||!em||!pw){ toast('Fill all fields','err'); return; }
  if(pw.length<6){ toast('Password min 6 chars','err'); return; }
  const users=JSON.parse(localStorage.getItem('lw_users')||'{}');
  if(users[em]){ toast('Email already registered','err'); return; }
  const newUser={
    name, password:btoa(pw),
    level:'pre-a1', xp:0, streak:0, lastStudy:null,
    completedLessons:[], lessonProgress:{},
    wordbook:[], certificates:[],
    settings:{ uiLang:'ar', notifications:true, dailyGoal:10, theme:'dark' },
    joinedAt:Date.now()
  };
  users[em]=newUser;
  localStorage.setItem('lw_users', JSON.stringify(users));
  saveSession({...newUser, email:em});
  closeM('m-auth');
  goTo('home');
  toast(`Welcome to Languway, ${name}! 🎉`,'ok');
}

function doLogout(){
  localStorage.removeItem('lw_session');
  goTo('home');
  toast('Logged out','info');
}

function switchAuthTab(tab){
  $('tab-login')?.classList.toggle('active', tab==='login');
  $('tab-register')?.classList.toggle('active', tab==='register');
  $('form-login') && ($('form-login').style.display = tab==='login'?'flex':'none');
  $('form-register') && ($('form-register').style.display = tab==='register'?'flex':'none');
}

// ── Home Page ─────────────────────────────────────────────────
function renderHome(){
  const s=getSession();

  // Stats bar
  const stats=[
    {label:'Lessons',val: s ? (s.completedLessons?.length||0) : 0},
    {label:'XP',val: s ? (s.xp||0) : 0},
    {label:'Streak',val: s ? (s.streak||0)+'d' : '0d'},
    {label:'Level',val: s ? (s.level||'Pre-A1').toUpperCase() : '—'},
  ];
  const sb=$('home-stats');
  if(sb) sb.innerHTML = stats.map(st=>`
    <div class="stat-card">
      <div class="stat-val">${esc(String(st.val))}</div>
      <div class="stat-lbl">${esc(st.label)}</div>
    </div>`).join('');

  // Next lesson card
  const nextLesson = s ? getNextLesson(s) : null;
  const nl=$('home-next-lesson');
  if(nl){
    if(s && nextLesson){
      nl.innerHTML=`
      <div class="next-lesson-card" onclick="startLesson('${nextLesson.levelId}',${nextLesson.unitNum},${nextLesson.lessonNum})">
        <div class="next-lesson-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
          Prochaine leçon
        </div>
        <div class="next-lesson-title">${esc(nextLesson.title)}</div>
        <div class="next-lesson-meta">
          ${esc(nextLesson.levelId.toUpperCase())} · Unité ${nextLesson.unitNum} · Leçon ${nextLesson.lessonNum}
          <span class="next-lesson-xp">+${nextLesson.xp} XP</span>
        </div>
        <div class="next-lesson-cta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          Commencer
        </div>
      </div>`;
    } else {
      nl.innerHTML=`<div class="next-lesson-card next-lesson-guest" onclick="openM('m-auth')">
        <div class="next-lesson-label">Commencez votre voyage</div>
        <div class="next-lesson-title">Bonjour! Leçon 1</div>
        <div class="next-lesson-meta">Pre-A1 · Unité 1 · Leçon 1</div>
        <div class="next-lesson-cta">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          Inscrivez-vous gratuitement
        </div>
      </div>`;
    }
  }

  // Learning path (levels)
  renderLearningPath();
}

function getNextLesson(s){
  const levels=['pre-a1','a1','a2','b1','b2','c1'];
  for(const lv of levels){
    for(let u=1;u<=10;u++){
      for(let l=1;l<=5;l++){
        const id=`${lv}-u${u}-l${l}`;
        if(!(s.completedLessons||[]).includes(id)){
          const content = typeof buildLessonContent==='function' ? buildLessonContent(lv,u,l) : {title:`Leçon ${l}`,xp:50};
          return {levelId:lv,unitNum:u,lessonNum:l,...content};
        }
      }
    }
  }
  return null;
}

function renderLearningPath(){
  const el=$('home-learning-path');
  if(!el) return;
  const s=getSession();
  const levels=[
    {id:'pre-a1',label:'Pré-A1',desc:'Alphabet & sons',img:'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=70',color:'#6C63FF'},
    {id:'a1',label:'A1',desc:'Débutant',img:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=70',color:'#D62828'},
    {id:'a2',label:'A2',desc:'Élémentaire',img:'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=400&q=70',color:'#F77F00'},
    {id:'b1',label:'B1',desc:'Intermédiaire',img:'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=400&q=70',color:'#2D9CDB'},
    {id:'b2',label:'B2',desc:'Avancé',img:'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=400&q=70',color:'#27AE60'},
    {id:'c1',label:'C1',desc:'Maîtrise',img:'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=400&q=70',color:'#F2994A'},
  ];
  const totalPerLevel=50;
  el.innerHTML=levels.map(lv=>{
    const done=s?(s.completedLessons||[]).filter(id=>id.startsWith(lv.id+'-')).length:0;
    const pct=Math.round(done/totalPerLevel*100);
    const locked=!s;
    return `
    <div class="level-card ${locked&&lv.id!=='pre-a1'?'level-locked':''}" onclick="${locked?`openM('m-auth')`:`goTo('lesson-map',{levelId:'${lv.id}'})`}" style="--lv-color:${lv.color}">
      <img src="${lv.img}" class="level-card-img" alt="${lv.label}" loading="lazy"/>
      <div class="level-card-overlay"></div>
      <div class="level-card-body">
        <div class="level-card-badge">${lv.label}</div>
        <div class="level-card-title">${esc(lv.desc)}</div>
        <div class="level-card-progress">
          <div class="level-card-bar"><div class="level-card-fill" style="width:${pct}%"></div></div>
          <span>${done}/50</span>
        </div>
      </div>
      ${locked&&lv.id!=='pre-a1'?'<div class="level-lock-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg></div>':''}
    </div>`;
  }).join('');
}

// ── Lesson Map ───────────────────────────────────────────────
function renderLessonMap(data={}){
  const el=$('page-lesson-map');
  if(!el) return;
  const s=getSession();
  const levelId=data.levelId||s?.level||'pre-a1';

  const levelNames={'pre-a1':'Pré-A1','a1':'A1 Débutant','a2':'A2 Élémentaire','b1':'B1 Intermédiaire','b2':'B2 Avancé','c1':'C1 Maîtrise'};

  let html=`<div class="lesson-map-wrap">
  <div class="lesson-map-hdr">
    <button class="back-btn" onclick="goTo('home')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    </button>
    <h2 class="lesson-map-title">${esc(levelNames[levelId]||levelId)}</h2>
  </div>
  <div class="lesson-map-body">`;

  for(let u=1;u<=10;u++){
    html+=`<div class="unit-block">
      <div class="unit-hdr">
        <div class="unit-badge">Unité ${u}</div>
        <div class="unit-title">${getUnitTitle(levelId,u)}</div>
      </div>
      <div class="unit-lessons">`;

    for(let l=1;l<=5;l++){
      const lessonId=`${levelId}-u${u}-l${l}`;
      const done=(s?.completedLessons||[]).includes(lessonId);
      const unlocked=isLessonUnlocked(levelId,u,l);
      const wbUnlocked=done;
      const content=typeof buildLessonContent==='function'?buildLessonContent(levelId,u,l):{title:`Leçon ${l}`,xp:50};

      html+=`
      <div class="lesson-row ${done?'lesson-done':''} ${!unlocked?'lesson-locked':''}">
        <div class="lesson-row-left" onclick="${unlocked?`startLesson('${levelId}',${u},${l})`:''}">
          <div class="lesson-status-icon">
            ${done
              ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="#27AE60"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>'
              : unlocked
                ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>'
                : '<svg width="18" height="18" viewBox="0 0 24 24" fill="#888"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>'
            }
          </div>
          <div class="lesson-row-info">
            <div class="lesson-row-title">Leçon ${l}: ${esc(content.title||'')}</div>
            <div class="lesson-row-meta">${content.duration||'10 min'} · +${content.xp||50} XP</div>
          </div>
        </div>
        <button class="wb-btn ${wbUnlocked?'':'wb-btn-locked'}"
          onclick="${wbUnlocked?`openWordbook('${lessonId}')`:''}"
          title="${wbUnlocked?'Ouvrir le WordBook':'Terminez la leçon pour débloquer'}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          ${wbUnlocked?'WordBook':'🔒'}
        </button>
      </div>`;
    }
    html+=`</div></div>`;
  }

  html+=`</div></div>`;
  el.innerHTML=html;
}

function getUnitTitle(levelId,u){
  const titles={
    'a1':['Salutations','La famille','Les chiffres','Les couleurs','La maison','Les métiers','La nourriture','Les vêtements','Les transports','Les loisirs'],
    'a2':['Le passé','Le futur','Les pronoms','La santé','Les sports','La météo','Les achats','Les voyages','La culture','Les émotions'],
    'pre-a1':['L\'alphabet','Les sons','Les voyelles','Les consonnes','Rythme et accent','Mots de base','Chiffres 1-10','Couleurs','Corps humain','Bonjour!'],
  };
  return (titles[levelId]||[])[u-1]||`Unité ${u}`;
}

// ── Lesson Player ────────────────────────────────────────────
function startLesson(levelId,unitNum,lessonNum){
  if(!getSession()){ openM('m-auth'); return; }
  const content=typeof buildLessonContent==='function'
    ? buildLessonContent(levelId,unitNum,lessonNum)
    : {id:`${levelId}-u${unitNum}-l${lessonNum}`,vocab:[],grammar:{},exercises:[],xp:50};
  currentLesson=content;
  renderLessonPlayer(content);
  openM('m-lesson');
}

let _lessonStep=0;
let _lessonSteps=[];

function renderLessonPlayer(content){
  const box=$('m-lesson')?.querySelector('.modal-box');
  if(!box) return;

  _lessonStep=0;
  _lessonSteps=[
    {type:'intro',   content},
    {type:'vocab',   words: content.vocab},
    {type:'grammar', rule: content.grammar},
    ...((content.exercises||[]).map(ex=>({type:'exercise',ex}))),
    {type:'wordbook',words: content.vocab, lessonId: content.id},
    {type:'complete',content},
  ];

  renderLessonStep();
}

function renderLessonStep(){
  const box=$('m-lesson')?.querySelector('.modal-box');
  if(!box) return;
  const step=_lessonSteps[_lessonStep];
  const total=_lessonSteps.length;
  const pct=Math.round((_lessonStep/total)*100);

  let inner='';

  if(step.type==='intro'){
    const c=step.content;
    inner=`
    <div class="ls-intro">
      <div class="ls-progress-bar"><div class="ls-progress-fill" style="width:${pct}%"></div></div>
      <div class="ls-step-label">Introduction</div>
      <div class="ls-intro-icon">📚</div>
      <h2 class="ls-intro-title">${esc(c.title||'')}</h2>
      <div class="ls-intro-meta">${c.duration||'10 min'} · +${c.xp||50} XP · ${(c.vocab||[]).length} mots</div>
      <p class="ls-intro-desc">Dans cette leçon, vous allez apprendre du vocabulaire essentiel et une règle de grammaire.</p>
      <button class="btn btn-p ls-next-btn" onclick="nextLessonStep()">Commencer
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </div>`;
  }

  else if(step.type==='vocab'){
    const words=step.words||[];
    let wIdx=parseInt(box.dataset.wIdx||'0');
    const w=words[wIdx]||{};
    const imgUrl=typeof getWordImage==='function'?getWordImage(w.fr||'',w.type||'noun'):null;
    inner=`
    <div class="ls-vocab">
      <div class="ls-progress-bar"><div class="ls-progress-fill" style="width:${pct}%"></div></div>
      <div class="ls-step-label">Vocabulaire ${wIdx+1}/${words.length}</div>
      <div class="vocab-card">
        ${imgUrl?`<img src="${imgUrl}" class="vocab-card-img" loading="lazy" onerror="this.style.display='none'"/>`:''}
        <div class="vocab-card-fr">${esc(w.fr||'')}</div>
        <div class="vocab-card-pron">[${esc(w.pron||'')}]</div>
        <button class="vocab-speak-btn" onclick="speak('${esc(w.fr||'')}')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        </button>
        <div class="vocab-card-eng">${esc(w.eng||'')}</div>
        <div class="vocab-card-ar">${esc(w.ar||'')}</div>
        <div class="vocab-card-ex">${esc(w.ex||'')}</div>
        ${w.note?`<div class="vocab-card-note">💡 ${esc(w.note)}</div>`:''}
      </div>
      <div class="vocab-nav">
        ${wIdx>0?`<button class="btn btn-o" onclick="vocabNav(-1)">← Précédent</button>`:'<div></div>'}
        ${wIdx<words.length-1
          ?`<button class="btn btn-p" onclick="vocabNav(1)">Suivant →</button>`
          :`<button class="btn btn-p" onclick="nextLessonStep()">Continuer →</button>`
        }
      </div>
    </div>`;
  }

  else if(step.type==='grammar'){
    const g=step.rule||{};
    inner=`
    <div class="ls-grammar">
      <div class="ls-progress-bar"><div class="ls-progress-fill" style="width:${pct}%"></div></div>
      <div class="ls-step-label">Grammaire</div>
      <div class="grammar-card">
        <div class="grammar-card-icon">📐</div>
        <div class="grammar-card-rule">${esc(g.rule||'')}</div>
        ${(g.examples||[]).length?`<div class="grammar-examples">${g.examples.map(e=>`<div class="grammar-ex-item">✓ ${esc(e)}</div>`).join('')}</div>`:''}
        ${g.tip?`<div class="grammar-tip">💡 ${esc(g.tip)}</div>`:''}
      </div>
      <button class="btn btn-p ls-next-btn" onclick="nextLessonStep()">J'ai compris →</button>
    </div>`;
  }

  else if(step.type==='exercise'){
    inner=renderExerciseStep(step.ex, pct);
  }

  else if(step.type==='wordbook'){
    const words=step.words||[];
    inner=`
    <div class="ls-wordbook">
      <div class="ls-progress-bar"><div class="ls-progress-fill" style="width:${pct}%"></div></div>
      <div class="ls-step-label">📖 WordBook — Révision</div>
      <p class="ls-wb-desc">Voici tous les mots de cette leçon. Révisez-les avant de terminer!</p>
      <div class="wb-review-list">
        ${words.map(w=>`
        <div class="wb-review-row">
          <div class="wb-review-fr">${esc(w.fr)}</div>
          <div class="wb-review-mid">
            <div class="wb-review-pron">[${esc(w.pron||'')}]</div>
            <div class="wb-review-eng">${esc(w.eng)}</div>
          </div>
          <div class="wb-review-ar">${esc(w.ar)}</div>
          <button class="wb-review-speak" onclick="speak('${esc(w.fr)}')">🔊</button>
        </div>`).join('')}
      </div>
      <button class="btn btn-p ls-next-btn" onclick="nextLessonStep()">Terminer la leçon →</button>
    </div>`;
  }

  else if(step.type==='complete'){
    const c=step.content;
    completeLesson(c.id, c.xp||50);
    inner=`
    <div class="ls-complete">
      <div class="ls-complete-anim">🎉</div>
      <h2 class="ls-complete-title">Leçon terminée!</h2>
      <div class="ls-complete-xp">+${c.xp||50} XP gagnés</div>
      <div class="ls-complete-stars">⭐⭐⭐</div>
      <p class="ls-complete-msg">Félicitations! Le WordBook de cette leçon est maintenant débloqué.</p>
      <div class="ls-complete-actions">
        <button class="btn btn-o" onclick="closeM('m-lesson');openWordbook('${c.id}')">📖 Voir WordBook</button>
        <button class="btn btn-p" onclick="closeM('m-lesson');goTo('lesson-map',{levelId:'${c.levelId}'})">Continuer →</button>
      </div>
    </div>`;
  }

  box.innerHTML=inner;
  box.dataset.wIdx='0';
}

function vocabNav(dir){
  const box=$('m-lesson')?.querySelector('.modal-box');
  if(!box) return;
  const step=_lessonSteps[_lessonStep];
  if(step.type!=='vocab') return;
  let idx=parseInt(box.dataset.wIdx||'0')+dir;
  idx=Math.max(0,Math.min((step.words||[]).length-1,idx));
  box.dataset.wIdx=String(idx);
  renderLessonStep();
}

function nextLessonStep(){
  _lessonStep=Math.min(_lessonStep+1,_lessonSteps.length-1);
  renderLessonStep();
}

function renderExerciseStep(ex, pct){
  if(!ex) return '';
  if(ex.type==='mcq') return renderMcq(ex,pct);
  if(ex.type==='fill') return renderFill(ex,pct);
  if(ex.type==='listen') return renderListen(ex,pct);
  if(ex.type==='speak') return renderSpeak(ex,pct);
  return `<div class="ls-exercise"><button class="btn btn-p" onclick="nextLessonStep()">Suivant →</button></div>`;
}

function renderMcq(ex,pct){
  return `
  <div class="ls-exercise">
    <div class="ls-progress-bar"><div class="ls-progress-fill" style="width:${pct}%"></div></div>
    <div class="ls-step-label">${esc(ex.title||'Quiz')}</div>
    <div class="ex-question">${esc(ex.question||'')}</div>
    <div class="ex-opts">
      ${(ex.opts||[]).map((o,i)=>`
      <button class="ex-opt" data-idx="${i}" onclick="checkMcq(${i},${ex.ans||0},'${esc(ex.exp||'')}')">
        ${esc(o)}
      </button>`).join('')}
    </div>
    <div id="ex-feedback" class="ex-feedback"></div>
  </div>`;
}

function checkMcq(chosen,correct,exp){
  document.querySelectorAll('.ex-opt').forEach((b,i)=>{
    b.disabled=true;
    if(i===correct) b.classList.add('opt-correct');
    else if(i===chosen) b.classList.add('opt-wrong');
  });
  const fb=$('ex-feedback');
  if(fb){
    fb.innerHTML=`<div class="${chosen===correct?'fb-correct':'fb-wrong'}">
      ${chosen===correct?'✅ Correct!':'❌ Incorrect.'} ${esc(exp)}
    </div><button class="btn btn-p btn-sm" style="margin-top:12px" onclick="nextLessonStep()">Suivant →</button>`;
  }
}

function renderFill(ex,pct){
  return `
  <div class="ls-exercise">
    <div class="ls-progress-bar"><div class="ls-progress-fill" style="width:${pct}%"></div></div>
    <div class="ls-step-label">${esc(ex.title||'Complétez')}</div>
    <div class="ex-question">${esc(ex.prompt||'')}</div>
    <div class="fill-hint">Indice: ${esc(ex.hint||'')}</div>
    <input type="text" id="fill-input" class="fill-input" placeholder="Votre réponse..."/>
    <button class="btn btn-p" onclick="checkFill('${esc(ex.answer||'')}')">Vérifier</button>
    <div id="ex-feedback" class="ex-feedback"></div>
  </div>`;
}

function checkFill(answer){
  const v=($('fill-input')?.value||'').trim().toLowerCase();
  const ok=v===answer.toLowerCase();
  const fb=$('ex-feedback');
  if(fb) fb.innerHTML=`<div class="${ok?'fb-correct':'fb-wrong'}">
    ${ok?'✅ Parfait!':'❌ La bonne réponse: '+answer}
  </div><button class="btn btn-p btn-sm" style="margin-top:12px" onclick="nextLessonStep()">Suivant →</button>`;
}

function renderListen(ex,pct){
  return `
  <div class="ls-exercise">
    <div class="ls-progress-bar"><div class="ls-progress-fill" style="width:${pct}%"></div></div>
    <div class="ls-step-label">${esc(ex.title||'Écoutez')}</div>
    <div class="listen-phrases">
      ${(ex.phrases||[]).map((p,i)=>`
      <div class="listen-phrase-row">
        <div class="listen-phrase-txt">${esc(p)}</div>
        <div class="listen-phrase-tr">${esc((ex.translations||[])[i]||'')}</div>
        <button class="listen-speak-btn" onclick="speak('${esc(p)}')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        </button>
      </div>`).join('')}
    </div>
    <button class="btn btn-p ls-next-btn" onclick="nextLessonStep()">Continuer →</button>
  </div>`;
}

function renderSpeak(ex,pct){
  return `
  <div class="ls-exercise">
    <div class="ls-progress-bar"><div class="ls-progress-fill" style="width:${pct}%"></div></div>
    <div class="ls-step-label">${esc(ex.title||'Expression orale')}</div>
    <div class="speak-phrase">${esc(ex.phrase||'')}</div>
    <div class="speak-translation">${esc(ex.translation||'')}</div>
    <button class="btn btn-p speak-listen-btn" onclick="speak('${esc(ex.phrase||'')}')">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
      Écouter l'exemple
    </button>
    <button class="btn btn-o ls-next-btn" onclick="nextLessonStep()">Continuer →</button>
  </div>`;
}

// ── Complete Lesson ───────────────────────────────────────────
function completeLesson(lessonId, xp){
  const s=getSession();
  if(!s||!lessonId) return;
  if(!(s.completedLessons||[]).includes(lessonId)){
    s.completedLessons=[...(s.completedLessons||[]),lessonId];
    s.xp=(s.xp||0)+xp;
    s.lastStudy=Date.now();
  }
  saveSession(s);
  // Sync to users store
  const users=JSON.parse(localStorage.getItem('lw_users')||'{}');
  if(users[s.email]){
    users[s.email].completedLessons=s.completedLessons;
    users[s.email].xp=s.xp;
    users[s.email].lastStudy=s.lastStudy;
    localStorage.setItem('lw_users',JSON.stringify(users));
  }
}

// ── WordBook ─────────────────────────────────────────────────
function openWordbook(lessonId){
  if(!isWordbookUnlocked(lessonId)){
    toast('Terminez la leçon pour débloquer le WordBook! 🔒','err'); return;
  }
  const parts=lessonId.split('-');
  const levelId=parts[0]+(parts[1]?'-'+parts[1]:'');
  const unitNum=parseInt((parts.find(p=>p.startsWith('u'))||'u1').slice(1))||1;
  const lessonNum=parseInt((parts.find(p=>p.startsWith('l'))||'l1').slice(1))||1;
  const content=typeof buildLessonContent==='function'
    ? buildLessonContent(levelId,unitNum,lessonNum)
    : {title:'WordBook',vocab:[]};

  const box=$('m-wordbook')?.querySelector('.modal-box');
  if(!box) return;

  box.innerHTML=`
  <div class="modal-drag-bar"></div>
  <div class="modal-hdr">
    <div class="modal-hdr-title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      WordBook — ${esc(content.title||'')}
    </div>
    <button class="modal-close-btn" onclick="closeM('m-wordbook')">✕</button>
  </div>
  <div class="wb-meta">Unité ${unitNum} · Leçon ${lessonNum} · ${(content.vocab||[]).length} mots</div>
  <div class="wb-list">
    ${(content.vocab||[]).map((w,i)=>`
    <div class="wb-entry">
      <div class="wb-entry-num">${i+1}</div>
      <div class="wb-entry-body">
        <div class="wb-entry-fr">${esc(w.fr)}</div>
        <div class="wb-entry-pron">[${esc(w.pron||'')}]</div>
        <div class="wb-entry-eng">${esc(w.eng)}</div>
        <div class="wb-entry-ar">${esc(w.ar)}</div>
        <div class="wb-entry-ex">« ${esc(w.ex||'')} »</div>
        ${w.note?`<div class="wb-entry-note">💡 ${esc(w.note)}</div>`:''}
      </div>
      <button class="wb-entry-speak" onclick="speak('${esc(w.fr)}')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
      </button>
    </div>`).join('')}
  </div>`;

  openM('m-wordbook');
}

// ── Progress Page ─────────────────────────────────────────────
function renderProgress(){
  const el=$('page-progress');
  if(!el) return;
  const s=getSession();
  if(!s){ el.innerHTML='<div class="center-msg">Connectez-vous pour voir vos progrès.</div>'; return; }

  const total=300;
  const done=(s.completedLessons||[]).length;
  const pct=Math.round(done/total*100);
  const levels=['pre-a1','a1','a2','b1','b2','c1'];
  const levelData=levels.map(lv=>{
    const d=(s.completedLessons||[]).filter(id=>id.startsWith(lv+'-')).length;
    return {id:lv,done:d,total:50,pct:Math.round(d/50*100)};
  });

  const daysStudied=s.lastStudy?Math.ceil((Date.now()-s.joinedAt)/(86400000)):0;
  const avgPerDay=daysStudied>0?Math.round(done/daysStudied*10)/10:0;
  const onTrack=avgPerDay>=1;

  el.innerHTML=`
  <div class="progress-page">
    <div class="progress-page-hdr"><h2>Ma Progression</h2></div>

    <!-- Overall ring -->
    <div class="overall-ring-wrap">
      <svg class="overall-ring" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#ffffff15" stroke-width="10"/>
        <circle cx="60" cy="60" r="50" fill="none" stroke="#D62828" stroke-width="10"
          stroke-dasharray="${pct*3.14} 314" stroke-linecap="round" transform="rotate(-90 60 60)"/>
      </svg>
      <div class="overall-ring-txt">
        <div class="overall-pct">${pct}%</div>
        <div class="overall-lbl">Complété</div>
      </div>
    </div>

    <!-- Stats grid -->
    <div class="prog-stats-grid">
      <div class="prog-stat"><div class="prog-stat-val">${done}</div><div class="prog-stat-lbl">Leçons</div></div>
      <div class="prog-stat"><div class="prog-stat-val">${s.xp||0}</div><div class="prog-stat-lbl">XP Total</div></div>
      <div class="prog-stat"><div class="prog-stat-val">${s.streak||0}j</div><div class="prog-stat-lbl">Série</div></div>
      <div class="prog-stat"><div class="prog-stat-val">${total-done}</div><div class="prog-stat-lbl">Restant</div></div>
    </div>

    <!-- Analysis -->
    <div class="analysis-card ${onTrack?'analysis-good':'analysis-warn'}">
      <div class="analysis-icon">${onTrack?'🚀':'💪'}</div>
      <div class="analysis-txt">
        <div class="analysis-title">${onTrack?'Excellente progression!':'Continuez vos efforts!'}</div>
        <div class="analysis-desc">${onTrack
          ?`Vous étudiez en moyenne ${avgPerDay} leçon/jour. Continuez ainsi!`
          :`Essayez de faire au moins 1 leçon par jour pour progresser régulièrement.`
        }</div>
      </div>
    </div>

    <!-- Per-level bars -->
    <div class="prog-levels-title">Progression par niveau</div>
    ${levelData.map(lv=>`
    <div class="prog-level-row">
      <div class="prog-level-name">${lv.id.toUpperCase()}</div>
      <div class="prog-level-bar-wrap">
        <div class="prog-level-bar"><div class="prog-level-fill" style="width:${lv.pct}%"></div></div>
      </div>
      <div class="prog-level-count">${lv.done}/50</div>
    </div>`).join('')}

    <!-- Certificates -->
    <div class="certs-section">
      <div class="certs-title">🏆 Certificats</div>
      ${levels.map(lv=>{
        const lvDone=(s.completedLessons||[]).filter(id=>id.startsWith(lv+'-')).length;
        const earned=lvDone>=50;
        return `<div class="cert-row ${earned?'cert-earned':'cert-locked'}">
          <span>${earned?'🏅':'🔒'} Certificat ${lv.toUpperCase()}</span>
          ${earned?`<button class="btn btn-sm btn-o" onclick="toast('Certificat ${lv.toUpperCase()} téléchargé!','ok')">Télécharger</button>`:'<span class="cert-remain">${50-lvDone} leçons restantes</span>'}
        </div>`;
      }).join('')}
    </div>
  </div>`;
}

// ── Profile Page ──────────────────────────────────────────────
function renderProfile(){
  const el=$('page-profile');
  if(!el) return;
  const s=getSession();
  if(!s){ el.innerHTML='<div class="center-msg">Connectez-vous pour voir votre profil.</div>'; return; }

  const total=300;
  const done=(s.completedLessons||[]).length;
  const pct=Math.round(done/total*100);
  const daysStudied=s.joinedAt?Math.ceil((Date.now()-s.joinedAt)/86400000):1;
  const avgPerDay=Math.round(done/daysStudied*10)/10;

  el.innerHTML=`
  <div class="profile-page">
    <div class="profile-avatar-wrap">
      <div class="profile-avatar">${(s.name||'U')[0].toUpperCase()}</div>
      <div class="profile-name">${esc(s.name||'')}</div>
      <div class="profile-email">${esc(s.email||'')}</div>
      <div class="profile-level-badge">${(s.level||'Pre-A1').toUpperCase()}</div>
    </div>

    <div class="profile-info-grid">
      <div class="profile-info-row">
        <span class="profile-info-lbl">Membre depuis</span>
        <span class="profile-info-val">${s.joinedAt?new Date(s.joinedAt).toLocaleDateString('fr-FR'):'—'}</span>
      </div>
      <div class="profile-info-row">
        <span class="profile-info-lbl">XP Total</span>
        <span class="profile-info-val">${s.xp||0} XP</span>
      </div>
      <div class="profile-info-row">
        <span class="profile-info-lbl">Leçons complétées</span>
        <span class="profile-info-val">${done} / ${total}</span>
      </div>
      <div class="profile-info-row">
        <span class="profile-info-lbl">Série actuelle</span>
        <span class="profile-info-val">${s.streak||0} jours 🔥</span>
      </div>
      <div class="profile-info-row">
        <span class="profile-info-lbl">Moyenne / jour</span>
        <span class="profile-info-val">${avgPerDay} leçons</span>
      </div>
    </div>

    <!-- Progress overview -->
    <div class="profile-progress-wrap">
      <div class="profile-pct-label">Progression globale: ${pct}%</div>
      <div class="profile-pct-bar"><div class="profile-pct-fill" style="width:${pct}%"></div></div>
    </div>

    <!-- AI Analysis -->
    <div class="profile-analysis">
      <div class="profile-analysis-title">📊 Analyse personnalisée</div>
      <div class="profile-analysis-body">
        ${pct<10?'Vous êtes au début de votre voyage. Faites au moins une leçon par jour!':
          pct<30?`Bonne progression! Vous avancez bien. Continuez sur cette lancée.`:
          pct<60?`Excellent! Vous êtes à mi-chemin. Ne lâchez pas!`:
          pct<90?`Impressionnant! Vous maîtrisez déjà beaucoup de français.`:
          `Félicitations! Vous êtes presque expert en français! 🎉`}
        ${avgPerDay>=1?' Votre rythme est excellent.':' Essayez d\'augmenter votre rythme d\'étude.'}
      </div>
    </div>

    <!-- Certificates earned -->
    <div class="profile-certs">
      <div class="profile-certs-title">🏆 Certificats obtenus</div>
      ${['pre-a1','a1','a2','b1','b2','c1'].map(lv=>{
        const lvDone=(s.completedLessons||[]).filter(id=>id.startsWith(lv+'-')).length;
        if(lvDone<50) return '';
        return `<div class="cert-earned-card">🏅 Certificat ${lv.toUpperCase()}</div>`;
      }).join('')||'<div class="no-certs">Aucun certificat encore. Terminez un niveau complet!</div>'}
    </div>

    <div class="profile-actions">
      <button class="btn btn-o" onclick="openEditProfile()">✏️ Modifier le profil</button>
      <button class="btn btn-err" onclick="doLogout()">Se déconnecter</button>
    </div>
  </div>`;
}

function openEditProfile(){
  const s=getSession();
  if(!s) return;
  const box=$('m-editprofile')?.querySelector('.modal-box');
  if(!box) return;
  box.innerHTML=`
  <div class="modal-drag-bar"></div>
  <div class="modal-hdr">
    <div class="modal-hdr-title">✏️ Modifier le profil</div>
    <button class="modal-close-btn" onclick="closeM('m-editprofile')">✕</button>
  </div>
  <div class="edit-profile-form">
    <label class="field-label">Nom</label>
    <input id="ep-name" class="field-input" value="${esc(s.name||'')}"/>
    <label class="field-label">Nouveau mot de passe (laisser vide = inchangé)</label>
    <input id="ep-pass" class="field-input" type="password" placeholder="••••••"/>
    <button class="btn btn-p" onclick="saveEditProfile()">Sauvegarder</button>
  </div>`;
  openM('m-editprofile');
}

function saveEditProfile(){
  const s=getSession();
  if(!s) return;
  const name=($('ep-name')?.value||'').trim();
  const pw=$('ep-pass')?.value||'';
  if(name) s.name=name;
  if(pw.length>=6) s.password=btoa(pw);
  saveSession(s);
  const users=JSON.parse(localStorage.getItem('lw_users')||'{}');
  if(users[s.email]){
    if(name) users[s.email].name=name;
    if(pw.length>=6) users[s.email].password=btoa(pw);
    localStorage.setItem('lw_users',JSON.stringify(users));
  }
  closeM('m-editprofile');
  toast('Profil mis à jour!','ok');
  renderProfile();
}

// ── Settings Page ─────────────────────────────────────────────
function renderSettings(){
  const el=$('page-settings');
  if(!el) return;
  const s=getSession();

  el.innerHTML=`
  <div class="settings-page">
    <div class="settings-hdr"><h2>Paramètres</h2></div>
    <div class="settings-grid">

      <div class="settings-card" onclick="openSettingsSection('features')">
        <div class="settings-card-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D62828" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
        </div>
        <div class="settings-card-info">
          <div class="settings-card-title">Fonctionnalités</div>
          <div class="settings-card-desc">Guide complet de toutes les fonctions</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </div>

      <div class="settings-card" onclick="openSettingsSection('language')">
        <div class="settings-card-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D62828" stroke-width="2"><path d="M5 8l6 6m-6 0l6-6M19 5h-7m7 0a2 2 0 010 4h-7"/></svg>
        </div>
        <div class="settings-card-info">
          <div class="settings-card-title">Langue de l'interface</div>
          <div class="settings-card-desc">العربية / English</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </div>

      <div class="settings-card" onclick="openSettingsSection('notifications')">
        <div class="settings-card-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D62828" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </div>
        <div class="settings-card-info">
          <div class="settings-card-title">Rappels quotidiens</div>
          <div class="settings-card-desc">Gardez votre série active</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </div>

      <div class="settings-card" onclick="openSettingsSection('goal')">
        <div class="settings-card-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D62828" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        </div>
        <div class="settings-card-info">
          <div class="settings-card-title">Objectif journalier</div>
          <div class="settings-card-desc">${s?.settings?.dailyGoal||10} min par jour</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </div>

      <div class="settings-card" onclick="openSettingsSection('about')">
        <div class="settings-card-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D62828" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
        </div>
        <div class="settings-card-info">
          <div class="settings-card-title">À propos</div>
          <div class="settings-card-desc">Languway French v6.0</div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
      </div>

    </div>
  </div>`;
}

function openSettingsSection(section){
  const box=$('m-settings-detail')?.querySelector('.modal-box');
  if(!box) return;

  const content = {
    features: renderFeaturesGuide(),
    language: renderLanguageSetting(),
    notifications: renderNotificationsSetting(),
    goal: renderGoalSetting(),
    about: renderAboutPage(),
  }[section] || '';

  box.innerHTML=`
  <div class="modal-drag-bar"></div>
  <div class="modal-hdr">
    <button class="back-btn" onclick="closeM('m-settings-detail')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
    </button>
    <div class="modal-hdr-title">${getSettingTitle(section)}</div>
    <div style="width:36px"></div>
  </div>
  <div class="settings-detail-body">${content}</div>`;

  openM('m-settings-detail');
}

function getSettingTitle(s){
  return {features:'📋 Guide des Fonctionnalités',language:'🌍 Langue',notifications:'🔔 Notifications',goal:'🎯 Objectif',about:'ℹ️ À propos'}[s]||'Paramètres';
}

// ── Features Guide (قسم الميزات) ─────────────────────────────
function renderFeaturesGuide(){
  return `
  <div class="features-guide">

    <div class="fg-intro">
      <div class="fg-intro-icon">📚</div>
      <div class="fg-intro-txt">
        <strong>Bienvenue dans le Guide Complet</strong><br/>
        Tout ce que vous devez savoir pour utiliser Languway French au maximum.
      </div>
    </div>

    <!-- Feature 1: Lessons -->
    <div class="fg-feature">
      <div class="fg-feature-hdr">
        <div class="fg-feature-icon" style="background:#D62828">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>
        </div>
        <div>
          <div class="fg-feature-name">Leçons (Lessons)</div>
          <div class="fg-feature-tag">Fonctionnalité principale</div>
        </div>
      </div>
      <div class="fg-feature-body">
        <div class="fg-section-title">📖 Description</div>
        <p>Le cœur de Languway French. 300 leçons organisées en 6 niveaux (Pre-A1 → C1), chacun contenant 10 unités de 5 leçons.</p>

        <div class="fg-section-title">🎮 Comment utiliser</div>
        <ol class="fg-steps">
          <li>Allez dans <strong>Home</strong> → cliquez sur votre niveau dans "Learning Path"</li>
          <li>Choisissez une <strong>Unité</strong> (1 à 10)</li>
          <li>Cliquez sur une <strong>Leçon débloquée</strong> (flèche verte)</li>
          <li>Suivez les étapes: Introduction → Vocabulaire → Grammaire → Exercices → WordBook → Terminé!</li>
          <li>Chaque leçon = <strong>50 XP</strong> minimum</li>
        </ol>

        <div class="fg-section-title">✅ Fonctions incluses</div>
        <ul class="fg-list">
          <li>Cartes de vocabulaire avec prononciation audio</li>
          <li>Explication grammaticale claire</li>
          <li>Quiz (QCM, texte à trous, écoute, expression orale)</li>
          <li>Barre de progression visuelle</li>
          <li>XP automatique à la fin</li>
        </ul>

        <div class="fg-section-title">⚠️ Limitations</div>
        <ul class="fg-list fg-list-warn">
          <li>Les leçons sont bloquées: vous devez terminer la précédente</li>
          <li>Pas de retour en arrière dans le player (progression linéaire)</li>
          <li>Audio nécessite un navigateur compatible TTS</li>
        </ul>

        <div class="fg-tip">💡 <strong>Conseil:</strong> Faites au moins 1 leçon par jour pour maintenir votre série!</div>
      </div>
    </div>

    <!-- Feature 2: WordBook -->
    <div class="fg-feature">
      <div class="fg-feature-hdr">
        <div class="fg-feature-icon" style="background:#2D9CDB">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/></svg>
        </div>
        <div>
          <div class="fg-feature-name">WordBook (Cahier de mots)</div>
          <div class="fg-feature-tag">Mémorisation</div>
        </div>
      </div>
      <div class="fg-feature-body">
        <div class="fg-section-title">📖 Description</div>
        <p>Chaque leçon possède son propre WordBook. Il contient tous les mots appris dans la leçon avec prononciation, traduction, exemples et notes.</p>

        <div class="fg-section-title">🎮 Comment utiliser</div>
        <ol class="fg-steps">
          <li>Terminez une leçon complètement</li>
          <li>Le bouton <strong>WordBook</strong> se débloque (📖) dans la liste des leçons</li>
          <li>Cliquez dessus pour voir tous les mots</li>
          <li>Utilisez le bouton 🔊 pour entendre chaque mot</li>
        </ol>

        <div class="fg-section-title">✅ Fonctions incluses</div>
        <ul class="fg-list">
          <li>Mot en français + phonétique IPA</li>
          <li>Traduction en arabe et anglais</li>
          <li>Exemple de phrase authentique</li>
          <li>Note grammaticale ou culturelle</li>
          <li>Lecture audio de chaque mot</li>
        </ul>

        <div class="fg-section-title">⚠️ Limitations</div>
        <ul class="fg-list fg-list-warn">
          <li>Accessible seulement après avoir terminé la leçon</li>
          <li>Pas d'exercices de révision dans le WordBook (pour l'instant)</li>
        </ul>

        <div class="fg-tip">💡 <strong>Conseil:</strong> Révisez votre WordBook 24h après la leçon pour maximiser la mémorisation!</div>
      </div>
    </div>

    <!-- Feature 3: Translator -->
    <div class="fg-feature">
      <div class="fg-feature-hdr">
        <div class="fg-feature-icon" style="background:#27AE60">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M5 8l6 6m-6 0l6-6M19 5h-7m7 0a2 2 0 010 4h-7"/></svg>
        </div>
        <div>
          <div class="fg-feature-name">Traducteur Intelligent</div>
          <div class="fg-feature-tag">IA • Explication complète</div>
        </div>
      </div>
      <div class="fg-feature-body">
        <div class="fg-section-title">📖 Description</div>
        <p>Un traducteur IA avancé qui ne se contente pas de traduire: il explique le mot en détail, montre la conjugaison, donne des exemples et affiche une image pour les noms.</p>

        <div class="fg-section-title">🎮 Comment utiliser</div>
        <ol class="fg-steps">
          <li>Cliquez sur <strong>Traducteur</strong> dans la barre de navigation</li>
          <li>Choisissez la direction: Français→Arabe, Français→Anglais, ou vers Français</li>
          <li>Tapez votre mot ou phrase</li>
          <li>Cliquez <strong>"Traduire & Expliquer"</strong></li>
          <li>Lisez l'explication complète, les exemples, la conjugaison</li>
        </ol>

        <div class="fg-section-title">✅ Fonctions incluses</div>
        <ul class="fg-list">
          <li>Traduction dans la langue de l'utilisateur</li>
          <li>Prononciation IPA + audio</li>
          <li>Explication détaillée (usage, contexte, règles)</li>
          <li>3 exemples de phrases authentiques</li>
          <li>Tableau de conjugaison (pour les verbes)</li>
          <li>Image illustrative (pour les noms)</li>
          <li>Mots rapides pré-définis</li>
          <li>Sauvegarde dans le WordBook personnel</li>
        </ul>

        <div class="fg-section-title">⚠️ Limitations</div>
        <ul class="fg-list fg-list-warn">
          <li>Nécessite une connexion Internet (IA en temps réel)</li>
          <li>Peut prendre 2-3 secondes pour l'analyse</li>
          <li>Les images dépendent du mot (seulement pour les noms concrets)</li>
        </ul>

        <div class="fg-tip">💡 <strong>Conseil:</strong> Utilisez le traducteur quand vous rencontrez un mot inconnu dans une leçon — il vous donnera beaucoup plus qu'un simple dictionnaire!</div>
      </div>
    </div>

    <!-- Feature 4: Progress -->
    <div class="fg-feature">
      <div class="fg-feature-hdr">
        <div class="fg-feature-icon" style="background:#F77F00">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M3 3v18h18M9 17V9m4 8V5m4 12V7"/></svg>
        </div>
        <div>
          <div class="fg-feature-name">Ma Progression</div>
          <div class="fg-feature-tag">Suivi & Analyse</div>
        </div>
      </div>
      <div class="fg-feature-body">
        <div class="fg-section-title">📖 Description</div>
        <p>Tableau de bord complet pour suivre votre avancement: progression globale, stats par niveau, analyse de votre rythme, et certificats obtenus.</p>

        <div class="fg-section-title">🎮 Comment utiliser</div>
        <ol class="fg-steps">
          <li>Cliquez sur <strong>Progression</strong> dans la barre de navigation</li>
          <li>Regardez l'anneau circulaire pour votre % global</li>
          <li>Consultez les barres par niveau</li>
          <li>Lisez l'analyse IA de votre rythme</li>
          <li>Téléchargez vos certificats quand un niveau est complété</li>
        </ol>

        <div class="fg-section-title">✅ Fonctions incluses</div>
        <ul class="fg-list">
          <li>Anneau de progression global (0-100%)</li>
          <li>Stats: leçons, XP, série, restant</li>
          <li>Analyse personnalisée (bon rythme / encouragement)</li>
          <li>Barres de progression par niveau</li>
          <li>Système de certificats (1 par niveau complété)</li>
        </ul>

        <div class="fg-section-title">⚠️ Limitations</div>
        <ul class="fg-list fg-list-warn">
          <li>Données stockées localement (perdues si cache effacé)</li>
          <li>Pas de comparaison avec d'autres utilisateurs</li>
        </ul>
      </div>
    </div>

    <!-- Feature 5: Profile -->
    <div class="fg-feature">
      <div class="fg-feature-hdr">
        <div class="fg-feature-icon" style="background:#6C63FF">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
        </div>
        <div>
          <div class="fg-feature-name">Profil</div>
          <div class="fg-feature-tag">Compte & Statistiques</div>
        </div>
      </div>
      <div class="fg-feature-body">
        <div class="fg-section-title">📖 Description</div>
        <p>Votre espace personnel: informations du compte, statistiques détaillées, analyse IA de votre performance, et certificats obtenus.</p>

        <div class="fg-section-title">✅ Fonctions incluses</div>
        <ul class="fg-list">
          <li>Avatar initiale + nom + email</li>
          <li>Date d'inscription et statistiques</li>
          <li>Moyenne de leçons par jour</li>
          <li>Analyse IA: "Êtes-vous sur la bonne voie?"</li>
          <li>Liste des certificats gagnés</li>
          <li>Modification du nom et mot de passe</li>
          <li>Déconnexion sécurisée</li>
        </ul>
      </div>
    </div>

    <!-- Summary table -->
    <div class="fg-summary">
      <div class="fg-summary-title">📊 Résumé des fonctionnalités</div>
      <div class="fg-table">
        <div class="fg-table-row fg-table-hdr">
          <span>Fonctionnalité</span><span>Internet?</span><span>Gratuit?</span>
        </div>
        <div class="fg-table-row"><span>Leçons (300)</span><span>Non</span><span>✅</span></div>
        <div class="fg-table-row"><span>WordBook</span><span>Non</span><span>✅</span></div>
        <div class="fg-table-row"><span>Traducteur IA</span><span>Oui</span><span>✅</span></div>
        <div class="fg-table-row"><span>Progression</span><span>Non</span><span>✅</span></div>
        <div class="fg-table-row"><span>Profil</span><span>Non</span><span>✅</span></div>
        <div class="fg-table-row"><span>Certificats</span><span>Non</span><span>✅</span></div>
        <div class="fg-table-row"><span>Audio TTS</span><span>Non</span><span>✅</span></div>
      </div>
    </div>

  </div>`;
}

function renderLanguageSetting(){
  const s=getSession();
  const cur=s?.settings?.uiLang||'ar';
  return `
  <div class="lang-setting">
    <p>Choisissez la langue des explications et traductions:</p>
    <div class="lang-opts">
      <button class="lang-opt ${cur==='ar'?'active':''}" onclick="setUiLang('ar')">🌙 العربية</button>
      <button class="lang-opt ${cur==='en'?'active':''}" onclick="setUiLang('en')">🇬🇧 English</button>
    </div>
  </div>`;
}

function setUiLang(lang){
  const s=getSession();
  if(!s) return;
  s.settings=s.settings||{};
  s.settings.uiLang=lang;
  saveSession(s);
  toast(lang==='ar'?'تم تغيير اللغة إلى العربية':'Language set to English','ok');
  openSettingsSection('language');
}

function renderNotificationsSetting(){
  const s=getSession();
  const on=s?.settings?.notifications!==false;
  return `
  <div class="notif-setting">
    <p>Recevez un rappel quotidien pour étudier:</p>
    <div class="toggle-row">
      <span>Rappels quotidiens</span>
      <button class="toggle-btn ${on?'toggle-on':''}" onclick="toggleNotifications()">
        <div class="toggle-knob"></div>
      </button>
    </div>
    <p class="notif-note">Les rappels utilisent les notifications du navigateur.</p>
    <button class="btn btn-p btn-sm" onclick="Notification.requestPermission().then(p=>toast('Statut: '+p,'info'))">Autoriser les notifications</button>
  </div>`;
}

function toggleNotifications(){
  const s=getSession();
  if(!s) return;
  s.settings=s.settings||{};
  s.settings.notifications=!s.settings.notifications;
  saveSession(s);
  openSettingsSection('notifications');
}

function renderGoalSetting(){
  const s=getSession();
  const goal=s?.settings?.dailyGoal||10;
  return `
  <div class="goal-setting">
    <p>Combien de minutes par jour voulez-vous étudier?</p>
    <div class="goal-opts">
      ${[5,10,15,20,30].map(g=>`<button class="goal-opt ${goal===g?'active':''}" onclick="setDailyGoal(${g})">${g} min</button>`).join('')}
    </div>
  </div>`;
}

function setDailyGoal(min){
  const s=getSession();
  if(!s) return;
  s.settings=s.settings||{};
  s.settings.dailyGoal=min;
  saveSession(s);
  toast(`Objectif: ${min} min/jour`,'ok');
  openSettingsSection('goal');
}

function renderAboutPage(){
  return `
  <div class="about-page">
    <div class="about-logo">
      <svg width="60" height="60" viewBox="0 0 60 60">
        <defs><linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#D62828"/><stop offset="100%" stop-color="#8B0000"/></linearGradient></defs>
        <rect width="60" height="60" rx="16" fill="url(#ag)"/>
        <path d="M18 42 L30 18 L42 42" stroke="white" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="30" cy="12" r="4" fill="white"/>
      </svg>
    </div>
    <div class="about-name">Languway French</div>
    <div class="about-version">Version 6.0 • 2024</div>
    <div class="about-desc">Application d'apprentissage du français — 300 leçons, traducteur IA, WordBook, certificats.</div>
    <div class="about-features-list">
      <div class="about-feat-row">📚 300 leçons structurées</div>
      <div class="about-feat-row">📖 WordBook par leçon</div>
      <div class="about-feat-row">🤖 Traducteur IA avec explication</div>
      <div class="about-feat-row">🏆 Système de certificats</div>
      <div class="about-feat-row">🔊 Audio TTS (Text-to-Speech)</div>
      <div class="about-feat-row">📱 Progressive Web App (PWA)</div>
      <div class="about-feat-row">🌙 Mode sombre</div>
    </div>
    <div class="about-footer">Fait avec ❤️ pour les apprenants du monde arabe</div>
  </div>`;
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  speechSynthesis.getVoices();
  goTo('home');

  // Nav items
  document.querySelectorAll('.nav-item').forEach(n=>{
    n.addEventListener('click',()=>{
      const pg=n.dataset.page;
      if(pg) goTo(pg);
    });
  });

  // Auth modal buttons
  $('btn-login-top')?.addEventListener('click',()=>openM('m-auth'));
  $('tab-login')?.addEventListener('click',()=>switchAuthTab('login'));
  $('tab-register')?.addEventListener('click',()=>switchAuthTab('register'));
  $('btn-do-login')?.addEventListener('click',doLogin);
  $('btn-do-register')?.addEventListener('click',doRegister);

  // Translator nav
  $('nav-translator')?.addEventListener('click',()=>openTranslator(''));

  // Update streak
  updateStreak();
});

function updateStreak(){
  const s=getSession();
  if(!s) return;
  const today=new Date().toDateString();
  const last=s.lastStudy?new Date(s.lastStudy).toDateString():null;
  if(last===today) return;
  const yesterday=new Date(Date.now()-86400000).toDateString();
  if(last===yesterday){
    s.streak=(s.streak||0)+1;
  } else if(last && last!==today){
    s.streak=0;
  }
  saveSession(s);
}
