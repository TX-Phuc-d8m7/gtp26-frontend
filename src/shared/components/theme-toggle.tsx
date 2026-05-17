"use client";

import * as React from "react";
import { Box } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/shared/components/ui/button/index";

export const ThemeToggle = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(function ThemeToggle({ onClick, sx, ...props }, ref) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      ref={ref}
      {...props}
      variant="ghost"
      size="icon"
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          setTheme(theme === "dark" ? "light" : "dark");
        }
      }}
      sx={[
        {
          position: "relative",
          width: 38,
          height: 38,
          borderRadius: "14px",
          color: "#27272a",
          "&:hover": {
            backgroundColor: "rgba(249, 115, 22, 0.1)",
            color: "#ea580c",
          },
          ".dark &": {
            color: "#fafafa",
            "&:hover": {
              backgroundColor: "rgba(249, 115, 22, 0.18)",
              color: "#fed7aa",
            },
          },
          "& [data-theme-icon='sun'], & [data-theme-icon='moon']": {
            width: "1.2rem",
            height: "1.2rem",
            transition: "transform 180ms ease, opacity 180ms ease",
          },
          "& [data-theme-icon='sun']": {
            transform: "rotate(0deg) scale(1)",
            opacity: 1,
          },
          "& [data-theme-icon='moon']": {
            position: "absolute",
            transform: "rotate(90deg) scale(0)",
            opacity: 0,
          },
          ".dark & [data-theme-icon='sun']": {
            transform: "rotate(-90deg) scale(0)",
            opacity: 0,
          },
          ".dark & [data-theme-icon='moon']": {
            transform: "rotate(0deg) scale(1)",
            opacity: 1,
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      aria-label={props["aria-label"] ?? "Đổi giao diện sáng tối"}
    >
      <Sun data-theme-icon="sun" />
      <Moon data-theme-icon="moon" />
      <Box
        component="span"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Toggle theme
      </Box>
    </Button>
  );
});
