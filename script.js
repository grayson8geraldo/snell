// ============ LIVE BALANCE TICKER ============
const balanceEl = document.getElementById('liveBalance');
const lastUpdateEl = document.getElementById('lastUpdate');
let balance = 753904;

function formatNL(n) {
  return n.toLocaleString('nl-NL');
}

setInterval(() => {
  balance += Math.floor(Math.random() * 12) + 1;
  balanceEl.textContent = formatNL(balance);
  lastUpdateEl.textContent = 'nu';
}, 1800);

// ============ PLAYER COUNTER ============
const playerCountEl = document.getElementById('playerCount');
const playerBigEl = document.getElementById('playerBig');
let players = 38426;
setInterval(() => {
  players += Math.floor(Math.random() * 7) - 2;
  if (players < 38000) players = 38426;
  const formatted = formatNL(players).replace(/\./g, ' ');
  if (playerCountEl) playerCountEl.textContent = formatted;
  if (playerBigEl) playerBigEl.textContent = formatted;
}, 2400);

// ============ ENERGY ANIMATION ============
const energyBar = document.getElementById('energyBar');
const energyNum = document.getElementById('energyNum');
let energy = 488;
setInterval(() => {
  energy = Math.max(380, Math.min(500, energy + (Math.random() > 0.4 ? 1 : -3)));
  if (energyBar) energyBar.style.width = (energy / 500 * 100) + '%';
  if (energyNum) energyNum.textContent = `${energy}/500`;
}, 700);

// ============ ACTIVITY FEED ============
const firstNames = [
  'Mark', 'Lieke', 'Jeroen', 'Anouk', 'Sander', 'Femke', 'Bas', 'Eline',
  'Thomas', 'Sanne', 'Pieter', 'Iris', 'Daan', 'Lotte', 'Ruben', 'Maud',
  'Joost', 'Esther', 'Stijn', 'Marieke', 'Tim', 'Noa', 'Kees', 'Jasmijn'
];
const cities = [
  'Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag', 'Eindhoven', 'Groningen',
  'Tilburg', 'Almere', 'Breda', 'Nijmegen', 'Apeldoorn', 'Haarlem',
  'Arnhem', 'Enschede', 'Amersfoort', 'Zwolle', 'Leiden', 'Maastricht'
];
const actions = [
  { tpl: (n, c, a) => `<strong>${n}</strong> uit ${c} verzamelde`, amt: () => `+${formatNL(Math.floor(Math.random() * 8000) + 500)} SNL` },
  { tpl: (n, c) => `<strong>${n}</strong> uit ${c} kocht <em>Multi-Tap</em>`, amt: () => `−2 500 SNL` },
  { tpl: (n, c) => `<strong>${n}</strong> uit ${c} activeerde <em>Auto-Bot</em>`, amt: () => `12u actief` },
  { tpl: (n, c) => `<strong>${n}</strong> uit ${c} nodigde een vriend uit`, amt: () => `+25 000 SNL` },
  { tpl: (n, c) => `<strong>${n}</strong> uit ${c} klom naar`, amt: () => `Top ${Math.floor(Math.random() * 500) + 50}` },
];

const feedEl = document.getElementById('activityFeed');

function makeRow() {
  const name = firstNames[Math.floor(Math.random() * firstNames.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const initial = name[0];

  const row = document.createElement('div');
  row.className = 'activity-row';
  row.innerHTML = `
    <div class="activity-avatar">${initial}</div>
    <div class="activity-text">${action.tpl(name, city)}</div>
    <div class="activity-amount">${action.amt()}</div>
  `;
  return row;
}

function seedFeed() {
  if (!feedEl) return;
  for (let i = 0; i < 6; i++) feedEl.appendChild(makeRow());
}
seedFeed();

setInterval(() => {
  if (!feedEl) return;
  const row = makeRow();
  feedEl.insertBefore(row, feedEl.firstChild);
  while (feedEl.children.length > 8) feedEl.removeChild(feedEl.lastChild);
}, 2200);

// ============ STICKY CTA REVEAL ============
const stickyCta = document.querySelector('.sticky-cta');
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (!stickyCta || !heroSection) return;
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  const ctaSection = document.getElementById('cta');
  const ctaTop = ctaSection ? ctaSection.offsetTop : Infinity;
  const y = window.scrollY + window.innerHeight;
  if (window.scrollY > heroBottom - 200 && y < ctaTop) {
    stickyCta.classList.add('visible');
  } else {
    stickyCta.classList.remove('visible');
  }
}, { passive: true });

// ============ ANALYTICS HOOK (placeholder) ============
document.querySelectorAll('a[href*="t.me"]').forEach(a => {
  a.addEventListener('click', () => {
    if (window.fbq) window.fbq('track', 'Lead');
    if (window.gtag) window.gtag('event', 'cta_click', { method: 'telegram' });
  });
});
