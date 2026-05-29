/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { AdminFoods } from "@/features/admin/foods";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kho món ăn | Foodie Suggest Admin",
  description: "Quản lý món ăn, trạng thái embedding và tác vụ index",
};

export default function AdminFoodsPage() {
  return <AdminFoods />;
}
