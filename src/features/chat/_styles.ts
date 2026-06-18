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
import chatbotBackground from "../../app/gtp26-chatbot-background.png";
import chatbotBackgroundDark from "../../app/gtp26-chatbot-background-dark.png";

const chatbotBackgroundImage = `url('${chatbotBackground.src}')`;
const chatbotBackgroundDarkImage = `url('${chatbotBackgroundDark.src}')`;

const lightFoodMapPattern = `url("data:image/svg+xml,%3Csvg width='640' height='420' viewBox='0 0 640 420' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-30 322C86 284 122 198 246 224C372 251 404 124 540 142C608 151 645 112 680 72' stroke='%23EA580C' stroke-opacity='.18' stroke-width='2'/%3E%3Cpath d='M-18 362C90 334 160 258 272 282C390 307 454 210 562 220C626 226 660 188 692 158' stroke='%23EA580C' stroke-opacity='.1' stroke-width='2'/%3E%3Cpath d='M72 78H212M72 110H182M72 142H228' stroke='%23EA580C' stroke-opacity='.12' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='506' cy='112' r='42' stroke='%23EA580C' stroke-opacity='.12' stroke-width='2'/%3E%3Ccircle cx='506' cy='112' r='16' stroke='%23EA580C' stroke-opacity='.14' stroke-width='2'/%3E%3Cpath d='M438 302C462 282 492 282 516 302C540 322 572 318 594 294' stroke='%23EA580C' stroke-opacity='.14' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`;

const darkFoodChat = {
  background: "#0C0A09",
  backgroundSoft: "#151110",
  surface: "#1C1917",
  surfaceSoft: "#292524",
  surfaceRaised: "#44403C",
  border: "rgba(255, 247, 237, 0.12)",
  borderSoft: "rgba(255, 247, 237, 0.06)",
  borderStrong: "#FF9A1F",
  text: "#FFF7ED",
  muted: "rgba(255, 247, 237, 0.6)",
  orange: "#FF9A1F",
  orangeStrong: "#FF7A00",
  glow: "rgba(249, 115, 22, 0.15)",
  error: "#EF4444",
  success: "#22C55E",
} as const;

// Crisp light palette for chat. Keep glass treatment in dark mode only.
const lightWarm = {
  background: "#F9FAFB",
  backgroundGradient:
    "linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 48%, #F8FAFC 100%)",
  surface: "#FFFFFF",
  surfaceSoft: "#FAFAFA",
  border: "#E5E7EB",
  borderStrong: "#D1D5DB",
  borderGlass: "#E5E7EB",
  text: "#1F2937",
  muted: "#4B5563",
  shadowSm: "0 1px 2px rgba(15, 23, 42, 0.04)",
  shadowMd: "0 8px 20px rgba(15, 23, 42, 0.06)",
  shadowLg: "0 14px 32px rgba(15, 23, 42, 0.08)",
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
  background: `radial-gradient(circle at 12% 6%, ${alpha(colors.base.brand[400], 0.16)} 0, transparent 28%),
      radial-gradient(circle at 92% 12%, ${alpha(colors.base.brand[500], 0.12)} 0, transparent 24%),
      radial-gradient(circle at 16% 92%, ${alpha(colors.base.brand[300], 0.1)} 0, transparent 24%),
      linear-gradient(180deg, rgba(249, 250, 251, 0.34) 0%, rgba(255, 255, 255, 0.22) 48%, rgba(248, 250, 252, 0.34) 100%),
      ${chatbotBackgroundImage}`,
  backgroundPosition: "left top, left top, left top, left top, left top",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%, auto",
  ".dark &": {
    background: `radial-gradient(circle at 12% 6%, ${alpha(colors.base.brand[500], 0.22)} 0, transparent 30%),
        radial-gradient(circle at 92% 14%, ${alpha(colors.base.brand[600], 0.18)} 0, transparent 25%),
        linear-gradient(180deg, ${alpha(darkFoodChat.background, 0.9)} 0%, ${alpha(darkFoodChat.backgroundSoft, 0.82)} 48%, ${alpha(darkFoodChat.background, 0.92)} 100%),
        ${chatbotBackgroundDarkImage}`,
    backgroundPosition: "left top, left top, left top, left top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%, 100% 100%, 100% 100%, auto",
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
  borderBottom: `1px solid ${lightWarm.border}`,
  background: lightWarm.surface,
  boxShadow: lightWarm.shadowSm,
  ".dark &": {
    borderBottomColor: darkFoodChat.borderSoft,
    background: alpha(darkFoodChat.background, 0.9),
    backdropFilter: "blur(18px) saturate(1.14)",
    WebkitBackdropFilter: "blur(18px) saturate(1.14)",
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

export const brandLogoLockupStyles = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: 0,
};

export const brandLogoImageStyles = {
  width: 30,
  height: 30,
  flexShrink: 0,
};

export const brandHeaderTextStyles = {
  textAlign: "left",
  fontWeight: fontWeights.bold,
  fontSize: "1rem",
  lineHeight: 1,
  color: "#1C1917",
  transition: "color 180ms ease-in-out",
  ".dark &": {
    color: darkFoodChat.text,
  },
};

export const brandHeaderAccentStyles = {
  flexWrap: 'none',
  background: "linear-gradient(135deg, #EA580C 0%, #D84315 54%, #B71C1C 100%)",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  ".dark &": {
    background:
      "linear-gradient(135deg, #FFB25C 0%, #FF8A1F 54%, #F26608 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
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
  // boxShadow: `0 14px 34px ${alpha(colors.base.brand[600], 0.34)}`,
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
    backgroundColor: "#FFF7ED",
    color: colors.base.brand[700],
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
  color: "#374151",
  backgroundColor: "#FFF7ED",
  "&:hover": {
    color: "#1F2937",
    backgroundColor: "#FFEDD5",
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
  border: `1px solid ${lightWarm.border}`,
  backgroundColor: lightWarm.surface,
  color: lightWarm.text,
  boxShadow: lightWarm.shadowLg,
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    backgroundColor: alpha(darkFoodChat.surface, 0.98),
    boxShadow: `0 24px 70px ${alpha("#000", 0.56)}, 0 0 0 1px ${alpha(colors.base.brand[500], 0.08)}`,
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
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
    backgroundColor: "#FFF7ED",
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
  backgroundColor: "rgba(15, 23, 42, 0.42)",
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
  border: `1px solid ${lightWarm.borderStrong}`,
  backgroundColor: lightWarm.surface,
  boxShadow: "0 24px 60px rgba(15, 23, 42, 0.12)",
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
  borderRight: `1px solid ${lightWarm.border}`,
  backgroundColor: lightWarm.surface,
  boxShadow: "8px 0 18px rgba(15, 23, 42, 0.04)",
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
  alignItems: { xs: "flex-start", sm: "center" },
  justifyContent: "center",
  overflowY: "auto",
  px: { xs: 1.25, sm: 3 },
  pt: { xs: 2.25, sm: 3, md: 4 },
  pb: { xs: 1.25, sm: 3, md: 4 },
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
  maxWidth: 760,
  mx: "auto",
  borderRadius: { xs: "18px", sm: "24px" },
  p: { xs: 0.25, sm: 2, md: 2.5 },
  overflow: "hidden",
  border: "1px solid transparent",
  background: "transparent",
  boxShadow: "none",
  backdropFilter: "none",
  WebkitBackdropFilter: "none",
  justifyItems: "center",
  textAlign: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: { xs: -16, sm: -28 },
    pointerEvents: "none",
    backgroundImage: lightFoodMapPattern,
    backgroundPosition: "right -160px top -118px, left top",
    backgroundRepeat: "no-repeat",
    backgroundSize: "min(82%, 620px) auto, 100% 100%",
    opacity: 0.09,
    mixBlendMode: "multiply",
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
  ".dark &": {
    borderColor: "transparent",
    background: "transparent",
    boxShadow: "none",
    "&::before": {
      opacity: 0.2,
      mixBlendMode: "screen",
      filter: "saturate(1.25)",
    },
  },
  "@media (max-width: 420px)": {
    borderRadius: "16px",
    p: 0,
  },
});

export const emptyEyebrowStyles = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  mx: "auto",
  mb: { xs: 1, sm: 1.55 },
  borderRadius: "999px",
  px: { xs: 0.95, sm: 1.35 },
  py: { xs: 0.45, sm: 0.65 },
  color: "#EA580C",
  background:
    "linear-gradient(135deg, rgba(249, 115, 22, 0.18) 0%, rgba(234, 88, 12, 0.08) 100%)",
  boxShadow: `inset 0 0 0 1px ${alpha("#F97316", 0.16)}`,
  fontSize: { xs: "0.64rem", sm: "0.78rem" },
  fontWeight: fontWeights.bold,
  width: "fit-content",
  justifyItems: "center",
  ".dark &": {
    color: darkFoodChat.orange,
    backgroundColor: "rgba(249, 115, 22, 0.13)",
    boxShadow: `inset 0 0 0 1px ${alpha(colors.base.brand[500], 0.2)}`,
  },
};

export const emptyTitleStyles = {
  maxWidth: 720,
  mx: "auto",
  fontFamily: "var(--font-display)",
  fontSize: { xs: "1.82rem", sm: "3rem", md: "3.7rem" },
  fontWeight: fontWeights.extrabold,
  lineHeight: { xs: 1.04, sm: 1.02 },
  letterSpacing: 0,
  color: "var(--foreground)",
  textAlign: "center",
  textWrap: "balance",
  "@media (max-width: 420px)": {
    maxWidth: 300,
    fontSize: "1.72rem",
    lineHeight: 1.05,
  },
};

export const emptyDescriptionStyles = {
  mt: { xs: 0.65, sm: 1.2 },
  maxWidth: 610,
  mx: "auto",
  fontSize: { xs: "0.78rem", sm: "0.98rem" },
  lineHeight: { xs: 1.42, sm: 1.65 },
  color: "var(--muted-foreground)",
  textAlign: "center",
  ".dark &": {
    color: darkFoodChat.muted,
  },
  "@media (max-width: 420px)": {
    maxWidth: 340,
    fontSize: "0.76rem",
    lineHeight: 1.4,
  },
};

export const emptySignalRowStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: { xs: 0.45, sm: 1 },
  mt: { xs: 0.85, sm: 1.7 },
};

export const emptySignalChipStyles = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: "999px",
  border: `1px solid ${lightWarm.border}`,
  px: { xs: 0.72, sm: 1.25 },
  py: { xs: 0.3, sm: 0.55 },
  color: lightWarm.muted,
  backgroundColor: lightWarm.surface,
  fontSize: { xs: "0.62rem", sm: "0.76rem" },
  fontWeight: fontWeights.bold,
  borderColor: lightWarm.border,
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    color: darkFoodChat.muted,
    backgroundColor: alpha(darkFoodChat.background, 0.7),
  },
};

export const promptGridStyles = {
  display: "grid",
  gridTemplateColumns: {
    xs: "repeat(3, minmax(0, 1fr))",
    sm: "repeat(3, minmax(0, 1fr))",
  },
  gap: { xs: 0.65, sm: 0.9 },
  maxWidth: { xs: 360, sm: 680 },
  mx: "auto",
  mt: { xs: 1, sm: 2.25 },
};

export const promptCardStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: { xs: 76, sm: 76 },
  alignItems: "center",
  gap: { xs: 0.75, sm: 1.2 },
  border: `1px solid ${lightWarm.border}`,
  borderRadius: { xs: "15px", sm: "18px" },
  p: { xs: 1, sm: 1.25 },
  backgroundColor: lightWarm.surface,
  color: lightWarm.text,
  textAlign: "left",
  cursor: "pointer",
  outline: "2px solid transparent",
  outlineOffset: 3,
  boxShadow: lightWarm.shadowMd,
  transition:
    "transform 160ms ease, border-color 160ms ease, background 160ms ease",
  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: alpha(colors.base.brand[500], 0.42),
    backgroundColor: "#FFFFFF",
    boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
  },
  "&:focus-visible": {
    borderColor: alpha(colors.base.brand[500], 0.56),
    boxShadow: `${effects.shadows.focus}, 0 18px 44px ${alpha(colors.base.brand[700], 0.16)}`,
  },
  ".dark &": {
    borderColor: darkFoodChat.borderSoft,
    background: alpha(darkFoodChat.surfaceSoft, 0.56),
    boxShadow: `0 12px 30px ${alpha("#000", 0.3)}`,
    "&:hover": {
      borderColor: alpha(colors.base.brand[400], 0.42),
      background: alpha(colors.base.brand[500], 0.14),
    },
  },
  "@media (max-width: 420px)": {
    minHeight: 74,
    p: 0.75,
    borderRadius: "15px",
  },
});

export const promptIconStyles = {
  display: "grid",
  width: { xs: 30, sm: 36 },
  height: { xs: 30, sm: 36 },
  flexShrink: 0,
  placeItems: "center",
  borderRadius: { xs: "11px", sm: "14px" },
  color: "#fff",
  background: colors.food.accentGradient,
  boxShadow: `0 10px 22px ${alpha(colors.base.brand[600], 0.22)}`,
};

export const promptCardContentStyles = {
  display: "flex",
  textAlign: "center",
  minWidth: 0,
  flexDirection: "column",
  gap: { xs: 0.24, sm: 0.4 },
};

export const promptTextStyles = {
  fontSize: { xs: "0.74rem", sm: "0.9rem" },
  fontWeight: fontWeights.semibold,
  lineHeight: { xs: 1.18, sm: 1.35 },
  textWrap: "pretty",
  ".dark &": {
    color: alpha(darkFoodChat.text, 0.94),
  },
};

export const promptTagStyles = {
  color: "var(--muted-foreground)",
  fontSize: { xs: "0.6rem", sm: "0.76rem" },
  fontWeight: fontWeights.bold,
  lineHeight: { xs: 1.18, sm: 1.25 },
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
  overflowX: "hidden",
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
  background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
  border: "1px solid #FB923C",
  boxShadow: "0 8px 18px rgba(234, 88, 12, 0.18)",
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

export const humanMessageEditFormStyles = {
  display: "flex",
  minWidth: { xs: 240, sm: 360 },
  flexDirection: "column",
  gap: 1,
};

export const humanMessageEditTextareaStyles = {
  width: "100%",
  minHeight: 84,
  resize: "vertical",
  border: "1px solid rgba(255, 255, 255, 0.52)",
  borderRadius: "16px",
  px: 1.25,
  py: 1,
  color: "#FFFFFF",
  backgroundColor: "rgba(255, 255, 255, 0.12)",
  fontFamily: "inherit",
  fontSize: "0.92rem",
  lineHeight: 1.55,
  outline: 0,
  "&::placeholder": {
    color: "rgba(255, 255, 255, 0.72)",
  },
  "&:focus": {
    borderColor: "rgba(255, 255, 255, 0.86)",
    boxShadow: "0 0 0 3px rgba(255, 255, 255, 0.18)",
  },
  ".dark &": {
    borderColor: alpha(darkFoodChat.orangeStrong, 0.34),
    backgroundColor: alpha("#000000", 0.18),
    "&:focus": {
      borderColor: alpha(darkFoodChat.orange, 0.72),
      boxShadow: `0 0 0 3px ${alpha(darkFoodChat.orangeStrong, 0.18)}`,
    },
  },
};

export const humanMessageEditActionsStyles = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 0.75,
};

export const humanMessageEditCancelButtonStyles = {
  minHeight: 34,
  borderRadius: "999px",
  color: "rgba(255, 255, 255, 0.92)",
  "&:hover": {
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.16)",
  },
};

export const humanMessageEditSubmitButtonStyles = {
  minHeight: 34,
  borderRadius: "999px",
  color: colors.base.brand[800],
  backgroundColor: "rgba(255, 255, 255, 0.88)",
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
  ".dark &": {
    color: darkFoodChat.background,
    backgroundColor: darkFoodChat.orange,
    "&:hover": {
      backgroundColor: "#FFB25C",
    },
  },
};

export const localAssistantGroupStyles = {
  display: "flex",
  maxWidth: { xs: "96%", sm: "90%" },
  gap: 1.35,
  mr: "auto",
};

export const assistantAvatarStyles = {
  display: { xs: "none", sm: "grid" },
  width: 34,
  height: 34,
  flexShrink: 0,
  placeItems: "center",
  mt: 0.5,
  borderRadius: "14px",
  color: colors.base.brand[600],
  border: `1px solid ${lightWarm.border}`,
  background: lightWarm.surface,
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
  ".dark &": {
    color: alpha("#FFF7ED", 0.92),
    borderColor: alpha("#FFF7ED", 0.26),
    background:
      "linear-gradient(135deg, rgba(255, 247, 237, 0.1) 0%, rgba(255, 247, 237, 0.04) 100%)",
    boxShadow: `0 10px 24px ${alpha("#000000", 0.22)}, inset 0 1px 0 ${alpha("#FFF7ED", 0.1)}`,
    backdropFilter: "blur(18px) saturate(1.2)",
    WebkitBackdropFilter: "blur(18px) saturate(1.2)",
  },
};

export const assistantLoadingAvatarStyles = {
  animation: "assistantThinkingPulse 1600ms ease-in-out infinite",
  "@keyframes assistantThinkingPulse": {
    "0%, 100%": {
      transform: "scale(1)",
      opacity: 0.78,
    },
    "50%": {
      transform: "scale(1.04)",
      opacity: 1,
    },
  },
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
  },
};

export const assistantLoadingGroupStyles = {
  display: "flex",
  width: "fit-content",
  maxWidth: { xs: "74%", sm: "65%" },
  alignItems: "flex-start",
  gap: 1.35,
  mr: "auto",
};

export const assistantLoadingBubbleStyles = (theme: Theme) => ({
  position: "relative",
  overflow: "hidden",
  isolation: "isolate",
  transform: "translateZ(0)",
  border: `1px solid ${lightWarm.border}`,
  borderRadius: "20px 20px 20px 6px",
  px: { xs: 1.55, sm: 1.8 },
  py: { xs: 1.2, sm: 1.35 },
  color: lightWarm.text,
  background: lightWarm.surface,
  boxShadow: lightWarm.shadowMd,
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(110deg, transparent 0%, rgba(249, 115, 22, 0.08) 42%, transparent 68%)",
    transform: "translateX(-100%)",
    animation: "assistantThinkingSheen 1800ms ease-in-out infinite",
    pointerEvents: "none",
  },
  "@keyframes assistantThinkingSheen": {
    "0%": { transform: "translateX(-100%)" },
    "58%, 100%": { transform: "translateX(100%)" },
  },
  "@media (prefers-reduced-motion: reduce)": {
    "&::after": {
      animation: "none",
      display: "none",
    },
  },
  ".dark &": {
    borderColor: alpha("#FFF7ED", 0.18),
    color: darkFoodChat.text,
    background:
      "linear-gradient(135deg, rgba(41, 37, 36, 0.58) 0%, rgba(28, 25, 23, 0.48) 100%)",
    boxShadow: `0 16px 38px ${alpha("#000", 0.3)}, inset 0 1px 0 ${alpha("#FFF7ED", 0.08)}`,
    "&::after": {
      background:
        "linear-gradient(110deg, transparent 0%, rgba(255, 247, 237, 0.08) 42%, transparent 68%)",
    },
  },
});

export const assistantLoadingTitleStyles = {
  m: 0,
  display: "flex",
  alignItems: "center",
  gap: 0.9,
  color: "var(--foreground)",
  fontSize: { xs: "0.86rem", sm: "0.92rem" },
  fontWeight: fontWeights.bold,
  lineHeight: 1.35,
  ".dark &": {
    color: darkFoodChat.text,
  },
};

export const assistantLoadingMetaStyles = {
  mt: 0.35,
  color: "var(--muted-foreground)",
  fontSize: { xs: "0.76rem", sm: "0.8rem" },
  fontWeight: 600,
  lineHeight: 1.45,
  ".dark &": {
    color: darkFoodChat.muted,
  },
};

export const assistantLoadingDotsStyles = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.45,
};

export const assistantLoadingDotStyles = (delay: number) => ({
  width: 6,
  height: 6,
  borderRadius: "999px",
  backgroundColor: colors.base.brand[600],
  animation: `assistantThinkingDot 1050ms ease-in-out ${delay}ms infinite`,
  "@keyframes assistantThinkingDot": {
    "0%, 80%, 100%": {
      transform: "translateY(0)",
      opacity: 0.42,
    },
    "40%": {
      transform: "translateY(-3px)",
      opacity: 1,
    },
  },
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
    opacity: 0.78,
  },
  ".dark &": {
    backgroundColor: darkFoodChat.orange,
  },
});

export const localAssistantBubbleStyles = (theme: Theme) => ({
  minWidth: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
  border: `1px solid ${lightWarm.border}`,
  borderRadius: "22px 22px 22px 6px",
  px: 2,
  py: 1.6,
  color: lightWarm.text,
  background: lightWarm.surface,
  boxShadow: lightWarm.shadowMd,
  fontSize: "0.92rem",
  lineHeight: 1.7,
  ".dark &": {
    borderColor: alpha("#FFF7ED", 0.1),
    color: alpha(darkFoodChat.text, 0.9),
    background: alpha(darkFoodChat.surfaceSoft, 0.44),
    boxShadow: `0 16px 38px ${alpha("#000000", 0.26)}, inset 0 1px 0 ${alpha("#FFF7ED", 0.08)}`,
    backdropFilter: "blur(20px) saturate(1.15)",
    WebkitBackdropFilter: "blur(20px) saturate(1.15)",
  },
});

export const disclaimerNoticeStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  border: "1px solid #CBD5E1",
  borderRadius: "22px 22px 22px 6px",
  px: 2,
  py: 1.6,
  color: "#334155",
  background: "#F8FAFC",
  boxShadow: "0 6px 16px rgba(15, 23, 42, 0.05)",
  fontSize: "0.92rem",
  lineHeight: 1.7,
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
  color: "#475569",
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

export const warningNoticeStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  border: "1px solid #FCA5A5",
  borderRadius: "22px 22px 22px 6px",
  px: 2,
  py: 1.55,
  color: "#991B1B",
  fontWeight: 600,
  background: "#FEF2F2",
  boxShadow: "0 6px 16px rgba(239, 68, 68, 0.08)",
  backdropFilter: "none",
  WebkitBackdropFilter: "none",

  ".dark &": {
    borderColor: alpha("#EF4444", 0.4),
    color: alpha("#FEF2F2", 0.9),
    fontWeight: 500,
    background: `linear-gradient(135deg, ${alpha("#EF4444", 0.15)} 0%, ${alpha("#7F1D1D", 0.4)} 100%)`,
    boxShadow: `0 14px 34px ${alpha("#000", 0.3)}, inset 0 1px 0 ${alpha("#FEF2F2", 0.1)}`,
    backdropFilter: "blur(22px) saturate(1.16)",
    WebkitBackdropFilter: "blur(22px) saturate(1.16)",
  },
});

export const warningIconStyles = (theme: Theme) => ({
  width: 24,
  height: 24,
  mt: 0.1,
  flexShrink: 0,
  color: alpha("#EF4444", 0.8)
});

export const warningTextStyles = {
  m: 0,
  fontSize: { xs: "0.88rem", sm: "0.92rem" },
  lineHeight: 1.58,
  fontWeight: 650,
};

export const foodResultCardStyles = (theme: Theme) => ({
  position: "relative",
  isolation: "isolate",
  display: "flex",
  gap: 1.25,
  mt: 1.5,
  overflow: "hidden",
  border: `1px solid ${lightWarm.borderStrong}`,
  borderRadius: effects.borderRadius.lg,
  p: 1.5,
  background: lightWarm.surface,
  backgroundClip: "padding-box",
  boxShadow: "0 10px 24px rgba(15, 23, 42, 0.07)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: "-28px",
    zIndex: -2,
    display: "none",
    pointerEvents: "none",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    zIndex: -1,
    borderRadius: "inherit",
    display: "none",
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
    backdropFilter: "blur(44px) saturate(1.48) contrast(1.05)",
    WebkitBackdropFilter: "blur(44px) saturate(1.48) contrast(1.05)",
    "&::before": {
      display: "none",
    },
    "&::after": {
      display: "block",
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
  color: lightWarm.muted,
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
  border: "1px solid #BBF7D0",
  backgroundColor: "#F0FDF4",
  color: colors.base.herb[700],
  fontSize: "0.72rem",
  fontWeight: fontWeights.bold,
  whiteSpace: "nowrap",
  ".dark &": {
    borderColor: alpha(colors.base.herb[300], 0.3),
    backgroundColor: alpha(colors.base.herb[500], 0.16),
    color: colors.base.herb[300],
  },
};

export const foodResultDescriptionStyles = {
  mt: 1,
  color: lightWarm.muted,
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
  backgroundColor: "#E5E7EB",
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
  border: "1px solid #FDBA74",
  px: 1.25,
  color: "#C2410C",
  background: "#FFF7ED",
  boxShadow: "0 4px 10px rgba(15, 23, 42, 0.06)",
  fontSize: "0.78rem",
  fontWeight: fontWeights.bold,
  "&:hover": {
    borderColor: "#FB923C",
    background: "#FFEDD5",
    boxShadow: "0 6px 14px rgba(15, 23, 42, 0.08)",
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
  backgroundColor: {
    xs: "rgba(9, 9, 11, 0.42)",
    lg: "rgba(9, 9, 11, 0.18)",
  },
};

export const mapPanelDrawerRootStyles = {
  zIndex: 1500,
};

export const mapPanelStyles = (isMobile: boolean) => (theme: Theme) => ({
  display: "flex",
  width: isMobile ? "100%" : 500,
  maxWidth: "100%",
  height: isMobile ? "min(88dvh, 760px)" : "100dvh",
  maxHeight: "100dvh",
  flexDirection: "column",
  gap: 1.5,
  overflow: "hidden",
  borderRadius: isMobile ? "28px 28px 0 0" : "28px 0 0 28px",
  border: `1px solid ${lightWarm.border}`,
  borderBottom: isMobile ? 0 : `1px solid ${lightWarm.border}`,
  background: lightWarm.surface,
  color: lightWarm.text,
  boxShadow: "-18px 0 42px rgba(15, 23, 42, 0.08)",
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
  backgroundColor: "#FFF7ED",
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
  border: `1px solid ${lightWarm.border}`,
  backgroundColor: lightWarm.surface,
  px: 1.4,
  py: 1.1,
  color: "var(--foreground)",
  fontSize: "0.78rem",
  boxShadow: lightWarm.shadowMd,
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
  border: `1px solid ${isActive ? "#FB923C" : lightWarm.border}`,
  borderRadius: "18px",
  backgroundColor: isActive
    ? "#FFF7ED"
    : lightWarm.surface,
  px: 1.15,
  py: 1.1,
  color: "var(--foreground)",
  textAlign: "left",
  cursor: "pointer",
  transition: "border-color 160ms ease, background 160ms ease",
  "&:hover": {
    borderColor: "#FDBA74",
    backgroundColor: "#FFF7ED",
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
  borderColor: lightWarm.borderStrong,
  backgroundColor: lightWarm.surface,
  boxShadow: lightWarm.shadowMd,
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
    "linear-gradient(180deg, transparent 0%, #F9FAFB 40%, #F9FAFB 100%)",
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
  border: `1px solid ${lightWarm.border}`,
  background: lightWarm.surface,
  boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
  transition: "border-color 160ms ease, box-shadow 160ms ease",
  "&:focus-within": {
    borderColor: alpha(colors.base.brand[500], 0.58),
    boxShadow: `0 0 0 3px ${alpha(colors.base.brand[500], 0.12)}, 0 12px 28px rgba(15, 23, 42, 0.08)`,
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
  border: `1px solid ${lightWarm.border}`,
  backgroundColor: lightWarm.surfaceSoft,
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
  color: lightWarm.text,
  fontFamily: "inherit",
  fontSize: { xs: "0.94rem", sm: "0.98rem" },
  lineHeight: 1.55,
  "&::placeholder": {
    color: "#6B7280",
  },
  ".dark &": {
    color: darkFoodChat.text,
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
  borderTop: `1px solid ${lightWarm.border}`,
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
  border: `1px solid ${lightWarm.border}`,
  backgroundColor: lightWarm.surface,
  p: 1,
  color: lightWarm.text,
  boxShadow: "0 14px 32px rgba(15, 23, 42, 0.12)",
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
    backgroundColor: "#FFF7ED",
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
  borderRight: `1px solid ${lightWarm.border}`,
  background: lightWarm.surface,
  boxShadow: "8px 0 18px rgba(15, 23, 42, 0.04)",
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

export const historyNewChatButtonStyles = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  border: 0,
  borderRadius: "12px",
  px: 2,
  py: 1.1,
  fontSize: "0.875rem",
  fontWeight: 700,
  cursor: "pointer",
  color: "#fff",
  background: "linear-gradient(135deg, #FF8A1F 0%, #EA580C 100%)",
  boxShadow: "0 4px 14px rgba(234, 88, 12, 0.32)",
  transition: "opacity 120ms ease, transform 120ms ease, box-shadow 120ms ease",
  "&:hover": {
    opacity: 0.92,
    transform: "translateY(-1px)",
    boxShadow: "0 6px 18px rgba(234, 88, 12, 0.42)",
  },
  "&:active": {
    transform: "translateY(0)",
    opacity: 1,
  },
};

export const historySearchShellStyles = (theme: Theme) => ({
  display: "flex",
  width: "100%",
  alignItems: "center",
  gap: 0.85,
  border: `1px solid ${lightWarm.border}`,
  borderRadius: "14px",
  px: 1.15,
  py: 0.85,
  color: "#6B7280",
  backgroundColor: lightWarm.surfaceSoft,
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.03)",
  transition:
    "border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease",
  "&:focus-within": {
    borderColor: colors.base.brand[500],
    backgroundColor: lightWarm.surface,
    boxShadow: `0 0 0 3px ${alpha(colors.base.brand[500], 0.12)}`,
  },
  ".dark &": {
    color: darkFoodChat.muted,
    borderColor: darkFoodChat.borderSoft,
    backgroundColor: alpha(darkFoodChat.surfaceSoft, 0.5),
    boxShadow: `inset 0 1px 0 ${alpha("#FFF7ED", 0.06)}`,
    "&:focus-within": {
      borderColor: alpha(darkFoodChat.orange, 0.52),
      backgroundColor: alpha(darkFoodChat.surfaceSoft, 0.68),
      boxShadow: `0 0 0 3px ${alpha(darkFoodChat.orange, 0.14)}`,
    },
  },
});

export const historySearchInputStyles = {
  width: "100%",
  minWidth: 0,
  minHeight: "auto",
  height: 22,
  border: 0,
  borderRadius: 0,
  p: 0,
  color: "var(--foreground)",
  backgroundColor: "transparent",
  fontFamily: "inherit",
  fontSize: "0.82rem",
  fontWeight: 650,
  outline: 0,
  boxShadow: "none",
  transition: "none",
  "&::placeholder": {
    color: "var(--muted-foreground)",
    opacity: 0.82,
  },
  "&:focus-visible": {
    borderColor: "transparent",
    boxShadow: "none",
  },
  ".dark &": {
    color: darkFoodChat.text,
    "&::placeholder": {
      color: darkFoodChat.muted,
      opacity: 0.76,
    },
  },
};

export const historySearchClearButtonStyles = (theme: Theme) => ({
  display: "grid",
  width: 22,
  height: 22,
  flexShrink: 0,
  placeItems: "center",
  border: 0,
  borderRadius: "999px",
  color: "#6B7280",
  backgroundColor: "transparent",
  cursor: "pointer",
  transition: "background-color 140ms ease, color 140ms ease",
  "&:hover": {
    color: colors.base.brand[700],
    backgroundColor: "#FFEDD5",
  },
  ".dark &": {
    color: darkFoodChat.muted,
    "&:hover": {
      color: darkFoodChat.orange,
      backgroundColor: alpha(colors.base.brand[500], 0.18),
    },
  },
});

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
      ? "#FFF7ED"
      : "transparent",
    cursor: "pointer",
    textAlign: "left",
    outline: "2px solid transparent",
    outlineOffset: 2,
    "&:hover": {
      backgroundColor: "#FFF7ED",
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
      boxShadow: "0 1px 2px rgba(15, 23, 42, 0.04)",
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
  backgroundColor: lightWarm.surface,
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
  border: `1px solid ${lightWarm.border}`,
  borderRadius: "22px 22px 22px 6px",
  px: 2,
  py: 1.4,
  background: lightWarm.surface,
  boxShadow: lightWarm.shadowMd,
  ".dark &": {
    borderColor: alpha("#FFF7ED", 0.1),
    color: alpha(darkFoodChat.text, 0.9),
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
  background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
  border: "1px solid #FB923C",
  boxShadow: "0 8px 18px rgba(234, 88, 12, 0.18)",
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
  "[data-message-group='true']:hover &, [data-message-group='true']:focus-within &":
    {
      opacity: 1,
    },
  "@media (hover: none)": {
    opacity: 1,
  },
};

export const styles = {
  fallbackStyles,
  appShellStyles,
  headerBarStyles,
  headerSideStyles,
  brandButtonStyles,
  brandLogoLockupStyles,
  brandLogoImageStyles,
  brandHeaderTextStyles,
  brandHeaderAccentStyles,
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
  humanMessageEditFormStyles,
  humanMessageEditTextareaStyles,
  humanMessageEditActionsStyles,
  humanMessageEditCancelButtonStyles,
  humanMessageEditSubmitButtonStyles,
  localAssistantGroupStyles,
  assistantAvatarStyles,
  assistantLoadingAvatarStyles,
  assistantLoadingGroupStyles,
  assistantLoadingBubbleStyles,
  assistantLoadingTitleStyles,
  assistantLoadingMetaStyles,
  assistantLoadingDotsStyles,
  assistantLoadingDotStyles,
  localAssistantBubbleStyles,
  disclaimerNoticeStyles,
  disclaimerIconStyles,
  disclaimerTextStyles,
  warningNoticeStyles,
  warningIconStyles,
  warningTextStyles,
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
  mapPanelDrawerRootStyles,
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
  historyNewChatButtonStyles,
  historySearchShellStyles,
  historySearchInputStyles,
  historySearchClearButtonStyles,
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
