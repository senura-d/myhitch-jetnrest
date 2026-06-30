import React, { useState, useMemo } from 'react';
import { SearchQuery, Stay } from '../types';
import { Star, ShieldAlert, SlidersHorizontal, MapPin, Grid, List, Check, ArrowUpDown } from 'lucide-react';

interface ResultsViewProps {
  query: SearchQuery;
  stays: Stay[];
  onSelectStay: (stay: Stay) => void;
  onBackToHome: () => void;
}

export default function ResultsView({
  query,
  stays,
  onSelectStay,
  onBackToHome
}: ResultsViewProps) {
  // Filters state
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('recommended');

  // Filter list data
  const propertyTypes = ['hotel', 'resort', 'villa', 'apartment', 'cabin'];
  const amenityOptions = ['Infinity Pool', 'Spa & Wellness', 'Private Garden', 'Free WiFi', 'Butler Service', 'Private Lagoon'];

  // Toggle helpers
  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  // Filtered and sorted stays
  const processedStays = useMemo(() => {
    let result = stays.filter(stay => {
      // 1. Destination Match
      const searchTarget = query.destination.toLowerCase().split(',')[0];
      const cityMatch = stay.city.toLowerCase().includes(searchTarget) || 
                        stay.location.toLowerCase().includes(searchTarget);
      
      if (!cityMatch) return false;

      // 2. Price Filter
      if (stay.pricePerNight > maxPrice) return false;

      // 3. Rating Filter (e.g. 9+ for 5-star, 8+ for 4-star, etc.)
      if (selectedRatings.length > 0) {
        const matchesRating = selectedRatings.some(r => {
          if (r === 9) return stay.rating >= 9;
          if (r === 8) return stay.rating >= 8 && stay.rating < 9;
          return stay.rating < 8;
        });
        if (!matchesRating) return false;
      }

      // 4. Type Filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(stay.type)) return false;

      // 5. Amenities Filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity => 
          stay.features.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [stays, query, maxPrice, selectedRatings, selectedTypes, selectedAmenities, sortBy]);

  return (
    <div className="bg-booking-slate min-h-screen pt-24 pb-20">
      {/* Top Search Modify Summary Bar */}
      <div className="bg-booking-navy py-4 text-white px-6 md:px-12 shadow-premium">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-widest text-booking-amber font-semibold">Your Search Details</span>
            <div className="flex flex-wrap items-center gap-3 mt-0.5">
              <span className="text-base font-semibold">{query.destination || "Amalfi Coast"}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-booking-amber" />
              <span className="text-sm text-white/80">{query.checkIn} to {query.checkOut}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-booking-amber" />
              <span className="text-sm text-white/80">{query.guests} Guests</span>
            </div>
          </div>
          <button 
            onClick={onBackToHome}
            className="px-4 py-2 border border-white/20 hover:border-booking-amber bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-white transition-all duration-300 active:scale-[0.98]"
          >
            Modify Search
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Filters Sidebar */}
        <aside className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-premium">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <h3 className="text-base font-bold text-booking-navy flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-booking-amber" /> Filters
              </h3>
              <button 
                onClick={() => {
                  setMaxPrice(3000);
                  setSelectedRatings([]);
                  setSelectedTypes([]);
                  setSelectedAmenities([]);
                }}
                className="text-xs text-booking-blue hover:text-booking-accent font-semibold transition-colors"
              >
                Clear All
              </button>
            </div>

            {/* Price Slider */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-booking-muted mb-3">
                Max Price: <span className="text-booking-blue font-sans text-sm">${maxPrice} / night</span>
              </label>
              <input
                type="range"
                min="500"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-booking-blue"
              />
              <div className="flex justify-between text-[10px] text-booking-muted mt-2 font-mono">
                <span>$500</span>
                <span>$3,000+</span>
              </div>
            </div>

            <hr className="border-slate-100 my-5" />

            {/* Ratings Filter */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-booking-muted mb-3">Guest Ratings</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: 'Exceptional: 9.0+', value: 9 },
                  { label: 'Very Good: 8.0 - 8.9', value: 8 },
                  { label: 'Standard: < 8.0', value: 7 },
                ].map((ratingItem) => (
                  <label key={ratingItem.value} className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(ratingItem.value)}
                        onChange={() => handleRatingToggle(ratingItem.value)}
                        className="sr-only"
                      />
                      <div className={`h-5 w-5 rounded-md border transition-all duration-300 flex items-center justify-center ${
                        selectedRatings.includes(ratingItem.value) 
                          ? 'bg-booking-blue border-booking-blue' 
                          : 'border-slate-200 bg-slate-50 group-hover:border-booking-blue'
                      }`}>
                        {selectedRatings.includes(ratingItem.value) && <Check className="h-3 w-3 text-white stroke-[3px]" />}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-booking-text group-hover:text-booking-blue transition-colors">
                      {ratingItem.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-slate-100 my-5" />

            {/* Property Types */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-booking-muted mb-3">Property Type</h4>
              <div className="flex flex-col gap-2.5">
                {propertyTypes.map((type) => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                        className="sr-only"
                      />
                      <div className={`h-5 w-5 rounded-md border transition-all duration-300 flex items-center justify-center ${
                        selectedTypes.includes(type) 
                          ? 'bg-booking-blue border-booking-blue' 
                          : 'border-slate-200 bg-slate-50 group-hover:border-booking-blue'
                      }`}>
                        {selectedTypes.includes(type) && <Check className="h-3 w-3 text-white stroke-[3px]" />}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-booking-text capitalize group-hover:text-booking-blue transition-colors">
                      {type}s
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="border-slate-100 my-5" />

            {/* Amenities */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-booking-muted mb-3">Top Amenities</h4>
              <div className="flex flex-col gap-2.5">
                {amenityOptions.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer group select-none">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="sr-only"
                      />
                      <div className={`h-5 w-5 rounded-md border transition-all duration-300 flex items-center justify-center ${
                        selectedAmenities.includes(amenity) 
                          ? 'bg-booking-blue border-booking-blue' 
                          : 'border-slate-200 bg-slate-50 group-hover:border-booking-blue'
                      }`}>
                        {selectedAmenities.includes(amenity) && <Check className="h-3 w-3 text-white stroke-[3px]" />}
                      </div>
                    </div>
                    <span className="text-sm font-medium text-booking-text group-hover:text-booking-blue transition-colors">
                      {amenity}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Property Listing Grid */}
        <main className="lg:col-span-9 flex flex-col gap-6">
          {/* Header toolbar */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-premium">
            <p className="text-sm font-semibold text-booking-navy">
              We found <span className="text-booking-blue">{processedStays.length}</span> luxury properties matching your search
            </p>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="h-4 w-4 text-booking-amber" />
              <span className="text-xs text-booking-muted font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-semibold text-booking-text focus:outline-none focus:border-booking-blue cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Guest Rating</option>
              </select>
            </div>
          </div>

          {/* Stays List */}
          {processedStays.length > 0 ? (
            <div className="flex flex-col gap-6">
              {processedStays.map((stay) => (
                <div 
                  key={stay.id}
                  className="group bg-white rounded-3xl border border-slate-100 shadow-premium hover:shadow-luxury hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Property Image */}
                  <div className="md:w-80 h-64 md:h-auto overflow-hidden shrink-0 relative">
                    <img 
                      src={stay.images[0]} 
                      alt={stay.name} 
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {stay.badge && (
                      <div className="absolute top-4 left-4 bg-booking-dark/80 backdrop-blur-sm text-white font-bold text-[9px] px-2.5 py-1 rounded-md border border-white/20 tracking-wider uppercase">
                        {stay.badge}
                      </div>
                    )}
                  </div>

                  {/* Content details */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      {/* Name, rating */}
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 
                            onClick={() => onSelectStay(stay)}
                            className="text-xl font-bold text-booking-navy group-hover:text-booking-blue cursor-pointer transition-colors line-clamp-1"
                          >
                            {stay.name}
                          </h3>
                          <p className="text-xs text-booking-muted mt-1 flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-booking-amber" />
                            {stay.location}
                          </p>
                        </div>

                        {/* Rating Badge */}
                        <div className="flex items-center gap-2.5 text-right shrink-0">
                          <div>
                            <p className="text-xs font-bold text-booking-text">{stay.ratingLabel}</p>
                            <p className="text-[10px] text-booking-muted">{stay.ratingCount} reviews</p>
                          </div>
                          <div className="h-10 w-10 bg-booking-blue text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">
                            {stay.rating}
                          </div>
                        </div>
                      </div>

                      {/* Amenities pills */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {stay.features.slice(0, 4).map((f) => (
                          <span 
                            key={f} 
                            className="text-[10px] font-medium bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md text-booking-text"
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      {/* Distance */}
                      <p className="text-xs text-booking-muted mt-3 italic">
                        {stay.distance}
                      </p>
                    </div>

                    {/* Price, Action button */}
                    <div className="mt-6 pt-6 border-t border-slate-50 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] text-booking-muted block">Price per night</span>
                        <span className="text-2xl font-bold text-booking-text font-serif">${stay.pricePerNight}</span>
                        <span className="text-[10px] text-booking-muted block">Includes all luxury service fees</span>
                      </div>

                      <button
                        onClick={() => onSelectStay(stay)}
                        className="h-11 px-6 bg-white hover:bg-white/90 text-booking-blue border border-slate-200 font-medium text-xs rounded-xl transition-colors active:scale-[0.98]"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center flex flex-col items-center justify-center shadow-premium">
              <ShieldAlert className="h-12 w-12 text-booking-amber mb-4" />
              <h3 className="text-lg font-bold text-booking-navy">No Luxury Retreats Found</h3>
              <p className="text-sm text-booking-muted mt-2 max-w-sm">
                Try widening your price range, clearing some filters, or checking another destination.
              </p>
              <button
                onClick={() => {
                  setMaxPrice(3000);
                  setSelectedRatings([]);
                  setSelectedTypes([]);
                  setSelectedAmenities([]);
                }}
                className="mt-6 px-5 py-2.5 bg-white hover:bg-white/90 text-booking-blue border border-slate-200 text-xs font-semibold rounded-xl transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
