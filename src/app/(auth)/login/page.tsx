import { Login } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập | Chatbot Ẩm Thực Đà Nẵng",
  description: "Đăng nhập vào hệ thống Chatbot gợi ý món ăn tại Đà Nẵng",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50 p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      <Login />
    </div>
  );
}
