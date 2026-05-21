/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { z } from "zod";

export const profileSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z
    .string()
    .min(1, "Email không được để trống")
    .email("Email không đúng định dạng"),
  currentPassword: z.string().optional(),
  password: z.string().optional(),
  healthRisks: z.array(z.string()),
  dishTypes: z.array(z.string()),
  favorites: z.array(z.string()),
  tastePreferences: z.array(z.string()),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export type ProfilePreferenceVariant = "default" | "danger" | "success";

export const MEDICAL_CONDITION_OPTIONS = [
  "Béo phì",
  "Bệnh lý hô hấp trên (Ho/Viêm họng/Cảm/Amidan)",
  "Cao huyết áp",
  "Gout",
  "Nhiệt miệng / Loét miệng",
  "Tim mạch",
  "Tiểu đường",
  "Viêm loét dạ dày",
  "Đầy bụng / Khó tiêu",
];

export const PROFILE_ALLERGY_OPTIONS = [
  "Dị ứng cá có vây",
  "Dị ứng sữa bò",
  "Dị ứng trứng",
  "Dị ứng đậu phộng",
  "Dị ứng động vật giáp xác",
  "Dị ứng động vật thân mềm",
];

export const HEALTH_RISK_OPTIONS = [
  ...MEDICAL_CONDITION_OPTIONS,
  ...PROFILE_ALLERGY_OPTIONS,
];

export const FAVORITE_INGREDIENT_OPTIONS = [
  "Thịt gà",
  "Thịt bò",
  "Thịt heo",
  "Cá",
  "Tôm",
  "Mực",
  "Trứng",
  "Đậu hũ",
  "Nấm",
  "Rau xanh",
  "Bún",
  "Mì",
  "Gạo",
];

export const TASTE_PREFERENCE_OPTIONS = [
  "Béo ngậy",
  "Cay",
  "Chua",
  "Mặn",
  "Ngọt",
  "Đắng",
  "Đậm đà",
  "Thanh đạm",
];

export const DISH_TYPE_OPTIONS = [
  "Cháo",
  "Chiên / Rán",
  "Cuốn / Gói",
  "Gỏi / Nộm / Trộn",
  "Hấp / Luộc",
  "Hầm / Ninh",
  "Kho/Rim",
  "Lẩu",
  "Món khô",
  "Món nước",
  "Nướng",
  "Nước sền sệt",
  "Rang",
  "Súp",
  "Xào",
];
