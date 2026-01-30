import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAdmin, logout } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/about', label: 'من نحن' },
    { path: '/services', label: 'خدماتنا' },
    { path: '/booking', label: 'احجز الآن', highlight: true },
    { path: '/testimonials', label: 'آراء المتدربين' },
    { path: '/contact', label: 'تواصل معنا' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg shadow-gray-200/50' 
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
          <motion.div
            className="h-full bg-gradient-to-l from-teal-500 to-emerald-500"
            style={{ 
              scaleX: 0,
              transformOrigin: 'right'
            }}
            animate={{
              scaleX: typeof window !== 'undefined' ? 
                Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1) : 0
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-11 h-11 bg-gradient-to-br from-teal-500 via-teal-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200 group-hover:shadow-teal-300 transition-shadow"
              >
                <span className="text-white font-bold text-2xl">أ</span>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-l from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  أُفُق
                </span>
                <span className="text-[10px] text-gray-400 -mt-1 hidden sm:block">منصة التدريب الصحي</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      link.highlight && !isActive(link.path)
                        ? 'text-teal-600 bg-teal-50 hover:bg-teal-100'
                        : isActive(link.path)
                        ? 'text-teal-600'
                        : 'text-gray-600 hover:text-teal-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-l from-teal-50 to-emerald-50 rounded-xl -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-l from-teal-50 to-emerald-50 text-teal-700 rounded-xl text-sm font-medium hover:from-teal-100 hover:to-emerald-100 transition-all"
                  >
                    <User size={18} />
                    لوحة التحكم
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="تسجيل خروج"
                  >
                    <LogOut size={18} />
                  </motion.button>
                </div>
              ) : (
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 bg-gradient-to-l from-teal-500 to-emerald-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-teal-200 hover:shadow-teal-300 hover:from-teal-600 hover:to-emerald-600 transition-all"
                  >
                    دخول الأدمن
                  </motion.button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                style={{ top: '64px' }}
              />
              
              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden bg-white border-t shadow-xl overflow-hidden relative z-50"
              >
                <nav className="px-4 py-4 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                          isActive(link.path)
                            ? 'bg-gradient-to-l from-teal-50 to-emerald-50 text-teal-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {link.label}
                        {link.highlight && (
                          <span className="px-2 py-1 bg-teal-100 text-teal-600 text-xs rounded-lg">
                            جديد
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <div className="border-t my-3 pt-3">
                    {isAdmin ? (
                      <>
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-teal-600 rounded-xl hover:bg-teal-50"
                        >
                          <User size={18} />
                          لوحة التحكم
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50"
                        >
                          <LogOut size={18} />
                          تسجيل خروج
                        </button>
                      </>
                    ) : (
                      <Link
                        to="/login"
                        className="block px-4 py-3.5 text-center bg-gradient-to-l from-teal-500 to-emerald-500 text-white rounded-xl text-sm font-medium"
                      >
                        دخول الأدمن
                      </Link>
                    )}
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
    </>
  );
}
