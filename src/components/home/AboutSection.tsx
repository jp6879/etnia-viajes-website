import { ScrollAnimation } from "@/components/ui/scroll-animation";
import { motion } from "framer-motion";
import etniaLogoFull from "@/assets/etnia-logo-full.jpg";

export const AboutSection = () => {
  return (
    <section id="quienes-somos" className="relative py-20 bg-secondary/30 overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-multiply" 
        style={{ 
          backgroundImage: 'url(/bg-world-map.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image/Logo Side */}
          <ScrollAnimation variant="slideLeft">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="aspect-square bg-white rounded-2xl shadow-xl flex items-center justify-center p-12">
                <img 
                  src={etniaLogoFull}
                  alt="Etnia Viajes - Agencia de viajes en Argentina"
                  className="w-full h-auto max-w-md"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full -z-10" />
            </motion.div>
          </ScrollAnimation>

          {/* Text Side */}
          <ScrollAnimation variant="slideRight" delay={0.2}>
            <div className="space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Quiénes Somos
              </h2>
              
              <div className="space-y-4 text-foreground leading-relaxed">
                <p className="text-lg">
                  <strong className="text-foreground">Etnia Viajes</strong> es una agencia de viajes en Argentina especializada en viajes internacionales al Caribe, Brasil, Estados Unidos, Europa y destinos exóticos alrededor del mundo.
                </p>
                
                <p>
                  Creamos experiencias de viaje pensadas para quienes sueñan con descubrir nuevos lugares, combinando vuelos, hoteles, traslados y asistencia al viajero en propuestas diseñadas para parejas, familias y grupos.
                </p>
                
                <p>
                  Desde playas de arena blanca en el Caribe, ciudades vibrantes en Estados Unidos, paisajes inolvidables de Brasil y recorridos mágicos por Europa, hasta destinos exóticos y rincones únicos del mundo, en Etnia Viajes transformamos cada viaje en una historia para recordar.
                </p>
                
                <p>
                  También ofrecemos viajes y escapadas dentro de Argentina, para quienes quieren seguir explorando sin ir tan lejos.
                </p>
                
                <p className="text-primary font-medium italic">
                  Porque creemos que el mundo es demasiado grande y hermoso como para no vivirlo, te acompañamos en cada paso para que solo tengas que disfrutar de la aventura.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};
