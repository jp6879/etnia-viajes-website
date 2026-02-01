import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Clock, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DestinationsBackground } from "@/components/packages/DestinationsBackground";

// Tipo para destinos desde Supabase
interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  tagline: string | null;
  image: string | null;
  price_from: number;
  currency: string | null;
  highlights: string[];
  includes: string | null;
  is_active: boolean;
  order: number;
}

interface RegionConfig {
  slug: string;
  name: string;
  title: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  ctaText?: string;
  whatsappMessage?: string;
  backgroundVariant?: 'caribe' | 'nacionales' | 'europa' | 'brasil' | 'exoticos' | 'sudamerica' | 'estadosunidos' | 'lunasdemiel' | 'lastminute' | 'grupales' | 'default';
}

interface RegionPageProps {
  config: RegionConfig;
  fallbackDestinos?: Destination[];
  beneficios?: {
    icon: React.ElementType;
    title: string;
    description: string;
  }[];
}

// Componente para mostrar cuando no hay destinos
function ComingSoonPage({ config }: { config: RegionConfig }) {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
        <DestinationsBackground variant={config.backgroundVariant} />
        <div className="container max-w-2xl text-center py-20 relative z-10">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Clock className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Próximamente
          </h1>
          
          <p className="text-xl text-muted-foreground mb-4">
            Paquetes a <span className="text-primary font-semibold">{config.name}</span>
          </p>
          
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Estamos preparando destinos increíbles para vos. ¡Volvé pronto para descubrir nuestros paquetes!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver atrás
            </button>
            
            <Link
              to="/paquetes"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Ver todos los destinos
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">¿Tenés un destino en mente?</p>
            <a
              href={`https://wa.me/5491124943224?text=${encodeURIComponent(`Hola! Me interesa consultar por paquetes a ${config.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Consultanos por WhatsApp →
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default function RegionPage({ config, fallbackDestinos = [], beneficios = [] }: RegionPageProps) {
  const [destinos, setDestinos] = useState<Destination[]>(fallbackDestinos);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(fallbackDestinos.length > 0);

  useEffect(() => {
    async function fetchDestinos() {
      try {
        const { data, error } = await (supabase as any)
          .from('destinations')
          .select('*')
          .eq('region_slug', config.slug)
          .eq('is_active', true)
          .order('order', { ascending: true });

        if (error) {
          console.error('Error fetching destinations:', error);
        } else if (data && data.length > 0) {
          setDestinos(data);
          setHasData(true);
        } else if (fallbackDestinos.length === 0) {
          setHasData(false);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinos();
  }, [config.slug, fallbackDestinos.length]);

  // Mostrar página de "Próximamente" si no hay destinos
  if (!loading && !hasData) {
    return <ComingSoonPage config={config} />;
  }

  const whatsappUrl = `https://wa.me/5491124943224?text=${encodeURIComponent(config.whatsappMessage || `Hola! Me interesa un viaje a ${config.name}`)}`;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={config.heroImage}
            alt={config.heroAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        
        <div className="relative container">
          <div className="max-w-2xl">
            <Link 
              to="/#paquetes" 
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Todos los paquetes
            </Link>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
              {config.title}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {config.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#destinos"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all"
              >
                Ver destinos <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold backdrop-blur-sm border border-white/20 transition-all"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      {beneficios.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {beneficios.map((beneficio) => (
                <div key={beneficio.title} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <beneficio.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{beneficio.title}</h3>
                  <p className="text-sm text-muted-foreground">{beneficio.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catálogo de Destinos */}
      <section id="destinos" className="py-20 relative overflow-hidden scroll-mt-32">
        <DestinationsBackground variant={config.backgroundVariant} />
        
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Nuestros Destinos en {config.name}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Elegí tu próximo destino. Cada paquete incluye todo lo que necesitás para unas vacaciones perfectas.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {destinos.map((destino) => (
                <Link
                  key={destino.id}
                  to={`/paquetes/${config.slug}/${destino.slug}#paquetes`}
                  className="group bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={destino.image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'}
                      alt={`Viajes a ${destino.name}, ${destino.country}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-accent/90 backdrop-blur-md text-accent-foreground px-4 py-2 rounded-full font-semibold shadow-sm">
                      Desde {destino.currency === 'ARS' ? '$' : 'USD'} {destino.price_from?.toLocaleString() || 0}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white/80 text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {destino.country}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white">{destino.name}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-primary font-medium mb-4">{destino.tagline}</p>
                    <ul className="space-y-2 mb-6">
                      {destino.highlights?.slice(0, 3).map((highlight) => (
                        <li key={highlight} className="flex items-center text-muted-foreground">
                          <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{destino.includes || 'Vuelo + Hotel + Traslados'}</span>
                      <span className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                        Ver paquete <ArrowRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Contactanos y te ayudamos a planificar el viaje perfecto a {config.name}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-semibold transition-all"
          >
            Consultar ahora <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </Layout>
  );
}

export { ComingSoonPage };
export type { RegionConfig, Destination };
