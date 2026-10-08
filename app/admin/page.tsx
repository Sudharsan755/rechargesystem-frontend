"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="plans-grid">
        <Link href="/admin/users">
          <button>View Users</button>
        </Link>

        <Link href="/admin/transactions">
          <button>Transactions</button>
        </Link>

        <Link href="/admin/plans">
          <button>Manage Plans</button>
        </Link>
      </div>
    </div>
  );
}

