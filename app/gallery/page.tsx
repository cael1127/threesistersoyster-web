import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import OriginCrew from '@/components/OriginCrew';
import GalleryGrid from '@/components/GalleryGrid';
import ScrollAnimatedSection from '@/components/ScrollAnimatedSection';
import { FloatingParticles } from '@/components/ui/floating-particles';
import Navigation from '@/components/Navigation';

interface GalleryItem {
  id: number;
  type: 'image';
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
      src: '/gal.jpg',
      alt: 'Gallery Collection 1',
      title: 'Gallery Collection 1',
      description: 'A beautiful moment captured at Three Sisters Oyster Co.'
    },
    {
      id: 2,
      type: 'image',
      src: '/gal1.jpg',
      alt: 'Gallery Collection 2',
      title: 'Gallery Collection 2',
      description: 'Another stunning view from our oyster farm collection'
    },
    {
      id: 3,
      type: 'image',
      src: '/gal2.jpg',
      alt: 'Gallery Collection 3',
      title: 'Gallery Collection 3',
      description: 'Capturing the natural beauty and essence of our farm'
    },
    {
      id: 4,
      type: 'image',
      src: '/gal3.jpg',
      alt: 'Gallery Collection 4',
      title: 'Gallery Collection 4',
      description: 'A special moment in time at Three Sisters Oyster Co.'
    },
    {
      id: 5,
      type: 'image',
      src: '/topFarm.JPG',
      alt: 'Coastside Oyster Farm',
      title: 'Coastside Oyster Farm',
      description: 'Beautiful view of the oyster farm'
    },
    {
      id: 6,
      type: 'image',
      src: '/farmlog.jpg',
      alt: 'Farm Operations',
      title: 'Farm Operations',
      description: 'Daily operations at the oyster farm'
    },
    {
      id: 7,
      type: 'image',
      src: '/nurserylog.JPEG',
      alt: 'Nursery Operations',
      title: 'Nursery Operations',
      description: 'Our oyster nursery in action'
    },
    {
      id: 8,
      type: 'image',
      src: '/aboutpic.jpg',
      alt: 'Family at Farm',
      title: 'Family at Farm',
      description: 'Blake and family at the oyster farm'
    },
    {
      id: 9,
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
      <Navigation />

      {/* Main Content */}
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <ScrollAnimatedSection animationType="fade-in" delay={200}>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-purple-900 mb-6 leading-tight text-center">Kathryn's Photo Gallery</h1>
              <p className="text-xl md:text-2xl text-purple-800 max-w-3xl mx-auto leading-relaxed">
                A visual journey through our oyster farm, capturing the beauty of nature, 
                the hard work of our team, and the magic of sustainable aquaculture through stunning photography.
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