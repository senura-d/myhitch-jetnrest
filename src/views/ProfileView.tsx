import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Award, CreditCard, Bell, Plane, Building2, Calendar, ChevronRight, Settings, LogOut } from 'lucide-react';

interface ProfileViewProps {
  onBackToHome: () => void;
}

const trips = [
  { id: 't-1', type: 'stay', title: 'Heritance Kandalama', date: 'Aug 4 – Aug 9, 2026', status: 'Upcoming', icon: Building2 },
  { id: 't-2', type: 'flight', title: 'Colombo → Dubai (Emirates)', date: 'Aug 3, 2026', status: 'Upcoming', icon: Plane },
  { id: 't-3', type: 'stay', title: 'Wild Coast Tented Lodge', date: 'May 12 – May 15, 2026', status: 'Completed', icon: Building2 },
];

const tabs = ['Trips', 'Account', 'Payment', 'Preferences'] as const;

export default function ProfileView({ onBackToHome }: ProfileViewProps) {
  const [tab, setTab] = useState<typeof tabs[number]>('Trips');

  return (
    <div className="bg-booking-dark min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <button onClick={onBackToHome} className="text-sm text-white/40 hover:text-white transition-colors mb-6">← Back to home</button>

        {/* Profile header */}
        <div className="bg-gradient-to-br from-booking-blue/40 to-white/5 border border-white/10 rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-booking-amber/20 border-2 border-booking-amber/50 flex items-center justify-center text-3xl font-bold text-booking-amber">A</div>
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-3xl font-bold text-white">Alexander Dubois</h1>
            <p className="text-white/50 mt-1 flex items-center justify-center sm:justify-start gap-2"><Mail className="h-4 w-4" /> alexander.dubois@email.com</p>
            <span className="inline-flex items-center gap-1.5 mt-3 bg-booking-amber/15 text-booking-amber text-xs font-semibold px-3 py-1.5 rounded-full">
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
        <div className="mt-8 flex gap-2 border-b border-white/10 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                tab === t ? 'text-booking-amber border-booking-amber' : 'text-white/50 border-transparent hover:text-white'
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
                  <div key={tr.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:border-booking-amber/40 transition-all">
                    <div className="h-12 w-12 rounded-xl bg-booking-amber/15 flex items-center justify-center"><Icon className="h-5 w-5 text-booking-amber" /></div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{tr.title}</p>
                      <p className="text-xs text-white/40 flex items-center gap-1.5 mt-0.5"><Calendar className="h-3.5 w-3.5" />{tr.date}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${tr.status === 'Upcoming' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/10 text-white/50'}`}>{tr.status}</span>
                    <ChevronRight className="h-5 w-5 text-white/30" />
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
              <button className="md:col-span-2 mt-2 px-5 py-3 bg-booking-amber hover:bg-booking-accent text-white rounded-xl text-sm font-medium transition-all w-fit flex items-center gap-2"><Settings className="h-4 w-4" /> Edit details</button>
            </div>
          )}

          {tab === 'Payment' && (
            <div className="max-w-xl space-y-4">
              <div className="bg-gradient-to-br from-booking-blue to-booking-navy border border-white/10 rounded-2xl p-6 h-48 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <CreditCard className="h-8 w-8 text-booking-amber" />
                  <span className="text-white/60 text-sm">VISA</span>
                </div>
                <div>
                  <p className="text-white tracking-widest text-lg">•••• •••• •••• 4291</p>
                  <div className="flex justify-between mt-2 text-xs text-white/50"><span>Alexander Dubois</span><span>09/28</span></div>
                </div>
              </div>
              <button className="px-5 py-3 bg-white/5 border border-white/10 hover:border-booking-amber/40 text-white rounded-xl text-sm font-medium transition-all w-full">+ Add payment method</button>
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

        <button onClick={onBackToHome} className="mt-10 flex items-center gap-2 text-sm text-red-400/70 hover:text-red-400 transition-colors">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-white/40">{label}</p>
    </div>
  );
}

function Info({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      <p className="text-[10px] uppercase tracking-wider text-white/40 flex items-center gap-1.5"><Icon className="h-3.5 w-3.5 text-booking-amber" />{label}</p>
      <p className="text-white mt-1">{value}</p>
    </div>
  );
}

function Toggle({ icon: Icon, label, desc, on }: { icon: any; label: string; desc: string; on?: boolean }) {
  const [active, setActive] = useState(!!on);
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
      <div className="h-10 w-10 rounded-xl bg-booking-amber/15 flex items-center justify-center"><Icon className="h-5 w-5 text-booking-amber" /></div>
      <div className="flex-1">
        <p className="text-white text-sm font-medium">{label}</p>
        <p className="text-xs text-white/40">{desc}</p>
      </div>
      <button onClick={() => setActive(!active)} className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-booking-amber' : 'bg-white/15'}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${active ? 'left-6.5 translate-x-0' : 'left-0.5'}`} style={{ left: active ? '26px' : '2px' }} />
      </button>
    </div>
  );
}
