import { Box, Button, Typography, alpha } from "@mui/material";
import Link from "next/link";

export function HeroSectionLight() {
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
        background: `
          radial-gradient(circle at 20% 80%, ${alpha("#F97316", 0.08)} 0%, transparent 40%),
          radial-gradient(circle at 80% 20%, ${alpha("#F97316", 0.04)} 0%, transparent 50%),
          linear-gradient(180deg, #FAFAF8 0%, #F5F3F0 50%, #FAFAF8 100%)
        `,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle animated background pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 1px 1px, ${alpha("#27251F", 0.02)} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          maxWidth: 768,
          mx: "auto",
          textAlign: "center",
          display: "grid",
          gap: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box sx={{ display: "inline-block", mx: "auto" }}>
          <Typography
            component="span"
            sx={{
              fontSize: 14,
              fontWeight: 700,
              color: "#EA580C",
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
            color: "#27251F",
            lineHeight: 1.12,
          }}
        >
          Your Personal Food{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(135deg, #EA580C 0%, #D84315 54%, #B71C1C 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Health Coach
          </Box>
        </Typography>

        <Typography
          sx={{
            fontSize: 18,
            color: alpha("#27251F", 0.65),
            maxWidth: 672,
            mx: "auto",
            lineHeight: 1.7,
          }}
        >
          Nhận gợi ý công thức nấu ăn được cá nhân hóa dựa trên mục tiêu sức
          khỏe, sở thích ăn uống và nhu cầu dinh dưỡng của bạn. AI của chúng
          tôi hiểu lối sống của bạn và gợi ý những bữa ăn được tùy chỉnh riêng
          cho bạn.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
            pt: 2,
          }}
        >
          <Link href="/chat" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background:
                  "linear-gradient(135deg, #EA580C 0%, #D84315 54%, #B71C1C 100%)",
                color: "#FFF",
                px: 4,
                py: 1.5,
                fontSize: 18,
                textTransform: "none",
                fontWeight: 600,
                transition: "all 200ms ease-in-out",
                boxShadow: `0 0 0 0 ${alpha("#EA580C", 0.3)}`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 24px ${alpha("#EA580C", 0.25)}`,
                },
                "&:active": {
                  transform: "translateY(0)",
                },
              }}
            >
              Bắt Đầu Hành Trình
            </Button>
          </Link>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: alpha("#27251F", 0.15),
              color: "#27251F",
              px: 4,
              py: 1.5,
              fontSize: 18,
              textTransform: "none",
              fontWeight: 600,
              backdropFilter: "blur(18px)",
              backgroundColor: alpha("#FAFAF8", 0.7),
              transition: "all 200ms ease-in-out",
              "&:hover": {
                backgroundColor: alpha("#FAFAF8", 0.95),
                borderColor: alpha("#27251F", 0.25),
                transform: "translateY(-2px)",
              },
            }}
          >
            Tìm Hiểu Thêm
          </Button>
        </Box>

        <Box sx={{ pt: 6 }}>
          <Box
            sx={{
              position: "relative",
              height: { xs: 320, md: 384 },
              borderRadius: 4,
              overflow: "hidden",
              background: `
                linear-gradient(135deg, ${alpha("#F5F3F0", 0.8)} 0%, ${alpha(
                  "#FAFAF8",
                  0.6,
                )} 100%)
              `,
              border: `1px solid ${alpha("#27251F", 0.08)}`,
              backdropFilter: "blur(24px)",
              boxShadow: `0 20px 48px ${alpha("#000000", 0.08)}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ textAlign: "center", display: "grid", gap: 3 }}>
              <Typography sx={{ fontSize: 64, lineHeight: 1 }}>🍽️</Typography>
              <Typography
                sx={{
                  fontSize: 18,
                  color: alpha("#27251F", 0.7),
                  fontWeight: 500,
                }}
              >
                Những bữa ăn bổ dưỡng, hoàn hảo phù hợp
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
