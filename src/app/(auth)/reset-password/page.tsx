import { Suspense } from "react";
import type { Metadata } from "next";
import { ResetPassword } from "@/features/auth/reset-password";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu",
  description: "Đặt lại mật khẩu mới cho tài khoản của bạn",
};

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}
