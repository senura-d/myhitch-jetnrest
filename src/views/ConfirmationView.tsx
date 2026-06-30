import React from 'react';
import { BookingDetails } from '../types';
import { CheckCircle, Calendar, Printer, Home, Compass, MapPin } from 'lucide-react';

interface ConfirmationViewProps {
  details: BookingDetails;
  onBackToHome: () => void;
}

export default function ConfirmationView({
  details,
  onBackToHome
}: ConfirmationViewProps) {
  return (
    <div className="bg-booking-slate min-h-screen pt-28 pb-20 flex flex-col justify-center items-center">
      <div className="max-w-xl w-full px-6">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-luxury p-8 text-center flex flex-col items-center">
          
          {/* Animated Success Badge */}
          <div className="h-16 w-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-sm">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>

          <span className="text-[10px] font-bold text-booking-amber uppercase tracking-widest bg-booking-amber/10 border border-booking-amber/20 px-3 py-1 rounded-full">
            Reservation Confirmed
          </span>

          <h1 className="text-3xl font-bold tracking-tight text-booking-navy font-serif mt-4">
            Your Escape Awaits
          </h1>
          
          <p className="text-sm text-booking-muted mt-2 max-w-sm">
            Thank you, {details.firstName}. Your booking at {details.stay.name} has been secured and sent to the host.
          </p>

          {/* Booking Code */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl py-3 px-6 mt-6 w-full flex items-center justify-between text-sm">
            <span className="text-booking-muted font-medium">Booking Number:</span>
            <span className="font-mono font-bold text-booking-text tracking-wider">{details.bookingNumber}</span>
          </div>

          <hr className="w-full border-slate-100 my-6" />

          {/* Summary Details */}
          <div className="w-full text-left flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-booking-muted">Reservation Details</h3>
            
            <div className="flex gap-4 items-start">
              <MapPin className="h-5 w-5 text-booking-amber shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-booking-text">{details.stay.name}</p>
                <p className="text-xs text-booking-muted">{details.stay.location}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Calendar className="h-5 w-5 text-booking-amber shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-booking-text">Stay Dates</p>
                <p className="text-xs text-booking-muted">{details.checkIn} to {details.checkOut}</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-5 w-5 shrink-0 mt-0.5 flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-booking-blue" />
              </div>
              <div>
                <p className="text-sm font-semibold text-booking-text">Suite Booked</p>
                <p className="text-xs text-booking-muted">{details.room.name} ({details.guests} Guests)</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="h-5 w-5 shrink-0 mt-0.5 flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-booking-blue" />
              </div>
              <div>
                <p className="text-sm font-semibold text-booking-text">Payment Confirmed</p>
                <p className="text-xs text-booking-muted">Amount of <span className="font-bold text-booking-text font-serif">${details.totalPrice}</span> charged to {details.paymentMethod}</p>
              </div>
            </div>
          </div>

          <hr className="w-full border-slate-100 my-6" />

          {/* Guidelines */}
          <div className="bg-booking-blue/5 border border-booking-blue/10 rounded-2xl p-4 text-left w-full">
            <h4 className="text-xs font-bold text-booking-blue uppercase tracking-wider mb-1">Check-in Instructions</h4>
            <p className="text-xs text-booking-muted leading-relaxed">
              A detailed check-in guide, directions, and keys instructions have been sent to <span className="font-semibold text-booking-text">{details.email}</span>. Simply show this booking number upon arrival.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full">
            <button
              onClick={onBackToHome}
              className="flex-1 h-12 bg-white hover:bg-white/90 text-booking-blue border border-slate-200 font-medium text-xs rounded-xl transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" /> Return Home
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 h-12 bg-white border border-slate-200 hover:bg-slate-50 text-booking-text font-medium text-xs rounded-xl transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Printer className="h-4 w-4" /> Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
