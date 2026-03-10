// ===== TBH PLATFORM — VisionCoreGroup | shared.js =====

window.TBH = {
  lang: localStorage.getItem('tbh_lang') || 'uz',
  curr: localStorage.getItem('tbh_curr') || 'uzs',
  period: localStorage.getItem('tbh_period') || 'monthly',
};

function saveLang(l){ window.TBH.lang=l; localStorage.setItem('tbh_lang',l); }
function saveCurr(c){ window.TBH.curr=c; localStorage.setItem('tbh_curr',c); }
function savePeriod(p){ window.TBH.period=p; localStorage.setItem('tbh_period',p); }

const plans = [
  {name:'Free',    badge:'',    daily:{uzs:0,usd:0,rub:0},monthly:{uzs:0,usd:0,rub:0},yearly:{uzs:0,usd:0,rub:0},ram:'64MB',disk:'500MB',bots:1,desc:{uz:'Sinov uchun',ru:'Для тестирования',en:'For testing'}},
  {name:'Lite',    badge:'new', daily:{uzs:500,usd:0.04,rub:4},monthly:{uzs:9900,usd:0.8,rub:80},yearly:{uzs:95000,usd:7.8,rub:770},ram:'128MB',disk:'1GB',bots:1,desc:{uz:'Kichik bot uchun',ru:'Для маленького бота',en:'For small bot'}},
  {name:'Mini',    badge:'',    daily:{uzs:1200,usd:0.1,rub:10},monthly:{uzs:25000,usd:2,rub:200},yearly:{uzs:240000,usd:19,rub:1900},ram:'256MB',disk:'2GB',bots:2,desc:{uz:'Shaxsiy bot',ru:'Личный бот',en:'Personal bot'}},
  {name:'Starter', badge:'',    daily:{uzs:2500,usd:0.2,rub:20},monthly:{uzs:49000,usd:4,rub:400},yearly:{uzs:470000,usd:38,rub:3800},ram:'512MB',disk:'5GB',bots:3,desc:{uz:"Boshlang'ich",ru:'Начальный',en:'Entry level'}},
  {name:'Basic',   badge:'',    daily:{uzs:4500,usd:0.37,rub:37},monthly:{uzs:89000,usd:7.5,rub:730},yearly:{uzs:860000,usd:72,rub:7200},ram:'1GB',disk:'10GB',bots:5,desc:{uz:'Asosiy plan',ru:'Базовый план',en:'Basic plan'}},
  {name:'Standard',badge:'',    daily:{uzs:7000,usd:0.58,rub:58},monthly:{uzs:139000,usd:11.5,rub:1150},yearly:{uzs:1340000,usd:110,rub:11000},ram:'1.5GB',disk:'20GB',bots:7,desc:{uz:"O'rta biznes",ru:'Средний бизнес',en:'Mid business'}},
  {name:'Plus',    badge:'',    daily:{uzs:9900,usd:0.82,rub:82},monthly:{uzs:199000,usd:16.5,rub:1640},yearly:{uzs:1900000,usd:158,rub:15800},ram:'2GB',disk:'30GB',bots:10,desc:{uz:"Ko'proq resurs",ru:'Больше ресурсов',en:'More resources'}},
  {name:'Pro',     badge:'hot', daily:{uzs:14900,usd:1.2,rub:120},monthly:{uzs:299000,usd:24.5,rub:2450},yearly:{uzs:2880000,usd:235,rub:23500},ram:'4GB',disk:'50GB',bots:20,desc:{uz:'Professional',ru:'Профессиональный',en:'Professional'}},
  {name:'Advanced',badge:'',    daily:{uzs:22000,usd:1.8,rub:180},monthly:{uzs:449000,usd:37,rub:3700},yearly:{uzs:4300000,usd:352,rub:35200},ram:'6GB',disk:'80GB',bots:30,desc:{uz:"Ilg'or plan",ru:'Продвинутый план',en:'Advanced plan'}},
  {name:'Business',badge:'',    daily:{uzs:32000,usd:2.6,rub:260},monthly:{uzs:649000,usd:53,rub:5300},yearly:{uzs:6200000,usd:508,rub:50800},ram:'8GB',disk:'120GB',bots:50,desc:{uz:'Biznes uchun',ru:'Для бизнеса',en:'For business'}},
  {name:'Premium', badge:'',    daily:{uzs:45000,usd:3.7,rub:370},monthly:{uzs:899000,usd:74,rub:7400},yearly:{uzs:8600000,usd:708,rub:70800},ram:'12GB',disk:'200GB',bots:100,desc:{uz:'Premium sifat',ru:'Премиум качество',en:'Premium quality'}},
  {name:'Ultra',   badge:'',    daily:{uzs:62000,usd:5.1,rub:510},monthly:{uzs:1249000,usd:103,rub:10300},yearly:{uzs:11900000,usd:980,rub:98000},ram:'16GB',disk:'300GB',bots:200,desc:{uz:'Ultra kuchli',ru:'Ультра мощный',en:'Ultra powerful'}},
  {name:'Max',     badge:'',    daily:{uzs:85000,usd:7,rub:700},monthly:{uzs:1699000,usd:140,rub:14000},yearly:{uzs:16200000,usd:1330,rub:133000},ram:'24GB',disk:'500GB',bots:500,desc:{uz:'Maksimal resurs',ru:'Максимальные ресурсы',en:'Max resources'}},
  {name:'Elite',   badge:'',    daily:{uzs:115000,usd:9.4,rub:940},monthly:{uzs:2299000,usd:190,rub:19000},yearly:{uzs:21900000,usd:1800,rub:180000},ram:'32GB',disk:'1TB',bots:1000,desc:{uz:'Elite daraja',ru:'Элитный уровень',en:'Elite tier'}},
  {name:'Enterprise',badge:'top',daily:{uzs:199000,usd:16.3,rub:1630},monthly:{uzs:3990000,usd:328,rub:32800},yearly:{uzs:38000000,usd:3120,rub:312000},ram:'64GB+',disk:'2TB+',bots:'∞',desc:{uz:'Korporativ',ru:'Корпоративный',en:'Corporate'}},
];

const techData = [
  {tech:'Python 3.x',      support:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},
  {tech:'Node.js',         support:[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1]},
  {tech:'Go (Golang)',     support:[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1]},
  {tech:'PHP',             support:[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1]},
  {tech:'Ruby',            support:[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1]},
  {tech:'Java / Kotlin',   support:[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1]},
  {tech:'Rust',            support:[0,0,0,0,0,0,0,0,1,1,1,1,1,1,1]},
  {tech:'MongoDB',         support:[0,0,0,0,0,1,1,1,1,1,1,1,1,1,1]},
  {tech:'PostgreSQL',      support:[0,0,0,0,0,0,1,1,1,1,1,1,1,1,1]},
  {tech:'Redis',           support:[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1]},
  {tech:'Webhook support', support:[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},
  {tech:'Custom Domain',   support:[0,0,0,0,1,1,1,1,1,1,1,1,1,1,1]},
  {tech:'SSH kirish',      support:[0,0,0,0,0,0,0,1,1,1,1,1,1,1,1]},
  {tech:'Dedicated IP',    support:[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1]},
  {tech:'Docker',          support:[0,0,0,0,0,0,0,0,0,0,1,1,1,1,1]},
];

const faqs = {
  uz:[
    {q:"TBH Platform nima?", a:"TBH Platform — VisionCoreGroup jamoasi tomonidan yaratilgan Telegram botlarni hosting qilish uchun maxsus platforma. Python, Node.js, Go va boshqa tillarni qo'llaydi."},
    {q:"Bepul tarif nimalarni o'z ichiga oladi?", a:"Bepul tarif 64MB RAM, 500MB disk va 1 bot uchun mo'ljallangan. 24 soatda resurslar qayta tiklanadi."},
    {q:"Qaysi dasturlash tillarini qo'llab-quvvatlaysiz?", a:"Python, Node.js, Go, PHP, Ruby, Java/Kotlin, Rust va boshqa ko'p tillarni. To'liq ro'yxat tarifga bog'liq."},
    {q:"To'lov qanday amalga oshiriladi?", a:"Payme, Click, Uzum Pay, Visa/MasterCard va boshqa to'lov tizimlari orqali to'lashingiz mumkin."},
    {q:"Bot ishlamay qolsa nima bo'ladi?", a:"Auto Restart tizimi darhol botni qayta ishga tushiradi. Telegram va email orqali xabarnoma yuboriladi."},
    {q:"Tarif o'zgartirish mumkinmi?", a:"Ha, istalgan vaqt pastdan yuqoriga yoki yuqoridan pastga tarif almashish mumkin."},
  ],
  ru:[
    {q:"Что такое TBH Platform?", a:"TBH Platform — платформа хостинга, созданная командой VisionCoreGroup специально для Telegram ботов."},
    {q:"Что включает бесплатный тариф?", a:"Бесплатный тариф: 1 бот, 64MB RAM, 500MB диска. Ресурсы восстанавливаются каждые 24 часа."},
    {q:"Какие языки программирования поддерживаются?", a:"Python, Node.js, Go, PHP, Ruby, Java/Kotlin, Rust и многие другие."},
    {q:"Как осуществляется оплата?", a:"Через Payme, Click, Uzum Pay, Visa/MasterCard и другие платёжные системы."},
    {q:"Что происходит, если бот упал?", a:"Система Auto Restart немедленно перезапускает бота и отправляет уведомление."},
    {q:"Можно ли сменить тариф?", a:"Да, в любое время можно повысить или понизить тариф."},
  ],
  en:[
    {q:"What is TBH Platform?", a:"TBH Platform is a hosting platform built by VisionCoreGroup specifically for Telegram bots."},
    {q:"What does the free plan include?", a:"Free plan: 1 bot, 64MB RAM, 500MB disk. Resources reset every 24 hours."},
    {q:"Which programming languages are supported?", a:"Python, Node.js, Go, PHP, Ruby, Java/Kotlin, Rust, and many more."},
    {q:"How do I pay?", a:"Via Payme, Click, Uzum Pay, Visa/MasterCard, and other payment systems."},
    {q:"What happens if my bot crashes?", a:"Auto Restart immediately restarts your bot and sends a notification."},
    {q:"Can I change my plan?", a:"Yes, upgrade or downgrade at any time."},
  ]
};

// Toast notification
function toast(msg, type='success'){
  const old = document.getElementById('_toast');
  if(old) old.remove();
  const t = document.createElement('div');
  t.id = '_toast';
  t.style.cssText = `position:fixed;bottom:28px;right:28px;z-index:99999;background:${type==='error'?'#ff4f7b':type==='info'?'#4f6ef7':'#00e5a0'};color:${type==='info'?'#fff':'#000'};font-family:'Plus Jakarta Sans',sans-serif;font-size:.86rem;font-weight:600;padding:12px 20px;border-radius:10px;box-shadow:0 4px 24px rgba(0,0,0,.4);animation:toastIn .3s ease;pointer-events:none;max-width:320px;`;
  t.innerHTML = `<style>@keyframes toastIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}</style>${msg}`;
  document.body.appendChild(t);
  setTimeout(()=>t.style.opacity='0',2200);
  setTimeout(()=>t.remove(),2500);
}

// Modal helpers (shared)
function openModal(id){ const m=document.getElementById(id+'Modal'); if(m){m.classList.add('open');document.body.style.overflow='hidden';} }
function closeModal(id){ const m=document.getElementById(id+'Modal'); if(m){m.classList.remove('open');document.body.style.overflow='';} }
function switchModal(a,b){ closeModal(a); setTimeout(()=>openModal(b),150); }
