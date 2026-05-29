/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type {
  BackendFoodResult,
  FoodLocation,
} from "@/features/chat/_interface";

export interface LocationRowProps {
  location: FoodLocation;
  isActive: boolean;
  onSelect: () => void;
}

export interface MapInsightPanelProps {
  food: BackendFoodResult | null;
  onClose: () => void;
}
