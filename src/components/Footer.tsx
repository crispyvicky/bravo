
const statusMessages = [
  "🟢 Available for Epic Quests",
  "⚡ Brewing Coffee & Code",
  "🎯 Locked In Focus Mode"
];
const randomStatus = statusMessages[Math.floor(Math.random() * statusMessages.length)];

if (typeof window !== "undefined") {
  // Easter egg for devs
  console.log("Hey fellow developer! Wanna join the guild? Email: dev@bravoo.in");
}

const Footer = () => {
  return (
  <footer className="footer w-full" style={{ background: '#fff', color: '#1f2937', padding: '64px 0 32px', marginTop: 64, opacity: 0, animation: 'fadeInUp 0.8s ease forwards' }}>
  <div className="footer-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
  <div className="footer-main" style={{ display: 'grid', gap: 32, marginBottom: 48 }}>
          {/* Brand Zone */}
          <div className="footer-brand" style={{ gridArea: 'brand', maxWidth: 400 }}>
            <h3 className="footer-logo font-inter font-bold mb-2" style={{ fontSize: '1.75rem', color: '#1f2937' }}>Bravoo ⚔️</h3>
            <p className="footer-tagline font-inter font-medium mb-2" style={{ fontSize: '1.125rem', color: '#2563eb', letterSpacing: 0.5 }}>Build → Deploy → Win</p>
            <p className="footer-mission font-inter mb-6" style={{ color: '#374151', fontSize: '1rem', lineHeight: 1.6, maxWidth: 280 }}>From Level 1 startups to Boss Fight enterprises. Every quest deserves a legendary outcome.</p>
            <div className="footer-cta mt-2">
              <p className="cta-text font-inter font-medium mb-3" style={{ color: '#2563eb', fontSize: '0.875rem' }}>Got an epic quest in mind?</p>
              <a href="/start-quest" className="btn-footer font-inter font-medium" style={{ background: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s ease' }}>Start Your Adventure</a>
            </div>
          </div>

          {/* Navigation Zone */}
          <div className="footer-nav" style={{ gridArea: 'nav', maxWidth: 400 }}>
            <h4 className="footer-nav-title font-inter font-semibold mb-4" style={{ fontSize: '1rem', color: '#1f2937' }}>Your Quest Map</h4>
            <ul className="footer-nav-list mb-6">
              <li><a href="/missions" className="footer-nav-link">🎯 Missions</a></li>
              <li><a href="/player-1" className="footer-nav-link">👤 Player 1</a></li>
              <li><a href="/guild" className="footer-nav-link">⚔️ Guild</a></li>
              <li><a href="/boss-fights" className="footer-nav-link">👑 Boss Fights</a></li>
              <li><a href="/wall-of-fame" className="footer-nav-link">🏆 Wall of Fame</a></li>
            </ul>
            <div className="footer-resources">
              <h4 className="footer-nav-title font-inter font-semibold mb-4" style={{ fontSize: '1rem', color: '#1f2937' }}>Game Guides</h4>
              <ul className="footer-nav-list">
                <li><a href="/process" className="footer-nav-link">📋 How We Work</a></li>
                <li><a href="/pricing" className="footer-nav-link">💰 Quest Pricing</a></li>
                <li><a href="/blog" className="footer-nav-link">📚 Battle Stories</a></li>
                <li><a href="/tools" className="footer-nav-link">🛠️ Dev Arsenal</a></li>
                <li><a href="/faq" className="footer-nav-link">❓ Quest Help</a></li>
              </ul>
            </div>
          </div>

          {/* Connect Zone */}
          <div className="footer-connect" style={{ gridArea: 'connect', maxWidth: 400 }}>
            <h4 className="footer-nav-title font-inter font-semibold mb-4" style={{ fontSize: '1rem', color: '#1f2937' }}>Direct Line to HQ</h4>
            <div className="contact-item flex items-start gap-3 mb-4">
              <span className="contact-icon" style={{ fontSize: '1.25rem' }}>📧</span>
              <div className="contact-info">
                <p className="contact-label font-inter font-medium mb-1" style={{ fontSize: '0.75rem', color: '#2563eb', textTransform: 'uppercase', letterSpacing: 0.5 }}>Quest Requests</p>
                <a href="mailto:hello@bravoo.in" className="contact-link font-inter" style={{ fontSize: '0.875rem', color: '#1f2937', textDecoration: 'none', transition: 'color 0.2s ease' }}>hello@bravoo.in</a>
              </div>
            </div>
            <div className="contact-item flex items-start gap-3 mb-4">
              <span className="contact-icon" style={{ fontSize: '1.25rem' }}>💬</span>
              <div className="contact-info">
                <p className="contact-label font-inter font-medium mb-1" style={{ fontSize: '0.75rem', color: '#2563eb', textTransform: 'uppercase', letterSpacing: 0.5 }}>Instant Chat</p>
                <a href="https://wa.me/yournum" className="contact-link font-inter" style={{ fontSize: '0.875rem', color: '#1f2937', textDecoration: 'none', transition: 'color 0.2s ease' }}>WhatsApp Direct</a>
              </div>
            </div>
            <div className="contact-item flex items-start gap-3 mb-4">
              <span className="contact-icon" style={{ fontSize: '1.25rem' }}>🗓️</span>
              <div className="contact-info">
                <p className="contact-label font-inter font-medium mb-1" style={{ fontSize: '0.75rem', color: '#2563eb', textTransform: 'uppercase', letterSpacing: 0.5 }}>Strategy Call</p>
                <a href="/calendar" className="contact-link font-inter" style={{ fontSize: '0.875rem', color: '#1f2937', textDecoration: 'none', transition: 'color 0.2s ease' }}>Book 30-min slot</a>
              </div>
            </div>
            <div className="footer-social mt-6">
              <h4 className="footer-nav-title font-inter font-semibold mb-4" style={{ fontSize: '1rem', color: '#1f2937' }}>Join the Guild</h4>
              <div className="social-links flex flex-col gap-3">
                <a href="#" className="social-link flex items-center gap-2" title="LinkedIn" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '0.875rem', transition: 'all 0.2s ease' }}>
                  <svg className="social-icon" style={{ width: 16, height: 16, fill: 'currentColor' }} viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" /></svg>
                  <span>LinkedIn</span>
                </a>
                <a href="#" className="social-link flex items-center gap-2" title="Twitter" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '0.875rem', transition: 'all 0.2s ease' }}>
                  <svg className="social-icon" style={{ width: 16, height: 16, fill: 'currentColor' }} viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" /></svg>
                  <span>Twitter</span>
                </a>
                <a href="#" className="social-link flex items-center gap-2" title="GitHub" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '0.875rem', transition: 'all 0.2s ease' }}>
                  <svg className="social-icon" style={{ width: 16, height: 16, fill: 'currentColor' }} viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" /></svg>
                  <span>GitHub</span>
                </a>
                <a href="#" className="social-link flex items-center gap-2" title="Discord" style={{ color: '#1f2937', textDecoration: 'none', fontSize: '0.875rem', transition: 'all 0.2s ease' }}>
                  <svg className="social-icon" style={{ width: 16, height: 16, fill: 'currentColor' }} viewBox="0 0 16 16"><circle cx="8" cy="8" r="8" /></svg>
                  <span>Discord</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
  <div className="footer-bottom border-t border-gray-200 pt-8 mt-12">
          <div className="footer-bottom-content flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="copyright font-inter text-sm" style={{ color: '#1f2937' }}>
              <p>© 2025 Bravoo — Built with ❤️ by Player 1</p>
            </div>
            <div className="footer-meta flex items-center gap-2" style={{ color: '#374151', fontSize: '0.75rem' }}>
              <span className="game-stats">🎮 Level 21 Founder</span>
              <span className="separator">•</span>
              <span className="location">📍 India</span>
              <span className="separator">•</span>
              <span className="status">{randomStatus}</span>
            </div>
            <div className="legal-links flex gap-6">
              <a href="/privacy" className="font-inter text-xs" style={{ color: '#1f2937', textDecoration: 'none', transition: 'color 0.2s ease' }}>Privacy</a>
              <a href="/terms" className="font-inter text-xs" style={{ color: '#1f2937', textDecoration: 'none', transition: 'color 0.2s ease' }}>Terms</a>
              <a href="/cookies" className="font-inter text-xs" style={{ color: '#1f2937', textDecoration: 'none', transition: 'color 0.2s ease' }}>Cookies</a>
            </div>
          </div>
        </div>

        {/* Footer Animation Keyframes & Grid CSS */}
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .footer-main {
            display: grid;
            gap: 32px;
            margin-bottom: 48px;
          }
          @media (min-width: 1024px) {
            .footer-main {
              grid-template-columns: 1fr 1fr 1fr;
              grid-template-areas: "brand nav connect";
            }
          }
          @media (min-width: 768px) and (max-width: 1023px) {
            .footer-main {
              grid-template-columns: 1fr 1fr;
              grid-template-areas: "brand connect" "nav nav";
            }
          }
          @media (max-width: 767px) {
            .footer-main {
              grid-template-columns: 1fr;
              grid-template-areas: "brand" "connect" "nav";
              text-align: center;
              gap: 40px;
            }
          }
          .footer-brand { grid-area: brand; }
          .footer-nav { grid-area: nav; }
          .footer-connect { grid-area: connect; }
          .footer-nav-list { list-style: none; padding: 0; margin: 0; }
          .footer-nav-list li { margin-bottom: 12px; }
          .footer-nav-link { font-family: Inter, sans-serif; font-size: 0.875rem; color: #1f2937; text-decoration: none; transition: color 0.2s ease; }
          .footer-nav-link:hover { color: #2563eb; }
          .contact-link:hover { color: #2563eb; }
          .social-link { color: #1f2937; }
          .social-link:hover { color: #2563eb; transform: translateX(4px); }
          .legal-links a { color: #1f2937; }
          .legal-links a:hover { color: #2563eb; }
        `}</style>
      </div>
    </footer>
  );
};

export default Footer;