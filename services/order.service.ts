// Order service — the documented Order endpoints.
//   POST   /api/user-orders                 create order (primary checkout)
//   GET    /api/user-orders/by-email?email=  order history for an email
//   GET    /api/user-orders/:orderNumber     order details (order/items/payments)
//   PUT    /api/user-orders/:orderNumber     limited status update
//
// Money fields in responses stay as strings (per docs) — format only at display.

import { apiClient } from "@/lib/apiClient";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  OrdersByEmailResponse,
  OrderDetailResponse,
  OrderRow,
} from "@/types/api";

export async function createOrder(
  payload: CreateOrderRequest
): Promise<CreateOrderResponse> {
  return apiClient.post<CreateOrderResponse>("/api/user-orders", payload);
}

export async function getOrdersByEmail(email: string): Promise<OrderRow[]> {
  const data = await apiClient.get<OrdersByEmailResponse>(
    `/api/user-orders/by-email?email=${encodeURIComponent(email.trim())}`
  );
  return data.orders ?? [];
}

export async function getOrderByNumber(
  orderNumber: string
): Promise<OrderDetailResponse> {
  return apiClient.get<OrderDetailResponse>(
    `/api/user-orders/${encodeURIComponent(orderNumber.trim())}`
  );
}

export async function updateOrder(
  orderNumber: string,
  fields: Partial<Pick<OrderRow, "status" | "payment_status" | "tracking_number">>
): Promise<void> {
  await apiClient.put(`/api/user-orders/${encodeURIComponent(orderNumber)}`, fields);
}
