/* /assets/cookies.js */
(function () {
  const KEY = 'se_cookie_consent_v1';
  const saved = localStorage.getItem(KEY);
  if (saved) return; // déjà consenti ou refusé

  const bar = document.createElement('div');
  bar.setAttribute('role','dialog');
  bar.setAttribute('aria-live','polite');
  bar.style.position = 'fixed';
  bar.style.left = '0';
  bar.style.right = '0';
  bar.style.bottom = '0';
  bar.style.zIndex = '9999';
  bar.style.background = '#111';
  bar.style.color = '#fff';
  bar.style.padding = '16px';
  bar.style.boxShadow = '0 -2px 12px rgba(0,0,0,.2)';
  bar.innerHTML = `
    <div style="max-width:900px;margin:0 auto;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between">
      <div style="flex:1;min-width:240px">
        Nous utilisons des cookies <strong>strictement nécessaires</strong> au fonctionnement du site.
        Les cookies de mesure d’audience ne seront déposés qu’avec votre accord.
        <a href="/confidentialite.html" style="color:#8ff;text-decoration:underline">En savoir plus</a>.
      </div>
      <div style="display:flex;gap:8px">
        <button id="se-cookie-refuse" style="padding:8px 12px;border:1px solid #bbb;background:transparent;color:#fff;border-radius:6px;cursor:pointer">Tout refuser</button>
        <button id="se-cookie-accept" style="padding:8px 12px;border:1px solid #0a7;background:#0a7;color:#fff;border-radius:6px;cursor:pointer">Tout accepter</button>
      </div>
    </div>
  `;
  document.body.appendChild(bar);

  function save(value) {
    localStorage.setItem(KEY, JSON.stringify({ value, ts: Date.now() }));
    bar.remove();
    // ⚠️ Si tu veux ajouter des outils (Matomo, Google Analytics, etc.),
    // fais-le ici UNIQUEMENT si value === 'accept'
  }

  bar.querySelector('#se-cookie-accept').addEventListener('click', () => save('accept'));
  bar.querySelector('#se-cookie-refuse').addEventListener('click', () => save('refuse'));

  // Option : permet de rouvrir le bandeau manuellement
  window.SE_openCookies = function() {
    localStorage.removeItem(KEY);
    location.reload();
  };
})();
