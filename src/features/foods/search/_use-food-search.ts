/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { fetchFilterOptions, fetchFoodDetail, fetchFoods } from "./_api";
import type {
  ApiFilterOptions,
  ApiFood,
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
function readInitialFromUrl(): { q: string; tags: string[] } {
  if (typeof window === "undefined") return { q: "", tags: [] };
  const params = new URLSearchParams(window.location.search);
  const q = params.get("q") ?? "";
  const tags = KNOWN_GROUPS.flatMap((g) => params.getAll(g));
  return { q, tags };
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
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  // ---- Filter options state ----
  const [filterOptions, setFilterOptions] = useState<ApiFilterOptions | null>(null);

  // Refs
  const freshAbortRef = useRef<AbortController | null>(null);
  const moreAbortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tagGroupMapRef = useRef<Record<string, string>>({});

  /**
   * Gate: nếu có URL tags khi vào trang, fetch đầu tiên phải đợi filterOptions
   * để tagGroupMapRef có dữ liệu đầy đủ trước khi gọi API với đúng param group.
   */
  const waitForFilterOptionsRef = useRef(!isEmbedded && selectedTags.length > 0);

  // ---------------------------------------------------------------------------
  // Load filter options once on mount
  // ---------------------------------------------------------------------------

  useEffect(() => {
    fetchFilterOptions()
      .then(setFilterOptions)
      .catch(() => {/* silent — tag chips won't show until retry */});
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

  const doFreshFetch = useCallback(async (q: string, tags: string[]) => {
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
  }, []);

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
    [],
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
      doFreshFetch(query, selectedTags);
    }, delay);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, selectedTags, doFreshFetch, filterOptions]);

  // ---------------------------------------------------------------------------
  // URL sync — ghi state vào URL (chỉ dùng cho non-embedded, sau khi filterOptions load)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (isEmbedded) return;
    if (!filterOptions) return; // cần mapping để ghi đúng group key

    const params = new URLSearchParams();
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
  }, [query, selectedTags, filterOptions, isEmbedded]);

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
      .then((detail) => { if (!cancelled) setSelectedFood(detail); })
      .catch(() => { if (!cancelled) setSelectedFood(null); })
      .finally(() => { if (!cancelled) setIsDetailLoading(false); });

    return () => { cancelled = true; };
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

    return [...dishSuggestions, ...tagSuggestions].slice(0, 7);
  }, [foods, allTags, query]);

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

  const activeFilterCount = selectedTags.length;

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedTags([]);
    setIsSuggestionOpen(false);
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setIsSuggestionOpen(false);
  };

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.label);
    if (suggestion.type === "tag") {
      setSelectedTags((prev) =>
        prev.includes(suggestion.label) ? prev : [...prev, suggestion.label],
      );
    }
    setIsSuggestionOpen(false);
  };

  const handleBack = () => {
    if (onClose) { onClose(); return; }
    router.push("/");
  };

  const selectFood = (food: ApiFood | null) => {
    setSelectedFoodId(food?.id ?? null);
  };

  const handleLoadMore = () => {
    loadMore(query, selectedTags, foods.length);
  };

  return {
    query,
    selectedTags,
    selectedFood,
    allTags,
    filterOptions,
    activeFilterCount,
    rankedFoods,
    suggestions,
    isSuggestionOpen,
    isLoading,
    isLoadingMore,
    isDetailLoading,
    hasEverLoaded,
    error,
    total,
    hasMore,
    clearSearch,
    clearFilters,
    handleBack,
    handleLoadMore,
    selectSuggestion,
    setIsSuggestionOpen,
    setQuery,
    setSelectedFood: selectFood,
    toggleTag,
  };
}
