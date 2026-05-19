/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material";

import { colors } from "@/theme/colors";
import { dimensions } from "@/theme/dimensions";
import { effects } from "@/theme/effects";
import { fontWeights } from "@/theme/resources";

const lightFoodMapPattern = `url("data:image/svg+xml,%3Csvg width='640' height='420' viewBox='0 0 640 420' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-30 322C86 284 122 198 246 224C372 251 404 124 540 142C608 151 645 112 680 72' stroke='%23EA580C' stroke-opacity='.18' stroke-width='2'/%3E%3Cpath d='M-18 362C90 334 160 258 272 282C390 307 454 210 562 220C626 226 660 188 692 158' stroke='%23EA580C' stroke-opacity='.1' stroke-width='2'/%3E%3Cpath d='M72 78H212M72 110H182M72 142H228' stroke='%23EA580C' stroke-opacity='.12' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='506' cy='112' r='42' stroke='%23EA580C' stroke-opacity='.12' stroke-width='2'/%3E%3Ccircle cx='506' cy='112' r='16' stroke='%23EA580C' stroke-opacity='.14' stroke-width='2'/%3E%3Cpath d='M438 302C462 282 492 282 516 302C540 322 572 318 594 294' stroke='%23EA580C' stroke-opacity='.14' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`;

const darkFoodChat = {
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
  orange: "#F68B2D",
  orangeStrong: "#F26608",
  glow: "rgba(249, 115, 22, 0.15)",
  error: "#EF4444",
  success: "#22C55E",
} as const;

export const fallbackStyles = (theme: Theme) => ({
  display: "flex",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  color: "var(--muted-foreground)",
});

export const appShellStyles = (theme: Theme) => ({
  display: "flex",
  width: "100%",
  height: "100dvh",
  flexDirection: "column",
  overflow: "hidden",
  color: "var(--foreground)",
  background: "#F9FAFB",
  ".dark &": {
    background: `radial-gradient(circle at 12% 6%, ${alpha(colors.base.brand[500], 0.22)} 0, transparent 30%),
        radial-gradient(circle at 92% 14%, ${alpha(colors.base.brand[600], 0.18)} 0, transparent 25%),
        linear-gradient(180deg, ${darkFoodChat.background} 0%, ${darkFoodChat.backgroundSoft} 48%, ${darkFoodChat.background} 100%)`,
  },
});

export const headerBarStyles = (theme: Theme) => ({
  position: "relative",
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.5,
  px: { xs: 1.5, sm: 2 },
  py: 1.25,
  borderBottom: "1px solid rgba(255, 255, 255, 0.72)",
  background: alpha("#FFFFFF", 0.68),
  boxShadow: "0 12px 30px rgba(15, 23, 42, 0.04)",
  backdropFilter: "blur(18px) saturate(1.14)",
  WebkitBackdropFilter: "blur(18px) saturate(1.14)",
  ".dark &": {
    borderBottomColor: darkFoodChat.borderSoft,
    background: alpha(darkFoodChat.background, 0.9),
  },
});

export const headerSideStyles = {
  display: "flex",
  alignItems: "center",
  gap: { xs: 0.75, sm: 1.25 },
  minWidth: 0,
};

export const brandButtonStyles = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  minWidth: 0,
  border: 0,
  background: "transparent",
  color: "inherit",
  cursor: "pointer",
  borderRadius: "14px",
  p: 0,
  outline: "2px solid transparent",
  outlineOffset: 4,
  "&:focus-visible": {
    boxShadow: effects.shadows.focus,
  },
};

export const brandMarkStyles = (theme: Theme) => ({
  display: { xs: "none", sm: "grid" },
  placeItems: "center",
  width: 34,
  height: 34,
  borderRadius: "12px",
  color: "#fff",
  background: colors.food.accentGradient,
  boxShadow: `0 14px 34px ${alpha(colors.base.brand[600], 0.34)}`,
});

export const brandTextStyles = {
  display: "flex",
  minWidth: 0,
  flexDirection: "column",
  alignItems: "flex-start",
};

export const brandTitleStyles = {
  fontFamily: "var(--font-display)",
  fontSize: { xs: "0.98rem", sm: "1.05rem" },
  fontWeight: fontWeights.extrabold,
  lineHeight: 1.1,
  color: "var(--foreground)",
  whiteSpace: "nowrap",
};

export const headerIconButtonStyles = (theme: Theme) => ({
  width: 38,
  height: 38,
  borderRadius: "14px",
  color: colors.base.gray[900],
  "&:hover": {
    backgroundColor: alpha(colors.base.brand[500], 0.2),
    color: colors.base.brand[600],
  },
  ".dark &": {
    color: darkFoodChat.text,
    "&:hover": {
      backgroundColor: alpha(colors.base.brand[500], 0.18),
      color: darkFoodChat.orange,
    },
  },
});

export const modelButtonStyles = (theme: Theme) => ({
  borderRadius: "999px",
  px: 1.5,
  minHeight: 34,
  color: "var(--muted-foreground)",
  backgroundColor: alpha(colors.base.brand[100], 0.9),
  "&:hover": {
    color: "var(--foreground)",
    backgroundColor: alpha(colors.base.brand[200], 0.9),
  },
  ".dark &": {
    color: darkFoodChat.muted,
    backgroundColor: alpha(darkFoodChat.surfaceRaised, 0.82),
    "&:hover": {
      color: darkFoodChat.text,
      backgroundColor: alpha(colors.base.brand[500], 0.18),
    },
  },
});

export const dropdownPanelStyles = (theme: Theme) => ({
  position: "absolute",
  zIndex: 50,
  mt: 1,
  overflow: "hidden",
  borderRadius: effects.borderRadius.lg,
  border: `1px solid ${alpha(colors.base.brand[600], 0.2)}`,
  backgroundColor: alpha("#FFFDF9", 0.98),
  color: "var(--foreground)",
  boxShadow: effects.shadows.lg,
  backdropFilter: "blur(18px)",
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    backgroundColor: alpha(darkFoodChat.surface, 0.98),
    boxShadow: `0 24px 70px ${alpha("#000", 0.56)}, 0 0 0 1px ${alpha(colors.base.brand[500], 0.08)}`,
  },
});

export const dropdownItemStyles = (theme: Theme) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1,
  border: 0,
  borderRadius: effects.borderRadius.md,
  px: 1.5,
  py: 1.1,
  backgroundColor: "transparent",
  color: "var(--foreground)",
  textAlign: "left",
  fontSize: "0.875rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: alpha(colors.base.brand[100], 0.88),
  },
  ".dark &": {
    color: darkFoodChat.text,
    "&:hover": {
      backgroundColor: alpha(colors.base.brand[500], 0.18),
    },
  },
});

export const searchOverlayStyles = {
  position: "fixed",
  inset: 0,
  zIndex: 50,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  p: { xs: 1, sm: 3 },
  backgroundColor: "rgba(9, 9, 11, 0.58)",
  backdropFilter: "blur(10px)",
  transform: "translateZ(0)",
  willChange: "opacity",
};

export const searchOverlayPanelStyles = (theme: Theme) => ({
  position: "relative",
  display: "flex",
  width: "100%",
  height: "100%",
  maxWidth: 1120,
  maxHeight: "95vh",
  flexDirection: "column",
  overflow: "hidden",
  outline: "none",
  contain: "layout paint",
  transform: "translateZ(0)",
  willChange: "transform, opacity",
  borderRadius: { xs: "22px", sm: "30px" },
  border: `1px solid ${alpha(colors.base.brand[500], 0.28)}`,
  backgroundColor: colors.food.surface,
  boxShadow: `0 30px 90px ${alpha(colors.base.brand[800], 0.18)}`,
  ".dark &": {
    borderColor: darkFoodChat.border,
    backgroundColor: darkFoodChat.background,
    boxShadow: `0 30px 90px ${alpha("#000", 0.54)}, 0 0 44px ${darkFoodChat.glow}`,
  },
});

export const mainContentStyles = {
  display: "flex",
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
};

export const desktopSidebarContainerStyles = {
  position: "relative",
  display: { xs: "none", lg: "flex" },
};

export const desktopSidebarMotionStyles = (theme: Theme) => ({
  position: "absolute",
  zIndex: 20,
  height: "100%",
  overflow: "hidden",
  borderRight: "1px solid rgba(255, 255, 255, 0.72)",
  backgroundColor: alpha("#FFFFFF", 0.64),
  boxShadow: "12px 0 32px rgba(15, 23, 42, 0.04)",
  backdropFilter: "blur(20px) saturate(1.14)",
  WebkitBackdropFilter: "blur(20px) saturate(1.14)",
  ".dark &": {
    borderRight: 0,
    backgroundColor: alpha(darkFoodChat.background, 0.78),
    boxShadow: "none",
  },
});

export const chatAreaStyles = {
  position: "relative",
  display: "flex",
  minWidth: 0,
  flex: 1,
  flexDirection: "column",
  overflow: "hidden",
};

export const emptyStateStyles = {
  display: "flex",
  flex: 1,
  minHeight: 0,
  alignItems: { xs: "flex-start", md: "center" },
  justifyContent: "center",
  overflowY: "auto",
  px: { xs: 1.25, sm: 3 },
  pt: { xs: 3, sm: 4, md: 8 },
  pb: { xs: 3, sm: 4, md: 8 },
  scrollbarGutter: "stable",
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 999,
    border: "2px solid transparent",
    backgroundClip: "padding-box",
    backgroundColor: "rgba(249, 115, 22, 0.34)",
  },
  ".dark &::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(251, 146, 60, 0.46)",
  },
};

export const emptyHeroPanelStyles = (theme: Theme) => ({
  position: "relative",
  width: "100%",
  maxWidth: 900,
  mx: "auto",
  borderRadius: { xs: "24px", md: "34px" },
  p: { xs: 2, sm: 4, md: 5 },
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.78)",
  background: alpha("#FFFFFF", 0.72),
  boxShadow:
    "0 24px 64px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.86)",
  backdropFilter: "blur(22px) saturate(1.12)",
  WebkitBackdropFilter: "blur(22px) saturate(1.12)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    backgroundImage: lightFoodMapPattern,
    backgroundPosition: "right -72px top -42px, left top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "min(92%, 760px) auto, 100% 100%",
    opacity: 0.2,
    mixBlendMode: "multiply",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
  ".dark &": {
    borderColor: darkFoodChat.border,
    background: `linear-gradient(135deg, ${alpha(darkFoodChat.surface, 0.98)} 0%, ${alpha(darkFoodChat.surfaceSoft, 0.96)} 100%)`,
    boxShadow: `0 28px 90px ${alpha("#000000", 0.52)}, 0 0 42px ${darkFoodChat.glow}`,
    "&::before": {
      opacity: 0.5,
      mixBlendMode: "screen",
      filter: "saturate(1.45)",
    },
  },
});

export const emptyEyebrowStyles = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  mb: 2,
  borderRadius: "999px",
  px: 1.5,
  py: 0.75,
  color: colors.base.brand[700],
  backgroundColor: alpha(colors.base.brand[500], 0.18),
  fontSize: "0.78rem",
  fontWeight: fontWeights.bold,
  ".dark &": {
    color: darkFoodChat.orange,
    backgroundColor: "rgba(249, 115, 22, 0.16)",
    boxShadow: `inset 0 0 0 1px ${alpha(colors.base.brand[500], 0.2)}`,
  },
};

export const emptyTitleStyles = {
  maxWidth: 680,
  fontFamily: "var(--font-display)",
  fontSize: { xs: "2rem", sm: "3.4rem", md: "4.2rem" },
  fontWeight: fontWeights.extrabold,
  lineHeight: { xs: 0.94, sm: 0.98 },
  letterSpacing: 0,
  color: "var(--foreground)",
  textWrap: "balance",
};

export const emptyDescriptionStyles = {
  mt: 2,
  maxWidth: 600,
  fontSize: { xs: "1rem", sm: "1.05rem" },
  lineHeight: { xs: 1.62, sm: 1.7 },
  color: "var(--muted-foreground)",
  ".dark &": {
    color: darkFoodChat.muted,
  },
};

export const emptySignalRowStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  mt: { xs: 2.25, sm: 2.75 },
};

export const emptySignalChipStyles = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "999px",
  border: "1px solid rgba(255, 255, 255, 0.76)",
  px: 1.25,
  py: 0.55,
  color: "var(--muted-foreground)",
  backgroundColor: alpha("#F9FAFB", 0.86),
  fontSize: "0.76rem",
  fontWeight: fontWeights.bold,
  borderColor: "#E5E7EB",
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    color: darkFoodChat.muted,
    backgroundColor: alpha(darkFoodChat.background, 0.7),
  },
};

export const promptGridStyles = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
  gap: { xs: 1.25, sm: 1.5 },
  mt: { xs: 3, sm: 4 },
};

export const promptCardStyles = (theme: Theme) => ({
  display: "flex",
  minHeight: { xs: 74, sm: 92 },
  alignItems: "center",
  gap: { xs: 1.25, sm: 1.5 },
  border: "1px solid #E5E7EB",
  borderRadius: effects.borderRadius.xl,
  p: { xs: 1.4, sm: 2 },
  backgroundColor: alpha("#FFFFFF", 0.7),
  color: "var(--foreground)",
  textAlign: "left",
  cursor: "pointer",
  outline: "2px solid transparent",
  outlineOffset: 3,
  boxShadow:
    "0 16px 38px rgba(15, 23, 42, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.78)",
  backdropFilter: "blur(16px) saturate(1.12)",
  WebkitBackdropFilter: "blur(16px) saturate(1.12)",
  transition:
    "transform 160ms ease, border-color 160ms ease, background 160ms ease",
  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: alpha(colors.base.brand[500], 0.42),
    backgroundColor: alpha("#FFFFFF", 0.82),
    boxShadow: "0 16px 36px rgba(15, 23, 42, 0.08)",
  },
  "&:focus-visible": {
    borderColor: alpha(colors.base.brand[500], 0.56),
    boxShadow: `${effects.shadows.focus}, 0 18px 44px ${alpha(colors.base.brand[700], 0.16)}`,
  },
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    background: `linear-gradient(145deg, ${alpha(darkFoodChat.surface, 0.98)} 0%, ${alpha(darkFoodChat.surfaceRaised, 0.96)} 100%)`,
    boxShadow: `0 16px 34px ${alpha("#000", 0.42)}, 0 0 24px ${alpha(colors.base.brand[500], 0.08)}`,
    "&:hover": {
      borderColor: alpha(colors.base.brand[400], 0.42),
      background: alpha(colors.base.brand[500], 0.14),
    },
  },
});

export const promptIconStyles = {
  display: "grid",
  width: { xs: 42, sm: 38 },
  height: { xs: 42, sm: 38 },
  flexShrink: 0,
  placeItems: "center",
  borderRadius: "14px",
  color: "#fff",
  background: colors.food.accentGradient,
  boxShadow: `0 12px 30px ${alpha(colors.base.brand[600], 0.32)}`,
};

export const promptCardContentStyles = {
  display: "flex",
  minWidth: 0,
  flexDirection: "column",
  gap: 0.4,
};

export const promptTextStyles = {
  fontSize: { xs: "0.98rem", sm: "0.92rem" },
  fontWeight: fontWeights.semibold,
  lineHeight: 1.35,
  textWrap: "pretty",
};

export const promptTagStyles = {
  color: "var(--muted-foreground)",
  fontSize: "0.76rem",
  fontWeight: fontWeights.bold,
  lineHeight: 1.25,
  ".dark &": {
    color: darkFoodChat.muted,
  },
};

export const messageScrollStyles = (chatStarted: boolean) => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  overflowY: "auto",
  px: { xs: 1.5, sm: 2 },
  display: chatStarted ? "block" : "flex",
  ...(chatStarted
    ? {}
    : {
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
      }),
  scrollbarGutter: "stable",
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-track": {
    my: 3,
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 999,
    border: "2px solid transparent",
    backgroundClip: "padding-box",
    backgroundColor: "rgba(249, 115, 22, 0.36)",
  },
  ".dark &::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(251, 146, 60, 0.46)",
  },
});

export const messageContentStyles = {
  display: "flex",
  width: "100%",
  maxWidth: dimensions.contentMaxWidth,
  flexDirection: "column",
  gap: 2,
  mx: "auto",
  px: { xs: 0.5, sm: 2 },
  py: { xs: 3, sm: 4 },
};

export const localHumanGroupStyles = {
  display: "flex",
  maxWidth: { xs: "92%", sm: "82%" },
  flexDirection: "column",
  alignItems: "flex-end",
  gap: 0.6,
  ml: "auto",
};

export const localHumanBubbleStyles = {
  borderRadius: "22px 22px 6px 22px",
  px: 2,
  py: 1.5,
  color: "#FFFFFF",
  background:
    "radial-gradient(circle at 10% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 30%), linear-gradient(135deg, #F5726B 0%, #FA914C 50%, #F8B65A 100%)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  boxShadow:
    "0 18px 42px rgba(245, 114, 107, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.54), inset 0 -1px 0 rgba(255, 255, 255, 0.16)",
  backdropFilter: "blur(18px) saturate(1.18)",
  WebkitBackdropFilter: "blur(18px) saturate(1.18)",
  fontSize: "0.92rem",
  lineHeight: 1.65,
  ".dark &": {
    color: "rgba(255, 255, 255, 0.95)",
    background: alpha(darkFoodChat.orangeStrong, 0.14),
    border: `1px solid ${alpha(darkFoodChat.orangeStrong, 0.34)}`,
    boxShadow: `inset 0 1px 0 ${alpha("#FFF7ED", 0.08)}`,
    backdropFilter: "blur(18px) saturate(1.18)",
    WebkitBackdropFilter: "blur(18px) saturate(1.18)",
  },
};

export const localAssistantGroupStyles = {
  display: "flex",
  maxWidth: { xs: "96%", sm: "90%" },
  gap: 1.35,
  mr: "auto",
};

export const assistantAvatarStyles = {
  display: "grid",
  width: 34,
  height: 34,
  flexShrink: 0,
  placeItems: "center",
  mt: 0.5,
  borderRadius: "14px",
  color: colors.base.brand[600],
  border: "1px solid rgba(15, 23, 42, 0.18)",
  background:
    "radial-gradient(circle at 35% 18%, rgba(255, 255, 255, 0.58) 0%, rgba(255, 255, 255, 0) 38%), linear-gradient(135deg, rgba(255, 255, 255, 0.42) 0%, rgba(255, 247, 237, 0.22) 100%)",
  boxShadow:
    "0 10px 24px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.74)",
  backdropFilter: "blur(18px) saturate(1.2)",
  WebkitBackdropFilter: "blur(18px) saturate(1.2)",
  ".dark &": {
    color: alpha("#FFF7ED", 0.92),
    borderColor: alpha("#FFF7ED", 0.26),
    background:
      "linear-gradient(135deg, rgba(255, 247, 237, 0.1) 0%, rgba(255, 247, 237, 0.04) 100%)",
    boxShadow: `0 10px 24px ${alpha("#000000", 0.22)}, inset 0 1px 0 ${alpha("#FFF7ED", 0.1)}`,
  },
};

export const localAssistantBubbleStyles = (theme: Theme) => ({
  border: "1px solid rgba(15, 23, 42, 0.2)",
  borderRadius: "22px 22px 22px 6px",
  px: 2,
  py: 1.6,
  color: "var(--foreground)",
  background:
    "radial-gradient(circle at 100% 0%, rgba(248, 182, 90, 0.15) 0%, rgba(248, 182, 90, 0) 34%), linear-gradient(135deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.12) 52%, rgba(249, 115, 22, 0.08) 100%)",
  boxShadow:
    "0 20px 50px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.055), inset 0 1px 0 rgba(255, 255, 255, 0.82)",
  backdropFilter: "blur(24px) saturate(1.18)",
  WebkitBackdropFilter: "blur(24px) saturate(1.18)",
  fontSize: "0.92rem",
  lineHeight: 1.7,
  ".dark &": {
    borderColor: alpha("#FFF7ED", 0.1),
    background: alpha(darkFoodChat.surfaceSoft, 0.44),
    boxShadow: `0 16px 38px ${alpha("#000000", 0.26)}, inset 0 1px 0 ${alpha("#FFF7ED", 0.08)}`,
    backdropFilter: "blur(20px) saturate(1.15)",
    WebkitBackdropFilter: "blur(20px) saturate(1.15)",
  },
});

export const disclaimerNoticeStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: 1.25,
  mb: 2,
  border: "1px solid rgba(15, 23, 42, 0.12)",
  borderRadius: "18px",
  px: { xs: 1.5, sm: 1.75 },
  py: { xs: 1.35, sm: 1.5 },
  color: "rgba(15, 23, 42, 0.76)",
  background:
    "linear-gradient(135deg, rgba(241, 245, 249, 0.82) 0%, rgba(248, 250, 252, 0.62) 100%)",
  boxShadow:
    "0 12px 30px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(18px) saturate(1.12)",
  WebkitBackdropFilter: "blur(18px) saturate(1.12)",
  ".dark &": {
    borderColor: alpha("#FFF7ED", 0.16),
    color: alpha("#FFF7ED", 0.74),
    background:
      "linear-gradient(135deg, rgba(41, 37, 36, 0.62) 0%, rgba(28, 25, 23, 0.48) 100%)",
    boxShadow: `0 14px 34px ${alpha("#000", 0.28)}, inset 0 1px 0 ${alpha("#FFF7ED", 0.08)}`,
  },
});

export const disclaimerIconStyles = (theme: Theme) => ({
  width: 24,
  height: 24,
  mt: 0.1,
  flexShrink: 0,
  color: "rgba(15, 23, 42, 0.78)",
  ".dark &": {
    color: alpha("#FFF7ED", 0.82),
  },
});

export const disclaimerTextStyles = {
  m: 0,
  fontSize: { xs: "0.88rem", sm: "0.92rem" },
  lineHeight: 1.58,
  fontWeight: 500,
};

export const foodResultCardStyles = (theme: Theme) => ({
  position: "relative",
  isolation: "isolate",
  display: "flex",
  gap: 1.25,
  mt: 1.5,
  overflow: "hidden",
  border: "1px solid rgba(15, 23, 42, 0.22)",
  borderRadius: effects.borderRadius.lg,
  p: 1.5,
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.18) 48%, rgba(255, 247, 237, 0.28) 100%)",
  backgroundClip: "padding-box",
  boxShadow:
    "0 22px 54px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.94), inset 0 -1px 0 rgba(255, 255, 255, 0.28)",
  backdropFilter: "blur(44px) saturate(1.48) contrast(1.05)",
  WebkitBackdropFilter: "blur(44px) saturate(1.48) contrast(1.05)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "-28px",
    zIndex: -2,
    background:
      "radial-gradient(ellipse at 18% 20%, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0) 34%), radial-gradient(ellipse at 76% 42%, rgba(148, 163, 184, 0.18) 0%, rgba(148, 163, 184, 0) 30%), radial-gradient(ellipse at 86% 86%, rgba(255, 247, 237, 0.5) 0%, rgba(255, 247, 237, 0) 36%)",
    filter: "blur(18px)",
    opacity: 0.74,
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: -1,
    borderRadius: "inherit",
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.44) 0%, rgba(255, 255, 255, 0.08) 45%, rgba(255, 255, 255, 0.22) 100%)",
    pointerEvents: "none",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
  ".dark &": {
    borderColor: "rgba(255, 247, 237, 0.28)",
    background:
      "linear-gradient(135deg, rgba(12, 10, 9, 0.58) 0%, rgba(41, 37, 36, 0.36) 54%, rgba(12, 10, 9, 0.54) 100%)",
    boxShadow:
      "0 20px 48px rgba(0, 0, 0, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
    "&::before": {
      display: "none",
    },
    "&::after": {
      background:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 46%, rgba(0, 0, 0, 0.12) 100%)",
    },
  },
});

export const foodResultIconStyles = {
  display: "grid",
  width: 36,
  height: 36,
  flexShrink: 0,
  placeItems: "center",
  borderRadius: "14px",
  color: "#fff",
  background: colors.food.accentGradient,
  boxShadow: "none",
  fontSize: "0.86rem",
  fontWeight: fontWeights.extrabold,
};

export const foodResultContentStyles = {
  display: "flex",
  minWidth: 0,
  flex: 1,
  flexDirection: "column",
};

export const foodResultHeaderStyles = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1.5,
};

export const foodResultMetaStyles = {
  display: "block",
  mb: 0.35,
  color: "var(--muted-foreground)",
  fontSize: "0.72rem",
  fontWeight: fontWeights.bold,
  ".dark &": {
    color: "#E7E5E4",
  },
};

export const foodResultTitleStyles = {
  fontWeight: fontWeights.bold,
  color: colors.base.brand[700],
  lineHeight: 1.25,
  overflowWrap: "anywhere",
  ".dark &": {
    color: darkFoodChat.orange,
  },
};

export const scorePillStyles = {
  flexShrink: 0,
  borderRadius: "999px",
  px: 1,
  py: 0.45,
  border: `1px solid ${alpha(colors.base.herb[500], 0.26)}`,
  backgroundColor: alpha(colors.base.herb[500], 0.12),
  color: colors.base.herb[700],
  fontSize: "0.72rem",
  fontWeight: fontWeights.bold,
  whiteSpace: "nowrap",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  ".dark &": {
    borderColor: alpha(colors.base.herb[300], 0.3),
    backgroundColor: alpha(colors.base.herb[500], 0.16),
    color: colors.base.herb[300],
  },
};

export const foodResultDescriptionStyles = {
  mt: 1,
  color: "var(--muted-foreground)",
  fontSize: "0.8rem",
  lineHeight: 1.6,
  overflowWrap: "anywhere",
  ".dark &": {
    color: darkFoodChat.muted,
  },
};

export const foodResultScoreTrackStyles = {
  mt: 1.25,
  height: 6,
  overflow: "hidden",
  borderRadius: "999px",
  backgroundColor:
    "color-mix(in srgb, var(--muted-foreground) 14%, transparent)",
};

export const foodResultScoreFillStyles = (score: number) => ({
  width: `${score}%`,
  height: "100%",
  borderRadius: "inherit",
  background: `linear-gradient(90deg, ${colors.base.herb[500]} 0%, ${colors.base.herb[300]} 58%, #A3E635 100%)`,
});

// export const foodLocationButtonStyles = (theme: Theme) => ({
//   mt: 1.25,
//   width: "fit-content",
//   minHeight: 34,
//   borderRadius: "999px",
//   border: `1px solid ${alpha("#2563EB", 0.28)}`,
//   px: 1.25,
//   color: "#1D4ED8",
//   backgroundColor: alpha("#2563EB", 0.1),
//   fontSize: "0.78rem",
//   fontWeight: fontWeights.bold,
//   backdropFilter: "blur(16px)",
//   WebkitBackdropFilter: "blur(16px)",
//   "&:hover": {
//     borderColor: alpha("#2563EB", 0.44),
//     backgroundColor: alpha("#2563EB", 0.16),
//   },
//   ".dark &": {
//     borderColor: alpha("#60A5FA", 0.28),
//     color: "#93C5FD",
//     backgroundColor: alpha("#2563EB", 0.16),
//     "&:hover": {
//       borderColor: alpha("#60A5FA", 0.44),
//       backgroundColor: alpha("#2563EB", 0.24),
//     },
//   },
// });

export const foodLocationButtonStyles = (theme: Theme) => ({
  mt: 1.25,
  width: "fit-content",
  minHeight: 34,
  borderRadius: "999px",
  border: `1px solid ${alpha(colors.base.brand[500], 0.42)}`,
  px: 1.25,
  color: colors.base.brand[700],
  background:
    "linear-gradient(135deg, rgba(255, 244, 232, 0.86) 0%, rgba(255, 201, 135, 0.34) 100%)",
  boxShadow:
    "0 10px 24px rgba(217, 72, 15, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.86)",
  fontSize: "0.78rem",
  fontWeight: fontWeights.bold,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  "&:hover": {
    borderColor: alpha(colors.base.brand[500], 0.58),
    background:
      "linear-gradient(135deg, rgba(255, 228, 194, 0.94) 0%, rgba(255, 178, 92, 0.42) 100%)",
    boxShadow:
      "0 12px 28px rgba(217, 72, 15, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.88)",
  },
  ".dark &": {
    borderColor: alpha("#FFFFFF", 0.15),
    color: "#E7E5E4",
    backgroundColor: alpha("#FFFFFF", 0.08),
    backgroundImage: "none",
    boxShadow: "none",
    "&:hover": {
      borderColor: alpha("#FFFFFF", 0.25),
      backgroundColor: alpha("#FFFFFF", 0.12),
      backgroundImage: "none",
      boxShadow: "none",
    },
  },
});

export const mapPanelBackdropStyles = {
  position: "fixed",
  inset: 0,
  zIndex: 70,
  display: "flex",
  justifyContent: { xs: "center", lg: "flex-end" },
  alignItems: { xs: "flex-end", lg: "stretch" },
  backgroundColor: {
    xs: "rgba(9, 9, 11, 0.42)",
    lg: "rgba(9, 9, 11, 0.18)",
  },
  backdropFilter: "blur(8px)",
};

export const mapPanelStyles = (theme: Theme) => ({
  display: "flex",
  width: { xs: "100%", lg: 460 },
  maxWidth: "100%",
  maxHeight: { xs: "88dvh", lg: "100dvh" },
  flexDirection: "column",
  gap: 1.5,
  overflow: "hidden",
  borderTopLeftRadius: { xs: "26px", lg: 0 },
  borderTopRightRadius: { xs: "26px", lg: 0 },
  borderLeft: { xs: 0, lg: `1px solid ${alpha(colors.base.brand[600], 0.22)}` },
  borderTop: `1px solid ${alpha(colors.base.brand[600], 0.2)}`,
  background: `linear-gradient(180deg, ${alpha("#FFFDF9", 0.98)} 0%, ${alpha(colors.base.brand[50], 0.96)} 100%)`,
  boxShadow: `-24px 0 70px ${alpha(colors.base.brand[900], 0.14)}`,
  p: { xs: 1.5, sm: 2, lg: 2.25 },
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    background: `linear-gradient(180deg, ${alpha(darkFoodChat.surface, 0.98)} 0%, ${alpha(darkFoodChat.background, 0.98)} 100%)`,
    boxShadow: `-24px 0 70px ${alpha("#000", 0.54)}, 0 0 42px ${darkFoodChat.glow}`,
  },
});

export const mapPanelHeaderStyles = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1.5,
};

export const mapPanelEyebrowStyles = {
  display: "inline-flex",
  mb: 0.75,
  borderRadius: "999px",
  px: 1.15,
  py: 0.45,
  color: colors.base.brand[700],
  backgroundColor: alpha(colors.base.brand[100], 0.82),
  fontSize: "0.72rem",
  fontWeight: fontWeights.bold,
  ".dark &": {
    color: darkFoodChat.orange,
    backgroundColor: alpha(colors.base.brand[500], 0.14),
  },
};

export const mapPanelTitleStyles = {
  fontFamily: "var(--font-display)",
  fontSize: { xs: "1.35rem", sm: "1.55rem" },
  fontWeight: fontWeights.extrabold,
  lineHeight: 1.08,
  color: "var(--foreground)",
};

export const mapPanelSubtitleStyles = {
  mt: 0.65,
  color: "var(--muted-foreground)",
  fontSize: "0.82rem",
  lineHeight: 1.45,
  ".dark &": {
    color: darkFoodChat.muted,
  },
};

export const mockMapCanvasStyles = (theme: Theme) => ({
  position: "relative",
  minHeight: { xs: 250, sm: 310, lg: 330 },
  overflow: "hidden",
  borderRadius: "24px",
  border: `1px solid ${alpha(colors.base.brand[600], 0.18)}`,
  background: `radial-gradient(circle at 20% 24%, ${alpha(colors.base.brand[300], 0.26)}, transparent 24%),
    radial-gradient(circle at 84% 18%, ${alpha(colors.base.herb[300], 0.2)}, transparent 22%),
    linear-gradient(135deg, #FFF7ED 0%, #FFFFFF 48%, #FFEDD5 100%)`,
  boxShadow: `inset 0 1px 0 ${alpha("#fff", 0.86)}, 0 18px 46px ${alpha(colors.base.brand[800], 0.1)}`,
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "18% -10%",
    borderTop: `18px solid ${alpha(colors.base.brand[300], 0.22)}`,
    borderBottom: `12px solid ${alpha(colors.base.herb[300], 0.16)}`,
    transform: "rotate(-18deg)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "-8%",
    right: "-12%",
    top: "58%",
    height: 18,
    borderRadius: "999px",
    backgroundColor: alpha(colors.base.brand[400], 0.18),
    transform: "rotate(14deg)",
  },
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    background: `radial-gradient(circle at 22% 18%, ${alpha(colors.base.brand[500], 0.2)}, transparent 26%),
      radial-gradient(circle at 84% 22%, ${alpha(colors.base.brand[600], 0.12)}, transparent 24%),
      linear-gradient(135deg, ${darkFoodChat.surfaceRaised} 0%, ${darkFoodChat.surface} 48%, ${darkFoodChat.background} 100%)`,
    boxShadow: `inset 0 1px 0 ${alpha("#fff", 0.05)}, 0 18px 46px ${alpha("#000", 0.36)}`,
  },
});

export const mockMapGridStyles = {
  position: "absolute",
  inset: 0,
  opacity: 0.42,
  backgroundImage:
    "linear-gradient(90deg, currentColor 1px, transparent 1px), linear-gradient(0deg, currentColor 1px, transparent 1px)",
  backgroundSize: "54px 54px",
  color: "rgba(249, 115, 22, 0.18)",
  ".dark &": {
    color: "rgba(251, 146, 60, 0.12)",
  },
};

export const userMapMarkerStyles = (theme: Theme) => ({
  position: "absolute",
  zIndex: 3,
  display: "grid",
  width: 34,
  height: 34,
  placeItems: "center",
  border: "3px solid #fff",
  borderRadius: "999px",
  color: "#fff",
  backgroundColor: colors.base.herb[500],
  boxShadow: `0 12px 28px ${alpha(colors.base.herb[700], 0.3)}`,
  transform: "translate(-50%, -50%)",
  ".dark &": {
    borderColor: darkFoodChat.surface,
  },
});

export const foodMapMarkerStyles = (isActive: boolean) => (theme: Theme) => ({
  position: "absolute",
  zIndex: isActive ? 5 : 4,
  display: "grid",
  width: isActive ? 40 : 34,
  height: isActive ? 40 : 34,
  placeItems: "center",
  border: `3px solid ${isActive ? colors.base.brand[100] : "#fff"}`,
  borderRadius: "999px 999px 999px 8px",
  color: "#fff",
  backgroundColor: isActive ? colors.base.brand[600] : colors.base.brand[500],
  boxShadow: `0 14px 34px ${alpha(colors.base.brand[700], isActive ? 0.34 : 0.2)}`,
  fontSize: "0.78rem",
  fontWeight: fontWeights.extrabold,
  cursor: "pointer",
  transform: "translate(-50%, -50%) rotate(-45deg)",
  transition: "width 160ms ease, height 160ms ease, background 160ms ease",
  "& span": {
    transform: "rotate(45deg)",
  },
  ".dark &": {
    borderColor: isActive ? darkFoodChat.orange : darkFoodChat.surface,
  },
});

export const mapSelectedPlaceStyles = (theme: Theme) => ({
  position: "absolute",
  left: 14,
  right: 14,
  bottom: 14,
  zIndex: 6,
  display: "flex",
  flexDirection: "column",
  gap: 0.2,
  borderRadius: "18px",
  border: `1px solid ${alpha(colors.base.brand[600], 0.18)}`,
  backgroundColor: alpha("#FFFDF9", 0.9),
  px: 1.4,
  py: 1.1,
  color: "var(--foreground)",
  fontSize: "0.78rem",
  boxShadow: `0 16px 36px ${alpha(colors.base.brand[800], 0.12)}`,
  backdropFilter: "blur(14px)",
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    backgroundColor: alpha(darkFoodChat.surface, 0.86),
  },
});

export const mapLocationListStyles = {
  display: "flex",
  minHeight: 0,
  flex: 1,
  flexDirection: "column",
  gap: 1,
  overflowY: "auto",
  pr: 0.4,
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 999,
    border: "2px solid transparent",
    backgroundClip: "padding-box",
    backgroundColor: "rgba(249, 115, 22, 0.34)",
  },
};

export const mapLocationRowStyles = (isActive: boolean) => (theme: Theme) => ({
  display: "flex",
  width: "100%",
  alignItems: "flex-start",
  gap: 1,
  border: `1px solid ${isActive ? alpha(colors.base.brand[500], 0.46) : alpha(colors.base.brand[600], 0.14)}`,
  borderRadius: "18px",
  backgroundColor: isActive
    ? alpha(colors.base.brand[100], 0.82)
    : alpha("#FFFDF9", 0.72),
  px: 1.15,
  py: 1.1,
  color: "var(--foreground)",
  textAlign: "left",
  cursor: "pointer",
  transition: "border-color 160ms ease, background 160ms ease",
  "&:hover": {
    borderColor: alpha(colors.base.brand[500], 0.42),
    backgroundColor: alpha(colors.base.brand[100], 0.78),
  },
  ".dark &": {
    borderColor: isActive ? darkFoodChat.borderStrong : darkFoodChat.borderSoft,
    backgroundColor: isActive
      ? alpha(colors.base.brand[500], 0.16)
      : alpha(darkFoodChat.surfaceRaised, 0.72),
    "&:hover": {
      backgroundColor: alpha(colors.base.brand[500], 0.14),
    },
  },
});

export const mapLocationPinStyles = {
  display: "grid",
  width: 34,
  height: 34,
  flexShrink: 0,
  placeItems: "center",
  borderRadius: "14px",
  color: "#fff",
  backgroundColor: colors.base.brand[600],
};

export const mapLocationNameStyles = {
  display: "block",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "0.88rem",
  fontWeight: fontWeights.extrabold,
};

export const mapLocationAddressStyles = {
  display: "block",
  mt: 0.25,
  color: "var(--muted-foreground)",
  fontSize: "0.76rem",
  lineHeight: 1.45,
  ".dark &": {
    color: darkFoodChat.muted,
  },
};

export const mapLocationMetaStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: 0.7,
  mt: 0.75,
  color: "var(--muted-foreground)",
  fontSize: "0.72rem",
  fontWeight: fontWeights.bold,
  "& span": {
    display: "inline-flex",
    alignItems: "center",
    gap: 0.3,
  },
  ".dark &": {
    color: darkFoodChat.muted,
  },
};

export const mapExternalButtonStyles = {
  width: 34,
  height: 34,
  flexShrink: 0,
  borderRadius: "12px",
};

export const scrollToBottomWrapStyles = {
  position: "absolute",
  bottom: { xs: 116, sm: 132 },
  left: "50%",
  zIndex: 10,
  transform: "translateX(-50%)",
};

export const scrollToBottomButtonStyles = (theme: Theme) => ({
  borderRadius: "999px",
  borderColor: alpha(colors.base.brand[600], 0.22),
  backgroundColor: alpha("#FFFDF9", 0.94),
  boxShadow: `0 14px 34px ${alpha(colors.base.brand[700], 0.12)}`,
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    backgroundColor: alpha(darkFoodChat.surface, 0.94),
  },
});

export const inputShellStyles = (theme: Theme) => ({
  position: "sticky",
  bottom: 0,
  zIndex: 40,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1.5,
  // pt: 2,
  pb: { xs: 2, sm: 2.8 },
  background:
    "linear-gradient(180deg, transparent 0%, rgba(249, 250, 251, 0.72) 36%, rgba(249, 250, 251, 0.94) 100%)",
  ".dark &": {
    background:
      "linear-gradient(180deg, transparent 0%, rgba(9, 9, 11, 0.9) 36%, rgba(5, 5, 5, 0.98) 100%)",
  },
});

export const inputInnerStyles = {
  width: "100%",
  maxWidth: dimensions.contentMaxWidth,
  mx: "auto",
  px: { xs: 1.5, sm: 2 },
};

export const composerStyles = (theme: Theme) => ({
  position: "relative",
  zIndex: 1,
  overflow: "visible",
  borderRadius: { xs: "22px", sm: "28px" },
  border: "1px solid rgba(255, 255, 255, 0.76)",
  background: alpha("#FFFFFF", 0.72),
  boxShadow:
    "0 22px 58px rgba(15, 23, 42, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.84)",
  backdropFilter: "blur(22px) saturate(1.12)",
  WebkitBackdropFilter: "blur(22px) saturate(1.12)",
  transition: "border-color 160ms ease, box-shadow 160ms ease",
  "&:focus-within": {
    borderColor: alpha(colors.base.brand[500], 0.58),
    boxShadow: `0 0 0 3px ${alpha(colors.base.brand[500], 0.16)}, 0 20px 54px rgba(15, 23, 42, 0.1)`,
  },
  ".dark &": {
    borderColor: darkFoodChat.border,
    background: `linear-gradient(135deg, ${alpha(darkFoodChat.surface, 0.98)} 0%, ${alpha(darkFoodChat.surfaceSoft, 0.96)} 100%)`,
    boxShadow: `0 24px 80px ${alpha("#000000", 0.5)}, 0 0 42px ${darkFoodChat.glow}`,
    "&:focus-within": {
      borderColor: darkFoodChat.borderStrong,
      boxShadow: `0 0 0 3px ${alpha(colors.base.brand[500], 0.18)}, 0 28px 90px ${alpha(colors.base.brand[600], 0.28)}`,
    },
  },
});

export const composerFormStyles = {
  display: "grid",
  gridTemplateRows: "1fr auto",
  gap: 1,
  p: { xs: 1.25, sm: 1.5 },
};

export const attachmentRowStyles = {
  display: "flex",
  flexWrap: "wrap",
  gap: 1,
  px: 0.5,
};

export const attachmentChipStyles = (theme: Theme) => ({
  display: "flex",
  maxWidth: "100%",
  alignItems: "center",
  gap: 0.75,
  borderRadius: "14px",
  border: `1px solid ${alpha(colors.base.brand[600], 0.16)}`,
  backgroundColor: alpha("#FFFDF9", 0.82),
  px: 1.2,
  py: 0.9,
  color: "var(--foreground)",
  fontSize: "0.76rem",
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    backgroundColor: alpha(darkFoodChat.surfaceRaised, 0.78),
  },
});

export const textareaStyles = {
  width: "100%",
  minHeight: 52,
  maxHeight: 190,
  resize: "none",
  overflowY: "auto",
  border: 0,
  outline: 0,
  backgroundColor: "transparent",
  px: { xs: 1.2, sm: 1.5 },
  pt: 1.4,
  pb: 0,
  color: "var(--foreground)",
  fontFamily: "inherit",
  fontSize: { xs: "0.94rem", sm: "0.98rem" },
  lineHeight: 1.55,
  "&::placeholder": {
    color: "var(--muted-foreground)",
  },
  ".dark &::placeholder": {
    color: darkFoodChat.muted,
  },
};

export const composerFooterStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.5,
  borderTop: "1px solid rgba(0, 0, 0, 0.06)",
  px: 0.75,
  pt: 1.2,
  ".dark &": {
    borderTopColor: darkFoodChat.borderSoft,
  },
});

export const composerToolsStyles = {
  display: "flex",
  minWidth: 0,
  alignItems: "center",
  gap: 0.75,
};

export const toolsPanelStyles = (theme: Theme) => ({
  position: "absolute",
  bottom: 54,
  left: 0,
  zIndex: 100,
  width: { xs: 280, sm: 400 },
  borderRadius: effects.borderRadius.xl,
  border: "1px solid rgba(255, 255, 255, 0.76)",
  backgroundColor: alpha("#FFFFFF", 0.78),
  p: 1,
  color: "var(--foreground)",
  boxShadow:
    "0 24px 64px rgba(15, 23, 42, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.82)",
  backdropFilter: "blur(20px) saturate(1.12)",
  WebkitBackdropFilter: "blur(20px) saturate(1.12)",
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    backgroundColor: darkFoodChat.surface,
    boxShadow: `0 24px 70px ${alpha("#000", 0.56)}, 0 0 0 1px ${alpha(colors.base.brand[500], 0.08)}`,
  },
});

export const quickPromptButtonStyles = (theme: Theme) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  gap: 1,
  border: 0,
  borderRadius: effects.borderRadius.md,
  backgroundColor: "transparent",
  px: 1,
  py: 1,
  color: "var(--foreground)",
  textAlign: "left",
  fontSize: "0.86rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: alpha(colors.base.brand[100], 0.88),
  },
  ".dark &": {
    color: darkFoodChat.text,
    "&:hover": {
      backgroundColor: alpha(colors.base.brand[500], 0.18),
    },
  },
});

export const sendButtonStyles = {
  width: 40,
  height: 40,
  borderRadius: "16px",
  border: 0,
  color: "#fff",
  background: colors.food.accentGradient,
  boxShadow: "none",
  "&:hover": {
    transform: "translateY(-1px)",
    opacity: 0.94,
  },
};

export const composerHintStyles = {
  mt: 1,
  textAlign: "center",
  color: "var(--muted-foreground)",
  fontSize: "0.74rem",
  ".dark &": {
    color: darkFoodChat.muted,
  },
};

export const historyShellStyles = (theme: Theme) => ({
  display: "flex",
  width: 300,
  height: "100dvh",
  flexShrink: 0,
  flexDirection: "column",
  gap: 2,
  borderRight: "1px solid rgba(255, 255, 255, 0.76)",
  background: alpha("#FFFFFF", 0.68),
  boxShadow:
    "12px 0 32px rgba(15, 23, 42, 0.04), inset -1px 0 0 rgba(255, 255, 255, 0.72)",
  backdropFilter: "blur(20px) saturate(1.12)",
  WebkitBackdropFilter: "blur(20px) saturate(1.12)",
  p: 2,
  ".dark &": {
    borderRight: 0,
    background: `linear-gradient(180deg, ${alpha(darkFoodChat.surface, 0.96)} 0%, ${alpha(darkFoodChat.background, 0.98)} 100%)`,
    boxShadow: "none",
  },
});

export const historyHeaderStyles = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
};

export const historyTitleStyles = {
  display: "flex",
  flexDirection: "column",
  gap: 0.25,
};

export const historyListStyles = {
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: 0.8,
  overflowY: "auto",
  pr: 0.5,
  "&::-webkit-scrollbar": {
    width: 8,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 999,
    border: "2px solid transparent",
    backgroundClip: "padding-box",
    backgroundColor: "rgba(113, 113, 122, 0.34)",
  },
  ".dark &::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(251, 146, 60, 0.46)",
  },
};

export const historyItemButtonStyles =
  (isActive: boolean) => (theme: Theme) => ({
    display: "flex",
    width: "100%",
    minHeight: 46,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 0.8,
    border: 0,
    borderRadius: "16px",
    px: 1.5,
    py: 1.1,
    color: isActive ? colors.base.brand[600] : "var(--foreground)",
    backgroundColor: isActive
      ? alpha(colors.base.brand[500], 0.18)
      : "transparent",
    cursor: "pointer",
    textAlign: "left",
    outline: "2px solid transparent",
    outlineOffset: 2,
    "&:hover": {
      backgroundColor: alpha(colors.base.brand[100], 0.9),
    },
    "&:hover [data-history-actions], &:focus-within [data-history-actions]": {
      opacity: 1,
      transform: "translateX(0)",
    },
    "&:focus-visible": {
      boxShadow: effects.shadows.focus,
    },
    ".dark &": {
      color: isActive ? darkFoodChat.orange : "var(--foreground)",
      backgroundColor: isActive
        ? alpha(colors.base.brand[500], 0.2)
        : "transparent",
      "&:hover": {
        backgroundColor: alpha(colors.base.brand[500], 0.18),
      },
    },
  });

export const historyItemContentStyles = {
  display: "flex",
  minWidth: 0,
  flex: 1,
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 0.25,
};

export const historyItemTitleStyles = (isActive: boolean) => ({
  width: "100%",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: "0.86rem",
  fontWeight: isActive ? fontWeights.bold : fontWeights.semibold,
  lineHeight: 1.25,
});

export const historyItemPreviewStyles = {
  width: "100%",
  overflow: "hidden",
  color: "var(--muted-foreground)",
  fontSize: "0.74rem",
  fontWeight: fontWeights.medium,
  lineHeight: 1.35,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  ".dark &": {
    color: darkFoodChat.muted,
  },
};

export const historyItemTimeStyles = {
  flexShrink: 0,
  color: "var(--muted-foreground)",
  fontSize: "0.68rem",
  fontWeight: fontWeights.bold,
  ".dark &": {
    color: darkFoodChat.muted,
  },
};

export const historyItemActionsStyles = {
  display: "flex",
  flexShrink: 0,
  alignItems: "center",
  gap: 0.45,
  opacity: { xs: 1, lg: 0 },
  transform: { xs: "none", lg: "translateX(4px)" },
  transition: "opacity 180ms ease, transform 180ms ease",
};

type HistoryActionButtonVariant = "edit" | "delete" | "confirm" | "cancel";

const getHistoryActionButtonPalette = (variant: HistoryActionButtonVariant) => {
  switch (variant) {
    case "delete":
      return {
        text: "#b91c1c",
        border: alpha("#dc2626", 0.22),
        background: alpha("#dc2626", 0.08),
        hoverBackground: alpha("#dc2626", 0.14),
        hoverBorder: alpha("#dc2626", 0.38),
        shadow: alpha("#dc2626", 0.18),
        darkText: "#fca5a5",
        darkBorder: alpha("#f87171", 0.24),
        darkBackground: alpha("#ef4444", 0.1),
        darkHoverBackground: alpha("#ef4444", 0.16),
        darkHoverBorder: alpha("#f87171", 0.42),
        darkShadow: alpha("#ef4444", 0.14),
      };
    case "confirm":
      return {
        text: "#15803d",
        border: alpha("#22c55e", 0.24),
        background: alpha("#22c55e", 0.08),
        hoverBackground: alpha("#22c55e", 0.14),
        hoverBorder: alpha("#22c55e", 0.4),
        shadow: alpha("#22c55e", 0.16),
        darkText: "#86efac",
        darkBorder: alpha("#86efac", 0.24),
        darkBackground: alpha("#22c55e", 0.1),
        darkHoverBackground: alpha("#22c55e", 0.16),
        darkHoverBorder: alpha("#86efac", 0.38),
        darkShadow: alpha("#22c55e", 0.12),
      };
    case "cancel":
      return {
        text: "#52525b",
        border: alpha("#71717a", 0.22),
        background: alpha("#71717a", 0.08),
        hoverBackground: alpha("#71717a", 0.14),
        hoverBorder: alpha("#71717a", 0.36),
        shadow: alpha("#71717a", 0.12),
        darkText: alpha("#FFF7ED", 0.72),
        darkBorder: alpha("#FFF7ED", 0.16),
        darkBackground: alpha("#FFF7ED", 0.06),
        darkHoverBackground: alpha("#FFF7ED", 0.1),
        darkHoverBorder: alpha("#FFF7ED", 0.28),
        darkShadow: alpha("#000", 0.2),
      };
    case "edit":
    default:
      return {
        text: colors.base.brand[700],
        border: alpha(colors.base.brand[600], 0.24),
        background: alpha(colors.base.brand[500], 0.08),
        hoverBackground: alpha(colors.base.brand[500], 0.15),
        hoverBorder: alpha(colors.base.brand[600], 0.4),
        shadow: alpha(colors.base.brand[600], 0.18),
        darkText: darkFoodChat.orange,
        darkBorder: alpha(colors.base.brand[400], 0.24),
        darkBackground: alpha(colors.base.brand[500], 0.1),
        darkHoverBackground: alpha(colors.base.brand[500], 0.18),
        darkHoverBorder: alpha(colors.base.brand[400], 0.42),
        darkShadow: alpha(colors.base.brand[500], 0.14),
      };
  }
};

export const historyActionButtonStyles =
  (variant: HistoryActionButtonVariant = "edit") =>
  (theme: Theme) => {
    const palette = getHistoryActionButtonPalette(variant);

    return {
      display: "grid",
      width: 30,
      height: 30,
      placeItems: "center",
      border: `1px solid ${palette.border}`,
      borderRadius: "11px",
      backgroundColor: palette.background,
      color: palette.text,
      boxShadow: `inset 0 1px 0 rgba(255, 255, 255, 0.55)`,
      backdropFilter: "blur(12px) saturate(1.08)",
      WebkitBackdropFilter: "blur(12px) saturate(1.08)",
      cursor: "pointer",
      transition:
        "transform 160ms ease, border-color 160ms ease, background-color 160ms ease, color 160ms ease, box-shadow 160ms ease",
      "&:hover": {
        transform: "translateY(-1px)",
        borderColor: palette.hoverBorder,
        backgroundColor: palette.hoverBackground,
        boxShadow: `0 10px 22px ${palette.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.68)`,
      },
      "&:focus-visible": {
        outline: "none",
        boxShadow: `${effects.shadows.focus}, 0 10px 22px ${palette.shadow}`,
      },
      ".dark &": {
        color: palette.darkText,
        borderColor: palette.darkBorder,
        backgroundColor: palette.darkBackground,
        boxShadow: `inset 0 1px 0 ${alpha("#FFF7ED", 0.08)}`,
        "&:hover": {
          borderColor: palette.darkHoverBorder,
          backgroundColor: palette.darkHoverBackground,
          boxShadow: `0 12px 24px ${palette.darkShadow}, inset 0 1px 0 ${alpha("#FFF7ED", 0.12)}`,
        },
        "&:focus-visible": {
          boxShadow: `${effects.shadows.focus}, 0 12px 24px ${palette.darkShadow}`,
        },
      },
      "&:active": {
        transform: "translateY(0)",
      },
    };
  };

export const historyEmptyStyles = (theme: Theme) => ({
  display: "flex",
  minHeight: 132,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 0.75,
  border: `1px dashed ${alpha(colors.base.brand[600], 0.24)}`,
  borderRadius: effects.borderRadius.xl,
  px: 2,
  textAlign: "center",
  color: "var(--muted-foreground)",
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    color: darkFoodChat.muted,
  },
});

export const historyRenameInputStyles = (theme: Theme) => ({
  width: "100%",
  border: `1px solid ${alpha(colors.base.brand[500], 0.36)}`,
  borderRadius: "12px",
  backgroundColor: alpha("#FFFFFF", 0.78),
  px: 1,
  py: 0.65,
  color: "var(--foreground)",
  fontFamily: "inherit",
  fontSize: "0.84rem",
  outline: 0,
  "&:focus": {
    borderColor: colors.base.brand[500],
    boxShadow: effects.shadows.focus,
  },
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    backgroundColor: alpha(darkFoodChat.surfaceRaised, 0.82),
    color: darkFoodChat.text,
  },
});

export const langchainAssistantRowStyles = {
  display: "flex",
  width: "100%",
  maxWidth: dimensions.contentMaxWidth,
  alignItems: "flex-start",
  gap: 1.5,
  mr: "auto",
};

export const langchainAssistantContentStyles = (theme: Theme) => ({
  width: "100%",
  border: "1px solid rgba(15, 23, 42, 0.2)",
  borderRadius: "22px 22px 22px 6px",
  px: 2,
  py: 1.4,
  background:
    "radial-gradient(circle at 100% 0%, rgba(248, 182, 90, 0.15) 0%, rgba(248, 182, 90, 0) 34%), linear-gradient(135deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.12) 52%, rgba(249, 115, 22, 0.08) 100%)",
  boxShadow:
    "0 20px 50px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(15, 23, 42, 0.055), inset 0 1px 0 rgba(255, 255, 255, 0.82)",
  backdropFilter: "blur(24px) saturate(1.18)",
  WebkitBackdropFilter: "blur(24px) saturate(1.18)",
  ".dark &": {
    borderColor: alpha("#FFF7ED", 0.1),
    background: alpha(darkFoodChat.surfaceSoft, 0.42),
    boxShadow: `0 14px 34px ${alpha("#000000", 0.24)}, inset 0 1px 0 ${alpha("#FFF7ED", 0.08)}`,
    backdropFilter: "blur(20px) saturate(1.15)",
    WebkitBackdropFilter: "blur(20px) saturate(1.15)",
  },
});

export const langchainHumanGroupStyles = {
  display: "flex",
  width: "fit-content",
  maxWidth: { xs: "92%", sm: 680 },
  alignItems: "center",
  gap: 1,
  ml: "auto",
};

export const langchainHumanBubbleStyles = {
  width: "fit-content",
  ml: "auto",
  borderRadius: "22px 22px 6px 22px",
  px: 2,
  py: 1.45,
  color: "#FFFFFF",
  background:
    "radial-gradient(circle at 10% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 30%), linear-gradient(135deg, #F5726B 0%, #FA914C 50%, #F8B65A 100%)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  boxShadow:
    "0 18px 42px rgba(245, 114, 107, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.54), inset 0 -1px 0 rgba(255, 255, 255, 0.16)",
  backdropFilter: "blur(18px) saturate(1.18)",
  WebkitBackdropFilter: "blur(18px) saturate(1.18)",
  whiteSpace: "pre-wrap",
  fontSize: "0.92rem",
  lineHeight: 1.65,
  ".dark &": {
    color: "rgba(255, 255, 255, 0.95)",
    background: alpha(darkFoodChat.orangeStrong, 0.14),
    border: `1px solid ${alpha(darkFoodChat.orangeStrong, 0.34)}`,
    boxShadow: `inset 0 1px 0 ${alpha("#FFF7ED", 0.08)}`,
    backdropFilter: "blur(18px) saturate(1.18)",
    WebkitBackdropFilter: "blur(18px) saturate(1.18)",
  },
};

export const messageActionsStyles = {
  display: "flex",
  alignItems: "center",
  gap: 0.25,
  opacity: 0,
  transition: "opacity 160ms ease",
  ".group:hover &, .group:focus-within &": {
    opacity: 1,
  },
};

export const styles = {
  fallbackStyles,
  appShellStyles,
  headerBarStyles,
  headerSideStyles,
  brandButtonStyles,
  brandMarkStyles,
  brandTextStyles,
  brandTitleStyles,
  headerIconButtonStyles,
  modelButtonStyles,
  dropdownPanelStyles,
  dropdownItemStyles,
  searchOverlayStyles,
  searchOverlayPanelStyles,
  mainContentStyles,
  desktopSidebarContainerStyles,
  desktopSidebarMotionStyles,
  chatAreaStyles,
  emptyStateStyles,
  emptyHeroPanelStyles,
  emptyEyebrowStyles,
  emptyTitleStyles,
  emptyDescriptionStyles,
  emptySignalRowStyles,
  emptySignalChipStyles,
  promptGridStyles,
  promptCardStyles,
  promptIconStyles,
  promptCardContentStyles,
  promptTextStyles,
  promptTagStyles,
  messageScrollStyles,
  messageContentStyles,
  localHumanGroupStyles,
  localHumanBubbleStyles,
  localAssistantGroupStyles,
  assistantAvatarStyles,
  localAssistantBubbleStyles,
  disclaimerNoticeStyles,
  disclaimerIconStyles,
  disclaimerTextStyles,
  foodResultCardStyles,
  foodResultIconStyles,
  foodResultContentStyles,
  foodResultHeaderStyles,
  foodResultMetaStyles,
  foodResultTitleStyles,
  scorePillStyles,
  foodResultDescriptionStyles,
  foodResultScoreTrackStyles,
  foodResultScoreFillStyles,
  foodLocationButtonStyles,
  mapPanelBackdropStyles,
  mapPanelStyles,
  mapPanelHeaderStyles,
  mapPanelEyebrowStyles,
  mapPanelTitleStyles,
  mapPanelSubtitleStyles,
  mockMapCanvasStyles,
  mockMapGridStyles,
  userMapMarkerStyles,
  foodMapMarkerStyles,
  mapSelectedPlaceStyles,
  mapLocationListStyles,
  mapLocationRowStyles,
  mapLocationPinStyles,
  mapLocationNameStyles,
  mapLocationAddressStyles,
  mapLocationMetaStyles,
  mapExternalButtonStyles,
  scrollToBottomWrapStyles,
  scrollToBottomButtonStyles,
  inputShellStyles,
  inputInnerStyles,
  composerStyles,
  composerFormStyles,
  attachmentRowStyles,
  attachmentChipStyles,
  textareaStyles,
  composerFooterStyles,
  composerToolsStyles,
  toolsPanelStyles,
  quickPromptButtonStyles,
  sendButtonStyles,
  composerHintStyles,
  historyShellStyles,
  historyHeaderStyles,
  historyTitleStyles,
  historyListStyles,
  historyItemButtonStyles,
  historyItemContentStyles,
  historyItemTitleStyles,
  historyItemPreviewStyles,
  historyItemTimeStyles,
  historyItemActionsStyles,
  historyActionButtonStyles,
  historyEmptyStyles,
  historyRenameInputStyles,
  langchainAssistantRowStyles,
  langchainAssistantContentStyles,
  langchainHumanGroupStyles,
  langchainHumanBubbleStyles,
  messageActionsStyles,
} as const;
