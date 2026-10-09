// Projects shown in the "Projects" showcase.
// Each project has a self-contained interactive preview at /projects/<slug>.html
// (built from the real app's main screens, with sample data).
// To add a project: drop its preview HTML in public/projects/ and add an entry here.

export type L = { ar: string; en: string };

export interface ProjectScreen {
  id: string;
  label: L;
}

export interface Project {
  slug: string;
  /** Best device frame for the preview */
  platform: 'desktop' | 'mobile';
  /** Brand color of the project itself (used sparingly as a small dot) */
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

export const projects: Project[] = [
  {
    slug: 'mahami',
    platform: 'mobile',
    accent: '#171717',
    name: { ar: 'مهامي', en: 'Mahami' },
    tagline: { ar: 'مهامي وملاحظاتي في مكان واحد', en: 'My tasks and notes in one place' },
    problem: {
      ar: 'المهام والملاحظات كانت موزّعة بين تطبيقات كثيرة، وتسجيل فكرة سريعة يأخذ خطوات أكثر من اللازم.',
      en: 'Tasks and notes were scattered across apps, and capturing a quick thought took too many steps.',
    },
    solution: {
      ar: 'تطبيق شخصي سريع للمهام والملاحظات، بإضافة فورية ووضع تركيز، ومتصل بالمساعد الذكي.',
      en: 'A fast personal app for tasks and notes, with instant capture, a focus mode and an AI-assistant connection.',
    },
    highlights: {
      ar: ['إضافة فورية للمهام', 'وضع تركيز', 'ربط مع المساعد الذكي'],
      en: ['Instant capture', 'Focus mode', 'AI assistant integration'],
    },
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL'],
    screens: [],
    isPrivate: true,
  },
  {
    slug: 'nasab',
    platform: 'mobile',
    accent: '#171717',
    name: { ar: 'شجرة نسب السوطة', en: 'Al-Sawtah Family Tree' },
    tagline: { ar: 'شجرة العائلة في جيب كل فرد', en: 'The family tree in everyone’s pocket' },
    problem: {
      ar: 'شجرة النسب كانت محفوظة في ملفات وصور يصعب البحث فيها وتحديثها.',
      en: 'The family tree lived in files and images that were hard to search or update.',
    },
    solution: {
      ar: 'تطبيق جوال يبحث بالاسم، ويبيّن صلة القرابة بين أي اسمين، ويستقبل التحديثات ويراجعها المشرفون.',
      en: 'A mobile app to search by name, show how any two people are related, and collect updates reviewed by admins.',
    },
    highlights: {
      ar: ['بحث بالاسم واسم الأب', 'ما علاقتي به؟', 'بلاغات ومراجعة المشرفين'],
      en: ['Search by name and father', 'How are we related?', 'Reports with admin review'],
    },
    stack: ['TanStack Start', 'React', 'PostgreSQL', 'PWA'],
    screens: [],
    isPrivate: true,
  },
  {
    slug: 'research-navigator',
    platform: 'desktop',
    accent: '#171717',
    name: { ar: 'متابعة بحوث الموسوعة', en: 'Research Navigator' },
    tagline: { ar: 'كل بحث، في كل مرحلة، بنظرة واحدة', en: 'Every paper, every stage, at a glance' },
    problem: {
      ar: 'متابعة مئات البحوث عبر مراحل التحكيم والمراجعة كانت تتم بجداول متفرقة.',
      en: 'Tracking hundreds of papers across review stages was done in scattered spreadsheets.',
    },
    solution: {
      ar: 'نظام يتابع البحوث عبر ست مراحل موزونة، بلوحة مؤشرات ولوحة مراحل وفريق عمل.',
      en: 'A system tracking papers through six weighted stages, with dashboards, a stage board and team views.',
    },
    highlights: {
      ar: ['ست مراحل موزونة', 'لوحة مؤشرات ومقارنات', 'لوحة مراحل بالسحب والإفلات'],
      en: ['Six weighted stages', 'Analytics and comparisons', 'Drag-and-drop stage board'],
    },
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Recharts'],
    screens: [],
    repoUrl: 'https://github.com/engmalsawat-cpu/Research-Navigator',
    isPrivate: false,
  },
  {
    slug: 'jms',
    platform: 'desktop',
    accent: '#171717',
    name: { ar: 'نظام إدارة المجلة العلمية', en: 'Journal Management System' },
    tagline: { ar: 'من استلام البحث حتى قرار النشر', en: 'From submission to publication decision' },
    problem: {
      ar: 'إدارة البحوث والمحكّمين والمراسلات في مجلة علمية كانت يدوية ومتشعّبة.',
      en: 'Managing papers, reviewers and correspondence for a journal was manual and fragmented.',
    },
    solution: {
      ar: 'منصة تجمع تقديم البحوث، ومسار التحكيم، والمراسلات، ولوحة متابعة العمليات.',
      en: 'A platform combining submissions, the review workflow, messaging and an operations dashboard.',
    },
    highlights: {
      ar: ['مسار تحكيم واضح', 'صندوق مراسلات موحّد', 'لوحة عمليات'],
      en: ['Clear review workflow', 'Unified inbox', 'Operations dashboard'],
    },
    stack: ['React', 'TypeScript', 'Tailwind'],
    screens: [],
    repoUrl: 'https://github.com/engmalsawat-cpu/jms-message-hub',
    isPrivate: false,
  },
  {
    slug: 'claude-skills',
    platform: 'desktop',
    accent: '#171717',
    name: { ar: 'مهارات Claude', en: 'Claude Skills' },
    tagline: { ar: 'أعلّم الذكاء الاصطناعي طريقة عملنا', en: 'Teaching AI how we work' },
    problem: {
      ar: 'المساعد الذكي يكتب مستندات عربية باتجاه خاطئ، ولا يعرف قوالب العمل الداخلية.',
      en: 'AI assistants produce broken right-to-left Arabic documents and don’t know internal templates.',
    },
    solution: {
      ar: 'مهارات مخصّصة تجعل Claude يكتب مستندات Word عربية سليمة ويصوغ قصص المستخدم بقالب الفريق.',
      en: 'Custom skills that make Claude write proper Arabic Word documents and user stories in the team template.',
    },
    highlights: {
      ar: ['مستندات عربية سليمة الاتجاه', 'قصص مستخدم بقالب موحّد', 'تعمل داخل Claude مباشرة'],
      en: ['Correct RTL Arabic documents', 'User stories in one template', 'Runs inside Claude'],
    },
    stack: ['Claude Skills', 'JavaScript', 'docx'],
    screens: [],
    repoUrl: 'https://github.com/engmalsawat-cpu/claude-skills',
    isPrivate: false,
  },
];

export const previewUrl = (slug: string, params: Record<string, string> = {}) => {
  const q = new URLSearchParams(params).toString();
  return `${import.meta.env.BASE_URL}projects/${slug}.html${q ? `?${q}` : ''}`;
};
