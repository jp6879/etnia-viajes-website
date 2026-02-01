import { useState, useEffect } from 'react';
import { loadGoogleMapsScript, getPlaceClass } from '@/lib/googleMaps';

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
 * Hook to fetch reviews from Google Places API (New) for Etnia Viajes
 * Uses Place.searchByText to find the place, then fetchFields for details
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
        // Load Google Maps script and Places library
        await loadGoogleMapsScript();
        
        const Place = getPlaceClass();
        if (!Place) {
          throw new Error('Place class not available');
        }

        // Search for Etnia Viajes using new API
        const { places } = await Place.searchByText({
          textQuery: ETNIA_VIAJES_SEARCH,
          fields: ['id', 'displayName', 'rating', 'userRatingCount', 'reviews', 'googleMapsURI'],
          maxResultCount: 1,
        });

        if (places && places.length > 0) {
          const place = places[0];
          
          // Convert new review format to our format
          const convertedReviews: GoogleReview[] = (place.reviews || []).map((review) => ({
            author_name: review.authorAttribution?.displayName || 'Usuario',
            author_url: review.authorAttribution?.uri,
            profile_photo_url: review.authorAttribution?.photoURI,
            rating: review.rating || 0,
            relative_time_description: review.relativePublishTimeDescription || '',
            text: review.text?.text || '',
            time: new Date(review.publishTime).getTime() / 1000,
          }));

          const placeDetails: PlaceDetails = {
            name: place.displayName || undefined,
            rating: place.rating || undefined,
            user_ratings_total: place.userRatingCount || undefined,
            reviews: convertedReviews,
            url: place.googleMapsURI || undefined,
          };

          // Cache the results
          reviewsCache[cacheKey] = placeDetails;

          // Sort reviews by rating (highest first) and date
          const sortedReviews = [...convertedReviews]
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
          setError('No se encontró Etnia Viajes');
        }
      } catch (err) {
        console.warn('Google Places reviews fetch failed:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setReviews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [maxReviews]);

  return { reviews, placeRating, totalReviews, placeName, placeUrl, isLoading, error };
}
