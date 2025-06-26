export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://mkworld-tools.vercel.app/sitemap.xml

# Crawl delay for politeness
Crawl-delay: 1

# Allow specific bot optimizations
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Block unnecessary paths
Disallow: /api/
Disallow: /_next/
Disallow: /_vercel/
Disallow: /favicon.ico
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}