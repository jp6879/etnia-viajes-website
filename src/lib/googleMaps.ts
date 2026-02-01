/**
 * Google Maps Script Loader (New Places API)
 * Loads the Google Maps JavaScript API with Places library using dynamic import
 */

let isLoading = false;
let isLoaded = false;
let loadPromise: Promise<void> | null = null;
let placesLibrary: google.maps.PlacesLibrary | null = null;

export function loadGoogleMapsScript(): Promise<void> {
  // If already loaded, return immediately
  if (isLoaded && placesLibrary) {
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
      // Wait for it to load and import library
      const checkLoaded = setInterval(async () => {
        if (window.google?.maps?.importLibrary) {
          clearInterval(checkLoaded);
          try {
            placesLibrary = await window.google.maps.importLibrary('places') as google.maps.PlacesLibrary;
            isLoaded = true;
            isLoading = false;
            resolve();
          } catch (err) {
            isLoading = false;
            reject(err);
          }
        }
      }, 100);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        clearInterval(checkLoaded);
        if (!isLoaded) {
          isLoading = false;
          reject(new Error('Google Maps script load timeout'));
        }
      }, 10000);
      
      return;
    }

    // Create and append script with async loading
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;
    script.defer = true;
    
    script.onload = async () => {
      try {
        // Import the places library using dynamic import
        placesLibrary = await window.google.maps.importLibrary('places') as google.maps.PlacesLibrary;
        isLoaded = true;
        isLoading = false;
        resolve();
      } catch (err) {
        isLoading = false;
        reject(err);
      }
    };
    
    script.onerror = () => {
      isLoading = false;
      reject(new Error('Failed to load Google Maps script'));
    };
    
    document.head.appendChild(script);
  });

  return loadPromise;
}

// Get the Place class from loaded library
export function getPlaceClass(): typeof google.maps.places.Place | null {
  return placesLibrary?.Place || null;
}

// Type declarations for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

// Extend Google Maps types for the new Places API
declare namespace google.maps {
  function importLibrary(name: 'places'): Promise<PlacesLibrary>;
  
  interface PlacesLibrary {
    Place: typeof google.maps.places.Place;
  }
}

declare namespace google.maps.places {
  class Place {
    constructor(options: { id: string });
    
    static searchByText(request: SearchByTextRequest): Promise<{ places: Place[] }>;
    
    fetchFields(options: { fields: string[] }): Promise<Place>;
    
    id: string;
    displayName: string | null;
    photos: Photo[] | null;
    rating: number | null;
    userRatingCount: number | null;
    reviews: Review[] | null;
    googleMapsURI: string | null;
  }
  
  interface SearchByTextRequest {
    textQuery: string;
    fields: string[];
    maxResultCount?: number;
  }
  
  interface Photo {
    getURI(options?: { maxWidth?: number; maxHeight?: number }): string;
    authorAttributions: AuthorAttribution[];
  }
  
  interface AuthorAttribution {
    displayName: string;
    uri: string;
    photoURI: string;
  }
  
  interface Review {
    authorAttribution: AuthorAttribution;
    rating: number;
    relativePublishTimeDescription: string;
    text: { text: string } | null;
    publishTime: string;
  }
}
