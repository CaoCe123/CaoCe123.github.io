document.addEventListener('DOMContentLoaded', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1) 滚动浮现：给主要块加 .reveal 并观察
  const blocks = document.querySelectorAll('.section .container > *, .hero-inner > *');
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    blocks.forEach((b, i) => { b.classList.add('reveal'); b.style.transitionDelay = (i % 4 * 40) + 'ms'; io.observe(b); });
  }

  // 2) 导航高亮：根据滚动位置点亮当前板块
  const sections = ['hero','work','hobby','blog','about'].map(id => document.getElementById(id)).filter(Boolean);
  const links = document.querySelectorAll('.nav-links a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  // 3) 回到顶部按钮显隐
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > 500);
    }, { passive: true });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // 4) Hero 鼠标彩蛋：标题随鼠标轻微视差
  const title = document.querySelector('.hero-title');
  const hero = document.getElementById('hero');
  if (title && hero && !reduce) {
    hero.addEventListener('mousemove', (ev) => {
      const r = hero.getBoundingClientRect();
      const x = (ev.clientX - r.left) / r.width - 0.5;
      const y = (ev.clientY - r.top) / r.height - 0.5;
      title.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
    });
    hero.addEventListener('mouseleave', () => { title.style.transform = 'translate(0,0)'; });
  }
});
