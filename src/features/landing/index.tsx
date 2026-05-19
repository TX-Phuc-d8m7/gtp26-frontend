"use client";

import { Box } from "@mui/material";

import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { CtaSection } from "./components/cta-section";
import { HeroSectionLight } from "./components/hero-section-light";
import { FeaturesSectionLight } from "./components/features-section-light";
import { CtaSectionLight } from "./components/cta-section-light";
import { ThemeSwitcher } from "./components/theme-switcher";
import { useLandingTheme } from "./landing-theme-context";

export function LandingPage() {
  const { isDark, toggleTheme } = useLandingTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <ThemeSwitcher isDark={isDark} onToggle={toggleTheme} />
      {isDark ? (
        <>
          <HeroSection />
          <FeaturesSection />
          <CtaSection />
        </>
      ) : (
        <>
          <HeroSectionLight />
          <FeaturesSectionLight />
          <CtaSectionLight />
        </>
      )}
    </Box>
  );
}
