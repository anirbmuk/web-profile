type ImageEntry = {
  loc: string,
  title: string,
  caption?: string,
};

function generateSitemapDate() {
  const currentISODate = new Date().toISOString();
  const [date] = currentISODate.split('T');
  return date;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderImageEntries(images: ImageEntry[] = []): string {
  return images
    .map(({
      loc, title, caption, 
    }) => `
      <image:image>
        <image:loc>${escapeXml(loc)}</image:loc>
        <image:title>${escapeXml(title)}</image:title>${caption ? `
        <image:caption>${escapeXml(caption)}</image:caption>` : ''}
      </image:image>`)
    .join('');
}

const HERO_IMAGES: Record<'en' | 'de', ImageEntry> = {
  en: {
    loc: '/seo.webp',
    title: 'Anirban Mukherjee — Staff Frontend Developer, Hamburg',
    caption: 'Anirban Mukherjee, Staff Frontend Developer at SCAYLE in Hamburg, Germany, specialising in Vue, Nuxt, Angular and TypeScript.',
  },
  de: {
    loc: '/seo.webp',
    title: 'Anirban Mukherjee — Leitender Frontend-Entwickler, Hamburg',
    caption: 'Anirban Mukherjee, leitender Frontend-Entwickler bei SCAYLE in Hamburg, spezialisiert auf Vue, Nuxt, Angular und TypeScript.',
  },
};

export function generateSitemap(baseUrl: string) {
  const sitemapDate = generateSitemapDate();
  const heroImage = (locale: 'en' | 'de'): ImageEntry[] => [{
    ...HERO_IMAGES[locale],
    loc: `${baseUrl}${HERO_IMAGES[locale].loc}`,
  }];

  return `<?xml version='1.0' encoding='UTF-8'?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url>
      <loc>${baseUrl}/en</loc>
      <lastmod>${sitemapDate}</lastmod>
      <changefreq>daily</changefreq>
      <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en"/>
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
      <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de"/>${renderImageEntries(heroImage('en'))}
    </url>
    <url>
      <loc>${baseUrl}/de</loc>
      <lastmod>${sitemapDate}</lastmod>
      <changefreq>daily</changefreq>
      <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en"/>
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en"/>
      <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de"/>${renderImageEntries(heroImage('de'))}
    </url>
    <url>
      <loc>${baseUrl}/en/about</loc>
      <lastmod>${sitemapDate}</lastmod>
      <changefreq>daily</changefreq>
      <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/about"/>
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/about"/>
      <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/about"/>${renderImageEntries(heroImage('en'))}
    </url>
    <url>
      <loc>${baseUrl}/de/about</loc>
      <lastmod>${sitemapDate}</lastmod>
      <changefreq>daily</changefreq>
      <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/en/about"/>
      <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/about"/>
      <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de/about"/>${renderImageEntries(heroImage('de'))}
    </url>
  </urlset>`;
}
