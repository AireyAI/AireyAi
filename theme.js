/* AireyAi shared dark-mode — defaults to LIGHT for everyone; only goes dark if
   the visitor explicitly toggles it. Injects an always-visible nav toggle.
   Linked in <head> on every page. */
(function () {
  // 1) Apply theme immediately (runs in <head> before body paints). Always light
  //    unless the user previously chose dark — system preference is ignored.
  try {
    var saved = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');
  } catch (e) {}

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
  }

  // 2) Inject the toggle into the top bar (.nav-inner) so it's ALWAYS visible —
  //    desktop and mobile — not hidden inside the collapsible menu.
  function injectToggle() {
    var inner = document.querySelector('.nav-inner');
    if (!inner || document.querySelector('.theme-toggle')) return;
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.innerHTML =
      '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19"/></svg>' +
      '<svg class="moon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8z"/></svg>';
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      setTheme(cur === 'dark' ? 'light' : 'dark');
    });
    // place just before the mobile hamburger so it sits at the right edge on every screen
    var hamburger = inner.querySelector('.nav-toggle');
    if (hamburger) inner.insertBefore(btn, hamburger); else inner.appendChild(btn);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', injectToggle);
  else injectToggle();
})();
