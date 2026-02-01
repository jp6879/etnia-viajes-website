import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

const packages = [
    {
    id: "last-minute",
    title: "LAST MINUTE!!",
    description: "<strong>Ofertas imperdibles en vuelos y paquetes</strong> para viajar al Caribe, Estados Unidos, Brasil, Europa y destinos de todo el mundo con precios de oportunidad.",
    image: "https://img1.wsimg.com/isteam/ip/6ebc1dc4-462f-4c61-b84b-6ecd5767cfcd/FBCS4295%5B1%5D.JPG/:/rs=w:720,h:720",
    href: "/paquetes/last-minute#destinos"
  },
  {
    id: "nacionales",
    title: "Nacionales",
    description: "<strong>Recorré Argentina de punta a punta</strong>. Desde los glaciares de la Patagonia hasta las Cataratas del Iguazú y los viñedos de Mendoza.",
    image: "https://img1.wsimg.com/isteam/ip/6ebc1dc4-462f-4c61-b84b-6ecd5767cfcd/HQTD1460%5B1%5D.JPG/:/rs=w:720,h:720",
    href: "/paquetes/nacionales#destinos",
  },
  {
    id: "caribe",
    title: "Caribe",
    description: "<strong>Playas de arena blanca y resorts all inclusive</strong> en Punta Cana, Cancún, Aruba y La Habana. Tu escape perfecto al paraíso tropical.",
    image: "https://img1.wsimg.com/isteam/ip/6ebc1dc4-462f-4c61-b84b-6ecd5767cfcd/VACACIONES%20DE%20VERANO%20EN%20MICHES.JPG/:/rs=w:720,h:720",
    href: "/paquetes/caribe#destinos",
  },
  {
    id: "europa",
    title: "Europa",
    description: "<strong>Historia, arte y gastronomía</strong> en un solo viaje. Circuitos por París, Roma, Praga y las costas mediterráneas más exclusivas.",
    image: "https://img1.wsimg.com/isteam/ip/6ebc1dc4-462f-4c61-b84b-6ecd5767cfcd/FFVG9722%5B1%5D.JPG/:/rs=w:720,h:720",
    href: "/paquetes/europa#destinos",
  },
  {
    id: "exoticos",
    title: "Destinos Exóticos",
    description: "<strong>Aventuras únicas en lugares remotos</strong>: safaris en Kenia, templos en Bali, selvas en Borneo y la cultura mística de Vietnam.",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80",
    href: "/paquetes/exoticos#destinos",
  },
  {
    id: "estados-unidos",
    title: "Estados Unidos",
    description: "<strong>Ciudades vibrantes y parques nacionales</strong>. Desde la magia de Nueva York hasta los paisajes de la Costa Oeste y la mítica Ruta 66.",
    image: "https://img1.wsimg.com/isteam/ip/6ebc1dc4-462f-4c61-b84b-6ecd5767cfcd/IMG_3118%5B1%5D.JPG/:/cr=t:12.5%25,l:0%25,w:100%25,h:100%25/rs=w:720,h:720,cg:true",
    href: "/paquetes/estados-unidos#destinos",
  },
  {
    id: "america-latina",
    title: "América Latina",
    description: "<strong>Naturaleza y cultura ancestral</strong>. Explorá Machu Picchu, la selva amazónica y las ciudades coloniales más bellas del continente.",
    image: "https://img1.wsimg.com/isteam/ip/6ebc1dc4-462f-4c61-b84b-6ecd5767cfcd/IMG_1644%5B1%5D.JPG/:/cr=t:12.5%25,l:0%25,w:100%25,h:100%25/rs=w:720,h:720,cg:true",
    href: "/paquetes/america-latina#destinos",
  },
  {
    id: "grupales",
    title: "Grupales",
    description: "<strong>Viajá acompañado y sin preocupaciones</strong>. Experiencias organizadas con todo incluido para disfrutar en grupo desde Argentina.",
    image: "https://img1.wsimg.com/isteam/ip/6ebc1dc4-462f-4c61-b84b-6ecd5767cfcd/IMG_3087%5B1%5D.JPG/:/cr=t:12.49%25,l:0%25,w:100%25,h:75.03%25/rs=w:720,h:720,cg:true",
    href: "/paquetes/grupales#destinos",
  },
  {
    id: "lunas-de-miel",
    title: "Lunas de Miel",
    description: "<strong>Momentos románticos inolvidables</strong>. Los mejores destinos del mundo seleccionados para que tu viaje de novios sea perfecto.",
    image: "https://img1.wsimg.com/isteam/ip/6ebc1dc4-462f-4c61-b84b-6ecd5767cfcd/IMG_3085%5B1%5D.JPG/:/cr=t:11.62%25,l:0%25,w:100%25,h:76.76%25/rs=w:720,h:720,cg:true",
    href: "/paquetes/lunas-de-miel#destinos",
  }
];

export const PackagesSection = () => {
  return (
    <section className="relative py-20 bg-secondary scroll-mt-24 overflow-hidden" id="paquetes">
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
        <ScrollAnimation variant="fadeUp" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nuestros Paquetes de Viaje
          </h2>
          <p className="text-lg text-muted-foreground">
            Explorá nuestra selección de destinos y encontrá el viaje perfecto para vos. 
            Paquetes diseñados con atención al detalle y experiencias inolvidables.
          </p>
        </ScrollAnimation>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" staggerDelay={0.1}>
          {packages.map((pkg) => (
            <StaggerItem key={pkg.id}>
              <Link to={pkg.href} className="group block h-full">
                <Card 
                  className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-2"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={`Paquetes de viaje a ${pkg.title} - Etnia Viajes`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 font-display text-2xl font-bold text-white">
                      {pkg.title}
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4" dangerouslySetInnerHTML={{ __html: pkg.description }} />
                    <span className="inline-flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      Ver paquetes <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
