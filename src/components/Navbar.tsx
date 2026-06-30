import React, { useState, useEffect } from 'react';
import { Plane, Compass, Car, Building2, User, Globe, Menu, X, Landmark, Home } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  logoText?: string;
}

export default function Navbar({
  currentView,
  onNavigate,
  logoText = "Booking.com"
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'stays', label: 'Stays', icon: Building2 },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'cars', label: 'Car rentals', icon: Car },
    { id: 'attractions', label: 'Attractions', icon: Compass },
  ];

  const hasHeroImage = currentView === 'home' || currentView === 'flights';
  const shouldBeSolid = isScrolled || !hasHeroImage;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        shouldBeSolid
          ? 'bg-booking-navy/95 backdrop-blur-md border-b border-white/10 py-4 shadow-premium' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white cursor-pointer select-none"
        >
          <span>{logoText}</span>
          <span className="text-booking-amber font-serif">.</span>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-white ${
                  isActive ? 'text-booking-amber border-b-2 border-booking-amber pb-1' : 'text-white/70'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button className="text-white/80 hover:text-white transition-colors" title="Select Language">
            <Globe className="h-5 w-5" />
          </button>
          <span className="text-white/40 text-xs font-semibold tracking-wider">USD</span>
          
          <div onClick={() => onNavigate('profile')} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300">
            <User className="h-4 w-4 text-booking-amber" />
            <span className="text-xs font-medium text-white">Alexander</span>
            <div className="h-6 w-6 rounded-full bg-booking-amber/20 border border-booking-amber/40 flex items-center justify-center text-[10px] text-booking-amber font-bold">
              A
            </div>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white/90 hover:text-white p-1"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-booking-dark border-b border-white/10 py-6 px-6 shadow-luxury flex flex-col gap-6 animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-left py-2 text-white/80 hover:text-white text-base font-medium"
                >
                  <Icon className="h-5 w-5 text-booking-amber" />
                  {item.label}
                </button>
              );
            })}
          </div>

          <hr className="border-white/10" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/80">
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium">English (US)</span>
            </div>
            <span className="text-sm font-semibold text-booking-amber">USD ($)</span>
          </div>

          <div onClick={() => { onNavigate('profile'); setMobileMenuOpen(false); }} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-booking-amber/20 border border-booking-amber/40 flex items-center justify-center text-xs text-booking-amber font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-white">Alexander Dubois</p>
              <p className="text-xs text-white/40">Loyalty Level: Genius</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
