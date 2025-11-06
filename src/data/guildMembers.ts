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
    name: "Sanjay Bairy",
    role: "Full Stack Developer",
    company: "Anviya Cloud Solutions",
    avatar: "/guild/sanjay.png",
    status: "Available",
    specialties: ["PyTorch", "NLP", "Computer Vision"],
    level: "Junior",
    linkedin: "https://www.linkedin.com/in/sanjay-bairy/",
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
    name: "AJAY",
    role: "Specialist Enterprise Innovations",
    company: "INNOVACX",
    avatar: "/guild/ajay.png",
    status: "Available",
    specialties: ["React Native", "iOS", "Android"],
    level: "SENIOR",
    linkedin: "https://www.linkedin.com/in/ajaydoti/",
  },
  {
    name: "SANKET KEDARE",
    role: "Full Stack Developer",
    company: "VISIONTECH",
    avatar: "/guild/sanket.png",
    status: "In Battle",
    specialties: ["Design Systems", "User Research"],
    level: "Senior",
    linkedin: "https://www.linkedin.com/in/sanket-kedare-dev/",
  },
  {
    name: "Vinay kumar",
    role: "Machine Learning Engineer",
    company: "Machint Solutions",
    avatar: "/guild/vinay.png",
    status: "In Battle",
    specialties: ["python", "django", "react"],
    level: "Junior",
    linkedin: "https://www.linkedin.com/in/kuppilivinaykumar/",
  }
];


