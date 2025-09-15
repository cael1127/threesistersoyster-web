import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Photo Gallery | Three Sisters Oyster Co.',
  description: 'Explore images from our Texas oyster farm: nursery, farm operations, and coastal life in Keller Bay.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Photo Gallery | Three Sisters Oyster Co.',
    description: 'Scenes from our nursery and farm in Keller Bay, Texas.',
    url: '/gallery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Photo Gallery | Three Sisters Oyster Co.',
    description: 'Scenes from our nursery and farm in Keller Bay, Texas.',
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}


