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

import { signupSchema, SignupFormData } from ".";

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Signup Data:", data);

      toast.success("Đăng ký thành công! Hãy chọn sở thích ẩm thực của bạn.");
      router.push("/onboarding");
    } catch {
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
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
