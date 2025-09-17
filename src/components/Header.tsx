import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 ${
          isScrolled ? "header-scrolled" : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-foreground">
              Bravoo
            </div>
            <div className="text-lg">⚔️</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/missions"
              className={`nav-link ${location.pathname === '/missions' ? 'text-primary' : ''}`}
            >
              Missions
            </Link>
            <Link 
              to="/player-1"
              className={`nav-link ${location.pathname === '/player-1' ? 'text-primary' : ''}`}
            >
              Player 1
            </Link>
            <Link 
              to="/guild"
              className={`nav-link ${location.pathname === '/guild' ? 'text-primary' : ''}`}
            >
              Guild
            </Link>
            <Link 
              to="/boss-fights"
              className={`nav-link ${location.pathname === '/boss-fights' ? 'text-primary' : ''}`}
            >
              Boss Fights
            </Link>
            <Link 
              to="/start-quest"
            >
              <Button className="btn-primary h-8 px-4 text-sm">
                Start Quest
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1 w-6 h-6 justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div 
              className={`h-0.5 w-5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
              }`}
            />
            <div 
              className={`h-0.5 w-5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <div 
              className={`h-0.5 w-5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-20 left-0 right-0 bg-background border-b border-border p-6 animate-slide-in-up">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/missions"
                onClick={closeMobileMenu}
                className="text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Missions
              </Link>
              <Link 
                to="/player-1"
                onClick={closeMobileMenu}
                className="text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Player 1
              </Link>
              <Link 
                to="/guild"
                onClick={closeMobileMenu}
                className="text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Guild
              </Link>
              <Link 
                to="/boss-fights"
                onClick={closeMobileMenu}
                className="text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Boss Fights
              </Link>
              <Link 
                to="/start-quest"
                onClick={closeMobileMenu}
              >
                <Button className="btn-primary w-full mt-4">
                  Start Quest
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;