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
  createAdminFood,
  deleteAdminFood,
  fetchAdminFood,
  fetchAdminFoods,
  rebuildFoodEmbedding,
  rebuildFoodKeys,
  updateAdminFood,
} from "../_api";
import type {
  AdminFoodFormField,
  AdminFoodFormState,
  AdminFoodPayload,
  AdminFoodResult,
  AdminFoodStats,
  AdminFoodsState,
  EmbeddingFilter,
  RawIngredientRow,
} from ".";

const DEFAULT_ROWS_PER_PAGE = 20;
const SEARCH_DEBOUNCE_MS = 280;

const emptyFormData: AdminFoodFormState = {
  name: "",
  description: "",
  img_url: "",
  core_ingredients: [],
  raw_ingredients: [],
  raw_instructions: "",
  soft_tags: [],
  taste_profile: [],
  meal_context: [],
  occasion_context: [],
  dining_context: "both",
  autoEmbed: true,
};

function toEmbeddingParam(filter: EmbeddingFilter) {
  if (filter === "ready") return true;
  if (filter === "missing") return false;
  return undefined;
}

/**
 * Tách prefix số lượng + đơn vị ra khỏi chuỗi raw_ingredient.
 *
 * Ví dụ:
 *   "200g thịt bò" + "thịt bò"  → { quantity: "200", unit: "g"  }
 *   "2 củ hành"   + "hành"      → { quantity: "2",   unit: "củ" }
 *   "ít muối"     + "muối"      → { quantity: "",    unit: "ít" }
 *   "thịt bò"     + "thịt bò"  → { quantity: "",    unit: ""   }
 */
function extractQtyUnit(
  rawStr: string,
  coreName: string,
): { quantity: string; unit: string } {
  const raw = rawStr.trim();
  const name = coreName.trim();

  // Kiểm tra raw có kết thúc bằng tên nguyên liệu không (case-insensitive)
  const endsWithName = raw.toLowerCase().endsWith(name.toLowerCase());
  if (!endsWithName) return { quantity: "", unit: "" };

  const prefix = raw.slice(0, raw.length - name.length).trim();
  if (!prefix) return { quantity: "", unit: "" };

  // "200g" hoặc "2 củ" → tách số + phần còn lại là đơn vị
  const numMatch = prefix.match(/^([\d.,/]+)\s*(.*)$/);
  if (numMatch) {
    return { quantity: numMatch[1].trim(), unit: numMatch[2].trim() };
  }

  // Không có số (vd: "ít", "vừa đủ") → coi toàn prefix là đơn vị
  return { quantity: "", unit: prefix };
}

function foodToForm(food: AdminFoodResult): AdminFoodFormState {
  // Lấy độ dài lớn hơn để không bỏ sót row nào từ cả hai mảng
  const maxLen = Math.max(
    food.core_ingredients.length,
    food.raw_ingredients.length,
  );

  const rows: RawIngredientRow[] = [];
  for (let i = 0; i < maxLen; i++) {
    const coreName = food.core_ingredients[i];
    const rawStr = food.raw_ingredients[i];

    if (coreName && rawStr) {
      // Có cả hai → thử tách số lượng / đơn vị từ raw
      const { quantity, unit } = extractQtyUnit(rawStr, coreName);
      rows.push({ name: coreName, quantity, unit });
    } else if (coreName) {
      // raw_ingredients ngắn hơn → tên sạch, không có qty
      rows.push({ name: coreName, quantity: "", unit: "" });
    } else if (rawStr) {
      // core_ingredients ngắn hơn → để nguyên chuỗi raw làm tên
      rows.push({ name: rawStr, quantity: "", unit: "" });
    }
  }

  return {
    autoEmbed: true,
    core_ingredients: food.core_ingredients,
    description: food.description,
    dining_context: food.dining_context ?? "both",
    img_url: food.img_url ?? "",
    meal_context: food.meal_context,
    name: food.name,
    occasion_context: food.occasion_context,
    raw_ingredients: rows,
    raw_instructions: food.raw_instructions,
    soft_tags: food.soft_tags,
    taste_profile: food.taste_profile,
  };
}

function rowToString(row: RawIngredientRow): string {
  const name = row.name.trim();
  const qty = row.quantity.trim();
  const unit = row.unit.trim();
  if (qty && unit) return `${qty}${unit} ${name}`;
  if (qty) return `${qty} ${name}`;
  if (unit) return `${unit} ${name}`;
  return name;
}

function formToPayload(formData: AdminFoodFormState): AdminFoodPayload {
  const validRows = formData.raw_ingredients.filter((r) => r.name.trim());
  return {
    core_ingredients: validRows.map((r) => r.name.trim()),
    description: formData.description.trim(),
    dining_context: formData.dining_context || "both",
    img_url: formData.img_url.trim() || null,
    meal_context: formData.meal_context,
    name: formData.name.trim(),
    occasion_context: formData.occasion_context,
    raw_ingredients: validRows.map(rowToString),
    raw_instructions: formData.raw_instructions.trim(),
    soft_tags: formData.soft_tags,
    taste_profile: formData.taste_profile,
  };
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function validateFoodForm(formData: AdminFoodFormState) {
  const errors: Partial<Record<AdminFoodFormField, string>> = {};

  if (!formData.name.trim()) {
    errors.name = "Tên món ăn là bắt buộc.";
  }
  if (!formData.description.trim()) {
    errors.description = "Mô tả món ăn là bắt buộc.";
  }
  if (formData.img_url.trim() && !isValidUrl(formData.img_url.trim())) {
    errors.img_url = "URL ảnh không hợp lệ (phải bắt đầu bằng http:// hoặc https://).";
  }
  if (formData.raw_ingredients.filter((r) => r.name.trim()).length === 0) {
    errors.core_ingredients = "Cần ít nhất một nguyên liệu.";
  }

  return errors;
}

export function useAdminFoods() {
  const router = useRouter();
  const [state, setState] = useState<AdminFoodsState>({
    deleteTarget: null,
    detailFood: null,
    embeddingFilter: "all",
    formData: emptyFormData,
    formErrors: {},
    formMode: "create",
    formTarget: null,
    foods: [],
    isDeleteOpen: false,
    isDetailOpen: false,
    isFormOpen: false,
    page: 0,
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    searchTerm: "",
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionFoodId, setActionFoodId] = useState<string | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foodStats, setFoodStats] = useState<AdminFoodStats | null>(null);
  const [submitAttemptCount, setSubmitAttemptCount] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const query = useMemo(
    () => ({
      has_embedding: toEmbeddingParam(state.embeddingFilter),
      limit: state.rowsPerPage,
      offset: state.page * state.rowsPerPage,
      q: state.searchTerm,
      sort_by: state.searchTerm.trim()
        ? ("relevance" as const)
        : ("name" as const),
      sort_order: "asc" as const,
    }),
    [state.embeddingFilter, state.page, state.rowsPerPage, state.searchTerm],
  );

  const loadFoods = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const me = await apiGetMe();
      if (me.role !== "admin") {
        router.replace("/chat");
        return;
      }

      const result = await fetchAdminFoods(query);
      setState((prev) => ({
        ...prev,
        foods: result.items,
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
          : "Không thể tải danh sách món ăn admin.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [query, router]);

  /** Thống kê embedding toàn cục — không phụ thuộc filter/search hiện tại */
  const loadFoodStats = useCallback(async () => {
    try {
      const [allRes, readyRes] = await Promise.all([
        fetchAdminFoods({ limit: 1 }),
        fetchAdminFoods({ has_embedding: true, limit: 1 }),
      ]);
      setFoodStats({
        total: allRes.total,
        ready: readyRes.total,
        missing: allRes.total - readyRes.total,
      });
    } catch {
      /* silent — stats là optional UI, không chặn flow chính */
    }
  }, []);

  useEffect(() => {
    void loadFoodStats();
  }, [loadFoodStats]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const delay = state.searchTerm.trim() ? SEARCH_DEBOUNCE_MS : 0;
    debounceRef.current = setTimeout(() => {
      void loadFoods();
    }, delay);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [loadFoods, state.searchTerm]);

  const setSearchTerm = (value: string) => {
    setState((prev) => ({ ...prev, page: 0, searchTerm: value }));
  };

  const setEmbeddingFilter = (value: EmbeddingFilter) => {
    setState((prev) => ({ ...prev, embeddingFilter: value, page: 0 }));
  };

  const setPage = (page: number) => {
    setState((prev) => ({ ...prev, page }));
  };

  const setRowsPerPage = (rowsPerPage: number) => {
    setState((prev) => ({ ...prev, page: 0, rowsPerPage }));
  };

  const openCreateDialog = () => {
    setState((prev) => ({
      ...prev,
      formData: emptyFormData,
      formErrors: {},
      formMode: "create",
      formTarget: null,
      isFormOpen: true,
    }));
  };

  const openEditDialog = (food: AdminFoodResult) => {
    setState((prev) => ({
      ...prev,
      formData: foodToForm(food),
      formErrors: {},
      formMode: "edit",
      formTarget: food,
      isFormOpen: true,
    }));
  };

  const closeFormDialog = () => {
    if (isSubmitting) return;
    setState((prev) => ({
      ...prev,
      formErrors: {},
      isFormOpen: false,
    }));
  };

  const setFormField = (
    field: AdminFoodFormField | "autoEmbed",
    value: string | boolean | string[] | RawIngredientRow[],
  ) => {
    // raw_ingredients: đồng thời tự động cập nhật core_ingredients từ tên nguyên liệu
    if (field === "raw_ingredients") {
      const rows = value as RawIngredientRow[];
      setState((prev) => ({
        ...prev,
        formData: {
          ...prev.formData,
          core_ingredients: rows.map((r) => r.name.trim()).filter(Boolean),
          raw_ingredients: rows,
        },
        formErrors: {
          ...prev.formErrors,
          core_ingredients: undefined,
        },
      }));
      return;
    }
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value,
      },
      formErrors:
        field === "autoEmbed"
          ? prev.formErrors
          : {
              ...prev.formErrors,
              [field]: undefined,
            },
    }));
  };

  const submitFoodForm = async () => {
    const formErrors = validateFoodForm(state.formData);
    if (Object.keys(formErrors).length > 0) {
      setState((prev) => ({ ...prev, formErrors }));
      setSubmitAttemptCount((c) => c + 1);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = formToPayload(state.formData);
      const result =
        state.formMode === "create"
          ? await createAdminFood(payload, state.formData.autoEmbed)
          : await updateAdminFood(state.formTarget?.id ?? "", payload);

      toast.success(
        state.formMode === "create"
          ? `Đã tạo món ${result.name}.`
          : `Đã cập nhật món ${result.name}.`,
      );
      setState((prev) => ({
        ...prev,
        detailFood: prev.detailFood?.id === result.id ? result : prev.detailFood,
        formErrors: {},
        isFormOpen: false,
      }));
      await loadFoods();
      void loadFoodStats();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không thể lưu món ăn.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteDialog = (food: AdminFoodResult) => {
    setState((prev) => ({
      ...prev,
      deleteTarget: food,
      isDeleteOpen: true,
    }));
  };

  const closeDeleteDialog = () => {
    if (isDeleting) return;
    setState((prev) => ({
      ...prev,
      deleteTarget: null,
      isDeleteOpen: false,
    }));
  };

  const confirmDeleteFood = async () => {
    if (!state.deleteTarget) return;

    setIsDeleting(true);
    try {
      await deleteAdminFood(state.deleteTarget.id);
      toast.success(`Đã xóa món ${state.deleteTarget.name}.`);
      setState((prev) => ({
        ...prev,
        deleteTarget: null,
        detailFood:
          prev.detailFood?.id === state.deleteTarget?.id ? null : prev.detailFood,
        isDeleteOpen: false,
        isDetailOpen:
          prev.detailFood?.id === state.deleteTarget?.id
            ? false
            : prev.isDetailOpen,
      }));
      await loadFoods();
      void loadFoodStats();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không thể xóa món ăn.");
    } finally {
      setIsDeleting(false);
    }
  };

  const openDetailDrawer = async (food: AdminFoodResult) => {
    setIsDetailLoading(true);
    setState((prev) => ({
      ...prev,
      detailFood: food,
      isDetailOpen: true,
    }));

    try {
      const result = await fetchAdminFood(food.id);
      setState((prev) => ({ ...prev, detailFood: result }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không thể tải chi tiết món ăn.");
    } finally {
      setIsDetailLoading(false);
    }
  };

  const closeDetailDrawer = () => {
    setState((prev) => ({
      ...prev,
      isDetailOpen: false,
    }));
  };

  const handleRebuildKeys = async (food: AdminFoodResult) => {
    setActionFoodId(food.id);
    try {
      const result = await rebuildFoodKeys(food.id);
      toast.success(`Đã sinh lại key nguyên liệu cho ${food.name}.`);
      setState((prev) => ({
        ...prev,
        detailFood: prev.detailFood?.id === food.id ? result : prev.detailFood,
      }));
      await loadFoods();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không thể sinh lại key.");
    } finally {
      setActionFoodId(null);
    }
  };

  const handleRebuildEmbedding = async (food: AdminFoodResult) => {
    setActionFoodId(food.id);
    try {
      const result = await rebuildFoodEmbedding(food.id);
      toast.success(result.message || `Đã sinh lại embedding cho ${food.name}.`);
      await loadFoods();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Không thể sinh lại embedding.");
    } finally {
      setActionFoodId(null);
    }
  };

  return {
    actionFoodId,
    closeDeleteDialog,
    submitAttemptCount,
    closeDetailDrawer,
    closeFormDialog,
    confirmDeleteFood,
    error,
    foodStats,
    handleRebuildEmbedding,
    handleRebuildKeys,
    isDeleting,
    isDetailLoading,
    isLoading,
    isSubmitting,
    loadFoods,
    openCreateDialog,
    openDeleteDialog,
    openDetailDrawer,
    openEditDialog,
    setEmbeddingFilter,
    setFormField,
    setPage,
    setRowsPerPage,
    setSearchTerm,
    state,
    submitFoodForm,
  };
}
