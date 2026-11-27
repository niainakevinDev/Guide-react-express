// 1. Gestion du thème (Dark/Light)
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.classList.add('light');
})();

function toggleTheme() {
  const el = document.documentElement;
  el.classList.toggle('light');
  localStorage.setItem('theme', el.classList.contains('light') ? 'light' : 'dark');
}

// 2. Gestion de la progression (Checklists)
function toggleCheck(id) {
  const checkbox = document.getElementById(id);
  const state = checkbox.checked;
  localStorage.setItem('check_' + id, state);
  updateProgress();
}

function loadChecks() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    const saved = localStorage.getItem('check_' + cb.id);
    if (saved === 'true') cb.checked = true;
  });
  updateProgress();
}

function updateProgress() {
  // Compter pour JS
  const jsChecks = document.querySelectorAll('[id^="js-"]');
  if (jsChecks.length > 0) {
    let checked = 0;
    jsChecks.forEach(c => { if(c.checked) checked++; });
    let pct = (checked / 8) * 100;
    document.getElementById('progress-js').style.width = pct + '%';
    document.getElementById('progress-js-text').textContent = `${checked} / 8 chapitres complétés`;
  }

  // Compter pour React
  const reactChecks = document.querySelectorAll('[id^="react-"]');
  if (reactChecks.length > 0) {
    let checked = 0;
    reactChecks.forEach(c => { if(c.checked) checked++; });
    let pct = (checked / 8) * 100;
    document.getElementById('progress-react').style.width = pct + '%';
    document.getElementById('progress-react-text').textContent = `${checked} / 8 chapitres complétés`;
  }

  // Compter pour Express
  const expressChecks = document.querySelectorAll('[id^="express-"]');
  if (expressChecks.length > 0) {
    let checked = 0;
    expressChecks.forEach(c => { if(c.checked) checked++; });
    let pct = (checked / 8) * 100;
    document.getElementById('progress-express').style.width = pct + '%';
    document.getElementById('progress-express-text').textContent = `${checked} / 8 chapitres complétés`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.theme-btn');
  if (btn) btn.onclick = toggleTheme;

  // Bouton Copier
  document.querySelectorAll('pre').forEach(pre => {
    const b = document.createElement('button');
    b.textContent = '📋'; b.className = 'copy-btn';
    b.onclick = () => {
      navigator.clipboard.writeText(pre.querySelector('code')?.innerText || pre.innerText);
      b.textContent = '✅'; setTimeout(() => b.textContent = '📋', 1500);
    };
    pre.appendChild(b);
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Charger les cases cochées
  loadChecks();
});
