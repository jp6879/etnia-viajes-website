import RegionPage from "@/components/packages/RegionPage";
import { Building2, ShoppingBag, Sparkles, Car } from "lucide-react";

const config = {
  slug: "estados-unidos",
  name: "Estados Unidos",
  title: "Viajes a Estados Unidos",
  description: "Miami, New York, Orlando, Las Vegas y más. El sueño americano te espera.",
  heroImage: "https://images.unsplash.com/photo-1534270804882-6b5048b1c1fc?w=1920&q=80",
  heroAlt: "Puente Golden Gate en San Francisco",
  whatsappMessage: "Hola! Me interesan paquetes a Estados Unidos",
  backgroundVariant: 'estadosunidos' as const,
};

const beneficios = [
  {
    icon: Building2,
    title: "Grandes Ciudades",
    description: "New York, Miami, Los Angeles",
  },
  {
    icon: ShoppingBag,
    title: "Shopping",
    description: "Outlets y centros comerciales",
  },
  {
    icon: Sparkles,
    title: "Parques Temáticos",
    description: "Disney, Universal y más",
  },
  {
    icon: Car,
    title: "Road Trips",
    description: "Rutas icónicas como la Route 66",
  },
];

export default function EstadosUnidosPage() {
  return <RegionPage config={config} beneficios={beneficios} />;
}
