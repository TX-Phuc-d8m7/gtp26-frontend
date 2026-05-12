/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SearchFood } from "./mockData";

export interface FoodSearchUIProps {
  onClose?: () => void;
}

export interface RankedFood {
  food: SearchFood;
  score: number;
  matchedTerms: string[];
}

export interface SearchSuggestion {
  id: string;
  label: string;
  type: "dish" | "tag" | "ingredient";
}

export interface FoodSearchState {
  query: string;
  selectedTags: string[];
  selectedFood: SearchFood | null;
}
