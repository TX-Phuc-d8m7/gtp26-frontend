/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

export interface FoodSearchUIProps {
  onClose?: () => void;
}

// ---------------------------------------------------------------------------
// API types — mirror các Pydantic schema từ backend (app/modules/foods/schemas.py)
// ---------------------------------------------------------------------------

/** Một món ăn trong danh sách — FoodListItem từ backend */
export interface ApiFood {
  id: string; // UUID
  name: string;
  description: string;
  img_url: string | null;
  core_ingredients: string[];
  soft_tags: string[];
  taste_profile: string[];
  meal_context: string[];
  occasion_context: string[];
}

/** Chi tiết đầy đủ một món ăn — FoodDetailResponse từ backend */
export interface ApiFoodDetail extends ApiFood {
  raw_ingredients: string[];
  raw_instructions: string;
  is_favorite?: boolean | null;
  user_rating?: number | null;
  user_notes?: string | null;
}

/** Response của GET /foods */
export interface ApiFoodListResponse {
  total: number;
  limit: number;
  offset: number;
  items: ApiFood[];
}

/** Response của GET /foods/filter-options */
export interface ApiFilterOptions {
  taste_profile: string[];
  meal_context: string[];
  occasion_context: string[];
  dish_type: string[];
  diet_style: string[];
  nutrition: string[];
  texture: string[];
}

// ---------------------------------------------------------------------------
// UI state types
// ---------------------------------------------------------------------------

export interface RankedFood {
  food: ApiFood;
  score: number;
  matchedTerms: string[];
}

export interface SearchSuggestion {
  id: string;
  label: string;
  type: "dish" | "tag" | "ingredient";
}

export interface FoodSearchState {
  query: string;
  selectedTags: string[];
  selectedFood: ApiFoodDetail | null;
}
