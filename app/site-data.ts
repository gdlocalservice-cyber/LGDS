export const SITE_URL = "https://www.localgaragedoorsvc.com";
export const PHONE_DISPLAY = "267-438-6494";
export const PHONE_LINK = "tel:2674386494";
export const EMAIL = "GDlocalservice@gmail.com";
export const WHATSAPP = "https://wa.me/12674386494";

export type Faq = { q: string; a: string };

export type ServicePage = {
  slug: string;
  title: string;
  navTitle: string;
  priority: "High" | "Medium" | "Low";
  image: string;
  proofImage: string;
  indexImage: string;
  doorImage: string;
  imageAlt: string;
  summary: string;
  answer: string;
  signs: string[];
  includes: string[];
  faqs: Faq[];
};

const baseServices: Omit<ServicePage, "image" | "proofImage" | "indexImage" | "doorImage">[] = [
  {
    slug: "garage-door-repair",
    title: "Garage Door Repair",
    navTitle: "Garage Door Repair",
    priority: "High",
    imageAlt: "Technician inspecting garage door track and hardware",
    summary: "Diagnosis and repair for garage doors that are stuck, uneven, noisy, heavy, damaged or not responding normally.",
    answer: "Garage door repair starts with identifying the failed part and checking how the full door system is moving. We explain the practical repair options and review pricing before approved work begins.",
    signs: ["The door will not open or close", "The door is crooked or off track", "A cable, roller or hinge looks damaged", "The door is unusually noisy or heavy"],
    includes: ["System inspection and diagnosis", "Repair options explained", "Pricing reviewed before work", "Safety and operation check after repair"],
    faqs: [
      { q: "Can most garage door problems be repaired?", a: "Many common problems can be repaired when the door and supporting system can be returned to safe, reliable operation. If replacement is the more practical path, we explain why." },
      { q: "Will I know the price before work starts?", a: "Yes. The technician diagnoses the issue, explains the available options and reviews pricing before approved work begins." },
    ],
  },
  {
    slug: "broken-spring-replacement",
    title: "Broken Garage Door Spring Replacement",
    navTitle: "Broken Spring Replacement",
    priority: "High",
    imageAlt: "Technician measuring a garage door spring system",
    summary: "Torsion and extension spring service for doors that will not lift, feel extremely heavy or show a visible spring gap.",
    answer: "A broken garage door spring can make the door too heavy for safe normal operation. Stop using the door and have the spring system inspected; spring replacement should be performed with the correct parts and tools.",
    signs: ["A visible gap in the torsion spring", "A loud bang came from the garage", "The opener strains but the door barely moves", "The door feels unusually heavy"],
    includes: ["Torsion or extension spring inspection", "Door weight and balance check", "Appropriate spring replacement options", "Final movement and safety check"],
    faqs: [
      { q: "Is it safe to replace a garage door spring myself?", a: "No. Garage door springs store significant energy and can cause serious injury. Keep people away from the door and arrange professional service." },
      { q: "Do you work on torsion and extension springs?", a: "Yes. We inspect and service both common spring-system types." },
    ],
  },
  {
    slug: "garage-door-cable-repair",
    title: "Garage Door Cable Repair",
    navTitle: "Cable Repair",
    priority: "High",
    imageAlt: "Close view of garage door track and cable hardware",
    summary: "Cable inspection and repair when a door hangs unevenly, a cable is loose or frayed, or the door is no longer moving correctly.",
    answer: "Garage door cables work under tension with the spring system. A loose, frayed or broken cable can leave the door uneven and unsafe to operate, so the system should be inspected before the door is used again.",
    signs: ["A cable is loose, frayed or off the drum", "One side of the door sits lower", "The door jerks or binds", "The door is stuck partway"],
    includes: ["Cable and drum inspection", "Related spring and track check", "Repair or replacement options", "Door travel and balance test"],
    faqs: [{ q: "Can I put a cable back on the drum myself?", a: "The cable may still be connected to a tensioned spring system. For safety, stop operating the door and have the complete system inspected." }],
  },
  {
    slug: "off-track-garage-door-repair",
    title: "Off-Track Garage Door Repair",
    navTitle: "Off-Track Repair",
    priority: "High",
    imageAlt: "Garage door track and roller hardware being inspected",
    summary: "Careful service for doors that are crooked, jammed, partially out of the tracks or damaged after an impact.",
    answer: "An off-track garage door should not be forced or repeatedly operated. We inspect the tracks, rollers, cables and door sections to determine what must be corrected before safe movement can be restored.",
    signs: ["A roller has left the track", "The door is visibly crooked", "A track is bent or separated", "The door jammed after an impact"],
    includes: ["Track, roller and cable diagnosis", "Door-section damage check", "Repair options before work", "Alignment and operation test"],
    faqs: [{ q: "Should I close an off-track door?", a: "Do not force it. Keep people and vehicles clear, disconnect use of the opener if safe to do so, and request service." }],
  },
  {
    slug: "garage-door-roller-hinge-repair",
    title: "Garage Door Roller, Hinge & Hardware Repair",
    navTitle: "Rollers, Hinges & Hardware",
    priority: "Medium",
    imageAlt: "Garage door roller, hinge and track hardware",
    summary: "Repair for worn rollers, loose or damaged hinges, brackets and related moving hardware.",
    answer: "Worn rollers and damaged hinges can make a garage door noisy, unstable or rough in motion. We inspect the connected hardware so the repair addresses the cause rather than only the sound.",
    signs: ["Grinding or rattling while moving", "A roller is cracked or missing", "A hinge is bent or pulling away", "The door shakes during travel"],
    includes: ["Roller and hinge inspection", "Fastener and bracket check", "Repair or replacement options", "Movement and noise check"],
    faqs: [{ q: "Do noisy rollers always need replacement?", a: "Not always. Noise can also come from alignment, loose hardware or other moving parts. Inspection determines the useful repair." }],
  },
  {
    slug: "garage-door-balance-adjustment",
    title: "Garage Door Adjustment & Balance",
    navTitle: "Adjustment & Balance",
    priority: "Low",
    imageAlt: "Garage door spring and balance system inspection",
    summary: "System adjustment for doors that drift, feel heavy, close unevenly or place excess strain on the opener.",
    answer: "A properly balanced garage door should move predictably and should not rely on the opener to carry the full door weight. Balance concerns may involve springs, cables, tracks or hardware and require a full-system check.",
    signs: ["The door drops or rises on its own", "The opener sounds strained", "The bottom seal meets the floor unevenly", "Movement is rough or inconsistent"],
    includes: ["Door balance assessment", "Spring and cable inspection", "Track and hardware check", "Adjustment options and final test"],
    faqs: [{ q: "Can an unbalanced door damage the opener?", a: "It can place unnecessary strain on the opener and other components. Addressing the underlying balance issue helps the system work as intended." }],
  },
  {
    slug: "garage-door-safety-inspection",
    title: "Garage Door Safety Inspection",
    navTitle: "Safety Inspection",
    priority: "Low",
    imageAlt: "Garage door system receiving a safety inspection",
    summary: "A practical inspection of the door, springs, cables, tracks, hardware, opener response and general operation.",
    answer: "A garage door safety inspection checks the parts that lift, guide and stop the door. The goal is to identify visible wear, unsafe movement or a failing component before recommending work.",
    signs: ["The system has not been checked recently", "The door behaves differently than before", "Hardware looks loose or worn", "You are purchasing or preparing a property"],
    includes: ["Visual hardware inspection", "Movement and balance observations", "Opener response check", "Clear explanation of findings"],
    faqs: [{ q: "Is a safety inspection included with repair?", a: "A complimentary safety inspection is available with any completed repair. Mention the website offer when scheduling." }],
  },
  {
    slug: "noisy-heavy-garage-door",
    title: "Noisy or Heavy Garage Door Service",
    navTitle: "Noisy or Heavy Door",
    priority: "Low",
    imageAlt: "Garage door moving hardware and track system",
    summary: "Diagnosis for doors that grind, squeal, bang, vibrate or suddenly feel heavier than normal.",
    answer: "A noisy or heavy door is a symptom, not a single repair. The cause may involve balance, rollers, hinges, tracks, springs or the opener, so we inspect the system before recommending work.",
    signs: ["New grinding, squealing or popping sounds", "The door feels heavier by hand", "The opener shakes or strains", "The door vibrates in the tracks"],
    includes: ["Noise-source diagnosis", "Balance and movement check", "Hardware and opener inspection", "Repair options explained"],
    faqs: [{ q: "Will lubrication fix every noisy door?", a: "No. Lubrication can help suitable moving parts, but damaged, loose or misaligned components may need repair." }],
  },
  {
    slug: "garage-door-panel-replacement",
    title: "Garage Door Panel Replacement",
    navTitle: "Panel Replacement",
    priority: "Medium",
    imageAlt: "Residential garage door panels after installation",
    summary: "Assessment of dented, cracked or damaged sections to determine whether a panel repair, panel replacement or full door replacement is practical.",
    answer: "Panel replacement may be possible when a compatible section is available and the remaining door is in suitable condition. We compare the repair path with full replacement when both are realistic options.",
    signs: ["One section is dented or cracked", "A panel was damaged by impact", "A section is separating at the hinge", "The damage affects sealing or travel"],
    includes: ["Door and section assessment", "Compatibility considerations", "Repair-versus-replacement options", "Installation and operation check"],
    faqs: [{ q: "Can one garage door panel be replaced?", a: "Sometimes. It depends on the door model, section availability, color, age and whether the rest of the door can continue operating safely." }],
  },
  {
    slug: "garage-door-opener-repair",
    title: "Garage Door Opener Repair",
    navTitle: "Opener Repair",
    priority: "High",
    imageAlt: "Garage door opener and rail system inside a garage",
    summary: "Troubleshooting for openers that will not run, reverse unexpectedly, make unusual noises or have control and sensor problems.",
    answer: "Opener repair begins by separating an opener problem from a door-system problem. We inspect the response, sensors, controls, rail and door movement before recommending repair or replacement.",
    signs: ["The motor runs but the door does not move", "The door reverses or will not close", "Remotes or wall controls are inconsistent", "The opener is unusually loud"],
    includes: ["Opener and control diagnosis", "Safety-sensor check", "Door movement assessment", "Repair or replacement options"],
    faqs: [{ q: "Why does my garage door opener run but not move the door?", a: "The cause may be inside the opener, the trolley or the door system itself. Avoid repeated operation and have both systems checked." }],
  },
  {
    slug: "garage-door-opener-installation",
    title: "Garage Door Opener Installation",
    navTitle: "Opener Installation",
    priority: "High",
    imageAlt: "Installed garage door opener in a residential garage",
    summary: "Installation and setup of compatible garage door openers, including common smart-control and battery-backup options.",
    answer: "A new opener should be selected for the door’s size, weight, condition and desired features. We review compatible options, install the selected system and confirm normal operation.",
    signs: ["The existing opener is unreliable or outdated", "Repair is not practical", "You want quieter operation", "You want smart controls or battery backup"],
    includes: ["Compatibility review", "Opener installation", "Control and sensor setup", "Final operation check"],
    faqs: [{ q: "Which opener brands do you install?", a: "We work with major garage door and opener brands. The appropriate option depends on the door and features you select." }],
  },
  {
    slug: "new-garage-door-installation",
    title: "New Garage Door Installation",
    navTitle: "New Garage Doors",
    priority: "Medium",
    imageAlt: "Pair of newly installed residential garage doors",
    summary: "Residential garage door replacement and installation with options selected for the opening, property and intended use.",
    answer: "New garage door installation includes evaluating the opening, reviewing suitable door options and installing the approved door system. Eligible installations may include a labor warranty of up to 10 years.",
    signs: ["The existing door has widespread damage", "Sections or hardware are no longer practical to repair", "You want a different style or insulation level", "You are finishing a new garage opening"],
    includes: ["Opening and door assessment", "Door option review", "Approved installation", "Final balance and operation check"],
    faqs: [
      { q: "Is there a website offer for a new door?", a: "$100 off is available on an eligible new garage door installation. Mention the website offer when scheduling." },
      { q: "What warranty is available?", a: "Labor warranty options up to 10 years are available on eligible installations. Exact coverage is included with the proposal." },
    ],
  },
  {
    slug: "garage-door-maintenance",
    title: "Garage Door Maintenance & Lubrication",
    navTitle: "Maintenance & Lubrication",
    priority: "Low",
    imageAlt: "Garage door moving system being inspected",
    summary: "Routine inspection, suitable lubrication and adjustment recommendations for a working garage door system.",
    answer: "Maintenance helps identify wear and movement changes before they become larger problems. We inspect the moving system, use appropriate lubrication where suitable and explain any repair concerns found.",
    signs: ["The door has become noisier", "Movement is less smooth", "Hardware appears loose", "The system has not been serviced recently"],
    includes: ["Visual system check", "Suitable lubrication", "Hardware and movement observations", "Recommendations when repair is needed"],
    faqs: [{ q: "How often should a garage door be maintained?", a: "Frequency depends on use, age and environment. If the door changes in sound, speed, balance or movement, arrange an inspection rather than waiting for a set date." }],
  },
  {
    slug: "commercial-garage-door-service",
    title: "Commercial Garage Door Service",
    navTitle: "Commercial Garage Doors",
    priority: "Low",
    imageAlt: "Commercial roll-up garage door at a service opening",
    summary: "Repair and replacement for standard commercial garage doors and overhead door systems.",
    answer: "Commercial garage door service covers common repair and replacement needs for standard overhead garage doors. We confirm the door type and problem before scheduling the appropriate visit.",
    signs: ["The commercial door will not open or close", "Cables or hardware are damaged", "The door is off track or uneven", "The existing door needs replacement"],
    includes: ["Commercial door assessment", "Common hardware and movement diagnosis", "Repair or replacement options", "Scheduling based on door type"],
    faqs: [{ q: "Do you service every industrial door system?", a: "We advertise service for standard commercial garage doors and roll-up doors. Contact us with the door type so we can confirm availability." }],
  },
  {
    slug: "commercial-roll-up-door-service",
    title: "Commercial Roll-Up Door Repair & Replacement",
    navTitle: "Commercial Roll-Up Doors",
    priority: "Low",
    imageAlt: "Commercial roll-up door and bottom hardware",
    summary: "Diagnosis, repair and replacement options for standard commercial roll-up doors.",
    answer: "A roll-up door problem may involve the curtain, guides, bottom hardware, operator or lifting system. We confirm the door type and inspect the related system before recommending work.",
    signs: ["The curtain binds in the guides", "The door will not travel normally", "Bottom or side hardware is damaged", "The existing roll-up door needs replacement"],
    includes: ["Door-type confirmation", "Guide and hardware inspection", "Repair or replacement options", "Operation check after approved work"],
    faqs: [{ q: "Can you confirm service from a description?", a: "Call or send a request with the door type and what it is doing. We will confirm whether it fits the commercial service offered." }],
  },
];

const serviceMediaBySlug: Record<string, Pick<ServicePage, "image" | "proofImage" | "indexImage" | "doorImage">> = {
  "garage-door-repair": {
    image: "/assets/media/services/garage-door-repair-active-service.webp",
    proofImage: "/assets/media/services/garage-door-repair-track-inspection.webp",
    indexImage: "/assets/media/services/garage-door-repair-damaged-door.webp",
    doorImage: "/assets/media/services/garage-door-repair-track-card.webp",
  },
  "broken-spring-replacement": {
    image: "/assets/media/services/broken-spring-system-inspection.webp",
    proofImage: "/assets/media/services/broken-spring-parts.webp",
    indexImage: "/assets/media/services/broken-spring-replacement-card.webp",
    doorImage: "/assets/media/services/broken-spring-measurement.webp",
  },
  "garage-door-cable-repair": {
    image: "/assets/media/services/garage-door-cable-drum.webp",
    proofImage: "/assets/media/services/garage-door-cable-parts.webp",
    indexImage: "/assets/media/services/garage-door-cable-closeup.webp",
    doorImage: "/assets/media/services/garage-door-cable-repair-card.webp",
  },
  "off-track-garage-door-repair": {
    image: "/assets/media/services/off-track-garage-door.webp",
    proofImage: "/assets/media/services/off-track-door-damage.webp",
    indexImage: "/assets/media/services/off-track-rail-alignment.webp",
    doorImage: "/assets/media/services/off-track-repair-card.webp",
  },
  "garage-door-roller-hinge-repair": {
    image: "/assets/media/services/garage-door-roller-hinge.webp",
    proofImage: "/assets/media/services/garage-door-roller-bracket.webp",
    indexImage: "/assets/media/services/garage-door-hardware-card.webp",
    doorImage: "/assets/media/services/garage-door-hinge-bearing.webp",
  },
  "garage-door-balance-adjustment": {
    image: "/assets/media/services/garage-door-balance-pulley.webp",
    proofImage: "/assets/media/services/garage-door-balance-system.webp",
    indexImage: "/assets/media/services/garage-door-adjustment-track.webp",
    doorImage: "/assets/media/services/garage-door-balance-card.webp",
  },
  "garage-door-safety-inspection": {
    image: "/assets/media/services/garage-door-safety-inspection.webp",
    proofImage: "/assets/media/services/garage-door-safety-ladder.webp",
    indexImage: "/assets/media/services/garage-door-inspection-card.webp",
    doorImage: "/assets/media/services/garage-door-safety-hardware.webp",
  },
  "noisy-heavy-garage-door": {
    image: "/assets/media/services/noisy-heavy-garage-door.webp",
    proofImage: "/assets/media/services/noisy-door-spring-system.webp",
    indexImage: "/assets/media/services/heavy-garage-door-card.webp",
    doorImage: "/assets/media/services/noisy-door-inspection.webp",
  },
  "garage-door-panel-replacement": {
    image: "/assets/media/services/garage-door-panel-replacement.webp",
    proofImage: "/assets/media/services/garage-door-panel-detail.webp",
    indexImage: "/assets/media/services/garage-door-panel-card.webp",
    doorImage: "/assets/media/services/residential-door-panel.webp",
  },
  "garage-door-opener-repair": {
    image: "/assets/media/services/garage-door-opener-repair.webp",
    proofImage: "/assets/media/services/garage-door-opener-parts.webp",
    indexImage: "/assets/media/services/garage-door-opener-motor.webp",
    doorImage: "/assets/media/services/opener-repair-card.webp",
  },
  "garage-door-opener-installation": {
    image: "/assets/media/services/garage-door-opener-installation.webp",
    proofImage: "/assets/media/services/installed-garage-door-opener.webp",
    indexImage: "/assets/media/services/new-garage-door-opener-card.webp",
    doorImage: "/assets/media/services/residential-opener-installation.webp",
  },
  "new-garage-door-installation": {
    image: "/assets/media/services/new-garage-door-installation.webp",
    proofImage: "/assets/media/services/new-garage-door-completed.webp",
    indexImage: "/assets/media/services/new-garage-doors-card.webp",
    doorImage: "/assets/media/services/residential-new-door.webp",
  },
  "garage-door-maintenance": {
    image: "/assets/services/garage-door-spring-system-inspection.webp",
    proofImage: "/assets/media/services/garage-door-maintenance-work.webp",
    indexImage: "/assets/media/services/garage-door-maintenance-card.webp",
    doorImage: "/assets/media/services/residential-door-maintenance.webp",
  },
  "commercial-garage-door-service": {
    image: "/assets/media/services/commercial-garage-door-service.webp",
    proofImage: "/assets/media/services/commercial-garage-door-system.webp",
    indexImage: "/assets/media/services/commercial-garage-door-card.webp",
    doorImage: "/assets/media/services/commercial-sectional-door.webp",
  },
  "commercial-roll-up-door-service": {
    image: "/assets/media/services/commercial-roll-up-door-service.webp",
    proofImage: "/assets/media/services/commercial-roll-up-door-open.webp",
    indexImage: "/assets/media/services/commercial-roll-up-repair-card.webp",
    doorImage: "/assets/media/services/commercial-roll-up-door-card.webp",
  },
};

export const services: ServicePage[] = baseServices.map((service) => ({
  ...service,
  ...serviceMediaBySlug[service.slug],
}));

export type LocationPage = {
  slug: string;
  name: string;
  state: "PA" | "NJ" | "DE";
  region: string;
  nearby: string[];
  localNote: string;
  serviceContext: string;
  requestTip: string;
  focusServiceSlugs: string[];
  image: string;
};

const locationRows: Omit<LocationPage, "image">[] = [
  { slug: "pennsylvania", name: "Pennsylvania", state: "PA", region: "Pennsylvania service area", nearby: ["Philadelphia", "Allentown", "Media", "King of Prussia", "Lansdale", "Collegeville"], localNote: "Our Pennsylvania coverage includes urban, suburban and residential properties across the greater Philadelphia and Lehigh Valley service area. The cities shown are examples, and requests from surrounding communities are welcome." },
  { slug: "philadelphia-pa", name: "Philadelphia", state: "PA", region: "Philadelphia County", nearby: ["Center City", "Northeast Philadelphia", "Northwest Philadelphia", "South Philadelphia", "West Philadelphia"], localNote: "Philadelphia homes and small commercial properties use many door ages, sizes and access layouts. We confirm the door problem and location before scheduling so the visit fits the property." },
  { slug: "allentown-pa", name: "Allentown", state: "PA", region: "Lehigh County", nearby: ["Bethlehem", "Emmaus", "Whitehall", "Macungie", "Lehigh Valley"], localNote: "Allentown-area service covers common residential repair, opener and replacement needs. Appointment availability depends on location and the day’s route." },
  { slug: "bucks-county-pa", name: "Bucks County", state: "PA", region: "Bucks County", nearby: ["Levittown", "Bensalem", "Langhorne", "Yardley", "Newtown"], localNote: "Bucks County service includes repair and installation options for homes throughout the county, with appointment availability confirmed after the request is received." },
  { slug: "king-of-prussia-pa", name: "King of Prussia", state: "PA", region: "Montgomery County", nearby: ["Wayne", "Norristown", "Conshohocken", "Bridgeport", "Valley Forge"], localNote: "King of Prussia properties include attached residential garages, larger detached garages and common commercial overhead doors. We schedule after confirming the door type and issue." },
  { slug: "norristown-pa", name: "Norristown", state: "PA", region: "Montgomery County", nearby: ["East Norriton", "West Norriton", "Plymouth Meeting", "Conshohocken", "Blue Bell"], localNote: "Norristown-area homeowners can request repair, opener service and door replacement. Pricing is reviewed before approved work begins." },
  { slug: "media-pa", name: "Media", state: "PA", region: "Delaware County", nearby: ["Springfield", "Swarthmore", "Wallingford", "Glen Mills", "Newtown Square"], localNote: "Media-area service includes common spring, cable, track, opener and replacement work for homes across central Delaware County." },
  { slug: "kennett-square-pa", name: "Kennett Square", state: "PA", region: "Chester County", nearby: ["Avondale", "Chadds Ford", "West Grove", "Unionville", "Longwood"], localNote: "Kennett Square properties often include attached and detached garages. We confirm the opening, door system and schedule before the visit." },
  { slug: "lansdale-pa", name: "Lansdale", state: "PA", region: "Montgomery County", nearby: ["North Wales", "Hatfield", "Montgomeryville", "Kulpsville", "Towamencin"], localNote: "Lansdale-area service covers common residential door and opener problems, with appointment availability confirmed after the request is received." },
  { slug: "collegeville-pa", name: "Collegeville", state: "PA", region: "Montgomery County", nearby: ["Trappe", "Royersford", "Skippack", "Phoenixville", "Upper Providence"], localNote: "Collegeville homeowners can request diagnosis for broken springs, cables, openers, off-track doors and replacement needs." },
  { slug: "levittown-pa", name: "Levittown", state: "PA", region: "Bucks County", nearby: ["Fairless Hills", "Langhorne", "Morrisville", "Bristol", "Yardley"], localNote: "Levittown service focuses on practical repair and replacement options for the garage door systems found throughout the surrounding Bucks County communities." },
  { slug: "new-jersey", name: "New Jersey", state: "NJ", region: "New Jersey service area", nearby: ["Cherry Hill", "Moorestown", "Marlton", "Woodbury", "Willingboro", "Trenton"], localNote: "New Jersey service includes communities across the western and central portions of the state. The cities shown are examples, and requests from surrounding communities are welcome." },
  { slug: "cherry-hill-nj", name: "Cherry Hill", state: "NJ", region: "Camden County", nearby: ["Haddonfield", "Voorhees", "Pennsauken", "Collingswood", "Maple Shade"], localNote: "Cherry Hill homeowners can request repair, opener service and new-door installation for attached and detached residential garages." },
  { slug: "marlton-nj", name: "Marlton", state: "NJ", region: "Burlington County", nearby: ["Evesham", "Medford", "Mount Laurel", "Voorhees", "Cherry Hill"], localNote: "Marlton-area service covers common door and opener problems, with the technician calling before arrival and pricing reviewed before work." },
  { slug: "moorestown-nj", name: "Moorestown", state: "NJ", region: "Burlington County", nearby: ["Mount Laurel", "Maple Shade", "Cinnaminson", "Riverton", "Cherry Hill"], localNote: "Moorestown service includes spring, cable, opener and new-door needs for residential properties across the surrounding area." },
  { slug: "trenton-nj", name: "Trenton", state: "NJ", region: "Mercer County", nearby: ["Hamilton", "Ewing", "Lawrence Township", "Princeton area", "Morrisville"], localNote: "Trenton-area service includes common residential garage door and opener problems and standard commercial garage doors. Appointment availability is confirmed after the request is received." },
  { slug: "willingboro-nj", name: "Willingboro", state: "NJ", region: "Burlington County", nearby: ["Burlington", "Delran", "Mount Holly", "Westampton", "Edgewater Park"], localNote: "Willingboro homeowners can request diagnosis and service for doors that will not open, broken springs, cable problems, openers and replacement." },
  { slug: "woodbury-nj", name: "Woodbury", state: "NJ", region: "Gloucester County", nearby: ["Deptford", "Westville", "Woodbury Heights", "Mantua", "Gloucester City"], localNote: "Woodbury-area service includes repairs, opener work and door replacement, with appointment availability confirmed for the specific address." },
  { slug: "delaware", name: "Delaware", state: "DE", region: "Delaware service area", nearby: ["Wilmington", "Newark", "Middletown", "Smyrna", "New Castle"], localNote: "Delaware service covers northern and central communities, with repair and installation for common residential garage door systems. The cities shown are examples, and requests from surrounding communities are welcome." },
  { slug: "wilmington-de", name: "Wilmington", state: "DE", region: "New Castle County", nearby: ["North Wilmington", "Elsmere", "New Castle", "Claymont", "Greenville"], localNote: "Wilmington homeowners can request service for common door, spring, cable, track and opener problems, plus door replacement." },
  { slug: "newark-de", name: "Newark", state: "DE", region: "New Castle County", nearby: ["Bear", "Glasgow", "Pike Creek", "Brookside", "Christiana"], localNote: "Newark-area service is available for common residential repairs, opener work and garage door installation, subject to route and schedule." },
  { slug: "middletown-de", name: "Middletown", state: "DE", region: "New Castle County", nearby: ["Odessa", "Townsend", "St. Georges", "Bear", "Smyrna"], localNote: "Middletown service covers growing residential areas with both existing-door repairs and new garage door or opener installations." },
  { slug: "smyrna-de", name: "Smyrna", state: "DE", region: "Kent and New Castle counties", nearby: ["Clayton", "Townsend", "Middletown", "Dover area", "Cheswold"], localNote: "Smyrna-area service covers common residential garage door systems, with appointment availability confirmed after the request is received." },
];

const locationImageBySlug: Record<string, string> = {
  pennsylvania: "/assets/media/locations/garage-door-service-pennsylvania.webp",
  "philadelphia-pa": "/assets/media/locations/garage-door-repair-philadelphia-pa.webp",
  "allentown-pa": "/assets/media/locations/garage-door-repair-allentown-pa.webp",
  "bucks-county-pa": "/assets/media/locations/garage-door-repair-bucks-county-pa.webp",
  "king-of-prussia-pa": "/assets/media/locations/garage-door-repair-king-of-prussia-pa.webp",
  "norristown-pa": "/assets/media/locations/garage-door-repair-norristown-pa.webp",
  "media-pa": "/assets/media/locations/garage-door-repair-media-pa.webp",
  "kennett-square-pa": "/assets/media/locations/garage-door-repair-kennett-square-pa.webp",
  "lansdale-pa": "/assets/media/locations/garage-door-repair-lansdale-pa.webp",
  "collegeville-pa": "/assets/media/locations/garage-door-repair-collegeville-pa.webp",
  "levittown-pa": "/assets/media/locations/garage-door-repair-levittown-pa.webp",
  "new-jersey": "/assets/media/locations/garage-door-service-new-jersey.webp",
  "cherry-hill-nj": "/assets/media/locations/garage-door-repair-cherry-hill-nj.webp",
  "marlton-nj": "/assets/media/locations/garage-door-repair-marlton-nj.webp",
  "moorestown-nj": "/assets/media/locations/garage-door-repair-moorestown-nj.webp",
  "trenton-nj": "/assets/media/locations/garage-door-repair-trenton-nj.webp",
  "willingboro-nj": "/assets/media/locations/garage-door-repair-willingboro-nj.webp",
  "woodbury-nj": "/assets/media/locations/garage-door-repair-woodbury-nj.webp",
  delaware: "/assets/media/locations/garage-door-service-delaware.webp",
  "wilmington-de": "/assets/media/locations/garage-door-repair-wilmington-de.webp",
  "newark-de": "/assets/media/locations/garage-door-repair-newark-de.webp",
  "middletown-de": "/assets/media/locations/garage-door-repair-middletown-de.webp",
  "smyrna-de": "/assets/media/locations/garage-door-repair-smyrna-de.webp",
};

const locationEnhancements: Record<string, Pick<LocationPage, "serviceContext" | "requestTip" | "focusServiceSlugs">> = {
  pennsylvania: {
    serviceContext: "The Pennsylvania service area spans several distinct routes, from Philadelphia and its surrounding counties to the Lehigh Valley. A request is confirmed against the day’s route before an appointment window is offered.",
    requestTip: "Include the Pennsylvania municipality, the door symptom and whether the door is currently open, closed or stuck between positions.",
    focusServiceSlugs: ["garage-door-repair", "broken-spring-replacement", "garage-door-opener-repair"],
  },
  "philadelphia-pa": {
    serviceContext: "Philadelphia service requests can involve different garage access arrangements and both residential and standard commercial doors. Sharing the neighborhood and the door’s current position helps the office prepare the visit correctly.",
    requestTip: "Include your Philadelphia neighborhood, whether a vehicle is trapped and any access detail the technician should know before arrival.",
    focusServiceSlugs: ["broken-spring-replacement", "garage-door-cable-repair", "commercial-garage-door-service"],
  },
  "allentown-pa": {
    serviceContext: "Allentown requests are scheduled as part of the Lehigh Valley route. The team confirms the address and the basic door or opener symptom before providing an available appointment window.",
    requestTip: "Tell us whether the issue is with the door, the opener or both, and whether the door can be operated safely at all.",
    focusServiceSlugs: ["garage-door-repair", "garage-door-opener-repair", "new-garage-door-installation"],
  },
  "bucks-county-pa": {
    serviceContext: "Because Bucks County covers a broad area, scheduling is based on the specific municipality rather than the county name alone. Homeowners can request focused repair, opener work or a replacement consultation.",
    requestTip: "Include the municipality and ZIP so the office can place the request on the correct Bucks County route.",
    focusServiceSlugs: ["garage-door-repair", "broken-spring-replacement", "new-garage-door-installation"],
  },
  "king-of-prussia-pa": {
    serviceContext: "King of Prussia requests may involve residential garage doors, openers or standard commercial overhead doors. Identifying the door type at the start keeps the request connected to the right service path.",
    requestTip: "Mention whether the property is residential or commercial and whether the problem is preventing the door from closing securely.",
    focusServiceSlugs: ["garage-door-opener-repair", "broken-spring-replacement", "commercial-garage-door-service"],
  },
  "norristown-pa": {
    serviceContext: "Norristown-area service covers common mechanical door failures, opener problems and replacement needs across nearby Montgomery County communities. The technician diagnoses the connected system before options are presented.",
    requestTip: "Describe what happens when you press the wall control and whether the door looks uneven, feels heavy or makes a new sound.",
    focusServiceSlugs: ["garage-door-cable-repair", "off-track-garage-door-repair", "garage-door-opener-repair"],
  },
  "media-pa": {
    serviceContext: "Media requests are coordinated with surrounding Delaware County communities. Spring, cable and track symptoms are treated as connected door-system problems rather than isolated parts.",
    requestTip: "If the door is crooked, off track or unusually heavy, stop operating it and include that detail in the request.",
    focusServiceSlugs: ["broken-spring-replacement", "garage-door-cable-repair", "off-track-garage-door-repair"],
  },
  "kennett-square-pa": {
    serviceContext: "Kennett Square-area homeowners can request service for attached or detached garage-door systems throughout the surrounding Chester County route. Door size, system type and access are confirmed before scheduling.",
    requestTip: "Include the number of doors, the approximate door size if known and whether the issue affects an attached or detached garage.",
    focusServiceSlugs: ["new-garage-door-installation", "garage-door-opener-installation", "garage-door-repair"],
  },
  "lansdale-pa": {
    serviceContext: "Lansdale service requests are grouped with nearby Montgomery County communities. The office confirms location and symptom first, while the technician checks the door and opener as one connected system.",
    requestTip: "Say whether the motor runs, the door begins to move and then reverses, or nothing happens at all.",
    focusServiceSlugs: ["garage-door-opener-repair", "broken-spring-replacement", "garage-door-balance-adjustment"],
  },
  "collegeville-pa": {
    serviceContext: "Collegeville homeowners can start with the symptom even when the failed part is unknown. Broken-spring, cable, off-track and opener concerns are narrowed down during the inspection.",
    requestTip: "Choose the closest symptom in the form and add any sound, movement or visible damage you noticed.",
    focusServiceSlugs: ["broken-spring-replacement", "garage-door-cable-repair", "garage-door-opener-repair"],
  },
  "levittown-pa": {
    serviceContext: "Levittown requests are coordinated with nearby Lower Bucks County communities. Repair is recommended when it can return the complete door system to safe and reliable use; otherwise replacement options can be reviewed.",
    requestTip: "Tell us whether the door still closes and locks, especially when security or a trapped vehicle is the immediate concern.",
    focusServiceSlugs: ["garage-door-repair", "garage-door-panel-replacement", "new-garage-door-installation"],
  },
  "new-jersey": {
    serviceContext: "New Jersey coverage is organized across western and central service routes. The city list provides useful examples, but it does not replace confirmation for the customer’s specific address.",
    requestTip: "Include the New Jersey municipality and ZIP along with the main door symptom so availability can be checked accurately.",
    focusServiceSlugs: ["garage-door-repair", "garage-door-opener-repair", "new-garage-door-installation"],
  },
  "cherry-hill-nj": {
    serviceContext: "Cherry Hill requests include common residential door and opener problems as well as new-door planning. The visit begins with a system inspection, followed by clear options and pricing before approved work.",
    requestTip: "If you are considering replacement, include how many doors are involved and whether you also need a new opener.",
    focusServiceSlugs: ["garage-door-opener-repair", "new-garage-door-installation", "garage-door-panel-replacement"],
  },
  "marlton-nj": {
    serviceContext: "Marlton-area service is coordinated with nearby Burlington and Camden County communities. The technician checks the operating system before recommending a focused repair or a broader replacement.",
    requestTip: "Describe whether the problem is constant or intermittent and whether it changes when using the remote or wall control.",
    focusServiceSlugs: ["garage-door-opener-repair", "noisy-heavy-garage-door", "garage-door-repair"],
  },
  "moorestown-nj": {
    serviceContext: "Moorestown homeowners can request mechanical repair, opener service or new-door planning. Spring and cable problems are inspected together with balance and related hardware.",
    requestTip: "For a spring or cable concern, keep the door in place and tell us whether it is fully closed, fully open or stuck partway.",
    focusServiceSlugs: ["broken-spring-replacement", "garage-door-cable-repair", "new-garage-door-installation"],
  },
  "trenton-nj": {
    serviceContext: "Trenton-area service covers residential systems and standard commercial garage doors across the surrounding Mercer County route. Commercial requests should identify the door as sectional or roll-up when possible.",
    requestTip: "Mention whether the request is residential or commercial and whether the opening must be secured before the next business day.",
    focusServiceSlugs: ["commercial-garage-door-service", "commercial-roll-up-door-service", "garage-door-repair"],
  },
  "willingboro-nj": {
    serviceContext: "Willingboro homeowners can request help for doors that will not open, visible cable problems, opener failures and replacement needs. Repeated operation should stop when the door is crooked or unusually heavy.",
    requestTip: "Tell us whether a vehicle is trapped and whether the opener is still connected to a damaged or uneven door.",
    focusServiceSlugs: ["broken-spring-replacement", "garage-door-cable-repair", "off-track-garage-door-repair"],
  },
  "woodbury-nj": {
    serviceContext: "Woodbury requests are coordinated with surrounding Gloucester County communities. The office confirms the address and issue before scheduling, and the technician reviews pricing before approved work begins.",
    requestTip: "Include the closest cross-community or ZIP when the mailing city differs from the municipality where service is needed.",
    focusServiceSlugs: ["garage-door-repair", "garage-door-opener-repair", "new-garage-door-installation"],
  },
  delaware: {
    serviceContext: "Delaware coverage is focused on northern and central communities. The listed cities are route examples, and a request from another community can still be reviewed for availability.",
    requestTip: "Include the Delaware city or community, ZIP and whether the request is for repair, an opener or a new door.",
    focusServiceSlugs: ["garage-door-repair", "garage-door-opener-repair", "new-garage-door-installation"],
  },
  "wilmington-de": {
    serviceContext: "Wilmington-area homeowners can request service for springs, cables, tracks, openers and replacement needs. The neighborhood and access details help the office plan the route and visit.",
    requestTip: "Include the Wilmington area or nearby community and note any driveway, alley or parking access detail that affects the garage.",
    focusServiceSlugs: ["garage-door-cable-repair", "off-track-garage-door-repair", "garage-door-opener-repair"],
  },
  "newark-de": {
    serviceContext: "Newark-area service covers common residential repair, opener and installation requests across nearby New Castle County communities. Availability is confirmed for the exact address.",
    requestTip: "Tell us if the door issue is preventing safe closing, blocking a vehicle or affecting more than one garage opening.",
    focusServiceSlugs: ["garage-door-opener-repair", "broken-spring-replacement", "new-garage-door-installation"],
  },
  "middletown-de": {
    serviceContext: "Middletown requests include existing-door repairs and planning for new garage doors or openers. Measurements and product choices are reviewed as part of the appropriate installation path.",
    requestTip: "For installation, include the number of openings and whether the request is for the door, opener or both.",
    focusServiceSlugs: ["new-garage-door-installation", "garage-door-opener-installation", "garage-door-repair"],
  },
  "smyrna-de": {
    serviceContext: "Smyrna-area requests are confirmed against the route for northern Kent and southern New Castle County communities. Homeowners can begin with the symptom even when the failed component is not known.",
    requestTip: "Describe the door’s movement, sound and current position; the office will confirm whether the route can accommodate the address.",
    focusServiceSlugs: ["garage-door-repair", "broken-spring-replacement", "garage-door-opener-repair"],
  },
};

export const locations: LocationPage[] = locationRows.map((location) => ({
  ...location,
  ...locationEnhancements[location.slug],
  image: locationImageBySlug[location.slug],
}));

export const commonFaqs: Faq[] = [
  { q: "How much does garage door repair cost?", a: "Cost depends on the door, the failed part and the repair required. We diagnose the problem, explain the available options and review pricing before approved work begins." },
  { q: "Can you come out today?", a: "Appointments may be available as soon as the same day depending on location, schedule and technician availability. Call or send a request and we will confirm the available window." },
  { q: "Is a broken garage door spring dangerous?", a: "Springs store significant energy and a broken spring can leave the door extremely heavy. Stop operating the door and arrange professional inspection." },
  { q: "Should I repair or replace my garage door?", a: "We recommend repair when it can return the door to safe, reliable operation and satisfy the customer’s needs. Otherwise, replacement may be the practical path." },
  { q: "Why does my opener run but the door does not move?", a: "The problem may be in the opener, trolley, spring or door hardware. Avoid repeated operation and have the door and opener inspected together." },
  { q: "What warranty do you provide?", a: "Labor warranty options up to 10 years are available on eligible installations. Exact coverage depends on the selected work and is included with the proposal." },
  { q: "Which brands do you service?", a: "We work with major garage door and opener brands, including Clopay, Wayne Dalton, Genie, LiftMaster, Chamberlain, Amarr, Raynor, Overhead Door and Windsor Republic." },
  { q: "What payment methods do you accept?", a: "We accept major credit cards, checks, cash and Zelle. Third-party financing may be available for qualifying projects." },
  { q: "Are you open on Sunday?", a: "Yes. Sunday operating hours are 7:00 AM to 10:00 PM. Monday through Thursday hours are also 7:00 AM to 10:00 PM; Friday is 7:00 AM to 1:00 PM and Saturday is closed." },
  { q: "What happens if I contact you after hours?", a: "Our automated intake can collect your information after hours. A team member will return the call during the next operating morning." },
];

export const reviews = [
  { initials: "S.K.", text: "The opener replacement was efficient and professional. Everything was explained clearly, and the new system worked perfectly." },
  { initials: "J.S.", text: "Pricing was clearly laid out beforehand, and several repairs were completed in a timely manner during the initial visit." },
  { initials: "A.K.", text: "The spring-system work was extremely thorough. Every detail and the estimated cost were explained before the repair." },
  { initials: "D.G.", text: "The old opener was assessed and a quiet replacement was recommended with battery backup and app control." },
  { initials: "G.C.", text: "The technician was professional, explained everything clearly, and the door is now working perfectly." },
  { initials: "J.C.", text: "The installation and cleanup were timely and excellent, with trustworthy and professional service throughout." },
];

export const brands = [
  { name: "Local Garage Door Service", src: "/assets/logo-nav.webp" },
  { name: "Clopay", src: "/assets/brands/clopay.png" },
  { name: "Genie", src: "/assets/brands/genie.png" },
  { name: "Windsor Republic Doors", src: "/assets/brands/windsor.png" },
  { name: "Wayne Dalton", src: "/assets/brands/wayne-dalton.png" },
  { name: "Raynor", src: "/assets/brands/raynor.png" },
  { name: "Overhead Door", src: "/assets/brands/overhead-door.png" },
  { name: "LiftMaster", src: "/assets/brands/liftmaster.png" },
  { name: "Chamberlain", src: "/assets/brands/chamberlain.png" },
  { name: "Amarr", src: "/assets/brands/amarr.png" },
];

export const blogPosts = [
  {
    slug: "signs-of-a-broken-garage-door-spring",
    title: "Signs of a Broken Garage Door Spring",
    description: "How to recognize common broken-spring symptoms and what to do without putting yourself near a tensioned system.",
    sections: [
      { h: "The most common signs", p: "A visible gap in a torsion spring, a loud bang from the garage, a door that suddenly feels extremely heavy, or an opener that strains without lifting can all point to a spring-system failure." },
      { h: "What to do next", p: "Stop operating the door and keep people, pets and vehicles clear. Springs and cables work under high tension, so this is not a safe do-it-yourself repair." },
      { h: "What a service visit checks", p: "The technician inspects the spring type, door weight, cables, drums, balance and related hardware before explaining the suitable repair options and pricing." },
    ],
  },
  {
    slug: "repair-or-replace-a-garage-door",
    title: "Should You Repair or Replace a Garage Door?",
    description: "A practical way to compare a focused repair with panel or full-door replacement.",
    sections: [
      { h: "When repair makes sense", p: "Repair is usually the useful option when correcting the failed part can return the complete door system to safe, reliable operation and the remaining door is in suitable condition." },
      { h: "When replacement deserves consideration", p: "Widespread section damage, unavailable matching panels, repeated system problems or a door that no longer fits the property’s needs can make replacement more practical." },
      { h: "Compare both paths honestly", p: "When repair and replacement are both realistic, ask for the scope, expected result and price of each. The decision should match the property, budget and intended use." },
    ],
  },
  {
    slug: "garage-door-opener-troubleshooting-guide",
    title: "Garage Door Opener Troubleshooting: Safe First Checks",
    description: "A few safe observations that help explain an opener problem without dismantling the door or motor.",
    sections: [
      { h: "Observe before resetting", p: "Note whether the motor runs, the lights flash, the door begins to move, or the system reverses. Those details help separate a control problem from a door-system problem." },
      { h: "Check the simple items", p: "Confirm the opener has power, the remote batteries are working and nothing is visibly blocking the photo-eye path. Do not loosen springs, cables or structural hardware." },
      { h: "Know when to stop", p: "If the door is crooked, unusually heavy, off track or connected to a broken spring, stop operating the opener. The door system should be inspected before the motor is tested again." },
    ],
  },
];

export function serviceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function locationBySlug(slug: string) {
  return locations.find((location) => location.slug === slug);
}
