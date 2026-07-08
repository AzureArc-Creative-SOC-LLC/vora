// Auth service — wraps the documented /api/auth/* endpoints.
// No business logic beyond mapping requests/responses and persisting the session.

import { apiClient } from "@/lib/apiClient";
import { setSession, clearSession } from "@/lib/session";
import type {
  AuthResponse,
  AuthUser,
  LoginRequest,
  RegisterRequest,
  VerifyResponse,
  MessageResponse,
} from "@/types/api";

export async function registerUser(
  payload: RegisterRequest,
  remember = true
): Promise<AuthUser> {
  const data = await apiClient.post<AuthResponse>("/api/auth/register", payload);
  setSession(data.token, data.user, remember);
  return data.user;
}

export async function loginUser(
  payload: LoginRequest,
  remember = true
): Promise<AuthUser> {
  const data = await apiClient.post<AuthResponse>("/api/auth/login", payload);
  setSession(data.token, data.user, remember);
  return data.user;
}

/** Validate the stored JWT against the service; returns the fresh user or null. */
export async function verifyUser(): Promise<AuthUser | null> {
  try {
    const data = await apiClient.get<VerifyResponse>("/api/auth/verify", {
      auth: true,
    });
    return data.success ? data.user : null;
  } catch {
    // apiClient already cleared the session on 401.
    return null;
  }
}

export async function forgotPassword(email: string): Promise<string> {
  const data = await apiClient.post<MessageResponse>("/api/auth/forgot-password", {
    email,
  });
  return data.message;
}

export async function resetPassword(
  token: string,
  password: string
): Promise<string> {
  const data = await apiClient.post<MessageResponse>("/api/auth/reset-password", {
    token,
    password,
  });
  return data.message;
}

export function logoutUser() {
  clearSession();
}
