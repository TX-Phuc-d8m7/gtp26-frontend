import { Onboarding } from "@/features/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sở thích ẩm thực | Chatbot Ẩm Thực Đà Nẵng",
  description: "Cá nhân hóa trải nghiệm với Chatbot gợi ý món ăn tại Đà Nẵng",
};

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50 p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <div className="w-full">
        <Onboarding />
      </div>
    </div>
  );
}
