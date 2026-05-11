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

import { profileSchema, ProfileFormData } from "@/features/profile/_interface";

export function useProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Người dùng Khách",
      email: "user@example.com",
      password: "",
      allergies: ["Sữa"],
      favorites: ["Phở", "Trà sữa"],
      dislikes: ["Hành lá"],
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Updated Profile Data:", data);

      toast.success("Cập nhật thông tin thành công!");
    } catch {
      toast.error("Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => router.push("/");

  return {
    control: form.control,
    errors: form.formState.errors,
    handleBack,
    handleSubmit: form.handleSubmit,
    isLoading,
    onSubmit,
    register: form.register,
  };
}
