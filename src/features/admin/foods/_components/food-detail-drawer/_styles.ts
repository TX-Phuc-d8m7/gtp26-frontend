/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import type { Theme } from "@mui/material/styles";

import type { DetailSection } from ".";

// ─── Design tokens ──────────────────────────────────────────────────────────

const light = {
  cardBg: "#FFFFFF",
  cardBorder: "rgba(0,0,0,0.055)",
  cardShadow: "0 2px 12px rgba(0,0,0,0.07)",
  sectionBg: "rgba(249,115,22,0.03)",
  sectionBorder: "rgba(0,0,0,0.05)",
  text: "#1C1917",
  textSub: "#57534E",
  textMuted: "#78716C",
} as const;

const dark = {
  cardBg: "#1E1B18",
  cardBorder: "rgba(255,247,237,0.07)",
  sectionBg: "rgba(255,247,237,0.03)",
  sectionBorder: "rgba(255,247,237,0.06)",
  text: "#F5EFE8",
  textSub: "rgba(245,239,232,0.55)",
  textMuted: "rgba(245,239,232,0.4)",
  orange: "#F97316",
  green: "#84CC16",
  blue: "#38BDF8",
} as const;

// ─── Chip tone map ────────────────────────────────────────────────────────────

const chipToneMap: Record<
  NonNullable<DetailSection["tone"]>,
  { border: string; bg: string; color: string; darkColor: string; darkBg: string }
> = {
  blue: {
    bg: "rgba(37, 99, 235, 0.07)",
    border: "rgba(37, 99, 235, 0.16)",
    color: "#1D4ED8",
    darkBg: "rgba(56, 189, 248, 0.08)",
    darkColor: dark.blue,
  },
  green: {
    bg: "rgba(22, 163, 74, 0.07)",
    border: "rgba(22, 163, 74, 0.16)",
    color: "#15803D",
    darkBg: "rgba(132, 204, 22, 0.08)",
    darkColor: dark.green,
  },
  neutral: {
    bg: "rgba(0,0,0,0.04)",
    border: "rgba(0,0,0,0.07)",
    color: "#57534E",
    darkBg: "rgba(255, 247, 237, 0.05)",
    darkColor: dark.textSub,
  },
  orange: {
    bg: "rgba(249, 115, 22, 0.08)",
    border: "rgba(249, 115, 22, 0.18)",
    color: "#C2410C",
    darkBg: "rgba(249, 115, 22, 0.1)",
    darkColor: "#FDBA74",
  },
};

// ─── Drawer paper ─────────────────────────────────────────────────────────────

export const paperStyles = (theme: Theme) => ({
  width: {
    xs: "100%",
    sm: 520,
  },
  borderLeft: `1px solid ${light.cardBorder}`,
  backgroundColor: light.cardBg,
  color: light.text,
  ".dark &": {
    borderLeftColor: dark.cardBorder,
    backgroundColor: dark.cardBg,
    color: dark.text,
  },
});

// ─── Container / header ───────────────────────────────────────────────────────

export const containerStyles = (theme: Theme) => ({
  display: "flex",
  minHeight: "100%",
  flexDirection: "column",
});

export const headerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.5,
  borderBottom: `1px solid ${light.cardBorder}`,
  px: 2,
  py: 1.5,
  ".dark &": {
    borderBottomColor: dark.cardBorder,
  },
});

export const eyebrowStyles = (theme: Theme) => ({
  color: "#EA580C",
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  ".dark &": {
    color: "#FDBA74",
  },
});

export const titleStyles = (theme: Theme) => ({
  color: light.text,
  fontSize: {
    xs: 24,
    sm: 30,
  },
  fontWeight: 950,
  lineHeight: 1.05,
  ".dark &": {
    color: dark.text,
  },
});

export const closeButtonStyles = (theme: Theme) => ({
  width: 38,
  height: 38,
  borderRadius: 999,
  border: `1px solid ${light.cardBorder}`,
  color: light.textSub,
  ".dark &": {
    borderColor: dark.cardBorder,
    color: dark.text,
  },
});

// ─── Body ─────────────────────────────────────────────────────────────────────

export const bodyStyles = (theme: Theme) => ({
  display: "grid",
  gap: 2,
  overflowY: "auto",
  px: 2,
  py: 2,
});

export const imageStyles = (theme: Theme) => ({
  width: "100%",
  aspectRatio: "16 / 9",
  borderRadius: 4,
  objectFit: "cover",
  border: `1px solid ${light.cardBorder}`,
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  ".dark &": {
    borderColor: dark.cardBorder,
    boxShadow: "0 10px 32px rgba(0,0,0,0.4)",
  },
});

// ─── Status chips ─────────────────────────────────────────────────────────────

export const statusRowStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
});

export const statusChipStyles = (isReady: boolean) => (theme: Theme) => ({
  borderRadius: 999,
  border: "1px solid",
  borderColor: isReady ? "rgba(22, 163, 74, 0.2)" : "rgba(217, 119, 6, 0.2)",
  backgroundColor: isReady
    ? "rgba(22, 163, 74, 0.07)"
    : "rgba(245, 158, 11, 0.08)",
  color: isReady ? "#15803D" : "#B45309",
  fontSize: 12,
  fontWeight: 900,
  ".MuiChip-label": {
    px: 1.1,
  },
  ".dark &": {
    borderColor: isReady
      ? "rgba(132, 204, 22, 0.2)"
      : "rgba(251, 191, 36, 0.2)",
    backgroundColor: isReady
      ? "rgba(132, 204, 22, 0.1)"
      : "rgba(251, 191, 36, 0.08)",
    color: isReady ? dark.green : "#FCD34D",
  },
});

export const summaryChipStyles = (theme: Theme) => ({
  borderRadius: 999,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: "rgba(0,0,0,0.04)",
  color: light.textSub,
  fontSize: 12,
  fontWeight: 850,
  ".MuiChip-label": {
    px: 1.1,
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    backgroundColor: "rgba(255, 247, 237, 0.05)",
    color: dark.textSub,
  },
});

// ─── Description ─────────────────────────────────────────────────────────────

export const descriptionStyles = (theme: Theme) => ({
  color: light.textSub,
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1.7,
  ".dark &": {
    color: dark.textSub,
  },
});

// ─── Panels ───────────────────────────────────────────────────────────────────

export const panelStyles = (theme: Theme) => ({
  borderRadius: 3,
  border: `1px solid ${light.sectionBorder}`,
  backgroundColor: light.sectionBg,
  p: 1.5,
  ".dark &": {
    borderColor: dark.sectionBorder,
    backgroundColor: dark.sectionBg,
  },
});

export const sectionTitleStyles = (theme: Theme) => ({
  color: light.text,
  fontSize: 13,
  fontWeight: 950,
  mb: 1,
  ".dark &": {
    color: dark.text,
  },
});

export const chipWrapStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0.65,
});

export const chipStyles =
  (tone: DetailSection["tone"] = "neutral") =>
  (theme: Theme) => {
    const config = chipToneMap[tone];
    return {
      borderRadius: 999,
      border: `1px solid ${config.border}`,
      backgroundColor: config.bg,
      color: config.color,
      fontSize: 12,
      fontWeight: 850,
      px: 1,
      py: 0.45,
      ".dark &": {
        backgroundColor: config.darkBg,
        color: config.darkColor,
      },
    };
  };

export const instructionsStyles = (theme: Theme) => ({
  whiteSpace: "pre-wrap",
  color: light.textSub,
  fontSize: 13,
  fontWeight: 700,
  lineHeight: 1.7,
  ".dark &": {
    color: dark.textSub,
  },
});

// ─── Footer ───────────────────────────────────────────────────────────────────

export const footerStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 0.75,
  borderTop: `1px solid ${light.cardBorder}`,
  mt: "auto",
  px: 2,
  py: 1.5,
  ".dark &": {
    borderTopColor: dark.cardBorder,
  },
});

export const footerDividerStyles = (theme: Theme) => ({
  width: "1px",
  height: 22,
  mx: 0.5,
  flexShrink: 0,
  backgroundColor: "rgba(0,0,0,0.1)",
  ".dark &": { backgroundColor: "rgba(255,247,237,0.08)" },
});

export const footerButtonStyles = (theme: Theme) => ({
  minHeight: 38,
  borderRadius: 999,
  border: `1px solid ${light.cardBorder}`,
  backgroundColor: "transparent",
  color: "#44403C",
  fontWeight: 900,
  "&:hover": {
    borderColor: "rgba(249, 115, 22, 0.4)",
    backgroundColor: "rgba(249, 115, 22, 0.07)",
    color: "#C2410C",
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    color: dark.text,
    "&:hover": {
      borderColor: "rgba(249, 115, 22, 0.3)",
      backgroundColor: "rgba(249, 115, 22, 0.1)",
      color: "#FDBA74",
    },
  },
});

export const dangerButtonStyles = (theme: Theme) => ({
  ...footerButtonStyles(theme),
  color: "#B91C1C",
  "&:hover": {
    borderColor: "rgba(220, 38, 38, 0.3)",
    backgroundColor: "rgba(220, 38, 38, 0.07)",
    color: "#991B1B",
  },
  ".dark &": {
    borderColor: "rgba(248, 113, 113, 0.18)",
    color: "#FCA5A5",
    "&:hover": {
      backgroundColor: "rgba(220, 38, 38, 0.14)",
      color: "#FECACA",
    },
  },
});

// ─── Loading ──────────────────────────────────────────────────────────────────

export const loadingStyles = (theme: Theme) => ({
  display: "grid",
  minHeight: 280,
  placeItems: "center",
  color: "#EA580C",
  ".dark &": {
    color: "#FDBA74",
  },
});

// ─── Barrel ───────────────────────────────────────────────────────────────────

export const styles = {
  bodyStyles,
  chipStyles,
  chipWrapStyles,
  closeButtonStyles,
  containerStyles,
  dangerButtonStyles,
  descriptionStyles,
  eyebrowStyles,
  footerButtonStyles,
  footerDividerStyles,
  footerStyles,
  headerStyles,
  imageStyles,
  instructionsStyles,
  loadingStyles,
  panelStyles,
  paperStyles,
  sectionTitleStyles,
  statusChipStyles,
  statusRowStyles,
  summaryChipStyles,
  titleStyles,
} as const;
