/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type {
  BackendFoodResult,
  FoodRecommendationFeedbackResult,
} from "@/features/chat/_interface";

export interface FoodDetailDrawerProps {
  food: BackendFoodResult | null;
  isFavoriteLoading?: boolean;
  isFavorited?: boolean;
  open: boolean;
  recommendationFeedback?: FoodRecommendationFeedbackResult;
  onClose: () => void;
  onOpenFeedback?: (food: BackendFoodResult) => void;
  onOpenLocations?: (food: BackendFoodResult) => void;
  onToggleFavorite?: (food: BackendFoodResult) => void;
}

export interface FoodDetailSectionProps {
  items?: string[];
  title: string;
}
