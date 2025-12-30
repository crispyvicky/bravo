import { useRef } from "react";
import Head from 'next/head';
import Link from 'next/link';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import HowItWorks from "@/components/HowItWorks";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Star, CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Missions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: "🖥",
      title: "Web App Development",
      headline: "Your first salesperson",
      description: "First impressions matter. We build fast, high-performance websites that convert visitors into lifelong fans.",
      tags: ["React", "Next.js", "Performance"],
      price: "Starts at ₹10K",
      image: "missions/wdev.png"
    },
    {
      icon: "📱",
      title: "Mobile App Development",
      headline: "Apps for the Next Billion",
      description: "Customers live on their phones. We create intuitive, native-feel apps that they'll open every single day.",
      tags: ["iOS", "Android", "React Native"],
      price: "Starts at ₹15K",
      image: "missions/adev.png"
    },
    {
      icon: "🤖",
      title: "AI & Automation",
      headline: "Intelligence Built-In",
      description: "Stop doing manual work. We integrate smart LLMs and automated workflows to run your business on autopilot.",
      tags: ["GPT-4", "Automation", "Workflows"],
      price: "Starts at ₹8K",
      image: "missions/ai.png"
    },
    {
      icon: "☁️",
      title: "Cloud Operations",
      headline: "Infrastructure for Infinite Growth",
      description: "Crash-proof your launch. We build resilient, self-scaling systems that grow as your traffic explodes.",
      tags: ["AWS", "Scaling", "Security"],
      price: "Starts at ₹5K",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600"
    },
    {
      icon: "⚙️",
      title: "Legacy Optimization",
      headline: "Modernize Your Tech Debt",
      description: "Don't let old code hold you back. We refactor and upgrade legacy systems for the modern era.",
      tags: ["Refactoring", "Optimization", "Speed"],
      price: "Starts at ₹4K",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600"
    },
    {
      icon: "🎨",
      title: "UI/UX Design",
      headline: "Design That Builds Trust",
      description: "Ugly products don't sell. We craft pixel-perfect interfaces that prioritize the human experience.",
      tags: ["Figma", "Branding", "User Flow"],
      price: "Starts at ₹4K",
      image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&q=80&w=1600"
    }
  ];

  useGSAP(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const getScrollAmount = () => {
      let amount = slider.scrollWidth - window.innerWidth;
      return amount > 0 ? amount : 0;
    };

    if (getScrollAmount() > 0) {
      gsap.to(slider, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => "+=" + getScrollAmount(),
          invalidateOnRefresh: true,
        }
      });
    }

  }, { scope: containerRef });

  return (
    <>
      <Head>
        <title>Missions - Choose Your Development Quest | Bravoo</title>
        <meta name="description" content="Choose from our range of development missions." />
      </Head>
      <div className="bg-white overflow-x-hidden font-inter">
        <Header />
        <main>

          {/* Exact Reference Style Intro */}
          <section className="w-full flex flex-col items-center justify-start pt-24 pb-16 relative bg-white font-inter text-center">

            {/* Central Content */}
            <div className="relative z-10 px-4 max-w-4xl mx-auto flex flex-col items-center">

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111827] mb-8 max-w-2xl mx-auto leading-[1.2]">
                Connect in new ways with our missions
              </h1>

              {/* Button Group */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-16">
                <Link href="/start-quest">
                  <Button className="bg-[#0066FF] hover:bg-[#005cd6] text-white px-5 py-4 h-auto rounded-full text-sm font-bold transition-all shadow-sm">
                    Explore our missions
                  </Button>
                </Link>
                <Link href="/boss-fights" className="flex items-center gap-2 text-[#111827] hover:text-blue-600 font-semibold text-sm transition-colors group">
                  <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-200 transition-colors">
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                  Go to Boss Fights
                </Link>
              </div>

              {/* Feature Image - Video Style */}
              <div className="w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] relative border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
                  alt="Missions Presentation"
                  className="w-full h-auto object-cover aspect-video"
                />
                <div className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <div className="w-4 h-4 flex gap-1.5">
                    <div className="w-1 h-full bg-white rounded-full"></div>
                    <div className="w-1 h-full bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="mt-20 flex flex-col items-center gap-4 opacity-10">
                <div className="w-[1px] h-16 bg-black"></div>
              </div>
            </div>
          </section>

          {/* Slider Container */}
          <section ref={containerRef} className="h-screen w-full flex items-center overflow-hidden relative bg-white">
            <div
              ref={sliderRef}
              className="flex items-center gap-10 px-4 md:px-[10vw] w-max"
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="mission-slide w-[90vw] md:w-[1100px] h-[75vh] md:h-[600px] bg-white rounded-[3rem] flex flex-col md:flex-row items-center overflow-hidden relative shrink-0 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] group border border-slate-100 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 snap-center"
                >
                  {/* Left: Content */}
                  <div className="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 shadow-sm">
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                        Quest #{index + 1}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#111827] mb-6 leading-tight">
                      {service.headline}
                    </h2>

                    <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-medium">
                      {service.description}
                    </p>

                    <div className="flex gap-2 mb-10 flex-wrap">
                      {service.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 mt-auto">
                      <Link href="/start-quest">
                        <Button className="bg-[#0066FF] hover:bg-[#005cd6] text-white px-8 py-6 h-auto rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg">
                          Start Mission
                        </Button>
                      </Link>
                      <span className="text-sm font-semibold text-slate-900">{service.price}</span>
                    </div>
                  </div>

                  {/* Right: Image Container */}
                  <div className="w-full md:w-[55%] h-full p-4 md:p-6 md:pl-0">
                    <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-inner bg-slate-50">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                      />
                      {/* Highlight Edge */}
                      <div className="absolute inset-0 border-[10px] border-white/20 pointer-events-none rounded-[2.5rem]"></div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Finish Card */}
              <div
                className="w-[90vw] md:w-[1100px] h-[75vh] md:h-[650px] shrink-0 rounded-[3rem] bg-[#0c0a09] flex flex-col items-center justify-center text-center p-12 text-white relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                <div className="text-8xl mb-8 group-hover:scale-110 transition-transform">�</div>
                <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Different Quest?</h3>
                <p className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed font-medium">
                  "I have a wild idea..." <br />
                  Perfect. We thrive on the unique, the risky, and the magical.
                </p>
                <Link href="/start-quest">
                  <Button className="bg-white text-black hover:bg-slate-100 px-10 py-7 h-auto text-lg rounded-full font-bold shadow-xl transition-all">
                    Custom Mission
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <div className="bg-white">
            <div className="container mx-auto px-4 max-w-6xl py-32">
              <HowItWorks />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
