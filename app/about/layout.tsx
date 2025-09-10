import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'About Three Sisters Oyster Co. | Our Story & Mission'
  const description = 'Learn about our family-owned Texas oyster farm, sustainability mission, and Keller Bay roots.'
  return {
    title,
    description,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: '/about',
    },
    openGraph: {
      title,
      description,
      url: '/about',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}


