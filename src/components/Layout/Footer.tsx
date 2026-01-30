import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Instagram, 
  Twitter, 
  Linkedin,
  Heart,
  ArrowUp
} from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16"
        >
          {/* About */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">أ</span>
              </div>
              <div>
                <span className="text-2xl font-bold">أُفُق</span>
                <p className="text-xs text-gray-400">منصة التدريب الصحي</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              منصة أُفُق هي منصة تدريب صحي متخصصة تهدف لتمكين الممارسين الصحيين 
              من تطوير مهاراتهم والحصول على شهادات معتمدة في مختلف التخصصات الصحية.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: '#', label: 'تويتر' },
                { icon: Instagram, href: '#', label: 'انستغرام' },
                { icon: Linkedin, href: '#', label: 'لينكدإن' },
                { icon: MessageCircle, href: '#', label: 'واتساب' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/5 hover:bg-gradient-to-br hover:from-teal-500 hover:to-emerald-500 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  title={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-6">روابط سريعة</h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'الرئيسية' },
                { to: '/about', label: 'من نحن' },
                { to: '/services', label: 'خدماتنا' },
                { to: '/booking', label: 'احجز الآن' },
                { to: '/testimonials', label: 'آراء المتدربين' },
                { to: '/contact', label: 'تواصل معنا' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-teal-400 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-6">خدماتنا</h3>
            <ul className="space-y-3">
              {[
                'دورات تدريبية صحية',
                'شهادات معتمدة',
                'ورش عمل تفاعلية',
                'إرشاد مهني',
                'تدريب عملي',
                'مجتمع الخريجين',
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="font-bold text-lg mb-6">تواصل معنا</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+966501234567" 
                  className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/5 group-hover:bg-teal-500/20 rounded-lg flex items-center justify-center transition-colors">
                    <Phone size={18} className="text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">اتصل بنا</p>
                    <span dir="ltr" className="text-sm">+966 50 123 4567</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@ufuq.sa" 
                  className="flex items-center gap-3 text-gray-400 hover:text-teal-400 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white/5 group-hover:bg-teal-500/20 rounded-lg flex items-center justify-center transition-colors">
                    <Mail size={18} className="text-teal-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">البريد الإلكتروني</p>
                    <span className="text-sm">info@ufuq.sa</span>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                  <MapPin size={18} className="text-teal-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">العنوان</p>
                  <span className="text-sm">الرياض، المملكة العربية السعودية</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-800/50 py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-1">اشترك في نشرتنا البريدية</h4>
              <p className="text-gray-400 text-sm">احصل على آخر الأخبار والعروض الحصرية</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 md:w-64 px-4 py-3 bg-white/5 border border-gray-700 rounded-xl text-sm focus:outline-none focus:border-teal-500 transition-colors"
                dir="ltr"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-gradient-to-l from-teal-500 to-emerald-500 text-white rounded-xl text-sm font-medium hover:from-teal-600 hover:to-emerald-600 transition-all"
              >
                اشترك
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-1">
              © {new Date().getFullYear()} أُفُق. جميع الحقوق محفوظة. صُنع بـ 
              <Heart size={14} className="text-red-500 fill-red-500 mx-1" />
              في السعودية
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-teal-400 transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-teal-400 transition-colors">الشروط والأحكام</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-full shadow-lg shadow-teal-500/30 flex items-center justify-center z-40 hover:shadow-teal-500/50 transition-shadow"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
