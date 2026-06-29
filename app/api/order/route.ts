import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Item = { name: string; price: number; qty: number };
type Body = {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
  };
  items: Item[];
  subtotal: number;
  shipping: number;
  total: number;
};

function orderId() {
  return "VRA-" + Math.floor(100000 + Math.random() * 899999);
}

function itemsTable(items: Item[]) {
  return items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #eee">${i.name} × ${i.qty}</td>
          <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">£${i.price * i.qty}</td>
        </tr>`
    )
    .join("");
}

function emailHtml(b: Body, id: string) {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#043460">
    <h2 style="color:#043460">Vora Labs — Order Confirmation</h2>
    <p>Hi ${b.customer.firstName},</p>
    <p>Thank you for your order. Your reference is <strong>${id}</strong>. It is being prepared for tracked, cold-chain dispatch.</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      ${itemsTable(b.items)}
      <tr><td style="padding:8px 0">Subtotal</td><td style="padding:8px 0;text-align:right">£${b.subtotal}</td></tr>
      <tr><td style="padding:8px 0">Shipping</td><td style="padding:8px 0;text-align:right">£${b.shipping}</td></tr>
      <tr><td style="padding:10px 0;font-weight:bold;border-top:2px solid #043460">Total</td>
          <td style="padding:10px 0;text-align:right;font-weight:bold;border-top:2px solid #043460">£${b.total} GBP</td></tr>
    </table>
    <p style="font-size:13px;color:#5B7088">Contact: ${b.customer.email} · ${b.customer.mobile}</p>
    <p style="font-size:12px;color:#9aa7b4;text-transform:uppercase;letter-spacing:1px">For laboratory R&amp;D use only — not for human or veterinary consumption.</p>
  </div>`;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const c = body.customer;
  if (!c?.firstName || !c?.lastName || !c?.email || !c?.mobile) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const id = orderId();

  // Send email only if SMTP is configured. Otherwise the order still succeeds
  // (so the flow works in development without credentials).
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: Number(SMTP_PORT) === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      });

      const from = process.env.SMTP_FROM || `Vora Labs <${SMTP_USER}>`;
      const html = emailHtml(body, id);

      // Confirmation to the customer
      await transporter.sendMail({
        from,
        to: c.email,
        subject: `Vora Labs — Order ${id} confirmed`,
        html,
      });

      // Notification to the store (optional)
      if (process.env.ORDER_EMAIL_TO) {
        await transporter.sendMail({
          from,
          to: process.env.ORDER_EMAIL_TO,
          subject: `New order ${id} — ${c.firstName} ${c.lastName}`,
          html,
        });
      }
    } catch (err) {
      console.error("[order] email send failed:", err);
      // don't fail the order if email errors — return a soft flag
      return NextResponse.json({ ok: true, id, emailed: false });
    }
    return NextResponse.json({ ok: true, id, emailed: true });
  }

  console.warn("[order] SMTP not configured — order recorded without email:", id);
  return NextResponse.json({ ok: true, id, emailed: false });
}
