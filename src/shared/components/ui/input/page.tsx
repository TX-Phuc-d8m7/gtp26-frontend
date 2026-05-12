/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Box as MuiBox } from "@mui/material";

import { InputProps, styles } from ".";
import { mergeSx } from "@/shared/shared.styles";
import { cn } from "@/shared/lib/utils";

function Input({ className, sx, type, ...props }: InputProps) {
  return (
    <MuiBox
      component="input"
      type={type}
      data-slot="input"
      className={cn(className)}
      sx={mergeSx(styles.inputStyles, sx)}
      {...props}
    />
  );
}

export default Input;
export { Input };
