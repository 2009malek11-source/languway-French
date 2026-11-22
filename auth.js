/* ================================================================
   LANGUWAY FRENCH — AUTH v6
   localStorage keys unified with app.js
================================================================ */
function getSession(){
  try{ return JSON.parse(localStorage.getItem('lw_session')||'null'); }
  catch{ return null; }
}
function saveSession(s){
  localStorage.setItem('lw_session', JSON.stringify(s));
}
function clearSession(){
  localStorage.removeItem('lw_session');
}

function authGetUsers(){
  try{ return JSON.parse(localStorage.getItem('lw_users')||'{}'); }
  catch{ return {}; }
}
function authSaveUsers(u){
  localStorage.setItem('lw_users', JSON.stringify(u));
}

function authRegister(name, email, password){
  const users = authGetUsers();
  const key = email.toLowerCase();
  if(users[key]) return { ok:false, msg:'Email déjà utilisé.' };
  const user = {
    name, email:key, password: btoa(password),
    level:'pre-a1', xp:0, streak:0, lastStudy:null,
    completedLessons:[], lessonProgress:{},
    wordbook:[], certificates:[],
    settings:{ uiLang:'ar', notifications:true, dailyGoal:10 },
    joinedAt: Date.now()
  };
  users[key] = user;
  authSaveUsers(users);
  saveSession({...user, email:key});
  return { ok:true, user };
}

function authLogin(email, password){
  const users = authGetUsers();
  const key = email.toLowerCase();
  const u = users[key];
  if(!u || u.password !== btoa(password)) return { ok:false, msg:'Email ou mot de passe incorrect.' };
  saveSession({...u, email:key});
  return { ok:true, user:u };
}

function authLogout(){
  clearSession();
  if(typeof goTo === 'function') goTo('home');
}

function authUpdate(updates){
  const s = getSession();
  if(!s) return;
  const users = authGetUsers();
  const key = s.email;
  if(users[key]){
    Object.assign(users[key], updates);
    authSaveUsers(users);
  }
  saveSession({...s, ...updates});
}

function authCompleteLesson(lid, xp){
  const s = getSession();
  if(!s) return;
  const cl = [...(s.completedLessons||[])];
  if(!cl.includes(lid)) cl.push(lid);
  const today = new Date().toDateString();
  const streak = s.lastStudy && new Date(s.lastStudy).toDateString() === new Date(Date.now()-86400000).toDateString()
    ? (s.streak||0)+1 : (s.lastStudy && new Date(s.lastStudy).toDateString()===today ? (s.streak||0) : 1);
  authUpdate({ completedLessons:cl, xp:(s.xp||0)+(xp||50), streak, lastStudy:Date.now() });
}

function authSaveWord(word){
  const s = getSession();
  if(!s) return;
  const wb = [...(s.wordbook||[])];
  if(!wb.includes(word)) wb.push(word);
  authUpdate({ wordbook:wb });
}
