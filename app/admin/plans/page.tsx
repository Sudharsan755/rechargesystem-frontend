"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import axios from "axios";

export default function Plans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [operator, setOperator] = useState("Airtel");
  const [price, setPrice] = useState("");
  const [data, setData] = useState("");
  const [validity, setValidity] = useState("");
  const [editId, setEditId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);

  const formTopRef = useRef<HTMLDivElement>(null);

  // FETCH PLANS
  const fetchPlans = async () => {
    try {
      const res = await axios.get("/api/plans");
      if (Array.isArray(res.data)) {
        setPlans(res.data);
      } else {
        setPlans([]);
      }
    } catch {
      alert("Error fetching plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ADD / UPDATE
  const handleSave = async () => {
    if (!operator || !price || !data || !validity) {
      alert("Please fill in all plan fields");
      return;
    }

    try {
      if (editId) {
        // UPDATE
        await axios.put(`/api/plans/${editId}`, {
          operator,
          price: Number(price),
          data,
          validity,
        });
        alert("Plan updated successfully");
      } else {
        // ADD
        await axios.post("/api/plans", {
          operator,
          price: Number(price),
          data,
          validity,
        });
        alert("New plan published");
      }

      setOperator("Airtel");
      setPrice("");
      setData("");
      setValidity("");
      setEditId(null);
      fetchPlans();
    } catch {
      alert("Error saving plan");
    }
  };

  // EDIT
  const handleEdit = (plan: any) => {
    setEditId(plan.id);
    setOperator(plan.operator);
    setPrice(plan.price.toString());
    setData(plan.data);
    setValidity(plan.validity);
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setOperator("Airtel");
    setPrice("");
    setData("");
    setValidity("");
  };

  // DELETE
  const handleDelete = async (id: string | number) => {
    if (!confirm("Delete this plan from the catalog?")) return;
    try {
      await axios.delete(`/api/plans/${id}`);
      fetchPlans();
    } catch {
      alert("Error deleting plan");
    }
  };

  return (
    <div style={{ maxWidth: "960px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px" }}>
        <div>
          <Link href="/admin/dashboard" className="btn-secondary" style={{ padding: "6px 12px", fontSize: "13px", textDecoration: "none", display: "inline-block", marginBottom: "8px" }}>
            ← Back to Admin Console
          </Link>
          <h1 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em", color: "#09090b" }}>
            Tariff Catalog ({plans.length})
          </h1>
          <p style={{ color: "#71717a", fontSize: "14px" }}>
            Publish, edit pricing, or remove mobile packages
          </p>
        </div>
      </div>

      {/* FORM CARD */}
      <div ref={formTopRef} className="container" style={{ maxWidth: "100%", margin: "0 0 32px 0", textAlign: "left" }}>
        <h2 style={{ fontSize: "17px", fontWeight: "700", marginBottom: "16px", color: "#09090b" }}>
          {editId ? "Edit Tariff Plan" : "Add New Tariff Plan"}
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
          <div className="form-group">
            <label className="form-label">OPERATOR</label>
            <select value={operator} onChange={(e) => setOperator(e.target.value)}>
              <option value="Airtel">Airtel</option>
              <option value="Jio">Jio</option>
              <option value="Vi">Vi</option>
              <option value="BSNL">BSNL</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">PRICE (₹)</label>
            <input
              placeholder="e.g. 299"
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">DATA</label>
            <input
              placeholder="e.g. 1.5GB/day"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">VALIDITY</label>
            <input
              placeholder="e.g. 28 days"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
          <button onClick={handleSave} className="btn-primary" style={{ padding: "10px 20px" }}>
            {editId ? "Save Changes" : "Publish Plan"}
          </button>
          {editId && (
            <button onClick={handleCancelEdit} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* EXISTING PLANS */}
      <h2 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px", color: "#09090b" }}>
        Published Packages
      </h2>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#71717a" }}>Loading plans...</div>
      ) : plans.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: "8px", border: "1px solid #e4e4e7" }}>
          No plans available in the database.
        </div>
      ) : (
        <div className="plans-grid-modern">
          {plans.map((p) => (
            <div key={p.id} className="plan-card-modern">
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <div className="plan-price-tag">₹{p.price}</div>
                  <span className="plan-badge">{p.operator}</span>
                </div>
                <ul className="plan-details-list">
                  <li><strong>Data:</strong> {p.data}</li>
                  <li><strong>Validity:</strong> {p.validity}</li>
                </ul>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "12px" }}>
                <button onClick={() => handleEdit(p)} className="btn-secondary" style={{ padding: "6px" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(p.id)} className="btn-danger" style={{ padding: "6px" }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}