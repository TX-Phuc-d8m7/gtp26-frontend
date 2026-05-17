/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Box as MuiBox } from "@mui/material";

import { SkeletonProps, styles } from ".";
import { mergeSx } from "@/shared/shared.styles";
import { cn } from "@/shared/lib/utils";

function Skeleton({ className, sx, ...props }: SkeletonProps) {
  return (
    <MuiBox
      data-slot="skeleton"
      className={cn(className)}
      sx={mergeSx(styles.skeletonStyles, sx)}
      {...props}
    />
  );
}

export default Skeleton;
export { Skeleton };
