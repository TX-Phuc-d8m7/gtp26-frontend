/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { MOCK_FOODS, Food } from "@/features/foods/data/mock-foods";
import type { FoodSearchUIProps } from ".";

export function useFoodSearch({ onClose }: FoodSearchUIProps = {}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    MOCK_FOODS.forEach((food) =>
      food.categories.forEach((category) => categories.add(category)),
    );
    return Array.from(categories);
  }, []);

  const filteredFoods = useMemo(() => {
    return MOCK_FOODS.filter((food) => {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      const matchSearch =
        food.name.toLowerCase().includes(normalizedSearchTerm) ||
        food.description.toLowerCase().includes(normalizedSearchTerm);
      const matchCategory = selectedCategory
        ? food.categories.includes(selectedCategory)
        : true;

      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleBack = () => {
    if (onClose) {
      onClose();
      return;
    }

    router.push("/");
  };

  const closeFoodDetail = () => setSelectedFood(null);

  return {
    searchTerm,
    selectedCategory,
    selectedFood,
    allCategories,
    filteredFoods,
    setSearchTerm,
    setSelectedCategory,
    setSelectedFood,
    handleBack,
    closeFoodDetail,
  };
}
