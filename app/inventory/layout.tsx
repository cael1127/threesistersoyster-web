import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Live Oyster Inventory | Three Sisters Oyster Co. | Port Lavaca Texas",
  description: "View our real-time oyster inventory from Port Lavaca, Texas. Farm and nursery operations with live stock counts, pricing, and availability for fresh Gulf Coast oysters.",
  keywords: [
    "oyster inventory",
    "live oyster stock",
    "Texas oyster availability", 
    "Port Lavaca oyster inventory",
    "oyster farm stock",
    "oyster nursery seed",
    "fresh oyster count",
    "oyster pricing",
    "Gulf Coast oyster inventory",
    "oyster wholesale stock",
    "restaurant oyster supply",
    "oyster harvest ready",
    "Keller Bay oyster stock"
  ],
  openGraph: {
    title: "Live Oyster Inventory | Three Sisters Oyster Co.",
    description: "View our real-time oyster inventory from Port Lavaca, Texas. Farm and nursery operations with live stock counts and availability.",
    images: [
      {
        url: '/oyster.png',
        width: 1200,
        height: 630,
        alt: 'Fresh Texas Oysters - Live Inventory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Oyster Inventory | Three Sisters Oyster Co.',
    description: 'View our real-time oyster inventory from Port Lavaca, Texas. Farm and nursery operations with live stock counts.',
    images: ['/oyster.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
