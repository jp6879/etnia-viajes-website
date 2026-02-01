import { Star, MapPin, ExternalLink, Loader2 } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";
import { useGooglePlacesReviews, GoogleReview } from "@/hooks/useGooglePlacesReviews";

// Fallback reviews in case API fails
const fallbackTestimonials = [
  {
    author_name: "Karina Perez",
    text: "Excelente atención por parte de Agos! Nos asesoraron y acompañaron en toda la planificación del viaje y luego mientras estuvimos allá. Excelenta la atención, super comendable, atenta a cada detalle y necesidad tanto para los requisitos de ingresos como atención en temas relacionados en el lugar. 100% recomendado",
    rating: 5,
    relative_time_description: "hace 2 meses",
    time: Date.now() / 1000,
  },
  {
    author_name: "Camilo Perona",
    text: "¡Qué lindo viaje nos armaron! Fuimos al Caribe y todo salió perfecto: los hoteles, las excursiones y hasta los transfers. Son dos chicas re copadas que realmente se meten en cada detalle y se nota: nos sentimos acompañados todo el tiempo y sin sorpresas en el precio.",
    rating: 5,
    relative_time_description: "hace 3 meses",
    time: Date.now() / 1000,
  },
  {
    author_name: "Eliana Gauna",
    text: "Excelente trabajo del equipo de etnia, desde el armado del paquete según nuestras necesidades, hasta el acompañamiento y la asistencia durante todo el viaje. Gracias infinitas!",
    rating: 5,
    relative_time_description: "hace 4 meses",
    time: Date.now() / 1000,
  },
  {
    author_name: "Lorena Nuñez",
    text: "Acompañamiento de parte de agostina y equipo en todo momento. Ayuda en la dudas y resolución. Verificar si llegaste bien o tuviste alguna situación con el vuelo y cuando te hospedas, es algo que no me había sucedido con otras agencias.",
    rating: 5,
    relative_time_description: "hace 5 meses",
    time: Date.now() / 1000,
  },
];

interface TestimonialCardProps {
  review: GoogleReview | typeof fallbackTestimonials[0];
  index: number;
}

const TestimonialCard = ({ review, index }: TestimonialCardProps) => {
  // Get initials from author name
  const initials = review.author_name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Get profile photo if available
  const profilePhoto = 'profile_photo_url' in review ? review.profile_photo_url : null;

  return (
    <motion.div 
      className="bg-card rounded-xl p-6 shadow-sm border border-border h-full flex flex-col"
      whileHover={{ 
        y: -8, 
        boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.15)",
        borderColor: "hsl(var(--primary) / 0.3)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="flex gap-1 mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {[...Array(review.rating)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 500 }}
          >
            <Star className="h-4 w-4 fill-sunset text-sunset" />
          </motion.div>
        ))}
      </motion.div>
      <p className="text-foreground mb-6 leading-relaxed italic text-sm flex-grow">
        "{review.text}"
      </p>
      <div className="flex items-center gap-3">
        {profilePhoto ? (
          <motion.img
            src={profilePhoto}
            alt={review.author_name}
            className="w-10 h-10 rounded-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
            referrerPolicy="no-referrer"
          />
        ) : (
          <motion.div
            className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {initials}
          </motion.div>
        )}
        <div>
          <p className="font-semibold text-foreground text-sm">{review.author_name}</p>
          <p className="text-xs text-muted-foreground">
            Google Maps • {review.relative_time_description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const { 
    reviews, 
    placeRating, 
    totalReviews, 
    placeUrl, 
    isLoading, 
    error 
  } = useGooglePlacesReviews(4);

  // Use API reviews or fallback
  const displayReviews = reviews.length > 0 ? reviews : fallbackTestimonials;
  const displayRating = placeRating || 5.0;
  const googleMapsUrl = placeUrl || "https://maps.app.goo.gl/jWUH1m15nppsDWTj9";

  return (
    <section className="py-20 bg-background" id="testimonios">
      <div className="container">
        <ScrollAnimation variant="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Lo Que Dicen Nuestros Viajeros
          </h2>
          <p className="text-lg text-muted-foreground">
            Historias reales de personas que confiaron en nosotros para crear 
            sus experiencias de viaje inolvidables.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(displayRating) 
                      ? "fill-sunset text-sunset" 
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-foreground">{displayRating.toFixed(1)}</span>
            <span className="text-muted-foreground">
              en Google Maps
              {totalReviews && ` (${totalReviews} reseñas)`}
            </span>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline ml-2"
            >
              <MapPin className="h-4 w-4" />
              Ver en Google Maps
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </ScrollAnimation>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-3 text-muted-foreground">Cargando reseñas...</span>
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
            {displayReviews.map((review, index) => (
              <StaggerItem key={`review-${index}`}>
                <TestimonialCard review={review} index={index} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}

        {error && !isLoading && reviews.length === 0 && (
          <p className="text-center text-sm text-muted-foreground mt-4">
            Mostrando reseñas destacadas
          </p>
        )}

        <div className="text-center mt-10">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Ver todas las reseñas en Google Maps
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
