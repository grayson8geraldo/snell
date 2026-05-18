// ============ AVG / ePrivacy COOKIE CONSENT ============
// Marketing pixels do NOT fire until the user actively clicks "Accepteren".
// Choice is stored in localStorage as 'snell_consent' = 'granted' | 'denied'.
// Required by AVG art. 6 lid 1 sub a + Telecommunicatiewet art. 11.7a.

(function () {
  const STORAGE_KEY = 'snell_consent';
  const stored = localStorage.getItem(STORAGE_KEY);

  function loadPixels() {
    // ---- Meta Pixel ----
    // !function(f,b,e,v,n,t,s){...}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    // fbq('init', 'YOUR_PIXEL_ID');
    // fbq('track', 'PageView');

    // ---- TikTok Pixel ----
    // !function (w, d, t) { ... }(window, document, 'ttq');
    // ttq.load('YOUR_PIXEL_ID');
    // ttq.page();

    // ---- Google Analytics 4 ----
    // const s = document.createElement('script');
    // s.async = true;
    // s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    // document.head.appendChild(s);
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // window.gtag = gtag;
    // gtag('js', new Date());
    // gtag('config', 'G-XXXXXXXXXX');

    window.snellConsent = { granted: true };
  }

  function denyPixels() {
    window.snellConsent = { granted: false };
  }

  function hideBanner() {
    const b = document.getElementById('cookieBanner');
    if (b) b.classList.remove('visible');
  }

  function setChoice(value) {
    localStorage.setItem(STORAGE_KEY, value);
    if (value === 'granted') loadPixels();
    else denyPixels();
    hideBanner();
  }

  function renderBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookieBannerTitle');
    banner.innerHTML = `
      <div class="cookie-inner">
        <div class="cookie-text">
          <strong id="cookieBannerTitle">Wij gebruiken cookies 🍪</strong>
          <p>
            Snell gebruikt functionele cookies (altijd actief) en marketing-cookies van
            Meta, TikTok en Google om onze campagnes te meten. Je kunt zelf kiezen.
            Meer info in ons <a href="privacy.html">privacybeleid</a>.
          </p>
        </div>
        <div class="cookie-actions">
          <button type="button" class="cookie-btn cookie-deny" id="cookieDeny">Weigeren</button>
          <button type="button" class="cookie-btn cookie-accept" id="cookieAccept">Accepteren</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('visible'));

    document.getElementById('cookieAccept').addEventListener('click', () => setChoice('granted'));
    document.getElementById('cookieDeny').addEventListener('click', () => setChoice('denied'));
  }

  // Boot
  if (stored === 'granted') {
    loadPixels();
  } else if (stored === 'denied') {
    denyPixels();
  } else {
    denyPixels();
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', renderBanner);
    } else {
      renderBanner();
    }
  }

  // Public API so other scripts can check consent
  window.snellHasConsent = function () {
    return localStorage.getItem(STORAGE_KEY) === 'granted';
  };
})();
