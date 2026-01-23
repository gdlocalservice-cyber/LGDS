// ===== MEDIA =====
const photos = [
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364091/WhatsApp_Image_2026-01-13_at_10.30.27_PM_uaqcxr.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.27_PM_1_wwugo0.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_fan2cw.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_1_e3gyaj.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364089/WhatsApp_Image_2026-01-13_at_10.30.28_PM_2_tgp90s.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364086/WhatsApp_Image_2026-01-13_at_10.31.44_PM_zwedzz.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364085/WhatsApp_Image_2026-01-13_at_10.31.45_PM_ozczcn.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364085/WhatsApp_Image_2026-01-13_at_10.31.44_PM_1_szlk4s.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364085/WhatsApp_Image_2026-01-13_at_10.31.44_PM_3_pyxgmq.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364085/WhatsApp_Image_2026-01-13_at_10.31.44_PM_2_aqzqwy.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364083/WhatsApp_Image_2026-01-13_at_10.31.45_PM_1_jpag39.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364082/WhatsApp_Image_2026-01-13_at_10.31.45_PM_4_deg7hq.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364082/WhatsApp_Image_2026-01-13_at_10.31.45_PM_3_l9vp7n.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364082/WhatsApp_Image_2026-01-13_at_10.31.45_PM_5_hdj98u.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364080/WhatsApp_Image_2026-01-13_at_10.31.45_PM_6_izmzi0.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364080/WhatsApp_Image_2026-01-13_at_10.31.45_PM_7_tenlit.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364079/WhatsApp_Image_2026-01-13_at_10.31.45_PM_9_l9ra6y.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364079/WhatsApp_Image_2026-01-13_at_10.31.45_PM_8_lc7odf.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364079/WhatsApp_Image_2026-01-13_at_10.31.45_PM_10_e2vqpr.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364079/WhatsApp_Image_2026-01-13_at_10.31.45_PM_11_erhaar.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364077/WhatsApp_Image_2026-01-13_at_10.31.45_PM_12_yjjape.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364076/WhatsApp_Image_2026-01-13_at_10.31.46_PM_ddfpzw.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364076/WhatsApp_Image_2026-01-13_at_10.31.46_PM_1_wc0chp.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364076/WhatsApp_Image_2026-01-13_at_10.31.46_PM_4_zttwgs.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364076/WhatsApp_Image_2026-01-13_at_10.31.46_PM_2_hxvn0e.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364076/WhatsApp_Image_2026-01-13_at_10.31.46_PM_3_n3utbb.jpg",
  "https://res.cloudinary.com/dixal2c3q/image/upload/v1768364075/WhatsApp_Image_2026-01-13_at_10.31.46_PM_5_btoilf.jpg"
];

const videos = [
  "https://res.cloudinary.com/dixal2c3q/video/upload/v1768364089/WhatsApp_Video_2026-01-13_at_10.30.28_PM_ohm5aj.mp4",
  "https://res.cloudinary.com/dixal2c3q/video/upload/v1768364088/WhatsApp_Video_2026-01-13_at_10.30.28_PM_1_vimrwj.mp4",
  "https://res.cloudinary.com/dixal2c3q/video/upload/v1768364088/WhatsApp_Video_2026-01-13_at_10.30.28_PM_2_ahjxav.mp4",
  "https://res.cloudinary.com/dixal2c3q/video/upload/v1768364088/WhatsApp_Video_2026-01-13_at_10.30.28_PM_3_apahtf.mp4"
];

const $ = (s)=>document.querySelector(s);
const $$ = (s)=>Array.from(document.querySelectorAll(s));
const clamp = (n,a,b)=>Math.max(a,Math.min(b,n));

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

    const badge = document.createElement("div");
    badge.className = "slide-badge";
    badge.innerHTML = type === "video"
      ? `<i class="fa-solid fa-play"></i> Video`
      : `<i class="fa-solid fa-image"></i> Photo`;
    slide.appendChild(badge);

    if(type === "photo"){
      const img = document.createElement("img");
      img.loading = "lazy";
      img.decoding = "async";
      img.referrerPolicy = "no-referrer";
      img.alt = "Work photo";
      img.src = src;
      slide.appendChild(img);
    } else {
      const vid = document.createElement("video");
      vid.src = src;
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

  // 3 copies for infinite feel
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
    trackEl.scrollTo({ left, behavior: "smooth" });
  }

  requestAnimationFrame(()=> {
    computeAndCenter();
    setTimeout(computeAndCenter, 120);
  });

  window.addEventListener("resize", ()=> setTimeout(computeAndCenter, 60));

  return { scrollByOne };
}

window.addEventListener("DOMContentLoaded", () => {
  const topbar = $("#topbar");
  const nav = document.querySelector("nav");
  const floatingActions = $("#floatingActions");

  // ===== Accessibility widget =====
  const a11yFab = $("#a11yFab");
  const a11yBackdrop = $("#a11yBackdrop");
  const a11yClose = $("#a11yClose");
  const a11yButtons = $$(".a11y-btn");

  const A11Y_KEY = "lgds_a11y";
  let a11yState = {
    text: 0,        // 0 | 1 | 2
    contrast: false,
    gray: false,
    links: false,
    focus: false,
    reduce: false
  };

  function saveA11y(){
    try{ localStorage.setItem(A11Y_KEY, JSON.stringify(a11yState)); }catch(e){}
  }
  function loadA11y(){
    try{
      const raw = localStorage.getItem(A11Y_KEY);
      if(!raw) return;
      const obj = JSON.parse(raw);
      if(obj && typeof obj === "object") a11yState = { ...a11yState, ...obj };
    }catch(e){}
  }

  function applyA11y(){
    const html = document.documentElement;
    html.classList.toggle("a11y-text-1", a11yState.text === 1);
    html.classList.toggle("a11y-text-2", a11yState.text === 2);
    html.classList.toggle("a11y-contrast", !!a11yState.contrast);
    html.classList.toggle("a11y-gray", !!a11yState.gray);
    html.classList.toggle("a11y-links", !!a11yState.links);
    html.classList.toggle("a11y-focus", !!a11yState.focus);
    html.classList.toggle("a11y-reduce", !!a11yState.reduce);

    a11yButtons.forEach(btn=>{
      const k = btn.getAttribute("data-a11y");
      if(!k) return;
      let on = false;
      if(k === "text1") on = a11yState.text === 1;
      if(k === "text2") on = a11yState.text === 2;
      if(k === "contrast") on = !!a11yState.contrast;
      if(k === "gray") on = !!a11yState.gray;
      if(k === "links") on = !!a11yState.links;
      if(k === "focus") on = !!a11yState.focus;
      if(k === "reduce") on = !!a11yState.reduce;
      btn.classList.toggle("is-on", on);
    });
  }

  function openA11y(){
    if(!a11yBackdrop || !a11yFab) return;
    a11yBackdrop.hidden = false;
    a11yBackdrop.setAttribute("aria-hidden","false");
    a11yFab.setAttribute("aria-expanded","true");
    document.body.style.overflow = "hidden";
    const first = a11yBackdrop.querySelector("button");
    first && first.focus();
  }
  function closeA11y(){
    if(!a11yBackdrop || !a11yFab) return;
    a11yBackdrop.hidden = true;
    a11yBackdrop.setAttribute("aria-hidden","true");
    a11yFab.setAttribute("aria-expanded","false");
    document.body.style.overflow = "";
    a11yFab.focus();
  }

  function a11yTrap(e){
    if(!a11yBackdrop || a11yBackdrop.hidden) return;
    if(e.key === "Escape"){ e.preventDefault(); closeA11y(); return; }
    if(e.key !== "Tab") return;

    const focusables = Array.from(a11yBackdrop.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'))
      .filter(el => !el.hasAttribute("disabled"));
    if(!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  }

  loadA11y();
  applyA11y();

  if(a11yFab) a11yFab.addEventListener("click", ()=>{
    const expanded = a11yFab.getAttribute("aria-expanded") === "true";
    expanded ? closeA11y() : openA11y();
  });
  if(a11yClose) a11yClose.addEventListener("click", closeA11y);
  if(a11yBackdrop){
    a11yBackdrop.addEventListener("mousedown", (e)=>{ if(e.target === a11yBackdrop) closeA11y(); });
  }
  a11yButtons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const k = btn.getAttribute("data-a11y");
      if(!k) return;

      if(k === "reset"){
        a11yState = { text:0, contrast:false, gray:false, links:false, focus:false, reduce:false };
      } else if(k === "text1"){
        a11yState.text = (a11yState.text === 1) ? 0 : 1;
      } else if(k === "text2"){
        a11yState.text = (a11yState.text === 2) ? 0 : 2;
      } else {
        a11yState[k] = !a11yState[k];
      }

      // enforce mutual exclusivity for text sizes
      if(k === "text1" && a11yState.text === 1) {}
      if(k === "text2" && a11yState.text === 2) {}
      if(a11yState.text === 1 && k === "text2") a11yState.text = 2;
      if(a11yState.text === 2 && k === "text1") a11yState.text = 1;

      saveA11y();
      applyA11y();
    });
  });

  document.addEventListener("keydown", a11yTrap);

  function setHeaderVars(){
    const topbarH = topbar ? topbar.getBoundingClientRect().height : 0;
    const navH = nav ? nav.getBoundingClientRect().height : 72;
    document.documentElement.style.setProperty("--topbar-h", topbarH + "px");
    document.documentElement.style.setProperty("--nav-h", navH + "px");

    const fabH = (floatingActions && getComputedStyle(floatingActions).display !== "none")
      ? floatingActions.getBoundingClientRect().height
      : 0;
    document.documentElement.style.setProperty("--fab-h", fabH + "px");
  }
  setHeaderVars();

  // ===== Mobile menu =====
  const mobilePanel = $("#mobilePanel");
  const burger = $("#burger");
  const closeMobile = $("#closeMobile");

  if(burger && mobilePanel){
    burger.addEventListener("click", ()=>{
      mobilePanel.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  }
  if(closeMobile && mobilePanel){
    closeMobile.addEventListener("click", ()=>{
      mobilePanel.style.display = "none";
      document.body.style.overflow = "";
    });
  }
  $$(".mLink").forEach(a => a.addEventListener("click", ()=>{
    if(mobilePanel) mobilePanel.style.display = "none";
    document.body.style.overflow = "";
  }));

  // ===== Reveal =====
  let observer;
  function bindReveal(){
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(el => el.classList.add("show"));
      return;
    }
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
  const photosCarousel = createInfiniteCarousel({
    trackEl: $("#photosTrack"),
    items: photos,
    type: "photo"
  });
  const videosCarousel = createInfiniteCarousel({
    trackEl: $("#videosTrack"),
    items: videos,
    type: "video"
  });

  const photosPrev = $("#photosPrev");
  const photosNext = $("#photosNext");
  const videosPrev = $("#videosPrev");
  const videosNext = $("#videosNext");

  if(photosPrev) photosPrev.addEventListener("click", ()=> photosCarousel.scrollByOne(-1));
  if(photosNext) photosNext.addEventListener("click", ()=> photosCarousel.scrollByOne(1));
  if(videosPrev) videosPrev.addEventListener("click", ()=> videosCarousel.scrollByOne(-1));
  if(videosNext) videosNext.addEventListener("click", ()=> videosCarousel.scrollByOne(1));

  // ===== Reward popup =====
  const rewardBackdrop = $("#rewardBackdrop");
  const rewardClose = $("#rewardClose");
  const copyCoupon = $("#copyCoupon");
  const couponCode = $("#couponCode");

  const dealToast = $("#dealToast");
  const isMobile = window.matchMedia && window.matchMedia("(max-width: 520px)").matches;
  let toastShown = false;

  function showDealToast(){
    if(!dealToast || toastShown) return;
    dealToast.hidden = false;
    toastShown = true;
    // auto-hide after a bit if user ignores it
    setTimeout(()=>{ if(dealToast && !dealToast.hidden) dealToast.hidden = true; }, 9000);
  }

  function openReward(){
    if(!rewardBackdrop) return;
    rewardBackdrop.style.display = "flex";
    rewardBackdrop.setAttribute("aria-hidden","false");
    document.body.style.overflow = "hidden";
    try { localStorage.setItem("lgds_reward_claimed","1"); } catch(e){}
  }
  function closeReward(){
    if(!rewardBackdrop) return;
    rewardBackdrop.style.display = "none";
    rewardBackdrop.setAttribute("aria-hidden","true");
    document.body.style.overflow = "";
  }

  if(rewardClose) rewardClose.addEventListener("click", closeReward);
  if(rewardBackdrop) rewardBackdrop.addEventListener("click", (e)=>{ if(e.target === rewardBackdrop) closeReward(); });

  if(dealToast){
    dealToast.addEventListener("click", ()=>{
      dealToast.hidden = true;
      openReward();
    });
  }

  if(copyCoupon && couponCode){
    copyCoupon.addEventListener("click", async ()=>{
      const code = couponCode.textContent.trim();
      try{
        await navigator.clipboard.writeText(code);
        copyCoupon.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
        setTimeout(()=> copyCoupon.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Code`, 1400);
      }catch(e){
        const ta = document.createElement("textarea");
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        copyCoupon.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
        setTimeout(()=> copyCoupon.innerHTML = `<i class="fa-solid fa-copy"></i> Copy Code`, 1400);
      }
    });
  }

  // ===== Garage door scroll widget =====
  const door = $("#door");
  const doorBar = $("#doorBar");
  const doorPct = $("#doorPct");
  const doorGlow = $("#doorGlow");

  const garageWidget = document.querySelector(".garage-widget");
  const garageTab = $("#garageTab");
  const garageFrame = $("#garageFrame");

  function setGarageOpen(open){
    if(!garageWidget || !garageTab || !garageFrame) return;
    garageWidget.classList.toggle("is-open", open);
    garageTab.setAttribute("aria-expanded", open ? "true" : "false");
    garageFrame.setAttribute("aria-hidden", open ? "false" : "true");
  }

  if(garageTab){
    garageTab.addEventListener("click", ()=>{
      const open = garageTab.getAttribute("aria-expanded") === "true";
      setGarageOpen(!open);
    });
  }

  function reducedMotionOn(){
    const m = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    return (m && m.matches) || document.documentElement.classList.contains("a11y-reduce");
  }

  let ticking = false;

  function getScrollProgress(){
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const scrollHeight = Math.max(1, doc.scrollHeight - window.innerHeight);
    return Math.min(1, Math.max(0, scrollTop / scrollHeight));
  }

  function updateDoor(){
    ticking = false;
    const p = getScrollProgress();

    if(door) door.style.transform = `translateY(${(-p * 100).toFixed(3)}%)`;

    const pct = Math.round(p * 100);
    if(doorPct) doorPct.textContent = `${pct}%`;
    if(doorBar) doorBar.style.width = `${pct}%`;
    if(doorGlow) doorGlow.style.opacity = reducedMotionOn() ? "0" : String(Math.min(1, p));

    const atBottom = p >= 0.985;
    let claimed = false;
    try { claimed = localStorage.getItem("lgds_reward_claimed") === "1"; } catch(e){}
    if (atBottom && !claimed){
      if(isMobile){
        showDealToast();
      }else{
        openReward();
      }
    }}

  function onScroll(){
    if(!ticking){
      requestAnimationFrame(updateDoor);
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive:true });
  window.addEventListener("resize", ()=>{
    setHeaderVars();
    onScroll();
  });

  setTimeout(()=>{ setHeaderVars(); updateDoor(); }, 50);
  updateDoor();
});
