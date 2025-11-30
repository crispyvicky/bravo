import React, { useState } from "react";
import Head from 'next/head';
import Link from 'next/link';
 import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import Ribbons from '@/components/ribbons';
import { clients, stats, type WallClientTile } from "@/data/wallOfFame";

export default function WallOfFame() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<WallClientTile | null>(null);

  // Staggered animation delay
  const getDelay = (idx: number) => `${0.1 + idx * 0.05}s`;

  const handleClientClick = (client: WallClientTile) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  return (
    <>
      <Head>
        <title>Wall of Fame - Client Success Stories | Bravoo</title>
        <meta name="description" content="See our client success stories and completed projects. 24+ projects delivered across 12 industries with 89% repeat client rate." />
        <meta name="keywords" content="client testimonials, success stories, completed projects, portfolio, client work" />
        <link rel="canonical" href="https://bravoo.in/wall-of-fame" />
        <meta property="og:title" content="Wall of Fame - Client Success Stories" />
        <meta property="og:description" content="See our client success stories and completed projects across various industries." />
        <meta property="og:url" content="https://bravoo.in/wall-of-fame" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wall of Fame - Client Success Stories" />
        <meta name="twitter:description" content="See our client success stories and completed projects across various industries." />
      </Head>

      <div className="relative min-h-screen bg-background">
        {/* <Ribbons /> */}
        <Header />
        <section id="wall-of-fame" className="pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 md:px-6 lg:px-8 flex flex-col items-center">
          {/* Header */}
          <h2 className="text-2xl sm:text-3xl md:text-section font-semibold text-foreground mb-3 sm:mb-4 text-center px-4">
            Clients Who Trusted the Quest
          </h2>
          <p className="text-sm sm:text-base md:text-body text-muted-foreground text-center max-w-2xl mb-6 sm:mb-8 md:mb-12 px-4">
            Every project teaches us something new. Here are the teams we've had the honor to work with.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12 w-full max-w-md px-4">
            {stats.map(stat => (
              <div key={stat.label} className="flex flex-col items-center text-center">
                <span className="font-semibold text-primary text-base sm:text-lg md:text-xl">{stat.value}</span>
                <span className="text-muted-foreground text-xs md:text-sm">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Client Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12 px-4">
            {clients.map((client, idx) => (
              <button
                key={idx}
                className="fame-client group transition-all duration-300 hover:scale-105"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease forwards`,
                  animationDelay: getDelay(idx)
                }}
                onClick={() => handleClientClick(client)}
                tabIndex={0}
                aria-label={client.tooltip}
              >
                {/* Avatar */}
                <span
                  className="fame-avatar w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-24 xl:h-24 rounded-full border-2 border-border bg-background flex items-center justify-center shadow-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-md"
                  style={{
                    fontSize: client.type === "icon" ? "clamp(1rem, 2.5vw, 2rem)" : "clamp(0.65rem, 1.5vw, 1rem)",
                  }}
                >
                  {client.type === "logo" && (
                    <img
                      src={client.image}
                      alt={client.name}
                      className="w-8 h-6 sm:w-12 sm:h-9 md:w-16 md:h-12 lg:w-22 lg:h-18 xl:w-20 xl:h-15 object-contain"
                    />
                  )}
                  {client.type === "icon" && (
                    <span>{client.icon}</span>
                  )}
                  {client.type === "industry" && (
                    <span className="font-semibold text-primary">
                      {client.name}
                    </span>
                  )}
                </span>
                {/* Tooltip */}
                <span
                  className="fame-tooltip"
                  style={{
                    position: "absolute",
                    bottom: -40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#1f2937",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: 8,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    whiteSpace: "nowrap",
                    opacity: 0,
                    pointerEvents: "none",
                    transition: "opacity 0.3s ease",
                    zIndex: 10,
                  }}
                >
                  {client.tooltip}
                </span>
              </button>
            ))}
          </div>

          {/* Modal */}
          {modalOpen && (
            <div
              className="fame-modal active"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                opacity: 1,
                visibility: "visible",
                transition: "all 0.3s ease",
              }}
              onClick={() => setModalOpen(false)}
            >
              <div
                className="bg-background rounded-2xl max-w-md md:max-w-lg lg:max-w-xl max-h-[85vh] overflow-y-auto p-6 md:p-8 m-4 md:m-8 relative"
                style={{
                  transform: "translateY(0)",
                  transition: "transform 0.3s ease",
                }}
                onClick={e => e.stopPropagation()}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{selectedClient?.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{selectedClient?.meta}</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <strong className="text-foreground">Challenge:</strong> 
                    <p className="text-muted-foreground mt-1">{selectedClient?.challenge}</p>
                  </div>
                  <div>
                    <strong className="text-foreground">Solution:</strong> 
                    <p className="text-muted-foreground mt-1">{selectedClient?.solution}</p>
                  </div>
                  <div>
                    <strong className="text-foreground">Impact:</strong> 
                    <p className="text-muted-foreground mt-1">{selectedClient?.impact}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <p className="text-xs text-muted-foreground text-center">*Some details changed to protect client confidentiality</p>
                  <div className="flex items-center gap-3">
                    {selectedClient?.visitUrl && (
                      <button
                        className="btn-secondary px-6 py-3 text-sm md:text-base"
                        onClick={() => window.open(selectedClient.visitUrl!, '_blank', 'noopener,noreferrer')}
                      >
                        Visit
                      </button>
                    )}
                    <button
                      className="btn-primary px-6 py-3 text-sm md:text-base"
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA Footer */}
          <div className="mt-8 md:mt-12 flex flex-col items-center text-center space-y-4">
            <p className="text-lg md:text-xl text-foreground">Ready to join the Wall of Fame?</p>
            <Link
              href="/start-quest"
              className="btn-hero px-8 py-4 text-base md:text-lg"
            >
              Start Your Quest
            </Link>
          </div>

        {/* Responsive animations and hover effects */}
        <style>{`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              .fame-client:hover .fame-avatar {
                transform: translateY(-4px) scale(1.05);
                border-color: hsl(var(--primary));
                box-shadow: 0 8px 24px hsl(var(--primary) / 0.15);
              }
              .fame-client:hover .fame-tooltip {
                opacity: 1;
              }
              @media (hover: none) {
                .fame-tooltip {
                  display: none;
                }
              }
              @media (max-width: 640px) {
                .fame-tooltip {
                  font-size: 0.75rem;
                  padding: 6px 10px;
                }
              }
              .fame-tooltip::before {
                content: '';
                position: absolute;
                top: -4px;
                left: 50%;
                transform: translateX(-50%);
                border: 4px solid transparent;
                border-bottom-color: hsl(var(--foreground));
              }
            `}</style>
        </section>
        <Footer />
      </div>
    </>
  );
}
