import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";

const offers = [
  {
    id: 1,
    title: "Punta Cana All Inclusive",
    destination: "República Dominicana",
    price: "USD 1.299",
    originalPrice: "USD 1.599",
    duration: "7 noches",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&q=80",
    tag: "Last Minute",
  },
  {
    id: 2,
    title: "Barcelona + Madrid",
    destination: "España",
    price: "USD 1.899",
    originalPrice: "USD 2.299",
    duration: "10 noches",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&q=80",
    tag: "Oferta",
  },
  {
    id: 3,
    title: "Nueva York Imperdible",
    destination: "Estados Unidos",
    price: "USD 1.599",
    originalPrice: "USD 1.899",
    duration: "5 noches",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
    tag: "Destacado",
  },
];

export const OffersSection = () => {
  return (
    <section className="py-20 bg-primary/5" id="ofertas">
      <div className="container">
        <ScrollAnimation variant="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Ofertas Especiales</Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ofertas y Últimos Minutos
          </h2>
          <p className="text-lg text-muted-foreground">
            Aprovechá estas oportunidades únicas con precios especiales y salidas confirmadas. 
            Cupos limitados, ¡no te los pierdas!
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {offers.map((offer) => (
            <StaggerItem key={offer.id}>
              <motion.div 
                className="bg-background rounded-xl overflow-hidden shadow-lg group h-full"
                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={offer.image}
                    alt={`Oferta de viaje a ${offer.destination} - ${offer.title}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <Badge className="absolute top-4 left-4 bg-sunset text-white border-0">
                    {offer.tag}
                  </Badge>
                </div>
                <div className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">{offer.destination}</p>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {offer.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{offer.duration}</span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground line-through">{offer.originalPrice}</p>
                      <p className="text-2xl font-bold text-primary">{offer.price}</p>
                      <p className="text-xs text-muted-foreground">por persona</p>
                    </div>
                    <Button asChild size="sm" className="transition-transform hover:scale-105">
                      <Link to="https://wa.me/5491124943224?text=Hola!%20Quiero%20consultar%20por%20un%20viaje">Consultar</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollAnimation variant="fadeUp" delay={0.4} className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="transition-transform hover:scale-105">
            <Link to="/paquetes#ofertas">
              Ver todas las ofertas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ScrollAnimation>
      </div>
    </section>
  );
};
