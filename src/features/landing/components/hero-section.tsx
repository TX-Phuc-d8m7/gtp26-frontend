import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 10,
        background: "linear-gradient(180deg, #fff 0%, #fff7ed 54%, transparent 100%)",
      }}
    >
      <Box sx={{ maxWidth: 768, mx: "auto", textAlign: "center", display: "grid", gap: 3 }}>
        <Box sx={{ display: "inline-block" }}>
          <Typography
            component="span"
            sx={{
              fontSize: 14,
              fontWeight: 700,
              color: "#ea580c",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            AI-Powered Nutrition
          </Typography>
        </Box>

        <Typography
          component="h1"
          sx={{
            fontSize: { xs: 48, md: 60 },
            fontWeight: 800,
            color: "var(--foreground)",
            lineHeight: 1.12,
          }}
        >
          Your Personal Food{" "}
          <Box component="span" sx={{ color: "#ea580c" }}>
            Health Coach
          </Box>
        </Typography>

        <Typography sx={{ fontSize: 20, color: "var(--muted-foreground)", maxWidth: 672, mx: "auto", lineHeight: 1.625 }}>
          Get personalized recipe recommendations based on your health goals, dietary preferences, and nutritional needs. Our AI understands your lifestyle and suggests meals tailored just for you.
        </Typography>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2, justifyContent: "center", pt: 2 }}>
          <Link href="/chat">
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#ea580c",
                color: "#fff",
                px: 4,
                py: 1.5,
                fontSize: 18,
                textTransform: "none",
                "&:hover": { backgroundColor: "#c2410c" },
              }}
            >
              Start Your Journey
            </Button>
          </Link>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#d1d5db",
              color: "var(--foreground)",
              px: 4,
              py: 1.5,
              fontSize: 18,
              textTransform: "none",
              "&:hover": { backgroundColor: "#f3f4f6", borderColor: "#d1d5db" },
            }}
          >
            Learn More
          </Button>
        </Box>

        <Box sx={{ pt: 4 }}>
          <Box
            sx={{
              position: "relative",
              height: { xs: 320, md: 384 },
              background: "linear-gradient(135deg, #ffedd5, #fff7ed)",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
            }}
          >
            <Box sx={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Box sx={{ textAlign: "center", display: "grid", gap: 2 }}>
                <Typography sx={{ fontSize: 60, lineHeight: 1 }}>🍽️</Typography>
                <Typography sx={{ fontSize: 18, color: "#4b5563" }}>
                  Nutritious meals, perfectly matched
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
