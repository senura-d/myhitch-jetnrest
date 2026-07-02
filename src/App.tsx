import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './views/HomeView';
import StaysView from './views/StaysView';
import ResultsView from './views/ResultsView';
import DetailsView from './views/DetailsView';
import CheckoutView from './views/CheckoutView';
import ConfirmationView from './views/ConfirmationView';
import FlightsView from './views/FlightsView';
import CarsView from './views/CarsView';
import AttractionsView from './views/AttractionsView';
import ProfileView from './views/ProfileView';
import AboutView from './views/AboutView';
import PrivacyView from './views/PrivacyView';
import TermsView from './views/TermsView';
import AuthView from './views/AuthView';
import { Stay, Room, SearchQuery, BookingDetails } from './types';
import FlightResultsView, { FlightQuery } from './views/FlightResultsView';
import { mockStays } from './data/mockData';

export default function App() {
  const [view, setView] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  });
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingDetails | null>(null);
  const [flightQuery, setFlightQuery] = useState<FlightQuery | null>(null);
  const [authNotice, setAuthNotice] = useState('');

  // Smooth scrolling (Lenis) synced with GSAP ScrollTrigger
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    lenis.on('scroll', ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  // Sync view <-> URL path so each page has its own address
  useEffect(() => {
    const applyPath = () => {
      const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
      setView(path || 'home');
    };
    applyPath();
    window.addEventListener('popstate', applyPath);
    return () => window.removeEventListener('popstate', applyPath);
  }, []);

  // View state controller
  const navigateTo = (newView: string) => {
    setView(newView);
    const path = newView === 'home' ? '/' : `/${newView}`;
    if (window.location.pathname !== path) {
      window.history.pushState({ view: newView }, '', path);
    }
  };

  const handleSearch = (query: SearchQuery) => {
    setSearchQuery(query);
    navigateTo('results');
  };

  const handleSelectStay = (stay: Stay) => {
    setSelectedStay(stay);
    navigateTo('details');
  };

  const handleSelectRoom = (room: Room) => {
    setSelectedRoom(room);
    navigateTo('checkout');
  };

  const handleConfirmBooking = (bookingDetails: BookingDetails) => {
    if (!isLoggedIn) {
      setAuthNotice('You need to log in first to complete your booking.');
      navigateTo('login');
      return;
    }
    setConfirmedBooking(bookingDetails);
    navigateTo('confirmation');
  };

  const handleBackToHome = () => {
    setConfirmedBooking(null);
    setSelectedStay(null);
    setSelectedRoom(null);
    setFlightQuery(null);
    navigateTo('home');
  };

  const handleFlightSearch = (query: FlightQuery) => {
    setFlightQuery(query);
    navigateTo('flight-results');
  };

  // Booking guard: require login before booking/reserving/selecting
  const requireLogin = (): boolean => {
    if (isLoggedIn) return true;
    setAuthNotice('You need to log in first to complete your booking.');
    navigateTo('login');
    return false;
  };

  // All views now use the main layout with Navbar and Footer

  return (
    <div className="flex flex-col min-h-screen bg-booking-slate text-booking-text select-none">
      {/* Sticky Top Header */}
      <Navbar currentView={view} onNavigate={navigateTo} isLoggedIn={isLoggedIn} />

      {/* Main View Manager */}
      <main className="flex-1">
        {view === 'home' && (
          <HomeView 
            onSearch={handleSearch} 
            onSelectStay={handleSelectStay} 
            stays={mockStays} 
          />
        )}
        
        {view === 'results' && (
          <ResultsView 
            query={searchQuery} 
            stays={mockStays} 
            onSelectStay={handleSelectStay} 
            onBackToHome={handleBackToHome}
          />
        )}

        {view === 'details' && selectedStay && (
          <DetailsView 
            stay={selectedStay} 
            onBackToResults={() => navigateTo('results')} 
            onSelectRoom={handleSelectRoom} 
          />
        )}

        {view === 'checkout' && selectedStay && selectedRoom && (
          <CheckoutView 
            stay={selectedStay} 
            room={selectedRoom} 
            query={searchQuery} 
            onConfirmBooking={handleConfirmBooking} 
            onBackToDetails={() => navigateTo('details')} 
          />
        )}

        {view === 'confirmation' && confirmedBooking && (
          <ConfirmationView
            details={confirmedBooking}
            onBackToHome={handleBackToHome}
          />
        )}
        {view === 'stays' && (
          <StaysView
            stays={mockStays}
            onSearch={handleSearch}
            onSelectStay={handleSelectStay}
            onBackToHome={handleBackToHome}
          />
        )}
        {view === 'flights' && <FlightsView onSearch={handleFlightSearch} onBackToHome={handleBackToHome} />}
        {view === 'flight-results' && flightQuery && (
          <FlightResultsView
            query={flightQuery}
            onRequireAuth={requireLogin}
            onBack={() => {
              setFlightQuery(null);
              navigateTo('flights');
            }}
          />
        )}
        {view === 'cars' && <CarsView onBackToHome={handleBackToHome} onRequireAuth={requireLogin} />}
        {view === 'attractions' && <AttractionsView onBackToHome={handleBackToHome} onRequireAuth={requireLogin} />}
        {view === 'profile' && <ProfileView onBackToHome={handleBackToHome} onNavigate={navigateTo} onSignOut={() => setIsLoggedIn(false)} />}
        {view === 'about' && <AboutView onBackToHome={handleBackToHome} />}
        {view === 'privacy' && <PrivacyView onBackToHome={handleBackToHome} />}
        {view === 'terms' && <TermsView onBackToHome={handleBackToHome} />}
        {view === 'login' && <AuthView notice={authNotice} onBackToHome={handleBackToHome} onNavigate={navigateTo} onLogin={() => { setIsLoggedIn(true); setAuthNotice(''); navigateTo('profile'); }} defaultTab="signin" />}
        {view === 'signup' && <AuthView notice={authNotice} onBackToHome={handleBackToHome} onNavigate={navigateTo} onLogin={() => { setIsLoggedIn(true); setAuthNotice(''); navigateTo('profile'); }} defaultTab="signup" />}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
