
import React, { useState } from "react";
import Header from "@/components/Header";
import "../App.css";

// Sample client grid data
const clients = [
  // Row 1
  { type: "logo", name: "FinTech Startup", image: "/clients/fintech.png", tooltip: "FinTech Startup - 2024", year: "2024" },
  { type: "icon", name: "E-commerce", icon: "🛒", tooltip: "E-commerce Platform", year: "2025" },
  { type: "industry", name: "HT", gradient: "from-blue-100 to-blue-300", tooltip: "HealthTech", year: "2023" },
  { type: "logo", name: "Mobile App", image: "/clients/mobile.png", tooltip: "Mobile App - Series A", year: "2025" },
  { type: "icon", name: "SaaS", icon: "⚡", tooltip: "SaaS Product", year: "2024" },
  { type: "icon", name: "AI", icon: "🤖", tooltip: "AI Project", year: "2025" },
  // Row 2
  { type: "industry", name: "ED", gradient: "from-green-100 to-green-300", tooltip: "EdTech", year: "2023" },
  { type: "industry", name: "Healthcare", gradient: "from-pink-100 to-pink-300", tooltip: "Healthcare SaaS", year: "2024" },
  { type: "icon", name: "ML", icon: "🤖", tooltip: "ML Project", year: "2025" },
  { type: "logo", name: "Startup", image: "/clients/startup.png", tooltip: "Startup Logo", year: "2024" },
  { type: "industry", name: "RE", gradient: "from-yellow-100 to-yellow-300", tooltip: "Real Estate", year: "2023" },
  { type: "industry", name: "Construction", gradient: "from-gray-100 to-gray-300", tooltip: "Construction", year: "2025" },
  // Row 3
  { type: "industry", name: "Agency", gradient: "from-purple-100 to-purple-300", tooltip: "Agency", year: "2024" },
  { type: "icon", name: "Banking", icon: "🏦", tooltip: "Banking", year: "2023" },
  { type: "industry", name: "Travel", gradient: "from-blue-100 to-blue-300", tooltip: "Travel", year: "2025" },
  { type: "icon", name: "B2B", icon: "💼", tooltip: "B2B Project", year: "2024" },
  { type: "industry", name: "Food", gradient: "from-red-100 to-red-300", tooltip: "Food Delivery", year: "2023" },
  { type: "industry", name: "Entertainment", gradient: "from-yellow-100 to-yellow-300", tooltip: "Entertainment", year: "2025" },
  // Row 4
  { type: "industry", name: "Nonprofit", gradient: "from-green-100 to-green-300", tooltip: "Nonprofit", year: "2024" },
  { type: "industry", name: "Government", gradient: "from-gray-100 to-gray-300", tooltip: "Government", year: "2023" },
  { type: "industry", name: "Sports", gradient: "from-blue-100 to-blue-300", tooltip: "Sports", year: "2025" },
  { type: "industry", name: "Fashion", gradient: "from-pink-100 to-pink-300", tooltip: "Fashion", year: "2024" },
  { type: "industry", name: "Green", gradient: "from-green-100 to-green-300", tooltip: "Green Tech", year: "2023" },
  { type: "industry", name: "Logistics", gradient: "from-yellow-100 to-yellow-300", tooltip: "Logistics", year: "2025" },
];

const stats = [
  { label: "Projects Delivered", value: "24+" },
  { label: "Industries Served", value: "12" },
  { label: "Repeat Client Rate", value: "89%" },
];

const modalContent = {
  title: "E-commerce Platform",
  meta: "FinTech • Q2 2024 • 16 weeks",
  challenge: "Startup needed MVP for payment processing platform.",
  solution: "Built React frontend + Node.js backend with Stripe integration.",
  impact: "Launched to 1,000+ beta users, secured Series A funding.",
};

export default function WallOfFame() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Staggered animation delay
  const getDelay = idx => `${0.1 + idx * 0.05}s`;

  const handleClientClick = client => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  return (
    <>
      <Header />
      <section id="wall-of-fame" className="py-16 px-4 flex flex-col items-center">
      {/* Header */}
      <h2
        className="font-inter font-semibold"
        style={{
          fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
          color: "#1f2937",
          marginBottom: 16,
        }}
      >
        Clients Who Trusted the Quest
      </h2>
      <p
        className="font-inter text-gray-500 text-lg text-center"
        style={{ maxWidth: 600, lineHeight: 1.6, marginBottom: 48 }}
      >
        Every project teaches us something new. Here are the teams we've had the honor to work with.
      </p>

      {/* Stats Bar */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {stats.map(stat => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="font-inter font-medium text-blue-600 text-lg">{stat.value}</span>
            <span className="font-inter text-gray-500 text-sm">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Client Grid */}
      <div
        className="fame-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
          gap: 24,
          maxWidth: 800,
          margin: "0 auto 48px",
        }}
      >
        {clients.map((client, idx) => (
          <button
            key={idx}
            className="fame-client"
            style={{
              opacity: 0,
              animation: `fadeInUp 0.6s ease forwards`,
              animationDelay: getDelay(idx),
              background: "none",
              border: "none",
              cursor: "pointer",
              outline: "none",
              padding: 0,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textDecoration: "none",
              transition: "transform 0.3s ease, filter 0.3s ease",
            }}
            onClick={() => handleClientClick(client)}
            tabIndex={0}
            aria-label={client.tooltip}
          >
            {/* Avatar */}
            <span
              className="fame-avatar"
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                border: "2px solid #f3f4f6",
                background: client.type === "industry" ? `linear-gradient(135deg, var(--tw-gradient-stops, #f3f4f6, #e5e7eb))` : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                overflow: "hidden",
                transition: "all 0.3s ease",
                fontSize: client.type === "icon" ? "2rem" : "1rem",
                position: "relative",
              }}
            >
              {client.type === "logo" && (
                <img
                  src={client.image}
                  alt={client.name}
                  style={{ width: 60, height: 40, objectFit: "contain" }}
                />
              )}
              {client.type === "icon" && (
                <span>{client.icon}</span>
              )}
              {client.type === "industry" && (
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "1.25rem",
                    color: "#2563eb",
                  }}
                >
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
            className="fame-modal-content"
            style={{
              background: "#fff",
              borderRadius: 16,
              maxWidth: 500,
              maxHeight: "80vh",
              overflowY: "auto",
              padding: 32,
              margin: 20,
              transform: "translateY(0)",
              transition: "transform 0.3s ease",
              position: "relative",
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header mb-4">
              <h3 className="font-inter font-semibold text-xl mb-1">{selectedClient?.name || modalContent.title}</h3>
              <p className="project-meta text-gray-500 text-sm mb-2">{modalContent.meta}</p>
            </div>
            <div className="modal-body mb-4">
              <p><strong>Challenge:</strong> {modalContent.challenge}</p>
              <p><strong>Solution:</strong> {modalContent.solution}</p>
              <p><strong>Impact:</strong> {modalContent.impact}</p>
            </div>
            <div className="modal-footer flex flex-col items-center">
              <p className="confidential text-xs text-gray-400 mb-2">*Some details changed to protect client confidentiality</p>
              <button
                className="btn-close bg-blue-600 text-white px-4 py-2 rounded font-inter"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA Footer */}
      <div className="mt-8 flex flex-col items-center">
        <p className="font-inter text-lg mb-4">Ready to join the Wall of Fame?</p>
        <a
          href="/start-quest"
          className="bg-blue-600 text-white font-inter px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        >
          Start Your Quest
        </a>
      </div>

  {/* Keyframes for fadeInUp animation */}
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
          border-color: #2563eb;
          box-shadow: 0 8px 24px rgba(37,99,235,0.15);
        }
        .fame-client:hover .fame-tooltip {
          opacity: 1;
        }
        .fame-tooltip::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-bottom-color: #1f2937;
        }
      `}</style>
      </section>
    </>
  );
}
