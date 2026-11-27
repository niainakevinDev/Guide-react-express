(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.classList.add('light');
})();

function toggleTheme() {
  const el = document.documentElement;
  el.classList.toggle('light');
  localStorage.setItem('theme', el.classList.contains('light') ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.theme-btn');
  if (btn) btn.onclick = toggleTheme;

  document.querySelectorAll('pre').forEach(pre => {
    const b = document.createElement('button');
    b.textContent = '📋';
    b.className = 'copy-btn';
    b.title = 'Copier';
    b.onclick = () => {
      const txt = pre.querySelector('code')?.innerText || pre.innerText;
      navigator.clipboard.writeText(txt).then(() => {
        b.textContent = '✅';
        setTimeout(() => (b.textContent = '📋'), 1500);
      });
    };
    pre.appendChild(b);
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
