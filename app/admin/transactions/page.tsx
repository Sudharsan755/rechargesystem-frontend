"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Transactions() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/recharges")
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result)) {
          setData(result);
        } else {
          setData([]);
        }
      })
      .catch(() => {
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredData =
    filter === "All"
      ? data
      : data.filter(
          (r) =>
            r.operator &&
            r.operator.toLowerCase() === filter.toLowerCase()
        );

  const totalVolume = filteredData.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <Link href="/admin/dashboard" className="btn-secondary" style={{ padding: "6px 12px", fontSize: "13px", textDecoration: "none", display: "inline-block", marginBottom: "8px" }}>
            ← Back to Admin Console
          </Link>
          <h1 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em", color: "#09090b" }}>
            Transaction Ledger ({filteredData.length})
          </h1>
          <p style={{ color: "#71717a", fontSize: "14px" }}>
            Total Volume: <strong style={{ color: "#09090b" }}>₹{totalVolume}</strong>
          </p>
        </div>

        {/* FILTER */}
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
        <div style={{ textAlign: "center", padding: "60px", color: "#71717a" }}>Loading transaction logs...</div>
      ) : filteredData.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", background: "white", borderRadius: "8px", border: "1px solid #e4e4e7" }}>
          <p style={{ color: "#71717a" }}>No transactions logged for this operator.</p>
        </div>
      ) : (
        <div>
          {filteredData.map((r) => (
            <div key={r.id} className="history-card-modern">
              <div className="history-card-left">
                <div className="history-icon">
                  {r.operator === "Jio" ? "J" : r.operator === "Airtel" ? "A" : r.operator === "Vi" ? "V" : "B"}
                </div>
                <div>
                  <div style={{ fontWeight: "700", fontSize: "15px", color: "#09090b" }}>
                    {r.operator} • Recharge for {r.mobile}
                  </div>
                  <div style={{ fontSize: "12px", color: "#71717a" }}>
                    User: {r.userPhone} • Method: {r.paymentMethod} • {r.date}
                  </div>
                </div>
              </div>

              <div className="history-card-right">
                <div className="history-amount">₹{r.amount}</div>
                <span className="status-chip success">
                  {r.status || "Success"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}