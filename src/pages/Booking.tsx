import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import {
  Package,
  Clock,
  User,
  Mail,
  Phone,
  Stethoscope,
  Award,
  Check,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  CreditCard,
  Shield,
  Star,
  Sparkles,
  Calculator,
  Send,
  CheckCircle,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  healthAuthorityNumber: string;
  specialty: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  healthAuthorityNumber?: string;
  specialty?: string;
}

const specialties = [
  'طب عام',
  'طب أسنان',
  'صيدلة',
  'تمريض',
  'علاج طبيعي',
  'تغذية علاجية',
  'مختبرات طبية',
  'أشعة تشخيصية',
  'طب طوارئ',
  'جراحة',
  'باطنية',
  'أطفال',
  'نساء وولادة',
  'عيون',
  'أنف وأذن وحنجرة',
  'جلدية',
  'نفسية',
  'تخصص آخر',
];

export default function Booking() {
  const { packages, adminSettings, contactInfo, addOrder } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [customHours, setCustomHours] = useState(10);
  const [isCustom, setIsCustom] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    healthAuthorityNumber: '',
    specialty: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedPkg = packages.find((p) => p.id === selectedPackage);
  const totalPrice = isCustom
    ? customHours * adminSettings.hourlyRate
    : selectedPkg?.price || 0;
  const totalHours = isCustom ? customHours : selectedPkg?.hours || 0;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الجوال مطلوب';
    } else {
      const phoneDigits = formData.phone.replace(/[\s\-\+]/g, '');
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        newErrors.phone = 'رقم الجوال يجب أن يكون بين 10 و 15 رقم';
      }
    }

    if (!formData.healthAuthorityNumber.trim()) {
      newErrors.healthAuthorityNumber = 'رقم الهيئة الصحية مطلوب';
    }

    if (!formData.specialty) {
      newErrors.specialty = 'التخصص مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const order = {
      id: Date.now().toString(),
      customerName: formData.name,
      email: formData.email,
      phone: formData.phone,
      healthAuthorityNumber: formData.healthAuthorityNumber,
      specialty: formData.specialty,
      packageId: isCustom ? 'custom' : selectedPackage || '',
      packageName: isCustom ? `باقة مخصصة (${customHours} ساعة)` : selectedPkg?.name || '',
      hours: totalHours,
      totalPrice,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
    };

    addOrder(order);

    // Send WhatsApp message
    const message = `🌟 *طلب تدريب جديد - منصة أُفُق* 🌟

👤 *بيانات المتدرب*
📝 الاسم: ${formData.name}
📧 البريد: ${formData.email}
📱 الجوال: ${formData.phone}
🏥 رقم الهيئة: ${formData.healthAuthorityNumber}
🩺 التخصص: ${formData.specialty}

📦 *تفاصيل الباقة*
🎯 الباقة: ${order.packageName}
⏰ الساعات: ${totalHours} ساعة
💰 المبلغ: ${totalPrice} ${adminSettings.currency}

📅 التاريخ: ${new Date().toLocaleDateString('ar-SA')}
🕐 الوقت: ${new Date().toLocaleTimeString('ar-SA')}

✨ شكراً لاختيارك أُفُق! ✨`;

    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const nextStep = () => {
    if (currentStep === 1 && !selectedPackage && !isCustom) {
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const steps = [
    { number: 1, title: 'اختيار الباقة', icon: Package },
    { number: 2, title: 'البيانات الشخصية', icon: User },
    { number: 3, title: 'تأكيد الحجز', icon: CheckCircle },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full mx-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-800 mb-4"
          >
            تم إرسال طلبك بنجاح! 🎉
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8"
          >
            شكراً لك {formData.name}! سيتم التواصل معك خلال 24 ساعة لتأكيد الحجز.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-emerald-50 rounded-2xl p-6 mb-8"
          >
            <h3 className="font-bold text-emerald-800 mb-3">ملخص الطلب</h3>
            <div className="space-y-2 text-sm text-emerald-700">
              <p>📦 الباقة: {isCustom ? `باقة مخصصة (${customHours} ساعة)` : selectedPkg?.name}</p>
              <p>⏰ عدد الساعات: {totalHours} ساعة</p>
              <p>💰 السعر: {totalPrice} {adminSettings.currency}</p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsSuccess(false);
              setCurrentStep(1);
              setSelectedPackage(null);
              setIsCustom(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                healthAuthorityNumber: '',
                specialty: '',
              });
            }}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            حجز باقة جديدة
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            احجز باقتك التدريبية
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ابدأ رحلتك <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">المهنية</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            اختر الباقة المناسبة لك واستثمر في تطوير مهاراتك الصحية
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-6 right-0 left-0 h-1 bg-gray-200 rounded-full -z-10">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"
              />
            </div>

            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <motion.div
                  animate={{
                    scale: currentStep >= step.number ? 1 : 0.9,
                    backgroundColor: currentStep >= step.number ? '#10b981' : '#e5e7eb',
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    currentStep >= step.number ? 'text-white' : 'text-gray-400'
                  }`}
                >
                  {currentStep > step.number ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </motion.div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    currentStep >= step.number ? 'text-emerald-600' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Package Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                {/* Toggle */}
                <div className="flex justify-center mb-8">
                  <div className="bg-white rounded-2xl p-2 shadow-lg inline-flex">
                    <button
                      onClick={() => {
                        setIsCustom(false);
                        setSelectedPackage(null);
                      }}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        !isCustom
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Package className="w-5 h-5 inline-block ml-2" />
                      باقات جاهزة
                    </button>
                    <button
                      onClick={() => {
                        setIsCustom(true);
                        setSelectedPackage(null);
                      }}
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isCustom
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Sparkles className="w-5 h-5 inline-block ml-2" />
                      باقة مخصصة
                    </button>
                  </div>
                </div>

                {!isCustom ? (
                  /* Ready Packages */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.filter(p => !p.isCustom).map((pkg, index) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        onClick={() => setSelectedPackage(pkg.id)}
                        className={`relative bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                          selectedPackage === pkg.id
                            ? 'ring-4 ring-emerald-500 shadow-emerald-200'
                            : 'hover:shadow-2xl'
                        }`}
                      >
                        {pkg.isPopular && (
                          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center py-2 text-sm font-bold">
                            <Star className="w-4 h-4 inline-block ml-1" />
                            الأكثر طلباً
                          </div>
                        )}

                        <div className={`p-8 ${pkg.isPopular ? 'pt-14' : ''}`}>
                          <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                            <div className="flex items-center justify-center gap-2 text-gray-500">
                              <Clock className="w-5 h-5" />
                              <span>{pkg.hours} ساعة تدريبية</span>
                            </div>
                          </div>

                          <div className="text-center mb-6">
                            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                              {pkg.price}
                            </span>
                            <span className="text-gray-500 mr-2">{adminSettings.currency}</span>
                          </div>

                          <ul className="space-y-3 mb-6">
                            {pkg.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-3 text-gray-600">
                                <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3 h-3 text-emerald-600" />
                                </div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <div
                            className={`text-center py-3 rounded-xl font-bold transition-all duration-300 ${
                              selectedPackage === pkg.id
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {selectedPackage === pkg.id ? (
                              <>
                                <Check className="w-5 h-5 inline-block ml-2" />
                                تم الاختيار
                              </>
                            ) : (
                              'اختر الباقة'
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Custom Package */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8"
                  >
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Calculator className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        صمم باقتك الخاصة
                      </h3>
                      <p className="text-gray-600">حدد عدد الساعات حسب احتياجك</p>
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-semibold text-gray-700 mb-4">
                        عدد الساعات: <span className="text-emerald-600 text-2xl">{customHours}</span> ساعة
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={customHours}
                        onChange={(e) => setCustomHours(parseInt(e.target.value))}
                        className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-emerald-500"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>5 ساعات</span>
                        <span>100 ساعة</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-600">سعر الساعة</span>
                        <span className="font-bold text-gray-800">{adminSettings.hourlyRate} {adminSettings.currency}</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-600">عدد الساعات</span>
                        <span className="font-bold text-gray-800">{customHours} ساعة</span>
                      </div>
                      <div className="border-t-2 border-dashed border-emerald-200 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-800">السعر الإجمالي</span>
                          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                            {customHours * adminSettings.hourlyRate} {adminSettings.currency}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <Shield className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                        <span className="text-sm text-gray-600">ضمان الجودة</span>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <CreditCard className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                        <span className="text-sm text-gray-600">دفع آمن</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    البيانات الشخصية
                  </h2>

                  <div className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <div className="relative">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full pr-12 pl-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                            errors.name ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        البريد الإلكتروني *
                      </label>
                      <div className="relative">
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full pr-12 pl-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="example@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الجوال *
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full pr-12 pl-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                            errors.phone ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="رقم الجوال"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Health Authority Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهيئة الصحية *
                      </label>
                      <div className="relative">
                        <Award className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={formData.healthAuthorityNumber}
                          onChange={(e) => setFormData({ ...formData, healthAuthorityNumber: e.target.value })}
                          className={`w-full pr-12 pl-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${
                            errors.healthAuthorityNumber ? 'border-red-500' : 'border-gray-200'
                          }`}
                          placeholder="أدخل رقم الهيئة الصحية"
                        />
                      </div>
                      {errors.healthAuthorityNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.healthAuthorityNumber}</p>
                      )}
                    </div>

                    {/* Specialty */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        التخصص الصحي *
                      </label>
                      <div className="relative">
                        <Stethoscope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                          value={formData.specialty}
                          onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                          className={`w-full pr-12 pl-4 py-4 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-white appearance-none ${
                            errors.specialty ? 'border-red-500' : 'border-gray-200'
                          }`}
                        >
                          <option value="">اختر التخصص</option>
                          {specialties.map((spec) => (
                            <option key={spec} value={spec}>
                              {spec}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.specialty && (
                        <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    مراجعة وتأكيد الحجز
                  </h2>

                  {/* Package Summary */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-emerald-600" />
                      تفاصيل الباقة
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الباقة</span>
                        <span className="font-bold text-gray-800">
                          {isCustom ? `باقة مخصصة` : selectedPkg?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">عدد الساعات</span>
                        <span className="font-bold text-gray-800">{totalHours} ساعة</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="text-lg font-bold text-gray-800">السعر الإجمالي</span>
                        <span className="text-2xl font-black text-emerald-600">
                          {totalPrice} {adminSettings.currency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Personal Info Summary */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-600" />
                      البيانات الشخصية
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500 text-sm">الاسم</span>
                        <p className="font-medium text-gray-800">{formData.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">البريد</span>
                        <p className="font-medium text-gray-800">{formData.email}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">الجوال</span>
                        <p className="font-medium text-gray-800">{formData.phone}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">رقم الهيئة</span>
                        <p className="font-medium text-gray-800">{formData.healthAuthorityNumber}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500 text-sm">التخصص</span>
                        <p className="font-medium text-gray-800">{formData.specialty}</p>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        تأكيد الحجز وإرسال عبر واتساب
                        <MessageCircle className="w-6 h-6" />
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-gray-500 text-sm mt-4">
                    سيتم فتح واتساب لإرسال طلبك مباشرة
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between mt-8 max-w-2xl mx-auto"
          >
            {currentStep > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
                السابق
              </motion.button>
            )}

            {currentStep < 3 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextStep}
                disabled={(currentStep === 1 && !selectedPackage && !isCustom)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mr-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                التالي
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
