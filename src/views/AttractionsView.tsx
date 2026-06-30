import React from 'react';
import { Compass, Star, Clock, MapPin, Ticket, Search, ArrowRight } from 'lucide-react';

interface AttractionsViewProps {
  onBackToHome: () => void;
}

const categories = ['All', 'Cultural', 'Wildlife', 'Adventure', 'Beaches', 'Tours'];

const mockAttractions = [
  { id: 'a-1', name: 'Sigiriya Rock Fortress', cat: 'Cultural', city: 'Dambulla', rating: 9.6, reviews: 4210, duration: 'Half day', price: 32, img: 'https://images.unsplash.com/photo-1586949288603-7e1c0a7e6e3a?w=600&q=80' },
  { id: 'a-2', name: 'Yala Safari Experience', cat: 'Wildlife', city: 'Yala', rating: 9.4, reviews: 2890, duration: 'Full day', price: 78, img: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600&q=80' },
  { id: 'a-3', name: 'Ella Nine Arches Trek', cat: 'Adventure', city: 'Ella', rating: 9.2, reviews: 1760, duration: '3 hours', price: 24, img: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=600&q=80' },
  { id: 'a-4', name: 'Galle Fort Heritage Walk', cat: 'Cultural', city: 'Galle', rating: 9.0, reviews: 2110, duration: '2 hours', price: 18, img: 'https://images.unsplash.com/photo-1612862745642-9c43e5d0c7d4?w=600&q=80' },
  { id: 'a-5', name: 'Mirissa Whale Watching', cat: 'Wildlife', city: 'Mirissa', rating: 9.1, reviews: 1540, duration: 'Half day', price: 45, img: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&q=80' },
  { id: 'a-6', name: 'Temple of the Tooth', cat: 'Cultural', city: 'Kandy', rating: 9.3, reviews: 3320, duration: '2 hours', price: 15, img: 'https://images.unsplash.com/photo-1625465794141-2b9d6e7f4f86?w=600&q=80' },
];

export default function AttractionsView({ onBackToHome }: AttractionsViewProps) {
  return (
    <div className="bg-booking-dark min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10">
          <button onClick={onBackToHome} className="text-sm text-white/40 hover:text-white transition-colors mb-4">← Back to home</button>
          <div className="flex items-center gap-3">
            <Compass className="h-8 w-8 text-booking-amber" />
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Attractions & experiences</h1>
          </div>
          <p className="mt-3 text-white/50 max-w-xl">Skip-the-line tickets, guided tours and unforgettable experiences across Sri Lanka.</p>
        </div>

        {/* Search + categories */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-luxury">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-booking-amber" />
            <input
              type="text"
              placeholder="Search experiences, e.g. 'safari', 'temple', 'hiking'"
              className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-booking-amber transition-all"
            />
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button
                key={c}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  i === 0 ? 'bg-booking-amber text-white' : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAttractions.map((a) => (
            <div key={a.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-booking-amber/40 transition-all">
              <div className="h-48 overflow-hidden relative">
                <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-booking-dark/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">{a.cat}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-xs text-white/50 mb-2">
                  <MapPin className="h-3.5 w-3.5 text-booking-amber" />{a.city}
                </div>
                <h3 className="text-lg font-semibold text-white leading-snug">{a.name}</h3>
                <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-booking-amber fill-booking-amber" />{a.rating} ({a.reviews.toLocaleString()})</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{a.duration}</span>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <p className="text-sm text-white/40">from <span className="text-2xl font-bold text-booking-amber">${a.price}</span></p>
                  <button className="px-4 py-2 bg-white text-booking-dark text-sm font-medium rounded-xl hover:bg-white/90 transition-all flex items-center gap-1">
                    <Ticket className="h-4 w-4" /> Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
