import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/dashboard/', '/auth/login/', '/auth/register/'],
    },
    sitemap: 'https://resume-ai.com/sitemap.xml',
    host: 'https://resume-ai.com',
  }
}