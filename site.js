// Buy buttons carry a placeholder href (STRIPE_LINK_<SLUG>) until real Stripe
// payment links are swapped in. Until then, show a notice instead of a dead link.
(function () {
  var toast = document.getElementById('toast');
  var timer;
  document.querySelectorAll('a[data-buy]').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (/^https:\/\//.test(href)) return;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (!toast) return;
      toast.textContent = 'Checkout opens soon. This print is not on sale yet.';
      toast.hidden = false;
      clearTimeout(timer);
      timer = setTimeout(function () { toast.hidden = true; }, 4000);
    });
  });
})();
