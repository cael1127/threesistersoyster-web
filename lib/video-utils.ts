/**
 * Video utility functions for optimization and performance
 */

export interface VideoMetadata {
  duration: number;
  width: number;
  height: number;
  size: number;
  format: string;
}

/**
 * Get video file size in human readable format
 */
export function formatVideoSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get video duration in human readable format
 */
export function formatVideoDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Calculate optimal video quality based on device capabilities
 */
export function getOptimalVideoQuality(): 'low' | 'medium' | 'high' {
  if (typeof window === 'undefined') return 'medium';
  
  const connection = (navigator as any).connection;
  if (connection) {
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'low';
    } else if (connection.effectiveType === '3g') {
      return 'medium';
    } else {
      return 'high';
    }
  }
  
  // Fallback based on screen resolution
  const screenWidth = window.screen.width;
  if (screenWidth < 768) {
    return 'low';
  } else if (screenWidth < 1920) {
    return 'medium';
  } else {
    return 'high';
  }
}

/**
 * Get video poster frame at specific time
 */
export function getVideoPoster(videoElement: HTMLVideoElement, time: number = 0): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Canvas context not available'));
      return;
    }
    
    const handleCanPlay = () => {
      try {
        videoElement.currentTime = time;
      } catch (error) {
        reject(error);
      }
    };
    
    const handleSeeked = () => {
      try {
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        ctx.drawImage(videoElement, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      } finally {
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('seeked', handleSeeked);
      }
    };
    
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('seeked', handleSeeked);
    
    // Set a timeout to prevent hanging
    setTimeout(() => {
      reject(new Error('Video poster generation timeout'));
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('seeked', handleSeeked);
    }, 10000);
  });
}

/**
 * Preload video metadata for better performance
 */
export function preloadVideoMetadata(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.addEventListener('loadedmetadata', () => {
      resolve();
    });
    
    video.addEventListener('error', (error) => {
      reject(error);
    });
    
    video.src = src;
  });
}

/**
 * Check if video format is supported by the browser
 */
export function isVideoFormatSupported(format: string): boolean {
  if (typeof document === 'undefined') return true;
  
  const video = document.createElement('video');
  return video.canPlayType(`video/${format}`) !== '';
}

/**
 * Get recommended video settings based on device capabilities
 */
export function getRecommendedVideoSettings() {
  const quality = getOptimalVideoQuality();
  
  return {
    quality,
    preload: quality === 'high' ? 'auto' : 'metadata' as 'auto' | 'metadata',
    controls: quality === 'high',
    autoplay: quality === 'high',
    muted: true,
    playsInline: true,
  };
} 