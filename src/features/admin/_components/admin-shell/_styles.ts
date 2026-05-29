/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

// ─── Design tokens ──────────────────────────────────────────────────────────

const light = {
  // Sidebar gets a very slightly warm tint so the white active card pops
  sidebarBg: "#F9F7F5",
  sidebarBorder: "rgba(0,0,0,0.055)",
  sidebarShadow: "0 2px 12px rgba(0,0,0,0.07)",

  // Active nav item is pure white on the warm sidebar bg
  navActiveBg: "#FFFFFF",
  navActiveBorder: "rgba(0,0,0,0.07)",
  navActiveShadow: "0 1px 8px rgba(0,0,0,0.09)",

  text: "#1C1917",
  textSub: "#78716C",
  textMuted: "#A8A29E",
  navText: "#78716C",
  accent: "#F97316",
} as const;

const dark = {
  sidebarBg: "#1E1B18",
  sidebarBorder: "rgba(255,247,237,0.07)",
  sidebarShadow: "0 4px 24px rgba(0,0,0,0.4)",

  // Active nav card is a step brighter than the sidebar
  navActiveBg: "#2A2724",
  navActiveBorder: "rgba(255,247,237,0.1)",
  navActiveShadow: "0 1px 6px rgba(0,0,0,0.35)",

  text: "#F5EFE8",
  textSub: "rgba(245,239,232,0.55)",
  textMuted: "rgba(245,239,232,0.35)",
  navText: "rgba(245,239,232,0.55)",
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
  background: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
  boxShadow: "0 6px 16px rgba(234, 88, 12, 0.26)",
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
    backgroundColor: isActive ? light.navActiveBg : "rgba(0,0,0,0.04)",
    color: isActive ? light.text : "#44403C",
  },
  ".dark &": {
    color: isActive ? dark.text : dark.navText,
    backgroundColor: isActive ? dark.navActiveBg : "transparent",
    borderColor: isActive ? dark.navActiveBorder : "transparent",
    boxShadow: isActive ? dark.navActiveShadow : "none",
    "&:hover": {
      backgroundColor: isActive ? dark.navActiveBg : "rgba(255,247,237,0.04)",
      color: isActive ? dark.text : "rgba(245,239,232,0.8)",
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
  background: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
  boxShadow: "0 4px 14px rgba(234, 88, 12, 0.25)",
  transition: "box-shadow 150ms ease, transform 150ms ease",
  "&:hover": {
    boxShadow: "0 8px 22px rgba(234, 88, 12, 0.36)",
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
  borderColor: isOpen ? "rgba(249, 115, 22, 0.4)" : "rgba(0,0,0,0.09)",
  backgroundColor: isOpen ? "rgba(249, 115, 22, 0.07)" : "#FFFFFF",
  color: isOpen ? "#C2410C" : light.text,
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 800,
  boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  transition: "background-color 150ms ease, border-color 150ms ease",
  "&:hover": {
    backgroundColor: "rgba(249, 115, 22, 0.07)",
    borderColor: "rgba(249, 115, 22, 0.35)",
    color: "#C2410C",
  },
  ".dark &": {
    borderColor: isOpen ? "rgba(249, 115, 22, 0.4)" : dark.sidebarBorder,
    backgroundColor: isOpen ? "rgba(249, 115, 22, 0.12)" : dark.navActiveBg,
    color: isOpen ? "#FDBA74" : dark.text,
    boxShadow: "0 1px 6px rgba(0,0,0,0.3)",
    "&:hover": {
      backgroundColor: "rgba(249, 115, 22, 0.12)",
      borderColor: "rgba(249, 115, 22, 0.4)",
      color: "#FDBA74",
    },
  },
});

export const adminAvatarStyles = (theme: Theme) => ({
  display: "grid",
  placeItems: "center",
  width: 24,
  height: 24,
  borderRadius: "50%",
  background: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
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
  border: "1px solid rgba(0,0,0,0.07)",
  backgroundColor: "#FFFFFF",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  overflow: "hidden",
  ".dark &": {
    borderColor: dark.sidebarBorder,
    backgroundColor: dark.sidebarBg,
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
  color: "#C2410C",
  backgroundColor: "rgba(249, 115, 22, 0.1)",
  fontSize: 12,
  fontWeight: 900,
  ".dark &": {
    color: "#FDBA74",
    backgroundColor: "rgba(249, 115, 22, 0.14)",
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
  background: "linear-gradient(145deg, #2D2420 0%, #1A1210 100%)",
  color: "#F5EFE8",
  boxShadow: "0 8px 28px rgba(0,0,0,0.22)",
  p: {
    xs: 1.5,
    md: 2,
  },
  ".dark &": {
    background: "linear-gradient(145deg, #252220 0%, #141210 100%)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.42)",
  },
});

export const darkGlassTitleStyles = (theme: Theme) => ({
  color: "#F5EFE8",
  fontSize: 18,
  fontWeight: 900,
  lineHeight: 1.2,
});

export const darkGlassSubtitleStyles = (theme: Theme) => ({
  mt: 0.4,
  color: "rgba(245,239,232,0.6)",
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
