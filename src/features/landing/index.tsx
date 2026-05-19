"use client";

import { Box } from "@mui/material";

import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { ShowcaseSection } from "./components/showcase-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { CtaSection } from "./components/cta-section";
import { HeroSectionLight } from "./components/hero-section-light";
import { FeaturesSectionLight } from "./components/features-section-light";
import { CtaSectionLight } from "./components/cta-section-light";
import { ThemeSwitcher } from "./components/theme-switcher";
import { useLandingTheme } from "./landing-theme-context";

function LandingPageContent() {
  const { isDark, toggleTheme } = useLandingTheme();

  return (
    <Box sx={{ width: "100%" }}>
      <ThemeSwitcher isDark={isDark} onToggle={toggleTheme} />
      {isDark ? (
        <>
          <HeroSection />
          <FeaturesSection />
          <ShowcaseSection />
          <TestimonialsSection />
          <CtaSection />
        </>
      ) : (
        <>
          <HeroSectionLight />
          <FeaturesSectionLight />
          <ShowcaseSection />
          <TestimonialsSection />
          <CtaSectionLight />
        </>
      )}
    </Box>
  );
}

export function LandingPage() {
  return <LandingPageContent />;
}
