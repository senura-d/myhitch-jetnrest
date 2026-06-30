import React from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import SearchForm from '../components/SearchForm';
import { Stay, SearchQuery } from '../types';
import { mockDestinations } from '../data/mockData';

interface StaysViewProps {
  stays: Stay[];
  onSearch: (query: SearchQuery) => void;
  onSelectStay: (stay: Stay) => void;
  onBackToHome: () => void;
}

export default function StaysView({ stays, onSearch, onSelectStay, onBackToHome }: StaysViewProps) {
  const destinationNames = mockDestinations.map((d) => `${d.name}, ${d.country}`);

  return (
    <div className="bg-booking-dark min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-8">
          <button onClick={onBackToHome} className="text-sm text-white/40 hover:text-white transition-colors mb-4">← Back to home</button>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-serif">Luxury Stays in Sri Lanka</h1>
          <p className="mt-3 text-white/50 max-w-xl">
            Browse {stays.length} handpicked resorts, villas and boutique retreats — book with our best price guarantee.
          </p>
        </div>

        {/* Search */}
        <SearchForm onSearch={onSearch} destinations={destinationNames} />

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stays.map((stay) => (
            <button
              key={stay.id}
              type="button"
              onClick={() => onSelectStay(stay)}
              className="group text-left bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-booking-amber/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-52 overflow-hidden relative">
                <img
                  src={stay.images[0]}
                  alt={stay.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {stay.badge && (
                  <span className="absolute top-3 left-3 bg-booking-amber text-white text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {stay.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 bg-booking-dark/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Star className="h-3 w-3 fill-booking-amber text-booking-amber" />{stay.rating}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-white/50 flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-booking-amber" />{stay.city}</p>
                <h3 className="text-lg font-semibold text-white mt-1 leading-snug group-hover:text-booking-amber transition-colors">{stay.name}</h3>
                <p className="text-xs text-white/40 mt-1">{stay.ratingLabel} · {stay.ratingCount} reviews</p>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-sm text-white/40">
                    from <span className="text-2xl font-bold text-booking-amber">${stay.pricePerNight}</span>
                    <span className="text-xs"> /night</span>
                  </p>
                  <span className="px-4 py-2 bg-white text-booking-dark text-sm font-medium rounded-xl flex items-center gap-1 group-hover:bg-booking-amber group-hover:text-white transition-colors">
                    View <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
