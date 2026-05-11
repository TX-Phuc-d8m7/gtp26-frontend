/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import {
  TooltipContentProps,
  TooltipProps,
  TooltipProviderProps,
  TooltipTriggerProps,
  styles,
} from ".";
import { cn } from "@/shared/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({ ...props }: TooltipProps) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({ ...props }: TooltipTriggerProps) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: TooltipContentProps) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(styles.tooltipContentClassName, className)}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={styles.tooltipArrowClassName} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export default Tooltip;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
