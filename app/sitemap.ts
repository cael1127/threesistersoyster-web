import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'
  const now = new Date()

  const routes = [
    {
      path: '',
      priority: 1.0,
      changeFrequency: 'weekly' as const,
      lastModified: now,
    },
    {
      path: 'about',
      priority: 0.8,
      changeFrequency: 'monthly' as const,
      lastModified: now,
    },
    {
      path: 'products',
      priority: 0.9,
      changeFrequency: 'weekly' as const,
      lastModified: now,
    },
    {
      path: 'inventory',
      priority: 0.9,
      changeFrequency: 'daily' as const,
      lastModified: now,
    },
    {
      path: 'gallery',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: now,
    },
    {
      path: 'blog',
      priority: 0.7,
      changeFrequency: 'weekly' as const,
      lastModified: now,
    },
    {
      path: 'cart',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
      lastModified: now,
    },
    {
      path: 'checkout',
      priority: 0.5,
      changeFrequency: 'monthly' as const,
      lastModified: now,
    },
    {
      path: 'order',
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: now,
    },
    {
      path: 'success',
      priority: 0.3,
      changeFrequency: 'yearly' as const,
      lastModified: now,
    },
  ]

  return routes.map((route) => ({
    url: `${siteUrl}/${route.path}`.replace(/\/$\//, '/'),
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}


