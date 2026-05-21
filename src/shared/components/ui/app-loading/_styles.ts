/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import { SxProps, Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { colors } from "@/theme/colors";
import { effects } from "@/theme/effects";
import { fontFamilies, fontWeights } from "@/theme/resources";
import { pxToRem } from "@/shared/utils";

const landingOrangeGradient =
  "linear-gradient(135deg, #FFB25C 0%, #FF8A1F 54%, #F26608 100%)";

export const rootStyles: SxProps<Theme> = {
  minHeight: "100dvh",
  width: "100%",
  display: "grid",
  placeItems: "center",
  px: { xs: 2, sm: 3 },
  py: 5,
  position: "relative",
  overflow: "hidden",
  color: "#27251F",
  background: `
    radial-gradient(circle at 18% 82%, ${alpha("#F97316", 0.12)} 0%, transparent 38%),
    radial-gradient(circle at 82% 18%, ${alpha("#F97316", 0.07)} 0%, transparent 46%),
    linear-gradient(180deg, #FAFAF8 0%, #F5F3F0 52%, #FAFAF8 100%)
  `,
  ".dark &": {
    color: "#FFF7ED",
    background: `
      radial-gradient(circle at 20% 80%, ${alpha("#F97316", 0.1)} 0%, transparent 40%),
      radial-gradient(circle at 80% 20%, ${alpha("#F97316", 0.07)} 0%, transparent 50%),
      linear-gradient(180deg, #0C0A09 0%, #151110 50%, #0C0A09 100%)
    `,
  },
};

export const patternStyles: SxProps<Theme> = {
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  backgroundImage: `radial-gradient(circle at 1px 1px, ${alpha("#27251F", 0.035)} 1px, transparent 1px)`,
  backgroundSize: "40px 40px",
  maskImage:
    "linear-gradient(180deg, transparent, #000 18%, #000 82%, transparent)",
  ".dark &": {
    backgroundImage: `radial-gradient(circle at 1px 1px, ${alpha("#FFF7ED", 0.035)} 1px, transparent 1px)`,
  },
};

export const cardStyles: SxProps<Theme> = {
  width: "min(520px, 100%)",
  minHeight: { xs: 420, sm: 460 },
  borderRadius: { xs: "28px", sm: "34px" },
  p: { xs: 3, sm: 4 },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
  position: "relative",
  overflow: "hidden",
  background: alpha("#FFFFFF", 0.72),
  border: `1px solid ${alpha("#27251F", 0.09)}`,
  boxShadow: `0 30px 90px ${alpha("#4B2410", 0.13)}`,
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  ".dark &": {
    background: alpha("#1C1917", 0.76),
    borderColor: alpha("#FFF7ED", 0.12),
    boxShadow: `0 30px 90px ${alpha("#000000", 0.42)}`,
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background: `
      radial-gradient(circle at 16% 12%, ${alpha("#FFB25C", 0.14)}, transparent 32%),
      radial-gradient(circle at 86% 88%, ${alpha("#F97316", 0.11)}, transparent 34%)
    `,
  },
};

export const badgeStyles: SxProps<Theme> = {
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  px: 2,
  py: 1,
  borderRadius: effects.borderRadius.full,
  color: "#EA580C",
  background: alpha("#FFF3E8", 0.86),
  border: `1px solid ${alpha("#F97316", 0.18)}`,
  fontFamily: fontFamilies.body,
  fontSize: pxToRem(13),
  fontWeight: fontWeights.bold,
  position: "relative",
  zIndex: 1,
  ".dark &": {
    color: "#FB923C",
    background: alpha("#1C1917", 0.72),
    borderColor: alpha("#FB923C", 0.22),
  },
};

export const mediaFrameStyles: SxProps<Theme> = {
  width: { xs: 188, sm: 220 },
  height: { xs: 188, sm: 220 },
  borderRadius: "32px",
  p: 1,
  display: "grid",
  placeItems: "center",
  position: "relative",
  zIndex: 1,
  background: alpha("#FFFFFF", 0.72),
  border: `1px solid ${alpha("#27251F", 0.08)}`,
  boxShadow: `0 24px 70px ${alpha(colors.base.brand[600], 0.18)}`,
  ".dark &": {
    background: alpha("#0C0A09", 0.58),
    borderColor: alpha("#FFF7ED", 0.12),
    boxShadow: `0 24px 70px ${alpha("#F97316", 0.18)}`,
  },
};

export const mediaStyles: SxProps<Theme> = {
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "cover",
  borderRadius: "26px",
};

export const fallbackMarkStyles: SxProps<Theme> = {
  width: { xs: 152, sm: 176 },
  height: { xs: 152, sm: 176 },
  borderRadius: "30px",
  display: "grid",
  placeItems: "center",
  position: "relative",
  overflow: "hidden",
  background: landingOrangeGradient,
  boxShadow: `0 20px 60px ${alpha("#F97316", 0.28)}`,
  color: "#FFFFFF",
  "@keyframes foodieLoadingPulse": {
    "0%, 100%": { transform: "scale(1)", filter: "saturate(1)" },
    "50%": { transform: "scale(1.035)", filter: "saturate(1.14)" },
  },
  animation: "foodieLoadingPulse 1800ms ease-in-out infinite",
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
  },
};

export const fallbackIconStyles: SxProps<Theme> = {
  width: 78,
  height: 78,
  borderRadius: "26px",
  display: "grid",
  placeItems: "center",
  background: alpha("#FFFFFF", 0.16),
  border: `1px solid ${alpha("#FFFFFF", 0.28)}`,
  backdropFilter: "blur(10px)",
};

export const titleStyles: SxProps<Theme> = {
  m: 0,
  fontFamily: fontFamilies.display,
  fontSize: { xs: pxToRem(30), sm: pxToRem(38) },
  fontWeight: fontWeights.extrabold,
  lineHeight: 1.1,
  textAlign: "center",
  letterSpacing: 0,
  position: "relative",
  zIndex: 1,
};

export const highlightStyles: SxProps<Theme> = {
  background: landingOrangeGradient,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export const descriptionStyles: SxProps<Theme> = {
  m: 0,
  maxWidth: 390,
  textAlign: "center",
  color: alpha("#27251F", 0.62),
  fontFamily: fontFamilies.body,
  fontSize: { xs: pxToRem(15), sm: pxToRem(16) },
  lineHeight: 1.7,
  position: "relative",
  zIndex: 1,
  ".dark &": {
    color: alpha("#FFF7ED", 0.62),
  },
};

export const dotsStyles: SxProps<Theme> = {
  display: "flex",
  gap: 1,
  position: "relative",
  zIndex: 1,
};

export const dotStyles = (delay: number): SxProps<Theme> => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: landingOrangeGradient,
  "@keyframes foodieLoadingDot": {
    "0%, 80%, 100%": { opacity: 0.38, transform: "translateY(0)" },
    "40%": { opacity: 1, transform: "translateY(-7px)" },
  },
  animation: `foodieLoadingDot 1200ms ease-in-out ${delay}ms infinite`,
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
  },
});

export const styles = {
  rootStyles,
  patternStyles,
  cardStyles,
  badgeStyles,
  mediaFrameStyles,
  mediaStyles,
  fallbackMarkStyles,
  fallbackIconStyles,
  titleStyles,
  highlightStyles,
  descriptionStyles,
  dotsStyles,
  dotStyles,
} as const;
