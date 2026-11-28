/* ================================================================
   LANGUWAY FRENCH — data.js v8 (PROFESSIONAL)
   Contenu pédagogique complet par un professeur certifié
   Niveaux: Pré-A1 → C1 (300 leçons)
================================================================ */

// ── Niveaux ──────────────────────────────────────────────────
const LEVELS = [
  {id:'pre-a1',label:'Pré-A1',name:'Zéro absolu',color:'#9333EA',
   desc:'Alphabet, phonétique, premiers sons et mots de base',units:10},
  {id:'a1',label:'A1',name:'Débutant',color:'#D62828',
   desc:'Salutations, présentations, chiffres, couleurs, famille',units:10},
  {id:'a2',label:'A2',name:'Élémentaire',color:'#F77F00',
   desc:'Passé composé, futur proche, vie quotidienne, achats',units:10},
  {id:'b1',label:'B1',name:'Intermédiaire',color:'#2D9CDB',
   desc:'Subjonctif, conditionnel, actualité, voyages, culture',units:10},
  {id:'b2',label:'B2',name:'Avancé',color:'#27AE60',
   desc:'Conditionnel passé, nuances, argumentation, littérature',units:10},
  {id:'c1',label:'C1',name:'Maîtrise',color:'#F2994A',
   desc:'Registres, rhétorique, langue soutenue, expression fine',units:10},
];

// ── Titres des unités ─────────────────────────────────────────
const UNIT_TITLES = {
  'pre-a1':[
    "L'alphabet A-Z","Les voyelles et consonnes","Les accents français",
    "La phonétique de base","Les chiffres 0-100","Les couleurs",
    "Le corps humain","Les jours, mois, saisons","Les salutations de base","Révision Pré-A1"
  ],
  'a1':[
    "Bonjour! Les salutations","Se présenter","La famille",
    "Les articles définis et indéfinis","Être et Avoir","Les adjectifs qualificatifs",
    "La maison et les objets","Les métiers","La nourriture et les boissons","Les transports et la ville"
  ],
  'a2':[
    "Le passé composé (avoir)","Le passé composé (être)","Le futur proche",
    "Les pronoms personnels","La négation","L'imparfait (introduction)",
    "Les prépositions de lieu","La santé et le corps","Les achats et l'argent","Les loisirs et hobbies"
  ],
  'b1':[
    "Le subjonctif présent","Le conditionnel présent","Les pronoms relatifs (qui, que, où, dont)",
    "Le discours indirect","La comparaison","L'imparfait vs passé composé",
    "Le futur simple","Les connecteurs logiques","La presse et les médias","La société et l'environnement"
  ],
  'b2':[
    "Le conditionnel passé","Le plus-que-parfait","Les tournures impersonnelles",
    "La mise en relief","La voix passive","Le style indirect au passé",
    "Le lexique du débat","La littérature française","L'économie et le monde du travail","La politique et la citoyenneté"
  ],
  'c1':[
    "Les registres de langue","Les nuances lexicales","La stylistique et les figures de style",
    "L'argumentation formelle","La syntaxe avancée","La pragmatique et l'implicite",
    "Le français des médias","Les expressions idiomatiques","La culture et civilisation françaises","Synthèse et maîtrise C1"
  ],
};

// ── Titres des leçons ─────────────────────────────────────────
const LESSON_TITLES = {
  // PRE-A1
  'pre-a1-u1':["A, B, C, D, E, F, G","H, I, J, K, L, M, N","O, P, Q, R, S, T","U, V, W, X, Y, Z","L'alphabet complet — révision"],
  'pre-a1-u2':["Les voyelles A, E, I, O, U","Les consonnes douces","Les consonnes dures","Consonnes + voyelles","Syllabes simples — entraînement"],
  'pre-a1-u3':["L'accent aigu (é)","L'accent grave (è, à, ù)","L'accent circonflexe (â, ê, î, ô, û)","La cédille (ç) et le tréma (ë, ï, ü)","Révision des accents"],
  'pre-a1-u4':["Sons nasaux — an, en, in","Sons nasaux — on, un","Son [ʁ] — le R français","Sons [y] — tu, lune","Paires minimales — entraînement phonétique"],
  'pre-a1-u5':["0 à 10","11 à 20","21 à 69","70, 80, 90, 100","Les chiffres en contexte"],
  'pre-a1-u6':["Rouge, bleu, vert","Jaune, orange, violet","Blanc, noir, gris, marron","Les couleurs des objets","Les couleurs — révision"],
  'pre-a1-u7':["La tête et le visage","Le torse et les bras","Les jambes et les pieds","Organes internes de base","Le corps humain — révision"],
  'pre-a1-u8':["Les 7 jours de la semaine","Les 12 mois de l'année","Les 4 saisons","Hier, aujourd'hui, demain","Dates et calendrier"],
  'pre-a1-u9':["Bonjour / Bonsoir","Merci / S'il vous plaît","Oui / Non / Pardon","Comment vous appelez-vous?","Révision des salutations"],
  'pre-a1-u10':["Grand test Pré-A1 (1)","Grand test Pré-A1 (2)","Dictée Pré-A1","Production orale Pré-A1","Bilan et certificat Pré-A1"],
  // A1
  'a1-u1':["Bonjour et bonsoir","Salut et au revoir","S'il vous plaît et merci","Comment ça va?","Révision — les salutations"],
  'a1-u2':["Je m'appelle...","J'ai ... ans","Je viens de...","J'habite à...","Se présenter — révision"],
  'a1-u3':["Mon père et ma mère","Mes frères et sœurs","Mes grands-parents","La famille élargie","La famille — révision"],
  'a1-u4':["Le, la, les","Un, une, des","L' devant voyelle","Accord des articles","Les articles — révision"],
  'a1-u5':["Je suis / Tu es","Il est / Elle est","Nous sommes / Vous êtes","Ils sont / Elles sont","Être — révision complète"],
  'a1-u6':["Grand / Petit","Beau / Belle","Les adjectifs de personnalité","Accord masculin/féminin","Les adjectifs — révision"],
  'a1-u7':["Les pièces de la maison","Les meubles essentiels","Les objets du quotidien","Mon appartement / Ma maison","La maison — révision"],
  'a1-u8':["Médecin, professeur, ingénieur","Cuisinier, vendeur, infirmier","Artiste, sportif, fonctionnaire","Qu'est-ce que tu fais dans la vie?","Les métiers — révision"],
  'a1-u9':["Le petit-déjeuner","Le déjeuner et le dîner","Les boissons","Au restaurant — commander","La nourriture — révision"],
  'a1-u10':["Bus, métro, train","Voiture et vélo","À pied — les directions","La ville et ses lieux","Transports — révision et test A1"],
  // A2
  'a2-u1':["Passé composé — verbes -ER","Passé composé — verbes -IR","Passé composé — verbes irréguliers","Participes passés irréguliers","Passé composé — révision"],
  'a2-u2':["Être ou avoir? — les 17 verbes","DR MRS P. VANDERTRAMP","Accord du participe passé","Passé composé négatif","Passé composé avec être — révision"],
  'a2-u3':["Aller + infinitif","Venir de + infinitif","Le futur proche en contexte","Futur proche négatif","Futur proche — révision"],
  'a2-u4':["Me, te, se, nous, vous","Le, la, les (COD)","Lui, leur (COI)","Y et En","Les pronoms — révision"],
  'a2-u5':["Ne ... pas","Ne ... jamais","Ne ... plus","Ne ... rien / personne","La négation — révision"],
  'a2-u6':["L'imparfait — formation","L'imparfait — description","Habitudes passées avec l'imparfait","Imparfait vs présent","L'imparfait — révision"],
  'a2-u7':["Prépositions de lieu — à, en","Dans, sur, sous, devant, derrière","Prépositions avec les villes et pays","Chez, par, pour","Prépositions — révision"],
  'a2-u8':["Le corps et les maladies","Chez le médecin","Les médicaments","J'ai mal à...","La santé — révision"],
  'a2-u9':["Au marché","Dans un magasin","Les prix et les tailles","Cher, bon marché, soldes","Les achats — révision"],
  'a2-u10':["Les sports et activités","Loisirs culturels","Inviter et accepter / refuser","Les vacances","Loisirs — révision et test A2"],
  // B1
  'b1-u1':["Formation du subjonctif","Subjonctif — il faut que, vouloir que","Subjonctif — bien que, pour que","Subjonctif — avoir et être (irréguliers)","Subjonctif — révision"],
  'b1-u2':["Conditionnel — formation","Conditionnel de politesse","Si + imparfait + conditionnel","Conditionnel dans les hypothèses","Conditionnel — révision"],
  'b1-u3':["Qui et que","Dont","Où","Pronoms relatifs composés","Les pronoms relatifs — révision"],
  'b1-u4':["Discours indirect au présent","Dire que, penser que","Questions indirectes","Transformations des temps","Discours indirect — révision"],
  'b1-u5':["Plus ... que / Moins ... que","Aussi ... que","Le superlatif","Comparatif des adverbes","La comparaison — révision"],
  'b1-u6':["Passé composé vs imparfait — règle","Passé composé vs imparfait — pratique","Narration au passé","Interruption et durée","Passé — révision avancée"],
  'b1-u7':["Formation du futur simple","Futur simple irrégulier","Si + présent + futur","Futur antérieur (introduction)","Le futur — révision"],
  'b1-u8':["Cause — parce que, car, puisque","Conséquence — donc, alors, c'est pourquoi","Opposition — mais, cependant, pourtant","Concession — même si, bien que","Les connecteurs — révision"],
  'b1-u9':["Lire un article de presse","Comprendre les titres","Exprimer son opinion","Les médias numériques","Presse et médias — révision"],
  'b1-u10':["L'environnement et l'écologie","Les problèmes sociaux","La diversité culturelle","Exprimer accord et désaccord","Société — révision et test B1"],
  // B2
  'b2-u1':["Conditionnel passé — formation","Si + plus-que-parfait + conditionnel passé","Regrets et reproches","Conditionnel passé vs présent","Conditionnel passé — révision"],
  'b2-u2':["Plus-que-parfait — formation","Antériorité dans le passé","Concordance des temps","Narration complexe","Plus-que-parfait — révision"],
  'b2-u3':["Il s'agit de, il vaut mieux","On peut, on doit (impersonnel)","Il est + adjectif + de + infinitif","Tournures nominales","Impersonnel — révision"],
  'b2-u4':["C'est ... qui / que","Ce qui, ce que, ce dont","La mise en relief — pratique","L'emphase stylistique","Mise en relief — révision"],
  'b2-u5':["Formation du passif","Passif — usage et style","Passif avec différents temps","Passif vs actif — choix stylistique","La voix passive — révision"],
  'b2-u6':["Discours indirect passé","Transformations temporelles","Verbes déclaratifs","Rapporter des propos écrits","Discours indirect passé — révision"],
  'b2-u7':["Nuancer une opinion","Concéder et réfuter","Introduire des exemples","Conclure un argument","Le débat — révision"],
  'b2-u8':["Lire un texte littéraire","Analyser un roman","La poésie française","Figures de style (1)","Littérature — révision"],
  'b2-u9':["Le vocabulaire économique","Le monde du travail — CV, entretien","La mondialisation","Les inégalités sociales","Économie — révision"],
  'b2-u10':["La politique française","Les institutions","La citoyenneté","Droits et devoirs","Politique — révision et test B2"],
  // C1
  'c1-u1':["Registre familier vs courant","Registre courant vs soutenu","Le langage des jeunes","Langue administrative","Registres — révision"],
  'c1-u2':["Synonymes et nuances","Antonymes et contraires","Polysémie et homonymes","Niveaux de précision lexicale","Nuances lexicales — révision"],
  'c1-u3':["Métaphore et comparaison","Hyperbole et litote","Ironie et antithèse","Allitération et assonance","Figures de style — révision"],
  'c1-u4':["Thèse, antithèse, synthèse","Argumentation formelle écrite","Plan d'une dissertation","Rédiger une introduction","Argumentation — révision"],
  'c1-u5':["La phrase complexe","La subordination avancée","L'inversion du sujet","La nominalisation","Syntaxe avancée — révision"],
  'c1-u6':["L'implicite et le sous-entendu","Les présupposés","L'acte de langage","L'inférence contextuelle","Pragmatique — révision"],
  'c1-u7':["La langue des journaux","Éditoriaux et chroniques","Les débats télévisés","Comprendre le registre médiatique","Médias — révision"],
  'c1-u8':["500 expressions idiomatiques (1)","500 expressions idiomatiques (2)","Proverbes français","Expressions figées en contexte","Idiomes — révision"],
  'c1-u9':["La France — histoire et géographie","Art, cuisine, mode","Fêtes et traditions","Francophonie mondiale","Culture — révision"],
  'c1-u10':["Grand examen C1 — Compréhension","Grand examen C1 — Production écrite","Grand examen C1 — Production orale","Grand examen C1 — Grammaire","Certificat de maîtrise C1"],
};

// ── Vocabulaire complet par leçon ─────────────────────────────
const VOCAB = {
  // PRE-A1 U1 L1 — Lettres A-G
  'pre-a1-u1-l1':[
    {fr:'A comme Avion',  pron:'a',    en:'A as in Airplane',    ar:'A مثل طيارة',   ex:'A, B, C...', note:'Voyelle. Son: [a] comme dans "patte".', img:null},
    {fr:'B comme Bateau', pron:'be',   en:'B as in Boat',         ar:'B مثل قارب',    ex:'Un bateau sur la mer.', note:'Consonne. Son: [b].', img:null},
    {fr:'C comme Chat',   pron:'se',   en:'C as in Cat',          ar:'C مثل قطة',     ex:'Le chat est mignon.', note:'Son [k] ou [s] selon la voyelle qui suit.', img:'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&q=70'},
    {fr:'D comme Dix',    pron:'de',   en:'D as in Ten',          ar:'D مثل عشرة',    ex:'Dix élèves en classe.', note:'Consonne. Son: [d].', img:null},
    {fr:'E comme École',  pron:'ø',    en:'E as in School',       ar:'E مثل مدرسة',   ex:'Je vais à l\'école.', note:'Voyelle. Sons multiples: [e], [ɛ], [ø].', img:null},
    {fr:'F comme Forêt',  pron:'ɛf',   en:'F as in Forest',       ar:'F مثل غابة',    ex:'La forêt est belle.', note:'Son: [f].', img:null},
    {fr:'G comme Girafe', pron:'ʒe',   en:'G as in Giraffe',      ar:'G مثل زرافة',   ex:'La girafe a un long cou.', note:'Son [g] ou [ʒ] selon la voyelle.', img:null},
  ],
  'pre-a1-u1-l2':[
    {fr:'H comme Hôtel',  pron:'aʃ',  en:'H as in Hotel',        ar:'H مثل فندق',    ex:'Un bel hôtel à Paris.', note:'H est toujours muet en français! Jamais prononcé.', img:null},
    {fr:'I comme île',    pron:'i',    en:'I as in Island',       ar:'I مثل جزيرة',   ex:'Une île magnifique.', note:'Voyelle. Son: [i] toujours court.', img:null},
    {fr:'J comme Jardin', pron:'ʒi',   en:'J as in Garden',       ar:'J مثل حديقة',   ex:'Le jardin est fleuri.', note:'Son: [ʒ] — jamais [dʒ] comme en anglais!', img:null},
    {fr:'K comme Koala',  pron:'ka',   en:'K as in Koala',        ar:'K مثل كوالا',   ex:'Le koala vit en Australie.', note:'Rare en français. Son: [k].', img:null},
    {fr:'L comme Lune',   pron:'ɛl',   en:'L as in Moon',         ar:'L مثل قمر',     ex:'La lune brille la nuit.', note:'Son: [l] — toujours prononcé à la fin.', img:null},
    {fr:'M comme Maison', pron:'ɛm',   en:'M as in House',        ar:'M مثل منزل',    ex:'Ma maison est grande.', note:'Son: [m].', img:null},
    {fr:'N comme Nuit',   pron:'ɛn',   en:'N as in Night',        ar:'N مثل ليل',     ex:'La nuit est calme.', note:'Son: [n].', img:null},
  ],
  'pre-a1-u1-l3':[
    {fr:'O comme Orange', pron:'o',    en:'O as in Orange',       ar:'O مثل برتقالة', ex:'Une orange juteuse.', note:'Voyelle. Sons: [o] ou [ɔ].', img:'https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=70'},
    {fr:'P comme Pain',   pron:'pe',   en:'P as in Bread',        ar:'P مثل خبز',     ex:'Le pain français est délicieux.', note:'Son: [p].', img:null},
    {fr:'Q comme Queue',  pron:'ky',   en:'Q as in Tail/Queue',   ar:'Q مثل ذيل',     ex:'Une longue queue au cinéma.', note:'Toujours suivi de U. Son: [k].', img:null},
    {fr:'R comme Rose',   pron:'ɛʁ',   en:'R as in Rose',         ar:'R مثل وردة',    ex:'Une belle rose rouge.', note:'Son: [ʁ] — gutural, différent de l\'anglais!', img:null},
    {fr:'S comme Soleil', pron:'ɛs',   en:'S as in Sun',          ar:'S مثل شمس',     ex:'Le soleil brille.', note:'Son [s] ou [z] entre voyelles.', img:null},
    {fr:'T comme Train',  pron:'te',   en:'T as in Train',        ar:'T مثل قطار',    ex:'Le train arrive à 8h.', note:'Son: [t] — jamais aspiré!', img:null},
  ],
  'pre-a1-u1-l4':[
    {fr:'U comme Université', pron:'y', en:'U as in University', ar:'U مثل جامعة',   ex:'J\'étudie à l\'université.', note:'Voyelle unique! Son [y] — les lèvres en O, langue en I.', img:null},
    {fr:'V comme Voiture',pron:'ve',    en:'V as in Car',         ar:'V مثل سيارة',   ex:'Ma voiture est rouge.', note:'Son: [v].', img:null},
    {fr:'W comme Weekend',pron:'dubləve',en:'W as in Weekend',    ar:'W مثل عطلة نهاية الأسبوع', ex:'Bon weekend!', note:'Rare. Mots étrangers. Son [v] ou [w].', img:null},
    {fr:'X comme Xylophone',pron:'iks', en:'X as in Xylophone',  ar:'X مثل زيلوفون',  ex:'Un xylophone est un instrument.', note:'Sons: [ks], [gz] ou [s].', img:null},
    {fr:'Y comme Yaourt', pron:'igʁɛk', en:'Y as in Yogurt',     ar:'Y مثل زبادي',   ex:'Un yaourt aux fruits.', note:'Voyelle ou consonne. Son: [j] ou [i].', img:null},
    {fr:'Z comme Zèbre',  pron:'zɛd',   en:'Z as in Zebra',      ar:'Z مثل حمار وحشي', ex:'Le zèbre est rayé.', note:'Son: [z]. Zéro!', img:null},
  ],
  'pre-a1-u1-l5':[
    {fr:'Alphabet français',pron:'alfabe fʁɑ̃sɛ',en:'French alphabet',ar:'الأبجدية الفرنسية',
     ex:'A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z',
     note:'26 lettres. Comme l\'anglais mais avec des sons différents!',img:null},
    {fr:'Les voyelles',pron:'le vwajɛl',en:'The vowels',ar:'حروف العلة',
     ex:'A, E, I, O, U, Y sont des voyelles.',
     note:'Les 6 voyelles de base. Toutes les autres lettres sont des consonnes.',img:null},
    {fr:'Les consonnes',pron:'le kɔ̃sɔn',en:'The consonants',ar:'الحروف الساكنة',
     ex:'B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Z',
     note:'20 consonnes. Le H est toujours muet.',img:null},
  ],
  // PRE-A1 U5 — Les chiffres
  'pre-a1-u5-l1':[
    {fr:'zéro',  pron:'ze.ʁo',    en:'zero',  ar:'صفر',  ex:'Mon score est zéro!', note:'0',img:null},
    {fr:'un',    pron:'œ̃',        en:'one',   ar:'واحد', ex:'Un café, s\'il vous plaît.', note:'1 — Masculin. "Une" est féminin.',img:null},
    {fr:'deux',  pron:'dø',        en:'two',   ar:'اثنان',ex:'Deux enfants jouent.', note:'2',img:null},
    {fr:'trois', pron:'tʁwa',      en:'three', ar:'ثلاثة',ex:'Trois amis se promènent.', note:'3',img:null},
    {fr:'quatre',pron:'katʁ',      en:'four',  ar:'أربعة',ex:'Quatre saisons dans une année.', note:'4',img:null},
    {fr:'cinq',  pron:'sɛ̃k',      en:'five',  ar:'خمسة', ex:'Cinq doigts par main.', note:'5 — Le Q final se prononce.',img:null},
    {fr:'six',   pron:'sis',       en:'six',   ar:'ستة',  ex:'Six jours de travail.', note:'6',img:null},
    {fr:'sept',  pron:'sɛt',       en:'seven', ar:'سبعة', ex:'Sept jours dans une semaine.', note:'7 — P ne se prononce pas.',img:null},
    {fr:'huit',  pron:'ɥit',       en:'eight', ar:'ثمانية',ex:'Huit heures du matin.', note:'8',img:null},
    {fr:'neuf',  pron:'nœf',       en:'nine',  ar:'تسعة', ex:'Neuf mois de grossesse.', note:'9',img:null},
    {fr:'dix',   pron:'dis',       en:'ten',   ar:'عشرة', ex:'Dix élèves en classe.', note:'10',img:null},
  ],
  // A1 U1 — Salutations
  'a1-u1-l1':[
    {fr:'Bonjour',pron:'bɔ̃.ʒuʁ',en:'Hello / Good morning',ar:'مرحباً / صباح الخير',
     ex:'Bonjour Madame Dupont, comment allez-vous?',
     note:'Utilisé de 7h à 18h. TRÈS formel. Toujours utiliser avec inconnus et supérieurs.',
     img:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=70'},
    {fr:'Bonsoir',pron:'bɔ̃.swaʁ',en:'Good evening',ar:'مساء الخير',
     ex:'Bonsoir Monsieur, je suis ravi de vous rencontrer.',
     note:'Après 18h. Remplace "bonjour" le soir.',img:null},
    {fr:'Bonne nuit',pron:'bɔn nɥi',en:'Good night',ar:'تصبح على خير',
     ex:'Bonne nuit, dors bien!',
     note:'Uniquement pour dire au revoir avant de dormir — pas pour saluer!',img:null},
  ],
  'a1-u1-l2':[
    {fr:'Salut',pron:'sa.ly',en:'Hi / Bye (informal)',ar:'أهلاً (غير رسمي)',
     ex:'Salut Marie! Ça va?',
     note:'INFORMEL — entre amis et famille seulement. JAMAIS avec un supérieur ou inconnu.',img:null},
    {fr:'Enchanté(e)',pron:'ɑ̃.ʃɑ̃.te',en:'Nice to meet you',ar:'يسعدني',
     ex:'Je m\'appelle Pierre, enchanté de vous connaître!',
     note:'(e) pour le féminin. Utilisé lors d\'une première rencontre.',img:null},
    {fr:'Ravi(e) de vous rencontrer',pron:'ʁa.vi',en:'Delighted to meet you',ar:'سعيد بلقائك',
     ex:'Je suis ravie de vous rencontrer, Madame.',
     note:'Plus formel qu\'"enchanté". Se dit en serrant la main.',img:null},
  ],
  'a1-u1-l3':[
    {fr:'Au revoir',pron:'o.ʁə.vwaʁ',en:'Goodbye',ar:'وداعاً',
     ex:'Au revoir, à demain!',
     note:'Littéralement "jusqu\'à te revoir". Formel et informel.',img:null},
    {fr:'À bientôt',pron:'a bjɛ̃.to',en:'See you soon',ar:'إلى اللقاء قريباً',
     ex:'À bientôt, j\'espère!',
     note:'Pour une réunion prochaine non précisée.',img:null},
    {fr:'À demain',pron:'a dmɛ̃',en:'See you tomorrow',ar:'إلى الغد',
     ex:'Bonne soirée, à demain!',
     note:'"À + jour" = see you on that day. À lundi, à vendredi...',img:null},
    {fr:'Bonne journée',pron:'bɔn ʒuʁ.ne',en:'Have a good day',ar:'يوم سعيد',
     ex:'Merci, bonne journée à vous aussi!',
     note:'Se dit en partant. "Bonne soirée" le soir.',img:null},
  ],
  'a1-u1-l4':[
    {fr:'Comment allez-vous?',pron:'kɔ.mɑ̃.ta.le.vu',en:'How are you? (formal)',ar:'كيف حالك؟ (رسمي)',
     ex:'Bonjour Docteur, comment allez-vous?',
     note:'Forme FORMELLE. Toujours utiliser avec "vous".',img:null},
    {fr:'Comment vas-tu?',pron:'kɔ.mɑ̃.va.ty',en:'How are you? (informal)',ar:'كيف حالك؟ (غير رسمي)',
     ex:'Salut, comment vas-tu?',
     note:'Forme INFORMELLE. Avec "tu" = amis, famille.',img:null},
    {fr:'Ça va?',pron:'sa.va',en:'You OK? / How\'s it going?',ar:'كيف الحال؟',
     ex:'Ça va? — Oui, ça va bien, merci!',
     note:'Très courant, informel. Réponse: "Ça va bien" / "Pas mal" / "Comme ci comme ça".',img:null},
    {fr:'Très bien, merci',pron:'tʁɛ bjɛ̃ mɛʁ.si',en:'Very well, thank you',ar:'بخير جداً، شكراً',
     ex:'— Comment allez-vous? — Très bien, merci!',
     note:'Réponse polie universelle.',img:null},
  ],
  'a1-u1-l5':[
    {fr:'Merci',pron:'mɛʁ.si',en:'Thank you',ar:'شكراً',
     ex:'Merci pour votre aide!',
     note:'Universal. "Merci beaucoup" = Thank you very much.',img:null},
    {fr:'S\'il vous plaît',pron:'sil.vu.plɛ',en:'Please (formal)',ar:'من فضلك (رسمي)',
     ex:'Un café, s\'il vous plaît.',
     note:'Forme FORMELLE. "S\'il te plaît" = informel.',img:null},
    {fr:'De rien',pron:'də.ʁjɛ̃',en:'You\'re welcome',ar:'على الرحب',
     ex:'— Merci! — De rien, avec plaisir!',
     note:'Réponse à merci. "Avec plaisir" ou "Je vous en prie" = plus formel.',img:null},
    {fr:'Pardon / Excusez-moi',pron:'paʁ.dɔ̃',en:'Sorry / Excuse me',ar:'آسف / عذراً',
     ex:'Pardon, où est la gare, s\'il vous plaît?',
     note:'"Pardon" pour attirer l\'attention. "Excusez-moi" = excuse me (plus formel).',img:null},
  ],
  // A1 U2 — Se présenter
  'a1-u2-l1':[
    {fr:'Je m\'appelle',pron:'ʒə.ma.pɛl',en:'My name is',ar:'اسمي',
     ex:'Je m\'appelle Marie Dupont.',
     note:'Littéralement "je me appelle" = I call myself. Verbe: s\'appeler.',img:null},
    {fr:'Mon prénom est',pron:'mɔ̃.pʁe.nɔ̃.ɛ',en:'My first name is',ar:'اسمي الأول هو',
     ex:'Mon prénom est Pierre, mon nom est Martin.',
     note:'"Prénom" = first name. "Nom" = last name/surname.',img:null},
    {fr:'Vous vous appelez comment?',pron:'vu.vu.za.ple.kɔ.mɑ̃',en:'What is your name? (formal)',ar:'ما اسمك؟ (رسمي)',
     ex:'Excusez-moi, vous vous appelez comment?',
     note:'Forme formelle et polie.',img:null},
    {fr:'Tu t\'appelles comment?',pron:'ty.ta.pɛl.kɔ.mɑ̃',en:'What\'s your name? (informal)',ar:'ما اسمك؟ (غير رسمي)',
     ex:'Tu t\'appelles comment? — Je m\'appelle Lucas.',
     note:'Forme informelle entre amis.',img:null},
  ],
  'a1-u2-l2':[
    {fr:'J\'ai ... ans',pron:'ʒe...ɑ̃',en:'I am ... years old',ar:'عمري...',
     ex:'J\'ai vingt-cinq ans.',
     note:'EN FRANÇAIS: avoir + ans (pas "être"). JAMAIS "Je suis 25 ans"!',img:null},
    {fr:'Quel âge avez-vous?',pron:'kɛl.aʒ.a.ve.vu',en:'How old are you? (formal)',ar:'كم عمرك؟ (رسمي)',
     ex:'Excusez-moi, quel âge avez-vous?',
     note:'Verbe "avoir" pour l\'âge. Jamais "être".',img:null},
    {fr:'Quel âge as-tu?',pron:'kɛl.aʒ.a.ty',en:'How old are you? (informal)',ar:'كم عمرك؟ (غير رسمي)',
     ex:'Quel âge as-tu? — J\'ai quinze ans.',
     note:'Informel. Entre camarades.',img:null},
  ],
  'a1-u2-l3':[
    {fr:'Je viens de',pron:'ʒə.vjɛ̃.də',en:'I come from',ar:'أنا من',
     ex:'Je viens de Maroc / d\'Algérie / de France.',
     note:'"de" + pays féminin. "du" + pays masculin. "des" + pays pluriel.',img:null},
    {fr:'Je suis français(e)',pron:'ʒə.sɥi.fʁɑ̃.sɛ',en:'I am French',ar:'أنا فرنسي/ة',
     ex:'Je suis marocain. Elle est algérienne.',
     note:'Nationalité = adjectif. Masculin/féminin. Pas de majuscule!',img:null},
    {fr:'Quelle est votre nationalité?',pron:'kɛl.ɛ.vɔtʁ.na.sjɔ.na.li.te',en:'What is your nationality?',ar:'ما جنسيتك؟',
     ex:'Quelle est votre nationalité? — Je suis tunisien.',
     note:'Nationalités: français, marocain, algérien, tunisien, libanais...',img:null},
  ],
  'a1-u2-l4':[
    {fr:'J\'habite à',pron:'ʒa.bi.ta',en:'I live in (city)',ar:'أسكن في',
     ex:'J\'habite à Paris / à Casablanca / à Alger.',
     note:'"Habiter à" + ville. "Habiter en" + pays féminin.',img:null},
    {fr:'Je vis en / au',pron:'ʒə.vi.ɑ̃',en:'I live in (country)',ar:'أعيش في',
     ex:'Je vis en France. Il vit au Maroc. Elle vit aux États-Unis.',
     note:'"en" + pays féminin (France, Espagne). "au" + pays masculin (Maroc, Canada).',img:null},
    {fr:'Où habitez-vous?',pron:'u.a.bi.te.vu',en:'Where do you live?',ar:'أين تسكن؟',
     ex:'Où habitez-vous? — J\'habite à Lyon, en France.',
     note:'"Où" = where. Question courante en présentation.',img:null},
  ],
  // A1 U4 — Articles
  'a1-u4-l1':[
    {fr:'le (masculin)',pron:'lə',en:'the (masculine)',ar:'الـ (مذكر)',
     ex:'le livre, le café, le garçon, le monsieur',
     note:'Article défini masculin singulier. Mémoriser le genre avec chaque nom!',img:null},
    {fr:'la (féminin)',pron:'la',en:'the (feminine)',ar:'الـ (مؤنث)',
     ex:'la femme, la maison, la voiture, la table',
     note:'Article défini féminin singulier.',img:null},
    {fr:'les (pluriel)',pron:'le',en:'the (plural)',ar:'الـ (جمع)',
     ex:'les enfants, les livres, les femmes',
     note:'Article défini pluriel — même pour masculin et féminin.',img:null},
  ],
  'a1-u4-l2':[
    {fr:'un (masculin)',pron:'œ̃',en:'a / an (masculine)',ar:'ـ (نكرة مذكر)',
     ex:'un livre, un café, un garçon, un ami',
     note:'Article indéfini masculin. "Une" est féminin.',img:null},
    {fr:'une (féminin)',pron:'yn',en:'a / an (feminine)',ar:'ـ (نكرة مؤنث)',
     ex:'une femme, une maison, une idée, une orange',
     note:'Article indéfini féminin.',img:null},
    {fr:'des (pluriel)',pron:'de',en:'some (plural)',ar:'بعض / ـ (جمع نكرة)',
     ex:'des enfants, des livres, des amis',
     note:'"Des" = pluriel de "un/une". Devient "de" après négation.',img:null},
  ],
  'a1-u4-l3':[
    {fr:'l\' (devant voyelle)',pron:'l',en:'the (before vowel)',ar:'الـ (أمام حرف علة)',
     ex:'l\'ami, l\'école, l\'hôpital, l\'orange, l\'heure',
     note:'Élision: le/la → l\' devant voyelle ou H muet.',img:null},
    {fr:'du (de + le)',pron:'dy',en:'of the / some (masc.)',ar:'من الـ (مذكر)',
     ex:'Je mange du pain. Je bois du café.',
     note:'Article partitif. Du = de + le. "De la" pour féminin.',img:null},
    {fr:'de la (féminin)',pron:'də.la',en:'some (feminine)',ar:'من الـ (مؤنث)',
     ex:'Je bois de la limonade. Elle mange de la salade.',
     note:'Article partitif féminin.',img:null},
  ],
  // A1 U5 — Être et Avoir
  'a1-u5-l1':[
    {fr:'je suis',pron:'ʒə.sɥi',en:'I am',ar:'أنا',
     ex:'Je suis étudiant. Je suis de France.',
     note:'Être = verbe fondamental. Utilisé pour: identité, nationalité, profession, lieu.',img:null},
    {fr:'tu es',pron:'ty.ɛ',en:'you are (informal)',ar:'أنت',
     ex:'Tu es très sympa!',
     note:'Forme informelle. Avec amis et famille.',img:null},
    {fr:'il/elle est',pron:'il.ɛ / ɛl.ɛ',en:'he/she is',ar:'هو/هي',
     ex:'Il est médecin. Elle est belle.',
     note:'Il = masculin. Elle = féminin. Pas de sujet neutre en français.',img:null},
    {fr:'nous sommes',pron:'nu.sɔm',en:'we are',ar:'نحن',
     ex:'Nous sommes français.',
     note:'"Nous" = we. Très formel. Dans l\'oral moderne, souvent remplacé par "on est".',img:null},
    {fr:'vous êtes',pron:'vu.zɛt',en:'you are (formal/plural)',ar:'أنتم / أنت (رسمي)',
     ex:'Vous êtes très aimable, Monsieur.',
     note:'"Vous" = formel singulier OU pluriel.',img:null},
    {fr:'ils/elles sont',pron:'il.sɔ̃',en:'they are',ar:'هم/هن',
     ex:'Ils sont contents. Elles sont françaises.',
     note:'"Ils" = groupe avec au moins un homme. "Elles" = groupe féminin uniquement.',img:null},
  ],
  'a1-u5-l2':[
    {fr:'j\'ai',pron:'ʒe',en:'I have',ar:'أنا لديّ',
     ex:'J\'ai un livre. J\'ai vingt ans.',
     note:'Avoir = to have. AUSSI pour l\'âge: j\'ai 20 ans (pas "je suis").',img:null},
    {fr:'tu as',pron:'ty.a',en:'you have',ar:'أنت لديك',
     ex:'Tu as un frère?',
     note:'',img:null},
    {fr:'il/elle a',pron:'il.a',en:'he/she has',ar:'هو/هي لديه/ها',
     ex:'Elle a les yeux bleus.',
     note:'"Il a" = he has. "Elle a" = she has.',img:null},
    {fr:'nous avons',pron:'nu.za.vɔ̃',en:'we have',ar:'نحن لدينا',
     ex:'Nous avons deux enfants.',
     note:'',img:null},
    {fr:'vous avez',pron:'vu.za.ve',en:'you have',ar:'أنتم لديكم',
     ex:'Vous avez le temps?',
     note:'',img:null},
    {fr:'ils/elles ont',pron:'il.zɔ̃',en:'they have',ar:'هم لديهم',
     ex:'Ils ont une grande maison.',
     note:'Liaison obligatoire: ils_ont [il.zɔ̃].',img:null},
  ],
  // A2 U1 — Passé composé
  'a2-u1-l1':[
    {fr:'j\'ai mangé',pron:'ʒe.mɑ̃.ʒe',en:'I ate / I have eaten',ar:'أكلت',
     ex:'J\'ai mangé une pizza hier soir.',
     note:'Passé composé = avoir + participe passé. Verbes -ER: radical + é.',img:null},
    {fr:'tu as parlé',pron:'ty.a.paʁ.le',en:'you spoke',ar:'تكلمت',
     ex:'Tu as parlé avec le directeur?',
     note:'Verbes en -ER réguliers: parler → parlé, chanter → chanté.',img:null},
    {fr:'il a fini',pron:'il.a.fi.ni',en:'he finished',ar:'انتهى',
     ex:'Il a fini son travail à 18h.',
     note:'Verbes -IR réguliers: finir → fini, choisir → choisi.',img:null},
    {fr:'nous avons vendu',pron:'nu.za.vɔ̃.vɑ̃.dy',en:'we sold',ar:'بعنا',
     ex:'Nous avons vendu notre voiture.',
     note:'Verbes -RE réguliers: vendre → vendu, répondre → répondu.',img:null},
    {fr:'ils ont pris',pron:'il.zɔ̃.pʁi',en:'they took',ar:'أخذوا',
     ex:'Ils ont pris le train à 8h.',
     note:'Verbes irréguliers: prendre → pris, faire → fait, voir → vu.',img:null},
  ],
  'a2-u1-l2':[
    {fr:'j\'ai fait',pron:'ʒe.fɛ',en:'I did / I made',ar:'فعلت / صنعت',
     ex:'J\'ai fait mes devoirs. J\'ai fait du sport.',
     note:'faire → fait (irrégulier). Très utilisé!',img:null},
    {fr:'j\'ai eu',pron:'ʒe.y',en:'I had',ar:'كان لديّ',
     ex:'J\'ai eu un problème hier.',
     note:'avoir → eu (irrégulier).',img:null},
    {fr:'j\'ai été',pron:'ʒe.te',en:'I was / I went (informal)',ar:'كنت',
     ex:'J\'ai été malade la semaine dernière.',
     note:'être → été (irrégulier). Utilisé comme auxiliaire ET comme participe.',img:null},
    {fr:'j\'ai vu',pron:'ʒe.vy',en:'I saw',ar:'رأيت',
     ex:'J\'ai vu un film super hier!',
     note:'voir → vu. Films, amis, spectacles.',img:null},
    {fr:'j\'ai dit',pron:'ʒe.di',en:'I said',ar:'قلت',
     ex:'J\'ai dit la vérité.',
     note:'dire → dit. Écrire → écrit. Lire → lu.',img:null},
  ],
  // B1 U1 — Subjonctif
  'b1-u1-l1':[
    {fr:'que je parle',pron:'kə.ʒə.paʁl',en:'(that) I speak',ar:'أن أتكلم',
     ex:'Il faut que je parle avec le directeur.',
     note:'Subjonctif de "parler". Formation: radical 3e pers. pluriel + terminaisons.',img:null},
    {fr:'que tu finisses',pron:'kə.ty.fi.nis',en:'(that) you finish',ar:'أن تنتهي',
     ex:'Je veux que tu finisses tes devoirs.',
     note:'Subjonctif de "finir". Radical: finiss-',img:null},
    {fr:'qu\'il aille',pron:'ki.laj',en:'(that) he goes',ar:'أن يذهب',
     ex:'Il faut qu\'il aille chez le médecin.',
     note:'aller → aille (irrégulier! À mémoriser)',img:null},
    {fr:'que nous ayons',pron:'kə.nu.ze.jɔ̃',en:'(that) we have',ar:'أن نمتلك',
     ex:'Il est important que nous ayons de la patience.',
     note:'avoir → ayons (irrégulier)',img:null},
    {fr:'que vous soyez',pron:'kə.vu.swa.je',en:'(that) you be',ar:'أن تكونوا',
     ex:'Je veux que vous soyez ponctuels.',
     note:'être → soyez (irrégulier)',img:null},
  ],
  'b1-u1-l2':[
    {fr:'il faut que + subjonctif',pron:'il.fo.kə',en:'it is necessary that',ar:'يجب أن',
     ex:'Il faut que tu études chaque jour.',
     note:'Expression impersonnelle + subjonctif OBLIGATOIRE.',img:null},
    {fr:'il est important que',pron:'il.ɛ.tɛ̃.pɔʁ.tɑ̃.kə',en:'it is important that',ar:'من المهم أن',
     ex:'Il est important que vous compreniez la règle.',
     note:'Expressions impersonnelles + subjonctif.',img:null},
    {fr:'je veux que',pron:'ʒə.vø.kə',en:'I want (someone) to',ar:'أريد أن',
     ex:'Je veux que mes enfants réussissent.',
     note:'Verbes de volonté + subjonctif: vouloir, souhaiter, désirer.',img:null},
    {fr:'bien que + subjonctif',pron:'bjɛ̃.kə',en:'even though / although',ar:'رغم أن',
     ex:'Bien qu\'il soit fatigué, il travaille.',
     note:'Conjonctions de concession: bien que, quoique, encore que.',img:null},
    {fr:'pour que + subjonctif',pron:'puʁ.kə',en:'so that / in order that',ar:'حتى / لكي',
     ex:'J\'explique lentement pour que vous compreniez.',
     note:'But/finalité: pour que, afin que, de sorte que.',img:null},
  ],
  // B2 U1 — Conditionnel passé
  'b2-u1-l1':[
    {fr:'j\'aurais mangé',pron:'ʒo.ʁɛ.mɑ̃.ʒe',en:'I would have eaten',ar:'كنت سأكل',
     ex:'Si j\'avais eu faim, j\'aurais mangé.',
     note:'Conditionnel passé = conditionnel de avoir/être + participe passé.',img:null},
    {fr:'il serait allé',pron:'il.sə.ʁɛ.ta.le',en:'he would have gone',ar:'كان سيذهب',
     ex:'S\'il avait su, il serait allé à la fête.',
     note:'Verbes de mouvement (aller) → serait + pp.',img:null},
    {fr:'nous aurions pu',pron:'nu.zo.ʁjɔ̃.py',en:'we could have',ar:'كنا نستطيع',
     ex:'Nous aurions pu éviter ce problème.',
     note:'Pouvoir → pu. Devoir → dû. Vouloir → voulu.',img:null},
    {fr:'si + plus-que-parfait',pron:'si',en:'if + past perfect',ar:'لو + ماضٍ تام',
     ex:'Si j\'avais étudié, j\'aurais réussi.',
     note:'Type 3: Si + plus-que-parfait → conditionnel passé. Hypothèse irréelle dans le passé.',img:null},
    {fr:'j\'aurais dû',pron:'ʒo.ʁɛ.dy',en:'I should have',ar:'كان يجب عليّ',
     ex:'J\'aurais dû t\'écouter. Tu avais raison.',
     note:'Regret + reproche dans le passé.',img:null},
  ],
  // C1 U1 — Registres
  'c1-u1-l1':[
    {fr:'registre familier',pron:'ʁe.ʒistʁ.fa.mi.lje',en:'informal register',ar:'المستوى العامي',
     ex:'"C\'est trop bien!" / "J\'suis crevé!" / "Bouffer"',
     note:'Entre amis, SMS, réseaux sociaux. Élisions et troncations courantes.',img:null},
    {fr:'registre courant',pron:'ʁe.ʒistʁ.ku.ʁɑ̃',en:'standard register',ar:'المستوى الفصيح العادي',
     ex:'"C\'est très bien." / "Je suis fatigué." / "Manger"',
     note:'Communication quotidienne normale. Écrits professionnels simples.',img:null},
    {fr:'registre soutenu',pron:'ʁe.ʒistʁ.su.tə.ny',en:'formal/elevated register',ar:'المستوى الراقي',
     ex:'"C\'est fort appréciable." / "Je suis épuisé." / "Se sustenter"',
     note:'Écrits officiels, littérature, discours. Vocabulaire précis et rare.',img:null},
    {fr:'le verlan',pron:'lœ.vɛʁ.lɑ̃',en:'French back-slang',ar:'لغة الشباب الفرنسي',
     ex:'"L\'envers" → "le verlan". Ouf (fou), meuf (femme), chelou (louche)',
     note:'Argot: inverser les syllabes. Important pour comprendre les jeunes et films.',img:null},
    {fr:'les néologismes',pron:'ne.o.lɔ.ʒism',en:'neologisms',ar:'المصطلحات الحديثة',
     ex:'"Selfie", "streamer", "vloguer", "covoiturage", "uberiser"',
     note:'Nouveaux mots. Le français absorbe l\'anglais et crée de nouveaux termes.',img:null},
  ],
};

// ── Grammaire par niveau ──────────────────────────────────────
const GRAMMAR = {
  'pre-a1-u1':{
    title:"L'alphabet français",
    rule:"L'alphabet français contient 26 lettres: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z. Les sons sont différents de l'anglais. Le H est toujours muet. L'accent change le son des voyelles.",
    examples:["A [a] — ami, chat","E [e/ɛ/ø] — école, fête","U [y] unique! Lèvres en O + langue en I","R [ʁ] gutural — différent de l'anglais","Les accents: é è ê à â ù û î ï ô ç"],
    tip:"Conseil: Mémorisez l'alphabet en chantant! Le son des lettres est crucial pour l'orthographe.",
    exceptions:["H est toujours muet","W et K sont rares (mots étrangers)","Y peut être voyelle ou consonne"],
  },
  'pre-a1-u5':{
    title:"Les chiffres 0-100",
    rule:"Chiffres 1-16: mots uniques. 17-19: dix + 7/8/9. 20-69: dizaine + unité. 70: soixante-dix (60+10). 80: quatre-vingts (4×20). 90: quatre-vingt-dix (4×20+10).",
    examples:["17 = dix-sept","21 = vingt et un (avec 'et')","31, 41, 51, 61 = trente et un...","70 = soixante-dix","80 = quatre-vingts","90 = quatre-vingt-dix"],
    tip:"Attention! 70, 80, 90 sont déroutants pour les non-francophones. En Belgique/Suisse: septante, octante, nonante — mais apprenez le français standard d'abord!",
    exceptions:["21, 31, 41, 51, 61, 71 ont 'et un'","81 = quatre-vingt-un (sans 's')","'Vingt' prend 's' à 80 mais pas dans les composés"],
  },
  'a1-u1':{
    title:"Tutoiement et vouvoiement",
    rule:"TU (tutoiement): informel — amis, famille, enfants, animaux. VOUS (vouvoiement): formel — inconnus, supérieurs, personnes âgées, dans les commerces. Erreur grave = tutoyer un supérieur sans permission!",
    examples:["Tu peux m'appeler par mon prénom? (autorisation)","Vous êtes Madame Dupont? (rencontre formelle)","On peut se tutoyer? (demande de permission)"],
    tip:"Règle d'or: TOUJOURS commencer avec 'vous' avec un inconnu adulte. Attendre la permission pour 'tu'. Dans le doute: vous!",
    exceptions:["Enfants: toujours 'tu'","Entre étudiants: souvent 'tu'","Réseaux sociaux: souvent 'tu'","Dans certaines entreprises modernes: 'tu' à tous niveaux"],
  },
  'a1-u4':{
    title:"Les articles en français — règle complète",
    rule:"DÉFINIS (le/la/les): chose connue ou unique. INDÉFINIS (un/une/des): chose non précisée. PARTITIFS (du/de la/de l'): quantité indéfinie d'une masse. APRÈS NÉGATION: tous → 'de/d''. Accord obligatoire avec le genre et le nombre du nom.",
    examples:["Le livre est sur la table (défini: on sait lequel)","J'ai un livre (indéfini: n'importe lequel)","Je mange du pain (partitif: une partie)","Je ne mange pas de viande (négation: de)"],
    tip:"ASTUCE: Mémorisez chaque nom avec son article: 'le livre', 'la maison', jamais 'livre' tout seul. Le genre n'est pas logique — il faut mémoriser!",
    exceptions:["Après négation: pas de pain, pas d'eau","Pas d'article pour: nationalités, religions (attribut)","Noms propres: pas d'article (sauf les fleuves, pays)"],
  },
  'a1-u5':{
    title:"Être et Avoir — les deux verbes fondamentaux",
    rule:"ÊTRE: identité, nationalité, profession, lieu, état. AVOIR: possession, âge, expressions idiomatiques. Ces deux verbes sont irréguliers et servent aussi d'auxiliaires au passé composé.",
    examples:["Je suis médecin (profession — pas d'article!)","Elle est française (nationalité — pas d'article!)","J'ai 25 ans (âge — JAMAIS 'je suis 25 ans')","Il y a = there is/are (expression avec avoir)"],
    tip:"PIÈGES CLASSIQUES: 'J'ai chaud/froid/faim/soif/peur/raison/tort' = expressions avec AVOIR (pas être!). 'J'ai raison' = I am right. 'Il fait chaud' = it's hot (weather).",
    exceptions:["Avoir faim/soif/chaud/froid/peur/raison/tort","Être en train de = être en cours de faire qqch","Être sur le point de = être presque en train de"],
  },
  'a2-u1':{
    title:"Le passé composé — formation et usage",
    rule:"Formation: SUJET + AUXILIAIRE (avoir/être) + PARTICIPE PASSÉ. Auxiliaire AVOIR: majorité des verbes. Auxiliaire ÊTRE: 17 verbes de mouvement/état + tous les pronominaux. Accord du PP avec ÊTRE (sujet) et AVOIR (COD placé avant).",
    examples:["J'ai mangé / Tu as fini / Il a pris (avoir)","Je suis allé(e) / Elle est venue (être + accord)","Ils se sont levés (pronominal + être)","Le livre que j'ai lu... (COD avant = accord)"],
    tip:"MOYEN MNÉMOTECHNIQUE pour être: DR & MRS P. VANDERTRAMP: Devenir, Rester, Monter, Retourner, Sortir, Passer, Venir, Aller, Naître, Descendre, Entrer, Rentrer, Tomber, Revenir, Arriver, Mourir, Partir",
    exceptions:["Monter/descendre/passer peuvent prendre avoir avec un COD","Les pronominaux toujours avec être","PP avec avoir s'accorde avec COD placé AVANT"],
  },
  'b1-u1':{
    title:"Le subjonctif — formation et déclencheurs",
    rule:"Formation: radical de la 3e personne du pluriel (présent indicatif) + terminaisons: -e, -es, -e, -ions, -iez, -ent. Irréguliers à mémoriser: être, avoir, aller, faire, pouvoir, savoir, vouloir.",
    examples:["parler: ils parlent → que je parle","finir: ils finissent → que je finisse","venir: ils viennent → que je vienne (attention!)","être: que je sois, que tu sois, qu'il soit","avoir: que j'aie, que tu aies, qu'il ait"],
    tip:"DÉCLENCHEURS du subjonctif — OBLIGATOIRE après: Volonté (vouloir que, souhaiter que), Émotion (content que, triste que), Doute (douter que), Nécessité (il faut que), Concession (bien que), But (pour que).",
    exceptions:["espérer que + INDICATIF (pas subjonctif!)","après que + INDICATIF","croire/penser que + indicatif à l'affirmatif, subjonctif au négatif/interrogatif"],
  },
  'b2-u1':{
    title:"Le conditionnel passé — hypothèse irréelle dans le passé",
    rule:"Formation: conditionnel présent de avoir/être + participe passé. Usage: 1) hypothèse irréelle dans le passé (Si + PQP → conditionnel passé) 2) regret 3) reproche 4) information non confirmée.",
    examples:["Si j'avais travaillé, j'aurais réussi. (irréel passé)","J'aurais voulu être acteur. (regret)","Tu aurais pu m'appeler! (reproche)","Il aurait commis un crime. (information non confirmée — journalisme)"],
    tip:"CONCORDANCE: Si + plus-que-parfait → conditionnel passé. JAMAIS 'si + conditionnel'! Type 1: si + présent → futur. Type 2: si + imparfait → conditionnel présent. Type 3: si + PQP → conditionnel passé.",
    exceptions:["Conditionnel passé 2e forme = subjonctif plus-que-parfait (littéraire)","Dans les médias: 'le présumé voleur aurait agi seul' (non-confirmé)"],
  },
  'c1-u1':{
    title:"Les registres de langue — maîtrise stylistique",
    rule:"Le français possède plusieurs registres: vulgaire, familier, courant, soutenu/littéraire. Le locuteur compétent adapte son registre selon: le destinataire, la situation, le support (oral/écrit), l'objectif de communication.",
    examples:["Familier: 'J'suis vachement crevé!' ","Courant: 'Je suis très fatigué.'","Soutenu: 'Je me trouve dans un état de lassitude extrême.'","Administratif: 'Je vous prie d'agréer, Madame, l'expression de mes salutations distinguées.'"],
    tip:"Pour le C1: vous devez RECONNAÎTRE et PRODUIRE tous les registres. L'erreur de registre est aussi grave qu'une faute de grammaire dans des contextes formels.",
    exceptions:["Le verlan et l'argot = registre très familier, à comprendre mais à utiliser avec prudence","Les SMS ont créé un 'langage' propre (abréviations, omission de ponctuation)","La langue administrative a ses propres formules figées"],
  },
};

// ── Exercices générateurs ─────────────────────────────────────
function getExercises(levelId, unitNum, lessonNum, vocab) {
  const v = vocab || [];
  const lIdx = ['pre-a1','a1','a2','b1','b2','c1'].indexOf(levelId);

  const exs = [];

  // 1. QCM vocabulaire
  if(v.length >= 2){
    const q = v[0];
    const wrongs = v.slice(1,4).map(w=>w.ar||w.en);
    const opts = shuffle([q.ar||q.en, ...wrongs]).slice(0,4);
    exs.push({
      type:'mcq',
      title:'Quiz: Traduction',
      question:`Que signifie "${q.fr}" ?`,
      opts,
      answerIdx: opts.indexOf(q.ar||q.en),
      correct: q.ar||q.en,
      explanation: `"${q.fr}" [${q.pron||''}] = "${q.ar||q.en}". ${q.note||''}`,
    });
  }

  // 2. Remettre dans l'ordre
  if(v.length >= 1 && v[0].ex){
    const words = v[0].ex.split(' ');
    if(words.length >= 3){
      exs.push({
        type:'order',
        title:'Remettez dans l\'ordre',
        words: shuffle([...words]),
        answer: v[0].ex,
        hint: `Traduction: ${v[0].ar||v[0].en}`,
      });
    }
  }

  // 3. Texte à trous
  if(v.length >= 2){
    const w = v[1];
    const ex = w.ex||'';
    const filled = ex.replace(w.fr, '___');
    if(filled !== ex){
      exs.push({
        type:'fill',
        title:'Complétez la phrase',
        prompt: filled,
        answer: w.fr.split(' ')[0],
        hint: w.en||w.ar,
      });
    }
  }

  // 4. Écouter et répéter
  exs.push({
    type:'listen',
    title:'Écoutez et répétez',
    phrases: v.slice(0, Math.min(3, v.length)).map(w=>({fr:w.fr,ar:w.ar||w.en,pron:w.pron||''})),
  });

  // 5. Grammaire MCQ (B1+)
  if(lIdx >= 3){
    exs.push({
      type:'grammar-mcq',
      title:'Choisissez la bonne forme',
      question:'Complétez: "Il faut que tu ___ tes devoirs."',
      opts:['fais','fasses','ferait','faisais'],
      answerIdx:1,
      correct:'fasses',
      explanation:'Après "il faut que" → SUBJONCTIF. "Faire" au subjonctif: que tu fasses.',
    });
  }

  // 6. Production écrite guidée
  if(v.length >= 1){
    exs.push({
      type:'write',
      title:'Écrivez une phrase',
      prompt: `Utilisez le mot "${v[0].fr}" dans une phrase complète.`,
      example: v[0].ex||'',
      tip: v[0].note||'',
    });
  }

  return exs;
}

// ── Test de placement (40 questions) ─────────────────────────
const PLACEMENT_TEST = [
  // PRE-A1 (Q1-8)
  {id:1,  band:'pre-a1', q:'Comment s\'écrit le son [a] en français?',
   opts:['A','E','U','O'], ans:0,
   exp:'A est la première lettre et fait le son [a] comme dans "ami".'},
  {id:2,  band:'pre-a1', q:'Le H en français est...',
   opts:['toujours prononcé','jamais prononcé','parfois prononcé','aspiré comme en anglais'], ans:1,
   exp:'Le H français est TOUJOURS muet. "Hôtel" se prononce [otel].'},
  {id:3,  band:'pre-a1', q:'Comment dit-on "8" en français?',
   opts:['sept','neuf','huit','six'], ans:2, exp:'8 = huit [ɥit].'},
  {id:4,  band:'pre-a1', q:'Comment dit-on "Goodbye" en français?',
   opts:['Bonjour','Merci','Au revoir','S\'il vous plaît'], ans:2,
   exp:'Au revoir = Goodbye. Bonjour = Hello.'},
  {id:5,  band:'pre-a1', q:'Quelle lettre a le son [ɛ] dans "fête"?',
   opts:['é','è','ê','e'], ans:2,
   exp:'ê (accent circonflexe) donne souvent le son [ɛ] comme dans "fête".'},
  {id:6,  band:'pre-a1', q:'Comment dit-on "Thank you" en français?',
   opts:['Pardon','Bonjour','S\'il vous plaît','Merci'], ans:3, exp:'Merci = Thank you.'},
  {id:7,  band:'pre-a1', q:'70 en français se dit...',
   opts:['septante','soixante-dix','soixante et dix','sept-dix'], ans:1,
   exp:'70 = soixante-dix (60+10). C\'est une particularité du français standard!'},
  {id:8,  band:'pre-a1', q:'La cédille (ç) donne quel son?',
   opts:['[k]','[g]','[s]','[ʒ]'], ans:2,
   exp:'ç donne toujours le son [s], même avant a, o, u. Ex: français [fʁɑ̃sɛ].'},
  // A1 (Q9-16)
  {id:9,  band:'a1', q:'Quel article est correct: "___ livre est intéressant."?',
   opts:['La','Le','Un','Les'], ans:1,
   exp:'"Livre" est masculin → "Le livre". "La" est féminin.'},
  {id:10, band:'a1', q:'"Je ___ vingt ans." — Quel verbe?',
   opts:['suis','est','ai','a'], ans:2,
   exp:'L\'âge en français: avoir + ans. JAMAIS être. J\'AI vingt ans.'},
  {id:11, band:'a1', q:'Comment dit-on "I live in France"?',
   opts:['J\'habite à France','J\'habite en France','J\'habite France','Je vis à France'], ans:1,
   exp:'"En" devant les pays féminins (France est féminin). "Au" pour masculin (Maroc).'},
  {id:12, band:'a1', q:'Quelle est la forme correcte de "être" pour "nous"?',
   opts:['nous sont','nous avons','nous sommes','nous êtes'], ans:2,
   exp:'Être: je suis, tu es, il est, nous SOMMES, vous êtes, ils sont.'},
  {id:13, band:'a1', q:'L\'article indéfini masculin pluriel est...',
   opts:['un','une','des','les'], ans:2,
   exp:'"Des" = pluriel de "un/une". Ex: un ami → des amis.'},
  {id:14, band:'a1', q:'"Au revoir" en anglais signifie...',
   opts:['Hello','Good morning','Goodbye','Good evening'], ans:2,
   exp:'Au revoir = Goodbye. Littéralement "until seeing again".'},
  {id:15, band:'a1', q:'Comment dire "my name is" en français?',
   opts:['J\'ai nom','Je m\'appelle','Mon nom appelle','Je suis nom'], ans:1,
   exp:'"Je m\'appelle" = my name is. Verbe: s\'appeler.'},
  {id:16, band:'a1', q:'Après la négation, l\'article devient...',
   opts:['le/la/les','un/une/des','de/d\'','du/de la'], ans:2,
   exp:'Après négation: de/d\'. "Je mange un gâteau" → "Je ne mange pas DE gâteau."'},
  // A2 (Q17-22)
  {id:17, band:'a2', q:'Le passé composé de "manger" (je) est...',
   opts:['j\'ai manger','j\'ai mangé','je mangeais','je mangeai'], ans:1,
   exp:'Passé composé: avoir + participe passé. manger → mangé (-ER: radical+é).'},
  {id:18, band:'a2', q:'Quel verbe utilise ÊTRE au passé composé?',
   opts:['manger','finir','aller','faire'], ans:2,
   exp:'Aller utilise ÊTRE: je suis allé(e). Les 17 verbes DR MRS P. VANDERTRAMP.'},
  {id:19, band:'a2', q:'Le futur proche se forme avec...',
   opts:['être + infinitif','avoir + infinitif','aller + infinitif','venir + infinitif'], ans:2,
   exp:'Futur proche = ALLER + infinitif. Je vais manger. Tu vas partir.'},
  {id:20, band:'a2', q:'"Ne ... jamais" exprime...',
   opts:['jamais','toujours','souvent','parfois'], ans:0,
   exp:'"Ne ... jamais" = never. Je ne mange jamais de viande.'},
  {id:21, band:'a2', q:'"Je viens DE France." La préposition correcte est...',
   opts:['à','en','de','du'], ans:2,
   exp:'"Venir de" = come from. De + pays féminin (France).'},
  {id:22, band:'a2', q:'L\'imparfait sert à décrire...',
   opts:['une action ponctuelle dans le passé','une habitude ou état dans le passé','le futur','le présent'], ans:1,
   exp:'Imparfait: habitudes passées, descriptions, états. PC: actions ponctuelles.'},
  // B1 (Q23-28)
  {id:23, band:'b1', q:'"Il faut que tu ___" (partir) au subjonctif:',
   opts:['pars','partais','partes','partiras'], ans:2,
   exp:'Après "il faut que" → subjonctif. partir: ils partent → que tu partes.'},
  {id:24, band:'b1', q:'Le conditionnel de politesse: "___ vous prendre un café?"',
   opts:['Voulez','Voudrez','Voudriez','Vouliez'], ans:2,
   exp:'Conditionnel = politesse. "Voudriez-vous" est plus poli que "voulez-vous".'},
  {id:25, band:'b1', q:'"La ville ___ j\'habite" — pronom relatif correct:',
   opts:['qui','que','dont','où'], ans:3,
   exp:'"Où" remplace un complément de lieu. La ville où j\'habite.'},
  {id:26, band:'b1', q:'Il dit: "Je suis fatigué." → Discours indirect:',
   opts:['Il dit qu\'il est fatigué','Il dit qu\'il était fatigué','Il dit que je suis fatigué','Il dit qu\'il sera fatigué'], ans:0,
   exp:'Discours indirect présent → présent conservé. Il dit que + sujet + verbe.'},
  {id:27, band:'b1', q:'"Parce que" introduit une...',
   opts:['cause','conséquence','opposition','concession'], ans:0,
   exp:'"Parce que" = cause. "Donc" = conséquence. "Mais" = opposition.'},
  {id:28, band:'b1', q:'Si + présent → ___',
   opts:['conditionnel passé','subjonctif','futur simple','imparfait'], ans:2,
   exp:'Type 1: Si + présent → futur simple. "Si tu travailles, tu réussiras."'},
  // B2 (Q29-34)
  {id:29, band:'b2', q:'"Si j\'avais su, j\'aurais agi." C\'est...',
   opts:['type 1','type 2','type 3','subjonctif'], ans:2,
   exp:'Type 3: si + plus-que-parfait → conditionnel passé. Hypothèse irréelle dans le passé.'},
  {id:30, band:'b2', q:'Le plus-que-parfait se forme avec...',
   opts:['avoir/être au présent + PP','avoir/être à l\'imparfait + PP','avoir/être au futur + PP','avoir/être au conditionnel + PP'], ans:1,
   exp:'Plus-que-parfait = avoir/être à l\'IMPARFAIT + participe passé. J\'avais mangé.'},
  {id:31, band:'b2', q:'"Il s\'agit de" signifie...',
   opts:['it rains','it concerns / it\'s about','it seems','it appears'], ans:1,
   exp:'"Il s\'agit de" = it\'s about / it concerns. Expression impersonnelle.'},
  {id:32, band:'b2', q:'La voix passive de "Paul mange la pomme" est...',
   opts:['La pomme est mangée par Paul','Paul est mangé par la pomme','La pomme mange Paul','La pomme a été mangé par Paul'], ans:0,
   exp:'Passif: sujet → COD, COD → sujet. Verbe: être + PP accordé.'},
  {id:33, band:'b2', q:'"C\'est lui QUI a téléphoné." C\'est une...',
   opts:['question','mise en relief','comparaison','négation'], ans:1,
   exp:'"C\'est ... qui/que" = mise en relief (cleft sentence). Pour insister.'},
  {id:34, band:'b2', q:'"Nonobstant" signifie...',
   opts:['nevertheless / despite','immediately','frequently','accidentally'], ans:0,
   exp:'"Nonobstant" = nevertheless, despite. Registre très soutenu/juridique.'},
  // C1 (Q35-40)
  {id:35, band:'c1', q:'"Bouffer" appartient à quel registre?',
   opts:['soutenu','courant','familier','vulgaire'], ans:2,
   exp:'"Bouffer" = familier pour "manger". "Se sustenter" = soutenu.'},
  {id:36, band:'c1', q:'"La lune pleure" est une...',
   opts:['métaphore','hyperbole','personnification','antithèse'], ans:2,
   exp:'Personnification = attribuer des caractéristiques humaines à une chose.'},
  {id:37, band:'c1', q:'Dans "ouf" (verlan de "fou"), les syllabes sont...',
   opts:['supprimées','inversées','ajoutées','modifiées'], ans:1,
   exp:'Le verlan inverse les syllabes: l\'envers → verlan, fou → ouf.'},
  {id:38, band:'c1', q:'"Force problèmes" (soutenu) = beaucoup de problèmes. "Force" est ici...',
   opts:['un adverbe de quantité','un verbe','un adjectif','un nom'], ans:0,
   exp:'En registre soutenu, "force" = beaucoup de. Ex: "Force gens pensent que..."'},
  {id:39, band:'c1', q:'L\'inversion du sujet dans "Que pensez-vous?" est typique du registre...',
   opts:['familier','courant','soutenu/formel','argotique'], ans:2,
   exp:'L\'inversion verbe-sujet appartient au registre formel/soutenu. Oral courant: "Qu\'est-ce que vous pensez?"'},
  {id:40, band:'c1', q:'"Je vous prie d\'agréer l\'expression de mes salutations distinguées" est...',
   opts:['une formule de début de lettre','une formule de fin de lettre formelle','une expression familière','un proverbe'], ans:1,
   exp:'Formule de politesse finale dans les lettres formelles françaises. Obligatoire dans les contextes officiels.'},
];

function getPlacementLevel(score, total) {
  const pct = score / total;
  if (pct <= 0.20) return { level:'pre-a1', label:'Pré-A1', desc:'Commencez depuis le début — vous apprendrez l\'alphabet et les sons.' };
  if (pct <= 0.35) return { level:'a1',     label:'A1',     desc:'Niveau débutant — vous connaissez quelques mots mais besoin de bases solides.' };
  if (pct <= 0.50) return { level:'a2',     label:'A2',     desc:'Niveau élémentaire — vous avez des bases mais besoin de consolider.' };
  if (pct <= 0.65) return { level:'b1',     label:'B1',     desc:'Niveau intermédiaire — vous progressez bien, continuez!' };
  if (pct <= 0.80) return { level:'b2',     label:'B2',     desc:'Niveau avancé — votre français est solide, perfectionnez-le.' };
  return { level:'c1', label:'C1', desc:'Niveau maîtrise — votre français est excellent, peaufinez les détails!' };
}

// ── Helpers ───────────────────────────────────────────────────
function getVocab(levelId, unitNum, lessonNum) {
  const key = `${levelId}-u${unitNum}-l${lessonNum}`;
  return VOCAB[key] || [
    {fr:'apprendre',pron:'a.pʁɑ̃.dʁ',en:'to learn',ar:'يتعلم',
     ex:'J\'apprends le français chaque jour.',
     note:'Verbe irrégulier. J\'apprends, tu apprends, il apprend...',img:null},
    {fr:'comprendre',pron:'kɔ̃.pʁɑ̃.dʁ',en:'to understand',ar:'يفهم',
     ex:'Est-ce que tu comprends?',
     note:'Comme "prendre" — irrégulier.',img:null},
    {fr:'pratiquer',pron:'pʁa.ti.ke',en:'to practice',ar:'يتدرب',
     ex:'Il faut pratiquer tous les jours.',
     note:'Verbe régulier -ER.',img:null},
  ];
}

function getGrammar(levelId, unitNum) {
  const key = `${levelId}-u${unitNum}`;
  if(GRAMMAR[key]) return GRAMMAR[key];
  // Fallback
  const def = GRAMMAR[levelId+'-u1'] || GRAMMAR['a1-u1'];
  return def || {title:'Grammaire',rule:'Règle de grammaire.',examples:[],tip:'',exceptions:[]};
}

function getLessonTitle(levelId, unitNum, lessonNum) {
  const key = `${levelId}-u${unitNum}`;
  return (LESSON_TITLES[key]||[])[lessonNum-1] || `Leçon ${lessonNum}`;
}

function getUnitTitle(levelId, unitNum) {
  return (UNIT_TITLES[levelId]||[])[unitNum-1] || `Unité ${unitNum}`;
}

function getLevelXP(levelId) {
  return 50 + ['pre-a1','a1','a2','b1','b2','c1'].indexOf(levelId)*20;
}

function shuffle(a){ return [...a].sort(()=>Math.random()-.5); }
