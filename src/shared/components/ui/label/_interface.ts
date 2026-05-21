/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import * as LabelPrimitive from "@radix-ui/react-label";
import type * as React from "react";
import type { SxProps, Theme } from "@mui/material/styles";

export type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  sx?: SxProps<Theme>;
};
