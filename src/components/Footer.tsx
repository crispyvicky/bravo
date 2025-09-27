import React from "react";
import FlowerPath from "./FlowerPath";

// Random status for personality but condensed
const statusMessages = [
  "🟢 Available for Quests",
  "⚡ Coffee & Code",
  "🎯 Focused Mode"
];
const randomStatus = statusMessages[Math.floor(Math.random() * statusMessages.length)];

const Footer = () => (
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
      }}>
        {/* Brand */}
        <div style={{ minWidth: 240 }}>
          <h3 style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: 6 }}>Bravoo ⚔️</h3>
          <p style={{ color: "#2563eb", fontWeight: 500, marginBottom: 8, fontSize: "1rem" }}>Build → Deploy → Win</p>
          <p style={{ color: "#374151", fontSize: "0.95rem", maxWidth: 230 }}>From startup to enterprise, every quest deserves a legendary outcome.</p>
        </div>
        {/* Navigation */}
        <nav aria-label="Footer" style={{ flex: 1, minWidth: 180 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: 2 }}>
            <li><a href="/missions" style={navLinkStyle}>Missions</a></li>
            <li><a href="/guild" style={navLinkStyle}>Guild</a></li>
            <li><a href="/wall-of-fame" style={navLinkStyle}>Wall of Fame</a></li>
            <li><a href="/blog" style={navLinkStyle}>Blogs</a></li>
            <li><a href="/faq" style={navLinkStyle}>Help</a></li>
          </ul>
        </nav>
        {/* Contact & Social */}
        <div style={{ minWidth: 200 }}>
          <div style={{ marginBottom: 16 }}>
            <a href="mailto:hello@bravoo.in" style={linkBold}>hello@bravoo.in</a>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a aria-label="LinkedIn" href="#" style={iconStyle}>LinkedIn</a>
            <a aria-label="GitHub" href="#" style={iconStyle}>GitHub</a>
            <a aria-label="Discord" href="#" style={iconStyle}>Discord</a>
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
      }}>
        <div>
          <span>© 2025 Bravoo — Built by Player 1</span>
        </div>
        <div style={{ color: "#2563eb" }}>
          <span>🎮 Level 21 Founder</span>
          <span style={{ margin: "0 12px" }}>•</span>
          <span>📍 India</span>
          <span style={{ margin: "0 12px" }}>•</span>
          <span>{randomStatus}</span>
        </div>
        <div>
          <a href="/privacy" style={linkStyle}>Privacy</a>
          <span> / </span>
          <a href="/terms" style={linkStyle}>Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

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

export default Footer;
