import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { 
  Target, Eye, Heart, Award, Users, BookOpen, 
  TrendingUp, CheckCircle, Star, Sparkles 
} from 'lucide-react';

export function About() {
  const { siteSettings, teamMembers, statistics } = useApp();

  const values = [
    { icon: Heart, title: 'الشغف', description: 'نؤمن بأن الشغف هو أساس النجاح في التعليم الصحي', color: 'bg-red-500' },
    { icon: Award, title: 'الجودة', description: 'نلتزم بأعلى معايير الجودة في جميع برامجنا', color: 'bg-yellow-500' },
    { icon: Users, title: 'التعاون', description: 'نعمل كفريق واحد لتحقيق أهداف متدربينا', color: 'bg-blue-500' },
    { icon: TrendingUp, title: 'التطور', description: 'نسعى دائماً للتطور ومواكبة أحدث المستجدات', color: 'bg-green-500' },
    { icon: CheckCircle, title: 'الالتزام', description: 'نلتزم بوعودنا ونحرص على رضا عملائنا', color: 'bg-purple-500' },
    { icon: Star, title: 'التميز', description: 'نسعى للتميز في كل ما نقدمه', color: 'bg-teal-500' },
  ];

  const timeline = [
    { year: '2020', title: 'انطلاق المنصة', description: 'بدأنا رحلتنا برؤية واضحة لتطوير الكوادر الصحية' },
    { year: '2021', title: 'أول 500 متدرب', description: 'وصلنا لأول 500 متدرب معتمد من منصتنا' },
    { year: '2022', title: 'شراكات استراتيجية', description: 'عقدنا شراكات مع مؤسسات صحية كبرى' },
    { year: '2023', title: 'اعتماد دولي', description: 'حصلنا على اعتمادات دولية لبرامجنا' },
    { year: '2024', title: '+2500 متدرب', description: 'تجاوزنا 2500 متدرب ونستمر في النمو' },
  ];

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
            تعرف علينا
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {siteSettings.aboutTitle || 'من نحن'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {siteSettings.aboutDescription || 'أُفُق هي منصة سعودية رائدة متخصصة في التدريب والتطوير المهني للكوادر الصحية'}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {statistics.map((stat) => (
            <div key={stat.id} className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-4xl font-black text-teal-600 mb-2">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gradient-to-br from-teal-500 to-emerald-600 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-white"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Eye size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">رؤيتنا</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                {siteSettings.vision || 'أن نكون المنصة الرائدة في تمكين الكوادر الصحية عربياً'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-white"
            >
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">رسالتنا</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                {siteSettings.mission || 'تقديم تدريب صحي عالي الجودة يواكب أحدث المعايير العالمية'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">قيمنا الأساسية</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">القيم التي نؤمن بها ونعمل وفقها</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
            >
              <div className={`${value.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4`}>
                <value.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gray-50 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">رحلتنا</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">محطات مهمة في مسيرة نجاحنا</p>
          </motion.div>

          <div className="relative">
            <div className="absolute right-1/2 top-0 bottom-0 w-0.5 bg-teal-200 hidden md:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <span className="text-teal-600 font-bold text-lg">{item.year}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-12 h-12 bg-teal-500 rounded-full items-center justify-center text-white font-bold flex-shrink-0 z-10">
                    {item.year.slice(-2)}
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">فريقنا</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">نخبة من الخبراء والمتخصصين</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || 'https://via.placeholder.com/400'}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-teal-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            انضم إلى أسرة أُفُق اليوم
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            ابدأ رحلتك في التطوير المهني واحصل على شهادات معتمدة تعزز مسيرتك
          </p>
          <a
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            <BookOpen size={20} />
            ابدأ الآن
          </a>
        </motion.div>
      </section>
    </div>
  );
}
