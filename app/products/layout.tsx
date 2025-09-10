import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Texas Oysters & Merchandise | Three Sisters Oyster Co.',
  description: 'Shop premium oysters grown in Keller Bay and branded merchandise. Sustainable aquaculture, premium taste.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/products',
  },
  openGraph: {
    title: 'Premium Texas Oysters & Merchandise',
    description: 'Shop premium oysters grown in Keller Bay and branded merchandise.',
    url: '/products',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Texas Oysters & Merchandise',
    description: 'Sustainably farmed oysters from Keller Bay and branded gear.',
  },
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children
}


