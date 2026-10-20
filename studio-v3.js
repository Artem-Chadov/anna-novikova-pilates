(() => {
  const header = document.querySelector('.header');
  const syncHeader = () => {
    document.body.classList.toggle('scrolled',window.scrollY>24);
    document.documentElement.style.setProperty('--header-bottom',`${header.getBoundingClientRect().bottom+8}px`);
    const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    const active = atPageEnd ? sections[sections.length - 1] : sections.filter(s => (s.querySelector('h2') || s).getBoundingClientRect().top <= header.getBoundingClientRect().bottom+32).pop();
    links.forEach(a => {
      if (active && a.hash === '#' + active.id) a.setAttribute('aria-current','location');
      else a.removeAttribute('aria-current');
    });
  };
  addEventListener('scroll',syncHeader,{passive:true});
  addEventListener('resize',syncHeader);
  const links = [...document.querySelectorAll('.nav a')];
  const sections = links.map(a => document.querySelector(a.hash)).filter(Boolean);
  syncHeader();
  links.forEach(a => a.addEventListener('click', event => {
    const target = document.querySelector(a.hash);
    if (!target) return;
    event.preventDefault();
    const heading = target.querySelector('h2') || target;
    const headerBottom = document.querySelector('.header').getBoundingClientRect().bottom;
    const top = heading.getBoundingClientRect().top + window.scrollY - headerBottom - 16;
    window.scrollTo({top, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
    history.replaceState(null,'',a.hash);
    target.setAttribute('tabindex','-1');
    target.focus({preventScroll:true});
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), {once:true});
  }));
  const map = document.querySelector('.studio-map');
  const mapContainer = document.querySelector('.map-container');
  if (map && mapContainer) {
    const syncMapFocus = () => {
      mapContainer.classList.toggle('map-focused', document.activeElement === map);
    };
    const scheduleMapFocus = () => setTimeout(syncMapFocus, 0);
    map.addEventListener('focus', scheduleMapFocus);
    map.addEventListener('blur', scheduleMapFocus);
    document.addEventListener('focusin', scheduleMapFocus);
    window.addEventListener('focus', scheduleMapFocus);
    window.addEventListener('blur', scheduleMapFocus);
  }
})();
