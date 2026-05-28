/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

import { ToasterProps, styles } from ".";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={styles.toasterClassName}
      toastOptions={{
        classNames: {
          toast: styles.toastClassName,
          description: styles.toastDescriptionClassName,
          actionButton: styles.toastActionButtonClassName,
          cancelButton: styles.toastCancelButtonClassName,
        },
      }}
      {...props}
    />
  );
};

export default Toaster;
export { Toaster };
