/* Interactive demos for the docs (accordion, select, switch, chips, modal, toast). */
document.addEventListener("click", function (e) {
  /* Accordion */
  var accHead = e.target.closest(".accordion__header");
  if (accHead) {
    var item = accHead.closest(".accordion__item");
    var open = item.getAttribute("data-open") === "true";
    item.setAttribute("data-open", String(!open));
    accHead.setAttribute("aria-expanded", String(!open));
    return;
  }
  /* Select */
  var ctrl = e.target.closest(".select__control");
  if (ctrl) {
    var sel = ctrl.closest(".select");
    sel.setAttribute("aria-expanded", sel.getAttribute("aria-expanded") === "true" ? "false" : "true");
    return;
  }
  var opt = e.target.closest(".select__option");
  if (opt) {
    var s = opt.closest(".select");
    s.querySelectorAll(".select__option").forEach(function (o) { o.setAttribute("aria-selected", "false"); });
    opt.setAttribute("aria-selected", "true");
    var control = s.querySelector(".select__control");
    control.firstChild.textContent = opt.textContent;
    control.setAttribute("data-empty", "false");
    s.setAttribute("aria-expanded", "false");
    return;
  }
  if (!e.target.closest(".select")) {
    document.querySelectorAll('.select[aria-expanded="true"]').forEach(function (x) { x.setAttribute("aria-expanded", "false"); });
  }
  /* Chip toggle */
  var chip = e.target.closest(".chip[data-toggle]");
  if (chip) { chip.classList.toggle("chip--selected"); }
  /* Post like */
  var like = e.target.closest(".post__action[data-like]");
  if (like) {
    var pressed = like.getAttribute("aria-pressed") === "true";
    like.setAttribute("aria-pressed", String(!pressed));
    var cnt = like.querySelector("[data-count]");
    if (cnt) cnt.textContent = String(parseInt(cnt.textContent, 10) + (pressed ? -1 : 1));
  }
  /* Modal open/close */
  var openM = e.target.closest("[data-open-modal]");
  if (openM) { document.getElementById(openM.getAttribute("data-open-modal")).style.display = "grid"; }
  if (e.target.closest("[data-close-modal]") || e.target.classList.contains("modal-backdrop")) {
    var bd = e.target.closest(".modal-backdrop");
    if (bd) bd.style.display = "none";
  }
  /* Toast demo */
  var toastBtn = e.target.closest("[data-toast]");
  if (toastBtn) { spawnToast(toastBtn.getAttribute("data-toast")); }
  if (e.target.closest(".toast__close")) { e.target.closest(".toast").remove(); }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-backdrop").forEach(function (m) { m.style.display = "none"; });
  }
});

function spawnToast(kind) {
  var zone = document.getElementById("toast-zone");
  if (!zone) return;
  var map = {
    success: ["i-success", "Profile saved successfully.", "status"],
    error:   ["i-error", "Couldn't save. Check your connection.", "alert"],
    info:    ["i-info", "Your session will expire in 5 minutes.", "status"]
  };
  var m = map[kind] || map.info;
  var t = document.createElement("div");
  t.className = "toast toast--" + kind;
  t.setAttribute("role", m[2]);
  t.innerHTML = '<svg class="toast__icon" width="20" height="20"><use href="#' + m[0] + '"/></svg>' +
    '<span class="toast__msg">' + m[1] + '</span>' +
    '<button class="toast__close" aria-label="Dismiss"><svg width="16" height="16"><use href="#i-close"/></svg></button>';
  zone.appendChild(t);
  setTimeout(function () { if (t.parentNode) t.remove(); }, 4000);
}
