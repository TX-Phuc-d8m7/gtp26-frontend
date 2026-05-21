/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { Box as MuiBox } from "@mui/material";

import {
  SheetCloseProps,
  SheetContentProps,
  SheetDescriptionProps,
  SheetFooterProps,
  SheetHeaderProps,
  SheetOverlayProps,
  SheetPortalProps,
  SheetProps,
  SheetTitleProps,
  SheetTriggerProps,
  styles,
} from ".";
import { cn } from "@/shared/lib/utils";

function Sheet({ ...props }: SheetProps) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetTriggerProps) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPortalProps) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(styles.sheetOverlayClassName, className)}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  sx,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <MuiBox
        component={SheetPrimitive.Content}
        data-slot="sheet-content"
        className={cn(
          styles.sheetContentClassName,
          styles.sheetContentSideClassNames[side],
          className,
        )}
        sx={sx}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className={styles.sheetCloseClassName}>
          <XIcon className={styles.sheetCloseIconClassName} />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </MuiBox>
    </SheetPortal>
  );
}

function SheetHeader({ className, sx, ...props }: SheetHeaderProps) {
  return (
    <MuiBox
      data-slot="sheet-header"
      className={cn(styles.sheetHeaderClassName, className)}
      sx={sx}
      {...props}
    />
  );
}

function SheetFooter({ className, sx, ...props }: SheetFooterProps) {
  return (
    <MuiBox
      data-slot="sheet-footer"
      className={cn(styles.sheetFooterClassName, className)}
      sx={sx}
      {...props}
    />
  );
}

function SheetTitle({ className, sx, ...props }: SheetTitleProps) {
  return (
    <MuiBox
      component={SheetPrimitive.Title}
      data-slot="sheet-title"
      className={cn(styles.sheetTitleClassName, className)}
      sx={sx}
      {...props}
    />
  );
}

function SheetDescription({ className, sx, ...props }: SheetDescriptionProps) {
  return (
    <MuiBox
      component={SheetPrimitive.Description}
      data-slot="sheet-description"
      className={cn(styles.sheetDescriptionClassName, className)}
      sx={sx}
      {...props}
    />
  );
}

export default Sheet;
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
