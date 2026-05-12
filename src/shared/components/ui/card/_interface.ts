/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type * as React from "react";
import type { SxProps, Theme } from "@mui/material/styles";

type WithSx<T> = T & {
  sx?: SxProps<Theme>;
};

export type CardProps = WithSx<React.ComponentProps<"div">>;
export type CardHeaderProps = WithSx<React.ComponentProps<"div">>;
export type CardTitleProps = WithSx<React.ComponentProps<"div">>;
export type CardDescriptionProps = WithSx<React.ComponentProps<"div">>;
export type CardContentProps = WithSx<React.ComponentProps<"div">>;
export type CardFooterProps = WithSx<React.ComponentProps<"div">>;
