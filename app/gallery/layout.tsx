import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Texas Oyster Farm Gallery | Three Sisters Oyster Photos',
  description: 'See our sustainable oyster farming in action. Photos from our Port Lavaca, Texas farm showing Gulf Coast oyster cultivation and daily operations.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Texas Oyster Farm Gallery | Three Sisters Oyster Photos',
    description: 'See our sustainable oyster farming in action. Photos from our Port Lavaca, Texas farm showing Gulf Coast oyster cultivation and daily operations.',
    url: '/gallery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Texas Oyster Farm Gallery | Three Sisters Oyster Photos',
    description: 'See our sustainable oyster farming in action. Photos from our Port Lavaca, Texas farm showing Gulf Coast oyster cultivation and daily operations.',
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}


