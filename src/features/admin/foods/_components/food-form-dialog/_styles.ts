/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import type { Theme } from "@mui/material/styles";

// ─── Design tokens ──────────────────────────────────────────────────────────

const light = {
  cardBg: "#FFFFFF",
  cardBorder: "#E5E7EB",
  sectionBg: "#FFF7ED",
  sectionBorder: "#E5E7EB",
  text: "#1F2937",
  textSub: "#4B5563",
  textMuted: "#6B7280",
} as const;

const dark = {
  cardBg: "#1C1917",
  cardBorder: "rgba(255,247,237,0.12)",
  sectionBg: "rgba(255,247,237,0.03)",
  sectionBorder: "rgba(255,247,237,0.1)",
  text: "#FFF7ED",
  textSub: "rgba(255,247,237,0.62)",
  textMuted: "rgba(255,247,237,0.42)",
  orange: "#FF9A1F",
} as const;

// ─── Dialog paper ────────────────────────────────────────────────────────────

export const paperStyles = (theme: Theme) => ({
  borderRadius: 5,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: light.cardBg,
  boxShadow: "0 20px 60px rgba(0,0,0,0.14)",
  color: light.text,
  display: "flex",
  flexDirection: "column",
  maxHeight: "90dvh",
  // overflow: hidden on Paper prevents Paper from showing its own scrollbar.
  // DialogContent inside still scrolls via its own overflowY: auto.
  overflow: "hidden",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.cardBg,
    boxShadow: "0 24px 72px rgba(0,0,0,0.55)",
    color: dark.text,
  },
});

// Form wrapper — must be a flex column so DialogContent can be the sole scroller
export const formStyles = () => ({
  display: "flex",
  flexDirection: "column",
  flex: "1 1 auto",
  minHeight: 0,          // crucial: lets flex children shrink below content height
  overflow: "hidden",
});

// ─── Title / subtitle ────────────────────────────────────────────────────────

export const titleStyles = (theme: Theme) => ({
  color: light.text,
  fontSize: {
    xs: 22,
    md: 26,
  },
  fontWeight: 950,
  letterSpacing: 0,
  pb: 0.75,
  ".dark &": {
    color: dark.text,
  },
});

export const subtitleStyles = (theme: Theme) => ({
  color: light.textSub,
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1.55,
  ".dark &": {
    color: dark.textSub,
  },
});

// ─── Content / layout ────────────────────────────────────────────────────────

export const contentStyles = (theme: Theme) => ({
  display: "grid",
  gap: 2,
  pt: 1,
  overflowY: "auto",      // scroll when content exceeds dialog height
  flex: "1 1 auto",       // preserve MUI DialogContent flex for scroll
  // Hide scrollbar across browsers while keeping scroll functionality
  scrollbarWidth: "none",           // Firefox
  msOverflowStyle: "none",          // IE / Edge legacy
  "&.MuiDialogContent-root": {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  "&::-webkit-scrollbar": {
    width: 0,
    height: 0,
    display: "none",                // Chrome / Safari / Edge
  },
  "&.MuiDialogContent-root::-webkit-scrollbar": {
    width: 0,
    height: 0,
    display: "none",
  },
});

export const editorShellStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    lg: "240px minmax(0, 1fr)",
  },
  gap: 2,
  alignItems: "start",
});

export const tabsPanelStyles = (theme: Theme) => ({
  alingnItems: "center",
  position: {
    lg: "sticky",
  },
  top: 0,
  borderRadius: 3,
  border: `1px solid ${light.sectionBorder}`,
  backgroundColor: "#F9FAFB",
  p: 0.75,
  ".MuiTabs-indicator": {
    display: "none",
  },
  ".MuiTabs-flexContainer": {
    gap: 0.5,
  },
  ".dark &": {
    borderColor: dark.sectionBorder,
    backgroundColor: "rgba(255,247,237,0.03)",
  },
});

export const tabStyles = (theme: Theme) => ({
  alignItems: "center",
  minHeight: 42,
  borderRadius: 2.25,
  color: light.textSub,
  fontSize: 13,
  fontWeight: 850,
  textAlign: "left",
  textTransform: "none",
  "&.Mui-selected": {
    backgroundColor: "#FFF7ED",
    color: "#EA580C",
  },
  ".dark &": {
    color: dark.textSub,
    "&.Mui-selected": {
      backgroundColor: "rgba(255,154,31,0.12)",
      color: dark.orange,
    },
  },
});

export const tabContentStyles = (theme: Theme) => ({
  display: "grid",
  gap: 2,
  minWidth: 0,
});

export const fieldGridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    md: "repeat(2, minmax(0, 1fr))",
  },
  gap: 1.5,
});

export const wideFieldStyles = (theme: Theme) => ({
  gridColumn: "1 / -1",
});

export const chipFieldLabelStyles = (theme: Theme) => ({
  mb: 1,
  color: light.text,
  fontSize: 13,
  fontWeight: 850,
  ".dark &": {
    color: dark.textSub,
  },
});

export const chipFieldHintStyles = (theme: Theme) => ({
  mt: -0.35,
  mb: 1,
  color: light.textSub,
  fontSize: 12,
  fontWeight: 700,
  lineHeight: 1.5,
  ".dark &": {
    color: dark.textSub,
  },
});

// ─── Form section ─────────────────────────────────────────────────────────────

export const formSectionStyles = (theme: Theme) => ({
  borderRadius: 3,
  border: `1px solid ${light.sectionBorder}`,
  backgroundColor: light.sectionBg,
  p: 2,
  ".dark &": {
    borderColor: dark.sectionBorder,
    backgroundColor: dark.sectionBg,
  },
});

export const sectionIntroStyles = (theme: Theme) => ({
  mb: 1.5,
  color: light.textSub,
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1.6,
  ".dark &": {
    color: dark.textSub,
  },
});

export const formSectionHeaderStyles = (theme: Theme) => ({
  mb: 1.5,
  color: light.textMuted,
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  ".dark &": { color: dark.textMuted },
});

// ─── Fields ───────────────────────────────────────────────────────────────────

export const switchPanelStyles = (theme: Theme) => ({
  alignItems: "center",
  borderRadius: 3,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: "#FFFFFF",
  justifyContent: "space-between",
  m: 0,
  px: 1.25,
  py: 1,
  ".MuiFormControlLabel-label": {
    color: light.text,
    fontSize: 13,
    fontWeight: 850,
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: "rgba(255,247,237,0.03)",
    ".MuiFormControlLabel-label": {
      color: dark.text,
    },
  },
});

export const fieldStyles = (theme: Theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 3,
    backgroundColor: "transparent",
    color: light.text,
    fontWeight: 650,
    "& .MuiInputBase-input": {
      color: light.text,
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
      borderColor: "#EA580C",
      boxShadow: "0 0 0 3px rgba(234, 88, 12, 0.1)",
    },
  },
  "& .MuiInputLabel-root": {
    color: light.textSub,
    fontWeight: 800,
  },
  "& .MuiFormHelperText-root": {
    color: light.textSub,
    fontWeight: 650,
  },
  "& .MuiFormHelperText-root.Mui-error, & .MuiInputLabel-root.Mui-error": {
    color: "#B91C1C",
  },
  ".dark &": {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "transparent",
      color: dark.text,
      "& .MuiInputBase-input": {
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
        borderColor: "rgba(249, 115, 22, 0.3)",
      },
      "&.Mui-focused fieldset": {
        borderColor: dark.orange,
        boxShadow: "0 0 0 3px rgba(249, 115, 22, 0.12)",
      },
    },
    "& .MuiInputLabel-root": {
      color: dark.textSub,
    },
    "& .MuiFormHelperText-root": {
      color: dark.textSub,
    },
    "& .MuiFormHelperText-root.Mui-error, & .MuiInputLabel-root.Mui-error": {
      color: "#FCA5A5",
    },
  },
});

export const previewGridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    md: "minmax(0, 1fr) 320px",
  },
  gap: 2,
  alignItems: "start",
});

export const previewCardStyles = (theme: Theme) => ({
  overflow: "hidden",
  borderRadius: 3,
  border: `1px solid ${light.sectionBorder}`,
  backgroundColor: "#FFFFFF",
  boxShadow: "0 14px 34px rgba(15, 23, 42, 0.08)",
  ".dark &": {
    borderColor: dark.sectionBorder,
    backgroundColor: "rgba(255,247,237,0.035)",
    boxShadow: "0 18px 44px rgba(0,0,0,0.24)",
  },
});

export const previewImageStyles = (theme: Theme) => ({
  width: "100%",
  aspectRatio: "16 / 10",
  objectFit: "cover",
  borderBottom: `1px solid ${light.sectionBorder}`,
  ".dark &": {
    borderBottomColor: dark.sectionBorder,
  },
});

export const previewBodyStyles = (theme: Theme) => ({
  display: "grid",
  gap: 1,
  p: 1.5,
});

export const previewTitleStyles = (theme: Theme) => ({
  color: light.text,
  fontSize: 20,
  fontWeight: 950,
  lineHeight: 1.15,
  ".dark &": {
    color: dark.text,
  },
});

export const previewDescriptionStyles = (theme: Theme) => ({
  display: "-webkit-box",
  overflow: "hidden",
  color: light.textSub,
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1.6,
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 4,
  ".dark &": {
    color: dark.textSub,
  },
});

export const previewChipWrapStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0.65,
});

export const previewChipStyles = (theme: Theme) => ({
  borderRadius: 999,
  border: `1px solid ${light.sectionBorder}`,
  backgroundColor: "#FFF7ED",
  color: "#EA580C",
  fontSize: 12,
  fontWeight: 850,
  px: 1,
  py: 0.45,
  ".dark &": {
    borderColor: dark.sectionBorder,
    backgroundColor: "rgba(255,154,31,0.12)",
    color: dark.orange,
  },
});

export const metricGridStyles = (theme: Theme) => ({
  display: "grid",
  marginBottom: '1rem',
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(3, minmax(0, 1fr))",
  },
  gap: 1,
});

export const metricCardStyles = (theme: Theme) => ({
  borderRadius: 3,
  border: `1px solid ${light.sectionBorder}`,
  backgroundColor: "rgba(0,0,0,0.018)",
  p: 1.25,
  ".dark &": {
    borderColor: dark.sectionBorder,
    backgroundColor: "rgba(255,247,237,0.03)",
  },
});

export const metricLabelStyles = (theme: Theme) => ({
  color: light.textMuted,
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  ".dark &": {
    color: dark.textMuted,
  },
});

export const metricValueStyles = (theme: Theme) => ({
  mt: 0.65,
  color: light.text,
  fontSize: 24,
  fontWeight: 950,
  lineHeight: 1,
  ".dark &": {
    color: dark.text,
  },
});

export const indexingNoticeStyles = (theme: Theme) => ({
  marginBottom: '1rem',
  borderRadius: 3,
  border: "1px solid #FED7AA",
  backgroundColor: "#FFF7ED",
  color: "#EA580C",
  p: 1.5,
  fontSize: 13,
  fontWeight: 800,
  lineHeight: 1.65,
  ".dark &": {
    borderColor: "rgba(255,154,31,0.28)",
    backgroundColor: "rgba(255,154,31,0.1)",
    color: dark.orange,
  },
});

export const charCounterStyles = (theme: Theme) => ({
  mt: -0.75,
  textAlign: "right",
  color: light.textMuted,
  fontSize: 12,
  fontWeight: 800,
  ".dark &": {
    color: dark.textMuted,
  },
});

// ─── Dining-context select block ─────────────────────────────────────────────

export const diningContextLabelStyles = (theme: Theme) => ({
  fontSize: 13,
  fontWeight: 700,
  mb: 0.5,
  color: light.text,
  ".dark &": { color: dark.textSub },
});

export const diningContextHintStyles = (theme: Theme) => ({
  fontSize: 12,
  fontWeight: 650,
  mb: 1,
  lineHeight: 1.55,
  color: light.textMuted,
  ".dark &": { color: dark.textMuted },
});

/**
 * Extends fieldStyles with Select-specific overrides:
 * - arrow icon color
 * - selected value font weight
 */
export const selectInputStyles = (theme: Theme) => ({
  ...fieldStyles(theme),
  // Arrow icon
  "& .MuiSelect-icon": {
    color: light.textSub,
  },
  "& .MuiSelect-select": {
    color: light.text,
    fontWeight: 700,
  },
  ".dark &": {
    ...((fieldStyles(theme) as Record<string, unknown>)[".dark &"] ?? {}),
    "& .MuiSelect-icon": {
      color: dark.textSub,
    },
    "& .MuiSelect-select": {
      color: dark.text,
    },
  },
});

/** sx passed to MenuProps.PaperProps so the dropdown popup matches the theme */
export const selectMenuPaperStyles = (theme: Theme) => ({
  borderRadius: 3,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: light.cardBg,
  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: dark.cardBg,
    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
  },
  "& .MuiMenuItem-root": {
    color: light.text,
    borderRadius: 2,
    mx: 0.5,
    "&:hover": { backgroundColor: "rgba(249,115,22,0.06)" },
    "&.Mui-selected": {
      backgroundColor: "#FFF7ED",
      color: "#EA580C",
    },
    ".dark &": {
      color: dark.text,
      "&:hover": { backgroundColor: "rgba(249,115,22,0.1)" },
      "&.Mui-selected": {
        backgroundColor: "rgba(255,154,31,0.14)",
        color: dark.orange,
      },
    },
  },
});

export const menuItemTitleStyles = (theme: Theme) => ({
  fontSize: 13,
  fontWeight: 700,
  color: "inherit",
});

export const menuItemDescStyles = (theme: Theme) => ({
  fontSize: 12,
  mt: 0.25,
  lineHeight: 1.5,
  color: light.textSub,
  ".dark &": { color: dark.textSub },
});

// ─── Actions ─────────────────────────────────────────────────────────────────

export const actionsStyles = (theme: Theme) => ({
  borderTop: `1px solid ${light.cardBorder}`,
  gap: 1,
  px: 3,
  py: 2,
  ".dark &": {
    borderTopColor: dark.cardBorder,
  },
});

export const cancelButtonStyles = (theme: Theme) => ({
  borderColor: light.cardBorder,
  color: light.textSub,
  ".dark &": {
    borderColor: dark.cardBorder,
    color: dark.text,
  },
});

export const submitButtonStyles = (theme: Theme) => ({
  background: "#EA580C",
  color: "#FFFFFF",
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

// ─── Ingredient list input ────────────────────────────────────────────────────

export const ingredientListHeaderStyles = (theme: Theme) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  mb: 1.5,
});

export const ingredientListTitleStyles = (theme: Theme) => ({
  color: light.textMuted,
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  ".dark &": { color: dark.textMuted },
});

export const addIngredientButtonStyles = (theme: Theme) => ({
  gap: 0.5,
  height: 30,
  px: 1.25,
  borderRadius: 2,
  fontSize: 12,
  fontWeight: 850,
  border: `1px solid ${light.cardBorder}`,
  color: "#EA580C",
  "&:hover": {
    backgroundColor: "#FFF7ED",
    borderColor: "#FDBA74",
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    color: dark.orange,
    "&:hover": {
      backgroundColor: "rgba(255,154,31,0.1)",
      borderColor: "rgba(255,154,31,0.28)",
    },
  },
});

export const ingredientColHeaderStyles = (theme: Theme) => ({
  display: "flex",
  gap: 1,
  mb: 0.5,
  px: 0.25,
  alignItems: "center",
});

export const ingredientColLabelStyles = (theme: Theme) => ({
  color: light.textMuted,
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  ".dark &": { color: dark.textMuted },
});

export const ingredientRowsContainerStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: 0.85,
  mb: 1.5,
});

export const ingredientRowStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.85,
});

export const ingredientDeleteButtonStyles = (theme: Theme) => ({
  minWidth: "unset",
  width: 30,
  height: 30,
  p: 0,
  borderRadius: 2,
  flexShrink: 0,
  color: light.textMuted,
  border: `1px solid transparent`,
  "&:hover": {
    color: "#DC2626",
    borderColor: "rgba(239,68,68,0.3)",
    backgroundColor: "rgba(239,68,68,0.06)",
  },
  ".dark &": {
    color: dark.textMuted,
    "&:hover": {
      color: "#FCA5A5",
      borderColor: "rgba(239,68,68,0.35)",
      backgroundColor: "rgba(239,68,68,0.1)",
    },
  },
});

export const ingredientEmptyStateStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  py: 3,
  mb: 1.5,
  borderRadius: 3,
  border: `1px dashed ${light.cardBorder}`,
  backgroundColor: "rgba(0,0,0,0.012)",
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: "rgba(255,247,237,0.02)",
  },
});

export const ingredientEmptyTextStyles = (theme: Theme) => ({
  color: light.textMuted,
  fontSize: 13,
  fontWeight: 700,
  ".dark &": { color: dark.textMuted },
});

export const ingredientErrorStyles = (theme: Theme) => ({
  color: "#B91C1C",
  fontSize: 12,
  fontWeight: 700,
  mt: 0.5,
  ".dark &": { color: "#FCA5A5" },
});

export const derivedSectionStyles = (theme: Theme) => ({
  mt: 1.5,
  borderRadius: 3,
  border: `1px solid ${light.sectionBorder}`,
  backgroundColor: "rgba(0,0,0,0.015)",
  p: 1.5,
  ".dark &": {
    borderColor: dark.sectionBorder,
    backgroundColor: "rgba(255,247,237,0.02)",
  },
});

export const derivedLabelStyles = (theme: Theme) => ({
  mb: 1,
  color: light.textMuted,
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  ".dark &": { color: dark.textMuted },
});

export const coreIngredientChipStyles = (theme: Theme) => ({
  borderRadius: 999,
  border: `1px solid ${light.sectionBorder}`,
  backgroundColor: "#F9FAFB",
  color: light.textSub,
  fontSize: 12,
  fontWeight: 850,
  px: 1,
  py: 0.4,
  ".dark &": {
    borderColor: dark.sectionBorder,
    backgroundColor: "rgba(255,247,237,0.05)",
    color: dark.textSub,
  },
});

// ─── Barrel ───────────────────────────────────────────────────────────────────

export const styles = {
  actionsStyles,
  addIngredientButtonStyles,
  cancelButtonStyles,
  chipFieldLabelStyles,
  chipFieldHintStyles,
  charCounterStyles,
  contentStyles,
  coreIngredientChipStyles,
  derivedLabelStyles,
  derivedSectionStyles,
  diningContextHintStyles,
  diningContextLabelStyles,
  editorShellStyles,
  fieldGridStyles,
  fieldStyles,
  formStyles,
  formSectionHeaderStyles,
  formSectionStyles,
  indexingNoticeStyles,
  ingredientColHeaderStyles,
  ingredientColLabelStyles,
  ingredientDeleteButtonStyles,
  ingredientEmptyStateStyles,
  ingredientEmptyTextStyles,
  ingredientErrorStyles,
  ingredientListHeaderStyles,
  ingredientListTitleStyles,
  ingredientRowStyles,
  ingredientRowsContainerStyles,
  menuItemDescStyles,
  menuItemTitleStyles,
  metricCardStyles,
  metricGridStyles,
  metricLabelStyles,
  metricValueStyles,
  paperStyles,
  previewBodyStyles,
  previewCardStyles,
  previewChipStyles,
  previewChipWrapStyles,
  previewDescriptionStyles,
  previewGridStyles,
  previewImageStyles,
  previewTitleStyles,
  sectionIntroStyles,
  selectInputStyles,
  selectMenuPaperStyles,
  submitButtonStyles,
  subtitleStyles,
  switchPanelStyles,
  tabContentStyles,
  tabsPanelStyles,
  tabStyles,
  titleStyles,
  wideFieldStyles,
} as const;
