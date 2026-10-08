"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/users");
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]);
      }
    } catch {
      alert("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.slice(0, 2).toUpperCase();
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q) ||
      u.id?.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <Link
            href="/admin/dashboard"
            className="btn-secondary"
            style={{ padding: "6px 14px", fontSize: "13px", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}
          >
            ← Back to Admin Console
          </Link>
          <h1 className="page-title" style={{ fontSize: "28px" }}>
            User Directory ({users.length})
          </h1>
          <p className="page-subtitle">
            All registered subscribers and active member accounts
          </p>
        </div>

        {/* SEARCH BAR */}
        <div style={{ width: "320px", maxWidth: "100%" }}>
          <input
            placeholder="🔍 Search subscriber name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "10px 14px", fontSize: "13.5px" }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
          Loading subscribers...
        </div>
      ) : filteredUsers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", background: "white", borderRadius: "var(--radius-lg)", border: "1.5px solid var(--border)" }}>
          <p style={{ color: "var(--text-muted)" }}>No subscribers matching &quot;{search}&quot;</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {filteredUsers.map((u, idx) => (
            <div key={u.id || idx} className="user-card-modern">
              <div className="user-avatar-circle">
                {getInitials(u.name)}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <div style={{ fontWeight: "800", fontSize: "16px", color: "var(--text-main)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {u.name}
                  </div>
                  <span className="status-chip success" style={{ fontSize: "11px", padding: "2px 8px" }}>
                    Active
                  </span>
                </div>

                <div style={{ fontSize: "13.5px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <span>📱</span>
                  <strong>{u.phone}</strong>
                </div>

                <div style={{ fontSize: "11px", color: "var(--text-subtle)", fontFamily: "monospace", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>ID:</span>
                  <span style={{ background: "var(--surface-subtle)", padding: "1px 6px", borderRadius: "4px" }}>
                    {u.id?.slice(0, 10)}...
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
