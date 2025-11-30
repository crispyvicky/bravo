import { useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HowItWorks from "@/components/HowItWorks";

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
          <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
              <div className="text-center mb-8 md:mb-16">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-hero text-foreground mb-4 animate-fade-in">
                  Choose Your Mission
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground animate-fade-in-delay px-4">
                  Pick the quest that matches your goals and timeline.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
                {services.map((service, index) => (
                  <Card
                    key={index}
                    className="card-surface group cursor-pointer hover:scale-105 transition-all duration-300 max-w-md mx-auto flex flex-col"
                    style={{ animationDelay: `${index * 0.1}s`, minHeight: 'auto', width: '100%' }}
                  >
                    <CardContent className="flex flex-col h-full p-4 sm:p-6">
                      <div className="text-center mb-4 sm:mb-6 flex-shrink-0">
                        <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{service.icon}</div>
                        <h3 className="text-lg sm:text-subsection text-foreground mb-2">{service.title}</h3>
                        <p className="text-sm sm:text-body text-muted-foreground mb-4">{service.description}</p>
                      </div>

                      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 flex-grow">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-small text-muted-foreground">Price Range:</span>
                          <span className="text-sm sm:text-base font-semibold text-primary">{service.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-small text-muted-foreground">Timeline:</span>
                          <span className="text-sm sm:text-base font-semibold text-foreground">{service.timeline}</span>
                        </div>
                      </div>

                      <div className="mb-4 sm:mb-6">
                        <h4 className="text-xs sm:text-sm font-medium text-foreground mb-2 sm:mb-3">What's Included:</h4>
                        <div className="grid grid-cols-2 gap-1 sm:gap-2">
                          {service.features.map((feature, i) => (
                            <div key={i} className="text-xs text-muted-foreground">
                              ✓ {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link href="/start-quest" className="mt-auto">
                        <Button className="btn-primary w-full group-hover:scale-105 transition-transform duration-200">
                          Start This Quest
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <HowItWorks />

              {/* Custom Mission CTA */}
              <div className="text-center mt-8 md:mt-12">
                <div className="card-surface max-w-2xl mx-auto p-4 sm:p-6">
                  <h3 className="text-lg sm:text-subsection text-foreground mb-3 sm:mb-4">Got a Different Mission?</h3>
                  <p className="text-sm sm:text-body text-muted-foreground mb-4 sm:mb-6">
                    Every quest is unique. Tell me about your specific challenge and I'll craft a custom strategy.
                  </p>
                  <Link href="/start-quest">
                    <Button className="btn-hero w-full sm:w-auto">Plan Custom Quest</Button>
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
