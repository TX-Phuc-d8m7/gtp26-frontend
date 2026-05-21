/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Slot } from "@radix-ui/react-slot";
import { Box as MuiBox } from "@mui/material";

import { BoxProps, styles } from ".";
import { cn } from "@/shared/lib/utils";

function Box({ asChild = false, className, sx, ...props }: BoxProps) {
  if (asChild) {
    return <Slot className={cn(styles.boxClassName, className)} {...props} />;
  }

  return (
    <MuiBox className={cn(styles.boxClassName, className)} sx={sx} {...props} />
  );
}

export default Box;
