import { Signup } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng ký | Chatbot Ẩm Thực Đà Nẵng",
  description: "Đăng ký tài khoản để khám phá ẩm thực Đà Nẵng cùng Chatbot",
};

export default function SignupPage() {
  return <Signup />;
}
