"use client"

import Navigation from "@/components/Navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TestMobileScrollPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Mobile Scroll Test Page
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Test Instructions:</h2>
            <ol className="text-white space-y-2 list-decimal list-inside">
              <li>This page should open at the top on mobile</li>
              <li>You should be able to scroll down normally</li>
              <li>Navigation to other pages should start at the top</li>
              <li>No continuous scrolling to top should occur</li>
            </ol>
          </div>
          
          {/* Add lots of content to test scrolling */}
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold text-white mb-2">Test Section {i + 1}</h3>
              <p className="text-white/80">
                This is test content to ensure you can scroll down normally on mobile devices. 
                The page should not continuously scroll to the top while you're trying to read.
              </p>
            </div>
          ))}
          
          <div className="text-center mt-8">
            <Button asChild className="bg-purpleBrand hover:bg-purpleBrand/80">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
