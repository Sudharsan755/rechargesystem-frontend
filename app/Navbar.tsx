"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const stored = localStorage.getItem("user");
      const adminStored = localStorage.getItem("admin");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsAdmin(adminStored === "true");
    };

    checkSession();
    window.addEventListener("storage", checkSession);
    return () => window.removeEventListener("storage", checkSession);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("guest");
    setUser(null);
    setIsAdmin(false);
    router.push("/login");
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-brand">
          <div className="nav-brand-icon">⚡</div>
          <span>RechargeSys</span>
        </Link>

        <nav className="nav-links">
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <Link href="/plans" className={`nav-link ${pathname.startsWith("/plans") ? "active" : ""}`}>
            Plans
          </Link>
          {user && (
            <>
              <Link href="/dashboard" className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`}>
                Dashboard
              </Link>
              <Link href="/history" className={`nav-link ${pathname === "/history" ? "active" : ""}`}>
                History
              </Link>
            </>
          )}
          {isAdmin && (
            <Link href="/admin/dashboard" className={`nav-link ${pathname.startsWith("/admin") ? "active" : ""}`}>
              Admin
            </Link>
          )}
        </nav>

        <div className="nav-user">
          {user ? (
            <>
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
                  transition: "all 0.15s ease",
                }}
                title="Go to User Dashboard"
              >
                <img
                  src="/thor.JPG"
                  alt="Dashboard Avatar"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #4f46e5",
                  }}
                />
                <span style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-main)" }}>
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
            </>
          ) : (
            <>
              <Link href="/login" className="btn-secondary" style={{ padding: "8px 16px", fontSize: "13px" }}>
                Log In
              </Link>
              <Link href="/signup" className="btn-primary" style={{ padding: "8px 16px", fontSize: "13px" }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
