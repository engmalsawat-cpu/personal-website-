import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type Lang = 'ar' | 'en';

interface LanguageContextValue {
  lang: Lang;
  isAr: boolean;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// ─── Translations ──────────────────────────────────────────────────────────────
const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Brand
    'brand.name': 'Mohammed Alsawat',
    'brand.tagline': 'Work Systems & AI',

    // Nav
    'nav.work': 'Work systems',
    'nav.ai': 'AI & automation',
    'nav.about': 'About',
    'nav.cta': 'Get in touch',

    // Mobile menu
    'mobile.whatsapp': 'Message on WhatsApp',

    // Hero
    'hero.line1': "There's a",
    'hero.line2': 'better',
    'hero.word': 'way.',
    'hero.intro': 'I help teams simplify workflows, choose the right tools, and use practical AI automation.',
    'hero.cta': 'Get in touch',
    'hero.img.alt': 'A calm workflow consultant standing before a busy team, with one clear yellow path through the surrounding process chaos',

    // Services
    'services.kicker': 'How I help',
    'services.h2': 'Better systems.\nLess friction.',
    'services.body': 'I connect the way people work, the tools they use, and the automations that can give them time back.',

    'service.01.title': 'Workflow design',
    'service.01.body': 'Turn scattered processes into a clear way of working that people can actually follow.',
    'service.01.tag': 'Clarity',

    'service.02.title': 'Tools that fit the work',
    'service.02.body': 'Set up Asana, Notion, or ClickUp around your team—not the other way around.',
    'service.02.tag': 'Structure',

    'service.03.title': 'Simple AI & automation',
    'service.03.body': 'Remove repetitive steps with practical automations that stay understandable and useful.',
    'service.03.tag': 'Momentum',

    // Testimonials
    'testimonials.kicker': 'What clients say',
    'testimonial.1.quote': "Abu Saleh is one of the best people we've worked with. He makes everything more connected through his tools and automations.",
    'testimonial.1.author': 'Amro Alharbi',
    'testimonial.1.role': 'Co-founder, Seamlabs Ventures Studio',
    'testimonial.2.quote': "Abu Saleh is one of the best people you'll ever work with.",
    'testimonial.2.author': 'Almohaned Al-Marwai',
    'testimonial.2.role': 'Founder & CEO, Pure Coffee',

    // Approach
    'approach.kicker': 'A practical approach',
    'approach.h2': 'From tangled to clear.',
    'approach.body': 'No heavy transformation program. Just a thoughtful look at the work, a simpler design, and useful changes your team can keep.',

    'step.01.title': 'See the real work',
    'step.01.body': 'I map how work moves today, including the handoffs, bottlenecks, and workarounds.',
    'step.02.title': 'Create the clear path',
    'step.02.body': 'Together we simplify the process and give every tool a clear purpose.',
    'step.03.title': 'Make it easier to run',
    'step.03.body': 'We automate the repeatable parts and leave your team with a system they can own.',

    // About
    'about.note': 'About the work',
    'about.h2.line1': 'I make the complicated',
    'about.h2.em': 'easier to work with.',
    'about.p1': "I'm Mohammed Alsawat, a workflow systems and AI consultant based in Riyadh. I help teams step back from the daily noise and build a way of working that feels clearer, calmer, and easier to improve.",
    'about.p2': 'My work sits between people, process, and technology—from designing task systems to introducing practical AI and automation without adding more complexity.',

    // Contact
    'contact.kicker': 'Ready when you are',
    'contact.h2': 'Start a conversation.',
    'contact.sub': "Whether you have a specific project in mind or just want to see if there's a fit — reach out.",
    'contact.quickest': 'Quickest reply',
    'contact.whatsapp': 'Message on WhatsApp',
    'contact.whatsapp.note': 'Tap to open WhatsApp and start a chat directly.',
    'contact.send': 'Send a message',
    'contact.success': "Message received — I'll be in touch soon.",
    'contact.error': 'Something went wrong — try WhatsApp instead.',
    'form.name': 'Name',
    'form.name.placeholder': 'Your name',
    'form.email': 'Email',
    'form.email.placeholder': 'you@company.com',
    'form.message': 'Message',
    'form.message.placeholder': "Tell me what you're working on\u2026",
    'form.send': 'Send message →',
    'form.sending': 'Sending…',

    // Closing
    'closing.kicker': 'The work starts here',
    'closing.h2.line1': 'Less chaos.',
    'closing.h2.span': 'Clearer work.',
    'closing.cta': 'Get in touch',

    // Footer
    'footer.name': 'Mohammed Alsawat',
    'footer.services': 'Workflow Systems · Task Tools · Simple AI',
    'footer.location': 'Riyadh, Saudi Arabia · Available for selected consulting projects',
    'footer.whatsapp': 'WhatsApp ↗',
    'footer.top': 'Back to top ↑',
  },
  ar: {
    // Brand
    'brand.name': 'محمد السواط',
    'brand.tagline': 'أنظمة عمل والذكاء الاصطناعي',

    // Nav
    'nav.work': 'أنظمة العمل',
    'nav.ai': 'الذكاء الاصطناعي والأتمتة',
    'nav.about': 'عني',
    'nav.cta': 'تواصل معي',

    // Mobile menu
    'mobile.whatsapp': 'راسلني على واتساب',

    // Hero
    'hero.line1': 'ثمة',
    'hero.line2': 'طريقة',
    'hero.word': 'أفضل.',
    'hero.intro': 'أساعد الفرق على تبسيط سير العمل، واختيار الأدوات المناسبة، وتطبيق أتمتة الذكاء الاصطناعي بشكل عملي.',
    'hero.cta': 'تواصل معي',
    'hero.img.alt': 'مستشار هادئ يقف أمام فريق مشغول، مع مسار أصفر واضح وسط فوضى العمليات',

    // Services
    'services.kicker': 'كيف أساعد',
    'services.h2': 'أنظمة أفضل.\nاحتكاك أقل.',
    'services.body': 'أربط بين طريقة عمل الفريق، والأدوات المستخدمة، والأتمتة التي تمنح الناس وقتهم.',

    'service.01.title': 'تصميم سير العمل',
    'service.01.body': 'حوّل العمليات المتفرقة إلى طريقة عمل واضحة يستطيع الجميع اتباعها.',
    'service.01.tag': 'وضوح',

    'service.02.title': 'أدوات تناسب العمل',
    'service.02.body': 'نبني Asana أو Notion أو ClickUp حول فريقك — وليس العكس.',
    'service.02.tag': 'هيكلة',

    'service.03.title': 'الذكاء الاصطناعي والأتمتة البسيطة',
    'service.03.body': 'نزيل الخطوات المتكررة بأتمتة عملية تبقى مفهومة ومفيدة.',
    'service.03.tag': 'زخم',

    // Testimonials
    'testimonials.kicker': 'ما يقوله العملاء',
    'testimonial.1.quote': 'أبو صالح من أفضل الناس الذين تعاملنا معهم. يجعل كل شيء أكثر ترابطاً من خلال أدواته وأتمتته.',
    'testimonial.1.author': 'عمرو الحربي',
    'testimonial.1.role': 'مؤسس مشارك، Seamlabs Ventures Studio',
    'testimonial.2.quote': 'أبو صالح من أفضل الناس الذين ستتعامل معهم على الإطلاق.',
    'testimonial.2.author': 'المهند المرواعي',
    'testimonial.2.role': 'المؤسس والرئيس التنفيذي، Pure Coffee',

    // Approach
    'approach.kicker': 'نهج عملي',
    'approach.h2': 'من الفوضى إلى الوضوح.',
    'approach.body': 'لا برامج تحول ثقيلة. فقط نظرة متأنية على العمل، وتصميم أبسط، وتغييرات مفيدة يستطيع فريقك الحفاظ عليها.',

    'step.01.title': 'رؤية العمل الحقيقي',
    'step.01.body': 'أرسم خريطة لكيفية سير العمل اليوم، بما في ذلك نقاط التسليم والاختناقات والحلول المؤقتة.',
    'step.02.title': 'رسم المسار الواضح',
    'step.02.body': 'معاً نبسّط العملية ونمنح كل أداة غرضاً واضحاً.',
    'step.03.title': 'جعل التنفيذ أسهل',
    'step.03.body': 'نؤتمت الأجزاء المتكررة ونترك لفريقك نظاماً يستطيع امتلاكه.',

    // About
    'about.note': 'عن العمل',
    'about.h2.line1': 'أجعل المعقد',
    'about.h2.em': 'أسهل في التعامل.',
    'about.p1': 'أنا محمد السواط، مستشار في أنظمة سير العمل والذكاء الاصطناعي، مقيم في الرياض. أساعد الفرق على التراجع عن ضوضاء اليوم وبناء طريقة عمل تبدو أوضح وأهدأ وأسهل في التحسين.',
    'about.p2': 'عملي يقع بين الناس والعملية والتكنولوجيا — من تصميم أنظمة المهام إلى إدخال الذكاء الاصطناعي والأتمتة العملية دون إضافة تعقيد.',

    // Contact
    'contact.kicker': 'جاهز متى كنت',
    'contact.h2': 'ابدأ محادثة.',
    'contact.sub': 'سواء كان لديك مشروع محدد في ذهنك أو تريد فقط معرفة ما إذا كان هناك تناسب — تواصل.',
    'contact.quickest': 'أسرع رد',
    'contact.whatsapp': 'راسلني على واتساب',
    'contact.whatsapp.note': 'اضغط لفتح واتساب وبدء محادثة مباشرة.',
    'contact.send': 'أرسل رسالة',
    'contact.success': 'تم استلام رسالتك — سأتواصل معك قريباً.',
    'contact.error': 'حدث خطأ ما — جرب واتساب بدلاً من ذلك.',
    'form.name': 'الاسم',
    'form.name.placeholder': 'اسمك',
    'form.email': 'البريد الإلكتروني',
    'form.email.placeholder': 'you@company.com',
    'form.message': 'الرسالة',
    'form.message.placeholder': 'أخبرني بما تعمل عليه…',
    'form.send': 'إرسال الرسالة ←',
    'form.sending': 'جارٍ الإرسال…',

    // Closing
    'closing.kicker': 'العمل يبدأ هنا',
    'closing.h2.line1': 'فوضى أقل.',
    'closing.h2.span': 'عمل أوضح.',
    'closing.cta': 'تواصل معي',

    // Footer
    'footer.name': 'م. محمد السواط',
    'footer.services': 'أنظمة سير العمل · أدوات المهام · الذكاء الاصطناعي البسيط',
    'footer.location': 'الرياض، المملكة العربية السعودية · متاح لمشاريع استشارية مختارة',
    'footer.whatsapp': 'واتساب ↗',
    'footer.top': 'العودة للأعلى ↑',
  },
};

// ─── Detect initial language ──────────────────────────────────────────────────
function detectLanguage(): Lang {
  const stored = localStorage.getItem('lang');
  if (stored === 'ar' || stored === 'en') return stored;

  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  const isArabic = langs.some(l => l.toLowerCase().startsWith('ar'));
  return isArabic ? 'ar' : 'en';
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => detectLanguage());

  // Sync <html> dir + lang attribute
  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  const toggle = useCallback(() => {
    setLang(prev => {
      const next: Lang = prev === 'ar' ? 'en' : 'ar';
      localStorage.setItem('lang', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key: string) => translations[lang][key] ?? translations['en'][key] ?? key,
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, isAr: lang === 'ar', toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
