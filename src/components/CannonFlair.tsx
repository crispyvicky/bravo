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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
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

  // build DOM and timelines once
  useEffect(() => {
    const root = document.createElement('div');
    root.className = 'flair-wrapper';
    root.style.position = 'absolute';

    const cannon = document.createElement('div');
    cannon.className = 'cannon';
    root.appendChild(cannon);
    // fire on cannon hover (host uses pointer-events: none)
    cannon.addEventListener('mouseenter', () => {
      const tl = masterTlRef.current;
      if (!tl) return;
      if (tl.isActive()) return; // don't retrigger while playing
      tl.play(0);
    });

    const container = document.createElement('div');
    container.className = 'flair-container';
    root.appendChild(container);

    rootRef.current = root;
    cannonRef.current = cannon;
    bulletsContainerRef.current = container;

    // initialize bullets now so timeline has concrete targets
    const initBullets: HTMLDivElement[] = [];
    for (let i = 0; i < BULLET_COUNT; i++) {
      const className = 'flair--' + gsap.utils.random(2, 35, 1);
      const b = document.createElement('div');
      b.setAttribute('class', `flair flair-bullet ${className}`);
      container.appendChild(b);
      initBullets.push(b);
    }
    bulletsRef.current = initBullets;

    // build timelines
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
            // Clamp bullets to not cross footer line
            const maxLocalY = maxLocalYRef.current;
            if (!isFinite(maxLocalY)) return;
            for (const b of bulletsRef.current) {
              const y = Number(gsap.getProperty(b, 'y')) || 0;
              if (y >= maxLocalY) {
                if ((b as any).dataset && !(b as any).dataset.landed) {
                  gsap.set(b, { y: maxLocalY });
                  // fade out and remove after landing
                  (b as any).dataset.landed = '1';
                  gsap.to(b, { opacity: 0, duration: 0.35 });
                } else {
                  gsap.set(b, { y: maxLocalY });
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

    // append to host
    if (hostRef.current && !hostRef.current.contains(root)) {
      hostRef.current.appendChild(root);
    }

    return () => {
      master.kill();
      bulletsRef.current.forEach((b: HTMLDivElement) => b.remove());
      container.remove();
      cannon.remove();
      root.remove();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    fire() {
      if (!masterTlRef.current) return;
      // compute footer page Y and local clamp for current root
      const footer = document.querySelector('footer') as HTMLElement | null;
      const footerViewportY = footer ? footer.getBoundingClientRect().top : window.innerHeight;
      const root = rootRef.current;
      if (root) {
        const rootRect = root.getBoundingClientRect();
        // Clamp to the minimum of footer top (if visible) or viewport bottom
        const clampTo = Math.min(footerViewportY, window.innerHeight);
        const computed = clampTo - rootRect.top;
        // If clamp is too close or negative, disable clamping so bullets are visible
        maxLocalYRef.current = computed < 100 ? Infinity : computed;
      }
      const tl = masterTlRef.current;
      if (tl.isActive()) return; // don't retrigger while playing
      tl.play(0);
    },
    setPosition(x: number, y: number) {
      const host = hostRef.current;
      if (!host) return;
      // Fixed overlay filling viewport without causing horizontal scrollbars
      host.style.position = 'fixed';
      host.style.left = '0px';
      host.style.top = '0px';
      host.style.right = '0px';
      host.style.bottom = '0px';
      host.style.pointerEvents = 'none';
      host.style.zIndex = '9999';
      host.style.overflow = 'hidden';

      const root = rootRef.current;
      if (root) {
        root.style.left = `${x}px`;
        root.style.top = `${y}px`;
        root.style.transform = 'translate(-50%, -50%)';
      }
    },
    setBoundsAndCenter(rect: DOMRect) {
      const host = hostRef.current;
      if (!host) return;
      // Viewport-only overlay (no scrollbars)
      host.style.position = 'fixed';
      host.style.left = '0px';
      host.style.top = '0px';
      host.style.right = '0px';
      host.style.bottom = '0px';
      host.style.pointerEvents = 'none';
      host.style.zIndex = '9999';
      host.style.overflow = 'hidden';

      const root = rootRef.current;
      if (root) {
        // bottom-center of hero in viewport coordinates
        root.style.left = `${rect.left + rect.width / 2}px`;
        root.style.top = `${rect.top + rect.height - 24}px`;
        root.style.transform = 'translate(-50%, -50%)';
      }
    }
  }));

  // Render host container where built DOM is appended
  return (
    <>
      <div
        className="cannon-flair-root"
        ref={hostRef}
        onMouseEnter={() => {
          // Fire only when hovering the cannon/root area
          if (!rootRef.current) return;
          const tl = masterTlRef.current;
          if (!tl) return;
          if (tl.isActive()) return;
          tl.play(0);
        }}
      />
      <style jsx global>{`
        .flair-wrapper { position: relative; overflow: visible; }
        .cannon { position: relative; z-index: 10; width: 64px; height: 64px; background-image: url('https://assets.codepen.io/16327/flair.png'); background-size: contain; background-repeat: no-repeat; background-position: center; pointer-events: auto; cursor: pointer; opacity: 1; }
        .flair-container { width: 100px; height: 100px; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); overflow: visible; z-index: 20; }
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

