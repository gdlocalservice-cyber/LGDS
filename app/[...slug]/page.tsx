import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, commonFaqs, locationBySlug, locations, PHONE_DISPLAY, PHONE_LINK, reviews, serviceBySlug, services, SITE_URL } from "../site-data";
import { FaqList, Icon, ServiceRequestForm, SiteShell } from "../site-components";

type Params = Promise<{ slug: string[] }>;

const fixedRoutes = [
  ["services"], ["locations"], ["doors", "residential"], ["doors", "commercial"], ["faq"], ["reviews"], ["blog"], ["request-service"], ["privacy"], ["terms"], ["warranty-policy"], ["thank-you"],
];

export function generateStaticParams() {
  return [
    ...fixedRoutes.map((slug) => ({ slug })),
    ...services.map((service) => ({ slug: ["services", service.slug] })),
    ...locations.map((location) => ({ slug: ["locations", location.slug] })),
    ...blogPosts.map((post) => ({ slug: ["blog", post.slug] })),
  ];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const path = slug.join("/");
  const canonical = `${SITE_URL}/${path}`;
  if (path === "warranty-policy") {
    return {
      title: "Warranty Terms | Local Garage Door Service",
      description: "Warranty coverage and limitations are included in the Local Garage Door Service Terms & Conditions.",
      alternates: { canonical: `${SITE_URL}/terms` },
      robots: { index: false, follow: true },
    };
  }
  if (slug[0] === "services" && slug[1]) {
    const service = serviceBySlug(slug[1]);
    if (service) return { title: `${service.title} | Local Garage Door Service`, description: service.summary, alternates: { canonical }, openGraph: { title: service.title, description: service.summary, url: canonical, images: [service.image] } };
  }
  if (slug[0] === "locations" && slug[1]) {
    const location = locationBySlug(slug[1]);
    if (location) {
      const isState = ["pennsylvania", "new-jersey", "delaware"].includes(location.slug);
      const place = isState ? location.name : `${location.name}, ${location.state}`;
      const title = isState ? `Garage Door Service Across ${place}` : `Garage Door Repair in ${place}`;
      const focus = location.focusServiceSlugs.map((serviceSlug) => serviceBySlug(serviceSlug)?.title).filter(Boolean).slice(0, 2).join(" and ");
      const description = `${focus} in ${place}, plus surrounding-community service by confirmed availability. Call or request service online.`;
      return { title: `${title} | Local Garage Door Service`, description, alternates: { canonical }, openGraph: { title, description, url: canonical, images: [location.image] } };
    }
  }
  if (slug[0] === "blog" && slug[1]) {
    const post = blogPosts.find((item) => item.slug === slug[1]);
    if (post) return { title: `${post.title} | Local Garage Door Service`, description: post.description, alternates: { canonical } };
  }
  const map: Record<string, { title: string; description: string; noindex?: boolean }> = {
    services: { title: "Garage Door Services | Repair, Openers & Installation", description: "Explore garage door repair, spring, cable, off-track, opener, new door and commercial service options." },
    locations: { title: "Garage Door Service Areas in PA, NJ & DE", description: "Find Local Garage Door Service coverage across Pennsylvania, New Jersey and Delaware." },
    "doors/residential": { title: "Residential Garage Door Repair & Installation", description: "Residential garage door repair, opener service and new door installation across PA, NJ and DE." },
    "doors/commercial": { title: "Commercial Garage Door & Roll-Up Door Service", description: "Repair and replacement for standard commercial garage doors and roll-up doors." },
    faq: { title: "Garage Door Repair FAQ", description: "Direct answers about garage door cost, scheduling, safety, warranties, payment and service areas." },
    reviews: { title: "Customer Reviews | Local Garage Door Service", description: "Read selected Google review excerpts and watch a customer testimonial." },
    blog: { title: "Garage Door Guides | Local Garage Door Service", description: "Clear, safety-first garage door guides for homeowners." },
    "request-service": { title: "Request Garage Door Service", description: "Send your name, phone, ZIP and garage door issue to request service." },
    privacy: { title: "Privacy Policy", description: "How Local Garage Door Service collects, uses and protects information submitted through this website." },
    terms: { title: "Terms & Conditions", description: "Terms that apply when visitors use the Local Garage Door Service website and request garage door service." },
    "warranty-policy": { title: "Warranty Policy", description: "Warranty coverage, claim information and limitations for eligible work completed by Local Garage Door Service." },
    "thank-you": { title: "Request Received", description: "Your service request has been received.", noindex: true },
  };
  const item = map[path];
  if (!item) return {};
  return { title: `${item.title} | Local Garage Door Service`, description: item.description, alternates: { canonical }, robots: item.noindex ? { index: false, follow: false } : undefined };
}

function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb">{items.map((item, index) => <span key={`${item.label}-${index}`}>{index > 0 && <b>/</b>}{item.href ? <a href={item.href}>{item.label}</a> : <em>{item.label}</em>}</span>)}</nav>;
}

function InnerHero({ eyebrow, title, copy, image, imageAlt }: { eyebrow: string; title: string; copy: string; image?: string; imageAlt?: string }) {
  return <section className={`inner-hero ${image ? "with-image" : ""}`}><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p><div className="hero-buttons"><a className="button button-gold" href={PHONE_LINK}><Icon name="phone" size={20}/>Call {PHONE_DISPLAY}</a><a className="button button-outline" href="/#service-request">Request Service</a></div><small>Technician courtesy call before arrival · Pricing reviewed before approved work</small></div>{image && <img src={image} alt={imageAlt || ""} width="1200" height="800" fetchPriority="high"/>}</section>;
}

function RequestBand({ issue = "", source = "inner_page" }: { issue?: string; source?: string }) {
  return <section className="inner-request-band" id="request"><div><p className="eyebrow">Need service?</p><h2>Send the basics. We’ll follow up with availability.</h2><p>After-hours requests are recorded and returned during the next operating morning.</p></div><ServiceRequestForm initialIssue={issue} source={source} compact/></section>;
}

function FinalCta() {
  return <section className="final-cta"><div><p className="eyebrow">A clear next step</p><h2>Tell us what the garage door is doing.</h2><p>We will confirm the location, problem and scheduling availability.</p></div><div><a className="button button-gold" href={PHONE_LINK}><Icon name="phone" size={20}/>Call {PHONE_DISPLAY}</a><a className="button button-light" href="/#service-request">Request Service</a></div></section>;
}

function ServiceDetail({ slug }: { slug: string }) {
  const service = serviceBySlug(slug); if (!service) notFound();
  const requestIssue = service.slug.includes("spring") ? "Broken spring" : service.slug.includes("cable") ? "Broken cable" : service.slug.includes("off-track") ? "Door is off track" : service.slug === "garage-door-opener-installation" ? "New opener" : service.slug.includes("opener") ? "Opener issue" : service.slug.includes("new-garage-door") ? "New garage door" : service.slug.includes("commercial") ? "Commercial door" : "Other / not sure";
  const pageUrl = `${SITE_URL}/services/${service.slug}`;
  const schema = { "@context": "https://schema.org", "@type": "Service", "@id": `${pageUrl}#service`, name: service.title, description: service.summary, url: pageUrl, provider: { "@id": `${SITE_URL}/#organization` }, areaServed: ["Pennsylvania", "New Jersey", "Delaware"] };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };
  const related = services.filter((item) => item.slug !== service.slug && item.priority === service.priority).slice(0, 3);
  return <SiteShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}/><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title }]}/><InnerHero eyebrow="Garage door service" title={service.title} copy={service.summary} image={service.image} imageAlt={service.imageAlt}/><section className="answer-section section"><div className="answer-card"><p className="eyebrow">Direct answer</p><h2>What this service solves</h2><p>{service.answer}</p></div><aside><Icon name="shield" size={36}/><strong>Safety-first recommendation</strong><p>We recommend repair when it can return the door to safe, reliable operation and meet the customer’s needs. Otherwise, replacement may be the practical option.</p></aside></section><section className="two-list-section section"><div><p className="eyebrow">Common signs</p><h2>When to request service</h2><ul className="check-list">{service.signs.map((item) => <li key={item}><Icon name="check" size={18}/>{item}</li>)}</ul></div><div><p className="eyebrow">What to expect</p><h2>A clear service visit</h2><ul className="check-list">{service.includes.map((item) => <li key={item}><Icon name="check" size={18}/>{item}</li>)}</ul></div></section><section className="service-proof section"><img src={service.proofImage} alt={`Professional ${service.title.toLowerCase()} work`} loading="lazy" width="1200" height="800"/><div><p className="eyebrow">Professional process</p><h2>Diagnosis before recommendation.</h2><p>Garage door parts work as a connected system. The technician checks the relevant springs, cables, tracks, rollers, hardware or opener response before explaining the practical next steps.</p><div className="mini-proof"><span><Icon name="phone" size={18}/>Courtesy call before arrival</span><span><Icon name="check" size={18}/>Options explained</span><span><Icon name="check" size={18}/>Pricing reviewed first</span></div></div></section><section className="faq-section section"><div className="faq-intro"><p className="eyebrow">Questions about this service</p><h2>Clear answers before you schedule.</h2></div><FaqList faqs={service.faqs}/></section><section className="related-section section"><div className="section-heading compact"><p className="eyebrow">Related service</p><h2>Explore the connected repair paths.</h2></div><div className="related-grid">{related.map((item) => <a href={`/services/${item.slug}`} key={item.slug}><h3>{item.title}</h3><p>{item.summary}</p><span>View service <Icon name="arrow" size={18}/></span></a>)}</div></section><RequestBand issue={requestIssue} source={`service_${service.slug}`}/><FinalCta/></SiteShell>;
}

function ServicesIndex() {
  const groups = [{ name: "Priority repairs", values: services.filter((item) => item.priority === "High") }, { name: "Doors and hardware", values: services.filter((item) => item.priority === "Medium") }, { name: "Care and commercial", values: services.filter((item) => item.priority === "Low") }];
  return <SiteShell><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]}/><InnerHero eyebrow="All services" title="Garage door service built around the actual problem." copy="Start with the symptom. Each page explains what the issue may mean, when to stop using the door and what to expect from a professional visit."/><section className="service-index-section section">{groups.map((group) => <div className="service-index-group" key={group.name}><div><p className="eyebrow">{group.name}</p><h2>{group.values.length} service paths</h2></div><div className="index-card-grid">{group.values.map((service) => <a className="index-card" href={`/services/${service.slug}`} key={service.slug}><img src={service.indexImage} alt={`${service.title} service`} loading="lazy" width="1200" height="800"/><div><h3>{service.title}</h3><p>{service.summary}</p><span>View service <Icon name="arrow" size={18}/></span></div></a>)}</div></div>)}</section><RequestBand source="services_index"/><FinalCta/></SiteShell>;
}

function LocationDetail({ slug }: { slug: string }) {
  const location = locationBySlug(slug); if (!location) notFound();
  const isState = ["pennsylvania", "new-jersey", "delaware"].includes(location.slug);
  const place = isState ? location.name : `${location.name}, ${location.state}`;
  const heroTitle = isState ? `Garage Door Service Across ${location.name}` : `Garage Door Repair in ${place}`;
  const focusServices = location.focusServiceSlugs.map((serviceSlug) => serviceBySlug(serviceSlug)).filter((service): service is NonNullable<ReturnType<typeof serviceBySlug>> => Boolean(service));
  const nearbyExamples = location.nearby.slice(0, 3).join(", ");
  const cityFaqs = [
    { q: `Do you serve ${location.name} and nearby communities?`, a: `Yes. ${place} is included in the service area. ${nearbyExamples} are examples of surrounding communities, not a complete boundary. Send a request and the team will confirm availability for the service address.` },
    { q: `Which garage door services are most relevant on this ${location.name} page?`, a: `This page highlights ${focusServices.map((service) => service.title.toLowerCase()).join(", ")}. Other listed residential and standard commercial garage door services can also be requested.` },
    { q: `What should I include in a ${location.name} service request?`, a: location.requestTip },
    { q: "Can an appointment be available the same day?", a: "Appointments may be available as soon as the same day depending on location, schedule and technician availability. It is not a guaranteed response time." },
    { q: "What happens after I submit the request?", a: "The office follows up to confirm the issue, service address and appointment availability. The technician provides a courtesy call before arrival, and pricing is reviewed before approved work begins." },
  ];
  const pageUrl = `${SITE_URL}/locations/${location.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#garage-door-service`,
        name: `Garage Door Service in ${place}`,
        serviceType: focusServices.map((service) => service.title),
        description: location.serviceContext,
        areaServed: {
          "@type": isState ? "State" : "Place",
          name: place,
          ...(!isState && { containedInPlace: { "@type": "AdministrativeArea", name: `${location.region}, ${location.state}` } }),
        },
        audience: { "@type": "Audience", audienceType: "Homeowners and standard commercial garage door customers" },
        provider: { "@id": `${SITE_URL}/#organization` },
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: cityFaqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Service Areas", item: `${SITE_URL}/locations` },
          { "@type": "ListItem", position: 3, name: place, item: pageUrl },
        ],
      },
    ],
  };
  return <SiteShell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/>
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas", href: "/locations" }, { label: place }]}/>
    <InnerHero eyebrow={location.region} title={heroTitle} copy={location.localNote} image={location.image} imageAlt="Local Garage Door Service work example"/>
    <section className="location-answer section">
      <div>
        <p className="eyebrow">Coverage confirmed by address</p>
        <h2>Service in {location.name} and surrounding communities.</h2>
        <p>{location.serviceContext}</p>
        <p>The places shown on this page are examples—not a limit on the service area. Send a service request or call <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>, and the office will follow up about availability for your address.</p>
      </div>
      <aside><span>{location.state}</span><h3>Nearby examples</h3><ul>{location.nearby.map((nearbyPlace) => <li key={nearbyPlace}>{nearbyPlace}</li>)}</ul></aside>
    </section>
    <section className="local-request-context section">
      <div>
        <p className="eyebrow">A better first message</p>
        <h2>What to include in your {location.name} request.</h2>
        <p>{location.requestTip}</p>
      </div>
      <ul>
        <li><Icon name="location" size={21}/><span><strong>Service address</strong>City and ZIP are used to confirm route availability.</span></li>
        <li><Icon name="door" size={21}/><span><strong>Current position</strong>Tell us whether the door is open, closed, uneven or stuck.</span></li>
        <li><Icon name="phone" size={21}/><span><strong>Follow-up</strong>The office confirms the issue and appointment availability.</span></li>
      </ul>
    </section>
    <section className="popular-services section">
      <div className="section-heading"><p className="eyebrow">Useful starting points</p><h2>Service paths highlighted for {location.name}.</h2><p>Choose the closest match. The technician inspects the connected door system before recommending work.</p></div>
      <div className="related-grid">{focusServices.map((service) => <a href={`/services/${service.slug}`} key={service.slug}><h3>{service.title}</h3><p>{service.summary}</p><span>View service <Icon name="arrow" size={18}/></span></a>)}</div>
    </section>
    <section className="local-process section"><div><p className="eyebrow">What to expect</p><h2>Clear communication from request to repair.</h2><p>The office confirms scheduling, the technician calls before arrival, and the price or proposal is reviewed before approved work begins.</p></div><ol><li><b>1</b><span><strong>Request</strong>Send your details and issue.</span></li><li><b>2</b><span><strong>Confirm</strong>We confirm availability.</span></li><li><b>3</b><span><strong>Inspect</strong>The system is diagnosed.</span></li><li><b>4</b><span><strong>Approve</strong>Options and pricing come first.</span></li></ol></section>
    <section className="faq-section section"><div className="faq-intro"><p className="eyebrow">{location.name} service questions</p><h2>Answers tied to this service-area page.</h2></div><FaqList faqs={cityFaqs}/></section>
    <RequestBand source={`location_${location.slug}`}/><FinalCta/>
  </SiteShell>;
}

function LocationsIndex() {
  const states = [{ name: "Pennsylvania", slug: "pennsylvania", code: "PA" }, { name: "New Jersey", slug: "new-jersey", code: "NJ" }, { name: "Delaware", slug: "delaware", code: "DE" }];
  return <SiteShell><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]}/><InnerHero eyebrow="PA · NJ · DE" title="Garage door service areas." copy="Browse featured state and city pages below. The listed cities are examples—not the limits of our service area."/><section className="location-index section">{states.map((state) => <article key={state.code}><a className="state-heading" href={`/locations/${state.slug}`}><span>{state.code}</span><div><p className="eyebrow">State service page</p><h2>{state.name}</h2></div></a><div>{locations.filter((location) => location.state === state.code && location.slug !== state.slug).map((location) => <a href={`/locations/${location.slug}`} key={location.slug}><Icon name="location" size={18}/>{location.name}<span>{location.region}</span></a>)}</div></article>)}<aside className="unlisted-location-cta"><div><p className="eyebrow">More communities served</p><h2>Don’t see your city?</h2><p>We serve many surrounding communities. Send a service request and our team will follow up to confirm availability.</p></div><a className="button button-gold" href="/#service-request-form">Request Service <Icon name="arrow" size={19}/></a></aside></section><RequestBand source="locations_index"/><FinalCta/></SiteShell>;
}

function DoorPage({ commercial = false }: { commercial?: boolean }) {
  const title = commercial ? "Commercial Garage Door & Roll-Up Door Service" : "Residential Garage Door Repair & Installation";
  const copy = commercial ? "Repair and replacement for standard commercial garage doors and roll-up doors. Contact us with the door type and problem so service can be confirmed." : "Repair, opener service and new garage door installation for homeowners across Pennsylvania, New Jersey and Delaware.";
  const pageServices = commercial ? services.filter((item) => item.slug.includes("commercial")) : services.filter((item) => !item.slug.includes("commercial"));
  return <SiteShell><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: commercial ? "Commercial" : "Residential" }]}/><InnerHero eyebrow={commercial ? "Standard commercial doors" : "For homeowners"} title={title} copy={copy} image={commercial ? "/assets/media/pages/commercial-overhead-door-service.webp" : "/assets/media/pages/residential-garage-door-service.webp"} imageAlt={commercial ? "Commercial overhead garage door" : "Residential garage door service"}/><section className="service-index-section section"><div className="section-heading"><p className="eyebrow">Available service</p><h2>{commercial ? "Focused commercial door service." : "Every common residential service path."}</h2></div><div className="index-card-grid">{pageServices.map((service) => <a className="index-card" href={`/services/${service.slug}`} key={service.slug}><img src={service.doorImage} alt={`${service.title} for ${commercial ? "commercial properties" : "homeowners"}`} loading="lazy" width="1200" height="800"/><div><h3>{service.title}</h3><p>{service.summary}</p><span>View service <Icon name="arrow" size={18}/></span></div></a>)}</div></section>{commercial && <section className="scope-note section"><Icon name="shield" size={44}/><div><p className="eyebrow">Clear scope</p><h2>Standard commercial doors, clearly defined.</h2><p>This commercial service is intentionally focused on standard commercial garage doors and roll-up door repair and replacement.</p></div></section>}<RequestBand issue={commercial ? "Commercial door" : ""} source={commercial ? "commercial_page" : "residential_page"}/><FinalCta/></SiteShell>;
}

function ReviewsPage() {
  return <SiteShell><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]}/><InnerHero eyebrow="Customer proof" title="Real garage door service experiences." copy="Selected Google review excerpts are presented as lightweight site content, with a direct link to the public review profile."/><section className="all-reviews section"><div className="review-grid">{reviews.map((review) => <article className="review-card" key={review.initials}><div className="review-top"><span className="stars" aria-hidden="true">★★★★★</span><span className="sr-only">5 out of 5 stars.</span><span className="google-g small" aria-hidden="true">G</span></div><Icon name="quote" size={30}/><p>“{review.text}”</p><strong>{review.initials}</strong><small>Google review excerpt</small></article>)}</div><a className="button button-outline centered-button" href="https://share.google/ArfweksEz68jrQfo9" target="_blank" rel="noreferrer">View Google profile</a></section><section className="testimonial-video-section section"><div><p className="eyebrow">Customer video</p><h2>Hear the experience directly.</h2><p>A real customer shares his experience with the service. Press play to listen.</p></div><video controls playsInline preload="metadata" poster="/assets/video/customer-testimonial-poster.jpg"><source src="/assets/video/customer-testimonial.mp4" type="video/mp4"/></video></section><RequestBand source="reviews_page"/><FinalCta/></SiteShell>;
}

function FaqPage() {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: commonFaqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };
  return <SiteShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}/><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQ" }]}/><InnerHero eyebrow="Garage door FAQ" title="Direct answers before you schedule." copy="Cost, safety, availability, warranties, brands, payment and what happens after hours—answered without hiding the conditions."/><section className="faq-full section"><FaqList/></section><RequestBand source="faq_page"/><FinalCta/></SiteShell>;
}

function BlogIndex() {
  return <SiteShell><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides" }]}/><InnerHero eyebrow="Safety-first homeowner guides" title="Understand the problem without taking unsafe repairs into your own hands." copy="Clear explanations that help you recognize symptoms, compare options and know when to stop operating the door."/><section className="blog-grid section">{blogPosts.map((post, index) => <a href={`/blog/${post.slug}`} key={post.slug}><span>0{index + 1}</span><p className="eyebrow">Garage door guide</p><h2>{post.title}</h2><p>{post.description}</p><b>Read guide <Icon name="arrow" size={18}/></b></a>)}</section><RequestBand source="blog_index"/><FinalCta/></SiteShell>;
}

function BlogPost({ slug }: { slug: string }) {
  const post = blogPosts.find((item) => item.slug === slug); if (!post) notFound();
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.description, author: { "@type": "Organization", name: "Local Garage Door Service" }, publisher: { "@id": `${SITE_URL}/#organization` }, mainEntityOfPage: `${SITE_URL}/blog/${post.slug}` };
  return <SiteShell><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}/><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/blog" }, { label: post.title }]}/><article className="article-page"><header><p className="eyebrow">Garage door guide</p><h1>{post.title}</h1><p>{post.description}</p></header><div className="article-layout"><div>{post.sections.map((section) => <section key={section.h}><h2>{section.h}</h2><p>{section.p}</p></section>)}<aside className="safety-callout"><Icon name="shield" size={34}/><div><strong>Safety note</strong><p>Do not loosen springs, cables, drums or structural door hardware. These components can remain under dangerous tension.</p></div></aside></div><nav><strong>Related services</strong><a href="/services/garage-door-repair">Garage Door Repair</a><a href="/services/broken-spring-replacement">Broken Spring Replacement</a><a href="/services/garage-door-opener-repair">Opener Repair</a></nav></div></article><RequestBand source={`blog_${post.slug}`}/><FinalCta/></SiteShell>;
}

function RequestPage() {
  return <SiteShell><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Request Service" }]}/><section className="request-page section"><div><p className="eyebrow">Request service</p><h1>Tell us what the door is doing.</h1><p>Send your name, phone, ZIP and the basic issue. The team will follow up to confirm the location and appointment availability.</p><ul className="check-list"><li><Icon name="phone" size={18}/>Technician courtesy call before arrival</li><li><Icon name="check" size={18}/>Pricing reviewed before approved work</li><li><Icon name="clock" size={18}/>Open Sunday, 7:00 AM–10:00 PM</li></ul></div><ServiceRequestForm source="request_page"/></section></SiteShell>;
}

function ThankYouPage() {
  return <SiteShell><section className="thank-you-page section"><span><Icon name="check" size={54}/></span><p className="eyebrow">Request received</p><h1>Thank you. We have your service request.</h1><p>We will follow up during operating hours to confirm the problem, location and appointment availability.</p><div className="thank-hours"><strong>Operating hours</strong><span>Sunday–Thursday: 7:00 AM–10:00 PM</span><span>Friday: 7:00 AM–1:00 PM</span><span>Saturday: Closed</span></div><p>If this was sent outside operating hours, your information is recorded and a team member will return the call during the next operating morning.</p><div className="hero-buttons"><a className="button button-gold" href={PHONE_LINK}>Call {PHONE_DISPLAY}</a><a className="button button-outline" href="/">Return Home</a></div></section></SiteShell>;
}

function PrivacyPolicyPage() {
  return <SiteShell><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]}/><article className="legal-page section">
    <p className="eyebrow">Last updated July 24, 2026</p>
    <h1>Privacy Policy</h1>
    <p>This Privacy Policy explains how Local Garage Door Service, a DBA of GALMOR LLP (“we,” “us,” “our”), collects, uses and protects your information when you visit our website or contact us.</p>
    <h2>1) Information We Collect</h2>
    <ul>
      <li>Contact and service-request details you submit, including name, phone number, ZIP code, issue details and consent information.</li>
      <li>Usage data such as pages viewed, device and browser information, and approximate location such as city or region derived from an IP address through analytics tools.</li>
      <li>Marketing and attribution data related to advertising performance, including campaign parameters, landing page and referrer information.</li>
    </ul>
    <h2>2) How We Use Information</h2>
    <ul>
      <li>To respond to service requests and communicate with you.</li>
      <li>To confirm scheduling and provide technician or appointment updates.</li>
      <li>To provide and improve our services and website experience.</li>
      <li>To measure marketing performance and optimize advertising.</li>
      <li>To prevent fraud, abuse or security issues.</li>
    </ul>
    <h2>3) SMS / Text Messaging</h2>
    <p>If you provide your phone number to contact us or request service, and submit the required consent, you agree to receive calls and text messages from Local Garage Door Service related to that request, including appointments, scheduling updates and technician arrival notifications.</p>
    <p>Your consent is not a condition of purchase. Message frequency may vary. Message and data rates may apply. You may opt out at any time by replying STOP. For help, reply HELP or call <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>.</p>
    <p>Mobile information will not be shared with third parties for marketing or promotional purposes.</p>
    <h2>4) Sharing Information</h2>
    <p>We do not sell or rent your personal information. We may share limited information with service providers that help us operate the website, process requests, communicate with customers, measure site performance or support advertising, and when required by law.</p>
    <h2>5) Cookies &amp; Tracking</h2>
    <p>We use optional cookies and similar technologies to understand website traffic and improve marketing effectiveness. Optional analytics and advertising tags load only after consent on the production domain. You may accept or decline optional cookies through the website banner and may also control cookies through your browser settings. Essential browser storage may still be used for form attribution and preference functionality.</p>
    <h2>6) Third-Party Services</h2>
    <ul>
      <li><strong>Form submissions:</strong> Service-request data may be processed by a form-processing provider.</li>
      <li><strong>Analytics and advertising:</strong> We may use Google Analytics and Google Ads to understand website and campaign performance after consent.</li>
      <li><strong>WhatsApp:</strong> If you choose the WhatsApp link, WhatsApp may collect information under its own policies.</li>
      <li><strong>Website hosting:</strong> Our hosting providers may process limited technical data needed to deliver and secure the website.</li>
    </ul>
    <h2>7) Data Security</h2>
    <p>We use reasonable safeguards to protect information. However, no method of transmission or storage over the internet is 100% secure.</p>
    <h2>8) Your Choices</h2>
    <ul>
      <li>You may request to access, update, correct or delete submitted personal information by contacting us.</li>
      <li>You may opt out of text messages by replying STOP.</li>
      <li>You may decline optional cookies through the website banner and opt out of certain advertising personalization through Google’s ad settings.</li>
      <li>New Jersey residents may have additional rights under the New Jersey Data Privacy Act, including rights to access, correct or delete certain personal data.</li>
      <li>Residents of Pennsylvania, Delaware and other states may have rights under applicable state privacy laws.</li>
    </ul>
    <p>To exercise a privacy right, call <a href={PHONE_LINK}>{PHONE_DISPLAY}</a> or email <a href="mailto:GDlocalservice@gmail.com">GDlocalservice@gmail.com</a>.</p>
    <h2>8a) Data Retention</h2>
    <p>We retain personal information only as long as reasonably necessary to fulfill the purposes described in this policy, provide requested services, resolve disputes, enforce agreements or comply with legal obligations. Service-request and scheduling data is generally retained for up to three years. You may request deletion by contacting us, subject to legal and operational retention requirements.</p>
    <h2>9) Children’s Privacy</h2>
    <p>Our website and services are not directed to children under 13, and we do not knowingly collect personal information from children under 13.</p>
    <h2>10) Updates to This Policy</h2>
    <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised “Last updated” date.</p>
    <h2>11) Contact</h2>
    <p>Questions about this Privacy Policy? Call <a href={PHONE_LINK}>{PHONE_DISPLAY}</a> or email <a href="mailto:GDlocalservice@gmail.com">GDlocalservice@gmail.com</a>.</p>
    <h2>California Residents (CCPA)</h2>
    <p>California residents may have the right to know what personal information we collect and how it is used, and to request access to or deletion of certain information. We do not sell personal information. For privacy-related requests, email <a href="mailto:GDlocalservice@gmail.com">GDlocalservice@gmail.com</a>.</p>
  </article></SiteShell>;
}

function TermsPage() {
  return <SiteShell><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms & Conditions" }]}/><article className="legal-page section">
    <p className="eyebrow">Last updated July 24, 2026</p>
    <h1>Terms &amp; Conditions</h1>
    <p>These Terms &amp; Conditions (“Terms”) govern your use of this website and services provided by Local Garage Door Service, a DBA of GALMOR LLP (“we,” “us,” “our”). By using this website or booking a service, you agree to these Terms.</p>
    <h2>1) Estimates &amp; Pricing</h2>
    <ul>
      <li>Online offers and prices are promotional or informational and may vary depending on parts, door size, condition and labor time.</li>
      <li>Final pricing is confirmed after an on-site inspection or a confirmed remote diagnosis when applicable.</li>
      <li>If additional work is needed for safe operation, we will explain it and review updated pricing before proceeding.</li>
    </ul>
    <h2>2) Scheduling &amp; Access</h2>
    <ul>
      <li>Appointments may use an arrival window. Traffic, weather and earlier jobs can affect arrival time.</li>
      <li>Appointment availability depends on location, scheduling and technician availability.</li>
      <li>You agree to provide safe, reasonable access to the door or opener and a clear work area.</li>
    </ul>
    <h2>3) Cancellations &amp; Rescheduling</h2>
    <ul>
      <li>Please notify us as early as possible if you need to cancel or reschedule.</li>
      <li>Same-day cancellations or missed appointments may incur a trip or diagnostic fee where permitted.</li>
    </ul>
    <h2>4) Payments</h2>
    <ul>
      <li>Payment is due upon completion of service unless otherwise agreed in writing.</li>
      <li>Accepted methods may include cash, credit card, check or Zelle, depending on availability.</li>
      <li>Unpaid balances may be subject to reasonable collection efforts as allowed by law.</li>
    </ul>
    <h2>5) Warranties</h2>
    <p>Warranty coverage varies according to the type of approved work, the parts selected and the written coverage issued for that service.</p>
    <h3>Applicable Warranty Documents</h3>
    <p>The applicable proposal, invoice, receipt or written warranty controls the coverage period and scope for a particular service. General information on this website does not replace or expand the written terms provided for the approved work. If the documents contain different warranty terms, the terms specifically issued for that work control.</p>
    <h3>Coverage Periods</h3>
    <p>Warranty periods are not the same for every repair, part or installation. Eligible installations may include labor warranty options of up to 10 years. The exact duration begins on the service or installation date and is stated in the applicable written documents.</p>
    <h3>Parts and Workmanship</h3>
    <p>Subject to the written coverage provided for the approved work, our warranty covers defects in parts installed by Local Garage Door Service and defects in our original workmanship. Coverage applies only to the specific part or work identified in the applicable service documentation.</p>
    <h3>Manufacturer Coverage</h3>
    <p>Some parts or products may include a separate manufacturer warranty. Manufacturer warranty coverage, registration requirements, exclusions and claim procedures are controlled by the manufacturer. A manufacturer warranty does not automatically change the labor coverage provided by Local Garage Door Service.</p>
    <h3>Customer Responsibilities</h3>
    <p>The customer is responsible for using the garage door and opener normally and safely, following available operating instructions and stopping use when the system shows signs of a malfunction. Warning signs may include unusual noise, uneven travel, straining, loose or hanging components, obstruction, unexpected movement or a door that does not remain balanced.</p>
    <h3>Requesting Warranty Review</h3>
    <p>To request a warranty review, call <a href={PHONE_LINK}>{PHONE_DISPLAY}</a> and provide the service location, approximate service date and a description of the problem. Stop operating the door or opener if it is unsafe, unbalanced, obstructed or malfunctioning. A request for review does not by itself establish that the issue is covered.</p>
    <h3>Inspection and Cause of Failure</h3>
    <p>An inspection or other reasonable evaluation may be required to identify the cause of the problem. Coverage is based on the part or work covered, the written warranty terms and the cause of the failure. The customer must provide reasonable access to the garage door, opener and related components so the condition can be evaluated.</p>
    <h3 id="warranty-limitations">Warranty Limitations</h3>
    <p>Our warranty covers defects in parts installed by Local Garage Door Service and defects in our workmanship. It does not cover damage caused by misuse, improper operation, continued use after a malfunction, or operation of the garage door or opener while another component is broken, damaged, obstructed, or unbalanced.</p>
    <p>This includes, but is not limited to, damage caused by:</p>
    <ul>
      <li>Operating the opener with a broken spring, cable, or other damaged component;</li>
      <li>Continuing to use the door after unusual noises, uneven movement, straining, or other warning signs;</li>
      <li>Pulling the emergency release while the door is open or partially open and unsupported;</li>
      <li>Forcing, manually operating, modifying, or attempting to repair a damaged door; or</li>
      <li>Repairs or adjustments performed by the customer or another unauthorized person.</li>
    </ul>
    <p>Warranty coverage is determined by the cause of the failure, not only by whether the part is still within its warranty period. A part will not be covered if it was damaged by another problem in the garage door system, even if the customer was unaware of that problem.</p>
    <p>These exclusions do not affect coverage for a separate defect in the part installed by us or in our original workmanship.</p>
    <h3>Work Performed by Others</h3>
    <p>Repairs, modifications, adjustments or replacement work performed after our service may affect the condition of the system and the ability to determine the original cause of a failure. Any warranty review will consider whether later work or changes contributed to the reported issue.</p>
    <h3>Access and Scheduling</h3>
    <p>Warranty reviews are scheduled according to location, operating hours and technician availability. The customer must provide safe and reasonable access to the work area. If the condition presents a safety risk, the door or opener should remain out of operation until it can be evaluated.</p>
    <h3>Applicable Law</h3>
    <p>This warranty section does not limit any rights that cannot be excluded or limited under applicable law. Warranty rights may vary depending on the location and the type of work performed.</p>
    <h2>6) Safety Disclaimer</h2>
    <p>Garage doors, springs, cables and moving systems can cause serious injury. Do not attempt repairs without proper training and tools. Website information is not a substitute for professional diagnosis. We are not responsible for injury or damage resulting from improper do-it-yourself repairs or modifications performed by others.</p>
    <h2>7) Website Use</h2>
    <ul>
      <li>You agree not to misuse the website, attempt to access restricted systems or disrupt site operation.</li>
      <li>Website content may not be copied or reused without permission except where allowed by law.</li>
      <li>Submitting a service request does not create a service agreement, guarantee an appointment time or confirm availability for a specific repair.</li>
    </ul>
    <h2>8) Limitation of Liability</h2>
    <p>To the fullest extent permitted by law, we are not liable for indirect, incidental, special or consequential damages. Our total liability for a claim is limited to the amount paid for the specific service giving rise to that claim.</p>
    <h2>9) Service Area</h2>
    <p>We provide service across areas of Pennsylvania, New Jersey and Delaware. Availability varies by location, scheduling and technician availability.</p>
    <h2>10) SMS / Text Messaging</h2>
    <p>By providing your phone number through a service request and submitting the required consent, you agree to receive calls and text messages related to that request, including appointment, scheduling, dispatch and technician notifications.</p>
    <p>Message frequency may vary. Message and data rates may apply. You may opt out at any time by replying STOP. For help, reply HELP or call <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>.</p>
    <p>We do not send marketing or promotional text messages without explicit consent. Mobile information will not be shared with third parties for marketing or promotional purposes.</p>
    <h2>11) Governing Law</h2>
    <p>These Terms are governed by the laws of the Commonwealth of Pennsylvania, without regard to conflict-of-law principles. To the extent permitted by law, legal actions arising under these Terms shall be brought in the appropriate state or federal courts located in Pennsylvania.</p>
    <h2>12) Force Majeure</h2>
    <p>We are not liable for a delay or failure to perform services caused by circumstances beyond our reasonable control, including severe weather, natural disasters, labor shortages, supply-chain disruption, equipment failure or government restrictions. When reasonably possible, we will provide notice and work to reschedule.</p>
    <h2>13) Contact</h2>
    <p>Questions about these Terms? Call <a href={PHONE_LINK}>{PHONE_DISPLAY}</a> or email <a href="mailto:GDlocalservice@gmail.com">GDlocalservice@gmail.com</a>.</p>
  </article></SiteShell>;
}

function WarrantyPolicyPage() {
  return <SiteShell><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Warranty Policy" }]}/><article className="legal-page section">
    <p className="eyebrow">Last updated July 24, 2026</p>
    <h1>Warranty Policy</h1>
    <p>The complete warranty terms are included in our <a href="/terms#warranty-limitations">Terms &amp; Conditions</a>. That page explains applicable documents, coverage periods, customer responsibilities, review procedures and warranty limitations.</p>
  </article></SiteShell>;
}

export default async function CatchAllPage({ params }: { params: Params }) {
  const { slug } = await params;
  const path = slug.join("/");
  if (slug[0] === "services" && slug[1]) return <ServiceDetail slug={slug[1]}/>;
  if (slug[0] === "locations" && slug[1]) return <LocationDetail slug={slug[1]}/>;
  if (slug[0] === "blog" && slug[1]) return <BlogPost slug={slug[1]}/>;
  if (path === "services") return <ServicesIndex/>;
  if (path === "locations") return <LocationsIndex/>;
  if (path === "doors/residential") return <DoorPage/>;
  if (path === "doors/commercial") return <DoorPage commercial/>;
  if (path === "faq") return <FaqPage/>;
  if (path === "reviews") return <ReviewsPage/>;
  if (path === "blog") return <BlogIndex/>;
  if (path === "request-service") return <RequestPage/>;
  if (path === "thank-you") return <ThankYouPage/>;
  if (path === "privacy") return <PrivacyPolicyPage/>;
  if (path === "terms") return <TermsPage/>;
  if (path === "warranty-policy") return <WarrantyPolicyPage/>;
  notFound();
}
