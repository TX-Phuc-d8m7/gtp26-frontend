/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { apiGetMe } from "@/features/auth/_api";

import {
  deleteAdminQueryLog,
  fetchAdminQueryLogs,
} from "../_api";
import type {
  AdminQueryLogResult,
  AdminQueryLogsState,
} from ".";

const DEFAULT_ROWS_PER_PAGE = 20;
const SEARCH_DEBOUNCE_MS = 300;

export function useAdminQueryLogs() {
  const router = useRouter();
  const [state, setState] = useState<AdminQueryLogsState>({
    logs: [],
    total: 0,
    page: 0,
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    searchTerm: "",
    fromDate: "",
    toDate: "",
    detailLog: null,
    isDetailOpen: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const query = useMemo(
    () => ({
      limit: state.rowsPerPage,
      offset: state.page * state.rowsPerPage,
      q: state.searchTerm,
      from_date: state.fromDate || undefined,
      to_date: state.toDate || undefined,
    }),
    [state.page, state.rowsPerPage, state.searchTerm, state.fromDate, state.toDate],
  );

  const loadLogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const me = await apiGetMe();
      if (me.role !== "admin") {
        router.replace("/chat");
        return;
      }
      const result = await fetchAdminQueryLogs(query);
      setState((prev) => ({
        ...prev,
        logs: result.items,
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
          : "Không thể tải lịch sử truy vấn.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [query, router]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const delay = state.searchTerm.trim() ? SEARCH_DEBOUNCE_MS : 0;
    debounceRef.current = setTimeout(() => {
      void loadLogs();
    }, delay);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [loadLogs, state.searchTerm]);

  // ─── Filters / pagination ─────────────────────────────────────────────────

  const setSearchTerm = (value: string) =>
    setState((prev) => ({ ...prev, page: 0, searchTerm: value }));

  const setFromDate = (value: string) =>
    setState((prev) => ({ ...prev, page: 0, fromDate: value }));

  const setToDate = (value: string) =>
    setState((prev) => ({ ...prev, page: 0, toDate: value }));

  const setPage = (page: number) =>
    setState((prev) => ({ ...prev, page }));

  const setRowsPerPage = (rowsPerPage: number) =>
    setState((prev) => ({ ...prev, page: 0, rowsPerPage }));

  const clearFilters = () =>
    setState((prev) => ({ ...prev, page: 0, searchTerm: "", fromDate: "", toDate: "" }));

  // ─── Detail drawer ────────────────────────────────────────────────────────

  const openDetailDrawer = (log: AdminQueryLogResult) => {
    setState((prev) => ({ ...prev, detailLog: log, isDetailOpen: true }));
  };

  const closeDetailDrawer = () =>
    setState((prev) => ({ ...prev, isDetailOpen: false }));

  // ─── Delete ───────────────────────────────────────────────────────────────

  const handleDeleteLog = async (log: AdminQueryLogResult) => {
    setIsDeletingId(log.id);
    try {
      await deleteAdminQueryLog(log.id);
      toast.success("Đã xóa log truy vấn.");
      setState((prev) => ({
        ...prev,
        logs: prev.logs.filter((l) => l.id !== log.id),
        total: Math.max(0, prev.total - 1),
        isDetailOpen: prev.detailLog?.id === log.id ? false : prev.isDetailOpen,
        detailLog: prev.detailLog?.id === log.id ? null : prev.detailLog,
      }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không thể xóa log.");
    } finally {
      setIsDeletingId(null);
    }
  };

  return {
    clearFilters,
    closeDetailDrawer,
    error,
    handleDeleteLog,
    isDeletingId,
    isLoading,
    loadLogs,
    openDetailDrawer,
    setFromDate,
    setPage,
    setRowsPerPage,
    setSearchTerm,
    setToDate,
    state,
  };
}
