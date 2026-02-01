import RegionPage from "@/components/packages/RegionPage";
import { MapPin, Mountain, Wine, Users } from "lucide-react";

const config = {
  slug: "nacionales",
  name: "Argentina",
  title: "Paquetes Nacionales",
  description: "Descubrí los destinos más increíbles de Argentina. Patagonia, Norte, Cuyo y mucho más.",
  heroImage: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=1920&q=80",
  heroAlt: "Viajes por Argentina - Paquetes turísticos nacionales",
  whatsappMessage: "Hola! Me interesan paquetes para viajar por Argentina",
  backgroundVariant: 'nacionales' as const,
};

const beneficios = [
  {
    icon: Mountain,
    title: "Patagonia",
    description: "Glaciares, lagos y montañas increíbles",
  },
  {
    icon: Wine,
    title: "Región de Cuyo",
    description: "Viñedos y bodegas de clase mundial",
  },
  {
    icon: MapPin,
    title: "Norte Argentino",
    description: "Cultura, historia y paisajes únicos",
  },
  {
    icon: Users,
    title: "Buenos Aires",
    description: "La ciudad que nunca duerme",
  },
];

export default function NacionalesPage() {
  return <RegionPage config={config} beneficios={beneficios} />;
}
