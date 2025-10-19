import React, { useState, useEffect } from "react";
import styles from "./Services.module.css";

const services = [
  { title: "Static Website",     icon: "🌐", description: "Sleek, responsive site.",      price: "₹10K – ₹25K",  timeline: "1–2 weeks",  cta: "Start Static Site" },
  { title: "MVP / Landing",       icon: "🚀", description: "Fast launch MVP.",             price: "₹50K – ₹1.5L", timeline: "2–6 weeks",  cta: "Start MVP Quest" },
  { title: "Web Apps",            icon: "💻", description: "Powerful custom web app.",     price: "₹1.5L – ₹5L",  timeline: "6–16 weeks", cta: "Start Web App Quest" },
  { title: "Mobile Dev",          icon: "📱", description: "iOS/Android perfection.",      price: "₹3L – ₹10L",  timeline: "8–20 weeks", cta: "Start App Quest" },
  { title: "UI/UX",               icon: "🎨", description: "Design that delights.",        price: "₹50K – ₹3L",   timeline: "2–8 weeks",  cta: "Start Design Quest" },
  { title: "AI/ML",               icon: "🤖", description: "Smart AI/ML solutions.",       price: "₹2L – ₹8L",    timeline: "4–12 weeks", cta: "Start AI Quest" },
  { title: "Analytics",           icon: "📊", description: "Manage your insights.",        price: "₹1L – ₹5L",    timeline: "3–10 weeks", cta: "Start Analytics Quest" },
  { title: "Legacy Modernize",    icon: "⚡", description: "Modernize legacy tech.",       price: "₹5L – ₹15L",   timeline: "10–24 weeks",cta: "Start Epic Quest" },
  { title: "Chatbots",            icon: "🤝", description: "Automate & engage.",           price: "₹1.5L – ₹6L",  timeline: "4–10 weeks", cta: "Start Bot Quest" }
];

export default function Services() {
  const [active, setActive] = useState<number | null>(0);
  const [angle, setAngle]     = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [radius, setRadius]   = useState(220);
  const [center, setCenter]   = useState(300);
  const [size, setSize]       = useState(60);

  // Detect mobile viewport
  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth <= 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  // Continuous rotation
  useEffect(() => {
    const id = setInterval(() => setAngle(prev => prev + 1), 50);
    return () => clearInterval(id);
  }, []);

  // Responsive sizing values
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setRadius(220); setCenter(200); setSize(90);
      } else if (w < 600) {
        setRadius(250); setCenter(190); setSize(90);
      } else if (w < 768) {
        setRadius(250); setCenter(190); setSize(90);
      } else if (w < 900) {
        setRadius(200); setCenter(260); setSize(60);
      } else {
        setRadius(220); setCenter(300); setSize(60);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Choose Your Quest</h2>
        <p className={styles.subtitle}>Pick the mission that matches your goals and budget.</p>
      </div>

      <div
        className={styles.circleWrapper}
        style={{
          "--center": `${center}px`,
          width:  `${center * 2}px`,
          height: `${center * 2}px`
        } as React.CSSProperties}
      >
        {services.map((s, i) => {
          const base     = (2 * Math.PI / services.length) * i - Math.PI/2;
          const rotated  = base + angle * Math.PI/180 * (isMobile ? 0.5 : 1);
          const cardW    = isMobile ? 90 : size;
          const cardH    = isMobile ? 90 : size;
          const x        = center + radius * Math.cos(rotated) - cardW/2;
          const y        = center + radius * Math.sin(rotated) - cardH/2;
          const isActive = active === i;

          return (
            <button
              key={i}
              className={`${styles.iconCard} ${isActive ? styles.iconCardActive : ""}`}
              style={{ left: x, top: y, width: cardW, height: cardH }}
              onMouseEnter={() => setActive(i)}
              onTouchStart={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className={styles.emoji}>{s.icon}</span>
            </button>
          );
        })}

        {active !== null && (
          <div className={styles.centerDetail}>
            <div className={styles.detailBox}>
              <div className={styles.iconLarge}>{services[active].icon}</div>
              <h2 className={styles.serviceTitle}>{services[active].title}</h2>
              <p className={styles.desc}>{services[active].description}</p>
              <div className={styles.info}>
                <span>💰 {services[active].price}</span>
                <span>⏱️ {services[active].timeline}</span>
              </div>
              <button
                className={styles.cta}
                onMouseDown={e => e.stopPropagation()}
                onClick={e => {
                  e.stopPropagation();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {services[active].cta}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
