export interface Package {
  id: string;
  name: string;
  description: string;
  hours: number;
  price: number;
  features: string[];
  isPopular?: boolean;
  isCustom?: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  healthAuthorityNumber: string;
  specialty: string;
  specialization?: string;
  packageId: string;
  packageName: string;
  totalPrice: number;
  hours: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  color: string;
}

export interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Statistic {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  workingHours: {
    weekdays: string;
    weekend: string;
  };
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: string;
  aboutTitle: string;
  aboutDescription: string;
  vision: string;
  mission: string;
  footerText: string;
}

export interface AdminSettings {
  hourlyRate: number;
  whatsappNumber: string;
  adminPassword: string;
  currency: string;
  emailNotifications: boolean;
  maintenanceMode: boolean;
}
