import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Lock, AlertCircle, Eye, EyeOff, Shield, Sparkles } from 'lucide-react';

export function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAdmin } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const success = login(password);
    
    if (success) {
      navigate('/admin');
    } else {
      setError('كلمة المرور غير صحيحة');
    }
    
    setIsLoading(false);
  };

  if (isAdmin) {
    return null;
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-gradient-to-b from-gray-50 to-white">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
          {/* Logo */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-200">
              <Lock className="text-white" size={36} />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">دخول الأدمن</h1>
            <p className="text-gray-500">
              أدخل كلمة المرور للوصول للوحة التحكم
            </p>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700"
            >
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{error}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-12 pl-12 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-lg"
                  placeholder="••••••••"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-l from-teal-500 to-emerald-500 text-white rounded-xl font-semibold text-lg shadow-lg shadow-teal-200 hover:from-teal-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  جاري التحقق...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  دخول
                </>
              )}
            </motion.button>
          </form>

          {/* Hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-4 bg-gradient-to-l from-amber-50 to-yellow-50 rounded-xl border border-amber-100"
          >
            <div className="flex items-start gap-3">
              <Sparkles size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 font-medium mb-1">للتجربة</p>
                <p className="text-sm text-amber-600">
                  كلمة المرور هي: <code className="bg-amber-100 px-2 py-1 rounded font-mono">admin123</code>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-center text-sm text-gray-500 mb-4">مميزات لوحة التحكم</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                'إدارة الطلبات',
                'تعديل الباقات',
                'إعدادات الأسعار',
                'إحصائيات شاملة',
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-6"
        >
          <a 
            href="/" 
            className="text-gray-500 hover:text-teal-600 text-sm transition-colors"
          >
            العودة للصفحة الرئيسية
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
