import React, { useState } from 'react';
import { Stay, Room, SearchQuery, BookingDetails } from '../types';
import { ArrowLeft, ShieldCheck, CreditCard, Lock, Calendar, Building2 } from 'lucide-react';

interface CheckoutViewProps {
  stay: Stay;
  room: Room;
  query: SearchQuery;
  onConfirmBooking: (details: BookingDetails) => void;
  onBackToDetails: () => void;
}

export default function CheckoutView({
  stay,
  room,
  query,
  onConfirmBooking,
  onBackToDetails
}: CheckoutViewProps) {
  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Date calculation
  const getNights = () => {
    const start = new Date(query.checkIn);
    const end = new Date(query.checkOut);
    const diff = end.getTime() - start.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 3; // Fallback
  };

  const nights = getNights();
  const subtotal = room.pricePerNight * nights;
  const resortTax = Math.round(subtotal * 0.08); // 8% local luxury resort tax
  const total = subtotal + resortTax;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate luxury booking verification
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirmBooking({
        stay,
        room,
        checkIn: query.checkIn,
        checkOut: query.checkOut,
        guests: query.guests,
        firstName,
        lastName,
        email,
        phone,
        paymentMethod: `Credit Card ending in *${cardNumber.slice(-4) || '4242'}`,
        totalPrice: total,
        bookingNumber: `BK-${Math.floor(100000 + Math.random() * 900000)}`
      });
    }, 1800);
  };

  return (
    <div className="bg-booking-slate min-h-screen pt-24 pb-20 text-left">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
        <button
          onClick={step === 2 ? () => setStep(1) : onBackToDetails}
          className="flex items-center gap-2 text-sm font-semibold text-booking-blue hover:text-booking-accent transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> {step === 2 ? 'Back to Guest Details' : 'Back to Room Selection'}
        </button>
      </div>

      {/* Main Grid Checkout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Form Column */}
        <div className="lg:col-span-8">
          
          {/* Steps Indicator */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= 1 ? 'bg-booking-blue text-white shadow-sm' : 'bg-slate-200 text-booking-muted'
              }`}>
                1
              </span>
              <span className="text-sm font-bold text-booking-navy">Guest Info</span>
            </div>
            <div className="h-0.5 w-16 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                step === 2 ? 'bg-booking-blue text-white shadow-sm' : 'bg-slate-200 text-booking-muted'
              }`}>
                2
              </span>
              <span className={`text-sm font-semibold ${step === 2 ? 'text-booking-navy font-bold' : 'text-booking-muted'}`}>
                Payment Details
              </span>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-premium">
            
            {/* Step 1: Guest Information */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="flex flex-col gap-6">
                <h2 className="text-xl font-bold text-booking-navy font-serif">Enter Guest Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-booking-muted uppercase tracking-wider mb-2">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Charlotte"
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-booking-blue transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-booking-muted uppercase tracking-wider mb-2">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Bennett"
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-booking-blue transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-booking-muted uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. charlotte@example.com"
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-booking-blue transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-booking-muted uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +44 7911 123456"
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-booking-blue transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-booking-muted uppercase tracking-wider mb-2">Special Requests (Optional)</label>
                  <textarea
                    rows={4}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="E.g., early check-in, feather pillows, specific dietary requirements..."
                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-booking-blue transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto self-end h-12 px-8 bg-white hover:bg-white/90 text-booking-blue border border-slate-200 font-medium text-sm rounded-xl transition-colors active:scale-[0.98]"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {/* Step 2: Payment Details */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-booking-navy font-serif">Secure Credit Card Payment</h2>
                  <div className="flex items-center gap-1.5 text-xs text-booking-muted font-medium">
                    <Lock className="h-3.5 w-3.5 text-booking-blue" /> Encrypted
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-booking-muted uppercase tracking-wider mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name as it appears on card"
                    className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-booking-blue transition-all"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-xs font-semibold text-booking-muted uppercase tracking-wider mb-2">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-booking-muted" />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                      className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-booking-blue transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-booking-muted uppercase tracking-wider mb-2">Expiration Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      maxLength={5}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-booking-blue transition-all text-center"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-booking-muted uppercase tracking-wider mb-2">Security Code (CVV)</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength={3}
                      className="w-full h-12 px-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:bg-white focus:border-booking-blue transition-all text-center"
                      required
                    />
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-booking-blue shrink-0" />
                  <p className="text-[11px] leading-relaxed text-booking-muted">
                    Your luxury reservation is backed by our secured checkout. Funds will only be authorized after confirming with the property hosts.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-semibold text-booking-blue hover:text-booking-accent"
                  >
                    Modify Guest Details
                  </button>

                  <button
                    type="submit"
                    className="w-full sm:w-auto h-12 px-8 bg-white hover:bg-white/95 text-booking-blue font-semibold text-sm rounded-xl transition-all duration-300 shadow-soft-glow active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 border border-slate-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-4 w-4 border-2 border-booking-dark border-t-transparent rounded-full animate-spin" />
                        <span>Authorizing...</span>
                      </>
                    ) : (
                      <span>Complete Reservation</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Property Summary Card */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-premium">
            <h3 className="text-base font-bold text-booking-navy font-serif mb-4 flex items-center gap-2">
              <Building2 className="h-4.5 w-4.5 text-booking-amber" /> Reservation Summary
            </h3>

            <div className="flex gap-4 mb-5 pb-5 border-b border-slate-50">
              <div className="h-16 w-16 rounded-xl overflow-hidden shrink-0">
                <img src={stay.images[0]} alt={stay.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-booking-navy line-clamp-1">{stay.name}</h4>
                <p className="text-xs text-booking-muted mt-0.5">{stay.city}</p>
                <div className="bg-booking-blue/5 border border-booking-blue/10 px-2 py-0.5 rounded text-[9px] font-bold text-booking-blue inline-block mt-2">
                  {stay.rating} Exceptional
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-sm pb-5 border-b border-slate-50">
              <div className="flex items-center gap-2 text-booking-text">
                <Calendar className="h-4 w-4 text-booking-amber shrink-0" />
                <div>
                  <p className="font-semibold">Check In</p>
                  <p className="text-xs text-booking-muted">{query.checkIn}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-booking-text">
                <Calendar className="h-4 w-4 text-booking-amber shrink-0" />
                <div>
                  <p className="font-semibold">Check Out</p>
                  <p className="text-xs text-booking-muted">{query.checkOut}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-1 pt-1">
                <span className="text-xs text-booking-muted font-medium">Suite Selected</span>
                <span className="text-xs font-semibold text-booking-navy text-right max-w-[180px] truncate">{room.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-booking-muted font-medium">Duration</span>
                <span className="text-xs font-semibold text-booking-navy">{nights} Nights</span>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="flex flex-col gap-2 pt-4">
              <div className="flex justify-between items-center text-xs text-booking-muted">
                <span>Room Rate ({nights}x Nights)</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-booking-muted">
                <span>Local Resort Tax (8%)</span>
                <span>${resortTax}</span>
              </div>
              <hr className="border-slate-50 my-2" />
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs font-bold text-booking-navy block">Total Amount</span>
                  <span className="text-[10px] text-booking-muted block">Includes all local service taxes</span>
                </div>
                <span className="text-2xl font-bold text-booking-text font-serif">${total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
