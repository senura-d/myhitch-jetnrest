import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, CreditCard, Bell, Plane, Building2, Calendar, ChevronRight, Settings, LogOut } from 'lucide-react';

interface ProfileViewProps {
  onBackToHome: () => void;
  onNavigate: (view: string) => void;
  onSignOut: () => void;
}

const trips = [
  {
    id: 't-1', type: 'stay', title: 'Heritance Kandalama', date: 'Aug 4 – Aug 9, 2026', status: 'Upcoming', icon: Building2,
    location: 'Dambulla, Sri Lanka', ref: 'BK-20260804-1A2B', guests: 2, rooms: 1, price: 'USD 1,240', nights: 5,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80'
  },
  {
    id: 't-2', type: 'flight', title: 'Colombo → Dubai (Emirates)', date: 'Aug 3, 2026', status: 'Upcoming', icon: Plane,
    location: 'CMB → DXB · EK651', ref: 'FL-20260803-3C4D', guests: 1, rooms: 0, price: 'USD 420', nights: 0,
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80'
  },
  {
    id: 't-3', type: 'stay', title: 'Wild Coast Tented Lodge', date: 'May 12 – May 15, 2026', status: 'Completed', icon: Building2,
    location: 'Yala, Sri Lanka', ref: 'BK-20260512-5E6F', guests: 2, rooms: 1, price: 'USD 880', nights: 3,
    img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80'
  },
];

const tabs = ['Trips', 'Account', 'Payment', 'Preferences'] as const;

export default function ProfileView({ onBackToHome, onNavigate, onSignOut }: ProfileViewProps) {
  const [tab, setTab] = useState<typeof tabs[number]>('Trips');
  const [selectedTrip, setSelectedTrip] = useState<typeof trips[0] | null>(null);

  return (
    <>
    <div className="bg-white min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <button onClick={onBackToHome} className="text-sm text-slate-400 hover:text-slate-700 transition-colors mb-6">← Back to home</button>

        {/* Profile header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl font-bold text-white">A</div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold text-white">Alexander Dubois</h1>
            <p className="text-white/70 mt-1 flex items-center justify-center sm:justify-start gap-2"><Mail className="h-4 w-4" /> alexander.dubois@email.com</p>
            <span className="inline-flex items-center gap-1.5 mt-3 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              <Award className="h-4 w-4" /> Genius Level 3 Member
            </span>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <Stat value="12" label="Trips" />
            <Stat value="4" label="Countries" />
            <Stat value="2,480" label="Points" />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-slate-200 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                tab === t ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === 'Trips' && (
            <div className="space-y-4">
              {trips.map((tr) => {
                const Icon = tr.icon;
                return (
                  <div
                    key={tr.id}
                    onClick={() => setSelectedTrip(tr)}
                    className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center"><Icon className="h-5 w-5 text-blue-600" /></div>
                    <div className="flex-1">
                      <p className="text-slate-900 font-medium">{tr.title}</p>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5"><Calendar className="h-3.5 w-3.5" />{tr.date}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${tr.status === 'Upcoming' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{tr.status}</span>
                    <ChevronRight className="h-5 w-5 text-slate-300" />
                  </div>
                );
              })}
            </div>
          )}

          {tab === 'Account' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <Info icon={User} label="Full name" value="Alexander Dubois" />
              <Info icon={Mail} label="Email" value="alexander.dubois@email.com" />
              <Info icon={Phone} label="Phone" value="+33 6 12 34 56 78" />
              <Info icon={MapPin} label="Country" value="France" />
              <button className="md:col-span-2 mt-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all w-fit flex items-center gap-2"><Settings className="h-4 w-4" /> Edit details</button>
            </div>
          )}

          {tab === 'Payment' && (
            <div className="max-w-xl space-y-4">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 border border-blue-500/20 rounded-2xl p-6 h-48 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <CreditCard className="h-8 w-8 text-white/70" />
                  <span className="text-white/60 text-sm">VISA</span>
                </div>
                <div>
                  <p className="text-white tracking-widest text-lg">•••• •••• •••• 4291</p>
                  <div className="flex justify-between mt-2 text-xs text-white/50"><span>Alexander Dubois</span><span>09/28</span></div>
                </div>
              </div>
              <button className="w-full py-3 border border-red-200 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl text-sm font-semibold transition-all">+ Add payment method</button>
            </div>
          )}

          {tab === 'Preferences' && (
            <div className="max-w-xl space-y-3">
              <Toggle icon={Bell} label="Email notifications" desc="Deals, trip updates and reminders" on />
              <Toggle icon={Bell} label="Push notifications" desc="Real-time alerts on your device" />
              <Toggle icon={Award} label="Genius offers" desc="Exclusive member-only discounts" on />
            </div>
          )}
        </div>

        <button
          onClick={() => { onSignOut(); onNavigate('login'); }}
          className="mt-10 flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition-all w-fit"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </div>

    {/* Booking Detail Modal */}
    {selectedTrip && (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
          {/* Hero image */}
          <div className="relative h-48 overflow-hidden">
            <img src={selectedTrip.img} alt={selectedTrip.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <button
              onClick={() => setSelectedTrip(null)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white backdrop-blur-sm transition-all"
            >
              ✕
            </button>
            <div className="absolute bottom-4 left-5">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${selectedTrip.status === 'Upcoming' ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'}`}>
                {selectedTrip.status}
              </span>
              <h2 className="text-white text-xl font-bold mt-1">{selectedTrip.title}</h2>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Detail label="Reference" value={selectedTrip.ref} />
              <Detail label="Date" value={selectedTrip.date} />
              <Detail label="Location / Route" value={selectedTrip.location} />
              <Detail label="Total paid" value={selectedTrip.price} />
              {selectedTrip.nights > 0 && <Detail label="Nights" value={`${selectedTrip.nights} nights`} />}
              <Detail label="Guests" value={`${selectedTrip.guests} guest${selectedTrip.guests > 1 ? 's' : ''}`} />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setSelectedTrip(null)}
                className="flex-1 h-11 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
              >
                Close
              </button>
              <button className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-semibold text-white transition-all">
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
      <p className="text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><Icon className="h-3.5 w-3.5 text-blue-500" />{label}</p>
      <p className="text-slate-900 mt-1 font-medium">{value}</p>
    </div>
  );
}

function Toggle({ icon: Icon, label, desc, on }: { icon: any; label: string; desc: string; on?: boolean }) {
  const [active, setActive] = useState(!!on);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 overflow-hidden">
      <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center"><Icon className="h-5 w-5 text-blue-600" /></div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-900 text-sm font-medium truncate">{label}</p>
        <p className="text-xs text-slate-400 truncate">{desc}</p>
      </div>
      <button
        onClick={() => setActive(!active)}
        aria-label={`${active ? 'Disable' : 'Enable'} ${label}`}
        className={`shrink-0 w-12 h-6 rounded-full transition-all relative ${active ? 'bg-blue-600' : 'bg-slate-200'}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${active ? 'translate-x-[26px]' : 'translate-x-[2px]'}`} />
      </button>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">{label}</p>
      <p className="text-slate-800 text-sm font-semibold mt-0.5">{value}</p>
    </div>
  );
}
