/**
 * Google Maps Script Loader (New Places API)
 * Uses @googlemaps/js-api-loader with new functional API
 */

import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

let placesLibrary: google.maps.PlacesLibrary | null = null;
let loadPromise: Promise<void> | null = null;
let isInitialized = false;

const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_NEW_KEY;

function initializeLoader() {
  if (!isInitialized && apiKey) {
    setOptions({
      key: apiKey,
      v: 'weekly',
    });
    isInitialized = true;
  }
}

export async function loadGoogleMapsScript(): Promise<void> {
  if (!apiKey) {
    throw new Error('Google Places API key not configured');
  }

  if (placesLibrary) {
    return;
  }

  if (loadPromise) {
    await loadPromise;
    return;
  }

  initializeLoader();

  loadPromise = (async () => {
    placesLibrary = await importLibrary('places');
  })();

  await loadPromise;
}

export function getPlaceClass(): typeof google.maps.places.Place | null {
  return placesLibrary?.Place || null;
}
