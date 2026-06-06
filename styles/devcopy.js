/* Dev handoff: per-component "Copy code" (self-contained snippet) and "Copy prompt".
   - Copy code: HTML + matched component CSS + :root tokens + used SVG icons + Inter font.
   - Copy prompt: AI-ready brief (title + spec + reference markup + tokens).
   Pure client-side, no dependencies. */
(function () {
  function dedent(html) {
    var lines = html.replace(/\t/g, "  ").split("\n");
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    var min = Infinity;
    lines.forEach(function (l) { if (l.trim()) { var m = l.match(/^ */)[0].length; if (m < min) min = m; } });
    if (min === Infinity) min = 0;
    return lines.map(function (l) { return l.slice(min); }).join("\n").trim();
  }

  /* clean component markup (no doc-only state labels) */
  function htmlFor(sec) {
    var parts = [];
    sec.querySelectorAll(".demo__stage").forEach(function (s) {
      var clone = s.cloneNode(true);
      clone.querySelectorAll(".state-label").forEach(function (n) { n.remove(); });
      parts.push(dedent(clone.innerHTML));
    });
    return parts.join("\n\n");
  }

  /* strip pseudo-classes/elements to get a matchable base selector */
  function baseSelector(sel) {
    return sel.replace(/::?[-a-zA-Z]+(\([^)]*\))?/g, "").trim();
  }

  function selfContained(sec, title) {
    var html = htmlFor(sec);
    var probe = document.createElement("div");
    probe.innerHTML = html;

    function matches(part) {
      var base = baseSelector(part);
      if (!base) return false;
      try { if (probe.querySelector(base)) return true; } catch (e) {}
      for (var i = 0; i < probe.children.length; i++) {
        try { if (probe.children[i].matches && probe.children[i].matches(base)) return true; } catch (e) {}
      }
      return false;
    }

    var tokens = [], comp = [], seen = {};
    function push(arr, css) { if (!seen[css]) { seen[css] = 1; arr.push(css); } }

    function walk(rules) {
      for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        if (r.type === 1) { // CSSStyleRule
          var sel = r.selectorText || "";
          if (sel.indexOf(":root") > -1) { push(tokens, r.cssText); continue; }
          if (sel.split(",").some(matches)) push(comp, r.cssText);
        } else if (r.cssRules) { // @media / @supports (grouping)
          var inner = [];
          for (var j = 0; j < r.cssRules.length; j++) {
            var ir = r.cssRules[j];
            if (ir.type !== 1) continue;
            var s = ir.selectorText || "";
            if (s.indexOf(":root") > -1) { push(tokens, ir.cssText); continue; }
            if (s.split(",").some(matches)) inner.push(ir.cssText);
          }
          if (inner.length) {
            var cond = r.conditionText || (r.media && r.media.mediaText) || "";
            push(comp, "@media " + cond + " {\n  " + inner.join("\n  ") + "\n}");
          }
        }
      }
    }

    for (var s = 0; s < document.styleSheets.length; s++) {
      var rules;
      try { rules = document.styleSheets[s].cssRules; } catch (e) { continue; }
      if (rules) walk(rules);
    }

    /* inline the SVG symbols referenced via <use href="#..."> */
    var ids = {};
    probe.querySelectorAll("use").forEach(function (u) {
      var href = u.getAttribute("href") || u.getAttribute("xlink:href") || "";
      if (href.charAt(0) === "#") ids[href.slice(1)] = 1;
    });
    var symbols = "";
    Object.keys(ids).forEach(function (id) {
      var sym = document.getElementById(id);
      if (sym && sym.tagName && sym.tagName.toLowerCase() === "symbol") symbols += sym.outerHTML;
    });
    var sprite = symbols
      ? '<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">' + symbols + "</svg>\n"
      : "";

    return [
      "<!-- " + title + " — Achondroplasia Summit DS · self-contained snippet -->",
      '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Allura&display=swap" rel="stylesheet">',
      "<style>",
      "/* design tokens */",
      tokens.join("\n"),
      "",
      "/* component styles */",
      comp.join("\n"),
      "</style>",
      "",
      sprite + '<div style="background:#000019;padding:24px;font-family:Inter,system-ui,sans-serif;">',
      html,
      "</div>"
    ].join("\n");
  }

  function promptFor(sec, title, desc) {
    return [
      'Build the "' + title + '" component for a mobile, dark-theme design system',
      "(Achondroplasia Summit Brazil 2026 — healthcare-professional audience).",
      "",
      "Spec: " + desc,
      "",
      "Design tokens (use these, never hardcode loose values): font Inter; radius pill 32 / card 16; " +
        "control height 44px; accent #ff6300; surface field #00002b; surface raised #fff; text on dark #fff; " +
        "placeholder #8f8fff; divider rgba(0,0,70,.12); focus ring 2px #ff6300 (offset 2px). " +
        "Include the full state set where applicable: default, hover, focus (ring), press, disabled (opacity .4), loading; " +
        "form fields also error. Meet WCAG AA contrast and respect prefers-reduced-motion.",
      "",
      "Reference markup (replicate structure and classes, bind to the tokens above):",
      "```html",
      htmlFor(sec),
      "```"
    ].join("\n");
  }

  function flash(btn, label) {
    var old = btn.getAttribute("data-label") || btn.textContent;
    btn.textContent = label; btn.classList.add("is-copied");
    setTimeout(function () { btn.textContent = old; btn.classList.remove("is-copied"); }, 1400);
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    ta.remove();
  }
  function copy(text, btn) {
    var done = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
        done = true;
      }
    } catch (e) {}
    if (!done) fallbackCopy(text);
    flash(btn, "Copied ✓");
  }

  function init() {
    document.querySelectorAll("section.sec").forEach(function (sec) {
      var titleEl = sec.querySelector(".sec__title");
      if (!titleEl || !sec.querySelector(".demo__stage")) return;
      if (sec.querySelector(".dev-copy")) return;
      var title = titleEl.innerText.trim().replace(/\s+/g, " ");
      var descEl = sec.querySelector(".sec__desc");
      var desc = descEl ? descEl.innerText.trim().replace(/\s+/g, " ") : "";

      var bar = document.createElement("div");
      bar.className = "dev-copy";
      bar.innerHTML =
        '<span class="dev-copy__tag">DEV</span>' +
        '<button class="dev-copy__btn" type="button" data-kind="code" data-label="Copy code">Copy code</button>' +
        '<button class="dev-copy__btn" type="button" data-kind="prompt" data-label="Copy prompt">Copy prompt</button>' +
        '<span class="dev-copy__hint">code = self-contained HTML+CSS</span>';
      (descEl || titleEl).insertAdjacentElement("afterend", bar);

      bar.querySelector('[data-kind="code"]').addEventListener("click", function () {
        copy(selfContained(sec, title), this);
      });
      bar.querySelector('[data-kind="prompt"]').addEventListener("click", function () {
        copy(promptFor(sec, title, desc), this);
      });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
