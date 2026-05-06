import ProfileForm from "@/components/profile/ProfileForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân | Chatbot Ẩm Thực Đà Nẵng",
  description: "Quản lý thông tin và sở thích ẩm thực cá nhân",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background/50 p-4 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      <ProfileForm />
    </div>
  );
}
