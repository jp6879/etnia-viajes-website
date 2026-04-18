import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { CONTACT } from '@/config/contact';

export interface SearchParams {
  origin: string;
  destinationId: string;
  destinationName: string;
  month: string;
  persons: number;
}

export interface SearchResult {
  destinationSlug: string;
  destinationName: string;
  regionSlug: string;
  country: string;
  dates: string;
  priceFrom: number;
  currency: string;
  nights?: number;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  country: string;
  region_slug: string;
}

// Both Spanish and English abbreviated names — iterate keys in "01"→"12" order
// so that for cross-month dates the departure month (earlier) is found first.
const MONTH_NAMES: Record<string, string[]> = {
  '01': ['enero', 'jan'],
  '02': ['febrero', 'feb'],
  '03': ['marzo', 'mar'],
  '04': ['abril', 'apr'],
  '05': ['mayo', 'may'],
  '06': ['junio', 'jun'],
  '07': ['julio', 'jul'],
  '08': ['agosto', 'aug'],
  '09': ['septiembre', 'setiembre', 'sep'],
  '10': ['octubre', 'oct'],
  '11': ['noviembre', 'nov'],
  '12': ['diciembre', 'dec'],
};

/**
 * Extract the departure month (2-digit string "01"–"12") from date strings like:
 *   "10 al 18 de agosto"
 *   "14 al 23 de Mayo de 2026"
 *   "10-17 Jun 2026"
 *   "30 de abril al 13 de mayo"  → returns "04" (departure month, not return)
 *   "10 de agosto"
 * Checks outboundDate first (more structured), then falls back to the display dates string.
 */
function extractDepartureMonth(datesStr: string, outboundDate = ''): string | null {
  for (const source of [outboundDate, datesStr]) {
    if (!source) continue;
    const lower = source.toLowerCase();

    // Numeric formats: DD/MM or MM/DD — look for /MM or /M
    const numericMatch = lower.match(/\/(\d{1,2})(?:[^/]|$)/);
    if (numericMatch) {
      const n = parseInt(numericMatch[1]);
      if (n >= 1 && n <= 12) return String(n).padStart(2, '0');
    }

    // Month name — iterate in calendar order so the first found = departure month
    for (const [num, names] of Object.entries(MONTH_NAMES)) {
      if (names.some(name => lower.includes(name))) return num;
    }
  }
  return null;
}

const PERSON_KEYS = ['single', 'double', 'triple', 'quadruple', 'family'] as const;

function getPersonKey(persons: number): typeof PERSON_KEYS[number] {
  if (persons === 1) return 'single';
  if (persons === 2) return 'double';
  if (persons === 3) return 'triple';
  if (persons === 4) return 'quadruple';
  return 'family';
}

function getMinPrice(prices: Record<string, { price: number } | undefined>, personKey: typeof PERSON_KEYS[number]): number {
  const entry = prices?.[personKey];
  if (entry?.price) return entry.price;
  for (const key of PERSON_KEYS) {
    const fallback = prices?.[key];
    if (fallback?.price) return fallback.price;
  }
  return 0;
}

export function usePackageSearch() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [departureCities, setDepartureCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[] | null>(null);
  // null = no filter active (show all months); Set = only these months have packages
  const [availableMonths, setAvailableMonths] = useState<Set<string> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from('destinations')
      .select('id, slug, name, country, region_slug')
      .eq('is_active', true)
      .order('name')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data }: { data: any }) => {
        if (data) setDestinations(data as Destination[]);
      });

    supabase
      .from('packages')
      .select('departure_city')
      .eq('is_active', true)
      .not('departure_city', 'is', null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(({ data }: { data: any }) => {
        if (data) {
          const cities = [...new Set(
            (data as { departure_city: string }[]).map(d => d.departure_city).filter(Boolean)
          )].sort() as string[];
          setDepartureCities(cities);
        }
      });
  }, []);

  /** Fetch available departure months for the given origin/destination combo. */
  const loadAvailableMonths = useCallback(async (origin: string, destinationId: string) => {
    if (!origin && !destinationId) {
      setAvailableMonths(null);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query: any = supabase
      .from('packages')
      .select('dates, flight')
      .eq('is_active', true);

    if (origin) query = query.eq('departure_city', origin);
    if (destinationId) query = query.eq('destination_id', destinationId);

    const { data } = await query;
    const months = new Set<string>();
    for (const pkg of data || []) {
      const month = extractDepartureMonth(pkg.dates || '', pkg.flight?.outbound?.date || '');
      if (month) months.add(month);
    }
    setAvailableMonths(months);
  }, []);

  async function search(params: SearchParams) {
    setIsLoading(true);
    setResults(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let query: any = supabase
        .from('packages')
        .select('id, destination_id, title, dates, prices, departure_city, nights, currency, flight, destinations(id, slug, name, country, region_slug)')
        .eq('is_active', true);

      if (params.origin) query = query.eq('departure_city', params.origin);
      if (params.destinationId) query = query.eq('destination_id', params.destinationId);

      const { data: packages, error } = await query;
      if (error) throw error;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let filtered: any[] = packages || [];

      if (params.month) {
        filtered = filtered.filter((pkg: { dates: string; flight?: { outbound?: { date?: string } } }) => {
          const month = extractDepartureMonth(pkg.dates || '', pkg.flight?.outbound?.date || '');
          return month === params.month;
        });
      }

      if (params.persons > 0) {
        const personKey = getPersonKey(params.persons);
        filtered = filtered.filter((pkg: { prices: Record<string, { price: number }> }) =>
          (pkg.prices?.[personKey]?.price ?? 0) > 0
        );
      }

      // Group by destination, keep cheapest package per destination
      const byDest: Record<string, SearchResult> = {};
      for (const pkg of filtered) {
        const dest = pkg.destinations as Destination | null;
        if (!dest?.id) continue;

        const prices = pkg.prices as Record<string, { price: number } | undefined>;
        const personKey = params.persons > 0 ? getPersonKey(params.persons) : 'double';
        const price = getMinPrice(prices, personKey);

        if (!byDest[dest.id] || (price && price < byDest[dest.id].priceFrom)) {
          byDest[dest.id] = {
            destinationSlug: dest.slug,
            destinationName: dest.name,
            regionSlug: dest.region_slug,
            country: dest.country,
            dates: pkg.dates,
            priceFrom: price,
            currency: pkg.currency || 'USD',
            nights: pkg.nights,
          };
        }
      }

      setResults(Object.values(byDest).slice(0, 8));
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  function goToDestination(result: SearchResult) {
    navigate(`/paquetes/${result.regionSlug}/${result.destinationSlug}`);
  }

  function goToWhatsApp(params: SearchParams, monthLabel: string) {
    const parts: string[] = [];
    if (params.origin) parts.push(`desde ${params.origin}`);
    if (params.destinationName) parts.push(`a ${params.destinationName}`);
    if (monthLabel) parts.push(`en ${monthLabel}`);
    parts.push(`para ${params.persons} persona${params.persons !== 1 ? 's' : ''}`);
    const msg = `Hola! Estoy buscando un paquete de viaje ${parts.join(', ')} y no encontré disponibilidad en el sitio. ¿Me pueden ayudar?`;
    window.open(CONTACT.getWhatsAppUrl(msg), '_blank');
  }

  return {
    destinations,
    departureCities,
    isLoading,
    results,
    availableMonths,
    loadAvailableMonths,
    search,
    goToDestination,
    goToWhatsApp,
  };
}
