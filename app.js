/* Klinik TriHati Plus — interactions
   1. Mobile drawer
   2. Staggered section entrances (IntersectionObserver)
   3. Gallery "index with preview"
   4. Booking form → WhatsApp deep link
*/
(function () {
  "use strict";

  /* ---------- 0. Sticky mobile bar: hide while scrolling down, show on scroll up ---------- */
  var bar = document.querySelector(".mob-bar");
  if (bar) {
    var lastY = window.scrollY;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y > lastY + 4) bar.classList.add("bar-hide");
      else if (y < lastY - 4) bar.classList.remove("bar-hide");
      lastY = y;
    }, { passive: true });
  }

  /* ---------- 1. Mobile drawer ---------- */
  var burger = document.querySelector(".nav-burger");
  var drawer = document.getElementById("navdrawer");
  if (burger && drawer) {
    burger.addEventListener("click", function () {
      var open = !drawer.hidden;
      drawer.hidden = open;
      burger.setAttribute("aria-expanded", String(!open));
      burger.setAttribute("aria-label", open ? "Buka menu" : "Tutup menu");
    });
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.hidden = true;
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2. Entrance: heading → text → media, staggered ---------- */
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function tagSection(el) {
    var targets = [];
    var head = el.querySelector(".sec-head, h2");
    var text = el.querySelectorAll("p, address, ul.points li, li, details");
    var media = el.querySelector("figure, .hero-media");
    if (head) { head.classList.add("rise"); targets.push(head); }
    text.forEach(function (t, i) {
      if (targets.indexOf(t) === -1 && t.closest(".sec-head") === null) {
        t.classList.add("rise", "d" + Math.min(i % 3 + 1, 3));
        targets.push(t);
      }
    });
    if (media) { media.classList.add("rise", "d2"); targets.push(media); }
    return targets;
  }

  if (!reduced && "IntersectionObserver" in window) {
    var sections = document.querySelectorAll("section, .trust");
    var all = [];
    sections.forEach(function (s) { all = all.concat(tagSection(s)); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px 12% 0px" });
    all.forEach(function (el) {
      // already on screen at load: reveal right away
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) {
        el.classList.add("in");
      } else {
        io.observe(el);
      }
    });
  }

  /* ---------- 3. Gallery: index with preview ---------- */
  var list = document.getElementById("galeriList");
  var img = document.getElementById("galeriImg");
  var cap = document.getElementById("galeriCap");
  if (list && img && cap) {
    var items = list.querySelectorAll("li");
    function select(li) {
      if (li.dataset.img === img.getAttribute("src")) return;
      items.forEach(function (o) { o.classList.remove("on"); });
      li.classList.add("on");
      img.classList.add("swap");
      setTimeout(function () {
        img.src = li.dataset.img;
        img.alt = li.dataset.cap;
        cap.textContent = li.dataset.cap;
        img.classList.remove("swap");
      }, 180);
    }
    items.forEach(function (li) {
      li.setAttribute("tabindex", "0");
      li.setAttribute("role", "button");
      li.addEventListener("click", function () { select(li); });
      li.addEventListener("mouseenter", function () { select(li); });
      li.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(li); }
      });
    });
  }

  /* ---------- 4. Booking form → WhatsApp ---------- */
  var form = document.getElementById("bookForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nama = document.getElementById("fNama").value.trim();
      var telp = document.getElementById("fTelp").value.trim();
      var svc = document.getElementById("fSvc").value;
      var tgl = document.getElementById("fTgl").value;

      if (!nama || !telp || !tgl) {
        var missing = !nama ? document.getElementById("fNama")
                    : !telp ? document.getElementById("fTelp")
                    : document.getElementById("fTgl");
        missing.focus();
        missing.style.boxShadow = "0 0 0 3px #E98A6E";
        return;
      }

      var tglID = "";
      if (tgl) {
        var d = new Date(tgl + "T00:00:00");
        tglID = d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      }

      var msg = "Halo Klinik TriHati Plus, saya ingin booking.\n"
        + "Nama: " + nama + "\n"
        + "No. HP: " + telp + "\n"
        + "Layanan: " + svc + "\n"
        + "Tanggal: " + tglID;
      window.open("https://wa.me/6285782073587?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  /* ---------- footer year ---------- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();
})();
