import RegionPage from "@/components/packages/RegionPage";
import { Building, Train, Camera, Utensils } from "lucide-react";

const config = {
  slug: "europa",
  name: "Europa",
  title: "Viajes a Europa",
  description: "Las capitales más icónicas, arte, historia y gastronomía. Tu aventura europea te espera.",
  heroImage: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1920&q=80",
  heroAlt: "Viajes a Europa desde Argentina - Paquetes turísticos",
  whatsappMessage: "Hola! Me interesan paquetes a Europa",
  backgroundVariant: 'europa' as const,
};

const beneficios = [
  {
    icon: Building,
    title: "Ciudades Icónicas",
    description: "París, Roma, Barcelona, Londres y más",
  },
  {
    icon: Train,
    title: "Trenes de Alta Velocidad",
    description: "Conectá ciudades fácilmente",
  },
  {
    icon: Camera,
    title: "Arte e Historia",
    description: "Museos y monumentos únicos",
  },
  {
    icon: Utensils,
    title: "Gastronomía",
    description: "Sabores auténticos de cada región",
  },
];

export default function EuropaPage() {
  return <RegionPage config={config} beneficios={beneficios} />;
}
