import { Button } from "@mui/material";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-b from-white via-orange-50 to-transparent">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-block">
          <span className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
            AI-Powered Nutrition
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
          Your Personal Food <span className="text-orange-600">Health Coach</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Get personalized recipe recommendations based on your health goals, dietary preferences, and nutritional needs. Our AI understands your lifestyle and suggests meals tailored just for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/chat">
            <Button
              variant="contained"
              size="large"
              className="!bg-orange-600 hover:!bg-orange-700 !text-white !px-8 !py-3 !text-lg"
            >
              Start Your Journey
            </Button>
          </Link>
          <Button
            variant="outlined"
            size="large"
            className="!border-gray-300 !text-foreground hover:!bg-gray-100 !px-8 !py-3 !text-lg"
          >
            Learn More
          </Button>
        </div>

        <div className="pt-8">
          <div className="relative h-80 md:h-96 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-6xl">🍽️</div>
                <p className="text-lg text-gray-600">Nutritious meals, perfectly matched</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
