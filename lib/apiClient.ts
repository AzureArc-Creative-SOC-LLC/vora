// Reusable API client built on fetch — the project's native HTTP mechanism.
// Fulfils the same responsibilities as an Axios instance with interceptors:
//   • single base URL from an env var
//   • request "interceptor": inject Authorization: Bearer <token>
//   • response "interceptor": parse JSON, normalise errors, handle 401
//   • timeout via AbortController
//   • lightweight retry for transient network errors on idempotent GETs
//   • consistent ApiError mapping across the varied response envelopes
//
// The documented service does NOT use one error envelope, so getMessage()
// checks every documented shape ({error}, {ok,error}, {message}).

import { getToken, clearSession } from "@/lib/session";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.microservices.tech";

const DEFAULT_TIMEOUT = 20_000;

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
  /** True for offline / aborted / DNS style failures (no HTTP response). */
  get isNetwork() {
    return this.status === 0;
  }
}

function messageFrom(data: unknown, fallback: string): string {
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    if (typeof d.error === "string") return d.error;
    if (typeof d.message === "string") return d.message;
  }
  return fallback;
}

export interface RequestOptions {
  /** Attach the stored Bearer token (default: false — most routes are public). */
  auth?: boolean;
  /** Per-request timeout in ms. */
  timeout?: number;
  /** Retry attempts for network errors on GET (default 1). */
  retries?: number;
  signal?: AbortSignal;
  headers?: Record<string, string>;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  opts: RequestOptions = {}
): Promise<T> {
  const { auth = false, timeout = DEFAULT_TIMEOUT, retries = method === "GET" ? 1 : 0 } =
    opts;

  const url = path.startsWith("http") ? path : `${API_BASE}${path}`;

  // --- request interceptor: headers + auth ---
  const headers: Record<string, string> = { ...opts.headers };
  const isForm = typeof FormData !== "undefined" && body instanceof FormData;
  if (body !== undefined && !isForm) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    // chain an externally-provided signal
    if (opts.signal) {
      if (opts.signal.aborted) controller.abort();
      else opts.signal.addEventListener("abort", () => controller.abort());
    }

    try {
      const res = await fetch(url, {
        method,
        headers,
        body: body === undefined ? undefined : isForm ? (body as FormData) : JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timer);

      const text = await res.text();
      let data: unknown = null;
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }

      // --- response interceptor ---
      if (!res.ok) {
        // 401 → token invalid/expired: clear the session so the app can redirect.
        if (res.status === 401 && auth) clearSession();
        throw new ApiError(
          messageFrom(data, `Request failed (${res.status})`),
          res.status,
          data
        );
      }

      return data as T;
    } catch (err) {
      clearTimeout(timer);
      if (err instanceof ApiError) throw err;

      // network/abort/timeout — retry idempotent GETs, otherwise surface.
      const aborted = err instanceof DOMException && err.name === "AbortError";
      const msg = aborted
        ? "Request timed out. Please try again."
        : "Network error. Please check your connection and try again.";
      if (attempt < retries) {
        attempt += 1;
        continue;
      }
      throw new ApiError(msg, 0, err);
    }
  }
}

export const apiClient = {
  get: <T>(path: string, opts?: RequestOptions) => request<T>("GET", path, undefined, opts),
  post: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>("POST", path, body, opts),
  put: <T>(path: string, body?: unknown, opts?: RequestOptions) =>
    request<T>("PUT", path, body, opts),
  del: <T>(path: string, opts?: RequestOptions) => request<T>("DELETE", path, undefined, opts),
};
