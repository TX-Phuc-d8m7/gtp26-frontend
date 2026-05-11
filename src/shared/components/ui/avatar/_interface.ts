/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import type * as React from "react";

export type AvatarProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
>;
export type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>;
export type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>;
export type AvatarRef = React.ElementRef<typeof AvatarPrimitive.Root>;
export type AvatarImageRef = React.ElementRef<typeof AvatarPrimitive.Image>;
export type AvatarFallbackRef = React.ElementRef<
  typeof AvatarPrimitive.Fallback
>;
