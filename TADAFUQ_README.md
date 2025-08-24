# Tadafuq.ai Landing Page

موقع Tadafuq.ai الإلكتروني - حلول الذكاء الاصطناعي

## المميزات

- موقع إلكتروني باللغة العربية
- تصميم متجاوب (Responsive Design)
- Next.js + Tailwind CSS
- تصدير ثابت للنشر على GitHub Pages
- نشر تلقائي عبر GitHub Actions

## التشغيل المحلي

```bash
npm install
npm run dev
```

اذهب إلى [http://localhost:3000](http://localhost:3000) لمشاهدة الموقع.

## البناء للإنتاج

```bash
npm run build
```

## النشر

يتم النشر تلقائياً عبر GitHub Actions إلى GitHub Pages عند الـ push على branch الـ main.

## التخصيص

### تحرير المحتوى:

- **القسم الرئيسي (Hero)**: `src/app/page.tsx` - قسم `#hero`
- **الخدمات**: مصفوفة `services` في `src/app/page.tsx`
- **حالات الاستخدام**: مصفوفة `useCases` في `src/app/page.tsx`
- **المميزات**: مصفوفة `features` في `src/app/page.tsx`
- **الحلول المخصصة**: قسم `#tpl-enterprise`
- **معلومات الاتصال**: قسم `#contact`

### تخصيص التصميم:

- **الألوان**: كائن `theme` في أعلى `src/app/page.tsx`
- **الخطوط**: `src/app/layout.tsx`
- **الأنماط العامة**: `src/app/globals.css`

### رابط واتساب:

لتخصيص رسالة واتساب تلقائية، عدّل الرابط في قسم `#contact`:

```
https://wa.me/967735556874?text=أريد%20استشارة%20مجانية
```

## معلومات الدومين

- **الدومين المخصص**: tadafuq.ai
- **ملف CNAME**: موجود في `public/CNAME`
- **DNS Records**: أضف 4 سجلات A إلى:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

## الهيكل

```
src/
  app/
    layout.tsx    # تخطيط الصفحة الرئيسي
    page.tsx      # صفحة الهبوط
    globals.css   # الأنماط العامة
public/
  CNAME          # ملف الدومين المخصص
.github/
  workflows/
    deploy.yml   # GitHub Actions للنشر
```