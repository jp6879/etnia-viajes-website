/**
 * Google Maps Script Loader
 * Loads the Google Maps JavaScript API with Places library
 */

let isLoading = false;
let isLoaded = false;
let loadPromise: Promise<void> | null = null;

export function loadGoogleMapsScript(): Promise<void> {
  // If already loaded, return immediately
  if (isLoaded && window.google?.maps?.places) {
    return Promise.resolve();
  }

  // If currently loading, return the existing promise
  if (isLoading && loadPromise) {
    return loadPromise;
  }

  const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
  
  if (!apiKey) {
    return Promise.reject(new Error('Google Places API key not configured'));
  }

  isLoading = true;
  
  loadPromise = new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      // Wait for it to load
      const checkLoaded = setInterval(() => {
        if (window.google?.maps?.places) {
          clearInterval(checkLoaded);
          isLoaded = true;
          isLoading = false;
          resolve();
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkLoaded);
        if (!window.google?.maps?.places) {
          isLoading = false;
          reject(new Error('Google Maps script load timeout'));
        }
      }, 10000);
      
      return;
    }

    // Create and append script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      isLoaded = true;
      isLoading = false;
      resolve();
    };
    
    script.onerror = () => {
      isLoading = false;
      reject(new Error('Failed to load Google Maps script'));
    };
    
    document.head.appendChild(script);
  });

  return loadPromise;
}

// Type declarations for Google Maps
declare global {
  interface Window {
    google: {
      maps: {
        places: {
          PlacesService: new (attrContainer: HTMLElement) => google.maps.places.PlacesService;
          PlacesServiceStatus: {
            OK: string;
            ZERO_RESULTS: string;
          };
        };
      };
    };
  }
}

// Google Maps Places types
declare namespace google.maps.places {
  interface PlacesService {
    findPlaceFromQuery(
      request: FindPlaceFromQueryRequest,
      callback: (results: PlaceResult[] | null, status: string) => void
    ): void;
    getDetails(
      request: { placeId: string; fields: string[] },
      callback: (result: PlaceResult | null, status: string) => void
    ): void;
  }

  interface FindPlaceFromQueryRequest {
    query: string;
    fields: string[];
  }

  interface PlaceResult {
    name?: string;
    place_id?: string;
    photos?: PlacePhoto[];
    rating?: number;
    user_ratings_total?: number;
    reviews?: PlaceReview[];
    url?: string;
  }

  interface PlaceReview {
    author_name: string;
    author_url?: string;
    profile_photo_url?: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
  }

  interface PlacePhoto {
    getUrl(opts: { maxWidth: number; maxHeight?: number }): string;
    html_attributions: string[];
  }
}
