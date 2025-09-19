import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buy Fresh Oysters Online | Three Sisters Oyster Texas',
  description: 'Order fresh Gulf Coast oysters directly from our farm in Port Lavaca, Texas. Perfect for restaurants, catering, and seafood enthusiasts.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Buy Fresh Oysters Online | Three Sisters Oyster Texas',
    description: 'Order fresh Gulf Coast oysters directly from our farm in Port Lavaca, Texas. Perfect for restaurants, catering, and seafood enthusiasts.',
    url: '/products',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Fresh Oysters Online | Three Sisters Oyster Texas',
    description: 'Order fresh Gulf Coast oysters directly from our farm in Port Lavaca, Texas. Perfect for restaurants, catering, and seafood enthusiasts.',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}


