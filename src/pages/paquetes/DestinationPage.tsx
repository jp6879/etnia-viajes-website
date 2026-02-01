import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, MapPin, Loader2 } from "lucide-react";
import { PackageCard, PackageData } from "@/components/packages/PackageCard";
import { MultidestinationCard, MultidestinationData } from "@/components/packages/MultidestinationCard";
import { supabase } from "@/integrations/supabase/client";
import { DestinationsBackground, BackgroundVariant } from "@/components/packages/DestinationsBackground";
import { DestinationGallery } from "@/components/packages/DestinationGallery";

interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  tagline: string | null;
  image: string | null;
  region_slug: string;
}

interface PackageFromDB {
  id: string;
  title: string;
  dates: string;
  image: string | null;
  hotel: string;
  hotel_stars: number;
  nights: number | null;
  room_type: string | null;
  regime: string | null;
  hotel_location: string | null;
  departure_city: string | null;
  prices: any;
  flight: any;
  transfer: any;
  services: any;
  legal_text: string | null;
  payment_methods: string | null;
  currency: string | null;
  is_active: boolean;
}

// Transform DB package to PackageCard format
function transformPackage(pkg: PackageFromDB): PackageData {
  // Ensure flight has proper structure with defaults
  const flight = pkg.flight || {};
  const outbound = flight.outbound || {};
  const returnFlight = flight.return || {};

  return {
    id: pkg.id,
    title: pkg.title || "Paquete sin título",
    dates: pkg.dates || "Fechas a confirmar",
    image: pkg.image || undefined,
    hotel: pkg.hotel || "Hotel a confirmar",
    hotelStars: pkg.hotel_stars || 5,
    nights: pkg.nights || undefined,
    roomType: pkg.room_type || "Habitación estándar",
    regime: pkg.regime || "Todo Incluido",
    departureCity: pkg.departure_city || undefined,
    hotelLocation: pkg.hotel_location || undefined,
    prices: pkg.prices || {},
    flight: {
      outbound: {
        date: outbound.date || "",
        departure: outbound.departure || "",
        arrival: outbound.arrival || "",
        time: outbound.time || "",
        airline: outbound.airline || "",
        scales: outbound.scales || [],
        personal_item_included: outbound.personal_item_included,
        carry_on_included: outbound.carry_on_included,
        checked_baggage_included: outbound.checked_baggage_included,
      },
      return: {
        date: returnFlight.date || "",
        departure: returnFlight.departure || "",
        arrival: returnFlight.arrival || "",
        time: returnFlight.time || "",
        airline: returnFlight.airline || "",
        scales: returnFlight.scales || [],
        personal_item_included: returnFlight.personal_item_included,
        carry_on_included: returnFlight.carry_on_included,
        checked_baggage_included: returnFlight.checked_baggage_included,
      }
    },
    transfer: pkg.transfer || undefined,
    services: pkg.services || [],
    legalText: pkg.legal_text || undefined,
    paymentMethods: pkg.payment_methods || undefined,
    currency: (pkg.currency as 'USD' | 'ARS') || 'USD',
  };
}

// Transform DB multidestination package to MultidestinationCard format
function transformMultiPackage(pkg: any): MultidestinationData {
  return {
    id: pkg.id,
    title: pkg.title || "Paquete sin título",
    subtitle: pkg.subtitle || undefined,
    dates: pkg.dates || "Fechas a confirmar",
    totalNights: pkg.total_nights || 0,
    image: pkg.image || undefined,
    currency: (pkg.currency as 'USD' | 'ARS') || 'USD',
    prices: pkg.prices || {},
    legs: pkg.legs || [],
    transfer: pkg.transfer || undefined,
    services: pkg.services || [],
    legalText: pkg.legal_text || undefined,
    paymentMethods: pkg.payment_methods || undefined,
  };
}

// Helper to map region slug to background variant
function getBackgroundVariant(regionSlug: string): BackgroundVariant {
  const map: Record<string, BackgroundVariant> = {
    'caribe': 'caribe',
    'nacionales': 'nacionales',
    'europa': 'europa',
    'america-latina': 'sudamerica', // Maps to sudamerica variant
    'brasil': 'brasil',
    'exoticos': 'exoticos',
    'estados-unidos': 'estadosunidos',
    'lunas-de-miel': 'lunasdemiel',
    'last-minute': 'lastminute',
    'grupales': 'grupales',
  };
  return map[regionSlug] || 'default';
}

// Coming Soon component when no packages
function NoPackagesYet({ destination, regionSlug }: { destination: Destination; regionSlug: string }) {
  const navigate = useNavigate();
  const backgroundVariant = getBackgroundVariant(regionSlug || '');
  
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
        <DestinationsBackground variant={backgroundVariant} disableAnimation={true} />
        <div className="container max-w-2xl text-center py-20 relative z-10">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <Clock className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Próximamente
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2">
            Paquetes a <span className="text-primary font-semibold">{destination.name}</span>
          </p>
          <p className="text-muted-foreground mb-2">{destination.country}</p>
          
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Estamos preparando paquetes increíbles para este destino. ¡Volvé pronto!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver atrás
            </button>
            
            <a
              href={`https://wa.me/5491124943224?text=${encodeURIComponent(`Hola! Me interesa consultar por paquetes a ${destination.name}, ${destination.country}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default function DestinationPage() {
  const { regionSlug, destinationSlug } = useParams<{ regionSlug: string; destinationSlug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [destination, setDestination] = useState<Destination | null>(null);
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [multiPackages, setMultiPackages] = useState<MultidestinationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const backgroundVariant = getBackgroundVariant(regionSlug || '');

  // Scroll to hash when page loads and data is ready (only if have packages)
  useEffect(() => {
    if (!loading) {
      if (packages.length > 0 && location.hash) {
        // Scroll to packages section if we have packages
        const elementId = location.hash.replace('#', '');
        const element = document.getElementById(elementId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      } else {
        // Scroll to top if no packages (showing "Coming Soon" page)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [loading, location.hash, packages.length]);

  useEffect(() => {
    async function fetchData() {
      if (!regionSlug || !destinationSlug) {
        setError(true);
        setLoading(false);
        return;
      }

      try {
        // Fetch destination
        const { data: destData, error: destError } = await (supabase as any)
          .from('destinations')
          .select('*')
          .eq('region_slug', regionSlug)
          .eq('slug', destinationSlug)
          .eq('is_active', true)
          .single();

        if (destError || !destData) {
          console.error('Destination not found:', destError);
          setError(true);
          setLoading(false);
          return;
        }

        setDestination(destData);

        // Fetch packages for this destination
        const { data: pkgData, error: pkgError } = await (supabase as any)
          .from('packages')
          .select('*')
          .eq('destination_id', destData.id)
          .eq('is_active', true)
          .order('order', { ascending: true });

        if (pkgError) {
          console.error('Error fetching packages:', pkgError);
        }

        if (pkgData && pkgData.length > 0) {
          setPackages(pkgData.map(transformPackage));
        }

        // Also fetch multidestination packages
        const { data: multiData } = await (supabase as any)
          .from('multidestination_packages')
          .select('*')
          .eq('destination_id', destData.id)
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (multiData && multiData.length > 0) {
          setMultiPackages(multiData.map(transformMultiPackage));
        }

        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError(true);
        setLoading(false);
      }
    }

    fetchData();
  }, [regionSlug, destinationSlug]);

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Error state - destination not found
  if (error || !destination) {
    return (
      <Layout>
        <section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Destino no encontrado
            </h1>
            <p className="text-muted-foreground mb-6">
              El destino que buscás no existe o no está disponible.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Volver
            </button>
          </div>
        </section>
      </Layout>
    );
  }

  // No packages yet
  if (packages.length === 0 && multiPackages.length === 0) {
    return <NoPackagesYet destination={destination} regionSlug={regionSlug || ''} />;
  }

  // Get region name for display
  const regionNames: Record<string, string> = {
    'caribe': 'Caribe',
    'europa': 'Europa',
    'nacionales': 'Nacionales',
    'exoticos': 'Destinos Exóticos',
    'estados-unidos': 'Estados Unidos',
    'america-latina': 'América Latina',
    'grupales': 'Grupales',
    'lunas-de-miel': 'Lunas de Miel',
    'last-minute': 'Last Minute',
  };
  const regionName = regionNames[regionSlug || ''] || regionSlug;

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end">
        <div className="absolute inset-0">
          <img
            src={destination.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"}
            alt={`Viajes a ${destination.name}, ${destination.country}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        
        <div className="container relative z-10 pb-12">
          <Link 
            to={`/paquetes/${regionSlug}`} 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver a {regionName}
          </Link>
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {destination.country}
              </span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Viajes a {destination.name}
            </h1>
            
            {destination.tagline && (
              <p className="text-xl text-white/90">
                {destination.tagline}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="paquetes" className="py-16 relative overflow-hidden scroll-mt-32">
        <DestinationsBackground variant={backgroundVariant} disableAnimation={true} />
        {/* Bright overlay to mute the background image */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/70 via-white/60 to-white/80 z-[1]" />
        
        <div className="container relative z-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8">
            Paquetes Disponibles ({packages.length + multiPackages.length})
          </h2>
          
          <div className="space-y-12">
            {packages.map((paquete) => (
              <PackageCard key={paquete.id} paquete={paquete} destinationName={destination.name} />
            ))}
            {multiPackages.map((paquete) => (
              <MultidestinationCard key={paquete.id} paquete={paquete} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
{/*       <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            ¿Te interesa viajar a {destination.name}?
          </h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Consultanos por disponibilidad y reservá tu lugar
          </p>
          <a
            href={`https://wa.me/5491124943224?text=${encodeURIComponent(`Hola! Me interesan los paquetes a ${destination.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-lg font-semibold transition-all"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section> */}
    </Layout>
  );
}
