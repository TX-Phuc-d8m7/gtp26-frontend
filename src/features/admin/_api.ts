/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import { apiFetch } from "@/features/auth/_api";

import type {
  AdminAiFeedbackVerdict,
  AdminAiFeedbackListResponse,
  AdminDashboardStats,
  AdminFoodFeedbackVerdict,
  AdminFoodRecommendationFeedbackListResponse,
} from ".";
import type {
  AdminFoodPayload,
  AdminFoodResult,
  AdminFoodListResponse,
  AdminFoodsQuery,
  AdminFoodUpdatePayload,
  RebuildEmbeddingResponse,
} from "./foods";
import type {
  AdminUserListResponse,
  AdminUserResult,
  AdminUserUpdate,
  AdminUsersQuery,
} from "./users";

async function parseAdminError(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as { detail?: unknown };
    if (typeof body.detail === "string") return body.detail;
    if (Array.isArray(body.detail)) {
      return body.detail
        .map((item) =>
          typeof item === "object" && item && "msg" in item
            ? String((item as { msg: unknown }).msg)
            : String(item),
        )
        .join("; ");
    }
  } catch {
    /* ignore */
  }

  return fallback;
}

async function requestJson<T>(path: string, fallbackError: string) {
  const response = await apiFetch(path);
  if (!response.ok) {
    throw new Error(await parseAdminError(response, fallbackError));
  }
  return response.json() as Promise<T>;
}

async function mutateJson<T>(
  path: string,
  fallbackError: string,
  options: RequestInit = {},
) {
  const response = await apiFetch(path, {
    method: options.method ?? "POST",
    ...options,
  });
  if (!response.ok) {
    throw new Error(await parseAdminError(response, fallbackError));
  }
  return response.json() as Promise<T>;
}

export async function fetchAdminDashboardStats(topLimit = 8) {
  return requestJson<AdminDashboardStats>(
    `/admin/analytics/dashboard-stats?top_limit=${topLimit}`,
    "Không thể tải thống kê admin.",
  );
}

export async function fetchAdminAiFeedback(
  params: {
    feedback?: AdminAiFeedbackVerdict;
    limit?: number;
    offset?: number;
  } = {},
) {
  const searchParams = new URLSearchParams();
  if (params.feedback) searchParams.set("feedback", params.feedback);
  searchParams.set("limit", String(params.limit ?? 6));
  searchParams.set("offset", String(params.offset ?? 0));

  return requestJson<AdminAiFeedbackListResponse>(
    `/admin/analytics/ai-feedback?${searchParams.toString()}`,
    "Không thể tải feedback AI.",
  );
}

export async function fetchAdminFoodRecommendationFeedback(
  params: {
    limit?: number;
    offset?: number;
    verdict?: AdminFoodFeedbackVerdict;
  } = {},
) {
  const searchParams = new URLSearchParams();
  if (params.verdict) searchParams.set("verdict", params.verdict);
  searchParams.set("limit", String(params.limit ?? 6));
  searchParams.set("offset", String(params.offset ?? 0));

  return requestJson<AdminFoodRecommendationFeedbackListResponse>(
    `/admin/analytics/food-feedback?${searchParams.toString()}`,
    "Không thể tải feedback món gợi ý.",
  );
}

export async function fetchAdminFoods(params: AdminFoodsQuery = {}) {
  const searchParams = new URLSearchParams();
  if (params.q?.trim()) searchParams.set("q", params.q.trim());
  if (params.has_embedding !== undefined) {
    searchParams.set("has_embedding", String(params.has_embedding));
  }
  searchParams.set("sort_by", params.sort_by ?? "name");
  searchParams.set("sort_order", params.sort_order ?? "asc");
  searchParams.set("limit", String(params.limit ?? 20));
  searchParams.set("offset", String(params.offset ?? 0));

  return requestJson<AdminFoodListResponse>(
    `/admin/foods?${searchParams.toString()}`,
    "Không thể tải danh sách món ăn admin.",
  );
}

export async function fetchAdminFood(foodId: string) {
  return requestJson<AdminFoodResult>(
    `/admin/foods/${foodId}`,
    "Không thể tải chi tiết món ăn.",
  );
}

export async function createAdminFood(
  payload: AdminFoodPayload,
  autoEmbed: boolean,
) {
  return mutateJson<AdminFoodResult>(
    `/admin/foods?auto_embed=${String(autoEmbed)}`,
    "Không thể tạo món ăn.",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

export async function updateAdminFood(
  foodId: string,
  payload: AdminFoodUpdatePayload,
) {
  return mutateJson<AdminFoodResult>(
    `/admin/foods/${foodId}`,
    "Không thể cập nhật món ăn.",
    {
      method: "PATCH",
      body: JSON.stringify(payload),
    },
  );
}

export async function deleteAdminFood(foodId: string) {
  const response = await apiFetch(`/admin/foods/${foodId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(await parseAdminError(response, "Không thể xóa món ăn."));
  }
}

export async function rebuildFoodKeys(foodId: string) {
  return mutateJson<AdminFoodResult>(
    `/admin/foods/${foodId}/rebuild-keys`,
    "Không thể sinh lại key nguyên liệu.",
  );
}

export async function rebuildFoodEmbedding(foodId: string) {
  return mutateJson<RebuildEmbeddingResponse>(
    `/admin/foods/${foodId}/embedding`,
    "Không thể sinh lại embedding.",
  );
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function fetchAdminUsers(params: AdminUsersQuery = {}) {
  const searchParams = new URLSearchParams();
  if (params.q?.trim()) searchParams.set("q", params.q.trim());
  if (params.role) searchParams.set("role", params.role);
  if (params.is_active !== undefined)
    searchParams.set("is_active", String(params.is_active));
  searchParams.set("limit", String(params.limit ?? 20));
  searchParams.set("offset", String(params.offset ?? 0));

  return requestJson<AdminUserListResponse>(
    `/admin/users?${searchParams.toString()}`,
    "Không thể tải danh sách người dùng.",
  );
}

export async function fetchAdminUser(userId: string) {
  return requestJson<AdminUserResult>(
    `/admin/users/${userId}`,
    "Không thể tải thông tin người dùng.",
  );
}

export async function updateAdminUser(userId: string, payload: AdminUserUpdate) {
  return mutateJson<AdminUserResult>(
    `/admin/users/${userId}`,
    "Không thể cập nhật tài khoản.",
    { method: "PATCH", body: JSON.stringify(payload) },
  );
}

export async function lockAdminUser(userId: string) {
  return mutateJson<AdminUserResult>(
    `/admin/users/${userId}/lock`,
    "Không thể khóa tài khoản.",
  );
}

export async function unlockAdminUser(userId: string) {
  return mutateJson<AdminUserResult>(
    `/admin/users/${userId}/unlock`,
    "Không thể mở khóa tài khoản.",
  );
}
