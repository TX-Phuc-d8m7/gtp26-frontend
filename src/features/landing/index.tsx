import { Box } from "@mui/material";

import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { CtaSection } from "./components/cta-section";

export function LandingPage() {
  return (
    <Box sx={{ width: "100%" }}>
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </Box>
  );
}
