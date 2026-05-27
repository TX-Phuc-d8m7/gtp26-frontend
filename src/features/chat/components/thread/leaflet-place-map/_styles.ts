/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

import { colors } from "@/theme/colors";
import { fontWeights } from "@/theme/resources";

export const leafletMapShellStyles: SxProps<Theme> = {
  position: "relative",
  minHeight: { xs: 220, sm: 290, lg: 320 },
  overflow: "hidden",
  borderRadius: "24px",
  border: `1px solid ${alpha(colors.base.brand[600], 0.18)}`,
  background:
    "linear-gradient(135deg, rgba(255, 247, 237, 0.96), rgba(255, 255, 255, 0.92))",
  boxShadow: `inset 0 1px 0 ${alpha("#fff", 0.86)}, 0 18px 46px ${alpha(colors.base.brand[800], 0.1)}`,
  ".dark &": {
    borderColor: "rgba(255, 247, 237, 0.08)",
    background:
      "linear-gradient(135deg, rgba(28, 25, 23, 0.96), rgba(12, 10, 9, 0.94))",
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.05), 0 18px 46px rgba(0,0,0,0.36)",
  },
  "& .leaflet-container": {
    width: "100%",
    height: "100%",
    minHeight: { xs: 220, sm: 290, lg: 320 },
    borderRadius: "24px",
    fontFamily: "var(--font-body)",
    background: "transparent",
  },
  "& .leaflet-tile-pane": {
    filter: "saturate(0.94) contrast(0.96)",
  },
  ".dark & .leaflet-tile-pane": {
    filter: "brightness(0.7) contrast(1.08) saturate(0.8)",
  },
  "& .leaflet-control-zoom": {
    overflow: "hidden",
    border: "0 !important",
    borderRadius: "14px",
    boxShadow: `0 12px 26px ${alpha(colors.base.brand[800], 0.12)}`,
  },
  "& .leaflet-control-zoom a": {
    border: "0 !important",
    color: "var(--foreground)",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(12px)",
  },
  ".dark & .leaflet-control-zoom a": {
    color: "#fff7ed",
    background: "rgba(28,25,23,0.92)",
  },
  "& .leaflet-control-attribution": {
    borderTopLeftRadius: "10px",
    color: "var(--muted-foreground)",
    background: "rgba(255,255,255,0.72)",
    fontSize: "0.62rem",
    backdropFilter: "blur(10px)",
  },
  ".dark & .leaflet-control-attribution": {
    color: "rgba(255,247,237,0.58)",
    background: "rgba(12,10,9,0.72)",
  },
  "& .foodie-user-marker": {
    display: "grid",
    width: 34,
    height: 34,
    placeItems: "center",
    border: "3px solid #fff",
    borderRadius: "999px",
    color: "#fff",
    background: colors.base.herb[500],
    boxShadow: `0 12px 28px ${alpha(colors.base.herb[700], 0.3)}`,
  },
  ".dark & .foodie-user-marker": {
    borderColor: "#1c1917",
  },
  "& .foodie-place-marker": {
    display: "grid",
    width: 34,
    height: 34,
    placeItems: "center",
    border: "3px solid #fff",
    borderRadius: "999px 999px 999px 8px",
    color: "#1c1917",
    background: "rgba(255,255,255,0.95)",
    boxShadow: "0 12px 28px rgba(28, 25, 23, 0.18)",
    fontSize: "0.78rem",
    fontWeight: fontWeights.extrabold,
    transform: "rotate(-45deg)",
    transition:
      "width 160ms ease, height 160ms ease, background 160ms ease, color 160ms ease",
  },
  "& .foodie-place-marker > span": {
    transform: "rotate(45deg)",
  },
  "& .foodie-place-marker--active": {
    width: 42,
    height: 42,
    color: "#fff",
    background: `linear-gradient(135deg, ${colors.base.brand[500]}, ${colors.base.brand[700]})`,
    boxShadow: `0 16px 36px ${alpha(colors.base.brand[700], 0.34)}`,
  },
  ".dark & .foodie-place-marker": {
    borderColor: "#1c1917",
    color: "#fff7ed",
    background: "rgba(68,64,60,0.96)",
    boxShadow: "0 14px 32px rgba(0,0,0,0.36)",
  },
  ".dark & .foodie-place-marker--active": {
    borderColor: "#ff9a1f",
    background: "linear-gradient(135deg, #ff9a1f, #ff7a00)",
  },
  "& .leaflet-popup-content-wrapper": {
    borderRadius: "16px",
    border: "1px solid rgba(234, 88, 12, 0.16)",
    color: "var(--foreground)",
    background: "rgba(255,253,249,0.94)",
    boxShadow: `0 18px 44px ${alpha(colors.base.brand[900], 0.16)}`,
    backdropFilter: "blur(16px)",
  },
  ".dark & .leaflet-popup-content-wrapper": {
    borderColor: "rgba(255,247,237,0.08)",
    color: "#fff7ed",
    background: "rgba(28,25,23,0.94)",
  },
  "& .leaflet-popup-tip": {
    background: "rgba(255,253,249,0.94)",
  },
  ".dark & .leaflet-popup-tip": {
    background: "rgba(28,25,23,0.94)",
  },
};

export const emptyMapStateStyles: SxProps<Theme> = {
  display: "grid",
  minHeight: { xs: 180, sm: 240, lg: 260 },
  placeItems: "center",
  borderRadius: "24px",
  border: "1px dashed rgba(234, 88, 12, 0.26)",
  px: 2,
  textAlign: "center",
  color: "var(--muted-foreground)",
  background:
    "linear-gradient(135deg, rgba(255,247,237,0.82), rgba(255,255,255,0.76))",
  ".dark &": {
    borderColor: "rgba(255,247,237,0.12)",
    background:
      "linear-gradient(135deg, rgba(28,25,23,0.88), rgba(12,10,9,0.82))",
  },
};

export const mapLoadingStateStyles: SxProps<Theme> = {
  ...emptyMapStateStyles,
  borderStyle: "solid",
};

export const styles = {
  leafletMapShellStyles,
  emptyMapStateStyles,
  mapLoadingStateStyles,
} as const;
