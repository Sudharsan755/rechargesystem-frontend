import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";

const allowedResources = ["users", "plans", "recharges"] as const;
type Resource = (typeof allowedResources)[number];

function isAllowed(resource: string): resource is Resource {
  return (allowedResources as readonly string[]).includes(resource);
}

function createId() {
  return crypto.randomUUID();
}

// GET
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { resource } = await params;

    if (!isAllowed(resource)) {
      return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
    }

    const userPhone = request.nextUrl.searchParams.get("userPhone");

    let rows;

    if (resource === "users") {
      rows = await sql`SELECT * FROM users`;
    } else if (resource === "plans") {
      rows = await sql`SELECT * FROM plans ORDER BY operator ASC, price ASC`;   // ← added ORDER BY
    } else {
    if (userPhone) {
        rows = await sql`SELECT * FROM recharges WHERE "userPhone" = ${userPhone.trim()} ORDER BY created_at DESC`;  // ← added ORDER BY
      } else {
        rows = await sql`SELECT * FROM recharges ORDER BY created_at DESC`;   // ← added ORDER BY
      }
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET API ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch data" },
      { status: 500 }
    );
  }
}

// POST
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { resource } = await params;

    if (!isAllowed(resource)) {
      return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
    }

    const body = await request.json();
    const id = String(body.id ?? createId());

    let rows;

    if (resource === "users") {
      rows = await sql`
        INSERT INTO users (id, name, phone, password)
        VALUES (${id}, ${body.name}, ${body.phone}, ${body.password})
        RETURNING *
      `;
    } else if (resource === "plans") {
      rows = await sql`
        INSERT INTO plans (id, operator, price, data, validity)
        VALUES (${id}, ${body.operator}, ${body.price}, ${body.data}, ${body.validity})
        RETURNING *
      `;
    } else {
      rows = await sql`
        INSERT INTO recharges (id, mobile, operator, amount, "paymentMethod", status, date, "userPhone")
        VALUES (${id}, ${body.mobile}, ${body.operator}, ${body.amount}, ${body.paymentMethod}, ${body.status}, ${body.date}, ${body.userPhone})
        RETURNING *
      `;
    }

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("POST API ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create data" },
      { status: 500 }
    );
  }
}

// PUT (updates by id in the request body — used by rechargesys today)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { resource } = await params;

    if (!isAllowed(resource)) {
      return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
    }

    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const id = String(body.id);
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
    console.error("PUT API ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update data" },
      { status: 500 }
    );
  }
}

// DELETE (by ?id= query param — used by rechargesys today)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  try {
    const { resource } = await params;

    if (!isAllowed(resource)) {
      return NextResponse.json({ error: "Invalid resource" }, { status: 400 });
    }

    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
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
    console.error("DELETE API ERROR:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete data" },
      { status: 500 }
    );
  }
}
