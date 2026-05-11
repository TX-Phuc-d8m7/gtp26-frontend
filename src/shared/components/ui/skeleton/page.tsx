/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { SkeletonProps, styles } from ".";
import { cn } from "@/shared/lib/utils";

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(styles.skeletonClassName, className)}
      {...props}
    />
  );
}

export default Skeleton;
export { Skeleton };
