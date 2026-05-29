/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import type { LucideIcon } from "lucide-react";

import type {
  BackendFoodResult,
  ChatFeedback,
  ChatMessage,
  FoodRecommendationFeedbackResult,
} from "../../_interface";

export interface EmptyStatePrompt {
  title: string;
  meta: string;
  prompt: string;
  Icon: LucideIcon;
}

export interface LocalMessageActionsProps {
  content: string;
  feedback?: ChatFeedback;
  isAiMessage?: boolean;
  isLoading: boolean;
  onEdit?: () => void;
  onFeedback?: (feedback: ChatFeedback) => void;
  onRetry?: () => void;
}

export interface FoodRecommendationCardProps {
  food: BackendFoodResult;
  index: number;
  isFavoriteLoading?: boolean;
  isFavorited?: boolean;
  recommendationFeedback?: FoodRecommendationFeedbackResult;
  onOpenDetail: (food: BackendFoodResult, message: ChatMessage) => void;
  onOpenLocations: (food: BackendFoodResult) => void;
  onOpenFeedback: (food: BackendFoodResult, message: ChatMessage) => void;
  onToggleFavorite: (food: BackendFoodResult) => void;
  message: ChatMessage;
}

export interface StickyToBottomContentProps {
  content: ReactNode;
  sx?: SxProps<Theme>;
}
