'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function FlowerPath() {
  const flowerRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (flowerRef.current) {
      gsap.to(flowerRef.current, {
        duration: 6,
        repeat: -1,
        ease: 'power1.inOut',
        motionPath: {
          path: '#flower-path',
          align: '#flower-path',
          alignOrigin: [0.5, 0.5],
          autoRotate: false, // set to true if you want flower to rotate along the path
        },
      });
    }

    return () => {
      gsap.killTweensOf(flowerRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 600 200">
        {/* "M"-shaped path */}
        <path
          id="flower-path"
          d="M10,150 
             Q 100,20 200,150 
             Q 300,20 400,150 
             Q 500,20 590,150"
          stroke="lightgray"
          strokeWidth="0"
          fill="transparent"
        />
      </svg>

      {/* Flower image that follows the path */}
      <img
        ref={flowerRef}
        src="/FLOWER/C1.png"
        alt="flower"
        className="absolute w-12 h-12"
      />
    </div>
  );
}
