/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  apiChangePassword,
  apiGetHealthProfile,
  apiGetMe,
  apiUpdateAccount,
  apiUpsertHealthProfile,
  isLoggedIn,
} from "@/features/auth/_api";
import {
  INGREDIENT_DISPLAY_TO_VALUE,
  INGREDIENT_VALUE_TO_DISPLAY,
  MEDICAL_CONDITION_OPTIONS,
  PROFILE_ALLERGY_OPTIONS,
  profileSchema,
  ProfileFormData,
} from "@/features/profile/_interface";
import { useRequireAuth } from "@/shared/hooks/use-auth-redirect";

// ---------------------------------------------------------------------------
// Mapping helpers: form ↔ backend health-profile
// ---------------------------------------------------------------------------

function mergeHealthRisks(
  allergies: string[],
  medicalConditions: string[],
): string[] {
  const supportedHealthRiskSet = new Set([
    ...MEDICAL_CONDITION_OPTIONS,
    ...PROFILE_ALLERGY_OPTIONS,
  ]);

  return [...medicalConditions, ...allergies].filter((risk) =>
    supportedHealthRiskSet.has(risk),
  );
}

function splitHealthRisks(healthRisks: string[]): {
  allergies: string[];
  medicalConditions: string[];
} {
  const allergySet = new Set(PROFILE_ALLERGY_OPTIONS);
  const medicalConditionSet = new Set(MEDICAL_CONDITION_OPTIONS);

  const allergies: string[] = [];
  const medicalConditions: string[] = [];

  for (const risk of healthRisks) {
    if (medicalConditionSet.has(risk)) medicalConditions.push(risk);
    else if (allergySet.has(risk)) allergies.push(risk);
  }

  return { allergies, medicalConditions };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

const EMPTY_DEFAULTS: ProfileFormData = {
  fullName: "",
  email: "",
  currentPassword: "",
  password: "",
  confirmPassword: "",
  healthRisks: [],
  dishTypes: [],
  favorites: [],
  tastePreferences: [],
};

export function useProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();
  useRequireAuth();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: EMPTY_DEFAULTS,
  });

  // -------------------------------------------------------------------------
  // Load profile từ API khi mount
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!isLoggedIn()) {
      setIsFetching(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const [user, healthProfile] = await Promise.all([
          apiGetMe(),
          apiGetHealthProfile(),
        ]);

        if (cancelled) return;

        const healthRisks = mergeHealthRisks(
          healthProfile?.allergies ?? [],
          healthProfile?.health_conditions ?? [],
        );

        form.reset({
          fullName: user.full_name ?? "",
          email: user.email,
          currentPassword: "",
          password: "",
          healthRisks,
          dishTypes: healthProfile?.dish_preferences ?? [],
          favorites: (healthProfile?.preferred_ingredients ?? []).map(
            (v) => INGREDIENT_VALUE_TO_DISPLAY[v] ?? v,
          ),
          tastePreferences: healthProfile?.taste_profile ?? [],
        });
      } catch {
        if (!cancelled) {
          toast.error("Không thể tải thông tin hồ sơ.");
        }
      } finally {
        if (!cancelled) setIsFetching(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [form]);

  // -------------------------------------------------------------------------
  // Save — gọi 2–3 API song song / tuần tự
  // -------------------------------------------------------------------------

  const onSubmit = async (data: ProfileFormData) => {
    if (!isLoggedIn()) {
      toast.error("Vui lòng đăng nhập để lưu hồ sơ.");
      router.push("/login");
      return;
    }

    setIsLoading(true);
    const errors: string[] = [];

    // 1. Cập nhật account (tên + email)
    try {
      await apiUpdateAccount({
        full_name: data.fullName,
        email: data.email,
      });
    } catch (err) {
      errors.push(
        err instanceof Error ? err.message : "Lỗi cập nhật tài khoản.",
      );
    }

    // 2. Đổi mật khẩu — chỉ khi user điền đủ cả currentPassword VÀ password mới
    if (data.currentPassword?.trim() && data.password?.trim()) {
      try {
        await apiChangePassword(
          data.currentPassword.trim(),
          data.password.trim(),
        );
      } catch (err) {
        errors.push(err instanceof Error ? err.message : "Lỗi đổi mật khẩu.");
      }
    }

    // 3. Upsert health profile
    try {
      const { allergies, medicalConditions } = splitHealthRisks(
        data.healthRisks,
      );

      await apiUpsertHealthProfile({
        health_conditions: medicalConditions,
        allergies,
        preferred_ingredients: data.favorites.map(
          (v) => INGREDIENT_DISPLAY_TO_VALUE[v] ?? v,
        ),
        taste_profile: data.tastePreferences,
        dish_preferences: data.dishTypes,
        notes: "",
      });
    } catch (err) {
      errors.push(
        err instanceof Error ? err.message : "Lỗi lưu hồ sơ sức khỏe.",
      );
    }

    setIsLoading(false);

    if (errors.length > 0) {
      toast.error(errors[0]);
      if (errors.length > 1) {
        console.warn("Profile save partial errors:", errors.slice(1));
      }
    } else {
      // Reset dirty state, xóa password fields sau khi lưu thành công
      form.reset({ ...form.getValues(), currentPassword: "", password: "", confirmPassword: "" });
      toast.success("Cập nhật thông tin thành công!");
    }
  };

  const handleBack = () => router.push("/chat");

  return {
    control: form.control,
    errors: form.formState.errors,
    handleBack,
    handleSubmit: form.handleSubmit,
    isDirty: form.formState.isDirty,
    isFetching,
    isLoading,
    onSubmit,
    register: form.register,
    profileValues: form.watch(),
  };
}
