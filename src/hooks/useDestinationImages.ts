import { useState, useEffect } from 'react';

interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
  };
  links: {
    html: string;
  };
}

export interface DestinationImage {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  alt: string;
  photographerName: string;
  photographerUrl: string;
  sourceUrl: string;
  source: 'unsplash' | 'pixabay';
}

interface UseDestinationImagesResult {
  images: DestinationImage[];
  isLoading: boolean;
  error: string | null;
}

// Simple in-memory cache to avoid duplicate requests
const imageCache: Record<string, DestinationImage[]> = {};

/**
 * Hook to fetch destination images from Unsplash API
 * Falls back to Pixabay if Unsplash key is not configured
 * @param destinationName - Name of the destination (e.g., "Cancún", "Paris")
 * @param maxImages - Maximum number of images to return (default: 10)
 */
export function useDestinationImages(
  destinationName: string,
  maxImages: number = 10
): UseDestinationImagesResult {
  const [images, setImages] = useState<DestinationImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!destinationName) {
      setImages([]);
      setIsLoading(false);
      return;
    }

    const cacheKey = `${destinationName}-${maxImages}`;
    
    // Check cache first
    if (imageCache[cacheKey]) {
      setImages(imageCache[cacheKey]);
      setIsLoading(false);
      return;
    }

    const fetchFromUnsplash = async (): Promise<DestinationImage[] | null> => {
      const unsplashKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
      
      if (!unsplashKey) {
        return null;
      }

      try {
        const searchQuery = `${destinationName} travel`;
        const encodedQuery = encodeURIComponent(searchQuery);
        
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodedQuery}&per_page=${maxImages}&orientation=landscape`,
          {
            headers: {
              'Authorization': `Client-ID ${unsplashKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch from Unsplash');
        }

        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          return data.results.map((img: UnsplashImage) => ({
            id: img.id,
            imageUrl: img.urls.regular,
            thumbnailUrl: img.urls.small,
            alt: img.alt_description || img.description || `${destinationName} travel photo`,
            photographerName: img.user.name,
            photographerUrl: img.user.links.html,
            sourceUrl: img.links.html,
            source: 'unsplash' as const,
          }));
        }
        
        return [];
      } catch (err) {
        console.warn('Unsplash fetch failed:', err);
        return null;
      }
    };

    const fetchFromPixabay = async (): Promise<DestinationImage[]> => {
      const pixabayKey = import.meta.env.VITE_PIXABAY_API_KEY;
      
      if (!pixabayKey) {
        return [];
      }

      try {
        const searchQuery = `${destinationName} travel landscape`;
        const encodedQuery = encodeURIComponent(searchQuery);
        
        const response = await fetch(
          `https://pixabay.com/api/?key=${pixabayKey}&q=${encodedQuery}&image_type=photo&category=travel&per_page=${maxImages}&safesearch=true&orientation=horizontal`
        );

        if (!response.ok) {
          return [];
        }

        const data = await response.json();
        
        if (data.hits && data.hits.length > 0) {
          return data.hits.map((img: any) => ({
            id: String(img.id),
            imageUrl: img.largeImageURL,
            thumbnailUrl: img.webformatURL,
            alt: img.tags || `${destinationName} travel photo`,
            photographerName: img.user,
            photographerUrl: `https://pixabay.com/users/${img.user}-${img.user_id}/`,
            sourceUrl: img.pageURL,
            source: 'pixabay' as const,
          }));
        }
        
        return [];
      } catch (err) {
        console.warn('Pixabay fetch failed:', err);
        return [];
      }
    };

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Try Unsplash first
        let fetchedImages = await fetchFromUnsplash();
        
        // Fall back to Pixabay if Unsplash fails or returns no results
        if (!fetchedImages || fetchedImages.length === 0) {
          fetchedImages = await fetchFromPixabay();
        }
        
        if (fetchedImages.length > 0) {
          imageCache[cacheKey] = fetchedImages;
          setImages(fetchedImages);
        } else {
          setError('No images found');
          setImages([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [destinationName, maxImages]);

  return { images, isLoading, error };
}
