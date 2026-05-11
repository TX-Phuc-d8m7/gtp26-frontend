/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export const toasterClassName = "toaster group";

export const toastClassName =
  "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg";

export const toastDescriptionClassName = "group-[.toast]:text-muted-foreground";

export const toastActionButtonClassName =
  "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium";

export const toastCancelButtonClassName =
  "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium";

export const styles = {
  toasterClassName,
  toastClassName,
  toastDescriptionClassName,
  toastActionButtonClassName,
  toastCancelButtonClassName,
} as const;
