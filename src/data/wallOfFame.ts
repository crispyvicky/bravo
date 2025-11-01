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
      type: "logo",
      name: "Sri Durga Interiors",
      image: "/c/sridurga.png",
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
      image: "/c/sai.png",
      tooltip: "wood carving website and cms",
      year: "2025",
      visitUrl: "https://venkateshwara-cnc.vercel.app/",
      meta: "CRM and CMS • 2025 • 12 weeks",
      challenge: "FROM MANUAL TO AUTOMATED BILLING DIGITIZATION.",
      solution: "CDN + autoscaling + DB shard.",
      impact: "TRUSTED BY 100+ CLIENTS AND INCREASED SALES BY 30%."
    },
    {
      type: "icon", 
      name:"ohio game",
      icon:"🎮",
      tooltip:"Ohio Game",
      year:"2024",
      visitUrl:"https://game-sample-delta.vercel.app/",
      meta:"Gaming • 2024 • 10 weeks",
      challenge:"Low user engagement and retention rates.",
      solution:"Implemented gamification and social sharing features.",
      impact:"Boosted user retention by 40% and engagement by 60%."
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
      visitUrl: "https://visiontech-employee-portal.vercel.app/login"
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
      visitUrl:"https://visionestate-two.vercel.app/"
    },
    {
      type: "icon",
      name: "WEATHER APP",
      icon: "☀️",
      gradient: "from-pink-100 to-pink-300",
      tooltip: "Healthcare SaaS",
      year: "2024",
      visitUrl:"https://weather-vicky.vercel.app/"
    },
    {
      type: "icon",
      name: "trendyvibez",
      icon: "📈",
      tooltip: "digital marketing",
      year: "2025",
      visitUrl:"https://trendyvibez.in/",
      meta: "Digital Marketing • 2025 • 10 weeks",
      challenge: "Inefficient marketing strategies.",
      solution: "AI-driven analytics and targeted campaigns.",
      impact: "Increased ROI by 50% and customer engagement by 70%."

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
      name: "RE",
      gradient: "from-yellow-100 to-yellow-300",
      tooltip: "software solutions",
      year: "2023",
      meta: "Real Estate • 2023 • 16 weeks",
      icon: "🏡",
      challenge: "Attracting potential buyers in a saturated market.",
      solution: "Developed a user-friendly website with virtual tours.",
      impact: "Increased inquiries by 40% and sales by 25%.",
      visitUrl:"https://waaw-theta.vercel.app/",

    },
    {
      type: "industry",
      name: "Construction",
      gradient: "from-gray-100 to-gray-300",
      tooltip: "Construction",
      year: "2025"
    },
    {
      type: "industry",
      name: "Agency",
      gradient: "from-purple-100 to-purple-300",
      tooltip: "Agency",
      year: "2024"
    },
    {
      type: "icon",
      name: "Banking",
      icon: "🏦",
      tooltip: "Banking",
      year: "2023"
    },
    {
      type: "industry",
      name: "Travel",
      gradient: "from-blue-100 to-blue-300",
      tooltip: "Travel",
      year: "2025"
    },
    {
      type: "icon",
      name: "B2B",
      icon: "💼",
      tooltip: "B2B Project",
      year: "2024"
    },
    {
      type: "industry",
      name: "Food",
      gradient: "from-red-100 to-red-300",
      tooltip: "Food Delivery",
      year: "2023"
    },
    {
      type: "industry",
      name: "Entertainment",
      gradient: "from-yellow-100 to-yellow-300",
      tooltip: "Entertainment",
      year: "2025"
    },
    {
      type: "industry",
      name: "Nonprofit",
      gradient: "from-green-100 to-green-300",
      tooltip: "Nonprofit",
      year: "2024"
    },
    {
      type: "industry",
      name: "Government",
      gradient: "from-gray-100 to-gray-300",
      tooltip: "Government",
      year: "2023"
    },
    {
      type: "industry",
      name: "Sports",
      gradient: "from-blue-100 to-blue-300",
      tooltip: "Sports",
      year: "2025"
    },
    {
      type: "industry",
      name: "Fashion",
      gradient: "from-pink-100 to-pink-300",
      tooltip: "Fashion",
      year: "2024"
    },
    
    
  ];
  


