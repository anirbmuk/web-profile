function generateSitemapDate() {
  const currentISODate = new Date().toISOString();
  const [date] = currentISODate.split('T');
  return date;
}

export function generateSitemap(baseUrl: string) {
  const sitemapDate = generateSitemapDate();
  return `<?xml version='1.0' encoding='UTF-8'?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    <url>
      <loc>${baseUrl}/en</loc>
      <lastmod>${sitemapDate}</lastmod>
      <changefreq>daily</changefreq>
      <xhtml:link rel="x-default" hreflang="en" href="${baseUrl}/en"/>
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
      <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de"/>
    </url>
    <url>
      <loc>${baseUrl}/de</loc>
      <lastmod>${sitemapDate}</lastmod>
      <changefreq>daily</changefreq>
      <xhtml:link rel="x-default" hreflang="en" href="${baseUrl}/en"/>
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
      <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de"/>
    </url>
    <url>
      <loc>${baseUrl}/en/about</loc>
      <lastmod>${sitemapDate}</lastmod>
      <changefreq>daily</changefreq>
      <xhtml:link rel="x-default" hreflang="en" href="${baseUrl}/en/about"/>
      <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/about"/>
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/about"/>
    </url>
    <url>
      <loc>${baseUrl}/de/about</loc>
      <lastmod>${sitemapDate}</lastmod>
      <changefreq>daily</changefreq>
      <xhtml:link rel="x-default" hreflang="en" href="${baseUrl}/en/about"/>
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/about"/>
      <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/about"/>
    </url>
  </urlset>`;
}
