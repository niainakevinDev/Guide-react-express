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

// 2. Gestion de la progression
function toggleCheck(id) {
  const checkbox = document.getElementById(id);
  localStorage.setItem('check_' + id, checkbox.checked);
  updateProgress();
}

function loadChecks() {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    const saved = localStorage.getItem('check_' + cb.id);
    if (saved === 'true') cb.checked = true;
  });
  updateProgress();
}

function updateProgress() {
  const updateBar = (prefix, max, barId, textId) => {
    const checks = document.querySelectorAll(`[id^="${prefix}-"]`);
    if (checks.length > 0) {
      let checked = 0;
      checks.forEach(c => { if(c.checked) checked++; });
      document.getElementById(barId).style.width = ((checked / max) * 100) + '%';
      document.getElementById(textId).textContent = `${checked} / ${max} chapitres complétés`;
    }
  };

  updateBar('js', 8, 'progress-js', 'progress-js-text');
  updateBar('react', 8, 'progress-react', 'progress-react-text');
  updateBar('express', 8, 'progress-express', 'progress-express-text');
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

  loadChecks();
});
