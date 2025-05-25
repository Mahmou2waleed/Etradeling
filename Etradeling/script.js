// =========== Header ===============
document.addEventListener("DOMContentLoaded", () => {
  // Tablet Menu
  const tabletMenuButton = document.getElementById("tablet-menu-btn");
  const tabletMenu = document.getElementById("tablet-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuButton = document.getElementById("mobile-menu-btn");
  const mobileMenuClose = document.getElementById("mobile-menu-close");
  const mobileMenuPanel = mobileMenu.querySelector(".mobile-menu-panel");

  // Tablet Menu Toggle
  tabletMenuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    tabletMenu.classList.toggle("active");

    // Update ARIA attributes
    const isExpanded = tabletMenu.classList.contains("active");
    tabletMenuButton.setAttribute("aria-expanded", isExpanded);
  });

  // Close tablet menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      !tabletMenu.contains(e.target) &&
      !tabletMenuButton.contains(e.target)
    ) {
      tabletMenu.classList.remove("active");
      tabletMenuButton.setAttribute("aria-expanded", "false");
    }
  });

  // Mobile Menu Toggle
  function openMobileMenu() {
    mobileMenu.classList.remove("hidden");
    // ensure reflow so CSS transition kicks in
    void mobileMenu.offsetWidth;
    mobileMenu.classList.add("visible");
    mobileMenuPanel.classList.add("active");
    document.body.classList.add("overflow-hidden");
  }

  function closeMobileMenu() {
    mobileMenuPanel.classList.remove("active");
    mobileMenu.classList.remove("visible");
    document.body.classList.remove("overflow-hidden");
    // after transition, hide entirely
    mobileMenuPanel.addEventListener(
      "transitionend",
      () => {
        if (!mobileMenuPanel.classList.contains("active")) {
          mobileMenu.classList.add("hidden");
        }
      },
      { once: true }
    );
  }

  // Open mobile menu
  mobileMenuButton.addEventListener("click", openMobileMenu);

  // Close mobile menu via X button
  mobileMenuClose.addEventListener("click", closeMobileMenu);

  // Close mobile menu via clicking on backdrop
  mobileMenu.addEventListener("click", (e) => {
    if (e.target === mobileMenu) closeMobileMenu();
  });

  // Close mobile menu when clicking on a link
  mobileMenu.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        closeMobileMenu();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

// ============= Hero ===================
function animateCounters() {
  const counters = document.querySelectorAll(".counter[data-end]");

  counters.forEach((counter) => {
    const end = parseInt(counter.dataset.end);
    let current = 0;

    const updateCounter = () => {
      if (current < end) {
        current += Math.ceil(end / 50);
        if (current > end) current = end;
        counter.textContent = current.toLocaleString("en-US");
        requestAnimationFrame(updateCounter);
      }
    };

    // Check for correct parent class
    if (counter.closest(".stats-item").classList.contains("visible")) {
      updateCounter();
    }
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

// Observe the correct elements
document.querySelectorAll(".stats-item").forEach((card) => {
  observer.observe(card);
});

// =============  ==============

// FAQ Toggle
document.addEventListener("DOMContentLoaded", function () {
  const faqToggles = document.querySelectorAll(".faq-toggle");

  faqToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const content = this.nextElementSibling;
      const icon = this.querySelector("i");

      this.classList.toggle("active");
      content.classList.toggle("active");
      icon.classList.toggle("rotate-180");

      const isExpanded = this.classList.contains("active");
      this.setAttribute("aria-expanded", isExpanded);
      content.setAttribute("aria-hidden", !isExpanded);
    });
  });
});

// Back to Top Button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.remove("opacity-0", "invisible");
    backToTopButton.classList.add("opacity-100", "visible");
  } else {
    backToTopButton.classList.remove("opacity-100", "visible");
    backToTopButton.classList.add("opacity-0", "invisible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
      }
    }
  });
});

// Language switching functionality
const translations = {
  ar: {
    // Navigation
    "how-it-works": "كيف يعمل",
    features: "المميزات",
    testimonials: "آراء العملاء",
    "start-journey": "بدء الرحلة",
    "start-now": "ابدأ الآن",
    login: "الدخول",

    // Hero Section
    "hero-title": "اربط مصنعك بالعالم مع Etradeling",
    "hero-subtitle":
      "المنصة الرائدة التي تجمع المصانع المصرية مع المشترين العالميين",
    "hero-description":
      "احصل على عملاء جدد واعرض منتجاتك للعالم كله من خلال حلول متكاملة مصممة خصيصاً لنجاحك",
    "start-free": "ابدأ الآن مجاناً",
    "watch-video": "شاهد الفيديو",

    // Stats
    "stats-factories": "مصنع مسجل",
    "stats-countries": "دولة تتعامل معنا",
    "stats-support": "دعم فني",

    // Features
    "platform-features": "ميزات المنصة",
    "why-choose": "لماذا تختار Etradeling؟",
    "features-subtitle":
      "نوفر لك كل ما تحتاجه لتنمية أعمالك وزيادة مبيعاتك بطرق مبتكرة وفعالة",
    "global-reach": "وصول عالمي",
    "global-reach-desc":
      "اعرض منتجاتك لمشترين من أكثر من 50 دولة حول العالم مع ترجمة تلقائية متعددة اللغات",
    "secure-transactions": "أمان المعاملات",
    "secure-desc":
      "نضمن أمان جميع المعاملات والدفعات عبر منصتنا الآمنة مع تأمين ضد المخاطر التجارية",
    "support-247": "دعم 24/7",
    "support-desc":
      "فريق الدعم متاح على مدار الساعة لمساعدتك في أي وقت بخبراء متخصصين في التجارة الدولية",
    analytics: "تحليلات متقدمة",
    "analytics-desc": "احصل على تقارير شاملة عن أداء مصنعك ومبيعاتك",
    "mobile-app": "تطبيق موبايل",
    "mobile-app-desc": "أدر أعمالك من أي مكان عبر تطبيقنا",
    partnerships: "شراكات استراتيجية",
    "partnerships-desc": "نساعدك في بناء شراكات طويلة المدى",

    // Video Section
    "simple-steps": "خطوات بسيطة",
    "video-title": "كيف تعمل منصة Etradeling؟",
    "video-subtitle":
      "شاهد الفيديو القصير وتعرّف على كيفية ربط Etradeling للمصانع المصرية بالمشترين العالميين في 4 خطوات بسيطة",
    "video-step1": "التسجيل والتحقق",
    "video-step1-desc": "عملية تسجيل سهلة مع التحقق من المصنع خلال 24 ساعة",
    "video-step2": "إنشاء المتجر",
    "video-step2-desc": "أدوات سهلة لإنشاء متجرك الإلكتروني وعرض منتجاتك",
    "video-step3": "الوصول للعملاء",
    "video-step3-desc": "عرض منتجاتك لآلاف المشترين العالميين المؤهلين",
    featured: "مميز",
    "video-tour": "جولة في منصة Etradeling",
    "video-duration": "3:45 دقيقة",

    // Testimonials
    "testimonials-title": "ماذا يقول عملاؤنا؟",
    "testimonials-subtitle":
      "قصص نجاح حقيقية من أصحاب المصانع المصرية الذين اختاروا Etradeling",
    "testimonial1-name": "أحمد حسن",
    "testimonial1-position": "مدير مصنع النسيج الحديث",
    "testimonial1-text":
      "بعد التسجيل في Etrabeling، زادت مبيعاتنا بنسبة 300% خلال 6 أشهر فقط. المنصة سهلة الاستخدام والدعم ممتاز.",
    "testimonial2-name": "فاطمة علي",
    "testimonial2-position": "مالكة مصنع الأغذية المتطورة",
    "testimonial2-text":
      "منصة Etrabeling فتحت لنا أسواق جديدة في أوروبا وأفريقيا. الآن نصدر منتجاتنا لأكثر من 15 دولة.",
    "testimonial3-name": "محمد سعيد",
    "testimonial3-position": "رئيس مجلس إدارة مصانع الكيماويات",
    "testimonial3-text":
      "التحقق من الجودة والمصداقية على المنصة زاد من ثقة العملاء بنا. نحصل على طلبات عالية الجودة يومياً.",

    // CTA Section
    "cta-title": "مستعد لتنمية أعمالك عالمياً؟",
    "cta-subtitle":
      "انضم لآلاف المصانع المصرية الناجحة واعرض منتجاتك للعالم كله. التسجيل مجاني والبداية سهلة مع دعم متكامل لكل مراحل التصدير",
    "cta-button": "ابدأ رحلتك الآن",
    "cta-or-call": "أو اتصل بنا: 01000000000",
    "cta-stat1": "مجاني للبداية",
    "cta-stat2": "دقائق للتسجيل",
    "5-minutes": "دقائق",
    "cta-stat3": "ساعة للتحقق",
    "24-hours": "ساعة",

    // Registration Form
    "register-title": "سجل مصنعك الآن",
    "register-subtitle":
      "انضم لآلاف المصانع الناجحة وابدأ رحلتك نحو التوسع العالمي",
    "factory-name": "اسم المصنع",
    "industry-type": "نوع الصناعة",
    "select-industry": "اختر نوع الصناعة",
    "industry-textiles": "النسيج والملابس",
    "industry-food": "الصناعات الغذائية",
    "industry-chemicals": "الكيماويات",
    "industry-furniture": "الأثاث",
    "industry-other": "أخرى",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    "register-button": "سجل مجاناً الآن",
    "terms-agreement": "بالتسجيل، أنت توافق على",
    terms: "الشروط والأحكام",
    and: "و",
    privacy: "سياسة الخصوصية",

    // Stats Section
    "stats-satisfaction": "رضا العملاء",
    "stats-satisfaction-desc": "أعلى معدل رضا بين المنصات المماثلة",
    "stats-sales": "زيادة المبيعات",
    "stats-sales-desc": "في المتوسط بعد 6 أشهر من الاستخدام",
    "stats-response": "سرعة الرد",
    "stats-response-desc": "أقل وقت للرد على استفسارات العملاء",

    // Trusted Companies Section
    "trusted-companies": "موثوق به من قبل كبرى الشركات",
    "trusted-companies-desc":
      "نفخر بثقة أكبر الشركات المصرية والعالمية في خدماتنا ومنصتنا",

    // Footer
    "footer-about":
      "المنصة الرائدة في ربط المصانع المصرية بالمشترين العالميين. نساعدك في الوصول إلى أسواق جديدة وزيادة صادراتك",
    "footer-quick-links": "روابط سريعة",
    "footer-about-us": "عن Etradeling",
    "footer-services": "خدماتنا",
    "footer-success": "قصص النجاح",
    "footer-blog": "المدونة",
    "footer-contact": "اتصل بنا",
    "footer-contact-us": "اتصل بنا",
    "footer-address": "القاهرة، مصر",
    "footer-phone": "+20 100 000 0000",
    "footer-email": "info@etradeling.com",
    "footer-copyright": "© 2025 Etradeling. جميع الحقوق محفوظة",
    "footer-terms": "الشروط والأحكام",
    "footer-privacy": "سياسة الخصوصية",

    // Trust Indicators
    "trust-complete": "موثوقية تامة",
    "trust-complete-desc": "نظام تحقق متكامل من هوية الشركات والمصانع",
    "trust-partnerships": "شراكات استراتيجية",
    "trust-partnerships-desc": "تعاون مع أكبر المؤسسات الصناعية والتجارية",
    "trust-growth": "نمو مستمر",
    "trust-growth-desc": "زيادة سنوية في حجم التعاملات والشركات المسجلة",

    // FAQ Section
    "faq-title": "الأسئلة الشائعة",
    "faq-subtitle": "أجوبة على أكثر الأسئلة التي تهم أصحاب المصانع",
    "faq-cost-question": "ما هي تكلفة التسجيل في المنصة؟",
    "faq-cost-answer":
      "التسجيل في منصة Etradeling مجاني تماماً بدون أي تكاليف خفية. نحن نربطك بالعملاء العالميين بدون أي رسوم تسجيل أو اشتراكات شهرية. تبدأ التكاليف فقط عند إتمام صفقات ناجحة.",
    "faq-verification-question": "كم يستغرق التحقق من المصنع؟",
    "faq-verification-answer":
      "عملية التحقق من المصنع تستغرق عادة 24-48 ساعة عمل. نحن نتحقق من معلومات المصنع وتراخيصه لضمان مصداقية المنصة وجدية جميع الأعضاء المسجلين.",
    "faq-shipping-question": "هل تقدمون خدمات شحن دولي؟",
    "faq-shipping-answer":
      "نعم، نتعاون مع شركات شحن عالمية لتوفير حلول لوجستية متكاملة. يمكنك اختيار شركة الشحن المناسبة من خلال المنصة أو استخدام خدماتنا اللوجستية المتكاملة.",
    "view-all-questions": "عرض جميع الأسئلة",

    // Company Names
    "company-suez": "هيئة قناة السويس",
    "company-orascom": "أوراسكوم للإنشاءات",
    "company-sewedy": "السويدي إليكتريك",
    "company-arab-contractors": "المقاولون العرب",
    "company-siemens": "سيمنز العالمية",
    "company-ge": "جنرال إلكتريك",
    "company-steel": "حديد المصريين",
    "company-alex": "أسمدة الإسكندرية",

    // Last FAQ
    "faq-rights-question": "كيف يتم ضمان حقوق المصنع؟",
    "faq-rights-answer":
      "نقدم نظام دفع آمن حيث يتم تجميع المبلغ في حساب وسيط حتى استلام المشتري للبضاعة. كما نقدم خدمات تحكيم في حالة النزاعات وضمانات للدفع لجميع الأطراف.",

    // Form Placeholders
    "placeholder-factory-name": "اسم المصنع",
    "placeholder-email": "البريد الإلكتروني",
    "placeholder-phone": "رقم الهاتف",
    "placeholder-select-industry": "اختر نوع الصناعة",

    // Mobile & Tablet Navigation
    "mobile-menu-close": "إغلاق القائمة",
    "mobile-menu-open": "فتح القائمة",
    "tablet-menu-open": "فتح القائمة",
    "mobile-start-free": "بدء الآن مجاناً",
    "mobile-login": "الدخول",
    "mobile-how-works": "كيف يعمل",
    "mobile-features": "المميزات",
    "mobile-testimonials": "آراء العملاء",
  },
  en: {
    // Navigation
    "how-it-works": "How It Works",
    features: "Features",
    testimonials: "Testimonials",
    "start-journey": "Start Journey",
    "start-now": "Start Now",
    login: "Login",

    // Hero Section
    "hero-title": "Connect Your Factory to the World with Etradeling",
    "hero-subtitle":
      "The Leading Platform Connecting Egyptian Factories with Global Buyers",
    "hero-description":
      "Get new customers and showcase your products to the world through integrated solutions designed specifically for your success",
    "start-free": "Start Free Now",
    "watch-video": "Watch Video",

    // Stats
    "stats-factories": "Registered Factories",
    "stats-countries": "Countries",
    "stats-support": "Support",

    // Features
    "platform-features": "Platform Features",
    "why-choose": "Why Choose Etradeling?",
    "features-subtitle":
      "We provide everything you need to grow your business and increase sales innovatively",
    "global-reach": "Global Reach",
    "global-reach-desc":
      "Showcase your products to buyers from over 50 countries worldwide with automatic multilingual translation",
    "secure-transactions": "Secure Transactions",
    "secure-desc":
      "We ensure the security of all transactions and payments through our platform with trade risk insurance",
    "support-247": "24/7 Support",
    "support-desc":
      "Support team available around the clock with experts in international trade",
    analytics: "Advanced Analytics",
    "analytics-desc":
      "Get comprehensive reports about your factory performance and sales",
    "mobile-app": "Mobile App",
    "mobile-app-desc": "Manage your business from anywhere through our app",
    partnerships: "Strategic Partnerships",
    "partnerships-desc": "We help you build long-term partnerships",

    // Video Section
    "simple-steps": "Simple Steps",
    "video-title": "How Does Etradeling Work?",
    "video-subtitle":
      "Watch the short video and learn how Etradeling connects Egyptian factories with global buyers in 4 simple steps",
    "video-step1": "Registration & Verification",
    "video-step1-desc":
      "Easy registration process with factory verification within 24 hours",
    "video-step2": "Store Creation",
    "video-step2-desc":
      "Easy tools to create your online store and showcase products",
    "video-step3": "Reach Customers",
    "video-step3-desc":
      "Display your products to thousands of qualified global buyers",
    featured: "Featured",
    "video-tour": "Tour of Etradeling Platform",
    "video-duration": "3:45 minutes",

    // Testimonials
    "testimonials-title": "What Our Clients Say",
    "testimonials-subtitle":
      "Real success stories from Egyptian factory owners who chose Etradeling",
    "testimonial1-name": "Ahmed Hassan",
    "testimonial1-position": "Manager of Modern Textile Factory",
    "testimonial1-text":
      "After registering with Etradeling, our sales increased by 300% in just 6 months. The platform is easy to use and support is excellent.",
    "testimonial2-name": "Fatma Ali",
    "testimonial2-position": "Owner of Advanced Food Industries",
    "testimonial2-text":
      "Etradeling platform opened new markets for us in Europe and Africa. We now export our products to more than 15 countries.",
    "testimonial3-name": "Mohamed Saeed",
    "testimonial3-position": "Chairman of Chemical Industries",
    "testimonial3-text":
      "The quality and credibility verification on the platform increased customer trust in us. We receive high-quality orders daily.",

    // CTA Section
    "cta-title": "Ready to Grow Your Business Globally?",
    "cta-subtitle":
      "Join thousands of successful Egyptian factories and showcase your products to the world. Registration is free and getting started is easy with comprehensive support for all export stages",
    "cta-button": "Start Your Journey Now",
    "cta-or-call": "Or Call Us: 01000000000",
    "cta-stat1": "Free to Start",
    "cta-stat2": "Minutes to Register",
    "5-minutes": "Minutes",
    "cta-stat3": "Hours for Verification",
    "24-hours": "Hours",

    // Registration Form
    "register-title": "Register Your Factory Now",
    "register-subtitle":
      "Join thousands of successful factories and start your global expansion journey",
    "factory-name": "Factory Name",
    "industry-type": "Industry Type",
    "select-industry": "Select Industry Type",
    "industry-textiles": "Textiles & Clothing",
    "industry-food": "Food Industries",
    "industry-chemicals": "Chemicals",
    "industry-furniture": "Furniture",
    "industry-other": "Other",
    email: "Email Address",
    phone: "Phone Number",
    "register-button": "Register Free Now",
    "terms-agreement": "By registering, you agree to our",
    terms: "Terms & Conditions",
    and: "and",
    privacy: "Privacy Policy",

    // Stats Section
    "stats-satisfaction": "Customer Satisfaction",
    "stats-satisfaction-desc":
      "Highest satisfaction rate among similar platforms",
    "stats-sales": "Sales Increase",
    "stats-sales-desc": "Average increase after 6 months of usage",
    "stats-response": "Response Time",
    "stats-response-desc": "Fastest response time to customer inquiries",

    // Trusted Companies Section
    "trusted-companies": "Trusted by Leading Companies",
    "trusted-companies-desc":
      "We are proud to have the trust of major Egyptian and international companies in our services and platform",

    // Footer
    "footer-about":
      "The leading platform connecting Egyptian factories with global buyers. We help you reach new markets and increase your exports",
    "footer-quick-links": "Quick Links",
    "footer-about-us": "About Etradeling",
    "footer-services": "Our Services",
    "footer-success": "Success Stories",
    "footer-blog": "Blog",
    "footer-contact": "Contact Us",
    "footer-contact-us": "Contact Us",
    "footer-address": "Cairo, Egypt",
    "footer-phone": "+20 100 000 0000",
    "footer-email": "info@etradeling.com",
    "footer-copyright": "© 2025 Etradeling. All rights reserved",
    "footer-terms": "Terms & Conditions",
    "footer-privacy": "Privacy Policy",

    // Trust Indicators
    "trust-complete": "Complete Reliability",
    "trust-complete-desc":
      "Integrated verification system for company and factory identities",
    "trust-partnerships": "Strategic Partnerships",
    "trust-partnerships-desc":
      "Collaboration with major industrial and commercial institutions",
    "trust-growth": "Continuous Growth",
    "trust-growth-desc":
      "Annual increase in transaction volume and registered companies",

    // FAQ Section
    "faq-title": "Frequently Asked Questions",
    "faq-subtitle": "Answers to the most common questions from factory owners",
    "faq-cost-question": "What is the registration cost on the platform?",
    "faq-cost-answer":
      "Registration on Etradeling is completely free with no hidden costs. We connect you with global customers without any registration fees or monthly subscriptions. Costs only begin when successful deals are completed.",
    "faq-verification-question": "How long does factory verification take?",
    "faq-verification-answer":
      "The factory verification process usually takes 24-48 business hours. We verify factory information and licenses to ensure platform credibility and the seriousness of all registered members.",
    "faq-shipping-question": "Do you provide international shipping services?",
    "faq-shipping-answer":
      "Yes, we partner with global shipping companies to provide integrated logistics solutions. You can choose the appropriate shipping company through the platform or use our integrated logistics services.",
    "view-all-questions": "View All Questions",

    // Company Names
    "company-suez": "Suez Canal Authority",
    "company-orascom": "Orascom Construction",
    "company-sewedy": "El Sewedy Electric",
    "company-arab-contractors": "Arab Contractors",
    "company-siemens": "Siemens Global",
    "company-ge": "General Electric",
    "company-steel": "Egyptian Steel",
    "company-alex": "Alexandria Fertilizers",

    // Last FAQ
    "faq-rights-question": "How are factory rights guaranteed?",
    "faq-rights-answer":
      "We provide a secure payment system where the amount is collected in an escrow account until the buyer receives the goods. We also provide arbitration services in case of disputes and payment guarantees for all parties.",

    // Form Placeholders
    "placeholder-factory-name": "Factory Name",
    "placeholder-email": "Email Address",
    "placeholder-phone": "Phone Number",
    "placeholder-select-industry": "Select Industry Type",

    // Mobile & Tablet Navigation
    "mobile-menu-close": "Close Menu",
    "mobile-menu-open": "Open Menu",
    "tablet-menu-open": "Open Menu",
    "mobile-start-free": "Start Free Now",
    "mobile-login": "Login",
    "mobile-how-works": "How It Works",
    "mobile-features": "Features",
    "mobile-testimonials": "Testimonials",
  },
};
// Language switching functionality
document.addEventListener("DOMContentLoaded", function () {
  const langToggle = document.getElementById("lang-toggle");
  const htmlElement = document.documentElement;

  // Check for saved language preference, otherwise use browser language
  const savedLang = localStorage.getItem("language") || "ar";
  setLanguage(savedLang);

  langToggle.addEventListener("click", function () {
    const currentLang = htmlElement.getAttribute("lang");
    const newLang = currentLang === "ar" ? "en" : "ar";
    setLanguage(newLang);
  });

  function setLanguage(lang) {
    // Update HTML lang attribute
    htmlElement.setAttribute("lang", lang);

    // Update dir attribute
    htmlElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    // Update content
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    // Update placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      if (translations[lang][key]) {
        element.placeholder = translations[lang][key];
      }
    });

    // Update aria-labels
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.getAttribute("data-i18n-aria-label");
      if (translations[lang][key]) {
        element.setAttribute("aria-label", translations[lang][key]);
      }
    });

    // Update language toggle button text
    document.querySelectorAll(".lang-ar, .lang-en").forEach((el) => {
      el.classList.toggle("hidden");
      el.classList.toggle("block");
    });

    // Store the language preference
    localStorage.setItem("language", lang);

    // Add appropriate CSS classes
    document.body.classList.toggle("rtl-support", lang === "ar");
    document.body.classList.toggle("ltr-support", lang === "en");
  }
});
