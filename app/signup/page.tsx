"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !password) {
      alert("All fields are required");
      return;
    }

    if (phone.length !== 10 || phone === "0000000000") {
      alert("Phone number must be exactly 10 valid digits");
      return;
    }

    setLoading(true);

    try {
      await axios.post("/api/users", {
        name,
        phone,
        password,
      });

      alert("Account created successfully. Please sign in.");
      router.push("/login");
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Error creating account";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "440px", margin: "40px auto" }}>
      <div className="auth-container">
        <div className="page-header" style={{ textAlign: "left", marginBottom: "24px" }}>
          <h1 className="page-title">Register</h1>
          <p className="page-subtitle">Create an account to manage mobile recharges</p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">FULL NAME</label>
            <input
              placeholder="e.g. Sudharsan"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">MOBILE NUMBER</label>
            <input
              placeholder="10-digit number"
              minLength={10}
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">PASSWORD</label>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: "100%", padding: "11px", marginTop: "8px" }}
          >
            {loading ? "Registering..." : "Create Account ➔"}
          </button>
        </form>

        <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #e4e4e7" }}>
          <p style={{ fontSize: "13px", color: "#71717a" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#09090b", fontWeight: "600", textDecoration: "none" }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}