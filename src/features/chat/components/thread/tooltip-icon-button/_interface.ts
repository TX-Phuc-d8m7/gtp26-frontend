/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { ButtonProps } from "@/shared/components/ui/button/index";

export type TooltipIconButtonSide = "top" | "bottom" | "left" | "right";

export type TooltipIconButtonProps = ButtonProps & {
  tooltip: string;
  side?: TooltipIconButtonSide;
};
