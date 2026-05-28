/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

// ─── Design tokens — mirrors profile/admin dark theme exactly ────────────────

const darkTheme = {
  background: "#0C0A09",
  backgroundSoft: "#151110",
  surface: "#1C1917",
  surfaceSoft: "#292524",
  border: "rgba(255, 247, 237, 0.12)",
  borderSoft: "rgba(255, 247, 237, 0.06)",
  text: "#FFF7ED",
  muted: "rgba(255, 247, 237, 0.6)",
  orange: "#FB923C",
  orangeStrong: "#F97316",
  danger: "#FCA5A5",
} as const;

// ─── Page shell — same as profile pageShellStyles ────────────────────────────

export const pageShellStyles = (theme: Theme) => ({
  position: "relative",
  minHeight: "100dvh",
  overflow: "hidden auto",
  background:
    "radial-gradient(circle at 14% 0%, rgba(245, 114, 107, 0.1) 0, transparent 30%), radial-gradient(circle at 88% 8%, rgba(248, 182, 90, 0.1) 0, transparent 26%), linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 52%, #F9FAFB 100%)",
  padding: { xs: "1rem", sm: "1.5rem" },
  ".dark &": {
    background:
      "radial-gradient(circle at 12% 0%, rgba(249, 115, 22, 0.22) 0, transparent 30%), radial-gradient(circle at 92% 14%, rgba(249, 115, 22, 0.18) 0, transparent 25%), linear-gradient(180deg, #0C0A09 0%, #151110 48%, #0C0A09 100%)",
    color: darkTheme.text,
  },
});

// ─── Sticky pill header — same as profile controlHeaderStyles ─────────────────

export const controlHeaderStyles = (theme: Theme) => ({
  position: "sticky",
  top: 0,
  zIndex: 30,
  width: "100%",
  maxWidth: "72rem",
  marginInline: "auto",
  marginBottom: "1.25rem",
  border: "1px solid rgba(15, 23, 42, 0.12)",
  borderRadius: { xs: "20px", md: "24px" },
  background: "rgba(255, 255, 255, 0.72)",
  boxShadow:
    "0 18px 44px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.82)",
  backdropFilter: "blur(22px) saturate(1.16)",
  WebkitBackdropFilter: "blur(22px) saturate(1.16)",
  ".dark &": {
    borderColor: darkTheme.border,
    background: "rgba(12, 10, 9, 0.86)",
    boxShadow:
      "0 18px 44px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 247, 237, 0.06)",
  },
});

export const controlHeaderInnerStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: { xs: "0.75rem", md: "1rem" },
  padding: { xs: "0.75rem", md: "0.85rem 1rem" },
  flexWrap: "wrap",
});

// ─── Back button — same as profile backButtonStyles ───────────────────────────

export const backButtonStyles = (theme: Theme) => ({
  padding: "0.5rem",
  borderRadius: "9999px",
  transition: "background-color 150ms ease",
  color: "var(--foreground)",
  flexShrink: 0,
  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.72)" },
  ".dark &": {
    color: darkTheme.text,
    "&:hover": { backgroundColor: "rgba(249, 115, 22, 0.14)" },
  },
});

// ─── Title row ────────────────────────────────────────────────────────────────

export const titleGroupStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  flex: "1 1 auto",
  minWidth: 0,
});

export const titleStyles = (theme: Theme) => ({
  fontSize: { xs: "1.05rem", sm: "1.2rem" },
  fontWeight: 850,
  lineHeight: 1.2,
  color: "var(--foreground)",
  ".dark &": { color: darkTheme.text },
});

export const countBadgeStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  px: 1.1,
  py: 0.45,
  borderRadius: "999px",
  fontSize: 11,
  fontWeight: 900,
  backgroundColor: "rgba(249, 115, 22, 0.1)",
  color: "#C2410C",
  border: "1px solid rgba(249, 115, 22, 0.18)",
  ".dark &": {
    backgroundColor: "rgba(249, 115, 22, 0.14)",
    color: "#FDBA74",
    borderColor: "rgba(249, 115, 22, 0.22)",
  },
});

// ─── Header action area ───────────────────────────────────────────────────────

export const headerActionsStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  marginLeft: "auto",
  flexShrink: 0,
});

export const iconButtonStyles = (theme: Theme) => ({
  padding: "0.45rem",
  borderRadius: "9999px",
  transition: "background-color 150ms ease",
  color: "var(--muted-foreground)",
  "&:hover": {
    color: "#D9480F",
    backgroundColor: "rgba(255, 107, 0, 0.1)",
  },
  ".dark &": {
    color: darkTheme.muted,
    "&:hover": {
      color: darkTheme.orange,
      backgroundColor: "rgba(249, 115, 22, 0.12)",
    },
  },
});

// ─── Toolbar section — sits below header, same card style as profile ──────────

export const toolbarCardStyles = (theme: Theme) => ({
  scrollMarginTop: "7rem",
  border: "1px solid rgba(15, 23, 42, 0.12)",
  borderRadius: { xs: "20px", md: "24px" },
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 247, 237, 0.24) 54%, rgba(255, 255, 255, 0.58) 100%)",
  boxShadow:
    "0 20px 54px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.028), inset 0 1px 0 rgba(255, 255, 255, 0.86)",
  backdropFilter: "blur(24px) saturate(1.18)",
  WebkitBackdropFilter: "blur(24px) saturate(1.18)",
  padding: { xs: "0.85rem 1rem", md: "1rem 1.25rem" },
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "0.75rem",
  ".dark &": {
    borderColor: darkTheme.border,
    background:
      "linear-gradient(135deg, rgba(28, 25, 23, 0.98) 0%, rgba(41, 37, 36, 0.9) 54%, rgba(12, 10, 9, 0.98) 100%)",
    boxShadow:
      "0 24px 64px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 247, 237, 0.08)",
  },
});

export const searchFieldStyles = (theme: Theme) => ({
  flex: "1 1 200px",
  maxWidth: 320,
  "& .MuiOutlinedInput-root": {
    height: 40,
    borderRadius: "14px",
    border: "1px solid rgba(15, 23, 42, 0.16)",
    backgroundColor: "rgba(255, 255, 255, 0.68)",
    color: "var(--foreground)",
    fontWeight: 650,
    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.78)",
    backdropFilter: "blur(16px) saturate(1.12)",
    WebkitBackdropFilter: "blur(16px) saturate(1.12)",
    transition: "background-color 150ms ease, border-color 150ms ease",
    // Hide MUI fieldset — border is now on the root div
    "& fieldset": { border: "none" },
    "&:hover": {
      borderColor: "rgba(217, 72, 15, 0.3)",
      backgroundColor: "rgba(255, 255, 255, 0.88)",
    },
    "&.Mui-focused": { borderColor: "#D9480F" },
  },
  "& .MuiInputAdornment-root svg": { color: "#D9480F" },
  "& .MuiInputBase-input": {
    fontSize: 13,
    fontWeight: 650,
    "&::placeholder": { color: "var(--muted-foreground)", opacity: 1 },
  },
  ".dark & .MuiOutlinedInput-root": {
    border: `1px solid ${darkTheme.border}`,
    backgroundColor: "rgba(28, 25, 23, 0.72)",
    color: darkTheme.text,
    boxShadow: "inset 0 1px 0 rgba(255, 247, 237, 0.06)",
    "& fieldset": { border: "none" },
    "&:hover": {
      borderColor: "rgba(249, 115, 22, 0.3)",
      backgroundColor: "rgba(28, 25, 23, 0.9)",
    },
    "&.Mui-focused": { borderColor: darkTheme.orange },
  },
  ".dark & .MuiInputAdornment-root svg": { color: darkTheme.orange },
  ".dark & .MuiInputBase-input::placeholder": { color: darkTheme.muted, opacity: 1 },
});

export const sortSelectStyles = (theme: Theme) => ({
  // sx on <Select> applies directly to MuiInputBase-root — write flat, no "& .MuiOutlinedInput-root" wrapper
  minWidth: 140,
  height: "40px !important",
  borderRadius: "14px !important",
  border: "1px solid rgba(15, 23, 42, 0.16)",
  backgroundColor: "rgba(255, 255, 255, 0.68)",
  color: "var(--foreground)",
  fontWeight: 700,
  fontSize: 13,
  backdropFilter: "blur(16px) saturate(1.12)",
  WebkitBackdropFilter: "blur(16px) saturate(1.12)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.78)",
  transition: "background-color 150ms ease, border-color 150ms ease",
  // Hide MUI fieldset border — border is now on this root div
  "& fieldset": { border: "none" },
  "&:hover": {
    borderColor: "rgba(217, 72, 15, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.88)",
  },
  "&.Mui-focused": { borderColor: "#D9480F" },
  // Sync inner select padding with TextField input area
  "& .MuiSelect-select": {
    height: "100% !important",
    minHeight: "unset !important",
    padding: "0 32px 0 12px",
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  // Dropdown arrow icon
  "& .MuiSvgIcon-root": { color: "var(--muted-foreground)" },
  // Dark mode — target parent .dark class
  ".dark &": {
    border: `1px solid ${darkTheme.border}`,
    backgroundColor: "rgba(28, 25, 23, 0.72)",
    color: darkTheme.text,
    boxShadow: "inset 0 1px 0 rgba(255, 247, 237, 0.06)",
    "&:hover": {
      borderColor: "rgba(249, 115, 22, 0.3)",
      backgroundColor: "rgba(28, 25, 23, 0.9)",
    },
    "&.Mui-focused": { borderColor: darkTheme.orange },
    "& .MuiSvgIcon-root": { color: darkTheme.muted },
  },
});

export const sortOrderButtonStyles = (theme: Theme) => ({
  height: 40,
  width: 40,
  borderRadius: "14px",
  border: "1px solid rgba(15, 23, 42, 0.16)",
  backgroundColor: "rgba(255, 255, 255, 0.68)",
  color: "var(--muted-foreground)",
  backdropFilter: "blur(16px) saturate(1.12)",
  WebkitBackdropFilter: "blur(16px) saturate(1.12)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.78)",
  transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
  "&:hover": {
    color: "#D9480F",
    backgroundColor: "rgba(255, 107, 0, 0.1)",
    borderColor: "rgba(217, 72, 15, 0.3)",
  },
  ".dark &": {
    borderColor: darkTheme.border,
    backgroundColor: "rgba(28, 25, 23, 0.72)",
    color: darkTheme.muted,
    boxShadow: "inset 0 1px 0 rgba(255, 247, 237, 0.06)",
    "&:hover": {
      color: darkTheme.orange,
      backgroundColor: "rgba(249, 115, 22, 0.12)",
      borderColor: "rgba(249, 115, 22, 0.3)",
    },
  },
});

export const filterChipStyles = (active: boolean) => (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.4rem",
  height: 40,
  px: 1.5,
  borderRadius: "14px",
  border: "1px solid",
  fontSize: 13,
  fontWeight: 800,
  cursor: "pointer",
  backdropFilter: "blur(16px) saturate(1.12)",
  WebkitBackdropFilter: "blur(16px) saturate(1.12)",
  transition: "background-color 150ms ease, color 150ms ease, border-color 150ms ease",
  borderColor: active ? "rgba(217, 72, 15, 0.4)" : "rgba(15, 23, 42, 0.16)",
  backgroundColor: active ? "rgba(255, 107, 0, 0.1)" : "rgba(255, 255, 255, 0.68)",
  color: active ? "#D9480F" : "var(--muted-foreground)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.78)",
  "&:hover": {
    backgroundColor: active ? "rgba(255, 107, 0, 0.16)" : "rgba(255, 255, 255, 0.9)",
    borderColor: active ? "rgba(217, 72, 15, 0.6)" : "rgba(15, 23, 42, 0.28)",
  },
  ".dark &": {
    borderColor: active ? "rgba(251, 146, 60, 0.4)" : darkTheme.border,
    backgroundColor: active ? "rgba(249, 115, 22, 0.14)" : "rgba(28, 25, 23, 0.72)",
    color: active ? "#FDBA74" : darkTheme.muted,
    boxShadow: "inset 0 1px 0 rgba(255, 247, 237, 0.06)",
    "&:hover": {
      backgroundColor: active ? "rgba(249, 115, 22, 0.2)" : "rgba(255, 247, 237, 0.06)",
      borderColor: active ? "rgba(251, 146, 60, 0.6)" : "rgba(255, 247, 237, 0.22)",
      color: active ? "#FDBA74" : darkTheme.text,
    },
  },
});

// ─── Container ────────────────────────────────────────────────────────────────

export const containerStyles = (theme: Theme) => ({
  width: "100%",
  maxWidth: "72rem",
  marginInline: "auto",
});

// ─── Grid ─────────────────────────────────────────────────────────────────────

export const gridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, minmax(0, 1fr))",
    lg: "repeat(3, minmax(0, 1fr))",
  },
  gap: { xs: "0.85rem", md: "1rem" },
});

// ─── Card — mirrors profile preferenceCardStyles ──────────────────────────────

export const cardStyles = (theme: Theme) => ({
  display: "flex",
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
  transition: "transform 180ms ease, box-shadow 180ms ease",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      "0 20px 40px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
  },
  ".dark &": {
    borderColor: darkTheme.border,
    background:
      "linear-gradient(145deg, rgba(28, 25, 23, 0.96) 0%, rgba(41, 37, 36, 0.88) 100%)",
    boxShadow:
      "0 16px 34px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 247, 237, 0.06)",
    "&:hover": {
      boxShadow:
        "0 22px 44px rgba(0, 0, 0, 0.46), 0 0 24px rgba(249, 115, 22, 0.08)",
    },
  },
});

export const cardImageStyles = (theme: Theme) => ({
  width: "100%",
  aspectRatio: "16/9",
  objectFit: "cover" as const,
  display: "block",
  borderRadius: "12px",
  overflow: "hidden",
});

export const cardBodyStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
  flex: 1,
});

export const cardNameStyles = (theme: Theme) => ({
  fontSize: "0.94rem",
  fontWeight: 900,
  lineHeight: 1.25,
  color: "var(--foreground)",
  ".dark &": { color: darkTheme.text },
});

export const cardMealContextStyles = (theme: Theme) => ({
  fontSize: "0.75rem",
  fontWeight: 700,
  color: "var(--muted-foreground)",
  ".dark &": { color: darkTheme.muted },
});

export const cardTagsStyles = (theme: Theme) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.4rem",
});

export const cardTagStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  height: 22,
  px: "0.55rem",
  borderRadius: "999px",
  border: "1px solid rgba(15, 23, 42, 0.12)",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  color: "var(--muted-foreground)",
  fontSize: "0.72rem",
  fontWeight: 800,
  ".dark &": {
    borderColor: darkTheme.borderSoft,
    backgroundColor: "rgba(255, 247, 237, 0.06)",
    color: darkTheme.muted,
  },
});

export const cardFooterStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  mt: "auto",
  pt: "0.75rem",
  borderTop: "1px solid rgba(15, 23, 42, 0.1)",
  ".dark &": { borderTopColor: darkTheme.borderSoft },
});

export const notesStyles = (theme: Theme) => ({
  fontSize: "0.75rem",
  fontWeight: 650,
  color: "var(--muted-foreground)",
  fontStyle: "italic",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: 140,
  ".dark &": { color: darkTheme.muted },
});

// ─── Card action buttons ───────────────────────────────────────────────────────

export const cardActionButtonStyles = (theme: Theme) => ({
  height: 30,
  width: 30,
  padding: "0.35rem",
  borderRadius: "10px",
  transition: "background-color 150ms ease, color 150ms ease",
  color: "var(--muted-foreground)",
  "&:hover": {
    color: "#D9480F",
    backgroundColor: "rgba(255, 107, 0, 0.1)",
  },
  ".dark &": {
    color: darkTheme.muted,
    "&:hover": {
      color: darkTheme.orange,
      backgroundColor: "rgba(249, 115, 22, 0.12)",
    },
  },
});

export const cardRemoveButtonStyles = (theme: Theme) => ({
  height: 30,
  width: 30,
  padding: "0.35rem",
  borderRadius: "10px",
  transition: "background-color 150ms ease, color 150ms ease",
  color: "var(--muted-foreground)",
  "&:hover": {
    color: "#DC2626",
    backgroundColor: "rgba(239, 68, 68, 0.08)",
  },
  ".dark &": {
    color: darkTheme.muted,
    "&:hover": {
      color: darkTheme.danger,
      backgroundColor: "rgba(239, 68, 68, 0.1)",
    },
  },
});

// ─── Stars ───────────────────────────────────────────────────────────────────

export const starsStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.2rem",
});

// ─── Empty state ─────────────────────────────────────────────────────────────

export const emptyStateStyles = (theme: Theme) => ({
  border: "1px solid rgba(15, 23, 42, 0.12)",
  borderRadius: "24px",
  textAlign: "center",
  padding: { xs: "3rem 1.5rem", md: "4.5rem 2rem" },
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 247, 237, 0.24) 54%, rgba(255, 255, 255, 0.58) 100%)",
  boxShadow:
    "0 20px 54px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.86)",
  backdropFilter: "blur(24px) saturate(1.18)",
  WebkitBackdropFilter: "blur(24px) saturate(1.18)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  color: "var(--muted-foreground)",
  ".dark &": {
    borderColor: darkTheme.border,
    background:
      "linear-gradient(135deg, rgba(28, 25, 23, 0.98) 0%, rgba(41, 37, 36, 0.9) 54%, rgba(12, 10, 9, 0.98) 100%)",
    color: darkTheme.muted,
    boxShadow:
      "0 24px 64px rgba(0, 0, 0, 0.48), inset 0 1px 0 rgba(255, 247, 237, 0.08)",
  },
});

export const emptyIconStyles = (theme: Theme) => ({
  display: "grid",
  width: 56,
  height: 56,
  placeItems: "center",
  borderRadius: "20px",
  border: "1px solid rgba(15, 23, 42, 0.14)",
  color: "#D9480F",
  backgroundColor: "rgba(255, 107, 0, 0.1)",
  ".dark &": {
    borderColor: darkTheme.border,
    color: darkTheme.orange,
    backgroundColor: "rgba(249, 115, 22, 0.12)",
  },
});

export const emptyTitleStyles = (theme: Theme) => ({
  fontSize: "1.1rem",
  fontWeight: 900,
  color: "var(--foreground)",
  ".dark &": { color: darkTheme.text },
});

export const emptySubtitleStyles = (theme: Theme) => ({
  fontSize: "0.875rem",
  fontWeight: 650,
  color: "var(--muted-foreground)",
  textAlign: "center",
  maxWidth: 320,
  lineHeight: 1.6,
  ".dark &": { color: darkTheme.muted },
});

export const emptyLinkStyles = (theme: Theme) => ({
  mt: "0.5rem",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  height: 40,
  px: "1.5rem",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #F5726B 0%, #FA914C 50%, #F8B65A 100%)",
  color: "#FFFFFF",
  fontWeight: 800,
  fontSize: "0.875rem",
  textDecoration: "none",
  boxShadow: "0 12px 26px rgba(245, 114, 107, 0.24)",
  transition: "opacity 150ms ease",
  "&:hover": { opacity: 0.9 },
});

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export const skeletonCardStyles = (theme: Theme) => ({
  borderRadius: "18px",
  overflow: "hidden",
  border: "1px solid rgba(15, 23, 42, 0.1)",
  backgroundColor: "rgba(255, 255, 255, 0.58)",
  backdropFilter: "blur(16px) saturate(1.12)",
  WebkitBackdropFilter: "blur(16px) saturate(1.12)",
  boxShadow: "0 14px 30px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.72)",
  ".dark &": {
    borderColor: darkTheme.border,
    backgroundColor: darkTheme.surface,
    boxShadow: "0 16px 34px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255, 247, 237, 0.06)",
  },
});

// ─── Edit dialog — mirrors profile sectionCardStyles ──────────────────────────

export const dialogPaperStyles = (theme: Theme) => ({
  borderRadius: { xs: "20px", sm: "24px" },
  border: "1px solid rgba(15, 23, 42, 0.14)",
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 247, 237, 0.24) 54%, rgba(255, 255, 255, 0.88) 100%)",
  boxShadow:
    "0 28px 80px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 23, 42, 0.035), inset 0 1px 0 rgba(255, 255, 255, 0.92)",
  backdropFilter: "blur(28px) saturate(1.22)",
  WebkitBackdropFilter: "blur(28px) saturate(1.22)",
  color: "var(--foreground)",
  ".dark &": {
    borderColor: darkTheme.border,
    background:
      "linear-gradient(135deg, rgba(28, 25, 23, 0.98) 0%, rgba(41, 37, 36, 0.9) 54%, rgba(12, 10, 9, 0.98) 100%)",
    color: darkTheme.text,
    boxShadow:
      "0 28px 80px rgba(0, 0, 0, 0.62), inset 0 1px 0 rgba(255, 247, 237, 0.08)",
  },
});

export const dialogTitleStyles = (theme: Theme) => ({
  fontSize: "1rem",
  fontWeight: 900,
  color: "var(--foreground)",
  ".dark &": { color: darkTheme.text },
});

export const dialogBodyStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  px: 3,
  pb: 2,
});

export const dialogLabelStyles = (theme: Theme) => ({
  fontSize: "0.8rem",
  fontWeight: 800,
  mb: "0.5rem",
  color: "var(--muted-foreground)",
  ".dark &": { color: darkTheme.muted },
});

export const dialogActionsStyles = (theme: Theme) => ({
  px: 3,
  pb: 2.5,
  gap: "0.5rem",
  justifyContent: "flex-end",
});

export const dialogTextFieldStyles = (theme: Theme) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",
    backgroundColor: "rgba(255, 255, 255, 0.68)",
    color: "var(--foreground)",
    fontWeight: 650,
    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.78)",
    "& fieldset": { borderColor: "rgba(15, 23, 42, 0.16)", borderRadius: "14px" },
    "&:hover fieldset": { borderColor: "rgba(217, 72, 15, 0.3)" },
    "&.Mui-focused fieldset": { borderColor: "#D9480F", borderWidth: 1 },
  },
  "& .MuiInputLabel-root": { color: "var(--muted-foreground)", fontWeight: 700 },
  ".dark & .MuiOutlinedInput-root": {
    backgroundColor: "rgba(28, 25, 23, 0.72)",
    color: darkTheme.text,
    boxShadow: "inset 0 1px 0 rgba(255, 247, 237, 0.06)",
    "& fieldset": { borderColor: darkTheme.border, borderRadius: "14px" },
    "&:hover fieldset": { borderColor: darkTheme.orange },
    "&.Mui-focused fieldset": { borderColor: darkTheme.orange },
  },
  ".dark & .MuiInputLabel-root": { color: darkTheme.muted },
});

// ─── Buttons — mirrors profile submitButtonStyles ─────────────────────────────

export const saveBtnStyles = (theme: Theme) => ({
  height: 40,
  paddingInline: "1.5rem",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #F5726B 0%, #FA914C 50%, #F8B65A 100%)",
  color: "#FFFFFF",
  fontSize: "0.875rem",
  fontWeight: 800,
  boxShadow: "0 12px 26px rgba(245, 114, 107, 0.2)",
  "&:hover": { opacity: 0.94 },
  "&:disabled": { pointerEvents: "none", opacity: 0.5 },
});

export const cancelBtnStyles = (theme: Theme) => ({
  height: 40,
  paddingInline: "1rem",
  borderRadius: "14px",
  color: "var(--muted-foreground)",
  fontWeight: 700,
  "&:hover": { backgroundColor: "rgba(15, 23, 42, 0.06)" },
  ".dark &": {
    color: darkTheme.muted,
    "&:hover": { backgroundColor: "rgba(255, 247, 237, 0.06)" },
  },
});

// ─── Pagination ───────────────────────────────────────────────────────────────

export const paginationStyles = (theme: Theme) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  mt: "0.5rem",
});

export const paginationButtonStyles = (theme: Theme) => ({
  height: 38,
  paddingInline: "1rem",
  borderRadius: "12px",
  border: "1px solid rgba(15, 23, 42, 0.14)",
  backgroundColor: "rgba(255, 255, 255, 0.68)",
  color: "var(--muted-foreground)",
  fontWeight: 800,
  fontSize: "0.8rem",
  backdropFilter: "blur(16px) saturate(1.12)",
  WebkitBackdropFilter: "blur(16px) saturate(1.12)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.78)",
  transition: "background-color 150ms ease, color 150ms ease",
  "&:hover:not(:disabled)": {
    color: "#D9480F",
    backgroundColor: "rgba(255, 107, 0, 0.1)",
    borderColor: "rgba(217, 72, 15, 0.3)",
  },
  "&:disabled": { opacity: 0.4 },
  ".dark &": {
    borderColor: darkTheme.border,
    backgroundColor: "rgba(28, 25, 23, 0.72)",
    color: darkTheme.muted,
    boxShadow: "inset 0 1px 0 rgba(255, 247, 237, 0.06)",
    "&:hover:not(:disabled)": {
      color: darkTheme.orange,
      backgroundColor: "rgba(249, 115, 22, 0.12)",
      borderColor: "rgba(249, 115, 22, 0.28)",
    },
  },
});

export const paginationCountStyles = (theme: Theme) => ({
  fontSize: "0.8rem",
  fontWeight: 800,
  color: "var(--muted-foreground)",
  ".dark &": { color: darkTheme.muted },
});

// ─── Barrel ──────────────────────────────────────────────────────────────────

export const styles = {
  backButtonStyles,
  cancelBtnStyles,
  cardActionButtonStyles,
  cardBodyStyles,
  cardFooterStyles,
  cardImageStyles,
  cardMealContextStyles,
  cardNameStyles,
  cardRemoveButtonStyles,
  cardStyles,
  cardTagStyles,
  cardTagsStyles,
  containerStyles,
  controlHeaderInnerStyles,
  controlHeaderStyles,
  countBadgeStyles,
  dialogActionsStyles,
  dialogBodyStyles,
  dialogLabelStyles,
  dialogPaperStyles,
  dialogTextFieldStyles,
  dialogTitleStyles,
  emptyIconStyles,
  emptyLinkStyles,
  emptyStateStyles,
  emptySubtitleStyles,
  emptyTitleStyles,
  filterChipStyles,
  gridStyles,
  headerActionsStyles,
  iconButtonStyles,
  notesStyles,
  pageShellStyles,
  paginationButtonStyles,
  paginationCountStyles,
  paginationStyles,
  saveBtnStyles,
  searchFieldStyles,
  skeletonCardStyles,
  sortOrderButtonStyles,
  sortSelectStyles,
  starsStyles,
  titleGroupStyles,
  titleStyles,
  toolbarCardStyles,
} as const;
