"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type Plan = {
  id: string;
  operator: string;
  price: number;
  data: string;
  validity: string;
};

export default function OperatorPlans() {
  const params = useParams();
  const router = useRouter();
  const operator = (params.operator as string) || "";

  const [plans, setPlans] = useState<Plan[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/plans")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPlans(data);
        } else {
          setPlans([]);
        }
      })
      .catch(() => alert("Error loading plans"))
      .finally(() => setLoading(false));
  }, []);

  const filteredPlans = plans
    .filter((plan) => plan.operator?.toLowerCase() === operator?.toLowerCase())
    .filter(
      (plan) =>
        plan.price?.toString().includes(search) ||
        plan.data?.toLowerCase().includes(search.toLowerCase()) ||
        plan.validity?.toLowerCase().includes(search.toLowerCase())
    );

  if (!mounted) return null;

  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
      {/* HEADER & NAV */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <Link
            href="/plans"
            className="btn-secondary"
            style={{ padding: "6px 14px", fontSize: "13px", textDecoration: "none", marginBottom: "12px", display: "inline-block" }}
          >
            ← Back to Operators
          </Link>
          <h1 className="page-title" style={{ fontSize: "28px" }}>
            {operator?.toUpperCase()} Prepaid Tariff Packs
          </h1>
          <p className="page-subtitle">
            Official 4G / 5G prepaid recharge packs and unlimited voice plans
          </p>
        </div>

        {/* SEARCH */}
        <div style={{ width: "280px", maxWidth: "100%" }}>
          <input
            type="text"
            placeholder="🔍 Search price, data, validity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "10px 14px", fontSize: "13.5px" }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)" }}>
          Loading tariff catalog...
        </div>
      ) : filteredPlans.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "var(--radius-lg)", border: "1.5px solid var(--border)" }}>
          <p style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-muted)" }}>No plans matching &quot;{search}&quot;</p>
          <button onClick={() => setSearch("")} className="btn-secondary" style={{ marginTop: "14px", fontSize: "13px" }}>
            Clear Search
          </button>
        </div>
      ) : (
        <div className="plans-grid-modern">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="plan-card-modern">
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div className="plan-price-tag">
                    ₹{plan.price}
                  </div>
                  <span className="plan-badge">
                    {plan.operator}
                  </span>
                </div>

                <div
                  style={{
                    background: "var(--surface-subtle)",
                    borderRadius: "var(--radius-md)",
                    padding: "12px 14px",
                    marginBottom: "14px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>Data</div>
                    <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>{plan.data}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: "700" }}>Validity</div>
                    <div style={{ fontSize: "14px", fontWeight: "800", color: "var(--text-main)" }}>{plan.validity}</div>
                  </div>
                </div>

                <ul className="plan-details-list">
                  <li>
                    <span style={{ color: "var(--success)" }}>✓</span>
                    <span><strong>Calls:</strong> Truly Unlimited</span>
                  </li>
                  <li>
                    <span style={{ color: "var(--success)" }}>✓</span>
                    <span><strong>SMS:</strong> 100 SMS / Day</span>
                  </li>
                  <li>
                    <span style={{ color: "var(--success)" }}>✓</span>
                    <span><strong>Network:</strong> High-Speed 4G / 5G</span>
                  </li>
                </ul>
              </div>

              <button
                className="btn-primary"
                style={{ width: "100%", marginTop: "12px", padding: "12px" }}
                onClick={() => {
                  const user = localStorage.getItem("user");
                  const guest = localStorage.getItem("guest");

                  if (!user || guest === "true") {
                    alert("Please login to continue with your recharge");
                    router.push("/login");
                    return;
                  }

                  router.push(`/recharge?operator=${encodeURIComponent(plan.operator)}&amount=${plan.price}`);
                }}
              >
                Recharge ₹{plan.price} ➔
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}