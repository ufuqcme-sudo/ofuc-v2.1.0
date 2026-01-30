# Ufuq Backend API

## المتطلبات
- Node.js 18+
- npm أو yarn

## التثبيت

```bash
cd backend
npm install
```

## تشغيل السيرفر

```bash
# Development
npm run dev

# Production
npm start
```

## المتغيرات البيئية

أنشئ ملف `.env`:

```env
PORT=3001
JWT_SECRET=your-secret-key-here
DATABASE_URL=./database.sqlite
ADMIN_PASSWORD=admin123
```

## API Endpoints

### Auth
- `POST /api/auth/login` - تسجيل دخول الأدمن
- `GET /api/auth/verify` - التحقق من التوكن
- `PUT /api/auth/change-password` - تغيير كلمة المرور

### Orders
- `GET /api/orders` - جلب جميع الطلبات
- `GET /api/orders/:id` - جلب طلب محدد
- `POST /api/orders` - إنشاء طلب جديد
- `PUT /api/orders/:id/status` - تحديث حالة الطلب
- `DELETE /api/orders/:id` - حذف طلب

### Packages
- `GET /api/packages` - جلب جميع الباقات
- `POST /api/packages` - إنشاء باقة جديدة
- `PUT /api/packages/:id` - تحديث باقة
- `DELETE /api/packages/:id` - حذف باقة

### Testimonials
- `GET /api/testimonials` - جلب جميع الآراء
- `POST /api/testimonials` - إضافة رأي جديد
- `PUT /api/testimonials/:id` - تحديث رأي
- `DELETE /api/testimonials/:id` - حذف رأي

### Team
- `GET /api/team` - جلب أعضاء الفريق
- `POST /api/team` - إضافة عضو جديد
- `PUT /api/team/:id` - تحديث عضو
- `DELETE /api/team/:id` - حذف عضو

### Services
- `GET /api/services` - جلب الخدمات
- `POST /api/services` - إضافة خدمة
- `PUT /api/services/:id` - تحديث خدمة
- `DELETE /api/services/:id` - حذف خدمة

### FAQ
- `GET /api/faq` - جلب الأسئلة الشائعة
- `POST /api/faq` - إضافة سؤال
- `PUT /api/faq/:id` - تحديث سؤال
- `DELETE /api/faq/:id` - حذف سؤال

### Settings
- `GET /api/settings` - جلب إعدادات الموقع
- `PUT /api/settings` - تحديث الإعدادات

### Contact
- `GET /api/contact` - جلب معلومات التواصل
- `PUT /api/contact` - تحديث معلومات التواصل
- `POST /api/contact/message` - إرسال رسالة تواصل

### Upload
- `POST /api/upload` - رفع صورة

## البنية

```
backend/
├── src/
│   ├── index.js          # نقطة الدخول
│   ├── config/
│   │   └── database.js   # إعداد قاعدة البيانات
│   ├── middleware/
│   │   └── auth.js       # middleware للتحقق
│   ├── routes/
│   │   ├── auth.js
│   │   ├── orders.js
│   │   ├── packages.js
│   │   ├── testimonials.js
│   │   ├── team.js
│   │   ├── services.js
│   │   ├── faq.js
│   │   ├── settings.js
│   │   ├── contact.js
│   │   └── upload.js
│   └── utils/
│       └── helpers.js
├── uploads/              # مجلد رفع الصور
├── database.sqlite       # قاعدة البيانات
├── package.json
└── .env
```
