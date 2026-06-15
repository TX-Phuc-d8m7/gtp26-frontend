/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

// ─── Design tokens ──────────────────────────────────────────────────────────

const light = {
  cardBg: "#FFFFFF",
  cardBorder: "#E5E7EB",
  cardShadow: "0 12px 28px rgba(15, 23, 42, 0.06)",
  text: "#1F2937",
  textSub: "#4B5563",
  textMuted: "#6B7280",
} as const;

const dark = {
  cardBg: "#1C1917",
  cardBorder: "rgba(255,247,237,0.12)",
  cardShadow: "0 18px 42px rgba(0,0,0,0.46)",
  text: "#FFF7ED",
  textSub: "rgba(255,247,237,0.62)",
  textMuted: "rgba(255,247,237,0.42)",
} as const;

// ─── Stats bar ───────────────────────────────────────────────────────────────

type StatTone = "total" | "today" | "warning" | "clean";

const statsPalette: Record<
  StatTone,
  { color: string; bg: string; border: string; darkColor: string; darkBg: string; darkBorder: string }
> = {
  total: {
    color: "#1D4ED8", bg: "rgba(37,99,235,0.07)", border: "rgba(37,99,235,0.14)",
    darkColor: "#93C5FD", darkBg: "rgba(37,99,235,0.1)", darkBorder: "rgba(37,99,235,0.18)",
  },
  today: {
    color: "#15803D", bg: "rgba(22,163,74,0.07)", border: "rgba(22,163,74,0.16)",
    darkColor: "#86EFAC", darkBg: "rgba(22,163,74,0.1)", darkBorder: "rgba(22,163,74,0.18)",
  },
  warning: {
    color: "#B45309", bg: "rgba(217,119,6,0.08)", border: "rgba(217,119,6,0.18)",
    darkColor: "#FCD34D", darkBg: "rgba(217,119,6,0.1)", darkBorder: "rgba(217,119,6,0.2)",
  },
  clean: {
    color: light.textSub, bg: "#F3F4F6", border: "#E5E7EB",
    darkColor: dark.textSub, darkBg: "rgba(255,247,237,0.06)", darkBorder: "rgba(255,247,237,0.1)",
  },
};

export const statsBarStyles = () => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
});

export const statsBadgeStyles = (tone: StatTone) => () => {
  const p = statsPalette[tone];
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.6,
    px: 1.25,
    py: 0.75,
    borderRadius: 999,
    border: `1px solid ${p.border}`,
    backgroundColor: p.bg,
    color: p.color,
    fontSize: 12,
    fontWeight: 800,
    ".dark &": { borderColor: p.darkBorder, backgroundColor: p.darkBg, color: p.darkColor },
  };
};

// ─── Toolbar ─────────────────────────────────────────────────────────────────

export const headerActionStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
});

export const toolbarStyles = () => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 1.5,
});

export const fieldStyles = () => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: light.cardBg,
    color: light.text,
    fontWeight: 650,
    "& fieldset": { borderColor: light.cardBorder },
    "&:hover fieldset": { borderColor: "rgba(249,115,22,0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#EA580C",
      boxShadow: "0 0 0 3px rgba(234,88,12,0.1)",
    },
  },
  "& .MuiInputLabel-root": { color: light.textSub, fontWeight: 800 },
  ".dark &": {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "transparent",
      color: dark.text,
      "& fieldset": { borderColor: dark.cardBorder },
      "&:hover fieldset": { borderColor: "rgba(249,115,22,0.3)" },
      "&.Mui-focused fieldset": { borderColor: "#FF9A1F" },
    },
    "& .MuiInputLabel-root": { color: dark.textSub },
  },
});

export const searchFieldStyles = () => ({
  ...fieldStyles(),
  maxWidth: 320,
});

export const dateFieldStyles = () => ({
  ...fieldStyles(),
  maxWidth: 180,
});

// ─── Table panel ─────────────────────────────────────────────────────────────

export const tablePanelStyles = () => ({
  borderRadius: 4,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: light.cardBg,
  boxShadow: light.cardShadow,
  overflow: "hidden",
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.cardBg,
    boxShadow: dark.cardShadow,
  },
});

export const tableStyles = () => ({
  "& .MuiTableHead-root .MuiTableCell-root": {
    color: light.textMuted,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    borderBottomColor: light.cardBorder,
    backgroundColor: "#F9FAFB",
    ".dark &": {
      color: dark.textMuted,
      borderBottomColor: dark.cardBorder,
      backgroundColor: "rgba(255,247,237,0.025)",
    },
  },
  "& .MuiTableBody-root .MuiTableCell-root": {
    color: light.text,
    borderBottomColor: light.cardBorder,
    ".dark &": { color: dark.text, borderBottomColor: dark.cardBorder },
  },
});

export const clickableRowStyles = () => ({
  cursor: "pointer",
  "&:last-child td": { border: 0 },
  "&:hover td": {
    backgroundColor: "rgba(249,115,22,0.04)",
    ".dark &": { backgroundColor: "rgba(249,115,22,0.06)" },
  },
});

// ─── Query cell ───────────────────────────────────────────────────────────────

export const queryCellStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: 0.35,
  minWidth: 0,
});

export const queryTextStyles = () => ({
  color: light.text,
  fontSize: 13,
  fontWeight: 850,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: 340,
  ".dark &": { color: dark.text },
});

export const queryMetaStyles = () => ({
  color: light.textMuted,
  fontSize: 11,
  fontWeight: 700,
  ".dark &": { color: dark.textMuted },
});

// ─── Pipeline funnel ─────────────────────────────────────────────────────────

export const pipelineCellStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
});

export const pipelineNumStyles = (highlight: boolean) => () => ({
  fontSize: 12,
  fontWeight: highlight ? 900 : 700,
  color: highlight ? "#EA580C" : light.textSub,
  ".dark &": { color: highlight ? "#FF9A1F" : dark.textSub },
});

export const pipelineArrowStyles = () => ({
  fontSize: 11,
  color: light.textMuted,
  ".dark &": { color: dark.textMuted },
});

// ─── Tag chips ────────────────────────────────────────────────────────────────

export const tagChipStyles = (variant: "include" | "exclude") => () => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.4,
  px: 0.9,
  py: 0.3,
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 800,
  ...(variant === "include"
    ? {
        color: "#15803D",
        backgroundColor: "rgba(22,163,74,0.08)",
        border: "1px solid rgba(22,163,74,0.2)",
        ".dark &": { color: "#86EFAC", backgroundColor: "rgba(22,163,74,0.12)", borderColor: "rgba(22,163,74,0.22)" },
      }
    : {
        color: "#B45309",
        backgroundColor: "rgba(217,119,6,0.08)",
        border: "1px solid rgba(217,119,6,0.2)",
        ".dark &": { color: "#FCD34D", backgroundColor: "rgba(217,119,6,0.12)", borderColor: "rgba(217,119,6,0.22)" },
      }),
});

export const tagChipGroupStyles = () => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0.5,
  alignItems: "center",
});

// ─── Warning badge ────────────────────────────────────────────────────────────

export const warningBadgeStyles = (hasWarning: boolean) => () => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.4,
  px: 0.9,
  py: 0.35,
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 900,
  ...(hasWarning
    ? {
        color: "#B45309",
        backgroundColor: "rgba(217,119,6,0.1)",
        border: "1px solid rgba(217,119,6,0.22)",
        ".dark &": { color: "#FCD34D", backgroundColor: "rgba(217,119,6,0.14)", borderColor: "rgba(217,119,6,0.25)" },
      }
    : {
        color: light.textMuted,
        backgroundColor: "rgba(0,0,0,0.04)",
        border: `1px solid ${light.cardBorder}`,
        ".dark &": { color: dark.textMuted, backgroundColor: "rgba(255,247,237,0.04)", borderColor: dark.cardBorder },
      }),
});

// ─── Action button ────────────────────────────────────────────────────────────

export const iconActionButtonStyles = () => ({
  minWidth: "unset",
  width: 32,
  height: 32,
  p: 0,
  borderRadius: 2,
  color: light.textSub,
  border: "1px solid transparent",
  "&:hover": {
    color: "#EA580C",
    borderColor: "#FDBA74",
    backgroundColor: "#FFF7ED",
  },
  ".dark &": {
    color: dark.textSub,
    "&:hover": {
      color: "#FF9A1F",
      borderColor: "rgba(255,154,31,0.28)",
      backgroundColor: "rgba(255,154,31,0.1)",
    },
  },
});

export const dangerActionButtonStyles = () => ({
  ...iconActionButtonStyles(),
  "&:hover": {
    color: "#DC2626",
    borderColor: "rgba(220,38,38,0.25)",
    backgroundColor: "rgba(220,38,38,0.07)",
  },
  ".dark &": {
    ...iconActionButtonStyles()[".dark &"],
    "&:hover": {
      color: "#FCA5A5",
      borderColor: "rgba(220,38,38,0.25)",
      backgroundColor: "rgba(220,38,38,0.1)",
    },
  },
});

export const actionCellStyles = () => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 0.5,
});

// ─── Pagination ───────────────────────────────────────────────────────────────

export const paginationStyles = () => ({
  borderTop: `1px solid ${light.cardBorder}`,
  color: light.textSub,
  fontSize: 13,
  ".dark &": { borderTopColor: dark.cardBorder, color: dark.textSub },
});

// ─── Empty state ──────────────────────────────────────────────────────────────

export const emptyStateStyles = () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
  py: 6,
  color: light.textMuted,
  ".dark &": { color: dark.textMuted },
});

export const emptyStateTitleStyles = () => ({
  fontSize: 16,
  fontWeight: 900,
  color: light.textSub,
  ".dark &": { color: dark.textSub },
});

export const emptyStateSubtitleStyles = () => ({
  fontSize: 13,
  fontWeight: 700,
  color: light.textMuted,
  ".dark &": { color: dark.textMuted },
});

export const messageStyles = () => ({
  borderRadius: 3,
  border: "1px solid #FDBA74",
  backgroundColor: "#FFF7ED",
  color: "#EA580C",
  fontSize: 13,
  fontWeight: 800,
  px: 2,
  py: 1,
  ".dark &": {
    borderColor: "rgba(255,154,31,0.28)",
    backgroundColor: "rgba(255,154,31,0.1)",
    color: "#FF9A1F",
  },
});

// ─── Detail drawer ────────────────────────────────────────────────────────────

export const drawerPaperStyles = () => ({
  width: { xs: "100%", sm: 500 },
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

export const drawerContentStyles = () => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflow: "hidden",
});

export const drawerHeaderStyles = () => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1.5,
  p: 2.5,
  pb: 1.5,
  borderBottom: `1px solid ${light.cardBorder}`,
  flexShrink: 0,
  ".dark &": { borderBottomColor: dark.cardBorder },
});

export const drawerTitleStyles = () => ({
  fontSize: 16,
  fontWeight: 900,
  color: light.text,
  ".dark &": { color: dark.text },
});

export const drawerQueryBubbleStyles = () => ({
  mt: 0.75,
  px: 1.25,
  py: 0.85,
  borderRadius: 3,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: "rgba(249,115,22,0.04)",
  color: light.text,
  fontSize: 13,
  fontWeight: 750,
  lineHeight: 1.55,
  wordBreak: "break-word",
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: "rgba(255,247,237,0.04)",
    color: dark.text,
  },
});

export const drawerCloseButtonStyles = () => ({
  minWidth: 0,
  width: 36,
  height: 36,
  borderRadius: 999,
  flexShrink: 0,
  color: light.textSub,
  ".dark &": { color: dark.textSub },
});

export const drawerScrollAreaStyles = () => ({
  flex: 1,
  overflowY: "auto",
  overscrollBehavior: "contain",
  p: 2.5,
  pt: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(249,115,22,0.3) transparent",
  "&::-webkit-scrollbar": { width: 5 },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": { borderRadius: 999, backgroundColor: "rgba(249,115,22,0.3)" },
});

export const drawerSectionStyles = () => ({
  display: "flex",
  flexDirection: "column",
  gap: 1,
});

export const drawerSectionLabelStyles = () => ({
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: light.textMuted,
  ".dark &": { color: dark.textMuted },
});

export const drawerSectionCardStyles = () => ({
  borderRadius: 3,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: "rgba(249,115,22,0.03)",
  p: 1.5,
  ".dark &": { borderColor: dark.cardBorder, backgroundColor: "rgba(255,247,237,0.03)" },
});

// ─── Pipeline funnel (drawer) ─────────────────────────────────────────────────

export const funnelRowStyles = () => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  flexWrap: "wrap",
});

export const funnelStepStyles = (isLast: boolean) => () => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 0.25,
  minWidth: 60,
  flex: 1,
  borderRadius: 2,
  border: `1px solid ${isLast ? "rgba(249,115,22,0.3)" : light.cardBorder}`,
  backgroundColor: isLast ? "rgba(249,115,22,0.06)" : "rgba(0,0,0,0.02)",
  py: 1,
  px: 0.5,
  ".dark &": {
    borderColor: isLast ? "rgba(249,115,22,0.35)" : dark.cardBorder,
    backgroundColor: isLast ? "rgba(249,115,22,0.09)" : "rgba(255,247,237,0.025)",
  },
});

export const funnelNumStyles = (isLast: boolean) => () => ({
  fontSize: 20,
  fontWeight: 900,
  lineHeight: 1,
  color: isLast ? "#EA580C" : light.text,
  ".dark &": { color: isLast ? "#FF9A1F" : dark.text },
});

export const funnelLabelStyles = () => ({
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: light.textMuted,
  textAlign: "center",
  ".dark &": { color: dark.textMuted },
});

export const funnelArrowStyles = () => ({
  color: light.textMuted,
  flexShrink: 0,
  ".dark &": { color: dark.textMuted },
});

// ─── Top results list ─────────────────────────────────────────────────────────

export const topResultItemStyles = (rank: number) => () => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 1,
  py: 0.75,
  borderRadius: 2,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: rank === 1 ? "rgba(249,115,22,0.05)" : "rgba(0,0,0,0.02)",
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: rank === 1 ? "rgba(249,115,22,0.07)" : "rgba(255,247,237,0.025)",
  },
});

export const rankBadgeStyles = (rank: number) => () => ({
  flexShrink: 0,
  width: 22,
  height: 22,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  fontSize: 10,
  fontWeight: 900,
  color: rank === 1 ? "#FFFFFF" : light.textSub,
  background: rank === 1
    ? "linear-gradient(135deg, #F97316 0%, #EA580C 100%)"
    : "rgba(0,0,0,0.07)",
  ".dark &": {
    color: rank === 1 ? "#FFFFFF" : dark.textSub,
    background: rank === 1
      ? "linear-gradient(135deg, #F97316 0%, #EA580C 100%)"
      : "rgba(255,247,237,0.1)",
  },
});

export const topResultNameStyles = () => ({
  flex: 1,
  minWidth: 0,
  fontSize: 13,
  fontWeight: 800,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: light.text,
  ".dark &": { color: dark.text },
});

export const topResultScoreStyles = () => ({
  flexShrink: 0,
  fontSize: 11,
  fontWeight: 900,
  color: light.textMuted,
  ".dark &": { color: dark.textMuted },
});

// ─── Warning box ──────────────────────────────────────────────────────────────

export const warningBoxStyles = () => ({
  display: "flex",
  gap: 1,
  borderRadius: 3,
  border: "1px solid rgba(217,119,6,0.25)",
  backgroundColor: "rgba(217,119,6,0.06)",
  p: 1.5,
  ".dark &": {
    borderColor: "rgba(253,211,77,0.2)",
    backgroundColor: "rgba(253,211,77,0.05)",
  },
});

export const warningTextStyles = () => ({
  fontSize: 13,
  fontWeight: 750,
  lineHeight: 1.55,
  color: "#92400E",
  ".dark &": { color: "#FCD34D" },
});

// ─── Notes list ───────────────────────────────────────────────────────────────

export const noteItemStyles = () => ({
  fontSize: 12,
  fontWeight: 700,
  color: light.textSub,
  lineHeight: 1.5,
  pl: 1.5,
  borderLeft: `2px solid rgba(249,115,22,0.3)`,
  ".dark &": { color: dark.textSub },
});

// ─── Barrel ───────────────────────────────────────────────────────────────────

export const styles = {
  actionCellStyles,
  clickableRowStyles,
  dangerActionButtonStyles,
  dateFieldStyles,
  drawerCloseButtonStyles,
  drawerContentStyles,
  drawerHeaderStyles,
  drawerPaperStyles,
  drawerQueryBubbleStyles,
  drawerScrollAreaStyles,
  drawerSectionCardStyles,
  drawerSectionLabelStyles,
  drawerSectionStyles,
  drawerTitleStyles,
  emptyStateStyles,
  emptyStateSubtitleStyles,
  emptyStateTitleStyles,
  funnelArrowStyles,
  funnelLabelStyles,
  funnelNumStyles,
  funnelRowStyles,
  funnelStepStyles,
  headerActionStyles,
  iconActionButtonStyles,
  messageStyles,
  noteItemStyles,
  paginationStyles,
  pipelineArrowStyles,
  pipelineCellStyles,
  pipelineNumStyles,
  queryCellStyles,
  queryMetaStyles,
  queryTextStyles,
  rankBadgeStyles,
  searchFieldStyles,
  statsBadgeStyles,
  statsBarStyles,
  tablePanelStyles,
  tableStyles,
  tagChipGroupStyles,
  tagChipStyles,
  toolbarStyles,
  topResultItemStyles,
  topResultNameStyles,
  topResultScoreStyles,
  warningBadgeStyles,
  warningBoxStyles,
  warningTextStyles,
} as const;
