import { Profile } from "@/features/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hồ sơ cá nhân",
  description: "Quản lý thông tin và sở thích ẩm thực cá nhân",
};

export default function ProfilePage() {
  return <Profile />;
}
