import { z } from "zod";

export const onboardingSchema = z.object({
  allergies: z.array(z.string()).optional().default([]),
  favorites: z.array(z.string()).optional().default([]),
  dislikes: z.array(z.string()).optional().default([]),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;

// Mock data for options
export const ALLERGY_OPTIONS = [
  "Đậu phộng", "Hải sản", "Sữa", "Trứng", "Gluten", "Đậu nành", "Các loại hạt"
];

export const FAVORITE_OPTIONS = [
  "Phở", "Bún bò", "Cơm tấm", "Bánh mì", "Hải sản", "Đồ nướng", "Lẩu", "Trà sữa", "Mì cay", "Món chay"
];

export const DISLIKE_OPTIONS = [
  "Hành lá", "Rau mùi", "Đồ cay", "Mắm tôm", "Mỡ động vật", "Đồ ngọt", "Nội tạng"
];
