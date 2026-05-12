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

import { onboardingSchema, OnboardingFormData } from ".";

const AUTH_STORAGE_KEY = "food-recommendation:isLoggedIn";

export function useOnboarding() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      allergies: [],
      favorites: [],
      dislikes: [],
    },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Onboarding Data:", data);
      window.localStorage.setItem(AUTH_STORAGE_KEY, "true");

      toast.success("Đã lưu thông tin sở thích!");
      router.push("/");
    } catch {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
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
