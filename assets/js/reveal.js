// Fade/slide text into view as the reader scrolls (header excluded).
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var selectors = [
    '.container-fluid h1', '.section h1', '.line',
    '.about-text h5', '.about-photo img',
    '#publications h5',
    '.portfolio-item',
    '.section .about-card > h5', '.section ol li',
    '.blog-card'
  ].join(',');

  var els = Array.prototype.slice.call(document.querySelectorAll(selectors));

  // Stagger siblings so groups cascade in rather than appearing at once.
  els.forEach(function (el) {
    var parent = el.parentElement;
    var siblings = Array.prototype.filter.call(parent.children, function (c) {
      return els.indexOf(c) !== -1;
    });
    var i = siblings.indexOf(el);
    el.style.setProperty('--reveal-delay', Math.min(i, 5) * 110 + 'ms');
    el.classList.add('reveal');
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  els.forEach(function (el) { io.observe(el); });
})();
