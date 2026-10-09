// Projects shown in the "Projects" showcase.
// Each project has a self-contained interactive preview at /projects/<slug>.html
// (rebuilt from the real app's main screens, with sample data).
// To add a project: drop its preview HTML in public/projects/ and add an entry here.
// Preview contract: ?screen=<id> opens a screen, ?mode=thumb autoplays; it posts
// {type:'pw:ready'|'pw:screen-changed'} to the parent and listens for {type:'pw:screen', id}.

export type L = { ar: string; en: string };

export interface ProjectScreen {
  id: string;
  label: L;
}

export interface Project {
  slug: string;
  /** Best device frame for the preview */
  platform: 'desktop' | 'mobile';
  /** Brand color of the project itself */
  accent: string;
  name: L;
  tagline: L;
  problem: L;
  solution: L;
  highlights: { ar: string[]; en: string[] };
  stack: string[];
  screens: ProjectScreen[];
  repoUrl?: string;
  isPrivate: boolean;
}

const s = (id: string, ar: string, en: string): ProjectScreen => ({ id, label: { ar, en } });

export const projects: Project[] = [
  {
    slug: 'mahami',
    platform: 'desktop',
    accent: '#D66A1A',
    name: { ar: 'مهامي', en: 'Mahami' },
    tagline: {
      ar: 'مساحة عمل يومية للمهام والملاحظات ووضع التركيز',
      en: 'A daily workspace for tasks, notes and focused work',
    },
    problem: {
      ar: 'المهام والملاحظات ومحاضر الاجتماعات موزّعة بين أكثر من أداة، فتضيع الأولويات وتتأخر المتابعات. وأغلب الأدوات لا تتعامل جيداً مع الكتابة العربية.',
      en: 'Tasks, notes and meeting minutes were spread across several tools, so priorities slipped and follow-ups ran late. Most tools also handle Arabic poorly.',
    },
    solution: {
      ar: 'تطبيق عربي يعمل على الجوال والكمبيوتر، يجمع نظرة اليوم ولوح المهام والملاحظات في مكان واحد، مع وضع تركيز وإضافة سريعة تفهم عبارات مثل «بكرة» و#عمل.',
      en: 'An Arabic app for phone and desktop that brings the day’s overview, the task board and notes together, with a focus mode and quick-add that understands phrases like “tomorrow” and #work.',
    },
    highlights: {
      ar: [
        'لوح مهام بمراحل قابلة للتخصيص وخطوات ومهام فرعية',
        'وضع تركيز يحصر خطة اليوم في خمس مهام',
        'ألوان وأشكال تناسب من يصعب عليه تمييز الأحمر من الأخضر',
      ],
      en: [
        'Task board with custom stages, steps and subtasks',
        'Focus mode that caps the day’s plan at five tasks',
        'Colours and shapes that work for red–green colour blindness',
      ],
    },
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'PWA'],
    screens: [
      s('overview', 'نظرة عامة', 'Overview'),
      s('tasks', 'المهام', 'Task board'),
      s('task', 'بطاقة المهمة', 'Task detail'),
      s('notes', 'الملاحظات', 'Notes'),
      s('focus', 'وضع التركيز', 'Focus mode'),
    ],
    isPrivate: true,
  },
  {
    slug: 'nasab',
    platform: 'mobile',
    accent: '#9C7C33',
    name: { ar: 'شجرة نسب السوطة', en: 'Al-Sawtah Family Tree' },
    tagline: {
      ar: 'اكتب اسمك واسم أبيك، فتُفتح الشجرة على مكانك',
      en: 'Type your name and your father’s, and the tree opens on you',
    },
    problem: {
      ar: 'النسب كان محفوظاً في أوراق ومجموعات واتساب متفرقة، فلا مرجع واحد موثوق، ولا طريقة سهلة لتصحيح خطأ أو إضافة مولود.',
      en: 'The lineage lived in papers and WhatsApp groups, with no single trusted source and no easy way to fix a mistake or add a newborn.',
    },
    solution: {
      ar: 'تطبيق جوال بلا حسابات للزوار: شجرة دائرية تتمحور حول أي شخص، وبحث بالاسم، وحساب القرابة بين أي اسمين، وبطاقة نسب للمشاركة. والتعديلات يراجعها المشرفون قبل اعتمادها.',
      en: 'A mobile app with no visitor accounts: a radial tree centred on anyone, name search, a relationship finder for any two names and a shareable lineage card. Admins review every change first.',
    },
    highlights: {
      ar: ['شجرة دائرية تتحرك بسلاسة عند اختيار أي اسم', '«ما صلتي به؟» مع الجد المشترك', 'بطاقة نسب بخمسة أشكال وأخبار العائلة'],
      en: ['Radial tree that glides to any name you tap', '“How are we related?” with the common ancestor', 'Lineage card in five styles, plus family news'],
    },
    stack: ['TanStack Start', 'React', 'PostgreSQL', 'Canvas', 'PWA'],
    screens: [
      s('home', 'الرئيسية', 'Home'),
      s('search', 'ابحث عن اسمك', 'Search'),
      s('tree', 'الشجرة', 'Tree'),
      s('relation', 'ما صلتي به؟', 'Relationship'),
      s('card', 'بطاقة النسب', 'Lineage card'),
      s('news', 'أخبار العائلة', 'Family news'),
    ],
    isPrivate: true,
  },
  {
    slug: 'research-navigator',
    platform: 'desktop',
    accent: '#37625E',
    name: { ar: 'متابعة بحوث الموسوعة', en: 'Research Navigator' },
    tagline: {
      ar: 'كل بحث في موسوعة الحج والحرمين، في كل مرحلة، بنظرة واحدة',
      en: 'Every paper of the Hajj encyclopedia, at every stage, at a glance',
    },
    problem: {
      ar: 'مئات البحوث موزعة على أقسام ومحاور، ويعمل عليها باحثون ومحكّمون ومراجعون. والمتابعة بالجداول لا تكشف نسبة الإنجاز الفعلية ولا البحوث المتأخرة.',
      en: 'Hundreds of papers across sections and axes, with researchers, referees and reviewers. Spreadsheets couldn’t show real progress or which papers were late.',
    },
    solution: {
      ar: 'نظام عربي يمر فيه كل بحث بست مراحل موزونة، مع لوحة معلومات تقارن الفترات، ولوحة مراحل بالسحب والإفلات، ومراقبة للمخاطر حسب أيام التأخر.',
      en: 'An Arabic system that moves each paper through six weighted stages, with a dashboard comparing periods, a drag-and-drop stage board and a risk monitor based on days overdue.',
    },
    highlights: {
      ar: ['نسب إنجاز موزونة تتحدّث فوراً', 'مراقبة المراحل بمستويات خطر', 'مقارنة الإنجاز بيوم أو أسبوع أو شهر'],
      en: ['Weighted progress that updates instantly', 'Stage monitor with risk levels', 'Compare progress by day, week or month'],
    },
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Recharts'],
    screens: [
      s('dashboard', 'لوحة المعلومات', 'Dashboard'),
      s('board', 'لوحة المراحل', 'Stage board'),
      s('papers', 'إدارة البحوث', 'Papers'),
      s('paper', 'تفاصيل البحث', 'Paper details'),
      s('monitor', 'مراقبة المراحل', 'Stage monitor'),
      s('axes', 'المحاور', 'Axes'),
    ],
    repoUrl: 'https://github.com/engmalsawat-cpu/Research-Navigator',
    isPrivate: false,
  },
  {
    slug: 'jms',
    platform: 'desktop',
    accent: '#1B4F98',
    name: { ar: 'منصة JMS للأبحاث', en: 'JMS Research Platform' },
    tagline: {
      ar: 'من تقديم البحث حتى نشره: تحكيم ولجان ومراسلات في منصة واحدة',
      en: 'From submission to publication: review, committees and messages in one place',
    },
    problem: {
      ar: 'تُدار الأبحاث في المراكز العلمية بالبريد والجداول، فيصعب معرفة أين وصل كل بحث، ومن تأخر من المحكّمين، وما الخطوة التالية.',
      en: 'Research centres ran papers through email and spreadsheets, so it was hard to see where each paper stood, which reviewers were late and what came next.',
    },
    solution: {
      ar: 'منصة ثنائية اللغة تنقل كل بحث بين مراحل واضحة: فحص أولي ثم تحكيم ثم تصويت اللجنة ثم القرار. لكل دور صندوق مهام، ولوحة تشغيل تكشف المتأخر.',
      en: 'A bilingual platform that moves each paper through clear stages: screening, review, committee vote and decision. Every role has a task inbox, and an operations dashboard flags delays.',
    },
    highlights: {
      ar: ['لوحة تشغيل بتحليلات وكانبان وأداء المحكّمين', 'صفحة بحث تجيب: أين وصلنا وما الخطوة التالية؟', 'تحكيم بالمعايير وتصويت لجان بالأغلبية'],
      en: ['Operations dashboard with analytics, kanban and reviewer load', 'Paper page that answers “where are we, what’s next?”', 'Scored peer review and majority committee votes'],
    },
    stack: ['React', 'TypeScript', 'Supabase', 'Tailwind', 'i18n'],
    screens: [
      s('ops', 'لوحة التشغيل', 'Operations'),
      s('papers', 'الأبحاث', 'Papers'),
      s('paper', 'تفاصيل البحث', 'Paper detail'),
      s('inbox', 'صندوق المهام', 'Task inbox'),
      s('messages', 'الرسائل', 'Messages'),
    ],
    repoUrl: 'https://github.com/engmalsawat-cpu/jms-message-hub',
    isPrivate: false,
  },
  {
    slug: 'claude-skills',
    platform: 'desktop',
    accent: '#C2613F',
    name: { ar: 'مهارات Claude', en: 'Claude Skills' },
    tagline: {
      ar: 'أعلّم الذكاء الاصطناعي طريقة عملنا',
      en: 'Teaching AI the way we work',
    },
    problem: {
      ar: 'مستندات Word العربية التي يولّدها Claude تخرج باتجاه خاطئ، وكتابة قصص المستخدم لخدمات نسك تأخذ وقتاً ولا تلتزم دائماً بالقالب المعتمد.',
      en: 'Arabic Word files generated by Claude came out with the wrong direction, and Nusuk user stories took time and drifted from the approved template.',
    },
    solution: {
      ar: 'مهارتان مخصّصتان: الأولى تضبط اتجاه المستندات العربية والجداول تلقائياً، والثانية تكتب قصة مستخدم كاملة بقالب نسك مع السيناريوهات والحالات الحدّية.',
      en: 'Two custom skills: one fixes the direction of Arabic documents and tables automatically, the other writes a complete Nusuk user story with scenarios and edge cases.',
    },
    highlights: {
      ar: ['جداول وقوائم عربية سليمة الاتجاه', 'قصص مستخدم بقالب موحّد وسيناريوهات Gherkin', 'تعمل داخل Claude مباشرة'],
      en: ['Correct right-to-left tables and lists', 'User stories in one template with Gherkin scenarios', 'Runs directly inside Claude'],
    },
    stack: ['Claude Skills', 'docx-js', 'Node.js', 'Gherkin'],
    screens: [
      s('overview', 'نظرة عامة', 'Overview'),
      s('arabic-docx-rtl', 'مستند Word عربي', 'Arabic Word doc'),
      s('nusuk-user-story', 'قصة مستخدم نسك', 'Nusuk user story'),
    ],
    repoUrl: 'https://github.com/engmalsawat-cpu/claude-skills',
    isPrivate: false,
  },
];

export const previewUrl = (slug: string, params: Record<string, string> = {}) => {
  const q = new URLSearchParams(params).toString();
  return `${import.meta.env.BASE_URL}projects/${slug}.html${q ? `?${q}` : ''}`;
};
