/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";
import type {
  BackendFoodResult,
  FoodRecommendationFeedbackResult,
} from "../../_interface";

export type DifficultyLevel = NonNullable<BackendFoodResult["difficulty"]>;

export type NutritionTone = "protein" | "carbs" | "fat";

export type FoodCardActionType =
  | "detail"
  | "favorite"
  | "feedback"
  | "location";

export interface FoodCardProps {
  food: BackendFoodResult;
  index: number;
  isFavoriteLoading?: boolean;
  isFavorited?: boolean;
  recommendationFeedback?: FoodRecommendationFeedbackResult;
  onOpenDetail?: (food: BackendFoodResult) => void;
  onOpenLocations?: (food: BackendFoodResult) => void;
  onOpenFeedback?: (food: BackendFoodResult) => void;
  onToggleFavorite?: (food: BackendFoodResult) => void;
  sx?: SxProps<Theme>;
}
