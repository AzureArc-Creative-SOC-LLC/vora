// Central type definitions for the User Order Service API.
// Source of truth: API_DOCUMENTATION-USER-ORDER.md — do not invent fields.
//
// NOTE ON DATA SHAPES (per the docs):
//  - Most monetary fields (total, subtotal, price, unit_price, amount, ...) are
//    returned as STRINGS ("49.99"), not numbers. They are typed as string here.
//  - DB booleans (promo_valid, webhook_received, ...) come back as 1 | 0.
//  - Wallet balance/amount are the exception: real JS numbers.

/* ------------------------------------------------------------------ */
/* Auth & user                                                         */
/* ------------------------------------------------------------------ */

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  date_of_birth: string;
  nationality: string;
  country_of_residence: string;
  role: string;
}

export interface AuthResponse {
  success: true;
  token: string;
  user: AuthUser;
}

export interface VerifyResponse {
  success: true;
  user: AuthUser;
}

export interface MessageResponse {
  success: true;
  message: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  nationality: string;
  country_of_residence: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

/* ------------------------------------------------------------------ */
/* Promo                                                               */
/* ------------------------------------------------------------------ */

export interface PromoValidateResponse {
  ok: true;
  valid: true;
  percent: number;
}

/* ------------------------------------------------------------------ */
/* Orders — creation                                                   */
/* ------------------------------------------------------------------ */

export interface CheckoutItem {
  productId?: number | string;
  name: string;
  sku?: string;
  quantity: number;
  unitPrice: number;
}

/** Body for POST /api/user-orders (flat shape, documented aliases supported). */
export interface CreateOrderRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  customerName?: string;
  phone?: string;
  address?: string;
  city?: string;
  postcode?: string;
  country?: string;
  orderId?: string;
  promoCode?: string;
  promoDiscount?: number;
  subtotal?: number;
  discountAmount?: number;
  total?: number;
  createdAtIso?: string;
  items?: CheckoutItem[];
  paymentMethod?: string;
}

export interface CreateOrderResponse {
  success: true;
  // Despite the name, orderId here is the order-number STRING.
  orderId: string;
  orderNumber: string;
  email_debug?: {
    paymentLinkCreated: boolean;
    orderConfirmation: { attempted: boolean; ok: boolean; error: string | null };
    paymentCapture: { attempted: boolean; ok: boolean; error: string | null };
  };
}

/* ------------------------------------------------------------------ */
/* Orders — records                                                    */
/* ------------------------------------------------------------------ */

export interface OrderRow {
  id: number;
  order_number: string;
  user_id: number | null;
  customer_email: string;
  customer_name: string;
  customer_phone: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_state: string | null;
  shipping_zip: string | null;
  shipping_country: string | null;
  tracking_number: string | null;
  currency: string;
  subtotal: string;
  shipping: string;
  total: string;
  status: string;
  payment_status: string;
  payment_method: string;
  promo_code: string | null;
  promo_discount: string | null;
  discount_amount: string | null;
  created_at: string;
  updated_at: string | null;
  total_before_discount: string | null;
  total_after_discount: string | null;
  promo_discount_percent: string | null;
  promo_valid: 0 | 1;
  items_text: string | null;
  // ...other columns exist server-side; these are the ones the UI consumes.
  [key: string]: unknown;
}

export interface OrderItemRow {
  id: number;
  order_id: number;
  product_id: number | null;
  name: string;
  sku: string | null;
  quantity: number;
  unit_price: string;
  line_total: string;
}

export interface PaymentRow {
  id: number;
  order_id: number;
  user_id: number | null;
  provider: string;
  provider_id: string | null;
  amount: string;
  currency: string;
  status: string;
  webhook_received: 0 | 1;
  final_status: string | null;
  created_at: string;
  updated_at: string | null;
  [key: string]: unknown;
}

export interface OrdersByEmailResponse {
  orders: OrderRow[];
}

export interface OrderDetailResponse {
  order: OrderRow;
  items: OrderItemRow[];
  payments: PaymentRow[];
}

/* ------------------------------------------------------------------ */
/* Newsletter                                                          */
/* ------------------------------------------------------------------ */

export interface NewsletterRequest {
  email: string;
  consent: boolean;
  source?: string;
  website?: string; // honeypot — always empty
}

export interface NewsletterResponse {
  ok: true;
  id?: number;
  already_subscribed?: boolean;
}
