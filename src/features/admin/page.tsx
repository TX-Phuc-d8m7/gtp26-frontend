/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useCallback, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import {
  AlertCircle,
  ChefHat,
  MessageSquareWarning,
  RefreshCw,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import { Chip, Drawer, Skeleton } from "@mui/material";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Typography } from "@/shared/components/ui/typography/index";

import { AdminShell } from "./_components/admin-shell";
import { DEFAULT_FOOD_FEEDBACK_VERDICT } from "./_use-admin";
import { styles, useAdmin } from ".";
import type {
  AdminAiFeedbackVerdict,
  AdminFoodFeedbackVerdict,
  AdminFoodRecommendationFeedbackItem,
} from ".";

const feedbackColors = ["#22C55E", "#F43F5E"];
const foodFeedbackColors = ["#22C55E", "#F59E0B", "#F43F5E"];

type FoodReviewGroup = {
  averageRating: number | null;
  feedbackCount: number;
  feedbacks: AdminFoodRecommendationFeedbackItem[];
  foodId: string;
  foodName: string;
  latestFeedback: AdminFoodRecommendationFeedbackItem;
  reasons: string[];
};

const foodFeedbackPanelCopy: Record<
  AdminFoodFeedbackVerdict,
  { empty: string; metric: string; subtitle: string; title: string }
> = {
  dislike: {
    empty: "Chưa có món nào bị đánh giá không phù hợp.",
    metric: "Không phù hợp",
    subtitle: "Các món và lý do thường bị phản hồi không phù hợp.",
    title: "Món cần review",
  },
  neutral: {
    empty: "Chưa có món nào được đánh giá tạm được.",
    metric: "Tạm được",
    subtitle: "Các món đang ở mức tạm ổn và cần theo dõi thêm.",
    title: "Món cần theo dõi",
  },
  like: {
    empty: "Chưa có món nào được đánh giá phù hợp.",
    metric: "Phù hợp",
    subtitle: "Các món đang được người dùng xác nhận là phù hợp.",
    title: "Món được đánh giá phù hợp",
  },
};

const aiFeedbackPanelCopy: Record<
  AdminAiFeedbackVerdict | "all",
  { empty: string; subtitle: string; title: string }
> = {
  all: {
    empty: "Chưa có feedback.",
    subtitle: "Mẫu phản hồi mới nhất để kiểm tra chất lượng gợi ý.",
    title: "Feedback gần đây",
  },
  like: {
    empty: "Chưa có feedback hài lòng.",
    subtitle: "Các câu trả lời được người dùng đánh giá tốt.",
    title: "Feedback hài lòng",
  },
  dislike: {
    empty: "Chưa có feedback chưa ổn.",
    subtitle: "Các câu trả lời cần kiểm tra lại để cải thiện chất lượng gợi ý.",
    title: "Feedback chưa ổn",
  },
};

function getVerdictLabel(verdict: string) {
  if (verdict === "like") return "Phù hợp";
  if (verdict === "dislike") return "Không phù hợp";
  return "Tạm được";
}

function getVerdictColor(verdict: string) {
  if (verdict === "like") return "success";
  if (verdict === "dislike") return "error";
  return "warning";
}

function DashboardSkeleton() {
  return (
    <Box sx={styles.contentGridStyles}>
      <Box sx={styles.kpiGridStyles}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="rounded"
            animation="wave"
            height={156}
            sx={{ borderRadius: 4 }}
          />
        ))}
      </Box>
      <Box sx={styles.dashboardGridStyles}>
        <Skeleton
          variant="rounded"
          animation="wave"
          height={360}
          sx={{ borderRadius: 4 }}
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          height={360}
          sx={{ borderRadius: 4 }}
        />
      </Box>
    </Box>
  );
}

export default function Admin() {
  const { resolvedTheme } = useTheme();
  const [selectedAiFeedback, setSelectedAiFeedback] =
    useState<AdminAiFeedbackVerdict | null>(null);
  const [selectedFoodFeedbackVerdict, setSelectedFoodFeedbackVerdict] =
    useState<AdminFoodFeedbackVerdict>(DEFAULT_FOOD_FEEDBACK_VERDICT);
  const [selectedReviewGroup, setSelectedReviewGroup] =
    useState<FoodReviewGroup | null>(null);
  const {
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
  } = useAdmin();

  const isDark = resolvedTheme === "dark";
  const centerFill = isDark ? "#FFF7ED" : "#111827";
  const centerSubFill = isDark ? "rgba(255, 247, 237, 0.62)" : "#4B5563";
  const activeAiFeedbackCopy = aiFeedbackPanelCopy[selectedAiFeedback ?? "all"];
  const activeFeedbackCopy = foodFeedbackPanelCopy[selectedFoodFeedbackVerdict];
  const handleSelectAiFeedback = useCallback(
    (feedback: AdminAiFeedbackVerdict) => {
      const nextFeedback = feedback === selectedAiFeedback ? null : feedback;
      setSelectedAiFeedback(nextFeedback);
      void loadAiFeedback(nextFeedback ?? undefined);
    },
    [loadAiFeedback, selectedAiFeedback],
  );
  const handleSelectFoodFeedbackVerdict = useCallback(
    (verdict: AdminFoodFeedbackVerdict) => {
      if (verdict === selectedFoodFeedbackVerdict) return;
      setSelectedFoodFeedbackVerdict(verdict);
      setSelectedReviewGroup(null);
      void loadFoodFeedback(verdict);
    },
    [loadFoodFeedback, selectedFoodFeedbackVerdict],
  );
  const reviewGroups = useMemo<FoodReviewGroup[]>(() => {
    const groups = new Map<string, AdminFoodRecommendationFeedbackItem[]>();

    for (const item of foodFeedback?.items ?? []) {
      const key = item.food_id || item.food_name || item.id;
      groups.set(key, [...(groups.get(key) ?? []), item]);
    }

    return Array.from(groups.entries())
      .map(([foodId, feedbacks]) => {
        const latestFeedback = feedbacks[0];
        const foodName = latestFeedback.food_name ?? "Món chưa xác định";
        const reasons = Array.from(
          new Set(feedbacks.flatMap((item) => item.reasons ?? [])),
        );
        const ratings = feedbacks
          .map((item) => item.rating)
          .filter((rating): rating is number => typeof rating === "number");
        const averageRating = ratings.length
          ? Math.round(
              (ratings.reduce((total, rating) => total + rating, 0) /
                ratings.length) *
                10,
            ) / 10
          : null;

        return {
          averageRating,
          feedbackCount: feedbacks.length,
          feedbacks,
          foodId,
          foodName,
          latestFeedback,
          reasons,
        };
      })
      .sort(
        (a, b) =>
          b.feedbackCount - a.feedbackCount ||
          Date.parse(b.latestFeedback.created_at) -
            Date.parse(a.latestFeedback.created_at),
      );
  }, [foodFeedback]);

  return (
    <Box sx={styles.pageStyles}>
      <AdminShell
        activePath="/admin"
        title="Bảng điều khiển vận hành"
        subtitle="Theo dõi sức khỏe dữ liệu, hiệu quả gợi ý AI và các tín hiệu hành vi quan trọng của hệ thống."
        actions={
          <Button
            type="button"
            variant="ghost"
            sx={styles.actionButtonStyles}
            onClick={() => {
              setSelectedAiFeedback(null);
              setSelectedFoodFeedbackVerdict(DEFAULT_FOOD_FEEDBACK_VERDICT);
              setSelectedReviewGroup(null);
              void loadAdminData();
            }}
          >
            <RefreshCw size={16} />
            Làm mới
          </Button>
        }
      >
        {isLoading ? (
          <DashboardSkeleton />
        ) : error ? (
          <Box sx={styles.panelStyles}>
            <Typography as="p" sx={styles.panelTitleStyles}>
              <AlertCircle size={18} /> {error}
            </Typography>
          </Box>
        ) : (
          <Box sx={styles.contentGridStyles}>
            <Box sx={styles.kpiGridStyles}>
              {kpiCards.map((card) => (
                <Box key={card.label} sx={styles.kpiCardStyles(card.tone)}>
                  <Typography as="p" sx={styles.kpiLabelStyles}>
                    {card.label}
                  </Typography>
                  <Typography as="p" sx={styles.kpiValueStyles}>
                    {card.value}
                  </Typography>
                  {card.trend && (
                    <Box
                      component="span"
                      sx={styles.kpiTrendStyles(card.trend.direction)}
                    >
                      {card.trend.direction === "up" && (
                        <TrendingUp size={11} />
                      )}
                      {card.trend.direction === "down" && (
                        <TrendingDown size={11} />
                      )}
                      {card.trend.value}
                    </Box>
                  )}
                  <Typography as="p" sx={styles.kpiHelperStyles}>
                    {card.helper}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Box sx={styles.dashboardGridStyles}>
              <Box sx={styles.panelStyles}>
                <Box sx={styles.panelHeaderStyles}>
                  <Box>
                    <Typography as="h2" sx={styles.panelTitleStyles}>
                      Feedback món gợi ý
                    </Typography>
                    <Typography as="p" sx={styles.panelSubtitleStyles}>
                      {foodFeedback?.summary.total ??
                        stats?.food_recommendation_feedback.total ??
                        0}{" "}
                      đánh giá ở cấp từng món.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={styles.chartBoxStyles}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={foodFeedbackChart}
                        dataKey="value"
                        innerRadius={62}
                        outerRadius={96}
                        paddingAngle={6}
                      >
                        <Label
                          content={({ viewBox }) => {
                            if (!viewBox || !("cx" in viewBox)) return null;
                            const { cx, cy } = viewBox as {
                              cx: number;
                              cy: number;
                            };
                            const total =
                              foodFeedback?.summary.total ??
                              stats?.food_recommendation_feedback.total ??
                              0;
                            return (
                              <g>
                                <text
                                  x={cx}
                                  y={cy - 9}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  style={{
                                    fontSize: 22,
                                    fontWeight: 900,
                                    fill: centerFill,
                                  }}
                                >
                                  {total.toLocaleString("vi-VN")}
                                </text>
                                <text
                                  x={cx}
                                  y={cy + 12}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    fill: centerSubFill,
                                  }}
                                >
                                  đánh giá
                                </text>
                              </g>
                            );
                          }}
                        />
                        {foodFeedbackChart.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={
                              foodFeedbackColors[
                                index % foodFeedbackColors.length
                              ]
                            }
                            opacity={
                              entry.verdict === selectedFoodFeedbackVerdict
                                ? 1
                                : 0.52
                            }
                            stroke={
                              entry.verdict === selectedFoodFeedbackVerdict
                                ? centerFill
                                : "transparent"
                            }
                            strokeWidth={
                              entry.verdict === selectedFoodFeedbackVerdict
                                ? 2
                                : 0
                            }
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleSelectFoodFeedbackVerdict(entry.verdict)
                            }
                          />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                <Box sx={styles.listStackStyles}>
                  {foodFeedbackChart.map((item) => (
                    <Box
                      key={item.name}
                      component="div"
                      role="button"
                      tabIndex={0}
                      sx={styles.foodFeedbackFilterItemStyles(
                        item.verdict === selectedFoodFeedbackVerdict,
                      )}
                      onClick={() =>
                        handleSelectFoodFeedbackVerdict(item.verdict)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleSelectFoodFeedbackVerdict(item.verdict);
                        }
                      }}
                    >
                      <Typography as="p" sx={styles.topItemNameStyles}>
                        <ChefHat size={15} /> {item.name} · {item.percent}%
                      </Typography>
                      <Typography as="span" sx={styles.countBadgeStyles}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={styles.panelStyles}>
                <Box sx={styles.panelHeaderStyles}>
                  <Box>
                    <Typography as="h2" sx={styles.panelTitleStyles}>
                      {activeFeedbackCopy.title}
                    </Typography>
                    <Typography as="p" sx={styles.panelSubtitleStyles}>
                      {activeFeedbackCopy.subtitle}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.reviewScrollStyles}>
                  {foodFeedbackLoading ? (
                    <>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          variant="rounded"
                          animation="wave"
                          height={102}
                          sx={{ borderRadius: 3 }}
                        />
                      ))}
                    </>
                  ) : reviewGroups.length > 0 ? (
                    reviewGroups.map((group) => (
                      <Box
                        key={group.foodId}
                        component="div"
                        role="button"
                        tabIndex={0}
                        sx={styles.reviewCardStyles}
                        onClick={() => setSelectedReviewGroup(group)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedReviewGroup(group);
                          }
                        }}
                      >
                        <Box sx={styles.reviewCardHeaderStyles}>
                          <Typography as="p" sx={styles.reviewCardTitleStyles}>
                            <MessageSquareWarning size={15} />
                            {group.foodName}
                          </Typography>
                          <Typography as="span" sx={styles.countBadgeStyles}>
                            {group.feedbackCount}
                          </Typography>
                        </Box>
                        <Box sx={styles.reviewCardMetaStyles}>
                          <Chip
                            size="small"
                            color={getVerdictColor(
                              group.latestFeedback.verdict,
                            )}
                            label={getVerdictLabel(
                              group.latestFeedback.verdict,
                            )}
                          />
                          {group.averageRating ? (
                            <span>TB {group.averageRating}/5 sao</span>
                          ) : null}
                          <span>{group.feedbacks.length} feedback</span>
                        </Box>
                        <Typography as="p" sx={styles.feedbackContentStyles}>
                          {group.latestFeedback.comment ||
                            group.reasons.join(", ") ||
                            group.latestFeedback.query ||
                            "Chưa có ghi chú."}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Box sx={styles.emptyPanelStyles}>
                      {activeFeedbackCopy.empty}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            <Box sx={styles.dashboardGridStyles}>
              <Box sx={styles.panelStyles}>
                <Box sx={styles.panelHeaderStyles}>
                  <Box>
                    <Typography as="h2" sx={styles.panelTitleStyles}>
                      Top món được gợi ý
                    </Typography>
                    <Typography as="p" sx={styles.panelSubtitleStyles}>
                      Các món xuất hiện nhiều nhất trong phản hồi AI.
                    </Typography>
                  </Box>
                </Box>

                {topFoodsChart.length > 0 ? (
                  <Box sx={styles.chartBoxStyles}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topFoodsChart}
                        layout="vertical"
                        margin={{ left: 8, right: 16, top: 8, bottom: 8 }}
                      >
                        <CartesianGrid
                          stroke="rgba(120, 113, 108, 0.18)"
                          horizontal={false}
                        />
                        <XAxis type="number" hide />
                        <YAxis
                          dataKey="name"
                          type="category"
                          width={130}
                          tick={{ fill: "currentColor", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <ChartTooltip
                          cursor={{ fill: "rgba(249,115,22,0.08)" }}
                        />
                        <Bar
                          dataKey="count"
                          radius={[0, 12, 12, 0]}
                          fill="#EA580C"
                          barSize={16}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                ) : (
                  <Box sx={styles.emptyPanelStyles}>Chưa có dữ liệu gợi ý.</Box>
                )}
              </Box>

              <Box sx={styles.panelStyles}>
                <Box sx={styles.panelHeaderStyles}>
                  <Box>
                    <Typography as="h2" sx={styles.panelTitleStyles}>
                      Feedback AI
                    </Typography>
                    <Typography as="p" sx={styles.panelSubtitleStyles}>
                      {stats?.feedback.total ?? 0} đánh giá từ người dùng.
                    </Typography>
                  </Box>
                </Box>

                <Box sx={styles.chartBoxStyles}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={feedbackChart}
                        dataKey="value"
                        innerRadius={62}
                        outerRadius={96}
                        paddingAngle={6}
                      >
                        <Label
                          content={({ viewBox }) => {
                            if (!viewBox || !("cx" in viewBox)) return null;
                            const { cx, cy } = viewBox as {
                              cx: number;
                              cy: number;
                            };
                            const total = stats?.feedback.total ?? 0;
                            return (
                              <g>
                                <text
                                  x={cx}
                                  y={cy - 9}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  style={{
                                    fontSize: 22,
                                    fontWeight: 900,
                                    fill: centerFill,
                                  }}
                                >
                                  {total.toLocaleString("vi-VN")}
                                </text>
                                <text
                                  x={cx}
                                  y={cy + 12}
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    fill: centerSubFill,
                                  }}
                                >
                                  đánh giá
                                </text>
                              </g>
                            );
                          }}
                        />
                        {feedbackChart.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={feedbackColors[index % feedbackColors.length]}
                            opacity={
                              !selectedAiFeedback ||
                              entry.feedback === selectedAiFeedback
                                ? 1
                                : 0.52
                            }
                            stroke={
                              entry.feedback === selectedAiFeedback
                                ? centerFill
                                : "transparent"
                            }
                            strokeWidth={
                              entry.feedback === selectedAiFeedback ? 2 : 0
                            }
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleSelectAiFeedback(entry.feedback)
                            }
                          />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                <Box sx={styles.listStackStyles}>
                  {feedbackChart.map((item, index) => (
                    <Box
                      key={item.name}
                      component="div"
                      role="button"
                      tabIndex={0}
                      sx={styles.feedbackFilterItemStyles(
                        item.feedback === selectedAiFeedback,
                      )}
                      onClick={() => handleSelectAiFeedback(item.feedback)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleSelectAiFeedback(item.feedback);
                        }
                      }}
                    >
                      <Typography as="p" sx={styles.topItemNameStyles}>
                        {index === 0 ? (
                          <ThumbsUp size={15} />
                        ) : (
                          <ThumbsDown size={15} />
                        )}{" "}
                        {item.name} · {item.percent}%
                      </Typography>
                      <Typography as="span" sx={styles.countBadgeStyles}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            <Box sx={styles.dashboardGridStyles}>
              <Box sx={styles.panelStyles}>
                <Box sx={styles.panelHeaderStyles}>
                  <Box>
                    <Typography as="h2" sx={styles.panelTitleStyles}>
                      Nhãn sức khỏe demo nổi bật
                    </Typography>
                    <Typography as="p" sx={styles.panelSubtitleStyles}>
                      Tín hiệu từ 6 bệnh lý/dị ứng đang dùng trong demo.
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.listStackStyles}>
                  {(stats?.top_health_conditions ?? []).length > 0 ? (
                    stats?.top_health_conditions.map((item) => (
                      <Box key={item.name} sx={styles.topItemStyles}>
                        <Typography as="p" sx={styles.topItemNameStyles}>
                          {item.name}
                        </Typography>
                        <Typography as="span" sx={styles.countBadgeStyles}>
                          {item.count}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Box sx={styles.emptyPanelStyles}>
                      Chưa có tín hiệu sức khỏe.
                    </Box>
                  )}
                </Box>
              </Box>

              <Box sx={styles.panelStyles}>
                <Box sx={styles.panelHeaderStyles}>
                  <Box>
                    <Typography as="h2" sx={styles.panelTitleStyles}>
                      {activeAiFeedbackCopy.title}
                    </Typography>
                    <Typography as="p" sx={styles.panelSubtitleStyles}>
                      {activeAiFeedbackCopy.subtitle}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.feedbackListScrollStyles}>
                  {feedbackItemsLoading ? (
                    <>
                      {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          variant="rounded"
                          animation="wave"
                          height={92}
                          sx={{ borderRadius: 3 }}
                        />
                      ))}
                    </>
                  ) : feedbackItems.length > 0 ? (
                    feedbackItems.map((item) => (
                      <Box
                        key={`${item.message_id}-${item.feedback}-${item.created_at}`}
                        sx={styles.feedbackItemStyles}
                      >
                        <Box sx={styles.feedbackMetaStyles}>
                          <Chip
                            size="small"
                            color={
                              item.feedback === "like" ? "success" : "error"
                            }
                            label={
                              item.feedback === "like" ? "Like" : "Dislike"
                            }
                          />
                          <span>{item.user_email ?? "Ẩn danh"}</span>
                        </Box>
                        <Typography as="p" sx={styles.feedbackContentStyles}>
                          {item.query || item.assistant_content}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Box sx={styles.emptyPanelStyles}>
                      {activeAiFeedbackCopy.empty}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </AdminShell>
      <Drawer
        anchor="right"
        open={Boolean(selectedReviewGroup)}
        onClose={() => setSelectedReviewGroup(null)}
        slotProps={{
          paper: { sx: styles.reviewDrawerPaperStyles },
        }}
      >
        {selectedReviewGroup ? (
          <Box sx={styles.reviewDrawerContentStyles}>
            <Box sx={styles.reviewDrawerHeaderStyles}>
              <Box>
                <Typography as="p" sx={styles.panelSubtitleStyles}>
                  Chi tiết feedback món
                </Typography>
                <Typography as="h2" sx={styles.panelTitleStyles}>
                  {selectedReviewGroup.foodName}
                </Typography>
              </Box>
              <Button
                type="button"
                variant="ghost"
                sx={styles.reviewDrawerCloseButtonStyles}
                onClick={() => setSelectedReviewGroup(null)}
              >
                <X size={18} />
              </Button>
            </Box>

            <Box sx={styles.reviewDrawerSummaryStyles}>
              <Box>
                <Typography as="p" sx={styles.kpiLabelStyles}>
                  Feedback
                </Typography>
                <Typography as="p" sx={styles.kpiValueStyles}>
                  {selectedReviewGroup.feedbacks.length}
                </Typography>
              </Box>
              <Box>
                <Typography as="p" sx={styles.kpiLabelStyles}>
                  {activeFeedbackCopy.metric}
                </Typography>
                <Typography as="p" sx={styles.kpiValueStyles}>
                  {selectedReviewGroup.feedbackCount}
                </Typography>
              </Box>
            </Box>

            {selectedReviewGroup.reasons.length > 0 ? (
              <Box sx={styles.reviewReasonWrapStyles}>
                {selectedReviewGroup.reasons.map((reason) => (
                  <Chip key={reason} size="small" label={reason} />
                ))}
              </Box>
            ) : null}

            <Box sx={styles.reviewDrawerListStyles}>
              {selectedReviewGroup.feedbacks.map((item) => (
                <Box key={item.id} sx={styles.feedbackItemStyles}>
                  <Box sx={styles.feedbackMetaStyles}>
                    <Chip
                      size="small"
                      color={getVerdictColor(item.verdict)}
                      label={getVerdictLabel(item.verdict)}
                    />
                    <span>{item.user_email ?? "Ẩn danh"}</span>
                    {item.rating ? <span>{item.rating}/5 sao</span> : null}
                  </Box>
                  {item.query ? (
                    <Typography as="p" sx={styles.reviewDrawerQueryStyles}>
                      {item.query}
                    </Typography>
                  ) : null}
                  <Typography as="p" sx={styles.feedbackContentStyles}>
                    {item.comment ||
                      item.reasons.join(", ") ||
                      "Chưa có ghi chú."}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ) : null}
      </Drawer>
    </Box>
  );
}
