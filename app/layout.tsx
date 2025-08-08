import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Three Sisters Oyster Co. - Premium Texas Oysters",
  description: "Premium oysters and aquaculture products from the pristine waters of Keller Bay",
  generator: 'cf',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className + " bg-gradient-to-r from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand text-[#3a2a4d] min-h-screen"}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
