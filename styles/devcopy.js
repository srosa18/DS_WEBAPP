/* Dev handoff: per-component "Copy code" / "Copy prompt" buttons.
   Builds content from each <section class="sec"> (title + desc + demo markup).
   Pure client-side, no dependencies. */
(function () {
  function dedent(html) {
    var lines = html.replace(/\t/g, "  ").split("\n");
    while (lines.length && !lines[0].trim()) lines.shift();
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    var min = Infinity;
    lines.forEach(function (l) {
      if (l.trim()) { var m = l.match(/^ */)[0].length; if (m < min) min = m; }
    });
    if (min === Infinity) min = 0;
    return lines.map(function (l) { return l.slice(min); }).join("\n").trim();
  }

  function codeFor(sec) {
    var stages = sec.querySelectorAll(".demo__stage");
    var parts = [];
    stages.forEach(function (s) {
      var clone = s.cloneNode(true);
      // drop doc-only scaffolding labels so the dev gets clean component markup
      clone.querySelectorAll(".state-label").forEach(function (n) { n.remove(); });
      parts.push(dedent(clone.innerHTML));
    });
    return parts.join("\n\n");
  }

  function promptFor(sec, title, desc) {
    return [
      'Build the "' + title + '" component for a mobile, dark-theme design system',
      "(Achondroplasia Summit Brazil 2026 — healthcare-professional audience).",
      "",
      "Spec: " + desc,
      "",
      "Design tokens (use these, never hardcode loose values): font Inter; radius pill 32 / card 16; " +
        "control height 44px; accent #ff6300; surface field #00002b; surface raised #fff; " +
        "text on dark #fff; placeholder #8f8fff; divider rgba(0,0,70,.12); focus ring 2px #ff6300 (offset 2px). " +
        "Include the full state set where applicable: default, hover, focus (ring), press, disabled (opacity .4), loading; " +
        "form fields also error. Meet WCAG AA contrast and respect prefers-reduced-motion.",
      "",
      "Reference markup (replicate structure and classes, bind to the tokens above):",
      "```html",
      codeFor(sec),
      "```"
    ].join("\n");
  }

  function flash(btn, label) {
    var old = btn.textContent;
    btn.textContent = label;
    btn.classList.add("is-copied");
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
    } catch (e) { /* fall through */ }
    if (!done) fallbackCopy(text);
    flash(btn, "Copied ✓"); // immediate feedback on the user gesture
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
        '<button class="dev-copy__btn" type="button" data-kind="code">Copy code</button>' +
        '<button class="dev-copy__btn" type="button" data-kind="prompt">Copy prompt</button>';

      (descEl || titleEl).insertAdjacentElement("afterend", bar);

      bar.querySelector('[data-kind="code"]').addEventListener("click", function () {
        copy(codeFor(sec), this);
      });
      bar.querySelector('[data-kind="prompt"]').addEventListener("click", function () {
        copy(promptFor(sec, title, desc), this);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
