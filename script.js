/* ------------------------------------------------------------------
   EDIT THESE
   ------------------------------------------------------------------ */

// One line per thumbnail. Put the 1280x720 JPG in thumbs/ and match the file name.
// The full portfolio page (portfolio.html) shows every line. Add as many as you need.
// The home page shows the ones marked featured: true, or the first FEATURED_COUNT if none are.
const WORKS = [
  { file: "thumbs/01.jpg", client: "Client name", title: "Thumbnail title 1" },
  { file: "thumbs/02.jpg", client: "Client name", title: "Thumbnail title 2" },
  { file: "thumbs/03.jpg", client: "Client name", title: "Thumbnail title 3" },
  { file: "thumbs/04.jpg", client: "Client name", title: "Thumbnail title 4" },
  { file: "thumbs/05.jpg", client: "Client name", title: "Thumbnail title 5" },
  { file: "thumbs/06.jpg", client: "Client name", title: "Thumbnail title 6" },
  { file: "thumbs/07.jpg", client: "Client name", title: "Thumbnail title 7" },
  { file: "thumbs/08.jpg", client: "Client name", title: "Thumbnail title 8" },
  { file: "thumbs/09.jpg", client: "Client name", title: "Thumbnail title 9" },
];

const FEATURED_COUNT = 6;

// true: missing images show a labelled empty frame for everyone (use while setting up).
// false: missing images are hidden on the live site. Empty frames still show on
// localhost, file:// and any URL ending in ?edit.
const SHOW_PLACEHOLDERS = true;

// Zack's video lives at testimonial/zack.mp4. The section stays hidden until that file exists.
// Leave quote empty ("") to show the video without a quote.
const TESTIMONIAL = {
  name: "Zack",
  role: "",
  quote: "",
};

/* ------------------------------------------------------------------
   Nothing below needs editing
   ------------------------------------------------------------------ */

const $ = (id) => document.getElementById(id);
const page = document.body.dataset.page;

const host = location.hostname;
const isLocal =
  location.protocol === "file:" ||
  host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host.endsWith(".local");
const showEmpty =
  SHOW_PLACEHOLDERS || isLocal || new URLSearchParams(location.search).has("edit");

function probe(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/* Work grid ---------------------------------------------------------- */

const grid = $("grid");
const viewer = $("viewer");

function makeCard(work, eager, settle) {
  const li = document.createElement("li");
  li.className = "card";
  li.dataset.client = work.client;

  const cap = document.createElement("span");
  cap.className = "cap";
  cap.innerHTML = "<b></b><span></span>";
  cap.firstChild.textContent = work.client;
  cap.lastChild.textContent = work.title;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "card-btn";
  btn.setAttribute("aria-label", `Enlarge: ${work.client}, ${work.title}`);
  btn.work = work;

  const img = document.createElement("img");
  img.className = "thumb";
  img.alt = `${work.client} thumbnail: ${work.title}`;
  img.width = 1280;
  img.height = 720;
  img.decoding = "async";
  img.loading = eager ? "eager" : "lazy";
  img.addEventListener("load", () => settle && settle(true), { once: true });
  img.addEventListener("error", () => {
    if (showEmpty) {
      const frame = document.createElement("div");
      frame.className = "frame";
      frame.innerHTML = "<b></b><span>Empty slot. Add a 1280x720 JPG.</span>";
      frame.firstChild.textContent = work.file;
      btn.replaceWith(frame);
      li.append(cap);
    } else {
      li.remove();
    }
    settle && settle(false);
  }, { once: true });
  img.src = work.file;

  btn.append(img, cap);
  btn.addEventListener("click", () => openViewer(btn));
  li.append(btn);
  return li;
}

function buildWork() {
  let items = WORKS;
  if (page === "home") {
    const flagged = WORKS.filter((w) => w.featured);
    items = flagged.length ? flagged : WORKS.slice(0, FEATURED_COUNT);
  }

  const eagerCount = page === "all" ? 12 : items.length;
  let pending = Math.min(eagerCount, items.length);
  let loaded = 0;
  const settle = (ok) => {
    if (ok) loaded++;
    if (--pending > 0 || loaded > 0 || showEmpty) return;
    showEmptyState();
  };

  items.forEach((w, i) => {
    grid.append(makeCard(w, i < eagerCount, i < eagerCount ? settle : null));
  });
  if (page === "all") buildFilters(items);
}

function showEmptyState() {
  grid.hidden = true;
  $("work-empty").hidden = false;
  ["filters", "work-note", "view-all"].forEach((id) => {
    const el = $(id);
    if (el) el.hidden = true;
  });
}

/* Filter by client (portfolio page) ---------------------------------- */

function buildFilters(items) {
  const box = $("filters");
  const clients = [...new Set(items.map((w) => w.client))];
  if (clients.length < 2) return;
  const make = (label, value) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "filter";
    b.textContent = label;
    b.dataset.value = value;
    b.setAttribute("aria-pressed", value === "" ? "true" : "false");
    b.addEventListener("click", () => {
      box.querySelectorAll(".filter").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      grid.querySelectorAll(".card").forEach((li) => {
        li.hidden = value !== "" && li.dataset.client !== value;
      });
    });
    return b;
  };
  box.append(make("All", ""), ...clients.map((c) => make(c, c)));
  box.hidden = false;
}

/* Enlarge dialog ----------------------------------------------------- */

let list = [];
let current = 0;

function showAt(i) {
  current = (i + list.length) % list.length;
  const w = list[current].work;
  $("viewer-img").src = w.file;
  $("viewer-img").alt = `${w.client} thumbnail: ${w.title}`;
  $("viewer-cap").textContent = `${w.client}: ${w.title}`;
  $("viewer-count").textContent = `${current + 1} of ${list.length}`;
}

function openViewer(btn) {
  list = [...grid.querySelectorAll(".card:not([hidden]) .card-btn")];
  const i = list.indexOf(btn);
  if (i < 0) return;
  showAt(i);
  const multi = list.length > 1;
  $("viewer-prev").hidden = !multi;
  $("viewer-next").hidden = !multi;
  viewer.showModal();
}

$("viewer-prev").addEventListener("click", () => showAt(current - 1));
$("viewer-next").addEventListener("click", () => showAt(current + 1));
viewer.addEventListener("click", (e) => {
  if (e.target === viewer) viewer.close(); // click on the backdrop
});
let swipeX = null;
viewer.addEventListener("pointerdown", (e) => { swipeX = e.clientX; });
viewer.addEventListener("pointerup", (e) => {
  if (swipeX === null || list.length < 2) return;
  const dx = e.clientX - swipeX;
  swipeX = null;
  if (Math.abs(dx) > 50) showAt(current + (dx < 0 ? 1 : -1));
});
viewer.addEventListener("keydown", (e) => {
  if (list.length < 2) return;
  if (e.key === "ArrowLeft") showAt(current - 1);
  if (e.key === "ArrowRight") showAt(current + 1);
});

/* Testimonial -------------------------------------------------------- */

function buildTestimonial() {
  const video = $("zack-video");
  if (!video) return;
  video.addEventListener(
    "loadedmetadata",
    () => {
      const who = [TESTIMONIAL.name, TESTIMONIAL.role].filter(Boolean).join(", ");
      $("testimonial-title").textContent = TESTIMONIAL.name ? `Hear from ${TESTIMONIAL.name}` : "Hear from a client";
      $("zack-caption").textContent = who;
      video.setAttribute("aria-label", who ? `Video from ${who}` : "Video testimonial");
      if (TESTIMONIAL.quote && TESTIMONIAL.quote.trim()) {
        const q = $("zack-quote");
        q.textContent = TESTIMONIAL.quote.trim();
        q.hidden = false;
        $("testimonial-body").classList.add("has-quote");
      }
      $("testimonial").hidden = false;
    },
    { once: true }
  );
  probe("testimonial/zack.jpg").then((ok) => {
    if (ok) video.poster = "testimonial/zack.jpg";
  });
  video.src = "testimonial/zack.mp4";
}

/* Srinagar clock ----------------------------------------------------- */

function startClock() {
  const el = $("clock");
  const fmt = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata",
  });
  const tick = () => {
    const now = new Date();
    el.textContent = fmt.format(now);
    el.dateTime = now.toISOString();
  };
  tick();
  setInterval(tick, 10000);
}

/* Contact form (Netlify Forms) --------------------------------------- */

function setupForm() {
  const form = $("contact-form");
  if (!form) return;
  const status = $("form-status");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    status.textContent = "Sending...";
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      status.textContent = "Thanks, I got your message. I'll reply to the email address you gave.";
    } catch (err) {
      status.textContent = "That didn't send. Please email ifham.wani89@gmail.com instead.";
    }
    btn.disabled = false;
  });
}

/* Hero: type your own title ------------------------------------------ */

function setupTry() {
  const input = $("try-title");
  if (!input) return;
  const tn = document.querySelector(".tn");
  const text = tn.querySelector(".tn-text");
  const line = $("tn-line");
  const box = $("tn-box-text");
  const cta = $("try-cta");
  const DEFAULT = { a: "YOU GET", b: "3 SECONDS" };
  const defaultLabel = tn.getAttribute("aria-label");

  document.querySelectorAll(".swatch").forEach((sw) => {
    sw.addEventListener("click", () => {
      document.querySelectorAll(".swatch").forEach((x) => x.setAttribute("aria-pressed", String(x === sw)));
      tn.dataset.style = sw.dataset.style;
      tn.classList.add("typed");
      syncMini();
    });
  });

  const mini = document.createElement("div");
  mini.className = "mini";
  mini.id = "mini";
  mini.hidden = true;
  mini.innerHTML = '<div class="tn-wrap"></div><div class="mini-row"><a class="btn btn-small" href="#contact">Start a project</a><button type="button" class="btn btn-small btn-quiet" id="mini-close">Close</button></div>';
  const miniTn = tn.cloneNode(true);
  miniTn.classList.add("typed");
  miniTn.removeAttribute("role");
  miniTn.setAttribute("aria-hidden", "true");
  miniTn.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
  mini.querySelector(".tn-wrap").append(miniTn);
  document.body.append(mini);
  let miniClosed = false;
  try { miniClosed = sessionStorage.getItem("miniClosed") === "1"; } catch (e) {}
  $("mini-close").addEventListener("click", () => {
    miniClosed = true;
    mini.hidden = true;
    try { sessionStorage.setItem("miniClosed", "1"); } catch (e) {}
  });
  function syncMini() {
    miniTn.dataset.style = tn.dataset.style || "";
    const a = miniTn.querySelector(".tn-line"), b = miniTn.querySelector(".tn-box-text");
    a.textContent = line.textContent; a.hidden = line.hidden; b.textContent = box.textContent;
    miniTn.querySelector(".tn-text").style.setProperty("--fs", text.style.getPropertyValue("--fs") || 17);
  }
  window.__miniShow = (on) => { mini.hidden = !on || miniClosed; };

  const replay = $("replay");
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    replay.hidden = true;
  } else {
    replay.addEventListener("click", () => {
      tn.classList.remove("typed");
      const parts = tn.querySelectorAll(".tn-bar i, .tn-cursor, .tn-ripple, .tn-box");
      parts.forEach((el) => (el.style.animation = "none"));
      void tn.offsetWidth;
      parts.forEach((el) => (el.style.animation = ""));
    });
  }

  function split(title) {
    const words = title.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return DEFAULT;
    if (words.length === 1) return { a: "", b: words[0] };
    let best = 1, bestScore = Infinity;
    for (let i = 1; i < words.length; i++) {
      const a = words.slice(0, i).join(" ").length;
      const b = words.slice(i).join(" ").length;
      const score = Math.max(a, b) + (a > b ? 0.5 : 0); // keep the yellow line the longer one
      if (score < bestScore) { bestScore = score; best = i; }
    }
    return { a: words.slice(0, best).join(" "), b: words.slice(best).join(" ") };
  }

  function fit() {
    let fs = 17;
    text.style.setProperty("--fs", fs);
    const limit = tn.clientWidth * 0.86;
    while (fs > 4 && Math.max(line.scrollWidth, box.parentElement.offsetWidth) > limit) {
      fs -= 0.5;
      text.style.setProperty("--fs", fs);
    }
  }

  input.addEventListener("input", () => {
    const title = input.value.trim();
    tn.classList.add("typed");
    const t = split(input.value);
    line.textContent = t.a;
    line.hidden = !t.a;
    box.textContent = t.b;
    tn.setAttribute("aria-label", title ? `Thumbnail that reads: ${t.a} ${t.b}`.replace("  ", " ") : defaultLabel);
    fit();
    cta.hidden = !title;
    $("try-note").textContent = /shocking|insane|you won'?t believe|gone wrong|exposed|nobody tells you/i.test(title)
      ? "That title is doing a lot of work. I can help the thumbnail do some of it."
      : "";
    syncMini();
  });

  cta.addEventListener("click", () => {
    const msg = document.querySelector("#contact-form [name=message]");
    const title = input.value.trim();
    if (msg && title && !msg.value.trim()) msg.value = `Video title: ${title}\n`;
  });
}

/* Progress bar, copy email, sticky call to action ---------------------- */

function setupExtras() {
  const bar = $("progress-bar");
  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update);
  update();

  const copy = $("copy-email");
  if (copy) {
    copy.addEventListener("click", async () => {
      const note = $("copy-note");
      try {
        await navigator.clipboard.writeText("ifham.wani89@gmail.com");
        note.textContent = "Copied";
      } catch (e) {
        note.textContent = "Select and copy the address above";
      }
      setTimeout(() => (note.textContent = ""), 2500);
    });
  }

  const cta = $("sticky-cta");
  const contact = $("contact");
  const hero = document.querySelector(".hero, .page-head");
  if (cta && contact && "IntersectionObserver" in window) {
    let pastHero = false, atContact = false;
    const show = () => { cta.hidden = !pastHero || atContact; if (window.__miniShow) window.__miniShow(pastHero && !atContact); };
    new IntersectionObserver(([en]) => { pastHero = !en.isIntersecting; show(); }).observe(hero);
    new IntersectionObserver(([en]) => { atContact = en.isIntersecting; show(); }).observe(contact);
  }
}

/* YouTube-style extras ------------------------------------------------ */

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollBehavior = reduced ? "auto" : "smooth";

function setupChannel() {
  const sub = $("subscribe");
  if (!sub) return;
  let taps = 0;
  const lines = [
    "Subscribed. There's no newsletter, though. The best way to follow my work is to hire me.",
    "Unsubscribed. I'm fine. Really.",
    "Subscribed again. You clearly like clicking things. That's a good sign for a thumbnail.",
  ];
  sub.addEventListener("click", () => {
    const on = sub.getAttribute("aria-pressed") !== "true";
    sub.setAttribute("aria-pressed", String(on));
    sub.textContent = on ? "Subscribed" : "Subscribe";
    $("sub-note").textContent = lines[Math.min(taps++, lines.length - 1)];
  });
  const toggle = $("desc-toggle");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    $("desc-more").hidden = !open;
    toggle.textContent = open ? "Show less" : "Show more";
  });
}

function setupAd() {
  const ad = $("ad");
  if (!ad) return;
  const skip = $("ad-skip");
  let started = false;
  new IntersectionObserver((entries, obs) => {
    if (!entries[0].isIntersecting || started) return;
    started = true;
    obs.disconnect();
    $("ad-bar").classList.add("run");
    let left = 5;
    const timer = setInterval(() => {
      left--;
      if (left > 0) { skip.textContent = `Skip ad in ${left}`; return; }
      clearInterval(timer);
      skip.textContent = "Skip ad";
      skip.disabled = false;
    }, 1000);
  }, { threshold: 0.7 }).observe(ad);
  skip.addEventListener("click", () => {
    ad.querySelector(".ad-box").hidden = true;
    $("ad-done").hidden = false;
  });
}

function setupChapters() {
  const steps = [...document.querySelectorAll(".steps li")];
  const box = document.querySelector(".steps");
  if (!steps.length || reduced) return; // reduced motion keeps every chapter filled
  steps.forEach((li) => li.style.setProperty("--fill", 0));
  const update = () => {
    const r = box.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.25)));
    steps.forEach((li, i) => li.style.setProperty("--fill", Math.min(1, Math.max(0, p * steps.length - i))));
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
}

function setupEndScreen() {
  const btn = $("end-replay");
  if (!btn) return;
  btn.addEventListener("click", () => {
    scrollTo({ top: 0, behavior: scrollBehavior });
    const replay = $("replay");
    if (replay && !replay.hidden) setTimeout(() => replay.click(), reduced ? 0 : 500);
  });
}

function setupShortcuts() {
  const keys = $("keys");
  const sections = () => [...document.querySelectorAll("main > section, main > aside")].filter((el) => !el.hidden && el.offsetParent !== null);
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t.matches("input, textarea, select") || t.isContentEditable) return;
    if (document.querySelector("dialog[open]") && e.key !== "?") return;
    if (e.key === "?") { keys.open ? keys.close() : keys.showModal(); return; }
    if (e.key === "w") { location.href = page === "home" ? "portfolio.html" : "portfolio.html"; return; }
    if (e.key === "/" && page === "home") { e.preventDefault(); $("try-title").focus(); scrollTo({ top: 0, behavior: scrollBehavior }); return; }
    if (e.key === "k" && page === "home" && $("replay") && !$("replay").hidden) { scrollTo({ top: 0, behavior: scrollBehavior }); $("replay").click(); return; }
    if (e.key === "j" || e.key === "l") {
      const list = sections();
      const here = list.filter((el) => el.getBoundingClientRect().top <= 8).length - 1;
      const next = e.key === "l" ? Math.min(list.length - 1, here + 1) : here >= 0 && list[here].getBoundingClientRect().top < -8 ? here : Math.max(0, here - 1);
      list[next].scrollIntoView({ behavior: scrollBehavior, block: "start" });
    }
  });
  keys.addEventListener("click", (e) => { if (e.target === keys) keys.close(); });
}

function setupTabTitle() {
  const original = document.title;
  document.addEventListener("visibilitychange", () => {
    document.title = document.hidden ? "Still buffering. Come back." : original;
  });
  console.log("%cLooking for a thumbnail designer?", "font-weight:bold;font-size:14px", "\nifham.wani89@gmail.com");
}

buildWork();
buildTestimonial();
startClock();
setupForm();
setupTry();
setupExtras();
setupChannel();
setupAd();
setupChapters();
setupEndScreen();
setupShortcuts();
setupTabTitle();
