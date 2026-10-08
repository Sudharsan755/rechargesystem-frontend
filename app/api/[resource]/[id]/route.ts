import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

const allowedResources = ["users", "plans", "recharges"] as const;
type Resource = (typeof allowedResources)[number];

function isAllowed(resource: string): resource is Resource {
  return (allowedResources as readonly string[]).includes(resource);
}

// PUT /api/plans/:id  (this is what app/admin/plans/page.tsx already calls)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  try {
    const { resource, id } = await params;

    if (!isAllowed(resource)) {
      return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
    }

    const body = await request.json();
    let rows;

    if (resource === "users") {
      const existing = await sql`SELECT * FROM users WHERE id = ${id}`;
      if (existing.length === 0) {
        return NextResponse.json({ error: "Record not found" }, { status: 404 });
      }
      const current = existing[0];
      rows = await sql`
        UPDATE users SET
          name = ${body.name ?? current.name},
          phone = ${body.phone ?? current.phone},
          password = ${body.password ?? current.password}
        WHERE id = ${id}
        RETURNING *
      `;
    } else if (resource === "plans") {
      const existing = await sql`SELECT * FROM plans WHERE id = ${id}`;
      if (existing.length === 0) {
        return NextResponse.json({ error: "Record not found" }, { status: 404 });
      }
      const current = existing[0];
      rows = await sql`
        UPDATE plans SET
          operator = ${body.operator ?? current.operator},
          price = ${body.price ?? current.price},
          data = ${body.data ?? current.data},
          validity = ${body.validity ?? current.validity}
        WHERE id = ${id}
        RETURNING *
      `;
    } else {
      const existing = await sql`SELECT * FROM recharges WHERE id = ${id}`;
      if (existing.length === 0) {
        return NextResponse.json({ error: "Record not found" }, { status: 404 });
      }
      const current = existing[0];
      rows = await sql`
        UPDATE recharges SET
          mobile = ${body.mobile ?? current.mobile},
          operator = ${body.operator ?? current.operator},
          amount = ${body.amount ?? current.amount},
          "paymentMethod" = ${body.paymentMethod ?? current.paymentMethod},
          status = ${body.status ?? current.status},
          date = ${body.date ?? current.date},
          "userPhone" = ${body.userPhone ?? current.userPhone}
        WHERE id = ${id}
        RETURNING *
      `;
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("PUT [id] API ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update data" },
      { status: 500 }
    );
  }
}

// DELETE /api/plans/:id  (this is what app/admin/plans/page.tsx already calls)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string; id: string }> }
) {
  try {
    const { resource, id } = await params;

    if (!isAllowed(resource)) {
      return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
    }

    let rows;

    if (resource === "users") {
      rows = await sql`DELETE FROM users WHERE id = ${id} RETURNING *`;
    } else if (resource === "plans") {
      rows = await sql`DELETE FROM plans WHERE id = ${id} RETURNING *`;
    } else {
      rows = await sql`DELETE FROM recharges WHERE id = ${id} RETURNING *`;
    }

    if (rows.length === 0) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("DELETE [id] API ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete data" },
      { status: 500 }
    );
  }
}
