import type { Context, Config } from '@netlify/edge-functions';

export default (_request: Request, context: Context) => new Response(
  JSON.stringify({ openaiMeasurementAllowed: context.geo?.country?.code === 'US' }),
  { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'private, no-store', 'Netlify-CDN-Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } }
);

export const config: Config = { path: '/lgds-measurement-region' };
