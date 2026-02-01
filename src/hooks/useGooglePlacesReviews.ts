import { useState, useEffect, useRef } from 'react';
import { loadGoogleMapsScript } from '@/lib/googleMaps';

export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface PlaceDetails {
  name?: string;
  rating?: number;
  user_ratings_total?: number;
  reviews?: GoogleReview[];
  url?: string;
}

interface UseGooglePlacesReviewsResult {
  reviews: GoogleReview[];
  placeRating: number | null;
  totalReviews: number | null;
  placeName: string | null;
  placeUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

// Cache to avoid duplicate API calls
const reviewsCache: Record<string, PlaceDetails> = {};

// Search query for Etnia Viajes
const ETNIA_VIAJES_SEARCH = 'Etnia Viajes Córdoba Argentina';

/**
 * Hook to fetch reviews from Google Places API for Etnia Viajes
 * Uses findPlaceFromQuery to get the current Place ID, then fetches reviews
 * @param maxReviews - Maximum number of reviews to return (default: 5, max from API is 5)
 */
export function useGooglePlacesReviews(
  maxReviews: number = 5
): UseGooglePlacesReviewsResult {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [placeRating, setPlaceRating] = useState<number | null>(null);
  const [totalReviews, setTotalReviews] = useState<number | null>(null);
  const [placeName, setPlaceName] = useState<string | null>(null);
  const [placeUrl, setPlaceUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const attributionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cacheKey = `reviews-etnia-viajes-${maxReviews}`;
    
    // Check cache first
    if (reviewsCache[cacheKey]) {
      const cached = reviewsCache[cacheKey];
      setReviews(cached.reviews?.slice(0, maxReviews) || []);
      setPlaceRating(cached.rating || null);
      setTotalReviews(cached.user_ratings_total || null);
      setPlaceName(cached.name || null);
      setPlaceUrl(cached.url || null);
      setIsLoading(false);
      return;
    }

    const fetchReviews = async () => {
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
        
        // Step 1: Find Etnia Viajes to get current Place ID
        service.findPlaceFromQuery(
          {
            query: ETNIA_VIAJES_SEARCH,
            fields: ['place_id', 'name'],
          },
          (results, findStatus) => {
            if (findStatus === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
              const placeId = results[0].place_id;
              
              if (!placeId) {
                setError('No se encontró el lugar');
                setIsLoading(false);
                return;
              }

              // Step 2: Get place details with reviews
              service.getDetails(
                {
                  placeId: placeId,
                  fields: ['name', 'rating', 'user_ratings_total', 'reviews', 'url'],
                },
                (place, detailStatus) => {
                  if (detailStatus === window.google.maps.places.PlacesServiceStatus.OK && place) {
                    const placeDetails: PlaceDetails = {
                      name: place.name,
                      rating: place.rating,
                      user_ratings_total: place.user_ratings_total,
                      reviews: place.reviews as GoogleReview[] || [],
                      url: place.url,
                    };

                    // Cache the results
                    reviewsCache[cacheKey] = placeDetails;

                    // Sort reviews by rating (highest first) and date
                    const sortedReviews = [...(placeDetails.reviews || [])]
                      .sort((a, b) => {
                        // Prioritize 5-star reviews
                        if (b.rating !== a.rating) return b.rating - a.rating;
                        // Then by most recent
                        return b.time - a.time;
                      })
                      .slice(0, maxReviews);

                    setReviews(sortedReviews);
                    setPlaceRating(placeDetails.rating || null);
                    setTotalReviews(placeDetails.user_ratings_total || null);
                    setPlaceName(placeDetails.name || null);
                    setPlaceUrl(placeDetails.url || null);
                  } else {
                    setError('No se pudieron cargar los detalles del lugar');
                  }
                  setIsLoading(false);
                }
              );
            } else {
              setError('No se encontró Etnia Viajes');
              setIsLoading(false);
            }
          }
        );
      } catch (err) {
        console.warn('Google Places reviews fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setReviews([]);
        setIsLoading(false);
      }
    };

    fetchReviews();

    // Cleanup
    return () => {
      if (attributionRef.current && attributionRef.current.parentNode) {
        attributionRef.current.parentNode.removeChild(attributionRef.current);
        attributionRef.current = null;
      }
    };
  }, [maxReviews]);

  return { reviews, placeRating, totalReviews, placeName, placeUrl, isLoading, error };
}
