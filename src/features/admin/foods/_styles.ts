/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

import type { AdminFoodStats } from ".";

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
} as const;

// ─── Stats bar ──────────────────────────────────────────────────────────────

const statsPalette: Record<
  keyof AdminFoodStats,
  { color: string; bg: string; border: string; darkColor: string; darkBg: string; darkBorder: string }
> = {
  total: {
    color: "#1D4ED8",
    bg: "rgba(37, 99, 235, 0.07)",
    border: "rgba(37, 99, 235, 0.14)",
    darkColor: "#93C5FD",
    darkBg: "rgba(37, 99, 235, 0.1)",
    darkBorder: "rgba(37, 99, 235, 0.18)",
  },
  ready: {
    color: "#15803D",
    bg: "rgba(22, 163, 74, 0.07)",
    border: "rgba(22, 163, 74, 0.16)",
    darkColor: "#86EFAC",
    darkBg: "rgba(22, 163, 74, 0.1)",
    darkBorder: "rgba(22, 163, 74, 0.18)",
  },
  missing: {
    color: "#C2410C",
    bg: "rgba(249, 115, 22, 0.08)",
    border: "rgba(249, 115, 22, 0.18)",
    darkColor: "#FDBA74",
    darkBg: "rgba(249, 115, 22, 0.1)",
    darkBorder: "rgba(249, 115, 22, 0.2)",
  },
};

export const statsBarStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
});

export const statsBadgeStyles =
  (tone: keyof AdminFoodStats) => (theme: Theme) => {
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
      fontSize: 13,
      fontWeight: 900,
      ".dark &": {
        borderColor: p.darkBorder,
        backgroundColor: p.darkBg,
        color: p.darkColor,
      },
    };
  };

// ─── Filter pills ────────────────────────────────────────────────────────────

export const filterPillGroupStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0.75,
});

export const filterPillStyles = (isActive: boolean) => (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  px: 1.25,
  py: 0.75,
  borderRadius: 999,
  border: "1px solid",
  borderColor: isActive ? "rgba(249, 115, 22, 0.5)" : "rgba(0,0,0,0.1)",
  background: isActive ? "#F97316" : "transparent",
  color: isActive ? "#FFFFFF" : light.textSub,
  fontSize: 13,
  fontWeight: 850,
  cursor: "pointer",
  transition: "all 130ms ease",
  "&:hover": {
    borderColor: "rgba(249, 115, 22, 0.5)",
    background: isActive ? "#EA580C" : "rgba(249, 115, 22, 0.08)",
    color: isActive ? "#FFFFFF" : "#C2410C",
  },
  ".dark &": {
    borderColor: isActive ? "rgba(249, 115, 22, 0.6)" : dark.cardBorder,
    background: isActive ? "#F97316" : "transparent",
    color: isActive ? "#FFFFFF" : dark.textSub,
    "&:hover": {
      borderColor: "rgba(249, 115, 22, 0.5)",
      background: isActive ? "#EA580C" : "rgba(249, 115, 22, 0.1)",
      color: isActive ? "#FFFFFF" : "#FDBA74",
    },
  },
});

// ─── Table interactions ──────────────────────────────────────────────────────

export const clickableRowStyles = (theme: Theme) => ({
  cursor: "pointer",
  "& td": {
    transition: "background-color 110ms ease",
  },
  "&:hover td": {
    backgroundColor: "rgba(249, 115, 22, 0.04)",
  },
  ".dark &:hover td": {
    backgroundColor: "rgba(249, 115, 22, 0.06)",
  },
});

export const iconActionButtonStyles = (theme: Theme) => ({
  width: 32,
  height: 32,
  minWidth: 32,
  minHeight: 32,
  p: 0,
  borderRadius: 999,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: "transparent",
  color: light.textSub,
  flexShrink: 0,
  "&:hover": {
    borderColor: "rgba(249, 115, 22, 0.4)",
    backgroundColor: "rgba(249, 115, 22, 0.08)",
    color: "#C2410C",
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    color: dark.textSub,
    "&:hover": {
      borderColor: "rgba(249, 115, 22, 0.35)",
      backgroundColor: "rgba(249, 115, 22, 0.1)",
      color: "#FDBA74",
    },
  },
});

// ─── Overflow menu ───────────────────────────────────────────────────────────

export const overflowMenuPaperStyles = (theme: Theme) => ({
  borderRadius: "12px !important",
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: light.cardBg,
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  minWidth: 192,
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.cardBg,
    boxShadow: "0 12px 36px rgba(0,0,0,0.5)",
  },
  "& .MuiMenuItem-root": {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: 13,
    fontWeight: 800,
    color: "#44403C",
    borderRadius: "8px",
    mx: "4px",
    ".dark &": { color: dark.textSub },
    "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
    ".dark &:hover": { backgroundColor: "rgba(255, 247, 237, 0.06)" },
  },
});

export const overflowMenuItemDangerStyles = (theme: Theme) => ({
  color: "#DC2626 !important",
  ".dark &": { color: "#FCA5A5 !important" },
  "&:hover": {
    backgroundColor: "rgba(220, 38, 38, 0.07) !important",
    ".dark &": { backgroundColor: "rgba(220, 38, 38, 0.12) !important" },
  },
});

// ─── Empty state ─────────────────────────────────────────────────────────────

export const emptyStateStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1.5,
  py: 7,
  color: light.textMuted,
  ".dark &": { color: dark.textMuted },
});

export const emptyStateTitleStyles = (theme: Theme) => ({
  color: light.textSub,
  fontSize: 16,
  fontWeight: 900,
  ".dark &": { color: dark.textSub },
});

export const emptyStateSubtitleStyles = (theme: Theme) => ({
  mt: -0.5,
  color: light.textMuted,
  fontSize: 13,
  fontWeight: 700,
  ".dark &": { color: dark.textMuted },
});

export const emptyStateActionsStyles = (theme: Theme) => ({
  display: "flex",
  gap: 1,
  mt: 0.5,
});

// ─── Toolbar ─────────────────────────────────────────────────────────────────

export const toolbarStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    md: "minmax(260px, 1fr) auto",
  },
  gap: 1.25,
  alignItems: "center",
  borderRadius: 4,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: light.cardBg,
  boxShadow: light.cardShadow,
  p: 1.5,
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.cardBg,
    boxShadow: dark.cardShadow,
  },
});

export const headerActionStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  gap: 1,
});

export const createButtonStyles = (theme: Theme) => ({
  minHeight: 38,
  borderRadius: 999,
  background: "#F97316",
  color: "#FFFFFF",
  fontWeight: 900,
  px: 1.45,
  boxShadow: "0 4px 14px rgba(249, 115, 22, 0.3)",
  "&:hover": {
    background: "#EA580C",
    boxShadow: "0 6px 18px rgba(249, 115, 22, 0.4)",
  },
  ".dark &": {
    boxShadow: "0 4px 14px rgba(249, 115, 22, 0.2)",
  },
});

// ─── Field styles ─────────────────────────────────────────────────────────────

export const fieldStyles = (theme: Theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "transparent",
    color: light.text,
    "& .MuiInputBase-input, & .MuiSelect-select": {
      color: light.text,
      fontWeight: 750,
      "&::placeholder": {
        color: light.textMuted,
        opacity: 1,
      },
    },
    "& fieldset": {
      borderColor: light.cardBorder,
    },
    "&:hover fieldset": {
      borderColor: "rgba(249, 115, 22, 0.4)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#F97316",
    },
  },
  "& .MuiInputLabel-root": {
    color: light.textSub,
    fontWeight: 700,
  },
  ".dark &": {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "transparent",
      color: dark.text,
      "& .MuiInputBase-input, & .MuiSelect-select": {
        color: dark.text,
        "&::placeholder": {
          color: dark.textMuted,
          opacity: 1,
        },
      },
      "& fieldset": {
        borderColor: dark.cardBorder,
      },
      "&:hover fieldset": {
        borderColor: "rgba(249, 115, 22, 0.35)",
      },
      "&.Mui-focused fieldset": {
        borderColor: dark.orange,
      },
    },
    "& .MuiInputLabel-root": {
      color: dark.textSub,
    },
    "& .MuiSvgIcon-root": {
      color: dark.textSub,
    },
  },
});

// ─── Table panel ─────────────────────────────────────────────────────────────

export const tablePanelStyles = (theme: Theme) => ({
  overflow: "hidden",
  borderRadius: 4,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: light.cardBg,
  boxShadow: light.cardShadow,
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.cardBg,
    boxShadow: dark.cardShadow,
  },
});

export const tableStyles = (theme: Theme) => ({
  minWidth: 960,
  "& th": {
    borderBottom: `1px solid ${light.cardBorder}`,
    color: light.textSub,
    backgroundColor: "rgba(249,115,22,0.04)",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  },
  "& td": {
    borderBottom: `1px solid ${light.cardBorder}`,
    color: light.text,
    verticalAlign: "top",
  },
  ".dark &": {
    "& th": {
      borderBottomColor: dark.cardBorder,
      color: dark.textSub,
      backgroundColor: "rgba(249,115,22,0.05)",
    },
    "& td": {
      borderBottomColor: dark.cardBorder,
      color: dark.text,
    },
  },
});

// ─── Food cell ────────────────────────────────────────────────────────────────

export const foodCellStyles = (theme: Theme) => ({
  display: "flex",
  gap: 1.25,
  minWidth: 0,
});

export const imageStyles = (theme: Theme) => ({
  width: 58,
  height: 58,
  flexShrink: 0,
  borderRadius: 3,
  objectFit: "cover",
  border: `1px solid ${light.cardBorder}`,
  ".dark &": {
    borderColor: dark.cardBorder,
  },
});

export const nameStyles = (theme: Theme) => ({
  color: light.text,
  fontSize: 14,
  fontWeight: 900,
  lineHeight: 1.25,
  ".dark &": {
    color: dark.text,
  },
});

export const descriptionStyles = (theme: Theme) => ({
  display: "-webkit-box",
  maxWidth: 440,
  mt: 0.55,
  overflow: "hidden",
  color: light.textSub,
  fontSize: 12,
  lineHeight: 1.5,
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  ".dark &": {
    color: dark.textSub,
  },
});

// ─── Chips ───────────────────────────────────────────────────────────────────

export const chipWrapStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0.5,
});

export const ingredientChipStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  border: "1px solid rgba(22, 163, 74, 0.2)",
  backgroundColor: "rgba(22, 163, 74, 0.07)",
  color: light.green,
  fontSize: 11,
  fontWeight: 850,
  px: 0.9,
  py: 0.3,
  ".dark &": {
    borderColor: "rgba(132, 204, 22, 0.2)",
    backgroundColor: "rgba(132, 204, 22, 0.08)",
    color: dark.green,
  },
});

export const contextChipStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: "rgba(0,0,0,0.04)",
  color: light.textSub,
  fontSize: 11,
  fontWeight: 850,
  px: 0.9,
  py: 0.3,
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: "rgba(255, 247, 237, 0.05)",
    color: dark.textSub,
  },
});

export const statusChipStyles = (isReady: boolean) => (theme: Theme) => ({
  borderRadius: 999,
  border: "1px solid",
  borderColor: isReady ? "rgba(34, 197, 94, 0.22)" : "rgba(249, 115, 22, 0.25)",
  backgroundColor: isReady
    ? "rgba(34, 197, 94, 0.08)"
    : "rgba(249, 115, 22, 0.09)",
  color: isReady ? "#15803D" : "#C2410C",
  fontSize: 12,
  fontWeight: 900,
  px: 1,
  py: 0.35,
  ".dark &": {
    borderColor: isReady
      ? "rgba(132, 204, 22, 0.22)"
      : "rgba(249, 115, 22, 0.22)",
    backgroundColor: isReady
      ? "rgba(132, 204, 22, 0.1)"
      : "rgba(249, 115, 22, 0.1)",
    color: isReady ? dark.green : "#FDBA74",
  },
});

// ─── Action buttons ──────────────────────────────────────────────────────────

export const actionStackStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  gap: 0.75,
});

export const smallActionButtonStyles = (theme: Theme) => ({
  minHeight: 32,
  borderRadius: 999,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: "transparent",
  color: light.textSub,
  px: 1.1,
  fontSize: 12,
  fontWeight: 850,
  "&:hover": {
    borderColor: "rgba(249, 115, 22, 0.4)",
    backgroundColor: "rgba(249, 115, 22, 0.08)",
    color: "#C2410C",
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    color: dark.textSub,
    "&:hover": {
      borderColor: "rgba(249, 115, 22, 0.3)",
      backgroundColor: "rgba(249, 115, 22, 0.1)",
      color: "#FDBA74",
    },
  },
});

export const deleteActionButtonStyles = (theme: Theme) => ({
  ...smallActionButtonStyles(theme),
  color: "#991B1B",
  "&:hover": {
    borderColor: "rgba(220, 38, 38, 0.3)",
    backgroundColor: "rgba(220, 38, 38, 0.07)",
    color: "#7F1D1D",
  },
  ".dark &": {
    borderColor: "rgba(248, 113, 113, 0.18)",
    color: "#FCA5A5",
    "&:hover": {
      borderColor: "rgba(248, 113, 113, 0.28)",
      backgroundColor: "rgba(220, 38, 38, 0.14)",
      color: "#FECACA",
    },
  },
});

// ─── Message ──────────────────────────────────────────────────────────────────

export const messageStyles = (theme: Theme) => ({
  borderRadius: 3,
  border: "1px solid rgba(249, 115, 22, 0.2)",
  backgroundColor: "rgba(249, 115, 22, 0.07)",
  color: "#9A3412",
  px: 1.25,
  py: 1,
  fontSize: 13,
  fontWeight: 800,
  ".dark &": {
    borderColor: "rgba(249, 115, 22, 0.18)",
    backgroundColor: "rgba(249, 115, 22, 0.1)",
    color: "#FDBA74",
  },
});

// ─── Pagination ───────────────────────────────────────────────────────────────

export const paginationStyles = (theme: Theme) => ({
  borderTop: `1px solid ${light.cardBorder}`,
  color: light.textSub,
  ".dark &": {
    borderTopColor: dark.cardBorder,
    color: dark.textSub,
    "& .MuiTablePagination-selectIcon": {
      color: dark.textSub,
    },
  },
});

// ─── Barrel ───────────────────────────────────────────────────────────────────

export const styles = {
  actionStackStyles,
  chipWrapStyles,
  clickableRowStyles,
  contextChipStyles,
  createButtonStyles,
  deleteActionButtonStyles,
  descriptionStyles,
  emptyStateActionsStyles,
  emptyStateStyles,
  emptyStateSubtitleStyles,
  emptyStateTitleStyles,
  fieldStyles,
  filterPillGroupStyles,
  filterPillStyles,
  foodCellStyles,
  headerActionStyles,
  iconActionButtonStyles,
  imageStyles,
  ingredientChipStyles,
  messageStyles,
  nameStyles,
  overflowMenuItemDangerStyles,
  overflowMenuPaperStyles,
  paginationStyles,
  smallActionButtonStyles,
  statsBadgeStyles,
  statsBarStyles,
  statusChipStyles,
  tablePanelStyles,
  tableStyles,
  toolbarStyles,
} as const;
