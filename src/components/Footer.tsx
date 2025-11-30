import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import FlowerPath from "./FlowerPath";
import BravoO from "./BravoO";

// Random status for personality but condensed
const statusMessages = [
  "🟢 Available for Quests",
  "⚡ Coffee & Code",
  "🎯 Focused Mode"
];

const Footer = () => {
  const [randomStatus, setRandomStatus] = useState("🟢 Available for Quests");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set random status after hydration to avoid SSR mismatch
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * statusMessages.length);
    setRandomStatus(statusMessages[randomIndex]);
  }, []);

  // Style shortcut for links
  const linkStyle = {
    color: "#1f2937",
    textDecoration: "none",
    margin: "0 4px",
    fontWeight: 400
  };
  const linkBold = {
    ...linkStyle,
    fontWeight: 600,
    color: "#2563eb"
  };
  const navLinkStyle = {
    ...linkStyle,
    display: "inline-block",
    fontSize: "1rem",
    padding: "2px 0"
  };
  const iconStyle = {
    ...linkStyle,
    color: "#1f2937",
    fontSize: "1rem"
  };

  // Play / stop audio
  const playAudio = () => {
    audioRef.current?.play().catch(() => { });
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        background: "#fff",
        color: "#1f2937",
        padding: "56px 0 90px",
        marginTop: 64,
        boxShadow: "0 -4px 24px rgba(31,41,55,0.07)"
      }}
    >
      {/* Animated FlowerPath SVG as background */}
      <div style={{
        position: "absolute",
        zIndex: 0,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        pointerEvents: "none",
        opacity: 80,
        overflow: "hidden"
      }}>
        <FlowerPath />
      </div>

      {/* Main Footer Content */}
      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        flexDirection: "column",
        gap: 32
      }}>
        {/* Top: Branding, Links, Contact */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "start",
          justifyContent: "space-between",
          gap: 40
        }} className="flex-col md:flex-row items-center md:items-start text-center md:text-left">
          {/* Brand */}
          <div style={{ minWidth: 240 }} className="w-full md:w-auto">
            <h3 className="text-2xl font-bold" >
              Bravo<BravoO className="text-black" size={50} /> ⚔️
            </h3>
            <p style={{ color: "#2563eb", fontWeight: 500, marginBottom: 8, fontSize: "1rem" }}>Build → Deploy → Win</p>
            <p style={{ color: "#374151", fontSize: "0.95rem", maxWidth: 230, margin: "0 auto" }} className="md:mx-0">From startup to enterprise, every quest deserves a legendary outcome.</p>
          </div>
          {/* Navigation */}
          <nav aria-label="Footer" style={{ flex: 1, minWidth: 180 }} className="w-full md:w-auto">
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 2 }} className="flex flex-col md:block items-center md:items-start">
              <li><Link href="/missions" style={navLinkStyle}>Missions</Link></li>
              <li><Link href="/guild" style={navLinkStyle}>Guild</Link></li>
              <li><Link href="/wall-of-fame" style={navLinkStyle}>Wall of Fame</Link></li>
              <li><Link href="/blog" style={navLinkStyle}>Blogs</Link></li>
              <li><Link href="/faq" style={navLinkStyle}>Help</Link></li>
            </ul>
          </nav>
          {/* Contact & Social */}
          <div style={{ minWidth: 200 }} className="w-full md:w-auto flex flex-col items-center md:items-start">
            <div style={{ marginBottom: 16 }}>
              <a href="mailto:bravoo.guild@gmail.com" style={linkBold}>bravoo.guild@gmail.com</a>
            </div>
            <div className="flex justify-center md:justify-start gap-5 ">
              <a aria-label="LinkedIn" href="#" style={iconStyle}>LinkedIn</a>
              <a aria-label="GitHub" href="#" style={iconStyle}>GitHub</a>
              <a aria-label="Discord" href="#" style={iconStyle}>Discord</a>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer"
              }}
              onMouseEnter={playAudio}
              onMouseLeave={stopAudio}
              className=""
            >
              <video
                src="/GIF/RATT-unscreen.webm"
                style={{
                  height: "200px",
                  width: "350px"
                }}
                className="m-auto"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.88rem",
          borderTop: "1px solid #e5e7eb",
          marginTop: 32,
          paddingTop: 18,
          gap: 16
        }} className="flex-col md:flex-row items-center md:items-center justify-center md:justify-between text-center md:text-left">
          <div>
            <span style={{ display: "flex", alignItems: "center", gap: "2px", justifyContent: "center" }} className="md:justify-start">
              © 2025 Brav<BravoO size={14} />o — Built by Player 1
            </span>
          </div>
          <div style={{ color: "#2563eb", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "center" }} className="md:justify-start">
            <span>🎮 Level 21 Founder</span>
            <span style={{ margin: "0 12px" }}>•</span>
            <span>📍 India</span>
            <span style={{ margin: "0 12px" }}>•</span>
            <span>{randomStatus}</span>

          </div>
          <div>
            <Link href="/privacy" style={linkStyle}>Privacy</Link>
            <span> / </span>
            <Link href="/terms" style={linkStyle}>Terms</Link>
          </div>
        </div>
      </div>

      {/* Audio */}
      <audio ref={audioRef} src="/voices/rattalk.mp3" preload="auto" />

    </footer>
  );
};

export default Footer;
