import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export function CtaSection() {
  return (
    <Box
      component="section"
      sx={{
        py: 10,
        px: 2,
        background: "linear-gradient(90deg, #fff7ed, #fff, #f0fdf4)",
      }}
    >
      <Box
        sx={{
          maxWidth: 768,
          mx: "auto",
          textAlign: "center",
          display: "grid",
          gap: 4,
        }}
      >
        <Box sx={{ display: "grid", gap: 2 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: 36,
              fontWeight: 800,
              color: "var(--foreground)",
            }}
          >
            Ready to Transform Your Eating Habits?
          </Typography>
          <Typography sx={{ fontSize: 20, color: "var(--muted-foreground)" }}>
            Join thousands of users discovering meals that make them feel
            amazing. Start chatting with your personal food health coach today.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Link href="/chat">
            <Button
              variant="contained"
              size="large"
              sx={{
                width: { xs: "100%", sm: "auto" },
                backgroundColor: "#ea580c",
                color: "#fff",
                px: 4,
                py: 1.5,
                fontSize: 18,
                textTransform: "none",
                "&:hover": { backgroundColor: "#c2410c" },
              }}
            >
              Get Started Free
            </Button>
          </Link>
          <Button
            variant="outlined"
            size="large"
            sx={{
              width: { xs: "100%", sm: "auto" },
              borderColor: "#ea580c",
              color: "#ea580c",
              px: 4,
              py: 1.5,
              fontSize: 18,
              textTransform: "none",
              "&:hover": { backgroundColor: "#fff7ed", borderColor: "#ea580c" },
            }}
          >
            View Examples
          </Button>
        </Box>

        <Typography sx={{ fontSize: 14, color: "var(--muted-foreground)" }}>
          No credit card required. Start getting personalized meal suggestions
          instantly.
        </Typography>
      </Box>
    </Box>
  );
}
