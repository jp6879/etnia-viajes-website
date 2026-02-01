import { 
  Plane, 
  MapPin, 
  Users, 
  Clock, 
  CreditCard,
  Car,
  Moon,
  Briefcase,
  Backpack,
  Luggage
} from "lucide-react";
import { Link } from "react-router-dom";
import { HotelGallery } from "./HotelGallery";
import { MiniDestinationGallery } from "./MiniDestinationGallery";
import { CONTACT, WHATSAPP_MESSAGES } from "@/config/contact";

const mapsEmbedKey = import.meta.env.VITE_GOOGLE_MAPS_EMBED_KEY;

// ============================================
// TIPOS DE DATOS DEL PAQUETE
// ============================================
export interface PackagePrice {
  price: number;
  description: string;
}

export interface PackagePrices {
  single?: PackagePrice;    // Base Single
  double?: PackagePrice;    // Base Doble
  triple?: PackagePrice;    // Base Triple
  quadruple?: PackagePrice; // Base Cuádruple
  family?: PackagePrice;    // Family Plan
}

export interface FlightScale {
  city: string;
  airport: string;
  duration: string; // Duración de la escala, ej: "2h 30m"
}

export interface FlightLeg {
  date: string;
  departure: string;
  arrival: string;
  time: string;
  airline: string;
  scales?: FlightScale[]; // Escalas opcionales
  personal_item_included?: boolean;
  carry_on_included?: boolean;
  checked_baggage_included?: boolean;
}

export interface PackageFlight {
  outbound: FlightLeg;
  return: FlightLeg;
}

export interface PackageTransfer {
  included: boolean;
  description?: string;
}

export interface PackageService {
  name: string;
  description?: string;
  included: boolean;
}

export interface PackageData {
  id: string;
  title: string;
  dates: string;
  image?: string;
  hotel: string;
  hotelStars: number;
  nights?: number;
  roomType: string;
  regime: string;
  prices: PackagePrices;
  flight: PackageFlight;
  transfer?: PackageTransfer;
  departureCity?: string;
  /** Ubicación del hotel para el mapa (ej: "Grand Oasis Cancún, México") */
  hotelLocation?: string;
  /** Servicios extra incluidos u opcionales */
  services?: PackageService[];
  /** Texto legal que aparece al pie del paquete */
  legalText?: string;
  /** Medios de pago aceptados */
  paymentMethods?: string;
  /** Moneda del paquete (USD o ARS) */
  currency?: 'USD' | 'ARS';
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
interface PackageCardProps {
  paquete: PackageData;
  destinationName?: string;
}

export function PackageCard({ 
  paquete,
  destinationName
}: PackageCardProps) {
  
  // Get currency symbol and code
  const currency = paquete.currency || 'USD';
  const currencySymbol = currency === 'ARS' ? '$' : 'USD';
  
  const lowestPrice = Math.min(
    paquete.prices.single?.price ?? Infinity,
    paquete.prices.double?.price ?? Infinity,
    paquete.prices.triple?.price ?? Infinity,
    paquete.prices.quadruple?.price ?? Infinity,
    paquete.prices.family?.price ?? Infinity
  );

  return (
    <article 
      id={paquete.id}
      className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg"
    >
      {/* Header con imagen opcional */}
      <div className="relative">
        {paquete.image && (
          <div className="h-48 md:h-56 overflow-hidden">
            <img
              src={paquete.image}
              alt={`${paquete.title} - Viajes desde Argentina`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}
        
        {/* Info del paquete */}
        <div className={`${paquete.image ? 'absolute bottom-0 left-0 right-0 p-6' : 'bg-primary/5 p-6 md:p-8 border-b border-border'}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className={paquete.image ? "bg-black/40 backdrop-blur-sm rounded-xl p-4" : ""}>
              <h3 className={`font-display text-2xl md:text-3xl font-bold mb-2 ${paquete.image ? 'text-white' : 'text-foreground'}`}>
                {paquete.title}
              </h3>
              <p className={`text-lg font-medium ${paquete.image ? 'text-white/90' : 'text-primary'}`}>
                {paquete.dates}
              </p>
              <p className={paquete.image ? 'text-white/70' : 'text-muted-foreground'}>
                Salida desde {paquete.departureCity || 'Buenos Aires, Argentina'}
              </p>
            </div>
            <div className={`text-right ${paquete.image ? 'bg-black/40 backdrop-blur-sm rounded-xl p-4' : ''}`}>
              <p className={`text-sm ${paquete.image ? 'text-white/70' : 'text-muted-foreground'}`}>Desde</p>
              <p className={`font-display text-4xl font-bold ${paquete.image ? 'text-white' : 'text-primary'}`}>
                {currencySymbol} {lowestPrice.toLocaleString()}
              </p>
              <p className={`text-sm ${paquete.image ? 'text-white/70' : 'text-muted-foreground'}`}>por persona</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Icons Strip */}
      <div className="flex flex-wrap justify-center gap-6 p-4 bg-secondary/30 border-b border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <span>Alojamiento</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Plane className="h-4 w-4 text-primary" />
          </div>
          <span>Vuelos</span>
        </div>
        {paquete.transfer?.included && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Car className="h-4 w-4 text-primary" />
            </div>
            <span>Traslados</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <span>Planes</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-6 md:p-8 grid lg:grid-cols-2 gap-8">
        {/* Columna izquierda: Alojamiento + Traslados + Precios */}
        <div>
          {/* Alojamiento */}
          <h4 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" /> Alojamiento
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Info del Hotel */}
            <div className="bg-secondary/50 rounded-xl p-6 border border-border">
              <p className="font-semibold text-foreground text-lg">{paquete.hotel}</p>
              <div className="flex items-center gap-3 my-2">
                <div className="flex items-center gap-1">
                  {paquete.hotelStars === 0 ? (
                    <span className="text-sm font-medium text-muted-foreground">Hostel 🏨</span>
                  ) : paquete.hotelStars === 1 ? (
                    <span className="text-sm font-medium text-muted-foreground">Departamento 🏢</span>
                  ) : (
                    <>
                      {[...Array(paquete.hotelStars)].map((_, i) => (
                        <span key={i} className="text-accent">★</span>
                      ))}
                    </>
                  )}
                </div>
                {paquete.nights && (
                  <span className="flex items-center gap-1 text-sm font-medium text-primary">
                    <Moon className="h-4 w-4" /> {paquete.nights} noches
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mb-2">
                <strong>Habitación:</strong> {paquete.roomType}
              </p>
              <p className="text-muted-foreground">
                <strong>Régimen:</strong> {paquete.regime}
              </p>
            </div>
            
            {/* Mapa de ubicación */}
            <div className="bg-secondary/50 rounded-xl overflow-hidden min-h-[200px] border border-border">
              <iframe
                title={`Ubicación de ${paquete.hotel}`}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '200px' }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${mapsEmbedKey}&q=${encodeURIComponent(paquete.hotelLocation || paquete.hotel)}`}
              />
            </div>
          </div>

          {/* Traslados (si aplica) */}
          {paquete.transfer?.included && (
            <>
              <h4 className="font-display text-xl font-semibold text-foreground mt-8 mb-4 flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" /> Traslados
              </h4>
              <div className="bg-secondary/50 rounded-xl p-6 border border-border">
                <p className="text-muted-foreground">
                  {paquete.transfer.description || "Traslados aeropuerto - hotel - aeropuerto incluidos"}
                </p>
              </div>
            </>
          )}

          {/* Hotel Gallery - Below Traslados */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
              Fotos del Hotel
            </h4>
            <HotelGallery 
              hotelName={paquete.hotel} 
              hotelLocation={paquete.hotelLocation}
              maxImages={5}
            />
          </div>

          {/* Precios por tipo */}
          <h4 className="font-display text-xl font-semibold text-foreground mt-8 mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" /> Precios por Plan
          </h4>
          <div className="space-y-3">
            {paquete.prices.single?.price && paquete.prices.single.price > 0 && (
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Base Single</p>
                  <p className="text-sm text-muted-foreground">{paquete.prices.single.description}</p>
                </div>
                <p className="font-display text-xl font-bold text-primary">
                  {currencySymbol} {paquete.prices.single.price.toLocaleString()}
                </p>
              </div>
            )}
            {paquete.prices.double?.price && paquete.prices.double.price > 0 && (
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Base Doble</p>
                  <p className="text-sm text-muted-foreground">{paquete.prices.double.description}</p>
                </div>
                <p className="font-display text-xl font-bold text-primary">
                  {currencySymbol} {paquete.prices.double.price.toLocaleString()}
                </p>
              </div>
            )}
            {paquete.prices.triple?.price && paquete.prices.triple.price > 0 && (
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Base Triple</p>
                  <p className="text-sm text-muted-foreground">{paquete.prices.triple.description}</p>
                </div>
                <p className="font-display text-xl font-bold text-primary">
                  {currencySymbol} {paquete.prices.triple.price.toLocaleString()}
                </p>
              </div>
            )}
            {paquete.prices.quadruple?.price && paquete.prices.quadruple.price > 0 && (
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Base Cuádruple</p>
                  <p className="text-sm text-muted-foreground">{paquete.prices.quadruple.description}</p>
                </div>
                <p className="font-display text-xl font-bold text-primary">
                  {currencySymbol} {paquete.prices.quadruple.price.toLocaleString()}
                </p>
              </div>
            )}
            {paquete.prices.family?.price && paquete.prices.family.price > 0 && (
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Family Plan</p>
                  <p className="text-sm text-muted-foreground">{paquete.prices.family.description}</p>
                </div>
                <p className="font-display text-xl font-bold text-primary">
                  {currencySymbol} {paquete.prices.family.price.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha: Itinerario de vuelo */}
        <div>
          <h4 className="font-display text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" /> Itinerario de Vuelo
          </h4>
          
          <div className="space-y-4">
            {/* Vuelo ida */}
            <div className="bg-secondary/50 rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-primary">VUELO DE IDA</p>
                {paquete.flight.outbound.scales && paquete.flight.outbound.scales.length > 0 && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    {paquete.flight.outbound.scales.length} escala{paquete.flight.outbound.scales.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">{paquete.flight.outbound.departure}</span>
                <Plane className="h-4 w-4 text-muted-foreground rotate-90" />
                <span className="font-semibold text-foreground">{paquete.flight.outbound.arrival}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{paquete.flight.outbound.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {paquete.flight.outbound.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{paquete.flight.outbound.airline}</p>
              {/* Baggage Info - only show if at least one is included */}
              {(paquete.flight.outbound.personal_item_included || paquete.flight.outbound.carry_on_included || paquete.flight.outbound.checked_baggage_included) && (
                <div className="flex items-center gap-3 mt-2 text-xs">
                  {paquete.flight.outbound.personal_item_included && (
                    <span className="flex items-center gap-1 text-green-600">
                      <Backpack className="h-3 w-3" /> Artículo personal
                    </span>
                  )}
                  {paquete.flight.outbound.carry_on_included && (
                    <span className="flex items-center gap-1 text-green-600">
                      <Briefcase className="h-3 w-3" /> Carry-on
                    </span>
                  )}
                  {paquete.flight.outbound.checked_baggage_included && (
                    <span className="flex items-center gap-1 text-green-600">
                      <Luggage className="h-3 w-3" /> Equipaje en bodega
                    </span>
                  )}
                </div>
              )}
              {paquete.flight.outbound.scales && paquete.flight.outbound.scales.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Escalas:</p>
                  {paquete.flight.outbound.scales.map((scale, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                      <span>{scale.city} ({scale.airport})</span>
                      <span className="text-xs">• {scale.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Vuelo vuelta */}
            <div className="bg-secondary/50 rounded-xl p-6 border border-border">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-primary">VUELO DE REGRESO</p>
                {paquete.flight.return.scales && paquete.flight.return.scales.length > 0 && (
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    {paquete.flight.return.scales.length} escala{paquete.flight.return.scales.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground">{paquete.flight.return.departure}</span>
                <Plane className="h-4 w-4 text-muted-foreground rotate-90" />
                <span className="font-semibold text-foreground">{paquete.flight.return.arrival}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{paquete.flight.return.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {paquete.flight.return.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{paquete.flight.return.airline}</p>
              {/* Baggage Info - only show if at least one is included */}
              {(paquete.flight.return.personal_item_included || paquete.flight.return.carry_on_included || paquete.flight.return.checked_baggage_included) && (
                <div className="flex items-center gap-3 mt-2 text-xs">
                  {paquete.flight.return.personal_item_included && (
                    <span className="flex items-center gap-1 text-green-600">
                      <Backpack className="h-3 w-3" /> Artículo personal
                    </span>
                  )}
                  {paquete.flight.return.carry_on_included && (
                    <span className="flex items-center gap-1 text-green-600">
                      <Briefcase className="h-3 w-3" /> Carry-on
                    </span>
                  )}
                  {paquete.flight.return.checked_baggage_included && (
                    <span className="flex items-center gap-1 text-green-600">
                      <Luggage className="h-3 w-3" /> Equipaje en bodega
                    </span>
                  )}
                </div>
              )}
              {paquete.flight.return.scales && paquete.flight.return.scales.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Escalas:</p>
                  {paquete.flight.return.scales.map((scale, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
                      <span>{scale.city} ({scale.airport})</span>
                      <span className="text-xs">• {scale.duration}</span>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>

          {/* Extra Services */}
          {paquete.services && paquete.services.length > 0 && (
            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              Servicios Extra
              </h4>
              <div className="space-y-2">
                {paquete.services.map((service, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg border border-border">
                    <span className={`text-sm px-2 py-0.5 rounded ${service.included ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {service.included ? 'Incluido' : 'Opcional'}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{service.name}</p>
                      {service.description && (
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Destination Gallery - Below Servicios Extra */}
          {destinationName && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center gap-1">
              Descubrí {destinationName}
              </h4>
              <MiniDestinationGallery 
                destinationName={destinationName} 
                maxImages={5}
              />
            </div>
          )}
        </div>
      </div>

      {/* Legal Text */}
      {paquete.legalText && (
        <div className="bg-muted/30 px-6 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
            {paquete.legalText}
          </p>
        </div>
      )}

      {/* Payment Methods */}
      {paquete.paymentMethods && (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-6 py-5 border-t border-primary/20">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-2">Medios de Pago</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {paquete.paymentMethods.split('\n').filter(line => line.trim()).map((line, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{line.replace(/^[\u2022\-\*]\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* CTA del paquete */}
      <div className="bg-primary/5 p-6 md:p-8 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-center md:text-left">
            ¿Te interesa este paquete? Consultá disponibilidad y reservá tu lugar.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={CONTACT.getWhatsAppUrl(WHATSAPP_MESSAGES.package(paquete.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#20BA5C] hover:bg-[#20BA5C] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
