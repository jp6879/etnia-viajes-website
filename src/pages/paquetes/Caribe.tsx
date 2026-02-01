import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, Sun, Umbrella, Waves, Plane, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import RegionPage from "@/components/packages/RegionPage";

// Tipo para destinos desde Supabase
interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  tagline: string | null;
  image: string | null;
  price_from: number;
  highlights: string[];
  includes: string | null;
  is_active: boolean;
  order: number;
}

const beneficios = [
  {
    icon: Sun,
    title: "Clima Tropical Todo el Año",
    description: "Temperaturas cálidas de 25°C a 32°C durante todo el año",
  },
  {
    icon: Umbrella,
    title: "Todo Incluido",
    description: "Hoteles con comidas, bebidas y entretenimiento incluido",
  },
  {
    icon: Waves,
    title: "Playas Paradisíacas",
    description: "Arena blanca y aguas cristalinas del Mar Caribe",
  },
  {
    icon: Plane,
    title: "Vuelos Directos",
    description: "Conexiones desde Buenos Aires y principales ciudades",
  },
];

const config = {
  slug: "caribe",
  name: "Caribe",
  title: "Viajes al Caribe Todo Incluido desde Argentina",
  description: "Descubrí los mejores destinos del Caribe: Punta Cana, Playa del Carmen, Miches y Costa Mujeres. Paquetes con vuelo, hotel y traslados.",
  heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80",
  heroAlt: "Playas paradisíacas del Caribe - Viajes todo incluido desde Argentina",
  whatsappMessage: "Hola! Me interesan paquetes al Caribe",
  backgroundVariant: 'caribe' as const,
};

export default function CaribePage() {
  return <RegionPage config={config} beneficios={beneficios} />
}
