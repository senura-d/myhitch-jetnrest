import React, { useState } from 'react';
import { Stay, Room } from '../types';
import Hero33 from '../components/Hero33';
import { 
  ArrowLeft, MapPin, Check, Star, Heart, Share2, 
  ChevronRight, Calendar, Users, Image as ImageIcon
} from 'lucide-react';

interface DetailsViewProps {
  stay: Stay;
  onBackToResults: () => void;
  onSelectRoom: (room: Room) => void;
}

export default function DetailsView({
  stay,
  onBackToResults,
  onSelectRoom
}: DetailsViewProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-[#f5f7fa] min-h-screen relative overflow-x-hidden">
      <Hero33
        logoText="MYHITCH JETNREST"
        primaryActionText="Reserve Room"
        secondaryActionText="View Details"
        titleLines={[stay.name]}
        backgroundImage={stay.images[0]}
        backgroundImages={stay.images}
        features={[
          {
            icon: Star,
            title: `${stay.rating}/10 Rating`,
            description: stay.ratingLabel,
          },
          {
            icon: MapPin,
            title: stay.city || 'Sri Lanka',
            description: stay.distance || 'Premium location',
          },
        ]}
        onExploreClick={() => {
          const element = document.getElementById('stay-details-section');
          element?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <div id="stay-details-section" className="bg-[#f5f7fa] pb-20 relative z-20">
        {/* Top Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <button onClick={onBackToResults} className="hover:text-booking-blue flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Search Results
            </button>
            <ChevronRight className="h-4 w-4" />
            <span>{stay.city || 'Sri Lanka'}</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">{stay.name}</span>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6">
        {/* Title & Rating Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{stay.name}</h1>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-booking-amber text-booking-amber" />
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="h-4 w-4 text-gray-400" />
              {stay.location}
              <span className="text-booking-blue hover:underline cursor-pointer ml-2">Show on map</span>
            </p>
          </div>
          
          <div className="flex flex-col items-end mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-bold text-booking-blue">{stay.ratingLabel}</p>
                <p className="text-xs text-gray-500">{stay.ratingCount.toLocaleString()} reviews</p>
              </div>
              <div className="bg-booking-blue text-white rounded-t-lg rounded-br-lg rounded-bl-sm px-3 py-2 text-xl font-bold shadow-sm">
                {stay.rating}/10
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setIsLiked(!isLiked)} 
                className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors text-gray-700"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                {isLiked ? 'Saved' : 'Save'}
              </button>
              <button className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded hover:bg-gray-100 transition-colors text-gray-700">
                <Share2 className="h-4 w-4 text-gray-500" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Mosaic Gallery */}
        <div className="relative mb-6 rounded-lg overflow-hidden flex gap-2 h-[300px] md:h-[400px]">
          <div className="w-full md:w-2/3 relative cursor-pointer group">
            <img src={stay.images[0]} alt={stay.name} className="w-full h-full object-cover group-hover:brightness-95 transition-all" />
          </div>
          <div className="hidden md:grid w-1/3 grid-cols-1 grid-rows-2 gap-2">
            <div className="relative cursor-pointer group">
              <img src={stay.images[1] || stay.images[0]} alt={stay.name} className="w-full h-full object-cover group-hover:brightness-95 transition-all" />
            </div>
            <div className="relative cursor-pointer group">
              <img src={stay.images[2] || stay.images[0]} alt={stay.name} className="w-full h-full object-cover group-hover:brightness-95 transition-all" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-all group-hover:bg-black/50">
                <div className="flex items-center gap-2 text-white font-medium bg-black/40 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <ImageIcon className="h-5 w-5" /> View all photos
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Nav */}
        <div className="sticky top-[64px] z-30 bg-white border border-gray-200 mb-6 shadow-sm rounded-lg overflow-x-auto">
          <div className="flex items-center p-1">
            {['Rooms', 'Hotel Policies', 'Reviews', 'Amenities'].map(tab => (
              <a 
                key={tab} 
                href={`#${tab.toLowerCase().replace(' ', '-')}`} 
                className="px-6 py-3 text-sm font-bold text-gray-700 hover:text-booking-blue hover:bg-gray-50 whitespace-nowrap rounded"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(tab.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                {tab}
              </a>
            ))}
          </div>
        </div>

        {/* Rooms Table */}
        <div id="rooms" className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
          {/* Date Picker Bar Fake */}
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-3 py-2 text-sm flex-1 min-w-[200px] hover:border-booking-blue transition-colors cursor-pointer">
                <Calendar className="h-4 w-4 text-booking-blue" />
                <span className="font-bold text-gray-800">Jun 30 - Jul 01</span>
                <span className="text-gray-500 font-medium">1 night</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-3 py-2 text-sm flex-1 min-w-[200px] hover:border-booking-blue transition-colors cursor-pointer">
                <Users className="h-4 w-4 text-booking-blue" />
                <span className="font-bold text-gray-800">2 Adults, 0 Children, 1 Room</span>
            </div>
            <button className="bg-booking-blue text-white px-8 py-2.5 rounded text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto">
              Search
            </button>
          </div>

          {/* Room List */}
          <div className="flex flex-col">
            {stay.rooms.map((room, idx) => (
              <div key={room.id} className={`flex flex-col md:flex-row border-b border-gray-200 ${idx === stay.rooms.length - 1 ? 'border-b-0' : ''}`}>
                
                {/* Room Info */}
                <div className="md:w-1/3 p-5 border-r border-gray-200 flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-gray-900">{room.name}</h3>
                  <img src={stay.images[0]} alt={room.name} className="w-full h-32 object-cover rounded-md" />
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600 mt-2">
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-gray-400"/> Max {room.capacity}</span>
                    <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-gray-400"/> {room.type}</span>
                    <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-gray-400"/> En suite bathroom</span>
                  </div>
                  <button className="text-booking-blue text-sm font-medium hover:underline text-left mt-2 flex items-center gap-1">
                    Room details <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
                
                {/* Room Options & Price */}
                <div className="md:w-2/3 flex flex-col sm:flex-row p-5 gap-6 items-center sm:items-stretch">
                  <div className="flex-1 flex flex-col justify-center gap-2.5 w-full">
                      {room.amenities.slice(0,3).map(a => (
                        <div key={a} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                          <span>{a}</span>
                        </div>
                      ))}
                      <div className="flex items-start gap-2 text-sm text-green-700 font-bold mt-2">
                        <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        <span>Free cancellation before Jun 29</span>
                      </div>
                  </div>
                  <div className="w-full sm:w-48 flex flex-col items-end justify-center border-t sm:border-t-0 sm:border-l border-gray-200 pt-4 sm:pt-0 sm:pl-6">
                    <div className="text-right w-full mb-4">
                      <p className="text-2xl font-bold text-gray-900">AU$ {room.pricePerNight}</p>
                      <p className="text-xs text-gray-500 font-medium">After taxes & fees</p>
                    </div>
                    <button 
                      onClick={() => onSelectRoom(room)} 
                      className="w-full bg-booking-amber hover:bg-orange-500 text-white font-bold py-2.5 px-4 rounded transition-colors shadow-sm text-sm"
                    >
                      Book
                    </button>
                    <p className="text-xs text-red-600 mt-2 font-bold flex items-center gap-1">
                      Only 2 rooms left!
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Policies */}
        <div id="hotel-policies" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Hotel Policies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-sm">
            <div>
              <p className="font-bold text-gray-900 mb-1 flex items-center gap-2"><Check className="h-4 w-4 text-gray-400" /> Check-in</p>
              <p className="text-gray-600 pl-6">From 14:00 to 00:00</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-1 flex items-center gap-2"><Check className="h-4 w-4 text-gray-400" /> Check-out</p>
              <p className="text-gray-600 pl-6">Before 12:00</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-1 flex items-center gap-2"><Check className="h-4 w-4 text-gray-400" /> Children & Beds</p>
              <p className="text-gray-600 pl-6">Children of any age are welcome. Extra beds available upon request.</p>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-1 flex items-center gap-2"><Check className="h-4 w-4 text-gray-400" /> Pets</p>
              <p className="text-gray-600 pl-6">Pets are not allowed.</p>
            </div>
          </div>
        </div>

        {/* Guest Reviews */}
        <div id="reviews" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Guest Reviews</h2>
          <div className="flex flex-col md:flex-row gap-8 mb-8 border-b border-gray-100 pb-8">
            <div className="text-center md:text-left min-w-[150px]">
              <div className="text-5xl font-bold text-booking-blue mb-2">{stay.rating}/10</div>
              <div className="font-bold text-gray-900 text-lg mb-1">{stay.ratingLabel}</div>
              <div className="text-sm text-gray-500 font-medium">{stay.ratingCount.toLocaleString()} reviews</div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-4 text-sm text-gray-700">
                <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded"><span>Cleanliness</span> <span className="font-bold">9.4</span></div>
                <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded"><span>Service</span> <span className="font-bold">9.2</span></div>
                <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded"><span>Amenities</span> <span className="font-bold">9.0</span></div>
                <div className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded"><span>Location</span> <span className="font-bold">9.6</span></div>
            </div>
          </div>

          <div className="flex flex-col gap-6 mt-4">
              {stay.reviews.map((rev) => (
                <div key={rev.id} className="pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg border border-gray-200">
                        {rev.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{rev.userName}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{rev.userCountry} • {rev.date}</p>
                      </div>
                    </div>
                    <div className="bg-booking-blue/10 text-booking-blue font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                      {rev.rating}/10
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mt-3 leading-relaxed">"{rev.comment}"</p>
                </div>
              ))}
          </div>
        </div>

        {/* Amenities */}
        <div id="amenities" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Amenities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
            {stay.features.map(f => (
              <div key={f} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Check className="h-4 w-4 text-green-600 shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
