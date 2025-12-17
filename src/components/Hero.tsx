'use client';

import { Button } from "@/components/ui/button";
import { useRef } from "react";
import FlowerButton, { FlowerButtonHandle } from "./FlowerButton";


const Hero = () => {
  const flowerRef = useRef<FlowerButtonHandle>(null);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openConsultationModal = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleStartProjectHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // trigger flowers at button center
    flowerRef.current?.triggerFlowerAnimation(centerX, centerY);
  };

  const handleStartProjectClick = () => {
    openConsultationModal();
  };

  return (
    <section className="min-h-[100dvh] flex items-center justify-center pt-24 pb-12 sm:pt-20 px-4 sm:px-6 relative text-foreground overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white pointer-events-none -z-10" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Content */}
        <div className="space-y-6 sm:space-y-8 text-center lg:text-left px-2 md:px-0 z-10">
          {/* Hero Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-[1.15] animate-fade-in">
            Bravoo – Your Trusted Partner for <span className="text-blue-700">Software Development</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 animate-fade-in animation-delay-200 leading-relaxed">
            Get direct access to a senior developer backed by a{" "}
            <span className="font-semibold text-blue-700">big-tech network</span>.
            Transparent pricing, real results—no agency fluff.
          </p>

          {/* Hero Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in animation-delay-400">
            <Button
              onClick={handleStartProjectClick}
              onMouseEnter={handleStartProjectHover}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-full shadow-xl shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Project
            </Button>
            <Button
              onClick={() => scrollToSection("process")}
              variant="outline"
              className="border-2 border-blue-100 text-blue-700 hover:bg-blue-50 font-bold py-4 px-8 rounded-full transition-all duration-300"
            >
              View Process
            </Button>
          </div>
        </div>

        {/* Floating Cards Visual */}
        <div className="relative hidden lg:flex justify-center items-center animate-scale-in animation-delay-600">
          <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
            <div className="card-floating hover:rotate-2 transition-transform duration-300" style={{ animationDelay: "0s", animationDuration: "6s" }}>
              <div className="text-4xl mb-3">⚡</div>
              <div className="font-bold text-lg">Speed</div>
              <p className="text-xs text-gray-500 mt-1">Rapid delivery cycles</p>
            </div>

            <div className="card-floating ml-12 hover:-rotate-2 transition-transform duration-300" style={{ animationDelay: "0.6s", animationDuration: "6s" }}>
              <div className="text-4xl mb-3">👑</div>
              <div className="font-bold text-lg">Quality</div>
              <p className="text-xs text-gray-500 mt-1">Enterprise grade code</p>
            </div>

            <div className="card-floating hover:rotate-1 transition-transform duration-300" style={{ animationDelay: "1.2s", animationDuration: "6s" }}>
              <div className="text-4xl mb-3">🤝</div>
              <div className="font-bold text-lg">Trust</div>
              <p className="text-xs text-gray-500 mt-1">Transparent process</p>
            </div>
          </div>
        </div>

        {/* Mobile Stats Row (Visible only on mobile/tablet) */}
        <div className="lg:hidden grid grid-cols-3 gap-3 w-full animate-fade-in animation-delay-600 mt-4 sm:mt-0">
          <div className="bg-white/80 backdrop-blur-sm border border-blue-50 rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">⚡</div>
            <div className="font-bold text-sm text-gray-800">Speed</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-blue-50 rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">👑</div>
            <div className="font-bold text-sm text-gray-800">Quality</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm border border-blue-50 rounded-2xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">🤝</div>
            <div className="font-bold text-sm text-gray-800">Trust</div>
          </div>
        </div>
      </div>

      {/* Flower Animation Container */}
      <FlowerButton ref={flowerRef} />
    </section>
  );
};

export default Hero;
