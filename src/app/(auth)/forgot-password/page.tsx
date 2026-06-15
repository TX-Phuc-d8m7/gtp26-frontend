import { Suspense } from "react";
import type { Metadata } from "next";
import { ForgotPassword } from "@/features/auth/forgot-password";

export const metadata: Metadata = {
  title: "Quên mật khẩu",
  description: "Đặt lại mật khẩu tài khoản hệ thống gợi ý món ăn Đà Nẵng",
};

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPassword />
    </Suspense>
  );
}
