import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import etniaLogoIcon from "@/assets/etnia-logo-icon-green.png";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Paquetes", href: "/#paquetes" },
  { name: "Nosotros", href: "/#quienes-somos" },
  { name: "Blog", href: "/blog" },
  { name: "Ofertas", href: "/paquetes/last-minute" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+5491124943224" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Phone className="h-4 w-4" />
              <span>+54 9 11 2494-3224</span>
            </a>
            <a href="mailto:ventas@etniaviajes.com" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Mail className="h-4 w-4" />
              <span>ventas@etniaviajes.com</span>
            </a>
          </div>
          <a 
            href="https://maps.app.goo.gl/bZqjaeLunQvRqNi59"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <MapPin className="h-4 w-4" />
            <span>Córdoba, Argentina</span>
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={etniaLogoIcon}
              alt="Etnia Viajes"
              className="h-8 w-9.25 rounded-lg"
              />
            <span className="font-display text-2xl font-bold text-primary">Etnia</span>
            <span className="font-display text-2xl font-bold text-primary">Viajes</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button asChild>
              <Link to="https://wa.me/5491124943224?text=Hola!%20Quiero%20consultar%20por%20un%20viaje">Consultá tu viaje</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b border-border animate-fade-in">
            <div className="container py-4 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block py-2 text-base font-medium transition-colors ${
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="w-full mt-4">
                <Link to="https://wa.me/5491124943224?text=Hola!%20Quiero%20consultar%20por%20un%20viaje" onClick={() => setMobileMenuOpen(false)}>
                  Consultá tu viaje
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
