"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function RechargeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultOperator = searchParams.get("operator") || "";
  const defaultAmount = searchParams.get("amount") || "";

  const [mobile, setMobile] = useState("");
  const [operator, setOperator] = useState(defaultOperator);
  const [amount, setAmount] = useState(defaultAmount);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  // Payment form states
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankUserId, setBankUserId] = useState("");

  const validatePayment = () => {
    if (paymentMethod === "UPI") {
      if (!upiId.trim()) {
        alert("Please enter your UPI ID");
        return false;
      }
      if (!/^[\w.\-]+@[\w.\-]+$/.test(upiId.trim())) {
        alert("Please enter a valid UPI ID (e.g. mobile@upi or name@bank)");
        return false;
      }
    }

    if (paymentMethod === "Card") {
      if (cardNumber.length !== 16) {
        alert("Card number must be exactly 16 digits");
        return false;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiry.trim())) {
        alert("Enter expiry in MM/YYYY format (e.g. 12/2028)");
        return false;
      }
      if (cvv.length !== 3) {
        alert("CVV must be exactly 3 digits");
        return false;
      }
    }

    if (paymentMethod === "Net Banking") {
      if (!bankName.trim() || !bankUserId.trim()) {
        alert("Please enter bank name and user ID");
        return false;
      }
    }

    return true;
  };

  const handleRecharge = async () => {
    if (!mobile || !operator || !amount) {
      alert("Please fill in all required fields");
      return;
    }

    if (mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    if (!validatePayment()) {
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please login to proceed with recharge");
      router.push("/login");
      return;
    }

    let user;
    try {
      user = JSON.parse(storedUser);
    } catch {
      alert("Session expired. Please log in again.");
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }

    setProcessing(true);

    const newRecharge = {
      mobile: String(mobile).trim(),
      operator: String(operator).trim(),
      amount: Number(amount),
      paymentMethod,
      status: "Success",
      date: new Date().toLocaleString(),
      userPhone: String(user.phone).trim(),
    };

    try {
      const res = await fetch("/api/recharges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecharge),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.message || "Failed to process recharge");
      }

      alert("Recharge successful. Your pack is active.");
      router.push("/dashboard");
    } catch (error: any) {
      alert(error.message || "Error processing recharge");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: "520px", margin: "20px auto" }}>
      <div className="container">
        <div className="page-header" style={{ textAlign: "left", marginBottom: "24px" }}>
          <h1 className="page-title">Checkout</h1>
          <p className="page-subtitle">Review recharge details and select payment method</p>
        </div>

        {/* ORDER SUMMARY */}
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "16px", marginBottom: "24px", background: "var(--surface-subtle)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Network Provider</span>
            <span style={{ fontWeight: "700", fontSize: "14px" }}>{operator || "Not specified"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>Payable Amount</span>
            <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.03em" }}>₹{amount || "0"}</span>
          </div>
        </div>

        {/* MOBILE NUMBER */}
        <div className="form-group">
          <label className="form-label">MOBILE NUMBER</label>
          <input
            type="text"
            placeholder="10-digit prepaid number"
            value={mobile}
            maxLength={10}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
            style={{ fontSize: "15px", letterSpacing: "0.05em" }}
          />
        </div>

        {/* PAYMENT TABS */}
        <div className="form-group">
          <label className="form-label">PAYMENT METHOD</label>
          <div className="payment-tabs">
            <button
              type="button"
              className={`payment-tab-btn ${paymentMethod === "UPI" ? "active" : ""}`}
              onClick={() => setPaymentMethod("UPI")}
            >
              UPI
            </button>
            <button
              type="button"
              className={`payment-tab-btn ${paymentMethod === "Card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Card")}
            >
              Card
            </button>
            <button
              type="button"
              className={`payment-tab-btn ${paymentMethod === "Net Banking" ? "active" : ""}`}
              onClick={() => setPaymentMethod("Net Banking")}
            >
              Net Banking
            </button>
          </div>
        </div>

        {/* CONDITIONAL PAYMENT INPUTS */}
        {paymentMethod === "UPI" && (
          <div className="form-group">
            <label className="form-label">UPI ID</label>
            <input
              placeholder="e.g. mobile@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {paymentMethod === "Card" && (
          <div>
            <div className="form-group">
              <label className="form-label">CARD NUMBER</label>
              <input
                placeholder="16-digit card number"
                value={cardNumber}
                maxLength={16}
                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div className="form-group">
                <label className="form-label">EXPIRY (MM/YYYY)</label>
                <input
                  placeholder="MM/YYYY"
                  value={expiry}
                  maxLength={7}
                  onChange={(e) => {
                    let v = e.target.value.replace(/[^\d/]/g, "");
                    if (v.length === 2 && expiry.length === 1) v += "/";
                    setExpiry(v);
                  }}
                />
              </div>
              <div className="form-group">
                <label className="form-label">CVV</label>
                <input
                  type="password"
                  placeholder="3 digits"
                  value={cvv}
                  maxLength={3}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "Net Banking" && (
          <div>
            <div className="form-group">
              <label className="form-label">BANK NAME</label>
              <input
                placeholder="e.g. HDFC, SBI, ICICI"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">USER ID</label>
              <input
                placeholder="Internet Banking User ID"
                value={bankUserId}
                onChange={(e) => setBankUserId(e.target.value)}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleRecharge}
          disabled={processing}
          className="btn-primary"
          style={{ width: "100%", padding: "12px", marginTop: "8px" }}
        >
          {processing ? "Processing..." : `Pay ₹${amount || "0"} ➔`}
        </button>

        <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-muted)", marginTop: "16px" }}>
          Encrypted 256-bit SSL transaction
        </p>
      </div>
    </div>
  );
}

export default function RechargePage() {
  return (
    <Suspense fallback={<div style={{ textAlign: "center", padding: "60px", color: "#71717a" }}>Loading checkout...</div>}>
      <RechargeContent />
    </Suspense>
  );
}
