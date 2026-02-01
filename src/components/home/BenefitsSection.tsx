import { Compass, Heart, Shield, Users, Clock, Award } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Compass,
    title: "Viajes a Medida",
    description: "Diseñamos cada itinerario según tus preferencias, intereses y presupuesto. Tu viaje, a tu manera.",
  },
  {
    icon: Heart,
    title: "Experiencias Auténticas",
    description: "Conectamos con culturas locales para brindarte vivencias genuinas que van más allá del turismo tradicional.",
  },
  {
    icon: Shield,
    title: "Seguridad y Respaldo",
    description: "Viajá tranquilo con nuestra cobertura integral, asistencia 24/7 y el respaldo de una agencia consolidada.",
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description: "Un asesor dedicado te acompaña en todo el proceso, desde la planificación hasta tu regreso.",
  },
  {
    icon: Clock,
    title: "Flexibilidad Total",
    description: "Modificá fechas, destinos o servicios sin complicaciones. Nos adaptamos a tus necesidades.",
  },
  {
    icon: Award,
    title: "Años de Experiencia",
    description: "Más de una década creando viajes inolvidables para miles de viajeros satisfechos.",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <ScrollAnimation variant="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Por Qué Elegir Etnia Viajes?
          </h2>
          <p className="text-lg text-muted-foreground">
            Somos más que una agencia de viajes. Somos tu compañero de aventuras, 
            dedicados a crear experiencias que transforman.
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.08}>
          {benefits.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <motion.div 
                className="bg-background rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div 
                  className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <benefit.icon className="h-7 w-7 text-primary" />
                </motion.div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
