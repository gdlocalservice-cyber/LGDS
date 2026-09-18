import type { Context, Config } from '@netlify/edge-functions';
import { canonicalPath } from '../../site/routes.mjs';

export default (request: Request, context: Context) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') return context.next();
  const url = new URL(request.url);
  const target = canonicalPath(url.pathname);
  const bareDomain = url.hostname === 'localgaragedoorsvc.com';
  if (target !== url.pathname || bareDomain) {
    url.pathname = target;
    if (bareDomain) { url.hostname = 'www.localgaragedoorsvc.com'; url.protocol = 'https:'; }
    return new Response(null, { status: 301, headers: { Location: url.href, 'Cache-Control': 'public, max-age=3600' } });
  }
  return context.next();
};

export const config: Config = { path: '/*', excludedPath: ['/assets/*', '/_next/*', '/.netlify/*'] };
