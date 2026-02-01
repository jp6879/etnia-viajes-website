import RegionPage from "@/components/packages/RegionPage";
import { Heart, Sparkles, Sunset, Wine } from "lucide-react";

const config = {
  slug: "lunas-de-miel",
  name: "Lunas de Miel",
  title: "Lunas de Miel",
  description: "El viaje más importante de sus vidas. Destinos románticos para parejas.",
  heroImage: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=1920&q=80",
  heroAlt: "Viajes de luna de miel desde Argentina",
  whatsappMessage: "Hola! Estamos buscando opciones para nuestra luna de miel",
  backgroundVariant: 'lunasdemiel' as const,
};

const beneficios = [
  {
    icon: Heart,
    title: "Romántico",
    description: "Hoteles y experiencias para parejas",
  },
  {
    icon: Sparkles,
    title: "Exclusividad",
    description: "Resorts adults-only y suites",
  },
  {
    icon: Sunset,
    title: "Destinos de Ensueño",
    description: "Maldivas, Bora Bora, Seychelles",
  },
  {
    icon: Wine,
    title: "Amenities Especiales",
    description: "Champagne, spa y cenas románticas",
  },
];

export default function LunasDeMielPage() {
  return <RegionPage config={config} beneficios={beneficios} />;
}
