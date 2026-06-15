/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { apiResetPassword } from "@/features/auth/_api";
import { useRedirectIfLoggedIn } from "@/shared/hooks/use-auth-redirect";

import { resetPasswordSchema, ResetPasswordFormData } from ".";

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  useRedirectIfLoggedIn();

  /** Token đến từ URL query param ?token=... (backend trả về trong demo mode) */
  const tokenFromUrl = searchParams.get("token") ?? "";

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!tokenFromUrl) {
      setServerError("Link không hợp lệ. Vui lòng yêu cầu đặt lại mật khẩu mới.");
      return;
    }

    setIsLoading(true);
    setServerError(null);
    try {
      await apiResetPassword(tokenFromUrl, data.newPassword);
      toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.");
      router.push("/login");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Có lỗi xảy ra. Vui lòng thử lại.";
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    errors: form.formState.errors,
    handleSubmit: form.handleSubmit,
    hasToken: Boolean(tokenFromUrl),
    isLoading,
    onSubmit,
    register: form.register,
    serverError,
  };
}
