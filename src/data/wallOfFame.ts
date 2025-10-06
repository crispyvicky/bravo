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
      name: "FinTech Startup",
      image: "/clients/fintech.png",
      tooltip: "FinTech Startup - 2024",
      year: "2024",
      visitUrl: "https://example-fintech.com",
      meta: "FinTech • Q2 2024 • 16 weeks",
      challenge: "Needed MVP for payment processing platform.",
      solution: "React + Node.js with Stripe integration.",
      impact: "Launched to 1,000+ beta users; secured Series A."
    },
    {
      type: "icon",
      name: "E-commerce",
      icon: "🛒",
      tooltip: "E-commerce Platform",
      year: "2025",
      visitUrl: "https://example-shop.com",
      meta: "E‑commerce • 2025 • 12 weeks",
      challenge: "Black Friday traffic scaling.",
      solution: "CDN + autoscaling + DB shard.",
      impact: "Handled 10x traffic; +$5M revenue."
    },
    {
      type: "industry",
      name: "HT",
      gradient: "from-blue-100 to-blue-300",
      tooltip: "HealthTech",
      year: "2023",
      visitUrl: "https://example-health.com",
      meta: "HealthTech • 2023 • 8 weeks",
      challenge: "Manual data entry.",
      solution: "AI automation with error detection.",
      impact: "80% time saved; 95% fewer errors."
    },
    {
      type: "logo",
      name: "Mobile App",
      image: "/clients/mobile.png",
      tooltip: "Mobile App - Series A",
      year: "2025",
      visitUrl: "https://example-mobile.app",
      meta: "Mobile • 2025 • 20 weeks",
      challenge: "Crash on 30% orders.",
      solution: "RN rebuild with offline support.",
      impact: "4.8★ rating; 100K+ users."
    },
    {
      type: "icon",
      name: "SaaS",
      icon: "⚡",
      tooltip: "SaaS Product",
      year: "2024",
      visitUrl: "https://example-saas.com"
    },
    {
      type: "icon",
      name: "AI",
      icon: "🤖",
      tooltip: "AI Project",
      year: "2025",
      visitUrl: "https://example-ai.dev"
    },
    {
      type: "industry",
      name: "ED",
      gradient: "from-green-100 to-green-300",
      tooltip: "EdTech",
      year: "2023"
    },
    {
      type: "industry",
      name: "Healthcare",
      gradient: "from-pink-100 to-pink-300",
      tooltip: "Healthcare SaaS",
      year: "2024"
    },
    {
      type: "icon",
      name: "ML",
      icon: "🤖",
      tooltip: "ML Project",
      year: "2025"
    },
    {
      type: "logo",
      name: "Startup",
      image: "/clients/startup.png",
      tooltip: "Startup Logo",
      year: "2024"
    },
    {
      type: "industry",
      name: "RE",
      gradient: "from-yellow-100 to-yellow-300",
      tooltip: "Real Estate",
      year: "2023"
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
    {
      type: "industry",
      name: "Green",
      gradient: "from-green-100 to-green-300",
      tooltip: "Green Tech",
      year: "2023"
    },
    {
      type: "industry",
      name: "Logistics",
      gradient: "from-yellow-100 to-yellow-300",
      tooltip: "Logistics",
      year: "2025"
    },
  ];
  


