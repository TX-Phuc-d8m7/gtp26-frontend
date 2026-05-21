/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Slot } from "@radix-ui/react-slot";
import { Box as MuiBox } from "@mui/material";

import { FormProps, styles } from ".";
import { cn } from "@/shared/lib/utils";

function Form({ asChild = false, className, sx, ...props }: FormProps) {
  if (asChild) {
    return (
      <Slot
        data-slot="form"
        className={cn(styles.formClassName, className)}
        {...props}
      />
    );
  }

  return (
    <MuiBox
      component="form"
      data-slot="form"
      className={cn(styles.formClassName, className)}
      sx={sx}
      {...props}
    />
  );
}

export default Form;
