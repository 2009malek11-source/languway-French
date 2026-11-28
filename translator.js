/* ================================================================
   LANGUWAY FRENCH — translator.js v7
   Smart AI translator with full explanations + images
================================================================ */

const IMG_MAP = {
  greeting: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=70',
  family:   'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=400&q=70',
  food:     'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=70',
  city:     'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=70',
  school:   'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=70',
  coffee:   'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=70',
  travel:   'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=70',
  nature:   'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=400&q=70',
  book:     'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=70',
};

function wordImg(word, cat) {
  const w = (word || '').toLowerCase();
  if (['bonjour','salut','bonsoir','merci','oui','non','pardon'].includes(w)) return IMG_MAP.greeting;
  if (['famille','mère','père','frère','sœur','enfant','parent','fils','fille'].some(x => w.includes(x))) return IMG_MAP.family;
  if (['manger','nourriture','repas','café','restaurant','pain','fromage','vin'].some(x => w.includes(x))) return IMG_MAP.food;
  if (['ville','rue','paris','maison','appartement','quartier'].some(x => w.includes(x))) return IMG_MAP.city;
  if (['apprendre','école','étudier','livre','cours','classe'].some(x => w.includes(x))) return IMG_MAP.school;
  if (['café','boire','thé','boisson'].some(x => w.includes(x))) return IMG_MAP.coffee;
  if (['voyage','aller','partir','avion','train'].some(x => w.includes(x))) return IMG_MAP.travel;
  if (cat === 'noun') return IMG_MAP.book;
  return null;
}

let _transDir = 'fr-ar';

function openTranslator(preText) {
  const box = document.querySelector('#m-trans .modal-box');
  if (!box) return;
  box.innerHTML = buildTranslatorUI(preText || '');
  openModal('m-trans');
  if (preText) setTimeout(doSmartTranslate, 400);
}

function buildTranslatorUI(initText) {
  return `
  <div class="drag-bar"></div>
  <div class="mhdr">
    <div class="mhdr-title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red)" stroke-width="2"><path d="M5 8l6 6m-6 0l6-6M19 5h-7m7 0a2 2 0 010 4h-7m7-4"/></svg>
      Traducteur Intelligent
    </div>
    <button class="mclose" onclick="closeModal('m-trans')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
    </button>
  </div>
  <div class="trans-wrap">
    <div class="trans-dirs">
      <button class="tdir active" id="td-fr-ar" onclick="setTDir('fr-ar')">🇫🇷 → عربي</button>
      <button class="tdir" id="td-fr-en" onclick="setTDir('fr-en')">🇫🇷 → English</button>
      <button class="tdir" id="td-to-fr" onclick="setTDir('to-fr')">🌍 → 🇫🇷</button>
    </div>
    <div class="trans-inp-wrap">
      <textarea id="tr-text" class="trans-inp" rows="3" placeholder="Entrez un mot ou une phrase...">${esc(initText)}</textarea>
      <button class="trans-tts-btn" onclick="speak(document.getElementById('tr-text').value)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
      </button>
    </div>
    <button class="btn btn-p trans-go" onclick="doSmartTranslate()">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
      Traduire & Expliquer
    </button>
    <div class="trans-quick-row">
      ${['bonjour','merci','au revoir','je veux','s\'il vous plaît','où est','combien coûte'].map(w =>
        `<button class="qchip" onclick="quickTrans('${esc(w)}')">${esc(w)}</button>`
      ).join('')}
    </div>
    <div id="tr-out"></div>
  </div>`;
}

function setTDir(d) {
  _transDir = d;
  document.querySelectorAll('.tdir').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('td-' + d);
  if (el) el.classList.add('active');
}

function quickTrans(w) {
  const inp = document.getElementById('tr-text');
  if (inp) { inp.value = w; doSmartTranslate(); }
}

async function doSmartTranslate() {
  const inp = document.getElementById('tr-text');
  const txt = (inp?.value || '').trim();
  if (!txt) return;
  const out = document.getElementById('tr-out');
  if (!out) return;

  out.innerHTML = `<div class="tr-loading"><div class="tr-spin"></div><span>Analyse en cours...</span></div>`;

  const uiLang = getSession()?.settings?.uiLang || 'ar';
  const prompt = `Tu es un professeur de français expert. Analyse le mot/phrase: "${txt}"
Réponds UNIQUEMENT en JSON valide (aucun markdown):
{
  "word": "${txt}",
  "type": "verb|noun|adjective|adverb|phrase|exclamation",
  "translation_ar": "الترجمة بالعربية",
  "translation_en": "English translation",
  "pronunciation": "IPA phonetic",
  "gender": "masculin|féminin|neutre|null",
  "plural": "plural form or null",
  "explanation_ar": "شرح مفصل بالعربية: المعنى، متى تستخدم، في أي سياق، أمثلة على الاستخدام",
  "explanation_en": "Detailed explanation: meaning, when to use, context, usage examples",
  "examples": ["example 1", "example 2", "example 3"],
  "conjugation_present": {"je":"","tu":"","il/elle":"","nous":"","vous":"","ils/elles":""},
  "conjugation_passe": {"je":"","tu":"","il/elle":"","nous":"","vous":"","ils/elles":""},
  "tips": "practical memory tip",
  "image_category": "greeting|family|food|city|school|coffee|travel|nature|book|null"
}
Pour les non-verbes, mets null pour conjugaison.`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6', max_tokens: 900,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await r.json();
    const raw = (data.content?.[0]?.text || '{}').replace(/```json|```/g, '').trim();
    let result;
    try { result = JSON.parse(raw); }
    catch { result = { word: txt, translation_ar: raw, translation_en: raw, type: 'unknown' }; }
    renderTransResult(result);
  } catch (e) {
    out.innerHTML = `<div class="tr-error">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--err)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
      Connexion Internet requise pour le traducteur IA.
    </div>`;
  }
}

function renderTransResult(r) {
  const out = document.getElementById('tr-out');
  if (!out) return;
  const isAr = (_transDir === 'fr-ar');
  const trans = isAr ? r.translation_ar : r.translation_en;
  const expl  = isAr ? r.explanation_ar : r.explanation_en;
  const img   = r.image_category && r.image_category !== 'null' ? (IMG_MAP[r.image_category] || null) : null;
  const hasConj = r.conjugation_present && Object.values(r.conjugation_present).some(v => v);

  out.innerHTML = `
  <div class="tr-result">
    <div class="tr-hdr">
      <div class="tr-word">${esc(r.word)}</div>
      ${r.pronunciation ? `<div class="tr-pron">[${esc(r.pronunciation)}]</div>` : ''}
      <div class="tr-badges">
        ${r.type ? `<span class="tbadge tbadge-type">${esc(r.type)}</span>` : ''}
        ${r.gender ? `<span class="tbadge tbadge-gen">${esc(r.gender)}</span>` : ''}
        ${r.plural ? `<span class="tbadge tbadge-pl">pl: ${esc(r.plural)}</span>` : ''}
      </div>
      <button class="tr-hear-btn" onclick="speak('${esc(r.word)}')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        Écouter
      </button>
    </div>

    ${img ? `<div class="tr-img-box"><img src="${img}" alt="${esc(r.word)}" class="tr-img" loading="lazy" onerror="this.parentElement.style.display='none'"/><div class="tr-img-lbl">${esc(r.word)}</div></div>` : ''}

    <div class="tr-sec">
      <div class="tr-sec-lbl">Traduction</div>
      <div class="tr-trans ${isAr ? 'rtl' : ''}">${esc(trans || '—')}</div>
    </div>

    <div class="tr-sec">
      <div class="tr-sec-lbl">Explication détaillée</div>
      <div class="tr-expl ${isAr ? 'rtl' : ''}">${esc(expl || '—')}</div>
    </div>

    ${(r.examples || []).length ? `
    <div class="tr-sec">
      <div class="tr-sec-lbl">Exemples d'usage</div>
      ${r.examples.map((ex, i) => `
      <div class="tr-ex-row">
        <span class="tr-ex-num">${i + 1}</span>
        <span class="tr-ex-txt">${esc(ex)}</span>
        <button onclick="speak('${esc(ex)}')" class="tr-ex-spk">🔊</button>
      </div>`).join('')}
    </div>` : ''}

    ${hasConj ? `
    <div class="tr-sec">
      <div class="tr-sec-lbl">Conjugaison</div>
      <div class="conj-tabs">
        <button class="ctab active" onclick="showConj('present',this)">Présent</button>
        <button class="ctab" onclick="showConj('passe',this)">Passé</button>
      </div>
      <div id="conj-present" class="conj-grid">
        ${Object.entries(r.conjugation_present || {}).map(([p,v]) => `
        <div class="cj-row"><span class="cj-pro">${esc(p)}</span><span class="cj-form">${esc(v)}</span></div>`).join('')}
      </div>
      <div id="conj-passe" class="conj-grid" style="display:none">
        ${Object.entries(r.conjugation_passe || {}).map(([p,v]) => `
        <div class="cj-row"><span class="cj-pro">${esc(p)}</span><span class="cj-form">${esc(v)}</span></div>`).join('')}
      </div>
    </div>` : ''}

    ${r.tips ? `<div class="tr-tip"><svg width="14" height="14" viewBox="0 0 24 24" fill="var(--red)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>${esc(r.tips)}</div>` : ''}

    <button class="btn btn-o btn-sm tr-save" onclick="authSaveWord&&authSaveWord('${esc(r.word)}');showToast('Sauvegardé dans le WordBook! 📖','ok')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
      Sauvegarder dans le WordBook
    </button>
  </div>`;
}

function showConj(tab, btn) {
  document.querySelectorAll('.conj-grid').forEach(g => g.style.display = 'none');
  document.querySelectorAll('.ctab').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('conj-' + tab);
  if (el) el.style.display = 'grid';
  btn.classList.add('active');
}
