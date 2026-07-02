import React from 'react';
import { Mail, Globe, ShieldCheck, HelpCircle } from 'lucide-react';

interface FooterProps {
  onNavigate?: (view: string) => void;
}

export default function Footer({ onNavigate = () => {} }: FooterProps) {
  const NavLink = ({ view, children }: { view: string; children: React.ReactNode }) => (
    <button type="button" onClick={() => onNavigate(view)} className="hover:text-white transition-colors text-left">{children}</button>
  );
  return (
    <footer className="bg-booking-dark border-t border-white/5 text-white/60 relative z-10">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-white tracking-tight">Join the Inner Circle</h3>
            <p className="mt-2 text-sm text-white/50 max-w-md">
              Receive curated recommendations, private luxury deals, and bespoke travel guides directly in your inbox.
            </p>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm text-white placeholder-white/30 focus:outline-none focus:border-booking-amber focus:ring-1 focus:ring-booking-amber transition-all duration-300"
                required
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6 bg-white hover:bg-white/90 text-booking-dark font-medium text-sm rounded-xl transition-all duration-300 active:scale-[0.98]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Links */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Destinations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Luxury Resorts</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Boutique Stays</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Private Villas</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Unique Experiences</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><NavLink view="cars">Car Rentals</NavLink></li>
            <li><NavLink view="flights">Flight Finder</NavLink></li>
            <li><NavLink view="attractions">Attractions</NavLink></li>
            <li><a href="#" className="hover:text-white transition-colors">Travel Insurance</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Business Travel</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Support</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Customer Help Center</a></li>
            <li><NavLink view="profile">Manage Bookings</NavLink></li>
            <li><NavLink view="terms">Cancellation Policies</NavLink></li>
            <li><NavLink view="privacy">Privacy Policy</NavLink></li>
            <li><NavLink view="terms">Terms & Conditions</NavLink></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><NavLink view="about">About Us</NavLink></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Investor Relations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Press Room</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-booking-dark/60 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-white select-none">
            <span>MYHITCH JETNREST</span>
            <span className="text-booking-amber font-serif">.</span>
          </div>

          <p className="text-white/40 text-sm">
            © 2026 MYHITCH JETNREST. All rights reserved. Worldwide Luxury Travel booking portal.
          </p>

          <div className="flex items-center gap-4 text-xs text-white/50">
            <NavLink view="privacy">Privacy</NavLink>
            <NavLink view="terms">Terms</NavLink>
            <NavLink view="about">About</NavLink>
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-booking-amber" /> Secure Booking</span>
            <span className="flex items-center gap-1.5"><HelpCircle className="h-4 w-4 text-booking-amber" /> 24/7 Support</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
