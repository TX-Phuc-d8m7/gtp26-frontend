/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

/**
 * Auth & User API client
 * ─────────────────────
 * - Token CRUD (sessionStorage)
 * - apiFetch với auto-refresh khi nhận 401
 * - Tất cả các hàm gọi API cho auth, account, health-profile
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_FOOD_AI_API_URL ?? "/api/backend";

// ---------------------------------------------------------------------------
// Token storage keys
// ---------------------------------------------------------------------------

const KEYS = {
  ACCESS_TOKEN: "food-recommendation:access_token",
  REFRESH_TOKEN: "food-recommendation:refresh_token",
  IS_LOGGED_IN: "food-recommendation:isLoggedIn", // giữ để header dùng được
  ROLE: "food-recommendation:role",
} as const;

function getTokenStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage;
}

function clearLegacyLocalTokens(): void {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((key) => window.localStorage.removeItem(key));
}

export function getAccessToken(): string | null {
  return getTokenStorage()?.getItem(KEYS.ACCESS_TOKEN) ?? null;
}

export function getRefreshToken(): string | null {
  return getTokenStorage()?.getItem(KEYS.REFRESH_TOKEN) ?? null;
}

export function saveTokens(
  accessToken: string,
  refreshToken: string,
  role?: string,
): void {
  const storage = getTokenStorage();
  if (!storage) return;
  clearLegacyLocalTokens();
  storage.setItem(KEYS.ACCESS_TOKEN, accessToken);
  storage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
  storage.setItem(KEYS.IS_LOGGED_IN, "true");
  if (role) storage.setItem(KEYS.ROLE, role);
}

export function getSavedRole(): string | null {
  return getTokenStorage()?.getItem(KEYS.ROLE) ?? null;
}

export function clearTokens(): void {
  const storage = getTokenStorage();
  Object.values(KEYS).forEach((key) => storage?.removeItem(key));
  clearLegacyLocalTokens();
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
    clearTokens();
    throw new Error("UNAUTHORIZED");
  }
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: rt }),
  });
  if (!res.ok) {
    clearTokens();
    throw new Error("UNAUTHORIZED");
  }
  const data: AuthTokenResponse = await res.json();
  saveTokens(data.access_token, data.refresh_token, data.role);
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
    } catch {
      throw new Error("UNAUTHORIZED");
    }
    return apiFetch(path, options, true);
  }

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
