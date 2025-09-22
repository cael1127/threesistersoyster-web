import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { MobileScrollRestoration } from "@/components/MobileScrollRestoration"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { AnalyticsProvider } from "@/components/AnalyticsProvider"

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://threesistersoyster.com'

export const metadata: Metadata = {
  title: "Three Sisters Oyster | Fresh Texas Oysters from Port Lavaca",
  description: "Discover premium oysters sustainably farmed in Port Lavaca, Texas. Three Sisters Oyster offers fresh Gulf Coast oysters for restaurants, events, and seafood lovers.",
  keywords: [
    "Texas oysters",
    "Port Lavaca oysters", 
    "Gulf Coast oysters",
    "fresh oysters",
    "sustainable oyster farming",
    "oyster nursery",
    "oyster farm Texas",
    "premium oysters",
    "half shell oysters",
    "oyster seed",
    "aquaculture Texas",
    "Keller Bay oysters",
    "oyster delivery",
    "restaurant oysters",
    "oyster wholesale"
  ],
  authors: [{ name: "Three Sisters Oyster Co." }],
  creator: "Three Sisters Oyster Co.",
  publisher: "Three Sisters Oyster Co.",
  generator: 'Next.js',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Three Sisters Oyster Co.',
    title: 'Three Sisters Oyster | Fresh Texas Oysters from Port Lavaca',
    description: 'Discover premium oysters sustainably farmed in Port Lavaca, Texas. Three Sisters Oyster offers fresh Gulf Coast oysters for restaurants, events, and seafood lovers.',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Three Sisters Oyster Co. - Premium Texas Oysters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Three Sisters Oyster | Fresh Texas Oysters from Port Lavaca',
    description: 'Discover premium oysters sustainably farmed in Port Lavaca, Texas. Three Sisters Oyster offers fresh Gulf Coast oysters for restaurants, events, and seafood lovers.',
    images: ['/logo.jpg'],
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
  verification: {
    google: 'googleb3d131a854526afe',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#b385dc' },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Three Sisters Oyster Co.',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand text-white min-h-screen">
        <ErrorBoundary>
          <AnalyticsProvider>
            <CartProvider>
              <MobileScrollRestoration />
              {children}
            </CartProvider>
          </AnalyticsProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
