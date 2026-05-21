import { Foods } from "@/features/foods";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tra cứu món ăn | Chatbot Ẩm Thực Đà Nẵng",
  description: "Tìm kiếm và xem thông tin chi tiết các món ăn đặc sản Đà Nẵng",
};

export default function SearchPage() {
  return <Foods />;
}
