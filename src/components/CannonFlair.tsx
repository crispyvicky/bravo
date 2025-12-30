'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

gsap.registerPlugin(Physics2DPlugin);

export interface CannonFlairHandle {
  fire: () => void;
  setPosition: (x: number, y: number) => void;
  setBoundsAndCenter: (rect: DOMRect) => void;
}

const CannonFlair = forwardRef<CannonFlairHandle>((_, ref) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const cannonRef = useRef<HTMLDivElement | null>(null);
  const bulletsContainerRef = useRef<HTMLDivElement | null>(null);
  const bulletsRef = useRef<HTMLDivElement[]>([]);
  const masterTlRef = useRef<gsap.core.Timeline | null>(null);
  const maxLocalYRef = useRef<number>(Infinity);
  const BULLET_COUNT = 40;

  const resetBullets = () => {
    const container = bulletsContainerRef.current;
    if (!container) return;
    const bullets = bulletsRef.current;
    // create missing bullets up to BULLET_COUNT
    for (let i = bullets.length; i < BULLET_COUNT; i++) {
      // User's CSS has 2-35. We match this logic.
      const className = 'flair--' + gsap.utils.random(2, 35, 1);
      const b = document.createElement('div');
      b.setAttribute('class', `flair flair-bullet ${className}`);
      container.appendChild(b);
      bullets.push(b);
    }
    // reset state for all bullets
    for (const b of bullets) {
      (b as any).dataset && delete (b as any).dataset.landed;
      gsap.set(b, { x: 0, y: 0, opacity: 0, scale: gsap.utils.random(0.4, 0.6) });
    }
  };

  // build DOM and timelines
  useEffect(() => {
    // 1. Setup local wrapper (Cannon)
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Create Cannon Element inside current component
    const cannon = document.createElement('div');
    cannon.className = 'cannon';
    wrapper.appendChild(cannon);
    cannonRef.current = cannon;

    // 2. Setup global particles container (Body)
    const container = document.createElement('div');
    container.className = 'flair-container-global';

    // Fix: Render in body with absolute positioning so it scrolls with page but breaks out of overflow containers
    Object.assign(container.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100px', // Match original dimensions
      height: '100px',
      overflow: 'visible',
      pointerEvents: 'none',
      zIndex: '99999',
      willChange: 'transform'
    });
    document.body.appendChild(container);
    bulletsContainerRef.current = container;

    // Fire on cannon hover
    cannon.addEventListener('mouseenter', () => {
      // Trigger update of position before playing
      updatePositionAndFire();
    });

    // Initialize bullets
    const initBullets: HTMLDivElement[] = [];
    for (let i = 0; i < BULLET_COUNT; i++) {
      const className = 'flair--' + gsap.utils.random(2, 35, 1);
      const b = document.createElement('div');
      b.setAttribute('class', `flair flair-bullet ${className}`);
      container.appendChild(b);
      initBullets.push(b);
    }
    bulletsRef.current = initBullets;

    // Build Timelines
    const angle = 20;
    const tl1 = gsap
      .timeline()
      .to(cannon, { rotation: -angle, duration: 0.65, ease: 'power1.inOut' })
      .to(cannon, { rotation: angle, ease: 'power1.inOut', duration: 1, repeat: 3, yoyo: true })
      .to(cannon, { rotation: 0, duration: 0.65, ease: 'power1.inOut' });

    const tl1Time = tl1.duration();

    const tl2 = gsap
      .timeline()
      .add(() => { resetBullets(); })
      .to(bulletsRef.current, { opacity: 1, duration: 0.25, stagger: { amount: tl1Time } })
      .to(
        bulletsRef.current,
        {
          duration: tl1Time,
          physics2D: {
            velocity: 'random(600, 850)',
            angle: () => {
              const base = Number(gsap.getProperty(cannon, 'rotation')) || 0;
              return 270 + base + gsap.utils.random(-50, 50);
            },
            gravity: 600,
          },
          stagger: { amount: tl1Time },
          onUpdate: () => {
            const maxLocalY = maxLocalYRef.current;
            if (!isFinite(maxLocalY)) return;
            for (const b of bulletsRef.current) {
              const y = Number(gsap.getProperty(b, 'y')) || 0;
              if (y >= maxLocalY) {
                if ((b as any).dataset && !(b as any).dataset.landed) {
                  gsap.set(b, { y: maxLocalY });
                  (b as any).dataset.landed = '1';
                  gsap.to(b, { opacity: 0, duration: 0.2 });
                } else {
                  gsap.set(b, { y: maxLocalY, opacity: 0 });
                }
              }
            }
          },
        },
        0
      );

    const master = gsap.timeline({ paused: true });
    master.add(tl1, 0).add(tl2, 0);
    masterTlRef.current = master;

    return () => {
      master.kill();
      cannon.remove();
      container.remove(); // Cleanup body element
    };
  }, []);

  const updatePositionAndFire = () => {
    const cannon = cannonRef.current;
    const container = bulletsContainerRef.current;
    const tl = masterTlRef.current;

    if (!cannon || !container || !tl) return;
    if (tl.isActive()) return;

    // Use getBoundingClientRect to find cannon position in viewport
    const rect = cannon.getBoundingClientRect();

    // Original CSS Offset Replication:
    // Container (100x100) was centered on wrapper (width 64) -> Left -18px from wrapper left.
    // Container Bottom aligned with Wrapper Bottom -> Top is -36px from Wrapper Top.
    const scale = 0.5;
    const unscaledLeftOffset = -18;
    const unscaledTopOffset = -36;

    // We use absolute positioning relative to document body (so add scrollY/scrollX)
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Calculate document position for the container's Top-Left corner
    const absLeft = rect.left + scrollX + (unscaledLeftOffset * scale);
    const absTop = rect.top + scrollY + (unscaledTopOffset * scale);

    // Apply strict positioning
    gsap.set(container, {
      transformOrigin: 'top left',
      x: absLeft,
      y: absTop,
      scale: scale
    });

    // Calculate footer boundary
    // Footer check works in viewport coordinates usually, but we need to map to our local space.
    // Let's use viewport coordinates again for the check.
    const footer = document.querySelector('footer');
    const footerViewportY = footer ? footer.getBoundingClientRect().top : window.innerHeight;
    const viewportBottom = window.innerHeight;

    // Limit is minimum of footer top or screen bottom (viewport space)
    const limitViewportY = Math.min(footerViewportY, viewportBottom);

    // Container starts at 'rect.top + (unscaledTopOffset * scale)' in viewport space
    const containerViewportY = rect.top + (unscaledTopOffset * scale);

    const distanceScreen = limitViewportY - containerViewportY;
    const distanceLocal = distanceScreen / scale;

    maxLocalYRef.current = distanceLocal;

    tl.play(0);
  };

  useImperativeHandle(ref, () => ({
    fire() {
      // Called externally (e.g. from parent hover)
      updatePositionAndFire();
    },
    setPosition(x: number, y: number) { },
    setBoundsAndCenter(rect: DOMRect) { }
  }));

  return (
    <>
      <div
        className="cannon-flair-wrapper"
        ref={wrapperRef}
        style={{ position: 'relative', width: '64px', height: '64px' }}
      />
      <style jsx global>{`
        .cannon { 
          position: absolute; 
          top: 0; left: 0; 
          width: 100%; height: 100%; 
          background-image: url('https://assets.codepen.io/16327/flair.png'); 
          background-size: contain; 
          background-repeat: no-repeat; 
          background-position: center; 
          cursor: pointer; 
          z-index: 10;
        }
        .flair { width: 50px; height: 50px; background-image: url('https://assets.codepen.io/16327/flair.png'); background-size: contain; background-repeat: no-repeat; }
        .flair-bullet { position: absolute; top: 0; left: 0; width: 50px; height: 50px; will-change: transform; opacity: 0; background-position: center; pointer-events: none; z-index: 30; }
        .flair--2 { background-image: url('https://assets.codepen.io/16327/flair-2.png'); }
        .flair--3 { background-image: url('https://assets.codepen.io/16327/flair-3.png'); }
        .flair--4 { background-image: url('https://assets.codepen.io/16327/flair-4.png'); }
        .flair--5 { background-image: url('https://assets.codepen.io/16327/flair-5.png'); }
        .flair--6 { background-image: url('https://assets.codepen.io/16327/flair-6.png'); }
        .flair--7 { background-image: url('https://assets.codepen.io/16327/flair-7.png'); }
        .flair--8 { background-image: url('https://assets.codepen.io/16327/flair-8.png'); }
        .flair--9 { background-image: url('https://assets.codepen.io/16327/flair-9.png'); }
        .flair--10 { background-image: url('https://assets.codepen.io/16327/flair-10.png'); }
        .flair--11 { background-image: url('https://assets.codepen.io/16327/flair-11.png'); }
        .flair--12 { background-image: url('https://assets.codepen.io/16327/flair-12.png'); }
        .flair--13 { background-image: url('https://assets.codepen.io/16327/flair-13.png'); }
        .flair--14 { background-image: url('https://assets.codepen.io/16327/flair-14.png'); }
        .flair--15 { background-image: url('https://assets.codepen.io/16327/flair-15.png'); }
        .flair--16 { background-image: url('https://assets.codepen.io/16327/flair-16.png'); }
        .flair--17 { background-image: url('https://assets.codepen.io/16327/flair-17.png'); }
        .flair--18 { background-image: url('https://assets.codepen.io/16327/flair-18.png'); }
        .flair--19 { background-image: url('https://assets.codepen.io/16327/flair-19.png'); }
        .flair--20 { background-image: url('https://assets.codepen.io/16327/flair-20.png'); }
        .flair--21 { background-image: url('https://assets.codepen.io/16327/flair-21.png'); }
        .flair--22 { background-image: url('https://assets.codepen.io/16327/flair-22.png'); }
        .flair--23 { background-image: url('https://assets.codepen.io/16327/flair-23.png'); }
        .flair--24 { background-image: url('https://assets.codepen.io/16327/flair-24.png'); }
        .flair--25 { background-image: url('https://assets.codepen.io/16327/flair-25.png'); }
        .flair--26 { background-image: url('https://assets.codepen.io/16327/flair-26.png'); }
        .flair--27 { background-image: url('https://assets.codepen.io/16327/flair-27.png'); }
        .flair--28 { background-image: url('https://assets.codepen.io/16327/flair-28.png'); }
        .flair--29 { background-image: url('https://assets.codepen.io/16327/flair-29.png'); }
        .flair--30 { background-image: url('https://assets.codepen.io/16327/flair-30.png'); }
        .flair--31 { background-image: url('https://assets.codepen.io/16327/flair-31.png'); }
        .flair--32 { background-image: url('https://assets.codepen.io/16327/flair-32.png'); }
        .flair--33 { background-image: url('https://assets.codepen.io/16327/flair-33.png'); }
        .flair--34 { background-image: url('https://assets.codepen.io/16327/flair-34.png'); }
        .flair--35 { background-image: url('https://assets.codepen.io/16327/flair-35.png'); }
      `}</style>
    </>
  );
});

CannonFlair.displayName = 'CannonFlair';
export default CannonFlair;
