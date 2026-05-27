/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";

import { styles as chatStyles } from "../../../_styles";
import { mapLoadingStateStyles } from "../leaflet-place-map";

export { mapLoadingStateStyles } from "../leaflet-place-map";

export const mapResultLabelBadgeStyles = (
  usedFallbackResults: boolean,
): SxProps<Theme> => ({
  display: "inline-flex",
  alignItems: "center",
  width: "fit-content",
  mt: 1,
  px: 1.2,
  py: 0.45,
  borderRadius: 999,
  fontSize: "0.72rem",
  fontWeight: 800,
  lineHeight: 1.2,
  color: usedFallbackResults ? "#92400e" : "#166534",
  backgroundColor: usedFallbackResults
    ? "rgba(245, 158, 11, 0.12)"
    : "rgba(34, 197, 94, 0.12)",
  border: usedFallbackResults
    ? "1px solid rgba(245, 158, 11, 0.28)"
    : "1px solid rgba(34, 197, 94, 0.26)",
  ".dark &": {
    color: usedFallbackResults ? "#fbbf24" : "#86efac",
    backgroundColor: usedFallbackResults
      ? "rgba(245, 158, 11, 0.1)"
      : "rgba(34, 197, 94, 0.1)",
    borderColor: usedFallbackResults
      ? "rgba(245, 158, 11, 0.24)"
      : "rgba(34, 197, 94, 0.22)",
  },
});

export const styles = {
  ...chatStyles,
  mapLoadingStateStyles,
  mapResultLabelBadgeStyles,
} as const;
