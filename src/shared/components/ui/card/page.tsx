/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { Box as MuiBox } from "@mui/material";

import {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
  styles,
} from ".";
import { mergeSx } from "@/shared/shared.styles";
import { cn } from "@/shared/lib/utils";

function Card({ className, sx, ...props }: CardProps) {
  return (
    <MuiBox
      data-slot="card"
      className={cn(className)}
      sx={mergeSx(styles.cardStyles, sx)}
      {...props}
    />
  );
}

function CardHeader({ className, sx, ...props }: CardHeaderProps) {
  return (
    <MuiBox
      data-slot="card-header"
      className={cn(className)}
      sx={mergeSx(styles.cardHeaderStyles, sx)}
      {...props}
    />
  );
}

function CardTitle({ className, sx, ...props }: CardTitleProps) {
  return (
    <MuiBox
      data-slot="card-title"
      className={cn(className)}
      sx={mergeSx(styles.cardTitleStyles, sx)}
      {...props}
    />
  );
}

function CardDescription({ className, sx, ...props }: CardDescriptionProps) {
  return (
    <MuiBox
      data-slot="card-description"
      className={cn(className)}
      sx={mergeSx(styles.cardDescriptionStyles, sx)}
      {...props}
    />
  );
}

function CardContent({ className, sx, ...props }: CardContentProps) {
  return (
    <MuiBox
      data-slot="card-content"
      className={cn(className)}
      sx={mergeSx(styles.cardContentStyles, sx)}
      {...props}
    />
  );
}

function CardFooter({ className, sx, ...props }: CardFooterProps) {
  return (
    <MuiBox
      data-slot="card-footer"
      className={cn(className)}
      sx={mergeSx(styles.cardFooterStyles, sx)}
      {...props}
    />
  );
}

export default Card;
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
