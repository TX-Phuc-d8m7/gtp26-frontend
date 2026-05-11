/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { TextareaProps, styles } from ".";
import { cn } from "@/shared/lib/utils";

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(styles.textareaClassName, className)}
      {...props}
    />
  );
}

export default Textarea;
export { Textarea };
