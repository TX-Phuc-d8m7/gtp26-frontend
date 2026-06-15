/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";

const darkFoodTheme = {
  background: "#0C0A09",
  backgroundSoft: "#151110",
  surface: "#1C1917",
  surfaceSoft: "#292524",
  surfaceRaised: "#44403C",
  border: "rgba(255, 247, 237, 0.12)",
  borderSoft: "rgba(255, 247, 237, 0.06)",
  borderStrong: "#FB923C",
  text: "#FFF7ED",
  muted: "rgba(255, 247, 237, 0.6)",
  mutedSoft: "rgba(255, 247, 237, 0.5)",
  orange: "#FB923C",
  orangeStrong: "#F97316",
  orangeDeep: "#EA580C",
} as const;

// Landing-page warm palette for light mode
const lightWarm = {
  background: "#fffbf5",
  backgroundGradient:
    "linear-gradient(160deg, #fffbf5 0%, #fff7ed 40%, #fef3c7 100%)",
  surface: "#fffbf5",
  border: "rgba(231, 229, 228, 0.65)",
  borderStrong: "rgba(231, 229, 228, 0.85)",
} as const;

export const rootStyles = (isEmbedded?: boolean) => (theme: Theme) => ({
  height: isEmbedded ? "100%" : "auto",
  minHeight: isEmbedded ? 0 : "100dvh",
  overflowX: "hidden",
  overflowY: isEmbedded ? "auto" : "visible",
  WebkitOverflowScrolling: "touch",
  overscrollBehavior: isEmbedded ? "contain" : "auto",
  background: lightWarm.backgroundGradient,
  color: "var(--foreground)",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  ".dark &": {
    background:
      "radial-gradient(circle at 12% 0%, rgba(249, 115, 22, 0.22) 0, transparent 30%), radial-gradient(circle at 92% 14%, rgba(249, 115, 22, 0.18) 0, transparent 25%), linear-gradient(180deg, #0C0A09 0%, #151110 48%, #0C0A09 100%)",
    color: darkFoodTheme.text,
  },
});

export const shellStyles = (theme: Theme) => ({
  width: "100%",
  maxWidth: 1160,
  marginInline: "auto",
  padding: {
    xs: "1rem",
    sm: "1.25rem",
    md: "1.75rem",
  },
  paddingBottom: {
    xs: "2rem",
    md: "2.5rem",
  },
});

export const topBarStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.5,
  marginBottom: {
    xs: 1.5,
    md: 2.5,
  },
});

export const backButtonStyles = (theme: Theme) => ({
  width: 44,
  height: 44,
  borderRadius: "999px",
  color: "var(--foreground)",
  border: `1px solid ${lightWarm.border}`,
  backgroundColor: `rgba(255, 251, 245, 0.82)`,
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.06)",
  backdropFilter: "blur(18px) saturate(1.14)",
  WebkitBackdropFilter: "blur(18px) saturate(1.14)",
  "&:hover": {
    color: "var(--primary)",
    backgroundColor: `rgba(255, 251, 245, 0.96)`,
  },
  ".dark &": {
    color: darkFoodTheme.text,
    borderColor: darkFoodTheme.border,
    backgroundColor: "rgba(12, 10, 9, 0.82)",
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.45)",
    "&:hover": {
      color: darkFoodTheme.orange,
      backgroundColor: "rgba(249, 115, 22, 0.14)",
      borderColor: darkFoodTheme.borderStrong,
    },
  },
});

export const titleBlockStyles = (theme: Theme) => ({
  flex: 1,
  minWidth: 0,
});

export const eyebrowStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  width: "fit-content",
  borderRadius: "999px",
  color: "#D9480F",
  backgroundColor: "color-mix(in srgb, #FF6B00 13%, transparent)",
  padding: "0.45rem 0.75rem",
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: 0,
  marginBottom: 0.5,
  ".dark &": {
    color: darkFoodTheme.orange,
    backgroundColor: "rgb(249 115 22 / 0.16)",
    boxShadow: "inset 0 0 0 1px rgb(249 115 22 / 0.2)",
  },
});

export const titleStyles = (theme: Theme) => ({
  fontWeight: 800,
  letterSpacing: 0,
  fontSize: {
    xs: 28,
    sm: 36,
    md: 44,
  },
  lineHeight: 1.05,
  textWrap: "balance",
  ".dark &": {
    color: darkFoodTheme.text,
  },
});

export const subtitleStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  marginTop: 1,
  maxWidth: 680,
  fontSize: {
    xs: 14,
    sm: 16,
  },
  lineHeight: 1.65,
  ".dark &": {
    color: darkFoodTheme.muted,
  },
});

export const heroPanelStyles = (theme: Theme) => ({
  position: "relative",
  zIndex: 5,
  overflow: "visible",
  borderRadius: {
    xs: 3,
    md: 4,
  },
  border: `1px solid ${lightWarm.border}`,
  background:
    "linear-gradient(135deg, rgba(255, 251, 245, 0.88) 0%, rgba(255, 247, 237, 0.72) 54%, rgba(255, 251, 245, 0.82) 100%)",
  boxShadow:
    "0 24px 64px rgba(15, 23, 42, 0.09), 0 0 0 1px rgba(15, 23, 42, 0.035), inset 0 1px 0 rgba(255, 255, 255, 0.86)",
  backdropFilter: "blur(24px) saturate(1.18)",
  WebkitBackdropFilter: "blur(24px) saturate(1.18)",
  padding: {
    xs: 1.5,
    md: 2,
  },
  marginBottom: 2.5,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    borderRadius: "inherit",
    background:
      "radial-gradient(circle at 12% 0%, rgba(248, 182, 90, 0.14), transparent 28%), radial-gradient(circle at 92% 18%, rgba(249, 115, 22, 0.1), transparent 24%)",
    opacity: 0.72,
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
  ".dark &": {
    borderColor: darkFoodTheme.border,
    background:
      "linear-gradient(135deg, rgba(28, 25, 23, 0.98) 0%, rgba(41, 37, 36, 0.9) 54%, rgba(12, 10, 9, 0.98) 100%)",
    boxShadow:
      "0 28px 80px rgba(0, 0, 0, 0.52), 0 0 42px rgba(249, 115, 22, 0.1), inset 0 1px 0 rgba(255, 247, 237, 0.08)",
    "&::before": {
      background:
        "radial-gradient(circle at 14% 0%, rgba(249, 115, 22, 0.18), transparent 30%), radial-gradient(circle at 92% 12%, rgba(234, 88, 12, 0.14), transparent 27%)",
      opacity: 0.86,
    },
  },
});

export const searchPanelHeaderStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    md: "minmax(360px, 1fr)",
  },
  gap: {
    xs: 1.5,
    md: 2,
  },
  alignItems: "stretch",
  marginBottom: {
    xs: 1.5,
    md: 2,
  },
});

export const searchPanelCopyStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  minWidth: 0,
  gap: 1,
});

export const searchPanelEyebrowStyles = (theme: Theme) => ({
  display: "inline-flex",
  width: "fit-content",
  alignItems: "center",
  gap: 0.65,
  borderRadius: "999px",
  backgroundColor: "color-mix(in srgb, #FF6B00 13%, transparent)",
  color: "#D9480F",
  padding: "0.4rem 0.7rem",
  fontSize: 12,
  fontWeight: 800,
  ".dark &": {
    color: darkFoodTheme.orange,
    backgroundColor: "rgb(249 115 22 / 0.14)",
    boxShadow: "inset 0 0 0 1px rgb(249 115 22 / 0.18)",
  },
});

export const searchPanelTitleStyles = (theme: Theme) => ({
  marginTop: 1,
  maxWidth: 520,
  color: "var(--foreground)",
  fontSize: {
    xs: 20,
    sm: 24,
    md: 28,
  },
  fontWeight: 850,
  lineHeight: 1.12,
  letterSpacing: 0,
  textWrap: "balance",
  ".dark &": {
    color: darkFoodTheme.text,
  },
});

export const contextCardGridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(3, minmax(0, 1fr))",
  },
  gap: 1,
});

export const contextCardStyles = (theme: Theme) => ({
  display: "flex",
  minWidth: 0,
  alignItems: "center",
  gap: 1,
  borderRadius: 3,
  border: `1px solid ${lightWarm.border}`,
  backgroundColor: `rgba(255, 251, 245, 0.72)`,
  padding: {
    xs: "0.8rem 0.9rem",
    md: "0.9rem",
  },
  boxShadow:
    "0 14px 30px rgba(15, 23, 42, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.72)",
  backdropFilter: "blur(16px) saturate(1.12)",
  WebkitBackdropFilter: "blur(16px) saturate(1.12)",
  ".dark &": {
    borderColor: darkFoodTheme.border,
    background:
      "linear-gradient(145deg, rgba(28, 25, 23, 0.96) 0%, rgba(41, 37, 36, 0.88) 100%)",
    boxShadow:
      "0 16px 34px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 247, 237, 0.06)",
  },
});

export const contextIconStyles = (theme: Theme) => ({
  display: "grid",
  width: 34,
  height: 34,
  flexShrink: 0,
  placeItems: "center",
  borderRadius: "12px",
  color: "#FFFFFF",
  background: "linear-gradient(135deg, #FF8A1F 0%, #D9480F 100%)",
  boxShadow: "none",
});

export const contextTitleStyles = (theme: Theme) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "var(--foreground)",
  fontSize: 13,
  fontWeight: 850,
  ".dark &": {
    color: darkFoodTheme.text,
  },
});

export const contextHelperStyles = (theme: Theme) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "var(--muted-foreground)",
  fontSize: 12,
  fontWeight: 700,
  ".dark &": {
    color: darkFoodTheme.muted,
  },
});

export const searchAreaStyles = (theme: Theme) => ({
  position: "relative",
  zIndex: 10,
});

export const searchInputStyles = (theme: Theme) => ({
  "& .MuiOutlinedInput-root": {
    minHeight: {
      xs: 56,
      sm: 62,
    },
    borderRadius: {
      xs: 3,
      sm: 4,
    },
    backgroundColor: `rgba(255, 251, 245, 0.88)`,
    color: "var(--foreground)",
    boxShadow:
      "0 16px 34px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.78)",
    backdropFilter: "blur(18px) saturate(1.14)",
    WebkitBackdropFilter: "blur(18px) saturate(1.14)",
    "& fieldset": {
      borderColor: lightWarm.border,
    },
    "&:hover fieldset": {
      borderColor: lightWarm.borderStrong,
    },
    "&.Mui-focused fieldset": {
      borderColor: "#D9480F",
      borderWidth: 1,
    },
  },
  "& .MuiInputAdornment-root svg": {
    color: "#D9480F",
  },
  "& .MuiInputBase-input": {
    fontSize: {
      xs: 15,
      sm: 16,
    },
    fontWeight: 650,
  },
  ".dark & .MuiOutlinedInput-root": {
    backgroundColor: "rgba(12, 10, 9, 0.82)",
    color: darkFoodTheme.text,
    boxShadow:
      "0 18px 38px rgba(0, 0, 0, 0.46), inset 0 1px 0 rgba(255, 247, 237, 0.06)",
    "& fieldset": {
      borderColor: darkFoodTheme.border,
    },
    "&:hover fieldset": {
      borderColor: darkFoodTheme.borderStrong,
    },
    "&.Mui-focused fieldset": {
      borderColor: darkFoodTheme.orange,
    },
  },
  ".dark & .MuiInputBase-input::placeholder": {
    color: darkFoodTheme.mutedSoft,
    opacity: 1,
  },
  ".dark & .MuiInputAdornment-root svg": {
    color: darkFoodTheme.orangeStrong,
  },
});

export const suggestionPaperStyles = (theme: Theme) => ({
  position: "absolute",
  zIndex: 100,
  left: 0,
  right: 0,
  top: "calc(100% + 10px)",
  borderRadius: 4,
  border: `1px solid ${lightWarm.border}`,
  backgroundColor: `rgba(255, 251, 245, 0.96)`,
  color: "var(--popover-foreground)",
  boxShadow:
    "0 24px 70px rgba(15, 23, 42, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.78)",
  backdropFilter: "blur(22px) saturate(1.14)",
  WebkitBackdropFilter: "blur(22px) saturate(1.14)",
  overflow: "hidden",
  padding: "0.45rem",
  ".dark &": {
    borderColor: darkFoodTheme.border,
    background:
      "linear-gradient(180deg, rgba(28, 25, 23, 0.98) 0%, rgba(12, 10, 9, 0.98) 100%)",
    color: darkFoodTheme.text,
    boxShadow:
      "0 28px 78px rgb(0 0 0 / 0.62), 0 0 0 1px rgb(249 115 22 / 0.08)",
  },
});

export const suggestionGroupStyles = (theme: Theme) => ({
  "& + &": {
    borderTop: "1px solid var(--border)",
    marginTop: 0.35,
    paddingTop: 0.35,
  },
  ".dark & + &": {
    borderTopColor: "rgb(249 115 22 / 0.18)",
  },
});

export const suggestionGroupLabelStyles = (theme: Theme) => ({
  padding: "0.45rem 0.65rem 0.3rem",
  color: "var(--muted-foreground)",
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  ".dark &": {
    color: darkFoodTheme.muted,
  },
});

export const suggestionItemStyles = (theme: Theme) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  border: 0,
  cursor: "pointer",
  padding: "0.75rem 1rem",
  borderRadius: 2,
  color: "var(--popover-foreground)",
  backgroundColor: "transparent",
  textAlign: "left",
  outline: "2px solid transparent",
  outlineOffset: -2,
  "&:hover": {
    backgroundColor: "color-mix(in srgb, #FF6B00 14%, var(--accent))",
  },
  "&:focus-visible": {
    backgroundColor: "color-mix(in srgb, #FF6B00 14%, var(--accent))",
    boxShadow: "inset 0 0 0 2px #D9480F",
  },
  ".dark &": {
    color: darkFoodTheme.text,
    "&:hover": {
      backgroundColor: "rgb(249 115 22 / 0.16)",
    },
    "&:focus-visible": {
      backgroundColor: "rgb(249 115 22 / 0.18)",
      boxShadow: `inset 0 0 0 2px ${darkFoodTheme.orange}`,
    },
  },
});

export const tagRailStyles = (theme: Theme) => ({
  position: "relative",
  zIndex: 1,
  display: "flex",
  gap: 1,
  overflowX: "auto",
  paddingTop: 1.5,
  paddingBottom: 0.5,
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

export const tagChipStyles = (isActive: boolean) => (theme: Theme) => ({
  borderRadius: "999px",
  fontWeight: 700,
  flexShrink: 0,
  borderColor: isActive ? "#D9480F" : lightWarm.border,
  background: isActive
    ? "linear-gradient(135deg, #D9480F 0%, #FF6B00 100%)"
    : `rgba(255, 251, 245, 0.82)`,
  color: isActive ? "#FFFFFF" : "var(--muted-foreground)",
  boxShadow: isActive ? "none" : "inset 0 1px 0 rgba(255, 255, 255, 0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  "&:hover": {
    backgroundColor: isActive ? "#D9480F" : `rgba(255, 251, 245, 0.96)`,
  },
  ".dark &": {
    borderColor: isActive
      ? darkFoodTheme.orangeStrong
      : "rgb(249 115 22 / 0.26)",
    background: isActive
      ? "linear-gradient(135deg, #FB923C 0%, #F97316 54%, #EA580C 100%)"
      : "rgba(28, 25, 23, 0.72)",
    color: isActive ? "#FFFFFF" : darkFoodTheme.muted,
    boxShadow: "none",
    "&:hover": {
      background: isActive
        ? "linear-gradient(135deg, #FDBA74 0%, #F97316 58%, #EA580C 100%)"
        : "rgb(249 115 22 / 0.14)",
      color: isActive ? "#FFFFFF" : darkFoodTheme.text,
      borderColor: darkFoodTheme.borderStrong,
    },
  },
});

export const statusRowStyles = (theme: Theme) => ({
  position: "relative",
  zIndex: 1,
  display: "flex",
  alignItems: {
    xs: "flex-start",
    sm: "center",
  },
  justifyContent: "space-between",
  flexDirection: {
    xs: "column",
    sm: "row",
  },
  gap: 1,
  marginBottom: 2,
  paddingInline: {
    xs: 0.25,
    sm: 0.5,
  },
});

export const resultCountStyles = (theme: Theme) => ({
  fontWeight: 800,
  fontSize: {
    xs: 18,
    sm: 20,
  },
  color: "var(--foreground)",
  ".dark &": {
    color: darkFoodTheme.text,
  },
});

export const helperTextStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: 14,
  ".dark &": {
    color: darkFoodTheme.muted,
  },
});

export const gridStyles = (theme: Theme) => ({
  position: "relative",
  zIndex: 1,
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(3, minmax(0, 1fr))",
  },
  gap: {
    xs: 1.35,
    md: 2,
  },
});

export const cardStyles = (theme: Theme) => ({
  height: "100%",
  borderRadius: {
    xs: 3,
    md: 4,
  },
  overflow: "hidden",
  border: `1px solid ${lightWarm.border}`,
  background:
    "linear-gradient(180deg, rgba(255, 251, 245, 0.92) 0%, rgba(255, 247, 237, 0.72) 100%)",
  color: "var(--card-foreground)",
  boxShadow:
    "0 18px 42px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(15, 23, 42, 0.035), inset 0 1px 0 rgba(255, 255, 255, 0.86)",
  backdropFilter: "blur(22px) saturate(1.16)",
  WebkitBackdropFilter: "blur(22px) saturate(1.16)",
  transition:
    "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
  "&:hover": {
    transform: "translateY(-3px)",
    borderColor: lightWarm.borderStrong,
    boxShadow:
      "0 24px 54px rgba(15, 23, 42, 0.14), 0 0 0 1px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.88)",
  },
  ".dark &": {
    borderColor: darkFoodTheme.border,
    background:
      "linear-gradient(180deg, #1C1917 0%, #151110 56%, #0C0A09 100%)",
    color: darkFoodTheme.text,
    boxShadow:
      "0 18px 42px rgba(0, 0, 0, 0.52), inset 0 1px 0 rgba(255, 247, 237, 0.06)",
    "&:hover": {
      borderColor: darkFoodTheme.borderStrong,
      boxShadow:
        "0 24px 56px rgba(0, 0, 0, 0.62), 0 0 34px rgba(249, 115, 22, 0.12)",
    },
  },
});

export const cardActionStyles = (theme: Theme) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  "&:focus-visible": {
    outline: "3px solid color-mix(in srgb, #D9480F 38%, transparent)",
    outlineOffset: -3,
  },
});

export const cardMediaWrapStyles = (theme: Theme) => ({
  position: "relative",
  overflow: "hidden",
});

export const cardMediaStyles = (theme: Theme) => ({
  height: {
    xs: 178,
    md: 190,
  },
  transition: "transform 220ms ease",
  ".MuiCardActionArea-root:hover &": {
    transform: "scale(1.035)",
  },
});

export const cardMediaOverlayStyles = (theme: Theme) => ({
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "space-between",
  gap: 1,
  padding: 1.4,
  background:
    "linear-gradient(180deg, rgb(0 0 0 / 0.04) 0%, transparent 32%, rgb(0 0 0 / 0.64) 100%)",
});

export const cardContentStyles = (theme: Theme) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1.25,
  padding: {
    xs: 1.6,
    sm: 2,
  },
});

export const cardHeaderStyles = (theme: Theme) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 1,
});

export const foodNameStyles = (theme: Theme) => ({
  fontWeight: 850,
  fontSize: {
    xs: 18,
    sm: 19,
  },
  lineHeight: 1.2,
  textWrap: "balance",
  ".dark &": {
    color: darkFoodTheme.text,
  },
});

export const scoreBadgeStyles = (theme: Theme) => ({
  borderRadius: "999px",
  border: "1px solid rgba(187, 247, 208, 0.64)",
  backgroundColor: "rgba(240, 253, 244, 0.9)",
  color: "#15803D",
  fontWeight: 800,
  fontSize: 12,
  padding: "0.25rem 0.55rem",
  flexShrink: 0,
  boxShadow:
    "0 10px 26px rgba(0, 0, 0, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.84)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  ".dark &": {
    borderColor: "rgba(124, 197, 132, 0.3)",
    backgroundColor: "rgba(47, 143, 70, 0.18)",
    color: "#7CC584",
    boxShadow: "none",
  },
});

export const pricePillStyles = (theme: Theme) => ({
  borderRadius: "999px",
  backgroundColor: "rgb(9 9 11 / 0.64)",
  color: "#fff",
  fontSize: 12,
  fontWeight: 800,
  padding: "0.25rem 0.6rem",
  backdropFilter: "blur(8px)",
});

export const descriptionStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: 14,
  lineHeight: 1.62,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textWrap: "pretty",
  ".dark &": {
    color: darkFoodTheme.muted,
  },
});

export const chipWrapStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0.75,
});

export const softTagStyles = (theme: Theme) => ({
  height: 25,
  borderRadius: "999px",
  borderColor: lightWarm.border,
  backgroundColor: `rgba(255, 251, 245, 0.72)`,
  color: "#44403c",
  fontSize: 12,
  fontWeight: 700,
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  ".dark &": {
    backgroundColor: "rgba(249, 115, 22, 0.12)",
    color: "#FDBA74",
    borderColor: "rgba(249, 115, 22, 0.2)",
  },
});

export const locationLineStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  color: "var(--muted-foreground)",
  fontSize: 13,
  marginTop: "auto",
  minWidth: 0,
  ".dark &": {
    color: darkFoodTheme.muted,
  },
});

export const locationTextStyles = (theme: Theme) => ({
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const emptyStateStyles = (theme: Theme) => ({
  border: `1px dashed ${lightWarm.borderStrong}`,
  borderRadius: 4,
  textAlign: "center",
  padding: {
    xs: "3rem 1.25rem",
    md: "4rem 2rem",
  },
  background:
    "linear-gradient(135deg, rgba(255, 251, 245, 0.88) 0%, rgba(255, 247, 237, 0.62) 100%)",
  boxShadow: "0 18px 42px rgba(15, 23, 42, 0.08)",
  backdropFilter: "blur(20px) saturate(1.12)",
  WebkitBackdropFilter: "blur(20px) saturate(1.12)",
  ".dark &": {
    borderColor: darkFoodTheme.border,
    background: "linear-gradient(135deg, #1C1917 0%, #292524 100%)",
  },
});

export const dialogPaperStyles = (theme: Theme) => ({
  borderRadius: {
    xs: 0,
    sm: 4,
  },
  border: `1px solid ${lightWarm.border}`,
  backgroundColor: `rgba(255, 251, 245, 0.97)`,
  color: "var(--foreground)",
  boxShadow: "0 28px 80px rgba(15, 23, 42, 0.18)",
  backdropFilter: "blur(18px) saturate(1.12)",
  WebkitBackdropFilter: "blur(18px) saturate(1.12)",
  ".dark &": {
    backgroundColor: darkFoodTheme.background,
    color: darkFoodTheme.text,
    border: `1px solid ${darkFoodTheme.border}`,
    boxShadow: "0 28px 80px rgba(0, 0, 0, 0.64)",
  },
});

export const foodDetailDrawerPaperStyles = (isMobile: boolean) => (theme: Theme) => ({
  width: isMobile ? "100%" : 520,
  height: isMobile ? "92dvh" : "100dvh",
  maxHeight: "100dvh",
  borderRadius: isMobile ? "24px 24px 0 0" : 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  backgroundColor: "rgba(255, 251, 245, 0.99)",
  color: "var(--foreground)",
  ".dark &": {
    backgroundColor: darkFoodTheme.background,
    color: darkFoodTheme.text,
  },
});

export const detailHeroStyles = (theme: Theme) => ({
  position: "relative",
  height: {
    xs: 220,
    sm: 280,
  },
  overflow: "hidden",
});

export const detailImageStyles = (theme: Theme) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const detailOverlayStyles = (theme: Theme) => ({
  position: "absolute",
  inset: 0,
  background:
    "linear-gradient(180deg, transparent 20%, color-mix(in srgb, var(--background) 94%, transparent) 100%)",
  ".dark &": {
    background:
      "linear-gradient(180deg, transparent 16%, rgb(5 5 5 / 0.96) 100%)",
  },
});

export const detailTitleWrapStyles = (theme: Theme) => ({
  position: "absolute",
  left: {
    xs: 16,
    sm: 24,
  },
  right: {
    xs: 16,
    sm: 24,
  },
  bottom: {
    xs: 14,
    sm: 20,
  },
});

export const detailContentStyles = (theme: Theme) => ({
  flex: 1,
  overflowY: "auto",
  padding: {
    xs: 2,
    sm: 3,
  },
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(249, 115, 22, 0.28) transparent",
  "&::-webkit-scrollbar": {
    width: 4,
  },
  "&::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "rgba(249, 115, 22, 0.28)",
    borderRadius: 4,
  },
});

export const detailSectionStyles = (theme: Theme) => ({
  marginTop: 2.5,
});

export const locationCardStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1.5,
  padding: 1.5,
  borderRadius: 2,
  border: `1px solid ${lightWarm.border}`,
  backgroundColor: `rgba(255, 251, 245, 0.78)`,
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.72)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  ".dark &": {
    borderColor: darkFoodTheme.border,
    background:
      "linear-gradient(135deg, rgba(28, 25, 23, 0.98) 0%, rgba(41, 37, 36, 0.92) 100%)",
  },
});

export const mapLinkStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  whiteSpace: "nowrap",
  color: "var(--primary)",
  fontWeight: 800,
  textDecoration: "none",
  ".dark &": {
    color: darkFoodTheme.orange,
  },
});

export const detailSectionLabelStyles = (theme: Theme) => ({
  fontWeight: 800,
  marginBottom: 1,
  color: "var(--foreground)",
  ".dark &": {
    color: darkFoodTheme.text,
  },
});

export const detailListItemStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: 14,
  ".dark &": {
    color: darkFoodTheme.muted,
  },
});

export const detailBodyTextStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: 14,
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
  ".dark &": {
    color: darkFoodTheme.muted,
  },
});

export const instructionStepStyles = (theme: Theme) => ({
  display: "flex",
  gap: 1.25,
  alignItems: "flex-start",
});

export const instructionStepBadgeStyles = (theme: Theme) => ({
  flexShrink: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 22,
  height: 22,
  borderRadius: "50%",
  fontSize: 11,
  fontWeight: 800,
  lineHeight: 1,
  mt: "1px",
  background: "linear-gradient(135deg, #FF8A1F 0%, #D9480F 100%)",
  color: "#fff",
});

export const instructionStepTextStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: 14,
  lineHeight: 1.7,
  flex: 1,
  ".dark &": {
    color: darkFoodTheme.muted,
  },
});

export const detailFavoriteBadgeStyles = (theme: Theme) => ({
  fontSize: 12,
  fontWeight: 700,
  backgroundColor: "rgba(249,115,22,0.1)",
  color: "#EA580C",
  border: "1px solid rgba(249,115,22,0.25)",
  ".dark &": {
    backgroundColor: "rgba(249,115,22,0.16)",
    color: "#FB923C",
    borderColor: "rgba(249,115,22,0.32)",
  },
});

export const suggestionSecondaryTextStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: 13,
  ".dark &": {
    color: darkFoodTheme.mutedSoft,
  },
});

export const closeButtonStyles = (theme: Theme) => ({
  position: "absolute",
  top: 12,
  right: 12,
  zIndex: 2,
  backgroundColor: "rgb(0 0 0 / 0.42)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgb(0 0 0 / 0.58)",
  },
  ".dark &": {
    border: `1px solid ${darkFoodTheme.border}`,
    backgroundColor: "rgb(5 5 5 / 0.72)",
    "&:hover": {
      backgroundColor: "rgb(249 115 22 / 0.18)",
    },
  },
});

// ---------------------------------------------------------------------------
// Category browser styles
// ---------------------------------------------------------------------------

export const categorySectionStyles = (theme: Theme) => ({
  mt: {
    xs: 1.25,
    md: 1.5,
  },
  position: "relative",
  zIndex: 2,
});

export const categoryHeaderStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  mb: 1,
  px: 0.25,
});

export const categoryTitleStyles = (theme: Theme) => ({
  color: "var(--foreground)",
  fontSize: 13,
  fontWeight: 850,
  ".dark &": {
    color: darkFoodTheme.text,
  },
});

export const categoryMetaStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: 12,
  fontWeight: 750,
  ".dark &": {
    color: darkFoodTheme.muted,
  },
});

export const categoryRailStyles = (theme: Theme) => ({
  display: "flex",
  gap: 1,
  overflowX: "auto",
  overflowY: "hidden",
  pb: 0.4,
  mx: -0.25,
  px: 0.25,
  scrollSnapType: "x proximity",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

export const categoryPillStyles = (isSelected: boolean) => (theme: Theme) => ({
  appearance: "none",
  display: "inline-flex",
  flexShrink: 0,
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minWidth: {
    xs: 118,
    sm: 132,
  },
  minHeight: 46,
  borderRadius: 999,
  border: "1px solid",
  cursor: "pointer",
  scrollSnapAlign: "start",
  px: 1.4,
  py: 0.75,
  textAlign: "left",
  transition:
    "transform 160ms ease, background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease",
  borderColor: isSelected ? "rgba(217, 72, 15, 0.58)" : lightWarm.border,
  color: isSelected ? "#9A3412" : "#57534E",
  background: isSelected
    ? "linear-gradient(135deg, rgba(255, 237, 213, 0.92), rgba(255, 251, 245, 0.82))"
    : "rgba(255, 251, 245, 0.72)",
  boxShadow: isSelected
    ? "0 12px 26px rgba(217, 72, 15, 0.12), inset 0 1px 0 rgba(255,255,255,0.8)"
    : "inset 0 1px 0 rgba(255,255,255,0.72)",
  backdropFilter: "blur(16px) saturate(1.12)",
  WebkitBackdropFilter: "blur(16px) saturate(1.12)",
  "&:hover": {
    transform: "translateY(-1px)",
    borderColor: isSelected ? "#D9480F" : lightWarm.borderStrong,
    background: isSelected
      ? "linear-gradient(135deg, rgba(255, 237, 213, 1), rgba(255, 251, 245, 0.92))"
      : "rgba(255, 251, 245, 0.9)",
  },
  ".dark &": {
    borderColor: isSelected ? "rgba(251, 146, 60, 0.52)" : darkFoodTheme.border,
    color: isSelected ? darkFoodTheme.orange : darkFoodTheme.muted,
    background: isSelected
      ? "linear-gradient(135deg, rgba(249, 115, 22, 0.18), rgba(41, 37, 36, 0.82))"
      : "rgba(28, 25, 23, 0.72)",
    boxShadow: isSelected
      ? "0 14px 30px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,247,237,0.07)"
      : "inset 0 1px 0 rgba(255,247,237,0.04)",
    "&:hover": {
      borderColor: isSelected
        ? darkFoodTheme.orangeStrong
        : "rgba(255, 247, 237, 0.22)",
      background: isSelected
        ? "linear-gradient(135deg, rgba(249, 115, 22, 0.24), rgba(41, 37, 36, 0.9))"
        : "rgba(255, 247, 237, 0.06)",
    },
  },
});

export const categoryPillLabelStyles = (theme: Theme) => ({
  maxWidth: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: 13,
  fontWeight: 850,
  lineHeight: 1.25,
});

export const categoryPillCountStyles = (theme: Theme) => ({
  mt: 0.25,
  color: "inherit",
  opacity: 0.72,
  fontSize: 11,
  fontWeight: 800,
  lineHeight: 1.1,
});

// ---------------------------------------------------------------------------
// Filter bar & panel styles
// ---------------------------------------------------------------------------

export const filterBarStyles = {
  display: "flex",
  alignItems: "center",
  gap: 1.5,
  mt: 1.5,
  mb: 0.5,
};

export const filterToggleButtonStyles = (
  isOpen: boolean,
  hasActive: boolean,
) => ({
  borderRadius: 99,
  textTransform: "none",
  fontWeight: 700,
  fontSize: 13,
  px: 2,
  py: 0.75,
  border: "1.5px solid",
  borderColor: hasActive ? "#ea580c" : "rgba(120,90,60,0.28)",
  color: hasActive ? "#ea580c" : "#78350f",
  backgroundColor: hasActive ? "rgba(234,88,12,0.06)" : "transparent",
  "&:hover": {
    backgroundColor: hasActive
      ? "rgba(234,88,12,0.12)"
      : "rgba(120,90,60,0.06)",
    borderColor: hasActive ? "#c2410c" : "rgba(120,90,60,0.45)",
  },
  "& .MuiButton-endIcon": {
    transition: "transform 0.18s ease",
    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
  },
  ".dark &": {
    borderColor: hasActive ? "#fb923c" : "rgba(255,247,237,0.18)",
    color: hasActive ? "#fb923c" : "rgba(255,247,237,0.72)",
    backgroundColor: hasActive ? "rgba(251,146,60,0.08)" : "transparent",
    "&:hover": {
      backgroundColor: hasActive
        ? "rgba(251,146,60,0.16)"
        : "rgba(255,247,237,0.06)",
      borderColor: hasActive ? "#f97316" : "rgba(255,247,237,0.32)",
    },
  },
});

export const filterPanelStyles = {
  mt: 1,
  mb: 1,
  px: 2,
  py: 2,
  borderRadius: 3,
  border: `1px solid ${lightWarm.borderStrong}`,
  backgroundColor: "rgba(255, 251, 245, 0.82)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow:
    "0 2px 12px rgba(120, 80, 40, 0.07), inset 0 1px 0 rgba(255,255,255,0.7)",
  maxHeight: 480,
  overflowY: "auto" as const,
  ".dark &": {
    borderColor: darkFoodTheme.border,
    backgroundColor: "rgba(28, 25, 23, 0.92)",
    boxShadow:
      "0 2px 16px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.04)",
  },
};

export const filterGroupStyles = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 1,
};

export const filterGroupLabelStyles = {
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  color: "#92400e",
  mb: 0.5,
  ".dark &": {
    color: darkFoodTheme.orange,
  },
};

export const filterOptionsGridStyles = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: 0.75,
};

export const filterOptionItemStyles = (isSelected: boolean) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  px: 1.25,
  py: 0.5,
  borderRadius: 99,
  border: "1.5px solid",
  cursor: "pointer",
  userSelect: "none" as const,
  transition: "all 0.14s ease",
  borderColor: isSelected ? "#ea580c" : "rgba(120,90,60,0.22)",
  backgroundColor: isSelected
    ? "rgba(234,88,12,0.08)"
    : "rgba(255,251,245,0.55)",
  color: isSelected ? "#c2410c" : "#57534e",
  "&:hover": {
    borderColor: isSelected ? "#c2410c" : "rgba(120,90,60,0.40)",
    backgroundColor: isSelected
      ? "rgba(234,88,12,0.14)"
      : "rgba(120,90,60,0.06)",
  },
  ".dark &": {
    borderColor: isSelected ? "#fb923c" : "rgba(255,247,237,0.14)",
    backgroundColor: isSelected
      ? "rgba(251,146,60,0.12)"
      : "rgba(28,25,23,0.55)",
    color: isSelected ? "#fb923c" : "rgba(255,247,237,0.65)",
    "&:hover": {
      borderColor: isSelected ? "#f97316" : "rgba(255,247,237,0.26)",
      backgroundColor: isSelected
        ? "rgba(251,146,60,0.20)"
        : "rgba(255,247,237,0.05)",
    },
  },
});

export const filterClearAllButtonStyles = {
  textTransform: "none" as const,
  fontWeight: 600,
  fontSize: 13,
  color: "#dc2626",
  px: 1,
  py: 0.5,
  minWidth: 0,
  "&:hover": {
    backgroundColor: "rgba(220,38,38,0.08)",
  },
  ".dark &": {
    color: "#f87171",
    "&:hover": {
      backgroundColor: "rgba(248,113,113,0.10)",
    },
  },
};

export const styles = {
  rootStyles,
  shellStyles,
  topBarStyles,
  backButtonStyles,
  titleBlockStyles,
  eyebrowStyles,
  titleStyles,
  subtitleStyles,
  heroPanelStyles,
  searchPanelHeaderStyles,
  searchPanelCopyStyles,
  searchPanelEyebrowStyles,
  searchPanelTitleStyles,
  contextCardGridStyles,
  contextCardStyles,
  contextIconStyles,
  contextTitleStyles,
  contextHelperStyles,
  searchAreaStyles,
  searchInputStyles,
  suggestionPaperStyles,
  suggestionGroupStyles,
  suggestionGroupLabelStyles,
  suggestionItemStyles,
  tagRailStyles,
  tagChipStyles,
  statusRowStyles,
  resultCountStyles,
  helperTextStyles,
  gridStyles,
  cardStyles,
  categorySectionStyles,
  categoryHeaderStyles,
  categoryTitleStyles,
  categoryMetaStyles,
  categoryRailStyles,
  categoryPillStyles,
  categoryPillLabelStyles,
  categoryPillCountStyles,
  cardActionStyles,
  cardMediaWrapStyles,
  cardMediaStyles,
  cardMediaOverlayStyles,
  cardContentStyles,
  cardHeaderStyles,
  foodNameStyles,
  scoreBadgeStyles,
  pricePillStyles,
  descriptionStyles,
  chipWrapStyles,
  softTagStyles,
  locationLineStyles,
  locationTextStyles,
  emptyStateStyles,
  dialogPaperStyles,
  foodDetailDrawerPaperStyles,
  detailHeroStyles,
  detailImageStyles,
  detailOverlayStyles,
  detailTitleWrapStyles,
  detailContentStyles,
  detailSectionStyles,
  detailSectionLabelStyles,
  detailListItemStyles,
  detailBodyTextStyles,
  instructionStepStyles,
  instructionStepBadgeStyles,
  instructionStepTextStyles,
  detailFavoriteBadgeStyles,
  suggestionSecondaryTextStyles,
  locationCardStyles,
  mapLinkStyles,
  closeButtonStyles,
  filterBarStyles,
  filterToggleButtonStyles,
  filterPanelStyles,
  filterGroupStyles,
  filterGroupLabelStyles,
  filterOptionsGridStyles,
  filterOptionItemStyles,
  filterClearAllButtonStyles,
} as const;
