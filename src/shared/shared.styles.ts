/*
* Copyright (c) 2026 GTP26
* All rights reserved.
*/
import { SxProps, Theme } from "@mui/material"

export function mergeSx(
    base: SxProps<Theme>,
    extra?: SxProps<Theme>,
    controlSx?: SxProps<Theme> | undefined,
  ) {
    if (!extra) return base
    return Array.isArray(extra) ? [base, ...extra] : [base, extra]
  }