/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

import { colors } from "@/theme/colors";
import { fontWeights } from "@/theme/resources";

const darkSurface = "#1C1917";
const darkSurfaceSoft = "#292524";
const darkText = "#FFF7ED";
const darkMuted = "rgba(255, 247, 237, 0.64)";
const darkBorder = "rgba(255, 247, 237, 0.12)";

export const drawerPaperStyles = (isMobile: boolean): SxProps<Theme> => ({
  width: isMobile ? "100%" : 480,
  maxWidth: "100%",
  height: isMobile ? "min(86dvh, 760px)" : "100dvh",
  borderRadius: isMobile ? "26px 26px 0 0" : "28px 0 0 28px",
  overflow: "hidden",
  border: "1px solid rgba(234, 88, 12, 0.18)",
  borderBottom: isMobile ? 0 : undefined,
  background:
    "linear-gradient(145deg, rgba(255,255,255,0.96), rgba(255,247,237,0.9))",
  color: "#1C1917",
  boxShadow:
    "0 -22px 70px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.82)",
  backdropFilter: "blur(24px) saturate(1.16)",
  WebkitBackdropFilter: "blur(24px) saturate(1.16)",
  ".dark &": {
    borderColor: darkBorder,
    background: `linear-gradient(145deg, ${alpha(darkSurface, 0.98)}, ${alpha(darkSurfaceSoft, 0.96)})`,
    color: darkText,
    boxShadow: "0 26px 90px rgba(0,0,0,0.58)",
  },
});

export const contentStyles: SxProps<Theme> = {
  display: "flex",
  height: "100%",
  minHeight: 0,
  flexDirection: "column",
  overflow: "hidden",
};

export const scrollBodyStyles: SxProps<Theme> = {
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overscrollBehavior: "contain",
  p: { xs: 1.5, sm: 2 },
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
    scrollbarColor: "rgba(255,154,31,0.42) transparent",
  },
};

export const headerStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  p: { xs: 1.5, sm: 2 },
  borderBottom: "1px solid rgba(231, 229, 228, 0.72)",
  ".dark &": {
    borderBottomColor: darkBorder,
  },
};

export const eyebrowStyles: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.7,
  width: "fit-content",
  borderRadius: 999,
  px: 1,
  py: 0.45,
  color: "#C2410C",
  backgroundColor: "rgba(249,115,22,0.1)",
  fontSize: "0.74rem",
  fontWeight: fontWeights.extrabold,
  ".dark &": {
    color: "#FFB25C",
    backgroundColor: "rgba(255,122,0,0.13)",
  },
};

export const closeButtonStyles: SxProps<Theme> = {
  width: 38,
  height: 38,
  minWidth: 0,
  borderRadius: "999px",
  color: "#57534E",
  ".dark &": {
    color: darkMuted,
  },
};

export const heroStyles: SxProps<Theme> = {
  position: "relative",
  minHeight: { xs: 220, sm: 250 },
  overflow: "hidden",
  borderRadius: "24px",
  border: "1px solid rgba(234,88,12,0.16)",
  background:
    "linear-gradient(145deg, rgba(255,237,213,0.82), rgba(255,255,255,0.84))",
  boxShadow: "0 18px 46px rgba(15,23,42,0.08)",
  ".dark &": {
    borderColor: darkBorder,
    background:
      "linear-gradient(145deg, rgba(41,37,36,0.95), rgba(12,10,9,0.92))",
    boxShadow: "0 22px 64px rgba(0,0,0,0.36)",
  },
};

export const heroImageStyles: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const heroOverlayStyles: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.62) 100%)",
};

export const heroContentStyles: SxProps<Theme> = {
  position: "relative",
  zIndex: 1,
  display: "flex",
  minHeight: { xs: 220, sm: 250 },
  flexDirection: "column",
  justifyContent: "flex-end",
  gap: 1,
  p: { xs: 2, sm: 2.5 },
};

export const titleStyles: SxProps<Theme> = {
  color: "#FFFFFF",
  fontFamily: "var(--font-display)",
  fontSize: { xs: "2rem", sm: "2.4rem" },
  fontWeight: fontWeights.extrabold,
  lineHeight: 1,
  textShadow: "0 12px 30px rgba(0,0,0,0.42)",
};

export const scorePillStyles: SxProps<Theme> = {
  display: "inline-flex",
  width: "fit-content",
  alignItems: "center",
  borderRadius: 999,
  px: 1.1,
  py: 0.45,
  color: "#14532D",
  backgroundColor: "rgba(240,253,244,0.9)",
  fontSize: "0.82rem",
  fontWeight: fontWeights.extrabold,
  ".dark &": {
    color: "#D9F99D",
    backgroundColor: "rgba(63,98,18,0.54)",
  },
};

export const sectionCardStyles: SxProps<Theme> = {
  mt: 1.25,
  borderRadius: "22px",
  border: "1px solid rgba(231, 229, 228, 0.76)",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.72), rgba(255,247,237,0.52))",
  p: { xs: 1.35, sm: 1.6 },
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.72)",
  backdropFilter: "blur(14px) saturate(1.12)",
  WebkitBackdropFilter: "blur(14px) saturate(1.12)",
  ".dark &": {
    borderColor: darkBorder,
    background:
      "linear-gradient(135deg, rgba(250,250,250,0.07), rgba(39,39,42,0.24))",
  },
};

export const descriptionStyles: SxProps<Theme> = {
  color: "#3F3F46",
  fontSize: "0.95rem",
  lineHeight: 1.7,
  ".dark &": {
    color: "rgba(255,247,237,0.82)",
  },
};

export const sectionTitleStyles: SxProps<Theme> = {
  mb: 1,
  color: "#1C1917",
  fontSize: "0.88rem",
  fontWeight: fontWeights.extrabold,
  ".dark &": {
    color: darkText,
  },
};

export const metaGridStyles: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
  gap: 1,
  mt: 1.25,
};

export const metaItemStyles: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  borderRadius: "18px",
  border: "1px solid rgba(231, 229, 228, 0.78)",
  backgroundColor: "rgba(255,255,255,0.62)",
  px: 1.1,
  py: 0.9,
  color: "#292524",
  fontSize: "0.86rem",
  fontWeight: fontWeights.bold,
  ".dark &": {
    borderColor: darkBorder,
    backgroundColor: "rgba(255,247,237,0.055)",
    color: darkText,
  },
  "& svg": {
    color: colors.base.brand[600],
  },
};

export const chipWrapStyles: SxProps<Theme> = {
  display: "flex",
  flexWrap: "wrap",
  gap: 0.75,
};

export const chipStyles: SxProps<Theme> = {
  borderRadius: 999,
  backgroundColor: "rgba(249,115,22,0.1)",
  color: "#9A3412",
  fontWeight: fontWeights.extrabold,
  ".dark &": {
    backgroundColor: "rgba(255,154,31,0.13)",
    color: "#FFB25C",
  },
};

export const actionBarStyles: SxProps<Theme> = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
  gap: 1,
  p: { xs: 1.5, sm: 2 },
  borderTop: "1px solid rgba(231, 229, 228, 0.72)",
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  ".dark &": {
    borderTopColor: darkBorder,
    background: "rgba(12,10,9,0.72)",
  },
};

export const actionButtonStyles = (tone: "favorite" | "feedback" | "location") => {
  const config = {
    favorite: { color: "#BE123C", border: "rgba(244,63,94,0.28)" },
    feedback: { color: "#4F46E5", border: "rgba(99,102,241,0.28)" },
    location: { color: "#0F766E", border: "rgba(20,184,166,0.3)" },
  }[tone];

  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 0.75,
    width: "100%",
    borderRadius: "999px",
    borderColor: config.border,
    color: config.color,
    textTransform: "none",
    fontWeight: fontWeights.extrabold,
    backgroundColor: "rgba(255,255,255,0.58)",
    ".dark &": {
      borderColor: "rgba(250,250,250,0.2)",
      color: "#F5EFE8",
      backgroundColor: "rgba(250,250,250,0.07)",
    },
  } satisfies SxProps<Theme>;
};

export const styles = {
  actionBarStyles,
  actionButtonStyles,
  chipStyles,
  chipWrapStyles,
  closeButtonStyles,
  contentStyles,
  descriptionStyles,
  drawerPaperStyles,
  eyebrowStyles,
  headerStyles,
  heroContentStyles,
  heroImageStyles,
  heroOverlayStyles,
  heroStyles,
  metaGridStyles,
  metaItemStyles,
  scorePillStyles,
  scrollBodyStyles,
  sectionCardStyles,
  sectionTitleStyles,
  titleStyles,
} as const;
