/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { apiUpsertHealthProfile, isLoggedIn } from "@/features/auth/_api";
import {
  MEDICAL_CONDITION_OPTIONS,
  PROFILE_ALLERGY_OPTIONS,
} from "@/features/profile/_interface";
import { onboardingSchema, OnboardingFormData } from ".";

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

export function useOnboarding() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      healthRisks: [],
      favorites: [],
      tastePreferences: [],
      dishTypes: [],
    },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setIsLoading(true);
    try {
      if (isLoggedIn()) {
        const { allergies, medicalConditions } = splitHealthRisks(
          data.healthRisks,
        );

        await apiUpsertHealthProfile({
          health_conditions: medicalConditions,
          allergies,
          preferred_ingredients: data.favorites,
          taste_profile: data.tastePreferences,
          dish_preferences: data.dishTypes,
          notes: "",
        });
      }
      toast.success("Đã lưu thông tin sở thích!");
      router.push("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Có lỗi xảy ra. Vui lòng thử lại.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  return {
    control: form.control,
    handleSubmit: form.handleSubmit,
    handleSkip,
    isLoading,
    onSubmit,
  };
}
