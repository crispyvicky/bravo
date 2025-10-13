import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { CustomEase } from "gsap/CustomEase";
import { CustomWiggle } from "gsap/CustomWiggle";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Observer, CustomEase, CustomWiggle, Physics2DPlugin, ScrollTrigger);

const DragExplodeHero = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const handRef = useRef<HTMLDivElement | null>(null);
  const instructionsRef = useRef<HTMLElement | null>(null);
  const rockRef = useRef<HTMLImageElement | null>(null);
  const dragRef = useRef<HTMLImageElement | null>(null);
  const handleRef = useRef<HTMLImageElement | null>(null);
  const canvasRef = useRef<SVGSVGElement | null>(null);
  const proxyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const hand = handRef.current;
    const instructions = instructionsRef.current;
    const rock = rockRef.current;
    const drag = dragRef.current;
    const handle = handleRef.current;
    const canvas = canvasRef.current;
    const proxy = proxyRef.current;
    if (!hero || !hand || !canvas || !drag || !handle || !rock) return;

    const preloadImages = Array.from(hero.querySelectorAll<HTMLImageElement>(".image-preload img"));
    const xplodePreloadImages = Array.from(hero.querySelectorAll<HTMLImageElement>(".explosion-preload img"));

    const imageMap: Record<string, HTMLImageElement> = {};
    const imageKeys: string[] = [];
    preloadImages.forEach((img) => {
      const key = img.dataset.key || "";
      if (!key) return;
      imageMap[key] = img;
      imageKeys.push(key);
    });

    const explosionMap: Record<string, HTMLImageElement> = {};
    const explosionKeys: string[] = [];
    xplodePreloadImages.forEach((img) => {
      const key = img.dataset.key || "";
      if (!key) return;
      explosionMap[key] = img;
      explosionKeys.push(key);
    });

    let isDrawing = false;
    // Temporarily disable text selection while dragging
    const originalHtmlSelect = { value: "" as string | null };
    const originalBodySelect = { value: "" as string | null };
    const disableUserSelect = () => {
      const html = document.documentElement as HTMLElement;
      const body = document.body as HTMLElement;
      originalHtmlSelect.value = html.style.userSelect;
      originalBodySelect.value = body.style.userSelect;
      html.style.userSelect = 'none';
      body.style.userSelect = 'none';
    };
    const enableUserSelect = () => {
      const html = document.documentElement as HTMLElement;
      const body = document.body as HTMLElement;
      if (originalHtmlSelect.value !== null) html.style.userSelect = originalHtmlSelect.value;
      if (originalBodySelect.value !== null) body.style.userSelect = originalBodySelect.value;
    };

    let currentLine: SVGLineElement | null = null;
    let startImage: SVGImageElement | null = null;
    let circle: SVGCircleElement | null = null;
    let startX = 0;
    let startY = 0;
    let lastDistance = 0;

    const animationIsOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    CustomWiggle.create("dragExplodeWiggle", { wiggles: 6 });
    const clampScale = gsap.utils.clamp(1, 100);

    const setX = gsap.quickTo(hand, "x", { duration: 0.1 });
    const setY = gsap.quickTo(hand, "y", { duration: 0.1 });

    const getLocalXY = (clientX: number, clientY: number) => {
      const rect = hero.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const isInsideHeroRect = (clientX: number, clientY: number): boolean => {
      const rect = hero.getBoundingClientRect();
      return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
    };

    const setHandMotion = () => {
      gsap.set(hand, { xPercent: -50, yPercent: -50 });
    };

    const isInteractiveElement = (el: any): boolean => {
      if (!el || typeof el !== 'object') return false;
      let node: any = el;
      while (node && node !== document && node !== window) {
        if (node.nodeType === 1) {
          const tag = (node.tagName ? String(node.tagName).toLowerCase() : '');
          if (tag === 'a' || tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea') return true;
          const role = node.getAttribute ? node.getAttribute('role') : null;
          if (role === 'button') return true;
          const hasClass = node.classList && (node.classList.contains('card-surface') || node.classList.contains('btn-primary') || node.classList.contains('nav-link'));
          if (hasClass) return true;
        }
        node = node.parentNode || node.host || null;
      }
      return false;
    };

    const createExplosion = (x: number, y: number, distance = 100) => {
      const count = Math.round(gsap.utils.clamp(3, 100, distance / 20));
      const angleSpread = Math.PI * 2;
      const tl = gsap.timeline();
      const speed = gsap.utils.mapRange(0, 500, 0.3, 1.5, distance);
      const sizeRange = gsap.utils.mapRange(0, 500, 20, 60, distance);

      for (let i = 0; i < count; i++) {
        const randomKey = gsap.utils.random(explosionKeys);
        const original = explosionMap[randomKey as string];
        if (!original) continue;
        const img = original.cloneNode(true) as HTMLImageElement;
        img.className = "explosion-img";
        img.style.position = "absolute";
        img.style.pointerEvents = "none";
        img.style.height = `${gsap.utils.random(20, sizeRange)}px`;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        img.style.transform = "translate(-50%, -50%)";
        img.style.zIndex = "4";

        hero.appendChild(img);

        const angle = Math.random() * angleSpread;
        const velocity = gsap.utils.random(500, 1500) * speed;

        tl.to(
          img,
          {
            physics2D: {
              angle: (angle * 180) / Math.PI,
              velocity,
              gravity: 3000
            },
            rotation: gsap.utils.random(-180, 180),
            duration: 1 + Math.random()
          },
          0
        ).to(
          img,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power1.out",
            onComplete: () => img.remove()
          },
          1
        );
      }
      return tl;
    };

    const startDrawing = (e: PointerEvent) => {
      const targetEl = (e.target as Element) || null;
      if (isInteractiveElement(targetEl)) return;
      isDrawing = true;
      if (instructions) gsap.set(instructions, { opacity: 0 });
      disableUserSelect();

      const { x, y } = getLocalXY(e.clientX, e.clientY);
      startX = x;
      startY = y;

      const svgNS = "http://www.w3.org/2000/svg";
      currentLine = document.createElementNS(svgNS, "line");
      currentLine.setAttribute("x1", String(startX));
      currentLine.setAttribute("y1", String(startY));
      currentLine.setAttribute("x2", String(startX));
      currentLine.setAttribute("y2", String(startY));
      currentLine.setAttribute("stroke", "#fffce1");
      currentLine.setAttribute("stroke-width", "2");
      currentLine.setAttribute("stroke-dasharray", "4");

      circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", String(startX));
      circle.setAttribute("cy", String(startY));
      circle.setAttribute("r", "24");
      circle.setAttribute("fill", "#0e100f");

      const randomKey = gsap.utils.random(imageKeys);
      const original = imageMap[randomKey as string];
      const img = document.createElementNS(svgNS, "image");
      img.setAttribute("x", String(startX - 20));
      img.setAttribute("y", String(startY - 20));
      img.setAttribute("width", "40");
      img.setAttribute("height", "40");
      img.setAttributeNS("http://www.w3.org/1999/xlink", "href", original?.src || "");
      startImage = img;

      canvas.appendChild(currentLine);
      canvas.appendChild(circle);
      canvas.appendChild(startImage);

      gsap.set(drag, { opacity: 1 });
      gsap.set(handle, { opacity: 1 });
      gsap.set(rock, { opacity: 0 });
    };

    const updateDrawing = (e: PointerEvent) => {
      if (!currentLine || !startImage || !circle) return;

      const { x: cursorX, y: cursorY } = getLocalXY(e.clientX, e.clientY);
      const dx = cursorX - startX;
      const dy = cursorY - startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const shrink = (distance - 30) / distance;

      let x2 = startX + dx * shrink;
      let y2 = startY + dy * shrink;
      if (distance < 30) {
        x2 = startX;
        y2 = startY;
      }

      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      gsap.to(currentLine, {
        attr: { x2, y2 },
        duration: 0.1,
        ease: "none"
      });

      const raw = distance / 100;
      const eased = Math.pow(raw, 0.5);
      const clamped = clampScale(eased);

      gsap.set([startImage, circle], {
        scale: clamped,
        rotation: `${angle - 45}_short`,
        transformOrigin: "center center"
      });

      gsap.to(hand, {
        rotation: `${angle - 90}_short`,
        duration: 0.1,
        ease: "none"
      });

      lastDistance = distance;
    };

    const clearDrawing = () => {
      if (!isDrawing) return;
      createExplosion(startX, startY, lastDistance);

      gsap.set(drag, { opacity: 0 });
      gsap.set(handle, { opacity: 0 });
      gsap.set(rock, { opacity: 1 });

      gsap.to(rock, {
        duration: 0.4,
        rotation: "+=30",
        ease: "dragExplodeWiggle",
        onComplete: () => {
          gsap.set(rock, { opacity: 0 });
          gsap.set(hand, { rotation: 0, overwrite: "auto" });
          if (instructions) {
            gsap.to(instructions, { opacity: 1 });
          }
          gsap.set(drag, { opacity: 1 });
        }
      });

      isDrawing = false;
      enableUserSelect();
      canvas.innerHTML = "";
      currentLine = null;
      startImage = null;
      circle = null;
    };

    const initEvents = () => {
      if (!animationIsOk) return;
      // Desktop + touch: attach to proxy to avoid window-level conflicts
      const proxyEl = proxy as HTMLElement;
      if (!proxyEl) return;

      const onEnter = () => gsap.set(hand, { opacity: 1 });
      const onLeave = () => {
        gsap.set(hand, { opacity: 0 });
        if (isDrawing) clearDrawing();
      };
      const onMove = (clientX: number, clientY: number, targetEl: Element | null) => {
        const { x, y } = getLocalXY(clientX, clientY);
        setX(x);
        setY(y);
        const overInteractive = isInteractiveElement(targetEl as Element);
        gsap.set(hand, { opacity: overInteractive ? 0.2 : 1 });
      };

      proxyEl.addEventListener('mouseenter', onEnter);
      proxyEl.addEventListener('mouseleave', onLeave);
      proxyEl.addEventListener('mousemove', (e: MouseEvent) => onMove(e.clientX, e.clientY, e.target as Element));
      proxyEl.addEventListener('touchmove', (e: TouchEvent) => {
        const t = e.changedTouches[0];
        if (t) onMove(t.clientX, t.clientY, e.target as Element);
      }, { passive: true });

      // Pointer interactions
      proxyEl.addEventListener('pointerdown', (e: PointerEvent) => {
        const targ = e.target as Element | null;
        if (targ && isInteractiveElement(targ)) return;
        startDrawing(e);
      });
      proxyEl.addEventListener('pointermove', (e: PointerEvent) => {
        if (!isDrawing) return;
        e.preventDefault();
        updateDrawing(e);
      });
      proxyEl.addEventListener('pointerup', () => clearDrawing());
      proxyEl.addEventListener('pointercancel', () => clearDrawing());

      // Stop native text selection while dragging
      proxyEl.addEventListener('mousedown', () => disableUserSelect());
      window.addEventListener('mouseup', () => enableUserSelect());
      gsap.delayedCall(1, () => {
        const rect = hero.getBoundingClientRect();
        createExplosion(rect.width / 2, rect.height / 2, 600);
      });
    };

    setHandMotion();
    initEvents();

    return () => {
      gsap.globalTimeline.clear();
    };
  }, []);

  return (
    <section ref={heroRef as any} className="hero pricing-hero" data-block="pricing-hero">
      <div className="container">
        <div className="pricing-hero__content">
          <div className="pricing-hero__flair">
            <div ref={handRef as any} className="pricing-hero__hand">
              <img ref={dragRef as any} className="pricing-hero__drag" src="https://assets.codepen.io/16327/hand-drag.png" alt="" />
              <img ref={rockRef as any} className="pricing-hero__rock" src="https://assets.codepen.io/16327/hand-rock.png" alt="" />
              <img ref={handleRef as any} className="pricing-hero__handle" src="https://assets.codepen.io/16327/2D-circle.png" alt="" />
              <small ref={instructionsRef as any}></small>
            </div>

            <div className="image-preload" aria-hidden="true">
              <img data-key="combo" src="https://assets.codepen.io/16327/3D-combo.png" width="1" height="1" style={{ position: "absolute", left: -9999 }} />
              <img data-key="cone" src="https://assets.codepen.io/16327/3D-cone.png" width="1" height="1" style={{ position: "absolute", left: -9999 }} />
              <img data-key="hoop" src="https://assets.codepen.io/16327/3D-hoop.png" width="1" height="1" style={{ position: "absolute", left: -9999 }} />
              <img data-key="keyframe" src="https://assets.codepen.io/16327/3D-keyframe.png" width="1" height="1" style={{ position: "absolute", left: -9999 }} />
              <img data-key="semi" src="https://assets.codepen.io/16327/3D-semi.png" width="1" height="1" style={{ position: "absolute", left: -9999 }} />
              <img data-key="spiral" src="https://assets.codepen.io/16327/3D-spiral.png" width="1" height="1" style={{ position: "absolute", left: -9999 }} />
              <img data-key="squish" src="https://assets.codepen.io/16327/3D-squish.png" width="1" height="1" style={{ position: "absolute", left: -9999 }} />
              <img data-key="triangle" src="https://assets.codepen.io/16327/3D-triangle.png" width="1" height="1" style={{ position: "absolute", left: -9999 }} />
              <img data-key="tunnel" src="https://assets.codepen.io/16327/3D-tunnel.png" width="1" height="1" style={{ position: "absolute", left: -9999 }} />
              <img data-key="wat" src="https://assets.codepen.io/16327/3D-poly.png" width="1" height="1" style={{ position: "absolute", left: -9999 }} />
            </div>
            <div className="explosion-preload" aria-hidden="true">
              <img data-key="blue-circle" src="https://assets.codepen.io/16327/2D-circles.png" style={{ position: "absolute", left: -9999 }} />
              <img data-key="green-keyframe" src="https://assets.codepen.io/16327/2D-keyframe.png" style={{ position: "absolute", left: -9999 }} />
              <img data-key="orange-lightning" src="https://assets.codepen.io/16327/2D-lightning.png" style={{ position: "absolute", left: -9999 }} />
              <img data-key="orange-star" src="https://assets.codepen.io/16327/2D-star.png" style={{ position: "absolute", left: -9999 }} />
              <img data-key="purple-flower" src="https://assets.codepen.io/16327/2D-flower.png" style={{ position: "absolute", left: -9999 }} />
              <img data-key="cone" src="https://assets.codepen.io/16327/3D-cone.png" style={{ position: "absolute", left: -9999 }} />
              <img data-key="keyframe" src="https://assets.codepen.io/16327/3D-spiral.png" style={{ position: "absolute", left: -9999 }} />
              <img data-key="spiral" src="https://assets.codepen.io/16327/3D-spiral.png" style={{ position: "absolute", left: -9999 }} />
              <img data-key="tunnel" src="https://assets.codepen.io/16327/3D-tunnel.png" style={{ position: "absolute", left: -9999 }} />
              <img data-key="hoop" src="https://assets.codepen.io/16327/3D-hoop.png" style={{ position: "absolute", left: -9999 }} />
              <img data-key="semi" src="https://assets.codepen.io/16327/3D-semi.png" style={{ position: "absolute", left: -9999 }} />
            </div>
          </div>
        </div>
        <svg ref={canvasRef as any} className="pricing-hero__canvas"></svg>
        <div ref={proxyRef as any} className="pricing-hero__proxy" aria-hidden="true"></div>
      </div>

      <style jsx global>{`
.pricing-hero { position: absolute; inset: 0; background: transparent; max-width: 100%; overflow: hidden; width: 100%; height: 100%; z-index: 40; pointer-events: none; }
.pricing-hero img { max-width: 100%; }
.pricing-hero .subtitle { color: var(--color-surface-white, #fffce1); display: inline-block; z-index: 2; }
.pricing-hero__flair { display: block; width: 100%; pointer-events: none; }
.pricing-hero__content { text-align: center; width: 100%; pointer-events: none; }
.pricing-hero__heading-container { position: relative; width: 100%; }
.pricing-hero__heading--free { left: 0; opacity: 0; position: absolute; top: 0; width: 100%; }
.pricing-hero__heading { line-height: 1.13 !important; margin: 0; }
.pricing-hero__heading > * { -webkit-text-fill-color: transparent; background: var(--color-ui-gradient, linear-gradient(90deg,#fff,#ddd)); -webkit-background-clip: text; background-clip: text; will-change: transform; }
.pricing-hero__hand { left: 0; opacity: 0; pointer-events: none; position: absolute; top: 0; width: 30px; z-index: 44; }
.pricing-hero__hand small { left: -60%; position: absolute; top: 20px; width: 200%; }
.pricing-hero__drag, .pricing-hero__rock { position: absolute; z-index: 4; }
.pricing-hero__rock, .pricing-hero__drag { max-width: 141%; opacity: 0; right: 1px; top: -22px; width: 131%; }
.pricing-hero__drag { opacity: 1; }
.pricing-hero__handle { left: 0; opacity: 0; position: absolute; right: 0; top: -40px; width: 100%; }
.pricing-hero__canvas { z-index: 41; }
.pricing-hero__canvas, .pricing-hero__proxy { bottom: 0; height: 100%; left: 0; position: absolute; right: 0; top: 0; width: 100%; }
.pricing-hero__proxy { z-index: 42; pointer-events: auto; }
.explosion-img { will-change: transform; }
.explosion-img { will-change: transform; }
      `}</style>
    </section>
  );
};

export default DragExplodeHero;


