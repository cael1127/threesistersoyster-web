"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoThumbnailProps {
  src: string;
  poster?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
  showPlayButton?: boolean;
}

export function VideoThumbnail({
  src,
  poster,
  alt,
  className,
  width = 400,
  height = 400,
  onClick,
  showPlayButton = true,
}: VideoThumbnailProps) {
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(poster || null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (poster) {
      setThumbnailSrc(poster);
      return;
    }

    // Generate thumbnail from video
    const generateThumbnail = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      try {
        setIsGenerating(true);
        
        // Load video metadata
        await new Promise((resolve, reject) => {
          if (!videoRef.current) return reject(new Error('Video element not found'));
          
          videoRef.current.addEventListener('loadedmetadata', resolve, { once: true });
          videoRef.current.addEventListener('error', reject, { once: true });
          videoRef.current.load();
        });

        // Seek to a good frame (25% into the video)
        if (videoRef.current.duration > 0) {
          videoRef.current.currentTime = videoRef.current.duration * 0.25;
        }

        // Wait for the frame to load
        await new Promise((resolve) => {
          if (!videoRef.current) return resolve(undefined);
          
          videoRef.current.addEventListener('seeked', resolve, { once: true });
        });

        // Generate thumbnail
        const canvas = canvasRef.current;
        const video = videoRef.current;
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, width, height);
          const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setThumbnailSrc(thumbnailDataUrl);
        }
      } catch (error) {
        console.error('Failed to generate thumbnail:', error);
        setHasError(true);
      } finally {
        setIsGenerating(false);
      }
    };

    generateThumbnail();
  }, [src, poster, width, height]);

  if (hasError) {
    return (
      <div className={cn("flex items-center justify-center bg-gray-100 rounded-lg", className)}>
        <div className="text-center p-8">
          <Video className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 text-sm">Video thumbnail unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative group cursor-pointer overflow-hidden rounded-lg", className)}
      onClick={onClick}
    >
      {/* Hidden video element for thumbnail generation */}
      <video
        ref={videoRef}
        src={src}
        className="hidden"
        preload="metadata"
        muted
        playsInline
      />
      
      {/* Hidden canvas for thumbnail generation */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Thumbnail Display */}
      {thumbnailSrc ? (
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${thumbnailSrc})`,
            width: `${width}px`,
            height: `${height}px`
          }}
        />
      ) : (
        <div 
          className="w-full h-full bg-gray-200 flex items-center justify-center"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {isGenerating ? (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin mx-auto mb-2" />
              <p className="text-gray-600 text-sm">Generating thumbnail...</p>
            </div>
          ) : (
            <Video className="w-12 h-12 text-gray-400" />
          )}
        </div>
      )}

      {/* Play Button Overlay */}
      {showPlayButton && (
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-8 h-8 text-gray-800 ml-1" />
          </div>
        </div>
      )}

      {/* Video Duration Badge */}
      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
        Video
      </div>
    </div>
  );
} 