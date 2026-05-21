/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";
import type { BackendFoodResult } from "../../_interface";

export type DifficultyLevel = NonNullable<BackendFoodResult["difficulty"]>;

export type NutritionTone = "protein" | "carbs" | "fat";

export type FoodCardActionType = "feedback" | "location";

export interface FoodCardProps {
  food: BackendFoodResult;
  index: number;
  onOpenLocations?: (food: BackendFoodResult) => void;
  onOpenFeedback?: (food: BackendFoodResult) => void;
  sx?: SxProps<Theme>;
}
