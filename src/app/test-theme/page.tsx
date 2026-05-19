"use client";

import { Box, Button, Typography } from "@mui/material";
import { LandingThemeProvider, useLandingTheme } from "@/features/landing/landing-theme-context";

function TestContent() {
  const { isDark, toggleTheme } = useLandingTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
        background: isDark
          ? "linear-gradient(180deg, #0C0A09 0%, #151110 100%)"
          : "linear-gradient(180deg, #FAFAF8 0%, #F5F3F0 100%)",
        transition: "background 300ms ease-in-out",
      }}
    >
      <Typography
        sx={{
          fontSize: 48,
          fontWeight: 800,
          color: isDark ? "#FFF7ED" : "#27251F",
        }}
      >
        {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </Typography>

      <Typography
        sx={{
          fontSize: 24,
          color: isDark ? "#FFF7ED" : "#27251F",
        }}
      >
        Current Theme: {isDark ? "DARK" : "LIGHT"}
      </Typography>

      <Button
        onClick={toggleTheme}
        variant="contained"
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #FFB25C 0%, #FF8A1F 54%, #F26608 100%)"
            : "linear-gradient(135deg, #EA580C 0%, #D84315 54%, #B71C1C 100%)",
          color: "#fff",
          px: 6,
          py: 2,
          fontSize: 18,
          fontWeight: 600,
          textTransform: "none",
          transition: "all 200ms ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
          },
        }}
      >
        {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </Button>
    </Box>
  );
}

export default function TestThemePage() {
  return (
    <LandingThemeProvider>
      <TestContent />
    </LandingThemeProvider>
  );
}
