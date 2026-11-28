/* ================================================================
   LANGUWAY FRENCH — auth.js v7
================================================================ */
const DB_SESSION = 'lw_session';
const DB_USERS   = 'lw_users';

function getSession() {
  try { return JSON.parse(localStorage.getItem(DB_SESSION) || 'null'); } catch { return null; }
}
function saveSession(s) { localStorage.setItem(DB_SESSION, JSON.stringify(s)); }
function clearSession() { localStorage.removeItem(DB_SESSION); }
function getUsers()     { try { return JSON.parse(localStorage.getItem(DB_USERS) || '{}'); } catch { return {}; } }
function saveUsers(u)   { localStorage.setItem(DB_USERS, JSON.stringify(u)); }

function authRegister(name, email, password) {
  const users = getUsers();
  const key = email.toLowerCase().trim();
  if (!name || !email || !password) return { ok: false, msg: 'Remplissez tous les champs.' };
  if (password.length < 6)          return { ok: false, msg: 'Mot de passe: 6 caractères minimum.' };
  if (users[key])                    return { ok: false, msg: 'Email déjà utilisé.' };
  const user = {
    name: name.trim(), email: key,
    password: btoa(password),
    level: 'pre-a1', xp: 0, streak: 0,
    lastStudy: null, joinedAt: Date.now(),
    completedLessons: [], wordbook: [], certificates: [],
    settings: { uiLang: 'ar', dailyGoal: 10, notifications: true },
  };
  users[key] = user;
  saveUsers(users);
  saveSession({ ...user });
  return { ok: true, user };
}

function authLogin(email, password) {
  const users = getUsers();
  const key = (email || '').toLowerCase().trim();
  const u = users[key];
  if (!u || u.password !== btoa(password)) return { ok: false, msg: 'Email ou mot de passe incorrect.' };
  saveSession({ ...u });
  return { ok: true, user: u };
}

function authLogout() { clearSession(); }

function authUpdate(updates) {
  const s = getSession();
  if (!s) return;
  const users = getUsers();
  if (users[s.email]) { Object.assign(users[s.email], updates); saveUsers(users); }
  saveSession({ ...s, ...updates });
}

function authCompleteLesson(lessonId, xp) {
  const s = getSession();
  if (!s) return;
  const cl = Array.from(new Set([...(s.completedLessons || []), lessonId]));
  const today = new Date().toDateString();
  const lastDay = s.lastStudy ? new Date(s.lastStudy).toDateString() : null;
  const yest = new Date(Date.now() - 86400000).toDateString();
  const streak = lastDay === today ? (s.streak || 1)
    : lastDay === yest ? (s.streak || 0) + 1 : 1;
  authUpdate({ completedLessons: cl, xp: (s.xp || 0) + (xp || 50), streak, lastStudy: Date.now() });
}

function authSaveWord(word) {
  const s = getSession();
  if (!s) return;
  const wb = Array.from(new Set([...(s.wordbook || []), word]));
  authUpdate({ wordbook: wb });
}

function isLessonUnlocked(levelId, unitNum, lessonNum) {
  const s = getSession();
  if (!s) return levelId === 'pre-a1' && unitNum === 1 && lessonNum === 1;
  if (levelId === 'pre-a1' && unitNum === 1 && lessonNum === 1) return true;
  const prevId = lessonNum > 1 ? `${levelId}-u${unitNum}-l${lessonNum - 1}`
    : unitNum > 1 ? `${levelId}-u${unitNum - 1}-l5` : null;
  if (!prevId) return true;
  return (s.completedLessons || []).includes(prevId);
}

function isWordbookUnlocked(lessonId) {
  const s = getSession();
  return !!(s && (s.completedLessons || []).includes(lessonId));
}
