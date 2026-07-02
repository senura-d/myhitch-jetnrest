import React, { useState } from 'react';
import { Compass, Star, Clock, MapPin, Ticket, Search, ArrowRight, ShieldCheck, Globe, Heart, Check, Users, Calendar, Languages } from 'lucide-react';
import Hero33 from '../components/Hero33';
import { Carousel_005 } from '../components/Skiper51';

interface AttractionsViewProps {
  onBackToHome: () => void;
  onRequireAuth?: () => boolean;
}

type Attraction = {
  id: string; name: string; cat: string; city: string; rating: number; reviews: number; duration: string; price: number; img: string;
};

const categories = ['All', 'Cultural', 'Wildlife', 'Adventure', 'Beaches', 'Tours'];

const mockAttractions = [
  { id: 'a-1', name: 'Sigiriya Rock Fortress', cat: 'Cultural', city: 'Dambulla', rating: 9.6, reviews: 4210, duration: 'Half day', price: 32, img: 'https://images.unsplash.com/photo-1586949288603-7e1c0a7e6e3a?w=600&q=80' },
  { id: 'a-2', name: 'Yala Safari Experience', cat: 'Wildlife', city: 'Yala', rating: 9.4, reviews: 2890, duration: 'Full day', price: 78, img: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=600&q=80' },
  { id: 'a-3', name: 'Ella Nine Arches Trek', cat: 'Adventure', city: 'Ella', rating: 9.2, reviews: 1760, duration: '3 hours', price: 24, img: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=600&q=80' },
  { id: 'a-4', name: 'Galle Fort Heritage Walk', cat: 'Cultural', city: 'Galle', rating: 9.0, reviews: 2110, duration: '2 hours', price: 18, img: 'https://images.unsplash.com/photo-1612862745642-9c43e5d0c7d4?w=600&q=80' },
  { id: 'a-5', name: 'Mirissa Whale Watching', cat: 'Wildlife', city: 'Mirissa', rating: 9.1, reviews: 1540, duration: 'Half day', price: 45, img: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=600&q=80' },
  { id: 'a-6', name: 'Temple of the Tooth', cat: 'Cultural', city: 'Kandy', rating: 9.3, reviews: 3320, duration: '2 hours', price: 15, img: 'https://images.unsplash.com/photo-1625465794141-2b9d6e7f4f86?w=600&q=80' },
];

  export default function AttractionsView({ onBackToHome, onRequireAuth }: AttractionsViewProps) {
    const [selected, setSelected] = useState<Attraction | null>(null);
    const [activeCat, setActiveCat] = useState('All');
    const [search, setSearch] = useState('');

    const filtered = mockAttractions.filter(
      (a) =>
        (activeCat === 'All' || a.cat === activeCat) &&
        `${a.name} ${a.city} ${a.cat}`.toLowerCase().includes(search.toLowerCase())
    );

    React.useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, [selected]);

    return (
      <div className="bg-white min-h-screen relative overflow-x-hidden">
        <Hero33
          logoText="MYHITCH JETNREST"
          primaryActionText="Find Experiences"
          secondaryActionText="Curated Tours"
          titleLines={["Unforgettable,", "Global", "Adventures."]}
          features={[
            {
              icon: Ticket,
              title: 'Skip-the-line Tickets',
              description: 'Fast track access to top sights',
            },
            {
              icon: Globe,
              title: 'Guided Tours',
              description: 'Expert local knowledge',
            },
          ]}
          backgroundImage="/destinations/backpacker-standing-sunrise-viewpoint-ja-bo-village-mae-hong-son-province-thailand.jpg"
          onExploreClick={() => {
            const element = document.getElementById('attractions-search');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {selected ? (
          <div id="experience-details" className="relative z-20">
            <ExperienceDetails exp={selected} onBack={() => setSelected(null)} onRequireAuth={onRequireAuth} />
          </div>
        ) : (
          <>
          {/* Intro — white text section */}
          <section className="bg-white w-full relative z-10 pt-20 md:pt-28 pb-4">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <span className="inline-block text-[11px] font-extrabold text-blue-600 uppercase tracking-[0.3em] mb-3">Discover & Explore</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Experiences Worth Travelling For
              </h2>
              <p className="mt-5 text-base md:text-lg text-slate-500 leading-relaxed">
                From skip-the-line tickets to private guided tours, immerse yourself in iconic landmarks, wild
                adventures, and authentic local culture — handpicked experiences across every continent.
              </p>
            </div>
          </section>

          {/* Image Slider Section */}
          <div className="w-full relative z-10">
            <Carousel_005
              className="w-full"
              images={mockAttractions.map((a) => ({ src: a.img, alt: `${a.name}, ${a.city}` }))}
              autoplay
              loop
            />
          </div>

          <div id="attractions-search" className="max-w-7xl mx-auto px-6 md:px-12 py-16 relative z-20">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Compass className="h-8 w-8 text-booking-amber" />
                  <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Attractions & experiences</h1>
                </div>
                <p className="mt-3 text-slate-500 max-w-xl">Skip-the-line tickets, guided tours and unforgettable experiences across the world.</p>
              </div>
              <button onClick={onBackToHome} className="text-sm font-semibold text-booking-blue hover:text-blue-700 transition-colors">← Back to home</button>
            </div>

            {/* Search + categories */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-booking-blue" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search experiences, e.g. 'safari', 'temple', 'hiking'"
                  className="w-full h-14 bg-white border border-slate-200 rounded-xl pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-booking-blue transition-all"
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActiveCat(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCat === c ? 'bg-booking-blue text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {filtered.length === 0 && (
              <p className="mt-10 text-center text-slate-400">No experiences match your search.</p>
            )}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setSelected(a)}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-56">
                    <img src={a.img} alt={a.name} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      aria-label="Favorite"
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      <Heart className="h-5 w-5 text-gray-700" />
                    </button>
                    <span className="absolute top-3 left-3 bg-booking-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
                      {a.cat}
                    </span>
                  </div>

                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{a.city}</p>
                    <h3 className="text-lg font-bold text-gray-900 flex items-center flex-wrap gap-1 mb-2 leading-snug">
                      {a.name}
                      <span className="flex items-center ml-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-booking-amber text-booking-amber" />
                        ))}
                      </span>
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-booking-blue text-white text-sm font-bold px-2 py-0.5 rounded">{a.rating}/10</span>
                      <span className="text-sm text-gray-500">{a.reviews.toLocaleString()} reviews</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">From ${a.price}</p>
                      <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="h-3.5 w-3.5" />{a.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ExperienceDetails({ exp, onBack, onRequireAuth }: { exp: Attraction; onBack: () => void; onRequireAuth?: () => boolean }) {
  const highlights = [
    `Explore ${exp.name} with an expert local guide`,
    'Skip-the-line entry tickets included',
    'Small-group experience for a personal touch',
    'Hotel pick-up and drop-off available',
    'Free cancellation up to 24 hours before',
  ];
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Banner header (gives the nav contrast + shows content immediately) */}
      <div className="relative h-[42vh] min-h-[320px]">
        <img src={exp.img} alt={exp.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-8 pt-28">
          <button onClick={onBack} className="self-start text-sm font-semibold text-white/90 hover:text-white transition-colors mb-4">← Back to all experiences</button>
          <span className="inline-block self-start bg-booking-blue text-white text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">{exp.cat}</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-bold text-white drop-shadow">{exp.name}</h1>
          <p className="mt-2 text-white/80 flex items-center gap-1"><MapPin className="h-4 w-4" />{exp.city}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="bg-white text-booking-blue text-sm font-bold px-2 py-0.5 rounded">{exp.rating}/10</span>
            <span className="text-sm text-white/80">{exp.reviews.toLocaleString()} reviews · Excellent</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10">
          {/* Left */}
          <div>
            {/* Quick facts */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Fact icon={Clock} label="Duration" value={exp.duration} />
              <Fact icon={Users} label="Group" value="Small group" />
              <Fact icon={Languages} label="Languages" value="English" />
            </div>

            <h2 className="mt-10 text-xl font-bold text-gray-900">About this experience</h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Discover {exp.name} in {exp.city} on this {exp.duration.toLowerCase()} {exp.cat.toLowerCase()} experience.
              Travel with a knowledgeable local guide, soak in breathtaking sights, and create memories that last a lifetime —
              all with seamless booking and instant confirmation.
            </p>

            <h2 className="mt-10 text-xl font-bold text-gray-900">Highlights</h2>
            <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" /> {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: booking card */}
          <div>
            <div className="rounded-2xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-400">From</p>
              <p className="text-3xl font-bold text-gray-900">${exp.price}<span className="text-base font-normal text-gray-500"> / person</span></p>

              <div className="mt-5 space-y-3">
                <DetailField icon={Calendar} label="Date" value="Select your date" />
                <DetailField icon={Users} label="Travellers" value="1 adult" />
                <DetailField icon={Ticket} label="Ticket" value="Standard entry" />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (onRequireAuth && !onRequireAuth()) return;
                  alert(`Booking request sent for ${exp.name}! Check your email for confirmation.`);
                }}
                className="mt-6 w-full h-12 bg-booking-blue hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
              >
                Book now
              </button>
              <p className="mt-3 text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> Free cancellation · Instant confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Fact({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-700">
      <Icon className="h-4 w-4 text-booking-blue" />
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-gray-400">{label}</p>
        <p className="font-medium text-gray-800 truncate">{value}</p>
      </div>
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
