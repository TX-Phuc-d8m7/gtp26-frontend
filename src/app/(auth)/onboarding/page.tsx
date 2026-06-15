import { Onboarding } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cá nhân hoá trải nghiệm",
  description: "Cá nhân hóa trải nghiệm với Chatbot gợi ý món ăn tại Đà Nẵng",
};

export default function OnboardingPage() {
  return <Onboarding />;
}
