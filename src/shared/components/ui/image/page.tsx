/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Box as MuiBox } from "@mui/material";

import { ImageProps, styles } from ".";
import { cn } from "@/shared/lib/utils";

function Image({ className, sx, ...props }: ImageProps) {
  return (
    <MuiBox
      component="img"
      data-slot="image"
      className={cn(styles.imageClassName, className)}
      sx={sx}
      {...props}
    />
  );
}

export default Image;
