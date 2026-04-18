import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GlassButton, GlassFilter } from "@/components/ui/liquid-glass";

export const CTASection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      <GlassFilter />
      {/* Background with parallax */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80')",
          y,
        }}
        role="img"
        aria-label="Playa paradisíaca invitando a viajar"
      />
      <div className="absolute inset-0 bg-primary/80" />
      
      {/* Content */}
      <div className="relative z-10 container text-center text-white">
        <motion.h2 
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          ¿Listo para tu Próxima Aventura?
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Contanos qué tipo de viaje soñás y te ayudamos a hacerlo realidad. 
          Consultas sin cargo ni compromiso.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <GlassButton href="https://wa.me/5491124943224?text=Hola!%20Quiero%20consultar%20por%20un%20viaje">
            <div className="text-white flex items-center gap-2">
              Escribinos por WhatsApp
              <ArrowRight className="h-5 w-5" />
            </div>
          </GlassButton>
        </motion.div>
      </div>
    </section>
  );
};
