/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { apiForgotPassword } from "@/features/auth/_api";
import { useRedirectIfLoggedIn } from "@/shared/hooks/use-auth-redirect";

import { forgotPasswordSchema, ForgotPasswordFormData } from ".";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  /**
   * Demo mode: khi backend trả về reset_token thay vì gửi email,
   * hiện thông báo với nút chuyển hướng thủ công.
   */
  const [demoToken, setDemoToken] = useState<string | null>(null);
  const router = useRouter();
  useRedirectIfLoggedIn();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setServerError(null);
    setDemoToken(null);
    try {
      const result = await apiForgotPassword(data.email);
      if (result.reset_token) {
        // Demo mode: backend trả token thẳng → tự redirect sang trang đặt lại mật khẩu
        router.push(
          `/reset-password?token=${encodeURIComponent(result.reset_token)}`,
        );
      } else {
        // Production: hiện thông báo "kiểm tra email"
        setDemoToken("__sent__");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Có lỗi xảy ra. Vui lòng thử lại.";
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    demoToken,
    errors: form.formState.errors,
    handleSubmit: form.handleSubmit,
    isLoading,
    onSubmit,
    register: form.register,
    serverError,
  };
}
