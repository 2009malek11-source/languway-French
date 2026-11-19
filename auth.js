/* ================================================================
   LANGUWAY FRENCH — AUTH MODULE
   ================================================================ */
const AUTH_KEY = 'lw_fr_users';
const SESSION_KEY = 'lw_fr_session';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]'); } catch(e) { return []; }
}
function saveUsers(u) { localStorage.setItem(AUTH_KEY, JSON.stringify(u)); }
function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch(e) { return null; }
}
function setSession(u) { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }

function authRegister(name, email, password, goal) {
  const users = getUsers();
  if (users.find(u => u.email === email.toLowerCase())) return { ok: false, msg: 'Email déjà utilisé.' };
  const user = {
    id: 'u_' + Date.now(),
    name, email: email.toLowerCase(),
    password: btoa(password),
    goal: goal || 'general',
    createdAt: Date.now(),
    avatar: name.charAt(0).toUpperCase(),
    xp: 0, streak: 0, lastDay: null,
    completedLevels: [], savedWords: [],
    settings: { darkMode: false, fontSize: 16, speechRate: 0.9, uiLang: 'fr', dialect: 'fr', notifications: true, autoPlay: true, showRomaji: true }
  };
  users.push(user);
  saveUsers(users);
  setSession(user);
  return { ok: true, user };
}

function authLogin(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email.toLowerCase() && u.password === btoa(password));
  if (!user) return { ok: false, msg: 'Email ou mot de passe incorrect.' };
  setSession(user);
  return { ok: true, user };
}

function authLogout() { clearSession(); location.reload(); }

function authUpdateUser(updates) {
  const session = getSession();
  if (!session) return;
  const users = getUsers();
  const idx = users.findIndex(u => u.id === session.id);
  if (idx === -1) return;
  Object.assign(users[idx], updates);
  saveUsers(users);
  setSession(users[idx]);
}

function authGetCurrent() { return getSession(); }

function authUpdateProgress(levelId, xpEarned) {
  const session = getSession();
  if (!session) return;
  const users = getUsers();
  const idx = users.findIndex(u => u.id === session.id);
  if (idx === -1) return;
  if (!users[idx].completedLevels.includes(levelId)) users[idx].completedLevels.push(levelId);
  users[idx].xp = (users[idx].xp || 0) + xpEarned;
  const today = new Date().toDateString();
  if (users[idx].lastDay !== today) {
    users[idx].streak = (users[idx].streak || 0) + 1;
    users[idx].lastDay = today;
  }
  saveUsers(users);
  setSession(users[idx]);
}
