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
  favorites: z.array(z.string()),
  dislikes: z.array(z.string()),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export type ProfilePreferenceVariant = "default" | "danger" | "success";
