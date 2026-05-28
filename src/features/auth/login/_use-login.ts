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

import { apiLogin, saveTokens } from "@/features/auth/_api";
import { useRedirectIfLoggedIn } from "@/shared/hooks/use-auth-redirect";
import { loginSchema, LoginFormData } from ".";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  useRedirectIfLoggedIn();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const result = await apiLogin(data.email, data.password);
      saveTokens(result.access_token, result.refresh_token, result.role);

      toast.success("Đăng nhập thành công!");
      router.push(result.role === "admin" ? "/admin" : "/chat");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Đăng nhập thất bại.";
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
