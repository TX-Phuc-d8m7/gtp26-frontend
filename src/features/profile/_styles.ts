/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";

const darkProfileTheme = {
  background: "#0C0A09",
  backgroundSoft: "#151110",
  surface: "#1C1917",
  surfaceSoft: "#292524",
  border: "rgba(255, 247, 237, 0.12)",
  text: "#FFF7ED",
  muted: "rgba(255, 247, 237, 0.6)",
  orange: "#FB923C",
  herb: "#7CC584",
  danger: "#FCA5A5",
} as const;

const inputBaseStyles = (theme: Theme) => ({
  display: "flex",
  height: 44,
  width: "100%",
  borderRadius: "14px",
  border: "1px solid",
  backgroundColor: "rgba(255, 255, 255, 0.68)",
  padding: "0.5rem 0.75rem 0.5rem 2.25rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "var(--foreground)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.78)",
  backdropFilter: "blur(16px) saturate(1.12)",
  WebkitBackdropFilter: "blur(16px) saturate(1.12)",
  "&:focus-visible": {
    outline: "none",
    borderColor: "#D9480F",
    boxShadow:
      "0 0 0 3px rgba(217, 72, 15, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.82)",
  },
  ".dark &": {
    borderColor: darkProfileTheme.border,
    backgroundColor: "rgba(28, 25, 23, 0.72)",
    color: darkProfileTheme.text,
    boxShadow: "inset 0 1px 0 rgba(255, 247, 237, 0.06)",
  },
});

export const pageShellStyles = (theme: Theme) => ({
  position: "relative",
  minHeight: "100vh",
  overflow: "hidden auto",
  scrollBehavior: "smooth",
  background:
    "radial-gradient(circle at 14% 0%, rgba(245, 114, 107, 0.1) 0, transparent 30%), radial-gradient(circle at 88% 8%, rgba(248, 182, 90, 0.1) 0, transparent 26%), linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 52%, #F9FAFB 100%)",
  padding: {
    xs: "1rem",
    sm: "2rem",
  },
  ".dark &": {
    background:
      "radial-gradient(circle at 12% 0%, rgba(249, 115, 22, 0.22) 0, transparent 30%), radial-gradient(circle at 92% 14%, rgba(249, 115, 22, 0.18) 0, transparent 25%), linear-gradient(180deg, #0C0A09 0%, #151110 48%, #0C0A09 100%)",
    color: darkProfileTheme.text,
  },
});

export const pageBackgroundStyles = (theme: Theme) => ({
  position: "absolute",
  inset: 0,
  zIndex: -1,
  background: "transparent",
});

export const controlHeaderStyles = (theme: Theme) => ({
  position: "sticky",
  top: 0,
  zIndex: 30,
  width: "100%",
  maxWidth: "76rem",
  marginInline: "auto",
  marginBottom: "1rem",
  border: "1px solid rgba(15, 23, 42, 0.12)",
  borderRadius: {
    xs: "20px",
    md: "24px",
  },
  background: "rgba(255, 255, 255, 0.72)",
  boxShadow:
    "0 18px 44px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.82)",
  backdropFilter: "blur(22px) saturate(1.16)",
  WebkitBackdropFilter: "blur(22px) saturate(1.16)",
  ".dark &": {
    borderColor: darkProfileTheme.border,
    background: "rgba(12, 10, 9, 0.86)",
    boxShadow:
      "0 18px 44px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 247, 237, 0.06)",
  },
});

export const controlHeaderInnerStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "auto minmax(0, 1fr) auto",
    lg: "auto minmax(220px, 1fr) auto auto",
  },
  alignItems: "center",
  gap: {
    xs: "0.75rem",
    md: "1rem",
  },
  padding: {
    xs: "0.75rem",
    md: "0.85rem 1rem",
  },
});

export const controlTitleBlockStyles = (theme: Theme) => ({
  minWidth: 0,
});

export const headerNavStyles = (theme: Theme) => ({
  display: {
    xs: "none",
    lg: "flex",
  },
  alignItems: "center",
  gap: "0.35rem",
  padding: "0.25rem",
  border: "1px solid rgba(15, 23, 42, 0.1)",
  borderRadius: "999px",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  ".dark &": {
    borderColor: darkProfileTheme.border,
    backgroundColor: "rgba(255, 247, 237, 0.04)",
  },
});

export const headerNavLinkStyles = (theme: Theme) => ({
  display: "inline-flex",
  minHeight: 34,
  alignItems: "center",
  borderRadius: "999px",
  paddingInline: "0.85rem",
  color: "var(--muted-foreground)",
  fontSize: "0.8rem",
  fontWeight: 800,
  textDecoration: "none",
  transition: "background-color 160ms ease, color 160ms ease",
  "&:hover": {
    color: "#D9480F",
    backgroundColor: "rgba(255, 107, 0, 0.1)",
  },
  ".dark &": {
    color: darkProfileTheme.muted,
    "&:hover": {
      color: darkProfileTheme.orange,
      backgroundColor: "rgba(249, 115, 22, 0.12)",
    },
  },
});

export const headerActionStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "0.6rem",
});

export const saveStatusStyles = (isDirty: boolean) => (theme: Theme) => ({
  display: {
    xs: "none",
    sm: "inline-flex",
  },
  alignItems: "center",
  gap: "0.45rem",
  border: `1px solid ${isDirty ? "rgba(217, 72, 15, 0.24)" : "rgba(47, 143, 70, 0.22)"}`,
  borderRadius: "999px",
  padding: "0.45rem 0.7rem",
  color: isDirty ? "#D9480F" : "#1D5F31",
  backgroundColor: isDirty
    ? "rgba(255, 107, 0, 0.1)"
    : "rgba(47, 143, 70, 0.1)",
  fontSize: "0.78rem",
  fontWeight: 800,
  ".dark &": {
    borderColor: isDirty
      ? "rgba(251, 146, 60, 0.24)"
      : "rgba(124, 197, 132, 0.24)",
    color: isDirty ? darkProfileTheme.orange : darkProfileTheme.herb,
    backgroundColor: isDirty
      ? "rgba(249, 115, 22, 0.12)"
      : "rgba(47, 143, 70, 0.12)",
  },
});

export const saveStatusIconStyles = (theme: Theme) => ({
  width: 14,
  height: 14,
});

export const containerStyles = (theme: Theme) => ({
  width: "100%",
  maxWidth: "76rem",
  marginInline: "auto",
  marginTop: "0",
  padding: {
    xs: 0,
    md: 0,
  },
});

export const cockpitLayoutStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    lg: "320px minmax(0, 1fr)",
  },
  alignItems: "start",
  gap: {
    xs: "1rem",
    lg: "1.25rem",
  },
});

export const summarySidebarStyles = (theme: Theme) => ({
  position: {
    xs: "relative",
    lg: "sticky",
  },
  top: {
    lg: 104,
  },
  display: "flex",
  minWidth: 0,
  flexDirection: "column",
  gap: "1rem",
});

export const contentColumnStyles = (theme: Theme) => ({
  minWidth: 0,
});

export const headerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginBottom: "2rem",
  paddingBottom: "1.5rem",
  borderBottom: "1px solid rgba(15, 23, 42, 0.12)",
  ".dark &": {
    borderBottomColor: darkProfileTheme.border,
  },
});

export const backButtonStyles = (theme: Theme) => ({
  padding: "0.5rem",
  borderRadius: "9999px",
  transition: "background-color 150ms ease",
  color: "var(--foreground)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.72)",
  },
  ".dark &:hover": {
    backgroundColor: "rgba(249, 115, 22, 0.14)",
  },
});

export const backIconStyles = (theme: Theme) => ({
  width: 20,
  height: 20,
  color: "var(--muted-foreground)",
});

export const titleStyles = (theme: Theme) => ({
  fontSize: "1.875rem",
  lineHeight: "2.25rem",
  fontWeight: 700,
  color: "var(--foreground)",
  ".dark &": {
    color: darkProfileTheme.text,
  },
});

export const descriptionStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  ".dark &": {
    color: darkProfileTheme.muted,
  },
});

export const formStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const sectionTitleStyles = (theme: Theme) => ({
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 850,
  color: "var(--foreground)",
  ".dark &": {
    color: darkProfileTheme.text,
  },
});

export const sectionDescriptionStyles = (theme: Theme) => ({
  marginTop: "0.2rem",
  color: "var(--muted-foreground)",
  fontSize: "0.85rem",
  lineHeight: 1.5,
  ".dark &": {
    color: darkProfileTheme.muted,
  },
});

export const sectionCardStyles = (theme: Theme) => ({
  scrollMarginTop: "7rem",
  border: "1px solid rgba(15, 23, 42, 0.16)",
  borderRadius: {
    xs: "22px",
    md: "26px",
  },
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 247, 237, 0.24) 54%, rgba(255, 255, 255, 0.58) 100%)",
  boxShadow:
    "0 20px 54px rgba(15, 23, 42, 0.1), 0 0 0 1px rgba(15, 23, 42, 0.035), inset 0 1px 0 rgba(255, 255, 255, 0.86)",
  backdropFilter: "blur(24px) saturate(1.18)",
  WebkitBackdropFilter: "blur(24px) saturate(1.18)",
  padding: {
    xs: "1.1rem",
    sm: "1.35rem",
  },
  ".dark &": {
    borderColor: darkProfileTheme.border,
    background:
      "linear-gradient(135deg, rgba(28, 25, 23, 0.98) 0%, rgba(41, 37, 36, 0.9) 54%, rgba(12, 10, 9, 0.98) 100%)",
    boxShadow:
      "0 24px 64px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 247, 237, 0.08)",
  },
});

export const sectionHeaderStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.9rem",
  marginBottom: "1.25rem",
});

export const sectionIconStyles =
  (variant: "default" | "danger" | "success") => (theme: Theme) => ({
    ...preferenceIconStyles(variant)(theme),
    width: 42,
    height: 42,
    borderRadius: "16px",
  });

export const preferencesSectionStyles = (theme: Theme) => ({
  paddingTop: "2rem",
  borderTop: "1px solid rgba(15, 23, 42, 0.12)",
  ".dark &": {
    borderTopColor: darkProfileTheme.border,
  },
});

export const preferencesTitleStyles = (theme: Theme) => ({
  marginBottom: "0.25rem",
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  fontWeight: 600,
  color: "var(--foreground)",
  ".dark &": {
    color: darkProfileTheme.text,
  },
});

export const preferencesDescriptionStyles = (theme: Theme) => ({
  marginBottom: "1.5rem",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "var(--muted-foreground)",
  ".dark &": {
    color: darkProfileTheme.muted,
  },
});

export const accountGridStyles = (theme: Theme) => ({
  display: "grid",
  gap: "1.5rem",
  gridTemplateColumns: {
    sm: "repeat(2, minmax(0, 1fr))",
  },
});

export const fieldStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const fullWidthFieldStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  gridColumn: {
    sm: "span 2 / span 2",
  },
});

export const labelStyles = (theme: Theme) => ({
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 800,
  color: "var(--foreground)",
  ".dark &": {
    color: darkProfileTheme.text,
  },
});

export const passwordLabelStyles = (theme: Theme) => ({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  fontWeight: 500,
  color: "var(--foreground)",
  ".dark &": {
    color: darkProfileTheme.text,
  },
});

export const optionalTextStyles = (theme: Theme) => ({
  fontSize: "0.75rem",
  lineHeight: "1rem",
  fontWeight: 400,
  color: "var(--muted-foreground)",
  ".dark &": {
    color: darkProfileTheme.muted,
  },
});

export const inputWrapperStyles = (theme: Theme) => ({
  position: "relative",
});

export const inputIconWrapperStyles = (theme: Theme) => ({
  position: "absolute",
  insetBlock: 0,
  left: 0,
  paddingLeft: "0.75rem",
  display: "flex",
  alignItems: "center",
  pointerEvents: "none",
  color: "var(--muted-foreground)",
});

export const inputIconStyles = (theme: Theme) => ({
  height: 16,
  width: 16,
});

export const inputStyles = (hasError?: boolean) => (theme: Theme) => ({
  ...inputBaseStyles(theme),
  borderColor: hasError ? "#ef4444" : "rgba(15, 23, 42, 0.16)",
});

export const passwordInputStyles = (theme: Theme) => ({
  ...inputBaseStyles(theme),
  borderColor: "rgba(15, 23, 42, 0.16)",
});

export const errorTextStyles = (theme: Theme) => ({
  fontSize: "0.75rem",
  lineHeight: "1rem",
  color: "#ef4444",
});

export const preferenceGroupStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});

export const preferenceGridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    md: "repeat(2, minmax(0, 1fr))",
  },
  gap: "1rem",
});

export const preferenceCardStyles = (theme: Theme) => ({
  display: "flex",
  minWidth: 0,
  flexDirection: "column",
  gap: "0.75rem",
  borderRadius: "18px",
  border: "1px solid rgba(15, 23, 42, 0.14)",
  backgroundColor: "rgba(255, 255, 255, 0.58)",
  padding: "1rem",
  boxShadow:
    "0 14px 30px rgba(15, 23, 42, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.72)",
  backdropFilter: "blur(16px) saturate(1.12)",
  WebkitBackdropFilter: "blur(16px) saturate(1.12)",
  ".dark &": {
    borderColor: darkProfileTheme.border,
    background:
      "linear-gradient(145deg, rgba(28, 25, 23, 0.96) 0%, rgba(41, 37, 36, 0.88) 100%)",
    boxShadow:
      "0 16px 34px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 247, 237, 0.06)",
  },
});

export const preferenceCardHeaderStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.85rem",
});

export const preferenceLabelBlockStyles = (theme: Theme) => ({
  minWidth: 0,
  flex: 1,
});

export const preferenceIconStyles =
  (variant: "default" | "danger" | "success") => (theme: Theme) => {
    const colors = {
      default: {
        bg: "rgba(255, 107, 0, 0.12)",
        border: "rgba(255, 107, 0, 0.22)",
        color: "#D9480F",
        darkColor: darkProfileTheme.orange,
      },
      danger: {
        bg: "rgba(239, 68, 68, 0.1)",
        border: "rgba(239, 68, 68, 0.22)",
        color: "#DC2626",
        darkColor: darkProfileTheme.danger,
      },
      success: {
        bg: "rgba(47, 143, 70, 0.12)",
        border: "rgba(47, 143, 70, 0.24)",
        color: "#1D5F31",
        darkColor: darkProfileTheme.herb,
      },
    }[variant];

    return {
      display: "grid",
      width: 36,
      height: 36,
      flexShrink: 0,
      placeItems: "center",
      borderRadius: "14px",
      border: `1px solid ${colors.border}`,
      color: colors.color,
      backgroundColor: colors.bg,
      ".dark &": {
        color: colors.darkColor,
        borderColor: "rgba(255, 247, 237, 0.12)",
        backgroundColor: "rgba(255, 247, 237, 0.06)",
      },
    };
  };

export const preferenceIconSvgStyles = (theme: Theme) => ({
  width: 18,
  height: 18,
});

export const fieldDescriptionStyles = (theme: Theme) => ({
  marginTop: "0.2rem",
  color: "var(--muted-foreground)",
  fontSize: "0.78rem",
  lineHeight: 1.45,
  ".dark &": {
    color: darkProfileTheme.muted,
  },
});

export const profileIdentityCardStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
  border: "1px solid rgba(15, 23, 42, 0.14)",
  borderRadius: "22px",
  backgroundColor: "rgba(255, 255, 255, 0.62)",
  padding: "1rem",
  boxShadow:
    "0 16px 38px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.78)",
  backdropFilter: "blur(18px) saturate(1.14)",
  WebkitBackdropFilter: "blur(18px) saturate(1.14)",
  ".dark &": {
    borderColor: darkProfileTheme.border,
    backgroundColor: "rgba(28, 25, 23, 0.82)",
    boxShadow:
      "0 18px 44px rgba(0, 0, 0, 0.36), inset 0 1px 0 rgba(255, 247, 237, 0.06)",
  },
});

export const avatarStyles = (theme: Theme) => ({
  display: "grid",
  width: 52,
  height: 52,
  flexShrink: 0,
  placeItems: "center",
  borderRadius: "18px",
  color: "#FFFFFF",
  background: "linear-gradient(135deg, #F5726B 0%, #FA914C 50%, #F8B65A 100%)",
  fontSize: "1.25rem",
  fontWeight: 900,
  boxShadow: "none",
});

export const identityCopyStyles = (theme: Theme) => ({
  minWidth: 0,
});

export const identityNameStyles = (theme: Theme) => ({
  overflow: "hidden",
  color: "var(--foreground)",
  fontSize: "0.98rem",
  fontWeight: 900,
  lineHeight: 1.25,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ".dark &": {
    color: darkProfileTheme.text,
  },
});

export const identityEmailStyles = (theme: Theme) => ({
  overflow: "hidden",
  color: "var(--muted-foreground)",
  fontSize: "0.8rem",
  fontWeight: 700,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ".dark &": {
    color: darkProfileTheme.muted,
  },
});

export const aiSummaryCardStyles = (theme: Theme) => ({
  border: "1px solid rgba(15, 23, 42, 0.16)",
  borderRadius: "26px",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 247, 237, 0.24) 54%, rgba(255, 255, 255, 0.58) 100%)",
  padding: "1rem",
  boxShadow:
    "0 20px 54px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.86)",
  backdropFilter: "blur(24px) saturate(1.18)",
  WebkitBackdropFilter: "blur(24px) saturate(1.18)",
  ".dark &": {
    borderColor: darkProfileTheme.border,
    background:
      "linear-gradient(135deg, rgba(28, 25, 23, 0.98) 0%, rgba(41, 37, 36, 0.9) 54%, rgba(12, 10, 9, 0.98) 100%)",
    boxShadow:
      "0 24px 64px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 247, 237, 0.08)",
  },
});

export const summaryHeaderStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "0.8rem",
});

export const summaryIconStyles = (theme: Theme) => ({
  display: "grid",
  width: 38,
  height: 38,
  flexShrink: 0,
  placeItems: "center",
  border: "1px solid rgba(15, 23, 42, 0.14)",
  borderRadius: "15px",
  color: "#D9480F",
  backgroundColor: "rgba(255, 107, 0, 0.1)",
  ".dark &": {
    borderColor: "rgba(255, 247, 237, 0.12)",
    color: darkProfileTheme.orange,
    backgroundColor: "rgba(249, 115, 22, 0.12)",
  },
});

export const summaryIconSvgStyles = (theme: Theme) => ({
  width: 18,
  height: 18,
});

export const summaryTitleStyles = (theme: Theme) => ({
  color: "var(--foreground)",
  fontSize: "0.95rem",
  fontWeight: 900,
  lineHeight: 1.25,
  ".dark &": {
    color: darkProfileTheme.text,
  },
});

export const summaryDescriptionStyles = (theme: Theme) => ({
  marginTop: "0.2rem",
  color: "var(--muted-foreground)",
  fontSize: "0.78rem",
  lineHeight: 1.45,
  ".dark &": {
    color: darkProfileTheme.muted,
  },
});

export const profileScoreStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
  marginTop: "1.1rem",
});

export const profileScoreNumberStyles = (theme: Theme) => ({
  color: "#D9480F",
  fontSize: "2.2rem",
  fontWeight: 950,
  lineHeight: 1,
  ".dark &": {
    color: darkProfileTheme.orange,
  },
});

export const profileScoreMetaStyles = (theme: Theme) => ({
  minWidth: 0,
  flex: 1,
});

export const profileScoreLabelStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: "0.78rem",
  fontWeight: 800,
  ".dark &": {
    color: darkProfileTheme.muted,
  },
});

export const profileScoreTrackStyles = (theme: Theme) => ({
  height: 7,
  marginTop: "0.45rem",
  overflow: "hidden",
  borderRadius: "999px",
  backgroundColor: "rgba(15, 23, 42, 0.1)",
  ".dark &": {
    backgroundColor: "rgba(255, 247, 237, 0.1)",
  },
});

export const profileScoreFillStyles = (percent: number) => (theme: Theme) => ({
  width: `${percent}%`,
  height: "100%",
  borderRadius: "inherit",
  background: "linear-gradient(90deg, #F5726B 0%, #FA914C 50%, #F8B65A 100%)",
});

export const summaryMetricGridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: "0.6rem",
  marginTop: "1rem",
});

export const summaryMetricStyles = (theme: Theme) => ({
  minWidth: 0,
  border: "1px solid rgba(15, 23, 42, 0.12)",
  borderRadius: "16px",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  padding: "0.7rem",
  ".dark &": {
    borderColor: darkProfileTheme.border,
    backgroundColor: "rgba(255, 247, 237, 0.04)",
  },
});

export const summaryMetricValueStyles = (theme: Theme) => ({
  color: "var(--foreground)",
  fontSize: "1.1rem",
  fontWeight: 950,
  lineHeight: 1,
  ".dark &": {
    color: darkProfileTheme.text,
  },
});

export const summaryMetricLabelStyles = (theme: Theme) => ({
  marginTop: "0.35rem",
  color: "var(--foreground)",
  fontSize: "0.72rem",
  fontWeight: 850,
  ".dark &": {
    color: darkProfileTheme.text,
  },
});

export const summaryMetricHelperStyles = (theme: Theme) => ({
  color: "var(--muted-foreground)",
  fontSize: "0.68rem",
  fontWeight: 700,
  ".dark &": {
    color: darkProfileTheme.muted,
  },
});

export const insightListStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  marginTop: "1rem",
});

export const insightChipStyles = (theme: Theme) => ({
  border: "1px solid rgba(15, 23, 42, 0.12)",
  borderRadius: "999px",
  backgroundColor: "rgba(255, 255, 255, 0.52)",
  padding: "0.42rem 0.65rem",
  color: "var(--muted-foreground)",
  fontSize: "0.74rem",
  fontWeight: 800,
  ".dark &": {
    borderColor: darkProfileTheme.border,
    backgroundColor: "rgba(255, 247, 237, 0.05)",
    color: darkProfileTheme.muted,
  },
});

export const actionRowStyles = (theme: Theme) => ({
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: "1.5rem",
});

export const submitButtonStyles = (theme: Theme) => ({
  height: 40,
  paddingInline: "2rem",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #F5726B 0%, #FA914C 50%, #F8B65A 100%)",
  color: "var(--primary-foreground)",
  fontSize: "0.875rem",
  fontWeight: 500,
  transition: "background-color 150ms ease",
  boxShadow: "0 14px 30px rgba(245, 114, 107, 0.2)",
  "&:hover": {
    opacity: 0.94,
  },
  "&:disabled": {
    pointerEvents: "none",
    opacity: 0.5,
  },
});

export const submitIconStyles = (theme: Theme) => ({
  marginRight: "0.5rem",
  height: 16,
  width: 16,
});

export const loadingIconStyles = (theme: Theme) => ({
  marginRight: "0.5rem",
  height: 16,
  width: 16,
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    to: {
      transform: "rotate(360deg)",
    },
  },
});

export const styles = {
  pageShellStyles,
  pageBackgroundStyles,
  controlHeaderStyles,
  controlHeaderInnerStyles,
  controlTitleBlockStyles,
  headerNavStyles,
  headerNavLinkStyles,
  headerActionStyles,
  saveStatusStyles,
  saveStatusIconStyles,
  containerStyles,
  cockpitLayoutStyles,
  summarySidebarStyles,
  contentColumnStyles,
  headerStyles,
  backButtonStyles,
  backIconStyles,
  titleStyles,
  descriptionStyles,
  formStyles,
  sectionTitleStyles,
  sectionDescriptionStyles,
  sectionCardStyles,
  sectionHeaderStyles,
  sectionIconStyles,
  preferencesSectionStyles,
  preferencesTitleStyles,
  preferencesDescriptionStyles,
  accountGridStyles,
  fieldStyles,
  fullWidthFieldStyles,
  labelStyles,
  passwordLabelStyles,
  optionalTextStyles,
  inputWrapperStyles,
  inputIconWrapperStyles,
  inputIconStyles,
  inputStyles,
  passwordInputStyles,
  errorTextStyles,
  preferenceGroupStyles,
  actionRowStyles,
  submitButtonStyles,
  submitIconStyles,
  loadingIconStyles,
  preferenceGridStyles,
  preferenceCardStyles,
  preferenceCardHeaderStyles,
  preferenceLabelBlockStyles,
  preferenceIconStyles,
  preferenceIconSvgStyles,
  fieldDescriptionStyles,
  profileIdentityCardStyles,
  avatarStyles,
  identityCopyStyles,
  identityNameStyles,
  identityEmailStyles,
  aiSummaryCardStyles,
  summaryHeaderStyles,
  summaryIconStyles,
  summaryIconSvgStyles,
  summaryTitleStyles,
  summaryDescriptionStyles,
  profileScoreStyles,
  profileScoreNumberStyles,
  profileScoreMetaStyles,
  profileScoreLabelStyles,
  profileScoreTrackStyles,
  profileScoreFillStyles,
  summaryMetricGridStyles,
  summaryMetricStyles,
  summaryMetricValueStyles,
  summaryMetricLabelStyles,
  summaryMetricHelperStyles,
  insightListStyles,
  insightChipStyles,
} as const;
