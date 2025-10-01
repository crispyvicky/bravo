import { useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Missions() {
  const services = [
    {
      icon: "🖥",
      title: "Web Apps",
      description: "Your base camp for growth",
      price: "$10K-50K",
      timeline: "8-24 weeks",
      features: ["React/Next.js", "Database Design", "API Development", "Deployment"]
    },
    {
      icon: "📱",
      title: "Mobile Apps",
      description: "Reach players everywhere",
      price: "$15K-75K",
      timeline: "12-36 weeks",
      features: ["React Native", "iOS & Android", "Push Notifications", "App Store Deploy"]
    },
    {
      icon: "🤖",
      title: "AI/ML",
      description: "Smarter decisions, faster",
      price: "$8K-40K",
      timeline: "6-20 weeks",
      features: ["Machine Learning", "AI Integration", "Data Analysis", "Automation"]
    },
    {
      icon: "☁️",
      title: "Cloud",
      description: "Scale without limits",
      price: "$5K-30K",
      timeline: "4-16 weeks",
      features: ["AWS/Azure Setup", "Auto Scaling", "Load Balancing", "Monitoring"]
    },
    {
      icon: "⚙️",
      title: "Automation",
      description: "Free up time",
      price: "$3K-20K",
      timeline: "2-12 weeks",
      features: ["Workflow Automation", "API Integration", "Task Scheduling", "Monitoring"]
    },
    {
      icon: "🎨",
      title: "UI/UX",
      description: "Design your world",
      price: "$4K-25K",
      timeline: "3-15 weeks",
      features: ["User Research", "Design System", "Prototyping", "User Testing"]
    }
  ];

  return (
    <>
      <Head>
        <title>Missions - Choose Your Development Quest | Bravoo</title>
        <meta name="description" content="Choose from our range of development missions: Web Apps, Mobile Apps, AI/ML, Cloud Services, Automation, and UI/UX Design. Get transparent pricing and timelines." />
        <meta name="keywords" content="web development services, mobile app development, AI development, cloud services, automation, UI UX design, development pricing" />
        <link rel="canonical" href="https://bravoo.in/missions" />
        <meta property="og:title" content="Missions - Choose Your Development Quest" />
        <meta property="og:description" content="Choose from our range of development missions with transparent pricing and timelines." />
        <meta property="og:url" content="https://bravoo.in/missions" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Missions - Choose Your Development Quest" />
        <meta name="twitter:description" content="Choose from our range of development missions with transparent pricing and timelines." />
      </Head>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="text-center mb-16">
                <h1 className="text-hero text-foreground mb-4 animate-fade-in">
                  Choose Your Mission
                </h1>
                <p className="text-xl text-muted-foreground animate-fade-in-delay">
                  Pick the quest that matches your goals and timeline.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="card-surface group cursor-pointer hover:scale-105 transition-all duration-300 max-w-md mx-auto"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-center mb-6">
                      <div className="text-5xl mb-4">{service.icon}</div>
                      <h3 className="text-subsection text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-body text-muted-foreground mb-4">
                        {service.description}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-small text-muted-foreground">Price Range:</span>
                        <span className="font-semibold text-primary">{service.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-small text-muted-foreground">Timeline:</span>
                        <span className="font-semibold text-foreground">{service.timeline}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-foreground mb-3">What's Included:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, i) => (
                          <div key={i} className="text-xs text-muted-foreground">
                            ✓ {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link href="/start-quest">
                      <Button className="btn-primary w-full group-hover:scale-105 transition-transform duration-200">
                        Start This Quest
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Custom Mission CTA */}
              <div className="text-center mt-16">
                <div className="card-surface max-w-2xl mx-auto">
                  <h3 className="text-subsection text-foreground mb-4">
                    Got a Different Mission?
                  </h3>
                  <p className="text-body text-muted-foreground mb-6">
                    Every quest is unique. Tell me about your specific challenge and I'll craft a custom strategy.
                  </p>
                  <Link href="/start-quest">
                    <Button className="btn-hero">
                      Plan Custom Quest
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
