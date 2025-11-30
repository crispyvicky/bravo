import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import StickerPeel from "@/components/stickerpeel";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Helper for active nav link
  const navLinkClass = (path: string) =>
    `nav-link transition-colors ${
      router.pathname === path ? "text-primary" : "text-foreground hover:text-primary"
    }`;

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] h-20 transition-all duration-300 ${
          isScrolled ? "header-scrolled" : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <StickerPeel
              imageSrc="/logo/brlogo.png"
              width={120}
              rotate={0}
              peelBackHoverPct={15}
              peelBackActivePct={35}
              shadowIntensity={0.6}
              lightingIntensity={0.08}
              initialPosition={{ x: 0, y: 0 }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/missions" className={navLinkClass("/missions")}>
              Missions
            </Link>
            <Link href="/player-1" className={navLinkClass("/player-1")}>
              Player 1
            </Link>
            <Link href="/guild" className={navLinkClass("/guild")}>
              Guild
            </Link>
            <Link href="/boss-fights" className={navLinkClass("/boss-fights")}>
              Boss Fights
            </Link>
            <Link href="/wall-of-fame" className="nav-link ">
              Wall of Fame
            </Link>

            {/* Start Quest Button */}
            <Link href="/start-quest" className="ml-4">
              <Button className="btn-primary h-8 px-4 text-sm">
                Start Quest
              </Button>
            </Link>
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
        <div className="fixed inset-0 z-[9998] md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          {/* Menu */}
          <div className="absolute top-20 left-0 right-0 bg-background border-b border-border p-6 animate-slide-in-up max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              <Link href="/missions" onClick={closeMobileMenu} className="nav-link">
                Missions
              </Link>
              <Link href="/player-1" onClick={closeMobileMenu} className="nav-link">
                Player 1
              </Link>
              <Link href="/guild" onClick={closeMobileMenu} className="nav-link">
                Guild
              </Link>
              <Link href="/boss-fights" onClick={closeMobileMenu} className="nav-link">
                Boss Fights
              </Link>
              <Link href="/wall-of-fame" onClick={closeMobileMenu} className="nav-link">
                Wall of Fame
              </Link>

              {/* Start Quest Button in Mobile */}
              <div className="mt-4">
                <Link href="/start-quest" onClick={closeMobileMenu}>
                  <Button className="btn-primary w-full">Start Quest</Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
