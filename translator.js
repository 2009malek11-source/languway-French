/* ================================================================
   LANGUWAY FRENCH — SMART TRANSLATOR v6
   - Full word explanation (not just translation)
   - Contextual images for nouns
   - Conjugation tables for verbs
================================================================ */

const UNSPLASH_IMGS = {
  greeting:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=70',
  family:  'https://images.unsplash.com/photo-1511895426328-dc8714191011?w=400&q=70',
  food:    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=70',
  city:    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=70',
  school:  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&q=70',
  nature:  'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=400&q=70',
  book:    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=70',
  coffee:  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=70',
  travel:  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=70',
  default: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=70',
};

function getWordImage(word, type) {
  const w = word.toLowerCase();
  if(['bonjour','salut','bonsoir','merci','oui','non'].includes(w)) return UNSPLASH_IMGS.greeting;
  if(['famille','mère','père','frère','sœur','enfant','parent'].some(x=>w.includes(x))) return UNSPLASH_IMGS.family;
  if(['manger','nourriture','repas','café','restaurant','pain','fromage'].some(x=>w.includes(x))) return UNSPLASH_IMGS.food;
  if(['ville','rue','paris','maison','appartement'].some(x=>w.includes(x))) return UNSPLASH_IMGS.city;
  if(['apprendre','école','étudier','livre','cours'].some(x=>w.includes(x))) return UNSPLASH_IMGS.school;
  if(['nature','forêt','mer','montagne','fleur'].some(x=>w.includes(x))) return UNSPLASH_IMGS.nature;
  if(['café','boire','thé'].some(x=>w.includes(x))) return UNSPLASH_IMGS.coffee;
  if(['voyage','aller','partir','avion'].some(x=>w.includes(x))) return UNSPLASH_IMGS.travel;
  if(type === 'noun') return UNSPLASH_IMGS.book;
  return null; // no image for verbs/adj/adv
}

function openTranslator(preText) {
  const box = document.getElementById('m-trans')?.querySelector('.modal-box');
  if (!box) return;

  box.innerHTML = `
  <div class="modal-drag-bar"></div>
  <div class="modal-hdr">
    <div class="modal-hdr-title">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 8l6 6m-6 0l6-6M19 5h-7m7 0a2 2 0 010 4h-7m7-4"/></svg>
      Traducteur Intelligent
    </div>
    <button class="modal-close-btn" onclick="closeM('m-trans')">✕</button>
  </div>

  <div class="trans-content">
    <div class="trans-dir-row">
      <button class="trans-dir-btn active" id="td-fr-ar" onclick="setTransDir('fr-ar')">🇫🇷 → 🌙 عربي</button>
      <button class="trans-dir-btn" id="td-fr-en" onclick="setTransDir('fr-en')">🇫🇷 → 🇬🇧 English</button>
      <button class="trans-dir-btn" id="td-any-fr" onclick="setTransDir('any-fr')">🌍 → 🇫🇷 Français</button>
    </div>

    <div class="trans-input-wrap">
      <textarea id="tr-inp" class="trans-textarea" placeholder="Entrez un mot ou une phrase en français..." rows="3">${preText||''}</textarea>
      <button class="trans-speak-btn" onclick="speak(document.getElementById('tr-inp').value)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
      </button>
    </div>

    <button class="btn btn-p trans-go-btn" onclick="doSmartTranslate()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
      Traduire & Expliquer
    </button>

    <div id="tr-quick-words" class="trans-quick">
      <div class="trans-quick-label">Mots rapides</div>
      <div class="trans-quick-row">
        ${['bonjour','merci','au revoir','je veux','s\'il vous plaît','où est','combien'].map(w=>`<button class="quick-chip" onclick="quickTranslate('${w}')">${w}</button>`).join('')}
      </div>
    </div>

    <div id="tr-out"></div>
  </div>`;

  if (preText) setTimeout(doSmartTranslate, 300);
  openM('m-trans');
}

let _transDir = 'fr-ar';
function setTransDir(d) {
  _transDir = d;
  document.querySelectorAll('.trans-dir-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('td-'+d)?.classList.add('active');
}
function quickTranslate(w) {
  const inp = document.getElementById('tr-inp');
  if (inp) { inp.value = w; doSmartTranslate(); }
}

async function doSmartTranslate() {
  const inp = document.getElementById('tr-inp');
  const txt = (inp?.value || '').trim();
  if (!txt) return;

  const out = document.getElementById('tr-out');
  if (!out) return;
  out.innerHTML = `<div class="trans-loading"><div class="trans-spinner"></div><span>Analyse en cours...</span></div>`;

  const dirMap = {
    'fr-ar': 'du français vers l\'arabe',
    'fr-en': 'du français vers l\'anglais',
    'any-fr': 'vers le français',
  };
  const userLang = getSession()?.settings?.uiLang || 'ar';
  const respLang = userLang === 'ar' ? 'en arabe' : 'en anglais';

  const prompt = `Tu es un professeur de français expert. Analyse ce mot/phrase: "${txt}"

Réponds EXACTEMENT dans ce format JSON (sans markdown, juste le JSON):
{
  "word": "${txt}",
  "type": "verb|noun|adjective|adverb|phrase|exclamation",
  "translation_ar": "الترجمة بالعربية",
  "translation_en": "translation in English",
  "pronunciation": "phonétique IPA",
  "gender": "masculin|féminin|neutre|null",
  "plural": "forme plurielle ou null",
  "explanation_ar": "شرح مفصل بالعربية: معنى الكلمة، متى تستخدم، في أي سياق، مع أمثلة",
  "explanation_en": "Detailed explanation in English: meaning, when to use, context, examples",
  "examples": ["exemple 1 en français", "exemple 2", "exemple 3"],
  "conjugation": {"present": {"je":"","tu":"","il":"","nous":"","vous":"","ils":""}, "passe": {"je":"","tu":"","il":"","nous":"","vous":"","ils":""}} or null if not a verb,
  "tips": "conseil pratique pour mémoriser ou utiliser ce mot",
  "image_category": "greeting|family|food|city|school|nature|coffee|travel|book|null"
}`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await r.json();
    const raw = (data.content?.[0]?.text || '{}').trim();
    let result;
    try { result = JSON.parse(raw); }
    catch { result = { word: txt, translation_ar: '—', translation_en: '—', explanation_ar: raw, explanation_en: raw, type: 'unknown' }; }

    renderTransResult(result);
  } catch (e) {
    out.innerHTML = `<div class="trans-error">❌ Erreur de connexion. Vérifiez votre internet.</div>`;
  }
}

function renderTransResult(r) {
  const out = document.getElementById('tr-out');
  if (!out) return;

  const isAr = (_transDir === 'fr-ar');
  const translation = isAr ? r.translation_ar : r.translation_en;
  const explanation = isAr ? r.explanation_ar : r.explanation_en;
  const imgUrl = r.image_category && r.image_category !== 'null' ? UNSPLASH_IMGS[r.image_category] || null : null;

  const conj = r.conjugation;

  out.innerHTML = `
  <div class="trans-result-card">

    <!-- Header -->
    <div class="tr-res-hdr">
      <div class="tr-res-word">${esc(r.word)}</div>
      <div class="tr-res-pron">[${esc(r.pronunciation||'')}]</div>
      <div class="tr-res-type-row">
        ${r.type ? `<span class="tr-badge tr-badge-type">${esc(r.type)}</span>` : ''}
        ${r.gender ? `<span class="tr-badge tr-badge-gender">${esc(r.gender)}</span>` : ''}
        ${r.plural ? `<span class="tr-badge tr-badge-plural">pl: ${esc(r.plural)}</span>` : ''}
      </div>
      <button class="tr-speak-word" onclick="speak('${esc(r.word)}')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        Écouter
      </button>
    </div>

    <!-- Image (for nouns) -->
    ${imgUrl ? `<div class="tr-img-wrap"><img src="${imgUrl}" alt="${esc(r.word)}" class="tr-img" loading="lazy" onerror="this.parentElement.style.display='none'"/><div class="tr-img-label">${esc(r.word)}</div></div>` : ''}

    <!-- Translation -->
    <div class="tr-section">
      <div class="tr-section-lbl">📖 Traduction</div>
      <div class="tr-translation ${isAr?'rtl':''}">${esc(translation)}</div>
    </div>

    <!-- Explanation -->
    <div class="tr-section">
      <div class="tr-section-lbl">💡 Explication détaillée</div>
      <div class="tr-explanation ${isAr?'rtl':''}">${esc(explanation)}</div>
    </div>

    <!-- Examples -->
    ${r.examples?.length ? `
    <div class="tr-section">
      <div class="tr-section-lbl">✏️ Exemples</div>
      ${r.examples.map((ex,i) => `
        <div class="tr-example-row">
          <span class="tr-ex-num">${i+1}</span>
          <span class="tr-ex-txt">${esc(ex)}</span>
          <button class="tr-ex-speak" onclick="speak('${esc(ex)}')">🔊</button>
        </div>`).join('')}
    </div>` : ''}

    <!-- Conjugation (verbs only) -->
    ${conj?.present ? `
    <div class="tr-section">
      <div class="tr-section-lbl">🔄 Conjugaison</div>
      <div class="conj-tabs">
        <button class="conj-tab active" onclick="showConjTab('present',this)">Présent</button>
        ${conj.passe ? `<button class="conj-tab" onclick="showConjTab('passe',this)">Passé composé</button>` : ''}
      </div>
      <div id="conj-present" class="conj-table">
        ${Object.entries(conj.present).map(([p,v])=>`<div class="conj-row"><span class="conj-pro">${p}</span><span class="conj-form">${esc(v)}</span></div>`).join('')}
      </div>
      ${conj.passe ? `<div id="conj-passe" class="conj-table" style="display:none">
        ${Object.entries(conj.passe).map(([p,v])=>`<div class="conj-row"><span class="conj-pro">${p}</span><span class="conj-form">${esc(v)}</span></div>`).join('')}
      </div>` : ''}
    </div>` : ''}

    <!-- Tips -->
    ${r.tips ? `
    <div class="tr-tip-box">
      <span>💡</span>
      <span class="${isAr?'rtl':''}">${esc(r.tips)}</span>
    </div>` : ''}

    <!-- Save button -->
    <button class="btn btn-o btn-sm tr-save-btn" onclick="authSaveWord&&authSaveWord('${esc(r.word)}');toast('Sauvegardé dans le Wordbook! 📖','ok')">
      🔖 Sauvegarder dans le Wordbook
    </button>

  </div>`;
}

function showConjTab(tab, btn) {
  document.querySelectorAll('.conj-table').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.conj-tab').forEach(b => b.classList.remove('active'));
  const el = document.getElementById('conj-' + tab);
  if (el) el.style.display = 'grid';
  btn.classList.add('active');
}
