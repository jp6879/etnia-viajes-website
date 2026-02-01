import RegionPage from "@/components/packages/RegionPage";
import { Palmtree, Sparkles, Globe, Compass } from "lucide-react";

const config = {
  slug: "exoticos",
  name: "Destinos Exóticos",
  title: "Destinos Exóticos",
  description: "Viajá a los rincones más fascinantes del mundo. Experiencias únicas e inolvidables.",
  heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
  heroAlt: "Playas paradisíacas de Bali",
  whatsappMessage: "Hola! Me interesan paquetes a Destinos Exóticos",
  backgroundVariant: 'exoticos' as const,
};

const beneficios = [
  {
    icon: Globe,
    title: "Destinos Únicos",
    description: "Maldivas, Tailandia, Japón y más",
  },
  {
    icon: Sparkles,
    title: "Experiencias VIP",
    description: "Hoteles boutique y resorts exclusivos",
  },
  {
    icon: Palmtree,
    title: "Paraísos Naturales",
    description: "Playas vírgenes y paisajes de ensueño",
  },
  {
    icon: Compass,
    title: "Aventura",
    description: "Culturas fascinantes por descubrir",
  },
];

export default function DestinosExoticosPage() {
  return <RegionPage config={config} beneficios={beneficios} />;
}
