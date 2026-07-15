// Minimal image lightbox: click any [data-lightbox] link to view the target
// image full-size over a dark overlay. Click the overlay or press Esc to close.
(function () {
  if (window.__lightboxInit) return;
  window.__lightboxInit = true;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<img alt="">';
  document.body.appendChild(overlay);
  var img = overlay.querySelector('img');

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
    img.src = '';
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-lightbox]');
    if (trigger) {
      e.preventDefault();
      var full = trigger.getAttribute('href');
      var alt = trigger.querySelector('img') ? trigger.querySelector('img').alt : '';
      open(full, alt);
    }
  });

  overlay.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('visible')) close();
  });
})();
