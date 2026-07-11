import { sendOrderConfirmationEmail } from "../../../../../shared-email/order-email.js";
// On the VPS, vora is deployed one level deeper than other sites
// (/var/www/vora/app/ is the project root, not /var/www/vora/), so this
// needs 5 dirs back to reach /var/www/shared-email/, not the usual 4.
// NOTE: this makes local builds fail (no shared-email/ one level above
// Dev/frontend/) — intentional per explicit instruction, VPS-only fix.

export async function POST(request) {
  const { customer, order } = await request.json();
  const result = await sendOrderConfirmationEmail({
    domain: request.headers.get("host"),
    customer,
    order,
  });
  return Response.json(result, { status: result.success ? 200 : 502 });
}
