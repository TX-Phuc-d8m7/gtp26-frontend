/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import * as LabelPrimitive from "@radix-ui/react-label";
import { Box as MuiBox } from "@mui/material";

import { LabelProps, styles } from ".";
import { cn } from "@/shared/lib/utils";

function Label({ className, sx, ...props }: LabelProps) {
  return (
    <MuiBox
      component={LabelPrimitive.Root}
      data-slot="label"
      className={cn(styles.labelClassName, className)}
      sx={sx}
      {...props}
    />
  );
}

export default Label;
export { Label };
