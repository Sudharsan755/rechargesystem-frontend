"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkSession = () => {
      const adminStored = localStorage.getItem("admin");
      const stored = localStorage.getItem("user");

      // Admin session takes precedence
      if (adminStored === "true") {
        setIsAdmin(true);
        setUser(null);
        return;
      }

      setIsAdmin(false);

      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          localStorage.removeItem("user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkSession();

    window.addEventListener("storage", checkSession);
    window.addEventListener("sessionChanged", checkSession);

    return () => {
      window.removeEventListener("storage", checkSession);
      window.removeEventListener("sessionChanged", checkSession);
    };
  }, [pathname]);

  const handleLogout = () => {
    const wasAdmin = isAdmin || pathname.startsWith("/admin");

    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    localStorage.removeItem("guest");

    setUser(null);
    setIsAdmin(false);

    window.dispatchEvent(new Event("sessionChanged"));

    router.replace("/login");
  };

  const isAdminSection = pathname.startsWith("/admin");
  const showAdminUI = isAdmin || isAdminSection;

  return (
    <header className="navbar">
      <div className="nav-container">
        {/* BRAND LOGO */}
        <Link href={showAdminUI ? "/admin/dashboard" : "/"} className="nav-brand">
          <div className="nav-brand-icon">⚡</div>
          <span>RechargeSys</span>
          {showAdminUI && (
            <span
              style={{
                fontSize: "11px",
                background: "#ef4444",
                color: "#ffffff",
                padding: "2px 7px",
                borderRadius: "9999px",
                fontWeight: "700",
                marginLeft: "4px",
                letterSpacing: "0.03em",
              }}
            >
              ADMIN
            </span>
          )}
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="nav-links">
          {showAdminUI ? (
            <>
              <Link
                href="/admin/dashboard"
                className={`nav-link ${pathname === "/admin/dashboard" ? "active" : ""}`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/plans"
                className={`nav-link ${pathname === "/admin/plans" ? "active" : ""}`}
              >
                Tariff Plans
              </Link>
              <Link
                href="/admin/users"
                className={`nav-link ${pathname === "/admin/users" ? "active" : ""}`}
              >
                Users
              </Link>
              <Link
                href="/admin/transactions"
                className={`nav-link ${pathname === "/admin/transactions" ? "active" : ""}`}
              >
                Ledger
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>

              {user && (
                <Link
                  href="/dashboard"
                  className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`}
                >
                  Dashboard
                </Link>
              )}
            </>
          )}
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div className="nav-user">
          {showAdminUI ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 12px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid #3f3f46",
                  background: "#18181b",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                <span>🛡️</span>
                <span>Admin (0000)</span>
              </div>

              <button
                onClick={handleLogout}
                className="btn-secondary"
                style={{
                  padding: "8px 14px",
                  fontSize: "13px",
                  background: "#fef2f2",
                  color: "#dc2626",
                  borderColor: "#fecaca",
                }}
              >
                Logout
              </button>
            </div>
          ) : mounted && user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Link
                href="/dashboard"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "5px 14px 5px 6px",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid var(--border)",
                  background: "#ffffff",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-subtle)",
                }}
                title="Go to User Dashboard"
              >
                <img
                  src="/thor.JPG"
                  alt="Dashboard Avatar"
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #4f46e5",
                  }}
                />

                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: "700",
                    color: "var(--text-main)",
                  }}
                >
                  Dashboard ({user.name})
                </span>
              </Link>

              <button
                onClick={handleLogout}
                className="btn-secondary"
                style={{ padding: "8px 14px", fontSize: "13px" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Link
                href="/login"
                className="btn-secondary"
                style={{ padding: "8px 16px", fontSize: "13px" }}
              >
                Log In
              </Link>

              <Link
                href="/signup"
                className="btn-primary"
                style={{ padding: "8px 16px", fontSize: "13px" }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}