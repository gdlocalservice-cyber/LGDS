'use strict';

// Editorial changes use only existing services and business facts. No invented
// local jobs, neighborhoods, reviews, response times or coverage promises.
const serviceNotes = {
  'broken-spring-replacement': 'Leave the door in place if a spring is broken. Tell us whether it is open, closed or stuck partway so we can plan the visit.',
  'commercial-garage-door-service': 'Include the door type and opening size, if known, and explain how the problem affects access to the property.',
  'commercial-roll-up-door-service': 'Tell us whether the door is manual or motorized and where it stops. Keep the opening clear if the curtain or guides are damaged.',
  'emergency-garage-door-service': 'When you call, tell us if the opening is unsecured or a vehicle is trapped. We will confirm availability before offering an appointment.',
  'garage-door-balance-adjustment': 'If the door suddenly feels heavy or sits unevenly, stop using it. The inspection determines whether adjustment or a repair is needed.',
  'garage-door-cable-repair': 'Do not pull a loose cable back into position. Leave the door in place and tell us which side is affected.',
  'garage-door-maintenance': 'Mention any new noise or change in movement. Maintenance does not replace a repair when a spring, cable or other part has failed.',
  'garage-door-opener-installation': 'Tell us which features matter to you, such as battery backup or phone control. We will review options that suit the existing door.',
  'garage-door-opener-repair': 'Tell us whether the wall control, remote and keypad behave differently, and whether you hear the motor running.',
  'garage-door-panel-replacement': 'If available, have the door brand and model ready. A matching panel must fit the existing door; a similar appearance alone is not enough.',
  'garage-door-repair': 'You do not need to identify the broken part before calling. Describe what the door does and when the problem started.',
  'garage-door-roller-hinge-repair': 'Mention where the noise or rough movement occurs. Damaged hardware can affect nearby parts, so the inspection covers more than the noisy spot.',
  'garage-door-safety-inspection': 'Tell the technician about recent repairs, impacts or changes in operation. We will explain what needs attention before you decide on work.',
  'new-garage-door-installation': 'Include the number of doors and your preferences for style, insulation and windows. Measurements and compatible hardware are confirmed before installation.',
  'noisy-heavy-garage-door': 'Describe the sound and where it occurs during travel. Stop operating the door if it is suddenly heavy, crooked or unstable.',
  'off-track-garage-door-repair': 'Keep people away from the opening. Do not force the door along the track or try to pull it straight with the opener.',
  'same-day-garage-door-service': 'Have your ZIP code and a short description ready when you call. We will confirm whether an appointment is available today.'
};

module.exports = function editorial($, file) {
  const copyChanges = new Map();
  $('main p,main h2').each((_,el)=>{
    const node=$(el), old=node.text().trim();
    let next=old;
    if(old==='Selected Google review excerpts are presented as lightweight site content, with a direct link to the public review profile.') next='Read selected Google reviews below, or visit our Google profile to see the full reviews.';
    if(/^\d+ service paths$/.test(old)) next=old.replace('service paths','services');
    if(old==='Every common residential service path.') next='Services for your home';
    if(old.startsWith('This page highlights ')) next=old.replace('This page highlights ','You can request ').replace('Other listed residential and standard commercial garage door services can also be requested.','For another door or opener problem, describe what happened in your service request.');
    if(old.includes('keeps the request connected to the right service path')) next=old.replace('Identifying the door type at the start keeps the request connected to the right service path.','Tell us which type of door you have when you contact us.');
    if(next!==old && !node.find('a').length) {node.text(next);copyChanges.set(old,next);}
  });
  // Keep FAQ answers in structured data aligned with the visible wording.
  $('script[type="application/ld+json"]').each((_,el)=>{
    const data=JSON.parse($(el).text());
    function replace(value) {
      if(typeof value==='string') return copyChanges.get(value)||value;
      if(Array.isArray(value)) return value.map(replace);
      if(value && typeof value==='object') for(const key of Object.keys(value)) value[key]=replace(value[key]);
      return value;
    }
    if(copyChanges.size) $(el).text(JSON.stringify(replace(data)));
  });
  const service = /^services\/([^/]+)\/index\.html$/.exec(file);
  const location = /^locations\/([^/]+)\/index\.html$/.exec(file);
  if (!service && !location) return false;
  const headings = {
    'What this service solves': 'How we can help',
    'A clear service visit': 'During your appointment',
    'Diagnosis before recommendation.': 'We check the problem before recommending work',
    'Clear answers before you schedule.': 'Questions about this service',
    'Explore the connected repair paths.': 'Related services',
    'Clear communication from request to repair.': 'From your call to the repair',
    'Answers tied to this service-area page.': 'Questions about service in your area',
    'Send the basics. We’ll follow up with availability.': 'Request a service appointment'
  };
  $('main h2').each((_,el)=>{
    const heading=$(el), value=heading.text().trim();
    if(headings[value]) heading.text(headings[value]);
    else if(location && /^Service paths highlighted for /.test(value)) heading.text('Repairs and installation');
    else if(location && /^What to include in your .* request\.$/.test(value)) heading.text('Before you contact us');
  });
  // Remove labels that describe the template rather than helping a customer.
  $('main .eyebrow').filter((_,el)=>[
    'Direct answer','Professional process','A better first message','Useful starting points'
  ].includes($(el).text().trim())).remove();
  if(service && serviceNotes[service[1]]) {
    $('.answer-section p').filter((_,el)=>$(el).text().trim()==='We recommend repair when it can return the door to safe, reliable operation and meet the customer’s needs. Otherwise, replacement may be the practical option.').text(serviceNotes[service[1]]);
  }
  if(location) {
    $('.location-answer p').filter((_,el)=>$(el).text().startsWith('The places shown on this page are examples')).text('Not sure whether we serve your address? Call 267-438-6494 or send your ZIP code to check availability.');
    $('.popular-services p').filter((_,el)=>$(el).text()==='Choose the closest match. The technician inspects the connected door system before recommending work.').text('Choose a service below, or describe the problem in the request form if you are unsure.');
  }
  return true;
};
