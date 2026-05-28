import { FavoritesPage } from "@/features/favorites";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Món yêu thích | Chatbot Ẩm Thực Đà Nẵng",
  description: "Danh sách món ăn yêu thích của bạn",
};

export default function FavoritesRoute() {
  return <FavoritesPage />;
}
