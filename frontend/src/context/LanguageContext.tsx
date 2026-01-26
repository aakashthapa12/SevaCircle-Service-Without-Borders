"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "hi" | "mr";

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Translation dictionary
const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: "Home",
    login: "Login",
    logout: "Logout",
    book_service: "Book a Service",
    
    // Home page
    home_title: "Find trusted local help near you",
    home_subtitle: "Browse skilled workers and book services instantly",
    services: "Popular Services",
    nearby_workers: "Nearby Workers",
    view_all: "View All",
    
    // Search page
    search_results: "Search Results",
    no_workers: "No workers found",
    sort_by: "Sort by",
    rating: "Rating",
    price: "Price",
    distance: "Distance",
    
    // Worker profile
    about: "About",
    experience: "Experience",
    years: "years",
    rating_count: "Reviews",
    languages: "Languages",
    price_per_visit: "Price per visit",
    book_now: "Book Now",
    verified: "Verified",
    popular: "Popular in your area",
    
    // Booking page
    select_date: "Select Date",
    select_time: "Select Time",
    price_breakdown: "Price Breakdown",
    service_charge: "Service Charge",
    convenience_fee: "Convenience Fee",
    total: "Total Amount",
    confirm_booking: "Confirm Booking",
    booking_confirmed: "Booking Confirmed! 🎉",
    booking_success: "Your booking is confirmed. Worker will contact you soon.",
    
    // Login page
    phone_number: "Phone Number",
    enter_phone: "Enter your phone number",
    send_otp: "Send OTP",
    enter_otp: "Enter OTP",
    verify_otp: "Verify OTP",
    continue: "Continue",
    
    // Footer
    about_us: "About Us",
    contact_us: "Contact Us",
    contact_email: "contact@localservices.com",
    
    // Cards & misc
    verified_badge: "Verified",
    bookings: "Bookings",
    view_profile: "View Profile",
    avg_rating: "Avg Rating",
    language: "Language",
  },
  hi: {
    // Navigation
    home: "होम",
    login: "लॉगिन",
    logout: "लॉगआउट",
    book_service: "सेवा बुक करें",
    
    // Home page
    home_title: "अपने पास के विश्वसनीय स्थानीय सहायता खोजें",
    home_subtitle: "कुशल कार्यकर्ताओं को ब्राउज़ करें और तुरंत सेवाएं बुक करें",
    services: "लोकप्रिय सेवाएं",
    nearby_workers: "पास के कार्यकर्ता",
    view_all: "सभी देखें",
    
    // Search page
    search_results: "खोज परिणाम",
    no_workers: "कोई कार्यकर्ता नहीं मिला",
    sort_by: "के अनुसार सॉर्ट करें",
    rating: "रेटिंग",
    price: "कीमत",
    distance: "दूरी",
    
    // Worker profile
    about: "परिचय",
    experience: "अनुभव",
    years: "साल",
    rating_count: "समीक्षाएं",
    languages: "भाषाएं",
    price_per_visit: "प्रति विजिट मूल्य",
    book_now: "अभी बुक करें",
    verified: "सत्यापित",
    popular: "आपके क्षेत्र में लोकप्रिय",
    
    // Booking page
    select_date: "तारीख चुनें",
    select_time: "समय चुनें",
    price_breakdown: "मूल्य विवरण",
    service_charge: "सेवा शुल्क",
    convenience_fee: "सुविधा शुल्क",
    total: "कुल राशि",
    confirm_booking: "बुकिंग की पुष्टि करें",
    booking_confirmed: "बुकिंग की पुष्टि हुई! 🎉",
    booking_success: "आपकी बुकिंग की पुष्टि हो गई है। कार्यकर्ता जल्द ही आपसे संपर्क करेगा।",
    
    // Login page
    phone_number: "फोन नंबर",
    enter_phone: "अपना फोन नंबर दर्ज करें",
    send_otp: "OTP भेजें",
    enter_otp: "OTP दर्ज करें",
    verify_otp: "OTP की पुष्टि करें",
    continue: "जारी रखें",
    
    // Footer
    about_us: "हमारे बारे में",
    contact_us: "संपर्क करें",
    contact_email: "contact@localservices.com",
    
    // Cards & misc
    verified_badge: "सत्यापित",
    bookings: "बुकिंग",
    view_profile: "प्रोफ़ाइल देखें",
    avg_rating: "औसत रेटिंग",
    language: "भाषा",
  },
  mr: {
    // Navigation
    home: "होम",
    login: "लॉगिन",
    logout: "लॉगआउट",
    book_service: "सेवा बुक करा",
    
    // Home page
    home_title: "आपच्या जवळ विश्वस्त स्थानिक मदत शोधा",
    home_subtitle: "कुशल कामगार ब्राउজ करा आणि लगेच सेवा बुक करा",
    services: "लोकप्रिय सेवा",
    nearby_workers: "जवळपास कामगार",
    view_all: "सर्व पहा",
    
    // Search page
    search_results: "शोध परिणाम",
    no_workers: "कोणतेही कामगार सापडले नाही",
    sort_by: "यानुसार क्रमवारी करा",
    rating: "रेटिंग",
    price: "किंमत",
    distance: "अंतर",
    
    // Worker profile
    about: "बद्दल",
    experience: "अनुभव",
    years: "वर्षे",
    rating_count: "समीक्षा",
    languages: "भाषा",
    price_per_visit: "प्रति भेटी किंमत",
    book_now: "आता बुक करा",
    verified: "सत्यापित",
    popular: "तुमच्या क्षेत्रात लोकप्रिय",
    
    // Booking page
    select_date: "तारीख निवडा",
    select_time: "वेळ निवडा",
    price_breakdown: "किंमत तपशील",
    service_charge: "सेवा शुल्क",
    convenience_fee: "सुविधा शुल्क",
    total: "एकूण रक्कम",
    confirm_booking: "बुकिंग पुष्टी करा",
    booking_confirmed: "बुकिंग पुष्टी झाली! 🎉",
    booking_success: "तुमची बुकिंग पुष्टी झाली. कामगार लगेच तुमच्याशी संपर्क साधेल.",
    
    // Login page
    phone_number: "फोन नंबर",
    enter_phone: "आपला फोन नंबर प्रविष्ट करा",
    send_otp: "OTP पाठवा",
    enter_otp: "OTP प्रविष्ट करा",
    verify_otp: "OTP पुष्टी करा",
    continue: "सुरू ठेवा",
    
    // Footer
    about_us: "आमच्या बद्दल",
    contact_us: "आमच्याशी संपर्क करा",
    contact_email: "contact@localservices.com",
    
    // Cards & misc
    verified_badge: "सत्यापित",
    bookings: "बुकिंग",
    view_profile: "प्रोफाइल पहा",
    avg_rating: "सरासरी रेटिंग",
    language: "भाषा",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && ["en", "hi", "mr"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Always provide the context to children. We initialize with the default
  // language ("en") and update it on mount. This prevents components from
  // attempting to call useLanguage() before the provider exists.
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
