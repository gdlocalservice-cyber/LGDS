// ===== MEDIA =====
const photos = [
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364091/WhatsApp_Image_2026-01-13_at_10.30.27_PM_uaqcxr.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.27_PM_1_wwugo0.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_fan2cw.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_1_e3gyaj.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_2_tgp90s.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364086/WhatsApp_Image_2026-01-13_at_10.31.44_PM_zwedzz.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364085/WhatsApp_Image_2026-01-13_at_10.31.45_PM_ozczcn.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364085/WhatsApp_Image_2026-01-13_at_10.31.44_PM_1_szlk4s.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364085/WhatsApp_Image_2026-01-13_at_10.31.44_PM_3_pyxgmq.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364085/WhatsApp_Image_2026-01-13_at_10.31.44_PM_2_aqzqwy.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364083/WhatsApp_Image_2026-01-13_at_10.31.45_PM_1_jpag39.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364082/WhatsApp_Image_2026-01-13_at_10.31.45_PM_4_deg7hq.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364082/WhatsApp_Image_2026-01-13_at_10.31.45_PM_3_l9vp7n.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364082/WhatsApp_Image_2026-01-13_at_10.31.45_PM_5_hdj98u.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364080/WhatsApp_Image_2026-01-13_at_10.31.45_PM_6_izmzi0.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364080/WhatsApp_Image_2026-01-13_at_10.31.45_PM_7_tenlit.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364079/WhatsApp_Image_2026-01-13_at_10.31.45_PM_9_l9ra6y.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364079/WhatsApp_Image_2026-01-13_at_10.31.45_PM_8_lc7odf.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364079/WhatsApp_Image_2026-01-13_at_10.31.45_PM_10_e2vqpr.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364079/WhatsApp_Image_2026-01-13_at_10.31.45_PM_11_erhaar.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364077/WhatsApp_Image_2026-01-13_at_10.31.45_PM_12_yjjape.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364076/WhatsApp_Image_2026-01-13_at_10.31.46_PM_ddfpzw.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364076/WhatsApp_Image_2026-01-13_at_10.31.46_PM_1_wc0chp.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364076/WhatsApp_Image_2026-01-13_at_10.31.46_PM_4_zttwgs.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364076/WhatsApp_Image_2026-01-13_at_10.31.46_PM_2_hxvn0e.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364076/WhatsApp_Image_2026-01-13_at_10.31.46_PM_3_n3utbb.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/f_auto,q_auto,w_880/v1768364075/WhatsApp_Image_2026-01-13_at_10.31.46_PM_5_btoilf.jpg"
];

const videos = [
  "https://res.cloudinary.com/dixal2c3q/video/upload/f_auto,q_auto/v1768364089/WhatsApp_Video_2026-01-13_at_10.30.28_PM_ohm5aj.mp4",
  "https://res.cloudinary.com/dixal2c3q/video/upload/f_auto,q_auto/v1768364088/WhatsApp_Video_2026-01-13_at_10.30.28_PM_1_vimrwj.mp4",
  "https://res.cloudinary.com/dixal2c3q/video/upload/f_auto,q_auto/v1768364088/WhatsApp_Video_2026-01-13_at_10.30.28_PM_2_ahjxav.mp4",
  "https://res.cloudinary.com/dixal2c3q/video/upload/f_auto,q_auto/v1768364088/WhatsApp_Video_2026-01-13_at_10.30.28_PM_3_apahtf.mp4"
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
  if(el){
    const nav = document.querySelector("nav");
    // Only account for sticky UI. Topbar is not sticky.
    // After landing on the section, nudge a bit further DOWN so the Service Areas chips
    // above are not visible (matches your desired behavior).
    const offset = (nav?.offsetHeight || 0) + 8;
    const baseY = el.getBoundingClientRect().top + window.pageYOffset - offset;
    const extraDown = Math.min(72, Math.round(window.innerHeight * 0.08));
    const y = baseY + extraDown;
    window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion ? "auto" : "smooth" });
  }
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


function handleRequestForm(){
  const form = $("#requestForm");
  if(!form) return;

  const status = $("#formStatus");
  const endpoint = (form.getAttribute("data-formspree") || "").trim();

  function setStatus(msg, ok){
    if(!status) return;
    status.textContent = msg;
    status.classList.remove("ok","err");
    status.classList.add(ok ? "ok" : "err");
  }

  form.addEventListener("submit", async (e)=>{
    // If endpoint not configured, fallback to mailto (so user never loses leads)
    if(!endpoint || endpoint.includes("REPLACE_WITH_FORMSPREE_ENDPOINT")){
      e.preventDefault();
      setStatus("Form endpoint is not configured yet. Replace data-formspree in index.html with your Formspree endpoint.", false);
      return;
    }

    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if(btn){ btn.disabled = true; btn.textContent = "Sending…"; }
    setStatus("", true);

    try{
      const fd = new FormData(form);
      // include current URL
      fd.set("url", window.location.href);

      const resp = await fetch(endpoint, {
        method: "POST",
        body: fd,
        headers: { "Accept": "application/json" }
      });

      if(resp.ok){
        window.location.href = "/thank-you.html";
      } else {
        setStatus("Something went wrong. Please call or WhatsApp us for fastest help.", false);
        if(btn){ btn.disabled = false; btn.innerHTML = "⚡ Send Request"; }
      }
    } catch(err){
      setStatus("Network error. Please call or WhatsApp us for fastest help.", false);
      if(btn){ btn.disabled = false; btn.innerHTML = "⚡ Send Request"; }
    }
  });
}


function normalizeHashLinks(){
  const isIndex = /\/index\.html?$/.test(location.pathname) || location.pathname === "/" || location.pathname === "";
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    const href = a.getAttribute("href");
    if(!href || href === "#") return;
    if(!isIndex){
      // on inner pages, send hash links back to homepage
      a.setAttribute("href", "/index.html"+href);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  handleRequestForm();
  normalizeHashLinks();

  // On the homepage, make sure clicking any #contact link scrolls to the exact same
  // spot (and hides the Service Areas chips above the form).
  const isIndex = /\/index\.html?$/.test(location.pathname) || location.pathname === "/" || location.pathname === "";
  if(isIndex){
    $$('a[href="#contact"]').forEach(a => {
      a.addEventListener("click", (e)=>{
        e.preventDefault();
        scrollToContact();
      });
    });
    // If the page loads with #contact in the URL, scroll consistently after layout.
    if(location.hash === "#contact"){
      setTimeout(scrollToContact, 50);
    }
  }
  const yearEl = $("#year");
  if(yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Deal tab attention (only until user interacts)
  const giftTab = $("#giftTab");
  try{
    const seen = localStorage.getItem("lgds_deal_seen");
    if(giftTab && !seen) giftTab.classList.add("pulse");
  }catch(e){}
  giftTab?.addEventListener("click", ()=>{ try{ localStorage.setItem("lgds_deal_seen","1"); giftTab.classList.remove("pulse"); }catch(e){} });

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
    document.body.style.overflowY = "hidden";
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
    document.body.style.overflowY = "hidden";

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


// ===== REVIEWS (Thumbtack) =====
window.LGDS_REVIEWS = [{"name": "Google Customer", "date": null, "source": "Google", "text": "Excellent service! The garage door spring was fixed quickly and professionally. Jacob was extremely helpful, friendly, and took the time to explain everything clearly. It's rare to find such honest and reliable service these days. Highly recommend this company to anyone needing garage door repairs!"}, {"name": "Google Customer", "date": null, "source": "Google", "text": "Jacob was extremely thorough. He knows everything about his craft and did a great job explaining the work that needed to be done. He worked quickly and the price is reasonable. I recommend him highly if you are in need of garage door services."}, {"name": "Google Customer", "date": null, "source": "Google", "text": "Jacob responded to my Yelp request quickly. He gave me a reasonable quote. I accepted the quote. He had all the parts and installed them right away. He checked the existing springs and found a latent failure. He installed replacement springs at my request. Very satisfied customer. Very professional vendor with helpful attitude."}, {"name": "Google Customer", "date": null, "source": "Google", "text": "Very good experience with this guy, very good person with knowledge. Work in Phoenixville PA 19460."}, {"name": "Google Customer", "date": null, "source": "Google", "text": "David was here and replaced my opener with a new one. He was nice and the price was the lowest that I got from any other company."}, {"name": "Google Customer", "date": null, "source": "Google", "text": "Had a really good experience with this company. They replaced the garage door at a property I'm flipping and did a great job. Everything came out clean and the door works perfectly. The guys were professional, easy to work with and knew what they were doing. Would definitely recommend them."}, {"name": "Google Customer", "date": null, "source": "Google", "text": "Fantastic service! They arrived quickly, figured out the issue fast, and got my garage door working again the same day. Fair pricing and very professional. I would absolutely use them again and recommend them to anyone."}, {"name": "Google Customer", "date": null, "source": "Google", "text": "Jacob did an excellent job, great communication and on time installation."}, {"name": "Helen D.", "date": "2026-01-23", "text": "Jacob was wonderful. Not only did he perform the repair the same day, he took time to explain the process and walk us through our options. He even programmed all of our garage remotes. His punctuality, workmanship, and professionalism are truly appreciated.", "source": "Thumbtack"}, {"name": "Michaela S.", "date": "2026-01-22", "text": "Had a great experience with this company. Jacob was on time, explained everything clearly, and did a solid job.", "source": "Thumbtack"}, {"name": "Kristy K.", "date": "2026-01-17", "text": "Great garage motor experience! Very professional and knowledgeable.", "source": "Thumbtack"}, {"name": "Laura A.", "date": "2026-01-15", "text": "Jacob arrived early, assessed the issues, and explained different solutions clearly. He completed the repair quickly and the garage door works even better than before. I would absolutely work with them again and highly recommend.", "source": "Thumbtack"}, {"name": "Stephanie T.", "date": "2026-01-14", "text": "Local Garage Door did a fantastic job. From the office staff—patient and helpful—to the technician—very thorough and highly professional. Truly a great experience.", "source": "Thumbtack"}, {"name": "Judith K.", "date": "2026-01-14", "text": "Jacob was here today and did a fast, high-quality job. He was clearly very professional, and I really appreciate the great service. Thank you so much.", "source": "Thumbtack"}, {"name": "Sebastian B.", "date": "2026-01-14", "text": "David did an excellent job and also helped me with a few extra things along the way. I really appreciate the service and will definitely keep them in mind for the future.", "source": "Thumbtack"}, {"name": "John U.", "date": null, "text": "Isaac and David were super quick to respond and came out right away to assess my broken garage door. After doing a cost analysis, we replaced the old tension spring system with a torsion spring—safer and quieter. It works well and I absolutely love it!", "source": "Thumbtack"}, {"name": "Max D.", "date": "2026-01-13", "text": "Jacob installed a new garage door motor/opener and replaced the entire spring system. Everything works smooth and quiet now. Professional, fast, and clean work—highly recommend!", "source": "Thumbtack"}, {"name": "Lily G.", "date": "2026-01-13", "text": "An amazing experience! David was super—on time and even called to let me know he was on his way. After months of issues, he fixed the problem in a few hours. The door works better than it ever did. Highly recommend.", "source": "Thumbtack"}, {"name": "Amir A.", "date": null, "text": "David came out and did an excellent job. Very professional and efficient. I would definitely recommend them.", "source": "Thumbtack"}, {"name": "Gregory K.", "date": "2026-01-13", "text": "Jacob was great. He came on time and explained every detail. He gave us a few options and helped us choose the best for us. Overall 10/10. Would definitely recommend.", "source": "Thumbtack"}, {"name": "Alyse J.", "date": "2026-01-12", "text": "I was convinced my garage door needed to be fully replaced after multiple technicians. Then David arrived and calmly explained the situation and gave me two honest options—replace the door or repair it. His honesty and professionalism truly helped me, and I really appreciate the service.", "source": "Thumbtack"}, {"name": "Sofia R.", "date": "2026-01-12", "text": "I had my garage door replaced and also asked them to install an opening for my cat. They made sure everything was sealed properly and finished in a really clean, high-quality way. You can tell they actually care about doing things right. Huge thanks to the team, and special thanks to Jacob.", "source": "Thumbtack"}, {"name": "Rina D.", "date": "2026-01-12", "text": "Amazing service. The technician arrived and even called another technician to help. Together they got the garage door working exactly the way it was before. They felt like magicians. A thousand thanks to you all—truly appreciated.", "source": "Thumbtack"}, {"name": "Sandeep G.", "date": null, "text": "I used Thumbtack to find a garage door service and this was one of the smoothest experiences I’ve had. Fast response, simple scheduling, and no surprises. Jacob arrived on time, explained what needed to be done, and completed the work efficiently and cleanly. Professional, honest, and reliable.", "source": "Thumbtack"}, {"name": "Sarah L.", "date": "2026-01-11", "text": "No pressure, no confusion—just smooth, professional service from start to finish. Everything was clear, well handled, and done with real attention to detail.", "source": "Thumbtack"}, {"name": "Eric S.", "date": "2026-01-11", "text": "Solid service from start to finish. Jacob was professional, on time, and knew exactly what needed to be done. Everything was handled smoothly and efficiently. Definitely a service you can rely on.", "source": "Thumbtack"}, {"name": "Isaac D.", "date": null, "text": "Not many reviews yet, but great service. Professional, honest, and the job was done right. Glad to support a local business.", "source": "Thumbtack"}];

(function initReviewsCarousel(){
  const all = Array.isArray(window.LGDS_REVIEWS) ? window.LGDS_REVIEWS : [];
  if(!all.length) return;

  function fmtDate(iso){
    if(!iso) return "Verified customer";
    try {
      const d = new Date(iso + "T00:00:00");
      return d.toLocaleDateString(undefined, { year:"numeric", month:"short", day:"numeric" });
    } catch(e) {
      return "Verified customer";
    }
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, (c)=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
  }

  function buildStarRow(){
    return '<div class="stars" aria-label="5 out of 5 stars" role="img">' +
      '<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>' +
    '</div>';
  }

  function render(container){
    const limit = Math.max(3, Math.min(20, parseInt(container.getAttribute("data-limit") || "9", 10)));
    const items = all.slice(0, limit);

    container.innerHTML = `
      <div class="rc-wrap">
        <div class="rc-track"></div>
        <div class="rc-actions" aria-hidden="false">
          <button class="rc-btn rc-prev" type="button" aria-label="Previous review"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="rc-btn rc-next" type="button" aria-label="Next review"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
      <div class="rc-dots" role="tablist" aria-label="Review pages"></div>
    `;

    const track = container.querySelector(".rc-track");
    const dots = container.querySelector(".rc-dots");
    const prevBtn = container.querySelector(".rc-prev");
    const nextBtn = container.querySelector(".rc-next");

    items.forEach((r, i)=>{
      const slide = document.createElement("div");
      slide.className = "rc-slide";
      const text = escapeHtml(r.text || "");
      const name = escapeHtml(r.name || "Customer");
      const date = fmtDate(r.date);
      slide.innerHTML = `
        <div class="rc-card">
          ${buildStarRow()}
          <p class="rc-quote">“${text}”</p>
          <div class="rc-meta">
            <div>— ${name}</div>
            <div class="rc-source">${escapeHtml(date)}${date !== "Verified customer" ? " • " : ""}${escapeHtml(r.source || "Thumbtack")}</div>
          </div>
        </div>
      `;
      track.appendChild(slide);

      const dot = document.createElement("button");
      dot.className = "rc-dot";
      dot.type = "button";
      dot.setAttribute("role","tab");
      dot.setAttribute("aria-label", `Go to review ${i+1}`);
      dot.addEventListener("click", ()=>go(i));
      dots.appendChild(dot);
    });

    let index = 0;
    let timer = null;

    function update(){
      track.style.transform = `translateX(${-index*100}%)`;
      Array.from(dots.children).forEach((d, i)=>d.setAttribute("aria-current", i===index ? "true" : "false"));
      prevBtn.disabled = index===0;
      nextBtn.disabled = index===items.length-1;
    }

    function go(i){
      index = Math.max(0, Math.min(items.length-1, i));
      update();
    }

    function next(){
      if(index < items.length-1) go(index+1);
      else go(0);
    }

    function start(){
      stop();
      timer = window.setInterval(next, 6500);
    }
    function stop(){
      if(timer) window.clearInterval(timer);
      timer = null;
    }

    prevBtn.addEventListener("click", ()=>go(index-1));
    nextBtn.addEventListener("click", ()=>go(index+1));

    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);
    container.addEventListener("focusin", stop);
    container.addEventListener("focusout", start);

    // Touch swipe (simple)
    let startX = null;
    container.addEventListener("touchstart", (e)=>{ startX = e.touches[0].clientX; }, {passive:true});
    container.addEventListener("touchend", (e)=>{
      if(startX===null) return;
      const dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if(Math.abs(dx) < 35) return;
      if(dx < 0) go(index+1);
      else go(index-1);
    });

    go(0);
    start();
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelectorAll(".reviews-carousel").forEach(render);
  });
})();

// ===== Same-Day Service Popup =====
(function(){
  const STORAGE_KEY = 'lgds_popup_seen';
  const DELAY_MS    = 800; // slight delay so page finishes loading first

  function createPopup(){
    // Don't show again within same session
    try{ if(sessionStorage.getItem(STORAGE_KEY)) return; }catch(e){}

    const overlay = document.createElement('div');
    overlay.id = 'lgds-popup-overlay';
    overlay.setAttribute('role','dialog');
    overlay.setAttribute('aria-modal','true');
    overlay.setAttribute('aria-label','Same Day Service');
    overlay.innerHTML = `
      <div id="lgds-popup">
        <button id="lgds-popup-close" aria-label="Close" type="button">&#x2715;</button>
        <div class="lgds-popup-emoji">&#x1F6A8;</div>
        <p class="lgds-popup-kicker">Same Day Garage Door Service</p>
        <h2 class="lgds-popup-title">Garage Door<br/><span>Issue?</span></h2>
        <p class="lgds-popup-sub">We\'ll take care of it today.</p>
        <div class="lgds-popup-actions">
          <a class="lgds-popup-btn lgds-popup-call" href="tel:2674386494">
            📞 Call Now – 267-438-6494
          </a>
          <a class="lgds-popup-btn lgds-popup-wa" href="https://wa.me/12674386494" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp Us
          </a>
        </div>
      </div>
    `;

    // Styles injected once
    if(!document.getElementById('lgds-popup-style')){
      const style = document.createElement('style');
      style.id = 'lgds-popup-style';
      style.textContent = `
        #lgds-popup-overlay{
          position:fixed;inset:0;z-index:99999;
          background:rgba(0,0,0,.72);
          display:flex;align-items:center;justify-content:center;
          padding:16px;
          opacity:0;transition:opacity .25s ease;
        }
        #lgds-popup-overlay.lgds-visible{ opacity:1; }
        #lgds-popup{
          background:#0a0a0a;
          border:1.5px solid rgba(255,255,255,.12);
          border-radius:16px;
          padding:36px 32px 32px;
          max-width:460px;width:100%;
          position:relative;
          text-align:center;
          box-shadow:0 24px 80px rgba(0,0,0,.7);
          transform:translateY(18px) scale(.97);
          transition:transform .28s cubic-bezier(.22,.68,0,1.2);
        }
        #lgds-popup-overlay.lgds-visible #lgds-popup{
          transform:translateY(0) scale(1);
        }
        #lgds-popup-close{
          position:absolute;top:12px;right:14px;
          background:none;border:none;cursor:pointer;
          color:rgba(255,255,255,.35);font-size:1.25rem;
          line-height:1;padding:4px 6px;border-radius:6px;
          transition:color .15s;
        }
        #lgds-popup-close:hover{ color:#fff; }
        .lgds-popup-emoji{
          font-size:2.6rem;margin-bottom:12px;line-height:1;
        }
        .lgds-popup-kicker{
          color:#ffcc00;font-size:.72rem;font-weight:700;
          text-transform:uppercase;letter-spacing:.12em;
          margin:0 0 8px;
        }
        .lgds-popup-title{
          color:#fff;font-size:1.75rem;font-weight:900;
          text-transform:uppercase;letter-spacing:.04em;
          line-height:1.15;margin:0 0 10px;
        }
        .lgds-popup-title span{ color:#ffcc00; }
        .lgds-popup-sub{
          color:rgba(255,255,255,.5);font-size:.9rem;
          font-weight:600;line-height:1.5;margin:0 0 26px;
        }
        .lgds-popup-actions{
          display:flex;flex-direction:column;gap:12px;
        }
        .lgds-popup-btn{
          display:flex;align-items:center;justify-content:center;gap:9px;
          padding:15px 20px;border-radius:10px;
          font-size:1rem;font-weight:900;letter-spacing:.03em;
          text-decoration:none;transition:transform .15s,box-shadow .15s;
          cursor:pointer;
        }
        .lgds-popup-btn:hover{ transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.4); }
        .lgds-popup-call{
          background:#ffcc00;color:#000;
        }
        .lgds-popup-wa{
          background:#25D366;color:#fff;
        }
        @media(min-width:560px){
          #lgds-popup{ padding:44px 40px 40px; }
          .lgds-popup-title{ font-size:2.2rem; }
          .lgds-popup-emoji{ font-size:3.2rem; }
        }
        @media(max-width:360px){
          #lgds-popup{ padding:28px 18px 22px; }
          .lgds-popup-title{ font-size:1.4rem; }
        }
      `;
      document.head.appendChild(style);
    }

    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(()=>{
      requestAnimationFrame(()=>{ overlay.classList.add('lgds-visible'); });
    });

    // Close handlers
    const close = ()=>{
      overlay.classList.remove('lgds-visible');
      setTimeout(()=>{ overlay.remove(); }, 280);
      try{ sessionStorage.setItem(STORAGE_KEY,'1'); }catch(e){}
    };

    document.getElementById('lgds-popup-close').addEventListener('click', close);
    overlay.addEventListener('click', (e)=>{ if(e.target === overlay) close(); });
    document.addEventListener('keydown', function esc(e){
      if(e.key==='Escape'){ close(); document.removeEventListener('keydown',esc); }
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=> setTimeout(createPopup, DELAY_MS));
  } else {
    setTimeout(createPopup, DELAY_MS);
  }
})();
