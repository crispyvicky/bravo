export interface GuildMember {
  name: string;
  role: string;
  company: string;
  avatar: string;
  status: string;
  specialties: string[];
  level: string;
  linkedin: string;
}

export const guildMembers: GuildMember[] = [
  {
    name: "Sai Teja",
    role: "Developer",
    company: "TCS",
    avatar: "/guild/saiteja.png",
    status: "Available",
    specialties: ["React", "TypeScript", "Performance"],
    level: "Senior",
    linkedin: "https://www.linkedin.com/in/sai-teja-goud-7b82951a6/",
  },
  {
    name:"Naresh Aitla",
    role: "FULL STACK DEVELOPER",
    company: "Starkin Solutions",
    avatar: "/guild/naresh.png",
    status: "In Battle",
    specialties: ["Node.js", "AWS", "Microservices"],
    level: "Staff",
    linkedin: "https://www.linkedin.com/in/naresh-aitla/",
  },
  {
    name: "Priya Patel",
    role: "AI/ML Specialist and the one who cretedyewdhhfkhfk;hfsfs",
    company: "Meta",
    avatar: "🧠",
    status: "Available",
    specialties: ["PyTorch", "NLP", "Computer Vision"],
    level: "Principal",
    linkedin: "https://linkedin.com/in/priyapatel",
  },
  {
    name: "Vijay kumar",
    role: "JAVA DEVELOPER",
    company: "TCS",
    avatar: "/guild/vijay.png",
    status: "Available",
    specialties: ["Kubernetes", "CI/CD", "Monitoring"],
    level: "Senior",
    linkedin: "https://www.linkedin.com/in/vijay-kumar-chennuri-26b393256/",
  },
  {
    name: "Lisa Wang",
    role: "Mobile Warrior",
    company: "Uber",
    avatar: "📱",
    status: "Available",
    specialties: ["React Native", "iOS", "Android"],
    level: "Staff",
    linkedin: "https://linkedin.com/in/lisawang",
  },
  {
    name: "David Kim",
    role: "Design Wizard",
    company: "Figma",
    avatar: "🎨",
    status: "In Battle",
    specialties: ["UI/UX", "Design Systems", "User Research"],
    level: "Senior",
    linkedin: "https://linkedin.com/in/davidkim",
  },
];


