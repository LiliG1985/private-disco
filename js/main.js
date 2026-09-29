/* PRIVATE DISCO — shared header, footer, contact links, forms */
(function () {
  document.documentElement.classList.add("js-ok");
  const C = window.PD_CONFIG || {};
  const page = document.body.dataset.page || "";

  const ICONS = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r=".9" fill="currentColor"/></svg>'
  };
  window.PD_ICONS = ICONS;

  const waNumber = String(C.whatsapp || "").replace(/\D/g, "");
  const waLink = (text) => "https://wa.me/" + waNumber + (text ? "?text=" + encodeURIComponent(text) : "");
  const igLink = "https://instagram.com/" + (C.instagram || "privatedisco");
  const mailLink = (subject) => "mailto:" + C.email + (subject ? "?subject=" + encodeURIComponent(subject) : "");
  const prettyWa = waNumber ? "+" + waNumber.replace(/^(\d{3})(\d{2})(\d{3})(\d{4})$/, "$1 $2 $3 $4") : "";
  window.PD = { waLink, igLink, mailLink, prettyWa, config: C };

  /* ---------- header ---------- */
  const links = [
    ["index.html", "Home", "home"],
    ["services.html", "Services", "services"],
    ["talent.html", "Talent", "talent"],
    ["competition.html", "Competition", "competition"],
    ["contact.html", "Contact", "contact"]
  ];
  const header = document.getElementById("site-header");
  if (header) {
    header.outerHTML =
      '<header class="site-header"><div class="wrap nav">' +
      '<a class="brand" href="index.html" aria-label="Private Disco home"><img src="assets/logo.png" alt="Private Disco" width="279" height="292"></a>' +
      '<button class="menu-btn" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '<ul class="nav-links">' +
      links.map(([h, t, k]) => '<li><a href="' + h + '"' + (k === page ? ' class="active"' : "") + ">" + t + "</a></li>").join("") +
      '<li><a class="nav-cta" href="' + waLink("Hi Private Disco, I'd like to enquire about an event.") + '" target="_blank" rel="noopener">Book now</a></li>' +
      "</ul></div></header>";
  }

  /* ---------- footer ---------- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    const footImg = "assets/banners/ball-glass.jpg";
    footer.outerHTML =
      '<footer><div class="foot-bg" style="background-image:url(' + footImg + ')"></div><div class="wrap">' +
      '<div class="foot-cta"><p class="eyebrow">Let\'s connect</p><h2>Let\'s bring your vision <span class="metal">to life.</span></h2>' +
      '<a class="btn btn-metal" href="' + waLink("Hi Private Disco, I'd like to enquire about an event.") + '" target="_blank" rel="noopener">' + ICONS.wa + 'Start the conversation</a></div>' +
      '<div class="foot">' +
      '<div><img src="assets/logo.png" alt="Private Disco" width="279" height="292"><p>Talent-first event and entertainment experiences across the UAE.</p></div>' +
      '<div><h4>Explore</h4><ul>' + links.map(([h, t]) => '<li><a href="' + h + '">' + t + "</a></li>").join("") + "</ul></div>" +
      '<div><h4>Get in touch</h4><ul>' +
      '<li><a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp ' + prettyWa + "</a></li>" +
      '<li><a href="' + mailLink() + '">' + C.email + "</a></li>" +
      '<li><a href="' + igLink + '" target="_blank" rel="noopener">@' + C.instagram + "</a></li>" +
      "</ul></div></div>" +
      '<div class="copy"><span>© ' + new Date().getFullYear() + " Private Disco. All rights reserved.</span><span>privatedisco.com</span></div>" +
      "</div></footer>" +
      '<a class="wa-float" href="' + waLink("Hi Private Disco, I'd like to enquire about an event.") + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + ICONS.wa + "</a>";
  }

  /* ---------- fill any [data-wa] / [data-mail] / [data-ig] links on the page ---------- */
  document.querySelectorAll("[data-wa]").forEach((a) => { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll("[data-mail]").forEach((a) => { a.href = mailLink(a.dataset.mail); });
  document.querySelectorAll("[data-ig]").forEach((a) => { a.href = igLink; a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll("[data-text=email]").forEach((e) => (e.textContent = C.email));
  document.querySelectorAll("[data-text=wa]").forEach((e) => (e.textContent = prettyWa));
  document.querySelectorAll("[data-text=name]").forEach((e) => (e.textContent = C.contactName || ""));
  document.querySelectorAll("[data-text=ig]").forEach((e) => (e.textContent = "@" + C.instagram));
  document.querySelectorAll("[data-icon]").forEach((e) => (e.innerHTML = ICONS[e.dataset.icon] || ""));

  /* ---------- menu + scroll ---------- */
  const hdr = document.querySelector(".site-header");
  const btn = document.querySelector(".menu-btn");
  if (btn) {
    btn.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      btn.setAttribute("aria-expanded", open);
    });
    document.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => document.body.classList.remove("menu-open")));
  }
  const onScroll = () => hdr && hdr.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- reveal on scroll ---------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 }) : null;
  document.querySelectorAll(".reveal").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));

  /* ---------- subtle motion: slow parallax on header & footer imagery only ---------- */
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const parallax = [...document.querySelectorAll(".banner-bg, .foot-bg")];
  const tick = () => {
    if (still) return;
    parallax.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        const f = el.classList.contains("banner-bg") ? 0.06 : 0.1;
        el.style.transform = "translate3d(0," + Math.max(-45, Math.min(45, (r.top + r.height / 2 - innerHeight / 2) * -f)).toFixed(1) + "px,0)" + (el.classList.contains("foot-bg") ? " scale(1.12)" : "");
      }
    });
  };
  tick();
  window.addEventListener("scroll", () => requestAnimationFrame(tick), { passive: true });
  window.addEventListener("resize", tick);

  /* ---------- form sending ----------
     With a Web3Forms key: emails the entry to you.
     Without one: opens WhatsApp with the entry typed out, ready to send. */
  window.PD.send = async function (subject, fields) {
    const lines = Object.entries(fields).filter(([, v]) => v).map(([k, v]) => k + ": " + v);
    if (C.web3formsKey) {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.assign({ access_key: C.web3formsKey, subject, from_name: "Private Disco website" }, fields))
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || "Send failed");
      return "email";
    }
    window.open(waLink(subject + "\n\n" + lines.join("\n")), "_blank", "noopener");
    return "whatsapp";
  };
})();
