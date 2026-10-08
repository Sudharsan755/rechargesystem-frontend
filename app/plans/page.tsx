"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Plans() {
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

  const operators = [
    {
      name: "Airtel",
      logo: "/airtel.png",
      tagline: "India's Fastest 5G Network",
      badge: "5G Unlimited",
      badgeColor: "#ef4444",
      badgeBg: "#fef2f2",
      classKey: "airtel",
    },
    {
      name: "Jio",
      logo: "/jio.png",
      tagline: "True 5G & High-Speed Data",
      badge: "True 5G",
      badgeColor: "#0284c7",
      badgeBg: "#f0f9ff",
      classKey: "jio",
    },
    {
      name: "Vi",
      logo: "/vi.png",
      tagline: "Hero Unlimited & Binge All Night",
      badge: "All-Night Data",
      badgeColor: "#d97706",
      badgeBg: "#fffbeb",
      classKey: "vi",
    },
    {
      name: "BSNL",
      logo: "/bsnl.png",
      tagline: "Nationwide Connectivity & Value",
      badge: "Maximum Validity",
      badgeColor: "#059669",
      badgeBg: "#ecfdf5",
      classKey: "bsnl",
    },
  ];

  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
      {/* HEADER */}
      <div className="page-header" style={{ textAlign: "center", marginBottom: "36px" }}>
        <span className="hero-tag">Prepaid Recharge</span>
        <h1 className="page-title" style={{ fontSize: "32px", marginTop: "8px" }}>
          Select Your Telecom Operator
        </h1>
        <p className="page-subtitle" style={{ fontSize: "16px" }}>
          Browse official prepaid tariff packages, unlimited 5G data plans, and talktime validity
        </p>
      </div>

      {/* OPERATORS RESPONSIVE GRID */}
      <div className="operator-grid">
        {operators.map((op) => (
          <div
            key={op.name}
            className={`operator-card ${op.classKey}`}
            onClick={() => router.push(`/plans/${op.name}`)}
          >
            <div
              style={{
                display: "inline-block",
                padding: "3px 10px",
                borderRadius: "9999px",
                fontSize: "11px",
                fontWeight: "700",
                color: op.badgeColor,
                backgroundColor: op.badgeBg,
                marginBottom: "16px",
              }}
            >
              {op.badge}
            </div>

            <div className="operator-logo-wrap">
              <img src={op.logo} alt={op.name} />
            </div>

            <div className="operator-name">{op.name}</div>
            
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "20px", minHeight: "38px" }}>
              {op.tagline}
            </p>

            <button
              className="btn-primary"
              style={{ width: "100%", padding: "10px 16px", fontSize: "13.5px" }}
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/plans/${op.name}`);
              }}
            >
              Explore {op.name} Plans ➔
            </button>
          </div>
        ))}
      </div>

      {/* TRUST BANNER */}
      <div
        style={{
          marginTop: "48px",
          padding: "24px 32px",
          background: "var(--surface)",
          border: "1.5px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          boxShadow: "var(--shadow-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "24px" }}>⚡</div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "14px", color: "var(--text-main)" }}>Instant Top-up</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Direct integration with telecom APIs</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "24px" }}>🔒</div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "14px", color: "var(--text-main)" }}>Secure Checkout</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>256-bit SSL encrypted payments</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ fontSize: "24px" }}>📋</div>
          <div>
            <div style={{ fontWeight: "700", fontSize: "14px", color: "var(--text-main)" }}>Instant Receipts</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Complete transaction logs &amp; receipts</div>
          </div>
        </div>
      </div>
    </div>
  );
}