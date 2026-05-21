/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export const switchClassName =
  "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-5 w-9 shrink-0 items-center rounded-full border-2 border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50";

export const switchThumbClassName =
  "bg-background pointer-events-none block size-4 rounded-full ring-0 shadow-lg transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0";

export const styles = {
  switchClassName,
  switchThumbClassName,
} as const;
