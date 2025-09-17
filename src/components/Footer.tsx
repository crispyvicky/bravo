const Footer = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="text-2xl font-bold mb-2">Bravoo</div>
            <div className="text-muted-foreground/80">Build → Deploy → Win</div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-6">
            <button 
              onClick={() => scrollToSection("solution")}
              className="hover:text-primary transition-colors duration-200"
            >
              Why Bravoo
            </button>
            <button 
              onClick={() => scrollToSection("process")}
              className="hover:text-primary transition-colors duration-200"
            >
              Process
            </button>
            <button 
              onClick={() => scrollToSection("services")}
              className="hover:text-primary transition-colors duration-200"
            >
              Quests
            </button>
            <button 
              onClick={() => scrollToSection("team")}
              className="hover:text-primary transition-colors duration-200"
            >
              Squad
            </button>
            <a 
              href="/wall-of-fame" 
              className="hover:text-blue-600 transition-colors duration-200 font-inter underline"
            >
              See All Wins
            </a>
          </nav>
        </div>

        {/* Copyright */}
        <div className="border-t border-background/10 pt-6 text-center">
          <p className="text-sm opacity-70">
            © 2025 Bravoo. All wins reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;