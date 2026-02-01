import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";

const destinations = [
  {
    id: "caribe",
    name: "Caribe",
    tagline: "Paraísos tropicales",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    href: "/destinos/caribe",
  },
  {
    id: "europa",
    name: "Europa",
    tagline: "Historia y cultura",
    image: "https://images.unsplash.com/photo-1493707553966-283afac8c358?w=800&q=80",
    href: "/destinos/europa",
  },
  {
    id: "estados-unidos",
    name: "Estados Unidos",
    tagline: "Aventura americana",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80",
    href: "/destinos/estados-unidos",
  },
  {
    id: "asia",
    name: "Asia",
    tagline: "Misticismo oriental",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    href: "/destinos/asia",
  },
];

export const DestinationsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <ScrollAnimation variant="fadeUp">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Destinos Destacados
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Los destinos más solicitados por nuestros viajeros. Inspirate y comenzá a planear tu próxima aventura.
              </p>
            </div>
            <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <Link 
                to="/destinos" 
                className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all"
              >
                Ver todos los destinos <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
          {destinations.map((destination) => (
            <StaggerItem key={destination.id}>
              <Link 
                to={destination.href}
                className="group relative h-80 rounded-xl overflow-hidden block"
              >
                <motion.div 
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <img
                    src={destination.image}
                    alt={`Viajes a ${destination.name} - Experiencias únicas en ${destination.name}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="text-white/80 text-sm mb-1">{destination.tagline}</p>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {destination.name}
                  </h3>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
