/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { apiFetch } from "@/features/auth/_api";
import type {
  FavoriteAddPayload,
  FavoriteFoodItem,
  FavoriteListResponse,
  FavoriteRecommendation,
  FavoritesQuery,
  FavoriteUpdatePayload,
} from "./_interface";

// ---------------------------------------------------------------------------
// List
// ---------------------------------------------------------------------------

export async function fetchFavorites(
  params: FavoritesQuery = {},
): Promise<FavoriteListResponse> {
  const q = new URLSearchParams();
  if (params.q) q.set("q", params.q);
  if (params.meal_context) q.set("meal_context", params.meal_context);
  if (params.rated_only) q.set("rated_only", "true");
  if (params.sort_by) q.set("sort_by", params.sort_by);
  if (params.sort_order) q.set("sort_order", params.sort_order);
  if (params.limit != null) q.set("limit", String(params.limit));
  if (params.offset != null) q.set("offset", String(params.offset));

  const qs = q.toString();
  const res = await apiFetch(`/users/me/favorites${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`fetchFavorites: HTTP ${res.status}`);
  return res.json() as Promise<FavoriteListResponse>;
}

// ---------------------------------------------------------------------------
// Add
// ---------------------------------------------------------------------------

export async function addFavorite(
  payload: FavoriteAddPayload,
): Promise<FavoriteFoodItem> {
  const res = await apiFetch("/users/me/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`addFavorite: HTTP ${res.status}`);
  return res.json() as Promise<FavoriteFoodItem>;
}

// ---------------------------------------------------------------------------
// Update
// ---------------------------------------------------------------------------

export async function updateFavorite(
  foodId: string,
  payload: FavoriteUpdatePayload,
): Promise<FavoriteFoodItem> {
  const res = await apiFetch(`/users/me/favorites/${foodId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`updateFavorite: HTTP ${res.status}`);
  return res.json() as Promise<FavoriteFoodItem>;
}

// ---------------------------------------------------------------------------
// Remove
// ---------------------------------------------------------------------------

export async function removeFavorite(foodId: string): Promise<void> {
  await apiFetch(`/users/me/favorites/${foodId}`, { method: "DELETE" });
}

// ---------------------------------------------------------------------------
// Check
// ---------------------------------------------------------------------------

export async function checkFavorite(
  foodId: string,
): Promise<{ is_favorite: boolean; food_id: string }> {
  const res = await apiFetch(`/users/me/favorites/${foodId}/check`);
  return res.json() as Promise<{ is_favorite: boolean; food_id: string }>;
}

// ---------------------------------------------------------------------------
// Recommendations
// ---------------------------------------------------------------------------

export async function fetchFavoriteRecommendations(
  limit = 6,
): Promise<FavoriteRecommendation[]> {
  const res = await apiFetch(
    `/users/me/favorites/recommendations?limit=${limit}`,
  );
  return res.json() as Promise<FavoriteRecommendation[]>;
}
