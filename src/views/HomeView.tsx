import React, { useEffect } from 'react';
import Hero33 from '../components/Hero33';
import SearchForm from '../components/SearchForm';
import Skiper51 from '../components/Skiper51';
import BlurText from '../components/BlurText';
import GradientBackdrop from '../components/GradientBackdrop';
import { mockDestinations, mockTrendingDeals, mockTestimonials } from '../data/mockData';
import { SearchQuery, Stay } from '../types';
import { Star, ShieldCheck, Flame, Compass, ChevronRight, Award, Armchair, Monitor, MapPin, ArrowUpRight } from 'lucide-react';
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
  CutoutCorner,
  cutoutCardSurfaceClassName,
} from '../components/ui/cutout-card';
import { cn } from '../lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HomeViewProps {
  onSearch: (query: SearchQuery) => void;
  onSelectStay: (stay: Stay) => void;
  stays: Stay[];
}

export default function HomeView({ onSearch, onSelectStay, stays }: HomeViewProps) {
  const destinationNames = mockDestinations.map(d => `${d.name}, ${d.country}`);

  const handleSelectDeal = (stayId: string) => {
    const matchedStay = stays.find(s => s.id === stayId);
    if (matchedStay) {
      onSelectStay(matchedStay);
    }
  };

  // Content scroll reveal and parallax animations
  useEffect(() => {
    // Classic image parallax inside cards
    const parallaxBoxes = gsap.utils.toArray(".parallax-box");
    parallaxBoxes.forEach((box: any) => {
      const img = box.querySelector("img");
      if (img) {
        gsap.fromTo(img,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: box,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    });

    // Vertical floating parallax for staggered feel
    const floatCards = gsap.utils.toArray(".parallax-float");
    floatCards.forEach((card: any, idx: number) => {
      const speed = (idx % 3 === 1) ? -25 : (idx % 3 === 2) ? 25 : 0;
      if (speed !== 0) {
        gsap.fromTo(card,
          { y: speed },
          {
            y: -speed,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    });

  }, []);

  return (
    <div className="bg-booking-dark min-h-screen relative overflow-x-hidden">
      {/* Dynamic Parallax Gradient Backdrop for late sections */}
      <GradientBackdrop />

      {/* Hero Section — fills exactly one viewport */}
      <div id="home-hero" className="relative min-h-screen">
        <Hero33
          logoText="MYHITCH JETNREST"
          primaryActionText="Explore World Stays"
          secondaryActionText="Member Privilege Deals"
          titleLines={["Explore the World.", "Extraordinary", "Luxury Stays."]}
          backgroundImages={[
            "/myhitch-jetnrest/destinations/mateo-giraud-wtBex4wQw60-unsplash.jpg"
          ]}
          onExploreClick={() => {
            const element = document.getElementById('home-search');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      {/* Section 2: Search + Liquid Glass Features — white backdrop */}
      <section id="home-search" className="bg-white w-full relative z-10 py-10 md:py-16 overflow-hidden">
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">

          {/* Heading */}
          <div className="text-center mb-5">
            <span className="inline-block text-[11px] font-extrabold text-black uppercase tracking-[0.3em] mb-2">
              Plan Your Stay
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black tracking-tight leading-tight">
              Search Premium Escapes
            </h2>
            <div className="mt-3 mx-auto w-12 h-0.5 bg-blue-400 rounded-full" />
          </div>

          {/* Search Form */}
          <SearchForm onSearch={onSearch} destinations={destinationNames} />

          {/* Spacing */}
          <div className="h-4 md:h-5" />

          {/* Liquid Glass Feature Cards — 3 col, with Sri Lanka travel motifs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Armchair,
                tag: 'Handpicked',
                title: 'Premium Comfort',
                text: 'Relax in handpicked, ultra-luxury suites featuring elite design, premium bedding, and curated services.',
                meta: '1,200+ luxury stays islandwide',
                metaIcon: MapPin,
                motif: 'palm',
              },
              {
                icon: Monitor,
                tag: 'Ocean & Hills',
                title: 'Stunning Views',
                text: 'Marvel at pristine horizons, sparkling ocean shorelines, or misty tea-country hills from your balcony.',
                meta: 'Beaches · Tea country · Heritage',
                metaIcon: Star,
                motif: 'waves',
              },
              {
                icon: Flame,
                tag: 'Secure',
                title: 'Instant Confirmation',
                text: 'Book with confidence — every reservation is instantly confirmed with no hidden charges.',
                meta: 'Free cancellation available',
                metaIcon: ShieldCheck,
                motif: 'route',
              },
            ].map((card) => {
              const Icon = card.icon;
              const MetaIcon = card.metaIcon;
              return (
                <div
                  key={card.title}
                  className="relative rounded-3xl p-7 flex flex-col gap-4 bg-slate-500/10 backdrop-blur-xl border border-slate-400/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:bg-slate-500/15"
                >
                  <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-white/60 border border-white/80 shadow-sm">
                    <Icon className="h-6 w-6 text-slate-700" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.text}</p>
                  </div>

                  {/* Bottom meta row */}
                  <div className="relative mt-2 pt-4 border-t border-slate-300/50 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                    <MetaIcon className="h-4 w-4 text-booking-blue" />
                    {card.meta}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Sunset Liquid Glass Features Section */}

      <div className="relative w-full z-10 overflow-hidden min-h-[520px]">
        {/* Full-bleed sunset backdrop */}
        <img
          src="/myhitch-jetnrest/destinations/sunset.jpg"
          alt="Golden sunset"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        {/* Dark amber veil for contrast */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28">
          {/* Section label */}
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-[0.25em]">Why Choose Us</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-serif font-light text-white tracking-wide drop-shadow-xl">
              The MYHITCH Difference
            </h2>
          </div>

          {/* Liquid Glass Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div
              className="group relative rounded-3xl p-7 flex flex-col gap-5 cursor-default transition-all duration-500 hover:-translate-y-1 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.25)]"
            >
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center bg-white/15 backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
              >
                <Award className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-tight">Curated Luxury Selection</h4>
                <p className="mt-2 text-xs text-white/70 leading-relaxed">
                  Every hotel and resort is handpicked for exceptional service, architecture, and luxury.
                </p>
              </div>
              {/* Glass highlight edge */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-3xl" />
            </div>

            {/* Card 2 */}
            <div
              className="group relative rounded-3xl p-7 flex flex-col gap-5 cursor-default transition-all duration-500 hover:-translate-y-1 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.25)]"
            >
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center bg-white/15 backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
              >
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-tight">Secured Price Guarantee</h4>
                <p className="mt-2 text-xs text-white/70 leading-relaxed">
                  Access member-only private pricing. We match price points to ensure unparalleled value.
                </p>
              </div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-3xl" />
            </div>

            {/* Card 3 */}
            <div
              className="group relative rounded-3xl p-7 flex flex-col gap-5 cursor-default transition-all duration-500 hover:-translate-y-1 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.25)]"
            >
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center bg-white/15 backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
              >
                <Compass className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-tight">24/7 Elite Concierge</h4>
                <p className="mt-2 text-xs text-white/70 leading-relaxed">
                  Enjoy complimentary booking adjustments and bespoke local itineraries from our travel concierges.
                </p>
              </div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-t-3xl" />
            </div>
          </div>
        </div>
      </div>


      {/* Section 2: Creative Carousel (Skiper51) */}
      <div id="home-carousel" className="w-full relative z-10">
        <Skiper51 />
      </div>

      {/* Section 3: Cinematic Image Reveal — blends white carousel into landscape */}
      <div id="home-landscape" className="relative w-full z-10 h-[85vh] min-h-[520px]">
        {/* Full-bleed image */}
        <img
          src="/myhitch-jetnrest/destinations/sb-bandara-1GJKxIkSR0E-unsplash.jpg"
          alt="Elephants bathing in the river"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />


        {/* Editorial caption */}
        <div className="absolute inset-x-0 bottom-12 z-20 flex flex-col items-center text-center px-6 pointer-events-none">
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.25em] mb-3">Thailand · Chiang Mai</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white leading-tight tracking-wide max-w-2xl drop-shadow-xl">
            Where Wildlife Meets Wonder
          </h2>
          <p className="mt-4 text-sm text-white/60 max-w-md leading-relaxed font-light">
            Witness over a hundred elephants bathing freely in the Maha Oya river — one of nature's most humbling spectacles.
          </p>
        </div>
      </div>


      {/* Inspiring Destination Discovery */}
      <section id="home-destinations" className="bg-white w-full relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 reveal-section">
            <div>
              <span className="text-xs font-bold text-booking-blue uppercase tracking-widest animate-pulse">Inspire Your Next Trip</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-1 text-booking-dark font-serif">
                <BlurText text="Trending Destinations" />
              </h2>
            </div>
            <p className="mt-2 md:mt-0 text-sm text-booking-dark/50 max-w-sm font-light">
              Escape the ordinary with our most sought-after retreats, curated by global design and hospitality experts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 reveal-grid">
            {mockDestinations.map((dest) => (
              <CutoutCard
                key={dest.id}
                className={cn(cutoutCardSurfaceClassName, 'reveal-card')}
                onClick={() => onSearch({
                  destination: `${dest.name}, ${dest.country}`,
                  checkIn: new Date().toISOString().split('T')[0],
                  checkOut: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
                  guests: 2,
                  rooms: 1,
                })}
              >
                <CutoutCardMedia className="h-72">
                  <CutoutCardImage src={dest.image} alt={`${dest.name}, ${dest.country}`} />
                  <CutoutCardOverlay />

                  {/* Top-right pin badge with rating tag */}
                  <CutoutCardPin className="right-0 top-0">
                    <div className="flex items-center gap-1 rounded-bl-2xl bg-white px-3 py-1.5 text-xs font-bold text-booking-blue">
                      <Star className="h-3.5 w-3.5 fill-booking-amber text-booking-amber" />
                      {dest.tag}
                    </div>
                  </CutoutCardPin>

                  {/* Hover reveal action button */}
                  <CutoutCardAction className="right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full bg-booking-blue text-white shadow-lg">
                    <ArrowUpRight className="h-5 w-5" />
                  </CutoutCardAction>
                </CutoutCardMedia>

                <CutoutCardContent>
                  <h3 className="text-lg font-semibold text-booking-dark flex items-baseline gap-1">
                    {dest.name}
                    <span className="text-sm font-normal text-booking-muted">· {dest.country}</span>
                  </h3>
                  <CutoutCardFooter className="mt-3">
                    <span className="text-sm text-booking-muted flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-booking-blue" />
                      {dest.propertiesCount} Premium Properties
                    </span>
                    <span className="text-xs font-semibold text-booking-blue uppercase tracking-wide">Explore</span>
                  </CutoutCardFooter>
                </CutoutCardContent>
              </CutoutCard>
            ))}
          </div>
        </div>
      </section>

      {/* Refined Deal Sections */}
      <section id="home-deals" className="border-t border-b border-white/5 py-32 md:py-48 text-white relative z-10 overflow-hidden">
        {/* Backdrop image */}
        <img
          src="/myhitch-jetnrest/destinations/sebastian-latorre-VqPOeYqzK-M-unsplash.jpg"
          alt="Highland tea estate"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-section">
            <div>
              <span className="text-xs font-bold text-booking-amber uppercase tracking-widest">Exclusive Privileges</span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-1 text-white font-serif">
                <BlurText text="Member Escape Deals" />
              </h2>
            </div>
            <button className="mt-4 md:mt-0 text-xs font-semibold text-booking-amber hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
              View All Member Perks <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 reveal-grid">
            {mockTrendingDeals.map((deal) => (
              <CutoutCard
                key={deal.id}
                className={cn(
                  'group/cutout relative cursor-pointer overflow-hidden rounded-[28px] bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-luxury transition-all duration-500 hover:bg-white/15 hover:border-white/30 reveal-card'
                )}
                onClick={() => handleSelectDeal(deal.stayId)}
              >
                <CutoutCardMedia className="h-44">
                  <CutoutCardImage src={deal.image} alt={deal.title} />
                  <CutoutCardOverlay />

                  {/* Bottom-left inset discount label with cutout corners */}
                  <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-2xl bg-white/20 backdrop-blur-md border-t border-r border-white/30 px-4 py-2">
                    <span className="text-sm font-bold text-white">{deal.discount}</span>
                  </CutoutCardInsetLabel>

                  {/* Hover reveal action */}
                  <CutoutCardAction className="right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg">
                    <ArrowUpRight className="h-5 w-5" />
                  </CutoutCardAction>
                </CutoutCardMedia>

                <CutoutCardContent>
                  <span className="text-[9px] font-bold text-booking-amber uppercase tracking-widest flex items-center gap-1">
                    <Flame className="h-3 w-3" /> Special Promo
                  </span>
                  <h3 className="text-base font-semibold text-white mt-1">{deal.title}</h3>
                  <p className="text-xs text-white/70 mt-1 line-clamp-2">{deal.subtitle}</p>
                  <CutoutCardFooter className="mt-3">
                    <p className="text-[10px] text-white/50 font-mono">Use code: {deal.code}</p>
                    <span className="text-xs font-semibold text-white uppercase tracking-wide">Claim</span>
                  </CutoutCardFooter>
                </CutoutCardContent>
              </CutoutCard>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Sri Lanka — white section, text left + district map right */}
      <section id="home-map" className="bg-white w-full relative z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text — left */}
          <div>
            <span className="text-xs font-bold text-booking-blue uppercase tracking-widest">Explore By Region</span>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-2 text-black font-serif leading-tight">
              Discover the World
            </h2>
            <p className="mt-4 text-sm text-booking-muted leading-relaxed max-w-md">
              From sun-soaked beaches and alpine retreats to vibrant cities and ancient wonders — explore
              handpicked luxury stays across every continent, all in one place.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-booking-dark">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-booking-blue" /> 190+ countries worldwide</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-booking-blue" /> Verified luxury properties</li>
              <li className="flex items-center gap-2"><Star className="h-4 w-4 text-booking-blue" /> Beaches, cities & heritage escapes</li>
            </ul>
          </div>

          {/* Map image — right (white background blended out) */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/myhitch-jetnrest/destinations/world-map.png"
              alt="World Map"
              className="w-full max-w-md h-auto object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      {/* Trusted Reviews Section */}
      <section id="home-reviews" className="w-full py-32 md:py-48 relative z-10 overflow-hidden">
        {/* Backdrop image */}
        <img
          src="/myhitch-jetnrest/destinations/sarmat-batagov-cuZbrYoimv8-unsplash.jpg"
          alt="Tropical coastline"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-14 text-white reveal-section">
          <span className="text-xs font-bold text-booking-amber uppercase tracking-widest">Global Travel Voices</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mt-1 text-white font-serif">
            <BlurText text="Reviews From Our Guests" />
          </h2>
          <p className="mt-3 text-sm text-white/60 leading-relaxed font-light">
            Discover why decerning travelers choose Booking.com Elite stays for their holiday retreats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-grid">
          {mockTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-premium flex flex-col justify-between text-white reveal-card parallax-float"
            >
              <div>
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-booking-blue text-white font-bold text-xs px-2 py-1 rounded-lg">
                    {testimonial.rating}
                  </div>
                  <div className="flex gap-0.5 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
                    ))}
                  </div>
                </div>
                {/* Comment */}
                <p className="text-sm italic text-white leading-relaxed font-light">
                  "{testimonial.comment}"
                </p>
              </div>

              {/* User info */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-booking-amber border border-white/10">
                  {testimonial.userName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{testimonial.userName}</h4>
                  <p className="text-xs text-white/50">{testimonial.userCountry} • {testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}
