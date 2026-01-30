import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Star, Quote, X, Sparkles, ZoomIn } from 'lucide-react';

export function Testimonials() {
  const { testimonials } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<number | 'all'>('all');

  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.rating === filter);

  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
    : '0';

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
            آراء عملائنا
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            ماذا يقول متدربونا
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            آراء حقيقية من متدربين حقيقيين استفادوا من برامجنا التدريبية
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-5xl font-black">{averageRating}</span>
                <Star className="text-yellow-400 fill-current" size={32} />
              </div>
              <p className="text-white/80">متوسط التقييم</p>
            </div>
            <div>
              <p className="text-5xl font-black mb-2">{testimonials.length}+</p>
              <p className="text-white/80">تقييم من المتدربين</p>
            </div>
            <div>
              <p className="text-5xl font-black mb-2">98%</p>
              <p className="text-white/80">نسبة الرضا</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2.5 rounded-full font-medium transition-all ${
              filter === 'all'
                ? 'bg-teal-500 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            الكل ({testimonials.length})
          </button>
          {[5, 4, 3].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilter(rating)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                filter === rating
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{rating}</span>
              <Star size={16} className={filter === rating ? 'fill-current' : 'text-yellow-400 fill-current'} />
              <span className="text-sm">({testimonials.filter(t => t.rating === rating).length})</span>
            </button>
          ))}
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter.toString()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTestimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Image */}
                {testimonial.image && (
                  <div 
                    className="relative h-48 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(testimonial.image || null)}
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Quote Icon */}
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <Quote className="text-teal-600" size={20} />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        size={18}
                        className={idx < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredTestimonials.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">لا توجد تقييمات بهذا التصنيف</p>
          </motion.div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-center text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-teal-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-emerald-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              انضم لأكثر من 2500 متدرب راضٍ
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              ابدأ رحلتك التدريبية معنا اليوم وكن جزءاً من قصص النجاح
            </p>
            <a
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-l from-teal-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:from-teal-600 hover:to-emerald-600 transition-all"
            >
              ابدأ الآن
            </a>
          </div>
        </motion.div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-6 left-6 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </motion.button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="توثيق التقييم"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
