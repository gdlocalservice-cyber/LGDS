'use strict';

const staleMobileHero='/assets/garage-door-technician-king-of-prussia-pa-lgds-mobile-720.avif';

module.exports = function pageQuality($) {
  const usedImages=new Set();
  $('img,picture source').each((_,el)=>{
    const node=$(el);
    if(node.attr('src')) usedImages.add(node.attr('src'));
    for(const candidate of (node.attr('srcset')||'').split(',')) {
      const url=candidate.trim().split(/\s+/)[0];
      if(url) usedImages.add(url);
    }
  });
  let removedPreloads=0;
  const seen=new Set();
  $('link[rel=preload]').each((_,el)=>{
    const link=$(el);
    // The original export inserted the homepage mobile image into every head.
    // Keep it only where a picture or image actually uses it.
    if(link.attr('as')==='image' && link.attr('href')===staleMobileHero && !usedImages.has(staleMobileHero)) {
      link.remove(); removedPreloads++; return;
    }
    const key=['as','href','imagesrcset','imagesizes','media','type','crossorigin'].map(a=>link.attr(a)||'').join('|');
    if(seen.has(key)) {link.remove(); removedPreloads++;} else seen.add(key);
  });

  $('footer img').attr('loading','lazy').attr('decoding','async');
  $('main[id]').attr('tabindex','-1');
  $('.ads-problems,.ads-reasons,.ads-process').attr('role','list');
  $('.before-after-control button').each((_,el)=>$(el).attr('aria-pressed',String($(el).hasClass('active'))));

  // Keep the existing work video, but let the visitor choose when to load/play it.
  const workVideo=$('video[aria-label="Garage door technician completing a service visit"]');
  if(workVideo.length) {
    workVideo.removeAttr('autoplay').removeAttr('loop').removeAttr('muted').attr('controls','').attr('preload','none');
    if(!workVideo.find('source').length) workVideo.append('<source src="/assets/service-visit.mp4" type="video/mp4">');
  }
  return {removedPreloads};
};
