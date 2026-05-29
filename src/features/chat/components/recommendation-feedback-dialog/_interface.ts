/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type {
  FoodRecommendationFeedbackPayload,
  FoodRecommendationFeedbackResult,
  FoodRecommendationFeedbackVerdict,
} from "../../_interface";

export type RecommendationFeedbackDialogValue = Omit<
  FoodRecommendationFeedbackPayload,
  "threadId" | "messageId" | "foodId"
>;

export interface RecommendationFeedbackDialogProps {
  foodName: string;
  initialValue?: FoodRecommendationFeedbackResult;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (value: RecommendationFeedbackDialogValue) => void;
  open: boolean;
}

export interface VerdictOption {
  description: string;
  label: string;
  value: FoodRecommendationFeedbackVerdict;
}
