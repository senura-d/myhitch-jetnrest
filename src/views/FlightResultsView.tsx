import React, { useState } from 'react';
import { Plane, ChevronLeft, ChevronRight, BarChart3, Wifi, Coffee, Tv, Zap } from 'lucide-react';

export interface FlightQuery {
  fromCity?: string;
  toCity?: string;
  fromCode?: string;
  toCode?: string;
  departure?: string;
  returnDate?: string;
  passengers?: number;
  flightClass?: string;
  tripType?: string;
  directOnly?: boolean;
}

interface FlightResultsViewProps {
  query: FlightQuery;
  onBack: () => void;
  onRequireAuth?: () => boolean;
}

const fmt = (s?: string) =>
  s ? new Date(s + 'T00:00').toLocaleDateString('en-AU', { weekday: 'short', month: 'short', day: 'numeric' }) : '—';

export default function FlightResultsView({ query, onBack, onRequireAuth }: FlightResultsViewProps) {
  const fromCode = query.fromCode || 'CMB';
  const toCode = query.toCode || 'DPS';
  const toCity = query.toCity || 'Bali';
  const pax = query.passengers || 1;
  const cabin = query.flightClass || 'Economy';

  const flights = [
    { id: 'f1', airline: 'AirAsia Berhad (Malaysia)', logo: 'AK', color: 'bg-red-600', dep: '22:55', arr: '19:15', plus: 1, durMin: 1070, dur: '17h 50m', stop: '11h in Kuala Lumpur', price: 994, tag: 'Cheapest', baggage: '', budget: true, airlineKey: 'AirAsia Berhad' },
    { id: 'f2', airline: 'SriLankan Airlines, Garuda I…', logo: 'UL', color: 'bg-sky-700', dep: '12:15', arr: '12:30', plus: 1, durMin: 1305, dur: '21h 45m', stop: '14h 40m in Singapore', price: 1000, tag: '', baggage: 'Checked baggage 30 kg', budget: false, airlineKey: 'SriLankan Airlines' },
    { id: 'f3', airline: 'Batik Air Malaysia', logo: 'OD', color: 'bg-rose-600', dep: '02:05', arr: '19:40', plus: 0, durMin: 905, dur: '15h 5m', stop: '8h 5m in Kuala Lumpur', price: 1007, tag: '', baggage: '', budget: true, airlineKey: 'Batik Air' },
    { id: 'f4', airline: 'Singapore Airlines', logo: 'SQ', color: 'bg-blue-900', dep: '09:40', arr: '20:05', plus: 0, durMin: 505, dur: '8h 25m', stop: '2h 10m in Singapore', price: 1180, tag: '', baggage: 'Checked baggage 30 kg', budget: false, airlineKey: 'Singapore Airlines' },
    { id: 'f5', airline: 'Malaysia Airlines', logo: 'MH', color: 'bg-indigo-700', dep: '19:30', arr: '14:55', plus: 1, durMin: 805, dur: '13h 25m', stop: '6h in Kuala Lumpur', price: 1281, tag: '', baggage: 'Checked baggage 30 kg', budget: false, airlineKey: 'Malaysia Airlines' },
  ];
  type Flight = typeof flights[number];

  const dateTabs = ['Jun 30–Jul 2', 'Jul 1–Jul 3', 'Jul 2–Jul 4', 'Jul 3–Jul 5', 'Jul 4–Jul 6', 'Jul 5–Jul 7', 'Jul 6–Jul 8'];
  const [activeTab, setActiveTab] = useState(2);
  const [sort, setSort] = useState<'direct' | 'recommended' | 'cheapest'>('recommended');
  const [baggageOnly, setBaggageOnly] = useState(false);
  const [hideBudget, setHideBudget] = useState(false);
  const [airlineFilter, setAirlineFilter] = useState<string[]>([]);
  const [airlineQuery, setAirlineQuery] = useState('');

  const toggleAirline = (key: string) =>
    setAirlineFilter((prev) => (prev.includes(key) ? prev.filter((a) => a !== key) : [...prev, key]));

  const displayed: Flight[] = flights
    .filter((f) => !baggageOnly || !!f.baggage)
    .filter((f) => !hideBudget || !f.budget)
    .filter((f) => airlineFilter.length === 0 || airlineFilter.includes(f.airlineKey))
    .slice()
    .sort((a, b) => {
      if (sort === 'cheapest') return a.price - b.price;
      if (sort === 'direct') return a.durMin - b.durMin;
      return 0;
    });

  const cheapest = Math.min(...flights.map((f) => f.price));

  const airlineOptions = [
    { key: 'Malaysia Airlines', label: 'Malaysia Airlines (7)', price: 1281 },
    { key: 'SriLankan Airlines', label: 'SriLankan Airlines (5)', price: 1000 },
    { key: 'AirAsia Berhad', label: 'AirAsia Berhad (5)', price: 994 },
  ].filter((o) => o.label.toLowerCase().includes(airlineQuery.toLowerCase()));

  return (
    <div className="bg-slate-100 min-h-screen pt-24 pb-20">
      {/* Search summary bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1 text-sm font-semibold text-booking-blue hover:text-blue-700">
            <ChevronLeft className="h-4 w-4" /> Modify search
          </button>
          <div className="flex-1 flex flex-wrap items-center gap-2 justify-center text-sm">
            <span className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-semibold text-slate-800">
              <Plane className="h-4 w-4 text-booking-blue" /> {fromCode} → {toCode}
            </span>
            <span className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700">{fmt(query.departure)} — {fmt(query.returnDate)}</span>
            <span className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700">{pax} {pax > 1 ? 'adults' : 'adult'} · {cabin}</span>
          </div>
          <button className="h-10 px-6 bg-booking-blue hover:bg-blue-700 text-white text-sm font-semibold rounded-lg">Search</button>
        </div>
      </div>

      {/* Date tabs */}
      <div className="max-w-6xl mx-auto px-6 mt-4">
        <div className="bg-white rounded-xl border border-slate-200 flex items-stretch overflow-hidden">
          <button aria-label="Previous date" className="px-3 flex items-center text-slate-400 hover:text-slate-700 border-r border-slate-100"><ChevronLeft className="h-5 w-5" /></button>
          {dateTabs.map((d, i) => (
            <button
              key={d}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-3 text-center border-r border-slate-100 transition-colors ${i === activeTab ? 'border-b-2 border-b-slate-900' : 'hover:bg-slate-50'}`}
            >
              <p className={`text-sm font-semibold ${i === activeTab ? 'text-slate-900' : 'text-slate-600'}`}>{d}</p>
              <p className={`text-xs ${i === activeTab ? 'text-booking-blue font-bold' : 'text-slate-400'}`}>{i === activeTab ? 'AU$ 994' : 'View'}</p>
            </button>
          ))}
          <button aria-label="Next date" className="px-3 flex items-center text-slate-400 hover:text-slate-700 border-r border-slate-100"><ChevronRight className="h-5 w-5" /></button>
          <button className="px-4 flex flex-col items-center justify-center text-slate-600 hover:bg-slate-50">
            <BarChart3 className="h-4 w-4" />
            <span className="text-[11px] mt-0.5">Price graph</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* Filters */}
        <aside className="space-y-6">
          <FilterCard title="Recommended">
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer py-1.5">
              <input type="checkbox" checked={baggageOnly} onChange={(e) => setBaggageOnly(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-booking-blue focus:ring-blue-500" /> Checked baggage included
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer py-1.5">
              <input type="checkbox" checked={hideBudget} onChange={(e) => setHideBudget(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-booking-blue focus:ring-blue-500" /> Hide budget airlines
            </label>
          </FilterCard>

          <FilterCard title="Alliance">
            {[['SkyTeam', 1000], ['Oneworld', 1000], ['Star Alliance', 1425]].map(([n, p]) => (
              <label key={n as string} className="flex items-center justify-between text-sm text-slate-600 cursor-pointer py-1.5">
                <span className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-booking-blue focus:ring-blue-500" />{n}</span>
                <span className="text-slate-400">AU$ {(p as number).toLocaleString()}</span>
              </label>
            ))}
          </FilterCard>

          <FilterCard title="Airlines">
            <input
              value={airlineQuery}
              onChange={(e) => setAirlineQuery(e.target.value)}
              placeholder="All airlines"
              className="w-full h-9 mb-2 px-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-booking-blue"
            />
            {airlineOptions.map((o) => (
              <label key={o.key} className="flex items-center justify-between text-sm text-slate-600 cursor-pointer py-1.5">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={airlineFilter.includes(o.key)}
                    onChange={() => toggleAirline(o.key)}
                    className="h-4 w-4 rounded border-slate-300 text-booking-blue focus:ring-blue-500"
                  />
                  {o.label}
                </span>
                <span className="text-slate-400">AU$ {o.price.toLocaleString()}</span>
              </label>
            ))}
          </FilterCard>
        </aside>

        {/* Results */}
        <main>
          {/* Header banner */}
          <div className="rounded-t-xl bg-gradient-to-r from-slate-800 to-slate-700 text-white px-5 py-3 flex items-center justify-between">
            <span className="font-bold">1. Departures to {toCity}</span>
            <span className="text-sm text-white/70">{displayed.length} flights found</span>
          </div>

          {/* Sort bar */}
          <div className="bg-white border-x border-slate-200 grid grid-cols-3 sm:grid-cols-4">
            {([['direct', 'Direct first', cheapest], ['recommended', 'Recommended', cheapest], ['cheapest', 'Cheapest', cheapest]] as const).map(([key, label, price]) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`py-3 text-center border-r border-slate-100 ${sort === key ? 'border-b-2 border-b-slate-900' : ''}`}
              >
                <p className={`text-sm font-semibold ${sort === key ? 'text-slate-900' : 'text-slate-500'}`}>{label}</p>
                <p className="text-xs text-slate-400">AU$ {price}</p>
              </button>
            ))}
            <button className="hidden sm:block py-3 text-center text-sm font-semibold text-slate-500">Sort by</button>
          </div>

          <p className="bg-white border-x border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700">
            {query.directOnly ? 'Showing direct flights only.' : 'No direct flights found. Check out the following flights with transfers.'}
          </p>

          {/* Flight cards */}
          <div className="bg-white border border-slate-200 rounded-b-xl divide-y divide-slate-100">
            {displayed.length === 0 && (
              <p className="px-5 py-10 text-center text-slate-400">No flights match your filters.</p>
            )}
            {displayed.map((f) => (
              <div key={f.id} className="p-5">
                {(f.tag || f.baggage) && (
                  <div className="mb-3 flex gap-2">
                    {f.tag && <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">{f.tag}</span>}
                    {f.baggage && <span className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">🧳 {f.baggage}</span>}
                  </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center gap-5">
                  <div className="flex items-center gap-3 md:w-56">
                    <div className={`h-9 w-9 rounded-full ${f.color} text-white flex items-center justify-center text-xs font-bold`}>{f.logo}</div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 leading-tight">{f.airline}</p>
                      <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                        <Zap className="h-3 w-3" /><Coffee className="h-3 w-3" /><Wifi className="h-3 w-3" /><Tv className="h-3 w-3" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 flex-1">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{f.dep}</p>
                      <p className="text-xs text-slate-400">{fromCode}</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <span className="text-xs text-slate-400">{f.dur}</span>
                      <div className="w-full h-px bg-slate-300 my-1.5 relative"><span className="absolute left-1/2 -translate-x-1/2 -top-1 h-2 w-2 rounded-full border border-slate-400 bg-white" /></div>
                      <span className="text-xs text-slate-400">{f.stop}</span>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">{f.arr}{f.plus ? <sup className="text-red-500 text-xs">+{f.plus}</sup> : null}</p>
                      <p className="text-xs text-slate-400">{toCode}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:w-40">
                    <div className="text-right">
                      <p className="text-xl font-bold text-booking-blue">AU$ {f.price.toLocaleString()}</p>
                      <p className="text-xs text-slate-400">Return</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (onRequireAuth && !onRequireAuth()) return;
                        alert(`Flight selected: ${f.airline}\n${fromCode} ${f.dep} → ${toCode} ${f.arr}\nAU$ ${f.price.toLocaleString()} return`);
                      }}
                      className="px-6 py-2 bg-booking-blue hover:bg-blue-700 text-white text-sm font-semibold rounded-md transition-colors"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function FilterCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <h3 className="text-sm font-bold text-slate-800 mb-3">{title}</h3>
      {children}
    </div>
  );
}
