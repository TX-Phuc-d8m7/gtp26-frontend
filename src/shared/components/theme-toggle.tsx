"use client";

import * as React from "react";
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
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      aria-label={props["aria-label"] ?? "Đổi giao diện sáng tối"}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
});
