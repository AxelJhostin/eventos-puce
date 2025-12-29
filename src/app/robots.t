import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eventospucemanabi.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // 👈 Protegemos el admin para que no salga en Google
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}