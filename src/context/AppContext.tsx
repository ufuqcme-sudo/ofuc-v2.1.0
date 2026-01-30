import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Package, Order, Testimonial, AdminSettings, 
  TeamMember, Service, Specialty, FAQ, Statistic, 
  Feature, SocialLink, ContactInfo, SiteSettings 
} from '@/types';

interface AppContextType {
  // Packages
  packages: Package[];
  setPackages: React.Dispatch<React.SetStateAction<Package[]>>;
  addPackage: (pkg: Package) => void;
  updatePackage: (pkg: Package) => void;
  deletePackage: (id: string) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  
  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Testimonial) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  
  // Team Members
  teamMembers: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (member: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  
  // Services
  services: Service[];
  addService: (service: Service) => void;
  updateService: (service: Service) => void;
  deleteService: (id: string) => void;
  
  // Specialties
  specialties: Specialty[];
  addSpecialty: (specialty: Specialty) => void;
  updateSpecialty: (specialty: Specialty) => void;
  deleteSpecialty: (id: string) => void;
  
  // FAQs
  faqs: FAQ[];
  addFAQ: (faq: FAQ) => void;
  updateFAQ: (faq: FAQ) => void;
  deleteFAQ: (id: string) => void;
  
  // Statistics
  statistics: Statistic[];
  setStatistics: React.Dispatch<React.SetStateAction<Statistic[]>>;
  
  // Features
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  
  // Social Links
  socialLinks: SocialLink[];
  setSocialLinks: React.Dispatch<React.SetStateAction<SocialLink[]>>;
  
  // Contact Info
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
  
  // Site Settings
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  
  // Admin Settings
  adminSettings: AdminSettings;
  setAdminSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
  
  // Auth
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

// Default Data
const defaultPackages: Package[] = [
  {
    id: '1',
    name: 'الباقة الأساسية',
    description: 'مثالية للمبتدئين في المجال الصحي',
    hours: 10,
    price: 500,
    features: ['10 ساعات تدريبية', 'شهادة إتمام معتمدة', 'دعم فني عبر الواتساب', 'مواد تعليمية PDF'],
  },
  {
    id: '2',
    name: 'الباقة المتقدمة',
    description: 'للممارسين الصحيين المتوسطين',
    hours: 25,
    price: 1100,
    isPopular: true,
    features: ['25 ساعة تدريبية', 'شهادة معتمدة دولياً', 'دعم مباشر 24/7', 'ورش عمل تفاعلية', 'جلسات إرشادية فردية'],
  },
  {
    id: '3',
    name: 'الباقة الاحترافية',
    description: 'للمتخصصين والخبراء',
    hours: 50,
    price: 2000,
    features: ['50 ساعة تدريبية', 'شهادة احترافية دولية', 'إرشاد شخصي 1:1', 'وصول مدى الحياة', 'عضوية VIP'],
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'د. سارة أحمد',
    role: 'طبيبة أسنان',
    content: 'تجربة رائعة ومميزة مع منصة أُفُق! المحتوى عالي الجودة والمدربين محترفين.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'أ. محمد خالد',
    role: 'ممرض أول',
    content: 'استفدت كثيراً من الباقة المتقدمة. المرونة في المواعيد ساعدتني على التعلم بجانب عملي.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop',
    createdAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'د. فاطمة العلي',
    role: 'صيدلانية إكلينيكية',
    content: 'الشهادة المعتمدة أضافت قيمة كبيرة لسيرتي الذاتية وساعدتني في الحصول على ترقية.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=300&fit=crop',
    createdAt: '2024-02-01T09:15:00Z',
  },
];

const defaultTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'د. أحمد محمد الراشد',
    role: 'المؤسس والرئيس التنفيذي',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    bio: 'خبير في التعليم الصحي بخبرة تزيد عن 15 عاماً',
  },
  {
    id: '2',
    name: 'د. سارة أحمد العتيبي',
    role: 'المدير الأكاديمي',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    bio: 'متخصصة في تطوير المناهج الصحية',
  },
  {
    id: '3',
    name: 'أ. خالد سعد المالكي',
    role: 'مدير العمليات',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    bio: 'خبير في إدارة المشاريع التعليمية',
  },
];

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'التدريب المهني المتخصص',
    description: 'برامج تدريبية معتمدة مصممة لتطوير مهاراتك في مجالك الصحي',
    icon: 'GraduationCap',
    features: ['مناهج محدثة', 'شهادات معتمدة', 'مدربين خبراء'],
    color: 'teal',
  },
  {
    id: '2',
    title: 'الإرشاد المهني',
    description: 'جلسات إرشادية فردية مع خبراء لتوجيه مسارك المهني',
    icon: 'Users',
    features: ['جلسات 1:1', 'خطة تطوير', 'متابعة مستمرة'],
    color: 'emerald',
  },
  {
    id: '3',
    title: 'ورش العمل التفاعلية',
    description: 'ورش عمل عملية تفاعلية لتطبيق ما تتعلمه',
    icon: 'Lightbulb',
    features: ['تطبيق عملي', 'نقاشات حية', 'شهادات حضور'],
    color: 'cyan',
  },
];

const defaultSpecialties: Specialty[] = [
  { id: '1', name: 'الطب العام', icon: 'Stethoscope', description: 'برامج للأطباء العموميين' },
  { id: '2', name: 'طب الأسنان', icon: 'Smile', description: 'برامج لأطباء الأسنان' },
  { id: '3', name: 'التمريض', icon: 'Heart', description: 'برامج للممرضين والممرضات' },
  { id: '4', name: 'الصيدلة', icon: 'Pill', description: 'برامج للصيادلة' },
  { id: '5', name: 'العلاج الطبيعي', icon: 'Activity', description: 'برامج للمعالجين' },
  { id: '6', name: 'التغذية العلاجية', icon: 'Apple', description: 'برامج لأخصائيي التغذية' },
];

const defaultFAQs: FAQ[] = [
  {
    id: '1',
    question: 'كيف يمكنني التسجيل في الدورات؟',
    answer: 'يمكنك التسجيل بسهولة من خلال صفحة الحجز، اختر الباقة المناسبة وأدخل بياناتك.',
    category: 'التسجيل',
  },
  {
    id: '2',
    question: 'هل الشهادات معتمدة؟',
    answer: 'نعم، جميع شهاداتنا معتمدة من الجهات الصحية المختصة.',
    category: 'الشهادات',
  },
  {
    id: '3',
    question: 'ما هي طرق الدفع المتاحة؟',
    answer: 'نقبل الدفع عبر التحويل البنكي وسيتم إضافة طرق دفع إلكترونية قريباً.',
    category: 'الدفع',
  },
  {
    id: '4',
    question: 'هل يمكنني استرداد المبلغ؟',
    answer: 'نعم، يمكنك استرداد المبلغ خلال 7 أيام من التسجيل إذا لم تبدأ الدورة.',
    category: 'الدفع',
  },
];

const defaultStatistics: Statistic[] = [
  { id: '1', value: '+2500', label: 'متدرب', icon: 'Users' },
  { id: '2', value: '+150', label: 'دورة تدريبية', icon: 'BookOpen' },
  { id: '3', value: '+50', label: 'مدرب معتمد', icon: 'Award' },
  { id: '4', value: '98%', label: 'رضا العملاء', icon: 'ThumbsUp' },
];

const defaultFeatures: Feature[] = [
  { id: '1', title: 'مرونة في التعلم', description: 'تعلم في أي وقت ومن أي مكان', icon: 'Clock' },
  { id: '2', title: 'شهادات معتمدة', description: 'شهادات معترف بها من الجهات الصحية', icon: 'Award' },
  { id: '3', title: 'دعم مستمر', description: 'فريق دعم متاح على مدار الساعة', icon: 'Headphones' },
  { id: '4', title: 'محتوى محدث', description: 'مناهج تدريبية محدثة باستمرار', icon: 'RefreshCw' },
];

const defaultSocialLinks: SocialLink[] = [
  { id: '1', platform: 'تويتر', url: 'https://twitter.com/ufuq', icon: 'Twitter' },
  { id: '2', platform: 'انستغرام', url: 'https://instagram.com/ufuq', icon: 'Instagram' },
  { id: '3', platform: 'لينكدإن', url: 'https://linkedin.com/company/ufuq', icon: 'Linkedin' },
  { id: '4', platform: 'يوتيوب', url: 'https://youtube.com/ufuq', icon: 'Youtube' },
];

const defaultContactInfo: ContactInfo = {
  phone: '+966 50 123 4567',
  email: 'info@ufuq-health.com',
  whatsapp: '966501234567',
  address: 'الرياض، المملكة العربية السعودية',
  workingHours: {
    weekdays: '8:00 صباحاً - 10:00 مساءً',
    weekend: '10:00 صباحاً - 6:00 مساءً',
  },
};

const defaultSiteSettings: SiteSettings = {
  siteName: 'أُفُق',
  siteDescription: 'منصة التدريب الصحي الأولى في المملكة',
  heroTitle: 'انطلق نحو أُفُق جديد في مسيرتك الصحية',
  heroSubtitle: 'منصة تدريبية متكاملة تمكّن الممارسين الصحيين من تطوير مهاراتهم والحصول على شهادات معتمدة تعزز مسيرتهم المهنية',
  aboutTitle: 'من نحن',
  aboutDescription: 'أُفُق هي منصة سعودية رائدة متخصصة في التدريب والتطوير المهني للكوادر الصحية',
  vision: 'أن نكون المنصة الرائدة في تمكين الكوادر الصحية عربياً',
  mission: 'تقديم تدريب صحي عالي الجودة يواكب أحدث المعايير العالمية',
  footerText: 'جميع الحقوق محفوظة © 2024 أُفُق للتدريب الصحي',
};

const defaultAdminSettings: AdminSettings = {
  hourlyRate: 50,
  whatsappNumber: '966501234567',
  adminPassword: 'admin123',
  currency: 'ريال',
  emailNotifications: true,
  maintenanceMode: false,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // State initialization with localStorage
  const [packages, setPackages] = useState<Package[]>(() => {
    const saved = localStorage.getItem('ufuq_packages');
    return saved ? JSON.parse(saved) : defaultPackages;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ufuq_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('ufuq_testimonials');
    return saved ? JSON.parse(saved) : defaultTestimonials;
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem('ufuq_team');
    return saved ? JSON.parse(saved) : defaultTeamMembers;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('ufuq_services');
    return saved ? JSON.parse(saved) : defaultServices;
  });

  const [specialties, setSpecialties] = useState<Specialty[]>(() => {
    const saved = localStorage.getItem('ufuq_specialties');
    return saved ? JSON.parse(saved) : defaultSpecialties;
  });

  const [faqs, setFaqs] = useState<FAQ[]>(() => {
    const saved = localStorage.getItem('ufuq_faqs');
    return saved ? JSON.parse(saved) : defaultFAQs;
  });

  const [statistics, setStatistics] = useState<Statistic[]>(() => {
    const saved = localStorage.getItem('ufuq_statistics');
    return saved ? JSON.parse(saved) : defaultStatistics;
  });

  const [features, setFeatures] = useState<Feature[]>(() => {
    const saved = localStorage.getItem('ufuq_features');
    return saved ? JSON.parse(saved) : defaultFeatures;
  });

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const saved = localStorage.getItem('ufuq_social');
    return saved ? JSON.parse(saved) : defaultSocialLinks;
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() => {
    const saved = localStorage.getItem('ufuq_contact');
    return saved ? JSON.parse(saved) : defaultContactInfo;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('ufuq_site');
    return saved ? JSON.parse(saved) : defaultSiteSettings;
  });

  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    const saved = localStorage.getItem('ufuq_admin_settings');
    return saved ? JSON.parse(saved) : defaultAdminSettings;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('ufuq_admin_logged') === 'true';
  });

  // Save to localStorage effects
  useEffect(() => { localStorage.setItem('ufuq_packages', JSON.stringify(packages)); }, [packages]);
  useEffect(() => { localStorage.setItem('ufuq_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('ufuq_testimonials', JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem('ufuq_team', JSON.stringify(teamMembers)); }, [teamMembers]);
  useEffect(() => { localStorage.setItem('ufuq_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('ufuq_specialties', JSON.stringify(specialties)); }, [specialties]);
  useEffect(() => { localStorage.setItem('ufuq_faqs', JSON.stringify(faqs)); }, [faqs]);
  useEffect(() => { localStorage.setItem('ufuq_statistics', JSON.stringify(statistics)); }, [statistics]);
  useEffect(() => { localStorage.setItem('ufuq_features', JSON.stringify(features)); }, [features]);
  useEffect(() => { localStorage.setItem('ufuq_social', JSON.stringify(socialLinks)); }, [socialLinks]);
  useEffect(() => { localStorage.setItem('ufuq_contact', JSON.stringify(contactInfo)); }, [contactInfo]);
  useEffect(() => { localStorage.setItem('ufuq_site', JSON.stringify(siteSettings)); }, [siteSettings]);
  useEffect(() => { localStorage.setItem('ufuq_admin_settings', JSON.stringify(adminSettings)); }, [adminSettings]);

  // Package functions
  const addPackage = (pkg: Package) => setPackages(prev => [...prev, pkg]);
  const updatePackage = (pkg: Package) => setPackages(prev => prev.map(p => p.id === pkg.id ? pkg : p));
  const deletePackage = (id: string) => setPackages(prev => prev.filter(p => p.id !== id));

  // Order functions
  const addOrder = (order: Order) => setOrders(prev => [...prev, order]);
  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => order.id === id ? { ...order, status } : order));
  };
  const deleteOrder = (id: string) => setOrders(prev => prev.filter(o => o.id !== id));

  // Testimonial functions
  const addTestimonial = (testimonial: Testimonial) => setTestimonials(prev => [...prev, testimonial]);
  const updateTestimonial = (testimonial: Testimonial) => {
    setTestimonials(prev => prev.map(t => t.id === testimonial.id ? testimonial : t));
  };
  const deleteTestimonial = (id: string) => setTestimonials(prev => prev.filter(t => t.id !== id));

  // Team functions
  const addTeamMember = (member: TeamMember) => setTeamMembers(prev => [...prev, member]);
  const updateTeamMember = (member: TeamMember) => {
    setTeamMembers(prev => prev.map(m => m.id === member.id ? member : m));
  };
  const deleteTeamMember = (id: string) => setTeamMembers(prev => prev.filter(m => m.id !== id));

  // Service functions
  const addService = (service: Service) => setServices(prev => [...prev, service]);
  const updateService = (service: Service) => {
    setServices(prev => prev.map(s => s.id === service.id ? service : s));
  };
  const deleteService = (id: string) => setServices(prev => prev.filter(s => s.id !== id));

  // Specialty functions
  const addSpecialty = (specialty: Specialty) => setSpecialties(prev => [...prev, specialty]);
  const updateSpecialty = (specialty: Specialty) => {
    setSpecialties(prev => prev.map(s => s.id === specialty.id ? specialty : s));
  };
  const deleteSpecialty = (id: string) => setSpecialties(prev => prev.filter(s => s.id !== id));

  // FAQ functions
  const addFAQ = (faq: FAQ) => setFaqs(prev => [...prev, faq]);
  const updateFAQ = (faq: FAQ) => setFaqs(prev => prev.map(f => f.id === faq.id ? faq : f));
  const deleteFAQ = (id: string) => setFaqs(prev => prev.filter(f => f.id !== id));

  // Auth functions
  const login = (password: string): boolean => {
    if (password === adminSettings.adminPassword) {
      setIsAdmin(true);
      localStorage.setItem('ufuq_admin_logged', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('ufuq_admin_logged');
  };

  return (
    <AppContext.Provider
      value={{
        packages, setPackages, addPackage, updatePackage, deletePackage,
        orders, addOrder, updateOrderStatus, deleteOrder,
        testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
        teamMembers, addTeamMember, updateTeamMember, deleteTeamMember,
        services, addService, updateService, deleteService,
        specialties, addSpecialty, updateSpecialty, deleteSpecialty,
        faqs, addFAQ, updateFAQ, deleteFAQ,
        statistics, setStatistics,
        features, setFeatures,
        socialLinks, setSocialLinks,
        contactInfo, setContactInfo,
        siteSettings, setSiteSettings,
        adminSettings, setAdminSettings,
        isAdmin, login, logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
