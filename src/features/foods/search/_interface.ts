/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Food } from "@/features/foods/data/mock-foods";

export interface FoodSearchUIProps {
  onClose?: () => void;
}

export interface FoodSearchState {
  searchTerm: string;
  selectedCategory: string | null;
  selectedFood: Food | null;
}

export interface FoodCardProps {
  food: Food;
  onClick: () => void;
}

export interface FoodDetailSheetProps {
  food: Food | null;
  onClose: () => void;
}
