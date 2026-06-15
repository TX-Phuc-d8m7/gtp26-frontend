/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

// ─── Design tokens ──────────────────────────────────────────────────────────

const light = {
  sidebarBg: "#FFFFFF",
  sidebarBorder: "#E5E7EB",
  sidebarShadow: "0 12px 28px rgba(15, 23, 42, 0.06)",

  navActiveBg: "#FFF7ED",
  navActiveBorder: "#FED7AA",
  navActiveShadow: "0 8px 18px rgba(234, 88, 12, 0.1)",

  text: "#1F2937",
  textSub: "#4B5563",
  textMuted: "#6B7280",
  navText: "#4B5563",
  accent: "#EA580C",
} as const;

const dark = {
  sidebarBg: "#151110",
  sidebarBorder: "rgba(255, 247, 237, 0.12)",
  sidebarShadow: "0 18px 42px rgba(0, 0, 0, 0.48)",

  navActiveBg: "#1C1917",
  navActiveBorder: "rgba(255, 154, 31, 0.28)",
  navActiveShadow: "0 12px 30px rgba(0, 0, 0, 0.38)",

  text: "#FFF7ED",
  textSub: "rgba(255, 247, 237, 0.62)",
  textMuted: "rgba(255, 247, 237, 0.42)",
  navText: "rgba(255, 247, 237, 0.62)",
} as const;

// ─── Shell layout ─────────────────────────────────────────────────────────────

export const shellStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: {
    xs: "1fr",
    lg: "260px minmax(0, 1fr)",
  },
  gap: {
    xs: 1.5,
    lg: 2.5,
  },
  width: "100%",
  maxWidth: 1520,
  mx: "auto",
  px: {
    xs: 1,
    sm: 1.5,
    lg: 2.5,
  },
  py: {
    xs: 1,
    md: 2.5,
  },
});

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export const sidebarStyles = (theme: Theme) => ({
  position: {
    xs: "relative",
    lg: "sticky",
  },
  top: {
    lg: 20,
  },
  alignSelf: "start",
  borderRadius: 5,
  border: `1px solid ${light.sidebarBorder}`,
  backgroundColor: light.sidebarBg,
  boxShadow: light.sidebarShadow,
  p: 1.5,
  ".dark &": {
    borderColor: dark.sidebarBorder,
    backgroundColor: dark.sidebarBg,
    boxShadow: dark.sidebarShadow,
  },
});

// ─── Brand ────────────────────────────────────────────────────────────────────

export const brandStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  px: 1,
  py: 1,
});

export const brandMarkStyles = (theme: Theme) => ({
  display: "grid",
  width: 40,
  height: 40,
  flexShrink: 0,
  placeItems: "center",
  borderRadius: 3,
  color: "#FFFFFF",
  background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
  boxShadow: "0 8px 20px rgba(234, 88, 12, 0.2)",
});

export const brandTitleStyles = (theme: Theme) => ({
  color: light.text,
  fontSize: 16,
  fontWeight: 950,
  lineHeight: 1.05,
  ".dark &": {
    color: dark.text,
  },
});

export const brandSubtitleStyles = (theme: Theme) => ({
  mt: 0.2,
  color: light.textSub,
  fontSize: 12,
  fontWeight: 800,
  ".dark &": {
    color: dark.textSub,
  },
});

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navStyles = (theme: Theme) => ({
  display: "grid",
  gap: 0.4,
  mt: 2,
});

/**
 * Active = white card that "lifts" off the warm sidebar bg
 * Inactive = transparent, muted text
 */
export const navItemStyles = (isActive: boolean) => (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  width: "100%",
  borderRadius: 3,
  px: 1.25,
  py: 0.9,
  color: isActive ? light.text : light.navText,
  textDecoration: "none",
  backgroundColor: isActive ? light.navActiveBg : "transparent",
  border: "1px solid",
  borderColor: isActive ? light.navActiveBorder : "transparent",
  boxShadow: isActive ? light.navActiveShadow : "none",
  fontSize: 14,
  fontWeight: isActive ? 900 : 750,
  transition: "background-color 150ms ease, box-shadow 150ms ease, color 150ms ease",
  "&:hover": {
    backgroundColor: isActive ? light.navActiveBg : "#F9FAFB",
    color: isActive ? light.text : "#44403C",
  },
  ".dark &": {
    color: isActive ? dark.text : dark.navText,
    backgroundColor: isActive ? dark.navActiveBg : "transparent",
    borderColor: isActive ? dark.navActiveBorder : "transparent",
    boxShadow: isActive ? dark.navActiveShadow : "none",
    "&:hover": {
      backgroundColor: isActive ? dark.navActiveBg : "rgba(255, 247, 237, 0.05)",
      color: isActive ? dark.text : "rgba(255, 247, 237, 0.82)",
    },
  },
});

export const navSectionLabelStyles = (theme: Theme) => ({
  px: 1.25,
  pt: 1.5,
  pb: 0.4,
  color: light.textMuted,
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  ".dark &": { color: dark.textMuted },
});

export const sidebarDividerStyles = () => ({
  mx: 1,
  my: 1.5,
  height: "1px",
  backgroundColor: "rgba(0,0,0,0.07)",
  ".dark &": { backgroundColor: "rgba(255,247,237,0.07)" },
});

export const ctaButtonStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 0.75,
  width: "100%",
  px: 1.5,
  py: 1.1,
  borderRadius: 3,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 900,
  color: "#FFFFFF",
  background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
  boxShadow: "0 10px 24px rgba(234, 88, 12, 0.18)",
  transition: "box-shadow 150ms ease, transform 150ms ease",
  "&:hover": {
    boxShadow: "0 14px 30px rgba(234, 88, 12, 0.26)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(0)",
  },
});

// ─── Main area ────────────────────────────────────────────────────────────────

export const mainStyles = (theme: Theme) => ({
  minWidth: 0,
  display: "grid",
  gap: 2,
  alignContent: "start",
});

// ─── Top strip: title (left) + actions+user (right) — NO card, floats on bg ──

export const topStripStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: {
    xs: "flex-start",
    md: "center",
  },
  justifyContent: "space-between",
  flexDirection: {
    xs: "column",
    md: "row",
  },
  gap: 1.5,
  // No background, no border, no shadow — floats directly on the page bg
});

export const topRightActionsStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  flexShrink: 0,
});

// ─── User menu (within top strip) ────────────────────────────────────────────

export const userMenuWrapperStyles = () => ({
  position: "relative",
});

export const userMenuButtonStyles = (isOpen: boolean) => (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: 0.75,
  height: 40,
  px: 1.25,
  borderRadius: 3,
  border: "1px solid",
  borderColor: isOpen ? "#FDBA74" : light.sidebarBorder,
  backgroundColor: isOpen ? "#FFF7ED" : "#FFFFFF",
  color: isOpen ? "#EA580C" : light.text,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 800,
  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  transition: "background-color 150ms ease, border-color 150ms ease",
  "&:hover": {
    backgroundColor: "#FFF7ED",
    borderColor: "#FDBA74",
    color: "#EA580C",
  },
  ".dark &": {
    borderColor: isOpen ? "rgba(255, 154, 31, 0.36)" : dark.sidebarBorder,
    backgroundColor: isOpen ? "rgba(255, 154, 31, 0.12)" : dark.navActiveBg,
    color: isOpen ? "#FF9A1F" : dark.text,
    boxShadow: "0 1px 6px rgba(0,0,0,0.3)",
    "&:hover": {
      backgroundColor: "rgba(249, 115, 22, 0.12)",
      borderColor: "rgba(255, 154, 31, 0.36)",
      color: "#FF9A1F",
    },
  },
});

export const adminAvatarStyles = (theme: Theme) => ({
  display: "grid",
  placeItems: "center",
  width: 24,
  height: 24,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
  color: "#FFFFFF",
  fontSize: 11,
  fontWeight: 900,
  flexShrink: 0,
  lineHeight: 1,
});

export const userDropdownStyles = (theme: Theme) => ({
  position: "absolute",
  top: "calc(100% + 8px)",
  right: 0,
  zIndex: 50,
  minWidth: 200,
  borderRadius: 3,
  border: `1px solid ${light.sidebarBorder}`,
  backgroundColor: "#FFFFFF",
  boxShadow: "0 18px 36px rgba(15, 23, 42, 0.1)",
  overflow: "hidden",
  ".dark &": {
    borderColor: dark.sidebarBorder,
    backgroundColor: dark.navActiveBg,
    boxShadow: "0 12px 36px rgba(0,0,0,0.5)",
  },
});

export const userDropdownItemStyles =
  (isDanger = false) =>
  (theme: Theme) => ({
    display: "flex",
    alignItems: "center",
    gap: 1,
    width: "100%",
    px: 1.5,
    py: 1.1,
    fontSize: 13,
    fontWeight: 800,
    color: isDanger ? "#DC2626" : light.navText,
    cursor: "pointer",
    textDecoration: "none",
    background: "transparent",
    border: "none",
    textAlign: "left",
    transition: "background-color 130ms ease, color 130ms ease",
    "&:hover": {
      backgroundColor: isDanger ? "rgba(220, 38, 38, 0.07)" : "rgba(0,0,0,0.04)",
      color: isDanger ? "#B91C1C" : light.text,
    },
    ".dark &": {
      color: isDanger ? "#FCA5A5" : dark.navText,
      "&:hover": {
        backgroundColor: isDanger
          ? "rgba(220, 38, 38, 0.12)"
          : "rgba(255, 247, 237, 0.06)",
        color: isDanger ? "#F87171" : dark.text,
      },
    },
  });

export const userDropdownDividerStyles = () => ({
  height: "1px",
  mx: 1.5,
  backgroundColor: "rgba(0,0,0,0.07)",
  ".dark &": {
    backgroundColor: "rgba(255,247,237,0.08)",
  },
});

// ─── Title + subtitle (now float on page bg — no card) ───────────────────────

export const eyebrowStyles = (theme: Theme) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 0.5,
  width: "fit-content",
  borderRadius: 999,
  px: 1,
  py: 0.35,
  color: "#EA580C",
  backgroundColor: "#FFF7ED",
  fontSize: 12,
  fontWeight: 900,
  ".dark &": {
    color: "#FF9A1F",
    backgroundColor: "rgba(255, 154, 31, 0.12)",
  },
});

export const titleStyles = (theme: Theme) => ({
  mt: 0.75,
  color: light.text,
  fontSize: {
    xs: 28,
    md: 38,       // Larger — floats directly on peach bg like HReazec
  },
  lineHeight: 1.0,
  fontWeight: 950,
  letterSpacing: "-0.01em",
  ".dark &": {
    color: dark.text,
  },
});

export const subtitleStyles = (theme: Theme) => ({
  mt: 0.6,
  maxWidth: 680,
  color: light.textSub,
  fontSize: 13,
  lineHeight: 1.6,
  fontWeight: 700,
  ".dark &": {
    color: dark.textSub,
  },
});

// ─── Dark glass panel (right-side widget, contrasts with light page bg) ───────

export const darkGlassPanelStyles = (theme: Theme) => ({
  borderRadius: 4,
  background: "linear-gradient(145deg, #1C1917 0%, #0C0A09 100%)",
  color: "#FFF7ED",
  boxShadow: "0 16px 34px rgba(15, 23, 42, 0.18)",
  p: {
    xs: 1.5,
    md: 2,
  },
  ".dark &": {
    background: "linear-gradient(145deg, #1C1917 0%, #0C0A09 100%)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.42)",
  },
});

export const darkGlassTitleStyles = (theme: Theme) => ({
  color: "#FFF7ED",
  fontSize: 18,
  fontWeight: 900,
  lineHeight: 1.2,
});

export const darkGlassSubtitleStyles = (theme: Theme) => ({
  mt: 0.4,
  color: "rgba(255,247,237,0.62)",
  fontSize: 13,
  fontWeight: 700,
});

// ─── Barrel ───────────────────────────────────────────────────────────────────

export const styles = {
  adminAvatarStyles,
  brandMarkStyles,
  ctaButtonStyles,
  brandStyles,
  brandSubtitleStyles,
  brandTitleStyles,
  darkGlassPanelStyles,
  darkGlassSubtitleStyles,
  darkGlassTitleStyles,
  eyebrowStyles,
  mainStyles,
  navItemStyles,
  navSectionLabelStyles,
  navStyles,
  shellStyles,
  sidebarDividerStyles,
  sidebarStyles,
  subtitleStyles,
  titleStyles,
  topRightActionsStyles,
  topStripStyles,
  userDropdownDividerStyles,
  userDropdownItemStyles,
  userDropdownStyles,
  userMenuButtonStyles,
  userMenuWrapperStyles,
} as const;
