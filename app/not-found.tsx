import { PHONE_DISPLAY, PHONE_LINK } from "./site-data";
import { Icon, SiteShell } from "./site-components";

export default function NotFound() {
  return <SiteShell><section className="thank-you-page section"><span><Icon name="door" size={54}/></span><p className="eyebrow">Page not found</p><h1>This door did not lead anywhere.</h1><p>The page may have moved. Use the service and area menus, return home or call for help.</p><div className="hero-buttons"><a className="button button-gold" href={PHONE_LINK}>Call {PHONE_DISPLAY}</a><a className="button button-outline" href="/">Return Home</a></div></section></SiteShell>;
}
