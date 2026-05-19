"use client";

import { LandingPage } from "@/features/landing";
import { LandingThemeProvider } from "@/features/landing/landing-theme-context";

export default function HomePage() {
  return (
    <LandingThemeProvider>
      <LandingPage />
    </LandingThemeProvider>
  );
}
