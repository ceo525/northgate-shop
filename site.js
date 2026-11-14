// Buy buttons link straight to Stripe Checkout. The country picker chooses the
// payment link for the buyer's shipping zone (zone 1: shipping included; 2 and 3: flat rate).
// One picker drives every [data-buy] on the page (home cards and plate pages).
(function () {
  var ZONE = {"AD":1,"AE":1,"AL":1,"AM":1,"AT":1,"AU":1,"AX":1,"BA":1,"BE":1,"BG":1,"BY":1,"CA":1,"CH":1,"CN":1,"CY":1,"CZ":1,"DE":1,"DK":1,"EE":1,"ES":1,"FI":1,"FO":1,"FR":1,"GB":1,"GE":1,"GG":1,"GI":1,"GL":1,"GR":1,"HK":1,"HR":1,"HU":1,"ID":1,"IE":1,"IM":1,"IN":1,"IQ":1,"IS":1,"IT":1,"JE":1,"JP":1,"KR":1,"LI":1,"LT":1,"LU":1,"LV":1,"MC":1,"MD":1,"ME":1,"MK":1,"MT":1,"MV":1,"MY":1,"NL":1,"NO":1,"NZ":1,"PH":1,"PL":1,"PT":1,"RO":1,"RS":1,"SA":1,"SE":1,"SG":1,"SI":1,"SK":1,"SM":1,"TH":1,"TR":1,"TW":1,"UA":1,"US":1,"VA":1,"VN":1,"XK":1,"YT":1,"ZA":1,"ZM":1,"ZW":1,"AG":2,"AI":2,"AR":2,"AW":2,"AZ":2,"BB":2,"BD":2,"BH":2,"BI":2,"BL":2,"BM":2,"BN":2,"BO":2,"BR":2,"BS":2,"BT":2,"BZ":2,"CK":2,"CL":2,"CO":2,"CR":2,"CW":2,"DM":2,"DO":2,"DZ":2,"EC":2,"EG":2,"FJ":2,"FK":2,"GD":2,"GF":2,"GH":2,"GP":2,"GT":2,"GY":2,"HN":2,"HT":2,"IL":2,"JM":2,"JO":2,"KE":2,"KG":2,"KH":2,"KI":2,"KN":2,"KW":2,"KY":2,"KZ":2,"LA":2,"LB":2,"LC":2,"LK":2,"LY":2,"MA":2,"MM":2,"MN":2,"MO":2,"MQ":2,"MS":2,"MU":2,"MX":2,"NC":2,"NG":2,"NI":2,"NP":2,"NR":2,"NU":2,"OM":2,"PA":2,"PE":2,"PF":2,"PG":2,"PK":2,"PS":2,"PY":2,"QA":2,"RU":2,"SB":2,"SR":2,"SV":2,"SX":2,"TC":2,"TJ":2,"TM":2,"TN":2,"TO":2,"TT":2,"TV":2,"UY":2,"UZ":2,"VC":2,"VE":2,"VG":2,"VU":2,"WS":2,"AF":3,"AO":3,"BF":3,"BJ":3,"BW":3,"CD":3,"CF":3,"CG":3,"CI":3,"CM":3,"CV":3,"DJ":3,"ER":3,"ET":3,"GA":3,"GM":3,"GN":3,"GQ":3,"GU":3,"GW":3,"KM":3,"LR":3,"LS":3,"MF":3,"MG":3,"ML":3,"MR":3,"MW":3,"MZ":3,"NA":3,"NE":3,"PR":3,"RE":3,"RW":3,"SC":3,"SD":3,"SH":3,"SL":3,"SN":3,"SO":3,"ST":3,"SZ":3,"TD":3,"TG":3,"TZ":3,"UG":3,"WF":3,"YE":3};
  var sel = document.getElementById('country');
  var buys = document.querySelectorAll('[data-buy]');
  if (!sel || !buys.length) return;
  var names = window.Intl && Intl.DisplayNames ? new Intl.DisplayNames([navigator.language || 'en'], { type: 'region' }) : null;
  var opts = Object.keys(ZONE).map(function (c) {
    var n = c; try { n = names ? names.of(c) : c; } catch (err) {}
    return [n, c];
  }).sort(function (a, b) { return a[0].localeCompare(b[0]); });
  opts.forEach(function (o) { var op = document.createElement('option'); op.value = o[1]; op.textContent = o[0]; sel.appendChild(op); });
  var ships = document.querySelectorAll('[data-ship]');
  function apply() {
    var z = ZONE[sel.value] || 1;
    var cost = z === 1 ? 0 : +sel.getAttribute('data-z' + z + 'ship');
    Array.prototype.forEach.call(buys, function (b) {
      b.href = b.getAttribute('data-z' + z);
      var lead = b.classList.contains('buy') ? 'Buy ' : 'Buy this plate, ';
      b.setAttribute('aria-label', lead + b.getAttribute('data-name') + ', $' + b.getAttribute('data-price') + (cost ? ' plus $' + cost + ' shipping' : ', shipping included'));
    });
    Array.prototype.forEach.call(ships, function (s) { s.textContent = cost ? '+ $' + cost + ' shipping' : 'Shipping included'; });
  }
  var guess = (navigator.languages || [navigator.language || '']).map(function (l) { var m = /-([A-Za-z]{2})$/.exec(l); return m && m[1].toUpperCase(); }).filter(function (c) { return c && ZONE[c]; })[0];
  if (guess) sel.value = guess;
  sel.addEventListener('change', apply);
  sel.closest('.ship-to').hidden = false;
  var other = document.querySelector('.other-regions');
  if (other) other.hidden = true;
  apply();
})();
