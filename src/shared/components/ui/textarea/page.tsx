/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Box as MuiBox } from "@mui/material";

import { TextareaProps, styles } from ".";
import { mergeSx } from "@/shared/shared.styles";
import { cn } from "@/shared/lib/utils";

function Textarea({ className, sx, ...props }: TextareaProps) {
  return (
    <MuiBox
      component="textarea"
      data-slot="textarea"
      className={cn(className)}
      sx={mergeSx(styles.textareaStyles, sx)}
      {...props}
    />
  );
}

export default Textarea;
export { Textarea };
