/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

import type { AdminKpiCard, AdminKpiCardTrend } from ".";

// ─── Design tokens ──────────────────────────────────────────────────────────

const light = {
  pageBg: "#F9FAFB",
  cardBg: "#FFFFFF",
  cardBorder: "#E5E7EB",
  cardShadow: "0 12px 28px rgba(15, 23, 42, 0.06)",
  itemBg: "#FFF7ED",
  itemBorder: "#FED7AA",
  text: "#1F2937",
  textSub: "#4B5563",
  textMuted: "#6B7280",
  accent: "#EA580C",
} as const;

const dark = {
  pageBg: "#0C0A09",
  cardBg: "#1C1917",
  cardBorder: "rgba(255,247,237,0.12)",
  cardShadow: "0 18px 42px rgba(0,0,0,0.46)",
  itemBg: "rgba(255,247,237,0.04)",
  itemBorder: "rgba(255,247,237,0.1)",
  text: "#FFF7ED",
  textSub: "rgba(255,247,237,0.62)",
  textMuted: "rgba(255,247,237,0.42)",
  accent: "#FF9A1F",
} as const;

// ─── Tone map for KPI cards ─────────────────────────────────────────────────

const toneMap: Record<
  AdminKpiCard["tone"],
  { accent: string; bg: string; darkBg: string }
> = {
  orange: {
    accent: "#EA580C",
    bg: "#FFF7ED",
    darkBg: "rgba(255, 154, 31, 0.12)",
  },
  green: {
    accent: "#16A34A",
    bg: "rgba(34, 197, 94, 0.09)",
    darkBg: "rgba(132, 204, 22, 0.12)",
  },
  blue: {
    accent: "#2563EB",
    bg: "rgba(37, 99, 235, 0.09)",
    darkBg: "rgba(56, 189, 248, 0.1)",
  },
  neutral: {
    accent: "#4B5563",
    bg: "#F9FAFB",
    darkBg: "rgba(255, 247, 237, 0.07)",
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export const pageStyles = (theme: Theme) => ({
  minHeight: "100dvh",
  backgroundColor: light.pageBg,
  color: light.text,
  ".dark &": {
    backgroundColor: dark.pageBg,
    color: dark.text,
  },
});

// ─── Layout grids ────────────────────────────────────────────────────────────

export const contentGridStyles = (theme: Theme) => ({
  display: "grid",
  gap: 2,
});

export const dashboardGridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    lg: "minmax(0, 1.3fr) minmax(340px, 0.7fr)",
  },
  gap: 2,
});

export const kpiGridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(4, minmax(0, 1fr))",
  },
  gap: 1.5,
});

// ─── KPI cards ───────────────────────────────────────────────────────────────

export const kpiCardStyles = (tone: AdminKpiCard["tone"]) => (theme: Theme) => {
  const toneConfig = toneMap[tone];
  return {
    borderRadius: 4,
    border: `1px solid ${light.cardBorder}`,
    backgroundColor: light.cardBg,
    boxShadow: light.cardShadow,
    p: 2,
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: "auto 14px 14px auto",
      width: 64,
      height: 64,
      borderRadius: "999px",
      background: toneConfig.bg,
      filter: "blur(10px)",
    },
    ".dark &": {
      borderColor: dark.cardBorder,
      backgroundColor: dark.cardBg,
      boxShadow: dark.cardShadow,
      "&::before": {
        background: toneConfig.darkBg,
      },
    },
  };
};

// ─── Trend badge ─────────────────────────────────────────────────────────────

const trendPalette: Record<
  AdminKpiCardTrend["direction"],
  { color: string; bg: string; darkColor: string; darkBg: string }
> = {
  up: {
    color: "#16A34A",
    bg: "rgba(34, 197, 94, 0.1)",
    darkColor: "#86EFAC",
    darkBg: "rgba(34, 197, 94, 0.14)",
  },
  down: {
    color: "#DC2626",
    bg: "rgba(220, 38, 38, 0.1)",
    darkColor: "#FCA5A5",
    darkBg: "rgba(220, 38, 38, 0.14)",
  },
  neutral: {
    color: light.textSub,
    bg: "#F3F4F6",
    darkColor: dark.textSub,
    darkBg: "rgba(255, 247, 237, 0.08)",
  },
};

export const kpiTrendStyles =
  (direction: AdminKpiCardTrend["direction"]) => (theme: Theme) => {
    const p = trendPalette[direction];
    return {
      display: "inline-flex",
      alignItems: "center",
      gap: 0.4,
      mt: 1,
      px: 0.9,
      py: 0.3,
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 900,
      lineHeight: 1.4,
      color: p.color,
      backgroundColor: p.bg,
      ".dark &": {
        color: p.darkColor,
        backgroundColor: p.darkBg,
      },
    };
  };

export const kpiLabelStyles = (theme: Theme) => ({
  color: light.textSub,
  fontSize: 12,
  fontWeight: 850,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  ".dark &": {
    color: dark.textSub,
  },
});

export const kpiValueStyles = (theme: Theme) => ({
  mt: 1,
  color: light.text,
  fontSize: {
    xs: 28,
    md: 34,
  },
  lineHeight: 1,
  fontWeight: 900,
  ".dark &": {
    color: dark.text,
  },
});

export const kpiHelperStyles = (theme: Theme) => ({
  mt: 1,
  color: light.textSub,
  fontSize: 13,
  fontWeight: 750,
  ".dark &": {
    color: dark.textSub,
  },
});

// ─── Panels ──────────────────────────────────────────────────────────────────

export const panelStyles = (theme: Theme) => ({
  borderRadius: 4,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: light.cardBg,
  boxShadow: light.cardShadow,
  p: {
    xs: 1.5,
    md: 2,
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.cardBg,
    boxShadow: dark.cardShadow,
  },
});

export const panelHeaderStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1.5,
  mb: 2,
});

export const panelTitleStyles = (theme: Theme) => ({
  color: light.text,
  fontSize: 18,
  fontWeight: 900,
  lineHeight: 1.2,
  ".dark &": {
    color: dark.text,
  },
});

export const panelSubtitleStyles = (theme: Theme) => ({
  mt: 0.4,
  color: light.textSub,
  fontSize: 13,
  fontWeight: 700,
  ".dark &": {
    color: dark.textSub,
  },
});

export const emptyPanelStyles = (theme: Theme) => ({
  display: "grid",
  minHeight: 220,
  placeItems: "center",
  color: light.textSub,
  fontWeight: 800,
  ".dark &": {
    color: dark.textSub,
  },
});

// ─── List items ───────────────────────────────────────────────────────────────

export const listStackStyles = (theme: Theme) => ({
  display: "grid",
  gap: 1,
});

export const topItemStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  gap: 1,
  alignItems: "center",
  borderRadius: 3,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: "#FFFFFF",
  px: 1.25,
  py: 1,
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.itemBg,
  },
});

export const foodFeedbackFilterItemStyles =
  (isActive: boolean) => (theme: Theme) => ({
    ...topItemStyles(theme),
    cursor: "pointer",
    outline: "none",
    transition:
      "border-color 180ms ease, background-color 180ms ease, box-shadow 180ms ease, transform 180ms ease",
    ...(isActive
      ? {
          borderColor: "#FDBA74",
          backgroundColor: light.itemBg,
          boxShadow: "0 10px 24px rgba(234,88,12,0.1)",
        }
      : {}),
    "&:hover": {
      borderColor: "#FDBA74",
      backgroundColor: "#FFF7ED",
      transform: "translateY(-1px)",
    },
    "&:focus-visible": {
      borderColor: "#F97316",
      boxShadow: "0 0 0 3px rgba(249,115,22,0.18)",
    },
    ".dark &": {
      borderColor: isActive ? "rgba(255,154,31,0.42)" : dark.cardBorder,
      backgroundColor: isActive ? "rgba(255,154,31,0.12)" : dark.itemBg,
      boxShadow: isActive ? "0 14px 34px rgba(0,0,0,0.34)" : "none",
      "&:hover": {
        borderColor: "rgba(255,154,31,0.36)",
        backgroundColor: "rgba(255,247,237,0.065)",
      },
    },
  });

export const feedbackFilterItemStyles = foodFeedbackFilterItemStyles;

export const topItemNameStyles = (theme: Theme) => ({
  overflow: "hidden",
  color: light.text,
  fontSize: 14,
  fontWeight: 850,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ".dark &": {
    color: dark.text,
  },
});

export const countBadgeStyles = (theme: Theme) => ({
  borderRadius: 999,
  backgroundColor: "#FFF7ED",
  color: "#EA580C",
  fontSize: 12,
  fontWeight: 900,
  px: 1,
  py: 0.35,
  ".dark &": {
    backgroundColor: "rgba(255, 154, 31, 0.14)",
    color: "#FF9A1F",
  },
});

// ─── Feedback ────────────────────────────────────────────────────────────────

export const feedbackItemStyles = (theme: Theme) => ({
  borderRadius: 3,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: "#FFFFFF",
  p: 1.25,
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.itemBg,
  },
});

export const feedbackMetaStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 0.8,
  color: light.textSub,
  fontSize: 12,
  fontWeight: 800,
  ".dark &": {
    color: dark.textSub,
  },
});

export const feedbackContentStyles = (theme: Theme) => ({
  mt: 0.75,
  color: "#292524",
  display: "-webkit-box",
  overflow: "hidden",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  fontSize: 13,
  lineHeight: 1.55,
  ".dark &": {
    color: "rgba(245, 239, 232, 0.84)",
  },
});

export const feedbackListScrollStyles = (theme: Theme) => ({
  ...listStackStyles(theme),
  maxHeight: {
    xs: 420,
    lg: 520,
  },
  overflowY: "auto",
  pr: 0.5,
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(249,115,22,0.34) transparent",
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 999,
    backgroundColor: "rgba(249,115,22,0.34)",
  },
  ".dark &": {
    scrollbarColor: "rgba(251,146,60,0.38) transparent",
  },
});

export const reviewScrollStyles = (theme: Theme) => ({
  display: "grid",
  gap: 1,
  maxHeight: {
    xs: 420,
    lg: 520,
  },
  overflowY: "auto",
  pr: 0.5,
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(249,115,22,0.34) transparent",
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 999,
    backgroundColor: "rgba(249,115,22,0.34)",
  },
  ".dark &": {
    scrollbarColor: "rgba(251,146,60,0.38) transparent",
  },
});

export const reviewCardStyles = (theme: Theme) => ({
  width: "100%",
  border: `1px solid ${light.cardBorder}`,
  borderRadius: 3,
  backgroundColor: "#FFFFFF",
  color: light.text,
  cursor: "pointer",
  display: "grid",
  gap: 0.9,
  p: 1.25,
  textAlign: "left",
  transition:
    "border-color 180ms ease, background-color 180ms ease, transform 180ms ease",
  "&:hover": {
    borderColor: "#FDBA74",
    backgroundColor: "#FFF7ED",
    transform: "translateY(-1px)",
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.itemBg,
    color: dark.text,
    "&:hover": {
      borderColor: "rgba(251,146,60,0.28)",
      backgroundColor: "rgba(255,247,237,0.065)",
    },
  },
});

export const reviewCardHeaderStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  alignItems: "center",
  gap: 1,
});

export const reviewCardTitleStyles = (theme: Theme) => ({
  alignItems: "center",
  color: light.text,
  display: "flex",
  gap: 0.7,
  fontSize: 14,
  fontWeight: 900,
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ".dark &": {
    color: dark.text,
  },
});

export const reviewCardMetaStyles = (theme: Theme) => ({
  alignItems: "center",
  color: light.textSub,
  display: "flex",
  flexWrap: "wrap",
  gap: 0.75,
  fontSize: 12,
  fontWeight: 800,
  ".dark &": {
    color: dark.textSub,
  },
});

export const reviewDrawerPaperStyles = (theme: Theme) => ({
  width: {
    xs: "100%",
    sm: 460,
  },
  height: "100dvh",
  overflow: "hidden",
  borderLeft: `1px solid ${light.cardBorder}`,
  backgroundColor: light.cardBg,
  color: light.text,
  ".dark &": {
    borderLeftColor: dark.cardBorder,
    backgroundColor: dark.cardBg,
    color: dark.text,
  },
});

export const reviewDrawerContentStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: 2,
  height: "100%",
  minHeight: 0,
  overflow: "hidden",
  overscrollBehavior: "contain",
  p: {
    xs: 2,
    md: 2.5,
  },
});

export const reviewDrawerHeaderStyles = (theme: Theme) => ({
  alignItems: "flex-start",
  display: "flex",
  gap: 1.5,
  justifyContent: "space-between",
});

export const reviewDrawerCloseButtonStyles = (theme: Theme) => ({
  minWidth: 0,
  width: 38,
  height: 38,
  borderRadius: 999,
  color: light.textSub,
  ".dark &": {
    color: dark.textSub,
  },
});

export const reviewDrawerSummaryStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 1,
  "& > *": {
    border: `1px solid ${light.cardBorder}`,
    borderRadius: 3,
    backgroundColor: "#FFF7ED",
    p: 1.25,
  },
  ".dark & > *": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.itemBg,
  },
});

export const reviewReasonWrapStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0.75,
  "& .MuiChip-root": {
    borderRadius: 999,
    backgroundColor: "#FFF7ED",
    color: "#EA580C",
    fontWeight: 850,
  },
  ".dark & .MuiChip-root": {
    backgroundColor: "rgba(255,154,31,0.12)",
    color: "#FF9A1F",
  },
});

export const reviewDrawerListStyles = (theme: Theme) => ({
  display: "grid",
  gap: 1,
  alignContent: "start",
  flex: 1,
  gridAutoRows: "max-content",
  minHeight: 0,
  overflowY: "auto",
  overscrollBehavior: "contain",
  pr: 0.5,
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(249,115,22,0.34) transparent",
  "&::-webkit-scrollbar": {
    width: 6,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 999,
    backgroundColor: "rgba(249,115,22,0.34)",
  },
  ".dark &": {
    scrollbarColor: "rgba(251,146,60,0.38) transparent",
  },
});

export const reviewDrawerQueryStyles = (theme: Theme) => ({
  mt: 0.8,
  color: light.textSub,
  fontSize: 12,
  fontWeight: 800,
  lineHeight: 1.5,
  ".dark &": {
    color: dark.textSub,
  },
});

// ─── Charts ──────────────────────────────────────────────────────────────────

export const chartBoxStyles = (theme: Theme) => ({
  width: "100%",
  height: 280,
});

// ─── Action button ───────────────────────────────────────────────────────────

export const actionButtonStyles = (theme: Theme) => ({
  borderRadius: 999,
  border: "1px solid #FDBA74",
  backgroundColor: "#FFF7ED",
  color: "#EA580C",
  px: 1.4,
  py: 0.7,
  fontWeight: 850,
  "&:hover": {
    backgroundColor: "#FFEDD5",
  },
  ".dark &": {
    borderColor: "rgba(255, 154, 31, 0.28)",
    backgroundColor: "rgba(255, 154, 31, 0.1)",
    color: "#FF9A1F",
    "&:hover": {
      backgroundColor: "rgba(255, 154, 31, 0.16)",
    },
  },
});

// ─── Barrel ───────────────────────────────────────────────────────────────────

export const styles = {
  actionButtonStyles,
  chartBoxStyles,
  contentGridStyles,
  countBadgeStyles,
  dashboardGridStyles,
  emptyPanelStyles,
  feedbackContentStyles,
  feedbackFilterItemStyles,
  foodFeedbackFilterItemStyles,
  feedbackItemStyles,
  feedbackListScrollStyles,
  feedbackMetaStyles,
  kpiCardStyles,
  kpiGridStyles,
  kpiHelperStyles,
  kpiLabelStyles,
  kpiTrendStyles,
  kpiValueStyles,
  listStackStyles,
  pageStyles,
  panelHeaderStyles,
  panelStyles,
  panelSubtitleStyles,
  panelTitleStyles,
  reviewCardHeaderStyles,
  reviewCardMetaStyles,
  reviewCardStyles,
  reviewCardTitleStyles,
  reviewDrawerCloseButtonStyles,
  reviewDrawerContentStyles,
  reviewDrawerHeaderStyles,
  reviewDrawerListStyles,
  reviewDrawerPaperStyles,
  reviewDrawerQueryStyles,
  reviewDrawerSummaryStyles,
  reviewReasonWrapStyles,
  reviewScrollStyles,
  topItemNameStyles,
  topItemStyles,
} as const;
