/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useRequireAuth } from "@/shared/hooks/use-auth-redirect";
import {
  addFavorite,
  fetchFavorites,
  removeFavorite,
  updateFavorite,
} from "./_api";
import type {
  FavoriteFoodItem,
  FavoriteSortBy,
  FavoriteSortOrder,
  FavoritesState,
} from "./_interface";

const ROWS_PER_PAGE = 12;
const DEBOUNCE_MS = 280;

export function useFavorites() {
  useRequireAuth();

  const [state, setState] = useState<FavoritesState>({
    items: [],
    total: 0,
    page: 0,
    rowsPerPage: ROWS_PER_PAGE,
    searchTerm: "",
    sortBy: "created_at",
    sortOrder: "desc",
    ratedOnly: false,
    editingItem: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState<number | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [detailItem, setDetailItem] = useState<FavoriteFoodItem | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---------------------------------------------------------------------------
  // Load
  // ---------------------------------------------------------------------------

  const loadFavorites = useCallback(
    async (overrides: Partial<FavoritesState> = {}) => {
      setIsLoading(true);
      try {
        const merged = { ...state, ...overrides };
        const data = await fetchFavorites({
          q: merged.searchTerm || undefined,
          sort_by: merged.sortBy,
          sort_order: merged.sortOrder,
          rated_only: merged.ratedOnly || undefined,
          limit: merged.rowsPerPage,
          offset: merged.page * merged.rowsPerPage,
        });
        setState((prev) => ({
          ...prev,
          ...overrides,
          items: data.items,
          total: data.total,
        }));
      } catch {
        toast.error("Không thể tải danh sách yêu thích.");
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    void loadFavorites();
  }, [loadFavorites]);

  // ---------------------------------------------------------------------------
  // Debounced search
  // ---------------------------------------------------------------------------

  const setSearchTerm = useCallback(
    (term: string) => {
      setState((prev) => ({ ...prev, searchTerm: term, page: 0 }));
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        void loadFavorites({ searchTerm: term, page: 0 });
      }, DEBOUNCE_MS);
    },
    [loadFavorites],
  );

  // ---------------------------------------------------------------------------
  // Sort
  // ---------------------------------------------------------------------------

  const setSortBy = useCallback(
    (sortBy: FavoriteSortBy) => {
      void loadFavorites({ sortBy, page: 0 });
    },
    [loadFavorites],
  );

  const toggleSortOrder = useCallback(() => {
    const next: FavoriteSortOrder = state.sortOrder === "desc" ? "asc" : "desc";
    void loadFavorites({ sortOrder: next, page: 0 });
  }, [loadFavorites, state.sortOrder]);

  // ---------------------------------------------------------------------------
  // Filter
  // ---------------------------------------------------------------------------

  const toggleRatedOnly = useCallback(() => {
    void loadFavorites({ ratedOnly: !state.ratedOnly, page: 0 });
  }, [loadFavorites, state.ratedOnly]);

  // ---------------------------------------------------------------------------
  // Pagination
  // ---------------------------------------------------------------------------

  const setPage = useCallback(
    (page: number) => void loadFavorites({ page }),
    [loadFavorites],
  );

  // ---------------------------------------------------------------------------
  // Remove
  // ---------------------------------------------------------------------------

  const handleUndoRemove = useCallback(
    async (item: FavoriteFoodItem) => {
      setActionId(item.food_id);
      try {
        await addFavorite({
          food_id: item.food_id,
          rating: item.rating,
          notes: item.notes,
        });
        toast.success(`Đã khôi phục "${item.food.name}" vào yêu thích.`);
        void loadFavorites();
      } catch {
        toast.error("Không thể hoàn tác. Vui lòng thêm lại món thủ công.");
      } finally {
        setActionId(null);
      }
    },
    [loadFavorites],
  );

  const handleRemove = useCallback(
    async (item: FavoriteFoodItem) => {
      setActionId(item.food_id);
      try {
        await removeFavorite(item.food_id);
        toast.success(`Đã xoá "${item.food.name}" khỏi yêu thích.`, {
          action: {
            label: "Hoàn tác",
            onClick: () => void handleUndoRemove(item),
          },
        });
        void loadFavorites();
      } catch {
        toast.error("Xoá thất bại. Vui lòng thử lại.");
      } finally {
        setActionId(null);
      }
    },
    [handleUndoRemove, loadFavorites],
  );

  // ---------------------------------------------------------------------------
  // Detail drawer
  // ---------------------------------------------------------------------------

  const openDetail = useCallback((item: FavoriteFoodItem) => {
    setDetailItem(item);
  }, []);

  const closeDetail = useCallback(() => {
    setDetailItem(null);
  }, []);

  // ---------------------------------------------------------------------------
  // Edit (rating + notes)
  // ---------------------------------------------------------------------------

  const openEdit = useCallback((item: FavoriteFoodItem) => {
    setState((prev) => ({ ...prev, editingItem: item }));
    setEditRating(item.rating ?? null);
    setEditNotes(item.notes ?? "");
  }, []);

  const closeEdit = useCallback(() => {
    setState((prev) => ({ ...prev, editingItem: null }));
  }, []);

  const handleSaveEdit = useCallback(async () => {
    if (!state.editingItem) return;
    setActionId(state.editingItem.food_id);
    try {
      await updateFavorite(state.editingItem.food_id, {
        rating: editRating ?? undefined,
        notes: editNotes,
      });
      toast.success("Đã lưu ghi chú.");
      closeEdit();
      void loadFavorites();
    } catch {
      toast.error("Lưu thất bại. Vui lòng thử lại.");
    } finally {
      setActionId(null);
    }
  }, [state.editingItem, editRating, editNotes, closeEdit, loadFavorites]);

  return {
    actionId,
    closeDetail,
    closeEdit,
    detailItem,
    editNotes,
    editRating,
    handleRemove,
    handleSaveEdit,
    isLoading,
    loadFavorites,
    openDetail,
    openEdit,
    setEditNotes,
    setEditRating,
    setPage,
    setSearchTerm,
    setSortBy,
    state,
    toggleRatedOnly,
    toggleSortOrder,
  };
}
