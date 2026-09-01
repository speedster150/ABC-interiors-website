/**
 * ==========================================================================
 * ABC INTERIORS — CENTRALIZED BUSINESS CONFIGURATION
 * ==========================================================================
 * Edit the details below. Any change made in this single file will
 * automatically update across the entire website (Header, Hero, Contact,
 * Enquiry Section, Popup, Footer, and Links).
 */

const BUSINESS_CONFIG = {
  // 1. Brand & Identity
  brandName: "ABC Interiors",
  brandTitleHtml: 'ABC <span>INTERIORS</span>',
  tagline: "Bespoke interior design and turnkey execution studio bringing warmth, sophistication, and function to modern Indian homes in Tirupati.",
  locationSubtitle: "Tirupati • Andhra Pradesh",
  city: "Tirupati",
  state: "Andhra Pradesh",
  country: "India",
  heroEyebrow: "TIRUPATI • INTERIOR DESIGN",

  // 2. Primary Contact Details
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210", // Used for tel: links
  whatsapp: "+91 98765 43210",
  whatsappRaw: "919876543210", // Used for https://wa.me/ links
  email: "contact@abcinteriors.com",

  // 3. Studio Physical Address & Operating Hours
  address: {
    name: "ABC Interiors Studio",
    full: "ABC Interiors, AIR Bypass Road, Tirupati, AP 517501",
    line1: "AIR Bypass Road",
    cityStateZip: "Tirupati, AP 517501",
    region: "Tirupati, Andhra Pradesh, India"
  },
  workingHours: "Mon – Sat: 9:30 AM – 7:30 PM",

  // 4. Social Media Links & Chat
  socialLinks: {
    instagram: "https://instagram.com/abcinteriors_official",
    facebook: "https://facebook.com/abcinteriorstirupati",
    linkedin: "https://linkedin.com/company/abc-interiors",
    youtube: "https://youtube.com/@abcinteriors",
    whatsappChat: "https://wa.me/919876543210?text=Hi%20ABC%20Interiors,%20I%20would%20like%20to%20inquire%20about%20interior%20design%20services"
  },

  // 5. Trust Badges & Metrics
  stats: {
    heroStatBadge: "150+ Tirupati Homes Transformed",
    warranty: "10-Year Warranty",
    handoverDays: "45-Day Handover"
  },

  // 6. Copyright & Legal
  copyrightYear: 2026,
  copyrightText: "© 2026 ABC Interiors. All rights reserved. Designed for excellence."
};

// Expose globally for browser scripts
if (typeof window !== "undefined") {
  window.BUSINESS_CONFIG = BUSINESS_CONFIG;
}
