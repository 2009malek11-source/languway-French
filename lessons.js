/* ================================================================
   LANGUWAY FRENCH — LESSON SYSTEM v6
   Structure: Level → Unit → Lesson → Steps + WordBook
================================================================ */

// Generate lesson content for any level/unit/lesson
function buildLessonContent(levelId, unitNum, lessonNum) {
  const levelIdx = ['pre-a1','a1','a2','b1','b2','c1'].indexOf(levelId);
  const lessonKey = `${levelId}-u${unitNum}-l${lessonNum}`;

  // Lesson vocabulary (5-8 words per lesson)
  const vocabSets = {
    'a1-u1-l1': [
      {fr:'bonjour',    pron:'bɔ̃.ʒuʁ',  eng:'hello',          ar:'مرحباً',    ex:'Bonjour Madame!',      img:'greeting', note:'Utilisé de 7h à 18h.'},
      {fr:'bonsoir',    pron:'bɔ̃.swaʁ', eng:'good evening',   ar:'مساء الخير',ex:'Bonsoir Monsieur!',    img:'evening',  note:'Après 18h.'},
      {fr:'merci',      pron:'mɛʁ.si',   eng:'thank you',      ar:'شكراً',     ex:'Merci beaucoup!',      img:'thanks',   note:'"Merci beaucoup" = very much.'},
      {fr:'au revoir',  pron:'o.ʁə.vwaʁ',eng:'goodbye',        ar:'وداعاً',    ex:'Au revoir, à demain!', img:'goodbye',  note:'Littéralement "until seeing again".'},
      {fr:"s'il vous plaît",pron:'sil.vu.plɛ',eng:'please',    ar:'من فضلك',  ex:"Un café, s'il vous plaît.",img:'please',note:'Forme formelle. "S\'il te plaît" = informel.'},
      {fr:'oui',        pron:'wi',       eng:'yes',             ar:'نعم',       ex:'Oui, je parle français.',img:'yes',    note:'Très simple!'},
      {fr:'non',        pron:'nɔ̃',      eng:'no',              ar:'لا',        ex:'Non, merci.',           img:'no',       note:'Peut aussi signifier "not".'},
    ],
    'a1-u1-l2': [
      {fr:'je m\'appelle',pron:'ʒə ma.pɛl',eng:'my name is',   ar:'اسمي',      ex:'Je m\'appelle Marie.',  img:'name',    note:'Littéralement "I call myself".'},
      {fr:'j\'ai ... ans',pron:'ʒe ... ɑ̃',eng:'I am ... years old',ar:'عمري',ex:'J\'ai vingt ans.',       img:'age',     note:'Âge: "avoir" + ans.'},
      {fr:'je viens de', pron:'ʒə vjɛ̃.də',eng:'I come from',  ar:'أنا من',    ex:'Je viens de France.',   img:'country', note:'Origine: "venir de".'},
      {fr:'j\'habite à', pron:'ʒa.bit.a', eng:'I live in',     ar:'أسكن في',   ex:'J\'habite à Paris.',    img:'city',    note:'"Habiter à" + ville.'},
      {fr:'enchanté',   pron:'ɑ̃.ʃɑ̃.te', eng:'nice to meet you',ar:'يسعدني',  ex:'Enchanté de vous connaître!',img:'meet',note:'Très courant lors d\'une présentation.'},
    ],
    'a1-u2-l1': [
      {fr:'la mère',    pron:'la.mɛʁ',   eng:'the mother',     ar:'الأم',      ex:'Ma mère s\'appelle Marie.',img:'mother',note:'Féminin.'},
      {fr:'le père',    pron:'lə.pɛʁ',   eng:'the father',     ar:'الأب',      ex:'Mon père est médecin.',  img:'father',  note:'Masculin.'},
      {fr:'le frère',   pron:'lə.fʁɛʁ',  eng:'the brother',    ar:'الأخ',      ex:'J\'ai un frère.',        img:'brother', note:'Pluriel: les frères.'},
      {fr:'la sœur',   pron:'la.sœʁ',   eng:'the sister',     ar:'الأخت',     ex:'Ma sœur est étudiante.', img:'sister',  note:'Pluriel: les sœurs.'},
      {fr:'les parents',pron:'le.pa.ʁɑ̃', eng:'the parents',   ar:'الوالدان',  ex:'Mes parents habitent à Lyon.',img:'parents',note:'Toujours pluriel.'},
      {fr:'le fils',    pron:'lə.fis',    eng:'the son',        ar:'الابن',     ex:'C\'est mon fils.',       img:'son',     note:'"Fils" = son. Ne pas confondre avec "fille".'},
      {fr:'la fille',   pron:'la.fij',    eng:'the daughter',   ar:'الابنة',    ex:'J\'ai deux filles.',     img:'daughter',note:'Aussi = "girl" en général.'},
    ],
  };

  // Default vocab for unlisted lessons
  const defaultVocab = [
    {fr:'apprendre', pron:'a.pʁɑ̃.dʁ', eng:'to learn',   ar:'يتعلم', ex:'J\'apprends le français.', img:'learn', note:'Irrégulier comme "prendre".'},
    {fr:'comprendre',pron:'kɔ̃.pʁɑ̃.dʁ',eng:'to understand',ar:'يفهم',ex:'Je comprends maintenant.',  img:'understand',note:'Comme "prendre" — irrégulier.'},
    {fr:'parler',    pron:'paʁ.le',    eng:'to speak',   ar:'يتكلم',ex:'Tu parles français?',         img:'speak',note:'Verbe -ER régulier modèle.'},
    {fr:'écrire',    pron:'e.kʁiʁ',   eng:'to write',   ar:'يكتب', ex:'J\'écris une lettre.',         img:'write',note:'Irrégulier: écris/écrit/écrivons.'},
    {fr:'lire',      pron:'liʁ',       eng:'to read',    ar:'يقرأ', ex:'Je lis un livre.',             img:'read', note:'Irrégulier: lis/lit/lisons.'},
    {fr:'écouter',   pron:'e.ku.te',   eng:'to listen',  ar:'يستمع',ex:'J\'écoute de la musique.',    img:'listen',note:'Verbe -ER régulier.'},
  ];

  const vocab = vocabSets[`${levelId}-u${unitNum}-l${lessonNum}`] || defaultVocab.slice(0,5);

  // Grammar rule for this lesson
  const grammar = getGrammarForLesson(levelId, unitNum, lessonNum);

  // Exercises
  const exercises = buildExercises(vocab, grammar, levelIdx);

  return {
    id: lessonKey,
    levelId,
    unitNum,
    lessonNum,
    title: getLessonTitle(levelId, unitNum, lessonNum),
    duration: '10-15 min',
    xp: 50 + levelIdx * 20,
    vocab,
    grammar,
    exercises,
    wordbook: vocab, // WordBook = lesson vocabulary
  };
}

function getLessonTitle(levelId, u, l) {
  const titles = {
    'a1': [
      ['Bonjour!','Se présenter','La famille','Les chiffres','Les couleurs'],
      ['Les articles','Être & Avoir','Les adjectifs','La maison','Les métiers'],
    ],
    'a2': [
      ['Le passé composé','Le futur proche','Les pronoms','Aller & Venir','Le négatif'],
      ['L\'imparfait','Le conditionnel','Les prépositions','La santé','Les sports'],
    ],
  };
  return titles[levelId]?.[u-1]?.[l-1] || `Leçon ${l}`;
}

function getGrammarForLesson(levelId, u, l) {
  const rules = {
    'pre-a1': {rule:'Les lettres A à Z et leurs sons en français.',examples:['A = [a] comme dans "ami"','E = [ə] comme dans "le"','U = [y] comme dans "tu"'],tip:'La prononciation française est différente de l\'anglais!'},
    'a1':     {rule:'Articles définis: le (m), la (f), les (pl). Articles indéfinis: un (m), une (f), des (pl).',examples:['le livre (the book)','la maison (the house)','les enfants (the children)','un café (a coffee)'],tip:'Mémorisez toujours le nom avec son article!'},
    'a2':     {rule:'Passé composé = avoir/être + participe passé. La plupart: avoir. Verbes de mouvement: être.',examples:['J\'ai mangé (I ate)','Je suis allé (I went)','Nous avons vu (We saw)'],tip:'"Dr & Mrs P. Vandertramp" = verbes avec être.'},
    'b1':     {rule:'Subjonctif présent: radical 3e pers. pluriel + -e/-es/-e/-ions/-iez/-ent.',examples:['que je parle','que tu ailles','qu\'il soit','que nous ayons'],tip:'Après: il faut que, bien que, pour que, vouloir que.'},
    'b2':     {rule:'Conditionnel passé: conditionnel de avoir/être + participe passé. Pour hypothèses passées.',examples:['"Si j\'avais su, j\'aurais agi."','"Il aurait pu venir."'],tip:'Type 3: si + plus-que-parfait → conditionnel passé.'},
    'c1':     {rule:'Registres de langue: familier, courant, soutenu. Chaque registre a son vocabulaire.',examples:['Familier: "C\'est sympa!"','Courant: "C\'est agréable."','Soutenu: "C\'est fort appréciable."'],tip:'Le contexte dicte le registre.'},
  };
  return rules[levelId] || rules['a1'];
}

function buildExercises(vocab, grammar, levelIdx) {
  const v = vocab;
  return [
    // MCQ
    {type:'mcq', title:'Quiz: Vocabulaire',
     question:`Que signifie "${v[0]?.fr}"?`,
     opts: shuffle([v[0]?.eng, v[1]?.eng||'goodbye', v[2]?.eng||'please', v[3]?.eng||'yes']),
     ans: 0, _correct: v[0]?.eng,
     exp: `"${v[0]?.fr}" = "${v[0]?.eng}". ${v[0]?.note||''}`},
    // Fill
    {type:'fill', title:'Complétez la phrase',
     prompt: v[0]?.ex?.replace(v[0]?.fr, '___') || `___ (${v[0]?.eng})`,
     answer: v[0]?.fr?.split(' ')[0] || 'bonjour',
     hint: v[0]?.eng || 'greeting'},
    // Listen
    {type:'listen', title:'Écoutez et répétez',
     phrases: v.slice(0,3).map(w=>w.fr),
     translations: v.slice(0,3).map(w=>w.eng)},
    // Grammar MCQ
    {type:'mcq', title:'Grammaire',
     question: grammar.examples?.[0] ? `Quelle est la traduction de: "${grammar.examples[0]}"?` : 'Choisissez le bon article:',
     opts: ['le livre','la maison','les enfants','un café'],
     ans: 0,
     exp: grammar.tip || 'Révisez la règle!'},
    // Speak
    {type:'speak', title:'Expression orale',
     phrase: v[0]?.ex || 'Bonjour!',
     translation: v[0]?.ar || 'مرحباً'},
  ].map(ex => ex.type === 'mcq' ? fixMcqAns(ex) : ex);
}

function fixMcqAns(ex) {
  if (ex._correct) {
    ex.ans = ex.opts.indexOf(ex._correct);
    if (ex.ans === -1) { ex.opts[0] = ex._correct; ex.ans = 0; }
  }
  return ex;
}

function shuffle(a) { return [...a].filter(Boolean).sort(() => Math.random() - .5); }

// Get user progress for a lesson
function getLessonProgress(lessonId) {
  const s = getSession();
  return s?.lessonProgress?.[lessonId] || 0;
}

// Check if lesson is unlocked
function isLessonUnlocked(levelId, unitNum, lessonNum) {
  const s = getSession();
  if (!s) return false;
  if (levelId === 'pre-a1' && unitNum === 1 && lessonNum === 1) return true;
  // Previous lesson must be completed
  const prevLessonId = lessonNum > 1
    ? `${levelId}-u${unitNum}-l${lessonNum-1}`
    : unitNum > 1
      ? `${levelId}-u${unitNum-1}-l5`
      : null;
  if (!prevLessonId) return true;
  return (s.completedLessons || []).includes(prevLessonId);
}

// Check if wordbook is unlocked (lesson must be complete)
function isWordbookUnlocked(lessonId) {
  const s = getSession();
  return (s?.completedLessons || []).includes(lessonId);
}
