// Generated from the actual exported pages and legacy redirects.
const routes = new Set(["/","/404/","/_not-found/","/ads/garage-door-opener-repair/","/ads/garage-door-repair/","/ads/spring-cable-off-track-repair/","/blog/","/blog/garage-door-opener-troubleshooting-guide/","/blog/repair-or-replace-a-garage-door/","/blog/signs-of-a-broken-garage-door-spring/","/doors/commercial/","/doors/residential/","/faq/","/locations/","/locations/allentown-pa/","/locations/bucks-county-pa/","/locations/cherry-hill-nj/","/locations/collegeville-pa/","/locations/delaware/","/locations/kennett-square-pa/","/locations/king-of-prussia-pa/","/locations/lansdale-pa/","/locations/levittown-pa/","/locations/marlton-nj/","/locations/media-pa/","/locations/middletown-de/","/locations/moorestown-nj/","/locations/new-jersey/","/locations/newark-de/","/locations/norristown-pa/","/locations/pennsylvania/","/locations/philadelphia-pa/","/locations/smyrna-de/","/locations/trenton-nj/","/locations/willingboro-nj/","/locations/wilmington-de/","/locations/woodbury-nj/","/privacy/","/request-service/","/reviews/","/services/","/services/broken-spring-replacement/","/services/commercial-garage-door-service/","/services/commercial-roll-up-door-service/","/services/emergency-garage-door-service/","/services/garage-door-balance-adjustment/","/services/garage-door-cable-repair/","/services/garage-door-maintenance/","/services/garage-door-opener-installation/","/services/garage-door-opener-repair/","/services/garage-door-panel-replacement/","/services/garage-door-repair/","/services/garage-door-roller-hinge-repair/","/services/garage-door-safety-inspection/","/services/new-garage-door-installation/","/services/noisy-heavy-garage-door/","/services/off-track-garage-door-repair/","/services/same-day-garage-door-service/","/terms/","/thank-you/","/warranty-policy/"]);
const legacy = {
  "/index.html": "/",
  "/faq.html": "/faq/",
  "/reviews.html": "/reviews/",
  "/privacy.html": "/privacy/",
  "/terms.html": "/terms/",
  "/thank-you.html": "/thank-you/",
  "/survey.html": "/reviews/",
  "/doors/residential.html": "/doors/residential/",
  "/doors/commercial.html": "/doors/commercial/",
  "/blog/index.html": "/blog/",
  "/blog/diy-vs-professional-garage-door-repair.html": "/blog/repair-or-replace-a-garage-door/",
  "/blog/garage-door-spring-replacement-signs.html": "/blog/signs-of-a-broken-garage-door-spring/",
  "/blog/how-long-do-garage-door-openers-last.html": "/blog/garage-door-opener-troubleshooting-guide/",
  "/services/cable-repair.html": "/services/garage-door-cable-repair/",
  "/services/commercial-garage-door-repair.html": "/services/commercial-garage-door-service/",
  "/services/liftmaster-chamberlain-installation.html": "/services/garage-door-opener-installation/",
  "/services/new-door-installation.html": "/services/new-garage-door-installation/",
  "/services/off-track-repair.html": "/services/off-track-garage-door-repair/",
  "/services/opener-installation.html": "/services/garage-door-opener-installation/",
  "/services/panel-replacement.html": "/services/garage-door-panel-replacement/",
  "/services/roller-repair.html": "/services/garage-door-roller-hinge-repair/",
  "/services/sensor-alignment.html": "/services/garage-door-opener-repair/",
  "/services/smart-opener-installation.html": "/services/garage-door-opener-installation/",
  "/services/spring-repair.html": "/services/broken-spring-replacement/",
  "/services/tune-up.html": "/services/garage-door-maintenance/",
  "/services/weatherstripping.html": "/services/garage-door-repair/",
  "/services/emergency-service.html": "/services/garage-door-repair/",
  "/services/emergency-service-king-of-prussia-lp.html": "/locations/king-of-prussia-pa/",
  "/services/emergency-service-norristown-lp.html": "/locations/norristown-pa/",
  "/services/spring-repair-king-of-prussia-lp.html": "/services/broken-spring-replacement/",
  "/services/spring-repair-norristown-lp.html": "/services/broken-spring-replacement/",
  "/locations/allentown-pa.html": "/locations/allentown-pa/",
  "/locations/bucks-county-pa.html": "/locations/bucks-county-pa/",
  "/locations/cherry-hill-nj.html": "/locations/cherry-hill-nj/",
  "/locations/delaware-de.html": "/locations/delaware/",
  "/locations/king-of-prussia-pa.html": "/locations/king-of-prussia-pa/",
  "/locations/marlton-nj.html": "/locations/marlton-nj/",
  "/locations/middletown-de.html": "/locations/middletown-de/",
  "/locations/moorestown-nj.html": "/locations/moorestown-nj/",
  "/locations/newark-de.html": "/locations/newark-de/",
  "/locations/norristown-pa.html": "/locations/norristown-pa/",
  "/locations/philadelphia-pa.html": "/locations/philadelphia-pa/",
  "/locations/smyrna-de.html": "/locations/smyrna-de/",
  "/locations/south-jersey-nj.html": "/locations/new-jersey/",
  "/locations/trenton-nj.html": "/locations/trenton-nj/",
  "/locations/willingboro-nj.html": "/locations/willingboro-nj/",
  "/locations/wilmington-de.html": "/locations/wilmington-de/",
  "/locations/woodbury-nj.html": "/locations/woodbury-nj/",
  "/services/roller-repair": "/services/garage-door-roller-hinge-repair/",
  "/services/roller-repair/": "/services/garage-door-roller-hinge-repair/"
};
export function canonicalPath(p) {
  if (legacy[p]) return legacy[p];
  if (p.endsWith('/index.html') && routes.has(p.slice(0,-10))) return p.slice(0,-10);
  if (p.endsWith('.html') && routes.has(p.slice(0,-5)+'/')) return p.slice(0,-5)+'/';
  if (!p.endsWith('/') && routes.has(p+'/')) return p+'/';
  return p;
}
