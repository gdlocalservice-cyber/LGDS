// ===== MEDIA =====
const photos = [
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364091/WhatsApp_Image_2026-01-13_at_10.30.27_PM_uaqcxr.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.27_PM_1_wwugo0.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_fan2cw.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_1_e3gyaj.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_2_tgp90s.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364086/WhatsApp_Image_2026-01-13_at_10.31.44_PM_zwedzz.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364085/WhatsApp_Image_2026-01-13_at_10.31.45_PM_ozczcn.jpg"
];

const videos = [
  "https://res.cloudinary.com/dixal2c3q/video/upload/v1768364089/WhatsApp_Video_2026-01-13_at_10.30.28_PM_ohm5aj.mp4",
  "https://res.cloudinary.com/dixal2c3q/video/upload/v1768364088/WhatsApp_Video_2026-01-13_at_10.30.28_PM_1_vimrwj.mp4"
];

const $ = (s)=>document.querySelector(s);
const $$ = (s)=>Array.from(document.querySelectorAll(s));
const clamp = (n,a,b)=>Math.max(a,Math.min(b,n));

const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function buildPoster(videoUrl){
  const s = String(videoUrl);
  if (s.includes("/video/upload/")) return s.replace("/video/upload/","/video/upload/so_0/").replace(".mp4",".jpg");
  return "";
}

function createInfiniteCarousel({ trackEl, items, type }){
  if(!trackEl) return { scrollByOne: ()=>{} };
  trackEl.innerHTML = "";

  const total = items.length;
  if(!total) return { scrollByOne: ()=>{} };

  const makeSlide = (src, realIndex) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.dataset.realIndex = String(realIndex);
    slide.setAttribute("role","group");
    slide.setAttribute("aria-roledescription","slide");
    slide.setAttribute("aria-label", `${type === "video" ? "Video" : "Photo"} ${realIndex + 1} of ${total}`);

    const badge = document.createElement("div");
    badge.className = "slide-badge";
    badge.innerHTML = type === "video"
      ? `<i class="fa-solid fa-play" aria-hidden="true"></i> Video`
      : `<i class="fa-solid fa-image" aria-hidden="true"></i> Photo`;
    slide.appendChild(badge);

    if(type === "photo"){
      const img = document.createElement("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.referrerPolicy = "no-referrer";
      img.alt = `Garage door service photo ${realIndex + 1}`;
      img.src = src;
      slide.appendChild(img);
    } else {
      const vid = document.createElement("video");
      vid.src = src;
      vid.setAttribute("title", `Garage door service video ${realIndex + 1}`);
      vid.setAttribute("aria-label", `Garage door service video ${realIndex + 1}`);
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.preload = "metadata";
      vid.controls = true;
      vid.setAttribute("playsinline", "");
      vid.setAttribute("webkit-playsinline", "");
      const poster = buildPoster(src);
      if(poster) vid.poster = poster;

      vid.addEventListener("click", ()=>{ vid.muted = !vid.muted; });
      slide.appendChild(vid);
    }

    return slide;
  };

  for(let copy=0; copy<3; copy++){
    items.forEach((src, i)=> trackEl.appendChild(makeSlide(src, i)));
  }

  let setWidth = 0;

  function setActiveByCenter(){
    const slides = Array.from(trackEl.querySelectorAll(".slide"));
    const rect = trackEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;

    let best = { idx: 0, dist: Infinity };
    slides.forEach((s, idx)=>{
      const r = s.getBoundingClientRect();
      const c = r.left + r.width/2;
      const d = Math.abs(c - centerX);
      if(d < best.dist){ best = { idx, dist: d }; }
    });

    slides.forEach((s, idx)=> s.classList.toggle("is-active", idx === best.idx));

    if(type === "video"){
      slides.forEach((s, idx)=>{
        const v = s.querySelector("video");
        if(!v) return;
        if(idx === best.idx){
          if(prefersReducedMotion) return;
          const p = v.play();
          if(p && typeof p.catch === "function") p.catch(()=>{});
        } else {
          try{ v.pause(); }catch(e){}
        }
      });
    }
  }

  function computeAndCenter(){
    setWidth = trackEl.scrollWidth / 3;
    trackEl.scrollLeft = setWidth;
    setActiveByCenter();
  }

  let raf = null;
  function onScroll(){
    if(setWidth > 0){
      if(trackEl.scrollLeft < setWidth * 0.35){
        trackEl.scrollLeft += setWidth;
      } else if(trackEl.scrollLeft > setWidth * 1.65){
        trackEl.scrollLeft -= setWidth;
      }
    }

    if(raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(setActiveByCenter);
  }

  trackEl.addEventListener("scroll", onScroll, { passive:true });

  function scrollByOne(delta){
    const slides = Array.from(trackEl.querySelectorAll(".slide"));
    const active = slides.findIndex(s => s.classList.contains("is-active"));
    const next = clamp(active + delta, 0, slides.length - 1);
    const target = slides[next];
    if(!target) return;

    const left = target.offsetLeft - (trackEl.clientWidth/2) + (target.clientWidth/2);
    trackEl.scrollTo({ left, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  requestAnimationFrame(()=> {
    computeAndCenter();
    setTimeout(computeAndCenter, 120);
  });

  window.addEventListener("resize", ()=> setTimeout(computeAndCenter, 60));

  return { scrollByOne };
}

// ===== Reward + Promo =====
const AUTO_PROMO_CODE = "LGDS10OFF";

function setPromoCode(code){
  const promo = $("#promo_code");
  if(!promo) return;
  const current = (promo.value || "").trim();
  if(current && current !== code) return; // respect user-entered code
  promo.value = code;
  promo.dispatchEvent(new Event("input", { bubbles:true }));
  promo.dispatchEvent(new Event("change", { bubbles:true }));
}

function scrollToContact(){
  const el = $("#contact");
  if(el) el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block:"start" });
  else window.location.hash = "#contact";
}

function collapseWidget(){
  const widget = document.querySelector(".garage-widget");
  const tab = $("#giftTab");
  if(widget) widget.classList.add("is-collapsed");
  if(tab) tab.setAttribute("aria-expanded","false");
  try{ localStorage.setItem("lgds_widget_collapsed","1"); }catch(e){}
}
function expandWidget(){
  const widget = document.querySelector(".garage-widget");
  const tab = $("#giftTab");
  if(widget) widget.classList.remove("is-collapsed");
  if(tab) tab.setAttribute("aria-expanded","true");
  try{ localStorage.setItem("lgds_widget_collapsed","0"); }catch(e){}
}
function toggleWidget(){
  const widget = document.querySelector(".garage-widget");
  if(!widget) return;
  widget.classList.contains("is-collapsed") ? expandWidget() : collapseWidget();
}

window.addEventListener("DOMContentLoaded", () => {
  const yearEl = $("#year");
  if(yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Reveal
  if(prefersReducedMotion){
    $$(".reveal").forEach(el => el.classList.add("show"));
  } else if ("IntersectionObserver" in window){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(el => observer.observe(el));
  } else {
    $$(".reveal").forEach(el => el.classList.add("show"));
  }

  // Carousels
  const photosCarousel = createInfiniteCarousel({ trackEl: $("#photosTrack"), items: photos, type: "photo" });
  const videosCarousel = createInfiniteCarousel({ trackEl: $("#videosTrack"), items: videos, type: "video" });

  $("#photosPrev")?.addEventListener("click", ()=> photosCarousel.scrollByOne(-1));
  $("#photosNext")?.addEventListener("click", ()=> photosCarousel.scrollByOne(1));
  $("#videosPrev")?.addEventListener("click", ()=> videosCarousel.scrollByOne(-1));
  $("#videosNext")?.addEventListener("click", ()=> videosCarousel.scrollByOne(1));

  // Mobile menu
  const mobilePanel = $("#mobilePanel");
  const burger = $("#burger");
  const closeMobile = $("#closeMobile");
  let lastFocused = null;

  function getFocusable(container){
    if(!container) return [];
    return Array.from(container.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    ));
  }
  function openMenu(){
    if(!mobilePanel || !burger) return;
    lastFocused = document.activeElement;
    mobilePanel.hidden = false;
    mobilePanel.style.display = "block";
    mobilePanel.setAttribute("aria-hidden","false");
    burger.setAttribute("aria-expanded","true");
    document.body.style.overflow = "hidden";
    const focusables = getFocusable(mobilePanel);
    (focusables[0] || mobilePanel).focus?.();
  }
  function closeMenu(){
    if(!mobilePanel || !burger) return;
    mobilePanel.style.display = "none";
    mobilePanel.hidden = true;
    mobilePanel.setAttribute("aria-hidden","true");
    burger.setAttribute("aria-expanded","false");
    document.body.style.overflow = "";
    lastFocused?.focus?.();
  }
  function trapFocus(e){
    if(!mobilePanel || mobilePanel.hidden) return;
    if(e.key === "Escape"){ e.preventDefault(); closeMenu(); return; }
    if(e.key !== "Tab") return;
    const focusables = getFocusable(mobilePanel);
    if(!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }
  burger?.addEventListener("click", ()=>{
    const expanded = burger.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });
  closeMobile?.addEventListener("click", closeMenu);
  mobilePanel?.addEventListener("mousedown", (e)=>{ if(e.target === mobilePanel) closeMenu(); });
  document.addEventListener("keydown", trapFocus);
  $$(".mLink").forEach(a => a.addEventListener("click", closeMenu));

  // Widget toggle
  const giftTab = $("#giftTab");
  giftTab?.addEventListener("click", toggleWidget);
  // Always start collapsed to avoid accidental popups
  collapseWidget();
  try{ localStorage.setItem("lgds_widget_collapsed","1"); }catch(e){}

  // Claim button: apply promo + collapse + jump to contact
  $("#claimDealBtn")?.addEventListener("click", ()=>{
    setPromoCode(AUTO_PROMO_CODE);
    collapseWidget();
    scrollToContact();
  });

  // ===== Door scroll behavior =====
  const door = $("#door");
  const doorBar = $("#doorBar");
  const doorPct = $("#doorPct");
  const doorGlow = $("#doorGlow");
  const insideLocked = $("#insideLocked");
  const insideUnlocked = $("#insideUnlocked");

  let ticking = false;
  let unlockedOnce = false;

  function getScrollProgress(){
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    return Math.min(1, Math.max(0, scrollTop / maxScroll));
  }

  function isAtBottom(){
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    return (scrollTop + window.innerHeight) >= (doc.scrollHeight - 2);
  }

  function updateDoor(){
    ticking = false;
    const p = getScrollProgress();
    const atBottom = isAtBottom();
    const pct = atBottom ? 100 : Math.round(p * 100);

    // Move door up to reveal content.
    // 0% => fully closed, 100% => fully opened (moved up out of view)
    if(door) door.style.transform = `translateY(${(-p * 110).toFixed(3)}%)`;

    if(doorPct) doorPct.textContent = `${pct}%`;
    if(doorBar) doorBar.style.width = `${pct}%`;
    if(doorGlow) doorGlow.style.opacity = String(Math.min(1, p));

    const isUnlocked = atBottom;

    if(isUnlocked){
      if(insideUnlocked){ insideUnlocked.hidden = false; }
      if(insideLocked){ insideLocked.hidden = true; }
      if(!unlockedOnce){
        unlockedOnce = true;
        // Auto-apply promo once user hits 100% (or near-bottom)
        setPromoCode(AUTO_PROMO_CODE);
        try{ localStorage.setItem("lgds_auto_promo_applied","1"); }catch(e){}
      }
    } else {
      if(insideUnlocked){ insideUnlocked.hidden = true; }
      if(insideLocked){ insideLocked.hidden = false; }
    }
  }

  function onScroll(){
    if(!ticking){
      requestAnimationFrame(updateDoor);
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive:true });
  updateDoor();
});


// ===== Accessibility Widget =====
(function(){
  const KEY = "lgds_a11y";
  const fab = document.getElementById("a11yFab");
  const panel = document.getElementById("a11yPanel");
  const closeBtn = document.getElementById("a11yClose");

  if(!fab || !panel) return;

  let state = {
    font: 0,          // 0,1,2
    contrast: false,
    gray: false,
    underline: false,
    focus: false,
    reduceMotion: false
  };

  function save(){
    try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){}
  }
  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      if(raw) state = { ...state, ...JSON.parse(raw) };
    }catch(e){}
  }

  function apply(){
    const root = document.documentElement;

    // Font scaling (safe)
    const fontScale = state.font === 0 ? 1 : (state.font === 1 ? 1.07 : 1.14);
    root.style.fontSize = (16 * fontScale) + "px";

    root.classList.toggle("a11y-contrast", !!state.contrast);
    root.classList.toggle("a11y-gray", !!state.gray);
    root.classList.toggle("a11y-underline", !!state.underline);
    root.classList.toggle("a11y-strong-focus", !!state.focus);
    root.classList.toggle("a11y-reduce-motion", !!state.reduceMotion);

    // Button toggles UI state
    const btns = panel.querySelectorAll("[data-a11y]");
    btns.forEach(b=>{
      const key = b.getAttribute("data-a11y");
      const on =
        (key==="contrast" && state.contrast) ||
        (key==="gray" && state.gray) ||
        (key==="underline" && state.underline) ||
        (key==="focus" && state.focus) ||
        (key==="reduceMotion" && state.reduceMotion);
      b.classList.toggle("is-on", on);
      if(["contrast","gray","underline","focus","reduceMotion"].includes(key)){
        b.setAttribute("aria-pressed", on ? "true" : "false");
      }
    });
  }

  let lastFocused = null;

  function open(){
    lastFocused = document.activeElement;
    panel.hidden = false;
    panel.style.display = "block";
    panel.setAttribute("aria-hidden","false");
    fab.setAttribute("aria-expanded","true");
    document.body.style.overflow = "hidden";

    // focus first button
    const first = panel.querySelector("[data-a11y]");
    first?.focus?.();
  }
  function close(){
    panel.style.display = "none";
    panel.hidden = true;
    panel.setAttribute("aria-hidden","true");
    fab.setAttribute("aria-expanded","false");
    document.body.style.overflow = "";
    if(lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function getFocusable(container){
    return Array.from(container.querySelectorAll(
      'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ));
  }

  function trapFocus(e){
    if(panel.hidden) return;
    if(e.key === "Escape"){ e.preventDefault(); close(); return; }
    if(e.key !== "Tab") return;

    const focusables = getFocusable(panel);
    if(!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if(e.shiftKey && document.activeElement === first){
      e.preventDefault(); last.focus();
    } else if(!e.shiftKey && document.activeElement === last){
      e.preventDefault(); first.focus();
    }
  }

  function toggle(key){
    switch(key){
      case "textUp":
        state.font = Math.min(2, state.font + 1);
        break;
      case "textDown":
        state.font = Math.max(0, state.font - 1);
        break;
      case "contrast":
      case "gray":
      case "underline":
      case "focus":
      case "reduceMotion":
        state[key] = !state[key];
        break;
      case "reset":
        state = { font:0, contrast:false, gray:false, underline:false, focus:false, reduceMotion:false };
        break;
      default: break;
    }
    save();
    apply();
  }

  // extra CSS toggles
  function injectA11yCss(){
    if(document.getElementById("a11yCss")) return;
    const css = document.createElement("style");
    css.id = "a11yCss";
    css.textContent = `
      html.a11y-contrast body{
        background:#000 !important;
        color:#fff !important;
      }
      html.a11y-contrast .offer-card,
      html.a11y-contrast .carousel,
      html.a11y-contrast .contact-info,
      html.a11y-contrast form,
      html.a11y-contrast .trusted-wrap,
      html.a11y-contrast nav,
      html.a11y-contrast .topbar{
        border-color: rgba(255,204,0,.85) !important;
      }
      html.a11y-gray body{ filter: grayscale(1); }
      html.a11y-underline a{ text-decoration: underline !important; text-underline-offset: 3px; }
      html.a11y-strong-focus :focus-visible{
        outline: 4px solid var(--gold) !important;
        outline-offset: 4px !important;
      }
      html.a11y-reduce-motion *{
        transition: none !important;
        animation: none !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(css);
  }

  // init
  injectA11yCss();
  load();
  apply();

  fab.addEventListener("click", ()=>{
    const expanded = fab.getAttribute("aria-expanded") === "true";
    expanded ? close() : open();
  });
  closeBtn?.addEventListener("click", close);

  panel.addEventListener("mousedown", (e)=>{
    if(e.target === panel) close();
  });

  panel.addEventListener("click", (e)=>{
    const btn = e.target.closest("[data-a11y]");
    if(!btn) return;
    const key = btn.getAttribute("data-a11y");
    toggle(key);
  });

  document.addEventListener("keydown", trapFocus);
})();
