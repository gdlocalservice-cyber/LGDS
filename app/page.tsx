import type { Metadata } from "next";
import HomeClient from "./home-client";
import { commonFaqs, locations, services, SITE_URL } from "./site-data";

export const metadata: Metadata = {
  title: "Garage Door Repair & Installation | Local Garage Door Service",
  description: "Garage door repair, broken spring, cable, off-track, opener and new door service across Pennsylvania, New Jersey and Delaware.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Local Garage Door Service",
    description: "Professional garage door repair and installation across PA, NJ and DE.",
    url: SITE_URL,
    images: [{ url: `${SITE_URL}/assets/garage-door-technician-king-of-prussia-pa-lgds.webp`, width: 1600, height: 914, alt: "Local Garage Door Service technician arriving at a King of Prussia, Pennsylvania home" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "Organization"],
  "@id": `${SITE_URL}/#organization`,
  name: "Local Garage Door Service",
  legalName: "GALMOR LLP",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo-nav.webp`,
  telephone: "+1-267-438-6494",
  email: "GDlocalservice@gmail.com",
  description: "Garage door repair and installation across Pennsylvania, New Jersey and Delaware.",
  areaServed: locations.map((location) => ({ "@type": ["pennsylvania", "new-jersey", "delaware"].includes(location.slug) ? "State" : "City", name: `${location.name}, ${location.state}` })),
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "07:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "07:00", closes: "13:00" },
  ],
  paymentAccepted: "Cash, Check, Credit Card, Zelle",
  sameAs: [
    "https://www.facebook.com/profile.php?id=61576443591080",
    "https://www.instagram.com/local_garage_door_service/",
    "https://www.tiktok.com/@localgaragedoorservice",
    "https://www.youtube.com/@LocalGarageDoorService",
  ],
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Garage Door Services", itemListElement: services.map((service) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.title, url: `${SITE_URL}/services/${service.slug}` } })) },
};

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: commonFaqs.slice(0, 6).map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

export default function Page() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}/><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}/><HomeClient/></>;
}
