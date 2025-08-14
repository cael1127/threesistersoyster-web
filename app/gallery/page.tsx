import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CartButton } from '@/components/cart-button';
import OriginCrew from '@/components/OriginCrew';

export default function GalleryPage() {
  // Sample gallery items - you can replace these with your actual photos and videos
  const galleryItems = [
    {
      id: 1,
      type: 'image',
      src: '/topFarm.JPG',
      alt: 'Coastside Oyster Farm',
      title: 'Coastside Oyster Farm',
      description: 'Beautiful view of the oyster farm',
      category: 'Nature'
    },
    {
      id: 2,
      type: 'image',
      src: '/farmlog.jpg',
      alt: 'Farm Operations',
      title: 'Farm Operations',
      description: 'Daily operations at the oyster farm',
      category: 'Harvest'
    },
    {
      id: 3,
      type: 'video',
      src: '/homepage.MP4',
      alt: 'Farm Tour Video',
      title: 'Farm Tour',
      description: 'Take a tour of our oyster farm',
      category: 'Tour'
    },
    {
      id: 4,
      type: 'image',
      src: '/nurserylog.JPEG',
      alt: 'Nursery Operations',
      title: 'Nursery Operations',
      description: 'Our oyster nursery in action',
      category: 'Team'
    },
    {
      id: 5,
      type: 'image',
      src: '/aboutpic.jpg',
      alt: 'Family at Farm',
      title: 'Family at Farm',
      description: 'Blake and family at the oyster farm',
      category: 'Nature'
    },
    {
      id: 6,
      type: 'image',
      src: '/logo.jpg',
      alt: 'Three Sisters Logo',
      title: 'Three Sisters Brand',
      description: 'Our company logo and branding',
      category: 'Process'
    }
  ];

  const categories = ['All', 'Nature', 'Harvest', 'Tour', 'Team', 'Process'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-purple-600 border-b border-purple-300/30 sticky top-0 z-50">
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
                <p className="text-xs text-purple-100">Premium Texas Oysters</p>
              </div>
            </Link>
            <div className="flex items-center space-x-1 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4">
                <Link href="/" className="text-white hover:text-purple-100 font-medium text-sm">Home</Link>
                <Link href="/products" className="text-white hover:text-purple-100 font-medium text-sm">Products</Link>
                <Link href="/inventory" className="text-white hover:text-purple-100 font-medium text-sm">Inventory</Link>
                <Link href="/gallery" className="text-white hover:text-purple-100 font-medium text-sm">Gallery</Link>
                <Link href="/about" className="text-white hover:text-purple-100 font-medium text-sm">About</Link>
                <Link href="/contact" className="text-white hover:text-purple-100 font-medium text-sm">Contact</Link>
              </nav>
              {/* Mobile Layout - Restructured for better spacing */}
              <div className="flex md:hidden items-center w-full">
                {/* Mobile Navigation - Compact */}
                <nav className="flex items-center flex-1 px-4">
                  <Link href="/products" className="text-white hover:text-purple-100 font-medium text-xs py-3 flex-1 text-center">Shop</Link>
                  <Link href="/inventory" className="text-white hover:text-purple-100 font-medium text-xs py-3 flex-1 text-center">Stock</Link>
                  <Link href="/gallery" className="text-white hover:text-purple-100 font-medium text-xs py-3 flex-1 text-center">Gallery</Link>
                  <Link href="/about" className="text-white hover:text-purple-100 font-medium text-xs py-3 flex-1 text-center">About</Link>
                  <Link href="/contact" className="text-white hover:text-purple-100 font-medium text-xs py-3 flex-1 text-center">Contact</Link>
                </nav>
                
                {/* Mobile Cart/Order Buttons */}
                <div className="flex items-center space-x-1 px-2">
                  <CartButton />
                  <Button
                    asChild
                    size="sm"
                    className="bg-white text-purple-600 hover:bg-purple-50 text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
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
                  className="bg-white text-purple-600 hover:bg-purple-50 text-xs px-1 min-h-[32px] md:min-h-[44px] md:px-4 md:text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  <Link href="/order">Order</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
                     {/* Hero Section */}
           <div className="text-center mb-16">
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight text-center">Kathryn's Photo Bomb</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A visual journey through our oyster farm, capturing the beauty of nature, 
              the hard work of our team, and the magic of sustainable aquaculture.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-800 hover:bg-purple-200 transition-all duration-200"
              >
                {category}
              </button>
            ))}
          </div>

                     {/* Gallery Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
             {galleryItems.map((item) => (
               <Card key={item.id} className="bg-white border border-purple-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                 <CardContent className="p-0">
                   <div className="relative aspect-square overflow-hidden">
                     {item.type === 'image' ? (
                       <Image
                         src={item.src}
                         alt={item.alt}
                         width={400}
                         height={400}
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                         quality={75}
                         loading="lazy"
                         placeholder="blur"
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       />
                     ) : (
                       <video
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                         controls
                         poster="/topFarm.JPG"
                         muted
                         playsInline
                       >
                         <source src={item.src} type="video/mp4" />
                         Your browser does not support the video tag.
                       </video>
                     )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                     <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                       <h3 className="text-lg font-semibold mb-1 text-center">{item.title}</h3>
                       <p className="text-sm text-white/90">{item.description}</p>
                       <Badge className="mt-2 bg-purple-600 text-white border-0">
                         {item.category}
                       </Badge>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>

          {/* Origin Crew Section */}
          <OriginCrew />

          {/* Call to Action */}
          <div className="text-center mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-6 text-center">
              Want to See More?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
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
        </div>
      </main>
    </div>
  );
} 