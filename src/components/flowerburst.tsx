'use client';

import React, { forwardRef, useImperativeHandle } from "react";
import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(Physics2DPlugin);

export interface FlowerButtonHandle {
  triggerFlowerAnimation: (x: number, y: number) => void;
}

const FlowerButton = forwardRef<FlowerButtonHandle>((_, ref) => {
  const container = document.createElement("div");
  container.className = "flower-container";
  document.body.appendChild(container);

  useImperativeHandle(ref, () => ({
    triggerFlowerAnimation(x: number, y: number) {
      const particles: HTMLDivElement[] = [];

      // Create 20 particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "flower-particle";
        container.appendChild(particle);

        // Random shape/color
        const colors = ["#ff7eb3", "#ff65a3", "#7afcff", "#feff9c", "#fff740"];
        const symbols = ["🌸", "🌼", "🌺", "💮", "✨"];
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];

        // Position at cursor
        gsap.set(particle, {
          x: x,
          y: y,
          scale: gsap.utils.random(0.6, 1),
          opacity: 1,
          position: "fixed",
          fontSize: "20px",
          pointerEvents: "none",
          zIndex: 9999,
        });

        particles.push(particle);
      }

      // Animate with physics (burst)
      gsap.to(particles, {
        duration: 1.5,
        physics2D: {
          velocity: "random(250, 500)",
          angle: "random(-110, -70)", // upward burst
          gravity: 600,
        },
        opacity: 0,
        scale: 0,
        stagger: { amount: 0.2 },
        ease: "power2.out",
        onComplete: () => {
          particles.forEach((p) => p.remove());
        },
      });
    },
  }));

  return null;
});

FlowerButton.displayName = "FlowerButton";
export default FlowerButton;
