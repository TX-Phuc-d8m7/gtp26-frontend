/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { apiGetMe } from "@/features/auth/_api";

import {
  fetchAdminUsers,
  lockAdminUser,
  unlockAdminUser,
  updateAdminUser,
} from "../_api";
import type {
  AdminUserResult,
  AdminUsersState,
  UserRoleFilter,
  UserStatusFilter,
} from ".";

const DEFAULT_ROWS_PER_PAGE = 20;
const SEARCH_DEBOUNCE_MS = 280;

function toRoleParam(filter: UserRoleFilter) {
  if (filter === "user") return "user" as const;
  if (filter === "admin") return "admin" as const;
  return undefined;
}

function toActiveParam(filter: UserStatusFilter) {
  if (filter === "active") return true;
  if (filter === "inactive") return false;
  return undefined;
}

export function useAdminUsers() {
  const router = useRouter();
  const [state, setState] = useState<AdminUsersState>({
    detailUser: null,
    isDetailOpen: false,
    page: 0,
    roleFilter: "all",
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    searchTerm: "",
    statusFilter: "all",
    total: 0,
    users: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionUserId, setActionUserId] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const query = useMemo(
    () => ({
      is_active: toActiveParam(state.statusFilter),
      limit: state.rowsPerPage,
      offset: state.page * state.rowsPerPage,
      q: state.searchTerm,
      role: toRoleParam(state.roleFilter),
    }),
    [state.page, state.roleFilter, state.rowsPerPage, state.searchTerm, state.statusFilter],
  );

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const me = await apiGetMe();
      if (me.role !== "admin") {
        router.replace("/chat");
        return;
      }
      const result = await fetchAdminUsers(query);
      setState((prev) => ({
        ...prev,
        users: result.items,
        total: result.total,
      }));
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        router.push("/login");
        return;
      }
      setError(
        err instanceof Error
          ? err.message
          : "Không thể tải danh sách người dùng.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [query, router]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const delay = state.searchTerm.trim() ? SEARCH_DEBOUNCE_MS : 0;
    debounceRef.current = setTimeout(() => {
      void loadUsers();
    }, delay);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [loadUsers, state.searchTerm]);

  // ─── Filters / pagination ─────────────────────────────────────────────────

  const setSearchTerm = (value: string) =>
    setState((prev) => ({ ...prev, page: 0, searchTerm: value }));

  const setRoleFilter = (value: UserRoleFilter) =>
    setState((prev) => ({ ...prev, page: 0, roleFilter: value }));

  const setStatusFilter = (value: UserStatusFilter) =>
    setState((prev) => ({ ...prev, page: 0, statusFilter: value }));

  const setPage = (page: number) =>
    setState((prev) => ({ ...prev, page }));

  const setRowsPerPage = (rowsPerPage: number) =>
    setState((prev) => ({ ...prev, page: 0, rowsPerPage }));

  // ─── Detail drawer ────────────────────────────────────────────────────────

  const openDetailDrawer = (user: AdminUserResult) => {
    setActionMessage(null);
    setState((prev) => ({ ...prev, detailUser: user, isDetailOpen: true }));
  };

  const closeDetailDrawer = () =>
    setState((prev) => ({ ...prev, isDetailOpen: false }));

  // ─── Actions ─────────────────────────────────────────────────────────────

  const handleLockUser = async (user: AdminUserResult) => {
    setActionUserId(user.id);
    setActionMessage(null);
    try {
      const result = await lockAdminUser(user.id);
      setActionMessage(`Đã khóa tài khoản ${user.email}.`);
      setState((prev) => ({
        ...prev,
        detailUser: prev.detailUser?.id === user.id ? result : prev.detailUser,
        users: prev.users.map((u) => (u.id === user.id ? result : u)),
      }));
    } catch (err) {
      setActionMessage(
        err instanceof Error ? err.message : "Không thể khóa tài khoản.",
      );
    } finally {
      setActionUserId(null);
    }
  };

  const handleUnlockUser = async (user: AdminUserResult) => {
    setActionUserId(user.id);
    setActionMessage(null);
    try {
      const result = await unlockAdminUser(user.id);
      setActionMessage(`Đã mở khóa tài khoản ${user.email}.`);
      setState((prev) => ({
        ...prev,
        detailUser: prev.detailUser?.id === user.id ? result : prev.detailUser,
        users: prev.users.map((u) => (u.id === user.id ? result : u)),
      }));
    } catch (err) {
      setActionMessage(
        err instanceof Error ? err.message : "Không thể mở khóa tài khoản.",
      );
    } finally {
      setActionUserId(null);
    }
  };

  const handleChangeRole = async (
    user: AdminUserResult,
    newRole: "user" | "admin",
  ) => {
    setActionUserId(user.id);
    setActionMessage(null);
    try {
      const result = await updateAdminUser(user.id, { role: newRole });
      setActionMessage(
        newRole === "admin"
          ? `Đã thăng quyền ${user.email} lên Admin.`
          : `Đã hạ quyền ${user.email} về User.`,
      );
      setState((prev) => ({
        ...prev,
        detailUser: prev.detailUser?.id === user.id ? result : prev.detailUser,
        users: prev.users.map((u) => (u.id === user.id ? result : u)),
      }));
    } catch (err) {
      setActionMessage(
        err instanceof Error ? err.message : "Không thể cập nhật quyền.",
      );
    } finally {
      setActionUserId(null);
    }
  };

  return {
    actionMessage,
    actionUserId,
    closeDetailDrawer,
    error,
    handleChangeRole,
    handleLockUser,
    handleUnlockUser,
    isLoading,
    loadUsers,
    openDetailDrawer,
    setPage,
    setRoleFilter,
    setRowsPerPage,
    setSearchTerm,
    setStatusFilter,
    state,
  };
}
