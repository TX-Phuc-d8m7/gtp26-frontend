/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import type {
  ApiFilterOptions,
  ApiFoodDetail,
  ApiFoodListResponse,
} from "./_interface";

const BASE_URL =
  process.env.NEXT_PUBLIC_FOOD_AI_API_URL ?? "http://localhost:8000";

// ---------------------------------------------------------------------------
// Filter options — module-level cache
// Chỉ fetch 1 lần duy nhất trong suốt phiên làm việc.
// Nếu đã pre-warm từ chat page, khi search panel mở sẽ nhận kết quả ngay.
// ---------------------------------------------------------------------------

let _filterOptionsCache: ApiFilterOptions | null = null;
let _filterOptionsInflight: Promise<ApiFilterOptions> | null = null;

/** Lấy tất cả giá trị filter options — có cache module-level */
export async function fetchFilterOptions(): Promise<ApiFilterOptions> {
  if (_filterOptionsCache) return _filterOptionsCache;
  if (_filterOptionsInflight) return _filterOptionsInflight;

  _filterOptionsInflight = fetch(`${BASE_URL}/foods/filter-options`)
    .then(async (res) => {
      if (!res.ok) throw new Error(`fetchFilterOptions: HTTP ${res.status}`);
      return res.json() as Promise<ApiFilterOptions>;
    })
    .then((data) => {
      _filterOptionsCache = data;
      _filterOptionsInflight = null;
      return data;
    })
    .catch((err) => {
      _filterOptionsInflight = null;
      throw err;
    });

  return _filterOptionsInflight;
}

/**
 * Gọi hàm này ngay khi load trang chat để pre-warm cache.
 * Khi user mở food search, tag chips sẽ hiện ngay mà không cần đợi fetch.
 */
export function prewarmFilterOptions(): void {
  if (!_filterOptionsCache && !_filterOptionsInflight) {
    fetchFilterOptions().catch(() => {/* silent — will retry when search opens */});
  }
}

// ---------------------------------------------------------------------------
// Food list
// ---------------------------------------------------------------------------

export interface FetchFoodsParams {
  q?: string;
  sort_by?: "name" | "relevance";
  sort_order?: "asc" | "desc";
  limit?: number;
  offset?: number;
  // Multi-select filters — mapped directly to backend query params
  taste_profile?: string[];
  meal_context?: string[];
  occasion_context?: string[];
  dish_type?: string[];
  diet_style?: string[];
  nutrition?: string[];
  texture?: string[];
  soft_tags?: string[];
  ingredients?: string[];
}

/** Duyệt / tìm kiếm danh sách món ăn — pure SQL, không qua LLM */
export async function fetchFoods(
  params: FetchFoodsParams = {},
  signal?: AbortSignal,
): Promise<ApiFoodListResponse> {
  const urlParams = new URLSearchParams();

  if (params.q) urlParams.set("q", params.q);
  if (params.sort_by) urlParams.set("sort_by", params.sort_by);
  if (params.sort_order) urlParams.set("sort_order", params.sort_order);
  if (params.limit !== undefined) urlParams.set("limit", String(params.limit));
  if (params.offset !== undefined)
    urlParams.set("offset", String(params.offset));

  const arrayFields = [
    "taste_profile",
    "meal_context",
    "occasion_context",
    "dish_type",
    "diet_style",
    "nutrition",
    "texture",
    "soft_tags",
    "ingredients",
  ] as const;

  for (const field of arrayFields) {
    const values = params[field];
    if (values) {
      for (const value of values) {
        urlParams.append(field, value);
      }
    }
  }

  const res = await fetch(`${BASE_URL}/foods?${urlParams.toString()}`, {
    signal,
  });
  if (!res.ok) throw new Error(`fetchFoods: HTTP ${res.status}`);
  return res.json() as Promise<ApiFoodListResponse>;
}

// ---------------------------------------------------------------------------
// Food detail
// ---------------------------------------------------------------------------

/** Chi tiết đầy đủ một món ăn + trạng thái yêu thích (nếu đã đăng nhập) */
export async function fetchFoodDetail(foodId: string): Promise<ApiFoodDetail> {
  const res = await fetch(`${BASE_URL}/foods/${foodId}`);
  if (!res.ok) throw new Error(`fetchFoodDetail: HTTP ${res.status}`);
  return res.json() as Promise<ApiFoodDetail>;
}
