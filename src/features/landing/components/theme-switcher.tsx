"use client";

import { Box, Button, alpha } from "@mui/material";

interface ThemeSwitcherProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeSwitcher({ isDark, onToggle }: ThemeSwitcherProps) {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Button
        onClick={onToggle}
        variant="outlined"
        size="small"
        sx={{
          borderColor: isDark ? alpha("#FFF7ED", 0.2) : alpha("#27251F", 0.15),
          color: isDark ? "#FFF7ED" : "#27251F",
          backdropFilter: "blur(18px)",
          backgroundColor: isDark
            ? alpha("#1C1917", 0.6)
            : alpha("#FAFAF8", 0.7),
          textTransform: "none",
          fontWeight: 600,
          transition: "all 200ms ease-in-out",
          "&:hover": {
            backgroundColor: isDark
              ? alpha("#1C1917", 0.8)
              : alpha("#FAFAF8", 0.95),
            borderColor: isDark ? alpha("#FFF7ED", 0.3) : alpha("#27251F", 0.25),
          },
        }}
      >
        {isDark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </Button>
    </Box>
  );
}
