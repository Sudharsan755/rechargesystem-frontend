"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleGuest = () => {
    localStorage.removeItem("user");
    localStorage.setItem("guest", "true");
    router.push("/plans");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const quickOperators = [
    { name: "Airtel", logo: "/airtel.png", color: "#ef4444" },
    { name: "Jio", logo: "/jio.png", color: "#0284c7" },
    { name: "Vi", logo: "/vi.png", color: "#d97706" },
    { name: "BSNL", logo: "/bsnl.png", color: "#059669" },
  ];

  return (
    <div style={{ maxWidth: "880px", margin: "0 auto" }}>
      {/* HERO SECTION */}
      <div className="hero-section-clean">
        <span className="hero-tag">Fast &bull; Reliable &bull; Secure</span>
        <h1 style={{ fontSize: "36px", fontWeight: "900", letterSpacing: "-0.04em", color: "var(--text-main)", marginBottom: "12px", lineHeight: "1.2" }}>
          Recharge Any Prepaid Mobile in Seconds
        </h1>
        <p style={{ fontSize: "16px", color: "var(--text-muted)", maxWidth: "580px", margin: "0 auto 32px", lineHeight: "1.6" }}>
          Instant recharge portal for Airtel, Jio, Vodafone Idea, and BSNL. Explore unlimited 5G packs, data boosters, and talktime plans.
        </p>

        {user ? (
          <div
            style={{
              background: "var(--surface-subtle)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "24px",
              maxWidth: "460px",
              margin: "0 auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "20px" }}>
              <img
                src="/thor.JPG"
                alt="Profile Avatar"
                style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "2.5px solid #4f46e5" }}
              />
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: "800", fontSize: "17px", color: "var(--text-main)" }}>{user.name}</div>
                <div style={{ fontSize: "13.5px", color: "var(--text-muted)" }}>📱 {user.phone}</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <button onClick={() => router.push("/dashboard")} className="btn-primary" style={{ width: "100%", padding: "12px" }}>
                My Dashboard ➔
              </button>
              <button onClick={() => router.push("/plans")} className="btn-secondary" style={{ width: "100%", padding: "12px" }}>
                Browse Plans
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", maxWidth: "480px", margin: "0 auto" }}>
            <button
              onClick={handleLogin}
              className="btn-primary"
              style={{ flex: "1 1 200px", padding: "14px 24px", fontSize: "15px", fontWeight: "700" }}
            >
              Sign In to Your Account ➔
            </button>

            <button
              onClick={handleGuest}
              className="btn-secondary"
              style={{ flex: "1 1 200px", padding: "14px 24px", fontSize: "15px", fontWeight: "700" }}
            >
              Continue as Guest ➔
            </button>
          </div>
        )}
      </div>

      {/* QUICK OPERATORS SECTION */}
      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-main)", marginBottom: "20px" }}>
          Select an Operator to Explore Plans
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
          {quickOperators.map((op) => (
            <div
              key={op.name}
              onClick={() => router.push(`/plans/${op.name}`)}
              style={{
                background: "var(--surface)",
                border: "1.5px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 16px",
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
                  width: "56px",
                  height: "56px",
                  borderRadius: "var(--radius-md)",
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px",
                  marginBottom: "12px",
                }}
              >
                <img src={op.logo} alt={op.name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
              </div>
              <div style={{ fontWeight: "800", fontSize: "16px", color: "var(--text-main)", marginBottom: "4px" }}>
                {op.name}
              </div>
              <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>View packs ➔</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}