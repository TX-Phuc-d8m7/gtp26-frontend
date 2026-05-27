/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { forwardRef } from "react";
import { Box } from "@mui/material";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip/index";
import { Button } from "@/shared/components/ui/button/index";
import { TooltipIconButtonProps, styles } from ".";

const TooltipIconButton = forwardRef<
  HTMLButtonElement,
  TooltipIconButtonProps
>(({ children, tooltip, side = "bottom", sx, ...rest }, ref) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            {...rest}
            sx={[
              styles.tooltipIconButtonStyles,
              ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
            ]}
            ref={ref}
          >
            {children}
            <Box
              component="span"
              sx={styles.visuallyHiddenStyles}
            >
              {tooltip}
            </Box>
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side}>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});

TooltipIconButton.displayName = "TooltipIconButton";

export default TooltipIconButton;
