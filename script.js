(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('open');
    });
    // Close nav when link clicked
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
      });
    });
  }

  // Theme toggle (persist in localStorage)
  function applyTheme(dark){
    if(dark){ root.classList.add('dark'); themeToggle.setAttribute('aria-pressed','true') }
    else { root.classList.remove('dark'); themeToggle.setAttribute('aria-pressed','false') }
  }
  const saved = localStorage.getItem('theme-dark');
  applyTheme(saved === '1');
  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      const isDark = root.classList.toggle('dark');
      themeToggle.setAttribute('aria-pressed', String(isDark));
      localStorage.setItem('theme-dark', isDark ? '1' : '0');
    });
  }

  // Smooth scroll for local links
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href === '#') return;
    const target = document.querySelector(href);
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}) }
  });

  // Intersection reveal for progressive loading
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.style.animationDelay = '0s';
    });
  },{threshold:0.08});
  document.querySelectorAll('.card').forEach(n=>io.observe(n));
})();
