/* Docs sidebar: shared nav + scrollspy. Each page sets
   window.__DOC_PAGE and window.__DOC_SECTIONS before loading this. */
(function () {
  var PAGES = [
    { id: "index",      file: "index.html",      label: "Overview & Foundations" },
    { id: "components", file: "Components.html",  label: "Components" },
    { id: "patterns",   file: "Patterns.html",    label: "Patterns & A11y" },
    { id: "screens",    file: "Screens.html",     label: "Screens in context" }
  ];
  var page = window.__DOC_PAGE || "index";
  var sections = window.__DOC_SECTIONS || [];

  var aside = document.createElement("aside");
  aside.className = "sidebar";

  var html = '<div class="sidebar__brand">' +
      '<span class="sidebar__kicker">Design System</span>' +
      '<span class="sidebar__title">Achondroplasia<br>Summit Brazil 2026</span>' +
    '</div>';

  html += '<nav class="nav-group"><div class="nav-group__label">Pages</div>';
  PAGES.forEach(function (p) {
    html += '<a class="nav-link' + (p.id === page ? " is-active" : "") + '" href="' + p.file + '">' + p.label + "</a>";
  });
  html += "</nav>";

  if (sections.length) {
    html += '<nav class="nav-group"><div class="nav-group__label">On this page</div>';
    sections.forEach(function (s) {
      html += '<a class="nav-link" data-spy="' + s.id + '" href="#' + s.id + '">' + s.label + "</a>";
    });
    html += "</nav>";
  }
  aside.innerHTML = html;

  var layout = document.querySelector(".layout");
  layout.insertBefore(aside, layout.firstChild);

  // scrollspy
  var spyLinks = aside.querySelectorAll(".nav-link[data-spy]");
  if (spyLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    spyLinks.forEach(function (l) { byId[l.getAttribute("data-spy")] = l; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          spyLinks.forEach(function (l) { l.classList.remove("is-active"); });
          if (byId[e.target.id]) byId[e.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-10% 0px -80% 0px", threshold: 0 });
    sections.forEach(function (s) {
      var el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
  }
})();
