import { HeroSection } from "./components/hero-section";
import { FeaturesSection } from "./components/features-section";
import { CtaSection } from "./components/cta-section";

export function LandingPage() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
}
