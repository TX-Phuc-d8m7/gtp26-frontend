import { Login } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập | Chatbot Ẩm Thực Đà Nẵng",
  description: "Đăng nhập vào hệ thống Chatbot gợi ý món ăn tại Đà Nẵng",
};

export default function LoginPage() {
  return <Login />;
}
