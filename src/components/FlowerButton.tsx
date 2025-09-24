'use client';

import { useRef, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';

export type FlowerButtonHandle = {
  triggerFlowerAnimation: (x: number, y: number) => void;
};

const FlowerButton = forwardRef<FlowerButtonHandle>((_, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    triggerFlowerAnimation(x: number, y: number) {
      const container = containerRef.current;
      if (!container) return;

      const flowerIcons = ['🌸', '🌼', '🌺', '🌻'];

      flowerIcons.forEach((icon, i) => {
        const flower = document.createElement('div');
        flower.innerText = icon;
        flower.className =
          'absolute text-2xl select-none pointer-events-none';
        flower.style.left = `${x}px`;
        flower.style.top = `${y}px`;
        flower.style.transform = 'translate(-50%, -50%)';
        container.appendChild(flower);

        const angle = (Math.PI / 2) * i + (Math.random() * 0.5 - 0.25); // spread around
        const distance = 80 + Math.random() * 40;

        gsap.to(flower, {
          duration: 1.8,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 50,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.6 + 0.7,
          opacity: 110,
          ease: 'power2.out',
          onComplete: () => flower.remove(),
        });
      });
    },
  }));

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
});

FlowerButton.displayName = 'FlowerButton';
export default FlowerButton;
