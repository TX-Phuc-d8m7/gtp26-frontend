/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import {
  CardContentProps,
  CardDescriptionProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
  CardTitleProps,
  styles,
} from ".";
import { cn } from "@/shared/lib/utils";

function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(styles.cardClassName, className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(styles.cardHeaderClassName, className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn(styles.cardTitleClassName, className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn(styles.cardDescriptionClassName, className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(styles.cardContentClassName, className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn(styles.cardFooterClassName, className)}
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
