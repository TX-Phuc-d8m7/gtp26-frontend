/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */

import { SxProps, Theme } from "@mui/material";

export type AppLoadingMediaType = "image" | "video";

export interface AppLoadingProps {
  mediaSrc?: string;
  mediaType?: AppLoadingMediaType;
  title?: string;
  description?: string;
  sx?: SxProps<Theme>;
}
