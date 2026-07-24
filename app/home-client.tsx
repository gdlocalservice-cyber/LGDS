"use client";

import { type MouseEvent, useState } from "react";
import { commonFaqs, PHONE_DISPLAY, PHONE_LINK, reviews, services } from "./site-data";
import { CustomerTestimonial, FaqList, Icon, IconName, LazyWorkVideo, ServiceRequestForm, SiteShell, track } from "./site-components";

const issues: { id: string; label: string; icon: IconName; image: string }[] = [
  { id: "Door won’t open", label: "Won’t Open", icon: "door", image: "/assets/issue-icons/wont-open.webp" },
  { id: "Broken spring", label: "Broken Spring", icon: "spring", image: "/assets/issue-icons/broken-spring.webp" },
  { id: "Door is off track", label: "Off Track", icon: "track", image: "/assets/issue-icons/off-track.webp" },
  { id: "Opener issue", label: "Opener Issue", icon: "opener", image: "/assets/issue-icons/opener.webp" },
  { id: "Noisy or heavy door", label: "Noisy / Heavy", icon: "sound", image: "/assets/issue-icons/noisy.webp" },
  { id: "New garage door", label: "New Door / Opener", icon: "sparkle", image: "/assets/issue-icons/new-door.webp" },
];

const serviceCards = services.filter((service) => ["broken-spring-replacement", "garage-door-cable-repair", "off-track-garage-door-repair", "garage-door-opener-repair", "new-garage-door-installation", "commercial-garage-door-service"].includes(service.slug));

const homeServiceImages: Record<string, { src: string; alt: string }> = {
  "broken-spring-replacement": { src: "/assets/media/services/home-broken-spring-closeup.webp", alt: "Close view of a garage door spring and lifting cable" },
  "garage-door-cable-repair": { src: "/assets/services/garage-door-track-hardware-repair.webp", alt: "Garage door track and cable hardware being measured" },
  "off-track-garage-door-repair": { src: "/assets/media/services/home-off-track-damaged-door.webp", alt: "Garage door sections damaged and out of alignment" },
  "garage-door-opener-repair": { src: "/assets/services/garage-door-opener-installation.webp", alt: "Garage door opener and rail inside a residential garage" },
  "new-garage-door-installation": { src: "/assets/media/services/home-new-garage-door.webp", alt: "Completed white garage door installed on a stone-front home" },
  "commercial-garage-door-service": { src: "/assets/media/services/home-commercial-roll-up-door.webp", alt: "Commercial roll-up door open at a service bay" },
};

const projects = [
  { title: "New-build garage completed", before: "/assets/work/new-construction-garage-before.webp", after: "/assets/work/black-garage-doors-after.webp", beforeAlt: "Boarded new garage openings before door installation", afterAlt: "Two completed black garage doors on the new garage" },
  { title: "Aging door replaced", before: "/assets/work/old-garage-door-before.webp", after: "/assets/work/white-garage-door-after.webp", beforeAlt: "Aging cream garage door before replacement", afterAlt: "New white garage door after installation" },
  { title: "Open garage secured", before: "/assets/work/garage-opening-before.webp", after: "/assets/work/garage-door-completed-after.webp", beforeAlt: "Garage opening temporarily covered before installation", afterAlt: "Completed white garage door after installation" },
];

function BeforeAfterCard({ project }: { project: (typeof projects)[number] }) {
  const [after, setAfter] = useState(true);
  return <article className="before-after-card"><div className="before-after-image"><img src={after ? project.after : project.before} alt={after ? project.afterAlt : project.beforeAlt} loading="lazy" width="900" height="1200"/><span>{after ? "After" : "Before"}</span></div><div className="before-after-control"><h3>{project.title}</h3><div role="group" aria-label={`View before or after: ${project.title}`}><button type="button" className={!after ? "active" : ""} onClick={() => setAfter(false)}>Before</button><button type="button" className={after ? "active" : ""} onClick={() => setAfter(true)}>After</button></div></div></article>;
}

export default function HomeClient() {
  const [selectedIssue, setSelectedIssue] = useState("");
  const [selectedOffer, setSelectedOffer] = useState("");
  function scrollRequestIntoView() {
    const targetId = window.matchMedia("(max-width: 900px)").matches ? "service-request-form" : "service-request";
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function requestClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    scrollRequestIntoView();
  }
  function chooseIssue(issue: string) {
    setSelectedIssue(issue);
    track("issue_select", { issue });
    window.setTimeout(scrollRequestIntoView, 60);
  }
  return <SiteShell>
    <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow">Licensed · Insured &amp; Bonded · PA · NJ · DE</p><h1>Garage Door Problems?<br/><span>Start Here.</span></h1><p className="hero-lead">Professional garage door repair and installation across Pennsylvania, New Jersey and Delaware.</p><div className="hero-buttons"><a className="button button-gold" href={PHONE_LINK} onClick={() => track("phone_click", { placement: "hero" })}><Icon name="phone" size={21}/>Call {PHONE_DISPLAY}</a><a className="button button-outline" href="#service-request" onClick={(event) => { track("request_click", { placement: "hero" }); requestClick(event); }}>Request Service</a></div><p className="availability">Appointments may be available as soon as today, depending on location, schedule and technician availability.</p></div><div className="hero-visual"><picture><source media="(max-width: 620px)" type="image/avif" srcSet="/assets/garage-door-technician-king-of-prussia-pa-lgds-mobile-720.avif"/><source media="(max-width: 620px)" type="image/webp" srcSet="/assets/garage-door-technician-king-of-prussia-pa-lgds-mobile-720.webp"/><source type="image/avif" srcSet="/assets/garage-door-technician-king-of-prussia-pa-lgds.avif"/><img src="/assets/garage-door-technician-king-of-prussia-pa-lgds.webp" width="1600" height="914" fetchPriority="high" alt="Local Garage Door Service technician arriving at a King of Prussia, Pennsylvania home with two garage doors"/></picture><a className="google-float" href="#reviews" aria-label="Read customer reviews"><span className="google-g" aria-hidden="true">G</span><span><b className="stars" aria-hidden="true">★★★★★</b><span className="sr-only">5 out of 5 stars.</span><strong>5.0</strong><em>Professional service, clearly explained.</em><small>Read Google reviews</small></span></a></div></section>

    <section className="issue-section section" id="issue-selector"><div className="section-heading compact"><h2>What’s happening with your door?</h2><p>Choose the problem to start your service request.</p></div><div className="issue-grid">{issues.map((issue) => <button type="button" className={`issue-card ${selectedIssue === issue.id ? "selected" : ""}`} key={issue.id} onClick={() => chooseIssue(issue.id)} aria-pressed={selectedIssue === issue.id}><span className="issue-icon"><img src={issue.image} alt="" width="92" height="64" loading="lazy" decoding="async"/></span><strong>{issue.label}</strong><span>Select <Icon name="arrow" size={20}/></span></button>)}</div></section>

    <section className="video-request-section" id="service-request"><div className="video-story"><div className="video-story-copy"><p className="eyebrow">Local service you can see</p><h2>Real technicians. Real work.</h2><p>See what a professional garage door visit looks like, then send the basic details in the short form.</p></div><div className="video-frame"><LazyWorkVideo/><span className="sound-note">Work video · Plays muted</span></div><div className="video-proof"><span><Icon name="check" size={18}/>Inspection first</span><span><Icon name="check" size={18}/>Options explained</span><span><Icon name="check" size={18}/>Pricing reviewed before work</span></div></div><ServiceRequestForm formId="service-request-form" initialIssue={selectedIssue} initialOffer={selectedOffer} source="homepage_primary"/></section>

    <section className="reviews-section section" id="reviews"><div className="review-summary"><div className="google-mark" aria-hidden="true">G</div><p className="eyebrow">Real Google reviews</p><h2>Local homeowners tell the story.</h2><div className="rating"><span className="stars" aria-hidden="true">★★★★★</span><strong>5-star experiences</strong></div><p>Selected excerpts are shown as lightweight page content so customer proof does not slow the site with a third-party review widget.</p><a className="text-link" href="https://share.google/ArfweksEz68jrQfo9" target="_blank" rel="noreferrer">View all Google reviews <Icon name="arrow" size={19}/></a></div><div className="review-grid">{reviews.slice(0,3).map((review) => <article className="review-card" key={review.initials}><div className="review-top"><span className="stars" aria-hidden="true">★★★★★</span><span className="sr-only">5 out of 5 stars.</span><span className="google-g small" aria-hidden="true">G</span></div><Icon name="quote" size={30}/><p>“{review.text}”</p><strong>{review.initials}</strong><small>Google review excerpt</small></article>)}</div></section>

    <section className="services-section section" id="services"><div className="section-heading"><p className="eyebrow">Repair · Replace · Maintain</p><h2>Garage door service for the problem in front of you.</h2><p>Start with the issue, not a catalog. We inspect the system, explain practical options and review pricing before approved work begins.</p></div><div className="service-grid">{serviceCards.map((service) => { const media = homeServiceImages[service.slug]; return <article className="service-card image-service-card" key={service.slug}><img src={media.src} alt={media.alt} loading="lazy" width="1200" height="800"/><div><h3>{service.title}</h3><p>{service.summary}</p><a href={`/services/${service.slug}`}>Explore service <Icon name="arrow" size={18}/></a></div></article>; })}</div><a className="button button-outline centered-button" href="/services">View all services</a></section>

    <section className="process-section"><div className="process-copy"><p className="eyebrow">A straightforward process</p><h2>From “what happened?” to a working door.</h2><p>Every visit starts with the problem you are actually experiencing. The technician inspects the system, explains the findings and reviews the available options before approved work begins.</p><a className="button button-gold" href="#service-request" onClick={requestClick}>Start Your Request</a></div><ol className="process-list"><li><span>01</span><div><strong>Show us the problem</strong><p>Select the issue and send the basic details.</p></div></li><li><span>02</span><div><strong>Confirm the appointment</strong><p>We follow up with availability for your location.</p></div></li><li><span>03</span><div><strong>Courtesy call before arrival</strong><p>Your technician calls before arriving.</p></div></li><li><span>04</span><div><strong>Inspect, explain and approve</strong><p>Work begins after options and pricing are reviewed.</p></div></li></ol></section>

    <section className="offers-section section" id="offers">
      <div className="section-heading compact"><p className="eyebrow">Website offers</p><h2>Useful savings for the work you need.</h2></div>
      <div className="offer-grid">
        <article className="offer-card offer-card-dark offer-door">
          <div className="offer-card-top"><span className="offer-kicker">New garage door</span><span className="offer-icon"><Icon name="door" size={28}/></span></div>
          <div className="offer-amount"><sup>$</sup><strong>100</strong><span>OFF</span></div>
          <h3>New Garage Door Installation</h3>
          <p>Put the savings toward an eligible new garage door installation.</p>
          <a href="#service-request" onClick={(event) => { event.preventDefault(); setSelectedOffer("$100 off new garage door installation"); track("offer_click", { offer: "new_door_100" }); chooseIssue("New garage door"); }}>Request installation <Icon name="arrow" size={20}/></a>
        </article>

        <article className="offer-card offer-card-cream offer-inspection">
          <div className="offer-card-top"><span className="offer-kicker">With any completed repair</span><span className="offer-icon"><Icon name="shield" size={28}/></span></div>
          <strong className="offer-word">Complimentary</strong>
          <h3>Safety Inspection</h3>
          <p>A professional safety review included with any completed repair.</p>
          <a href="#service-request" onClick={(event) => { setSelectedOffer("Complimentary safety inspection with completed repair"); track("offer_click", { offer: "safety_inspection" }); requestClick(event); }}>Request repair <Icon name="arrow" size={20}/></a>
        </article>

        <article className="offer-card offer-card-blue offer-opener">
          <div className="offer-card-top"><span className="offer-kicker">New garage door opener</span><span className="offer-icon"><Icon name="opener" size={28}/></span></div>
          <div className="offer-amount"><sup>$</sup><strong>50</strong><span>OFF</span></div>
          <h3>Opener Installation</h3>
          <p>Save on a new garage door opener installation.</p>
          <a href="#service-request" onClick={(event) => { event.preventDefault(); setSelectedOffer("$50 off new garage door opener installation"); track("offer_click", { offer: "new_opener_50" }); chooseIssue("New opener"); }}>Request installation <Icon name="arrow" size={20}/></a>
        </article>

        <article className="offer-card offer-card-gold offer-repair">
          <div className="offer-card-top"><span className="offer-kicker">Repair savings</span><span className="offer-icon"><Icon name="wrench" size={28}/></span></div>
          <div className="offer-amount offer-percent"><strong>10%</strong><span>OFF</span></div>
          <h3>For Any Repair</h3>
          <p className="offer-qualifier">Labor savings · Up to $50</p>
          <a href="#service-request" onClick={(event) => { setSelectedOffer("10% off repair labor, up to $50"); track("offer_click", { offer: "repair_labor_10_percent" }); requestClick(event); }}>Request repair <Icon name="arrow" size={20}/></a>
        </article>
      </div>
    </section>

    <section className="before-after-section section" id="work"><div className="section-heading split-heading"><div><p className="eyebrow">Real projects</p><h2>Before, after and the difference in between.</h2></div><p>These are actual Local Garage Door Service projects. Use each toggle to compare the real starting point with the finished installation.</p></div><div className="before-after-grid">{projects.map((project) => <BeforeAfterCard key={project.title} project={project}/>)}</div></section>

    <CustomerTestimonial/>

    <section className="warranty-section section"><div className="warranty-card"><span><Icon name="shield" size={48}/></span><div><p className="eyebrow">Eligible installations</p><h2>Up to 10-Year Labor Warranty.</h2><p>Labor warranty options up to 10 years are available on eligible installations. Exact coverage depends on the selected work and is included with the proposal.</p></div></div><div className="license-card"><p className="eyebrow">Licensed · Insured · Bonded</p><h3>Credentials customers can verify.</h3><div><span>PA</span><p><strong>Home Improvement Contractor</strong><small>#PA220090</small></p></div><div><span>NJ</span><p><strong>Home Improvement Contractor Business</strong><small>#13VH14099400</small></p></div></div></section>

    <section className="hours-strip section"><div><Icon name="clock" size={42}/><p className="eyebrow">Open Sunday</p><h2>Hours built around homeowners.</h2></div><div className="hours-grid"><span><strong>Sunday–Thursday</strong>7:00 AM–10:00 PM</span><span><strong>Friday</strong>7:00 AM–1:00 PM</span><span><strong>Saturday</strong>Closed</span><span><strong>After hours</strong>Leave details; we call next operating morning</span></div></section>

    <section className="faq-section section" id="faq"><div className="faq-intro"><p className="eyebrow">Helpful answers</p><h2>Before you schedule.</h2><p>Short, direct answers to the questions homeowners ask most.</p><a className="text-link" href="/faq">Read all answers <Icon name="arrow" size={19}/></a></div><FaqList faqs={commonFaqs.slice(0,6)}/></section>

    <section className="final-cta"><div><p className="eyebrow">Ready when you are</p><h2>Tell us what’s happening with your garage door.</h2><p>Call now or send a short service request and we will follow up with the next available step.</p></div><div><a className="button button-gold" href={PHONE_LINK}><Icon name="phone" size={21}/>Call {PHONE_DISPLAY}</a><a className="button button-light" href="#service-request" onClick={requestClick}>Request Service</a></div></section>
  </SiteShell>;
}
