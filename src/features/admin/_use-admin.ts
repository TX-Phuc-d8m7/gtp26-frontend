/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { apiGetMe } from "@/features/auth/_api";

import {
  fetchAdminAiFeedback,
  fetchAdminDashboardStats,
  fetchAdminFoodRecommendationFeedback,
} from "./_api";
import type {
  AdminAiFeedbackVerdict,
  AdminAiFeedbackItem,
  AdminDashboardStats,
  AdminFoodFeedbackVerdict,
  AdminFoodRecommendationFeedbackListResponse,
  AdminKpiCard,
  AdminTopItem,
} from ".";

function formatNumber(value: number) {
  return new Intl.NumberFormat("vi-VN").format(value);
}

function toPercent(part: number, total: number) {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

export function useAdmin() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [feedbackItems, setFeedbackItems] = useState<AdminAiFeedbackItem[]>([]);
  const [feedbackItemsLoading, setFeedbackItemsLoading] = useState(false);
  const [foodFeedback, setFoodFeedback] =
    useState<AdminFoodRecommendationFeedbackListResponse | null>(null);
  const [foodFeedbackLoading, setFoodFeedbackLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFoodFeedback = useCallback(
    async (verdict: AdminFoodFeedbackVerdict) => {
      setFoodFeedbackLoading(true);
      setError(null);

      try {
        const nextFoodFeedback = await fetchAdminFoodRecommendationFeedback({
          verdict,
          limit: 100,
          offset: 0,
        });
        setFoodFeedback(nextFoodFeedback);
        return nextFoodFeedback;
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Không thể tải feedback món gợi ý.",
        );
        throw err;
      } finally {
        setFoodFeedbackLoading(false);
      }
    },
    [],
  );

  const loadAiFeedback = useCallback(
    async (feedback?: AdminAiFeedbackVerdict) => {
      setFeedbackItemsLoading(true);
      setError(null);

      try {
        const nextFeedback = await fetchAdminAiFeedback({
          feedback,
          limit: 100,
          offset: 0,
        });
        setFeedbackItems(nextFeedback.items);
        return nextFeedback;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Không thể tải feedback AI.",
        );
        throw err;
      } finally {
        setFeedbackItemsLoading(false);
      }
    },
    [],
  );

  const loadAdminData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const me = await apiGetMe();
      if (me.role !== "admin") {
        router.replace("/chat");
        return;
      }

      const [nextStats, feedback, nextFoodFeedback] = await Promise.all([
        fetchAdminDashboardStats(8),
        fetchAdminAiFeedback({ limit: 100, offset: 0 }),
        fetchAdminFoodRecommendationFeedback({
          verdict: "dislike",
          limit: 100,
          offset: 0,
        }),
      ]);
      setStats(nextStats);
      setFeedbackItems(feedback.items);
      setFoodFeedback(nextFoodFeedback);
    } catch (err) {
      if (err instanceof Error && err.message === "UNAUTHORIZED") {
        router.push("/login");
        return;
      }
      setError(
        err instanceof Error
          ? err.message
          : "Không thể tải dữ liệu Admin Console.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadAdminData();
  }, [loadAdminData]);

  const kpiCards = useMemo<AdminKpiCard[]>(() => {
    if (!stats) return [];

    const activeRatio = toPercent(stats.active_users, stats.total_users);
    const likeRatio = toPercent(
      stats.feedback.likes,
      stats.feedback.total,
    );

    return [
      {
        label: "Người dùng",
        value: formatNumber(stats.total_users),
        helper: `${formatNumber(stats.active_users)} đang hoạt động`,
        tone: "orange",
        trend: {
          value: `${activeRatio}% active`,
          direction: activeRatio >= 50 ? "up" : "neutral",
        },
      },
      {
        label: "Thư viện món",
        value: formatNumber(stats.total_foods),
        helper: "món có thể quản trị",
        tone: "green",
        trend: {
          value: "trong hệ thống",
          direction: "neutral",
        },
      },
      {
        label: "Lượt truy vấn",
        value: formatNumber(stats.total_queries),
        helper: `${formatNumber(stats.queries_today)} hôm nay`,
        tone: "blue",
        trend: {
          value: `+${formatNumber(stats.queries_today)} hôm nay`,
          direction: stats.queries_today > 0 ? "up" : "neutral",
        },
      },
      {
        label: "Chat threads",
        value: formatNumber(stats.total_chat_threads),
        helper: `${formatNumber(stats.total_chat_messages)} tin nhắn`,
        tone: "neutral",
        trend: {
          value: `${likeRatio}% hài lòng`,
          direction: likeRatio >= 60 ? "up" : likeRatio > 0 ? "neutral" : "neutral",
        },
      },
    ];
  }, [stats]);

  const feedbackChart = useMemo(() => {
    const feedback = stats?.feedback;
    if (!feedback) return [];
    return [
      {
        name: "Hài lòng",
        feedback: "like" as const,
        value: feedback.likes,
        percent: toPercent(feedback.likes, feedback.total),
      },
      {
        name: "Chưa ổn",
        feedback: "dislike" as const,
        value: feedback.dislikes,
        percent: toPercent(feedback.dislikes, feedback.total),
      },
    ];
  }, [stats]);

  const topFoodsChart = useMemo(
    () =>
      (stats?.top_recommended_foods ?? []).map((item: AdminTopItem) => ({
        name: item.name,
        count: item.count,
      })),
    [stats],
  );

  const foodFeedbackChart = useMemo(() => {
    const summary = foodFeedback?.summary ?? stats?.food_recommendation_feedback;
    if (!summary) return [];

    return [
      {
        name: "Phù hợp",
        verdict: "like" as const,
        value: summary.likes,
        percent: toPercent(summary.likes, summary.total),
      },
      {
        name: "Tạm được",
        verdict: "neutral" as const,
        value: summary.neutrals,
        percent: toPercent(summary.neutrals, summary.total),
      },
      {
        name: "Không phù hợp",
        verdict: "dislike" as const,
        value: summary.dislikes,
        percent: toPercent(summary.dislikes, summary.total),
      },
    ];
  }, [foodFeedback, stats]);

  return {
    error,
    feedbackChart,
    feedbackItems,
    feedbackItemsLoading,
    foodFeedback,
    foodFeedbackChart,
    foodFeedbackLoading,
    isLoading,
    kpiCards,
    loadAiFeedback,
    loadAdminData,
    loadFoodFeedback,
    stats,
    topFoodsChart,
  };
}
