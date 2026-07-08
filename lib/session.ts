// Secure-ish token/session storage for the Customer JWT.
// The token is stored in localStorage (persistent login) or sessionStorage
// (this-tab only), never both. A "vora-auth" event lets in-tab listeners
// (e.g. the navbar account button) react immediately; the native "storage"
// event covers cross-tab sync.

import type { AuthUser } from "@/types/api";

const TOKEN_KEY = "vora-token";
const USER_KEY = "vora-session";
export const AUTH_EVENT = "vora-auth";

function emit() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_EVENT));
  }
}

export function setSession(token: string, user: AuthUser, remember: boolean) {
  if (typeof window === "undefined") return;
  try {
    const store = remember ? window.localStorage : window.sessionStorage;
    const other = remember ? window.sessionStorage : window.localStorage;
    store.setItem(TOKEN_KEY, token);
    store.setItem(USER_KEY, JSON.stringify(user));
    other.removeItem(TOKEN_KEY);
    other.removeItem(USER_KEY);
    emit();
  } catch {
    /* storage unavailable */
  }
}

export function setStoredUser(user: AuthUser) {
  if (typeof window === "undefined") return;
  try {
    const store = window.localStorage.getItem(TOKEN_KEY)
      ? window.localStorage
      : window.sessionStorage;
    store.setItem(USER_KEY, JSON.stringify(user));
    emit();
  } catch {
    /* ignore */
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return (
      window.localStorage.getItem(TOKEN_KEY) ||
      window.sessionStorage.getItem(TOKEN_KEY)
    );
  } catch {
    return null;
  }
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw =
      window.localStorage.getItem(USER_KEY) ||
      window.sessionStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    emit();
  } catch {
    /* ignore */
  }
}
