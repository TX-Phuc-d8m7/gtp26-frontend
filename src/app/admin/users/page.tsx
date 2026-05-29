/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { AdminUsers } from "@/features/admin/users";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Người dùng | Foodie Suggest Admin",
  description: "Quản lý tài khoản, phân quyền và trạng thái người dùng",
};

export default function AdminUsersPage() {
  return <AdminUsers />;
}
