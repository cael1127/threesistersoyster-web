"use client";

import React, { useState } from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { VideoModal } from '@/components/ui/video-modal';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);

  const handleVideoClick = (item: GalleryItem) => {
    if (item.type === 'video') {
      console.log('Opening video:', item.src);
      setVideoLoading(true);
      setSelectedVideo(item);
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setVideoLoading(false);
  };

  const handleVideoError = (error: any) => {
    console.error('Video playback error:', error);
    setVideoLoading(false);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((item) => (
          <Card key={item.id} className="bg-white border border-purple-200 hover:bg-purple-50 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 overflow-hidden group">
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div 
                    className="w-full h-full bg-gray-200 flex items-center justify-center cursor-pointer group hover:bg-gray-300 transition-colors duration-300"
                    onClick={() => handleVideoClick(item)}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-gray-800 ml-1" />
                      </div>
                      <p className="text-gray-600 text-sm mt-2 group-hover:text-gray-800 transition-colors duration-300">
                        {videoLoading && selectedVideo?.id === item.id ? 'Loading...' : 'Click to play video'}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-lg font-semibold mb-1 text-center">{item.title}</h3>
                  <p className="text-sm text-white/90">{item.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={closeVideoModal}
          src={selectedVideo.src}
          alt={selectedVideo.alt}
          title={selectedVideo.title}
          description={selectedVideo.description}
        />
      )}
    </>
  );
} 