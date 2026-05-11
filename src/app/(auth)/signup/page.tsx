import { Signup } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký | Chatbot Ẩm Thực Đà Nẵng",
  description: "Đăng ký tài khoản để khám phá ẩm thực Đà Nẵng cùng Chatbot",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50 p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      <Signup />
    </div>
  );
}
