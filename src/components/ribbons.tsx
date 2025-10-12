import React, { useEffect, useRef } from 'react';
import { Renderer, Transform, Vec3, Color, Polyline } from 'ogl';
import { useIsMobile, useHasMouse } from '../hooks/use-mobile';

interface RibbonsProps {
  colors?: string[];
  baseSpring?: number;
  baseFriction?: number;
  baseThickness?: number;
  offsetFactor?: number;
  maxAge?: number;
  pointCount?: number;
  speedMultiplier?: number;
  enableFade?: boolean;
  enableShaderEffect?: boolean;
  effectAmplitude?: number;
  backgroundColor?: number[];
}

const Ribbons: React.FC<RibbonsProps> = ({
  colors = ['#4169E1'], // vibrant, playful colors
  baseSpring = 0.05,    // slightly more responsive movement
  baseFriction = 0.85,    // a bit smoother decay
  baseThickness = 30,     // slightly thicker for visibility
  offsetFactor = 0.08,     // subtle trailing offset
  maxAge = 600,          // shorter lifespan for faster trail refresh
   pointCount = 60,         // more points for smoother curve
   speedMultiplier = 0.4,   // faster movement with mouse
   enableFade = true,     // enables fade-out for nicer trailing
   enableShaderEffect = true,
   effectAmplitude = 3,    // slightly more wavy effect
   backgroundColor = [0, 0, 0, 0] 
   // dark semi-transparent background for contrast
  
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const hasMouse = useHasMouse();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Early return for devices without mouse support to prevent performance issues
    if (isMobile || !hasMouse) {
      console.log('Ribbons component disabled on mobile/touch devices for performance');
      return;
    }

    try {
      // Optimize DPR for better performance on desktop
      const dpr = Math.min(window.devicePixelRatio || 2, 2);
      const renderer = new Renderer({ dpr, alpha: true });
      const gl = renderer.gl;
      
      if (!gl) {
        console.error('WebGL not supported');
        return;
      }
      
      if (Array.isArray(backgroundColor) && backgroundColor.length === 4) {
        gl.clearColor(backgroundColor[0], backgroundColor[1], backgroundColor[2], backgroundColor[3]);
      } else {
        gl.clearColor(0, 0, 0, 0);
      }

    gl.canvas.style.position = 'absolute';
    gl.canvas.style.top = '0';
    gl.canvas.style.left = '0';
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.zIndex = '0';
    gl.canvas.style.pointerEvents = 'none';
    container.appendChild(gl.canvas);

    const scene = new Transform();
    const lines: {
      spring: number;
      friction: number;
      mouseVelocity: Vec3;
      mouseOffset: Vec3;
      points: Vec3[];
      polyline: Polyline;
    }[] = [];

    const vertex = `
      precision highp float;
      
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      
      varying vec2 vUV;
      
      vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          float dist = length(nextScreen - prevScreen);
          normal *= smoothstep(0.0, 0.02, dist);
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          float pixelWidth = current.w * pixelWidthRatio;
          normal *= pixelWidth * uThickness;
          current.xy -= normal * side;
          if(uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
          }
          return current;
      }
      
      void main() {
          vUV = uv;
          gl_Position = getPosition();
      }
    `;

    const fragment = `
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
          float fadeFactor = 1.0;
          if(uEnableFade > 0.5) {
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
          }
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `;

    const resize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      lines.forEach(line => line.polyline.resize());
    };
    window.addEventListener('resize', resize);

    const center = (colors.length - 1) / 2;
    colors.forEach((color, index) => {
      const spring = baseSpring + (Math.random() - 0.5) * 0.05;
      const friction = baseFriction + (Math.random() - 0.5) * 0.05;
      const thickness = baseThickness + (Math.random() - 0.5) * 3;
      const mouseOffset = new Vec3(
        (index - center) * offsetFactor + (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.1,
        0
      );

      const line = {
        spring,
        friction,
        mouseVelocity: new Vec3(),
        mouseOffset,
        points: [] as Vec3[],
        polyline: {} as Polyline
      };

      const count = pointCount;
      const points: Vec3[] = [];
      for (let i = 0; i < count; i++) {
        points.push(new Vec3());
      }
      line.points = points;

      line.polyline = new Polyline(gl, {
        points,
        vertex,
        fragment,
        uniforms: {
          uColor: { value: new Color(color) },
          uThickness: { value: thickness },
          uOpacity: { value: 0.8 },
          uTime: { value: 0.0 },
          uEnableShaderEffect: { value: enableShaderEffect ? 1.0 : 0.0 },
          uEffectAmplitude: { value: effectAmplitude },
          uEnableFade: { value: enableFade ? 1.0 : 0.0 }
        }
      });
      line.polyline.mesh.setParent(scene);
      lines.push(line);
    });

    resize();

    const mouse = new Vec3();
    const updateMouse = (e: MouseEvent | TouchEvent) => {
      let x: number, y: number;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if ('changedTouches' in e && e.changedTouches.length) {
        x = e.changedTouches[0].clientX - rect.left;
        y = e.changedTouches[0].clientY - rect.top;
      } else if (e instanceof MouseEvent) {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      } else {
        x = 0;
        y = 0;
      }
      const width = container.clientWidth;
      const height = container.clientHeight;
      mouse.set((x / width) * 2 - 1, (y / height) * -2 + 1, 0);
    };
    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('touchstart', updateMouse);
    window.addEventListener('touchmove', updateMouse);

    const tmp = new Vec3();
    let frameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    const update = () => {
      frameId = requestAnimationFrame(update);
      const currentTime = performance.now();
      const dt = currentTime - lastTime;
      lastTime = currentTime;
      frameCount++;

      // Limit frame rate to 60fps max for better performance
      if (frameCount % 1 === 0) {
      lines.forEach(line => {
        tmp.copy(mouse).add(line.mouseOffset).sub(line.points[0]).multiply(line.spring);
        line.mouseVelocity.add(tmp).multiply(line.friction);
        line.points[0].add(line.mouseVelocity);

        for (let i = 1; i < line.points.length; i++) {
          if (isFinite(maxAge) && maxAge > 0) {
            const segmentDelay = maxAge / (line.points.length - 1);
            const alpha = Math.min(1, (dt * speedMultiplier) / segmentDelay);
            line.points[i].lerp(line.points[i - 1], alpha);
          } else {
            line.points[i].lerp(line.points[i - 1], 0.9);
          }
        }
        if (line.polyline.mesh.program.uniforms.uTime) {
          line.polyline.mesh.program.uniforms.uTime.value = currentTime * 0.001;
        }
        line.polyline.updateGeometry();
      });

      renderer.render({ scene });
      }
    };
      update();

      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', updateMouse);
        window.removeEventListener('touchstart', updateMouse);
        window.removeEventListener('touchmove', updateMouse);
        if (frameId) {
          cancelAnimationFrame(frameId);
        }
        if (gl.canvas && gl.canvas.parentNode === container) {
          container.removeChild(gl.canvas);
        }
      };
    } catch (error) {
      console.error('Error initializing Ribbons component:', error);
    }
  }, [
    isMobile,
    hasMouse,
    colors,
    baseSpring,
    baseFriction,
    baseThickness,
    offsetFactor,
    maxAge,
    pointCount,
    speedMultiplier,
    enableFade,
    enableShaderEffect,
    effectAmplitude,
    backgroundColor
  ]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none z-10">
      {(isMobile || !hasMouse) && (
        <div className="absolute inset-0 opacity-20">
          {/* Lightweight CSS-based visual effect for mobile/touch devices */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-300 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
        </div>
      )}
    </div>
  );
};

export default Ribbons;
