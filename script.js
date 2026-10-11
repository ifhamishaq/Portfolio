/* ------------------------------------------------------------------
   EDIT THESE
   ------------------------------------------------------------------ */

// One line per thumbnail. Put the 1280x720 JPG in thumbs/ and match the file name.
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

// true: missing images show a labelled empty frame for everyone (use while setting up).
// false: missing images are hidden on the live site. Empty frames still show on
// localhost, file:// and any URL ending in ?edit.
const SHOW_PLACEHOLDERS = true;

// Zack's video lives at testimonial/zack.mp4. The section stays hidden until that file exists.
// Leave quote empty ("") to show the video without a quote.
const TESTIMONIAL = {
  name: "Zack",
  role: "Evy Media",
  quote: "",
};

/* ------------------------------------------------------------------
   Nothing below needs editing
   ------------------------------------------------------------------ */

const $ = (id) => document.getElementById(id);

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
const slider = $("size");
const sizeLabel = $("size-label");
const viewer = $("viewer");
const viewable = []; // works whose image loaded, in order

function sizeName(w, max) {
  if (w >= max * 0.97) return "Full size";
  if (w >= 300) return "Home feed";
  if (w >= 150) return "Suggested video";
  return "Phone feed";
}

function applySize() {
  const w = Number(slider.value);
  const text = `${sizeName(w, Number(slider.max))}, ${w} px wide`;
  grid.style.setProperty("--w", w + "px");
  grid.classList.toggle("is-small", w < 200);
  sizeLabel.textContent = text;
  slider.setAttribute("aria-valuetext", text);
}

function fitSlider(keepRatio) {
  const room = grid.parentElement.clientWidth;
  const oldMax = Number(slider.max);
  const ratio = keepRatio ? (Number(slider.value) - Number(slider.min)) / (oldMax - Number(slider.min)) : null;
  const max = Math.max(160, Math.min(720, room));
  slider.min = String(Math.min(120, max - 40));
  slider.max = String(max);
  slider.value = String(
    ratio === null
      ? Math.min(360, max) >= max - 40 ? max : Math.min(360, max)
      : Math.round(Number(slider.min) + ratio * (max - Number(slider.min)))
  );
  applySize();
}

function makeCard(work, index) {
  const li = document.createElement("li");
  li.className = "card";
  const cap = document.createElement("span");
  cap.className = "cap";
  cap.innerHTML = "<b></b><span></span>";
  cap.firstChild.textContent = work.client;
  cap.lastChild.textContent = work.title;

  if (work.ok) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card-btn";
    btn.setAttribute("aria-label", `Enlarge: ${work.client}, ${work.title}`);
    const img = document.createElement("img");
    img.className = "thumb";
    img.src = work.file;
    img.alt = `${work.client} thumbnail: ${work.title}`;
    img.width = 1280;
    img.height = 720;
    img.loading = "lazy";
    img.decoding = "async";
    btn.append(img, cap);
    btn.addEventListener("click", () => openViewer(viewable.indexOf(work)));
    li.append(btn);
  } else {
    const frame = document.createElement("div");
    frame.className = "frame";
    frame.innerHTML = "<b></b><span>Empty slot. Add a 1280x720 JPG.</span>";
    frame.firstChild.textContent = work.file;
    li.append(frame, cap);
  }
  return li;
}

async function buildWork() {
  const found = await Promise.all(WORKS.map((w) => probe(w.file)));
  const items = WORKS.map((w, i) => ({ ...w, ok: found[i] })).filter((w) => w.ok || showEmpty);
  items.forEach((w) => w.ok && viewable.push(w));

  if (!items.length) {
    $("size-control").hidden = true;
    $("work-note").hidden = true;
    grid.hidden = true;
    $("work-empty").hidden = false;
    return;
  }
  items.forEach((w, i) => grid.append(makeCard(w, i)));
}

slider.addEventListener("input", applySize);
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => fitSlider(true), 100);
});

/* Enlarge dialog ----------------------------------------------------- */

let current = 0;

function showAt(i) {
  current = (i + viewable.length) % viewable.length;
  const w = viewable[current];
  $("viewer-img").src = w.file;
  $("viewer-img").alt = `${w.client} thumbnail: ${w.title}`;
  $("viewer-cap").textContent = `${w.client}: ${w.title}`;
}

function openViewer(i) {
  if (i < 0) return;
  showAt(i);
  const multi = viewable.length > 1;
  $("viewer-prev").hidden = !multi;
  $("viewer-next").hidden = !multi;
  viewer.showModal();
}

$("viewer-prev").addEventListener("click", () => showAt(current - 1));
$("viewer-next").addEventListener("click", () => showAt(current + 1));
viewer.addEventListener("click", (e) => {
  if (e.target === viewer) viewer.close(); // click on the backdrop
});
viewer.addEventListener("keydown", (e) => {
  if (viewable.length < 2) return;
  if (e.key === "ArrowLeft") showAt(current - 1);
  if (e.key === "ArrowRight") showAt(current + 1);
});

/* Testimonial -------------------------------------------------------- */

function buildTestimonial() {
  const video = $("zack-video");
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

fitSlider(false);
buildWork();
buildTestimonial();
startClock();
