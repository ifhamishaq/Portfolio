/* ------------------------------------------------------------------
   EDIT THESE
   ------------------------------------------------------------------ */

// One line per thumbnail. Put the 1280x720 JPG in thumbs/ and match the file name.
// client is optional: leave it "" to show only the title.
// top: true marks your best thumbnails. The home page player flips through every one of them
// in its first 3 seconds, so keep this to your strongest work. Put the best ones first:
// the first lines also fill the "Selected work" block.
// niche is the topic chip on the portfolio page (Medicare, Finance, Business...).
// Leave it "" for none. The chips appear when two or more topics are used.
// The full portfolio page (portfolio.html) shows every line. Add as many as you need.
// The home page "Selected work" shows lines marked featured: true, or the first SELECTED_COUNT if none are.
// "Up next" then lists the following UPNEXT_COUNT lines.
const WORKS = [
  { file: "thumbs/27.jpg", client: "", niche: "Medicare", top: true, title: "Why is everyone switching plans?" },
  { file: "thumbs/17.jpg", client: "", niche: "Business", top: true, title: "The science of scaling" },
  { file: "thumbs/23.jpg", client: "", niche: "Business", top: true, title: "What pros know that amateurs don't" },
  { file: "thumbs/24.jpg", client: "", niche: "Business", top: true, title: "Just do it" },
  { file: "thumbs/07.jpg", client: "", niche: "Business", top: true, title: "5 mistakes losing the sale" },
  { file: "thumbs/18.jpg", client: "", niche: "Medicare", top: true, title: "Is Medicare broken???" },
  { file: "thumbs/12.jpg", client: "", niche: "Finance", top: true, title: "Is a bank the safest place to keep your money?" },
  { file: "thumbs/22.jpg", client: "", niche: "Business", top: true, title: "This is why you are not growing" },
  { file: "thumbs/15.jpg", client: "", niche: "Business", top: true, title: "Environment builds success" },
  { file: "thumbs/01.jpg", client: "", niche: "Business", top: true, title: "The full breakdown" },
  { file: "thumbs/16.jpg", client: "", niche: "Business", top: true, title: "Proximity to power explained" },
  { file: "thumbs/10.jpg", client: "", niche: "Business", top: true, title: "This is why you aren't growing" },
  { file: "thumbs/25.jpg", client: "", niche: "Medicare", top: true, title: "Avoiding late Medicare enrollment" },
  { file: "thumbs/05.jpg", client: "", niche: "Medicare", top: true, title: "Medicare Plan G or Plan N: which is right for you?" },
  { file: "thumbs/04.jpg", client: "", niche: "Business", top: true, title: "Why does nobody know you?" },
  { file: "thumbs/09.jpg", client: "", niche: "Medicare", top: true, title: "Costly Medicare mistakes" },
  { file: "thumbs/03.jpg", client: "", niche: "Business", top: true, title: "I grew up in poverty, now I'm a president" },
  { file: "thumbs/08.jpg", client: "", niche: "Business", top: true, title: "Your frequency is your future" },
  { file: "thumbs/20.jpg", client: "", niche: "Education", top: true, title: "Does school = average?" },
  { file: "thumbs/02.jpg", client: "", niche: "Business", title: "Inside the mind of a monster" },
  { file: "thumbs/06.jpg", client: "", niche: "Business", title: "The greatest comeback" },
  { file: "thumbs/11.jpg", client: "", niche: "Podcast", title: "Talk show podcast #20" },
  { file: "thumbs/13.jpg", client: "", niche: "Business", title: "The system that actually scales" },
  { file: "thumbs/14.jpg", client: "", niche: "Finance", title: "Approximate earning $80506.13" },
  { file: "thumbs/19.jpg", client: "", niche: "Business", title: "Why most people fail" },
  { file: "thumbs/21.jpg", client: "", niche: "Finance", title: "The 3-bucket retirement strategy" },
  { file: "thumbs/26.jpg", client: "", niche: "Finance", title: "Make money on social media" },
];

const SELECTED_COUNT = 6; // the "Selected work" block on the home page
const UPNEXT_COUNT = 8; // the "Up next" list beside it

// true: missing images show a labelled empty frame for everyone (use while setting up).
// false: missing images are hidden on the live site. Empty frames still show on
// localhost, file:// and any URL ending in ?edit.
const SHOW_PLACEHOLDERS = false;

// The pulsing LIVE-style badge near the Subscribe button and the contact form.
// Keep it TRUE: change the text whenever your availability changes, for example
// "Taking new projects", "Booking for next week" or "Fully booked until Friday".
// Set show to false to hide it.
const AVAILABILITY = { show: true, text: "Taking new projects" };

// Pricing cards. One line per card. detail is optional (leave "" to hide it).
// pick is what gets pre-filled in the contact form when someone clicks Choose.
// service must match one of the contact form's options.
const PRICING = [
  { name: "Starter thumbnail", price: "$20", unit: "starting price", detail: "", pick: "Starter thumbnail, $20", service: "YouTube thumbnails" },
  { name: "Plus thumbnail", price: "$30", unit: "per thumbnail", detail: "", pick: "Plus thumbnail, $30", service: "YouTube thumbnails" },
  { name: "Pro thumbnail", price: "$50", unit: "per thumbnail", detail: "", pick: "Pro thumbnail, $50", service: "YouTube thumbnails" },
  { name: "Carousels and posts", price: "$10", unit: "per image", detail: "", pick: "Carousels and posts, $10 per image", service: "Carousels" },
];

// Your top video, shown with a play-in-place player. views is typed by hand, so update it now and then.
// The title is the video's real title. Set TOP_VIDEO to null to hide the section.
const TOP_VIDEO = {
  id: "pZkDTMyrr6o",
  title: "I Switched 47 Clients From Plan G to Plan N This Year - Here's What I Learned",
  views: "124K views",
  thumb: "thumbs/27.jpg",
};

// Video testimonials. One entry per video: put the MP4 in testimonial/ and match the file name.
// poster is an optional still image. name, role and quote are all optional.
// A slot stays hidden on the live site until its video file exists. Preview empty slots
// by opening the page with ?edit at the end of the address.
const TESTIMONIALS = [
  { video: "testimonial/zack.mp4", poster: "testimonial/zack.jpg", name: "Zack", role: "", quote: "" },
  { video: "testimonial/client-2.mp4", poster: "testimonial/client-2.jpg", name: "", role: "", quote: "" },
  { video: "testimonial/client-3.mp4", poster: "testimonial/client-3.jpg", name: "", role: "", quote: "" },
];

/* ------------------------------------------------------------------
   Nothing below needs editing
   ------------------------------------------------------------------ */

const $ = (id) => document.getElementById(id);
const page = document.body.dataset.page;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollBehavior = reduced ? "auto" : "smooth";

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

/* Work cards ---------------------------------------------------------- */

const grid = $("grid");
const viewer = $("viewer");
const CHANNEL = "Ifham Ishaq";

function makeCard(work, eager, settle) {
  const li = document.createElement("li");
  li.className = "card";
  li.dataset.niche = work.niche || "";
  li.dataset.search = `${work.title} ${work.client || ""} ${work.niche || ""}`.toLowerCase();

  const label = work.client ? `${work.client}: ${work.title}` : work.title;
  const cap = document.createElement("span");
  cap.className = "cap";
  cap.innerHTML = '<img class="cap-av" src="images/ifham.jpg" alt="" width="36" height="36"><span class="cap-text"><b></b><span></span></span>';
  cap.querySelector("b").textContent = work.title;
  cap.querySelector(".cap-text > span").textContent = work.client || CHANNEL;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "card-btn";
  btn.setAttribute("aria-label", `Enlarge: ${label}`);
  btn.work = work;

  const img = document.createElement("img");
  img.className = "thumb";
  img.alt = `YouTube thumbnail: ${label}`;
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
  if (!grid) return;
  let groups;
  if (page === "home") {
    const flagged = WORKS.filter((w) => w.featured);
    const selected = flagged.length ? flagged : WORKS.slice(0, SELECTED_COUNT);
    const rest = WORKS.filter((w) => !selected.includes(w)).slice(0, UPNEXT_COUNT);
    groups = [[$("featured-grid"), selected], [grid, rest]];
  } else {
    groups = [[grid, WORKS]];
  }

  const all = groups.reduce((n, [, list]) => n + list.length, 0);
  const eagerCount = page === "all" ? 12 : all;
  let pending = Math.min(eagerCount, all);
  let loaded = 0;
  const settle = (ok) => {
    if (ok) loaded++;
    if (--pending > 0 || loaded > 0 || showEmpty) return;
    showEmptyState();
  };

  let n = 0;
  groups.forEach(([ul, list]) => list.forEach((w) => {
    const eager = n < eagerCount;
    ul.append(makeCard(w, eager, eager ? settle : null));
    n++;
  }));
  if (page === "all") setupBrowse(WORKS);
}

function showEmptyState() {
  grid.hidden = true;
  $("work-empty").hidden = false;
  ["filters", "view-all", "selected"].forEach((id) => { const el = $(id); if (el) el.hidden = true; });
}

/* Search and topic chips (portfolio page) ------------------------------ */

function setupBrowse(items) {
  const box = $("filters");
  const input = $("q");
  let niche = "";
  let query = new URLSearchParams(location.search).get("q") || "";
  input.value = query;

  const apply = () => {
    const q = query.trim().toLowerCase();
    let shown = 0;
    grid.querySelectorAll(".card").forEach((li) => {
      const hide = (niche && li.dataset.niche !== niche) || (q && !li.dataset.search.includes(q));
      li.hidden = hide;
      if (!hide) shown++;
    });
    $("no-match").hidden = shown > 0 || grid.hidden;
  };

  const niches = [...new Set(items.map((w) => w.niche).filter(Boolean))];
  if (niches.length > 1) {
    const make = (label, value) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = label;
      b.setAttribute("aria-pressed", String(value === ""));
      b.addEventListener("click", () => {
        niche = value;
        box.querySelectorAll(".chip").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        apply();
      });
      return b;
    };
    box.append(make("All", ""), ...niches.map((n) => make(n, n)));
    box.hidden = false;
  }

  input.addEventListener("input", () => { query = input.value; apply(); });
  $("search").addEventListener("submit", (e) => { e.preventDefault(); query = input.value; apply(); });
  apply();
}

/* Enlarge dialog ----------------------------------------------------- */

let list = [];
let current = 0;

function showAt(i) {
  current = (i + list.length) % list.length;
  const w = list[current].work;
  const label = w.client ? `${w.client}: ${w.title}` : w.title;
  $("viewer-img").src = w.file;
  $("viewer-img").alt = `YouTube thumbnail: ${label}`;
  $("viewer-cap").textContent = label;
  $("viewer-count").textContent = `${current + 1} of ${list.length}`;
}

function openViewer(btn) {
  list = [...document.querySelectorAll("main .grid .card:not([hidden]) .card-btn")];
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

/* Testimonials ------------------------------------------------------- */

function buildTestimonials() {
  const box = $("tgrid");
  if (!box) return;
  const reveal = () => { $("testimonials").hidden = false; };

  TESTIMONIALS.forEach((t) => {
    const li = document.createElement("li");
    li.hidden = true;
    const frameWrap = document.createElement("div");
    frameWrap.className = "tvideo";
    const video = document.createElement("video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    const label = t.name ? `Video testimonial from ${t.name}` : "Video testimonial";
    video.setAttribute("aria-label", label);
    frameWrap.append(video);
    li.append(frameWrap);

    if (t.name || t.role || t.quote) {
      const meta = document.createElement("div");
      meta.className = "tmeta";
      if (t.name) { const n = document.createElement("p"); n.className = "tname"; n.textContent = t.name; meta.append(n); }
      if (t.role) { const r = document.createElement("p"); r.className = "trole"; r.textContent = t.role; meta.append(r); }
      if (t.quote && t.quote.trim()) { const q = document.createElement("p"); q.className = "tquote"; q.textContent = t.quote.trim(); meta.append(q); }
      li.append(meta);
    }
    box.append(li);

    video.addEventListener("loadedmetadata", () => { li.hidden = false; reveal(); }, { once: true });
    video.addEventListener("error", () => {
      if (!showEmpty) { li.remove(); return; }
      frameWrap.replaceChildren();
      const frame = document.createElement("div");
      frame.className = "frame";
      frame.innerHTML = "<b></b><span>Empty slot. Add an MP4 video.</span>";
      frame.firstChild.textContent = t.video;
      frameWrap.append(frame);
      li.hidden = false;
      reveal();
    }, { once: true });

    if (t.poster) probe(t.poster).then((ok) => { if (ok) video.poster = t.poster; });
    video.src = t.video;
  });
}

/* Srinagar clock ----------------------------------------------------- */

function startClock() {
  const el = $("clock");
  if (!el) return;
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

/* Hero player: random style on every play, replay button, mini player ---- */

function setupHero() {
  const tn = document.querySelector(".tn");
  if (!tn) return;
  const STYLES = ["classic", "red", "gold", "clean", "black"];
  let last = "";
  const pick = () => {
    const options = STYLES.filter((s) => s !== last);
    last = options[Math.floor(Math.random() * options.length)];
    tn.dataset.style = last;
    syncMini();
  };

  const mini = document.createElement("div");
  mini.className = "mini";
  mini.id = "mini";
  mini.hidden = true;
  mini.innerHTML = '<div class="tn-wrap"></div><div class="mini-row"><a class="pill pill-red" href="#comments">Start a project</a><button type="button" class="pill pill-quiet" id="mini-close">Close</button></div>';
  const miniTn = tn.cloneNode(true);
  miniTn.setAttribute("inert", "");
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
  window.__miniShow = (on) => { mini.hidden = !on || miniClosed; };
  function syncMini() { miniTn.dataset.style = tn.dataset.style || ""; }

  // Personalised links (?for=Name) change the card's words and shrink them to fit.
  const text = tn.querySelector(".tn-text");
  const lineEl = $("tn-line"), boxEl = $("tn-box-text");
  function fit() {
    let fs = 17;
    text.style.setProperty("--fs", fs);
    const limit = tn.clientWidth * 0.86;
    while (fs > 4 && Math.max(lineEl.scrollWidth, boxEl.parentElement.offsetWidth) > limit) {
      fs -= 0.5;
      text.style.setProperty("--fs", fs);
    }
    miniTn.querySelector(".tn-text").style.setProperty("--fs", fs);
  }
  window.__setHeroText = (a, b) => {
    lineEl.textContent = a;
    boxEl.textContent = b;
    miniTn.querySelector(".tn-line").textContent = a;
    miniTn.querySelector(".tn-box-text").textContent = b;
    text.setAttribute("aria-label", `Sample thumbnail that reads: ${a} ${b}`);
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
  };

  // Phase 1: one of your real thumbnails for 3 seconds while the bar fills.
  // Phase 2: it hides and "YOU GET 3 SECONDS" appears, with the cursor click.
  const shot = $("tn-shot");
  const timeEl = $("tn-time");
  let timers = [];
  let run = 0;
  const clearTimers = () => { timers.forEach((t) => { clearTimeout(t); clearInterval(t); }); timers = []; };
  const setTime = (s) => { timeEl.textContent = `0:0${s} / 0:03`; };

  // The montage pool: every line marked top: true (or all work if none are).
  const pool = () => {
    const tops = WORKS.filter((w) => w.top);
    return (tops.length ? tops : WORKS).map((w) => w.file);
  };
  const cache = new Map(); // file -> loaded Image
  function preload() {
    return Promise.all(pool().map((f) => cache.has(f) ? Promise.resolve() : new Promise((res) => {
      const im = new Image();
      im.onload = () => { cache.set(f, im); res(); };
      im.onerror = () => res();
      im.src = f;
    })));
  }
  const ready = preload();

  // 3 seconds split into frames that get shorter and shorter, like scrolling a feed faster.
  function schedule(n) {
    const w = Array.from({ length: n }, (_, i) => 1 - 0.8 * (i / Math.max(1, n - 1)));
    const sum = w.reduce((a, b) => a + b, 0);
    let t = 0;
    return w.map((x) => { const at = t; t += (3000 * x) / sum; return at; });
  }

  async function play() {
    const mine = ++run;
    clearTimers();
    tn.classList.remove("shot", "bar-run", "cursor-run");
    pick();
    setTime(3);
    if (reduced) return; // reduced motion: show the end state, the design card
    tn.classList.add("shot"); // hide the card while the thumbnails load
    await Promise.race([ready, new Promise((r) => setTimeout(r, 1500))]);
    if (mine !== run) return;
    const files = pool().filter((f) => cache.has(f)).sort(() => Math.random() - 0.5);
    if (files.length < 3) {
      // Not enough thumbnails: play the card on its own, bar fills while the cursor clicks
      tn.classList.remove("shot");
      void tn.offsetWidth;
      tn.classList.add("bar-run", "cursor-run");
      return;
    }
    shot.src = files[0];
    void tn.offsetWidth;
    tn.classList.add("bar-run");
    let s = 0;
    setTime(0);
    timers.push(setInterval(() => { s++; if (s <= 3) setTime(s); }, 1000));
    schedule(files.length).forEach((at, i) => { if (i > 0) timers.push(setTimeout(() => { shot.src = files[i]; }, at)); });
    timers.push(setTimeout(() => {
      tn.classList.remove("shot", "bar-run");
      void tn.offsetWidth;
      tn.classList.add("cursor-run");
      setTime(3);
    }, 3000));
  }
  window.__replayHero = play;
  $("replay").addEventListener("click", play);
  miniTn.classList.remove("shot");
  play();
}

/* Header, theme, channel row, ad, chapters, shortcuts ----------------- */

function setupTheme() {
  const btn = $("theme-btn");
  const moon = '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor"/>';
  const sun = '<circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>';
  const paint = () => {
    const dark = document.documentElement.dataset.theme !== "light";
    btn.querySelector("svg").innerHTML = dark ? moon : sun;
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#0f0f0f" : "#ffffff");
  };
  window.__toggleTheme = () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint();
  };
  btn.addEventListener("click", window.__toggleTheme);
  paint();

  const menu = $("menu-btn");
  menu.addEventListener("click", () => {
    const min = document.body.classList.toggle("guide-min");
    menu.setAttribute("aria-pressed", String(min));
    menu.setAttribute("aria-label", min ? "Expand the side menu" : "Collapse the side menu");
  });

  const search = $("search");
  if (page === "home") {
    search.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = $("q").value.trim();
      location.href = "portfolio.html" + (q ? `?q=${encodeURIComponent(q)}` : "");
    });
  }
}

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

  const like = $("like");
  like.addEventListener("click", () => {
    const on = like.getAttribute("aria-pressed") !== "true";
    like.setAttribute("aria-pressed", String(on));
    $("sub-note").textContent = on ? "Liked. Thank you. A comment below would be even better." : "";
  });

  $("share").addEventListener("click", async () => {
    const url = location.href.split("#")[0];
    try {
      if (navigator.share) { await navigator.share({ title: document.title, url }); return; }
      await navigator.clipboard.writeText(url);
      $("sub-note").textContent = "Link copied.";
    } catch (e) {
      $("sub-note").textContent = "Copy the address from your browser's address bar.";
    }
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

function setupScenes() {
  const scenes = [...document.querySelectorAll(".scene")];
  if (!scenes.length) return;
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          const sc = en.target;
          sc.classList.toggle("in-view", en.isIntersecting);
          const v = sc.querySelector("video");
          if (v && sc.classList.contains("has-video") && !reduced) {
            if (en.isIntersecting) v.play().catch(() => {}); else v.pause();
          }
        });
      }, { threshold: 0.35 })
    : null;
  scenes.forEach((sc) => {
    if (io) io.observe(sc); else sc.classList.add("in-view");
    // Optional: replace the animation with your own video file.
    const src = sc.dataset.video;
    if (!src) return;
    const v = document.createElement("video");
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = "metadata";
    if (reduced) v.controls = true;
    v.addEventListener("loadedmetadata", () => {
      sc.append(v);
      sc.classList.add("has-video");
      sc.removeAttribute("aria-hidden");
      v.setAttribute("aria-label", "Animation for this step");
      if (!reduced && sc.classList.contains("in-view")) v.play().catch(() => {});
    }, { once: true });
    v.src = src;
  });
}

function setupTopVideo() {
  const sec = $("topvideo");
  if (!sec || !TOP_VIDEO) return;
  probe(TOP_VIDEO.thumb).then((ok) => {
    if (!ok) return;
    const url = `https://youtu.be/${TOP_VIDEO.id}`;
    $("tv-title").textContent = TOP_VIDEO.title;
    $("tv-views").textContent = TOP_VIDEO.views ? `${TOP_VIDEO.views} on YouTube` : "";
    $("tv-views").hidden = !TOP_VIDEO.views;
    $("tv-link").href = url;
    const media = $("tv-media");
    const img = document.createElement("img");
    img.src = TOP_VIDEO.thumb;
    img.alt = `Thumbnail of the video: ${TOP_VIDEO.title}`;
    img.width = 1280;
    img.height = 720;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tv-play";
    btn.setAttribute("aria-label", "Play the video here");
    btn.innerHTML = '<span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></span>';
    btn.addEventListener("click", () => {
      const f = document.createElement("iframe");
      f.src = `https://www.youtube-nocookie.com/embed/${TOP_VIDEO.id}?autoplay=1&rel=0`;
      f.title = TOP_VIDEO.title;
      f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
      f.allowFullscreen = true;
      media.replaceChildren(f);
    });
    media.append(img, btn);
    sec.hidden = false;
  });
}

/* Welcome overlay for personalised links ------------------------------ */

function showWelcome(name) {
  const quiet = [document.querySelector(".yt-top"), document.querySelector(".shell"), document.querySelector(".tabbar")].filter(Boolean);
  quiet.forEach((el) => el.setAttribute("inert", ""));
  const prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";

  const el = document.createElement("div");
  el.className = "welcome";
  el.id = "welcome";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-labelledby", "welcome-title");
  el.innerHTML = `
    <button type="button" class="welcome-skip">Skip</button>
    <div class="welcome-stage">
      <svg class="pouch pouch-back" viewBox="0 0 200 230" aria-hidden="true"><ellipse cx="100" cy="98" rx="58" ry="17" fill="#050912"/></svg>
      <div class="welcome-card">
        <h2 id="welcome-title"></h2>
        <p>I'm Ifham, a graphic designer in Srinagar. I make YouTube thumbnails, carousels and social posts for creators and agencies. I put this page together so you can see my work.</p>
        <button type="button" class="pill pill-red welcome-go">See my work</button>
      </div>
      <svg class="pouch pouch-front" viewBox="0 0 200 230" aria-hidden="true">
        <path class="flap fl" d="M46 99 C28 66 46 36 82 54 C73 68 73 86 82 102 Z" fill="#14264a"/>
        <path class="flap fr" d="M154 99 C172 66 154 36 118 54 C127 68 127 86 118 102 Z" fill="#14264a"/>
        <path d="M44 98 C14 142 16 202 58 218 Q100 230 142 218 C184 202 186 142 156 98 Q100 120 44 98 Z" fill="#0f1b33"/>
        <path d="M62 152 C58 178 66 200 84 210" stroke="#1d2f55" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="100" cy="172" r="19" fill="#FFD400"/>
        <text x="100" y="180" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="24" fill="#0f1b33">I</text>
        <path class="cord" d="M50 102 Q100 126 150 102" fill="none" stroke="#FFD400" stroke-width="5" stroke-linecap="round"/>
        <g class="tl"><path d="M97 118 L90 146" stroke="#FFD400" stroke-width="4" stroke-linecap="round"/><circle cx="90" cy="149" r="4.5" fill="#FFD400"/></g>
        <g class="tr"><path d="M103 118 L110 146" stroke="#FFD400" stroke-width="4" stroke-linecap="round"/><circle cx="110" cy="149" r="4.5" fill="#FFD400"/></g>
      </svg>
      <i class="spark"></i><i class="spark"></i><i class="spark"></i><i class="spark"></i><i class="spark"></i><i class="spark"></i><i class="spark"></i>
    </div>`;
  el.querySelector("#welcome-title").textContent = `Hi ${name},`;
  document.body.append(el);

  const go = el.querySelector(".welcome-go");
  const skip = el.querySelector(".welcome-skip");
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    document.removeEventListener("keydown", onKey);
    el.classList.add("leaving");
    setTimeout(() => {
      el.remove();
      quiet.forEach((q) => q.removeAttribute("inert"));
      document.documentElement.style.overflow = prevOverflow;
      scrollTo(0, 0);
      const h = document.querySelector(".title");
      if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
      if (window.__replayHero) window.__replayHero(); // start the hero fresh for them
    }, reduced ? 0 : 400);
  };
  const onKey = (e) => {
    if (e.key === "Escape") close();
    if (e.key === "Tab") { // keep focus inside the welcome
      const items = [skip, go];
      const i = items.indexOf(document.activeElement);
      e.preventDefault();
      items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    }
  };
  document.addEventListener("keydown", onKey);
  go.addEventListener("click", close);
  skip.addEventListener("click", close);
  skip.focus();
  if (reduced) go.focus();
  else setTimeout(() => { if (!closed) go.focus(); }, 3000);
}

function setupPersonal() {
  const raw = new URLSearchParams(location.search).get("for");
  if (!raw) return;
  const name = raw.replace(/[^\p{L}\p{N} &.'’-]/gu, "").replace(/\s+/g, " ").slice(0, 30).trim();
  if (!name) return;
  document.title = `Ifham Ishaq, graphic designer for ${name}`;
  const hello = $("hello");
  if (hello) {
    $("hello-text").textContent = `Hi ${name}, I'm Ifham. I design thumbnails, carousels and social posts for creators and agencies.`;
    hello.hidden = false;
    $("hello-x").addEventListener("click", () => { hello.hidden = true; });
  }
  const f = $("for-field");
  if (f) f.value = name;
  const msg = document.querySelector("#contact-form [name=message]");
  if (msg && !msg.value) msg.value = `Hi Ifham, this is ${name}. `;
  if (window.__setHeroText) window.__setHeroText(`${name.toUpperCase()},`, "YOU GET 3 SECONDS");
  if (page === "home") showWelcome(name);
}

function setupAvailability() {
  document.querySelectorAll("[data-live]").forEach((el) => {
    if (!AVAILABILITY.show || !AVAILABILITY.text) { el.hidden = true; return; }
    el.querySelector("[data-live-text]").textContent = AVAILABILITY.text;
  });
}

function setupPricing() {
  const box = $("tiers");
  if (!box) return;
  const pkg = $("package");
  if (pkg) {
    pkg.replaceChildren(...["Not sure yet", ...PRICING.map((t) => t.pick)].map((label) => new Option(label, label)));
  }
  PRICING.forEach((t) => {
    const li = document.createElement("li");
    li.className = "tier";
    li.innerHTML = '<h3 class="tier-name"></h3><p class="tier-price"><b></b><span></span></p><p class="tier-detail"></p><a class="pill pill-red" href="#comments">Choose this</a>';
    li.querySelector(".tier-name").textContent = t.name;
    li.querySelector("b").textContent = t.price;
    li.querySelector(".tier-price span").textContent = t.unit;
    const d = li.querySelector(".tier-detail");
    d.textContent = t.detail || "";
    d.hidden = !t.detail;
    li.querySelector(".pill").setAttribute("aria-label", `Choose ${t.name}, ${t.price} ${t.unit}`);
    li.querySelector(".pill").addEventListener("click", () => {
      const form = $("contact-form");
      if (!form) return;
      const sel = form.querySelector("[name=service]");
      if ([...sel.options].some((o) => o.value === t.service)) sel.value = t.service;
      $("package").value = t.pick;
    });
    box.append(li);
  });
}

function setupCaptions() {
  const btn = $("cc-btn");
  if (!btn) return;
  const cc = $("tn-cc");
  const lines = ["[upbeat music]", "[keyboard clicking]", "You get 3 seconds.", "[cursor clicks the yellow box]", "Make them count."];
  let timer = null, i = 0;
  const show = () => { cc.textContent = lines[i % lines.length]; i++; };
  const set = (on) => {
    btn.setAttribute("aria-pressed", String(on));
    clearInterval(timer);
    if (on) { i = 0; show(); timer = setInterval(show, 2200); } else { cc.textContent = ""; }
  };
  btn.addEventListener("click", () => set(btn.getAttribute("aria-pressed") !== "true"));
  window.__toggleCaptions = () => set(btn.getAttribute("aria-pressed") !== "true");
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
        note.textContent = "Select and copy the address";
      }
      setTimeout(() => (note.textContent = ""), 2500);
    });
  }

  // Miniplayer follows the visitor once the player scrolls away, until the contact form is on screen.
  const player = document.querySelector(".player");
  const contact = $("comments");
  if (player && contact && "IntersectionObserver" in window) {
    let pastPlayer = false, atContact = false;
    const show = () => { if (window.__miniShow) window.__miniShow(pastPlayer && !atContact); };
    new IntersectionObserver(([en]) => { pastPlayer = !en.isIntersecting; show(); }).observe(player);
    new IntersectionObserver(([en]) => { atContact = en.isIntersecting; show(); }).observe(contact);
  }
}

function setupShortcuts() {
  const keys = $("keys");
  const sections = () => [...document.querySelectorAll("main [data-section]")].filter((el) => !el.hidden && el.offsetParent !== null);
  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t.matches("input, textarea, select") || t.isContentEditable) return;
    if (document.querySelector("dialog[open]") && e.key !== "?") return;
    if (e.key === "?") { keys.open ? keys.close() : keys.showModal(); return; }
    if (e.key === "w") { location.href = "portfolio.html"; return; }
    if (e.key === "t" && window.__toggleTheme) { window.__toggleTheme(); return; }
    if (e.key === "/") { e.preventDefault(); $("q").focus(); return; }
    if (e.key === "c" && page === "home" && window.__toggleCaptions) { window.__toggleCaptions(); return; }
    if (e.key === "k" && page === "home" && window.__replayHero) { scrollTo({ top: 0, behavior: scrollBehavior }); window.__replayHero(); return; }
    if (e.key === "j" || e.key === "l") {
      const list2 = sections();
      if (!list2.length) return;
      const here = list2.filter((el) => el.getBoundingClientRect().top <= 80).length - 1;
      const next = e.key === "l" ? Math.min(list2.length - 1, here + 1) : here >= 0 && list2[here].getBoundingClientRect().top < -8 ? here : Math.max(0, here - 1);
      list2[next].scrollIntoView({ behavior: scrollBehavior, block: "start" });
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

setupTheme();
buildWork();
buildTestimonials();
startClock();
setupForm();
setupHero();
setupScenes();
setupPersonal();
setupTopVideo();
setupAvailability();
setupPricing();
setupCaptions();
setupExtras();
setupChannel();
setupAd();
setupChapters();
setupShortcuts();
setupTabTitle();
