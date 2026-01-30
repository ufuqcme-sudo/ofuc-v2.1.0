import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import {
  LayoutDashboard, Package, ShoppingCart, MessageSquare, Users, Settings,
  LogOut, Plus, Edit2, Trash2, Save, X, Upload, Star, Clock,
  Phone, Globe, Briefcase, HelpCircle, Check
} from 'lucide-react';

type TabType = 'dashboard' | 'orders' | 'packages' | 'testimonials' | 'team' | 'services' | 'faqs' | 'site' | 'contact' | 'settings';

export function Admin() {
  const {
    isAdmin, logout,
    orders, updateOrderStatus, deleteOrder,
    packages, addPackage, updatePackage, deletePackage,
    testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
    teamMembers, addTeamMember, updateTeamMember, deleteTeamMember,
    services, addService, updateService, deleteService,
    faqs, addFAQ, updateFAQ, deleteFAQ,
    contactInfo, setContactInfo,
    siteSettings, setSiteSettings,
    adminSettings, setAdminSettings,
  } = useApp();

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const tabs = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { id: 'orders', label: 'الطلبات', icon: ShoppingCart, count: orders.length },
    { id: 'packages', label: 'الباقات', icon: Package },
    { id: 'testimonials', label: 'آراء المتدربين', icon: MessageSquare },
    { id: 'team', label: 'فريق العمل', icon: Users },
    { id: 'services', label: 'الخدمات', icon: Briefcase },
    { id: 'faqs', label: 'الأسئلة الشائعة', icon: HelpCircle },
    { id: 'site', label: 'إعدادات الموقع', icon: Globe },
    { id: 'contact', label: 'معلومات التواصل', icon: Phone },
    { id: 'settings', label: 'إعدادات عامة', icon: Settings },
  ];

  // Dashboard Component
  const Dashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">لوحة التحكم</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'إجمالي الطلبات', value: orders.length, icon: ShoppingCart, color: 'bg-blue-500' },
          { label: 'الطلبات المعلقة', value: orders.filter(o => o.status === 'pending').length, icon: Clock, color: 'bg-yellow-500' },
          { label: 'الباقات', value: packages.length, icon: Package, color: 'bg-teal-500' },
          { label: 'التقييمات', value: testimonials.length, icon: Star, color: 'bg-purple-500' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">أحدث الطلبات</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">لا توجد طلبات حتى الآن</p>
        ) : (
          <div className="space-y-3">
            {orders.slice(-5).reverse().map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.packageName}</p>
                </div>
                <div className="text-left">
                  <p className="font-bold text-teal-600">{order.totalPrice} ريال</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.status === 'pending' ? 'معلق' :
                     order.status === 'confirmed' ? 'مؤكد' :
                     order.status === 'completed' ? 'مكتمل' : 'ملغي'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Orders Component
  const Orders = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">إدارة الطلبات</h2>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <ShoppingCart className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500">لا توجد طلبات حتى الآن</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">العميل</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الباقة</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">رقم الهيئة</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">السعر</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                        <p className="text-sm text-gray-500">{order.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{order.packageName}</p>
                      <p className="text-sm text-gray-500">{order.hours} ساعة</p>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{order.healthAuthorityNumber}</td>
                    <td className="px-6 py-4 font-bold text-teal-600">{order.totalPrice} ريال</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => {
                          updateOrderStatus(order.id, e.target.value as any);
                          showSuccess('تم تحديث حالة الطلب');
                        }}
                        className="text-sm border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="pending">معلق</option>
                        <option value="confirmed">مؤكد</option>
                        <option value="completed">مكتمل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
                            deleteOrder(order.id);
                            showSuccess('تم حذف الطلب');
                          }
                        }}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  // Packages Component
  const Packages = () => {
    const [form, setForm] = useState({
      name: '', description: '', hours: 10, price: 500, features: [''], isPopular: false
    });

    const handleSave = () => {
      const pkg = {
        id: editingItem?.id || Date.now().toString(),
        ...form,
        features: form.features.filter(f => f.trim())
      };
      
      if (editingItem) {
        updatePackage(pkg);
        showSuccess('تم تحديث الباقة');
      } else {
        addPackage(pkg);
        showSuccess('تم إضافة الباقة');
      }
      setShowModal(false);
      setEditingItem(null);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">إدارة الباقات</h2>
          <button
            onClick={() => {
              setForm({ name: '', description: '', hours: 10, price: 500, features: [''], isPopular: false });
              setEditingItem(null);
              setModalType('package');
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            <Plus size={20} />
            إضافة باقة
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm">{pkg.description}</p>
                </div>
                {pkg.isPopular && (
                  <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full">الأكثر طلباً</span>
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-teal-600">{pkg.price}</span>
                <span className="text-gray-400">ريال</span>
              </div>
              <p className="text-gray-600 mb-4">{pkg.hours} ساعة تدريبية</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setForm({
                      name: pkg.name,
                      description: pkg.description,
                      hours: pkg.hours,
                      price: pkg.price,
                      features: pkg.features.length ? pkg.features : [''],
                      isPopular: pkg.isPopular || false
                    });
                    setEditingItem(pkg);
                    setModalType('package');
                    setShowModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <Edit2 size={16} />
                  تعديل
                </button>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
                      deletePackage(pkg.id);
                      showSuccess('تم حذف الباقة');
                    }
                  }}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Package Modal */}
        <AnimatePresence>
          {showModal && modalType === 'package' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">{editingItem ? 'تعديل الباقة' : 'إضافة باقة جديدة'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">اسم الباقة</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                      placeholder="الباقة الأساسية"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">الوصف</label>
                    <textarea
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                      rows={2}
                      placeholder="وصف الباقة"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">عدد الساعات</label>
                      <input
                        type="number"
                        value={form.hours}
                        onChange={(e) => setForm({ ...form, hours: Number(e.target.value) })}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">السعر (ريال)</label>
                      <input
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                        className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">المميزات</label>
                    {form.features.map((feature, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const newFeatures = [...form.features];
                            newFeatures[i] = e.target.value;
                            setForm({ ...form, features: newFeatures });
                          }}
                          className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500"
                          placeholder="ميزة"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newFeatures = form.features.filter((_, idx) => idx !== i);
                            setForm({ ...form, features: newFeatures.length ? newFeatures : [''] });
                          }}
                          className="text-red-500 p-2"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, features: [...form.features, ''] })}
                      className="text-teal-600 text-sm flex items-center gap-1"
                    >
                      <Plus size={16} />
                      إضافة ميزة
                    </button>
                  </div>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isPopular}
                      onChange={(e) => setForm({ ...form, isPopular: e.target.checked })}
                      className="w-5 h-5 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span>الأكثر طلباً</span>
                  </label>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    حفظ
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                  >
                    إلغاء
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Testimonials Component
  const Testimonials = () => {
    const [form, setForm] = useState({
      name: '', role: '', content: '', rating: 5, image: ''
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setForm({ ...form, image: reader.result as string });
        reader.readAsDataURL(file);
      }
    };

    const handleSave = () => {
      const testimonial = {
        id: editingItem?.id || Date.now().toString(),
        ...form,
        createdAt: editingItem?.createdAt || new Date().toISOString()
      };
      
      if (editingItem) {
        updateTestimonial(testimonial);
        showSuccess('تم تحديث التقييم');
      } else {
        addTestimonial(testimonial);
        showSuccess('تم إضافة التقييم');
      }
      setShowModal(false);
      setEditingItem(null);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">آراء المتدربين</h2>
          <button
            onClick={() => {
              setForm({ name: '', role: '', content: '', rating: 5, image: '' });
              setEditingItem(null);
              setModalType('testimonial');
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            <Plus size={20} />
            إضافة تقييم
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              {t.image && (
                <img src={t.image} alt={t.name} className="w-full h-32 object-cover rounded-xl mb-4" />
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < t.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'} />
                ))}
              </div>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{t.content}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setForm({
                      name: t.name,
                      role: t.role,
                      content: t.content,
                      rating: t.rating,
                      image: t.image || ''
                    });
                    setEditingItem(t);
                    setModalType('testimonial');
                    setShowModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <Edit2 size={16} />
                  تعديل
                </button>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد من حذف هذا التقييم؟')) {
                      deleteTestimonial(t.id);
                      showSuccess('تم حذف التقييم');
                    }
                  }}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Modal */}
        <AnimatePresence>
          {showModal && modalType === 'testimonial' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">{editingItem ? 'تعديل التقييم' : 'إضافة تقييم جديد'}</h3>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">الاسم</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                      placeholder="د. أحمد محمد"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">المنصب / الوظيفة</label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                      placeholder="طبيب أسنان"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">التقييم</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({ ...form, rating: star })}
                          className="p-1"
                        >
                          <Star
                            size={28}
                            className={star <= form.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">الرأي</label>
                    <textarea
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                      rows={4}
                      placeholder="اكتب الرأي هنا..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">صورة التوثيق</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                      {form.image ? (
                        <div className="relative">
                          <img src={form.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                          <button
                            onClick={() => setForm({ ...form, image: '' })}
                            className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer">
                          <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                          <p className="text-sm text-gray-500">اضغط لرفع صورة</p>
                          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    حفظ
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
                  >
                    إلغاء
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Team Component
  const Team = () => {
    const [form, setForm] = useState({ name: '', role: '', image: '', bio: '' });

    const handleSave = () => {
      const member = { id: editingItem?.id || Date.now().toString(), ...form };
      if (editingItem) {
        updateTeamMember(member);
        showSuccess('تم تحديث العضو');
      } else {
        addTeamMember(member);
        showSuccess('تم إضافة العضو');
      }
      setShowModal(false);
      setEditingItem(null);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">فريق العمل</h2>
          <button
            onClick={() => {
              setForm({ name: '', role: '', image: '', bio: '' });
              setEditingItem(null);
              setModalType('team');
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            <Plus size={20} />
            إضافة عضو
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <motion.div key={member.id} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <img
                src={member.image || 'https://via.placeholder.com/150'}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-teal-600 mb-2">{member.role}</p>
              <p className="text-gray-500 text-sm mb-4">{member.bio}</p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setForm(member);
                    setEditingItem(member);
                    setModalType('team');
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (confirm('هل أنت متأكد؟')) {
                      deleteTeamMember(member.id);
                      showSuccess('تم الحذف');
                    }
                  }}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team Modal */}
        <AnimatePresence>
          {showModal && modalType === 'team' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl p-6 w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-6">{editingItem ? 'تعديل العضو' : 'إضافة عضو'}</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="الاسم"
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  <input
                    type="text"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="المنصب"
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="رابط الصورة"
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    placeholder="نبذة"
                    rows={3}
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={handleSave} className="flex-1 py-3 bg-teal-500 text-white rounded-xl">
                    حفظ
                  </button>
                  <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-gray-100 rounded-xl">
                    إلغاء
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Services Component
  const Services = () => {
    const [form, setForm] = useState({ title: '', description: '', icon: 'Award', features: [''], color: 'teal' });

    const handleSave = () => {
      const service = {
        id: editingItem?.id || Date.now().toString(),
        ...form,
        features: form.features.filter(f => f.trim())
      };
      if (editingItem) {
        updateService(service);
        showSuccess('تم التحديث');
      } else {
        addService(service);
        showSuccess('تم الإضافة');
      }
      setShowModal(false);
      setEditingItem(null);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">الخدمات</h2>
          <button
            onClick={() => {
              setForm({ title: '', description: '', icon: 'Award', features: [''], color: 'teal' });
              setEditingItem(null);
              setModalType('service');
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            <Plus size={20} />
            إضافة خدمة
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{service.description}</p>
              <ul className="space-y-2 mb-4">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-teal-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setForm(service);
                    setEditingItem(service);
                    setModalType('service');
                    setShowModal(true);
                  }}
                  className="px-4 py-2 bg-gray-100 rounded-lg"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    if (confirm('حذف؟')) {
                      deleteService(service.id);
                      showSuccess('تم الحذف');
                    }
                  }}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service Modal */}
        <AnimatePresence>
          {showModal && modalType === 'service' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-6">{editingItem ? 'تعديل' : 'إضافة'} خدمة</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="عنوان الخدمة"
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="الوصف"
                    rows={3}
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  <div>
                    <label className="block text-sm mb-2">المميزات</label>
                    {form.features.map((f, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={f}
                          onChange={(e) => {
                            const newF = [...form.features];
                            newF[i] = e.target.value;
                            setForm({ ...form, features: newF });
                          }}
                          className="flex-1 px-4 py-2 border rounded-lg"
                        />
                        <button
                          onClick={() => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })}
                          className="text-red-500"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setForm({ ...form, features: [...form.features, ''] })}
                      className="text-teal-600 text-sm"
                    >
                      + إضافة
                    </button>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={handleSave} className="flex-1 py-3 bg-teal-500 text-white rounded-xl">
                    حفظ
                  </button>
                  <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-gray-100 rounded-xl">
                    إلغاء
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // FAQs Component
  const FAQs = () => {
    const [form, setForm] = useState({ question: '', answer: '', category: 'عام' });

    const handleSave = () => {
      const faq = { id: editingItem?.id || Date.now().toString(), ...form };
      if (editingItem) {
        updateFAQ(faq);
        showSuccess('تم التحديث');
      } else {
        addFAQ(faq);
        showSuccess('تم الإضافة');
      }
      setShowModal(false);
      setEditingItem(null);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">الأسئلة الشائعة</h2>
          <button
            onClick={() => {
              setForm({ question: '', answer: '', category: 'عام' });
              setEditingItem(null);
              setModalType('faq');
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            <Plus size={20} />
            إضافة سؤال
          </button>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full mb-2 inline-block">
                    {faq.category}
                  </span>
                  <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setForm(faq);
                      setEditingItem(faq);
                      setModalType('faq');
                      setShowModal(true);
                    }}
                    className="p-2 bg-gray-100 rounded-lg"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('حذف؟')) {
                        deleteFAQ(faq.id);
                        showSuccess('تم الحذف');
                      }
                    }}
                    className="p-2 bg-red-100 text-red-600 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Modal */}
        <AnimatePresence>
          {showModal && modalType === 'faq' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-6 w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-6">{editingItem ? 'تعديل' : 'إضافة'} سؤال</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={form.question}
                    onChange={(e) => setForm({ ...form, question: e.target.value })}
                    placeholder="السؤال"
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  <textarea
                    value={form.answer}
                    onChange={(e) => setForm({ ...form, answer: e.target.value })}
                    placeholder="الإجابة"
                    rows={4}
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="التصنيف"
                    className="w-full px-4 py-3 border rounded-xl"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={handleSave} className="flex-1 py-3 bg-teal-500 text-white rounded-xl">
                    حفظ
                  </button>
                  <button onClick={() => setShowModal(false)} className="px-6 py-3 bg-gray-100 rounded-xl">
                    إلغاء
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Site Settings Component
  const SiteSettingsTab = () => {
    const [form, setForm] = useState(siteSettings);

    const handleSave = () => {
      setSiteSettings(form);
      showSuccess('تم حفظ الإعدادات');
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">إعدادات الموقع</h2>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">اسم الموقع</label>
              <input
                type="text"
                value={form.siteName}
                onChange={(e) => setForm({ ...form, siteName: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">وصف الموقع</label>
              <input
                type="text"
                value={form.siteDescription}
                onChange={(e) => setForm({ ...form, siteDescription: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">عنوان Hero الرئيسي</label>
            <input
              type="text"
              value={form.heroTitle}
              onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">العنوان الفرعي</label>
            <textarea
              value={form.heroSubtitle}
              onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">الرؤية</label>
              <textarea
                value={form.vision}
                onChange={(e) => setForm({ ...form, vision: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الرسالة</label>
              <textarea
                value={form.mission}
                onChange={(e) => setForm({ ...form, mission: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
                rows={3}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">نص الفوتر</label>
            <input
              type="text"
              value={form.footerText}
              onChange={(e) => setForm({ ...form, footerText: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            حفظ الإعدادات
          </button>
        </div>
      </div>
    );
  };

  // Contact Settings Component
  const ContactSettings = () => {
    const [form, setForm] = useState(contactInfo);

    const handleSave = () => {
      setContactInfo(form);
      showSuccess('تم حفظ معلومات التواصل');
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">معلومات التواصل</h2>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">رقم الهاتف</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">رقم الواتساب</label>
              <input
                type="text"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">العنوان</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">ساعات العمل (أيام الأسبوع)</label>
              <input
                type="text"
                value={form.workingHours.weekdays}
                onChange={(e) => setForm({ ...form, workingHours: { ...form.workingHours, weekdays: e.target.value } })}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ساعات العمل (نهاية الأسبوع)</label>
              <input
                type="text"
                value={form.workingHours.weekend}
                onChange={(e) => setForm({ ...form, workingHours: { ...form.workingHours, weekend: e.target.value } })}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            حفظ
          </button>
        </div>
      </div>
    );
  };

  // General Settings Component
  const GeneralSettings = () => {
    const [form, setForm] = useState(adminSettings);

    const handleSave = () => {
      setAdminSettings(form);
      showSuccess('تم حفظ الإعدادات');
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">الإعدادات العامة</h2>
        
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">سعر الساعة</label>
              <input
                type="number"
                value={form.hourlyRate}
                onChange={(e) => setForm({ ...form, hourlyRate: Number(e.target.value) })}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">العملة</label>
              <input
                type="text"
                value={form.currency}
                onChange={(e) => setForm({ ...form, currency: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">رقم الواتساب للطلبات</label>
            <input
              type="text"
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">كلمة مرور الأدمن</label>
            <input
              type="password"
              value={form.adminPassword}
              onChange={(e) => setForm({ ...form, adminPassword: e.target.value })}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            حفظ الإعدادات
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'orders': return <Orders />;
      case 'packages': return <Packages />;
      case 'testimonials': return <Testimonials />;
      case 'team': return <Team />;
      case 'services': return <Services />;
      case 'faqs': return <FAQs />;
      case 'site': return <SiteSettingsTab />;
      case 'contact': return <ContactSettings />;
      case 'settings': return <GeneralSettings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50"
            >
              <Check size={20} />
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-500">مرحباً بك في لوحة إدارة أُفُق</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
          >
            <LogOut size={18} />
            تسجيل الخروج
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-teal-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <tab.icon size={20} />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </div>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activeTab === tab.id ? 'bg-white/20' : 'bg-teal-100 text-teal-700'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
