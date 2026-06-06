/* Injects an inline SVG sprite of simple line icons (stroke=currentColor).
   Use: <svg class="icon" width="24" height="24"><use href="#i-feed"/></svg> */
(function () {
  var P = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true"><defs>';
  function ico(id, body) {
    return '<symbol id="' + id + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
           'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + body + "</symbol>";
  }
  var S = "";
  S += ico("i-feed", '<rect x="4" y="3" width="13" height="18" rx="2"/><path d="M8 8h5M8 12h5M8 16h3"/><rect x="15" y="6" width="5" height="6" rx="1" fill="currentColor" stroke="none"/>');
  S += ico("i-chat", '<path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>');
  S += ico("i-networking", '<circle cx="6" cy="7" r="2.2"/><circle cx="18" cy="7" r="2.2"/><circle cx="12" cy="17" r="2.2"/><path d="M7.6 8.4 10.6 15M16.4 8.4 13.4 15M8 7h8"/>');
  S += ico("i-help", '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.1 1-1.1 1.8"/><circle cx="12" cy="17" r="0.6" fill="currentColor"/>');
  S += ico("i-agenda", '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/><circle cx="16" cy="15" r="2.4"/>');
  S += ico("i-travel", '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.6 1 1.2 1 2h6c0-.8.3-1.4 1-2A6 6 0 0 0 12 3Z"/>');
  S += ico("i-heart", '<path d="M12 20s-7-4.3-9.3-8.3C1 8.5 2.5 5 6 5c2 0 3.2 1.3 6 4 2.8-2.7 4-4 6-4 3.5 0 5 3.5 3.3 6.7C19 15.7 12 20 12 20Z"/>');
  S += ico("i-comment", '<path d="M5 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-7l-5 4v-4H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/>');
  S += ico("i-send", '<path d="M4 12 20 4l-5 16-3.5-6L4 12Z"/>');
  S += ico("i-chevron-down", '<path d="m6 9 6 6 6-6"/>');
  S += ico("i-chevron-left", '<path d="m15 6-6 6 6 6"/>');
  S += ico("i-plus", '<path d="M12 5v14M5 12h14"/>');
  S += ico("i-user", '<circle cx="12" cy="8" r="3.4"/><path d="M5 20c1-3.6 4-5 7-5s6 1.4 7 5"/>');
  S += ico("i-edit", '<path d="M14 5l5 5M4 20l1-4L16 5a2 2 0 0 1 3 3L8 19l-4 1Z"/>');
  S += ico("i-check", '<path d="m5 12 5 5 9-11"/>');
  S += ico("i-close", '<path d="M6 6l12 12M18 6 6 18"/>');
  S += ico("i-success", '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>');
  S += ico("i-error", '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.01"/>');
  S += ico("i-info", '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>');
  S += ico("i-warning", '<path d="M12 4 2.5 20h19L12 4Z"/><path d="M12 10v5M12 17.5v.01"/>');
  S += ico("i-inbox", '<path d="M4 13 6 5h12l2 8v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5Z"/><path d="M4 13h5l1 2h4l1-2h5"/>');
  S += ico("i-phone", '<path d="M6 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V18a2 2 0 0 1-2 2A14 14 0 0 1 4 6a2 2 0 0 1 2-2Z"/>');
  S += ico("i-search", '<circle cx="11" cy="11" r="6"/><path d="m20 20-3.2-3.2"/>');
  S += ico("i-bell", '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 19a2 2 0 0 0 4 0"/>');
  S += ico("i-lock", '<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>');
  S += ico("i-dollar", '<circle cx="12" cy="12" r="9"/><path d="M14.5 9c-.5-1-1.5-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6v1.5M12 16.5V18"/>');
  S += ico("i-shirt", '<path d="M8 4 5 6l1.5 3L8 8.5V20h8V8.5L17.5 9 19 6l-3-2-2 1.5h-4L8 4Z"/>');
  S += ico("i-transport", '<rect x="5" y="4" width="14" height="13" rx="2"/><path d="M5 11h14M9 17v3M15 17v3"/><circle cx="9" cy="14" r="0.6" fill="currentColor"/><circle cx="15" cy="14" r="0.6" fill="currentColor"/>');
  S += ico("i-globe", '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/>');
  S += ico("i-shield", '<path d="M12 3 5 6v6c0 4 3 6.5 7 8 4-1.5 7-4 7-8V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>');
  S += ico("i-hotel", '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M8 8h2M14 8h2M8 12h2M14 12h2M10 20v-3h4v3"/>');
  S += ico("i-car", '<path d="M5 16v-3l2-5h10l2 5v3"/><path d="M3 16h18M7 16v2M17 16v2"/><circle cx="8" cy="13" r="0.6" fill="currentColor"/><circle cx="16" cy="13" r="0.6" fill="currentColor"/>');
  S += ico("i-plane", '<path d="M10 21l2-5 6 2v-2l-5-4 1-7-2 1-1 5-5 2v2l4-1 1 5-2 2v2Z"/>');
  document.body.insertAdjacentHTML("afterbegin", P + S + "</defs></svg>");
})();
