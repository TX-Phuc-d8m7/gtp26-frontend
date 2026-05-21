/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type * as React from "react";
import type { SxProps, Theme } from "@mui/material/styles";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "brand";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant | null;
  size?: ButtonSize | null;
  asChild?: boolean;
  sx?: SxProps<Theme>;
}

export type IButtonProps = ButtonProps;
