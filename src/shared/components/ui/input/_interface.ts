/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type * as React from "react";
import type { SxProps, Theme } from "@mui/material/styles";

export type InputProps = React.ComponentProps<"input"> & {
  sx?: SxProps<Theme>;
};
