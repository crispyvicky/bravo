"use client"
export type ClientTileType = "logo" | "icon" | "industry";

export interface WallClientTile {
  type: ClientTileType;
  name: string;
  image?: string;
  icon?: string;
  gradient?: string;
  tooltip: string;
  year: string;
  // Optional destination website for trust/visit
  visitUrl?: string;
  // Optional details shown in modal
  meta?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
}

export interface WallStat {
  label: string;
  value: string;
}

export const stats: WallStat[] = [
  { label: "Projects Delivered", value: "24+" },
  { label: "Industries Served", value: "12" },
  { label: "Repeat Client Rate", value: "89%" },
];
export const clients: WallClientTile[] = [

  {
    type: "icon",
    name: "bravoo",
    icon: "😎",
    tooltip: "bravoo",
    year: "2025",
    visitUrl: "https://bravoo.world/",
    meta: "portfolio • 2025 • 10 weeks",
    challenge: "a portfolio website for my business.",
    solution: "Next.js + gsap + tailwindcss",
    impact: "a high engagement website with a modern design and smooth animations."
  },
  {
    type: "icon",
    name: "ohio game",
    icon: "🎮",
    tooltip: "Ohio Game",
    year: "2024",
    visitUrl: "https://game-sample-delta.vercel.app/",
    meta: "Gaming • 2024 • 10 weeks",
    challenge: "Low user engagement and retention rates.",
    solution: "Implemented gamification and social sharing features.",
    impact: "Boosted user retention by 40% and engagement by 60%."
  },
  {
    type: "icon",
    name: "mojito",
    icon: "🍸",
    tooltip: "Tech Solutions",
    year: "2024",
    visitUrl: "https://cocktails-seven-mu.vercel.app/",
    challenge: "Outdated IT infrastructure causing frequent downtimes.",
    solution: "Upgraded to cloud-based solutions with 24/7 monitoring.",
    impact: "Reduced downtime by 85% and improved system reliability.",
    meta: "IT Services • 2024 • 14 weeks",
  },
  {
    type:"icon",
    name:"3d-portfolio",
   
    visitUrl:"https://3dbravoo.vercel.app/",
    solution:"",
    impact:"high end portfolio",
    icon:"🖋️",
    tooltip:"3d portfolio",
    year:"2025",
    meta:"",
    challenge:"",
  },
  {
    type:"icon",
    name:"sample portfolio",
    icon:"🖋️",
    tooltip:"sample portfolio",
    year:"2025",
    visitUrl:"https://portfolio-1-phi-rose.vercel.app/",
    meta:"portfolio • 2025 • 10 weeks",
    challenge:"",
    solution:"",
    impact:"website with good ui and animations",
  },
    {
    type: "logo",
    name: "Sri Durga Interiors",
    image: "/c/sridurga.webp",
    tooltip: "Sri Durga Interiors",
    year: "2025",
    visitUrl: "https://sridurgainteriors.vercel.app/",
    meta: "Interior Design • Q2 2025 •",
    challenge: "Needed A stunning website for their business.",
    solution: "React + Node.js with whatsapp integration",
    impact: "Launched to 1,000+ beta users; secured Series A."
  },
  {
    type: "logo",
    name: "Venkateshwaracnc",
    image: "/c/sai.webp",
    tooltip: "wood carving website and cms",
    year: "2025",
    visitUrl: "https://venkateshwaracnc.com/",
    meta: "CRM and CMS • 2025 • 12 weeks",
    challenge: "FROM MANUAL TO AUTOMATED BILLING DIGITIZATION.",
    solution: "CDN + autoscaling + DB shard.",
    impact: "TRUSTED BY 100+ CLIENTS AND INCREASED SALES BY 30%."
  },
  {
    type:"icon",
    name:"brvooecom",
    icon:"🛍️",
    tooltip:"bravooecom",
    year:"2025",
    visitUrl:"https://vcommerce-gamma.vercel.app/",
    meta:"ecommerce • 2025 • 10 weeks",
    challenge:"made the local store  digital",
    solution:"created a ecom website with nextjs and tailwindcss",
    impact:"increased the sales by 50%",
  },
  {
    type: "icon",
    name: "Trendyvibez",
    icon: "📈",
    tooltip: "digital marketing",
    year: "2025",
    visitUrl: "https://trendyvibez.in/",
    meta: "Digital Marketing • 2025 • 10 weeks",
    challenge: "Inefficient marketing strategies.",
    solution: "AI-driven analytics and targeted campaigns.",
    impact: "Increased ROI by 50% and customer engagement by 70%."

  },
  {
    type: "icon",
    name: "WAAW",
    gradient: "from-yellow-100 to-yellow-300",
    tooltip: "software solutions",
    year: "2023",
    meta: "Real Estate • 2023 • 16 weeks",
    icon: "🏡",
    challenge: "Attracting potential buyers in a saturated market.",
    solution: "Developed a user-friendly website with virtual tours.",
    impact: "Increased inquiries by 40% and sales by 25%.",
    visitUrl: "https://waaw.world",

  },
  {
    type: "icon",
    name: "DOG-O-CARE",
    icon: "🐾",
    tooltip: "DOG-O-CARE ",
    year: "2025",
    visitUrl: "https://dog-o-care.vercel.app/",
    meta: "Web App • 2025 • 1 week",
    challenge: "Crash on 30% orders.",
    solution: "booking for slots and whatsapp api integration",
    impact: "high engagement website with a modern design and smooth animations."
  },

  {
    type: "icon",
    name: "PAWCARE",
    icon: "🐾",
    tooltip: "Mobile App - Series A",
    year: "2025",
    visitUrl: "https://pawcare-xi.vercel.app/",
    meta: "Mobile • 2025 • 20 weeks",
    challenge: "Crash on 30% orders.",
    solution: "RN rebuild with offline support.",
    impact: "4.8★ rating; 100K+ users."
  },
  {
    type: "icon",
    name: "marketplace",
    icon: "🛒",
    gradient: "from-blue-100 to-blue-300",
    tooltip: "sample",
    year: "2023",
    visitUrl: "https://sample-1-marketing-vicky.vercel.app/",
    meta: "sample • 2025 • 8 weeks",
    // challenge: "Manual data entry.",
    // solution: "AI automation with error detection.",
    // impact: "80% time saved; 95% fewer errors."
  },
  {
    type: "icon",
    name: "marketing website",
    icon: "📊",
    tooltip: "marketing website",
    year: "2023",
    visitUrl: "https://bravo-marketing-hub.vercel.app/",
    meta: "Marketing • 2025 • 12 weeks",
    challenge: "Low online visibility and lead generation.",
    solution: "SEO optimization and targeted ad campaigns.",

  },

  {
    type: "icon",
    name: "SaaS",
    icon: "💻",
    tooltip: "sample",
    year: "2024",
    visitUrl: "https://jayalakshmi-spark-ads.vercel.app/"
  },
  {
    type: "icon",
    name: "EMS",
    icon: "🧑‍💼",
    tooltip: "EMPLOYEE MANAGEMENT SYSTEM",
    year: "2025",
    visitUrl: "https://VICKYEMS.vercel.app/login"
  },
  {
    type: "icon",
    icon: "🏠",
    name: "REAL ESTATE",
    gradient: "from-green-100 to-green-300",
    tooltip: "EdTech",
    year: "2023",
    challenge: "Low online visibility and lead generation.",
    solution: "SEO optimization and targeted ad campaigns.",
    impact: "Increased web traffic by 70% and leads by 45%.",
    visitUrl: "https://visionestate-two.vercel.app/"
  },
  {
    type: "icon",
    name: "WEATHER APP",
    icon: "☀️",
    gradient: "from-pink-100 to-pink-300",
    tooltip: "Healthcare SaaS",
    year: "2024",
    visitUrl: "https://weather-vicky.vercel.app/"
  },

  {
    type: "icon",
    name: "Startup",
    icon: "🚀",
    tooltip: "Startup Logo",
    visitUrl: "https://visionstack-bay.vercel.app/",
    year: "2024",
    challenge: "Establishing a strong brand identity in a competitive market.",
    solution: "Designed a modern logo and cohesive branding materials.",
    impact: "Enhanced brand recognition and customer trust."
  },

  {
    type: "icon",
    name: "bravoo skin care",
    gradient: "from-gray-100 to-gray-300",
    tooltip: "skin care",
    icon: "🧴"
    ,
    year: "2025",
    visitUrl: "https://bravoo-salon.vercel.app/",
    solution: "Developed a user-friendly website for a construction company.",
    challenge: "Low online presence and customer engagement.",
    impact: "Increased web traffic by 60% and customer inquiries by 35%."
  },
  {
    type: "icon",
    name: "bravoo-gym",
    gradient: "from-purple-100 to-purple-300",
    tooltip: "gym management",
    icon: "🏋️‍♂️",
    year: "2024",
    visitUrl: "https://bravoo-gym-x31l.vercel.app/",
    solution: "Developed a comprehensive gym management system.",
    challenge: "Inefficient member management and scheduling.",
    impact: "Streamlined operations, improving member satisfaction by 40%."
  },
  {
    type: "icon",
    name: "interior design",
    icon: "🏦",
    tooltip: "Banking",
    visitUrl: "https://bravoo-interior.vercel.app/",
    year: "2025",
    challenge: "Outstanding customer service issues.",

    solution: "Implemented a customer service chatbot.",
    impact: "Reduced customer complaints by 60%."
  },
  {
    type: "icon",
    name: "restaurant",
    gradient: "from-blue-100 to-blue-300",
    tooltip: "Travel",
    icon: "🍽️"
    ,
    challenge: "Low customer satisfaction due to poor communication.",
    solution: "Introduced a real-time order tracking system.",
    impact: "Increased customer satisfaction scores by 35%.",
    visitUrl: "https://bravoo-chickrn.vercel.app/",
    year: "2025"
  },
  {
    type: "icon",
    name: "kids education",
    icon: "🎒",
    tooltip: "B2B Project",
    visitUrl: "https://bravoo-kidcare.vercel.app/",
    year: "2024",
    challenge: "Difficulty in managing student records and communication.",
    solution: "Developed a centralized student management system.",
    impact: "Improved administrative efficiency by 50%."
  },
  {
    type: "icon",
    name: "travel agency",
    gradient: "from-red-100 to-red-300",
    icon: "✈️",
    tooltip: "Travel Agency",

    year: "2023",
    visitUrl: "https://travel-mu-hazel.vercel.app/",
    challenge: "Low online bookings and visibility.",
    solution: "Redesigned website with SEO optimization.",
    impact: "Increased online bookings by 45%."
  },

  {
    type: "icon",
    name: "food",
    gradient: "from-yellow-100 to-yellow-300",
    tooltip: "Food Delivery",
    icon: "🍔"
    ,
    year: "2025",
    visitUrl: "https://sample-ammachetivanta.vercel.app/",
    challenge: "Slow delivery times affecting customer satisfaction.",
    solution: "Implemented an optimized delivery routing system.",
    impact: "Reduced delivery times by 30%, boosting customer satisfaction."
  },
  {
    type: "icon"
    ,
    icon: "🏢 "
    ,
    visitUrl: "https://sscdinteriors.in/",
    name: "SSCD interiors",
    gradient: "from-green-100 to-green-300",
    tooltip: "Nonprofit",
    challenge: "Inefficient operational processes.",
    solution: "Developed a custom management software.",
    impact: "Saved  efficiency and effectiveness.",
    year: "2024"
  },
  {
    type: "icon",
    name: "petcare",
    gradient: "from-gray-100 to-gray-300",
    tooltip: "petcare",
    year: "2023",
    visitUrl: "https://petcare-neon.vercel.app/",
    icon: "🐶",

    challenge: "Inefficient operational processes.",
    solution: "Developed a custom management software.",
    impact: "Saved  efficiency and effectiveness."
  },
  {
    type: "icon",
    name: " DUCK game",
    gradient: "from-blue-100 to-blue-300",
    tooltip: "Sports",
    icon: "🎮",
    visitUrl: "https://bravooduck.vercel.app/",
    year: "2025"
  },
 


];



