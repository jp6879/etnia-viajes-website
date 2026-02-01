import RegionPage from "@/components/packages/RegionPage";
import { Mountain, Palmtree, Building, Camera } from "lucide-react";

const config = {
  slug: "america-latina",
  name: "América Latina",
  title: "Viajes por Latinoamérica",
  description: "Brasil, Perú, Colombia, Chile y más. Descubrí la magia de nuestro continente.",
  heroImage: "https://images.unsplash.com/photo-1518182170546-0766ce6fec93?w=1920&q=80",
  heroAlt: "Paisajes de América Latina",
  whatsappMessage: "Hola! Me interesan paquetes a América Latina",
  backgroundVariant: 'sudamerica' as const,
};

const beneficios = [
  {
    icon: Palmtree,
    title: "Brasil",
    description: "Río, Floripa, Buzios y más",
  },
  {
    icon: Mountain,
    title: "Perú",
    description: "Machu Picchu y cultura ancestral",
  },
  {
    icon: Building,
    title: "Colombia",
    description: "Cartagena, Bogotá, San Andrés",
  },
  {
    icon: Camera,
    title: "Chile",
    description: "Torres del Paine y Santiago",
  },
];

export default function AmericaLatinaPage() {
  return <RegionPage config={config} beneficios={beneficios} />;
}
