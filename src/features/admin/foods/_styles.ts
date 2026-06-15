/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

import type { AdminFoodStats } from ".";

// ─── Design tokens ──────────────────────────────────────────────────────────

const light = {
  cardBg: "#FFFFFF",
  cardBorder: "#E5E7EB",
  cardShadow: "0 12px 28px rgba(15, 23, 42, 0.06)",
  text: "#1F2937",
  textSub: "#4B5563",
  textMuted: "#6B7280",
  green: "#15803D",
  orange: "#EA580C",
} as const;

const dark = {
  cardBg: "#1C1917",
  cardBorder: "rgba(255,247,237,0.12)",
  cardShadow: "0 18px 42px rgba(0,0,0,0.46)",
  text: "#FFF7ED",
  textSub: "rgba(255,247,237,0.62)",
  textMuted: "rgba(255,247,237,0.42)",
  green: "#86EFAC",
  orange: "#FF9A1F",
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
  borderColor: isActive ? "#FDBA74" : light.cardBorder,
  background: isActive ? "#EA580C" : "transparent",
  color: isActive ? "#FFFFFF" : light.textSub,
  fontSize: 13,
  fontWeight: 850,
  cursor: "pointer",
  transition: "all 130ms ease",
  "&:hover": {
    borderColor: "#FDBA74",
    background: isActive ? "#C2410C" : "#FFF7ED",
    color: isActive ? "#FFFFFF" : light.orange,
  },
  ".dark &": {
    borderColor: isActive ? "rgba(255, 154, 31, 0.48)" : dark.cardBorder,
    background: isActive ? "#FF7A00" : "transparent",
    color: isActive ? "#FFFFFF" : dark.textSub,
    "&:hover": {
      borderColor: "rgba(255, 154, 31, 0.42)",
      background: isActive ? "#FF7A00" : "rgba(255, 154, 31, 0.1)",
      color: isActive ? "#FFFFFF" : dark.orange,
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
    borderColor: "#FDBA74",
    backgroundColor: "#FFF7ED",
    color: light.orange,
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    color: dark.textSub,
    "&:hover": {
      borderColor: "rgba(255, 154, 31, 0.34)",
      backgroundColor: "rgba(255, 154, 31, 0.1)",
      color: dark.orange,
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
  background: "#EA580C",
  color: "#FFFFFF",
  fontWeight: 900,
  px: 1.45,
  boxShadow: "0 10px 24px rgba(234, 88, 12, 0.18)",
  "&:hover": {
    background: "#C2410C",
    boxShadow: "0 14px 30px rgba(234, 88, 12, 0.24)",
  },
  ".dark &": {
    background: "#FF7A00",
    boxShadow: "0 12px 28px rgba(255, 122, 0, 0.18)",
    "&:hover": {
      background: "#FF9A1F",
    },
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
      borderColor: light.orange,
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
    backgroundColor: "#F9FAFB",
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
      backgroundColor: "rgba(255,247,237,0.035)",
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
  width: 100,
  height: 100,
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
  color: isReady ? "#15803D" : light.orange,
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
      color: isReady ? dark.green : dark.orange,
  },
});

/** Chip màu riêng cho từng giá trị dining_context */
export const diningContextChipStyles = (ctx?: string | null) => () => {
  const isRestaurant = ctx === "restaurant";
  const isHome = ctx === "home_cooked";
  return {
    borderRadius: 999,
    border: "1px solid",
    borderColor: isRestaurant
      ? "rgba(59, 130, 246, 0.25)"
      : isHome
        ? "rgba(34, 197, 94, 0.22)"
        : "rgba(120, 90, 60, 0.2)",
    backgroundColor: isRestaurant
      ? "rgba(59, 130, 246, 0.08)"
      : isHome
        ? "rgba(34, 197, 94, 0.08)"
        : "rgba(120, 90, 60, 0.06)",
    color: isRestaurant ? "#1D4ED8" : isHome ? "#15803D" : "#78350F",
    fontSize: 12,
    fontWeight: 900,
    px: 1,
    py: 0.35,
    ".dark &": {
      borderColor: isRestaurant
        ? "rgba(147, 197, 253, 0.25)"
        : isHome
          ? "rgba(132, 204, 22, 0.22)"
          : "rgba(200, 170, 120, 0.2)",
      backgroundColor: isRestaurant
        ? "rgba(147, 197, 253, 0.1)"
        : isHome
          ? "rgba(132, 204, 22, 0.1)"
          : "rgba(200, 170, 120, 0.08)",
      color: isRestaurant ? "#93C5FD" : isHome ? "#BEF264" : "#D4A574",
    },
  };
};

// ─── Action buttons ──────────────────────────────────────────────────────────

export const actionStackStyles = (theme: Theme) => ({
  alignItems: "center",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "flex-end",
  gap: 0.75,
  minWidth: "max-content",
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
    borderColor: "#FDBA74",
    backgroundColor: "#FFF7ED",
    color: light.orange,
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    color: dark.textSub,
    "&:hover": {
      borderColor: "rgba(255, 154, 31, 0.34)",
      backgroundColor: "rgba(255, 154, 31, 0.1)",
      color: dark.orange,
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
  border: "1px solid #FDBA74",
  backgroundColor: "#FFF7ED",
  color: light.orange,
  px: 1.25,
  py: 1,
  fontSize: 13,
  fontWeight: 800,
  ".dark &": {
    borderColor: "rgba(255, 154, 31, 0.28)",
    backgroundColor: "rgba(255, 154, 31, 0.1)",
    color: dark.orange,
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
  diningContextChipStyles,
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
