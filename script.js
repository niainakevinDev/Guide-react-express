// Gestion du thème
(function () {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.documentElement.classList.add('light');
})();

function toggleTheme() {
  const el = document.documentElement;
  el.classList.toggle('light');
  localStorage.setItem('theme', el.classList.contains('light') ? 'light' : 'dark');
}

// Gestion de la progression
function toggleCheck(id) {
  const checkbox = document.getElementById(id);
  const parent = checkbox.closest('.check-item');
  
  localStorage.setItem('check_' + id, checkbox.checked);
  
  if (checkbox.checked) {
    parent.classList.add('completed');
  } else {
    parent.classList.remove('completed');
  }
  
  updateProgress();
}

function loadChecks() {
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    const saved = localStorage.getItem('check_' + cb.id);
    if (saved === 'true') {
      cb.checked = true;
      cb.closest('.check-item').classList.add('completed');
    }
  });
  updateProgress();
}

function updateProgress() {
  const updateBar = (prefix, max, barId, textId) => {
    const checks = document.querySelectorAll(`[id^="${prefix}-"]`);
    if (checks.length > 0) {
      let checked = 0;
      checks.forEach(c => { if(c.checked) checked++; });
      const bar = document.getElementById(barId);
      const text = document.getElementById(textId);
      if(bar) bar.style.width = ((checked / max) * 100) + '%';
      if(text) text.textContent = `${checked} / ${max} chapitres complétés`;
    }
  };

  updateBar('js', 8, 'progress-js', 'progress-js-text');
  updateBar('react', 8, 'progress-react', 'progress-react-text');
  updateBar('express', 8, 'progress-express', 'progress-express-text');
  updateBar('reseau', 8, 'progress-reseau', 'progress-reseau-text');
  updateBar('powershell', 8, 'progress-powershell', 'progress-powershell-text');
  updateBar('linux', 8, 'progress-linux', 'progress-linux-text');
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.theme-btn');
  if (btn) btn.onclick = toggleTheme;

  // Bouton Copier le code
  document.querySelectorAll('pre').forEach(pre => {
    const b = document.createElement('button');
    b.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    b.className = 'copy-btn';
    b.title = 'Copier';
    b.style.cssText = 'position:absolute;top:12px;right:12px;background:var(--bg-alt);border:1px solid var(--border);color:var(--text-dim);padding:6px;border-radius:6px;cursor:pointer;transition:all 0.2s;';
    b.onmouseenter = () => b.style.color = 'var(--text)';
    b.onmouseleave = () => b.style.color = 'var(--text-dim)';
    b.onclick = () => {
      const txt = pre.querySelector('code')?.innerText || pre.innerText;
      navigator.clipboard.writeText(txt).then(() => {
        b.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        setTimeout(() => {
          b.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
        }, 2000);
      });
    };
    pre.appendChild(b);
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  loadChecks();
});
