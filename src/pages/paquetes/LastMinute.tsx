import RegionPage from "@/components/packages/RegionPage";
import { Clock, Zap, Percent, Calendar } from "lucide-react";

const config = {
  slug: "last-minute",
  name: "Last Minute",
  title: "Ofertas Last Minute",
  description: "Las mejores ofertas de último momento. Viajá con descuentos increíbles en vuelos y hoteles.",
  heroImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80",
  heroAlt: "Avión volando al atardecer",
  whatsappMessage: "Hola! Busco paquetes de último momento",
  backgroundVariant: 'lastminute' as const,
};

const beneficios = [
  {
    icon: Percent,
    title: "Hasta 40% OFF",
    description: "Descuentos exclusivos en salidas próximas",
  },
  {
    icon: Zap,
    title: "Salidas Inmediatas",
    description: "Viajá en los próximos 15 a 30 días",
  },
  {
    icon: Clock,
    title: "Disponibilidad Limitada",
    description: "Cupos exclusivos por tiempo limitado",
  },
  {
    icon: Calendar,
    title: "Fechas Flexibles",
    description: "Opciones para adaptarse a tu agenda",
  },
];

export default function LastMinutePage() {
  return <RegionPage config={config} beneficios={beneficios} />;
}
