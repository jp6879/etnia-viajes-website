import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  destinos: [
    { name: "Caribe", href: "/paquetes/caribe" },
    { name: "Europa", href: "/paquetes/europa" },
    { name: "Estados Unidos", href: "/paquetes/estados-unidos" },
    { name: "América Latina", href: "/paquetes/america-latina" },
    { name: "Destinos Exóticos", href: "/paquetes/exoticos" },
    { name: "Destinos Nacionales", href: "/paquetes/nacionales" },
  ],
  empresa: [
    { name: "Sobre Nosotros", href: "/nosotros" },
    { name: "Blog de Viajes", href: "/blog" },
    { name: "Testimonios", href: "/nosotros#testimonios" },
    { name: "Contacto", href: "https://wa.me/5491124943224?text=Hola!%20Quiero%20consultar%20por%20un%20viaje" },
  ],
  servicios: [
    { name: "Viajes Grupales", href: "/paquetes/grupales" },
    { name: "Luna de Miel", href: "/paquetes/lunas-de-miel" },
    { name: "Ofertas Last Minute", href: "/paquetes/last-minute" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl font-bold">Etnia Viajes</span>
            </Link>
            <p className="text-primary-foreground/80 leading-relaxed">
              Tu agencia de viajes de confianza. Creamos experiencias únicas y 
              personalizadas para que descubras el mundo a tu manera.
            </p>
            <div className="flex gap-4 pt-2">
              <a 
                href="https://www.facebook.com/profile.php?id=61576712466393" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/etniaviajes" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.tiktok.com/@etnia.viajes?_r=1&_t=ZM-931D8zRW3EB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="TikTok"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="h-5 w-5"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/5491124943224"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="WhatsApp"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="h-5 w-5"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Destinos */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Destinos</h3>
            <ul className="space-y-2">
              {footerLinks.destinos.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              {footerLinks.servicios.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="tel:+5491124943224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>+54 9 11 2494-3224</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:ventas@etniaviajes.com"
                  className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>ventas@etniaviajes.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <a 
                  href="https://maps.app.goo.gl/bZqjaeLunQvRqNi59"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground transition-colors"
                >
                  <span>Córdoba, Argentina</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Etnia Viajes. Todos los derechos reservados.</p>
          <p className="mt-2">
            Agencia de Viajes y Turismo | Legajo RNAV N° 20308
          </p>
        </div>
      </div>
    </footer>
  );
};
