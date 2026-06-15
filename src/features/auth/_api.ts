/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

/**
 * Auth & User API client
 * ─────────────────────
 * - Token CRUD (localStorage khi rememberMe=true, sessionStorage khi false)
 * - apiFetch với auto-refresh khi nhận 401
 * - Tất cả các hàm gọi API cho auth, account, health-profile
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_FOOD_AI_API_URL ?? "/api/backend";

export const AUTH_SESSION_EXPIRED_EVENT =
  "food-recommendation:auth-session-expired";

export type AuthSessionExpiredReason = "unauthorized" | "disabled";

export class AuthSessionError extends Error {
  reason: AuthSessionExpiredReason;

  constructor(message: string, reason: AuthSessionExpiredReason) {
    super(message);
    this.name = "AuthSessionError";
    this.reason = reason;
  }
}

export function isAuthSessionError(error: unknown): error is AuthSessionError {
  return error instanceof AuthSessionError;
}

function detectAuthSessionReason(
  message?: string | null,
): AuthSessionExpiredReason | null {
  const normalized = message?.toLowerCase() ?? "";

  if (
    normalized.includes("vô hiệu") ||
    normalized.includes("vo hieu") ||
    normalized.includes("disabled") ||
    normalized.includes("inactive") ||
    normalized.includes("deactivated")
  ) {
    return "disabled";
  }

  if (
    normalized.includes("unauthorized") ||
    normalized.includes("not authenticated") ||
    normalized.includes("token")
  ) {
    return "unauthorized";
  }

  return null;
}

function emitAuthSessionExpired(
  reason: AuthSessionExpiredReason,
  message: string,
) {
  clearTokens();

  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(AUTH_SESSION_EXPIRED_EVENT, {
      detail: { message, reason },
    }),
  );
}

function createAuthSessionError(
  message: string,
  fallbackReason: AuthSessionExpiredReason,
): AuthSessionError {
  const reason = detectAuthSessionReason(message) ?? fallbackReason;
  emitAuthSessionExpired(reason, message);
  return new AuthSessionError(message, reason);
}

export function createAuthSessionErrorFromMessage(
  message: string,
): AuthSessionError | null {
  const reason = detectAuthSessionReason(message);
  if (!reason) return null;

  emitAuthSessionExpired(reason, message);
  return new AuthSessionError(message, reason);
}

// ---------------------------------------------------------------------------
// Token storage keys
// ---------------------------------------------------------------------------

const KEYS = {
  ACCESS_TOKEN: "food-recommendation:access_token",
  REFRESH_TOKEN: "food-recommendation:refresh_token",
  IS_LOGGED_IN: "food-recommendation:isLoggedIn",
  ROLE: "food-recommendation:role",
  /** Flag persist trong localStorage để auto-refresh biết lưu đâu */
  REMEMBER_ME: "food-recommendation:rememberMe",
} as const;

/**
 * Đọc giá trị từ localStorage trước, fallback sang sessionStorage.
 * Cho phép đọc token dù user chọn chế độ nào.
 */
function getFromStorage(key: string): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key);
}

/**
 * Trả về storage để GHI dựa trên flag rememberMe đã lưu.
 * Dùng cho cả lần login thật và auto-refresh (luôn ghi đúng chỗ).
 */
function getWriteStorage(): Storage {
  const remembered =
    typeof window !== "undefined" &&
    window.localStorage.getItem(KEYS.REMEMBER_ME) === "true";
  return remembered ? window.localStorage : window.sessionStorage;
}

export function getAccessToken(): string | null {
  return getFromStorage(KEYS.ACCESS_TOKEN);
}

export function getRefreshToken(): string | null {
  return getFromStorage(KEYS.REFRESH_TOKEN);
}

export function getSavedRole(): string | null {
  return getFromStorage(KEYS.ROLE);
}

/**
 * Lưu tokens vào đúng storage.
 * @param remember  undefined = giữ nguyên lựa chọn cũ (dùng khi auto-refresh)
 *                  true      = localStorage (tồn tại qua session)
 *                  false     = sessionStorage (mất khi đóng tab)
 */
export function saveTokens(
  accessToken: string,
  refreshToken: string,
  role?: string,
  remember?: boolean,
): void {
  if (typeof window === "undefined") return;

  // Cập nhật flag preference nếu được truyền (login thật), bỏ qua nếu undefined (auto-refresh)
  if (remember === true) {
    window.localStorage.setItem(KEYS.REMEMBER_ME, "true");
  } else if (remember === false) {
    window.localStorage.removeItem(KEYS.REMEMBER_ME);
  }

  // Xóa token cũ ở cả 2 storage để tránh duplicate
  [window.localStorage, window.sessionStorage].forEach((s) => {
    s.removeItem(KEYS.ACCESS_TOKEN);
    s.removeItem(KEYS.REFRESH_TOKEN);
    s.removeItem(KEYS.IS_LOGGED_IN);
    s.removeItem(KEYS.ROLE);
  });

  const storage = getWriteStorage();
  storage.setItem(KEYS.ACCESS_TOKEN, accessToken);
  storage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
  storage.setItem(KEYS.IS_LOGGED_IN, "true");
  if (role) storage.setItem(KEYS.ROLE, role);
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  const allKeys = Object.values(KEYS);
  [window.localStorage, window.sessionStorage].forEach((s) => {
    allKeys.forEach((key) => s.removeItem(key));
  });
}

export function isLoggedIn(): boolean {
  return Boolean(getAccessToken());
}

// ---------------------------------------------------------------------------
// Base fetch với Bearer token + auto-refresh khi 401
// ---------------------------------------------------------------------------

let _refreshPromise: Promise<void> | null = null;

async function _doRefresh(): Promise<void> {
  const rt = getRefreshToken();
  if (!rt) {
    throw createAuthSessionError(
      "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
      "unauthorized",
    );
  }
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: rt }),
  });
  if (!res.ok) {
    throw createAuthSessionError(
      "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
      "unauthorized",
    );
  }
  const data: AuthTokenResponse = await res.json();
  saveTokens(data.access_token, data.refresh_token, data.role);
}

async function parseAuthErrorResponse(
  res: Response,
): Promise<AuthSessionError | null> {
  if (res.status !== 401 && res.status !== 403) return null;

  const message = await parseError(res.clone(), "");
  const reason = detectAuthSessionReason(message);
  if (!reason) return null;

  return createAuthSessionError(message, reason);
}

export async function apiFetch(
  path: string,
  options: RequestInit = {},
  _skipRefresh = false,
): Promise<Response> {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  // Auto-refresh on 401 (singleton promise để tránh race condition)
  if (res.status === 401 && !_skipRefresh) {
    if (!_refreshPromise) {
      _refreshPromise = _doRefresh().finally(() => {
        _refreshPromise = null;
      });
    }
    try {
      await _refreshPromise;
    } catch (error) {
      if (isAuthSessionError(error)) throw error;
      throw createAuthSessionError(
        "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
        "unauthorized",
      );
    }
    return apiFetch(path, options, true);
  }

  const authError = await parseAuthErrorResponse(res);
  if (authError) throw authError;

  return res;
}

/** Parse lỗi từ response FastAPI — luôn trả về string để toast */
async function parseError(res: Response, fallback: string): Promise<string> {
  try {
    const body = await res.json();
    if (typeof body.detail === "string") return body.detail;
    if (Array.isArray(body.detail))
      return body.detail.map((e: { msg: string }) => e.msg).join("; ");
  } catch {
    /* ignore */
  }
  return fallback;
}

// ---------------------------------------------------------------------------
// Types (mirror backend schemas, chỉ những field FE cần)
// ---------------------------------------------------------------------------

export interface AuthTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
  user_id: string;
  email: string;
  full_name: string | null;
  role: string;
}

export interface UserResult {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface UserHealthProfile {
  id: string;
  user_id: string;
  health_conditions: string[];
  allergies: string[];
  preferred_ingredients: string[];
  taste_profile: string[];
  dish_preferences: string[];
  notes: string;
  updated_at: string;
}

export interface HealthProfilePayload {
  health_conditions: string[];
  allergies: string[];
  preferred_ingredients: string[];
  taste_profile: string[];
  dish_preferences: string[];
  notes: string;
}

// ---------------------------------------------------------------------------
// Auth APIs (không cần token)
// ---------------------------------------------------------------------------

export async function apiLogin(
  email: string,
  password: string,
): Promise<AuthTokenResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await parseError(res, "Đăng nhập thất bại."));
  return res.json();
}

export async function apiSignup(
  email: string,
  password: string,
  fullName?: string,
): Promise<AuthTokenResponse> {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      full_name: fullName?.trim() || undefined,
    }),
  });
  if (!res.ok) throw new Error(await parseError(res, "Đăng ký thất bại."));
  return res.json();
}

/** Logout — revoke refresh token ở backend, xóa tokens local */
export async function apiLogout(): Promise<void> {
  const rt = getRefreshToken();
  const at = getAccessToken();
  if (at) {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${at}`,
      },
      body: JSON.stringify({ refresh_token: rt ?? undefined }),
    }).catch(() => {
      /* silent — tokens bị xóa local dù server lỗi */
    });
  }
  clearTokens();
}

// ---------------------------------------------------------------------------
// Authenticated APIs
// ---------------------------------------------------------------------------

export async function apiGetMe(): Promise<UserResult> {
  const res = await apiFetch("/auth/me");
  if (!res.ok)
    throw new Error(
      await parseError(res, "Không thể tải thông tin tài khoản."),
    );
  return res.json();
}

export async function apiUpdateAccount(payload: {
  email?: string;
  full_name?: string;
}): Promise<UserResult> {
  const res = await apiFetch("/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error(await parseError(res, "Cập nhật tài khoản thất bại."));
  return res.json();
}

export async function apiChangePassword(
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const res = await apiFetch("/auth/change-password", {
    method: "POST",
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  });
  if (!res.ok) throw new Error(await parseError(res, "Đổi mật khẩu thất bại."));
}

/** Trả null nếu profile chưa được tạo (404) */
export async function apiGetHealthProfile(): Promise<UserHealthProfile | null> {
  const res = await apiFetch("/users/me/health-profile");
  if (res.status === 404) return null;
  if (!res.ok)
    throw new Error(await parseError(res, "Không thể tải hồ sơ sức khỏe."));
  return res.json();
}

// ---------------------------------------------------------------------------
// Forgot / Reset password (không cần token)
// ---------------------------------------------------------------------------

export interface ForgotPasswordResponse {
  message: string;
  /** DEMO ONLY — production sẽ gửi qua email, không trả về trực tiếp */
  reset_token?: string | null;
}

export async function apiForgotPassword(
  email: string,
): Promise<ForgotPasswordResponse> {
  const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok)
    throw new Error(await parseError(res, "Yêu cầu đặt lại mật khẩu thất bại."));
  return res.json();
}

export async function apiResetPassword(
  token: string,
  newPassword: string,
): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, new_password: newPassword }),
  });
  if (!res.ok)
    throw new Error(await parseError(res, "Đặt lại mật khẩu thất bại."));
}

// ---------------------------------------------------------------------------

/** PUT — tạo mới hoặc thay thế hoàn toàn health profile */
export async function apiUpsertHealthProfile(
  payload: HealthProfilePayload,
): Promise<UserHealthProfile> {
  const res = await apiFetch("/users/me/health-profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  if (!res.ok)
    throw new Error(await parseError(res, "Lưu hồ sơ sức khỏe thất bại."));
  return res.json();
}
