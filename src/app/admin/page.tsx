/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Admin } from "@/features/admin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console | Foodie Suggest",
  description: "Bảng điều khiển vận hành hệ thống gợi ý món ăn Đà Nẵng",
};

export default function AdminPage() {
  return <Admin />;
}
