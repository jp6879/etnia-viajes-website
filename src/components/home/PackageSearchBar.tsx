import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { usePackageSearch, type SearchParams, type SearchResult } from '@/hooks/usePackageSearch';

const MONTHS = [
  { value: '01', label: 'Enero' },
  { value: '02', label: 'Febrero' },
  { value: '03', label: 'Marzo' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Mayo' },
  { value: '06', label: 'Junio' },
  { value: '07', label: 'Julio' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Septiembre' },
  { value: '10', label: 'Octubre' },
  { value: '11', label: 'Noviembre' },
  { value: '12', label: 'Diciembre' },
];

const GLASS_CONTAINER = {
  backdropFilter: 'blur(16px)',
  background: 'rgba(255, 255, 255, 0.12)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
};

const RESULTS_CONTAINER = {
  backdropFilter: 'blur(20px)',
  background: 'rgba(10, 10, 20, 0.85)',
  boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
};

function ResultCard({ result, onClick }: { result: SearchResult; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/10 transition-colors text-left group"
    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
          <MapPin className="h-4 w-4 text-amber-400" />
        </div>
        <div>
          <div className="text-white font-semibold leading-tight">{result.destinationName}</div>
          <div className="text-white/50 text-sm mt-0.5">
            {result.country}
            {result.nights ? ` · ${result.nights} noches` : ''}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {result.priceFrom > 0 && (
          <div className="text-right">
            <div className="text-white/50 text-xs">Desde</div>
            <div className="text-amber-400 font-bold text-sm">
              {result.currency} {result.priceFrom.toLocaleString('es-AR')}
            </div>
          </div>
        )}
        <ArrowRight className="h-4 w-4 text-white/30 group-hover:text-amber-400 transition-colors" />
      </div>
    </button>
  );
}

export function PackageSearchBar() {
  const [origin, setOrigin] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [month, setMonth] = useState('');
  const [persons, setPersons] = useState(2);
  const [originOpen, setOriginOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [monthOpen, setMonthOpen] = useState(false);

  const {
    destinations,
    departureCities,
    isLoading,
    results,
    availableMonths,
    loadAvailableMonths,
    search,
    goToDestination,
    goToWhatsApp,
  } = usePackageSearch();

  // Reload available months whenever origin or destination changes
  useEffect(() => {
    loadAvailableMonths(origin, destinationId);
    // Clear month if it's no longer available
    if (month && availableMonths !== null && !availableMonths.has(month)) {
      setMonth('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destinationId]);

  const selectedMonthLabel = MONTHS.find(m => m.value === month)?.label ?? '';
  const currentParams: SearchParams = { origin, destinationId, destinationName, month, persons };

  function handleSearch() {
    search(currentParams);
  }

  function clearField(field: 'origin' | 'destination' | 'month') {
    if (field === 'origin') setOrigin('');
    if (field === 'destination') { setDestinationId(''); setDestinationName(''); }
    if (field === 'month') setMonth('');
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Bar */}
      <div className="rounded-2xl overflow-hidden border border-white/20" style={GLASS_CONTAINER}>
        <div className="flex flex-col md:flex-row md:divide-x divide-white/20">

          {/* Origin */}
          <Popover open={originOpen} onOpenChange={setOriginOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 px-5 py-4 text-left hover:bg-white/10 transition-colors md:flex-1 border-b md:border-b-0 border-white/20">
                <MapPin className="h-5 w-5 text-amber-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">Desde</div>
                  <div className={`text-sm font-medium truncate mt-0.5 ${origin ? 'text-white' : 'text-white/40'}`}>
                    {origin || 'Ciudad de origen'}
                  </div>
                </div>
                {origin && (
                  <span
                    onClick={(e) => { e.stopPropagation(); clearField('origin'); }}
                    className="text-white/30 hover:text-white/70 text-lg leading-none cursor-pointer"
                  >×</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0" align="start">
              <Command>
                <CommandInput placeholder="Buscar ciudad..." />
                <CommandList>
                  <CommandEmpty>No se encontraron ciudades.</CommandEmpty>
                  <CommandGroup>
                    {departureCities.map(city => (
                      <CommandItem
                        key={city}
                        value={city}
                        onSelect={() => { setOrigin(city); setOriginOpen(false); }}
                      >
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        {city}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Destination */}
          <Popover open={destOpen} onOpenChange={setDestOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 px-5 py-4 text-left hover:bg-white/10 transition-colors md:flex-1 border-b md:border-b-0 border-white/20">
                <MapPin className="h-5 w-5 text-amber-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">A dónde</div>
                  <div className={`text-sm font-medium truncate mt-0.5 ${destinationName ? 'text-white' : 'text-white/40'}`}>
                    {destinationName || 'Destino'}
                  </div>
                </div>
                {destinationName && (
                  <span
                    onClick={(e) => { e.stopPropagation(); clearField('destination'); }}
                    className="text-white/30 hover:text-white/70 text-lg leading-none cursor-pointer"
                  >×</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0" align="start">
              <Command>
                <CommandInput placeholder="Buscar destino..." />
                <CommandList>
                  <CommandEmpty>No se encontraron destinos.</CommandEmpty>
                  <CommandGroup>
                    {destinations.map(dest => (
                      <CommandItem
                        key={dest.id}
                        value={`${dest.name} ${dest.country}`}
                        onSelect={() => {
                          setDestinationId(dest.id);
                          setDestinationName(dest.name);
                          setDestOpen(false);
                        }}
                      >
                        <div>
                          <div className="font-medium">{dest.name}</div>
                          <div className="text-xs text-muted-foreground">{dest.country}</div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Month */}
          <Popover open={monthOpen} onOpenChange={setMonthOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 px-5 py-4 text-left hover:bg-white/10 transition-colors md:flex-1 border-b md:border-b-0 border-white/20">
                <Calendar className="h-5 w-5 text-amber-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">Cuándo</div>
                  <div className={`text-sm font-medium mt-0.5 ${month ? 'text-white' : 'text-white/40'}`}>
                    {selectedMonthLabel || 'Mes de salida'}
                  </div>
                </div>
                {month && (
                  <span
                    onClick={(e) => { e.stopPropagation(); clearField('month'); }}
                    className="text-white/30 hover:text-white/70 text-lg leading-none cursor-pointer"
                  >×</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-3" align="start">
              {availableMonths !== null && availableMonths.size === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">
                  Sin salidas disponibles para esta selección
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {MONTHS.map(m => {
                    const isAvailable = availableMonths === null || availableMonths.has(m.value);
                    return (
                      <button
                        key={m.value}
                        disabled={!isAvailable}
                        onClick={() => { setMonth(m.value); setMonthOpen(false); }}
                        className={`px-2 py-2 text-xs rounded-lg text-center transition-colors font-medium relative
                          ${month === m.value
                            ? 'bg-amber-500 text-white'
                            : isAvailable
                              ? 'hover:bg-muted text-foreground cursor-pointer'
                              : 'text-muted-foreground/40 cursor-not-allowed'
                          }`}
                      >
                        {m.label.slice(0, 3)}
                        {isAvailable && availableMonths !== null && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </PopoverContent>
          </Popover>

          {/* Persons */}
          <div className="flex items-center gap-3 px-5 py-4 border-b md:border-b-0 border-white/20">
            <Users className="h-5 w-5 text-amber-400 shrink-0" />
            <div className="flex-1">
              <div className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">Personas</div>
              <div className="flex items-center gap-3 mt-1">
                <button
                  onClick={() => setPersons(p => Math.max(1, p - 1))}
                  className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 text-white text-sm font-bold flex items-center justify-center transition-colors select-none"
                >−</button>
                <span className="text-white font-semibold w-4 text-center text-sm">{persons}</span>
                <button
                  onClick={() => setPersons(p => Math.min(6, p + 1))}
                  className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 text-white text-sm font-bold flex items-center justify-center transition-colors select-none"
                >+</button>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white font-bold hover:from-amber-600 hover:to-yellow-500 transition-all disabled:opacity-60 shrink-0"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span className="hidden sm:inline">Buscar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Results Panel */}
      <AnimatePresence>
        {results !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-2 rounded-2xl overflow-hidden border border-white/10"
            style={RESULTS_CONTAINER}
          >
            {results.length > 0 ? (
              <>
                <div className="px-5 py-3 border-b border-white/10">
                  <span className="text-white/50 text-xs font-medium uppercase tracking-wider">
                    {results.length} destino{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="divide-y divide-white/10 max-h-72 overflow-y-auto">
                  {results.map(result => (
                    <ResultCard
                      key={result.destinationSlug}
                      result={result}
                      onClick={() => goToDestination(result)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="px-6 py-8 text-center">
                <div className="text-white/80 font-semibold mb-1">No encontramos paquetes disponibles</div>
                <div className="text-white/40 text-sm mb-5">
                  Consultanos por WhatsApp y encontramos la mejor opción para vos
                </div>
                <button
                  onClick={() => goToWhatsApp(currentParams, selectedMonthLabel)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition-colors text-sm"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Consultar por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
