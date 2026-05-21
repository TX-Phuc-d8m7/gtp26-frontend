/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Box as MuiBox } from "@mui/material";

import { ButtonProps, styles } from ".";
import { mergeSx } from "@/shared/shared.styles";
import { cn } from "@/shared/lib/utils";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, sx, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref}
          data-slot="button"
          className={cn(className)}
          {...props}
        />
      );
    }

    return (
      <MuiBox
        ref={ref}
        component="button"
        data-slot="button"
        className={cn(className)}
        sx={mergeSx(styles.getButtonSx(variant, size, Boolean(className)), sx)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export default Button;
