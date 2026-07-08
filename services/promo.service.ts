// Promo service — POST /api/promos/validate (public, no auth).
// Discounts are ALWAYS validated by the backend; the frontend never invents a
// percent. Returns null for invalid/unknown codes (documented 404 {valid:false}).

import { apiClient, ApiError } from "@/lib/apiClient";
import type { PromoValidateResponse } from "@/types/api";

export interface PromoResult {
  code: string;
  percent: number;
}

export async function validatePromo(rawCode: string): Promise<PromoResult | null> {
  const code = rawCode.trim().toUpperCase();
  if (!code) throw new ApiError("code is required", 400);
  try {
    const data = await apiClient.post<PromoValidateResponse>(
      "/api/promos/validate",
      { code }
    );
    if (!data.ok || !data.valid) return null;
    return { code, percent: Number(data.percent) || 0 };
  } catch (err) {
    // 404 => unknown/inactive code (documented as { ok:false, valid:false }).
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}
