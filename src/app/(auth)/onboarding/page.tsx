import { Onboarding } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sở thích ẩm thực | Chatbot Ẩm Thực Đà Nẵng",
  description: "Cá nhân hóa trải nghiệm với Chatbot gợi ý món ăn tại Đà Nẵng",
};

export default function OnboardingPage() {
  return <Onboarding />;
}
