import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Guild = () => {
  const guildMembers = [
    {
      name: "Sarah Chen",
      role: "Frontend Architect",
      company: "Google",
      avatar: "👩‍💻",
      status: "Available",
      specialties: ["React", "TypeScript", "Performance"],
      level: "Senior"
    },
    {
      name: "Marcus Rodriguez",
      role: "Backend Engineer",
      company: "Microsoft",
      avatar: "👨‍💻",
      status: "In Battle",
      specialties: ["Node.js", "AWS", "Microservices"],
      level: "Staff"
    },
    {
      name: "Priya Patel",
      role: "AI/ML Specialist",
      company: "Meta",
      avatar: "🧠",
      status: "Available",
      specialties: ["PyTorch", "NLP", "Computer Vision"],
      level: "Principal"
    },
    {
      name: "Alex Thompson",
      role: "DevOps Master",
      company: "Netflix",
      avatar: "⚙️",
      status: "Available",
      specialties: ["Kubernetes", "CI/CD", "Monitoring"],
      level: "Senior"
    },
    {
      name: "Lisa Wang",
      role: "Mobile Warrior",
      company: "Uber",
      avatar: "📱",
      status: "Available",
      specialties: ["React Native", "iOS", "Android"],
      level: "Staff"
    },
    {
      name: "David Kim",
      role: "Design Wizard",
      company: "Figma",
      avatar: "🎨",
      status: "In Battle",
      specialties: ["UI/UX", "Design Systems", "User Research"],
      level: "Senior"
    }
  ];

  const specialties = [
    {
      title: "Frontend Masters",
      description: "React, Vue, Angular specialists",
      icon: "⚡",
      members: 8
    },
    {
      title: "Backend Architects", 
      description: "Node.js, Python, Go experts",
      icon: "🏗️",
      members: 12
    },
    {
      title: "AI Engineers",
      description: "ML, NLP, Computer Vision",
      icon: "🤖",
      members: 6
    },
    {
      title: "DevOps Legends",
      description: "AWS, Kubernetes, CI/CD",
      icon: "☁️",
      members: 10
    },
    {
      title: "Design Wizards",
      description: "UI/UX, Design Systems",
      icon: "🎨",
      members: 5
    },
    {
      title: "Mobile Warriors",
      description: "iOS, Android, React Native",
      icon: "📱",
      members: 7
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-hero text-foreground mb-4 animate-fade-in">
                Summon the Guild
              </h1>
              <p className="text-xl text-muted-foreground animate-fade-in-delay">
                On-demand specialists. Pay only when you need them.
              </p>
            </div>

            {/* How It Works */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-subsection text-foreground mb-2">You Start</h3>
                <p className="text-body text-muted-foreground">
                  Direct access to me for your project. I handle 80% of the work.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">⚔️</div>
                <h3 className="text-subsection text-foreground mb-2">We Scale</h3>
                <p className="text-body text-muted-foreground">
                  Need AI expertise? Mobile optimization? I summon the right specialist.
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-subsection text-foreground mb-2">You Win</h3>
                <p className="text-body text-muted-foreground">
                  Get enterprise-level expertise without the enterprise overhead.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Guild Members */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-section text-foreground mb-4">
                Guild Members
              </h2>
              <p className="text-xl text-muted-foreground">
                Senior engineers from top tech companies.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guildMembers.map((member, index) => (
                <div
                  key={index}
                  className="card-surface text-center hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  
                  <p className="text-body text-muted-foreground mb-2">
                    {member.role}
                  </p>
                  
                  <p className="text-sm text-primary font-medium mb-3">
                    {member.company}
                  </p>

                  <div className="flex justify-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.status === 'Available' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-warning/10 text-warning'
                    }`}>
                      {member.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Specialties:</p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specialties Overview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-section text-foreground mb-4">
                Specialty Divisions
              </h2>
              <p className="text-xl text-muted-foreground">
                Organized expertise for every challenge.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="card-surface text-center hover:scale-105 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{specialty.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {specialty.title}
                  </h3>
                  <p className="text-body text-muted-foreground mb-4">
                    {specialty.description}
                  </p>
                  <div className="text-sm text-primary font-medium">
                    {specialty.members} specialists available
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center">
              <h2 className="text-section text-foreground mb-4">
                Ready to Assemble Your Team?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Start with me. Scale with the guild. Win with enterprise expertise.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/start-quest">
                  <Button className="btn-hero">
                    Start Your Quest
                  </Button>
                </Link>
                <Link to="/boss-fights">
                  <Button className="btn-secondary">
                    See Past Victories
                  </Button>
                </Link>
              </div>

              <div className="mt-8 text-sm text-muted-foreground">
                ⚡ 24-hour response • 🔒 Direct Slack/WhatsApp access • 💬 Weekly demos
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Guild;