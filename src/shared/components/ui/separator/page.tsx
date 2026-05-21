/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { SeparatorProps, styles } from ".";
import { cn } from "@/shared/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator-root"
      decorative={decorative}
      orientation={orientation}
      className={cn(styles.separatorClassName, className)}
      {...props}
    />
  );
}

export default Separator;
export { Separator };
