import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const now = new Date()

  const routes = [
    '',
    'about',
    'products',
    'gallery',
    'blog',
    'cart',
    'checkout',
    'inventory',
    'order',
    'success',
  ]

  return routes.map((path) => ({
    url: `${siteUrl}/${path}`.replace(/\/$\//, '/'),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.7,
  }))
}


