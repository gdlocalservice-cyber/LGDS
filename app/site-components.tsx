"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { brands, commonFaqs, locations, PHONE_DISPLAY, PHONE_LINK, services, WHATSAPP } from "./site-data";

export type IconName = "door" | "spring" | "track" | "opener" | "sound" | "sparkle" | "phone" | "shield" | "check" | "calendar" | "wrench" | "arrow" | "location" | "quote" | "clock" | "menu";

export function Icon({ name, size = 26 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  const paths: Record<IconName, ReactNode> = {
    door: <><path d="M5.2 17.8V7.7h13.6v10.1M4.2 20h15.6"/><path d="M4.4 5.1h15.2v2.6H4.4zM7.2 10h9.6M7.2 13h9.6M7.2 16h9.6"/><path d="M2.4 20.1 5 15.7l2.6 4.4H2.4Z"/></>,
    spring: <><path d="M2 12h2m16 0h2"/><path d="M4 12c0-4.4 1.8-4.4 1.8 0s1.8 4.4 1.8 0 1.8-4.4 1.8 0 1.8 4.4 1.8 0 1.8-4.4 1.8 0 1.8 4.4 1.8 0 1.8-4.4 1.8 0 1.8 4.4 1.8 0 1.8-4.4 1.8 0"/></>,
    track: <><path d="M4.5 20V6.5h15V20M6.8 9.2h10.4M6.8 12.7h10.4M6.8 16.2h10.4M3.5 20.2h17"/><path d="M3.2 4h17.6v2.5H3.2z"/></>,
    opener: <><rect x="9.2" y="7" width="9.8" height="8.5" rx="1.2"/><path d="M12 15.5v4m-3 0h6M19 10.1h2.8M4 9.2h5.2M3 6.2v6h4.8v-6H3Z"/></>,
    sound: <><path d="M6.2 15H2.7V9h3.5l4.4-3.3v12.6L6.2 15Z"/><path d="M14 9.2c1.4 1.6 1.4 4 0 5.6M17 6.8c3 2.9 3 7.5 0 10.4"/></>,
    sparkle: <><path d="M4.5 20V8.2h13.8V20M6.7 11h9.4M6.7 14.3h9.4M6.7 17.6h9.4M3.5 20.2h15.8"/><path d="M20.2 3v4.2M18.1 5.1h4.2M5.5 2.8v3M4 4.3h3"/></>,
    phone: <path d="M7.2 3.5 9.5 7 7.8 9c1.2 2.8 3.4 5 6.2 6.2l2-1.7 3.5 2.3-.7 3.1c-.2.8-.9 1.3-1.7 1.3C10 20.2 3.8 14 3.8 6.9c0-.8.5-1.5 1.3-1.7l2.1-.5Z"/>,
    shield: <><path d="M12 3 5 6v5c0 4.6 2.7 8.2 7 10 4.3-1.8 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18m-14 4h3m2 0h5m-10 3h5"/></>,
    wrench: <path d="M14.5 6.5a4.2 4.2 0 0 0-5.2 5.2L3.5 17.5a2.1 2.1 0 0 0 3 3l5.8-5.8a4.2 4.2 0 0 0 5.2-5.2l-2.7 2.7-3-3 2.7-2.7Z"/>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    quote: <path d="M5 17h4l2-5V6H5v6h3m6 5h4l2-5V6h-6v6h3"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

export function AnalyticsManager() {
  useEffect(() => {
    if (window.location.hostname !== "www.localgaragedoorsvc.com") return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag(...args: unknown[]) { window.dataLayer?.push(args); };
    window.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", wait_for_update: 500 });
    const consent = window.localStorage.getItem("lgds-cookie-consent");
    if (consent === "granted") {
      window.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "granted", ad_user_data: "granted", ad_personalization: "granted" });
      loadAnalytics();
    }
    const listener = () => loadAnalytics();
    window.addEventListener("lgds-consent-granted", listener);
    return () => window.removeEventListener("lgds-consent-granted", listener);
  }, []);
  return null;
}

function loadAnalytics() {
  if (document.getElementById("lgds-gtag")) return;
  const script = document.createElement("script");
  script.id = "lgds-gtag";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-TVGZZ0WFTH";
  document.head.appendChild(script);
  window.gtag?.("js", new Date());
  window.gtag?.("config", "G-TVGZZ0WFTH");
  window.gtag?.("config", "AW-17878825273");
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(!window.localStorage.getItem("lgds-cookie-consent")), 0);
    return () => window.clearTimeout(timer);
  }, []);
  function choose(value: "granted" | "denied") {
    window.localStorage.setItem("lgds-cookie-consent", value);
    window.gtag?.("consent", "update", { analytics_storage: value, ad_storage: value, ad_user_data: value, ad_personalization: value });
    if (value === "granted") window.dispatchEvent(new Event("lgds-consent-granted"));
    setVisible(false);
  }
  if (!visible) return null;
  return <aside className="cookie-banner" aria-label="Cookie preferences" aria-live="polite">
    <p>We use optional analytics and advertising cookies to understand how the site is used. <a href="/privacy">Privacy details</a></p>
    <div><button type="button" className="cookie-decline" onClick={() => choose("denied")}>Decline</button><button type="button" className="cookie-accept" onClick={() => choose("granted")}>Accept</button></div>
  </aside>;
}

const paLocations = locations.filter((location) => location.state === "PA" && location.slug !== "pennsylvania");
const njLocations = locations.filter((location) => location.state === "NJ" && location.slug !== "new-jersey");
const deLocations = locations.filter((location) => location.state === "DE" && location.slug !== "delaware");

export function Header() {
  return <header className="site-header">
    <a className="brand" href="/" aria-label="Local Garage Door Service home"><img src="/assets/logo-nav.webp" width="66" height="66" alt="Local Garage Door Service" /><span className="brand-wordmark"><strong>Local Garage Door Service</strong><span className="brand-initials"><i aria-hidden="true"/><small>LGDS</small></span></span></a>
    <nav className="desktop-nav" aria-label="Primary navigation">
      <a href="/">Home</a>
      <div className="nav-group mega-group"><a href="/services">Services <span>⌄</span></a><div className="nav-dropdown mega-menu service-mega">
        <div><strong>Priority repairs</strong>{services.filter((s) => s.priority === "High").map((s) => <a key={s.slug} href={`/services/${s.slug}`}>{s.navTitle}</a>)}</div>
        <div><strong>Doors &amp; hardware</strong>{services.filter((s) => s.priority === "Medium").map((s) => <a key={s.slug} href={`/services/${s.slug}`}>{s.navTitle}</a>)}<a href="/doors/residential">Residential Doors</a></div>
        <div><strong>Care &amp; commercial</strong>{services.filter((s) => s.priority === "Low").map((s) => <a key={s.slug} href={`/services/${s.slug}`}>{s.navTitle}</a>)}</div>
      </div></div>
      <div className="nav-group mega-group"><a href="/locations">Areas <span>⌄</span></a><div className="nav-dropdown mega-menu area-mega">
        <div><a className="mega-state" href="/locations/pennsylvania">Pennsylvania</a>{paLocations.map((l) => <a key={l.slug} href={`/locations/${l.slug}`}>{l.name}</a>)}</div>
        <div><a className="mega-state" href="/locations/new-jersey">New Jersey</a>{njLocations.map((l) => <a key={l.slug} href={`/locations/${l.slug}`}>{l.name}</a>)}</div>
        <div><a className="mega-state" href="/locations/delaware">Delaware</a>{deLocations.map((l) => <a key={l.slug} href={`/locations/${l.slug}`}>{l.name}</a>)}</div>
        <a className="area-menu-request" href="/#service-request-form" onClick={() => track("request_click", { placement: "area_menu_unlisted_city" })}><span><strong>Don’t see your city?</strong><small>We serve many surrounding communities.</small></span><b>Request Service <Icon name="arrow" size={18}/></b></a>
      </div></div>
      <a href="/doors/residential">Residential</a><a href="/doors/commercial">Commercial</a><a href="/#service-request">Request</a><a href="/faq">FAQ</a><a href="/blog">Blog</a>
    </nav>
    <div className="header-actions"><a className="header-phone" href={PHONE_LINK} onClick={() => track("phone_click", { placement: "header" })}><Icon name="phone" size={20}/>{PHONE_DISPLAY}</a><a className="button button-gold header-request" href="/#service-request" onClick={() => track("request_click", { placement: "header" })}>Request Service</a></div>
    <details className="mobile-nav"><summary aria-label="Open navigation"><Icon name="menu" size={24}/></summary><div>
      <a href="/">Home</a><a href="/services">Services</a><a href="/locations">Areas &amp; Cities</a><a className="mobile-area-request" href="/#service-request-form">City not listed? Request Service</a><a href="/doors/residential">Residential</a><a href="/doors/commercial">Commercial</a><a href="/#service-request-form">Request Service</a><a href="/reviews">Reviews</a><a href="/faq">FAQ</a><a href="/blog">Blog</a>
    </div></details>
  </header>;
}

export function Footer() {
  return <footer className="brand-footer">
    <section className="trusted-brands" aria-labelledby="brands-heading"><h2 id="brands-heading"><Icon name="shield" size={21}/> Trusted Brands We Service</h2><div className="brand-logo-grid">{brands.map((brand) => <div className="brand-logo-card" key={brand.name}><img src={brand.src} alt={brand.name} loading="lazy" decoding="async" width="180" height="78" /></div>)}</div><p>Brand names and logos displayed are trademarks of their respective owners. Local Garage Door Service is an independent service provider and is not affiliated with, endorsed by or sponsored by these manufacturers.</p></section>
    <div className="footer-info-grid"><div><img className="footer-logo" src="/assets/logo-nav.webp" alt="Local Garage Door Service" width="82" height="82"/><p>Garage door repair and installation across Pennsylvania, New Jersey and Delaware.</p></div><div><strong>Service</strong><a href="/services/garage-door-repair">Garage Door Repair</a><a href="/services/broken-spring-replacement">Broken Springs</a><a href="/services/garage-door-opener-repair">Opener Repair</a><a href="/services/new-garage-door-installation">New Doors</a></div><div><strong>Company</strong><a href="/reviews">Reviews</a><a href="/locations">Service Areas</a><a href="/faq">FAQ</a><a href="/blog">Guides</a></div><div><strong>Hours &amp; contact</strong><span>Sun–Thu: 7 AM–10 PM</span><span>Friday: 7 AM–1 PM</span><span>Saturday: Closed</span><a href={PHONE_LINK}>{PHONE_DISPLAY}</a></div></div>
    <div className="footer-social" aria-label="Social and review profiles"><a className="facebook" href="https://www.facebook.com/profile.php?id=61576443591080" target="_blank" rel="noreferrer" aria-label="Facebook"><span aria-hidden="true">f</span></a><a className="instagram" href="https://www.instagram.com/local_garage_door_service/" target="_blank" rel="noreferrer" aria-label="Instagram"><span aria-hidden="true">◎</span></a><a className="tiktok" href="https://www.tiktok.com/@localgaragedoorservice" target="_blank" rel="noreferrer" aria-label="TikTok"><span aria-hidden="true">♪</span></a><a className="youtube" href="https://www.youtube.com/@LocalGarageDoorService" target="_blank" rel="noreferrer" aria-label="YouTube"><span aria-hidden="true">▶</span></a><a className="google-social" href="https://share.google/ArfweksEz68jrQfo9" target="_blank" rel="noreferrer" aria-label="Google"><span aria-hidden="true">G</span></a><a className="image-social" href="https://www.thumbtack.com/pa/conshohocken/garage-doors/local-garage-door-service/service/566760767921045514" target="_blank" rel="noreferrer" aria-label="Thumbtack"><img src="/assets/brands/thumbtack.png" alt="" loading="lazy" width="30" height="30" /></a><a className="image-social" href="https://nextdoor.com/page/local-garage-door-service/" target="_blank" rel="noreferrer" aria-label="Nextdoor"><img src="/assets/brands/nextdoor.png" alt="" loading="lazy" width="30" height="30" /></a></div>
    <strong className="footer-copyright">© 2026 Local Garage Door Service</strong><div className="legal-links"><a href="/terms">Terms</a><a href="/privacy">Privacy</a></div><p className="footer-legal">Local Garage Door Service is a DBA of GALMOR LLP · Licensed · Insured · Bonded · PA HIC #PA220090 · NJ HICB #13VH14099400</p>
  </footer>;
}

export function FloatingCtas() {
  return <><div className="desktop-floating-cta" role="group" aria-label="Quick contact actions"><a href={PHONE_LINK} aria-label={`Call Local Garage Door Service at ${PHONE_DISPLAY}`} onClick={() => track("phone_click", { placement: "floating" })}><Icon name="phone" size={20}/><span>Call Now</span></a><a href="/#service-request" aria-label="Request garage door service" onClick={() => track("request_click", { placement: "floating" })}><Icon name="calendar" size={20}/><span>Request Service</span></a><a className="whatsapp-cta" href={WHATSAPP} aria-label="Contact Local Garage Door Service on WhatsApp" target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { placement: "floating" })}><WhatsAppIcon/><span>WhatsApp</span></a></div><div className="mobile-cta"><a href={PHONE_LINK} onClick={() => track("phone_click", { placement: "mobile_sticky" })}><Icon name="phone" size={19}/>Call</a><a href="/#service-request-form" onClick={() => track("request_click", { placement: "mobile_sticky" })}><Icon name="calendar" size={19}/>Request</a><a className="mobile-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer" onClick={() => track("whatsapp_click", { placement: "mobile_sticky" })}><WhatsAppIcon/>WhatsApp</a></div></>;
}

function WhatsAppIcon() { return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2a8.5 8.5 0 1 1 15.6-4.6Z"/><path d="M8.3 7.8c.4-.4.8-.2 1 .1l1 1.8c.2.3.1.6-.1.8l-.7.8c.8 1.7 2.1 3 3.8 3.8l.8-.8c.2-.2.5-.3.8-.1l1.8 1c.3.2.5.6.1 1-1 1.1-2.3 1.2-3.7.6-3.2-1.3-5.8-3.9-7-7-.5-1.3-.3-2.4.4-3Z"/></svg>; }

function HashAnchorScroll() {
  useEffect(() => {
    let frame = 0;
    const scrollToHash = () => {
      if (!window.location.hash) return;
      const id = decodeURIComponent(window.location.hash.slice(1));
      frame = window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);
  return null;
}

export function SiteShell({ children }: { children: ReactNode }) {
  return <><a className="skip-link" href="#content">Skip to content</a><Header/><main id="content" tabIndex={-1}>{children}</main><Footer/><FloatingCtas/><CookieConsent/><AnalyticsManager/><HashAnchorScroll/></>;
}

function attributionFields() {
  const params = new URLSearchParams(window.location.search);
  const values: Record<string, string> = {};
  ["gclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
    const current = params.get(key);
    if (current) window.sessionStorage.setItem(`lgds_${key}`, current);
    values[key] = current || window.sessionStorage.getItem(`lgds_${key}`) || "";
  });
  values.landing_page = window.sessionStorage.getItem("lgds_landing_page") || window.location.href;
  window.sessionStorage.setItem("lgds_landing_page", values.landing_page);
  values.referrer = window.sessionStorage.getItem("lgds_referrer") || document.referrer;
  window.sessionStorage.setItem("lgds_referrer", values.referrer);
  return values;
}

export function ServiceRequestForm({ initialIssue = "", initialOffer = "", source = "website", compact = false, formId }: { initialIssue?: string; initialOffer?: string; source?: string; compact?: boolean; formId?: string }) {
  const [issue, setIssue] = useState(initialIssue);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const started = useRef(false);
  useEffect(() => {
    const timer = window.setTimeout(() => setIssue(initialIssue), 0);
    return () => window.clearTimeout(timer);
  }, [initialIssue]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    const attribution = attributionFields();
    Object.entries(attribution).forEach(([key, value]) => data.set(key, value));
    data.set("page_url", window.location.href);
    data.set("_subject", "Website Service Request");
    try {
      const response = await fetch("https://formspree.io/f/xpqqzvwo", { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Request failed");
      track("generate_lead", { form_source: source, service: issue, zip: data.get("zip") });
      window.location.assign("/thank-you");
    } catch {
      setStatus("error");
    }
  }
  function markStart() {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_source: source });
  }
  return <form id={formId} className={`service-request-card ${compact ? "compact-form" : ""}`} onSubmit={submit} onFocus={markStart}>
    <input type="text" name="_gotcha" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <input type="hidden" name="source" value={source}/>
    <input type="hidden" name="website_offer" value={initialOffer}/>
    <p className="eyebrow">Request service</p><h2>Tell us what you need.</h2><p>We’ll follow up to confirm the issue, location and appointment availability.</p>
    <label><span>Name</span><input required name="name" autoComplete="name" placeholder="Your name" /></label>
    <div className="request-row"><label><span>Phone</span><input required name="phone" type="tel" autoComplete="tel" placeholder="(000) 000-0000" /></label><label><span>ZIP</span><input required name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}(-[0-9]{4})?" placeholder="ZIP code" /></label></div>
    <label><span>What’s happening?</span><select required name="issue" value={issue} onChange={(event) => setIssue(event.target.value)}><option value="">Choose an issue</option><option>Door won’t open</option><option>Broken spring</option><option>Broken cable</option><option>Door is off track</option><option>Opener issue</option><option>Noisy or heavy door</option><option>New garage door</option><option>New opener</option><option>Commercial door</option><option>Other / not sure</option></select></label>
    {!compact && <label><span>Anything else? <em>Optional</em></span><textarea name="details" placeholder="Describe what you see or hear." /></label>}
    <label className="form-consent"><input required type="checkbox" name="consent"/><span>By submitting, I agree to receive calls and text messages from Local Garage Door Service about this request. Consent is not a condition of purchase. Message and data rates may apply. Reply STOP to opt out or HELP for help. See our <a href="/privacy">Privacy Policy</a>.</span></label>
    <button className="button button-gold" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : <>Request Service <Icon name="arrow" size={19}/></>}</button>
    {status === "error" && <p className="form-error" role="alert">The form did not send. Please call <a href={PHONE_LINK}>{PHONE_DISPLAY}</a> or try again.</p>}
  </form>;
}

export function LazyWorkVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadVideo, setLoadVideo] = useState(false);
  useEffect(() => {
    const video = videoRef.current; if (!video) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; setLoadVideo(true); observer.disconnect(); }, { rootMargin: "320px" });
    observer.observe(video); return () => observer.disconnect();
  }, []);
  useEffect(() => { if (loadVideo) { videoRef.current?.load(); videoRef.current?.play().catch(() => undefined); } }, [loadVideo]);
  return <video ref={videoRef} autoPlay muted loop playsInline preload="none" poster="/assets/service-visit-poster.avif" aria-label="Garage door technician completing a service visit">{loadVideo && <source src="/assets/service-visit.mp4" type="video/mp4"/>}</video>;
}

export function CustomerTestimonial() {
  return <section className="testimonial-video-section section"><div><p className="eyebrow">A customer in his own words</p><h2>Hear what the service experience felt like.</h2><p>A real customer shares his Local Garage Door Service experience. Press play when you are ready; sound is controlled by you.</p><div className="testimonial-points"><span><Icon name="check" size={18}/>Clear explanations</span><span><Icon name="check" size={18}/>Professional work</span><span><Icon name="check" size={18}/>A real local experience</span></div></div><video controls playsInline preload="none" poster="/assets/video/customer-testimonial-poster.jpg" aria-label="Customer testimonial about Local Garage Door Service"><source src="/assets/video/customer-testimonial.mp4" type="video/mp4"/></video></section>;
}

export function FaqList({ faqs = commonFaqs }: { faqs?: { q: string; a: string }[] }) {
  return <div className="faq-list">{faqs.map((faq, index) => <details key={faq.q} open={index === 0}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div>;
}
