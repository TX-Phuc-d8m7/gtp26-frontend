/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Box as MuiBox } from "@mui/material";

import { PasswordInputProps, styles } from ".";
import { Button } from "../button/index";
import { Input } from "../input/index";
import { mergeSx } from "@/shared/shared.styles";

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, sx, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <MuiBox sx={styles.passwordInputWrapperStyles}>
      <Input
        type={showPassword ? "text" : "password"}
        className={className}
        sx={mergeSx(styles.passwordInputStyles, sx)}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        sx={styles.passwordInputToggleStyles}
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeIcon aria-hidden="true" />
        ) : (
          <EyeOffIcon aria-hidden="true" />
        )}
        <MuiBox component="span" sx={styles.screenReaderOnlyStyles}>
          {showPassword ? "Hide password" : "Show password"}
        </MuiBox>
      </Button>

      {/* hides browsers password toggles */}
      <style>{styles.passwordInputBrowserToggleStyles}</style>
    </MuiBox>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
