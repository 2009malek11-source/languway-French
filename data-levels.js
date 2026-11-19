/* ================================================================
   LANGUWAY FRENCH — LEVELS & LESSONS DATA
   ================================================================ */

const BANDS = {
  'pre-a1': { label:'Pré-A1', color:'#4F46E5', bg:'#EEF2FF', desc:'Débutant absolu — aucune connaissance requise' },
  'a1':     { label:'A1',     color:'#B91C1C', bg:'#FEF2F2', desc:'Débutant — expressions de base' },
  'a2':     { label:'A2',     color:'#1D4ED8', bg:'#EFF6FF', desc:'Élémentaire — conversations quotidiennes' },
  'b1':     { label:'B1',     color:'#0D9488', bg:'#F0FDFA', desc:'Intermédiaire — situations variées' },
  'b2':     { label:'B2',     color:'#D97706', bg:'#FFFBEB', desc:'Intermédiaire supérieur — sujets complexes' },
  'c1':     { label:'C1',     color:'#7C3AED', bg:'#F5F3FF', desc:'Avancé — expression fluide et nuancée' },
  'c2':     { label:'C2',     color:'#BE185D', bg:'#FDF2F8', desc:'Maîtrise — niveau quasi-natif' },
};

const LVS = [
  // PRE-A1
  {id:1,  band:'pre-a1', code:'PA1-1', name:'Bonjour!',       icon:'👋', desc:"L'alphabet et les salutations",      xp:50},
  {id:2,  band:'pre-a1', code:'PA1-2', name:'Les chiffres',   icon:'🔢', desc:'Les nombres de 1 à 100',            xp:50},
  {id:3,  band:'pre-a1', code:'PA1-3', name:'Les couleurs',   icon:'🎨', desc:'Les couleurs et adjectifs',         xp:50},
  {id:4,  band:'pre-a1', code:'PA1-4', name:'La famille',     icon:'👨‍👩‍👧', desc:'Les membres de la famille',      xp:60},
  {id:5,  band:'pre-a1', code:'PA1-5', name:'Mon corps',      icon:'🫀', desc:'Les parties du corps',              xp:60},
  // A1
  {id:6,  band:'a1',     code:'A1-1',  name:'Être & Avoir',   icon:'⚡', desc:'Les deux verbes essentiels',        xp:70},
  {id:7,  band:'a1',     code:'A1-2',  name:'Les articles',   icon:'📝', desc:'le, la, les, un, une, des',         xp:70},
  {id:8,  band:'a1',     code:'A1-3',  name:'Se présenter',  icon:'🤝', desc:'Se présenter aux autres',            xp:80},
  {id:9,  band:'a1',     code:'A1-4',  name:'Au café',        icon:'☕', desc:'Commander et payer',                xp:80},
  {id:10, band:'a1',     code:'A1-5',  name:'La ville',       icon:'🏙️', desc:"Se repérer en ville",             xp:90},
  // A2
  {id:11, band:'a2',     code:'A2-1',  name:'Le passé composé',icon:'⏰',desc:'Parler du passé',                  xp:100},
  {id:12, band:'a2',     code:'A2-2',  name:'Le futur',       icon:'🚀', desc:'Exprimer le futur',                xp:100},
  {id:13, band:'a2',     code:'A2-3',  name:'La nourriture',  icon:'🍽️', desc:'Manger et cuisiner',               xp:110},
  {id:14, band:'a2',     code:'A2-4',  name:'Le shopping',    icon:'🛍️', desc:'Faire des courses',                xp:110},
  {id:15, band:'a2',     code:'A2-5',  name:'Les voyages',    icon:'✈️', desc:'Voyager en français',              xp:120},
  // B1
  {id:16, band:'b1',     code:'B1-1',  name:'Les opinions',   icon:'💭', desc:'Exprimer ses opinions',            xp:130},
  {id:17, band:'b1',     code:'B1-2',  name:"L'imparfait",    icon:'📖', desc:"L'imparfait et ses usages",        xp:130},
  {id:18, band:'b1',     code:'B1-3',  name:'Le subjonctif',  icon:'🌊', desc:'Introduction au subjonctif',       xp:150},
  {id:19, band:'b1',     code:'B1-4',  name:'Les médias',     icon:'📺', desc:'Parler des médias',                xp:150},
  {id:20, band:'b1',     code:'B1-5',  name:'La culture',     icon:'🎭', desc:'Culture et traditions françaises', xp:160},
  // B2
  {id:21, band:'b2',     code:'B2-1',  name:'Argumentation',  icon:'🗣️', desc:'Débattre et argumenter',          xp:180},
  {id:22, band:'b2',     code:'B2-2',  name:'La littérature', icon:'📚', desc:'Littérature française classique',  xp:200},
  {id:23, band:'b2',     code:'B2-3',  name:'Les sciences',   icon:'🔬', desc:'Vocabulaire scientifique',         xp:200},
  {id:24, band:'b2',     code:'B2-4',  name:'La société',     icon:'🏛️', desc:'Société et politique',            xp:220},
  {id:25, band:'b2',     code:'B2-5',  name:"L'économie",     icon:'📊', desc:'Économie et affaires',             xp:220},
  // C1
  {id:26, band:'c1',     code:'C1-1',  name:'Les nuances',    icon:'🎭', desc:'Nuances et registres',             xp:260},
  {id:27, band:'c1',     code:'C1-2',  name:'La rhétorique',  icon:'✍️', desc:"L'art de la rhétorique",          xp:280},
  {id:28, band:'c1',     code:'C1-3',  name:'La philosophie', icon:'🧠', desc:'Concepts philosophiques',          xp:300},
  // C2
  {id:29, band:'c2',     code:'C2-1',  name:'La maîtrise',    icon:'🌹', desc:'Maîtrise quasi-native',            xp:350},
  {id:30, band:'c2',     code:'C2-2',  name:'Grand Final',    icon:'👑', desc:'Examen final C2 complet',          xp:500},
];

const LC = {
  'pa1-1': { title:'Bonjour — Salutations', steps:[
    {type:'intro', title:'Bienvenue dans Languway French!',
     text:'Le français est parlé par 300 millions de personnes dans 50 pays. Commençons par les salutations, la base de toute communication!', tip:'🇫🇷 Le français est la langue officielle de 29 pays!'},
    {type:'vocab', title:'Les salutations essentielles', words:[
      {fr:'Bonjour',      pron:'bon-ZHOOR',   meaning:'Bonjour / Bonne journée', ex:'Bonjour Madame!'},
      {fr:'Bonsoir',      pron:'bon-SWAR',    meaning:'Bonsoir',                  ex:'Bonsoir, comment allez-vous?'},
      {fr:'Salut',        pron:'sa-LU',       meaning:'Salut (informel)',          ex:'Salut Pierre!'},
      {fr:'Au revoir',    pron:'oh reh-VWAR', meaning:'Au revoir',                 ex:'Au revoir, à demain!'},
      {fr:'Merci',        pron:'mair-SEE',    meaning:'Merci',                     ex:'Merci beaucoup!'},
      {fr:"S'il vous plaît", pron:'seel voo PLAY', meaning:'S\'il vous plaît',    ex:"Un café, s'il vous plaît."},
    ]},
    {type:'grammar', title:'Formel ou informel?', rule:{
      title:'Vous vs Tu',
      rows:[['vous','vous (formel/pluriel) — étrangers, aînés'],['tu','tu (informel/singulier) — amis, famille'],['Bonjour Madame','toujours formel en France'],['Salut !','seulement entre amis']],
      note:'Utiliser "tu" avec un inconnu peut être impoli en France. Dans le doute, utilisez "vous".'
    }},
    {type:'exercise', title:'Comment dit-on "Thank you"?',
     question:'Comment dit-on "Merci" en anglais?',
     opts:['Hello','Goodbye','Thank you','Please'], ans:2,
     exp:'"Merci" = Thank you. "Merci beaucoup" = Thank you very much.'},
    {type:'fill', title:'Complète la phrase',
     prompt:'___ Monsieur! (Good morning, Sir!)', answer:'Bonjour', hint:'Salutation du matin'},
    {type:'dragdrop', title:'Construis la phrase!',
     instruction:'Arrange: "Bonsoir, merci!"',
     words:['Bonsoir',',','merci','!'], correct:'Bonsoir , merci !'},
    {type:'speak', title:'Prononce à voix haute!',
     phrase:'Bonjour, comment allez-vous?', translation:'Hello, how are you?'},
    {type:'summary', title:'Leçon terminée! 🎉',
     points:['Bonjour = Bonjour','Bonsoir = Bonsoir','Salut = Salut (informel)','Au revoir = Au revoir','Merci = Merci','vous = formel · tu = informel']},
  ]},
  'pa1-2': { title:'Les chiffres 1–100', steps:[
    {type:'intro', title:'Les nombres en français',
     text:'Les nombres sont indispensables pour les prix, les heures, les numéros de téléphone et les adresses.', tip:'🔢 En France, on écrit les nombres avec des espaces: 1 000 000 (un million)'},
    {type:'vocab', title:'1 à 10', words:[
      {fr:'un / une',   pron:'UN / UNN',  meaning:'un (m/f)',  ex:'Un café.'},
      {fr:'deux',       pron:'DUH',       meaning:'deux',      ex:'Deux billets.'},
      {fr:'trois',      pron:'TRWA',      meaning:'trois',     ex:'Trois euros.'},
      {fr:'quatre',     pron:'KAT-ruh',   meaning:'quatre',    ex:'Quatre heures.'},
      {fr:'cinq',       pron:'SANK',      meaning:'cinq',      ex:'Cinq minutes.'},
      {fr:'dix',        pron:'DEES',      meaning:'dix',       ex:'Dix personnes.'},
    ]},
    {type:'grammar', title:'11 à 20', rule:{
      title:'Les nombres spéciaux',
      rows:[['onze','11'],['douze','12'],['treize','13'],['quatorze','14'],['quinze','15'],['seize','16'],['dix-sept','17'],['dix-huit','18'],['dix-neuf','19'],['vingt','20']],
      note:'De 11 à 16, les nombres sont irréguliers. De 17 à 19, on ajoute 7, 8, 9 à "dix".'
    }},
    {type:'exercise', title:'Quiz: Les chiffres',
     question:'Comment dit-on "three" en français?',
     opts:['deux','cinq','trois','quatre'], ans:2,
     exp:'"Trois" = three. Le "s" est muet: prononcé "TRWA".'},
    {type:'fill', title:'Écris en chiffres',
     prompt:'J\'ai ___ ans. (I am twenty years old.)', answer:'vingt', hint:'Le nombre 20'},
    {type:'speak', title:'Compte à voix haute!',
     phrase:'Un, deux, trois, quatre, cinq!', translation:'One, two, three, four, five!'},
    {type:'summary', title:'Les chiffres maîtrisés! 🔢',
     points:['un/une=1 · deux=2 · trois=3','quatre=4 · cinq=5 · six=6','sept=7 · huit=8 · neuf=9 · dix=10','11-16: formes irrégulières','17-19: dix + 7,8,9','vingt=20']},
  ]},
  'pa1-3': { title:'Les couleurs', steps:[
    {type:'intro', title:'Les couleurs en français',
     text:'Les couleurs sont essentielles pour décrire le monde autour de vous. En français, les adjectifs s\'accordent en genre et en nombre!', tip:'🎨 La France est célèbre pour sa mode et ses couleurs!'},
    {type:'vocab', title:'Les couleurs de base', words:[
      {fr:'rouge',  pron:'ROOZH',    meaning:'rouge',   ex:'Une rose rouge.'},
      {fr:'bleu',   pron:'BLUH',     meaning:'bleu',    ex:'Le ciel est bleu.'},
      {fr:'vert',   pron:'VAIR',     meaning:'vert',    ex:'L\'herbe est verte.'},
      {fr:'jaune',  pron:'ZHOHN',    meaning:'jaune',   ex:'Le soleil est jaune.'},
      {fr:'blanc',  pron:'BLON',     meaning:'blanc',   ex:'La neige est blanche.'},
      {fr:'noir',   pron:'NWAR',     meaning:'noir',    ex:'La nuit est noire.'},
    ]},
    {type:'grammar', title:'L\'accord des couleurs', rule:{
      title:'Masculin / Féminin',
      rows:[['bleu / bleue','blue (m/f)'],['vert / verte','green (m/f)'],['blanc / blanche','white (m/f)'],['noir / noire','black (m/f)'],['rouge / rouge','red (same)'],['rose / rose','pink (same)']],
      note:'Rouge, rose, jaune, beige ne changent pas au féminin!'
    }},
    {type:'exercise', title:'Quelle couleur?',
     question:'Comment dit-on "blue" en français?',
     opts:['rouge','vert','bleu','jaune'], ans:2,
     exp:'"Bleu" = blue. Au féminin: "bleue" (une robe bleue).'},
    {type:'speak', title:'Dis les couleurs!',
     phrase:'Rouge, bleu, vert, jaune, blanc, noir.', translation:'Red, blue, green, yellow, white, black.'},
    {type:'summary', title:'Les couleurs maîtrisées! 🎨',
     points:['rouge=red · bleu=blue · vert=green','jaune=yellow · blanc=white · noir=black','Les adjectifs s\'accordent avec le nom','Féminin: bleu→bleue, vert→verte, blanc→blanche','Rouge, rose, jaune: invariables']},
  ]},
  'a1-1': { title:'Être — To Be', steps:[
    {type:'intro', title:'Le verbe le plus important',
     text:'"Être" (to be) est la fondation du français. Vous l\'utiliserez chaque jour pour exprimer votre identité, décrire des personnes et former des temps composés.', tip:'💡 "Être" est utilisé dans presque 60% des phrases françaises!'},
    {type:'vocab', title:'Vocabulaire clé', words:[
      {fr:'être',       pron:'EH-truh',  meaning:'être'},
      {fr:'je suis',    pron:'zhuh SWEE', meaning:'je suis'},
      {fr:'tu es',      pron:'tu EH',    meaning:'tu es'},
      {fr:'il est',     pron:'eel EH',   meaning:'il est'},
      {fr:'elle est',   pron:'el EH',    meaning:'elle est'},
      {fr:'nous sommes',pron:'noo SOM',  meaning:'nous sommes'},
    ]},
    {type:'grammar', title:'Être — Conjugaison complète', rule:{
      title:'Présent de l\'indicatif',
      rows:[['Je suis','I am'],['Tu es','You are (informel)'],['Il / Elle est','He / She is'],['Nous sommes','We are'],['Vous êtes','You are (formel/pluriel)'],['Ils / Elles sont','They are']],
      note:'Être est un verbe IRRÉGULIER — il faut mémoriser chaque forme individuellement.'
    }},
    {type:'exercise', title:'Choisissez la bonne réponse',
     question:'"They are" en français est:',
     opts:['ils sont','nous sommes','tu es','je suis'], ans:0,
     exp:'"Ils sont" = they are (masc. ou mixte). "Elles sont" = they are (tout féminin).'},
    {type:'fill', title:'Complète la phrase',
     prompt:'Je ___ étudiant. (I am a student.)', answer:'suis', hint:'1ère personne singulier de être'},
    {type:'dragdrop', title:'Construis la phrase!',
     instruction:'Arrange: "She is a doctor"',
     words:['Elle','est','médecin','.'], correct:'Elle est médecin .'},
    {type:'dialogue', title:'Dialogue: Première rencontre', lines:[
      {speaker:'Marie', fr:'Bonjour! Je suis Marie. Et toi?',  tr:'Hello! I am Marie. And you?', b:false},
      {speaker:'Thomas',fr:'Salut! Je suis Thomas. Tu es française?',tr:'Hi! I am Thomas. Are you French?',b:true},
      {speaker:'Marie', fr:'Oui, je suis française. Et toi?', tr:'Yes, I am French. And you?',  b:false},
      {speaker:'Thomas',fr:'Non, je suis anglais.',            tr:'No, I am English.',           b:true},
    ]},
    {type:'speak', title:'Présente-toi!',
     phrase:'Bonjour! Je suis étudiant. Je suis français.', translation:'Hello! I am a student. I am French.'},
    {type:'summary', title:'Être maîtrisé! ⚡',
     points:['Je suis = I am','Tu es = You are (informel)','Il/Elle est = He/She is','Nous sommes = We are','Vous êtes = You are (formel/pluriel)','Ils/Elles sont = They are','Être est IRRÉGULIER — mémorisez chaque forme!']},
  ]},
  'a1-2': { title:'Les articles', steps:[
    {type:'intro', title:'Le genre en français',
     text:'Chaque nom français a un genre — masculin ou féminin. Les articles changent selon le genre. C\'est l\'une des premières choses à apprendre!', tip:'💡 Il n\'y a pas de règle absolue pour le genre — il faut mémoriser!'},
    {type:'vocab', title:'Les articles définis et indéfinis', words:[
      {fr:'le', pron:'luh',  meaning:'the (masculin)'},
      {fr:'la', pron:'la',   meaning:'the (féminin)'},
      {fr:'les',pron:'lay',  meaning:'the (pluriel)'},
      {fr:'un', pron:'UN',   meaning:'a/an (masculin)'},
      {fr:'une',pron:'UN',   meaning:'a/an (féminin)'},
      {fr:'des',pron:'day',  meaning:'some (pluriel)'},
    ]},
    {type:'grammar', title:'Comment utiliser les articles', rule:{
      title:'Articles définis',
      rows:[['le livre','the book (masculin)'],['la maison','the house (féminin)'],['les enfants','the children (pluriel)'],['l\'ami','the friend (before vowel)'],['un café','a coffee (m.)'],['une table','a table (f.)']],
      note:'Avant une voyelle ou H muet, "le" et "la" deviennent "l\'" — l\'école, l\'hôtel.'
    }},
    {type:'exercise', title:'Quiz: Les articles',
     question:'Quel est l\'article correct pour "maison" (féminin)?',
     opts:['le','la','les','un'], ans:1,
     exp:'"La maison" — maison est féminin, donc on utilise "la" pour l\'article défini.'},
    {type:'fill', title:'Complète avec l\'article',
     prompt:'___ café est chaud. (The coffee is hot.)', answer:'Le', hint:'café est masculin'},
    {type:'speak', title:'Répète les articles!',
     phrase:'Le livre, la maison, les enfants, un café, une table.', translation:'The book, the house, the children, a coffee, a table.'},
    {type:'summary', title:'Les articles maîtrisés! 📝',
     points:['le = the (masculin)','la = the (féminin)','les = the (pluriel)','l\' = the (before vowel/H muet)','un = a (masculin) · une = a (féminin)','Toujours apprendre l\'article avec le nom!']},
  ]},
  'a1-3': { title:'Se présenter', steps:[
    {type:'intro', title:'Parler de soi',
     text:'Savoir se présenter est une compétence fondamentale. Apprenons à parler de nous-mêmes, notre nationalité, notre profession et nos intérêts!', tip:'🌍 La France est le pays le plus visité au monde — les Français aiment rencontrer des étrangers!'},
    {type:'vocab', title:'Vocabulaire de présentation', words:[
      {fr:'je m\'appelle',  pron:'zhuh ma-PEL',   meaning:'je m\'appelle'},
      {fr:'j\'ai ... ans',  pron:'zhay ... ON',    meaning:'j\'ai ... ans'},
      {fr:'je viens de',    pron:'zhuh VYEN duh',  meaning:'je viens de'},
      {fr:'je travaille',   pron:'zhuh tra-VY',    meaning:'je travaille'},
      {fr:'j\'habite à',    pron:'zha-BEET ah',    meaning:'j\'habite à'},
      {fr:'j\'aime',        pron:'ZHEM',           meaning:'j\'aime'},
    ]},
    {type:'grammar', title:'Questions de base', rule:{
      title:'Comment poser des questions',
      rows:[['Comment vous appelez-vous?','Quel est votre nom?'],['Quel âge avez-vous?','Quel âge avez-vous?'],['D\'où venez-vous?','De quel pays venez-vous?'],['Quelle est votre profession?','Que faites-vous dans la vie?'],['Où habitez-vous?','Où vivez-vous?']],
      note:'Forme informelle: "Tu t\'appelles comment?" / "T\'as quel âge?"'
    }},
    {type:'exercise', title:'Comment se présenter',
     question:'"My name is" en français est:',
     opts:['Je suis...','Je m\'appelle...','Je viens de...','J\'aime...'], ans:1,
     exp:'"Je m\'appelle" = My name is. Littéralement "Je m\'appelle" = I call myself.'},
    {type:'dialogue', title:'Dialogue: Se présenter', lines:[
      {speaker:'Sophie',fr:'Bonjour! Je m\'appelle Sophie. Et vous?',tr:'Hello! My name is Sophie. And you?',b:false},
      {speaker:'Ahmed', fr:'Bonjour Sophie! Je m\'appelle Ahmed. Je viens du Maroc.',tr:'Hello Sophie! My name is Ahmed. I come from Morocco.',b:true},
      {speaker:'Sophie',fr:'Enchanté! Qu\'est-ce que vous faites?',tr:'Nice to meet you! What do you do?',b:false},
      {speaker:'Ahmed', fr:'Je suis ingénieur. Et vous?',tr:'I am an engineer. And you?',b:true},
      {speaker:'Sophie',fr:'Je suis professeure de français!',tr:'I am a French teacher!',b:false},
    ]},
    {type:'speak', title:'Présente-toi!',
     phrase:'Je m\'appelle Marie. J\'ai vingt ans. J\'habite à Paris.', translation:'My name is Marie. I am twenty years old. I live in Paris.'},
    {type:'summary', title:'Présentation maîtrisée! 🤝',
     points:['Je m\'appelle = My name is','J\'ai ... ans = I am ... years old','Je viens de = I come from','J\'habite à = I live in','Je travaille = I work','J\'aime = I love/like']},
  ]},
  'a2-1': { title:'Le Passé Composé', steps:[
    {type:'intro', title:'Parler du passé',
     text:'Le passé composé est le temps du passé le plus utilisé en français parlé. Il correspond à "I ate" ou "I have eaten" en anglais.', tip:'💡 Le passé composé est utilisé dans 80% des conversations sur le passé!'},
    {type:'vocab', title:'Participes passés courants', words:[
      {fr:'mangé',  pron:'man-ZHAY', meaning:'mangé (manger)'},
      {fr:'parlé',  pron:'par-LAY',  meaning:'parlé (parler)'},
      {fr:'allé',   pron:'a-LAY',    meaning:'allé (aller)'},
      {fr:'fait',   pron:'FEH',      meaning:'fait (faire)'},
      {fr:'vu',     pron:'VU',       meaning:'vu (voir)'},
      {fr:'pris',   pron:'PREE',     meaning:'pris (prendre)'},
    ]},
    {type:'grammar', title:'Formation du passé composé', rule:{
      title:'avoir + participe passé',
      rows:[['J\'ai mangé','I ate / I have eaten'],['Tu as parlé','You spoke'],['Il a fait','He did/made'],['Nous avons vu','We saw'],['Vous avez pris','You took'],['Ils ont été','They were']],
      note:'Verbes de mouvement avec être: aller, venir, partir, arriver, naître, mourir...'
    }},
    {type:'exercise', title:'Quiz: Le passé composé',
     question:'"I spoke" en français est:',
     opts:['Je parlais','J\'ai parlé','Je parle','Je parlerai'], ans:1,
     exp:'"J\'ai parlé" = I spoke. J\'ai = avoir (1ère personne) + parlé = participe passé de parler.'},
    {type:'fill', title:'Complète avec le passé composé',
     prompt:'Il ___ au cinéma hier. (He went to the cinema yesterday.)', answer:'est allé', hint:'aller utilise être comme auxiliaire'},
    {type:'dragdrop', title:'Construis au passé!',
     instruction:'Arrange: "She ate an apple"',
     words:['Elle','a','mangé','une','pomme','.'], correct:'Elle a mangé une pomme .'},
    {type:'dialogue', title:'Dialogue: Raconter son week-end', lines:[
      {speaker:'Luc',   fr:'Tu as passé un bon week-end?',                tr:'Did you have a good weekend?',          b:false},
      {speaker:'Emma',  fr:'Oui! Je suis allée au musée samedi.',          tr:'Yes! I went to the museum on Saturday.', b:true},
      {speaker:'Luc',   fr:'Cool! Qu\'est-ce que tu as vu?',               tr:'Cool! What did you see?',               b:false},
      {speaker:'Emma',  fr:'J\'ai vu une exposition sur Monet. C\'était magnifique!',tr:'I saw a Monet exhibition. It was magnificent!',b:true},
    ]},
    {type:'speak', title:'Raconte ton week-end!',
     phrase:'J\'ai mangé au restaurant. J\'ai vu un film.', translation:'I ate at a restaurant. I saw a film.'},
    {type:'summary', title:'Le passé composé maîtrisé! ⏰',
     points:['La plupart des verbes: avoir + participe passé','Verbes de mouvement: être + participe passé','J\'ai mangé = I ate','Je suis allé(e) = I went','Avec être: le participe s\'accorde avec le sujet']},
  ]},
  'b1-1': { title:'Exprimer ses opinions', steps:[
    {type:'intro', title:'Partager ses idées',
     text:'Au niveau B1, vous pouvez exprimer des opinions, accepter et refuser des idées, et justifier votre point de vue.', tip:'🗣️ Les Français adorent débattre — c\'est culturellement très important!'},
    {type:'vocab', title:'Expressions d\'opinion', words:[
      {fr:'Je pense que',           pron:'zhuh pons kuh',         meaning:'I think that'},
      {fr:'À mon avis',             pron:'ah mon ah-VEE',         meaning:'In my opinion'},
      {fr:'Je suis d\'accord',      pron:'zhuh swee da-KOR',      meaning:'I agree'},
      {fr:'Je ne suis pas d\'accord',pron:'zhuh nuh swee pa da-KOR',meaning:'I disagree'},
      {fr:'Il me semble que',       pron:'eel muh SOM-bluh kuh',  meaning:'It seems to me that'},
      {fr:'Selon moi',              pron:'suh-LON mwa',           meaning:'According to me'},
    ]},
    {type:'grammar', title:'Structurer son opinion', rule:{
      title:'Introduire et défendre une opinion',
      rows:[['Je pense que + indicatif','I think that...'],['Il faut que + subjonctif','It is necessary that...'],['Bien que + subjonctif','Although...'],['Puisque + indicatif','Since / Because...'],['D\'un côté... de l\'autre...','On one hand... on the other...']],
      note:'Pour nuancer: "peut-être", "probablement", "il est possible que"...'
    }},
    {type:'exercise', title:'Comment dit-on "In my opinion"?',
     question:'Comment dit-on "In my opinion" en français?',
     opts:['Je suis d\'accord','À mon avis','Il me semble','Je pense'], ans:1,
     exp:'"À mon avis" est la façon la plus naturelle de dire "in my opinion" en français.'},
    {type:'dialogue', title:'Dialogue: Un débat', lines:[
      {speaker:'Claire',fr:'À mon avis, le sport est très important pour la santé.',tr:'In my opinion, sport is very important for health.',b:false},
      {speaker:'Marc',  fr:'Je ne suis pas d\'accord. Je pense que l\'alimentation est plus importante.',tr:'I disagree. I think diet is more important.',b:true},
      {speaker:'Claire',fr:'Il me semble que les deux sont essentiels!',tr:'It seems to me that both are essential!',b:false},
      {speaker:'Marc',  fr:'Selon moi, il faut trouver un équilibre.',tr:'According to me, we need to find a balance.',b:true},
    ]},
    {type:'speak', title:'Donne ton opinion!',
     phrase:'À mon avis, apprendre le français est très utile.', translation:'In my opinion, learning French is very useful.'},
    {type:'summary', title:'Les opinions maîtrisées! 💭',
     points:['Je pense que = I think that','À mon avis = In my opinion','Selon moi = According to me','Je suis d\'accord = I agree','Je ne suis pas d\'accord = I disagree','Il me semble que = It seems to me that']},
  ]},
};

// Map level id to lesson key
const LVL_MAP = {
  1:'pa1-1', 2:'pa1-2', 3:'pa1-3', 4:'pa1-4', 5:'pa1-5',
  6:'a1-1',  7:'a1-2',  8:'a1-3',  9:'a1-4', 10:'a1-5',
  11:'a2-1', 12:'a2-2', 13:'a2-3', 14:'a2-4', 15:'a2-5',
  16:'b1-1', 17:'b1-2', 18:'b1-3', 19:'b1-4', 20:'b1-5',
  21:'b2-1', 22:'b2-2', 23:'b2-3', 24:'b2-4', 25:'b2-5',
  26:'c1-1', 27:'c1-2', 28:'c1-3',
  29:'c2-1', 30:'c2-2',
};

// Fallback lesson for levels without full content
function getLesson(lvId) {
  const key = LVL_MAP[lvId];
  if (LC[key]) return LC[key];
  const lv = LVS.find(l=>l.id===lvId);
  if (!lv) return null;
  return {
    title: lv.name,
    steps:[
      {type:'intro', title:`Bienvenue — ${lv.name}`, text:`Dans cette leçon, vous allez apprendre ${lv.desc}. Cette leçon fait partie du niveau ${BANDS[lv.band]?.label}.`, tip:'💡 Continuez à pratiquer chaque jour!'},
      {type:'vocab', title:'Vocabulaire clé', words:[
        {fr:'Exemple 1', pron:'ex-OM-pluh', meaning:'Example 1', ex:'Phrase d\'exemple.'},
        {fr:'Exemple 2', pron:'ex-OM-pluh', meaning:'Example 2', ex:'Autre exemple.'},
      ]},
      {type:'exercise', title:'Quiz rapide',
       question:`Ce niveau s'appelle "${lv.name}". Quelle est sa description?`,
       opts:[lv.desc,'Verbes irréguliers','Les couleurs','Les articles'], ans:0,
       exp:`Correct! "${lv.name}" couvre: ${lv.desc}`},
      {type:'speak', title:'Pratique orale',
       phrase:`J'apprends le français au niveau ${BANDS[lv.band]?.label}.`, translation:`I am learning French at the ${BANDS[lv.band]?.label} level.`},
      {type:'summary', title:'Leçon terminée! 🎉', points:[`Niveau: ${lv.code}`,`Thème: ${lv.name}`,lv.desc,`XP gagné: ${lv.xp}`]},
    ]
  };
}

const SITUATIONS = [
  { id:'airport', icon:'✈️', name:'À l\'aéroport', desc:'Check-in, bagages, embarquement',
    lines:[
      {speaker:'Passager',fr:'Bonjour! J\'ai une réservation au nom de Dupont.',tr:'Hello! I have a reservation under the name Dupont.',b:false},
      {speaker:'Agent',   fr:'Très bien. Votre destination aujourd\'hui?',tr:'Very well. Your destination today?',b:true},
      {speaker:'Passager',fr:'Paris, vol AF123.',tr:'Paris, flight AF123.',b:false},
      {speaker:'Agent',   fr:'Avez-vous des bagages à enregistrer?',tr:'Do you have any luggage to check in?',b:true},
      {speaker:'Passager',fr:'Oui, une valise s\'il vous plaît.',tr:'Yes, one suitcase please.',b:false},
    ]},
  { id:'restaurant', icon:'🍽️', name:'Au restaurant', desc:'Commander, payer, réclamer',
    lines:[
      {speaker:'Serveur', fr:'Bonsoir! Vous avez réservé?',tr:'Good evening! Do you have a reservation?',b:false},
      {speaker:'Client',  fr:'Oui, au nom de Martin, pour deux personnes.',tr:'Yes, under the name Martin, for two people.',b:true},
      {speaker:'Serveur', fr:'Très bien. Que désirez-vous?',tr:'Very good. What would you like?',b:false},
      {speaker:'Client',  fr:'Je vais prendre le steak-frites, s\'il vous plaît.',tr:'I\'ll have the steak-frites, please.',b:true},
      {speaker:'Serveur', fr:'Et comme boisson?',tr:'And to drink?',b:false},
      {speaker:'Client',  fr:'Une carafe d\'eau, merci.',tr:'A carafe of water, thank you.',b:true},
    ]},
  { id:'hotel', icon:'🏨', name:'À l\'hôtel', desc:'Réservation, check-in, problèmes',
    lines:[
      {speaker:'Réceptionniste',fr:'Bienvenue! Vous avez une réservation?',tr:'Welcome! Do you have a reservation?',b:false},
      {speaker:'Client',fr:'Oui, j\'ai réservé une chambre double pour trois nuits.',tr:'Yes, I booked a double room for three nights.',b:true},
      {speaker:'Réceptionniste',fr:'Votre nom?',tr:'Your name?',b:false},
      {speaker:'Client',fr:'Lambert. Thomas Lambert.',tr:'Lambert. Thomas Lambert.',b:true},
      {speaker:'Réceptionniste',fr:'Voici votre clé. Chambre 304, troisième étage.',tr:'Here is your key. Room 304, third floor.',b:false},
    ]},
  { id:'shopping', icon:'🛍️', name:'Faire du shopping', desc:'Acheter, tailles, prix',
    lines:[
      {speaker:'Vendeur',fr:'Bonjour! Je peux vous aider?',tr:'Hello! Can I help you?',b:false},
      {speaker:'Client', fr:'Oui, je cherche une veste. Taille M.',tr:'Yes, I\'m looking for a jacket. Size M.',b:true},
      {speaker:'Vendeur',fr:'Quelle couleur préférez-vous?',tr:'What colour do you prefer?',b:false},
      {speaker:'Client', fr:'Quelque chose de bleu, si possible.',tr:'Something blue, if possible.',b:true},
      {speaker:'Vendeur',fr:'Voilà! Celle-ci est à 89 euros.',tr:'Here! This one is 89 euros.',b:false},
      {speaker:'Client', fr:'Est-ce que vous faites une réduction?',tr:'Do you offer a discount?',b:true},
    ]},
  { id:'directions', icon:'🗺️', name:'Demander son chemin', desc:'Directions, transports, lieux',
    lines:[
      {speaker:'Touriste',fr:'Excusez-moi, où est la Tour Eiffel?',tr:'Excuse me, where is the Eiffel Tower?',b:false},
      {speaker:'Parisien',fr:'C\'est assez loin d\'ici. Prenez le métro.',tr:'It\'s quite far from here. Take the metro.',b:true},
      {speaker:'Touriste',fr:'Quelle ligne?',tr:'Which line?',b:false},
      {speaker:'Parisien',fr:'La ligne 6, direction Charles de Gaulle.',tr:'Line 6, direction Charles de Gaulle.',b:true},
      {speaker:'Touriste',fr:'Merci beaucoup! C\'est quelle station?',tr:'Thank you very much! Which station is it?',b:false},
      {speaker:'Parisien',fr:'Champ de Mars-Tour Eiffel. Bonne visite!',tr:'Champ de Mars-Tour Eiffel. Enjoy your visit!',b:false},
    ]},
  { id:'doctor', icon:'👨‍⚕️', name:'Chez le médecin', desc:'Symptômes, ordonnances, rendez-vous',
    lines:[
      {speaker:'Docteur',fr:'Bonjour! Qu\'est-ce qui vous amène?',tr:'Hello! What brings you in?',b:false},
      {speaker:'Patient',fr:'Je ne me sens pas bien depuis trois jours.',tr:'I haven\'t been feeling well for three days.',b:true},
      {speaker:'Docteur',fr:'Quels sont vos symptômes?',tr:'What are your symptoms?',b:false},
      {speaker:'Patient',fr:'J\'ai de la fièvre et mal à la gorge.',tr:'I have a fever and a sore throat.',b:true},
      {speaker:'Docteur',fr:'Je vais vous prescrire des antibiotiques.',tr:'I\'m going to prescribe antibiotics for you.',b:false},
    ]},
];

const STORIES = [
  { id:'s1', title:'Une Journée à Paris',  level:'A1', episodes:[
    { ep:1, title:'Arrivée à Paris', 
      text:'Marie arrive à Paris pour la première fois. Elle sort de l\'aéroport Charles de Gaulle et prend le RER B vers le centre-ville. Dans le train, elle rencontre un homme sympathique qui s\'appelle Pierre.',
      vocab:[{fr:'arriver',meaning:'to arrive'},{fr:'prendre',meaning:'to take'},{fr:'rencontrer',meaning:'to meet'},{fr:'sympathique',meaning:'nice/friendly'}],
      question:'Comment Marie arrive-t-elle à Paris?',
      opts:['En voiture','En avion','En train depuis Lyon','À pied'], ans:1,
    },
    { ep:2, title:'Première nuit', 
      text:'Marie arrive à son hôtel près de Notre-Dame. La chambre est petite mais charmante. Elle a une belle vue sur la Seine. Ce soir, elle va dîner dans un restaurant traditionnel et commander une crêpe.',
      vocab:[{fr:'charmant',meaning:'charming'},{fr:'vue',meaning:'view'},{fr:'dîner',meaning:'to have dinner'},{fr:'commander',meaning:'to order'}],
      question:'Où est l\'hôtel de Marie?',
      opts:['Près de la Tour Eiffel','Près de Notre-Dame','À Montmartre','À Versailles'], ans:1,
    },
  ]},
  { id:'s2', title:'L\'Académie de Magie', level:'A2', episodes:[
    { ep:1, title:'Le nouveau professeur',
      text:'Hugo est un jeune sorcier qui entre à l\'Académie de Magie de Lyon. Son nouveau professeur, Madame Leclair, lui enseigne les sorts de base. Mais Hugo a un problème: ses sorts ne fonctionnent jamais correctement.',
      vocab:[{fr:'sorcier',meaning:'wizard'},{fr:'sort',meaning:'spell'},{fr:'enseigner',meaning:'to teach'},{fr:'fonctionner',meaning:'to work/function'}],
      question:'Quel est le problème d\'Hugo?',
      opts:['Il n\'aime pas l\'école','Ses sorts ne fonctionnent pas','Il n\'a pas de baguette','Il est malade'], ans:1,
    },
    { ep:2, title:'Le secret de la bibliothèque',
      text:'Hugo découvre une bibliothèque secrète sous l\'Académie. Il y trouve un vieux livre qui explique pourquoi ses sorts échouent: il prononce mal les formules. Avec l\'aide de son amie Léa, il apprend la bonne prononciation.',
      vocab:[{fr:'découvrir',meaning:'to discover'},{fr:'échouer',meaning:'to fail'},{fr:'prononcer',meaning:'to pronounce'},{fr:'formule',meaning:'formula/spell'}],
      question:'Pourquoi les sorts d\'Hugo échouent-ils?',
      opts:['Il manque de concentration','Il prononce mal les formules','Sa baguette est cassée','Il est trop jeune'], ans:1,
    },
  ]},
  { id:'s3', title:'Le Chef de Lyon',  level:'B1', episodes:[
    { ep:1, title:'Le concours',
      text:'Camille est une jeune chef qui participe au Grand Concours de Cuisine de Lyon. Elle doit préparer un plat typiquement français en moins de 60 minutes. Son rival, le chef Dupuis, a une réputation redoutable. Camille choisit de préparer un boeuf bourguignon moderne.',
      vocab:[{fr:'concours',meaning:'competition'},{fr:'rival',meaning:'rival'},{fr:'redoutable',meaning:'formidable'},{fr:'bourguignon',meaning:'from Burgundy'}],
      question:'Quel plat Camille décide-t-elle de préparer?',
      opts:['Une quiche lorraine','Un boeuf bourguignon','Des crêpes Suzette','Un soufflé au chocolat'], ans:1,
    },
  ]},
];

const DICTIONARY = [
  {fr:'bonjour',    pron:'bon-ZHOOR',  eng:'hello',          ar:'مرحبا',    type:'excl', level:'A1', ex:'Bonjour tout le monde!', syn:['salut (informel)','bonsoir (soir)'], note:'Utilisé de 7h à 18h environ'},
  {fr:'merci',      pron:'mair-SEE',   eng:'thank you',      ar:'شكرا',     type:'excl', level:'A1', ex:'Merci beaucoup!', syn:['merci beaucoup','je vous remercie'], note:'"Merci beaucoup" = Thank you very much'},
  {fr:'être',       pron:'EH-truh',    eng:'to be',          ar:'يكون',     type:'verb', level:'A1', ex:'Je suis français.', syn:['exister','se trouver'], note:'Verbe irrégulier — mémorisez la conjugaison'},
  {fr:'avoir',      pron:'a-VWAR',     eng:'to have',        ar:'يملك',     type:'verb', level:'A1', ex:'J\'ai un chat.', syn:['posséder','détenir'], note:'Aussi utilisé comme auxiliaire au passé composé'},
  {fr:'faire',      pron:'FAIR',       eng:'to do / to make',ar:'يفعل',     type:'verb', level:'A1', ex:'Je fais du sport.', syn:['accomplir','réaliser'], note:'Un des verbes les plus polyvalents en français'},
  {fr:'aller',      pron:'a-LAY',      eng:'to go',          ar:'يذهب',     type:'verb', level:'A1', ex:'Je vais à Paris.', syn:['se rendre à','partir vers'], note:'Aussi utilisé pour le futur proche: "Je vais manger"'},
  {fr:'pouvoir',    pron:'poo-VWAR',   eng:'can / to be able to', ar:'يستطيع', type:'verb', level:'A2', ex:'Je peux vous aider.', syn:['être capable de','avoir la capacité de'], note:'Verbe modal irrégulier'},
  {fr:'vouloir',    pron:'voo-LWAR',   eng:'to want',        ar:'يريد',     type:'verb', level:'A2', ex:'Je voudrais un café.', syn:['désirer','souhaiter'], note:'"Je voudrais" est plus poli que "je veux"'},
  {fr:'savoir',     pron:'sa-VWAR',    eng:'to know (fact)', ar:'يعرف',     type:'verb', level:'A2', ex:'Je sais parler français.', syn:['connaître (person/place)'], note:'"Savoir" vs "connaître": savoir = to know HOW, connaître = to know a person/place'},
  {fr:'beau/belle', pron:'BOH/BEL',    eng:'beautiful',      ar:'جميل',     type:'adj',  level:'A1', ex:'La France est belle.', syn:['joli','magnifique'], note:'Forme irrégulière: beau (m), belle (f), beaux (pl m), belles (pl f)'},
  {fr:'grand/grande',pron:'GRON/GROND',eng:'big / tall',     ar:'كبير',     type:'adj',  level:'A1', ex:'La Tour Eiffel est grande.', syn:['vaste','immense'], note:'Peut signifier "grand" (taille) ou "important"'},
  {fr:'bon/bonne',  pron:'BON/BOHN',   eng:'good',           ar:'جيد',      type:'adj',  level:'A1', ex:'C\'est une bonne idée!', syn:['excellent','formidable'], note:'"Bien" est un adverbe; "bon" est un adjectif'},
  {fr:'maison',     pron:'meh-ZON',    eng:'house',          ar:'بيت',      type:'noun', level:'A1', ex:'J\'aime ma maison.', syn:['demeure','résidence','foyer'], note:'Féminin: la maison'},
  {fr:'ville',      pron:'VEEL',       eng:'city / town',    ar:'مدينة',    type:'noun', level:'A1', ex:'Paris est une belle ville.', syn:['cité','agglomération'], note:'Féminin: la ville'},
  {fr:'travail',    pron:'tra-VY',     eng:'work / job',     ar:'عمل',      type:'noun', level:'A2', ex:'Mon travail est intéressant.', syn:['emploi','boulot (fam.)'], note:'Pluriel irrégulier: travaux (works/renovations)'},
  {fr:'amour',      pron:'a-MOOR',     eng:'love',           ar:'حب',       type:'noun', level:'A1', ex:'L\'amour est aveugle.', syn:['affection','passion'], note:'Masculin au singulier, peut être féminin au pluriel (littéraire)'},
  {fr:'liberté',    pron:'lee-bair-TAY',eng:'freedom / liberty',ar:'حرية', type:'noun', level:'B1', ex:'Liberté, Égalité, Fraternité.', syn:['indépendance','émancipation'], note:'Devise nationale de la France'},
  {fr:'manger',     pron:'mon-ZHAY',   eng:'to eat',         ar:'يأكل',     type:'verb', level:'A1', ex:'J\'aime manger du pain.', syn:['se nourrir','déguster'], note:'Verbe régulier -er, mais: nous mangeons (e avant o/a)'},
  {fr:'parler',     pron:'par-LAY',    eng:'to speak',       ar:'يتكلم',    type:'verb', level:'A1', ex:'Je parle français.', syn:['discuter','converser','s\'exprimer'], note:'Verbe régulier -er, le plus simple à conjuguer'},
  {fr:'comprendre', pron:'kom-PRON-druh',eng:'to understand',ar:'يفهم',    type:'verb', level:'A2', ex:'Je comprends le français.', syn:['saisir','assimiler'], note:'Comme "prendre" — verbe irrégulier'},
];

const WORD_OF_DAY = [
  {fr:'Flâner',      pron:'flah-NAY',   eng:'To stroll without purpose',ar:'التجوال بلا هدف', type:'verb',  ex:'J\'aime flâner dans Paris.', note:'Concept français typique — se promener sans but précis', level:'B1'},
  {fr:'Dépaysement', pron:'day-pay-EZ-mon',eng:'Feeling of being in a foreign land',ar:'الشعور بالغربة الممتعة', type:'noun', ex:'Le voyage m\'apporte un dépaysement total.', note:'Sentiment positif d\'être dans un environnement différent', level:'B2'},
  {fr:'Savoir-faire', pron:'sa-VWAR fair',eng:'Skill / Know-how',ar:'الكفاءة والمهارة', type:'noun', ex:'Il a un vrai savoir-faire en cuisine.', note:'Littéralement "savoir comment faire" — terme utilisé mondialement', level:'A2'},
  {fr:'Retrouvailles',pron:'ruh-troo-VY', eng:'Reunion after a long time',ar:'لم الشمل', type:'noun',ex:'Les retrouvailles avec ma famille étaient émouvantes.', note:'Pluriel — toujours au pluriel!', level:'B1'},
  {fr:'Chagrin',     pron:'sha-GRIN',   eng:'Deep sadness / Grief',ar:'الحزن العميق', type:'noun', ex:'Il a du chagrin depuis la mort de son chat.', note:'Plus profond que "tristesse" — une douleur émotionnelle', level:'B1'},
];

const GRAMMAR_TIPS = [
  {week:1, topic:'Le Genre des Noms', rule:'En français, chaque nom a un genre: masculin ou féminin. Il n\'y a pas de règle absolue, mais voici quelques indices: les noms terminant en -tion, -ure, -ette sont souvent féminins. Les noms terminant en -ment, -age, -isme sont souvent masculins.', examples:['la maison (f)','le livre (m)','la nature (f)','le fromage (m)','la liberté (f)','le gouvernement (m)'],
   test:[{q:'Quel est le genre de "fleur" (flower)?',opts:['Masculin','Féminin'],ans:1,exp:'"La fleur" est féminin. Les fleurs, les plantes sont souvent féminines.'},{q:'Quel est le genre de "bonheur" (happiness)?',opts:['Masculin','Féminin'],ans:0,exp:'"Le bonheur" est masculin. Les mots en -eur (abstrait) sont souvent masculins.'}]},
  {week:2, topic:'Le Passé Composé vs L\'Imparfait', rule:'Ces deux temps du passé ont des usages différents. Le PASSÉ COMPOSÉ exprime une action terminée, précise, avec un début et une fin. L\'IMPARFAIT exprime une action habituelle, un état, ou une action en cours dans le passé.', examples:['Il pleuvait (imparfait: état) quand je suis sorti (passé composé: action)','Quand j\'étais enfant (imparfait), j\'habitais à Lyon (imparfait).','Hier, j\'ai mangé une pizza (passé composé: action terminée).'],
   test:[{q:'"When I was young, I lived in Paris." Quel temps utiliser?',opts:['Passé composé','Imparfait'],ans:1,exp:'Un état continu dans le passé → Imparfait: "Quand j\'étais jeune, j\'habitais à Paris."'},{q:'"Yesterday, I saw a film." Quel temps?',opts:['Passé composé','Imparfait'],ans:0,exp:'Une action terminée → Passé composé: "Hier, j\'ai vu un film."'}]},
];
