/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

export interface AdminFoodResult {
  id: string;
  name: string;
  description: string;
  img_url?: string | null;
  core_ingredients: string[];
  raw_ingredients: string[];
  raw_instructions: string;
  core_ingredient_keys: string[];
  soft_tags: string[];
  taste_profile: string[];
  meal_context: string[];
  occasion_context: string[];
  has_embedding: boolean;
}

export interface AdminFoodListResponse {
  total: number;
  limit: number;
  offset: number;
  items: AdminFoodResult[];
}

export interface AdminFoodPayload {
  name: string;
  description: string;
  img_url?: string | null;
  core_ingredients: string[];
  raw_ingredients: string[];
  raw_instructions: string;
  soft_tags: string[];
  taste_profile: string[];
  meal_context: string[];
  occasion_context: string[];
}

export type AdminFoodUpdatePayload = Partial<AdminFoodPayload>;

export interface AdminFoodsQuery {
  q?: string;
  has_embedding?: boolean;
  sort_by?: "name" | "relevance";
  sort_order?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface RebuildEmbeddingResponse {
  food_id: string;
  success: boolean;
  message: string;
}

export type EmbeddingFilter = "all" | "ready" | "missing";

export interface AdminFoodStats {
  total: number;
  ready: number;
  missing: number;
}

export type AdminFoodFormMode = "create" | "edit";

export type AdminFoodFormField =
  | "name"
  | "description"
  | "img_url"
  | "core_ingredients"
  | "raw_ingredients"
  | "raw_instructions"
  | "soft_tags"
  | "taste_profile"
  | "meal_context"
  | "occasion_context";

/** Chip-based fields (multi-select) */
export type AdminFoodChipFormField =
  | "taste_profile"
  | "meal_context"
  | "occasion_context"
  | "soft_tags";

export const ADMIN_FOOD_TASTE_OPTIONS = [
  "Béo ngậy",
  "Cay",
  "Chua",
  "Mặn",
  "Ngọt",
  "Đắng",
  "Đậm đà",
  "Thanh đạm",
] as const;

export const ADMIN_FOOD_MEAL_CONTEXT_OPTIONS = [
  "Ăn sáng",
  "Ăn trưa",
  "Ăn chiều / xế",
  "Ăn tối",
  "Ăn khuya",
] as const;

export const ADMIN_FOOD_OCCASION_OPTIONS = [
  "Ấm bụng",
  "Ăn no",
  "Ăn vặt",
  "Giải cảm",
  "Giải rượu",
  "Mồi nhậu",
  "Tráng miệng",
] as const;

export const ADMIN_FOOD_SOFT_TAG_OPTIONS = [
  "Ẩm thực đường phố",
  "Bánh ngọt",
  "Cháo",
  "Chiên / Rán",
  "Cuốn / Gói",
  "Dai / Sần sật",
  "Dễ tiêu",
  "Đặc sản Đà Nẵng",
  "Giàu chất xơ",
  "Giàu đạm",
  "Giàu tinh bột",
  "Giàu vitamin",
  "Giòn / Giòn rụm",
  "Gỏi / Nộm / Trộn",
  "Hải sản",
  "Hấp / Luộc",
  "Healthy / Eat Clean",
  "Hầm / Ninh",
  "Kho/Rim",
  "Khó tiêu / Nặng bụng",
  "Lẩu",
  "Mềm",
  "Món Á",
  "Món Âu",
  "Món chay",
  "Món khô",
  "Món lạnh",
  "Món nước",
  "Món Việt truyền thống",
  "Nhiều dầu mỡ / Calo cao",
  "Nóng hổi",
  "Nội tạng",
  "Nướng",
  "Nước sền sệt",
  "Rang",
  "Sống/Chín tái",
  "Súp",
  "Thanh mát/Giải nhiệt",
  "Thức ăn nhanh",
  "Thực phẩm chế biến sẵn",
  "Từ sữa / Phô mai",
  "Xào",
] as const;

export const ADMIN_FOOD_SOFT_TAG_GROUPS = [
  {
    label: "Cách nấu",
    options: [
      "Lẩu",
      "Nướng",
      "Hấp / Luộc",
      "Chiên / Rán",
      "Xào",
      "Rang",
      "Hầm / Ninh",
      "Kho/Rim",
      "Gỏi / Nộm / Trộn",
      "Cuốn / Gói",
      "Súp",
      "Cháo",
      "Món nước",
      "Món khô",
      "Nước sền sệt",
    ],
  },
  {
    label: "Phong cách món",
    options: [
      "Món chay",
      "Healthy / Eat Clean",
      "Ẩm thực đường phố",
      "Món Việt truyền thống",
      "Món Á",
      "Món Âu",
      "Thức ăn nhanh",
      "Đặc sản Đà Nẵng",
    ],
  },
  {
    label: "Dinh dưỡng",
    options: [
      "Giàu chất xơ",
      "Giàu đạm",
      "Giàu vitamin",
      "Giàu tinh bột",
      "Từ sữa / Phô mai",
      "Thực phẩm chế biến sẵn",
      "Bánh ngọt",
      "Nội tạng",
      "Hải sản",
      "Dễ tiêu",
      "Khó tiêu / Nặng bụng",
      "Nhiều dầu mỡ / Calo cao",
    ],
  },
  {
    label: "Texture / nhiệt độ",
    options: [
      "Nóng hổi",
      "Thanh mát/Giải nhiệt",
      "Món lạnh",
      "Giòn / Giòn rụm",
      "Dai / Sần sật",
      "Mềm",
      "Sống/Chín tái",
    ],
  },
] as const;

export interface AdminFoodFormState {
  name: string;
  description: string;
  img_url: string;
  core_ingredients: string;
  raw_ingredients: string;
  raw_instructions: string;
  soft_tags: string[];
  taste_profile: string[];
  meal_context: string[];
  occasion_context: string[];
  autoEmbed: boolean;
}

export type AdminFoodFormErrors = Partial<
  Record<AdminFoodFormField, string>
>;

export interface AdminFoodsState {
  deleteTarget: AdminFoodResult | null;
  detailFood: AdminFoodResult | null;
  embeddingFilter: EmbeddingFilter;
  formData: AdminFoodFormState;
  formErrors: AdminFoodFormErrors;
  formMode: AdminFoodFormMode;
  formTarget: AdminFoodResult | null;
  foods: AdminFoodResult[];
  isDeleteOpen: boolean;
  isDetailOpen: boolean;
  isFormOpen: boolean;
  page: number;
  rowsPerPage: number;
  searchTerm: string;
  total: number;
}
