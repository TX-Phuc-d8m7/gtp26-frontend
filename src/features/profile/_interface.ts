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
  password: z.string().optional(),
  allergies: z.array(z.string()),
  medicalConditions: z.array(z.string()),
  dietTypes: z.array(z.string()),
  favorites: z.array(z.string()),
  dislikes: z.array(z.string()),
  tastePreferences: z.array(z.string()),
  budgetLevels: z.array(z.string()),
  mealTimes: z.array(z.string()),
  nutritionGoals: z.array(z.string()),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export type ProfilePreferenceVariant = "default" | "danger" | "success";

export const MEDICAL_CONDITION_OPTIONS = [
  "Đau dạ dày",
  "Tiểu đường",
  "Huyết áp cao",
  "Mỡ máu",
  "Gout",
  "Dị ứng thời tiết",
];

export const DIET_TYPE_OPTIONS = [
  "Ăn chay",
  "Ít tinh bột",
  "Ít dầu mỡ",
  "Không sữa",
  "Không gluten",
  "Giảm đường",
];

export const TASTE_PREFERENCE_OPTIONS = [
  "Cay",
  "Ngọt",
  "Béo",
  "Thanh đạm",
  "Đậm vị",
  "Ít dầu",
  "Chua nhẹ",
  "Nhiều rau",
];

export const BUDGET_LEVEL_OPTIONS = [
  "Rẻ",
  "Trung bình",
  "Cao",
  "Sinh viên",
  "Ăn nhóm",
];

export const MEAL_TIME_OPTIONS = [
  "Bữa sáng",
  "Bữa trưa",
  "Bữa tối",
  "Ăn khuya",
  "Ăn nhẹ",
];

export const NUTRITION_GOAL_OPTIONS = [
  "Giảm cân",
  "Tăng cơ",
  "Ăn nhẹ bụng",
  "Phục hồi sức khỏe",
  "Bổ sung năng lượng",
  "Dễ tiêu hóa",
];
