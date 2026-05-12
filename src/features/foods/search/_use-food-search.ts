/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { SEARCH_FOODS, type SearchFood } from "./mockData";
import type {
  FoodSearchUIProps,
  RankedFood,
  SearchSuggestion,
} from "./_interface";

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

const getSubsequenceScore = (text: string, query: string) => {
  if (!query) return 0;

  let queryIndex = 0;
  let streak = 0;
  let bestStreak = 0;

  for (const character of text) {
    if (character === query[queryIndex]) {
      queryIndex += 1;
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
      if (queryIndex === query.length) break;
    } else {
      streak = 0;
    }
  }

  if (queryIndex === 0) return 0;

  const coverage = queryIndex / query.length;
  const continuity = bestStreak / query.length;
  return Math.round(coverage * 24 + continuity * 16);
};

const scoreText = (value: string, query: string, weight: number) => {
  const text = normalizeText(value);
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return 0;
  if (text === normalizedQuery) return weight;
  if (text.startsWith(normalizedQuery)) return Math.round(weight * 0.92);
  if (text.includes(normalizedQuery)) return Math.round(weight * 0.72);
  return Math.round((getSubsequenceScore(text, normalizedQuery) / 40) * weight);
};

const unique = (items: string[]) => Array.from(new Set(items));

const getFoodScore = (
  food: SearchFood,
  query: string,
  selectedTags: string[],
): RankedFood => {
  const tagMatched =
    selectedTags.length === 0 ||
    selectedTags.every((tag) => food.soft_tags.includes(tag));
  if (!tagMatched) {
    return { food, score: 0, matchedTerms: [] };
  }

  const nameScore = scoreText(food.name, query, 58);
  const tagScore = Math.max(
    ...food.soft_tags.map((tag) => scoreText(tag, query, 34)),
    0,
  );
  const ingredientScore = Math.max(
    ...food.ingredients.map((ingredient) => scoreText(ingredient, query, 26)),
    0,
  );
  const descriptionScore = scoreText(food.description, query, 16);
  const locationScore = Math.max(
    ...food.locations.map((location) => scoreText(location.name, query, 12)),
    0,
  );
  const selectedTagBoost = selectedTags.length * 18;
  const discoveryBoost = query.trim() ? 0 : food.locations.length * 4;
  const score =
    nameScore +
    tagScore +
    ingredientScore +
    descriptionScore +
    locationScore +
    selectedTagBoost +
    discoveryBoost;
  const normalizedQuery = normalizeText(query);
  const matchedTerms = unique(
    [
      food.name,
      ...food.soft_tags,
      ...food.ingredients,
      ...food.locations.map((location) => location.name),
    ].filter((term) => normalizeText(term).includes(normalizedQuery)),
  ).slice(0, 4);

  return {
    food,
    score,
    matchedTerms,
  };
};

export function useFoodSearch({ onClose }: FoodSearchUIProps = {}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFood, setSelectedFood] = useState<SearchFood | null>(null);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);

  const allTags = useMemo(
    () => unique(SEARCH_FOODS.flatMap((food) => food.soft_tags)).sort(),
    [],
  );

  const rankedFoods = useMemo(() => {
    return SEARCH_FOODS.map((food) => getFoodScore(food, query, selectedTags))
      .filter((result) => {
        if (!query.trim() && selectedTags.length === 0) return true;
        return result.score > 0;
      })
      .sort((first, second) => second.score - first.score);
  }, [query, selectedTags]);

  const suggestions = useMemo<SearchSuggestion[]>(() => {
    const normalizedQuery = normalizeText(query);
    if (normalizedQuery.length < 2) return [];

    const dishSuggestions = SEARCH_FOODS.filter((food) =>
      normalizeText(food.name).includes(normalizedQuery),
    ).map((food) => ({
      id: `dish-${food.id}`,
      label: food.name,
      type: "dish" as const,
    }));
    const tagSuggestions = allTags
      .filter((tag) => normalizeText(tag).includes(normalizedQuery))
      .map((tag) => ({
        id: `tag-${tag}`,
        label: tag,
        type: "tag" as const,
      }));
    const ingredientSuggestions = unique(
      SEARCH_FOODS.flatMap((food) => food.ingredients),
    )
      .filter((ingredient) =>
        normalizeText(ingredient).includes(normalizedQuery),
      )
      .map((ingredient) => ({
        id: `ingredient-${ingredient}`,
        label: ingredient,
        type: "ingredient" as const,
      }));

    return [
      ...dishSuggestions,
      ...tagSuggestions,
      ...ingredientSuggestions,
    ].slice(0, 7);
  }, [allTags, query]);

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedTags([]);
    setIsSuggestionOpen(false);
  };

  const selectSuggestion = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.label);
    if (suggestion.type === "tag") {
      setSelectedTags((currentTags) =>
        currentTags.includes(suggestion.label)
          ? currentTags
          : [...currentTags, suggestion.label],
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

  return {
    query,
    selectedTags,
    selectedFood,
    allTags,
    rankedFoods,
    suggestions,
    isSuggestionOpen,
    clearSearch,
    handleBack,
    selectSuggestion,
    setIsSuggestionOpen,
    setQuery,
    setSelectedFood,
    toggleTag,
  };
}
