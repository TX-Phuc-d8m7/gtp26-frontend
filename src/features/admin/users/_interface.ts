/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

export interface AdminUserResult {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface AdminUserListResponse {
  total: number;
  limit: number;
  offset: number;
  items: AdminUserResult[];
}

export interface AdminUserUpdate {
  role?: "user" | "admin";
  is_active?: boolean;
  full_name?: string;
}

export interface AdminUsersQuery {
  q?: string;
  role?: "user" | "admin";
  is_active?: boolean;
  limit?: number;
  offset?: number;
}

export type UserRoleFilter = "all" | "user" | "admin";
export type UserStatusFilter = "all" | "active" | "inactive";

export interface AdminUsersState {
  detailUser: AdminUserResult | null;
  isDetailOpen: boolean;
  page: number;
  roleFilter: UserRoleFilter;
  rowsPerPage: number;
  searchTerm: string;
  statusFilter: UserStatusFilter;
  total: number;
  users: AdminUserResult[];
}
