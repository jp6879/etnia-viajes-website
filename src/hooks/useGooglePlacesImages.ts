import { useState, useEffect } from 'react';
import { loadGoogleMapsScript, getPlaceClass } from '@/lib/googleMaps';

interface HotelImage {
  id: string;
  imageUrl: string;
  attribution: string;
}

interface UseGooglePlacesImagesResult {
  images: HotelImage[];
  isLoading: boolean;
  error: string | null;
}

// Cache to avoid duplicate API calls
const placesImageCache: Record<string, HotelImage[]> = {};

/**
 * Hook to fetch hotel images from Google Places API (New)
 * Uses Place.searchByText and Place.fetchFields
 * @param hotelName - Name of the hotel
 * @param hotelLocation - Location hint (e.g., "Bariloche, Argentina")
 * @param maxImages - Maximum number of images (default: 5)
 */
export function useGooglePlacesImages(
  hotelName: string,
  hotelLocation?: string,
  maxImages: number = 5
): UseGooglePlacesImagesResult {
  const [images, setImages] = useState<HotelImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hotelName) {
      setImages([]);
      setIsLoading(false);
      return;
    }

    const cacheKey = `places-${hotelName}-${hotelLocation || ''}-${maxImages}`;
    
    // Check cache first
    if (placesImageCache[cacheKey]) {
      setImages(placesImageCache[cacheKey]);
      setIsLoading(false);
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Load Google Maps script and Places library
        await loadGoogleMapsScript();
        
        const Place = getPlaceClass();
        if (!Place) {
          throw new Error('Place class not available');
        }

        // Build search query
        const searchQuery = hotelLocation 
          ? `${hotelName}, ${hotelLocation}` 
          : hotelName;

        // Search for the place using new API
        const { places } = await Place.searchByText({
          textQuery: searchQuery,
          fields: ['id', 'displayName', 'photos'],
          maxResultCount: 1,
        });

        if (places && places.length > 0) {
          const place = places[0];
          
          if (place.photos && place.photos.length > 0) {
            const fetchedImages: HotelImage[] = place.photos
              .slice(0, maxImages)
              .map((photo, index) => ({
                id: `${place.id}-${index}`,
                imageUrl: photo.getURI({ maxWidth: 800 }),
                attribution: photo.authorAttributions?.[0]?.displayName || 'Google Places',
              }));

            placesImageCache[cacheKey] = fetchedImages;
            setImages(fetchedImages);
          } else {
            setImages([]);
          }
        } else {
          setError('No se encontró el hotel');
          setImages([]);
        }
      } catch (err) {
        console.warn('Google Places fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [hotelName, hotelLocation, maxImages]);

  return { images, isLoading, error };
}
