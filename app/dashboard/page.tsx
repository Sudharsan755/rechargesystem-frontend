"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("guest");
    router.push("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("Please login to access your dashboard");
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      fetch(`/api/recharges?userPhone=${encodeURIComponent(String(parsedUser.phone).trim())}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const filtered = data.filter(
              (item: any) =>
                String(item.userPhone).trim() === String(parsedUser.phone).trim()
            );
            setHistory(filtered);
          } else {
            setHistory([]);
          }
        })
        .catch(() => setHistory([]))
        .finally(() => setLoading(false));
    } catch {
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return <div style={{ textAlign: "center", padding: "60px", color: "#71717a" }}>Loading account...</div>;
  }

  const totalSpent = history.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <img
            src="/thor.JPG"
            alt="Profile Avatar"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #2563eb",
              boxShadow: "var(--shadow-subtle)",
            }}
          />
          <div>
            <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#71717a", fontWeight: "600" }}>Account Overview</span>
            <h1 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em", color: "#09090b", marginTop: "2px" }}>
              {user.name}
            </h1>
            <p style={{ color: "#71717a", fontSize: "13px" }}>
              Registered Mobile: {user.phone}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <Link href="/plans" className="btn-primary" style={{ padding: "8px 16px", fontSize: "13px" }}>
            New Recharge ➔
          </Link>
          <button onClick={handleLogout} className="btn-secondary" style={{ padding: "8px 14px", fontSize: "13px" }}>
            Log Out
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Mobile Number</div>
          <div className="stat-value" style={{ fontSize: "20px" }}>{user.phone}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Recharges</div>
          <div className="stat-value">{history.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Volume</div>
          <div className="stat-value">₹{totalSpent}</div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div style={{ marginTop: "36px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "-0.01em", color: "#09090b" }}>
            Recent Transactions
          </h2>
          {history.length > 0 && (
            <Link href="/history" className="btn-outline" style={{ padding: "4px 12px", fontSize: "12px" }}>
              View All ➔
            </Link>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#71717a" }}>Loading...</div>
        ) : history.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 20px", background: "white", borderRadius: "8px", border: "1px solid #e4e4e7" }}>
            <p style={{ fontSize: "15px", fontWeight: "600", color: "#09090b", marginBottom: "4px" }}>No recharges yet</p>
            <p style={{ fontSize: "13px", color: "#71717a", marginBottom: "16px" }}>Select a network provider and activate your first pack.</p>
            <Link href="/plans" className="btn-primary" style={{ padding: "8px 16px", fontSize: "13px" }}>
              Browse Plans ➔
            </Link>
          </div>
        ) : (
          <div>
            {history.slice(0, 5).map((item: any) => (
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
                      {item.date} • Paid with {item.paymentMethod}
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
    </div>
  );
}
