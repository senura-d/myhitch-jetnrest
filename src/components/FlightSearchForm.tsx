import React, { useState, useRef, useEffect } from 'react';
import { Users, Search, Minus, Plus, ArrowLeftRight, ChevronDown } from 'lucide-react';

interface FlightSearchFormProps {
  onSearch?: (query: any) => void;
  destinations?: string[];
}

interface Airport {
  code: string;
  city: string;
  country: string;
}

const AIRPORTS: Airport[] = [
  { code: 'CMB', city: 'Colombo', country: 'Sri Lanka' },
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates' },
  { code: 'DOH', city: 'Doha', country: 'Qatar' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore' },
  { code: 'LHR', city: 'London', country: 'United Kingdom' },
  { code: 'JFK', city: 'New York', country: 'United States' },
  { code: 'CDG', city: 'Paris', country: 'France' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand' },
  { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'DEL', city: 'Delhi', country: 'India' },
  { code: 'BOM', city: 'Mumbai', country: 'India' },
  { code: 'MLE', city: 'Malé', country: 'Maldives' },
  { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong' },
  { code: 'SYD', city: 'Sydney', country: 'Australia' },
  { code: 'MEL', city: 'Melbourne', country: 'Australia' },
  { code: 'NRT', city: 'Tokyo', country: 'Japan' },
  { code: 'IST', city: 'Istanbul', country: 'Turkey' },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany' },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands' },
  { code: 'AUH', city: 'Abu Dhabi', country: 'United Arab Emirates' },
  { code: 'ZRH', city: 'Zurich', country: 'Switzerland' },
  { code: 'YYZ', city: 'Toronto', country: 'Canada' },
];

const fmtAirport = (a: Airport) => `${a.city} (${a.code})`;
const iso = (offsetDays: number) => new Date(Date.now() + offsetDays * 86400000).toISOString().split('T')[0];
const fmtDate = (s: string) => (s ? new Date(s + 'T00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '');

export default function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
  const [tripType, setTripType] = useState('round-trip');
  const [directOnly, setDirectOnly] = useState(false);

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState(iso(2));
  const [returnDate, setReturnDate] = useState(iso(4));
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('Economy');

  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [showPax, setShowPax] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const paxRef = useRef<HTMLDivElement>(null);
  const departRef = useRef<HTMLInputElement>(null);
  const returnRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (fromRef.current && !fromRef.current.contains(e.target as Node)) setShowFrom(false);
      if (toRef.current && !toRef.current.contains(e.target as Node)) setShowTo(false);
      if (paxRef.current && !paxRef.current.contains(e.target as Node)) setShowPax(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const filterAirports = (q: string) => {
    const s = q.toLowerCase();
    return AIRPORTS.filter((a) => a.city.toLowerCase().includes(s) || a.country.toLowerCase().includes(s) || a.code.toLowerCase().includes(s));
  };

  const swap = () => { setFrom(to); setTo(from); };

  const openPicker = (ref: React.RefObject<HTMLInputElement | null>) => {
    const el = ref.current;
    if (!el) return;
    // @ts-ignore - showPicker is supported in modern browsers
    if (typeof el.showPicker === 'function') el.showPicker();
    else el.focus();
  };

  // Extract the 3-letter airport code from a "City (CODE)" string, fallback to defaults
  const codeFrom = (s: string, fallback: string) => {
    const m = s.match(/\(([A-Za-z]{3})\)/);
    return (m ? m[1] : fallback).toUpperCase();
  };
  const cityFrom = (s: string, fallback: string) => (s ? s.replace(/\s*\(.*\)\s*/, '').trim() : fallback);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.({
      from,
      to,
      fromCity: cityFrom(from, 'Colombo'),
      toCity: cityFrom(to, 'Bali'),
      fromCode: codeFrom(from, 'CMB'),
      toCode: codeFrom(to, 'DPS'),
      departure,
      returnDate: tripType === 'one-way' ? '' : returnDate,
      passengers,
      flightClass,
      tripType,
      directOnly,
    });
  };

  const AirportDropdown = ({ query, onPick }: { query: string; onPick: (v: string) => void }) => (
    <div className="absolute top-full left-0 z-50 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-2xl py-2 max-h-64 overflow-y-auto">
      {filterAirports(query).map((a) => (
        <button key={a.code} type="button" onClick={() => onPick(fmtAirport(a))} className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors flex items-center gap-3">
          <span className="flex-1 min-w-0">
            <span className="block text-sm font-semibold text-slate-800 truncate">{a.city}, {a.country}</span>
            <span className="block text-xs text-slate-400">International Airport</span>
          </span>
          <span className="text-xs font-bold text-slate-500">{a.code}</span>
        </button>
      ))}
      {filterAirports(query).length === 0 && <p className="px-4 py-3 text-sm text-slate-400">No airports found</p>}
    </div>
  );

  const cellBase = 'flex-1 min-w-0 px-5 py-3 text-left';

  return (
    <form onSubmit={handleSubmit} className="w-full bg-slate-200/40 backdrop-blur-2xl rounded-2xl shadow-[0_8px_40px_rgba(15,23,42,0.06)] border border-slate-300/40 p-4 md:p-5 flex flex-col gap-4 animate-fadeIn">
      {/* Trip options row */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-700">
        {[
          { label: 'Return', val: 'round-trip' },
          { label: 'One-way', val: 'one-way' },
          { label: 'Multi-city', val: 'multi-city' },
        ].map((t) => (
          <label key={t.val} className="flex items-center gap-2 cursor-pointer select-none">
            <input type="radio" name="tripType" checked={tripType === t.val} onChange={() => setTripType(t.val)} className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500" />
            {t.label}
          </label>
        ))}
        <span className="mx-1 h-4 w-px bg-slate-300" />
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input type="checkbox" checked={directOnly} onChange={(e) => setDirectOnly(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          Direct
        </label>
      </div>

      {/* Connected search bar */}
      <div className="flex flex-col md:flex-row items-stretch bg-white/60 border border-slate-300/50 rounded-xl shadow-sm divide-y md:divide-y-0 md:divide-x divide-slate-300/40 relative">
        {/* Leaving from */}
        <div ref={fromRef} className={`${cellBase} relative`}>
          <input
            type="text"
            value={from}
            onChange={(e) => { setFrom(e.target.value); setShowFrom(true); }}
            onFocus={() => setShowFrom(true)}
            placeholder="Leaving from"
            className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-500 focus:outline-none"
          />
          {showFrom && <AirportDropdown query={from} onPick={(v) => { setFrom(v); setShowFrom(false); }} />}
        </div>

        {/* Going to */}
        <div ref={toRef} className={`${cellBase} relative md:pl-10`}>
          {/* Swap — sits on the divider between From and Going to */}
          <button type="button" onClick={swap} aria-label="Swap origin and destination" className="hidden md:flex absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white border border-slate-200 shadow items-center justify-center text-blue-600 hover:bg-blue-50">
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          <input
            type="text"
            value={to}
            onChange={(e) => { setTo(e.target.value); setShowTo(true); }}
            onFocus={() => setShowTo(true)}
            placeholder="Going to"
            className="w-full bg-transparent text-sm font-semibold text-slate-800 placeholder-slate-500 focus:outline-none"
          />
          {showTo && <AirportDropdown query={to} onPick={(v) => { setTo(v); setShowTo(false); }} />}
        </div>

        {/* Dates */}
        <div className="flex items-center gap-3 px-5 py-3 whitespace-nowrap">
          <button type="button" onClick={() => openPicker(departRef)} className="text-sm font-semibold text-slate-800 hover:text-blue-600">
            {fmtDate(departure)}
          </button>
          <span className="text-slate-400">—</span>
          <button
            type="button"
            onClick={() => openPicker(returnRef)}
            disabled={tripType === 'one-way'}
            className="text-sm font-semibold text-slate-800 hover:text-blue-600 disabled:text-slate-300"
          >
            {tripType === 'one-way' ? 'One-way' : fmtDate(returnDate)}
          </button>
          {/* hidden native pickers */}
          <input ref={departRef} type="date" title="Departure date" value={departure} min={iso(0)} onChange={(e) => setDeparture(e.target.value)} className="sr-only" />
          <input ref={returnRef} type="date" title="Return date" value={returnDate} min={departure} onChange={(e) => setReturnDate(e.target.value)} className="sr-only" />
        </div>

        {/* Travelers & class */}
        <div ref={paxRef} className="relative px-5 py-3">
          <button type="button" onClick={() => setShowPax(!showPax)} className="flex items-center gap-2 text-sm font-semibold text-slate-800 whitespace-nowrap">
            <Users className="h-4 w-4 text-slate-500" />
            {passengers} adult{passengers > 1 ? 's' : ''} · {flightClass}
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>

          {showPax && (
            <div className="absolute top-full right-0 z-50 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-2xl p-5 flex flex-col gap-4 text-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">Adults</p>
                  <p className="text-xs text-slate-400">Age 12+</p>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setPassengers(Math.max(1, passengers - 1))} disabled={passengers <= 1} aria-label="Decrease adults" className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-30">
                    <Minus className="h-4 w-4 text-slate-600" />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{passengers}</span>
                  <button type="button" onClick={() => setPassengers(passengers + 1)} aria-label="Increase adults" className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50">
                    <Plus className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
              </div>
              <hr className="border-slate-200" />
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold text-slate-800">Cabin class</p>
                <div className="grid grid-cols-2 gap-2">
                  {['Economy', 'Premium', 'Business', 'First Class'].map((c) => (
                    <button key={c} type="button" onClick={() => setFlightClass(c)} className={`px-3 py-2 text-xs font-semibold border rounded-lg transition-colors ${flightClass === c ? 'bg-blue-50 border-blue-600 text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={() => setShowPax(false)} className="mt-1 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors">Done</button>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <button type="button" className="h-11 px-6 border border-blue-600 text-blue-700 font-semibold text-sm rounded-lg hover:bg-blue-50 transition-colors">
          Flight + Hotel
        </button>
        <button type="submit" className="h-11 px-7 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2">
          <Search className="h-4 w-4" />
          Search
        </button>
      </div>
    </form>
  );
}
