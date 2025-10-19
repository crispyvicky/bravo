"use client";
import React, { useEffect, useRef } from "react";

interface BravoOProps {
  size?: number;
  className?: string;
}

const BravoO: React.FC<BravoOProps> = ({ size = 24, className = "" }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Make SVG visible and add animations
    svg.style.visibility = "visible";
    
    // Add CSS animations via style tag
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shoulderDip {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(8px); }
      }
      
      @keyframes armDip {
        0%, 100% { transform: rotate(0deg) translateY(0px); }
        25% { transform: rotate(-2deg) translateY(2px); }
        50% { transform: rotate(0deg) translateY(8px); }
        75% { transform: rotate(2deg) translateY(2px); }
      }
      
      @keyframes legDip {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(6px); }
      }
      
      @keyframes barDip {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(4px) scale(0.98); }
      }
      
      .bigO {
        animation: shoulderDip 2.2s ease-in-out infinite;
      }
      
      .OArmRDown {
        animation: armDip 2.2s ease-in-out infinite;
        transform-origin: 460px 200.5px;
      }
      
      .OArmLDown {
        animation: armDip 2.2s ease-in-out infinite;
        transform-origin: 358.5px 200.54px;
      }
      
      .OLegL {
        animation: legDip 2.2s ease-in-out infinite;
      }
      
      .OLegR {
        animation: legDip 2.2s ease-in-out infinite;
      }
      
      .OBar {
        animation: barDip 2.2s ease-in-out infinite;
      }
      
      .OGroup {
        animation: shoulderDip 2.2s ease-in-out infinite;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <svg 
      ref={svgRef}
      className={className}
      viewBox="0 0 800 600" 
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * 0.75} // Maintain aspect ratio
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <defs>
        <pattern 
          id="oBg" 
          width="20" 
          height="20" 
          x="8" 
          y="0" 
          patternUnits="userSpaceOnUse" 
          viewBox="0 0 20 20"
        >
          <rect width="6" height="6" x="10" y="10" fill='#FFF' fillOpacity='0' />
          <rect width="6" height="6" x="0" y="0" fill='#FFF' fillOpacity='1' />
        </pattern>
      </defs>
      
      <clipPath id="oMask">
        <path 
          className="bigO" 
          id="bigO" 
          d="M354.54,248.49q0-26.89,2.52-43t7.9-24.2q7.35-11.53,17.55-16.47t26.87-4.94q16.67,0,26.87,4.94t17.66,16.47q5.37,8.34,7.84,24.37t2.47,42.81q0,26.67-2.52,42.75t-7.78,24.42q-7.46,11.53-17.66,16.46t-26.87,4.94q-16.67,0-26.87-4.94T365,315.67q-5.37-8.12-7.9-24.2T354.54,248.49Zm32.16,0q0,41.71,4.87,52.52t18,10.81q12.92,0,17.68-10.59T432,248.49q0-42.15-4.82-52.91t-17.85-10.76q-13,0-17.85,10.76T386.7,248.49Z"
        />
      </clipPath>
      
      <g className="OGroup">
        <polyline 
          className="OArmRDown" 
          points="460 200.5 486 173.5 486 128.5" 
          fill="none" 
          stroke="black" 
          strokeMiterlimit="10" 
          strokeWidth="3"
        />
        <polyline 
          className="OArmLDown" 
          points="358.5 200.54 334.5 169.5 340 128.5" 
          fill="none" 
          stroke="black" 
          strokeMiterlimit="10" 
          strokeWidth="3"
        />
        <polyline 
          className="OLegL" 
          points="388 333.5 379 373.5 383 415.5 370 430.5" 
          fill="none" 
          stroke="black" 
          strokeMiterlimit="10" 
          strokeWidth="3"
        />
        <polyline 
          className="OLegR" 
          points="428 333.5 438 374.5 431 416.5 442 432.5" 
          fill="none" 
          stroke="black" 
          strokeMiterlimit="10" 
          strokeWidth="3"
        />
        
        <rect 
          fill="url(#oBg)" 
          clipPath="url(#oMask)" 
          width="100%" 
          height="100%" 
        />
        <use 
          xlinkHref="#bigO" 
          fill="none" 
          stroke="black" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </g>
      
      <line 
        id="OBar" 
        x1="300" 
        y1="130" 
        x2="523" 
        y2="130" 
        stroke="black" 
        strokeWidth="8" 
        strokeLinecap="butt" 
        strokeLinejoin="miter"
      />
    </svg>
  );
};

export default BravoO;
