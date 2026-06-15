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
  /** "restaurant" | "home_cooked" | "both" */
  dining_context?: string | null;
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
  dining_context?: string | null;
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

/** Một hàng trong danh sách nguyên liệu có cấu trúc */
export interface RawIngredientRow {
  name: string;
  quantity: string;
  unit: string;
}

/** Các đơn vị nguyên liệu phổ biến trong ẩm thực Việt */
export const RAW_INGREDIENT_UNITS = [
  "",
  "g", "kg",
  "ml", "l",
  "muỗng cà phê", "muỗng canh",
  "chén",
  "củ", "quả", "trái",
  "lá", "nhánh",
  "miếng", "bó",
  "hộp", "gói", "túi",
  "ít", "vừa đủ",
] as const;

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
  | "occasion_context"
  | "dining_context";

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

/**
 * Toàn bộ valid soft_tags — khớp 1:1 với VALID_SOFT_TAGS ở backend.
 * Dùng để phát hiện "legacy tags" (tag trong DB nhưng ngoài chuẩn).
 */
export const ADMIN_FOOD_SOFT_TAG_OPTIONS = [
  // Vị chủ đạo
  "Đậm đà", "Thanh đạm", "Chua", "Cay", "Mặn", "Ngọt", "Đắng", "Béo ngậy",
  // Nhiệt độ & cảm giác
  "Nóng hổi", "Thanh mát / Giải nhiệt", "Món lạnh",
  // Kết cấu
  "Giòn / Giòn rụm", "Dai / Sần sật", "Mềm", "Sống / Chín tái",
  // Dạng món
  "Món nước", "Món khô", "Nước sền sệt",
  // Phương pháp chế biến
  "Chiên / Rán", "Nướng", "Hấp / Luộc", "Xào",
  "Gỏi / Nộm / Trộn", "Cuốn / Gói", "Hầm / Ninh",
  "Lẩu", "Kho / Rim", "Súp", "Cháo", "Rang",
  // Địa phương & Danh mục
  "Đặc sản Đà Nẵng", "Ẩm thực đường phố", "Món Việt truyền thống",
  "Món Á", "Món Âu", "Thức ăn nhanh", "Món chay", "Hải sản",
  "Ăn sáng", "Ăn trưa", "Ăn tối", "Ăn chiều / xế", "Ăn khuya",
  "Ăn no", "Ăn vặt", "Mồi nhậu", "Tráng miệng",
  "Giải rượu", "Giải cảm", "Ấm bụng",
  // Dinh dưỡng
  "Giàu chất xơ", "Giàu đạm", "Giàu vitamin", "Giàu tinh bột",
  "Nội tạng", "Từ sữa / Phô mai", "Thực phẩm chế biến sẵn", "Bánh ngọt",
  // Tiêu hoá
  "Dễ tiêu", "Khó tiêu / Nặng bụng", "Healthy / Eat Clean", "Nhiều dầu mỡ / Calo cao",
] as const;

/**
 * Các nhóm hiển thị trong form admin — khớp cấu trúc VALID_SOFT_TAGS backend.
 * Mỗi tag chỉ xuất hiện trong DUY NHẤT một group.
 */
export const ADMIN_FOOD_SOFT_TAG_GROUPS = [
  {
    label: "Phương pháp chế biến",
    options: [
      "Chiên / Rán", "Nướng", "Hấp / Luộc", "Xào",
      "Gỏi / Nộm / Trộn", "Cuốn / Gói", "Hầm / Ninh",
      "Lẩu", "Kho / Rim", "Súp", "Cháo", "Rang",
    ],
  },
  {
    label: "Dạng món",
    options: ["Món nước", "Món khô", "Nước sền sệt"],
  },
  {
    label: "Kết cấu & Nhiệt độ",
    options: [
      "Giòn / Giòn rụm", "Dai / Sần sật", "Mềm", "Sống / Chín tái",
      "Nóng hổi", "Thanh mát / Giải nhiệt", "Món lạnh",
    ],
  },
  {
    label: "Phong cách & Địa phương",
    options: [
      "Đặc sản Đà Nẵng", "Ẩm thực đường phố", "Món Việt truyền thống",
      "Món Á", "Món Âu", "Thức ăn nhanh", "Món chay", "Hải sản",
    ],
  },
  {
    label: "Dinh dưỡng",
    options: [
      "Giàu chất xơ", "Giàu đạm", "Giàu vitamin", "Giàu tinh bột",
      "Nội tạng", "Từ sữa / Phô mai", "Thực phẩm chế biến sẵn", "Bánh ngọt",
    ],
  },
  {
    label: "Tiêu hoá & Sức khoẻ",
    options: [
      "Dễ tiêu", "Khó tiêu / Nặng bụng", "Healthy / Eat Clean", "Nhiều dầu mỡ / Calo cao",
    ],
  },
] as const;

export interface AdminFoodFormState {
  name: string;
  description: string;
  img_url: string;
  /** Auto-derived từ raw_ingredients — không nhập trực tiếp */
  core_ingredients: string[];
  /** Danh sách có cấu trúc: tên + số lượng + đơn vị */
  raw_ingredients: RawIngredientRow[];
  raw_instructions: string;
  soft_tags: string[];
  taste_profile: string[];
  meal_context: string[];
  occasion_context: string[];
  dining_context: string;
  autoEmbed: boolean;
}

export const ADMIN_FOOD_DINING_CONTEXT_OPTIONS = [
  { value: "both", label: "Cả hai (mặc định)", description: "Hiện ở cả chat và food library, nhưng không gợi ý quán" },
  { value: "restaurant", label: "Chỉ quán / nhà hàng", description: "Hiện nút \"Quán gần đây\" — dùng cho phở, bún, hủ tiếu…" },
  { value: "home_cooked", label: "Chỉ nấu tại nhà", description: "Ẩn nút \"Quán gần đây\" — dùng cho canh, cơm nhà…" },
] as const;

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
