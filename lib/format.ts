// Display formatters. Backend money fields arrive as strings and DB booleans as
// 1/0 — we convert ONLY at the display boundary, never mutating stored values.

export function formatMoney(value: string | number | null | undefined, currency = "GBP"): string {
  if (value === null || value === undefined || value === "") return "—";
  const n = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(n)) return String(value);
  return `£${n.toFixed(2)} ${currency}`;
}

/** Convert a DB-style boolean (1 | 0) — or anything truthy — into a real boolean. */
export function dbBool(value: unknown): boolean {
  return value === 1 || value === "1" || value === true;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export type StatusTone = "pending" | "processing" | "success" | "danger" | "neutral";

/** Map an order/payment status string to a display tone + Tailwind classes. */
export function statusTone(raw: string | null | undefined): {
  tone: StatusTone;
  className: string;
  label: string;
} {
  const s = (raw || "").toLowerCase();
  const label = raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : "Unknown";
  if (["completed", "received", "paid", "success", "delivered", "approved"].includes(s))
    return { tone: "success", className: "bg-lime/50 text-navy", label };
  if (["processing", "shipped", "dispatched"].includes(s))
    return { tone: "processing", className: "bg-blue-100 text-blue-700", label };
  if (["pending", "reserved", "awaiting"].includes(s))
    return { tone: "pending", className: "bg-amber-100 text-amber-700", label };
  if (["cancelled", "canceled", "rejected", "failed", "declined"].includes(s))
    return { tone: "danger", className: "bg-red-100 text-red-600", label };
  return { tone: "neutral", className: "bg-beige text-navy/70", label };
}
