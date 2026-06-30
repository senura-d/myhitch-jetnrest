import React from 'react';
import FlightSearchForm from '../components/FlightSearchForm';
import TravelDoodles from '../components/TravelDoodles';
import { Compass, Briefcase, PiggyBank, ShieldCheck, MapPin, ArrowRight, Play } from 'lucide-react';
import { mockDestinations } from '../data/mockData';

interface FlightsViewProps {
  onBackToHome: () => void;
}

export default function FlightsView({ onBackToHome }: FlightsViewProps) {
  const destinationNames = mockDestinations.map(d => `${d.name}, ${d.country}`);

  return (
    <div className="bg-transparent min-h-screen relative overflow-x-hidden">
      
      {/* Hero Section — full-bleed backdrop */}
      <section className="relative min-h-screen flex overflow-hidden">
        <img
          src="/destinations/airplane-over-tropical-coastline-travel-scenic.jpg"
          alt="Airplane over tropical coastline"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Content — bottom-left, matching the home hero placement */}
        <div className="relative z-10 flex min-h-screen flex-col pl-8 pr-6 pt-24 pb-14 md:pb-16 md:pl-16 lg:pl-24 w-full">
          <div className="mr-auto flex w-full max-w-7xl flex-1 flex-col">
            <div className="flex flex-1 flex-col justify-end pb-0">
              <div className="flex max-w-3xl flex-col items-start text-left mr-auto">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-wide text-white lg:leading-[1.1]">
                  Book Your Next<br />Flight In Minutes.
                </h1>
                <div className="mt-10 flex flex-wrap items-center justify-start gap-4">
                  <button
                    type="button"
                    onClick={() => document.getElementById('flight-search')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex h-11 items-center gap-2 rounded-lg bg-white pr-5 pl-5 text-xs font-semibold text-booking-blue transition-all duration-300 hover:bg-white/90 shadow-soft-glow active:scale-[0.96] border border-white/20"
                  >
                    Search Flights
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={onBackToHome}
                    className="flex h-11 items-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-md px-6 text-xs font-medium text-white transition-all duration-300 hover:bg-white/10 active:scale-[0.96]"
                  >
                    Explore Stays
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Search + Liquid Glass Features — white backdrop */}
      <section id="flight-search" className="bg-white w-full relative z-10 py-20 md:py-28 overflow-hidden">
        <TravelDoodles />
        <div className="max-w-5xl mx-auto px-6 relative z-10">

          {/* Heading */}
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-extrabold text-blue-600 uppercase tracking-[0.3em] mb-3">
              Book Your Flight
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 tracking-tight leading-tight">
              Search Global Destinations
            </h2>
            <div className="mt-4 mx-auto w-14 h-0.5 bg-blue-400 rounded-full" />
          </div>

          {/* Search Form */}
          <FlightSearchForm destinations={destinationNames} />
        </div>
      </section>

      {/* Why Fly With Us — separate section with sky backdrop */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
          alt="Sky with clouds"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-950/30" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-extrabold text-white uppercase tracking-[0.3em] mb-3">Why Fly With Us</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">Travel Made Effortless</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: PiggyBank, title: 'Affordable Prices', text: 'Travel more while spending less! We bring you the best deals on flights and packages, making every journey budget friendly.' },
              { icon: Briefcase, title: 'Everything Included', text: 'Enjoy stress-free travel with all inclusive options. Flights, baggage, and more—everything you need in one place.' },
              { icon: MapPin, title: 'Various Destinations', text: 'From bustling cities to serene beaches, explore countless destinations around the globe. Your next adventure awaits!' },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="relative rounded-3xl p-7 flex flex-col gap-4 bg-white/10 backdrop-blur-xl border border-white/20 shadow-luxury transition-all duration-500 hover:-translate-y-1 hover:bg-white/15"
                >
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-white/15 border border-white/30">
                    <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">{c.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
