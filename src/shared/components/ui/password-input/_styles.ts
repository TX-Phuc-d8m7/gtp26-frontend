/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export const passwordInputWrapperClassName = "relative w-full";

export const passwordInputClassName = "hide-password-toggle pr-10";

export const passwordInputToggleClassName =
  "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent";

export const passwordInputIconClassName = "h-4 w-4";

export const passwordInputBrowserToggleStyles = `
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`;

export const styles = {
  passwordInputWrapperClassName,
  passwordInputClassName,
  passwordInputToggleClassName,
  passwordInputIconClassName,
  passwordInputBrowserToggleStyles,
} as const;
