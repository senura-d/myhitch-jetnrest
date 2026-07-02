import React, { useState, useEffect } from 'react';
import { Plane, Compass, Car, Building2, User, Globe, Menu, X, Landmark, Home } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  logoText?: string;
  isLoggedIn?: boolean;
}

export default function Navbar({
  currentView,
  onNavigate,
  logoText = "MYHITCH JETNREST",
  isLoggedIn = false
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

  const hasHeroImage = ['home', 'flights', 'stays', 'cars', 'attractions', 'about'].includes(currentView);
  const shouldBeSolid = isScrolled || !hasHeroImage;

  return (
    <>
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
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white/80 hover:text-white transition-colors" title="Select Language">
              <Globe className="h-5 w-5" />
            </button>
            <span className="text-white/40 text-xs font-semibold tracking-wider">USD</span>

            {isLoggedIn ? (
              /* Logged in: show profile */
              <div onClick={() => onNavigate('profile')} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300">
                <User className="h-4 w-4 text-booking-amber" />
                <span className="text-xs font-medium text-white">Alexander</span>
                <div className="h-6 w-6 rounded-full bg-booking-amber/20 border border-booking-amber/40 flex items-center justify-center text-[10px] text-booking-amber font-bold">
                  A
                </div>
              </div>
            ) : (
              /* Not logged in: show Sign Up button only */
              <button
                onClick={() => onNavigate('signup')}
                className="text-sm font-semibold bg-booking-amber hover:bg-booking-accent text-white px-5 py-2 rounded-xl transition-all duration-200"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/90 hover:text-white p-1"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-[#131520] py-8 px-6 flex flex-col gap-6 overflow-y-auto z-[100] animate-fadeIn">
          {/* Logo Header Row */}
          <div className="flex items-center justify-between pb-5 border-b border-[#222738]">
            <div 
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} 
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-white cursor-pointer select-none"
            >
              <span>{logoText}</span>
              <span className="text-[#3b82f6] font-serif">.</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#98a2b3] hover:text-white p-1"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-4 text-left pl-6 pr-4 py-3.5 rounded-xl transition-all duration-200 relative ${
                    isActive 
                      ? 'bg-[#1e2332] text-white font-semibold' 
                      : 'text-[#98a2b3] hover:text-white hover:bg-white/5 font-medium'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-[11px] bottom-[11px] w-1 bg-[#3b82f6] rounded-r-full"></span>
                  )}
                  <Icon className={`h-5 w-5 ${isActive ? 'text-[#3b82f6]' : 'text-[#8895a7]'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <hr className="border-[#222738] my-1" />

          <div className="flex items-center justify-between px-4 py-1">
            <div className="flex items-center gap-3 text-[#98a2b3]">
              <Globe className="h-5 w-5 text-[#8895a7]" />
              <span className="text-sm font-medium">English (US)</span>
            </div>
            <span className="text-sm font-semibold text-[#3b82f6]">USD ($)</span>
          </div>

          {isLoggedIn ? (
            <div 
              onClick={() => { onNavigate('profile'); setMobileMenuOpen(false); }} 
              className="flex items-center gap-3 bg-[#1e2332] border border-[#222738] hover:bg-[#252b3e] p-3.5 rounded-xl cursor-pointer transition-all"
            >
              <div className="h-8 w-8 rounded-full bg-[#3b82f6]/20 border border-[#3b82f6]/40 flex items-center justify-center text-xs text-[#3b82f6] font-bold shrink-0">
                A
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">Alexander Dubois</p>
                <p className="text-xs text-[#98a2b3] truncate">Loyalty Level: Genius</p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => { onNavigate('signup'); setMobileMenuOpen(false); }}
              className="w-full text-sm font-semibold bg-[#3b82f6] hover:bg-blue-600 text-white py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              Sign Up
            </button>
          )}
        </div>
      )}
    </>
  );
}
