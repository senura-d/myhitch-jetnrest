import { Stay, Review } from '../types';

export const mockTestimonials: Review[] = [
  {
    id: "rev-1",
    userName: "Charlotte Bennett",
    userCountry: "United Kingdom",
    rating: 9.8,
    comment: "The hospitality was extraordinary. From the welcome drinks on arrival to the custom-tailored tasting sessions, every detail spoke of absolute luxury.",
    date: "June 14, 2026"
  },
  {
    id: "rev-2",
    userName: "Alexandre Dubois",
    userCountry: "France",
    rating: 9.6,
    comment: "Desa Potato Head was a magnificent retreat. The sustainable design was breathtaking, and the ocean views from our balcony were magical.",
    date: "May 28, 2026"
  },
  {
    id: "rev-3",
    userName: "Sophia Martinez",
    userCountry: "United States",
    rating: 9.5,
    comment: "The Plaza offered a spectacular experience. The elegant rooms are beautiful, and waking up to Central Park views was unbelievable.",
    date: "June 22, 2026"
  }
];

export const mockDestinations = [
  {
    id: "dest-1",
    name: "Bali",
    country: "Indonesia",
    propertiesCount: 420,
    image: "/destinations/sigiriya.jpg",
    tag: "Tropical Paradise"
  },
  {
    id: "dest-2",
    name: "Paris",
    country: "France",
    propertiesCount: 580,
    image: "/destinations/sunset.jpg",
    tag: "City of Light"
  },
  {
    id: "dest-3",
    name: "Tokyo",
    country: "Japan",
    propertiesCount: 960,
    image: "/destinations/hendrik-cornelissen-jpTT_SAU034-unsplash.jpg",
    tag: "Modern & Traditional"
  },
  {
    id: "dest-4",
    name: "New York",
    country: "USA",
    propertiesCount: 240,
    image: "/destinations/abdulla-faiz-7yPjauuz858-unsplash.jpg",
    tag: "The City That Never Sleeps"
  },
  {
    id: "dest-5",
    name: "Santorini",
    country: "Greece",
    propertiesCount: 350,
    image: "/destinations/sarmat-batagov-cuZbrYoimv8-unsplash.jpg",
    tag: "Iconic Sunsets"
  },
  {
    id: "dest-6",
    name: "Malé",
    country: "Maldives",
    propertiesCount: 480,
    image: "/destinations/sebastian-latorre-VqPOeYqzK-M-unsplash.jpg",
    tag: "Luxury Overwater Villas"
  }
];

export const mockStays: Stay[] = [
  {
    id: "stay-1",
    name: "Desa Potato Head",
    type: "hotel",
    rating: 9.7,
    ratingCount: 312,
    ratingLabel: "Exceptional",
    location: "Seminyak, Bali",
    city: "Bali",
    distance: "Beachfront eco-resort",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200&q=80"
    ],
    description: "Designed by legendary architect Geoffrey Bawa, Heritance Kandalama is an eco-luxury resort built directly into a forest cliffside. Vines drape the building, blending it seamlessly into the jungle. It features 3 infinity pools overlooking the Kandalama Lake, cave dining experiences, and direct encounters with friendly monkeys and exotic birds. A masterpiece of architectural eco-hospitality.",
    pricePerNight: 350,
    features: ["Infinity Pool", "Geoffrey Bawa Design", "Spa & Wellness", "Free WiFi", "Jungle Dining", "Lake View Suites", "Airport Shuttle"],
    badge: "15% Member Discount",
    rooms: [
      {
        id: "stay-1-rm1",
        name: "Superior Double Room with Forest View",
        type: "Double Room",
        capacity: 2,
        pricePerNight: 350,
        amenities: ["King bed", "Forest view", "Rain shower", "Espresso machine", "Free WiFi", "Organic cosmetics"]
      },
      {
        id: "stay-1-rm2",
        name: "Deluxe Panoramic Lake View Suite",
        type: "Suite",
        capacity: 3,
        pricePerNight: 550,
        amenities: ["King bed + Sofa bed", "Panoramic lake views", "Private balcony", "Personal butler service", "Jacuzzi tub", "Welcome coconut arrack"]
      }
    ],
    reviews: [
      {
        id: "stay-1-rev1",
        userName: "Elena Rostova",
        userCountry: "Germany",
        rating: 10,
        comment: "Words cannot describe the beauty of the pool built into the rock face. Floating there while looking at the lake is a memory I will cherish forever.",
        date: "June 10, 2026"
      },
      {
        id: "stay-1-rev2",
        userName: "James Mitchell",
        userCountry: "Canada",
        rating: 9.4,
        comment: "Outstanding service. The staff remembers your preferences and local fruits. Breakfast overlooking the lake was magnificent.",
        date: "May 15, 2026"
      }
    ]
  },
  {
    id: "stay-2",
    name: "Marina Bay Sands",
    type: "resort",
    rating: 9.9,
    ratingCount: 184,
    ratingLabel: "Exceptional",
    location: "Bayfront Avenue, Singapore",
    city: "Singapore",
    distance: "Downtown Core",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80"
    ],
    description: "Cape Weligama is a sanctuary of unparalleled luxury set on a dramatic cliffside overlooking the Indian Ocean. The resort features private villa residences constructed from local stone, each with its own private pool and ocean view terrace. Guests enjoy a massive crescent-shaped infinity pool, cliffside dining, whale watching excursions, and custom Ayurvedic spa treatments.",
    pricePerNight: 750,
    features: ["Crescent Infinity Pool", "Ocean View Villas", "Ayurvedic Spa", "Surf Lessons", "Personal Butler", "Cliffside Dining", "Whale Watching"],
    badge: "Special Package Offer",
    rooms: [
      {
        id: "stay-2-rm1",
        name: "Ocean Villa with Private Pool",
        type: "Ocean Villa",
        capacity: 2,
        pricePerNight: 750,
        amenities: ["Ocean view", "Private pool", "Direct beach access path", "Sunken bathtub", "Outdoor shower", "Local Ceylon tea selection"]
      },
      {
        id: "stay-2-rm2",
        name: "Grand Cape Residence with Infinity Pool",
        type: "Resort Suite",
        capacity: 4,
        pricePerNight: 1200,
        amenities: ["2 King beds", "Private infinity pool", "Spacious terrace", "Butler service", "In-villa private chef", "Welcome champagne"]
      }
    ],
    reviews: [
      {
        id: "stay-2-rev1",
        userName: "Hiroshi Sato",
        userCountry: "Japan",
        rating: 10,
        comment: "Simply heaven on earth. Watching the sunset over the Indian Ocean from the crescent pool was magical. Exceptional service.",
        date: "June 25, 2026"
      }
    ]
  },
  {
    id: "stay-3",
    name: "The Plaza Hotel",
    type: "resort",
    rating: 9.6,
    ratingCount: 142,
    ratingLabel: "Wonderful",
    location: "Fifth Avenue, New York",
    city: "New York",
    distance: "Bordering Central Park",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
      "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=1200&q=80",
      "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?w=1200&q=80"
    ],
    description: "Wild Coast Tented Lodge is a luxury wilderness camp situated where the jungle meets the pristine blue beach of Yala. The lodge features organic cocoon-style tents shaped like boulders, blending in with Yala's rocky landscape. Offers daily private leopard safaris led by expert rangers, wilderness dining under the stars, and free-form swimming pools overlooking the ocean.",
    pricePerNight: 820,
    features: ["Leopard Safaris", "Cocoon Tents", "Beachside Dining", "Free-form Pool", "Free WiFi", "All-Inclusive Safaris"],
    badge: "Complimentary Safaris",
    rooms: [
      {
        id: "stay-3-rm1",
        name: "Cocoon Suite with Private Plunge Pool",
        type: "Luxury Tent",
        capacity: 2,
        pricePerNight: 820,
        amenities: ["King bed", "Copper bathtub", "Private plunge pool", "Air conditioning", "Minibar", "Expert safari ranger guide"]
      },
      {
        id: "stay-3-rm2",
        name: "Family Cocoon Suite with Urchin Chalet",
        type: "Family Tent",
        capacity: 4,
        pricePerNight: 1250,
        amenities: ["King bed + Twin beds", "Soaking tub", "Private viewing deck", "Premium outdoor firepit", "Complimentary game drives"]
      }
    ],
    reviews: [
      {
        id: "stay-3-rev1",
        userName: "Li Wei",
        userCountry: "Singapore",
        rating: 9.8,
        comment: "An oasis of adventure. We saw three leopards on our first safari drive. The copper bath tub is beautiful.",
        date: "April 18, 2026"
      }
    ]
  },
  {
    id: "stay-4",
    name: "Ritz Paris",
    type: "hotel",
    rating: 9.8,
    ratingCount: 220,
    ratingLabel: "Exceptional",
    location: "Place Vendôme, Paris",
    city: "Paris",
    distance: "Heart of Paris",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80"
    ],
    description: "Ceylon Tea Trails is the world's first tea bungalow resort, perched at an altitude of 1,250 meters in Sri Lanka's panoramic tea country. Comprising five historic, colonial-era planter bungalows, the resort offers private planter service, gourmet dining, tea plantation walks, and breathtaking mountain vistas. Pure historic elegance.",
    pricePerNight: 650,
    features: ["Tea Bungalows", "Tea Tasting Walks", "Private Planter Service", "Gourmet Dining", "Croquet Lawns", "Heated Pools"],
    badge: "Recommended Luxury Stay",
    rooms: [
      {
        id: "stay-4-rm1",
        name: "Luxury Garden Suite with Fireplace",
        type: "Luxury Suite",
        capacity: 2,
        pricePerNight: 650,
        amenities: ["Four-poster king bed", "Fireplace", "Garden terrace", "Victorian roll-top tub", "Personal butler service"]
      },
      {
        id: "stay-4-rm2",
        name: "Owner's Cottage with Panoramic Lake View",
        type: "Cottage",
        capacity: 4,
        pricePerNight: 1150,
        amenities: ["2 Bedrooms", "Heated outdoor tub", "Private veranda", "Colonial tea service", "Lake viewpoints"]
      }
    ],
    reviews: [
      {
        id: "stay-4-rev1",
        userName: "Marc Keller",
        userCountry: "Switzerland",
        rating: 9.6,
        comment: "Exceptional service. Waking up to tea served in bed by the butler was the highlight of our trip. Beautiful plantations.",
        date: "January 20, 2026"
      }
    ]
  },
  {
    id: "stay-5",
    name: "Aman Tokyo",
    type: "hotel",
    rating: 9.5,
    ratingCount: 154,
    ratingLabel: "Wonderful",
    location: "Otemachi Tower, Tokyo",
    city: "Tokyo",
    distance: "Near Imperial Palace",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80",
      "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=1200&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1200&q=80"
    ],
    description: "Water Garden Sigiriya is a boutique luxury hotel featuring water villas modeled after the 2,000-year-old water gardens of Sigiriya Fortress. Located in a scenic paddy field setting with lions rocks rising on the horizon, it offers luxury plunge pools, bird watching tours, and modern minimalist design.",
    pricePerNight: 450,
    features: ["Fortress Views", "Water Gardens", "Plunge Pools", "Luxury Spa", "Wildlife Watching", "Private Verandas"],
    badge: "Top Rated Sigiriya Stay",
    rooms: [
      {
        id: "stay-5-rm1",
        name: "Deluxe Villa with Private Plunge Pool",
        type: "Deluxe Villa",
        capacity: 2,
        pricePerNight: 450,
        amenities: ["King bed", "Private heated plunge pool", "Rice paddy views", "Luxury rain shower", "Outdoor dining deck"]
      }
    ],
    reviews: [
      {
        id: "stay-5-rev1",
        userName: "Sophia Loren",
        userCountry: "Italy",
        rating: 10,
        comment: "Breathtaking views of Lion Rock, incredible water canals flowing through the resort, and a plunge pool that made leaving the villa impossible.",
        date: "June 05, 2026"
      }
    ]
  },
  {
    id: "stay-6",
    name: "Katikies",
    type: "resort",
    rating: 9.4,
    ratingCount: 210,
    ratingLabel: "Wonderful",
    location: "Oia, Santorini",
    city: "Santorini",
    distance: "Caldera edge",
    images: [
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=1200&q=80",
      "https://images.unsplash.com/photo-1582610116397-edb318620f90?w=1200&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1200&q=80"
    ],
    description: "98 Acres Resort & Spa is an elegant, eco-friendly hotel located on a scenic 98-acre tea estate in Ella. The resort features chalets constructed from discarded shipping containers and recycled wood, offering panoramic views of Ella Gap and Little Adams Peak. Luxury spa treatments and organic dining are on offer.",
    pricePerNight: 390,
    features: ["Tea Estate Chalets", "Ella Gap Views", "Eco-friendly Design", "Spa & Wellness", "Hiking Paths", "Private Balconies"],
    badge: "Best Mountain View Stay",
    rooms: [
      {
        id: "stay-6-rm1",
        name: "Deluxe Chalet with Mountain View",
        type: "Deluxe Chalet",
        capacity: 2,
        pricePerNight: 390,
        amenities: ["King bed", "Recycled wood design", "Private balcony with gap view", "Open rain shower", "Free WiFi"]
      }
    ],
    reviews: [
      {
        id: "stay-6-rev1",
        userName: "David Beckham",
        userCountry: "USA",
        rating: 9.5,
        comment: "Excellent views of Ella Gap. The design of the chalets is very clever and fits perfectly with the environment. Spa was fantastic.",
        date: "March 02, 2026"
      }
    ]
  }
];

export const mockTrendingDeals = [
  {
    id: "deal-1",
    stayId: "stay-1",
    title: "Kandalama Eco Sanctuary",
    discount: "15% OFF",
    subtitle: "Forest retreats, cave dining, eco-luxury tours.",
    image: "/destinations/abdulla-faiz-7yPjauuz858-unsplash.jpg",
    code: "KANDALAMA15"
  },
  {
    id: "deal-2",
    stayId: "stay-2",
    title: "Weligama Coast Romance",
    discount: "Special Package",
    subtitle: "Includes a sunset ocean cruise and private butler.",
    image: "/destinations/hendrik-cornelissen-jpTT_SAU034-unsplash.jpg",
    code: "WELIGAMAROMANCE"
  },
  {
    id: "deal-3",
    stayId: "stay-3",
    title: "Yala Leopard Safari Journey",
    discount: "Complimentary Safaris",
    subtitle: "Free safari game drives and wilderness dining.",
    image: "/destinations/sarmat-batagov-cuZbrYoimv8-unsplash.jpg",
    code: "YALASAFARI"
  }
];
