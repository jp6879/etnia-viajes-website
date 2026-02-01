import { Star, ExternalLink, Loader2, Camera, Quote } from "lucide-react";
import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";
import { useGooglePlacesReviews, GoogleReview } from "@/hooks/useGooglePlacesReviews";
import { useGooglePlacesPhotos, PlacePhoto } from "@/hooks/useGooglePlacesPhotos";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/Nm3DZisCQxksgRag9";

// Review Card Component
const ReviewCard = ({ review, variant = "default" }: { review: GoogleReview; variant?: "default" | "featured" }) => {
  const isFeatured = variant === "featured";
  
  return (
    <motion.div 
      className={`
        relative bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-6 shadow-sm 
        border border-stone-200/50 flex flex-col
        ${isFeatured ? 'row-span-2' : ''}
      `}
      whileHover={{ 
        y: -4, 
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.12)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Quote Icon */}
      <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
      
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      
      {/* Review Text */}
      <p className={`text-stone-700 leading-relaxed flex-grow ${isFeatured ? 'text-base' : 'text-sm'}`}>
        "{review.text}"
      </p>
      
      {/* Author */}
      <div className="mt-4 pt-4 border-t border-stone-200/50">
        <p className="font-semibold text-stone-800">{review.author_name}</p>
        <p className="text-xs text-stone-500">{review.relative_time_description}</p>
      </div>
    </motion.div>
  );
};

// Photo Card Component
const PhotoCard = ({ photo, size = "default" }: { photo: PlacePhoto; size?: "default" | "large" | "tall" }) => {
  const sizeClasses = {
    default: "",
    large: "col-span-2 row-span-2",
    tall: "row-span-2",
  };
  
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl group cursor-pointer
        ${sizeClasses[size]}
      `}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img
        src={photo.url}
        alt="Viajeros en destino"
        className="w-full h-full object-cover min-h-[200px] transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Attribution overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Camera className="h-4 w-4" />
        <span className="text-xs font-medium truncate">{photo.authorName}</span>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-white/40 rounded-tl-lg" />
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const { 
    reviews, 
    placeRating, 
    totalReviews, 
    isLoading: reviewsLoading, 
  } = useGooglePlacesReviews(5);
  
  const { 
    photos, 
    isLoading: photosLoading 
  } = useGooglePlacesPhotos(6);

  const isLoading = reviewsLoading || photosLoading;
  const displayRating = placeRating || 5.0;

  // Interleave reviews and photos for the grid
  const gridItems: Array<{ type: 'review' | 'photo'; data: GoogleReview | PlacePhoto; variant?: string }> = [];
  
  const maxItems = Math.max(reviews.length, photos.length);
  for (let i = 0; i < maxItems; i++) {
    if (i < photos.length && i === 0) {
      gridItems.push({ type: 'photo', data: photos[i], variant: 'large' });
    } else if (i < reviews.length) {
      gridItems.push({ type: 'review', data: reviews[i], variant: i === 0 ? 'featured' : 'default' });
    }
    if (i < photos.length && i > 0) {
      gridItems.push({ type: 'photo', data: photos[i], variant: i === 2 ? 'tall' : 'default' });
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-stone-50" id="testimonios">
      <div className="container">
        {/* Header */}
        <ScrollAnimation variant="fadeUp" className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4 fill-current" />
            {displayRating.toFixed(1)} en Google Maps
            {totalReviews && ` • ${totalReviews} reseñas`}
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Historias de Viajeros <span className="text-primary">Felices</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experiencias reales de quienes confiaron en nosotros para crear 
            sus aventuras inolvidables alrededor del mundo
          </p>
        </ScrollAnimation>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <span className="ml-4 text-muted-foreground text-lg">Cargando experiencias...</span>
          </div>
        ) : (
          <>
            {/* Masonry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
              {gridItems.map((item, index) => (
                <motion.div
                  key={`item-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className={
                    item.type === 'photo' && item.variant === 'large' ? 'col-span-1 md:col-span-2 row-span-2' :
                    item.type === 'photo' && item.variant === 'tall' ? 'row-span-2' :
                    item.type === 'review' && item.variant === 'featured' ? 'row-span-2' :
                    ''
                  }
                >
                  {item.type === 'review' ? (
                    <ReviewCard 
                      review={item.data as GoogleReview} 
                      variant={item.variant as "default" | "featured"} 
                    />
                  ) : (
                    <PhotoCard 
                      photo={item.data as PlacePhoto} 
                      size={item.variant as "default" | "large" | "tall"} 
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Ver todas las reseñas y fotos
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
