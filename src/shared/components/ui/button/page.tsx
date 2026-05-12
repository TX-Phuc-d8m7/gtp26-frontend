/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Slot } from "@radix-ui/react-slot";
import { Box as MuiBox } from "@mui/material";

import { ButtonProps, styles } from ".";
import { mergeSx } from "@/shared/shared.styles";
import { cn } from "@/shared/lib/utils";

function Button({
  className,
  variant,
  size,
  asChild = false,
  sx,
  ...props
}: ButtonProps) {
  if (asChild) {
    return <Slot data-slot="button" className={cn(className)} {...props} />;
  }

  return (
    <MuiBox
      component="button"
      data-slot="button"
      className={cn(className)}
      sx={mergeSx(styles.getButtonSx(variant, size, Boolean(className)), sx)}
      {...props}
    />
  );
}

export default Button;
