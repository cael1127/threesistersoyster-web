import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'About Three Sisters Oyster | Texas Oyster Farmers'
  const description = 'Meet the family behind sustainable oyster farming in Port Lavaca, Texas. Learn how we grow premium Gulf Coast oysters with passion for quality & community.'
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


