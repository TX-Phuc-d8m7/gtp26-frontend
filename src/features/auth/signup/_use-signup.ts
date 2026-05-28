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

import { apiSignup, saveTokens } from "@/features/auth/_api";
import { useRedirectIfLoggedIn } from "@/shared/hooks/use-auth-redirect";
import { signupSchema, SignupFormData } from ".";

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  useRedirectIfLoggedIn();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const result = await apiSignup(data.email, data.password, data.fullName);
      saveTokens(result.access_token, result.refresh_token, result.role);

      toast.success("Đăng ký thành công! Hãy chọn sở thích ẩm thực của bạn.");
      router.push("/onboarding");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Đăng ký thất bại.";
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errors: form.formState.errors,
    handleSubmit: form.handleSubmit,
    isLoading,
    onSubmit,
    register: form.register,
    serverError,
  };
}
