"use client";

import Link from "next/link";

export default function AdminDashboard() {
  const adminSections = [
    {
      title: "User Directory",
      desc: "View all registered users and account phone numbers.",
      link: "/admin/users",
      action: "Manage Users ➔",
    },
    {
      title: "Transaction Ledger",
      desc: "Live audit of all recharge payments across operators.",
      link: "/admin/transactions",
      action: "View Transactions ➔",
    },
    {
      title: "Tariff Plans",
      desc: "Create, update pricing, or remove mobile recharge packages.",
      link: "/admin/plans",
      action: "Manage Plans ➔",
    },
  ];

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      <div className="page-header" style={{ textAlign: "left", marginBottom: "32px" }}>
        <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#71717a", fontWeight: "700" }}>Administration</span>
        <h1 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.02em", color: "#09090b", marginTop: "4px" }}>
          Platform Management
        </h1>
        <p style={{ color: "#71717a", fontSize: "14px" }}>
          Central control for subscribers, telecom tariffs, and payment logs
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
        {adminSections.map((item) => (
          <div key={item.title} className="stat-card" style={{ padding: "28px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#09090b", marginBottom: "6px" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "13px", color: "#71717a", marginBottom: "20px" }}>
              {item.desc}
            </p>
            <Link href={item.link} className="btn-secondary" style={{ width: "100%", fontSize: "13px", textDecoration: "none" }}>
              {item.action}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
