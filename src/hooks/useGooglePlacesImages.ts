import { useState, useEffect, useRef } from 'react';
import { loadGoogleMapsScript } from '@/lib/googleMaps';

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
 * Hook to fetch hotel images from Google Places API
 * Uses findPlaceFromQuery to get place_id, then getDetails for full photos
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
  const attributionRef = useRef<HTMLDivElement | null>(null);

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
        // Load Google Maps script
        await loadGoogleMapsScript();

        // Create hidden div for PlacesService attribution
        if (!attributionRef.current) {
          attributionRef.current = document.createElement('div');
          attributionRef.current.style.display = 'none';
          document.body.appendChild(attributionRef.current);
        }

        const service = new window.google.maps.places.PlacesService(attributionRef.current);
        
        // Build search query
        const searchQuery = hotelLocation 
          ? `${hotelName}, ${hotelLocation}` 
          : hotelName;

        // Step 1: Find place to get place_id
        service.findPlaceFromQuery(
          {
            query: searchQuery,
            fields: ['place_id', 'name'],
          },
          (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
              const placeId = results[0].place_id;
              
              if (!placeId) {
                setError('No se encontró el lugar');
                setImages([]);
                setIsLoading(false);
                return;
              }

              // Step 2: Get full details with all photos
              service.getDetails(
                {
                  placeId: placeId,
                  fields: ['photos', 'name'],
                },
                (place, detailStatus) => {
                  if (detailStatus === window.google.maps.places.PlacesServiceStatus.OK && place?.photos) {
                    const fetchedImages: HotelImage[] = place.photos
                      .slice(0, maxImages)
                      .map((photo, index) => ({
                        id: `${placeId}-${index}`,
                        imageUrl: photo.getUrl({ maxWidth: 800 }),
                        attribution: photo.html_attributions[0] 
                          ? photo.html_attributions[0].replace(/<[^>]*>/g, '') 
                          : 'Google Places',
                      }));

                    placesImageCache[cacheKey] = fetchedImages;
                    setImages(fetchedImages);
                  } else {
                    setImages([]);
                  }
                  setIsLoading(false);
                }
              );
            } else {
              setError('No se encontró el hotel');
              setImages([]);
              setIsLoading(false);
            }
          }
        );
      } catch (err) {
        console.warn('Google Places fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setImages([]);
        setIsLoading(false);
      }
    };

    fetchImages();

    // Cleanup
    return () => {
      if (attributionRef.current && attributionRef.current.parentNode) {
        attributionRef.current.parentNode.removeChild(attributionRef.current);
        attributionRef.current = null;
      }
    };
  }, [hotelName, hotelLocation, maxImages]);

  return { images, isLoading, error };
}
