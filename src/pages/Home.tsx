import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Clock, 
  Award, 
  Users, 
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Shield,
  HeartPulse,
  Target,
  Zap,
  Globe,
  Star,
  Play,
  TrendingUp,
  BookOpen,
  Headphones,
  Phone,
  MessageCircle
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useInView, useCountUp } from '@/hooks/useAnimations';

export function Home() {
  const { testimonials, packages } = useApp();
  const { ref: statsRef, isInView: statsInView } = useInView(0.3);

  const features = [
    {
      icon: Clock,
      title: 'مرونة كاملة',
      description: 'اختر الوقت المناسب لك مع باقات متنوعة بالساعات تناسب جدولك المزدحم',
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-blue-50',
    },
    {
      icon: Award,
      title: 'شهادات معتمدة',
      description: 'احصل على شهادات معترف بها محلياً ودولياً تعزز مسيرتك المهنية',
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
    },
    {
      icon: Users,
      title: 'مدربون خبراء',
      description: 'تعلم من نخبة المتخصصين في المجال الصحي بخبرة تتجاوز 15 عاماً',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-purple-50',
    },
    {
      icon: HeartPulse,
      title: 'محتوى متخصص',
      description: 'مناهج تدريبية حديثة مصممة خصيصاً للممارسين الصحيين',
      color: 'from-teal-500 to-emerald-500',
      bg: 'bg-teal-50',
    },
    {
      icon: Target,
      title: 'تطبيق عملي',
      description: 'تمارين وحالات عملية من الواقع لتطبيق ما تعلمته مباشرة',
      color: 'from-rose-500 to-red-500',
      bg: 'bg-rose-50',
    },
    {
      icon: Headphones,
      title: 'دعم مستمر',
      description: 'فريق دعم فني متاح على مدار الساعة للإجابة على استفساراتك',
      color: 'from-indigo-500 to-violet-500',
      bg: 'bg-indigo-50',
    },
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'متدرب ناجح', icon: Users },
    { value: 50, suffix: '+', label: 'دورة تدريبية', icon: BookOpen },
    { value: 98, suffix: '%', label: 'رضا العملاء', icon: Star },
    { value: 25, suffix: '+', label: 'مدرب خبير', icon: Award },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center bg-gradient-to-bl from-teal-600 via-teal-700 to-emerald-800 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }} />
          </div>

          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 right-1/4 w-20 h-20 bg-white/5 rounded-2xl backdrop-blur-sm hidden lg:block"
          />
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-emerald-400/10 rounded-xl backdrop-blur-sm hidden lg:block"
          />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-6"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Sparkles className="text-yellow-400" size={18} />
                  <span className="text-teal-100 text-sm font-medium">منصة التدريب الصحي الأولى في المملكة</span>
                </div>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              >
                طوّر مهاراتك الصحية
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-yellow-300 via-orange-300 to-yellow-400 animate-gradient">
                  مع أُفُق
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-teal-100 leading-relaxed mb-8 max-w-xl"
              >
                منصة متكاملة لتدريب الممارسين الصحيين. اختر باقتك المناسبة واحصل على 
                تدريب احترافي مع شهادات معتمدة ترتقي بمسيرتك المهنية.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/booking">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-teal-700 rounded-2xl font-bold text-lg shadow-xl shadow-black/10 hover:bg-teal-50 transition-colors"
                  >
                    ابدأ رحلتك الآن
                    <ArrowLeft size={22} />
                  </motion.button>
                </Link>
                <Link to="/testimonials">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <Play size={20} className="fill-current" />
                    شاهد قصص النجاح
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Badges */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-6 mt-10"
              >
                {[
                  { icon: Shield, text: 'دفع آمن 100%' },
                  { icon: Award, text: 'شهادات معتمدة' },
                  { icon: CheckCircle, text: 'ضمان استرداد' },
                ].map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-teal-200">
                    <badge.icon size={18} className="text-teal-300" />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                {/* Main Card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
                      <GraduationCap size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">شهادة معتمدة</h3>
                      <p className="text-teal-200 text-sm">معترف بها دولياً</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {['تدريب عملي متخصص', 'مدربين خبراء معتمدين', 'دعم فني مستمر'].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3"
                      >
                        <CheckCircle size={18} className="text-emerald-400" />
                        <span className="text-sm">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Floating Stats Cards */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute -top-8 -right-8 bg-white rounded-2xl shadow-2xl p-4 text-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                      <Star size={24} className="text-white fill-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4.9</p>
                      <p className="text-xs text-gray-500">تقييم المتدربين</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-4 text-gray-900"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-emerald-400 rounded-xl flex items-center justify-center">
                      <TrendingUp size={24} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">+500</p>
                      <p className="text-xs text-gray-500">متدرب ناجح</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gray-50 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} isInView={statsInView} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium mb-4">
              لماذا أُفُق؟
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              مميزات تجعلنا الخيار الأول
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              نقدم لك تجربة تدريبية فريدة مصممة خصيصاً لاحتياجات الممارسين الصحيين
            </p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group relative ${feature.bg} rounded-3xl p-8 hover:shadow-xl transition-all duration-300 border border-gray-100`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium mb-4">
              كيف نعمل
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              رحلتك التدريبية في 3 خطوات
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              عملية بسيطة وسريعة للبدء في تطوير مهاراتك الصحية
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-1 bg-gradient-to-l from-teal-200 via-teal-400 to-teal-200 rounded-full" />
            
            {[
              {
                step: '01',
                icon: BookOpen,
                title: 'اختر باقتك',
                description: 'اختر من الباقات الجاهزة أو أنشئ باقة مخصصة بعدد الساعات المناسب لاحتياجاتك وميزانيتك',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                step: '02',
                icon: Users,
                title: 'أكمل التسجيل',
                description: 'أدخل معلوماتك الأساسية وتخصصك الصحي لتخصيص تجربتك التدريبية بما يناسبك',
                color: 'from-teal-500 to-emerald-500',
              },
              {
                step: '03',
                icon: Zap,
                title: 'ابدأ التدريب',
                description: 'تواصل معنا عبر الواتساب وابدأ رحلتك التدريبية فوراً مع مدربين محترفين',
                color: 'from-amber-500 to-orange-500',
              },
            ].map((item, index) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow relative z-10 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <item.icon className="text-white" size={24} />
                    </div>
                    <span className="text-6xl font-black text-gray-100">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-amber-50 text-amber-600 rounded-full text-sm font-medium mb-4">
              باقاتنا
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              اختر الباقة المناسبة لك
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              باقات متنوعة تناسب جميع المستويات والاحتياجات
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  index === 1 ? 'ring-2 ring-teal-500 md:scale-105 z-10' : 'border border-gray-100'
                }`}
              >
                {index === 1 && (
                  <div className="bg-gradient-to-l from-teal-500 to-emerald-500 text-white text-center py-3 text-sm font-bold flex items-center justify-center gap-2">
                    <Star size={16} className="fill-current" />
                    الأكثر طلباً
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{pkg.description}</p>
                  
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-5xl font-black text-teal-600">{pkg.price}</span>
                    <span className="text-gray-400 text-lg">ريال</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-6 bg-gradient-to-l from-teal-50 to-emerald-50 rounded-xl p-4">
                    <Clock size={20} className="text-teal-500" />
                    <span className="font-bold text-lg">{pkg.hours}</span>
                    <span className="text-gray-500">ساعة تدريبية</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                        <CheckCircle size={18} className="text-teal-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/booking">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-xl font-semibold transition-all ${
                        index === 1
                          ? 'bg-gradient-to-l from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      اختر هذه الباقة
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/booking">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700"
              >
                <Zap size={18} />
                أو أنشئ باقتك المخصصة
                <ArrowLeft size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-purple-50 text-purple-600 rounded-full text-sm font-medium mb-4">
              قصص نجاح
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              ماذا يقول متدربونا؟
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < testimonial.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/testimonials">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm"
              >
                شاهد المزيد من التقييمات
                <ArrowLeft size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>

            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  هل لديك استفسار؟
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  فريقنا جاهز للإجابة على جميع أسئلتك ومساعدتك في اختيار الباقة المناسبة
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="https://wa.me/966501234567" target="_blank" rel="noreferrer">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle size={20} />
                      واتساب
                    </motion.button>
                  </a>
                  <a href="tel:+966501234567">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors border border-white/20"
                    >
                      <Phone size={20} />
                      اتصل بنا
                    </motion.button>
                  </a>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center animate-pulse-glow">
                    <Headphones size={80} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-bl from-teal-600 via-teal-700 to-emerald-800 text-white relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl mb-8"
            >
              <Globe size={40} />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              جاهز لبدء رحلتك التدريبية؟
            </h2>
            <p className="text-teal-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              انضم لأكثر من 500 ممارس صحي طوروا مهاراتهم مع أُفُق واحصل على شهادتك المعتمدة
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-teal-700 rounded-2xl font-bold text-lg shadow-xl hover:bg-teal-50 transition-colors"
                >
                  احجز الآن
                  <ArrowLeft size={22} />
                </motion.button>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-sm">
              {[
                { icon: CheckCircle, text: 'ضمان استرداد المبلغ خلال 7 أيام' },
                { icon: Shield, text: 'دفع آمن 100%' },
                { icon: Award, text: 'شهادات معتمدة دولياً' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-teal-200"
                >
                  <item.icon size={18} className="text-teal-300" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Stat Card Component
function StatCard({ stat, index, isInView }: { stat: { value: number; suffix: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }; index: number; isInView: boolean }) {
  const count = useCountUp(stat.value, 2000 + index * 200, isInView);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all border border-gray-100"
    >
      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-white" />
      </div>
      <div className="text-4xl md:text-5xl font-black text-teal-600 mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-gray-500 font-medium">{stat.label}</div>
    </motion.div>
  );
}
