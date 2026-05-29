/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import type { AdminFoodResult } from "../../_interface";

export interface FoodDetailDrawerProps {
  actionFoodId: string | null;
  food: AdminFoodResult | null;
  isLoading: boolean;
  open: boolean;
  onClose: () => void;
  onDelete: (food: AdminFoodResult) => void;
  onEdit: (food: AdminFoodResult) => void;
  onRebuildEmbedding: (food: AdminFoodResult) => void;
  onRebuildKeys: (food: AdminFoodResult) => void;
}

export interface DetailSection {
  items: string[];
  title: string;
  tone?: "neutral" | "green" | "blue" | "orange";
}
