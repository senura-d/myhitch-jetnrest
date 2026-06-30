export interface Room {
  id: string;
  name: string;
  type: string;
  capacity: number;
  pricePerNight: number;
  amenities: string[];
}

export interface Review {
  id: string;
  userName: string;
  userCountry: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Stay {
  id: string;
  name: string;
  type: 'hotel' | 'resort' | 'villa' | 'apartment' | 'cabin';
  rating: number;
  ratingCount: number;
  ratingLabel: string;
  location: string;
  city: string;
  distance: string;
  images: string[];
  description: string;
  pricePerNight: number;
  features: string[];
  badge?: string;
  rooms: Room[];
  reviews: Review[];
}

export interface SearchQuery {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

export interface BookingDetails {
  stay: Stay;
  room: Room;
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: string;
  totalPrice: number;
  bookingNumber: string;
}
