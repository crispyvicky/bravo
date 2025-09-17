import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const openConsultationModal = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-foreground">
              Bravoo
            </div>
            <div className="text-sm text-muted-foreground">
              bravoo.in
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("solution")}
              className="nav-link"
            >
              Why Bravoo
            </button>
            <button 
              onClick={() => scrollToSection("process")}
              className="nav-link"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="nav-link"
            >
              Quests
            </button>
            <button 
              onClick={() => scrollToSection("team")}
              className="nav-link"
            >
              Squad
            </button>
            <Button 
              onClick={openConsultationModal}
              className="btn-primary h-8 px-4 text-sm"
            >
              Start Project
            </Button>
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
              <button 
                onClick={() => scrollToSection("solution")}
                className="text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Why Bravoo
              </button>
              <button 
                onClick={() => scrollToSection("process")}
                className="text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Process
              </button>
              <button 
                onClick={() => scrollToSection("services")}
                className="text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Quests
              </button>
              <button 
                onClick={() => scrollToSection("team")}
                className="text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Squad
              </button>
              <Button 
                onClick={openConsultationModal}
                className="btn-primary w-full mt-4"
              >
                Start Project
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;