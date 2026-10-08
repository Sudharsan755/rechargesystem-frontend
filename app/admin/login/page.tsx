"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAdmin } from "@/store/adminSlice";
import { useAppDispatch } from "@/store/hooks";

export default function AdminLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "0000000000" && password === "0000") {
      dispatch(loginAdmin({ id, password }));
      localStorage.setItem("admin", "true");
      alert("Admin authorization granted");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    <div style={{ maxWidth: "440px", margin: "40px auto" }}>
      <div className="auth-container">
        <div className="page-header" style={{ textAlign: "left", marginBottom: "24px" }}>
          <h1 className="page-title">Admin Access</h1>
          <p className="page-subtitle">Platform administrator credential verification</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">ADMIN ID</label>
            <input
              placeholder="e.g. 0000000000"
              maxLength={10}
              value={id}
              onChange={(e) => setId(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">PASSWORD</label>
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", padding: "11px", marginTop: "8px" }}>
            Authorize ➔
          </button>
        </form>

        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e4e4e7" }}>
          <Link href="/login" style={{ color: "#71717a", fontSize: "13px", textDecoration: "none" }}>
            ← Back to User Login
          </Link>
        </div>
      </div>
    </div>
  );
}
