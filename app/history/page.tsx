"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function History() {
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      const phoneStr = String(parsedUser.phone).trim();
      fetch(`/api/recharges?userPhone=${encodeURIComponent(phoneStr)}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setHistory(data);
          } else {
            setHistory([]);
          }
        })
        .catch(() => setHistory([]))
        .finally(() => setLoading(false));
    } catch {
      router.push("/login");
    }
  }, [router]);

  if (!user) return <div style={{ textAlign: "center", padding: "60px", color: "#71717a" }}>Loading history...</div>;

  const filteredHistory = filter === "All"
    ? history
    : history.filter((h) => h.operator?.toLowerCase() === filter.toLowerCase());

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src="/thor.JPG"
            alt="Profile Avatar"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #2563eb",
            }}
          />
          <div>
            <Link href="/dashboard" className="btn-secondary" style={{ padding: "4px 10px", fontSize: "12px", textDecoration: "none", display: "inline-block", marginBottom: "4px" }}>
              ← Dashboard
            </Link>
            <h1 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.02em", color: "#09090b" }}>
              Transaction History
            </h1>
            <p style={{ color: "#71717a", fontSize: "13px" }}>
              {user.name} ({user.phone})
            </p>
          </div>
        </div>

        {/* OPERATOR FILTER */}
        <div style={{ width: "180px" }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "8px 12px", margin: 0, fontSize: "13px" }}
          >
            <option value="All">All Providers</option>
            <option value="Airtel">Airtel</option>
            <option value="Jio">Jio</option>
            <option value="Vi">Vi</option>
            <option value="BSNL">BSNL</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#71717a" }}>Loading transactions...</div>
      ) : filteredHistory.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", background: "white", borderRadius: "8px", border: "1px solid #e4e4e7" }}>
          <p style={{ fontSize: "15px", fontWeight: "600", color: "#09090b" }}>No transactions found</p>
          <p style={{ fontSize: "13px", color: "#71717a", marginTop: "4px" }}>No recharge records match the selected filter.</p>
        </div>
      ) : (
        <div>
          {filteredHistory.map((item: any) => (
            <div key={item.id} className="history-card-modern">
              <div className="history-card-left">
                <div className="history-icon">
                  {item.operator === "Jio" ? "J" : item.operator === "Airtel" ? "A" : item.operator === "Vi" ? "V" : "B"}
                </div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "15px", color: "#09090b" }}>
                    {item.operator} • {item.mobile}
                  </div>
                  <div style={{ fontSize: "12px", color: "#71717a" }}>
                    {item.date} • {item.paymentMethod}
                  </div>
                </div>
              </div>

              <div className="history-card-right">
                <div className="history-amount">₹{item.amount}</div>
                <span className="status-chip success">
                  {item.status || "Success"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}