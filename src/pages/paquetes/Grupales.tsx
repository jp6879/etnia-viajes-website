import RegionPage from "@/components/packages/RegionPage";
import { Users, Calendar, Bus, HeartHandshake } from "lucide-react";

const config = {
  slug: "grupales",
  name: "Viajes Grupales",
  title: "Viajes Grupales",
  description: "Viajá en grupo y compartí la experiencia. Salidas coordinadas con guías expertos.",
  heroImage: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&q=80",
  heroAlt: "Grupo de amigos viajando",
  whatsappMessage: "Hola! Me interesan las salidas grupales",
  backgroundVariant: 'grupales' as const,
};

const beneficios = [
  {
    icon: Users,
    title: "Grupos Reducidos",
    description: "Experiencia más personalizada",
  },
  {
    icon: Calendar,
    title: "Fechas Fijas",
    description: "Salidas programadas todo el año",
  },
  {
    icon: Bus,
    title: "Todo Organizado",
    description: "Transporte, hoteles y excursiones",
  },
  {
    icon: HeartHandshake,
    title: "Nuevos Amigos",
    description: "Conectá con otros viajeros",
  },
];

export default function GrupalesPage() {
  return <RegionPage config={config} beneficios={beneficios} />;
}
