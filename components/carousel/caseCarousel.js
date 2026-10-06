document.querySelectorAll('[data-case-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('[data-case-slide]'));
  const controls = carousel.querySelector('[data-case-controls]');
  const stage = carousel.querySelector('[data-case-stage]');
  const count = carousel.querySelector('[data-case-count]');
  if (slides.length < 2 || !controls || !stage || !count) return;

  let active = 0;
  let touchStart = null;
  const show = (index) => {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      slide.hidden = position !== active;
      slide.inert = position !== active;
    });
    count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')} · ${slides[active].querySelector('h2').textContent}`;
  };

  carousel.classList.add('is-ready');
  show(0);
  controls.hidden = false;
  carousel.querySelector('[data-case-prev]').addEventListener('click', () => show(active - 1));
  carousel.querySelector('[data-case-next]').addEventListener('click', () => show(active + 1));
  controls.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    show(active + (event.key === 'ArrowRight' ? 1 : -1));
  });

  stage.addEventListener('touchstart', (event) => {
    touchStart = event.touches.length === 1 ? event.touches[0] : null;
  }, { passive: true });
  stage.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const deltaX = event.changedTouches[0].clientX - touchStart.clientX;
    const deltaY = event.changedTouches[0].clientY - touchStart.clientY;
    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      show(active + (deltaX < 0 ? 1 : -1));
    }
    touchStart = null;
  }, { passive: true });
  stage.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
});
