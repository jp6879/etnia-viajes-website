import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80"
          className="absolute inset-0 w-full h-full object-cover"
          aria-label="Video de paisaje natural representando destinos de viaje"
        >
          <source 
            src="/3015510-hd_1920_1080_24fps.mp4" 
            type="video/mp4" 
          />
          {/* Fallback for browsers that don't support video */}
          Tu navegador no soporta videos HTML5.
        </video>
      </motion.div>
      
      {/* Overlay */}
      <div className="absolute inset-0" />
      
      {/* Content */}
      <div className="relative z-10 container text-center text-white px-4">
        <motion.div 
          className="max-w-10xl mx-auto space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          
          <motion.h1 
            className="font-display text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-balance"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
            }}
          >
            DESCUBRÍ EL MUNDO CON NOSOTROS
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
            }}
          >
            Viajes al Caribe, Europa, América Latina, 
            Estados Unidos y destinos exóticos diseñados especialmente para vos.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
            }}
          >
            <Button 
              asChild 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
            >
              <a href="#paquetes">
                Ver Paquetes
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            {/* <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 bg-white/10 border-white text-white hover:bg-white hover:text-primary transition-transform hover:scale-105"
            >
              <Link to="/contacto">
                Consultá tu Viaje
              </Link>
            </Button> */}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div 
          className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
