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
      {/* Professional Background - Clean & Subtle */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 -z-20 lg:hidden" />
      {/* Subtle geometric pattern or glow - optional, keeping it very clean for now */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10 lg:hidden" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Content */}
        <div className="space-y-8 text-center lg:text-left px-2 md:px-0">
          {/* Hero Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] animate-fade-in">
            Your Trusted Partner for <br className="hidden lg:block" />
            <span className="text-blue-700">Software Development</span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 animate-fade-in animation-delay-200 leading-relaxed">
            Direct access to senior engineers from <span className="font-semibold text-slate-900">Big Tech</span>.
            <br className="hidden sm:block" /> Transparent pricing, enterprise-grade quality.
          </p>

          {/* Hero Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate-fade-in animation-delay-400 items-center lg:items-center">
            <Button
              onClick={handleStartProjectClick}
              onMouseEnter={handleStartProjectHover}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-6 px-10 rounded-lg shadow-lg shadow-blue-900/10 transition-all duration-200 transform hover:-translate-y-0.5 text-lg"
            >
              Start Project
            </Button>
            <Button
              onClick={() => scrollToSection("process")}
              variant="outline"
              className="border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-semibold py-6 px-10 rounded-lg transition-all duration-200 text-lg"
            >
              View Process
            </Button>
          </div>

          {/* Trust Indicators */}
          {/* <div className="pt-6 flex items-center justify-center lg:justify-start gap-4 text-sm font-medium text-slate-500 animate-fade-in animation-delay-500">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white ring-1 ring-slate-100" />
              ))}
            </div>
            <p>Trusted by industry leaders</p>
          </div> */}
        </div>

        {/* Floating Cards Visual - Professional & Clean */}
        <div className="relative hidden lg:flex justify-center items-center h-full min-h-[500px] animate-scale-in animation-delay-600">

          <div className="grid grid-cols-1 gap-6 w-full max-w-sm relative z-10">
            <div className="card-floating hover:translate-y-[-4px] transition-all duration-300 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 p-6 rounded-2xl flex items-start gap-4 text-left" style={{ animationDelay: "0s", animationDuration: "8s" }}>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl text-blue-600 shrink-0">⚡</div>
              <div>
                <div className="font-bold text-lg text-slate-900">Rapid Delivery</div>
                <p className="text-sm text-slate-500 mt-1">Efficient development cycles.</p>
              </div>
            </div>

            <div className="card-floating ml-12 hover:translate-y-[-4px] transition-all duration-300 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 p-6 rounded-2xl flex items-start gap-4 text-left" style={{ animationDelay: "0.5s", animationDuration: "8s" }}>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl text-blue-600 shrink-0">💎</div>
              <div>
                <div className="font-bold text-lg text-slate-900">Enterprise Quality</div>
                <p className="text-sm text-slate-500 mt-1">Scalable, maintainable code.</p>
              </div>
            </div>

            <div className="card-floating hover:translate-y-[-4px] transition-all duration-300 bg-white border border-slate-100 shadow-xl shadow-slate-200/50 p-6 rounded-2xl flex items-start gap-4 text-left" style={{ animationDelay: "1s", animationDuration: "8s" }}>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-xl text-blue-600 shrink-0">🤝</div>
              <div>
                <div className="font-bold text-lg text-slate-900">Trusted Partner</div>
                <p className="text-sm text-slate-500 mt-1">Transparent communication.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats Row - Clean */}
        <div className="lg:hidden flex flex-col gap-4 w-full animate-fade-in animation-delay-600 mt-8 px-2">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "⚡", label: "Speed" },
              { icon: "💎", label: "Quality" },
              { icon: "🤝", label: "Trust" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                <span className="text-2xl mb-1">{stat.icon}</span>
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flower Animation Container - Kept as distinct brand element, but can be removed if requested */}
      <FlowerButton ref={flowerRef} />
    </section>
  );
};

export default Hero;
