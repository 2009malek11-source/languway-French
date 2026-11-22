/* ================================================================
   LANGUWAY FRENCH — DATA v6
   Structure: 6 niveaux × 10 unités × 5 leçons = 300 leçons
================================================================ */

const LEVELS_DEF=[
  {id:'pre-a1',label:'Pré-A1',color:'#9333EA',desc:'Débutant absolu',icon:'🌱',units:10},
  {id:'a1',    label:'A1',    color:'#D62828',desc:'Débutant',       icon:'📗',units:10},
  {id:'a2',    label:'A2',    color:'#1D4ED8',desc:'Élémentaire',    icon:'📘',units:10},
  {id:'b1',    label:'B1',    color:'#065F46',desc:'Intermédiaire',  icon:'📙',units:10},
  {id:'b2',    label:'B2',    color:'#B45309',desc:'Inter. Sup.',    icon:'📕',units:10},
  {id:'c1',    label:'C1',    color:'#831843',desc:'Avancé',         icon:'📓',units:10},
];

// 10 units per level
const UNITS_A1=[
  {u:1,name:'Bonjour !',       desc:'Salutations et présentations',   img:'paris-street'},
  {u:2,name:'La Famille',      desc:'Membres de la famille',          img:'paris-cafe'},
  {u:3,name:'Les Chiffres',    desc:'Nombres et calculs',             img:'paris-eiffel'},
  {u:4,name:'Les Couleurs',    desc:'Couleurs et adjectifs',          img:'paris-louvre'},
  {u:5,name:'La Nourriture',   desc:'Aliments et repas',              img:'paris-food'},
  {u:6,name:'Les Animaux',     desc:'Faune française',                img:'paris-street'},
  {u:7,name:'Être & Avoir',    desc:'Verbes essentiels',              img:'paris-cafe'},
  {u:8,name:'La Ville',        desc:'Se repérer en ville',            img:'paris-eiffel'},
  {u:9,name:'Les Vêtements',   desc:'S\'habiller en français',        img:'paris-louvre'},
  {u:10,name:'Mon Corps',      desc:'Les parties du corps',           img:'paris-food'},
];

// Unsplash real photos (no AI, free license)
const IMGS={
  'paris-eiffel': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
  'paris-street': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
  'paris-cafe':   'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=800&q=80',
  'paris-louvre': 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=800&q=80',
  'paris-food':   'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
  'paris-hero':   'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=85',
  'montmartre':   'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=800&q=80',
  'notre-dame':   'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=800&q=80',
  'versailles':   'https://images.unsplash.com/photo-1565073182887-6bcefbe225b1?w=800&q=80',
  'provence':     'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=800&q=80',
  'riviera':      'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80',
};

function imgUrl(key){return IMGS[key]||IMGS['paris-eiffel'];}

// Build 10 units for every level
function buildUnits(levelId){
  const names=[
    ['Salutations','La Famille','Les Nombres','Les Couleurs','La Nourriture','Les Animaux','Être & Avoir','La Ville','Les Vêtements','Mon Corps'],
    ['Se Présenter','Les Articles','Adjectifs','La Maison','Les Métiers','Les Transports','Au Café','Au Restaurant','Le Marché','Le Calendrier'],
    ['Le Passé','Le Futur','Les Pronoms','La Santé','Les Sports','La Nature','Les Voyages','Le Shopping','Les Fêtes','Les Émotions'],
    ['Le Subjonctif',"L'Imparfait",'Les Opinions','Les Médias','La Politique','La Culture','Les Sciences','La Technologie','Les Arts','Le Travail'],
    ['Argumentation','La Littérature',"L'Économie",'La Philosophie','Les Nuances','Le Débat','La Rhétorique','Les Registres','Les Idiomes','Les Proverbes'],
    ['Maîtrise Orale','Maîtrise Écrite','Littérature Avancée','Analyse Critique','Nuances Fines','Expression Complexe','Textes Officiels','Argumentation C1','Synthèse','Grand Final C1'],
  ];
  const imgs=['paris-eiffel','paris-street','paris-cafe','paris-louvre','paris-food','montmartre','notre-dame','versailles','provence','riviera'];
  const idx=['pre-a1','a1','a2','b1','b2','c1'].indexOf(levelId);
  const nms=names[idx]||names[0];
  return nms.map((name,i)=>({
    id:`${levelId}-u${i+1}`,
    u:i+1,
    levelId,
    name,
    img:imgs[i%imgs.length],
    lessons:5,
  }));
}

// 30-question placement test
const PLACEMENT=[
  {id:'p1',band:'pre-a1',type:'mcq',q:'Comment dit-on "Hello" en français?',opts:['Merci','Bonjour','Au revoir','Bonsoir'],ans:1,exp:'"Bonjour" = Hello.'},
  {id:'p2',band:'pre-a1',type:'mcq',q:'Quel chiffre vient après "deux"?',opts:['un','quatre','trois','cinq'],ans:2,exp:'Un, deux, trois...'},
  {id:'p3',band:'pre-a1',type:'mcq',q:'Quelle lettre accentuée existe en français?',opts:['W','É','X','K'],ans:1,exp:'"É" est une lettre française accentuée.'},
  {id:'p4',band:'pre-a1',type:'mcq',q:'Comment dit-on "Thank you"?',opts:['Oui','Non','Merci','Bonjour'],ans:2,exp:'"Merci" = Thank you.'},
  {id:'p5',band:'a1',type:'mcq',q:'Choisissez l\'article: ___ maison (the house)',opts:['le','la','les','un'],ans:1,exp:'"La maison" — maison est féminin.'},
  {id:'p6',band:'a1',type:'fill',q:'Complétez: "Je ___ étudiant."',answer:'suis',hint:'Être à la 1ère personne',exp:'"Je suis" = I am.'},
  {id:'p7',band:'a1',type:'mcq',q:'"I have a cat" en français:',opts:['Je suis un chat','J\'ai un chat','J\'aime un chat','Je vois un chat'],ans:1,exp:'"Avoir" = to have. J\'ai = I have.'},
  {id:'p8',band:'a1',type:'mcq',q:'Comment dire "What is your name?" formellement?',opts:['Tu t\'appelles?','Comment vous appelez-vous?','Ton nom?','C\'est qui?'],ans:1,exp:'"Comment vous appelez-vous?" = formel.'},
  {id:'p9',band:'a1',type:'mcq',q:'Féminin de "un étudiant":',opts:['une étudiant','un étudiante','une étudiante','des étudiants'],ans:2,exp:'Au féminin: une étudiante.'},
  {id:'p10',band:'a1',type:'mcq',q:'Pluriel de "le livre":',opts:['les livres','la livre','des livre','un livres'],ans:0,exp:'"Les livres" = the books.'},
  {id:'p11',band:'a2',type:'mcq',q:'"I ate" en passé composé:',opts:['Je mange','Je mangeais','J\'ai mangé','Je mangerai'],ans:2,exp:'Passé composé: avoir + participe passé.'},
  {id:'p12',band:'a2',type:'fill',q:'"Il ___ partir." (He is going to leave.)',answer:'va',hint:'Futur proche: aller + infinitif',exp:'"Il va partir" = He is going to leave.'},
  {id:'p13',band:'a2',type:'mcq',q:'"Je vais ___ France."',opts:['à','au','en','dans'],ans:2,exp:'"En France" — pays féminin.'},
  {id:'p14',band:'a2',type:'mcq',q:'Passé composé de "aller":',opts:['j\'allais','je suis allé','j\'ai allé','je vais aller'],ans:1,exp:'"Aller" prend "être" au passé composé.'},
  {id:'p15',band:'a2',type:'mcq',q:'"Marie achète une robe rouge." — Que fait Marie?',opts:['Elle vend','Elle achète','Elle porte','Elle cherche'],ans:1,exp:'"Acheter" = to buy.'},
  {id:'p16',band:'a2',type:'mcq',q:'Verbe réfléchi: "___ lavons."',opts:['Nous se','Nous nous','On nous','Vous vous'],ans:1,exp:'"Nous nous lavons" — verbe réfléchi.'},
  {id:'p17',band:'b1',type:'mcq',q:'"Il faut que tu ___ à l\'heure."',opts:['es','sois','sera','étais'],ans:1,exp:'Subjonctif: "il faut que" + subjonctif.'},
  {id:'p18',band:'b1',type:'fill',q:'Imparfait de "habiter": "j\'___ à Lyon"',answer:'habitais',hint:'Imparfait: radical + ais/ait...',exp:'"J\'habitais" = I used to live.'},
  {id:'p19',band:'b1',type:'mcq',q:'Opinion correcte:',opts:['"Je pense que c\'est bien."','"Je pense c\'est bien."','"Moi penser bien."','"Je suis pense bien."'],ans:0,exp:'"Je pense que + indicatif."'},
  {id:'p20',band:'b1',type:'mcq',q:'"Bien que" signifie:',opts:['parce que','pour que','although','afin que'],ans:2,exp:'"Bien que" = although. + subjonctif.'},
  {id:'p21',band:'b1',type:'mcq',q:'Différence "depuis" vs "il y a":',opts:['"Depuis" = durée en cours; "il y a" = moment passé','"Depuis" = moment passé; "il y a" = durée','Synonymes','Aucune différence'],ans:0,exp:'"Depuis 3 ans" = for 3 years (ongoing). "Il y a 3 ans" = 3 years ago.'},
  {id:'p22',band:'b1',type:'mcq',q:'Discours indirect: "Je suis fatigué" → Il dit qu\'il ___',opts:['est fatigué','suis fatigué','sera fatigué','était fatigué'],ans:0,exp:'Discours indirect au présent: je → il.'},
  {id:'p23',band:'b2',type:'mcq',q:'"S\'il ___ demain, nous resterons."',opts:['pleut','pleuve','pleuvra','pleurait'],ans:0,exp:'Conditionnel type 1: si + présent → futur.'},
  {id:'p24',band:'b2',type:'fill',q:'"Je voudrais que vous ___ plus attentifs." (être)',answer:'soyez',hint:'Subjonctif de "être" à la 2e personne du pluriel',exp:'"Vouloir que" + subjonctif: vous soyez.'},
  {id:'p25',band:'b2',type:'mcq',q:'"À condition que" signifie:',opts:['parce que','à moins que','provided that','afin que'],ans:2,exp:'"À condition que" = provided that.'},
  {id:'p26',band:'b2',type:'mcq',q:'Plus-que-parfait avec:',opts:['avant que','après que','depuis que','pendant que'],ans:0,exp:'"Avant que" + subjonctif, action antérieure.'},
  {id:'p27',band:'b2',type:'mcq',q:'Conditionnel passé correct:',opts:['"Si j\'avais su, j\'aurais agi."','"Si j\'aurais su, j\'avais agi."','"Si j\'ai su, j\'aurais agi."','"Si j\'avais su, j\'agissais."'],ans:0,exp:'Type 3: si + plus-que-parfait → conditionnel passé.'},
  {id:'p28',band:'c1',type:'mcq',q:'"Nonobstant les difficultés..." — "Nonobstant" signifie:',opts:['à cause de','en raison de','malgré','grâce à'],ans:2,exp:'"Nonobstant" = despite. Terme formel.'},
  {id:'p29',band:'c1',type:'mcq',q:'"La vie est un long fleuve tranquille." — Figure de style:',opts:['Métaphore','Comparaison','Oxymore','Hyperbole'],ans:0,exp:'Métaphore = comparaison implicite (sans "comme").'},
  {id:'p30',band:'c1',type:'mcq',q:'"aussi nécessaire fût-elle" — Mode de "fût":',opts:['Conditionnel passé','Subjonctif imparfait','Plus-que-parfait','Indicatif passé'],ans:1,exp:'Subjonctif imparfait — style soutenu/littéraire.'},
];

// Dictionary 40 words
const DICTIONARY=[
  {fr:'bonjour',pron:'bɔ̃.ʒuʁ',eng:'hello',ar:'مرحبا',type:'excl',level:'Pré-A1',ex:'Bonjour Madame!',syn:['salut','bonsoir'],note:'Utilisé de 7h à 18h.'},
  {fr:'merci',pron:'mɛʁ.si',eng:'thank you',ar:'شكراً',type:'excl',level:'Pré-A1',ex:'Merci beaucoup!',syn:['je vous remercie'],note:'"Merci beaucoup" = Thank you very much.'},
  {fr:'être',pron:'ɛ.tʁə',eng:'to be',ar:'يكون',type:'verb',level:'A1',ex:'Je suis français.',syn:['exister'],note:'IRRÉGULIER: suis/es/est/sommes/êtes/sont'},
  {fr:'avoir',pron:'a.vwaʁ',eng:'to have',ar:'يملك',type:'verb',level:'A1',ex:"J'ai un frère.",syn:['posséder'],note:'Auxiliaire du passé composé.'},
  {fr:'aller',pron:'a.le',eng:'to go',ar:'يذهب',type:'verb',level:'A1',ex:'Je vais à Paris.',syn:['se rendre'],note:'Futur proche: aller + infinitif.'},
  {fr:'faire',pron:'fɛʁ',eng:'to do/make',ar:'يفعل',type:'verb',level:'A1',ex:'Je fais du sport.',syn:['accomplir'],note:'Très polyvalent en français.'},
  {fr:'vouloir',pron:'vu.lwaʁ',eng:'to want',ar:'يريد',type:'verb',level:'A2',ex:'Je voudrais un café.',syn:['désirer'],note:'"Je voudrais" est plus poli que "je veux".'},
  {fr:'pouvoir',pron:'pu.vwaʁ',eng:'can',ar:'يستطيع',type:'verb',level:'A2',ex:'Je peux vous aider.',syn:['être capable'],note:'Verbe modal irrégulier.'},
  {fr:'savoir',pron:'sa.vwaʁ',eng:'to know',ar:'يعرف',type:'verb',level:'A2',ex:'Je sais parler français.',syn:['connaître'],note:'"Savoir" = know HOW; "Connaître" = know who/what.'},
  {fr:'prendre',pron:'pʁɑ̃.dʁə',eng:'to take',ar:'يأخذ',type:'verb',level:'A1',ex:'Je prends le métro.',syn:['saisir'],note:'Irrégulier: prends/prend/prenons...'},
  {fr:'beau',pron:'bo',eng:'beautiful',ar:'جميل',type:'adj',level:'A1',ex:'La France est belle.',syn:['joli','magnifique'],note:'Féminin: belle. Pluriel: beaux/belles.'},
  {fr:'grand',pron:'ɡʁɑ̃',eng:'big/tall',ar:'كبير',type:'adj',level:'A1',ex:'La Tour Eiffel est grande.',syn:['immense'],note:'Peut signifier "grand" (taille) ou "great".'},
  {fr:'bon',pron:'bɔ̃',eng:'good',ar:'جيد',type:'adj',level:'A1',ex:"C'est une bonne idée!",syn:['excellent'],note:'"Bon" (adj) ≠ "bien" (adv).'},
  {fr:'nouveau',pron:'nu.vo',eng:'new',ar:'جديد',type:'adj',level:'A2',ex:"J'ai un nouveau téléphone.",syn:['récent'],note:'Nouvel devant voyelle. Fém: nouvelle.'},
  {fr:'maison',pron:'mɛ.zɔ̃',eng:'house',ar:'منزل',type:'noun',level:'A1',ex:"J'aime ma maison.",syn:['demeure','foyer'],note:'Féminin: LA maison.'},
  {fr:'ville',pron:'vil',eng:'city',ar:'مدينة',type:'noun',level:'A1',ex:'Paris est une belle ville.',syn:['cité','métropole'],note:'Féminin: la ville.'},
  {fr:'temps',pron:'tɑ̃',eng:'time/weather',ar:'وقت/طقس',type:'noun',level:'A2',ex:"Je n'ai pas le temps.",syn:['durée','météo'],note:'Ambiguïté: time ou weather selon contexte.'},
  {fr:'vie',pron:'vi',eng:'life',ar:'حياة',type:'noun',level:'A1',ex:'La vie est belle!',syn:['existence'],note:'Féminin: la vie.'},
  {fr:'amour',pron:'a.muʁ',eng:'love',ar:'حب',type:'noun',level:'A1',ex:"L'amour est aveugle.",syn:['affection','passion'],note:'Masculin singulier.'},
  {fr:'manger',pron:'mɑ̃.ʒe',eng:'to eat',ar:'يأكل',type:'verb',level:'A1',ex:"J'aime manger du pain.",syn:['se nourrir','déguster'],note:'Nous mangeons (e avant o/a).'},
  {fr:'parler',pron:'paʁ.le',eng:'to speak',ar:'يتكلم',type:'verb',level:'A1',ex:'Je parle français.',syn:['discuter','converser'],note:'Verbe -ER régulier modèle.'},
  {fr:'comprendre',pron:'kɔ̃.pʁɑ̃.dʁə',eng:'to understand',ar:'يفهم',type:'verb',level:'A2',ex:'Je comprends le français.',syn:['saisir'],note:'Comme "prendre" — irrégulier.'},
  {fr:'liberté',pron:'li.bɛʁ.te',eng:'freedom',ar:'حرية',type:'noun',level:'B1',ex:'Liberté, Égalité, Fraternité.',syn:['indépendance'],note:'Devise nationale de la France.'},
  {fr:'connaissance',pron:'kɔ.nɛ.sɑ̃s',eng:'knowledge',ar:'معرفة',type:'noun',level:'B1',ex:'Il a de bonnes connaissances.',syn:['savoir'],note:'Pluriel: "des connaissances" = acquaintances.'},
  {fr:'pourtant',pron:'puʁ.tɑ̃',eng:'yet/however',ar:'ومع ذلك',type:'adv',level:'B1',ex:'Il fait froid, pourtant je sors.',syn:['cependant','néanmoins'],note:'Relie deux idées contradictoires.'},
  {fr:'notamment',pron:'no.ta.mɑ̃',eng:'notably',ar:'لا سيما',type:'adv',level:'B2',ex:'Plusieurs villes, notamment Paris.',syn:['en particulier'],note:'Pour donner un exemple représentatif.'},
  {fr:'enjeu',pron:'ɑ̃.ʒø',eng:'stake/issue',ar:'رهان',type:'noun',level:'B2',ex:'Les enjeux climatiques sont majeurs.',syn:['défi','question'],note:'Pluriel: enjeux (très courant en débat).'},
  {fr:'flâner',pron:'flɑ.ne',eng:'to stroll',ar:'يتجول',type:'verb',level:'B1',ex:"J'aime flâner dans Paris.",syn:['se promener','déambuler'],note:'Concept culturel français typique.'},
  {fr:'dépaysement',pron:'de.pɛ.iz.mɑ̃',eng:'feeling somewhere new',ar:'شعور الاغتراب الممتع',type:'noun',level:'B2',ex:'Le voyage m\'apporte un dépaysement.',syn:['changement de décor'],note:'Sans traduction exacte en anglais.'},
  {fr:'savoir-faire',pron:'sa.vwaʁ.fɛʁ',eng:'expertise/know-how',ar:'كفاءة',type:'noun',level:'B1',ex:'Il a un vrai savoir-faire.',syn:['compétence','expertise'],note:'Utilisé internationalement.'},
  {fr:'francophone',pron:'fʁɑ̃.kɔ.fɔn',eng:'French-speaking',ar:'الناطق بالفرنسية',type:'adj',level:'A2',ex:'Le Québec est francophone.',syn:['de langue française'],note:'300M+ francophones dans le monde.'},
  {fr:'quotidien',pron:'kɔ.ti.djɛ̃',eng:'daily/everyday',ar:'يومي',type:'adj',level:'A2',ex:'La vie quotidienne en France.',syn:['journalier'],note:'Aussi nom: "un quotidien" = journal.'},
  {fr:'accueillir',pron:'a.kœ.jiʁ',eng:'to welcome',ar:'يرحب',type:'verb',level:'B1',ex:'La France accueille des touristes.',syn:['recevoir','héberger'],note:'Irrégulier. Participe: accueilli.'},
  {fr:'nuance',pron:'ny.ɑ̃s',eng:'nuance',ar:'فارق دقيق',type:'noun',level:'B2',ex:'Il faut saisir les nuances.',syn:['subtilité'],note:'Mot français adopté en anglais!'},
  {fr:'terroir',pron:'tɛ.ʁwaʁ',eng:'local character',ar:'الهوية المحلية',type:'noun',level:'B2',ex:'Ce vin exprime le terroir.',syn:['région','territoire'],note:'Concept français intraduisible.'},
  {fr:'débrouillard',pron:'de.bʁu.jaʁ',eng:'resourceful',ar:'ذكي متحيل',type:'adj',level:'B1',ex:'Il est très débrouillard.',syn:['ingénieux','malin'],note:'De "se débrouiller" = to manage.'},
  {fr:'moyen',pron:'mwa.jɛ̃',eng:'means/average',ar:'وسيلة/متوسط',type:'noun',level:'A2',ex:'Par quel moyen vas-tu?',syn:['façon','manière'],note:'"Moyens" = financial means.'},
  {fr:'francophile',pron:'fʁɑ̃.kɔ.fil',eng:'lover of French culture',ar:'محب الثقافة الفرنسية',type:'noun',level:'B1',ex:'Je suis francophile!',syn:['admirateur de la France'],note:'-phile = love of.'},
  {fr:'épanouissement',pron:'e.pa.nu.is.mɑ̃',eng:'fulfillment/blossoming',ar:'ازدهار',type:'noun',level:'C1',ex:"L'épanouissement personnel est vital.",syn:['accomplissement'],note:'Très utilisé en développement personnel.'},
  {fr:'nonobstant',pron:'nɔ.nɔbs.tɑ̃',eng:'notwithstanding/despite',ar:'رغم',type:'prep',level:'C1',ex:'Nonobstant les difficultés, il réussit.',syn:['malgré','en dépit de'],note:'Terme formel/juridique.'},
];

const SITUATIONS=[
  {id:'airport',icon:'✈️',name:'À l\'aéroport',desc:'Check-in, bagages, embarquement',
   vocab:['réservation','vol','billet','bagages','passeport'],
   lines:[
    {spk:'Passager',fr:'Bonjour! J\'ai une réservation au nom de Dupont.',tr:'Hello! I have a reservation under Dupont.',b:false},
    {spk:'Agent',fr:'Très bien. Votre destination aujourd\'hui?',tr:'Very well. Your destination today?',b:true},
    {spk:'Passager',fr:'Paris, vol AF123. Voici mon passeport.',tr:'Paris, flight AF123. Here is my passport.',b:false},
    {spk:'Agent',fr:'Avez-vous des bagages à enregistrer?',tr:'Do you have luggage to check in?',b:true},
    {spk:'Passager',fr:'Oui, une valise. Et la porte d\'embarquement?',tr:'Yes, one suitcase. And the boarding gate?',b:false},
    {spk:'Agent',fr:'Porte 24, niveau 2. Bon voyage!',tr:'Gate 24, level 2. Have a good trip!',b:true},
  ]},
  {id:'restaurant',icon:'🍽️',name:'Au restaurant',desc:'Commander, payer',
   vocab:['menu','plat du jour','addition','pourboire','allergie'],
   lines:[
    {spk:'Serveur',fr:'Bonsoir! Vous avez réservé ce soir?',tr:'Good evening! Do you have a reservation?',b:false},
    {spk:'Client',fr:'Oui, au nom de Martin, pour deux.',tr:'Yes, under Martin, for two.',b:true},
    {spk:'Serveur',fr:'Voici la carte. Avez-vous des allergies?',tr:'Here is the menu. Any allergies?',b:false},
    {spk:'Client',fr:'Non. Je voudrais le steak-frites, s\'il vous plaît.',tr:'No. I would like the steak-frites please.',b:true},
    {spk:'Serveur',fr:'Très bon choix! Et comme boisson?',tr:'Excellent choice! And to drink?',b:false},
    {spk:'Client',fr:'Une carafe d\'eau. Et l\'addition, s\'il vous plaît!',tr:'A carafe of water. And the bill please!',b:true},
  ]},
  {id:'hotel',icon:'🏨',name:'À l\'hôtel',desc:'Réservation, check-in',
   vocab:['chambre','double','clé','étage','petit-déjeuner'],
   lines:[
    {spk:'Réceptionniste',fr:'Bienvenue! Vous avez une réservation?',tr:'Welcome! Do you have a reservation?',b:false},
    {spk:'Client',fr:'Oui, chambre double pour trois nuits. Lambert.',tr:'Yes, double room for three nights. Lambert.',b:true},
    {spk:'Réceptionniste',fr:'Chambre 304, troisième étage.',tr:'Room 304, third floor.',b:false},
    {spk:'Client',fr:'Le petit-déjeuner est inclus?',tr:'Is breakfast included?',b:true},
    {spk:'Réceptionniste',fr:'Oui, de 7h à 10h au restaurant.',tr:'Yes, from 7 to 10am at the restaurant.',b:false},
  ]},
  {id:'shopping',icon:'🛍️',name:'Au magasin',desc:'Tailles, prix, remises',
   vocab:['taille','prix','soldes','remise','essayage'],
   lines:[
    {spk:'Vendeur',fr:'Bonjour! Je peux vous aider?',tr:'Hello! Can I help you?',b:false},
    {spk:'Client',fr:'Je cherche une veste, taille M.',tr:'I\'m looking for a jacket, size M.',b:true},
    {spk:'Vendeur',fr:'Quelle couleur? Nous avons 30% de remise!',tr:'What colour? We have 30% off!',b:false},
    {spk:'Client',fr:'Quelque chose de bleu. C\'est combien?',tr:'Something blue. How much?',b:true},
    {spk:'Vendeur',fr:'Cette veste est à 62 euros avec la remise.',tr:'This jacket is 62 euros with the discount.',b:false},
  ]},
  {id:'doctor',icon:'👨‍⚕️',name:'Chez le médecin',desc:'Symptômes, ordonnance',
   vocab:['fièvre','ordonnance','médicament','douleur','consultation'],
   lines:[
    {spk:'Médecin',fr:'Qu\'est-ce qui vous amène?',tr:'What brings you in?',b:false},
    {spk:'Patient',fr:'Je ne me sens pas bien depuis trois jours.',tr:'I haven\'t felt well for three days.',b:true},
    {spk:'Médecin',fr:'Quels sont vos symptômes?',tr:'What are your symptoms?',b:false},
    {spk:'Patient',fr:'Fièvre, mal à la gorge et toux.',tr:'Fever, sore throat and cough.',b:true},
    {spk:'Médecin',fr:'C\'est une angine. Je vous prescris des antibiotiques.',tr:'It\'s tonsillitis. I\'ll prescribe antibiotics.',b:false},
  ]},
  {id:'directions',icon:'🗺️',name:'Demander son chemin',desc:'Directions, transports',
   vocab:['tout droit','tourner','traverser','carrefour','station'],
   lines:[
    {spk:'Touriste',fr:'Excusez-moi, où est la Tour Eiffel?',tr:'Excuse me, where is the Eiffel Tower?',b:false},
    {spk:'Parisien',fr:'Prenez le métro, ligne 6 direction Nation.',tr:'Take the metro, line 6 direction Nation.',b:true},
    {spk:'Touriste',fr:'Je descends à quelle station?',tr:'Which station do I get off at?',b:false},
    {spk:'Parisien',fr:'Champ-de-Mars — Tour Eiffel. 10 minutes d\'ici.',tr:'Champ-de-Mars — Eiffel Tower. 10 min from here.',b:true},
    {spk:'Touriste',fr:'Merci beaucoup!',tr:'Thank you very much!',b:false},
  ]},
];

const STORIES=[
  {id:'s1',title:'Une Journée Parfaite à Paris',level:'A1',img:'paris-eiffel',episodes:4,
   ep:[
    {n:1,title:'L\'arrivée',text:'Marie arrive à Paris pour la première fois. Elle sort de l\'aéroport Charles de Gaulle et prend le RER B vers le centre. Dans le train, elle est très excitée — Paris l\'attend enfin!',vocab:[{fr:'arriver',e:'arrive'},{fr:'sortir',e:'exit'},{fr:'prendre',e:'take'},{fr:'excité',e:'excited'}],q:'Comment Marie arrive-t-elle?',opts:['En voiture','En avion','En train depuis Lyon','À pied'],ans:1},
    {n:2,title:'L\'hôtel',text:'Marie arrive à son hôtel près de Notre-Dame. La chambre est petite mais charmante avec une belle vue sur la Seine. Elle pose ses valises et décide d\'explorer la ville.',vocab:[{fr:'charmant',e:'charming'},{fr:'vue',e:'view'},{fr:'poser',e:'put down'},{fr:'explorer',e:'explore'}],q:'Où est l\'hôtel?',opts:['Près de la Tour Eiffel','Près de Notre-Dame','À Montmartre','À Versailles'],ans:1},
    {n:3,title:'Le déjeuner',text:'"Je voudrais un croque-monsieur et un café," dit Marie au serveur. "Très bien, Mademoiselle!" répond-il avec un sourire. Le repas est délicieux.',vocab:[{fr:'avoir faim',e:'be hungry'},{fr:'commander',e:'order'},{fr:'délicieux',e:'delicious'},{fr:'serveur',e:'waiter'}],q:'Que commande Marie?',opts:['Un steak','Un croissant','Un croque-monsieur','Une salade'],ans:2},
    {n:4,title:'La Tour Eiffel',text:'L\'après-midi, Marie visite la Tour Eiffel. Elle monte au deuxième étage et admire la vue panoramique. "C\'est le plus beau jour de ma vie!" dit-elle.',vocab:[{fr:'visiter',e:'visit'},{fr:'immense',e:'huge'},{fr:'monter',e:'go up'},{fr:'panoramique',e:'panoramic'}],q:'Marie monte à quel étage?',opts:['Au sommet','Au premier','Au deuxième','Au rez-de-chaussée'],ans:2},
  ]},
  {id:'s2',title:'L\'Académie de Magie de Lyon',level:'A2',img:'notre-dame',episodes:3,
   ep:[
    {n:1,title:'Le nouveau sorcier',text:'Hugo est un jeune sorcier qui vient d\'intégrer l\'Académie de Magie de Lyon. Son problème: ses sorts ne fonctionnent jamais! Hier, il a voulu créer une boule de feu et il a produit... un ballon.',vocab:[{fr:'intégrer',e:'join'},{fr:'sort',e:'spell'},{fr:'fonctionner',e:'work'},{fr:'produire',e:'produce'}],q:'Quel est le problème d\'Hugo?',opts:['Il n\'aime pas l\'école','Ses sorts ratent','Il n\'a pas de baguette','Il est trop jeune'],ans:1},
    {n:2,title:'La bibliothèque secrète',text:'Hugo découvre une bibliothèque secrète sous l\'Académie. Un vieux livre révèle pourquoi ses sorts échouent: il prononce mal les formules! Le français des sorts doit être parfait.',vocab:[{fr:'découvrir',e:'discover'},{fr:'échouer',e:'fail'},{fr:'prononcer',e:'pronounce'},{fr:'parfait',e:'perfect'}],q:'Pourquoi les sorts d\'Hugo ratent-ils?',opts:['Manque de concentration','Mauvaise prononciation','Baguette cassée','Trop pressé'],ans:1},
    {n:3,title:'Le grand examen',text:'Après des semaines d\'entraînement, Hugo réussit son examen. Madame Leclair lui demande de produire une tempête miniature. Hugo se concentre et récite la formule parfaitement. Une magnifique tempête tourbillonne!',vocab:[{fr:'entraînement',e:'training'},{fr:'réussir',e:'succeed'},{fr:'tempête',e:'storm'},{fr:'tourbillonner',e:'swirl'}],q:'Comment Hugo réussit-il?',opts:['Avec une nouvelle baguette','En copiant','En maîtrisant la prononciation','En annulant'],ans:2},
  ]},
  {id:'s3',title:'Le Chef de Lyon',level:'B1',img:'versailles',episodes:3,
   ep:[
    {n:1,title:'Le concours',text:'Camille Rousseau, 28 ans, participe au Grand Concours de Cuisine de Lyon. Son rival, le chef Dupuis, a gagné trois fois. Thème de l\'année: "La France dans une assiette". 90 minutes pour impressionner les juges.',vocab:[{fr:'concours',e:'competition'},{fr:'rival',e:'rival'},{fr:'impressionner',e:'impress'},{fr:'assiette',e:'plate/dish'}],q:'Quel est le thème du concours?',opts:['Cuisine moderne','La France dans une assiette','Desserts français','Cuisine méditerranéenne'],ans:1},
    {n:2,title:'La création',text:'Camille prépare un bœuf bourguignon revisité, avec des légumes du terroir et un vin de Bourgogne. Le chef Dupuis la regarde avec mépris. Mais Camille pense à sa grand-mère qui lui a appris à cuisiner.',vocab:[{fr:'terroir',e:'local soil'},{fr:'mépris',e:'contempt'},{fr:'revisiter',e:'reinvent'},{fr:'préparer',e:'prepare'}],q:'De quel plat Camille s\'inspire-t-elle?',opts:['Quiche lorraine','Bœuf bourguignon revisité','Crêpes Suzette','Soufflé'],ans:1},
    {n:3,title:'La victoire',text:'"Ce plat raconte une histoire," dit un juge. "On y sent la tradition et l\'amour familial." Camille gagne le premier prix! Le chef Dupuis lui serre la main, impressionné malgré lui.',vocab:[{fr:'tradition',e:'tradition'},{fr:'malgré',e:'despite'},{fr:'serrer la main',e:'shake hands'},{fr:'victoire',e:'victory'}],q:'Pourquoi Camille gagne-t-elle?',opts:['Son plat est rapide','Il est épicé','Il raconte une histoire','Il est classique'],ans:2},
  ]},
];

const WOD_POOL=[
  {fr:'Flâner',pron:'flɑ.ne',eng:'To stroll without purpose',ar:'التجوال بلا هدف',ex:"J'aime flâner dans Paris.",note:'Concept culturel français typique.',level:'B1'},
  {fr:'Dépaysement',pron:'de.pɛ.iz.mɑ̃',eng:'Feeling of being somewhere new',ar:'شعور الاغتراب الممتع',ex:'Ce voyage m\'apporte un dépaysement.',note:'Sans traduction exacte en anglais.',level:'B2'},
  {fr:'Savoir-faire',pron:'sa.vwaʁ.fɛʁ',eng:'Know-how / Expertise',ar:'كفاءة وخبرة',ex:'Il a un vrai savoir-faire.',note:'Utilisé internationalement.',level:'B1'},
  {fr:'Esprit',pron:'ɛs.pʁi',eng:'Mind / Wit / Spirit',ar:'روح/عقل/ذكاء',ex:'Il a beaucoup d\'esprit.',note:'Polysémique: mind, spirit, ghost, wit.',level:'A2'},
  {fr:'Pourtant',pron:'puʁ.tɑ̃',eng:'Yet / However',ar:'ومع ذلك',ex:'Il fait froid, pourtant je sors.',note:'Relie deux idées contradictoires.',level:'B1'},
  {fr:'Nonobstant',pron:'nɔ.nɔbs.tɑ̃',eng:'Notwithstanding',ar:'رغم ذلك',ex:'Nonobstant les difficultés.',note:'Terme formel/juridique.',level:'C1'},
  {fr:'Terroir',pron:'tɛ.ʁwaʁ',eng:'Local character',ar:'هوية المنطقة',ex:'Ce vin exprime le terroir.',note:'Concept français intraduisible.',level:'B2'},
];

const TIERS=[
  {min:0,   max:300,  name:'Débutant',    icon:'S1',color:'#9333EA'},
  {min:300, max:800,  name:'Apprenti',    icon:'S2',color:'#1D4ED8'},
  {min:800, max:1800, name:'Intermédiaire',icon:'S3',color:'#065F46'},
  {min:1800,max:3500, name:'Avancé',      icon:'S4',color:'#B45309'},
  {min:3500,max:7000, name:'Expert',      icon:'S5',color:'#D62828'},
  {min:7000,max:99999,name:'Maître',      icon:'S6',color:'#831843'},
];
function getTier(xp){return TIERS.find(t=>xp>=t.min&&xp<t.max)||TIERS[0];}

const GRAMMAR=[
  {id:'g1',topic:'Le Genre des Noms',level:'A1',rule:'Chaque nom français a un genre: masculin (le/un) ou féminin (la/une). Le genre doit être mémorisé avec le mot. Indices: -tion, -ure, -ette, -té = souvent féminin. -ment, -age, -isme = souvent masculin.',
   examples:['la maison (f)','le livre (m)','la liberté (f)','le gouvernement (m)'],
   tip:'Apprenez toujours le nom avec son article.',
   test:[{q:'Quel article pour "fleur"?',opts:['le','la','les'],ans:1,exp:'"La fleur" est féminin.'},{q:'Quel article pour "bonheur"?',opts:['le','la','les'],ans:0,exp:'"Le bonheur" est masculin.'}]},
  {id:'g2',topic:'Passé Composé vs Imparfait',level:'A2',rule:'PASSÉ COMPOSÉ = action terminée, ponctuelle. IMPARFAIT = état, habitude, action en cours dans le passé.',
   examples:['Il pleuvait (état) quand je suis sorti (action).','Hier, j\'ai mangé une pizza.','Chaque matin, il buvait son café.'],
   tip:'Imparfait = was doing / used to. Passé composé = did.',
   test:[{q:'"I used to live in Paris" — quel temps?',opts:['Passé composé','Imparfait'],ans:1,exp:'Habitude passée → Imparfait.'},{q:'"Suddenly she entered" — quel temps?',opts:['Passé composé','Imparfait'],ans:0,exp:'Action soudaine → Passé composé.'}]},
  {id:'g3',topic:'Le Subjonctif',level:'B1',rule:'Le subjonctif exprime: doute, nécessité, souhait, émotion, jugement. Après: il faut que, je veux que, bien que, pour que, à condition que...',
   examples:['Il faut que tu sois à l\'heure.','Bien que tu sois fatigué, tu travailles.','Je veux qu\'il vienne.'],
   tip:'Radical de la 3e pers. pluriel + -e/-es/-e/-ions/-iez/-ent.',
   test:[{q:'"Il faut que tu ___" (étudier)',opts:['étudies','étudions','études'],ans:0,exp:'Subjonctif: tu étudies.'},{q:'"Bien que ce ___" (être)',opts:['est','soit','sera'],ans:1,exp:'"Bien que" + subjonctif: il soit.'}]},
];
