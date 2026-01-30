// API Layer - جاهز للاتصال بـ Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string }> {
  try {
    const token = localStorage.getItem('adminToken');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return { error: error instanceof Error ? error.message : 'حدث خطأ غير متوقع' };
  }
}

// ==================== Auth API ====================
export const authAPI = {
  login: async (password: string) => {
    return apiCall<{ token: string; user: { role: string } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },
  
  verifyToken: async () => {
    return apiCall<{ valid: boolean }>('/auth/verify');
  },
  
  changePassword: async (oldPassword: string, newPassword: string) => {
    return apiCall<{ success: boolean }>('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },
};

// ==================== Orders API ====================
export const ordersAPI = {
  getAll: async () => {
    return apiCall<Order[]>('/orders');
  },
  
  getById: async (id: string) => {
    return apiCall<Order>(`/orders/${id}`);
  },
  
  create: async (order: Omit<Order, 'id' | 'createdAt'>) => {
    return apiCall<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },
  
  updateStatus: async (id: string, status: Order['status']) => {
    return apiCall<Order>(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
  
  delete: async (id: string) => {
    return apiCall<{ success: boolean }>(`/orders/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== Packages API ====================
export const packagesAPI = {
  getAll: async () => {
    return apiCall<Package[]>('/packages');
  },
  
  create: async (pkg: Omit<Package, 'id'>) => {
    return apiCall<Package>('/packages', {
      method: 'POST',
      body: JSON.stringify(pkg),
    });
  },
  
  update: async (id: string, pkg: Partial<Package>) => {
    return apiCall<Package>(`/packages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pkg),
    });
  },
  
  delete: async (id: string) => {
    return apiCall<{ success: boolean }>(`/packages/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== Testimonials API ====================
export const testimonialsAPI = {
  getAll: async () => {
    return apiCall<Testimonial[]>('/testimonials');
  },
  
  create: async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => {
    return apiCall<Testimonial>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(testimonial),
    });
  },
  
  update: async (id: string, testimonial: Partial<Testimonial>) => {
    return apiCall<Testimonial>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(testimonial),
    });
  },
  
  delete: async (id: string) => {
    return apiCall<{ success: boolean }>(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== Team API ====================
export const teamAPI = {
  getAll: async () => {
    return apiCall<TeamMember[]>('/team');
  },
  
  create: async (member: Omit<TeamMember, 'id'>) => {
    return apiCall<TeamMember>('/team', {
      method: 'POST',
      body: JSON.stringify(member),
    });
  },
  
  update: async (id: string, member: Partial<TeamMember>) => {
    return apiCall<TeamMember>(`/team/${id}`, {
      method: 'PUT',
      body: JSON.stringify(member),
    });
  },
  
  delete: async (id: string) => {
    return apiCall<{ success: boolean }>(`/team/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== Services API ====================
export const servicesAPI = {
  getAll: async () => {
    return apiCall<Service[]>('/services');
  },
  
  create: async (service: Omit<Service, 'id'>) => {
    return apiCall<Service>('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  },
  
  update: async (id: string, service: Partial<Service>) => {
    return apiCall<Service>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
  },
  
  delete: async (id: string) => {
    return apiCall<{ success: boolean }>(`/services/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== FAQ API ====================
export const faqAPI = {
  getAll: async () => {
    return apiCall<FAQ[]>('/faq');
  },
  
  create: async (faq: Omit<FAQ, 'id'>) => {
    return apiCall<FAQ>('/faq', {
      method: 'POST',
      body: JSON.stringify(faq),
    });
  },
  
  update: async (id: string, faq: Partial<FAQ>) => {
    return apiCall<FAQ>(`/faq/${id}`, {
      method: 'PUT',
      body: JSON.stringify(faq),
    });
  },
  
  delete: async (id: string) => {
    return apiCall<{ success: boolean }>(`/faq/${id}`, {
      method: 'DELETE',
    });
  },
};

// ==================== Settings API ====================
export const settingsAPI = {
  get: async () => {
    return apiCall<SiteSettings>('/settings');
  },
  
  update: async (settings: Partial<SiteSettings>) => {
    return apiCall<SiteSettings>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

// ==================== Contact API ====================
export const contactAPI = {
  get: async () => {
    return apiCall<ContactInfo>('/contact');
  },
  
  update: async (contact: Partial<ContactInfo>) => {
    return apiCall<ContactInfo>('/contact', {
      method: 'PUT',
      body: JSON.stringify(contact),
    });
  },
  
  sendMessage: async (message: ContactMessage) => {
    return apiCall<{ success: boolean }>('/contact/message', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  },
};

// ==================== Stats API ====================
export const statsAPI = {
  get: async () => {
    return apiCall<Stats>('/stats');
  },
  
  update: async (stats: Partial<Stats>) => {
    return apiCall<Stats>('/stats', {
      method: 'PUT',
      body: JSON.stringify(stats),
    });
  },
};

// ==================== Upload API ====================
export const uploadAPI = {
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('فشل رفع الصورة');
      }
      
      const data = await response.json();
      return { data: data.url as string };
    } catch (error) {
      return { error: error instanceof Error ? error.message : 'فشل رفع الصورة' };
    }
  },
};

// ==================== Types ====================
export interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  healthAuthorityNumber: string;
  specialty: string;
  packageId: string;
  packageName: string;
  hours?: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface Package {
  id: string;
  name: string;
  hours: number;
  price: number;
  features: string[];
  isPopular?: boolean;
  isCustom?: boolean;
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
    email?: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  vision: string;
  mission: string;
  heroTitle: string;
  heroSubtitle: string;
  hourlyRate: number;
  currency: string;
  logo?: string;
  values: { title: string; description: string; icon: string }[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface Stats {
  trainees: number;
  hours: number;
  trainers: number;
  certificates: number;
  rating: number;
  courses: number;
}
