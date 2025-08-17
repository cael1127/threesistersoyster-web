"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { VideoThumbnail } from '@/components/ui/video-thumbnail';
import { VideoModal } from '@/components/ui/video-modal';

interface GalleryItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<{
    src: string;
    alt: string;
    title: string;
    description: string;
  } | null>(null);

  const handleVideoClick = (item: GalleryItem) => {
    if (item.type === 'video') {
      setSelectedVideo({
        src: item.src,
        alt: item.alt,
        title: item.title,
        description: item.description,
      });
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {items.map((item) => (
          <Card key={item.id} className="bg-white border border-purple-200 hover:bg-purple-50 transition-all duration-300 overflow-hidden group">
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
                  <VideoThumbnail
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full"
                    onClick={() => handleVideoClick(item)}
                    showPlayButton={true}
                  />
                )}
                
                {/* Hover Overlay */}
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