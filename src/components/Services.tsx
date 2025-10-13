import { Button } from "@/components/ui/button";
import React, { useEffect, useRef } from "react";
import CannonFlair, { type CannonFlairHandle } from "./CannonFlair";

const Services = () => {
  const services = [
    {
      title: "Static Website",
      description: "A sleek, responsive website to showcase your business online.",
      price: "₹10K – ₹25K",
      timeline: "1–2 weeks",
      cta: "Start Static Site"
    },
    {
      title: "MVP / Landing Page",
      description: "Test your idea quickly with a functional MVP or landing page.",
      price: "₹50K – ₹1.5L",
      timeline: "2–6 weeks",
      cta: "Start MVP Quest"
    },
    {
      title: "Custom Web Apps",
      description: "Full-featured web applications tailored to your business needs.",
      price: "₹1.5L – ₹5L",
      timeline: "6–16 weeks",
      cta: "Start Web App Quest"
    },
    {
      title: "Mobile App Development",
      description: "iOS/Android apps with modern UI/UX and performance optimization.",
      price: "₹3L – ₹10L",
      timeline: "8–20 weeks",
      cta: "Start App Quest"
    },
    {
      title: "UI/UX Design",
      description: "User-centered designs for web and mobile apps that wow your audience.",
      price: "₹50K – ₹3L",
      timeline: "2–8 weeks",
      cta: "Start Design Quest"
    },
    {
      title: "AI / ML Integration",
      description: "Add intelligence and automation to your applications with AI/ML.",
      price: "₹2L – ₹8L",
      timeline: "4–12 weeks",
      cta: "Start AI Quest"
    },
    {
      title: "Analytics & BI Solutions",
      description: "Turn your data into actionable insights for smarter business decisions.",
      price: "₹1L – ₹5L",
      timeline: "3–10 weeks",
      cta: "Start Analytics Quest"
    },
    {
      title: "Legacy System Modernization",
      description: "Upgrade old systems to modern tech stacks without full rewrites.",
      price: "₹5L – ₹15L",
      timeline: "10–24 weeks",
      cta: "Start Epic Quest"
    },
    {
      title: "AI Chatbots & Automation",
      description: "Intelligent chatbots and workflow automation to save time & boost engagement.",
      price: "₹1.5L – ₹6L",
      timeline: "4–10 weeks",
      cta: "Start Bot Quest"
    }
  ];
  

  const openConsultationModal = (serviceType: string) => {
    // In a real app, this would open a modal with pre-filled service type
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const cannonRef = useRef<CannonFlairHandle | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateBounds = () => {
      const anchor = anchorRef.current;
      const cannon = cannonRef.current;
      if (!anchor || !cannon) return;
      const rect = anchor.getBoundingClientRect();
      cannon.setBoundsAndCenter(rect);
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    window.addEventListener("scroll", updateBounds, { passive: true });
    return () => {
      window.removeEventListener("resize", updateBounds);
      window.removeEventListener("scroll", updateBounds as any);
    };
  }, []);

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-4">
            Choose Your Quest
          </h2>
          <p className="text-xl text-muted-foreground">
            Pick the mission that matches your goals and budget.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
  {services.map((service, index) => (
    <div
      key={index}
      className="flex flex-col justify-between p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[420px] group"
    >
      <div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
        <p className="text-gray-600 mb-6">{service.description}</p>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Price Range:</span>
            <span className="font-semibold text-primary">{service.price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Timeline:</span>
            <span className="font-semibold text-gray-900">{service.timeline}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => openConsultationModal(service.title)}
        className="mt-auto py-3 px-5 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-200 w-full"
      >
        {service.cta}
      </button>
    </div>
  ))}
</div>



        {/* Bottom-centered cannon trigger; overlay handles bullets without page overflow */}
        <div className="flex justify-center mt-10">
          <div
            ref={anchorRef}
            className="relative"
            style={{ width: 96, height: 120 }}
            onMouseEnter={() => cannonRef.current?.fire()}
          />
          <CannonFlair ref={cannonRef} />
        </div>
      </div>
    </section>
  );
};

export default Services;