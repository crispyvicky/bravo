export interface ChatQA {
  keywords: string[];
  answer: string;
}

export const chatQuestions: ChatQA[] = [

  /* ===================== GREETINGS ===================== */
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening", "good afternoon"],
    answer: "Hello! 👋 I’m **Bravoo AI**, your digital assistant for premium software development. How can I help you today—web, mobile, SaaS, or something custom?"
  },

  {
    keywords: ["how are you", "how r u", "how are u", "what's up"],
    answer: "I’m running at full performance ⚡ and ready to help you build something amazing. Tell me what you’re planning!"
  },

  /* ===================== IDENTITY ===================== */
  {
    keywords: ["who are you", "what are you", "who is bravoo ai"],
    answer: "I’m **Bravoo AI**, the official assistant of **Bravoo**, a premium software development agency. I help you understand our services, process, pricing, and how we can build your product the right way."
  },

  {
    keywords: ["what is bravoo", "about bravoo", "company"],
    answer: "**Bravoo** is a premium software development agency focused on building high-quality web apps, mobile apps, SaaS platforms, and advanced UI/UX experiences using modern technologies."
  },

  /* ===================== SERVICES ===================== */
  {
    keywords: ["services", "what do you do", "offer", "solutions"],
    answer: "We offer end-to-end software services:\n\n• **Web Application Development** (Next.js, React, Tailwind)\n• **Mobile App Development** (React Native)\n• **SaaS & MVP Development**\n• **UI/UX & Landing Page Design**\n• **3D & Interactive Web Experiences** (Spline, Three.js)\n• **AI Integrations** (Chatbots, automation)\n• **Maintenance & Scaling Support**"
  },

  {
    keywords: ["custom software", "custom development", "tailored"],
    answer: "Yes—everything we build is **fully custom**. We don’t use templates or cookie-cutter solutions. Your product is designed around your exact business needs."
  },

  /* ===================== WEB ===================== */
  {
    keywords: ["website", "web", "web app", "webapp"],
    answer: "We build fast, SEO-optimized, scalable web applications using **Next.js**. From landing pages to enterprise dashboards and SaaS platforms—we handle it all."
  },

  {
    keywords: ["seo", "performance", "speed"],
    answer: "Performance is a priority. Our websites are optimized for **Core Web Vitals**, SEO, fast load times, and smooth user experience."
  },

  /* ===================== MOBILE ===================== */
  {
    keywords: ["mobile", "app", "ios", "android", "mobile app"],
    answer: "We develop cross-platform mobile apps using **React Native**, allowing one codebase for both iOS and Android—saving time and cost without compromising quality."
  },

  {
    keywords: ["play store", "app store", "deployment"],
    answer: "Yes, we help with **Play Store and App Store deployment**, including builds, configurations, and submission guidance."
  },

  /* ===================== SAAS ===================== */
  {
    keywords: ["saas", "mvp", "startup"],
    answer: "We specialize in **SaaS & MVP development**—from idea validation to scalable architecture, authentication, payments, dashboards, and deployment."
  },

  {
    keywords: ["payments", "stripe", "razorpay"],
    answer: "We integrate secure payment systems like **Stripe, Razorpay, LemonSqueezy**, and subscription-based billing."
  },

  /* ===================== UI / UX ===================== */
  {
    keywords: ["design", "ui", "ux"],
    answer: "We design clean, modern, conversion-focused UI/UX. Our designs balance aesthetics with usability and real business goals."
  },

  {
    keywords: ["branding", "landing page"],
    answer: "Yes! We design high-impact landing pages and brand-aligned interfaces that convert visitors into customers."
  },

  /* ===================== 3D & ADVANCED ===================== */
  {
    keywords: ["3d", "spline", "three.js", "animation"],
    answer: "We build immersive 3D web experiences using **Spline** and **Three.js**—perfect for premium brands and standout marketing websites."
  },

  /* ===================== TEAM ===================== */
  {
    keywords: ["team", "developers", "who works", "engineers"],
    answer: "Our projects are built by **senior developers** with real-world experience. No juniors pretending to be seniors—you know exactly who’s working on your product."
  },

  {
    keywords: ["experience", "expertise"],
    answer: "Our team has experience building real products across startups, agencies, and enterprise environments."
  },

  /* ===================== PROCESS ===================== */
  {
    keywords: ["process", "workflow", "how it works"],
    answer: "Our development process:\n\n1️⃣ Consultation\n2️⃣ Requirement Analysis\n3️⃣ UI/UX Planning\n4️⃣ Development\n5️⃣ Testing & Review\n6️⃣ Launch\n\nYou stay informed at every stage."
  },

  {
    keywords: ["communication", "updates"],
    answer: "We maintain clear communication through regular updates, demos, and feedback cycles."
  },

  /* ===================== PRICING ===================== */
  {
    keywords: ["pricing", "cost", "price", "quote", "budget"],
    answer: "Pricing depends on scope and complexity. We offer **transparent pricing** and provide a custom quote after understanding your requirements."
  },

  {
    keywords: ["cheap", "low cost"],
    answer: "We focus on **value and quality**, not cutting corners. Our pricing reflects senior expertise, clean code, and long-term reliability."
  },

  /* ===================== TIMELINE ===================== */
  {
    keywords: ["time", "timeline", "how long"],
    answer: "Timelines vary:\n• Landing page: ~1 week\n• Mobile/Web MVP: 4–6 weeks\n• Full SaaS: 6–10 weeks\nWe balance speed with quality."
  },

  /* ===================== SUPPORT ===================== */
  {
    keywords: ["maintenance", "support", "after launch"],
    answer: "Yes, we provide **post-launch support**, maintenance, bug fixes, and scaling assistance based on your needs."
  },

  {
    keywords: ["updates", "future changes"],
    answer: "We can continuously improve and expand your product as your business grows."
  },

  /* ===================== TRUST ===================== */
  {
    keywords: ["quality", "reliable", "secure"],
    answer: "We deliver **enterprise-grade, secure, scalable code** with best practices in testing, performance, and architecture."
  },

  {
    keywords: ["why bravoo", "why choose bravoo", "benefits"],
    answer: "Why Bravoo?\n\n• Direct access to senior developers\n• No agency fluff\n• Clean, scalable code\n• Transparent communication\n• Long-term product thinking"
  },

  /* ===================== CONTACT ===================== */
  {
    keywords: ["contact", "email", "phone", "reach"],
    answer: "You can contact us through our **Contact Page** or start a conversation directly from the website. We’d love to hear about your idea!"
  },

  {
    keywords: ["start", "begin", "hire", "get started"],
    answer: "Ready to build? Click **Start Project** on our website or book a consultation call to get started."
  },

  /* ===================== LOCATION ===================== */
  {
    keywords: ["location", "office", "where are you"],
    answer: "We’re a digital-first agency working with clients globally. Our remote model lets us bring the best talent to your project."
  }

];
