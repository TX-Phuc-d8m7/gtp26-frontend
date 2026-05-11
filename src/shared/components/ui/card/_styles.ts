/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
export const cardClassName =
  "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm";

export const cardHeaderClassName = "flex flex-col gap-1.5 px-6";

export const cardTitleClassName = "leading-none font-semibold";

export const cardDescriptionClassName = "text-muted-foreground text-sm";

export const cardContentClassName = "px-6";

export const cardFooterClassName = "flex items-center px-6";

export const styles = {
  cardClassName,
  cardHeaderClassName,
  cardTitleClassName,
  cardDescriptionClassName,
  cardContentClassName,
  cardFooterClassName,
} as const;
