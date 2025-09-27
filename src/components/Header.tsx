import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Play / stop audio
  const playAudio = () => {
    audioRef.current?.play().catch(() => {});
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Close mobile menu
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Helper for active nav link
  const navLinkClass = (path: string) =>
    `nav-link transition-colors ${
      location.pathname === path ? "text-primary" : "text-foreground hover:text-primary"
    }`;

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
          isScrolled ? "header-scrolled" : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo/brlogo.png"
              alt="Bravoo Logo"
              className="w-28 h-28"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/missions" className={navLinkClass("/missions")}>
              Missions
            </Link>
            <Link to="/player-1" className={navLinkClass("/player-1")}>
              Player 1
            </Link>
            <Link to="/guild" className={navLinkClass("/guild")}>
              Guild
            </Link>
            <Link to="/boss-fights" className={navLinkClass("/boss-fights")}>
              Boss Fights
            </Link>
            <Link to="/wall-of-fame" className="nav-link ">
              Wall of Fame
            </Link>

            {/* RATT + Button */}
            <div
              className="flex items-center space-x-2"
              onMouseEnter={playAudio}
              onMouseLeave={stopAudio}
            >
              <img
                src="/GIF/RATT-unscreen.gif"
                alt="RATT GIF"
                className="h-20 w-20 cursor-pointer"
              />
              <Link to="/start-quest">
                <Button className="btn-primary h-8 px-4 text-sm">
                  Start Quest
                </Button>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col space-y-1 w-6 h-6 justify-center"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            <span
              className={`h-0.5 w-5 bg-foreground transition-transform duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-foreground transition-opacity duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 bg-foreground transition-transform duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          {/* Menu */}
          <div className="absolute top-20 left-0 right-0 bg-background border-b border-border p-6 animate-slide-in-up">
            <nav className="flex flex-col space-y-4">
              <Link to="/missions" onClick={closeMobileMenu} className="nav-link">
                Missions
              </Link>
              <Link to="/player-1" onClick={closeMobileMenu} className="nav-link">
                Player 1
              </Link>
              <Link to="/guild" onClick={closeMobileMenu} className="nav-link">
                Guild
              </Link>
              <Link to="/boss-fights" onClick={closeMobileMenu} className="nav-link">
                Boss Fights
              </Link>

              {/* RATT + Button in Mobile */}
              <div className="flex items-center space-x-2 mt-4">
                <img
                  src="/GIF/RATT-unscreen.gif"
                  alt="RATT GIF"
                  className="h-16 w-16 cursor-pointer"
                  onMouseEnter={playAudio}
                  onMouseLeave={stopAudio}
                />
                <Link to="/start-quest" onClick={closeMobileMenu}>
                  <Button className="btn-primary w-full">Start Quest</Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Audio */}
      <audio ref={audioRef} src="/voices/rattalk.mp3" preload="auto" />
    </>
  );
};

export default Header;
