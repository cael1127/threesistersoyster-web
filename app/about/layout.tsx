import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'About Three Sisters Oyster | Texas Oyster Farmers'
  const description = 'Learn the story behind Three Sisters Oyster in Port Lavaca, Texas. Family-run, sustainable oyster farming with a passion for quality and community.'
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


