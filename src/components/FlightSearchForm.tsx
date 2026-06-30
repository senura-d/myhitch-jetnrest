import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, Search, Minus, Plus, PlaneTakeoff, PlaneLanding } from 'lucide-react';
import { SearchQuery } from '../types';

interface FlightSearchFormProps {
  onSearch?: (query: any) => void;
  destinations: string[];
}

export default function FlightSearchForm({ onSearch, destinations }: FlightSearchFormProps) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [flightClass, setFlightClass] = useState('Economy');

  // Dropdown states
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);
  const passengerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromSuggestions(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToSuggestions(false);
      }
      if (passengerRef.current && !passengerRef.current.contains(event.target as Node)) {
        setShowPassengerDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFrom = destinations.filter(d =>
    d.toLowerCase().includes(from.toLowerCase())
  );
  
  const filteredTo = destinations.filter(d =>
    d.toLowerCase().includes(to.toLowerCase())
  );

  const [tripType, setTripType] = useState('round-trip');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({
        from: from || destinations[0],
        to: to || destinations[1],
        departure: departure || new Date().toISOString().split('T')[0],
        returnDate: returnDate || new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        passengers,
        flightClass,
        tripType
      });
    }
  };

  // Shared input styling — transparent frosted glass with readable dark text
  const inputClass =
    'w-full h-10 pl-10 pr-3 bg-white/50 border border-slate-200 rounded-lg text-sm font-medium text-black placeholder-slate-400 focus:outline-none focus:bg-white/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300';
  const labelClass = 'block text-[10px] font-semibold text-black uppercase tracking-wider mb-1 ml-1';

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white/40 backdrop-blur-2xl rounded-xl shadow-[0_8px_40px_rgba(15,23,42,0.08)] border border-white/70 p-4 flex flex-col gap-4 animate-fadeIn"
    >
      {/* Flight Type Menu Bar */}
      <div className="flex items-center gap-6 border-b border-white/50 pb-3">
        {['Round-trip', 'One-way', 'Multi-city'].map((type) => {
          const val = type.toLowerCase().replace(' ', '-');
          const isActive = tripType === val;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setTripType(val)}
              className={`text-sm font-bold transition-all relative ${
                isActive ? 'text-blue-700' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {type}
              {isActive && (
                <span className="absolute -bottom-3.5 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        {/* From Selector */}
        <div ref={fromRef} className="col-span-1 md:col-span-2 relative group">
        <label className={labelClass}>From</label>
        <div className="relative">
          <PlaneTakeoff className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
          <input
            type="text"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setShowFromSuggestions(true);
            }}
            onFocus={() => setShowFromSuggestions(true)}
            placeholder="Origin"
            className={inputClass}
          />
        </div>

        {/* From Suggestions */}
        {showFromSuggestions && filteredFrom.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white/90 backdrop-blur-xl rounded-xl border border-slate-200 shadow-xl py-2 max-h-60 overflow-y-auto">
            {filteredFrom.map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => {
                  setFrom(dest);
                  setShowFromSuggestions(false);
                }}
                className="w-full text-left px-5 py-2.5 text-sm text-slate-700 hover:bg-blue-50 font-medium transition-colors flex items-center gap-3"
              >
                <PlaneTakeoff className="h-4 w-4 text-slate-400" />
                {dest}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* To Selector */}
      <div ref={toRef} className="col-span-1 md:col-span-2 relative group">
        <label className={labelClass}>To</label>
        <div className="relative">
          <PlaneLanding className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
          <input
            type="text"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setShowToSuggestions(true);
            }}
            onFocus={() => setShowToSuggestions(true)}
            placeholder="Destination"
            className={inputClass}
          />
        </div>

        {/* To Suggestions */}
        {showToSuggestions && filteredTo.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white/90 backdrop-blur-xl rounded-xl border border-slate-200 shadow-xl py-2 max-h-60 overflow-y-auto">
            {filteredTo.map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => {
                  setTo(dest);
                  setShowToSuggestions(false);
                }}
                className="w-full text-left px-5 py-2.5 text-sm text-slate-700 hover:bg-blue-50 font-medium transition-colors flex items-center gap-3"
              >
                <PlaneLanding className="h-4 w-4 text-slate-400" />
                {dest}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Departure Date */}
      <div className="col-span-1 md:col-span-2">
        <label className={labelClass}>Departure</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 pointer-events-none" />
          <input
            type="date"
            title="Departure Date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={`${inputClass} cursor-pointer`}
          />
        </div>
      </div>

      {/* Return Date */}
      <div className="col-span-1 md:col-span-2">
        <label className={labelClass}>Return</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 pointer-events-none" />
          <input
            type="date"
            title="Return Date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={departure || new Date().toISOString().split('T')[0]}
            className={`${inputClass} cursor-pointer`}
          />
        </div>
      </div>

      {/* Passengers & Class Dropdown */}
      <div ref={passengerRef} className="col-span-1 md:col-span-2 relative">
        <label className={labelClass}>Travelers</label>
        <button
          type="button"
          onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
          className="w-full h-10 pl-10 pr-3 bg-white/50 border border-slate-200 rounded-lg text-sm font-medium text-black flex items-center hover:bg-white/80 transition-colors focus:outline-none relative"
        >
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
          <span className="truncate">{passengers} Pass, {flightClass.substring(0,3)}</span>
        </button>

        {/* Passenger Dropdown Dialog */}
        {showPassengerDropdown && (
          <div className="absolute top-full right-0 z-50 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200 shadow-xl p-5 flex flex-col gap-4 text-slate-800">
            {/* Passenger Counter */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Passengers</p>
                <p className="text-xs text-slate-400">All ages</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPassengers(Math.max(1, passengers - 1))}
                  className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-30"
                  disabled={passengers <= 1}
                  title="Decrease passengers"
                  aria-label="Decrease passengers"
                >
                  <Minus className="h-4 w-4 text-slate-600" />
                </button>
                <span className="text-sm font-bold w-4 text-center">{passengers}</span>
                <button
                  type="button"
                  onClick={() => setPassengers(passengers + 1)}
                  className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                  title="Increase passengers"
                  aria-label="Increase passengers"
                >
                  <Plus className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Flight Class */}
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-slate-800">Cabin Class</p>
              <div className="grid grid-cols-2 gap-2">
                {['Economy', 'Premium', 'Business', 'First Class'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFlightClass(c)}
                    className={`px-3 py-2 text-xs font-semibold border rounded-lg transition-colors ${flightClass === c ? 'bg-blue-50 border-blue-600 text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowPassengerDropdown(false)}
              className="mt-1 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              Apply Selection
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="col-span-1 md:col-span-2">
        <button
          type="submit"
          className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Search className="h-4 w-4" />
          <span>Search Flights</span>
        </button>
      </div>
      </div>
    </form>
  );
}
