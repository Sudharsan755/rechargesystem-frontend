"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !password) {
      alert("Please fill in both phone and password");
      return;
    }

    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    // Direct check for admin credentials
    if (phone === "0000000000" && password === "0000") {
      localStorage.removeItem("user");
      localStorage.removeItem("guest");
      localStorage.setItem("admin", "true");
      window.dispatchEvent(new Event("sessionChanged"));

      alert("Admin login successful");
      router.push("/admin/dashboard");
      router.refresh();
      return;
    }

    setLoading(true);

    try {
      // Authenticate through the Spring Boot backend
      const res = await axios.post("/api/auth/login", {
        phone,
        password,
      });

      const data = res.data;

      if (!data.success || !data.user) {
        alert(data.message || "Invalid login credentials");
        return;
      }

      const loggedInUser = data.user;

      if (phone === "0000000000") {
        // Admin login
        localStorage.removeItem("user");
        localStorage.removeItem("guest");
        localStorage.setItem("admin", "true");
        window.dispatchEvent(new Event("sessionChanged"));

        alert("Admin login successful");
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        // Normal user login
        localStorage.removeItem("admin");
        localStorage.removeItem("guest");
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        window.dispatchEvent(new Event("sessionChanged"));

        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        alert("Invalid phone number or password");
      } else {
        alert(
          "Unable to connect to the backend. Please check that the backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "440px", margin: "40px auto" }}>
      <div className="auth-container">
        <div
          className="page-header"
          style={{ textAlign: "left", marginBottom: "24px" }}
        >
          <h1 className="page-title">Sign In</h1>
          <p className="page-subtitle">
            Access your account to recharge and view receipts
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">MOBILE NUMBER</label>
            <input
              type="tel"
              placeholder="10-digit number"
              minLength={10}
              maxLength={10}
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">PASSWORD</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              padding: "11px",
              marginTop: "8px",
            }}
          >
            {loading ? "Authenticating..." : "Sign In ➔"}
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            paddingTop: "16px",
            borderTop: "1px solid #e4e4e7",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "13px", color: "#71717a" }}>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              style={{
                color: "#09090b",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}