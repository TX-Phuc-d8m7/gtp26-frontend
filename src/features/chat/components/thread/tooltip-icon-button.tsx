"use client";

import { forwardRef } from "react";
import { Box } from "@mui/material";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip/index";
import { Button, ButtonProps } from "@/shared/components/ui/button/index";

export type TooltipIconButtonProps = ButtonProps & {
  tooltip: string;
  side?: "top" | "bottom" | "left" | "right";
};

export const TooltipIconButton = forwardRef<
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
              {
                width: 24,
                height: 24,
                p: 0.5,
              },
              ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
            ]}
            ref={ref}
          >
            {children}
            <Box
              component="span"
              sx={{
                position: "absolute",
                width: 1,
                height: 1,
                p: 0,
                m: -1,
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
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
