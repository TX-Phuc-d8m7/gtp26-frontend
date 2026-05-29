/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Theme } from "@mui/material/styles";

import {
  containerStyles,
  descriptionStyles,
  errorTextStyles,
  eyeToggleButtonStyles,
  fieldStyles,
  footerLinkStyles,
  footerStyles,
  headerStyles,
  inputIconStyles,
  inputIconWrapperStyles,
  inputStyles,
  inputWrapperStyles,
  labelStyles,
  loadingIconStyles,
  pageBackgroundStyles,
  pageShellStyles,
  serverErrorBannerStyles,
  submitIconStyles,
  titleStyles,
} from "../login/_styles";

export {
  containerStyles,
  descriptionStyles,
  errorTextStyles,
  eyeToggleButtonStyles,
  fieldStyles,
  footerLinkStyles,
  footerStyles,
  headerStyles,
  inputIconStyles,
  inputIconWrapperStyles,
  inputStyles,
  inputWrapperStyles,
  labelStyles,
  loadingIconStyles,
  pageBackgroundStyles,
  pageShellStyles,
  serverErrorBannerStyles,
  submitIconStyles,
  titleStyles,
};

export const formStyles = (theme: Theme) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
});

export const submitButtonStyles = (theme: Theme) => ({
  height: 44,
  width: "100%",
  marginTop: "1rem",
  borderRadius: "0.375rem",
  backgroundColor: "var(--primary)",
  color: "var(--primary-foreground)",
  fontSize: "0.875rem",
  fontWeight: 500,
  transition: "background-color 150ms ease",
  "&:hover": {
    backgroundColor: "color-mix(in srgb, var(--primary) 90%, transparent)",
  },
  "&:disabled": {
    pointerEvents: "none",
    opacity: 0.5,
  },
});

export const styles = {
  pageShellStyles,
  pageBackgroundStyles,
  containerStyles,
  headerStyles,
  titleStyles,
  descriptionStyles,
  formStyles,
  fieldStyles,
  labelStyles,
  inputWrapperStyles,
  inputIconWrapperStyles,
  inputIconStyles,
  inputStyles,
  errorTextStyles,
  serverErrorBannerStyles,
  eyeToggleButtonStyles,
  submitButtonStyles,
  submitIconStyles,
  loadingIconStyles,
  footerStyles,
  footerLinkStyles,
} as const;
