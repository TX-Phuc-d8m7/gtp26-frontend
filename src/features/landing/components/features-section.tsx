import { Box, Card, CardContent, Typography } from "@mui/material";

const features = [
  {
    icon: "🎯",
    title: "Personalized Recommendations",
    description:
      "AI learns your preferences and suggests recipes perfectly matched to your health goals and dietary needs.",
  },
  {
    icon: "⚡",
    title: "Instant Answers",
    description:
      "Chat with our AI to get recipe suggestions, cooking tips, and nutrition advice in real-time.",
  },
  {
    icon: "❤️",
    title: "Health-Focused",
    description:
      "Every recommendation considers your wellness goals—whether it's weight loss, muscle gain, or managing health conditions.",
  },
  {
    icon: "👨‍🍳",
    title: "Easy to Cook",
    description:
      "From quick 15-minute meals to elaborate feasts, find recipes that match your cooking skill and available time.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose FoodHealth AI?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of nutrition science and culinary expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="!shadow-soft hover:!shadow-elevated transition-shadow"
            >
              <CardContent className="p-8">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <Typography variant="h6" className="font-semibold mb-3 !text-foreground">
                  {feature.title}
                </Typography>
                <Typography className="!text-muted-foreground">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
