/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

// ---------------------------------------------------------------------------
// API types — mirror Pydantic schemas từ backend /users/me/favorites
// ---------------------------------------------------------------------------

export interface FavoriteFoodItem {
  id: string;           // UUID của bản ghi favorite
  food_id: string;      // UUID món ăn
  notes: string;
  rating: number | null;
  created_at: string;
  food: {
    id: string;
    name: string;
    description: string;
    img_url: string | null;
    core_ingredients: string[];
    soft_tags: string[];
    taste_profile: string[];
    meal_context: string[];
    occasion_context: string[];
    raw_ingredients: string[];
    raw_instructions: string;
  };
}

export interface FavoriteListResponse {
  total: number;
  limit: number;
  offset: number;
  items: FavoriteFoodItem[];
}

export interface FavoriteAddPayload {
  food_id: string;
  notes?: string;
  rating?: number | null;
}

export interface FavoriteUpdatePayload {
  notes?: string;
  rating?: number | null;
}

export interface FavoriteRecommendation {
  id: string;
  name: string;
  description: string;
  img_url: string | null;
  soft_tags: string[];
  taste_profile: string[];
  meal_context: string[];
  similarity_score: number;
}

// ---------------------------------------------------------------------------
// UI state types
// ---------------------------------------------------------------------------

export type FavoriteSortBy = "created_at" | "name" | "rating";
export type FavoriteSortOrder = "asc" | "desc";

export interface FavoritesQuery {
  q?: string;
  meal_context?: string;
  rated_only?: boolean;
  sort_by?: FavoriteSortBy;
  sort_order?: FavoriteSortOrder;
  limit?: number;
  offset?: number;
}

export interface FavoritesState {
  items: FavoriteFoodItem[];
  total: number;
  page: number;
  rowsPerPage: number;
  searchTerm: string;
  sortBy: FavoriteSortBy;
  sortOrder: FavoriteSortOrder;
  ratedOnly: boolean;
  editingItem: FavoriteFoodItem | null;
}
