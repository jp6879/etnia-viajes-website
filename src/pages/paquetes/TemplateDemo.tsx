import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PackageCard, PackageData } from "@/components/packages/PackageCard";

// ============================================
// DATOS DE EJEMPLO - Fácil de modificar
// ============================================
const paquetesEjemplo: PackageData[] = [
  {
    id: "ejemplo-con-imagen-traslados",
    title: "Cancún con Traslados Ejemplo",
    dates: "15 al 22 de Marzo 2026",
    image: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=1200&q=80",
    hotel: "Grand Oasis Cancún",
    hotelStars: 5,
    roomType: "Ocean View Suite",
    regime: "Todo Incluido",
    departureCity: "Buenos Aires, Argentina",
    hotelLocation: "Grand Oasis Cancún, Cancún, México",
    transfer: {
      included: true,
      description: "Traslados privados aeropuerto - hotel - aeropuerto con servicio VIP"
    },
    prices: {
      family: { price: 3100, description: "2 adultos + 2 menores" },
      double: { price: 2200, description: "Por persona en base doble" },
      single: { price: 2900, description: "Habitación individual" },
    },
    flight: {
      outbound: {
        date: "15 Mar 2026",
        departure: "Buenos Aires (EZE)",
        arrival: "Cancún (CUN)",
        time: "22:30 - 05:00 (+1)",
        airline: "Aerolíneas Argentinas",
      },
      return: {
        date: "22 Mar 2026",
        departure: "Cancún (CUN)",
        arrival: "Buenos Aires (EZE)",
        time: "09:00 - 19:30",
        airline: "Aerolíneas Argentinas",
      },
    },
  },
  {
    id: "ejemplo-sin-imagen",
    title: "Punta Cana Sin Imagen Ejemplo",
    dates: "1 al 8 de Abril 2026",
    // Sin imagen - muestra el header simple
    hotel: "Bahia Principe Grand",
    hotelStars: 5,
    roomType: "Junior Suite Deluxe",
    regime: "Todo Incluido Premium",
    departureCity: "Córdoba, Argentina",
    hotelLocation: "Bahia Principe Grand Punta Cana, República Dominicana",
    transfer: {
      included: true,
      // Sin descripción - usa el texto por defecto
    },
    prices: {
      double: { price: 1950, description: "Por persona en base doble" },
      single: { price: 2650, description: "Habitación individual" },
      // Sin familia - solo se muestran los planes que existen
    },
    flight: {
      outbound: {
        date: "1 Abr 2026",
        departure: "Córdoba (COR)",
        arrival: "Punta Cana (PUJ)",
        time: "23:55 - 08:30 (+1)",
        airline: "Copa Airlines",
      },
      return: {
        date: "8 Abr 2026",
        departure: "Punta Cana (PUJ)",
        arrival: "Córdoba (COR)",
        time: "10:00 - 22:30",
        airline: "Copa Airlines",
      },
    },
  },
  {
    id: "ejemplo-sin-traslados",
    title: "Jamaica Sin Traslados Ejemplo",
    dates: "20 al 27 de Mayo 2026",
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1200&q=80",
    hotel: "Sandals Montego Bay",
    hotelStars: 5,
    roomType: "Beachfront Suite",
    regime: "All Inclusive Luxury",
    hotelLocation: "Sandals Montego Bay, Jamaica",
    // Sin transfer - no muestra la sección de traslados
    prices: {
      double: { price: 3500, description: "Por persona en base doble" },
    },
    flight: {
      outbound: {
        date: "20 May 2026",
        departure: "Buenos Aires (EZE)",
        arrival: "Montego Bay (MBJ)",
        time: "21:00 - 08:00 (+1)",
        airline: "Copa Airlines",
      },
      return: {
        date: "27 May 2026",
        departure: "Montego Bay (MBJ)",
        arrival: "Buenos Aires (EZE)",
        time: "11:00 - 23:30",
        airline: "Copa Airlines",
      },
    },
  },
  {
    id: "ejemplo-con-escalas",
    title: "Aruba con Escalas Ejemplo",
    dates: "10 al 17 de Junio 2026",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200&q=80",
    hotel: "Riu Palace Aruba",
    hotelStars: 5,
    roomType: "Ocean Front Suite",
    regime: "Todo Incluido",
    departureCity: "Buenos Aires, Argentina",
    hotelLocation: "Riu Palace Aruba, Aruba",
    transfer: {
      included: true,
      description: "Traslados compartidos aeropuerto - hotel - aeropuerto"
    },
    prices: {
      double: { price: 2800, description: "Por persona en base doble" },
      single: { price: 3600, description: "Habitación individual" },
    },
    flight: {
      outbound: {
        date: "10 Jun 2026",
        departure: "Buenos Aires (EZE)",
        arrival: "Aruba (AUA)",
        time: "07:00 - 18:45",
        airline: "Copa Airlines",
        scales: [
          {
            city: "Panamá",
            airport: "PTY",
            duration: "2h 30m"
          }
        ]
      },
      return: {
        date: "17 Jun 2026",
        departure: "Aruba (AUA)",
        arrival: "Buenos Aires (EZE)",
        time: "14:00 - 06:30 (+1)",
        airline: "Copa Airlines",
        scales: [
          {
            city: "Panamá",
            airport: "PTY",
            duration: "3h 15m"
          }
        ]
      },
    },
  },
];

export default function TemplateDemoPage() {
  return (
    <Layout>
      {/* Hero simple */}
      <section className="bg-primary/5 py-12">
        <div className="container">
          <Link 
            to="/paquetes/caribe" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver a Caribe
          </Link>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Demo del Template de Paquetes
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Esta página muestra 3 variantes del template para que puedas ver cómo se ve con diferentes configuraciones.
          </p>
        </div>
      </section>

      {/* Paquetes de ejemplo */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="space-y-12">
            {/* Ejemplo 1: Con imagen y traslados */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">1</span>
                Con imagen + Con traslados + Todos los planes
              </h2>
              <PackageCard paquete={paquetesEjemplo[0]} />
            </div>

            {/* Ejemplo 2: Sin imagen */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">2</span>
                Sin imagen + Con traslados + Solo pareja e individual
              </h2>
              <PackageCard paquete={paquetesEjemplo[1]} />
            </div>

            {/* Ejemplo 3: Sin traslados */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">3</span>
                Con imagen + Sin traslados + Solo pareja
              </h2>
              <PackageCard paquete={paquetesEjemplo[2]} />
            </div>

            {/* Ejemplo 4: Con escalas en vuelos */}
            <div>
              <h2 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">4</span>
                Con imagen + Con traslados + Vuelos con escalas
              </h2>
              <PackageCard paquete={paquetesEjemplo[3]} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
