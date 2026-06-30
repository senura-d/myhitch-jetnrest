import React from 'react';
import { Car, MapPin, Calendar, Users, Settings2, Fuel, Snowflake, Gauge, ShieldCheck, Search, ArrowRight } from 'lucide-react';

interface CarsViewProps {
  onBackToHome: () => void;
}

const mockCars = [
  { id: 'c-1', name: 'Toyota Corolla', cls: 'Economy', seats: 5, bags: 2, trans: 'Automatic', ac: true, mpg: 'Hybrid', price: 38, img: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&q=80' },
  { id: 'c-2', name: 'Nissan X-Trail', cls: 'SUV', seats: 5, bags: 3, trans: 'Automatic', ac: true, mpg: 'Petrol', price: 62, img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80' },
  { id: 'c-3', name: 'Mercedes E-Class', cls: 'Luxury', seats: 5, bags: 3, trans: 'Automatic', ac: true, mpg: 'Petrol', price: 124, img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80' },
  { id: 'c-4', name: 'Toyota HiAce', cls: 'Van', seats: 9, bags: 6, trans: 'Manual', ac: true, mpg: 'Diesel', price: 85, img: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=600&q=80' },
];

export default function CarsView({ onBackToHome }: CarsViewProps) {
  return (
    <div className="bg-booking-dark min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10">
          <button onClick={onBackToHome} className="text-sm text-white/40 hover:text-white transition-colors mb-4">← Back to home</button>
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-booking-amber" />
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Car rentals</h1>
          </div>
          <p className="mt-3 text-white/50 max-w-xl">Pick up a car at the airport or in town. Free cancellation on most bookings.</p>
        </div>

        {/* Search */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-luxury grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4"><Field icon={MapPin} label="Pick-up location" placeholder="Bandaranaike Airport (CMB)" /></div>
          <div className="md:col-span-3"><Field icon={Calendar} label="Pick-up date" placeholder="Jul 12, 2026 · 10:00" /></div>
          <div className="md:col-span-3"><Field icon={Calendar} label="Drop-off date" placeholder="Jul 19, 2026 · 10:00" /></div>
          <div className="md:col-span-1"><Field icon={Users} label="Drivers" placeholder="1" /></div>
          <div className="md:col-span-1 flex items-end">
            <button className="w-full h-[58px] bg-booking-amber hover:bg-booking-accent text-white rounded-xl flex items-center justify-center transition-all active:scale-95">
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Cars grid */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-white mb-5">Available vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {mockCars.map((c) => (
              <div key={c.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-booking-amber/40 transition-all flex flex-col sm:flex-row">
                <div className="sm:w-2/5 h-40 sm:h-auto overflow-hidden bg-white/5">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-5 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-booking-amber font-semibold">{c.cls}</span>
                      <h3 className="text-lg font-semibold text-white">{c.name}</h3>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-white/60">
                    <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-booking-amber" />{c.seats} seats</span>
                    <span className="flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5 text-booking-amber" />{c.trans}</span>
                    <span className="flex items-center gap-1.5"><Snowflake className="h-3.5 w-3.5 text-booking-amber" />{c.ac ? 'A/C' : 'No A/C'}</span>
                    <span className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5 text-booking-amber" />{c.mpg}</span>
                  </div>
                  <div className="mt-auto pt-4 flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-booking-amber">${c.price}<span className="text-sm font-normal text-white/40">/day</span></p>
                    </div>
                    <button className="px-5 py-2.5 bg-white text-booking-dark text-sm font-medium rounded-xl hover:bg-white/90 transition-all flex items-center gap-1">
                      Book <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          <Perk icon={ShieldCheck} title="Free cancellation" text="Cancel up to 48 hours before pick-up for free." />
          <Perk icon={Gauge} title="Unlimited mileage" text="Drive as far as you like on most vehicles." />
          <Perk icon={Fuel} title="Fair fuel policy" text="Pick up and return with the same fuel level." />
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, placeholder }: { icon: any; label: string; placeholder: string }) {
  return (
    <div className="relative">
      <label className="absolute left-11 top-2 text-[10px] uppercase tracking-wider text-white/40">{label}</label>
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-booking-amber" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-[58px] bg-white/5 border border-white/10 rounded-xl pl-11 pr-3 pt-5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-booking-amber transition-all"
      />
    </div>
  );
}

function Perk({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <Icon className="h-6 w-6 text-booking-amber mb-3" />
      <h3 className="text-white font-medium">{title}</h3>
      <p className="text-sm text-white/50 mt-1">{text}</p>
    </div>
  );
}
