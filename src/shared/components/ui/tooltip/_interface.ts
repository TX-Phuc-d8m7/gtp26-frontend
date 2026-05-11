/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";

export type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
>;
export type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root>;
export type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>;
export type TooltipContentProps = React.ComponentProps<
  typeof TooltipPrimitive.Content
>;
