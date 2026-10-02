/* PRIVATE DISCO — competition calendar + entry form */
(function () {
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DOW = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const MAX_MONTHS_AHEAD = 18;

  const today = new Date(); today.setHours(0, 0, 0, 0);
  let view = new Date(today.getFullYear(), today.getMonth(), 1);
  let selected = null;

  const grid = document.getElementById("cal-grid");
  const title = document.getElementById("cal-title");
  const prev = document.getElementById("cal-prev");
  const next = document.getElementById("cal-next");
  const picked = document.getElementById("cal-picked");
  const cal = document.getElementById("calendar");

  const fmt = (d) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const monthsFromNow = (d) => (d.getFullYear() - today.getFullYear()) * 12 + d.getMonth() - today.getMonth();

  function render() {
    title.textContent = MONTHS[view.getMonth()] + " " + view.getFullYear();
    prev.disabled = monthsFromNow(view) <= 0;
    next.disabled = monthsFromNow(view) >= MAX_MONTHS_AHEAD;
    let html = DOW.map((d) => '<div class="cal-dow">' + d + "</div>").join("");
    const offset = (new Date(view.getFullYear(), view.getMonth(), 1).getDay() + 6) % 7; // Monday first
    for (let i = 0; i < offset; i++) html += "<span></span>";
    const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= days; day++) {
      const d = new Date(view.getFullYear(), view.getMonth(), day);
      const cls = ["cal-day"];
      if (d.getTime() === today.getTime()) cls.push("today");
      if (d.getDay() === 5 || d.getDay() === 6) cls.push("wknd"); // Fri & Sat nights
      if (selected && d.getTime() === selected.getTime()) cls.push("sel");
      const past = d < today;
      html += '<button type="button" class="' + cls.join(" ") + '" data-d="' + iso(d) + '"' + (past ? " disabled" : "") +
        ' aria-label="' + fmt(d) + '"' + (selected && d.getTime() === selected.getTime() ? ' aria-pressed="true"' : "") + ">" + day + "</button>";
    }
    grid.innerHTML = html;
  }

  grid.addEventListener("click", (e) => {
    const b = e.target.closest(".cal-day");
    if (!b || b.disabled) return;
    const [y, m, d] = b.dataset.d.split("-").map(Number);
    selected = new Date(y, m - 1, d);
    picked.textContent = fmt(selected);
    picked.classList.remove("none");
    cal.classList.remove("cal-error");
    render();
  });
  prev.addEventListener("click", () => { view.setMonth(view.getMonth() - 1); render(); });
  next.addEventListener("click", () => { view.setMonth(view.getMonth() + 1); render(); });
  render();

  /* ---------- submit ---------- */
  const form = document.getElementById("comp-form");
  const status = document.getElementById("comp-status");
  const show = (msg, ok) => { status.textContent = msg; status.className = "form-status show " + (ok ? "ok" : "err"); };

  form.addEventListener("input", (e) => e.target.classList.remove("invalid"));

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let firstBad = null;
    form.querySelectorAll("[required]").forEach((el) => {
      const bad = el.type === "checkbox" ? !el.checked : !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
      el.classList.toggle("invalid", bad);
      if (bad && !firstBad) firstBad = el;
    });
    if (!selected) {
      cal.classList.add("cal-error");
      show("Please choose your requested date on the calendar.", false);
      cal.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (firstBad) {
      show("Please fill in the highlighted fields.", false);
      firstBad.focus();
      return;
    }

    const v = (id) => (document.getElementById(id).value || "").trim();
    const fields = {
      "Requested date": fmt(selected),
      "Start time": v("time"),
      "Celebration": v("celebration"),
      "Venue": v("venue"),
      "Guests": v("guests"),
      "Location": v("location"),
      "Why they should win": v("why"),
      "Name": v("name"),
      "Phone / WhatsApp": v("phone"),
      "Email": v("email"),
      "Instagram": v("insta"),
      "Follows @privatedisco": document.getElementById("follow").checked ? "Yes" : "No"
    };

    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true; btn.textContent = "Sending…";
    try {
      const via = await window.PD.send("Competition entry: " + fields.Name + " — " + fields.Celebration, fields, "competition");
      if (via === "email") {
        show("Thank you, " + fields.Name.split(" ")[0] + "! Your entry is in. We'll be in touch if you win — good luck.", true);
        form.reset(); selected = null; picked.textContent = "Tap a date"; picked.classList.add("none"); render();
      } else {
        show("WhatsApp has opened with your entry filled in — just press send to enter.", true);
      }
    } catch (err) {
      show("Sorry, your entry didn't send. Please try again, or message us on WhatsApp.", false);
    } finally {
      btn.disabled = false; btn.textContent = "Submit my entry";
    }
  });
})();
