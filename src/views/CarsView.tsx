import React, { useState } from 'react';
import { Car, MapPin, Calendar, Users, Settings2, Fuel, Snowflake, Gauge, ShieldCheck, Search, ArrowRight, Building2, Globe, Heart, Check, Star } from 'lucide-react';
import Hero33 from '../components/Hero33';

interface CarsViewProps {
  onBackToHome: () => void;
  onRequireAuth?: () => boolean;
}

const mockCars = [
  { id: 'c-1', name: 'Toyota Corolla', cls: 'Economy', seats: 5, bags: 2, trans: 'Automatic', ac: true, mpg: 'Hybrid', price: 38, img: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&q=80' },
  { id: 'c-2', name: 'Nissan X-Trail', cls: 'SUV', seats: 5, bags: 3, trans: 'Automatic', ac: true, mpg: 'Petrol', price: 62, img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80' },
  { id: 'c-3', name: 'Mercedes E-Class', cls: 'Luxury', seats: 5, bags: 3, trans: 'Automatic', ac: true, mpg: 'Petrol', price: 124, img: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80' },
  { id: 'c-4', name: 'Toyota HiAce', cls: 'Van', seats: 9, bags: 6, trans: 'Manual', ac: true, mpg: 'Diesel', price: 85, img: 'https://images.unsplash.com/photo-1632245889029-e406faaa34cd?w=600&q=80' },
];

type CarType = typeof mockCars[number];

export default function CarsView({ onBackToHome, onRequireAuth }: CarsViewProps) {
  const [selected, setSelected] = useState<CarType | null>(null);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [selected]);

  return (
    <div className="bg-booking-dark min-h-screen relative overflow-x-hidden">
      <Hero33
        logoText="MYHITCH JETNREST"
        primaryActionText="Find Cars"
        secondaryActionText="Manage Rentals"
        titleLines={["Hit the Road,", "Limitless", "Adventures."]}
        features={[
          {
            icon: ShieldCheck,
            title: 'Free Cancellation',
            description: 'On most bookings',
          },
          {
            icon: Gauge,
            title: 'Unlimited Mileage',
            description: 'Go as far as you want',
          },
        ]}
        backgroundImage="/myhitch-jetnrest/destinations/Toyota_Avalon.png"
        onExploreClick={() => {
          const element = document.getElementById('cars-search');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      {selected ? (
        <div id="car-details" className="relative z-20">
          <CarDetails car={selected} onBack={() => setSelected(null)} onRequireAuth={onRequireAuth} />
        </div>
      ) : (
        <>
          <section id="cars-search" className="bg-white w-full relative z-20 py-16 md:py-20">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
              <div className="text-center mb-8">
                <span className="inline-block text-[11px] font-extrabold text-blue-600 uppercase tracking-[0.3em] mb-3">Plan Your Trip</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight">Find Your Perfect Ride</h2>
                <div className="mt-4 mx-auto w-14 h-0.5 bg-blue-400 rounded-full" />
              </div>
              {/* Search */}
              <div className="bg-slate-50/50 backdrop-blur-2xl border border-slate-200/80 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-3 animate-fadeIn">
                <div className="md:col-span-12 lg:col-span-3"><Field icon={MapPin} label="Pick-up location" placeholder="Bandaranaike Airport (CMB)" /></div>
                <div className="md:col-span-4 lg:col-span-3"><Field icon={Calendar} label="Pick-up date" placeholder="Jul 12, 2026 · 10:00" /></div>
                <div className="md:col-span-4 lg:col-span-3"><Field icon={Calendar} label="Drop-off date" placeholder="Jul 19, 2026 · 10:00" /></div>
                <div className="md:col-span-2 lg:col-span-2"><Field icon={Users} label="Drivers" placeholder="1" /></div>
                <div className="md:col-span-2 lg:col-span-1 flex items-end">
                  <button aria-label="Search" className="w-full h-[58px] bg-booking-blue hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-all active:scale-95">
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Cars grid */}
          <div className="bg-booking-slate py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-booking-navy tracking-tight">Available Vehicles</h2>
                  <p className="mt-2 text-slate-500">
                    Browse {mockCars.length} premium car rentals
                  </p>
                </div>
                <button onClick={onBackToHome} className="text-sm font-semibold text-booking-blue hover:text-blue-700 transition-colors">← Back to home</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockCars.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className="group cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative h-56">
                      <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                      <button 
                        aria-label="Favorite"
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Heart className="h-5 w-5 text-gray-700" />
                      </button>
                      <span className="absolute top-3 left-3 bg-booking-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                        {c.cls} CLASS
                      </span>
                    </div>

                    <div className="p-4">
                      <p className="text-sm text-gray-500 mb-1">Pick up in {c.name.split(' ')[0]}</p>
                      <h3 className="text-lg font-bold text-gray-900 flex items-center flex-wrap gap-1 mb-2 leading-snug">
                        {c.name}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-booking-blue text-white text-sm font-bold px-2 py-0.5 rounded">
                          9.4/10
                        </span>
                        <span className="text-sm text-gray-500">
                          128 reviews
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-4">
                        <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-gray-400" />{c.seats} seats</span>
                        <span className="flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5 text-gray-400" />{c.trans}</span>
                        <span className="flex items-center gap-1.5"><Snowflake className="h-3.5 w-3.5 text-gray-400" />{c.ac ? 'A/C' : 'No A/C'}</span>
                        <span className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5 text-gray-400" />{c.mpg}</span>
                      </div>

                      <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-100">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">
                            ${c.price}
                            <span className="text-sm font-normal text-gray-500">/day</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setSelected(c); }}
                          className="px-5 py-2.5 bg-booking-blue text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Perks Section with Scenic Backdrop */}
          <section className="relative w-full py-20 md:py-28 overflow-hidden">
            {/* Backdrop Image */}
            <img 
              src="/myhitch-jetnrest/destinations/desert_straight_road_backdrop.png" 
              alt="Straight desert road" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay to make white text pop and add contrast */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <Perk icon={ShieldCheck} title="Free cancellation" text="Cancel up to 48 hours before pick-up for free." />
                <Perk icon={Gauge} title="Unlimited mileage" text="Drive as far as you like on most vehicles." />
                <Perk icon={Fuel} title="Fair fuel policy" text="Pick up and return with the same fuel level." />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function CarDetails({ car, onBack, onRequireAuth }: { car: CarType; onBack: () => void; onRequireAuth?: () => boolean }) {
  const includes = [
    'Free cancellation up to 48h before pick-up',
    'Unlimited mileage',
    'Collision damage waiver',
    'Theft protection',
    '24/7 roadside assistance',
    'Airport pick-up & drop-off',
  ];
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Banner header */}
      <div className="relative h-[42vh] min-h-[320px]">
        <img src={car.img} alt={car.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-8 pt-28">
          <button onClick={onBack} className="self-start text-sm font-semibold text-white/90 hover:text-white transition-colors mb-4">← Back to all vehicles</button>
          <span className="inline-block self-start bg-booking-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">{car.cls} Class</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-white drop-shadow">{car.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            <span className="bg-white text-booking-blue text-sm font-bold px-2 py-0.5 rounded">9.4/10</span>
            <span className="text-sm text-white/80">128 reviews · Excellent</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
          {/* Left: details */}
          <div>
            {/* Specs */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Spec icon={Users} label={`${car.seats} seats`} />
              <Spec icon={Settings2} label={car.trans} />
              <Spec icon={Snowflake} label={car.ac ? 'Air conditioning' : 'No A/C'} />
              <Spec icon={Fuel} label={car.mpg} />
            </div>

            <h2 className="mt-10 text-xl font-bold text-gray-900">About this vehicle</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              The {car.name} is a reliable {car.cls.toLowerCase()}-class vehicle ideal for {car.seats >= 7 ? 'group and family' : 'city and long-distance'} travel.
              With {car.trans.toLowerCase()} transmission, {car.mpg.toLowerCase()} fuel efficiency and seating for {car.seats},
              it offers a comfortable, hassle-free drive with generous luggage space for {car.bags} bags.
            </p>

            <h2 className="mt-10 text-xl font-bold text-gray-900">What's included</h2>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {includes.map((i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" /> {i}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: booking card */}
          <div>
            <div className="rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">${car.price}<span className="text-base font-normal text-gray-500">/day</span></p>
                  <p className="text-xs text-gray-400 mt-1">Total ${car.price * 7} for 7 days</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-amber-500"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />9.4</span>
              </div>

              <div className="mt-5 space-y-3">
                <DetailField icon={MapPin} label="Pick-up" value="Bandaranaike Airport (CMB)" />
                <DetailField icon={Calendar} label="Pick-up date" value="Jul 12, 2026 · 10:00" />
                <DetailField icon={Calendar} label="Drop-off date" value="Jul 19, 2026 · 10:00" />
                <DetailField icon={Users} label="Drivers" value="1 driver" />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onRequireAuth && !onRequireAuth()) return;
                  alert(`Reservation request sent for ${car.name}! Our team will confirm shortly.`);
                }}
                className="mt-6 w-full h-12 bg-booking-blue hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
              >
                Reserve now
              </button>
              <p className="mt-3 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Free cancellation · No card needed yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700">
      <Icon className="h-4 w-4 text-booking-blue" /> {label}
    </div>
  );
}

function DetailField({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
      <Icon className="h-4 w-4 text-booking-blue shrink-0" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800 truncate">{value}</p>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, placeholder }: { icon: any; label: string; placeholder: string }) {
  return (
    <div className="relative">
      <label className="absolute left-11 top-2 text-[10px] font-bold uppercase tracking-wider text-slate-700">{label}</label>
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-[58px] bg-white/70 border border-slate-300/50 rounded-xl pl-11 pr-3 pt-5 text-sm font-semibold text-slate-900 placeholder-slate-600 focus:outline-none focus:bg-white/95 focus:border-booking-blue focus:ring-1 focus:ring-booking-blue transition-all"
      />
    </div>
  );
}

function Perk({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 flex flex-col items-start transition-all duration-300 hover:bg-white/20">
      <div className="w-14 h-14 rounded-2xl border border-white/30 flex items-center justify-center bg-white/10 mb-6">
        <Icon className="h-6 w-6 text-white drop-shadow-md" />
      </div>
      <h3 className="text-white font-bold text-xl drop-shadow-sm">{title}</h3>
      <p className="text-white/80 mt-3 leading-relaxed font-medium">{text}</p>
    </div>
  );
}
