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
import { loginSchema, LoginFormData } from ".";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await apiLogin(data.email, data.password);
      saveTokens(result.access_token, result.refresh_token);

      toast.success("Đăng nhập thành công!");
      router.push("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Đăng nhập thất bại.";
      toast.error(message);
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
  };
}
