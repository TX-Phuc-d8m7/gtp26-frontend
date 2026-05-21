/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { Box } from "@mui/material";

import {
  AvatarFallbackProps,
  AvatarFallbackRef,
  AvatarImageProps,
  AvatarImageRef,
  AvatarProps,
  AvatarRef,
  styles,
} from ".";

const Avatar = React.forwardRef<AvatarRef, AvatarProps>(
  ({ className, ...props }, ref) => (
    <Box
      component={AvatarPrimitive.Root}
      ref={ref}
      sx={styles.avatarStyles}
      {...props}
    />
  ),
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<AvatarImageRef, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <Box
      component={AvatarPrimitive.Image}
      ref={ref}
      sx={styles.avatarImageStyles}
      {...props}
    />
  ),
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<AvatarFallbackRef, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <Box
      component={AvatarPrimitive.Fallback}
      ref={ref}
      sx={styles.avatarFallbackStyles}
      {...props}
    />
  ),
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export default Avatar;
export { Avatar, AvatarImage, AvatarFallback };
