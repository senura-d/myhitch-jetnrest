import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Calendar, Users, Search, Minus, Plus } from 'lucide-react';
import { SearchQuery } from '../types';

interface SearchFormProps {
  onSearch: (query: SearchQuery) => void;
  destinations: string[];
}

export default function SearchForm({ onSearch, destinations }: SearchFormProps) {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);

  // Dropdown states
  const [showDestSuggestions, setShowDestSuggestions] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestSuggestions(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setShowGuestDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredDestinations = destinations.filter(d =>
    d.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      destination: destination || destinations[0],
      checkIn: checkIn || new Date().toISOString().split('T')[0],
      checkOut: checkOut || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      guests,
      rooms
    });
  };

  // Shared input styling — transparent frosted glass with readable dark text
  const inputClass =
    'w-full h-12 pl-11 pr-3 bg-white/60 border border-slate-300/50 rounded-xl text-sm font-medium text-black placeholder-slate-400 focus:outline-none focus:bg-white/90 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300';
  const labelClass = 'block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 ml-1';

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-slate-200/40 backdrop-blur-2xl rounded-2xl shadow-[0_8px_40px_rgba(15,23,42,0.06)] border border-slate-300/40 p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-end animate-fadeIn"
    >
      {/* Destination Selector */}
      <div ref={destRef} className="col-span-1 md:col-span-4 relative group">
        <label className={labelClass}>Destination</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowDestSuggestions(true);
            }}
            onFocus={() => setShowDestSuggestions(true)}
            placeholder="Where to?"
            className={inputClass}
          />
        </div>

        {/* Destination Suggestions */}
        {showDestSuggestions && filteredDestinations.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white/90 backdrop-blur-xl rounded-xl border border-slate-200 shadow-xl py-2 max-h-60 overflow-y-auto">
            {filteredDestinations.map((dest) => (
              <button
                key={dest}
                type="button"
                onClick={() => {
                  setDestination(dest);
                  setShowDestSuggestions(false);
                }}
                className="w-full text-left px-5 py-2.5 text-sm text-slate-700 hover:bg-blue-50 font-medium transition-colors flex items-center gap-3"
              >
                <MapPin className="h-4 w-4 text-slate-400" />
                {dest}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Check In Date */}
      <div className="col-span-1 md:col-span-2">
        <label className={labelClass}>Check In</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 pointer-events-none" />
          <input
            type="date"
            title="Check In Date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className={`${inputClass} cursor-pointer`}
          />
        </div>
      </div>

      {/* Check Out Date */}
      <div className="col-span-1 md:col-span-2">
        <label className={labelClass}>Check Out</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600 pointer-events-none" />
          <input
            type="date"
            title="Check Out Date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split('T')[0]}
            className={`${inputClass} cursor-pointer`}
          />
        </div>
      </div>

      {/* Guests Dropdown */}
      <div ref={guestRef} className="col-span-1 md:col-span-2 relative">
        <label className={labelClass}>Guests</label>
        <button
          type="button"
          onClick={() => setShowGuestDropdown(!showGuestDropdown)}
          className="w-full h-12 pl-11 pr-3 bg-white/50 border border-slate-200 rounded-xl text-sm font-medium text-black flex items-center hover:bg-white/80 transition-colors focus:outline-none relative"
        >
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
          <span className="truncate">{guests} Guests, {rooms} Room{rooms > 1 ? 's' : ''}</span>
        </button>

        {/* Guests Dropdown Dialog */}
        {showGuestDropdown && (
          <div className="absolute top-full right-0 z-50 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-xl border border-slate-200 shadow-xl p-5 flex flex-col gap-4 text-slate-800">
            {/* Guests Counter */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Guests</p>
                <p className="text-xs text-slate-400">Age 13 or above</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-30"
                  disabled={guests <= 1}
                  aria-label="Decrease guests"
                >
                  <Minus className="h-4 w-4 text-slate-600" />
                </button>
                <span className="text-sm font-bold w-4 text-center">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests(guests + 1)}
                  className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                  aria-label="Increase guests"
                >
                  <Plus className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            </div>

            <hr className="border-slate-200" />

            {/* Rooms Counter */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">Rooms</p>
                <p className="text-xs text-slate-400">Individual suites booked</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                  className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors disabled:opacity-30"
                  disabled={rooms <= 1}
                  aria-label="Decrease rooms"
                >
                  <Minus className="h-4 w-4 text-slate-600" />
                </button>
                <span className="text-sm font-bold w-4 text-center">{rooms}</span>
                <button
                  type="button"
                  onClick={() => setRooms(rooms + 1)}
                  className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                  aria-label="Increase rooms"
                >
                  <Plus className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowGuestDropdown(false)}
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
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Search className="h-4 w-4" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}
