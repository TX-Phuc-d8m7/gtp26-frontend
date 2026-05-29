/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { addFavorite, fetchFavorites, removeFavorite } from "@/features/favorites/_api";
import { isLoggedIn } from "@/features/auth/_api";
import {
  fetchFilterOptions,
  fetchFoodCategories,
  fetchFoodDetail,
  fetchFoods,
} from "./_api";
import type {
  ApiFilterOptions,
  ApiFood,
  ApiFoodCategory,
  ApiFoodDetail,
  FoodSearchUIProps,
  RankedFood,
  SearchSuggestion,
} from "./_interface";

const DEBOUNCE_MS = 320;
const PAGE_LIMIT = 9;

/**
 * Tất cả các key là param hợp lệ trong URL — khớp với ApiFilterOptions.
 * Dùng để đọc/ghi URL và để map tag → group khi restore từ URL.
 */
const KNOWN_GROUPS: ReadonlyArray<keyof ApiFilterOptions> = [
  "meal_context",
  "occasion_context",
  "taste_profile",
  "dish_type",
  "diet_style",
  "nutrition",
  "texture",
];

/** Đọc query + selectedTags từ URL hiện tại (chỉ chạy trên client). */
function readInitialFromUrl(): {
  category: string | null;
  q: string;
  tags: string[];
} {
  if (typeof window === "undefined") {
    return { category: null, q: "", tags: [] };
  }
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const q = params.get("q") ?? "";
  const tags = KNOWN_GROUPS.flatMap((g) => params.getAll(g));
  return { category, q, tags };
}

/** Nhóm các tag đã chọn vào đúng param của API */
function groupTagsToParams(
  tags: string[],
  tagGroupMap: Record<string, string>,
): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  for (const tag of tags) {
    const group = tagGroupMap[tag] ?? "soft_tags";
    if (!grouped[group]) grouped[group] = [];
    grouped[group].push(tag);
  }
  return grouped;
}

export function useFoodSearch({ onClose }: FoodSearchUIProps = {}) {
  const router = useRouter();

  // Embedded (in chat overlay) → không đọc/ghi URL
  const isEmbedded = Boolean(onClose);

  // ---- Search state — khởi tạo từ URL nếu không phải embedded ----
  const [query, setQuery] = useState<string>(() =>
    isEmbedded ? "" : readInitialFromUrl().q,
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() =>
    isEmbedded ? null : readInitialFromUrl().category,
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(() =>
    isEmbedded ? [] : readInitialFromUrl().tags,
  );
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);

  // ---- Food list state ----
  const [foods, setFoods] = useState<ApiFood[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // true on mount → AppLoading ngay lập tức
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasEverLoaded, setHasEverLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---- Detail state ----
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<ApiFoodDetail | null>(null);
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());
  const [favoritingId, setFavoritingId] = useState<string | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // ---- Filter options state ----
  const [filterOptions, setFilterOptions] = useState<ApiFilterOptions | null>(
    null,
  );
  const [foodCategories, setFoodCategories] = useState<ApiFoodCategory[]>([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  // Refs
  const freshAbortRef = useRef<AbortController | null>(null);
  const moreAbortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tagGroupMapRef = useRef<Record<string, string>>({});
  // Always-current snapshot of favoritedIds — readable inside any effect closure
  const favoritedIdsRef = useRef<Set<string>>(new Set());

  /**
   * Gate: nếu có URL tags khi vào trang, fetch đầu tiên phải đợi filterOptions
   * để tagGroupMapRef có dữ liệu đầy đủ trước khi gọi API với đúng param group.
   */
  const waitForFilterOptionsRef = useRef(
    !isEmbedded && selectedTags.length > 0,
  );

  // ---------------------------------------------------------------------------
  // Load filter options once on mount
  // ---------------------------------------------------------------------------

  useEffect(() => {
    fetchFilterOptions()
      .then(setFilterOptions)
      .catch(() => {
        /* silent — tag chips won't show until retry */
      });

    setIsCategoryLoading(true);
    fetchFoodCategories()
      .then((data) => setFoodCategories(data.categories))
      .catch(() => setFoodCategories([]))
      .finally(() => setIsCategoryLoading(false));
  }, []);

  // ---------------------------------------------------------------------------
  // Build tag → API param map (kept in ref để tránh stale closure)
  // ---------------------------------------------------------------------------

  const tagGroupMap = useMemo((): Record<string, string> => {
    if (!filterOptions) return {};
    const map: Record<string, string> = {};
    for (const [group, tags] of Object.entries(filterOptions)) {
      for (const tag of tags as string[]) {
        map[tag] = group;
      }
    }
    return map;
  }, [filterOptions]);

  useEffect(() => {
    tagGroupMapRef.current = tagGroupMap;
  }, [tagGroupMap]);

  useEffect(() => {
    favoritedIdsRef.current = favoritedIds;
  }, [favoritedIds]);

  // ---------------------------------------------------------------------------
  // allTags — dùng cho autocomplete suggestions
  // ---------------------------------------------------------------------------

  const allTags = useMemo((): string[] => {
    if (!filterOptions) return [];
    return [
      ...filterOptions.meal_context,
      ...filterOptions.occasion_context,
      ...filterOptions.taste_profile,
    ];
  }, [filterOptions]);

  // ---------------------------------------------------------------------------
  // Fresh fetch — replaces the list, always offset=0
  // ---------------------------------------------------------------------------

  const doFreshFetch = useCallback(
    async (q: string, tags: string[], category: string | null) => {
      freshAbortRef.current?.abort();
      moreAbortRef.current?.abort();

      const controller = new AbortController();
      freshAbortRef.current = controller;

      setIsLoading(true);
      setIsLoadingMore(false);
      setError(null);

      try {
        const result = await fetchFoods(
          {
            category: category ?? undefined,
            q: q.trim() || undefined,
            sort_by: q.trim() ? "relevance" : "name",
            limit: PAGE_LIMIT,
            offset: 0,
            ...groupTagsToParams(tags, tagGroupMapRef.current),
          },
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setFoods(result.items);
          setTotal(result.total);
          setHasEverLoaded(true);
        }
      } catch (err) {
        if (!(err instanceof Error && err.name === "AbortError")) {
          setError("Không thể tải danh sách món ăn. Vui lòng thử lại.");
          setFoods([]);
          setTotal(0);
          setHasEverLoaded(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [],
  );

  // ---------------------------------------------------------------------------
  // Load more — appends to the list, offset = current foods.length
  // ---------------------------------------------------------------------------

  const loadMore = useCallback(
    async (q: string, tags: string[], currentCount: number) => {
      moreAbortRef.current?.abort();

      const controller = new AbortController();
      moreAbortRef.current = controller;

      setIsLoadingMore(true);

      try {
        const result = await fetchFoods(
          {
            category: selectedCategory ?? undefined,
            q: q.trim() || undefined,
            sort_by: q.trim() ? "relevance" : "name",
            limit: PAGE_LIMIT,
            offset: currentCount,
            ...groupTagsToParams(tags, tagGroupMapRef.current),
          },
          controller.signal,
        );

        if (!controller.signal.aborted) {
          setFoods((prev) => [...prev, ...result.items]);
          setTotal(result.total);
        }
      } catch (err) {
        if (!(err instanceof Error && err.name === "AbortError")) {
          setError("Không thể tải thêm. Vui lòng thử lại.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingMore(false);
        }
      }
    },
    [selectedCategory],
  );

  // ---------------------------------------------------------------------------
  // Fetch effect — debounce query changes; gate on filterOptions khi có URL tags
  //
  // filterOptions nằm trong deps để effect re-run khi options load xong,
  // giúp fetch đầu tiên có đúng tag→group mapping sau khi gate được mở.
  // ---------------------------------------------------------------------------

  useEffect(() => {
    // Nếu có URL tags mà filterOptions chưa load → đợi
    if (waitForFilterOptionsRef.current) {
      if (!filterOptions) return;
      waitForFilterOptionsRef.current = false; // gate mở — chỉ chạy 1 lần
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    const delay = query.trim() ? DEBOUNCE_MS : 0;
    debounceRef.current = setTimeout(() => {
      doFreshFetch(query, selectedTags, selectedCategory);
    }, delay);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, selectedTags, selectedCategory, doFreshFetch, filterOptions]);

  // ---------------------------------------------------------------------------
  // URL sync — ghi state vào URL (chỉ dùng cho non-embedded, sau khi filterOptions load)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (isEmbedded) return;
    if (!filterOptions) return; // cần mapping để ghi đúng group key

    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (query.trim()) params.set("q", query.trim());

    for (const tag of selectedTags) {
      const group = tagGroupMapRef.current[tag];
      if (group) params.append(group, tag);
    }

    const newSearch = params.toString();
    const currentSearch = window.location.search.replace(/^\?/, "");
    if (newSearch !== currentSearch) {
      window.history.replaceState(
        null,
        "",
        newSearch ? `?${newSearch}` : window.location.pathname,
      );
    }
  }, [query, selectedTags, selectedCategory, filterOptions, isEmbedded]);

  // ---------------------------------------------------------------------------
  // Load favorited IDs once on mount (only when logged in)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!isLoggedIn()) return;
    const PAGE = 50; // stay within backend's le=100 constraint
    fetchFavorites({ limit: PAGE, offset: 0 })
      .then(async (first) => {
        const ids = first.items.map((item) => item.food?.id ?? item.food_id);

        // If there are more pages, fetch them in parallel
        if (first.total > PAGE) {
          const extraPages = Math.ceil((first.total - PAGE) / PAGE);
          const pages = await Promise.all(
            Array.from({ length: extraPages }, (_, i) =>
              fetchFavorites({ limit: PAGE, offset: PAGE + i * PAGE }),
            ),
          );
          for (const page of pages) {
            for (const item of page.items) {
              ids.push(item.food?.id ?? item.food_id);
            }
          }
        }

        const loaded = new Set(ids);
        // Merge — keep any optimistic changes made before this response arrived.
        setFavoritedIds((prev) => {
          for (const id of prev) loaded.add(id);
          return loaded;
        });
      })
      .catch((err) => {
        console.error("[useFoodSearch] fetchFavorites failed:", err);
      });
  }, []);

  // ---------------------------------------------------------------------------
  // Load food detail when selectedFoodId changes
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!selectedFoodId) {
      setSelectedFood(null);
      return;
    }
    let cancelled = false;
    setIsDetailLoading(true);

    fetchFoodDetail(selectedFoodId)
      .then((detail) => {
        if (!cancelled) {
          // Override is_favorite from favoritedIds (client source of truth)
          // — guards against auth-less response or race with toggleFavorite.
          setSelectedFood({
            ...detail,
            is_favorite: favoritedIdsRef.current.has(detail.id),
          });
        }
      })
      .catch(() => {
        if (!cancelled) setSelectedFood(null);
      })
      .finally(() => {
        if (!cancelled) setIsDetailLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedFoodId]);

  // ---------------------------------------------------------------------------
  // Autocomplete suggestions (client-side từ danh sách hiện tại)
  // ---------------------------------------------------------------------------

  const suggestions = useMemo<SearchSuggestion[]>(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();

    const dishSuggestions = foods
      .filter((food) => food.name.toLowerCase().includes(q))
      .slice(0, 3)
      .map((food) => ({
        id: `dish-${food.id}`,
        label: food.name,
        type: "dish" as const,
      }));

    const tagSuggestions = allTags
      .filter((tag) => tag.toLowerCase().includes(q))
      .slice(0, 3)
      .map((tag) => ({
        id: `tag-${tag}`,
        label: tag,
        type: "tag" as const,
      }));

    const ingredientSuggestions = foodCategories
      .filter((category) => category.label.toLowerCase().includes(q))
      .slice(0, 3)
      .map((category) => ({
        id: `ingredient-category-${category.key}`,
        label: category.label,
        type: "ingredient" as const,
        categoryKey: category.key,
      }));

    return [
      ...dishSuggestions,
      ...tagSuggestions,
      ...ingredientSuggestions,
    ].slice(0, 9);
  }, [foods, allTags, foodCategories, query]);

  // ---------------------------------------------------------------------------
  // Ranked foods — server sorted; score for display badge
  // ---------------------------------------------------------------------------

  const rankedFoods = useMemo<RankedFood[]>(
    () =>
      foods.map((food, index) => ({
        food,
        score:
          query.trim() || selectedTags.length > 0
            ? Math.max(96 - index * 2, 50)
            : 0,
        matchedTerms: [],
      })),
    [foods, query, selectedTags],
  );

  const hasMore =
    !isLoading && !isLoadingMore && !error && foods.length < total;

  const activeFilterCount = selectedTags.length + (selectedCategory ? 1 : 0);

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const toggleCategory = (categoryKey: string | null) => {
    setSelectedCategory((prev) => (prev === categoryKey ? null : categoryKey));
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedCategory(null);
    setSelectedTags([]);
    setIsSuggestionOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTags([]);
    setIsSuggestionOpen(false);
  };

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    if (suggestion.type === "ingredient" && suggestion.categoryKey) {
      setQuery("");
      setSelectedCategory(suggestion.categoryKey);
      setIsSuggestionOpen(false);
      return;
    }

    setQuery(suggestion.label);
    if (suggestion.type === "tag") {
      setSelectedTags((prev) =>
        prev.includes(suggestion.label) ? prev : [...prev, suggestion.label],
      );
    }
    setIsSuggestionOpen(false);
  };

  const handleBack = () => {
    if (onClose) {
      onClose();
      return;
    }
    router.push("/");
  };

  const selectFood = (food: ApiFood | null) => {
    setSelectedFoodId(food?.id ?? null);
  };

  const handleLoadMore = () => {
    loadMore(query, selectedTags, foods.length);
  };

  const toggleFavorite = async (foodId: string) => {
    if (!isLoggedIn()) return;
    const isFavorited = favoritedIds.has(foodId);
    const foodName =
      foods.find((f) => f.id === foodId)?.name ??
      selectedFood?.name ??
      "Món ăn";
    setFavoritingId(foodId);

    // optimistic update
    setFavoritedIds((prev) => {
      const next = new Set(prev);
      if (isFavorited) next.delete(foodId); else next.add(foodId);
      return next;
    });
    // sync detail dialog if open
    if (selectedFood?.id === foodId) {
      setSelectedFood((prev) => prev ? { ...prev, is_favorite: !isFavorited } : prev);
    }

    try {
      if (isFavorited) {
        await removeFavorite(foodId);
      } else {
        await addFavorite({ food_id: foodId });
      }
      // Reconfirm after API success — guards against a late-arriving
      // fetchFavorites response overwriting the optimistic update.
      setFavoritedIds((prev) => {
        const next = new Set(prev);
        if (isFavorited) next.delete(foodId); else next.add(foodId);
        return next;
      });

      // Toast notification
      if (isFavorited) {
        toast.success(`Đã xoá "${foodName}" khỏi yêu thích`);
      } else {
        toast.success(`Đã thêm "${foodName}" vào yêu thích`, {
          action: {
            label: "Xem danh sách",
            onClick: () => router.push("/favorites"),
          },
        });
      }
    } catch {
      // Revert optimistic update on error
      setFavoritedIds((prev) => {
        const next = new Set(prev);
        if (isFavorited) next.add(foodId); else next.delete(foodId);
        return next;
      });
      if (selectedFood?.id === foodId) {
        setSelectedFood((prev) => prev ? { ...prev, is_favorite: isFavorited } : prev);
      }
      toast.error("Không thể thực hiện. Vui lòng thử lại.");
    } finally {
      setFavoritingId(null);
    }
  };

  return {
    query,
    selectedCategory,
    selectedTags,
    selectedFood,
    allTags,
    filterOptions,
    foodCategories,
    activeFilterCount,
    rankedFoods,
    suggestions,
    isSuggestionOpen,
    isLoading,
    isLoadingMore,
    isCategoryLoading,
    isDetailLoading,
    hasEverLoaded,
    error,
    total,
    hasMore,
    clearSearch,
    clearFilters,
    favoritedIds,
    favoritingId,
    handleBack,
    handleLoadMore,
    selectSuggestion,
    setIsSuggestionOpen,
    setQuery,
    setSelectedFood: selectFood,
    toggleCategory,
    toggleFavorite,
    toggleTag,
  };
}
