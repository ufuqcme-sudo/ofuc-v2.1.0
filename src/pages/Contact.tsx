import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, Send, 
  CheckCircle, Sparkles, ChevronDown, ExternalLink
} from 'lucide-react';

export function Contact() {
  const { contactInfo, faqs, adminSettings } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `📩 *رسالة جديدة من موقع أُفُق*\n\n` +
      `👤 *الاسم:* ${formData.name}\n` +
      `📧 *البريد:* ${formData.email}\n` +
      `📱 *الجوال:* ${formData.phone}\n` +
      `📝 *الموضوع:* ${formData.subject}\n\n` +
      `💬 *الرسالة:*\n${formData.message}`;

    const whatsappUrl = `https://wa.me/${adminSettings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    { 
      icon: Phone, 
      title: 'اتصل بنا', 
      value: contactInfo.phone,
      link: `tel:${contactInfo.phone.replace(/\s/g, '')}`,
      color: 'bg-blue-500'
    },
    { 
      icon: Mail, 
      title: 'راسلنا', 
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      color: 'bg-red-500'
    },
    { 
      icon: MessageCircle, 
      title: 'واتساب', 
      value: 'تواصل معنا مباشرة',
      link: `https://wa.me/${contactInfo.whatsapp}`,
      color: 'bg-green-500'
    },
    { 
      icon: MapPin, 
      title: 'العنوان', 
      value: contactInfo.address,
      link: '#',
      color: 'bg-purple-500'
    },
  ];

  return (
    <div className="py-12 md:py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            نحن هنا لمساعدتك
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            تواصل معنا
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            نسعد بتواصلك معنا والإجابة على جميع استفساراتك
          </p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, i) => (
            <motion.a
              key={i}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group"
            >
              <div className={`${method.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                <method.icon size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{method.title}</h3>
              <p className="text-gray-600 text-sm">{method.value}</p>
              {method.link.startsWith('http') && (
                <ExternalLink size={16} className="text-gray-400 mt-2" />
              )}
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Form & Working Hours */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">أرسل لنا رسالة</h2>
            
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-500" size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">تم إرسال رسالتك!</h3>
                  <p className="text-gray-600">سنتواصل معك في أقرب وقت</p>
                </motion.div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="أدخل اسمك"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="example@email.com"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الجوال</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="رقم الجوال"
                        dir="ltr"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="">اختر الموضوع</option>
                        <option value="استفسار عام">استفسار عام</option>
                        <option value="الباقات والأسعار">الباقات والأسعار</option>
                        <option value="الدعم الفني">الدعم الفني</option>
                        <option value="الشهادات">الشهادات</option>
                        <option value="الشراكات">الشراكات</option>
                        <option value="أخرى">أخرى</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                      rows={5}
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-l from-teal-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:from-teal-600 hover:to-emerald-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    إرسال الرسالة عبر واتساب
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Working Hours & Quick Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Working Hours */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Clock className="text-teal-600" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">ساعات العمل</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600">الأحد - الخميس</span>
                  <span className="font-medium text-gray-900">{contactInfo.workingHours.weekdays}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">الجمعة - السبت</span>
                  <span className="font-medium text-gray-900">{contactInfo.workingHours.weekend}</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp */}
            <motion.a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block bg-gradient-to-l from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">تواصل سريع</h3>
                  <p className="text-white/80 text-sm">راسلنا على واتساب الآن</p>
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
            <p className="text-gray-600">إجابات على أكثر الأسئلة شيوعاً</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="text-gray-400" size={20} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {expandedFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
