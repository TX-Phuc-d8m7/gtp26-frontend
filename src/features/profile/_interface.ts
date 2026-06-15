/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { z } from "zod";

export const profileSchema = z
  .object({
    fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    email: z
      .string()
      .min(1, "Email không được để trống")
      .email("Email không đúng định dạng"),
    currentPassword: z.string().optional(),
    password: z
      .string()
      .optional()
      .refine(
        (val) => !val || val.length >= 6,
        "Mật khẩu mới phải có ít nhất 6 ký tự",
      ),
    confirmPassword: z.string().optional(),
    healthRisks: z.array(z.string()),
    dishTypes: z.array(z.string()),
    favorites: z.array(z.string()),
    tastePreferences: z.array(z.string()),
  })
  .refine(
    (data) => {
      // Nếu nhập mật khẩu mới → bắt buộc phải có mật khẩu hiện tại
      if (data.password?.trim() && !data.currentPassword?.trim()) return false;
      return true;
    },
    {
      message: "Vui lòng nhập mật khẩu hiện tại để xác nhận",
      path: ["currentPassword"],
    },
  )
  .refine(
    (data) => {
      // Nếu nhập mật khẩu hiện tại → bắt buộc phải có mật khẩu mới
      if (data.currentPassword?.trim() && !data.password?.trim()) return false;
      return true;
    },
    {
      message: "Vui lòng nhập mật khẩu mới",
      path: ["password"],
    },
  )
  .refine(
    (data) => {
      // Nếu nhập mật khẩu mới → confirmPassword phải khớp
      if (data.password?.trim() && data.password !== data.confirmPassword)
        return false;
      return true;
    },
    {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"],
    },
  );

export type ProfileFormData = z.infer<typeof profileSchema>;

export type ProfilePreferenceVariant = "default" | "danger" | "success";

export const MEDICAL_CONDITION_OPTIONS = [
  "Béo phì",
  "Cao huyết áp",
  "Viêm loét dạ dày",
];

export const PROFILE_ALLERGY_OPTIONS = [
  "Dị ứng sữa bò",
  "Dị ứng động vật giáp xác",
  "Dị ứng động vật thân mềm",
];

export const HEALTH_RISK_DISPLAY_LABELS: Record<string, string> = {
  "Dị ứng động vật giáp xác": "Dị ứng giáp xác",
  "Dị ứng động vật thân mềm": "Dị ứng thân mềm",
};

export const getHealthRiskDisplayLabel = (value: string) =>
  HEALTH_RISK_DISPLAY_LABELS[value] ?? value;

export const DEMO_HEALTH_RISK_OPTIONS = [
  {
    label: "Dị ứng giáp xác",
    value: "Dị ứng động vật giáp xác",
  },
  {
    label: "Dị ứng thân mềm",
    value: "Dị ứng động vật thân mềm",
  },
  {
    label: "Dị ứng sữa bò",
    value: "Dị ứng sữa bò",
  },
  {
    label: "Cao huyết áp",
    value: "Cao huyết áp",
  },
  {
    label: "Viêm loét dạ dày",
    value: "Viêm loét dạ dày",
  },
  {
    label: "Béo phì",
    value: "Béo phì",
  },
];

export const HEALTH_RISK_OPTIONS = DEMO_HEALTH_RISK_OPTIONS;

// Display labels shown in UI → must be converted to backend values before API calls.
// Backend accepted values: "Gà","Bò","Heo","Tôm","Mực","Nấm","Rau","Vịt"
// Display labels shown in UI → must be converted to backend values before API calls.
// Backend accepted values: "Gà","Bò","Heo","Tôm","Mực","Nấm","Rau","Vịt"
// Display labels shown in UI → must be converted to backend values before API calls.
export const FAVORITE_INGREDIENT_OPTIONS = [
  "Thịt gà",
  "Thịt bò",
  "Thịt heo",
  "Cá",
  "Tôm",
  "Mực",
  "Trứng",
  "Nấm",
  "Rau xanh",
  "Vịt",
];

export const INGREDIENT_DISPLAY_TO_VALUE: Record<string, string> = {
  "Thịt gà": "Gà",
  "Thịt bò": "Bò",
  "Thịt heo": "Heo",
  "Cá": "Cá",
  "Tôm": "Tôm",
  "Mực": "Mực",
  "Trứng": "Trứng",
  "Nấm": "Nấm",
  "Rau xanh": "Rau",
  "Vịt": "Vịt",
};

export const INGREDIENT_VALUE_TO_DISPLAY: Record<string, string> = {
  "Gà": "Thịt gà",
  "Bò": "Thịt bò",
  "Heo": "Thịt heo",
  "Cá": "Cá",
  "Tôm": "Tôm",
  "Mực": "Mực",
  "Trứng": "Trứng",
  "Nấm": "Nấm",
  "Rau": "Rau xanh",
  "Vịt": "Vịt",
};

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
  "Kho / Rim",
  "Lẩu",
  "Món khô",
  "Món nước",
  "Nướng",
  "Nước sền sệt",
  "Rang",
  "Súp",
  "Xào",
];
