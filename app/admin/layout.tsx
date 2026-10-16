"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Redirect legacy admin login path to unified login portal
    if (pathname === "/admin/login") {
      router.replace("/login");
      return;
    }

    // Check admin flag in localStorage
    const isAdmin = localStorage.getItem("admin") === "true";

    if (!isAdmin) {
      setAuthorized(false);
      setChecking(false);
      alert("Access Denied: Admin privileges required. Please sign in as administrator.");
      router.replace("/login");
    } else {
      setAuthorized(true);
      setChecking(false);
    }
  }, [pathname, router]);

  if (checking) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-muted)" }}>
        Verifying administrator authorization...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
      {children}
    </div>
  );
}
