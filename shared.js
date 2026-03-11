// ============================================================
//  TBH Platform — VisionCoreGroup
//  shared.js  |  v1.0.0
// ============================================================

// ── API URL — faqat shu yerda o'zgartiring ─────────────────
const API_URL = "https://your-username.pythonanywhere.com";
// Misol: "https://visioncoregroup.pythonanywhere.com"
// ───────────────────────────────────────────────────────────

// ── Til / valyuta / davr (localStorage) ────────────────────
window.TBH = {
  lang:   localStorage.getItem('tbh_lang')   || 'uz',
  curr:   localStorage.getItem('tbh_curr')   || 'uzs',
  period: localStorage.getItem('tbh_period') || 'monthly',
};
function saveLang(l)  { window.TBH.lang=l;   localStorage.setItem('tbh_lang',l); }
function saveCurr(c)  { window.TBH.curr=c;   localStorage.setItem('tbh_curr',c); }
function savePeriod(p){ window.TBH.period=p; localStorage.setItem('tbh_period',p); }

// ── Token (JWT) ─────────────────────────────────────────────
function getToken()        { return localStorage.getItem('tbh_token'); }
function setToken(t)       { localStorage.setItem('tbh_token', t); }
function removeToken()     { localStorage.removeItem('tbh_token'); localStorage.removeItem('tbh_user'); }
function getUser()         { try{ return JSON.parse(localStorage.getItem('tbh_user')); }catch(e){ return null; } }
function setUser(u)        { localStorage.setItem('tbh_user', JSON.stringify(u)); }
function isLoggedIn()      { return !!getToken(); }

// ── API yordamchi ───────────────────────────────────────────
async function api(method, path, body=null, auth=true) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);

  try {
    const res = await fetch(API_URL + path, opts);
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Xato yuz berdi');
    return data;
  } catch(e) {
    throw e;
  }
}

const GET    = (path, auth=true)        => api('GET',    path, null, auth);
const POST   = (path, body, auth=true)  => api('POST',   path, body, auth);
const PUT    = (path, body, auth=true)  => api('PUT',    path, body, auth);
const PATCH  = (path, body={}, auth=true) => api('PATCH', path, body, auth);
const DELETE = (path, auth=true)        => api('DELETE', path, null, auth);

// ── Toast xabarnoma ─────────────────────────────────────────
function toast(msg, type='success') {
  const old = document.getElementById('_tbh_toast');
  if (old) old.remove();
  const colors = { success:'#00e5a0', error:'#ff4f7b', info:'#4f6ef7', warn:'#f7c948' };
  const textColors = { success:'#000', error:'#fff', info:'#fff', warn:'#000' };
  const t = document.createElement('div');
  t.id = '_tbh_toast';
  t.style.cssText = `
    position:fixed;bottom:28px;right:28px;z-index:99999;
    background:${colors[type]||colors.success};
    color:${textColors[type]||'#000'};
    font-family:'Plus Jakarta Sans',sans-serif;font-size:.86rem;font-weight:600;
    padding:13px 22px;border-radius:11px;
    box-shadow:0 4px 28px rgba(0,0,0,.45);
    animation:_tin .28s ease;pointer-events:none;max-width:340px;line-height:1.4;
  `;
  t.innerHTML = `<style>@keyframes _tin{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}</style>${msg}`;
  document.body.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transition='opacity .3s'; },2400);
  setTimeout(()=>t.remove(), 2700);
}

// ── Loading tugma ───────────────────────────────────────────
function btnLoad(btn, loading=true) {
  if (loading) {
    btn._orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span style="opacity:.7">⏳ Yuklanmoqda...</span>';
  } else {
    btn.disabled = false;
    btn.innerHTML = btn._orig || btn.innerHTML;
  }
}

// ── Modal ───────────────────────────────────────────────────
function openModal(id)  { const m=document.getElementById(id+'Modal'); if(m){ m.classList.add('open'); document.body.style.overflow='hidden'; } }
function closeModal(id) { const m=document.getElementById(id+'Modal'); if(m){ m.classList.remove('open'); document.body.style.overflow=''; } }
function switchModal(a,b){ closeModal(a); setTimeout(()=>openModal(b),150); }

// ── Scroll fade animatsiya ──────────────────────────────────
function initFade() {
  document.querySelectorAll('.fade').forEach(el =>
    new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('in');
    }), { threshold: 0.08 }).observe(el)
  );
}

// ── Nav: login holatga qarab o'zgartirish ───────────────────
function updateNavAuth() {
  const loginBtn  = document.getElementById('ni_login');
  const regBtn    = document.getElementById('ni_reg');
  if (!loginBtn || !regBtn) return;

  if (isLoggedIn()) {
    loginBtn.textContent = { uz:'Dashboard', ru:'Дашборд', en:'Dashboard' }[TBH.lang] || 'Dashboard';
    loginBtn.onclick = () => window.location.href = 'dashboard.html';
    regBtn.textContent = { uz:'Chiqish', ru:'Выйти', en:'Logout' }[TBH.lang] || 'Logout';
    regBtn.onclick = doLogout;
  } else {
    loginBtn.onclick = () => openModal('login');
    regBtn.onclick   = () => openModal('reg');
  }
}

function doLogout() {
  removeToken();
  window.location.href = 'index.html';
}

// ── Tariflar ma'lumoti ──────────────────────────────────────
const plans = [
  {name:'Free',    badge:'',    daily:{uzs:0,usd:0,rub:0},monthly:{uzs:0,usd:0,rub:0},yearly:{uzs:0,usd:0,rub:0},ram:'64MB',disk:'500MB',bots:1,desc:{uz:'Sinov uchun',ru:'Для тестирования',en:'For testing'}},
  {name:'Lite',    badge:'new', daily:{uzs:500,usd:0.04,rub:4},monthly:{uzs:9900,usd:0.8,rub:80},yearly:{uzs:95000,usd:7.8,rub:770},ram:'128MB',disk:'1GB',bots:1,desc:{uz:'Kichik bot',ru:'Маленький бот',en:'Small bot'}},
  {name:'Mini',    badge:'',    daily:{uzs:1200,usd:0.1,rub:10},monthly:{uzs:25000,usd:2,rub:200},yearly:{uzs:240000,usd:19,rub:1900},ram:'256MB',disk:'2GB',bots:2,desc:{uz:'Shaxsiy bot',ru:'Личный бот',en:'Personal bot'}},
  {name:'Starter', badge:'',    daily:{uzs:2500,usd:0.2,rub:20},monthly:{uzs:49000,usd:4,rub:400},yearly:{uzs:470000,usd:38,rub:3800},ram:'512MB',disk:'5GB',bots:3,desc:{uz:"Boshlang'ich",ru:'Начальный',en:'Entry level'}},
  {name:'Basic',   badge:'',    daily:{uzs:4500,usd:0.37,rub:37},monthly:{uzs:89000,usd:7.5,rub:730},yearly:{uzs:860000,usd:72,rub:7200},ram:'1GB',disk:'10GB',bots:5,desc:{uz:'Asosiy plan',ru:'Базовый',en:'Basic plan'}},
  {name:'Standard',badge:'',    daily:{uzs:7000,usd:0.58,rub:58},monthly:{uzs:139000,usd:11.5,rub:1150},yearly:{uzs:1340000,usd:110,rub:11000},ram:'1.5GB',disk:'20GB',bots:7,desc:{uz:"O'rta biznes",ru:'Средний бизнес',en:'Mid business'}},
  {name:'Plus',    badge:'',    daily:{uzs:9900,usd:0.82,rub:82},monthly:{uzs:199000,usd:16.5,rub:1640},yearly:{uzs:1900000,usd:158,rub:15800},ram:'2GB',disk:'30GB',bots:10,desc:{uz:"Ko'proq resurs",ru:'Больше ресурсов',en:'More resources'}},
  {name:'Pro',     badge:'hot', daily:{uzs:14900,usd:1.2,rub:120},monthly:{uzs:299000,usd:24.5,rub:2450},yearly:{uzs:2880000,usd:235,rub:23500},ram:'4GB',disk:'50GB',bots:20,desc:{uz:'Professional',ru:'Профессиональный',en:'Professional'}},
  {name:'Advanced',badge:'',    daily:{uzs:22000,usd:1.8,rub:180},monthly:{uzs:449000,usd:37,rub:3700},yearly:{uzs:4300000,usd:352,rub:35200},ram:'6GB',disk:'80GB',bots:30,desc:{uz:"Ilg'or",ru:'Продвинутый',en:'Advanced'}},
  {name:'Business',badge:'',    daily:{uzs:32000,usd:2.6,rub:260},monthly:{uzs:649000,usd:53,rub:5300},yearly:{uzs:6200000,usd:508,rub:50800},ram:'8GB',disk:'120GB',bots:50,desc:{uz:'Biznes',ru:'Бизнес',en:'Business'}},
  {name:'Premium', badge:'',    daily:{uzs:45000,usd:3.7,rub:370},monthly:{uzs:899000,usd:74,rub:7400},yearly:{uzs:8600000,usd:708,rub:70800},ram:'12GB',disk:'200GB',bots:100,desc:{uz:'Premium',ru:'Премиум',en:'Premium'}},
  {name:'Ultra',   badge:'',    daily:{uzs:62000,usd:5.1,rub:510},monthly:{uzs:1249000,usd:103,rub:10300},yearly:{uzs:11900000,usd:980,rub:98000},ram:'16GB',disk:'300GB',bots:200,desc:{uz:'Ultra kuchli',ru:'Ультра',en:'Ultra'}},
  {name:'Max',     badge:'',    daily:{uzs:85000,usd:7,rub:700},monthly:{uzs:1699000,usd:140,rub:14000},yearly:{uzs:16200000,usd:1330,rub:133000},ram:'24GB',disk:'500GB',bots:500,desc:{uz:'Maksimal',ru:'Максимум',en:'Max'}},
  {name:'Elite',   badge:'',    daily:{uzs:115000,usd:9.4,rub:940},monthly:{uzs:2299000,usd:190,rub:19000},yearly:{uzs:21900000,usd:1800,rub:180000},ram:'32GB',disk:'1TB',bots:1000,desc:{uz:'Elite',ru:'Элита',en:'Elite'}},
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
    {q:"TBH Platform nima?",a:"TBH Platform — VisionCoreGroup jamoasi tomonidan yaratilgan Telegram botlarni hosting qilish uchun maxsus platforma. Python, Node.js, Go va boshqa tillarni qo'llaydi."},
    {q:"Bepul tarif nimalarni o'z ichiga oladi?",a:"64MB RAM, 500MB disk va 1 bot. Resurslar har 24 soatda qayta tiklanadi."},
    {q:"Qaysi dasturlash tillari qo'llab-quvvatlanadi?",a:"Python, Node.js, Go, PHP, Ruby, Java/Kotlin, Rust va boshqalar. To'liq ro'yxat tarifga bog'liq."},
    {q:"To'lov qanday amalga oshiriladi?",a:"Payme, Click, Uzum Pay, Visa/MasterCard orqali. To'lovdan so'ng balans avtomatik oshadi."},
    {q:"Bot to'xtab qolsa nima bo'ladi?",a:"Auto Restart tizimi darhol qayta ishga tushiradi. Telegram va email orqali xabarnoma yuboriladi."},
    {q:"Tarif o'zgartirish mumkinmi?",a:"Ha, istalgan vaqt pastdan yuqoriga yoki yuqoridan pastga o'tkazish mumkin."},
  ],
  ru:[
    {q:"Что такое TBH Platform?",a:"TBH Platform — платформа хостинга, созданная командой VisionCoreGroup специально для Telegram ботов."},
    {q:"Что включает бесплатный тариф?",a:"64MB RAM, 500MB диска и 1 бот. Ресурсы восстанавливаются каждые 24 часа."},
    {q:"Какие языки программирования поддерживаются?",a:"Python, Node.js, Go, PHP, Ruby, Java/Kotlin, Rust и другие."},
    {q:"Как осуществляется оплата?",a:"Через Payme, Click, Uzum Pay, Visa/MasterCard. Баланс пополняется автоматически после оплаты."},
    {q:"Что происходит, если бот упал?",a:"Auto Restart немедленно перезапускает бота и отправляет уведомление."},
    {q:"Можно ли сменить тариф?",a:"Да, в любое время можно повысить или понизить тариф."},
  ],
  en:[
    {q:"What is TBH Platform?",a:"TBH Platform is a hosting platform built by VisionCoreGroup specifically for Telegram bots."},
    {q:"What does the free plan include?",a:"64MB RAM, 500MB disk and 1 bot. Resources reset every 24 hours."},
    {q:"Which programming languages are supported?",a:"Python, Node.js, Go, PHP, Ruby, Java/Kotlin, Rust, and more."},
    {q:"How do I pay?",a:"Via Payme, Click, Uzum Pay, Visa/MasterCard. Balance is topped up automatically after payment."},
    {q:"What happens if my bot crashes?",a:"Auto Restart immediately restarts it and sends a notification."},
    {q:"Can I change my plan?",a:"Yes, upgrade or downgrade at any time."},
  ]
};
