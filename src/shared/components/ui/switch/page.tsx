/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { SwitchProps, styles } from ".";
import { cn } from "@/shared/lib/utils";

function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(styles.switchClassName, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(styles.switchThumbClassName)}
      />
    </SwitchPrimitive.Root>
  );
}

export default Switch;
export { Switch };
