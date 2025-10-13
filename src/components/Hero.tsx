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
    <section className="min-h-screen flex items-center justify-center pt-20 px-6 relative text-foreground">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8 text-center px-6 md:px-0 text-section text-foreground">
  {/* Hero Title */}
  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight animate-fade-in">
    Bravoo – Your Trusted Partner for Software Development
  </h1>

  {/* Hero Subtitle */}
  <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in animation-delay-200">
    Get direct access to a senior developer backed by a{" "}
    <span className="font-semibold text-indigo-600">big-tech network</span>.
    Transparent pricing, real results—no agency fluff.
  </p>

  {/* Hero Buttons */}
  <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-400">
    <Button
      onClick={handleStartProjectClick}
      onMouseEnter={handleStartProjectHover}
      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
    >
      Start Project
    </Button>
    <Button
      onClick={() => scrollToSection("process")}
      variant="outline"
      className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
    >
      View Process
    </Button>
  </div>
</div>

        {/* Floating Cards Visual */}
        <div className="relative lg:flex justify-center items-center animate-scale-in animation-delay-600">
          <div className="grid grid-cols-1 gap-6 w-full max-w-sm">
            <div className="card-floating" style={{ animationDelay: "0s" }}>
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-sm">Speed</div>
            </div>

            <div className="card-floating ml-8" style={{ animationDelay: "0.6s" }}>
              <div className="text-2xl mb-2">👑</div>
              <div className="font-semibold text-sm">Quality</div>
            </div>

            <div className="card-floating" style={{ animationDelay: "1.2s" }}>
              <div className="text-2xl mb-2">🤝</div>
              <div className="font-semibold text-sm">Trust</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flower Animation Container */}
      <FlowerButton ref={flowerRef} />
    </section>
  );
};

export default Hero;
