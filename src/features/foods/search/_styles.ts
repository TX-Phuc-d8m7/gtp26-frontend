/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";

export const rootStyles = (isEmbedded?: boolean) => (theme: Theme) => ({
  height: isEmbedded ? "100%" : "auto",
  minHeight: isEmbedded ? 0 : "100dvh",
  overflowX: "hidden",
  overflowY: isEmbedded ? "auto" : "visible",
  WebkitOverflowScrolling: "touch",
  overscrollBehavior: isEmbedded ? "contain" : "auto",
  background:
    "linear-gradient(180deg, color-mix(in srgb, var(--primary) 7%, var(--background)) 0%, var(--background) 42%)",
  color: "var(--foreground)",
  scrollbarWidth: "thin",
  scrollbarColor:
    "color-mix(in srgb, var(--primary) 42%, var(--muted-foreground)) transparent",
  "&::-webkit-scrollbar": {
    width: 10,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
    marginBlock: 18,
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "999px",
    border: "3px solid transparent",
    backgroundColor:
      "color-mix(in srgb, var(--muted-foreground) 28%, transparent)",
  },
});

export const shellStyles = (theme: Theme) => ({
  width: "100%",
  maxWidth: 1180,
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
    xs: 2,
    md: 3,
  },
});

export const backButtonStyles = (theme: Theme) => ({
  width: 40,
  height: 40,
  borderRadius: "999px",
  color: "var(--foreground)",
  borderColor: "var(--border)",
  backgroundColor: "color-mix(in srgb, var(--background) 76%, transparent)",
  backdropFilter: "blur(10px)",
});

export const titleBlockStyles = (theme: Theme) => ({
  flex: 1,
  minWidth: 0,
});

export const eyebrowStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  color: "var(--primary)",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: 0,
  marginBottom: 0.5,
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
});

export const subtitleStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  marginTop: 1,
  maxWidth: 680,
  fontSize: {
    xs: 14,
    sm: 16,
  },
});

export const heroPanelStyles = (theme: Theme) => ({
  position: "relative",
  overflow: "visible",
  borderRadius: {
    xs: 3,
    md: 4,
  },
  border: "1px solid var(--border)",
  backgroundColor: "color-mix(in srgb, var(--card) 88%, transparent)",
  boxShadow: "0 24px 80px rgb(0 0 0 / 0.12)",
  backdropFilter: "blur(18px)",
  padding: {
    xs: 2,
    md: 3,
  },
  marginBottom: 2.5,
});

export const searchAreaStyles = (theme: Theme) => ({
  position: "relative",
});

export const searchInputStyles = (theme: Theme) => ({
  "& .MuiOutlinedInput-root": {
    minHeight: 58,
    borderRadius: 3,
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    boxShadow: "0 12px 30px rgb(0 0 0 / 0.08)",
    "& fieldset": {
      borderColor: "var(--border)",
    },
    "&:hover fieldset": {
      borderColor: "color-mix(in srgb, var(--primary) 50%, var(--border))",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--primary)",
      borderWidth: 1,
    },
  },
  "& .MuiInputBase-input": {
    fontSize: {
      xs: 15,
      sm: 16,
    },
    fontWeight: 600,
  },
});

export const suggestionPaperStyles = (theme: Theme) => ({
  position: "absolute",
  zIndex: 20,
  left: 0,
  right: 0,
  top: "calc(100% + 8px)",
  borderRadius: 3,
  border: "1px solid var(--border)",
  backgroundColor: "var(--popover)",
  color: "var(--popover-foreground)",
  boxShadow: "0 24px 60px rgb(0 0 0 / 0.16)",
  overflow: "hidden",
});

export const suggestionItemStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  cursor: "pointer",
  padding: "0.75rem 1rem",
  "&:hover": {
    backgroundColor: "var(--accent)",
  },
});

export const tagRailStyles = (theme: Theme) => ({
  display: "flex",
  gap: 1,
  overflowX: "auto",
  paddingTop: 2,
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
  borderColor: isActive ? "var(--primary)" : "var(--border)",
  backgroundColor: isActive
    ? "color-mix(in srgb, var(--primary) 15%, transparent)"
    : "var(--background)",
  color: isActive ? "var(--primary)" : "var(--muted-foreground)",
  "&:hover": {
    backgroundColor: isActive
      ? "color-mix(in srgb, var(--primary) 20%, transparent)"
      : "var(--secondary)",
  },
});

export const statusRowStyles = (theme: Theme) => ({
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
});

export const resultCountStyles = (theme: Theme) => ({
  fontWeight: 800,
  fontSize: {
    xs: 18,
    sm: 20,
  },
});

export const helperTextStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: 14,
});

export const gridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(3, minmax(0, 1fr))",
  },
  gap: {
    xs: 1.5,
    md: 2,
  },
});

export const cardStyles = (theme: Theme) => ({
  height: "100%",
  borderRadius: 3,
  overflow: "hidden",
  border: "1px solid var(--border)",
  backgroundColor: "var(--card)",
  color: "var(--card-foreground)",
  transition:
    "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
  "&:hover": {
    transform: "translateY(-3px)",
    borderColor: "color-mix(in srgb, var(--primary) 46%, var(--border))",
    boxShadow: "0 18px 40px rgb(0 0 0 / 0.14)",
  },
});

export const cardActionStyles = (theme: Theme) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
});

export const cardMediaStyles = (theme: Theme) => ({
  height: {
    xs: 168,
    md: 184,
  },
});

export const cardContentStyles = (theme: Theme) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: 1.25,
  padding: 2,
});

export const cardHeaderStyles = (theme: Theme) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 1,
});

export const foodNameStyles = (theme: Theme) => ({
  fontWeight: 800,
  fontSize: 19,
  lineHeight: 1.2,
});

export const scoreBadgeStyles = (theme: Theme) => ({
  borderRadius: "999px",
  backgroundColor: "color-mix(in srgb, var(--primary) 13%, transparent)",
  color: "var(--primary)",
  fontWeight: 800,
  fontSize: 12,
  padding: "0.25rem 0.55rem",
  flexShrink: 0,
});

export const descriptionStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: 14,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

export const chipWrapStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 0.75,
});

export const softTagStyles = (theme: Theme) => ({
  height: 25,
  borderRadius: "999px",
  backgroundColor: "var(--secondary)",
  color: "var(--secondary-foreground)",
  fontSize: 12,
  fontWeight: 700,
});

export const locationLineStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  color: "var(--muted-foreground)",
  fontSize: 13,
  marginTop: "auto",
});

export const emptyStateStyles = (theme: Theme) => ({
  border: "1px dashed var(--border)",
  borderRadius: 4,
  textAlign: "center",
  padding: {
    xs: "3rem 1.25rem",
    md: "4rem 2rem",
  },
  backgroundColor: "color-mix(in srgb, var(--card) 72%, transparent)",
});

export const dialogPaperStyles = (theme: Theme) => ({
  borderRadius: {
    xs: 0,
    sm: 4,
  },
  backgroundColor: "var(--background)",
  color: "var(--foreground)",
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
  padding: {
    xs: 2,
    sm: 3,
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
  border: "1px solid var(--border)",
  backgroundColor: "var(--card)",
});

export const mapLinkStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  whiteSpace: "nowrap",
  color: "var(--primary)",
  fontWeight: 800,
  textDecoration: "none",
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
});

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
  searchAreaStyles,
  searchInputStyles,
  suggestionPaperStyles,
  suggestionItemStyles,
  tagRailStyles,
  tagChipStyles,
  statusRowStyles,
  resultCountStyles,
  helperTextStyles,
  gridStyles,
  cardStyles,
  cardActionStyles,
  cardMediaStyles,
  cardContentStyles,
  cardHeaderStyles,
  foodNameStyles,
  scoreBadgeStyles,
  descriptionStyles,
  chipWrapStyles,
  softTagStyles,
  locationLineStyles,
  emptyStateStyles,
  dialogPaperStyles,
  detailHeroStyles,
  detailImageStyles,
  detailOverlayStyles,
  detailTitleWrapStyles,
  detailContentStyles,
  detailSectionStyles,
  locationCardStyles,
  mapLinkStyles,
  closeButtonStyles,
} as const;
