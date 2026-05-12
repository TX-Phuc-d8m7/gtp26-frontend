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
  background:
    theme.palette.mode === "dark"
      ? `radial-gradient(circle at 12% 8%, ${alpha(colors.base.brand[700], 0.32)} 0, transparent 28%),
        radial-gradient(circle at 92% 20%, ${alpha(colors.base.herb[700], 0.18)} 0, transparent 26%),
        linear-gradient(180deg, #160F0B 0%, #20140D 52%, #130D0A 100%)`
      : `radial-gradient(circle at 14% 6%, ${alpha(colors.base.brand[300], 0.26)} 0, transparent 28%),
        radial-gradient(circle at 90% 18%, ${alpha(colors.base.herb[300], 0.18)} 0, transparent 25%),
        linear-gradient(180deg, #FFF8EF 0%, #FFFDF7 48%, #FFF3E2 100%)`,
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
  borderBottom: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.2 : 0.1)}`,
  background:
    theme.palette.mode === "dark"
      ? alpha("#211711", 0.78)
      : alpha("#FFFDF7", 0.76),
  backdropFilter: "blur(18px)",
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
  p: 0,
};

export const brandMarkStyles = (theme: Theme) => ({
  display: { xs: "none", sm: "grid" },
  placeItems: "center",
  width: 34,
  height: 34,
  borderRadius: "12px",
  color: "#fff",
  background: colors.food.accentGradient,
  boxShadow: `0 14px 34px ${alpha(colors.base.brand[600], 0.26)}`,
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

export const brandSubtitleStyles = {
  display: { xs: "none", md: "block" },
  mt: 0.15,
  fontSize: "0.72rem",
  fontWeight: fontWeights.medium,
  color: "var(--muted-foreground)",
  whiteSpace: "nowrap",
};

export const headerIconButtonStyles = (theme: Theme) => ({
  width: 38,
  height: 38,
  borderRadius: "14px",
  color:
    theme.palette.mode === "dark"
      ? colors.base.gray[100]
      : colors.base.gray[800],
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(colors.base.brand[300], 0.1)
        : alpha(colors.base.brand[500], 0.1),
    color: colors.base.brand[600],
  },
});

export const modelButtonStyles = (theme: Theme) => ({
  borderRadius: "999px",
  px: 1.5,
  minHeight: 34,
  color: "var(--muted-foreground)",
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha("#FFFFFF", 0.04)
      : alpha(colors.base.brand[100], 0.46),
  "&:hover": {
    color: "var(--foreground)",
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha("#FFFFFF", 0.08)
        : alpha(colors.base.brand[100], 0.76),
  },
});

export const dropdownPanelStyles = (theme: Theme) => ({
  position: "absolute",
  zIndex: 50,
  mt: 1,
  overflow: "hidden",
  borderRadius: effects.borderRadius.lg,
  border: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.24 : 0.12)}`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(colors.food.surfaceDark, 0.96)
      : alpha(colors.food.surface, 0.98),
  color: "var(--foreground)",
  boxShadow: effects.shadows.lg,
  backdropFilter: "blur(18px)",
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
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(colors.base.brand[400], 0.12)
        : alpha(colors.base.brand[100], 0.7),
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
  backgroundColor: "rgba(22, 15, 11, 0.58)",
  backdropFilter: "blur(16px)",
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
  borderRadius: { xs: "22px", sm: "30px" },
  border: `1px solid ${alpha("#FFFFFF", theme.palette.mode === "dark" ? 0.12 : 0.72)}`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? colors.food.surfaceDark
      : colors.food.surface,
  boxShadow: `0 30px 90px ${alpha("#000", 0.34)}`,
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
  borderRight: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.2 : 0.1)}`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(colors.food.surfaceDark, 0.72)
      : alpha(colors.food.surface, 0.72),
  backdropFilter: "blur(18px)",
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
  alignItems: "center",
  justifyContent: "center",
  px: { xs: 2, sm: 3 },
  py: { xs: 3, md: 5 },
};

export const emptyHeroPanelStyles = (theme: Theme) => ({
  width: "100%",
  maxWidth: 900,
  mx: "auto",
  borderRadius: { xs: "24px", md: "34px" },
  p: { xs: 2.5, sm: 4, md: 5 },
  border: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.2 : 0.1)}`,
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${alpha(colors.food.surfaceDark, 0.92)} 0%, ${alpha("#2A1A10", 0.78)} 100%)`
      : `linear-gradient(135deg, ${alpha("#FFFFFF", 0.88)} 0%, ${alpha(colors.base.brand[50], 0.92)} 100%)`,
  boxShadow: `0 28px 90px ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.24 : 0.1)}`,
});

export const emptyEyebrowStyles = {
  display: "inline-flex",
  alignItems: "center",
  gap: 0.75,
  mb: 2,
  borderRadius: "999px",
  px: 1.5,
  py: 0.75,
  color: colors.base.herb[500],
  backgroundColor: "rgba(47, 143, 70, 0.1)",
  fontSize: "0.78rem",
  fontWeight: fontWeights.bold,
};

export const emptyTitleStyles = {
  maxWidth: 680,
  fontFamily: "var(--font-display)",
  fontSize: { xs: "2.25rem", sm: "3.4rem", md: "4.2rem" },
  fontWeight: fontWeights.extrabold,
  lineHeight: 0.98,
  letterSpacing: 0,
  color: "var(--foreground)",
};

export const emptyDescriptionStyles = {
  mt: 2,
  maxWidth: 600,
  fontSize: { xs: "0.95rem", sm: "1.05rem" },
  lineHeight: 1.7,
  color: "var(--muted-foreground)",
};

export const promptGridStyles = {
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
  gap: 1.5,
  mt: 4,
};

export const promptCardStyles = (theme: Theme) => ({
  display: "flex",
  minHeight: 92,
  alignItems: "center",
  gap: 1.5,
  border: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.2 : 0.1)}`,
  borderRadius: effects.borderRadius.xl,
  p: 2,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha("#FFFFFF", 0.035)
      : alpha("#FFFFFF", 0.72),
  color: "var(--foreground)",
  textAlign: "left",
  cursor: "pointer",
  boxShadow: `0 16px 40px ${alpha(colors.base.brand[800], 0.08)}`,
  transition:
    "transform 160ms ease, border-color 160ms ease, background 160ms ease",
  "&:hover": {
    transform: "translateY(-2px)",
    borderColor: alpha(colors.base.brand[500], 0.42),
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(colors.base.brand[500], 0.12)
        : alpha(colors.base.brand[50], 0.95),
  },
});

export const promptIconStyles = {
  display: "grid",
  width: 38,
  height: 38,
  flexShrink: 0,
  placeItems: "center",
  borderRadius: "14px",
  color: "#fff",
  background: colors.food.accentGradient,
  boxShadow: `0 12px 30px ${alpha(colors.base.brand[600], 0.22)}`,
};

export const promptTextStyles = {
  fontSize: "0.92rem",
  fontWeight: fontWeights.semibold,
  lineHeight: 1.45,
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
    backgroundColor: "rgba(148, 124, 104, 0.34)",
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
  color: "#fff",
  background: colors.food.accentGradient,
  boxShadow: `0 14px 34px ${alpha(colors.base.brand[600], 0.22)}`,
  fontSize: "0.92rem",
  lineHeight: 1.65,
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
  backgroundColor: "rgba(249, 115, 22, 0.12)",
};

export const localAssistantBubbleStyles = (theme: Theme) => ({
  border: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.22 : 0.1)}`,
  borderRadius: "22px 22px 22px 6px",
  px: 2,
  py: 1.6,
  color: "var(--foreground)",
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(colors.food.surfaceDark, 0.78)
      : alpha(colors.food.surface, 0.92),
  boxShadow: `0 14px 38px ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.18 : 0.08)}`,
  fontSize: "0.92rem",
  lineHeight: 1.7,
});

export const foodResultCardStyles = (theme: Theme) => ({
  mt: 1.5,
  border: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.22 : 0.1)}`,
  borderRadius: effects.borderRadius.lg,
  p: 1.5,
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${alpha("#FFFFFF", 0.045)} 0%, ${alpha(colors.base.brand[700], 0.1)} 100%)`
      : `linear-gradient(135deg, ${alpha("#FFFFFF", 0.86)} 0%, ${alpha(colors.base.brand[50], 0.88)} 100%)`,
});

export const foodResultHeaderStyles = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: 1.5,
};

export const foodResultTitleStyles = {
  fontWeight: fontWeights.bold,
  color: colors.base.brand[600],
};

export const scorePillStyles = {
  flexShrink: 0,
  borderRadius: "999px",
  px: 1,
  py: 0.45,
  backgroundColor: "rgba(47, 143, 70, 0.12)",
  color: colors.base.herb[500],
  fontSize: "0.72rem",
  fontWeight: fontWeights.bold,
  whiteSpace: "nowrap",
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
  borderColor: alpha(
    colors.base.brand[700],
    theme.palette.mode === "dark" ? 0.32 : 0.14,
  ),
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(colors.food.surfaceDark, 0.92)
      : alpha(colors.food.surface, 0.92),
  boxShadow: effects.shadows.md,
});

export const inputShellStyles = (theme: Theme) => ({
  position: "sticky",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1.5,
  pt: 2,
  pb: { xs: 2, sm: 2.8 },
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(180deg, transparent 0%, rgba(22, 15, 11, 0.92) 36%, rgba(22, 15, 11, 0.98) 100%)"
      : "linear-gradient(180deg, transparent 0%, rgba(255, 248, 239, 0.9) 36%, rgba(255, 248, 239, 0.98) 100%)",
});

export const inputInnerStyles = {
  width: "100%",
  maxWidth: dimensions.contentMaxWidth,
  mx: "auto",
  px: { xs: 1.5, sm: 2 },
};

export const composerStyles = (theme: Theme) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: { xs: "22px", sm: "28px" },
  border: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.24 : 0.12)}`,
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(135deg, ${alpha(colors.food.surfaceDark, 0.94)} 0%, ${alpha("#2C1A10", 0.88)} 100%)`
      : `linear-gradient(135deg, ${alpha("#FFFFFF", 0.9)} 0%, ${alpha(colors.base.brand[50], 0.94)} 100%)`,
  boxShadow: `0 24px 80px ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.26 : 0.12)}`,
  transition: "border-color 160ms ease, box-shadow 160ms ease",
  "&:focus-within": {
    borderColor: alpha(colors.base.brand[500], 0.48),
    boxShadow: `0 28px 90px ${alpha(colors.base.brand[600], theme.palette.mode === "dark" ? 0.32 : 0.18)}`,
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
  border: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.2 : 0.1)}`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha("#FFFFFF", 0.045)
      : alpha("#FFFFFF", 0.72),
  px: 1.2,
  py: 0.9,
  color: "var(--foreground)",
  fontSize: "0.76rem",
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
};

export const composerFooterStyles = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 1.5,
  borderTop: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.18 : 0.08)}`,
  px: 0.75,
  pt: 1.2,
});

export const composerToolsStyles = {
  display: "flex",
  minWidth: 0,
  alignItems: "center",
  gap: 0.75,
};

export const toolsPanelStyles = (theme: Theme) => ({
  position: "absolute",
  bottom: 48,
  left: 0,
  zIndex: 20,
  width: { xs: 280, sm: 320 },
  borderRadius: effects.borderRadius.xl,
  border: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.24 : 0.12)}`,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(colors.food.surfaceDark, 0.98)
      : alpha(colors.food.surface, 0.98),
  p: 1,
  color: "var(--foreground)",
  boxShadow: effects.shadows.lg,
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
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(colors.base.brand[400], 0.12)
        : alpha(colors.base.brand[100], 0.72),
  },
});

export const sendButtonStyles = {
  width: 40,
  height: 40,
  borderRadius: "16px",
  border: 0,
  color: "#fff",
  background: colors.food.accentGradient,
  boxShadow: `0 12px 28px ${alpha(colors.base.brand[600], 0.24)}`,
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
};

export const historyShellStyles = (theme: Theme) => ({
  display: "flex",
  width: 300,
  height: "100dvh",
  flexShrink: 0,
  flexDirection: "column",
  gap: 2,
  borderRight: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.2 : 0.1)}`,
  background:
    theme.palette.mode === "dark"
      ? `linear-gradient(180deg, ${alpha(colors.food.surfaceDark, 0.9)} 0%, ${alpha("#1A100B", 0.96)} 100%)`
      : `linear-gradient(180deg, ${alpha(colors.food.surface, 0.9)} 0%, ${alpha(colors.base.brand[50], 0.96)} 100%)`,
  p: 2,
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
    backgroundColor: "rgba(148, 124, 104, 0.32)",
  },
};

export const historyItemButtonStyles =
  (isActive: boolean) => (theme: Theme) => ({
    width: "100%",
    minHeight: 46,
    justifyContent: "flex-start",
    borderRadius: "16px",
    px: 1.5,
    color: isActive ? colors.base.brand[600] : "var(--foreground)",
    backgroundColor: isActive
      ? alpha(
          colors.base.brand[500],
          theme.palette.mode === "dark" ? 0.16 : 0.12,
        )
      : "transparent",
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? alpha(colors.base.brand[400], 0.12)
          : alpha(colors.base.brand[100], 0.78),
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
  border: `1px solid ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.18 : 0.08)}`,
  borderRadius: "22px 22px 22px 6px",
  px: 2,
  py: 1.4,
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(colors.food.surfaceDark, 0.58)
      : alpha(colors.food.surface, 0.78),
  boxShadow: `0 12px 34px ${alpha(colors.base.brand[800], theme.palette.mode === "dark" ? 0.12 : 0.06)}`,
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
  color: "#fff",
  background: colors.food.accentGradient,
  boxShadow: `0 14px 34px ${alpha(colors.base.brand[600], 0.22)}`,
  whiteSpace: "pre-wrap",
  fontSize: "0.92rem",
  lineHeight: 1.65,
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
  brandSubtitleStyles,
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
  promptGridStyles,
  promptCardStyles,
  promptIconStyles,
  promptTextStyles,
  messageScrollStyles,
  messageContentStyles,
  localHumanGroupStyles,
  localHumanBubbleStyles,
  localAssistantGroupStyles,
  assistantAvatarStyles,
  localAssistantBubbleStyles,
  foodResultCardStyles,
  foodResultHeaderStyles,
  foodResultTitleStyles,
  scorePillStyles,
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
  langchainAssistantRowStyles,
  langchainAssistantContentStyles,
  langchainHumanGroupStyles,
  langchainHumanBubbleStyles,
  messageActionsStyles,
} as const;
