import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, Users, Lightbulb, FileCheck, Award, Clock,
  CheckCircle, ArrowLeft, Sparkles, Stethoscope, Heart, Pill,
  Activity, Apple, Smile
} from 'lucide-react';

const iconMap: Record<string, any> = {
  GraduationCap, Users, Lightbulb, FileCheck, Award, Clock,
  Stethoscope, Heart, Pill, Activity, Apple, Smile
};

export function Services() {
  const { services, specialties, packages } = useApp();

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || Award;
  };

  return (
    <div className="py-12 md:py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            خدماتنا المتميزة
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            خدمات تدريبية متكاملة
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات التدريبية المصممة خصيصاً لتطوير الكوادر الصحية
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const IconComponent = getIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${service.color}-500 to-${service.color}-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  <IconComponent size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle size={18} className="text-teal-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Specialties */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">التخصصات المتاحة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">نقدم برامج تدريبية متخصصة لمختلف المجالات الصحية</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specialties.map((specialty, i) => {
              const IconComponent = getIcon(specialty.icon);
              return (
                <motion.div
                  key={specialty.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{specialty.name}</h3>
                  <p className="text-xs text-gray-500">{specialty.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">باقاتنا التدريبية</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">اختر الباقة المناسبة لاحتياجاتك</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.slice(0, 3).map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
                pkg.isPopular ? 'ring-2 ring-teal-500' : 'border border-gray-100'
              }`}
            >
              {pkg.isPopular && (
                <div className="bg-gradient-to-l from-teal-500 to-emerald-500 text-white text-center py-2 text-sm font-medium">
                  الأكثر طلباً
                </div>
              )}
              <div className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-6">{pkg.description}</p>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-black text-teal-600">{pkg.price}</span>
                  <span className="text-gray-400">ريال</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600 mb-6 bg-teal-50 rounded-xl p-3">
                  <Clock size={20} className="text-teal-500" />
                  <span className="font-semibold">{pkg.hours}</span>
                  <span className="text-gray-500">ساعة تدريبية</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/booking"
                  className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    pkg.isPopular
                      ? 'bg-gradient-to-l from-teal-500 to-emerald-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  اختر هذه الباقة
                  <ArrowLeft size={18} />
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
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-l from-teal-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:from-teal-600 hover:to-emerald-600 transition-all"
          >
            عرض جميع الباقات
            <ArrowLeft size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-teal-500 to-emerald-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">لماذا تختارنا؟</h2>
            <p className="text-white/80 max-w-2xl mx-auto">مميزات تجعلنا الخيار الأمثل لتطويرك المهني</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'شهادات معتمدة', description: 'شهادات معترف بها من الجهات الصحية' },
              { icon: Users, title: 'مدربين خبراء', description: 'نخبة من المتخصصين ذوي الخبرة' },
              { icon: Clock, title: 'مرونة في التعلم', description: 'تعلم في أي وقت يناسبك' },
              { icon: FileCheck, title: 'محتوى محدث', description: 'مناهج تدريبية محدثة باستمرار' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center text-white"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
