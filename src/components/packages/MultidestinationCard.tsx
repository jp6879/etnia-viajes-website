import { Link } from "react-router-dom";
import { MapPin, Hotel, Plane, Users, Bus, Moon, CreditCard, Briefcase, Backpack, Luggage } from "lucide-react";
import { HotelGallery } from "./HotelGallery";
import { MiniDestinationGallery } from "./MiniDestinationGallery";
import { CONTACT, WHATSAPP_MESSAGES } from "@/config/contact";

// Interfaces for multidestination package data
interface PackageLegFlight {
  date: string;
  departure: string;
  arrival: string;
  time: string;
  airline: string;
  personal_item_included?: boolean;
  carry_on_included?: boolean;
  checked_baggage_included?: boolean;
}

interface PackageLeg {
  id: string;
  order: number;
  destination: string;
  country: string;
  nights: number;
  hotel: string;
  hotel_stars: number;
  room_type: string;
  regime: string;
  flight_in?: PackageLegFlight;
  flight_to_next?: PackageLegFlight;
  flight_out?: PackageLegFlight;
}

interface PackageService {
  name: string;
  description?: string;
  included: boolean;
}

interface PackagePriceItem {
  price: number;
  description?: string;
}

interface PackagePrices {
  single?: PackagePriceItem;
  double?: PackagePriceItem;
  triple?: PackagePriceItem;
  quadruple?: PackagePriceItem;
  family?: PackagePriceItem;
}

interface PackageTransfer {
  included: boolean;
  description: string;
}

export interface MultidestinationData {
  id: string;
  title: string;
  subtitle?: string;
  dates: string;
  totalNights: number;
  image?: string;
  currency?: 'USD' | 'ARS';
  prices: PackagePrices;
  legs: PackageLeg[];
  transfer?: PackageTransfer;
  services?: PackageService[];
  legalText?: string;
  /** Medios de pago aceptados */
  paymentMethods?: string;
}

interface MultidestinationCardProps {
  paquete: MultidestinationData;
}

export function MultidestinationCard({ 
  paquete
}: MultidestinationCardProps) {
  const currency = paquete.currency || 'USD';
  const currencySymbol = currency === 'ARS' ? '$' : 'USD';
  
  const lowestPrice = Math.min(
    paquete.prices.single?.price ?? Infinity,
    paquete.prices.double?.price ?? Infinity,
    paquete.prices.triple?.price ?? Infinity,
    paquete.prices.quadruple?.price ?? Infinity,
    paquete.prices.family?.price ?? Infinity
  );

  const firstLeg = paquete.legs[0];
  const lastLeg = paquete.legs[paquete.legs.length - 1];

  return (
    <article 
      id={paquete.id}
      className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg"
    >
      {/* Header con imagen */}
      <div className="relative">
        {paquete.image && (
          <div className="h-48 md:h-56 overflow-hidden">
            <img
              src={paquete.image}
              alt={`${paquete.title} - Viajes Multidestino`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}
        
        <div className={`${paquete.image ? 'absolute bottom-0 left-0 right-0 p-6' : 'bg-primary/5 p-6 md:p-8 border-b border-border'}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className={paquete.image ? "bg-gray-500/40 backdrop-blur-sm rounded-xl p-4" : ""}>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                  MULTIDESTINO
                </span>
              </div>
              <h3 className={`font-display text-2xl md:text-3xl font-bold mb-2 ${paquete.image ? 'text-white' : 'text-foreground'}`}>
                {paquete.title}
              </h3>
              {paquete.subtitle && (
                <p className={`text-lg ${paquete.image ? 'text-white/90' : 'text-primary'}`}>
                  {paquete.subtitle}
                </p>
              )}
              <p className={paquete.image ? 'text-white/70' : 'text-muted-foreground'}>
                {paquete.dates} • {paquete.totalNights} noches
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

      {/* Flight Summary Bar - Compact */}
      <div className="px-4 py-3 md:px-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-b border-border flex flex-wrap items-center justify-between gap-3">
        {/* Ida */}
        {firstLeg?.flight_in && (
          <div className="flex items-center gap-2 text-sm">
            <Plane className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-700 dark:text-blue-300 font-medium">Ida</span>
            {firstLeg.flight_in.date && <span className="text-muted-foreground">• {firstLeg.flight_in.date}</span>}
            <span className="text-foreground">{firstLeg.flight_in.departure} → {firstLeg.flight_in.arrival}</span>
          </div>
        )}
        
        {/* Destinations */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          {paquete.legs.map((leg, i) => (
            <span key={leg.id}>{leg.destination}{i < paquete.legs.length - 1 ? ' → ' : ''}</span>
          ))}
        </div>
        
        {/* Vuelta */}
        {lastLeg?.flight_out && (
          <div className="flex items-center gap-2 text-sm">
            <Plane className="h-4 w-4 text-green-600 dark:text-green-400 rotate-180" />
            <span className="text-green-700 dark:text-green-300 font-medium">Vuelta</span>
            {lastLeg.flight_out.date && <span className="text-muted-foreground">• {lastLeg.flight_out.date}</span>}
            <span className="text-foreground">{lastLeg.flight_out.departure} → {lastLeg.flight_out.arrival}</span>
          </div>
        )}
      </div>

      {/* Itinerary - Always Expanded */}
      <div className="px-4 py-6 md:px-6 border-b border-border bg-background">
        <div className="space-y-4">
          
          {/* VUELO DE IDA - First in timeline */}
          {firstLeg?.flight_in && (
              <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-100 dark:border-blue-900">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center">
                  <Plane className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-blue-700 dark:text-blue-300">
                    Vuelo de Ida {firstLeg.flight_in.date && `• ${firstLeg.flight_in.date}`}
                  </p>
                  <p className="text-foreground">
                    {firstLeg.flight_in.departure} → {firstLeg.flight_in.arrival}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {firstLeg.flight_in.time && `${firstLeg.flight_in.time}`}
                    {firstLeg.flight_in.airline && ` • ${firstLeg.flight_in.airline}`}
                  </p>
                  {/* Baggage Info - only show if at least one is included */}
                  {(firstLeg.flight_in.personal_item_included || firstLeg.flight_in.carry_on_included || firstLeg.flight_in.checked_baggage_included) && (
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      {firstLeg.flight_in.personal_item_included && (
                        <span className="flex items-center gap-1 text-green-600"><Backpack className="h-3 w-3" /> Artículo personal</span>
                      )}
                      {firstLeg.flight_in.carry_on_included && (
                        <span className="flex items-center gap-1 text-green-600"><Briefcase className="h-3 w-3" /> Carry-on</span>
                      )}
                      {firstLeg.flight_in.checked_baggage_included && (
                        <span className="flex items-center gap-1 text-green-600"><Luggage className="h-3 w-3" /> Equipaje en bodega</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LEGS - Hotels */}
            {paquete.legs.map((leg, index) => (
              <div key={leg.id}>
                {/* Destination + Hotel */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-secondary/30 rounded-xl p-4 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-semibold text-foreground text-lg">{leg.destination}</h5>
                        <p className="text-sm text-muted-foreground">{leg.country}</p>
                      </div>
                      <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                        <Moon className="h-3.5 w-3.5" /> {leg.nights} noches
                      </span>
                    </div>
                    <div className="flex items-start gap-2 mt-3">
                      <Hotel className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          {leg.hotel}
                          <span className="ml-2 text-amber-500">{'★'.repeat(leg.hotel_stars)}</span>
                        </p>
                        <p className="text-sm text-muted-foreground">{leg.room_type} • {leg.regime}</p>
                      </div>
                    </div>
                    
                    {/* Hotel Gallery */}
                    <div className="mt-3 max-w-sm">
                      <HotelGallery 
                        hotelName={leg.hotel} 
                        hotelLocation={`${leg.destination}, ${leg.country}`}
                        maxImages={5}
                      />
                    </div>
                    
                    {/* Destination Gallery */}
                    <div className="mt-3 max-w-sm">
                      <h6 className="text-xs font-semibold text-muted-foreground mb-1">Descubrí {leg.destination}</h6>
                      <MiniDestinationGallery 
                        destinationName={leg.destination} 
                        maxImages={5}
                      />
                    </div>
                  </div>
                </div>

                {/* Flight to next destination */}
                {leg.flight_to_next && index < paquete.legs.length - 1 && (
                  <div className="ml-5 my-3 flex items-start gap-3 pl-5 border-l-2 border-blue-300 dark:border-blue-700">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                      <Plane className="h-4 w-4" />
                    </div>
                    <div className="text-sm">
                      <div>
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {leg.flight_to_next.date && `${leg.flight_to_next.date} • `}
                        </span>
                        <span className="text-foreground">
                          {leg.flight_to_next.departure} → {leg.flight_to_next.arrival}
                        </span>
                        {leg.flight_to_next.time && <span className="text-muted-foreground"> • {leg.flight_to_next.time}</span>}
                        {leg.flight_to_next.airline && <span className="text-muted-foreground"> • {leg.flight_to_next.airline}</span>}
                      </div>
                      {/* Baggage Info for connection flight */}
                      {(leg.flight_to_next.personal_item_included || leg.flight_to_next.carry_on_included || leg.flight_to_next.checked_baggage_included) && (
                        <div className="flex items-center gap-3 mt-1 text-xs">
                          {leg.flight_to_next.personal_item_included && (
                            <span className="flex items-center gap-1 text-green-600"><Backpack className="h-3 w-3" /> Artículo personal</span>
                          )}
                          {leg.flight_to_next.carry_on_included && (
                            <span className="flex items-center gap-1 text-green-600"><Briefcase className="h-3 w-3" /> Carry-on</span>
                          )}
                          {leg.flight_to_next.checked_baggage_included && (
                            <span className="flex items-center gap-1 text-green-600"><Luggage className="h-3 w-3" /> Equipaje en bodega</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* VUELO DE VUELTA - Last in timeline */}
            {lastLeg?.flight_out && (
              <div className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-100 dark:border-green-900">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center">
                  <Plane className="h-5 w-5 rotate-180" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-green-700 dark:text-green-300">
                    Vuelo de Regreso {lastLeg.flight_out.date && `• ${lastLeg.flight_out.date}`}
                  </p>
                  <p className="text-foreground">
                    {lastLeg.flight_out.departure} → {lastLeg.flight_out.arrival}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {lastLeg.flight_out.time && `${lastLeg.flight_out.time}`}
                    {lastLeg.flight_out.airline && ` • ${lastLeg.flight_out.airline}`}
                  </p>
                  {/* Baggage Info - only show if at least one is included */}
                  {(lastLeg.flight_out.personal_item_included || lastLeg.flight_out.carry_on_included || lastLeg.flight_out.checked_baggage_included) && (
                    <div className="flex items-center gap-3 mt-1 text-xs">
                      {lastLeg.flight_out.personal_item_included && (
                        <span className="flex items-center gap-1 text-green-600"><Backpack className="h-3 w-3" /> Artículo personal</span>
                      )}
                      {lastLeg.flight_out.carry_on_included && (
                        <span className="flex items-center gap-1 text-green-600"><Briefcase className="h-3 w-3" /> Carry-on</span>
                      )}
                      {lastLeg.flight_out.checked_baggage_included && (
                        <span className="flex items-center gap-1 text-green-600"><Luggage className="h-3 w-3" /> Equipaje en bodega</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
      </div>

      {/* Transfers & Services */}
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-wrap gap-4">
          {paquete.transfer && (
            <div className="flex items-center gap-2 text-sm">
              <Bus className={`h-5 w-5 ${paquete.transfer.included ? 'text-green-600' : 'text-muted-foreground'}`} />
              <span className={paquete.transfer.included ? 'text-foreground' : 'text-muted-foreground'}>
                {paquete.transfer.included ? '✓ ' : ''}{paquete.transfer.description || 'Traslados'}
              </span>
            </div>
          )}
          
          {paquete.services && paquete.services.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {paquete.services.map((service, index) => (
                <span 
                  key={index} 
                  className={`text-xs px-2 py-1 rounded-full ${
                    service.included 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                  }`}
                >
                  {service.included ? '✓' : '○'} {service.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Precios */}
      <div className="p-4 md:p-6 bg-secondary/20">
        <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" /> Precios por Plan
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {paquete.prices.double?.price && paquete.prices.double.price > 0 && (
            <div className="p-3 bg-card rounded-lg border border-border text-center">
              <p className="text-xs text-muted-foreground">Base Doble</p>
              <p className="font-display text-lg font-bold text-primary">
                {currencySymbol} {paquete.prices.double.price.toLocaleString()}
              </p>
            </div>
          )}
          {paquete.prices.triple?.price && paquete.prices.triple.price > 0 && (
            <div className="p-3 bg-card rounded-lg border border-border text-center">
              <p className="text-xs text-muted-foreground">Base Triple</p>
              <p className="font-display text-lg font-bold text-primary">
                {currencySymbol} {paquete.prices.triple.price.toLocaleString()}
              </p>
            </div>
          )}
          {paquete.prices.single?.price && paquete.prices.single.price > 0 && (
            <div className="p-3 bg-card rounded-lg border border-border text-center">
              <p className="text-xs text-muted-foreground">Base Single</p>
              <p className="font-display text-lg font-bold text-primary">
                {currencySymbol} {paquete.prices.single.price.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Legal Text */}
      {paquete.legalText && (
        <div className="bg-muted/30 px-4 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
            {paquete.legalText}
          </p>
        </div>
      )}

      {/* Payment Methods */}
      {paquete.paymentMethods && (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-4 md:px-6 md:py-5 border-t border-primary/20">
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

      {/* CTA */}
      <div className="bg-primary/5 p-4 md:p-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center sm:text-left">
            ¿Te interesa este paquete?
          </p>
          <a
            href={CONTACT.getWhatsAppUrl(WHATSAPP_MESSAGES.package(paquete.title))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white px-5 py-2.5 rounded-lg font-semibold transition-colors text-sm"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
