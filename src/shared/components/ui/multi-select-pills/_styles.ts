/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export const styles = {
  root: "flex flex-wrap gap-2 mt-2",
  optionButtonBase:
    "h-auto px-3 py-1.5 rounded-full text-sm font-medium border transition-colors flex items-center gap-1",
  optionButtonDefault: "bg-primary/10 text-primary border-primary/20",
  optionButtonDanger:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  optionButtonSuccess:
    "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  optionButtonInactive:
    "bg-background text-muted-foreground border-border hover:bg-secondary",
  optionIcon: "w-3.5 h-3.5",
} as const;
