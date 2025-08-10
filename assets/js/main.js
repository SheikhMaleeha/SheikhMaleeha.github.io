// Filter logic + dark mode toggle + active nav link
document.addEventListener('DOMContentLoaded', () => {
  // --- simple filter on /projects.html ---
  const grid = document.querySelector('#projectGrid');
  const buttons = document.querySelectorAll('#filters [data-filter]');
  if (grid && buttons.length){
    const cards = grid.querySelectorAll('.card');
    buttons.forEach(btn => btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      cards.forEach(c => {
        const show = f === 'all' || (c.dataset.tags || '').includes(f);
        c.style.display = show ? '' : 'none';
      });
    }));
  }

  // --- dark mode toggle ---
  const toggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (!localStorage.getItem('theme')) {
    document.documentElement.classList.toggle('dark', prefersDark);
  } else {
    document.documentElement.classList.toggle('dark', localStorage.getItem('theme') === 'dark');
  }
  if (toggle){
    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const mode = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', mode);
    });
  }

  // --- active nav link (based on current path) ---
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav .nav-link').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
});
