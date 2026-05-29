/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { Theme } from "@mui/material/styles";

const light = {
  cardBg: "#FFFFFF",
  cardBorder: "rgba(0,0,0,0.055)",
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
} as const;

export const drawerPaperStyles = (theme: Theme) => ({
  width: { xs: "100vw", sm: 420 },
  backgroundColor: light.cardBg,
  color: light.text,
  borderLeft: `1px solid ${light.cardBorder}`,
  ".dark &": {
    backgroundColor: dark.cardBg,
    color: dark.text,
    borderLeftColor: dark.cardBorder,
  },
});

export const drawerContentStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: 2.5,
  p: 3,
  height: "100%",
  overflowY: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
});

export const drawerHeaderStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1,
});

export const drawerEyebrowStyles = (theme: Theme) => ({
  color: light.textMuted,
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  ".dark &": { color: dark.textMuted },
});

export const drawerTitleStyles = (theme: Theme) => ({
  mt: 0.25,
  color: light.text,
  fontSize: 20,
  fontWeight: 950,
  lineHeight: 1.15,
  wordBreak: "break-all",
  ".dark &": { color: dark.text },
});

export const closeButtonStyles = (theme: Theme) => ({
  minWidth: "unset",
  width: 32,
  height: 32,
  p: 0,
  borderRadius: 2,
  flexShrink: 0,
  color: light.textMuted,
  border: `1px solid transparent`,
  "&:hover": {
    color: light.text,
    borderColor: light.cardBorder,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  ".dark &": {
    color: dark.textMuted,
    "&:hover": {
      color: dark.text,
      borderColor: dark.cardBorder,
      backgroundColor: "rgba(255,247,237,0.05)",
    },
  },
});

export const avatarLargeStyles = (isAdmin: boolean) => (theme: Theme) => ({
  width: 72,
  height: 72,
  borderRadius: "50%",
  display: "grid",
  placeItems: "center",
  fontSize: 28,
  fontWeight: 950,
  color: "#FFFFFF",
  flexShrink: 0,
  mx: "auto",
  background: isAdmin
    ? "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)"
    : "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
  boxShadow: isAdmin
    ? "0 6px 20px rgba(124,58,237,0.3)"
    : "0 6px 20px rgba(234,88,12,0.28)",
});

export const profileCardStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
  borderRadius: 4,
  border: `1px solid ${light.sectionBorder}`,
  backgroundColor: light.sectionBg,
  p: 2.5,
  ".dark &": {
    borderColor: dark.sectionBorder,
    backgroundColor: dark.sectionBg,
  },
});

export const profileEmailStyles = (theme: Theme) => ({
  color: light.textSub,
  fontSize: 13,
  fontWeight: 700,
  textAlign: "center",
  wordBreak: "break-all",
  ".dark &": { color: dark.textSub },
});

export const badgeRowStyles = (theme: Theme) => ({
  display: "flex",
  gap: 0.75,
  flexWrap: "wrap",
  justifyContent: "center",
});

export const metaGridStyles = (theme: Theme) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 1,
});

export const metaCardStyles = (theme: Theme) => ({
  borderRadius: 3,
  border: `1px solid ${light.sectionBorder}`,
  backgroundColor: "rgba(0,0,0,0.018)",
  p: 1.25,
  ".dark &": {
    borderColor: dark.sectionBorder,
    backgroundColor: "rgba(255,247,237,0.03)",
  },
});

export const metaLabelStyles = (theme: Theme) => ({
  color: light.textMuted,
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  ".dark &": { color: dark.textMuted },
});

export const metaValueStyles = (theme: Theme) => ({
  mt: 0.5,
  color: light.text,
  fontSize: 13,
  fontWeight: 850,
  lineHeight: 1.3,
  ".dark &": { color: dark.text },
});

export const sectionLabelStyles = (theme: Theme) => ({
  color: light.textMuted,
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  mb: 1,
  ".dark &": { color: dark.textMuted },
});

export const actionStackStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: 1,
});

export const actionButtonStyles = (theme: Theme) => ({
  justifyContent: "flex-start",
  gap: 1,
  width: "100%",
  height: 40,
  px: 1.5,
  borderRadius: 3,
  fontSize: 13,
  fontWeight: 850,
  border: `1px solid ${light.cardBorder}`,
  color: light.text,
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "rgba(249,115,22,0.07)",
    borderColor: "rgba(249,115,22,0.3)",
    color: "#C2410C",
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    color: dark.text,
    "&:hover": {
      backgroundColor: "rgba(249,115,22,0.1)",
      borderColor: "rgba(249,115,22,0.3)",
      color: "#FDBA74",
    },
  },
});

export const dangerButtonStyles = (theme: Theme) => ({
  ...actionButtonStyles(theme),
  "&:hover": {
    backgroundColor: "rgba(239,68,68,0.07)",
    borderColor: "rgba(239,68,68,0.28)",
    color: "#DC2626",
  },
  ".dark &": {
    borderColor: dark.cardBorder,
    color: dark.text,
    "&:hover": {
      backgroundColor: "rgba(239,68,68,0.1)",
      borderColor: "rgba(239,68,68,0.3)",
      color: "#FCA5A5",
    },
  },
});

export const dividerStyles = (theme: Theme) => ({
  borderColor: light.sectionBorder,
  ".dark &": { borderColor: dark.sectionBorder },
});

export const styles = {
  actionButtonStyles,
  actionStackStyles,
  avatarLargeStyles,
  badgeRowStyles,
  closeButtonStyles,
  dangerButtonStyles,
  dividerStyles,
  drawerContentStyles,
  drawerEyebrowStyles,
  drawerHeaderStyles,
  drawerPaperStyles,
  drawerTitleStyles,
  metaCardStyles,
  metaGridStyles,
  metaLabelStyles,
  metaValueStyles,
  profileCardStyles,
  profileEmailStyles,
  sectionLabelStyles,
} as const;
