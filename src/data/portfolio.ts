export type ProjectVisual =
  | 'mentora'
  | 'transport'
  | 'goodfind'
  | 'docviewer'
  | 'rehabilitation'
  | 'syllabus'
  | 'skilltern'

export interface Project {
  id: string
  title: string
  description: string
  problem: string
  features: string[]
  stack: string[]
  github: string
  live?: string
  visual: ProjectVisual
  featured: boolean
  accent: string
}

export interface SkillGroup {
  title: string
  index: string
  description: string
  skills: string[]
}

export interface Credential {
  title: string
  issuer: string
  url: string
  mark: string
}

export interface Achievement {
  title: string
  subtitle: string
  url: string
  mark: string
}

export const portfolio = {
  person: {
    name: 'Vinnakota Phani Kumar',
    shortName: 'Phani Kumar',
    role: 'Computer Science Engineer',
    positioning: 'Software Engineer · Full-Stack Developer · Cloud & Systems Enthusiast · Agentic AI Developer',
    email: 'phanivinnakota122@gmail.com',
    github: 'https://github.com/phanikumar122',
    linkedin: 'https://www.linkedin.com/in/phani-kumar-999022375/',
    resumeUrl: './resume.pdf',
  },
  navigation: [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#expertise' },
    { label: 'Projects', href: '#work' },
    { label: 'Certificates', href: '#credentials' },
  ],
  skills: [
    {
      title: 'Build',
      index: '01',
      description: 'Interfaces and APIs that stay understandable as the product grows.',
      skills: ['Java', 'C++', 'Python', 'JavaScript', 'React', 'Flutter', 'Figma', 'UI/UX principles', 'Node.js', 'Express.js', 'Spring Boot', 'REST APIs'],
    },
    {
      title: 'Data',
      index: '02',
      description: 'Data foundations that make applications useful, queryable, and dependable.',
      skills: ['MongoDB', 'MySQL', 'Data modeling', 'ETL pipelines', 'Analytics workflows'],
    },
    {
      title: 'Systems',
      index: '03',
      description: 'Infrastructure and distributed patterns for systems that need room to move.',
      skills: ['AWS', 'Docker', 'Linux', 'Git', 'CI/CD', 'System Design', 'Microservices', 'Apache Kafka', 'Security', 'Real-time services'],
    },
    {
      title: 'Agentic AI',
      index: '04',
      description: 'Agentic building blocks that connect language models to useful actions and context.',
      skills: ['LLM integration', 'Retrieval-Augmented Generation (RAG)', 'Tool use', 'Tokenization', 'Loop engineering'],
    },
  ] satisfies SkillGroup[],
  projects: [
    {
      id: 'mentora',
      title: 'Mentora',
      description: 'A full-stack educational platform connecting students, teachers, and administrators through one shared academic workspace.',
      problem: 'Academic workflows often scatter announcements, assignments, attendance, study material, and conversations across disconnected tools.',
      features: ['Role-based student, teacher, and admin portals', 'Assignments, grading, attendance, and feedback', 'Discussion forums, notice board, and study materials', 'STOMP over WebSockets for real-time messaging'],
      stack: ['React', 'TypeScript', 'Spring Boot', 'Java', 'JWT', 'WebSockets'],
      github: 'https://github.com/phanikumar122/Mentora',
      live: 'https://mentora-livid.vercel.app/',
      visual: 'mentora',
      featured: true,
      accent: 'lime',
    },
    {
      id: 'transport',
      title: 'Public Transport Demand Prediction',
      description: 'A multi-modal transport analytics pipeline that brings bus, rail, and air data together for demand analysis and prediction.',
      problem: 'Transport planning needs a common view of demand across modes, routes, time, anomalies, and operational context.',
      features: ['ETL pipeline across APSRTC, rail, and flight data', 'MySQL dimensional warehouse and OLAP operations', 'K-Means route clustering and Isolation Forest anomaly detection', 'Regression model comparison, SHAP analysis, and reusable predictions'],
      stack: ['Python', 'Pandas', 'MySQL', 'Scikit-learn', 'XGBoost', 'SHAP'],
      github: 'https://github.com/phanikumar122/Public-Transport-Demand-Prediction',
      live: 'https://public-transport-demand-prediction-nine.vercel.app/',
      visual: 'transport',
      featured: true,
      accent: 'blue',
    },
    {
      id: 'goodfind',
      title: 'GoodFind',
      description: 'A polished commerce SaaS frontend combining an editorial storefront, merchant console, and onboarding experience.',
      problem: 'A modern commerce product has to make discovery, purchase, operations, and brand configuration feel like one coherent system.',
      features: ['Editorial multi-category storefront and product discovery', 'Cart, wishlist, checkout, orders, and account flows', 'Merchant inventory, order, category, and coupon operations', 'SaaS landing page and multi-step merchant onboarding'],
      stack: ['React', 'Vite', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'Recharts'],
      github: 'https://github.com/phanikumar122/GoodFind',
      live: 'https://phanikumar122.github.io/GoodFind/',
      visual: 'goodfind',
      featured: true,
      accent: 'rose',
    },
    {
      id: 'docviewer',
      title: 'docviewer',
      description: 'A browser-based file library, document viewer, PDF toolkit, image converter, and editor where processing stays on the device.',
      problem: 'Everyday document work is often fragmented across upload-heavy tools that make simple transformations feel unnecessarily remote.',
      features: ['Universal file library backed by IndexedDB', 'PDF, image, DOCX, spreadsheet, text, and Markdown viewing', 'Local PDF merge, split, rotate, watermark, and export tools', 'Sanitised previews and a clear no-preview fallback'],
      stack: ['Angular', 'TypeScript', 'IndexedDB', 'PDF.js', 'pdf-lib', 'Tailwind CSS'],
      github: 'https://github.com/phanikumar122/docviewer',
      visual: 'docviewer',
      featured: false,
      accent: 'violet',
    },
    {
      id: 'rehabilitation',
      title: 'Smart Hand Rehabilitation',
      description: 'A sensor-based glove and companion mobile app for monitoring finger movement and delivering haptic feedback during rehabilitation exercises.',
      problem: 'A physical gesture becomes more useful when the sensing, feedback, and mobile monitoring loop are designed together.',
      features: ['Individual finger movement tracking with flex sensors', 'Force sensing and finger-specific vibration feedback', 'OLED status display for angles and pressure', 'Bluetooth data exchange with a Flutter companion app'],
      stack: ['Flutter', 'Dart', 'Arduino / ESP32', 'Bluetooth', 'Flex sensors', 'OLED'],
      github: 'https://github.com/phanikumar122/Smart-Hand-Rehabilitation',
      visual: 'rehabilitation',
      featured: false,
      accent: 'amber',
    },
    {
      id: 'syllabus-ai',
      title: 'Syllabi-AI',
      description: 'An AI-assisted study platform that turns syllabus material into personalized plans with progress tracking and a focused learning interface.',
      problem: 'A syllabus is a map, but it does not automatically become a sequence of manageable next steps for a learner.',
      features: ['Syllabus analysis and personalized study-plan generation', 'Progress tracking across planned learning', 'Modern SaaS-style learning interface', 'Firebase-backed application foundation with Gemini integration'],
      stack: ['React', 'Vite', 'Firebase', 'Gemini integration', 'Recharts'],
      github: 'https://github.com/phanikumar122/Syllabus-AI',
      live: 'https://syllabus-ai-c35aa.web.app/',
      visual: 'syllabus',
      featured: false,
      accent: 'cyan',
    },
    {
      id: 'skilltern',
      title: 'SkillTern',
      description: 'A role-based internship platform that matches student profiles with opportunities using a clear, deterministic rules engine.',
      problem: 'Students and companies need a faster way to compare skills, eligibility, preferences, and open opportunities without opaque ranking.',
      features: ['Student, company, and admin workflows', 'Skill, CGPA, degree, and study-year eligibility checks', 'Location and internship-type preference bonuses', 'Application tracking and company-side candidate views'],
      stack: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'JWT', 'MVC'],
      github: 'https://github.com/phanikumar122/SkillTern',
      visual: 'skilltern',
      featured: false,
      accent: 'orange',
    },
  ] satisfies Project[],
  credentials: [
    { title: 'AWS Academy Graduate — Cloud Foundations', issuer: 'AWS Academy', url: 'https://www.credly.com/badges/a2b286c3-60f2-4085-858d-e3292c5bdfb2/public_url', mark: 'AWS' },
    { title: 'AWS Academy Graduate — Cloud Architecting', issuer: 'AWS Academy', url: 'https://www.credly.com/badges/39b74af7-8334-47a0-ac87-80b259fabfb4/public_url', mark: 'AWS' },
    { title: 'Python Essentials 1', issuer: 'Cisco Networking Academy', url: 'https://www.credly.com/badges/597fd272-09e8-42cd-846f-64e6b0c20e1d/public_url', mark: 'PY' },
    { title: 'Python Essentials 2', issuer: 'Cisco Networking Academy', url: 'https://www.credly.com/badges/dbdda9d8-521d-4ad1-8757-df725bb61e9f/public_url', mark: 'PY' },
    { title: 'Red Hat System Administration I (RH124 - RHA) — Ver. 8.2', issuer: 'Red Hat', url: 'https://www.credly.com/badges/7aab22ee-3632-4a61-bb97-7fa8098905d3/public_url', mark: 'RH' },
  ] satisfies Credential[],
  achievements: [
    { title: 'Second Prize', subtitle: 'Innovation Club', url: 'https://drive.google.com/file/d/11GWgN88HpsoxLR3l5zyAyG6Zx5uzyTjR/view?usp=sharing', mark: '02' },
    { title: 'First Prize', subtitle: 'Yarin 24-Hour Hackathon', url: 'https://drive.google.com/file/d/1dA1XTpiACFVq5mUn5_Vtqdwm4U9Ib7GY/view?usp=sharing', mark: '01' },
  ] satisfies Achievement[],
  education: {
    institution: 'Prasad V Potluri Siddhartha Institute of Technology',
  },
} as const

export type Portfolio = typeof portfolio
