/* Builds the in-context screen reconstructions inside .phone__screen slots.
   Uses only design-system components. */
(function () {
  var LOGO =
    '<div class="brand-logo">' +
      '<div class="brand-logo__row1">ACHONDROPLASIA</div>' +
      '<div class="brand-logo__row2"><span class="brand-logo__edition">5<sup>TH</sup> EDITION · 2026</span>' +
      '<span class="brand-logo__script">Summit</span><span class="brand-logo__brazil">BRAZIL</span></div>' +
    '</div>';

  var FOOTER =
    '<div class="scr-footer">' +
      '<div style="font-size:10px;opacity:.7;">Organized and funded by</div>' +
      '<div class="biomarin-wm">B<b>I</b>OMARIN</div>' +
      '<p class="footer-legal">Event exclusively aimed at healthcare professionals. BioMarin respects Data Protection and Privacy.</p>' +
      '<p class="footer-legal">[VEEVA] June 2026</p>' +
    '</div>';

  function hero(extra) { return '<div class="scr-hero">' + LOGO + (extra || "") + '</div>'; }
  function icon(id) { return '<svg class="scr-hero__icon"><use href="#' + id + '"/></svg>'; }

  var SCREENS = {
    /* ---------- LOGIN ---------- */
    login:
      hero() +
      '<div class="scr-body" style="gap:18px;padding-top:18px;">' +
        '<button class="btn btn--primary btn--block"><span class="btn__label">LOG IN</span></button>' +
        '<input class="input" placeholder="youremail@bmrn.com">' +
        '<input class="input input--password" type="password" value="password">' +
        '<a class="link" href="#" style="justify-content:center;"><svg width="16" height="16"><use href="#i-lock"/></svg> I forgot my password</a>' +
        '<a class="link link--secondary" href="#" style="justify-content:center;"><svg width="16" height="16"><use href="#i-edit"/></svg> Click here to create your password</a>' +
      '</div>' + FOOTER,

    /* ---------- HOME ---------- */
    home:
      hero() +
      '<div class="scr-body" style="align-items:center;padding-top:18px;">' +
        '<div class="menu-grid">' +
          menu("i-feed","Feed") + menu("i-chat","Chat") + menu("i-networking","Networking") +
          menu("i-help","Help") + menu("i-agenda","Agenda") + menu("i-travel","Travel Hints") +
        '</div>' +
      '</div>' + FOOTER,

    /* ---------- FEED ---------- */
    feed:
      hero() +
      '<div class="scr-body" style="gap:16px;">' +
        '<div style="display:flex;justify-content:flex-start;"><button class="btn btn--primary" style="width:40px;height:40px;min-width:0;padding:0;border-radius:9999px;"><svg width="20" height="20"><use href="#i-plus"/></svg></button></div>' +
        post("6","1") + post("4","2") +
      '</div>' + FOOTER,

    /* ---------- NETWORKING ---------- */
    networking:
      hero(icon("i-networking") + '<div class="section-title" style="font-size:18px;letter-spacing:1px;">NETWORKING</div>') +
      '<div class="scr-body" style="gap:18px;padding-top:8px;">' +
        '<p style="font-size:12px;line-height:1.4;text-align:center;opacity:.85;">This area is designed to help you connect and build your network. Start by updating your profile. Once it\'s complete, you can start an individual chat with other HCPs.</p>' +
        '<button class="btn btn--secondary btn--block"><span class="btn__label">Update your profile</span></button>' +
        '<button class="btn btn--primary btn--block"><span class="btn__label">Start an individual chat</span></button>' +
      '</div>' + FOOTER,

    /* ---------- HELP ---------- */
    help:
      hero(icon("i-help") + '<div class="section-title" style="font-size:18px;letter-spacing:1px;">HELP</div>') +
      '<div class="scr-body" style="gap:14px;padding-top:8px;">' +
        helpBtn("i-hotel","Hotel Information", false) +
        helpBtn("i-car","Need help with your stay?", true) +
        helpBtn("i-plane","Need help with your travel logistics?", true) +
        '<p style="font-size:12px;line-height:1.4;text-align:center;opacity:.85;margin-top:8px;">*You will be directed to the contact of the agency responsible for your logistics and accommodation according to your country.</p>' +
      '</div>' + FOOTER,

    /* ---------- TRAVEL HINTS ---------- */
    travel:
      hero(icon("i-travel") + '<div class="section-title" style="font-size:18px;letter-spacing:1px;">TRAVEL HINTS</div>') +
      '<div class="scr-body" style="gap:18px;padding-top:8px;">' +
        hint("i-dollar","Currency:","Brazilian Real (R$). Prefer paying with card or PIX.") +
        hint("i-shirt","Clothing:","Warm weather in Natal: bring light clothing, comfortable shoes and a light rain jacket.") +
        hint("i-transport","Transportation:","Use apps like Uber or 99 instead of taxis.") +
        hint("i-globe","Internet:","Buy a local SIM card for mobile data.") +
        hint("i-shield","Safety:","Avoid flaunting valuables and keep an eye on your belongings.") +
      '</div>' + FOOTER,

    /* ---------- PROFILE ---------- */
    profile:
      hero() +
      '<div class="scr-body" style="gap:14px;">' +
        '<div style="display:flex;justify-content:flex-end;"><span class="avatar avatar--md" style="background:#fff;color:var(--accent-default);"><svg width="22" height="22"><use href="#i-user"/></svg></span></div>' +
        '<div style="display:flex;align-items:center;gap:10px;justify-content:space-between;"><span class="section-title">Profile Information</span><span class="mandatory-tag">*Mandatory</span></div>' +
        field("Name *") + field("City *") + select("Country *") + field("Email","youremail@bmrn.com") + field("Mobile Number","+55") +
        '<div style="display:flex;align-items:center;gap:10px;justify-content:space-between;margin-top:6px;"><span class="section-title">Professional Information</span><span class="mandatory-tag">*Mandatory</span></div>' +
        select("Medical Specialty *") + field("Institution / Hospital / Organization") + field("Clinical &amp; Research Area of Interest") +
        '<button class="btn btn--primary btn--block" style="margin-top:6px;"><span class="btn__label">SAVE</span></button>' +
      '</div>' + FOOTER
  };

  function menu(ic, label) {
    return '<button class="menu-card"><svg class="menu-card__icon"><use href="#' + ic + '"/></svg><span class="menu-card__label">' + label + '</span></button>';
  }
  function post(likes, comments) {
    return '<article class="post">' +
      '<div class="post__head"><span class="avatar avatar--md" style="color:var(--accent-default)"><svg width="22" height="22"><use href="#i-user"/></svg></span><span class="post__name">Name Last Name</span></div>' +
      '<div class="post__media img-ph">Photo · 4:3</div>' +
      '<p class="post__body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod 😍😍😍</p>' +
      '<div class="post__actions"><button class="post__action"><svg width="20" height="20"><use href="#i-heart"/></svg><span>' + likes + '</span></button>' +
      '<button class="post__action"><svg width="20" height="20"><use href="#i-comment"/></svg><span>' + comments + '</span></button></div>' +
    '</article>';
  }
  function helpBtn(ic, label, wa) {
    return '<button class="btn btn--primary btn--block" style="justify-content:flex-start;gap:12px;text-transform:none;letter-spacing:0;font-size:12px;position:relative;padding-left:18px;padding-right:' + (wa ? '52px' : '18px') + ';">' +
      '<svg width="22" height="22" style="flex:none;"><use href="#' + ic + '"/></svg><span style="text-align:left;">' + label + '</span>' +
      (wa ? '<span style="position:absolute;right:14px;width:26px;height:26px;border-radius:9999px;background:#fff;display:grid;place-items:center;color:var(--accent-default);"><svg width="16" height="16"><use href="#i-phone"/></svg></span>' : '') +
    '</button>';
  }
  function hint(ic, title, body) {
    return '<div style="display:flex;gap:14px;align-items:flex-start;">' +
      '<svg width="26" height="26" style="color:var(--accent-default);flex:none;margin-top:2px;"><use href="#' + ic + '"/></svg>' +
      '<div><div style="font-weight:700;font-size:13px;color:var(--accent-default);">' + title + '</div>' +
      '<div style="font-size:12px;line-height:1.4;opacity:.9;margin-top:2px;">' + body + '</div></div></div>';
  }
  function field(label, val) {
    return '<input class="input" placeholder="' + label + '"' + (val ? ' value="' + val + '"' : '') + '>';
  }
  function select(label) {
    return '<div class="select__control" style="border-radius:32px;"><span style="color:var(--text-placeholder);white-space:nowrap;">' + label + '</span><svg class="select__chevron" width="20" height="20"><use href="#i-chevron-down"/></svg></div>';
  }

  Object.keys(SCREENS).forEach(function (k) {
    var slot = document.querySelector('[data-screen="' + k + '"]');
    if (slot) slot.innerHTML = '<div class="scr">' + SCREENS[k] + '</div>';
  });
})();
