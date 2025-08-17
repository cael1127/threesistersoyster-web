import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CartButton } from '@/components/cart-button';
import OriginCrew from '@/components/OriginCrew';
import GalleryGrid from '@/components/GalleryGrid';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { FloatingParticles } from '@/components/ui/floating-particles';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  title: string;
  description: string;
}

export default function GalleryPage() {
  // Enhanced gallery items with better video support
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      type: 'image',
      src: '/topFarm.JPG',
      alt: 'Coastside Oyster Farm',
      title: 'Coastside Oyster Farm',
      description: 'Beautiful view of the oyster farm'
    },
    {
      id: 2,
      type: 'image',
      src: '/farmlog.jpg',
      alt: 'Farm Operations',
      title: 'Farm Operations',
      description: 'Daily operations at the oyster farm'
    },
    {
      id: 3,
      type: 'video',
      src: '/homepage.MP4',
      alt: 'Farm Tour Video',
      title: 'Farm Tour',
      description: 'Take a tour of our oyster farm'
    },
    {
      id: 4,
      type: 'image',
      src: '/nurserylog.JPEG',
      alt: 'Nursery Operations',
      title: 'Nursery Operations',
      description: 'Our oyster nursery in action'
    },
    {
      id: 5,
      type: 'image',
      src: '/aboutpic.jpg',
      alt: 'Family at Farm',
      title: 'Family at Farm',
      description: 'Blake and family at the oyster farm'
    },
    {
      id: 6,
      type: 'image',
      src: '/logo.jpg',
      alt: 'Three Sisters Logo',
      title: 'Three Sisters Brand',
      description: 'Our company logo and branding'
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand relative">
      <FloatingParticles particleCount={12} interactive={true} />
      {/* Header */}
      <header className="bg-purpleBrand border-b border-purpleBrand/30 sticky top-0 z-50">
        <div className="container mx-auto px-3 md:px-4 py-2 md:py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 md:space-x-3">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Three Sisters Oyster Co. Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-xl font-bold text-white text-center">
                  Three Sisters Oyster Co.
                </h1>
                <p className="text-xs text-white">Premium Texas Oysters</p>
              </div>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-white hover:text-white font-medium text-sm">Home</Link>
                <Link href="/products" className="text-white hover:text-white font-medium text-sm">Products</Link>
                <Link href="/inventory" className="text-white hover:text-white font-medium text-sm">Inventory</Link>
                <Link href="/gallery" className="text-white hover:text-white font-medium text-sm">Gallery</Link>
                <Link href="/about" className="text-white hover:text-white font-medium text-sm">About</Link>
                <Link href="/contact" className="text-white hover:text-white font-medium text-sm">Contact</Link>
              </nav>
              {/* Mobile Layout - Restructured for better spacing */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Compact */}
                <nav className="flex items-center flex-1 px-4">
                  <Link href="/products" className="text-white hover:text-white font-medium text-xs py-3 flex-1 text-center">Shop</Link>
                  <Link href="/inventory" className="text-white hover:text-white font-medium text-xs py-3 flex-1 text-center">Stock</Link>
                  <Link href="/gallery" className="text-white hover:text-white font-medium text-xs py-3 flex-1 text-center">Gallery</Link>
                  <Link href="/about" className="text-white hover:text-white font-medium text-xs py-3 flex-1 text-center">About</Link>
                  <Link href="/contact" className="text-white hover:text-white font-medium text-xs py-3 flex-1 text-center">Contact</Link>
                </nav>
                
                {/* Mobile Cart/Order Buttons */}
                <div className="flex items-center space-x-1 px-2">
                  <CartButton />
                  <Button
                    asChild
                    size="sm"
                    className="bg-mintBrand hover:bg-seafoamBrand text-white text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Link href="/order">Order</Link>
                  </Button>
                </div>
              </div>
              
              {/* Desktop Cart/Order Buttons */}
              <div className="hidden md:flex items-center space-x-1">
                <CartButton />
                <Button
                  asChild
                  size="sm"
                  className="bg-mintBrand hover:bg-seafoamBrand text-white text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Link href="/order">Order</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <ScrollAnimatedSection animationType="fade-in" delay={200}>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight text-center">Kathryn's Photo Bomb</h1>
              <p className="text-xl md:text-2xl text-purple-800 max-w-3xl mx-auto leading-relaxed">
                A visual journey through our oyster farm, capturing the beauty of nature, 
                the hard work of our team, and the magic of sustainable aquaculture.
              </p>
            </div>
          </ScrollAnimatedSection>



          {/* Gallery Grid Component */}
          <ScrollAnimatedSection animationType="scale-in" delay={600}>
            <GalleryGrid items={galleryItems} />
          </ScrollAnimatedSection>

          {/* Origin Crew Section */}
          <ScrollAnimatedSection animationType="fade-in" delay={800}>
            <OriginCrew />
          </ScrollAnimatedSection>

          {/* Call to Action */}
          <ScrollAnimatedSection animationType="slide-up" delay={1000}>
            <div className="text-center mt-20">
              <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6 text-center">
                Want to See More?
              </h2>
              <p className="text-xl text-purple-800 mb-8 max-w-2xl mx-auto">
                Follow us on Instagram for daily updates and behind-the-scenes content from the farm.
              </p>
              <a
                href="https://instagram.com/threesistersoysterco"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-mintBrand to-seafoamBrand text-white font-semibold rounded-full hover:from-seafoamBrand hover:to-mintBrand transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Follow on Instagram
              </a>
            </div>
          </ScrollAnimatedSection>
        </div>
      </main>
    </div>
  );
} 