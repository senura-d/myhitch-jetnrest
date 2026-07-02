import React from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import Hero33 from '../components/Hero33';
import SearchForm from '../components/SearchForm';
import Skiper51 from '../components/Skiper51';
import { Stay, SearchQuery } from '../types';
import { mockDestinations } from '../data/mockData';
import { Building2, Globe, ArrowUpRight, Heart } from 'lucide-react';
import {
  CutoutCard,
  CutoutCardAction,
  CutoutCardContent,
  CutoutCardFooter,
  CutoutCardImage,
  CutoutCardInsetLabel,
  CutoutCardMedia,
  CutoutCardOverlay,
  CutoutCardPin,
  cutoutCardSurfaceClassName,
  CutoutCorner
} from '../components/ui/cutout-card';
import { cn } from '../lib/utils';
import BlurText from '../components/BlurText';

interface StaysViewProps {
  stays: Stay[];
  onSearch: (query: SearchQuery) => void;
  onSelectStay: (stay: Stay) => void;
  onBackToHome: () => void;
}

export default function StaysView({ stays, onSearch, onSelectStay, onBackToHome }: StaysViewProps) {
  const destinationNames = mockDestinations.map((d) => `${d.name}, ${d.country}`);

  return (
    <div className="bg-transparent min-h-screen relative overflow-x-hidden">
      
      {/* Hero Section */}
      <Hero33 
        logoText="MYHITCH JETNREST"
        primaryActionText="Find Stays"
        secondaryActionText="Manage Bookings"
        titleLines={["Exceptional Stays,", "Unforgettable", "Memories."]}
        features={[
          {
            icon: Building2,
            title: 'Luxury Resorts',
            description: 'Handpicked premium\naccommodations',
          },
          {
            icon: Globe,
            title: 'Best Locations',
            description: 'Prime spots across\nthe globe',
          },
        ]}
        backgroundImage="/myhitch-jetnrest/destinations/Ahu Bay public spaces - Large1-Ahu Bay-feb23-pr-global.webp"
        onExploreClick={() => {
          const element = document.getElementById('stays-search');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Search Section — separate white section */}
      <section id="stays-search" className="bg-white w-full relative z-20 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="text-center mb-8">
            <span className="inline-block text-[11px] font-extrabold text-blue-600 uppercase tracking-[0.3em] mb-3">Plan Your Stay</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">Find Your Perfect Stay</h2>
            <div className="mt-4 mx-auto w-14 h-0.5 bg-blue-400 rounded-full" />
          </div>
          <SearchForm onSearch={onSearch} destinations={destinationNames} />
        </div>
      </section>

      {/* Trending Destinations — full-section image slider */}
      <Skiper51
        title="Inspire Your Next Trip"
        subtitle="Trending Destinations"
        images={mockDestinations.map((d) => ({ src: d.image, alt: `${d.name}, ${d.country}` }))}
      />

      <div id="stays-grid" className="bg-booking-slate py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-booking-navy tracking-tight">Luxury Stays Worldwide</h2>
              <p className="mt-2 text-slate-500">
                Browse {stays.length} handpicked resorts, villas and boutique retreats
              </p>
            </div>
            <button onClick={onBackToHome} className="text-sm font-semibold text-booking-blue hover:text-blue-700 transition-colors">← Back to home</button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stays.map((stay) => (
            <div
              key={stay.id}
              className="group cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              onClick={() => onSelectStay(stay)}
            >
              <div className="relative h-56">
                <img src={stay.images[0]} alt={stay.name} className="w-full h-full object-cover" />
                <button 
                  aria-label="Favorite"
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Favorite logic can go here
                  }}
                >
                  <Heart className="h-5 w-5 text-gray-700" />
                </button>
                {stay.badge && (
                  <span className="absolute top-3 left-3 bg-booking-amber text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                    {stay.badge}
                  </span>
                )}
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{stay.city}</p>
                <h3 className="text-lg font-bold text-gray-900 flex items-center flex-wrap gap-1 mb-2 leading-snug">
                  {stay.name}
                  <div className="flex items-center ml-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-booking-amber text-booking-amber" />
                    ))}
                  </div>
                </h3>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-booking-blue text-white text-sm font-bold px-2 py-0.5 rounded">
                    {stay.rating}/10
                  </span>
                  <span className="text-sm text-gray-500">
                    {stay.ratingCount.toLocaleString()} reviews
                  </span>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <p className="text-lg font-bold text-gray-900">
                    From ${stay.pricePerNight}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
