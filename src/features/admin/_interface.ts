/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import type { ReactNode } from "react";

export interface AdminTopItem {
  name: string;
  count: number;
}

export interface AdminFeedbackSummary {
  total: number;
  likes: number;
  dislikes: number;
}

export interface AdminFoodRecommendationFeedbackSummary {
  total: number;
  likes: number;
  neutrals: number;
  dislikes: number;
  average_rating?: number | null;
}

export type AdminFoodFeedbackVerdict = "like" | "neutral" | "dislike";

export interface AdminDashboardStats {
  total_users: number;
  active_users: number;
  total_foods: number;
  total_queries: number;
  queries_today: number;
  total_chat_threads: number;
  total_chat_messages: number;
  feedback: AdminFeedbackSummary;
  food_recommendation_feedback: AdminFoodRecommendationFeedbackSummary;
  top_health_conditions: AdminTopItem[];
  top_recommended_foods: AdminTopItem[];
}

export interface AdminAiFeedbackItem {
  message_id: string;
  thread_id: string;
  query_log_id?: string | null;
  feedback: "like" | "dislike" | string;
  assistant_content: string;
  food_results: Array<Record<string, unknown>>;
  created_at: string;
  user_id?: string | null;
  user_email?: string | null;
  thread_title?: string | null;
  query?: string | null;
}

export interface AdminAiFeedbackListResponse {
  total: number;
  limit: number;
  offset: number;
  items: AdminAiFeedbackItem[];
}

export type AdminAiFeedbackVerdict = "like" | "dislike";

export interface AdminFoodRecommendationFeedbackItem {
  id: string;
  thread_id: string;
  assistant_message_id: string;
  food_id: string;
  food_name?: string | null;
  verdict: AdminFoodFeedbackVerdict | string;
  rating?: number | null;
  reasons: string[];
  comment?: string | null;
  tried: boolean;
  created_at: string;
  updated_at: string;
  user_id?: string | null;
  user_email?: string | null;
  thread_title?: string | null;
  query?: string | null;
}

export interface AdminFoodRecommendationFeedbackListResponse {
  total: number;
  limit: number;
  offset: number;
  summary: AdminFoodRecommendationFeedbackSummary;
  top_disliked_foods: AdminTopItem[];
  top_reasons: AdminTopItem[];
  items: AdminFoodRecommendationFeedbackItem[];
}

export interface AdminShellProps {
  activePath: "/admin" | "/admin/foods" | "/admin/users";
  actions?: ReactNode;
  children: ReactNode;
  subtitle: string;
  title: string;
}

export interface AdminKpiCardTrend {
  value: string;
  direction: "up" | "down" | "neutral";
}

export interface AdminKpiCard {
  label: string;
  value: string;
  helper: string;
  tone: "orange" | "green" | "blue" | "neutral";
  trend?: AdminKpiCardTrend;
}
