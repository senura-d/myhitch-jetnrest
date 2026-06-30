import React, { useState } from 'react';
import { Stay, Room } from '../types';
import { ArrowLeft, MapPin, Check, Star, ShieldCheck, Heart, Share2, Award } from 'lucide-react';

interface DetailsViewProps {
  stay: Stay;
  onBackToResults: () => void;
  onSelectRoom: (room: Room) => void;
}

export default function DetailsView({
  stay,
  onBackToResults,
  onSelectRoom
}: DetailsViewProps) {
  const [selectedPhoto, setSelectedPhoto] = useState(stay.images[0]);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-booking-slate min-h-screen pt-24 pb-20">
      {/* Top Breadcrumb & Actions */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
        <button
          onClick={onBackToResults}
          className="flex items-center gap-2 text-sm font-semibold text-booking-blue hover:text-booking-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Search Results
        </button>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsLiked(!isLiked)} 
            className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-premium hover:bg-slate-50 transition-colors"
            title="Add to wishlist"
          >
            <Heart className={`h-4 w-4 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-booking-text'}`} />
          </button>
          <button className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-premium hover:bg-slate-50 transition-colors" title="Share listing">
            <Share2 className="h-4 w-4 text-booking-text" />
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Main Details Column */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Header */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-premium">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-booking-amber uppercase tracking-wider bg-booking-amber/10 border border-booking-amber/20 px-2.5 py-1 rounded-full">
                {stay.type.toUpperCase()}
              </span>
              {stay.badge && (
                <span className="text-[10px] font-bold text-booking-blue uppercase tracking-wider bg-booking-blue/5 border border-booking-blue/10 px-2.5 py-1 rounded-full">
                  {stay.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-booking-navy font-serif mt-1">
              {stay.name}
            </h1>
            
            <p className="text-sm text-booking-muted mt-2 flex items-center gap-1">
              <MapPin className="h-4 w-4 text-booking-amber" />
              {stay.location}
            </p>

            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-50">
              <div className="h-12 w-12 bg-booking-blue text-white rounded-xl flex items-center justify-center font-bold text-base shadow-sm">
                {stay.rating}
              </div>
              <div>
                <p className="text-sm font-bold text-booking-text">{stay.ratingLabel}</p>
                <p className="text-xs text-booking-muted">Based on {stay.ratingCount} authentic reviews</p>
              </div>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-premium flex flex-col gap-4">
            <div className="h-96 md:h-[480px] w-full rounded-2xl overflow-hidden relative">
              <img src={selectedPhoto} alt={stay.name} className="h-full w-full object-cover transition-all duration-500" />
            </div>
            
            {/* Small Thumbnails Row */}
            <div className="grid grid-cols-3 gap-4">
              {stay.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPhoto(img)}
                  className={`h-24 md:h-32 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedPhoto === img ? 'border-booking-blue scale-[0.98] shadow-md' : 'border-transparent hover:opacity-80'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-premium text-left">
            <h2 className="text-xl font-bold text-booking-navy mb-4 font-serif">About This Escape</h2>
            <p className="text-sm leading-relaxed text-booking-text font-light whitespace-pre-line">
              {stay.description}
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-premium text-left">
            <h2 className="text-xl font-bold text-booking-navy mb-5 font-serif">Selected Inclusions & Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stay.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm font-medium text-booking-text">
                  <div className="h-6 w-6 rounded-full bg-booking-blue/5 border border-booking-blue/10 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 text-booking-blue" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Selection */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-premium text-left">
            <h2 className="text-xl font-bold text-booking-navy mb-1 font-serif">Select Your Suite</h2>
            <p className="text-xs text-booking-muted mb-6">Choose from available elite accommodations</p>

            <div className="flex flex-col gap-6">
              {stay.rooms.map((room) => (
                <div 
                  key={room.id}
                  className="border border-slate-100 rounded-2xl p-5 hover:border-booking-blue/30 transition-all duration-300 bg-slate-50/50"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-base font-bold text-booking-navy">{room.name}</h3>
                      <p className="text-xs text-booking-muted mt-0.5">Capacity: Max {room.capacity} Guests • {room.type}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {room.amenities.map(a => (
                          <span key={a} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-booking-muted font-medium">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-left md:text-right shrink-0 flex flex-col items-start md:items-end justify-between self-stretch md:self-auto gap-4 md:gap-1">
                      <div>
                        <span className="text-[10px] text-booking-muted block">Price per night</span>
                        <span className="text-xl font-bold text-booking-text">${room.pricePerNight}</span>
                      </div>
                      
                      <button
                        onClick={() => onSelectRoom(room)}
                        className="w-full md:w-auto h-10 px-5 bg-white hover:bg-white/90 text-booking-blue border border-slate-200 text-xs font-semibold rounded-xl transition-colors active:scale-[0.98]"
                      >
                        Reserve Suite
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trusted Guest Reviews List */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-premium text-left">
            <h2 className="text-xl font-bold text-booking-navy mb-6 font-serif">Authentic Guest Feedback</h2>
            
            <div className="flex flex-col gap-6">
              {stay.reviews.map((rev) => (
                <div key={rev.id} className="pb-6 border-b border-slate-50 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-booking-blue/5 flex items-center justify-center text-xs font-bold text-booking-blue">
                        {rev.userName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-booking-text">{rev.userName}</h4>
                        <p className="text-[10px] text-booking-muted">{rev.userCountry} • {rev.date}</p>
                      </div>
                    </div>
                    
                    <div className="bg-booking-blue/10 text-booking-blue text-xs font-bold px-2 py-1 rounded-lg">
                      {rev.rating} / 10
                    </div>
                  </div>

                  <p className="text-sm text-booking-text font-light italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar (Summary Column) */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-premium text-left lg:sticky lg:top-28">
            <h3 className="text-base font-bold text-booking-navy font-serif mb-4 flex items-center gap-1.5">
              <Award className="h-4 w-4 text-booking-amber" /> Luxury Benefits Included
            </h3>

            <ul className="flex flex-col gap-3.5 mb-6 text-sm">
              <li className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-booking-blue shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-booking-text">VIP Welcome Experience</p>
                  <p className="text-xs text-booking-muted">Includes complimentary champagne or local tea upon arrival.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-booking-blue shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-booking-text">Flexible Re-booking</p>
                  <p className="text-xs text-booking-muted">Change dates up to 48 hours prior to check-in at no extra charge.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-booking-blue shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-booking-text">Complimentary High-speed WiFi</p>
                  <p className="text-xs text-booking-muted">Uncapped fiber-optic access across the property grounds.</p>
                </div>
              </li>
            </ul>

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-center mb-2">
              <p className="text-xs text-booking-muted font-medium">Starting Price From</p>
              <p className="text-3xl font-bold text-booking-navy font-serif mt-1">${stay.pricePerNight} <span className="text-xs text-booking-muted font-sans font-normal">/ night</span></p>
            </div>
            
            <p className="text-[10px] text-center text-booking-muted">
              Choose a specific suite in the "Select Your Suite" list to complete reservation details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
