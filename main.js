// ===== MEDIA =====
const photos = [
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364091/WhatsApp_Image_2026-01-13_at_10.30.27_PM_uaqcxr.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.27_PM_1_wwugo0.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_fan2cw.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_1_e3gyaj.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_2_tgp90s.jpg"
];

const videos = [
  "https://res.cloudinary.com/dixal2c3q/video/upload/v1768364089/WhatsApp_Video_2026-01-13_at_10.30.28_PM_ohm5aj.mp4",
  "https://res.cloudinary.com/dixal2c3q/video/upload/v1768364088/WhatsApp_Video_2026-01-13_at_10.30.28_PM_1_vimrwj.mp4",
  "https://res.cloudinary.com/dixal2c3q/video/upload/v1768364088/WhatsApp_Video_2026-01-13_at_10.30.28_PM_2_ahjxav.mp4"
];

const $ = (s)=>document.querySelector(s);
const $$ = (s)=>Array.from(document.querySelectorAll(s));
const clamp = (n,a,b)=>Math.max(a,Math.min(b,n));
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function safe(fn){ try{ fn(); }catch(e){ console.error(e); } }

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
      vid.muted = true;
      vid.loop = true;
      vid.playsInline = true;
      vid.preload = "metadata";
      vid.controls = true;
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

    slides.forEach((s, idx)=> {
      const isActive = idx === best.idx;
      s.classList.toggle("is-active", isActive);
      if(isActive){ s.setAttribute("aria-current","true"); }
      else { s.removeAttribute("aria-current"); }
    });

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

window.addEventListener("DOMContentLoaded", () => safe(() => {
  // ===== SAFE reveal enabling (prevents blank page even if later code fails) =====
  if(!prefersReducedMotion){
    document.documentElement.classList.add("reveal-on");
  }
  // If anything goes wrong later, show content anyway:
  const forceShowAll = () => $$(".reveal").forEach(el => el.classList.add("show"));

  // ===== Year =====
  const yearEl = $("#year");
  if(yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ===== Header height vars =====
  const topbar = $("#topbar");
  const nav = document.querySelector("nav");
  function setHeaderVars(){
    const topbarH = topbar ? topbar.getBoundingClientRect().height : 0;
    const navH = nav ? nav.getBoundingClientRect().height : 72;
    document.documentElement.style.setProperty("--topbar-h", topbarH + "px");
    document.documentElement.style.setProperty("--nav-h", navH + "px");
  }
  setHeaderVars();
  window.addEventListener("resize", ()=> setTimeout(setHeaderVars, 60));

  // ===== Mobile menu (accessible) =====
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
    if(lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
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

  if(burger && mobilePanel){
    burger.addEventListener("click", ()=>{
      const expanded = burger.getAttribute("aria-expanded") === "true";
      expanded ? closeMenu() : openMenu();
    });
  }
  if(closeMobile) closeMobile.addEventListener("click", closeMenu);
  if(mobilePanel){
    mobilePanel.addEventListener("mousedown", (e)=>{ if(e.target === mobilePanel) closeMenu(); });
    document.addEventListener("keydown", trapFocus);
  }
  $$(".mLink").forEach(a => a.addEventListener("click", closeMenu));

  // ===== Reveal (IntersectionObserver) =====
  let observer;
  function bindReveal(){
    if(prefersReducedMotion){ forceShowAll(); return; }
    if (!("IntersectionObserver" in window)) { forceShowAll(); return; }
    if(observer) observer.disconnect();
    observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(el => { if(!el.classList.contains("show")) observer.observe(el); });
  }
  bindReveal();

  // ===== Carousels =====
  const photosCarousel = createInfiniteCarousel({ trackEl: $("#photosTrack"), items: photos, type: "photo" });
  const videosCarousel = createInfiniteCarousel({ trackEl: $("#videosTrack"), items: videos, type: "video" });

  $("#photosPrev")?.addEventListener("click", ()=> photosCarousel.scrollByOne(-1));
  $("#photosNext")?.addEventListener("click", ()=> photosCarousel.scrollByOne(1));
  $("#videosPrev")?.addEventListener("click", ()=> videosCarousel.scrollByOne(-1));
  $("#videosNext")?.addEventListener("click", ()=> videosCarousel.scrollByOne(1));

  function bindCarouselKeys(region, api){
    if(!region || !api) return;
    region.addEventListener('keydown', (e)=>{
      if(e.key === 'ArrowLeft'){ e.preventDefault(); api.scrollByOne(-1); }
      if(e.key === 'ArrowRight'){ e.preventDefault(); api.scrollByOne(1); }
    });
  }
  bindCarouselKeys(document.querySelector('#photos .carousel'), photosCarousel);
  bindCarouselKeys(document.querySelector('#videos .carousel'), videosCarousel);

  // ===== Deal widget (door) =====
  const dealPill = $("#dealPill");
  const dealPop = $("#dealPop");
  const dealPopClose = $("#dealPopClose");
  const door = $("#door");
  const doorBar = $("#doorBar");
  const dealPct = $("#dealPct");
  const doorGlow = $("#doorGlow");

  function openDeal(){
    if(!dealPop || !dealPill) return;
    dealPop.hidden = false;
    dealPop.setAttribute("aria-hidden","false");
    dealPill.setAttribute("aria-expanded","true");
    setTimeout(()=> dealPop.querySelector("a,button")?.focus?.(), 0);
  }
  function closeDeal(){
    if(!dealPop || !dealPill) return;
    dealPop.hidden = true;
    dealPop.setAttribute("aria-hidden","true");
    dealPill.setAttribute("aria-expanded","false");
    dealPill.focus?.();
  }

  dealPill?.addEventListener("click", ()=>{
    const hidden = dealPop?.hidden ?? true;
    hidden ? openDeal() : closeDeal();
  });
  dealPopClose?.addEventListener("click", closeDeal);
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && dealPop && !dealPop.hidden) closeDeal();
  });

  function getScrollProgress(){
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const scrollHeight = Math.max(1, doc.scrollHeight - window.innerHeight);
    return Math.min(1, Math.max(0, scrollTop / scrollHeight));
  }

  let ticking = false;
  function updateDoor(){
    ticking = false;
    const p = getScrollProgress();
    const pct = Math.round(p * 100);

    if(dealPct) dealPct.textContent = `${pct}%`;
    if(doorBar) doorBar.style.width = `${pct}%`;
    if(doorGlow) doorGlow.style.opacity = String(Math.min(1, p));

    // Door covers inside until it opens: translate up from 0% to -100%
    if(door) door.style.transform = `translateY(${(-p * 100).toFixed(2)}%)`;
  }
  function onScroll(){
    if(!ticking){
      requestAnimationFrame(updateDoor);
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive:true });
  updateDoor();

  // ===== Accessibility widget =====
  const a11yFab = $("#a11yFab");
  const a11yPanel = $("#a11yPanel");
  const a11yClose = $("#a11yClose");
  const a11yButtons = $$("#a11yPanel .a11y-btn");
  const A11Y_KEY = "lgds_a11y_v1";

  const state = {
    text: 0,
    contrast: false,
    grayscale: false,
    underline: false,
    focus: false,
    reduceMotion: false
  };

  function applyState(){
    const html = document.documentElement;
    html.classList.toggle("a11y-text1", state.text === 1);
    html.classList.toggle("a11y-text2", state.text === 2);
    html.classList.toggle("a11y-contrast", !!state.contrast);
    html.classList.toggle("a11y-grayscale", !!state.grayscale);
    html.classList.toggle("a11y-underline", !!state.underline);
    html.classList.toggle("a11y-focus", !!state.focus);
    html.classList.toggle("a11y-reduce-motion", !!state.reduceMotion);

    // reflect on UI
    a11yButtons.forEach(btn=>{
      const k = btn.dataset.a11y;
      const on = (
        (k === "textPlus" && state.text === 1) ||
        (k === "textPlus2" && state.text === 2) ||
        (k === "contrast" && state.contrast) ||
        (k === "grayscale" && state.grayscale) ||
        (k === "underline" && state.underline) ||
        (k === "focus" && state.focus) ||
        (k === "reduceMotion" && state.reduceMotion)
      );
      btn.classList.toggle("is-on", !!on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });

    try{ localStorage.setItem(A11Y_KEY, JSON.stringify(state)); }catch(e){}
  }

  function loadState(){
    try{
      const raw = localStorage.getItem(A11Y_KEY);
      if(!raw) return;
      const s = JSON.parse(raw);
      Object.assign(state, s || {});
    }catch(e){}
  }

  function openA11y(){
    if(!a11yPanel || !a11yFab) return;
    a11yPanel.hidden = false;
    a11yPanel.setAttribute("aria-hidden","false");
    a11yFab.setAttribute("aria-expanded","true");
    setTimeout(()=> a11yPanel.querySelector("button")?.focus?.(), 0);
  }
  function closeA11y(){
    if(!a11yPanel || !a11yFab) return;
    a11yPanel.hidden = true;
    a11yPanel.setAttribute("aria-hidden","true");
    a11yFab.setAttribute("aria-expanded","false");
    a11yFab.focus?.();
  }

  a11yFab?.addEventListener("click", ()=>{
    const hidden = a11yPanel?.hidden ?? true;
    hidden ? openA11y() : closeA11y();
  });
  a11yClose?.addEventListener("click", closeA11y);
  document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape" && a11yPanel && !a11yPanel.hidden) closeA11y();
  });

  a11yButtons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const k = btn.dataset.a11y;
      if(k === "textPlus"){ state.text = (state.text === 1 ? 0 : 1); if(state.text === 1) state.text = 1; }
      else if(k === "textPlus2"){ state.text = (state.text === 2 ? 0 : 2); }
      else if(k === "contrast"){ state.contrast = !state.contrast; }
      else if(k === "grayscale"){ state.grayscale = !state.grayscale; }
      else if(k === "underline"){ state.underline = !state.underline; }
      else if(k === "focus"){ state.focus = !state.focus; }
      else if(k === "reduceMotion"){ state.reduceMotion = !state.reduceMotion; }
      else if(k === "reset"){
        state.text = 0; state.contrast = false; state.grayscale = false; state.underline = false; state.focus = false; state.reduceMotion = false;
      }
      applyState();
    });
  });

  loadState();
  applyState();

}));