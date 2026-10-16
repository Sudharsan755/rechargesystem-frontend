"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const quickOperators = [
    { name: "Airtel", logo: "/airtel.png", color: "#ef4444" },
    { name: "Jio", logo: "/jio.png", color: "#0284c7" },
    { name: "Vi", logo: "/vi.png", color: "#d97706" },
    { name: "BSNL", logo: "/bsnl.png", color: "#059669" },
  ];

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto" }}>
      {/* OPERATOR SELECTION SECTION */}
      <div style={{ textAlign: "center", padding: "36px 0 32px" }}>
        <span className="hero-tag">
          FAST • RELIABLE • SECURE
        </span>

        <h1
          style={{
            fontSize: "32px",
            fontWeight: "900",
            letterSpacing: "-0.04em",
            color: "var(--text-main)",
            margin: "18px 0 12px",
            lineHeight: "1.2",
          }}
        >
          Select Your Telecom Operator
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "var(--text-muted)",
            maxWidth: "580px",
            margin: "0 auto 28px",
            lineHeight: "1.6",
          }}
        >
          Choose your mobile operator to explore prepaid recharge
          plans, data packs, talktime and validity offers.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          {quickOperators.map((op) => (
            <div
              key={op.name}
              role="link"
              tabIndex={0}
              aria-label={`Explore ${op.name} recharge plans`}
              onClick={() => router.push(`/plans/${op.name}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(`/plans/${op.name}`);
                }
              }}
              style={{
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 16px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "var(--shadow-card)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = op.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "var(--radius-md)",
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  marginBottom: "14px",
                }}
              >
                <img
                  src={op.logo}
                  alt={`${op.name} logo`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div
                style={{
                  fontWeight: "800",
                  fontSize: "17px",
                  color: "var(--text-main)",
                  marginBottom: "6px",
                }}
              >
                {op.name}
              </div>

              <span
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                }}
              >
                Explore Plans →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}