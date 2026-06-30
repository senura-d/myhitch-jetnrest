import React from 'react';
import { Globe, Award, Users, Heart, Leaf, ShieldCheck } from 'lucide-react';

interface AboutViewProps {
  onBackToHome: () => void;
}

const stats = [
  { value: '2.5M+', label: 'Happy travelers' },
  { value: '1,200+', label: 'Luxury properties' },
  { value: '48', label: 'Destinations' },
  { value: '15 yrs', label: 'Of hospitality' },
];

const values = [
  { icon: Heart, title: 'Guest obsession', text: 'Every decision starts with what creates a remarkable experience for our travelers.' },
  { icon: Leaf, title: 'Sustainable travel', text: 'We partner with eco-conscious properties to protect the places we love to explore.' },
  { icon: ShieldCheck, title: 'Trust & safety', text: 'Verified listings, secure payments and 24/7 support on every booking.' },
  { icon: Award, title: 'Curated quality', text: 'Hand-picked stays and experiences, vetted for genuine luxury and character.' },
];

export default function AboutView({ onBackToHome }: AboutViewProps) {
  return (
    <div className="bg-booking-dark min-h-screen pt-28 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <button onClick={onBackToHome} className="text-sm text-white/40 hover:text-white transition-colors mb-6">← Back to home</button>

        {/* Hero */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 text-booking-amber text-sm font-medium"><Globe className="h-4 w-4" /> Our story</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white tracking-tight">Travel, beautifully crafted.</h1>
          <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            We began with a simple belief: that booking a journey should feel as inspiring as the journey itself.
            From the misty hills of Ella to the golden coasts of Mirissa, we connect travelers with the soul of Sri Lanka
            and the world's most extraordinary destinations.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold text-booking-amber">{s.value}</p>
              <p className="text-sm text-white/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img
            src="https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=800&q=80"
            alt="Travel"
            className="rounded-3xl w-full h-72 object-cover border border-white/10"
          />
          <div>
            <h2 className="text-3xl font-bold text-white">Our mission</h2>
            <p className="mt-4 text-white/50 leading-relaxed">
              To make exceptional travel accessible — pairing world-class technology with the warmth of genuine
              local hospitality. We sweat the details so you can simply arrive, relax, and discover.
            </p>
            <p className="mt-4 text-white/50 leading-relaxed">
              Today our team spans engineers, designers, and travel experts united by a love of exploration and an
              obsession with getting every booking right.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center">What we stand for</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <div className="h-12 w-12 rounded-xl bg-booking-amber/15 flex items-center justify-center mb-4"><Icon className="h-6 w-6 text-booking-amber" /></div>
                  <h3 className="text-lg font-semibold text-white">{v.title}</h3>
                  <p className="text-sm text-white/50 mt-2 leading-relaxed">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-br from-booking-blue/40 to-white/5 border border-white/10 rounded-3xl p-10 text-center">
          <Users className="h-8 w-8 text-booking-amber mx-auto" />
          <h2 className="mt-4 text-2xl font-bold text-white">Join our journey</h2>
          <p className="mt-2 text-white/50 max-w-md mx-auto">We're always looking for passionate people to help shape the future of travel.</p>
          <button className="mt-6 px-6 py-3 bg-white text-booking-dark font-medium rounded-xl hover:bg-white/90 transition-all">View open roles</button>
        </div>
      </div>
    </div>
  );
}
