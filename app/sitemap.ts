import type { MetadataRoute } from "next";
import { blogPosts, locations, services, SITE_URL } from "./site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-24T12:00:00-04:00");
  const absolute = (src: string) => `${SITE_URL}${src}`;
  const homeImages = [
    "/assets/garage-door-technician-king-of-prussia-pa-lgds.webp",
    "/assets/garage-door-technician-king-of-prussia-pa-lgds-mobile.webp",
    "/assets/media/services/home-broken-spring-closeup.webp",
    "/assets/services/garage-door-track-hardware-repair.webp",
    "/assets/media/services/home-off-track-damaged-door.webp",
    "/assets/services/garage-door-opener-installation.webp",
    "/assets/media/services/home-new-garage-door.webp",
    "/assets/media/services/home-commercial-roll-up-door.webp",
    "/assets/work/new-construction-garage-before.webp",
    "/assets/work/black-garage-doors-after.webp",
    "/assets/work/old-garage-door-before.webp",
    "/assets/work/white-garage-door-after.webp",
    "/assets/work/garage-opening-before.webp",
    "/assets/work/garage-door-completed-after.webp",
  ].map(absolute);
  const fixed = [
    { path: "", priority: 1, frequency: "weekly" as const },
    { path: "/services", priority: .9, frequency: "weekly" as const },
    { path: "/locations", priority: .9, frequency: "weekly" as const },
    { path: "/doors/residential", priority: .8, frequency: "monthly" as const },
    { path: "/doors/commercial", priority: .7, frequency: "monthly" as const },
    { path: "/reviews", priority: .7, frequency: "monthly" as const },
    { path: "/faq", priority: .7, frequency: "monthly" as const },
    { path: "/blog", priority: .7, frequency: "monthly" as const },
    { path: "/request-service", priority: .8, frequency: "monthly" as const },
    { path: "/privacy", priority: .2, frequency: "yearly" as const },
    { path: "/terms", priority: .2, frequency: "yearly" as const },
  ];
  return [
    ...fixed.map((item) => ({
      url: `${SITE_URL}${item.path}`,
      lastModified,
      changeFrequency: item.frequency,
      priority: item.priority,
      images: item.path === "" ? homeImages
        : item.path === "/services" ? services.map((service) => absolute(service.indexImage))
        : item.path === "/doors/residential" ? [absolute("/assets/media/pages/residential-garage-door-service.webp"), ...services.filter((service) => !service.slug.startsWith("commercial-")).map((service) => absolute(service.doorImage))]
        : item.path === "/doors/commercial" ? [absolute("/assets/media/pages/commercial-overhead-door-service.webp"), ...services.filter((service) => service.slug.startsWith("commercial-")).map((service) => absolute(service.doorImage))]
        : item.path === "/reviews" ? [absolute("/assets/video/customer-testimonial-poster.jpg")]
        : undefined,
    })),
    ...services.map((service) => ({ url: `${SITE_URL}/services/${service.slug}`, lastModified, changeFrequency: "monthly" as const, priority: service.priority === "High" ? .85 : service.priority === "Medium" ? .75 : .65, images: [absolute(service.image), absolute(service.proofImage)] })),
    ...locations.map((location) => ({ url: `${SITE_URL}/locations/${location.slug}`, lastModified, changeFrequency: "monthly" as const, priority: location.slug === "pennsylvania" || location.slug === "new-jersey" || location.slug === "delaware" ? .8 : .7, images: [absolute(location.image)] })),
    ...blogPosts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}`, lastModified, changeFrequency: "yearly" as const, priority: .6 })),
  ];
}
