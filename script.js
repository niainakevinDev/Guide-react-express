// Dark / light mode
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.classList.add('light');
  else document.documentElement.classList.add('dark');
})();

function toggleTheme() {
  const el = document.documentElement;
  el.classList.toggle('light');
  el.classList.toggle('dark');
  localStorage.setItem('theme', el.classList.contains('light') ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
  // Bouton thème
  const btn = document.querySelector('.theme-btn');
  if (btn) btn.onclick = toggleTheme;

  // Boutons copier sur chaque <pre>
  document.querySelectorAll('pre').forEach(pre => {
    const b = document.createElement('button');
    b.textContent = '📋 Copier';
    b.className = 'copy-btn';
    b.onclick = () => {
      const txt = pre.querySelector('code')?.innerText || pre.innerText;
      navigator.clipboard.writeText(txt).then(() => {
        b.textContent = '✅ Copié';
        setTimeout(() => (b.textContent = '📋 Copier'), 1500);
      });
    };
    pre.appendChild(b);
  });

  // Année footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
