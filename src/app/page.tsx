const theme = {
  primary: '#2563eb',
  secondary: '#1e40af',
  accent: '#3b82f6',
  background: '#ffffff',
  text: '#1f2937'
};

export default function Home() {
  const services = [
    {
      title: 'حلول الذكاء الاصطناعي',
      description: 'نطور حلول ذكية مخصصة لاحتياجات عملك',
      icon: '🤖'
    },
    {
      title: 'تحليل البيانات',
      description: 'نحول بياناتك إلى رؤى قابلة للتنفيذ',
      icon: '📊'
    },
    {
      title: 'الأتمتة الذكية',
      description: 'نأتمت عملياتك لتوفير الوقت والجهد',
      icon: '⚡'
    }
  ];

  const useCases = [
    'تحليل المستندات المالية',
    'روبوتات المحادثة الذكية',
    'تلخيص المستندات',
    'تحليل المشاعر',
    'التنبؤ بالاتجاهات'
  ];

  const features = [
    'حلول مخصصة لكل عميل',
    'تقنيات ذكاء اصطناعي متقدمة',
    'دعم فني متواصل',
    'أمان وخصوصية عالية',
    'تدريب وورش عمل',
    'تحديثات مستمرة'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Tadafuq.ai</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 space-x-reverse">
                <a href="#hero" className="text-gray-600 hover:text-blue-600 px-3 py-2">الرئيسية</a>
                <a href="#services" className="text-gray-600 hover:text-blue-600 px-3 py-2">الخدمات</a>
                <a href="#usecases" className="text-gray-600 hover:text-blue-600 px-3 py-2">الاستخدامات</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 px-3 py-2">اتصل بنا</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            مرحباً بكم في <span className="text-blue-600">Tadafuq.ai</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            نحن متخصصون في تطوير حلول الذكاء الاصطناعي المبتكرة التي تساعد الشركات على النمو والتطور في العصر الرقمي
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              ابدأ الآن
            </a>
            <a 
              href="#services" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              اكتشف خدماتنا
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">خدماتنا</h2>
            <p className="text-xl text-gray-600">نقدم مجموعة شاملة من حلول الذكاء الاصطناعي</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="text-center p-8 rounded-lg border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="usecases" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">حالات الاستخدام</h2>
            <p className="text-xl text-gray-600">تطبيقات متنوعة لحلولنا الذكية</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full ml-3"></div>
                  <span className="text-gray-800 font-medium">{useCase}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Solutions */}
      <section id="tpl-enterprise" className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">حلول مخصصة للشركات</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            نطور حلول ذكاء اصطناعي مخصصة تماماً لاحتياجات شركتك الفريدة، 
            مع ضمان الأمان والكفاءة والقابلية للتوسع
          </p>
          <a 
            href="#contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-block"
          >
            اطلب استشارة مجانية
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">لماذا Tadafuq.ai؟</h2>
            <p className="text-xl text-gray-600">مميزات تجعلنا الخيار الأمثل لشركتك</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center p-4">
                <div className="w-2 h-2 bg-green-500 rounded-full ml-4"></div>
                <span className="text-gray-800">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">الأسئلة الشائعة</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">ما هي مدة تطوير الحل المخصص؟</h3>
              <p className="text-gray-600">تتراوح مدة التطوير بين 2-8 أسابيع حسب تعقيد المشروع</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">هل تقدمون دعم فني؟</h3>
              <p className="text-gray-600">نعم، نقدم دعم فني متواصل 24/7 لجميع عملائنا</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">هل الحلول آمنة؟</h3>
              <p className="text-gray-600">جميع حلولنا تتبع أعلى معايير الأمان والخصوصية العالمية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">اتصل بنا اليوم</h2>
          <p className="text-xl mb-8">
            هل أنت مستعد لتحويل عملك بقوة الذكاء الاصطناعي؟
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/967735556874?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D9%85%D8%AC%D8%A7%D9%86%D9%8A%D8%A9"
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold inline-flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              📱 واتساب
            </a>
            <a 
              href="mailto:info@tadafuq.ai"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold inline-flex items-center justify-center"
            >
              📧 إيميل
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Tadafuq.ai</h3>
            <p className="text-gray-400 mb-6">شريكك في رحلة التحول الرقمي</p>
            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-400">
                © 2024 Tadafuq.ai. جميع الحقوق محفوظة.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
