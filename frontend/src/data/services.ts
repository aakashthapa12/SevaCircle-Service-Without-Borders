export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  bookings: number;
  tags: string[];
  image: string;
  includes: string[];
  addOns?: {
    id: string;
    name: string;
    price: number;
    description: string;
  }[];
  popular?: boolean;
  discount?: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
  serviceCount: number;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "cleaning",
    name: "Home Cleaning",
    icon: "🏠",
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    description: "Professional home cleaning services",
    serviceCount: 15
  },
  {
    id: "beauty",
    name: "Beauty & Spa",
    icon: "💄",
    color: "pink",
    gradient: "from-pink-500 to-rose-500",
    description: "Beauty and wellness services at home",
    serviceCount: 12
  },
  {
    id: "repairs",
    name: "Repairs & Maintenance",
    icon: "🔧",
    color: "orange",
    gradient: "from-orange-500 to-red-500",
    description: "Expert repair and maintenance services",
    serviceCount: 20
  },
  {
    id: "appliances",
    name: "Appliance Repair",
    icon: "🔌",
    color: "green",
    gradient: "from-green-500 to-emerald-500",
    description: "Professional appliance repair services",
    serviceCount: 18
  },
  {
    id: "pest-control",
    name: "Pest Control",
    icon: "🐛",
    color: "purple",
    gradient: "from-purple-500 to-indigo-500",
    description: "Effective pest control solutions",
    serviceCount: 8
  },
  {
    id: "painting",
    name: "Painting",
    icon: "🎨",
    color: "yellow",
    gradient: "from-yellow-500 to-orange-500",
    description: "Professional painting services",
    serviceCount: 10
  }
];

export const services: ServicePackage[] = [
  // Home Cleaning Services
  {
    id: "bathroom-cleaning",
    name: "Bathroom Deep Cleaning",
    description: "Complete bathroom sanitization with premium products",
    category: "cleaning",
    icon: "🛁",
    price: 599,
    originalPrice: 799,
    duration: "2-3 hours",
    rating: 4.8,
    bookings: 15420,
    tags: ["deep-cleaning", "sanitization", "premium"],
    image: "/placeholder-service.jpg",
    includes: [
      "Toilet deep cleaning & sanitization",
      "Tiles & grout cleaning",
      "Mirror & fixture polishing",
      "Floor mopping & disinfection",
      "Drain cleaning"
    ],
    addOns: [
      { id: "exhaust-fan", name: "Exhaust Fan Cleaning", price: 199, description: "Deep clean exhaust fan" },
      { id: "water-tank", name: "Water Tank Cleaning", price: 299, description: "Overhead tank sanitization" }
    ],
    popular: true,
    discount: 25
  },
  {
    id: "kitchen-cleaning",
    name: "Kitchen Deep Cleaning",
    description: "Complete kitchen cleaning including appliances",
    category: "cleaning",
    price: 799,
    originalPrice: 999,
    duration: "3-4 hours",
    rating: 4.9,
    bookings: 18750,
    tags: ["deep-cleaning", "appliances", "degreasing"],
    image: "/placeholder-service.jpg",
    includes: [
      "Chimney & hob deep cleaning",
      "Microwave interior cleaning",
      "Cabinet & drawer sanitization",
      "Platform & sink deep cleaning",
      "Floor scrubbing & mopping"
    ],
    addOns: [
      { id: "fridge-cleaning", name: "Refrigerator Deep Clean", price: 399, description: "Inside & outside cleaning" },
      { id: "oven-cleaning", name: "Oven Deep Cleaning", price: 299, description: "Complete oven sanitization" }
    ],
    popular: true,
    discount: 20
  },
  {
    id: "sofa-cleaning",
    name: "Sofa Deep Cleaning",
    description: "Professional sofa cleaning with dry foam technology",
    category: "cleaning",
    price: 449,
    duration: "1-2 hours",
    rating: 4.7,
    bookings: 12380,
    tags: ["fabric-care", "stain-removal", "dry-cleaning"],
    image: "/placeholder-service.jpg",
    includes: [
      "Vacuum cleaning",
      "Stain pre-treatment",
      "Dry foam cleaning",
      "Fabric protection spray",
      "Drying & final cleanup"
    ],
    addOns: [
      { id: "cushion-covers", name: "Cushion Cover Washing", price: 99, description: "Per cover washing" }
    ]
  },
  {
    id: "full-home-cleaning",
    name: "Full Home Deep Cleaning",
    description: "Complete home cleaning service for all rooms",
    category: "cleaning",
    price: 1299,
    originalPrice: 1699,
    duration: "4-6 hours",
    rating: 4.8,
    bookings: 9240,
    tags: ["comprehensive", "all-rooms", "premium"],
    image: "/placeholder-service.jpg",
    includes: [
      "All rooms deep cleaning",
      "Kitchen & bathroom sanitization",
      "Floor mopping & polishing",
      "Dusting all surfaces",
      "Trash removal"
    ],
    popular: true,
    discount: 23
  },

  // Beauty & Spa Services
  {
    id: "haircut-styling",
    name: "Hair Cut & Styling",
    description: "Professional haircut and styling at home",
    category: "beauty",
    price: 349,
    duration: "45 mins",
    rating: 4.6,
    bookings: 8920,
    tags: ["haircut", "styling", "unisex"],
    image: "/placeholder-service.jpg",
    includes: [
      "Consultation & hair analysis",
      "Professional haircut",
      "Hair wash & conditioning",
      "Blow dry & styling",
      "Hair care tips"
    ],
    popular: true
  },
  {
    id: "facial-cleanup",
    name: "Facial & Cleanup",
    description: "Rejuvenating facial with professional products",
    category: "beauty",
    price: 699,
    originalPrice: 899,
    duration: "60 mins",
    rating: 4.8,
    bookings: 11200,
    tags: ["facial", "skincare", "cleanup"],
    image: "/placeholder-service.jpg",
    includes: [
      "Skin analysis",
      "Deep cleansing",
      "Exfoliation & extraction",
      "Face mask application",
      "Moisturizing & sun protection"
    ],
    addOns: [
      { id: "head-massage", name: "Head Massage", price: 199, description: "Relaxing head massage" }
    ],
    discount: 22
  },
  {
    id: "pedicure-manicure",
    name: "Pedicure & Manicure",
    description: "Complete nail care and beautification service",
    category: "beauty",
    price: 599,
    originalPrice: 749,
    duration: "90 mins",
    rating: 4.7,
    bookings: 7650,
    tags: ["nail-care", "beautification", "hygiene"],
    image: "/placeholder-service.jpg",
    includes: [
      "Nail cutting & shaping",
      "Cuticle care",
      "Exfoliation & scrub",
      "Moisturizing treatment",
      "Nail polish application"
    ],
    discount: 20
  },

  // Repairs & Maintenance
  {
    id: "plumbing-repair",
    name: "Plumbing Repair",
    description: "Expert plumbing solutions for all issues",
    category: "repairs",
    price: 299,
    duration: "1-2 hours",
    rating: 4.5,
    bookings: 9840,
    tags: ["plumbing", "repair", "emergency"],
    image: "/placeholder-service.jpg",
    includes: [
      "Problem diagnosis",
      "Basic repair work",
      "Quality parts replacement",
      "Testing & verification",
      "Cleanup after service"
    ],
    addOns: [
      { id: "pipe-replacement", name: "Pipe Replacement", price: 199, description: "Per feet pipe replacement" }
    ]
  },
  {
    id: "electrical-repair",
    name: "Electrical Repair",
    description: "Safe and reliable electrical repair services",
    category: "repairs",
    price: 249,
    duration: "1-2 hours",
    rating: 4.6,
    bookings: 7650,
    tags: ["electrical", "safety", "certified"],
    image: "/placeholder-service.jpg",
    includes: [
      "Electrical safety check",
      "Problem identification",
      "Component replacement",
      "Circuit testing",
      "Safety certification"
    ]
  },
  {
    id: "carpentry-service",
    name: "Carpentry Service",
    description: "Professional carpentry and furniture repair",
    category: "repairs",
    price: 399,
    duration: "2-3 hours",
    rating: 4.4,
    bookings: 5420,
    tags: ["carpentry", "furniture", "repair"],
    image: "/placeholder-service.jpg",
    includes: [
      "Furniture assessment",
      "Repair & restoration",
      "Wood treatment",
      "Hardware replacement",
      "Finishing touches"
    ]
  },

  // Appliance Repair
  {
    id: "ac-service",
    name: "AC Service & Repair",
    description: "Complete AC maintenance and repair service",
    category: "appliances",
    price: 449,
    originalPrice: 599,
    duration: "2-3 hours",
    rating: 4.7,
    bookings: 13590,
    tags: ["ac-repair", "maintenance", "cooling"],
    image: "/placeholder-service.jpg",
    includes: [
      "Complete AC inspection",
      "Filter cleaning/replacement",
      "Coil cleaning",
      "Gas pressure check",
      "Performance testing"
    ],
    addOns: [
      { id: "gas-refill", name: "Gas Refilling", price: 1299, description: "AC gas refilling service" }
    ],
    popular: true,
    discount: 25
  },
  {
    id: "washing-machine-repair",
    name: "Washing Machine Repair",
    description: "Expert washing machine diagnosis and repair",
    category: "appliances",
    price: 349,
    duration: "1-2 hours",
    rating: 4.5,
    bookings: 8240,
    tags: ["washing-machine", "repair", "service"],
    image: "/placeholder-service.jpg",
    includes: [
      "Complete diagnosis",
      "Component repair/replacement",
      "Performance testing",
      "Maintenance tips",
      "Service warranty"
    ]
  },
  {
    id: "refrigerator-repair",
    name: "Refrigerator Repair",
    description: "Professional refrigerator repair and maintenance",
    category: "appliances",
    price: 399,
    duration: "1-2 hours",
    rating: 4.6,
    bookings: 6830,
    tags: ["refrigerator", "cooling", "repair"],
    image: "/placeholder-service.jpg",
    includes: [
      "Cooling system check",
      "Compressor inspection",
      "Thermostat testing",
      "Door seal replacement",
      "Energy efficiency tips"
    ]
  },

  // Pest Control
  {
    id: "cockroach-treatment",
    name: "Cockroach Control Treatment",
    description: "Effective cockroach elimination with 3 months warranty",
    category: "pest-control",
    price: 899,
    originalPrice: 1199,
    duration: "2-3 hours",
    rating: 4.8,
    bookings: 5420,
    tags: ["pest-control", "cockroach", "warranty"],
    image: "/placeholder-service.jpg",
    includes: [
      "Complete inspection",
      "Gel baiting treatment",
      "Spray treatment in cracks",
      "3 months warranty",
      "Follow-up service"
    ],
    discount: 25
  },
  {
    id: "general-pest-control",
    name: "General Pest Control",
    description: "Comprehensive pest control for all common pests",
    category: "pest-control",
    price: 1299,
    originalPrice: 1599,
    duration: "3-4 hours",
    rating: 4.7,
    bookings: 4830,
    tags: ["comprehensive", "all-pests", "treatment"],
    image: "/placeholder-service.jpg",
    includes: [
      "Multi-pest treatment",
      "Safe chemical spraying",
      "Entry point sealing",
      "6 months warranty",
      "Preventive measures"
    ],
    popular: true,
    discount: 19
  },

  // Painting Services
  {
    id: "wall-painting",
    name: "Wall Painting Service",
    description: "Professional wall painting with premium paints",
    category: "painting",
    price: 12,
    duration: "1-2 days",
    rating: 4.6,
    bookings: 3280,
    tags: ["painting", "walls", "premium"],
    image: "/placeholder-service.jpg",
    includes: [
      "Surface preparation",
      "Primer application",
      "2 coats of paint",
      "Clean finishing",
      "Post-service cleanup"
    ]
  },
  {
    id: "exterior-painting",
    name: "Exterior Painting Service",
    description: "Weather-resistant exterior wall painting",
    category: "painting",
    price: 15,
    duration: "2-3 days", 
    rating: 4.5,
    bookings: 1920,
    tags: ["exterior", "weather-proof", "durable"],
    image: "/placeholder-service.jpg",
    includes: [
      "Surface cleaning & prep",
      "Weather-proof primer",
      "High-quality exterior paint",
      "Professional finishing",
      "Area cleanup"
    ]
  }
];

export const getServicesByCategory = (categoryId: string) => {
  return services.filter(service => service.category === categoryId);
};

export const getPopularServices = () => {
  return services.filter(service => service.popular).slice(0, 6);
};

export const getServiceById = (serviceId: string) => {
  return services.find(service => service.id === serviceId);
};

// Legacy compatibility - keeping the old Service interface for components that still use it
export interface Service {
  id: string;
  name: string;
  icon?: string;
  description: string;
  category: string;
  price: string;
  rating: number;
  bookings: number;
  tags: string[];
  image: string;
  popular: boolean;
}

// Convert new ServicePackage format to old Service format for backward compatibility
export const servicesLegacy: Service[] = services.map(service => ({
  id: service.id,
  name: service.name,
  icon: "🏠", // Default icon
  description: service.description,
  category: service.category,
  price: `₹${service.price}`,
  rating: service.rating,
  bookings: service.bookings,
  tags: service.tags,
  image: service.image,
  popular: service.popular || false
}));
