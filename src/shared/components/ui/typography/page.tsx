/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Slot } from "@radix-ui/react-slot";
import { Box as MuiBox } from "@mui/material";

import { TypographyProps, styles } from ".";
import { cn } from "@/shared/lib/utils";

function Typography({
  as,
  asChild = false,
  className,
  sx,
  ...props
}: TypographyProps) {
  if (asChild) {
    return (
      <Slot className={cn(styles.typographyClassName, className)} {...props} />
    );
  }

  return (
    <MuiBox
      component={as ?? "p"}
      className={cn(styles.typographyClassName, className)}
      sx={sx}
      {...props}
    />
  );
}

export default Typography;
