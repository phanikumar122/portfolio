import mentoraEntry from '../assets/projects/mentora-entry-screenshot.webp'
import goodfindStorefront from '../assets/projects/goodfind-storefront-screenshot.webp'
import goodfindProduct from '../assets/projects/goodfind-product-screenshot.webp'
import transportOverview from '../assets/projects/transport-overview-screenshot.webp'
import transportPredictor from '../assets/projects/transport-predictor-screenshot.webp'

export type ProjectVisual =
  | 'mentora'
  | 'transport'
  | 'goodfind'
  | 'docviewer'
  | 'rehabilitation'
  | 'syllabus'
  | 'skilltern'

export interface ProjectImage {
  src: string
  alt: string
  caption: string
}

export interface Project {
  id: string
  title: string
  description: string
  problem: string
  focus: string
  outcome: string
  evidence: string
  evidenceUrl?: string
  role?: string
  images?: ProjectImage[]
  decision?: string
  lesson?: string
  features: string[]
  stack: string[]
  github?: string
  live?: string
  visual: ProjectVisual
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
    role: 'Full-stack AI engineer',
    positioning: 'I build full-stack applications with a focus on cloud infrastructure, DevOps, and agentic AI.',
    email: 'phanivinnakota122@gmail.com',
    github: 'https://github.com/phanikumar122',
    linkedin: 'https://www.linkedin.com/in/phani-kumar-999022375/',
    resumeUrl: './resume.pdf',
    portraitUrl: import.meta.env.BASE_URL + 'portrait.webp',
  },
  navigation: [
    { label: 'Intro', href: '#top' },
    { label: 'Projects', href: '#work' },
    { label: 'Skills', href: '#expertise' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#credentials' },
    { label: 'Awards', href: '#achievements' },
    { label: 'Contact', href: '#contact' },
  ],
  skills: [
    {
      title: 'Build',
      index: '01',
      description: 'Interfaces and APIs that stay understandable as the product grows.',
      skills: ['Java', 'C++', 'Python', 'JavaScript', 'Figma', 'Interface Design Principles', 'Node.js', 'Express.js', 'Spring Boot', 'REST APIs'],
    },
    {
      title: 'Data',
      index: '02',
      description: 'Data foundations that make applications useful, queryable, and dependable.',
      skills: ['MongoDB', 'MySQL'],
    },
    {
      title: 'Cloud & DevOps',
      index: '03',
      description: 'Cloud infrastructure, containerized services, and automated build and deployment workflows.',
      skills: ['AWS', 'Docker', 'Linux', 'Git', 'CI/CD', 'System Design', 'Microservices', 'Apache Kafka', 'Security', 'Real-time services'],
    },
    {
      title: 'Agentic AI',
      index: '04',
      description: 'Language models, retrieval systems, and practical tools integrated into real software products.',
      skills: ['LLM integration', 'Retrieval-Augmented Generation (RAG)', 'Prompt Engineering', 'Tool Calling', 'Unified API Endpoints', 'Running Benchmarks', 'Workflow Automation'],
    },
  ] satisfies SkillGroup[],
  projects: [
    {
      id: 'mentora',
      title: 'Mentora',
      role: 'Core developer on a group project',
      images: [{ src: mentoraEntry, alt: 'Mentora public sign-in page with campus workspace introduction and institutional login fields', caption: 'Live public entry screen. Academic dashboards require an authorized account.' }],
      decision: 'Separate the React client from Spring Boot services, with role-based access and STOMP over WebSockets for academic communication.',
      lesson: 'A static frontend still depends on correctly configured backend origins, authentication, and WebSocket services.',
      description: 'A shared academic workspace for students, teachers, and administrators.',
      focus: 'Academic workflows, access control, and WebSocket communication.',
      outcome: 'Role-based portals and STOMP messaging documented in the source.',
      evidence: 'Security and WebSocket integration tests are included in the source. The public preview opens at institutional sign-in.',
      evidenceUrl: "https://github.com/phanikumar122/Mentora#readme",
      problem: 'Academic workflows often scatter announcements, assignments, attendance, study material, and conversations across disconnected tools.',
      features: ['Role-based student, teacher, and admin portals', 'Assignments, grading, attendance, and feedback', 'Discussion forums, notice board, and study materials', 'STOMP over WebSockets for real-time messaging'],
      stack: ['React', 'TypeScript', 'Spring Boot', 'Java', 'JWT', 'WebSockets'],
      github: 'https://github.com/phanikumar122/Mentora',
      live: 'https://mentora-livid.vercel.app/',
      visual: 'mentora',
      accent: 'lime',
    },
    {
      id: 'transport',
      title: 'Public Transport Demand Prediction',
      role: 'Team member on a group project',
      images: [
        { src: transportOverview, alt: 'Transport Pulse dashboard with modal distribution, demand charts, and route summary table', caption: 'Deployed dashboard interface. Displayed UI statistics differ from the committed evaluation CSV; the case study uses source metrics.' },
        { src: transportPredictor, alt: 'Transport Pulse prediction interface with route, service, date, capacity, and fare inputs', caption: 'Public prediction interface. Displayed forecasts are not independently validated operational predictions.' },
      ],
      decision: 'Integrate transport modes through a star-schema warehouse, compare regression models, and inspect the selected model with SHAP.',
      lesson: 'Model evaluation must be interpreted alongside data provenance: heuristic passenger counts and synthetic dates limit operational use.',
      description: 'A coursework pipeline comparing passenger-demand models across bus, rail, and air datasets.',
      focus: 'Data warehousing, regression comparison, and SHAP analysis.',
      outcome: "Committed CatBoost test results: RMSE 54.15 passengers; R\u00b2 0.478.",
      evidence: 'Metrics are from the committed test-split evaluation CSV. Rail and air passenger counts are heuristic, and some dates are synthetic. This coursework pipeline is not an operational forecast.',
      evidenceUrl: "https://github.com/phanikumar122/Public-Transport-Demand-Prediction/blob/main/outputs/metrics/model_metrics.csv",
      problem: 'Transport planning needs a common view of demand across modes, routes, time, anomalies, and operational context.',
      features: ['ETL pipeline across APSRTC, rail, and flight data', 'MySQL dimensional warehouse and OLAP operations', 'K-Means route clustering and Isolation Forest anomaly detection', 'Regression model comparison, SHAP analysis, and reusable predictions'],
      stack: ['Python', 'Pandas', 'MySQL', 'Scikit-learn', 'XGBoost', 'SHAP'],
      github: 'https://github.com/phanikumar122/Public-Transport-Demand-Prediction',
      live: 'https://public-transport-demand-prediction-nine.vercel.app/',
      visual: 'transport',
      accent: 'blue',
    },
    {
      id: 'goodfind',
      title: 'GoodFind',
      role: 'Team member on a group project',
      images: [
        { src: goodfindStorefront, alt: 'GoodFind storefront with editorial headphones hero, catalog navigation, and collection actions', caption: 'Live storefront from the frontend demonstration. Catalog data and purchase flows are simulated.' },
        { src: goodfindProduct, alt: 'GoodFind product detail page with headphones image, color variants, quantity controls, and shopping bag action', caption: 'Product detail interface with variant and quantity controls, shown using demo catalog data.' },
      ],
      decision: 'Separate cart, product, theme, and wishlist stores, persist client state locally, and lazy-load store and merchant routes.',
      lesson: 'Browser persistence can support a complete commerce demonstration while payments, subscriptions, and fulfillment remain simulated.',
      description: 'A commerce frontend demo with shopping, merchant, and onboarding workflows.',
      focus: 'Storefront interactions and browser-persisted merchant workflows.',
      outcome: 'A browser-persisted commerce demo with simulated checkout.',
      evidence: 'A curated product dataset and browser-persisted state power the demo. Checkout and subscriptions are simulated; this is not a live payment service.',
      evidenceUrl: "https://github.com/phanikumar122/GoodFind#readme",
      problem: 'A modern commerce product has to make discovery, purchase, operations, and brand configuration feel like one coherent system.',
      features: ['Editorial multi-category storefront and product discovery', 'Cart, wishlist, checkout, orders, and account flows', 'Merchant inventory, order, category, and coupon operations', 'SaaS landing page and multi-step merchant onboarding'],
      stack: ['React', 'Vite', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'Recharts'],
      github: 'https://github.com/phanikumar122/GoodFind',
      live: 'https://phanikumar122.github.io/GoodFind/',
      visual: 'goodfind',
      accent: 'rose',
    },
    {
      id: 'docviewer',
      title: 'docviewer',
      role: 'Solo developer',
      decision: 'Store files in IndexedDB and process documents locally, with sanitized previews and a separate optional engine for heavier document operations.',
      lesson: 'Local processing protects file privacy, while structural DOCX previews and full-fidelity Office editing have distinct limitations.',
      description: 'A browser workspace for viewing, editing, and converting documents locally.',
      focus: 'Local document processing, IndexedDB storage, and sanitized previews.',
      outcome: 'Local document storage and browser-based PDF tools.',
      evidence: 'The source documents IndexedDB storage, sanitized previews, and browser-flow tests. Some Office conversions and full-fidelity edits require the optional local engine.',
      evidenceUrl: "https://github.com/phanikumar122/docviewer#readme",
      problem: 'Everyday document work is often fragmented across upload-heavy tools that make simple transformations feel unnecessarily remote.',
      features: ['Universal file library backed by IndexedDB', 'PDF, image, DOCX, spreadsheet, text, and Markdown viewing', 'Local PDF merge, split, rotate, watermark, and export tools', 'Sanitised previews and a clear no-preview fallback'],
      stack: ['Angular', 'TypeScript', 'IndexedDB', 'PDF.js', 'pdf-lib', 'Tailwind CSS'],
      github: 'https://github.com/phanikumar122/docviewer',
      visual: 'docviewer',
      accent: 'violet',
    },
    {
      id: 'rehabilitation',
      title: 'Smart Hand Rehabilitation',
      role: 'Team member on a group project',
      decision: 'Keep automatic haptic control in firmware, use request acknowledgements for manual commands, and store calibrated sessions locally in the companion app.',
      lesson: 'An acknowledged command confirms firmware output state, not independently measured motor movement or clinical benefit.',
      description: 'An Arduino glove and Flutter app for movement estimates and haptic feedback.',
      focus: 'Calibrated sensing, Bluetooth communication, and local sessions.',
      outcome: 'A six-value sensor protocol, guided calibration, and firmware command acknowledgements.',
      evidence: 'Engineering prototype. Finger values are normalized movement estimates and grip values are ADC readings. Physical reliability and clinical accuracy require independent bench and clinical validation.',
      evidenceUrl: 'https://github.com/phanikumar122/Smart-Hand-Rehabilitation#implemented-behavior',
      problem: 'A physical gesture becomes more useful when the sensing, feedback, and mobile monitoring loop are designed together.',
      features: ['Five flex-sensor movement estimates with guided calibration', 'FSR ADC sensing and bounded finger-specific haptic feedback', 'OLED movement and output-state display', 'Bluetooth Classic data exchange and local session recording'],
      stack: ['Flutter', 'Dart', 'Arduino Nano', 'Bluetooth Classic', 'Flex sensors', 'OLED'],
      github: 'https://github.com/phanikumar122/Smart-Hand-Rehabilitation',
      visual: 'rehabilitation',
      accent: 'amber',
    },
    {
      id: 'syllabus-ai',
      title: 'Syllabus AI',
      role: 'Solo developer',
      decision: 'Keep manual topic planning available independently of AI, validate workspace records, and make cloud and provider services configurable.',
      lesson: 'Manual planning remains useful without external services; account sync and AI workflows depend on configured backend services.',
      description: 'A study planner with progress tracking and optional Gemini-assisted syllabus extraction.',
      focus: 'Manual planning, progress state, and optional AI extraction.',
      outcome: 'Editable topic plans and progress analytics, with optional Gemini coaching.',
      evidence: 'Manual planning works without AI or Firebase. Account sync and Gemini features depend on configured services; the deployed preview does not by itself establish provider behavior.',
      evidenceUrl: "https://github.com/phanikumar122/Syllabus-AI#readme",
      problem: 'A syllabus is a map, but it does not automatically become a sequence of manageable next steps for a learner.',
      features: ['Syllabus analysis and personalized study-plan generation', 'Progress tracking across planned learning', 'Modern SaaS-style learning interface', 'Firebase-backed application foundation with Gemini integration'],
      stack: ['React', 'Vite', 'Firebase', 'Gemini integration', 'Recharts'],
      github: 'https://github.com/phanikumar122/Syllabus-AI',
      live: 'https://syllabus-ai-c35aa.web.app/',
      visual: 'syllabus',
      accent: 'cyan',
    },
    {
      id: 'skilltern',
      title: 'SkillTern',
      role: 'Solo developer',
      description: 'An internship platform matching profiles to opportunities through eligibility rules.',
      focus: 'Eligibility rules and internship application tracking.',
      outcome: 'A portfolio-listed internship matching project.',
      evidence: 'Public source is currently unavailable. Capabilities are portfolio descriptions rather than publicly verifiable results.',
      problem: 'Students and companies need a faster way to compare skills, eligibility, preferences, and open opportunities without opaque ranking.',
      features: ['Student, company, and admin workflows', 'Skill, CGPA, degree, and study-year eligibility checks', 'Location and internship-type preference bonuses', 'Application tracking and company-side candidate views'],
      stack: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'JWT', 'MVC'],
      visual: 'skilltern',
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
