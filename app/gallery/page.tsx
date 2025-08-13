import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function GalleryPage() {
  // Sample gallery items - you can replace these with your actual photos and videos
  const galleryItems = [
    {
      id: 1,
      type: 'image',
      src: '/topFarm.JPG',
      alt: 'Sample Photo 1',
      title: 'Coastside Oyster Farm',
      description: 'Beautiful view of the oyster farm',
      category: 'Nature'
    },
    {
      id: 2,
      type: 'image',
      src: '/placeholder.jpg',
      alt: 'Sample Photo 2',
      title: 'Harvest Time',
      description: 'Fresh oysters ready for harvest',
      category: 'Harvest'
    },
    {
      id: 3,
      type: 'video',
      src: '/homepage.MP4',
      alt: 'Sample Video 1',
      title: 'Farm Tour',
      description: 'Take a tour of our oyster farm',
      category: 'Tour'
    },
    {
      id: 4,
      type: 'image',
      src: '/placeholder.jpg',
      alt: 'Sample Photo 3',
      title: 'Team at Work',
      description: 'Our dedicated team working hard',
      category: 'Team'
    },
    {
      id: 5,
      type: 'image',
      src: '/placeholder.jpg',
      alt: 'Sample Photo 4',
      title: 'Water Quality',
      description: 'Crystal clear waters of Keller Bay',
      category: 'Nature'
    },
    {
      id: 6,
      type: 'video',
      src: '/homepage.MP4',
      alt: 'Sample Video 2',
      title: 'Oyster Processing',
      description: 'See how we process our oysters',
      category: 'Process'
    }
  ];

  const categories = ['All', 'Nature', 'Harvest', 'Tour', 'Team', 'Process'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purpleBrand via-lavenderBrand via-blueBrand via-mintBrand to-seafoamBrand">
      {/* Header */}
      <header className="bg-purpleBrand border-b border-purple-300/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="Three Sisters Oyster Co. Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-mintBrand">Three Sisters Oyster Co.</h1>
                <p className="text-sm text-seafoamBrand">Premium Texas Oysters</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-mintBrand hover:text-seafoamBrand transition-colors duration-200">Home</a>
              <a href="/about" className="text-mintBrand hover:text-seafoamBrand transition-colors duration-200">About</a>
              <a href="/products" className="text-mintBrand hover:text-seafoamBrand transition-colors duration-200">Products</a>
              <a href="/inventory" className="text-mintBrand hover:text-seafoamBrand transition-colors duration-200">Inventory</a>
              <a href="/gallery" className="text-seafoamBrand font-semibold">Gallery</a>
              <a href="/contact" className="text-mintBrand hover:text-seafoamBrand transition-colors duration-200">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-mintBrand/20 to-seafoamBrand/20 text-white border border-mintBrand/30 hover:from-mintBrand/30 hover:to-seafoamBrand/30 text-sm md:text-base backdrop-blur-sm">
              Kathryn's Photo Bomb
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Kathryn's Photo Bomb
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              A visual journey through our oyster farm, capturing the beauty of nature, 
              the hard work of our team, and the magic of sustainable aquaculture.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryItems.map((item) => (
              <Card key={item.id} className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden group">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    {item.type === 'image' ? (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        quality={90}
                      />
                    ) : (
                      <video
                        src={item.src}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        controls
                        preload="none"
                        poster="/placeholder.jpg"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-white/90">{item.description}</p>
                      <Badge className="mt-2 bg-mintBrand/80 text-white border-0">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
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