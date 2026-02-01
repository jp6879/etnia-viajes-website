import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDestinationImages, DestinationImage } from '@/hooks/useDestinationImages';

interface DestinationGalleryProps {
  destinationName: string;
  maxImages?: number;
  autoAdvanceInterval?: number; // in milliseconds, 0 to disable
}

export function DestinationGallery({ 
  destinationName, 
  maxImages = 10,
  autoAdvanceInterval = 5000 
}: DestinationGalleryProps) {
  const { images, isLoading, error } = useDestinationImages(destinationName, maxImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-advance carousel
  useEffect(() => {
    if (autoAdvanceInterval <= 0 || images.length <= 1) return;
    
    const interval = setInterval(goToNext, autoAdvanceInterval);
    return () => clearInterval(interval);
  }, [autoAdvanceInterval, goToNext, images.length]);

  // Reset index when images change
  useEffect(() => {
    setCurrentIndex(0);
  }, [destinationName]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-secondary/50 rounded-2xl overflow-hidden animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Cargando imágenes de {destinationName}...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error or no images
  if (error || images.length === 0) {
    return null; // Silently hide if no images available
  }

  const currentImage = images[currentIndex];

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden group">
      {/* Main Image */}
      <img
        src={currentImage.imageUrl}
        alt={currentImage.alt}
        className="w-full h-full object-cover transition-transform duration-500"
      />
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white w-4' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Attribution (required by Unsplash/Pixabay) */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
        <a
          href={currentImage.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white/70 hover:text-white transition-colors"
        >
          📷 {currentImage.photographerName} via {currentImage.source === 'unsplash' ? 'Unsplash' : 'Pixabay'}
        </a>
        <span className="text-xs text-white/50">
          {currentIndex + 1} / {images.length}
        </span>
      </div>
    </div>
  );
}
