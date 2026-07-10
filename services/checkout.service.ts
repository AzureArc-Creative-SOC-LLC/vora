// Checkout service — maps the checkout form + cart into the documented
// POST /api/user-orders request, using the documented flat field names/aliases,
// then delegates to order.service. Keeps the checkout UI free of API shape logic.

import { createOrder } from "@/services/order.service";
import type { CartItem } from "@/components/cart/CartContext";
import type { CreateOrderRequest, CreateOrderResponse } from "@/types/api";

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  postcode: string;
  country: string;
}

export interface CheckoutTotals {
  subtotal: number;
  discountAmount: number;
  total: number;
  promoCode?: string;
  promoPercent?: number;
}

export function buildOrderRequest(
  form: CheckoutForm,
  items: CartItem[],
  totals: CheckoutTotals
): CreateOrderRequest {
  const line1 = [form.address, form.apartment].filter(Boolean).join(", ");
  return {
    // customer (documented flat fields)
    email: form.email.trim(),
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    customerName: `${form.firstName} ${form.lastName}`.trim() || "Customer",
    phone: form.phone.trim(),
    // shipping
    address: line1,
    city: form.city.trim(),
    postcode: form.postcode.trim(),
    country: form.country,
    // money
    subtotal: totals.subtotal,
    discountAmount: totals.discountAmount,
    total: totals.total,
    promoCode: totals.promoCode || "",
    promoDiscount: totals.promoPercent || 0,
    // items (documented item shape / aliases)
    items: items.map((it) => ({
      name: it.name,
      sku: it.slug,
      quantity: it.qty,
      unitPrice: it.price,
    })),
    paymentMethod: "manual",
  };
}

export async function submitCheckout(
  form: CheckoutForm,
  items: CartItem[],
  totals: CheckoutTotals
): Promise<CreateOrderResponse> {
  return createOrder(buildOrderRequest(form, items, totals));
}

// Fires the shared-email order confirmation (see /shared-email at the repo
// root) on top of the backend's own confirmation email. Best-effort — a
// failure here must never surface as a checkout error.
export async function sendOrderConfirmationEmail(
  form: CheckoutForm,
  items: CartItem[],
  totals: CheckoutTotals,
  orderNumber: string
): Promise<void> {
  try {
    await fetch("/api/send-order-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer: {
          name: `${form.firstName} ${form.lastName}`.trim() || "Customer",
          email: form.email.trim(),
        },
        order: {
          orderNumber,
          currency: "GBP",
          items: items.map((it) => ({
            name: it.name,
            quantity: it.qty,
            price: it.price,
          })),
          subtotal: totals.subtotal,
          shipping: items.length ? 12 : 0,
          tax: 0,
          discount: totals.discountAmount,
          total: totals.total,
          shippingAddress: [form.address, form.apartment, form.city, form.postcode, form.country]
            .filter(Boolean)
            .join(", "),
        },
      }),
    });
  } catch (err) {
    console.error("[checkout] order confirmation email failed:", err);
  }
}
