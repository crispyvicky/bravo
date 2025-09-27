"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function KeyholeScroll() {
  useEffect(() => {
    const isAnimationOk = window.matchMedia(
      "(prefers-reduced-motion: no-preference)"
    ).matches;

    if (!isAnimationOk) return;

    // Keyhole animation
    gsap.from(".keyhole", {
      clipPath:
        "polygon(0 0, 100% 0, 100% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 0 100%)",
      scrollTrigger: {
        trigger: ".section-primary",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Arrow fade
    gsap.to(".arrow", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".section-primary",
        start: "top top",
        end: "+=200",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="relative">
      {/* Keyhole overlay */}
      <div className="keyhole fixed inset-0 pointer-events-none bg-yellow-300 z-10" />

      {/* Floating Arrow */}
      <div className="arrow fixed top-[72vh] left-1/2 -translate-x-1/2 z-20 animate-[float_1s_ease-in-out_infinite_alternate]">
        <svg
          className="w-8 h-auto rotate-90 stroke-black"
          fill="none"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M12 4v16m0 0l-6-6m6 6l6-6" />
        </svg>
      </div>

      {/* Primary Section */}
      <section className="section-primary min-h-screen bg-yellow-200 relative">
        <figure className="w-screen h-screen overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://picsum.photos/1920/1080"
            alt="Background"
          />
        </figure>
        {/* <div className="max-w-3xl mx-auto p-10 relative z-20">
          <h1 className="text-5xl font-serif mb-4">Scroll Animation</h1>
          <p className="text-lg">Watch the keyhole effect as you scroll down.</p>
        </div> */}
      </section>

      {/* Secondary Section */}
      <section className="min-h-screen bg-purple-300 flex items-center justify-center">
        <h2 className="text-4xl font-serif text-white">Secondary Section</h2>
      </section>
    </div>
  );
}