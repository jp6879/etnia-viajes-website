import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X, Images } from 'lucide-react';
import { useDestinationImages } from '@/hooks/useDestinationImages';

interface MiniDestinationGalleryProps {
  destinationName: string;
  maxImages?: number;
  /** Término de búsqueda personalizado (si no se especifica, usa destinationName) */
  searchQuery?: string;
}

export function MiniDestinationGallery({ 
  destinationName, 
  maxImages = 10,
  searchQuery
}: MiniDestinationGalleryProps) {
  // Usa searchQuery si está definido, sino usa destinationName
  const effectiveSearchTerm = searchQuery || destinationName;
  const { images, isLoading, error } = useDestinationImages(effectiveSearchTerm, maxImages);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    if (images.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, goToNext, goToPrevious]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxOpen]);

  // Reset index when destination changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [destinationName]);

  // Loading skeleton - square grid
  if (isLoading) {
    return (
      <div className="grid grid-cols-5 gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="aspect-square bg-secondary/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  // Error or no images
  if (error || images.length === 0) {
    return (
      <div className="w-full h-32 bg-secondary/30 rounded-xl flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Sin fotos disponibles</span>
      </div>
    );
  }

  // Calculate remaining photos for "Más fotos" button
  const remainingPhotos = images.length > 5 ? images.length - 5 : 0;

  return (
    <>
      {/* Square Grid - 5 columns */}
      <div className="grid grid-cols-5 gap-2">
        {images.slice(0, 5).map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <img
              src={image.imageUrl}
              alt={`${destinationName} - Foto ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* "Más fotos" overlay on last thumbnail */}
            {index === 4 && remainingPhotos > 0 && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white">
                <Images className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">+{remainingPhotos}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox Modal - rendered in portal */}
      {lightboxOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button - prominent */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 rounded-full flex items-center gap-2 transition-colors z-10 shadow-lg"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
            <span className="font-medium">Cerrar</span>
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </>
          )}

          {/* Main image */}
          <div 
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[currentIndex].imageUrl}
              alt={`${destinationName} - Foto ${currentIndex + 1}`}
              className="max-w-full max-h-[75vh] object-contain rounded-lg"
            />
            
            {/* Attribution and counter */}
            <div className="mt-4 text-center">
              <a
                href={images[currentIndex].sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white/80 text-sm transition-colors"
              >
                📷 {images[currentIndex].photographerName}
              </a>
              <p className="text-white/40 text-xs mt-1">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all ${
                  index === currentIndex 
                    ? 'ring-2 ring-white scale-110' 
                    : 'opacity-50 hover:opacity-75'
                }`}
              >
                <img
                  src={image.imageUrl}
                  alt={`Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      , document.body)}
    </>
  );
}
