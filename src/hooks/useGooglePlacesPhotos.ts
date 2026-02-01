import { useState, useEffect } from 'react';
import { loadGoogleMapsScript, getPlaceClass } from '@/lib/googleMaps';

// Etnia Viajes Place ID (constant - doesn't change)
const ETNIA_VIAJES_PLACE_ID = 'ChIJGy7adgCjMpQR9Hao6vV-igs';

export interface PlacePhoto {
  url: string;
  attribution: string;
  authorName: string;
}

interface UseGooglePlacesPhotosResult {
  photos: PlacePhoto[];
  isLoading: boolean;
  error: string | null;
}

// Cache to avoid duplicate API calls
let photosCache: PlacePhoto[] | null = null;

/**
 * Hook to fetch photos from Etnia Viajes Google Business profile
 * Uses Place ID directly for reliable results
 * @param maxPhotos - Maximum number of photos (default: 10, max from API is 10)
 */
export function useGooglePlacesPhotos(
  maxPhotos: number = 10
): UseGooglePlacesPhotosResult {
  const [photos, setPhotos] = useState<PlacePhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check cache first
    if (photosCache) {
      setPhotos(photosCache.slice(0, maxPhotos));
      setIsLoading(false);
      return;
    }

    const fetchPhotos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await loadGoogleMapsScript();
        
        const Place = getPlaceClass();
        if (!Place) {
          throw new Error('Place class not available');
        }

        // Create Place instance with known Place ID
        const place = new Place({ id: ETNIA_VIAJES_PLACE_ID });
        
        // Fetch only photos field
        await place.fetchFields({ fields: ['photos'] });

        if (place.photos && place.photos.length > 0) {
          // Convert all photos
          const allPhotos: PlacePhoto[] = place.photos.map((photo) => ({
            url: photo.getURI({ maxWidth: 800 }),
            attribution: photo.authorAttributions?.[0]?.uri || '',
            authorName: photo.authorAttributions?.[0]?.displayName || 'Google Maps',
          }));

          // Diversify by author - prioritize unique authors
          const seenAuthors = new Set<string>();
          const diversifiedPhotos: PlacePhoto[] = [];
          
          // First pass: add one photo per unique author
          for (const photo of allPhotos) {
            if (!seenAuthors.has(photo.authorName) && diversifiedPhotos.length < maxPhotos) {
              seenAuthors.add(photo.authorName);
              diversifiedPhotos.push(photo);
            }
          }
          
          // Second pass: fill remaining slots with any photos
          for (const photo of allPhotos) {
            if (diversifiedPhotos.length >= maxPhotos) break;
            if (!diversifiedPhotos.includes(photo)) {
              diversifiedPhotos.push(photo);
            }
          }

          photosCache = diversifiedPhotos;
          setPhotos(diversifiedPhotos);
        } else {
          setPhotos([]);
        }
      } catch (err) {
        console.warn('Google Places photos fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setPhotos([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [maxPhotos]);

  return { photos, isLoading, error };
}
