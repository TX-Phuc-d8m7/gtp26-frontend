/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

import type { UserRoleFilter, UserStatusFilter } from ".";

// ─── Design tokens ──────────────────────────────────────────────────────────

const light = {
  cardBg: "#FFFFFF",
  cardBorder: "rgba(0,0,0,0.055)",
  cardShadow: "0 2px 12px rgba(0,0,0,0.07)",
  text: "#1C1917",
  textSub: "#78716C",
  textMuted: "#A8A29E",
  green: "#15803D",
  orange: "#C2410C",
  blue: "#1D4ED8",
} as const;

const dark = {
  cardBg: "#1E1B18",
  cardBorder: "rgba(255,247,237,0.07)",
  cardShadow: "0 4px 24px rgba(0,0,0,0.4)",
  text: "#F5EFE8",
  textSub: "rgba(245,239,232,0.55)",
  textMuted: "rgba(245,239,232,0.35)",
  green: "#84CC16",
  orange: "#F97316",
  blue: "#38BDF8",
} as const;

// ─── Stats bar ───────────────────────────────────────────────────────────────

type StatTone = "total" | "active" | "inactive" | "admin";
const statsPalette: Record<
  StatTone,
  {
    color: string;
    bg: string;
    border: string;
    darkColor: string;
    darkBg: string;
    darkBorder: string;
  }
> = {
  total: {
    color: "#1D4ED8",
    bg: "rgba(37,99,235,0.07)",
    border: "rgba(37,99,235,0.14)",
    darkColor: "#93C5FD",
    darkBg: "rgba(37,99,235,0.1)",
    darkBorder: "rgba(37,99,235,0.18)",
  },
  active: {
    color: "#15803D",
    bg: "rgba(22,163,74,0.07)",
    border: "rgba(22,163,74,0.16)",
    darkColor: "#86EFAC",
    darkBg: "rgba(22,163,74,0.1)",
    darkBorder: "rgba(22,163,74,0.18)",
  },
  inactive: {
    color: "#C2410C",
    bg: "rgba(249,115,22,0.08)",
    border: "rgba(249,115,22,0.18)",
    darkColor: "#FDBA74",
    darkBg: "rgba(249,115,22,0.1)",
    darkBorder: "rgba(249,115,22,0.2)",
  },
  admin: {
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.07)",
    border: "rgba(124,58,237,0.16)",
    darkColor: "#C4B5FD",
    darkBg: "rgba(124,58,237,0.1)",
    darkBorder: "rgba(124,58,237,0.18)",
  },
};

export const statsBarStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
});

export const statsBadgeStyles = (tone: StatTone) => (theme: Theme) => {
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
    ".dark &": {
      borderColor: p.darkBorder,
      backgroundColor: p.darkBg,
      color: p.darkColor,
    },
  };
};

// ─── Toolbar ─────────────────────────────────────────────────────────────────

export const headerActionStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
});

export const toolbarStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 1.5,
});

export const fieldStyles = (theme: Theme) => ({
  maxWidth: 360,
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: light.cardBg,
    color: light.text,
    fontWeight: 650,
    "& fieldset": { borderColor: light.cardBorder },
    "&:hover fieldset": { borderColor: "rgba(249,115,22,0.4)" },
    "&.Mui-focused fieldset": {
      borderColor: "#F97316",
      boxShadow: "0 0 0 3px rgba(249,115,22,0.1)",
    },
  },
  "& .MuiInputLabel-root": { color: light.textSub, fontWeight: 800 },
  ".dark &": {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "transparent",
      color: dark.text,
      "& fieldset": { borderColor: dark.cardBorder },
      "&:hover fieldset": { borderColor: "rgba(249,115,22,0.3)" },
      "&.Mui-focused fieldset": { borderColor: "#F97316" },
    },
    "& .MuiInputLabel-root": { color: dark.textSub },
  },
});

export const filterBlockStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.75,
});

export const filterLabelStyles = (theme: Theme) => ({
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: light.textMuted,
  whiteSpace: "nowrap",
  ".dark &": { color: dark.textMuted },
});

export const filterSeparatorStyles = (theme: Theme) => ({
  width: "1px",
  height: 20,
  backgroundColor: light.cardBorder,
  flexShrink: 0,
  ".dark &": { backgroundColor: dark.cardBorder },
});

export const filterGroupStyles = (theme: Theme) => ({
  display: "flex",
  gap: 0.75,
  flexWrap: "wrap",
});

export const filterPillStyles =
  (active: boolean) => (theme: Theme) => ({
    display: "inline-flex",
    alignItems: "center",
    px: 1.25,
    py: 0.65,
    borderRadius: 999,
    border: "1px solid",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
    transition: "background-color 120ms ease, color 120ms ease",
    borderColor: active ? "#F97316" : light.cardBorder,
    backgroundColor: active ? "#F97316" : "transparent",
    color: active ? "#FFFFFF" : light.textSub,
    "&:hover": {
      borderColor: "#F97316",
      backgroundColor: active ? "#EA580C" : "rgba(249,115,22,0.08)",
      color: active ? "#FFFFFF" : "#C2410C",
    },
    ".dark &": {
      borderColor: active ? "#F97316" : dark.cardBorder,
      backgroundColor: active ? "#F97316" : "transparent",
      color: active ? "#FFFFFF" : dark.textSub,
    },
  });

// ─── Table panel ─────────────────────────────────────────────────────────────

export const tablePanelStyles = (theme: Theme) => ({
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

export const tableStyles = (theme: Theme) => ({
  "& .MuiTableHead-root .MuiTableCell-root": {
    color: light.textMuted,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    borderBottomColor: light.cardBorder,
    backgroundColor: "rgba(0,0,0,0.015)",
    ".dark &": {
      color: dark.textMuted,
      borderBottomColor: dark.cardBorder,
      backgroundColor: "rgba(255,247,237,0.025)",
    },
  },
  "& .MuiTableBody-root .MuiTableCell-root": {
    color: light.text,
    borderBottomColor: light.cardBorder,
    ".dark &": {
      color: dark.text,
      borderBottomColor: dark.cardBorder,
    },
  },
});

export const clickableRowStyles = (theme: Theme) => ({
  cursor: "pointer",
  "&:last-child td": { border: 0 },
  "&:hover td": {
    backgroundColor: "rgba(249,115,22,0.04)",
    ".dark &": { backgroundColor: "rgba(249,115,22,0.06)" },
  },
});

// ─── User cell ────────────────────────────────────────────────────────────────

export const userCellStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  minWidth: 0,
});

export const avatarStyles = (isAdmin: boolean) => (theme: Theme) => ({
  flexShrink: 0,
  width: 36,
  height: 36,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  fontSize: 14,
  fontWeight: 900,
  color: "#FFFFFF",
  background: isAdmin
    ? "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)"
    : "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
  boxShadow: isAdmin
    ? "0 3px 10px rgba(124,58,237,0.25)"
    : "0 3px 10px rgba(234,88,12,0.25)",
});

export const userNameStyles = (theme: Theme) => ({
  color: light.text,
  fontSize: 13,
  fontWeight: 850,
  lineHeight: 1.2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ".dark &": { color: dark.text },
});

export const userEmailStyles = (theme: Theme) => ({
  color: light.textSub,
  fontSize: 12,
  fontWeight: 650,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ".dark &": { color: dark.textSub },
});

// ─── Badges ───────────────────────────────────────────────────────────────────

export const roleBadgeStyles = (role: string) => (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.4,
  px: 1,
  py: 0.4,
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.04em",
  ...(role === "admin"
    ? {
        color: "#7C3AED",
        backgroundColor: "rgba(124,58,237,0.08)",
        border: "1px solid rgba(124,58,237,0.18)",
        ".dark &": {
          color: "#C4B5FD",
          backgroundColor: "rgba(124,58,237,0.12)",
          borderColor: "rgba(124,58,237,0.22)",
        },
      }
    : {
        color: light.textSub,
        backgroundColor: "rgba(0,0,0,0.04)",
        border: `1px solid ${light.cardBorder}`,
        ".dark &": {
          color: dark.textSub,
          backgroundColor: "rgba(255,247,237,0.05)",
          borderColor: dark.cardBorder,
        },
      }),
});

export const statusBadgeStyles = (isActive: boolean) => (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.4,
  px: 1,
  py: 0.4,
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 900,
  ...(isActive
    ? {
        color: "#15803D",
        backgroundColor: "rgba(22,163,74,0.08)",
        border: "1px solid rgba(22,163,74,0.18)",
        ".dark &": {
          color: "#86EFAC",
          backgroundColor: "rgba(22,163,74,0.1)",
          borderColor: "rgba(22,163,74,0.22)",
        },
      }
    : {
        color: "#C2410C",
        backgroundColor: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.18)",
        ".dark &": {
          color: "#FCA5A5",
          backgroundColor: "rgba(239,68,68,0.1)",
          borderColor: "rgba(239,68,68,0.22)",
        },
      }),
});

// ─── Actions ─────────────────────────────────────────────────────────────────

export const actionCellStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 0.5,
});

export const iconActionButtonStyles = (theme: Theme) => ({
  minWidth: "unset",
  width: 32,
  height: 32,
  p: 0,
  borderRadius: 2,
  color: light.textSub,
  border: `1px solid transparent`,
  "&:hover": {
    color: "#C2410C",
    borderColor: "rgba(249,115,22,0.25)",
    backgroundColor: "rgba(249,115,22,0.07)",
  },
  ".dark &": {
    color: dark.textSub,
    "&:hover": {
      color: "#FDBA74",
      borderColor: "rgba(249,115,22,0.25)",
      backgroundColor: "rgba(249,115,22,0.1)",
    },
  },
});

// ─── Pagination ───────────────────────────────────────────────────────────────

export const paginationStyles = (theme: Theme) => ({
  borderTop: `1px solid ${light.cardBorder}`,
  color: light.textSub,
  fontSize: 13,
  ".dark &": {
    borderTopColor: dark.cardBorder,
    color: dark.textSub,
  },
});

// ─── Empty state ─────────────────────────────────────────────────────────────

export const emptyStateStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
  py: 6,
  color: light.textMuted,
  ".dark &": { color: dark.textMuted },
});

export const emptyStateTitleStyles = (theme: Theme) => ({
  fontSize: 16,
  fontWeight: 900,
  color: light.textSub,
  ".dark &": { color: dark.textSub },
});

export const emptyStateSubtitleStyles = (theme: Theme) => ({
  fontSize: 13,
  fontWeight: 700,
  color: light.textMuted,
  ".dark &": { color: dark.textMuted },
});

export const messageStyles = (theme: Theme) => ({
  borderRadius: 3,
  border: `1px solid rgba(249,115,22,0.22)`,
  backgroundColor: "rgba(249,115,22,0.07)",
  color: "#C2410C",
  fontSize: 13,
  fontWeight: 800,
  px: 2,
  py: 1,
  ".dark &": {
    borderColor: "rgba(249,115,22,0.28)",
    backgroundColor: "rgba(249,115,22,0.1)",
    color: "#FDBA74",
  },
});

// ─── Barrel ───────────────────────────────────────────────────────────────────

export const styles = {
  actionCellStyles,
  avatarStyles,
  clickableRowStyles,
  emptyStateStyles,
  emptyStateSubtitleStyles,
  emptyStateTitleStyles,
  fieldStyles,
  filterBlockStyles,
  filterGroupStyles,
  filterLabelStyles,
  filterPillStyles,
  filterSeparatorStyles,
  headerActionStyles,
  iconActionButtonStyles,
  messagestyles: messageStyles,
  messageStyles,
  paginationStyles,
  roleBadgeStyles,
  statsBadgeStyles,
  statsBarStyles,
  statusBadgeStyles,
  tablePanelStyles,
  tableStyles,
  toolbarStyles,
  userCellStyles,
  userEmailStyles,
  userNameStyles,
} as const;
