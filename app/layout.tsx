import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Three Sisters Oyster Co. - Premium Texas Oysters",
  description: "Premium oysters and aquaculture products from the pristine waters of Keller Bay",
  generator: 'cf'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gradient-to-r from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand text-[#3a2a4d] min-h-screen"}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
