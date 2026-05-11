/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import * as SheetPrimitive from "@radix-ui/react-dialog";
import type * as React from "react";
import type { SxProps, Theme } from "@mui/material/styles";

type WithSx<T> = T & {
  sx?: SxProps<Theme>;
};

export type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;
export type SheetTriggerProps = React.ComponentProps<
  typeof SheetPrimitive.Trigger
>;
export type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;
export type SheetPortalProps = React.ComponentProps<
  typeof SheetPrimitive.Portal
>;
export type SheetOverlayProps = React.ComponentProps<
  typeof SheetPrimitive.Overlay
>;
export type SheetSide = "top" | "right" | "bottom" | "left";
export type SheetContentProps = WithSx<
  React.ComponentProps<typeof SheetPrimitive.Content>
> & {
  side?: SheetSide;
};
export type SheetHeaderProps = WithSx<React.ComponentProps<"div">>;
export type SheetFooterProps = WithSx<React.ComponentProps<"div">>;
export type SheetTitleProps = WithSx<
  React.ComponentProps<typeof SheetPrimitive.Title>
>;
export type SheetDescriptionProps = WithSx<
  React.ComponentProps<typeof SheetPrimitive.Description>
>;
