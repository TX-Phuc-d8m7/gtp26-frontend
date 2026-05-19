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
    <Box component="section" sx={{ py: 10, px: 2, backgroundColor: "#fff" }}>
      <Box sx={{ maxWidth: 1152, mx: "auto" }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: 36,
              fontWeight: 800,
              color: "var(--foreground)",
              mb: 2,
            }}
          >
            Why Choose FoodHealth AI?
          </Typography>
          <Typography
            sx={{
              fontSize: 20,
              color: "var(--muted-foreground)",
              maxWidth: 672,
              mx: "auto",
            }}
          >
            Experience the perfect blend of nutrition science and culinary
            expertise
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
                transition: "box-shadow 180ms ease, transform 180ms ease",
                "&:hover": {
                  boxShadow: "0 20px 48px rgba(15, 23, 42, 0.12)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography sx={{ fontSize: 48, mb: 2, lineHeight: 1 }}>
                  {feature.icon}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 1.5, color: "var(--foreground)" }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ color: "var(--muted-foreground)" }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
