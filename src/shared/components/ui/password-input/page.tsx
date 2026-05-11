/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { PasswordInputProps, styles } from ".";
import { Button } from "../button/index";
import { Input } from "../input/index";
import { cn } from "@/shared/lib/utils";

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={styles.passwordInputWrapperClassName}>
      <Input
        type={showPassword ? "text" : "password"}
        className={cn(styles.passwordInputClassName, className)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={styles.passwordInputToggleClassName}
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeIcon
            className={styles.passwordInputIconClassName}
            aria-hidden="true"
          />
        ) : (
          <EyeOffIcon
            className={styles.passwordInputIconClassName}
            aria-hidden="true"
          />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>

      {/* hides browsers password toggles */}
      <style>{styles.passwordInputBrowserToggleStyles}</style>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
