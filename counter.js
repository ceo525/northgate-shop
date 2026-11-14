// Anonymous page-view and buy-click counter. No cookies, no storage, no personal data:
// each event only adds 1 to a public tally at abacus.jasoncameron.dev (namespace ceo525).
// Keys: <site>-view-<page> on load, <site>-buy-<offer> when a Stripe link is clicked.
// The script tag carries data-site and data-page; the click is never delayed (fire-and-forget).
(function () {
  var me = document.currentScript;
  if (!me) return;
  var site = me.getAttribute('data-site'), page = me.getAttribute('data-page');
  if (!site || !page) return;
  var BASE = 'https://abacus.jasoncameron.dev/hit/ceo525/';
  var LEO = { // Leonida Stripe link id -> offer
    '9B65kFdDg7xw6Ugd1p7wA0z': 'playbook', '28E3cxar42dc5QcgdB7wA0A': 'bundle',
    '28E3cx7eSg42fqM9Pd7wA0d': 'drop', '28E7sN42G2dc7Yk4uT7wA0D': 'gift',
    '14A4gB1Uy198baw5yX7wA0c': 'id', '4gMeVf7eSeZYceAe5t7wA0B': 'kit',
    '00waEZczc8BA92od1p7wA00': 'pack', '3cI00l42GdVUceAf9x7wA01': 'tip'
  };
  function clean(s) { return String(s).toLowerCase().replace(/[^a-z0-9_.-]/g, '').slice(0, 40) || 'other'; }
  function hit(key) {
    var u = BASE + site + '-' + key;
    try { fetch(u, { keepalive: true, credentials: 'omit', mode: 'cors' }).catch(function () {}); }
    catch (err) { new Image().src = u; }
  }
  function offer(a) {
    if (site === 'leo') return LEO[a.pathname.replace(/^\//, '')] || 'other';
    var card = a.closest('.card'); // Northgate home: the plate is the card the Buy sits in
    var link = card && card.querySelector('h3 a[href$=".html"]');
    return link ? link.getAttribute('href').replace(/\.html$/, '') : page;
  }
  hit('view-' + clean(page));
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href*="buy.stripe.com"], a[href*="donate.stripe.com"]');
    if (a) hit('buy-' + clean(offer(a)));
  }, true);
})();
