import { Box, Button, Typography, alpha, Container } from "@mui/material";
import Image from "next/image";
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
        py: { xs: 8, md: 10 },
        background: `
          radial-gradient(circle at 20% 80%, ${alpha("#F97316", 0.08)} 0%, transparent 40%),
          radial-gradient(circle at 80% 20%, ${alpha("#F97316", 0.06)} 0%, transparent 50%),
          linear-gradient(180deg, #0C0A09 0%, #151110 50%, #0C0A09 100%)
        `,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 1px 1px, ${alpha("#FFF7ED", 0.03)} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 4, lg: 6 },
            alignItems: "center",
          }}
        >
          {/* Left column - Content */}
          <Box sx={{ display: "grid", gap: 3 }}>
            <Box sx={{ display: "inline-block", width: "fit-content" }}>
              <Typography
                component="span"
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#FB923C",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                AI Food Assistant Đà Nẵng
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 44, sm: 52, md: 60, lg: 64 },
                fontWeight: 800,
                color: "#FFF7ED",
                lineHeight: 1.1,
              }}
            >
              Hôm Nay Bạn{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg, #FFB25C 0%, #FF8A1F 54%, #F26608 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Ăn Gì
              </Box>{" "}
              Ở Đà Nẵng?
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: alpha("#FFF7ED", 0.6),
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              Foodie Suggest giúp bạn trò chuyện tự nhiên để tìm món ăn phù hợp
              với khẩu vị, ngân sách, dị ứng, bệnh lý nền và địa điểm quanh bạn.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                pt: 2,
              }}
            >
              <Link
                href="/chat"
                style={{ textDecoration: "none", display: "block" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    background:
                      "linear-gradient(135deg, #FFB25C 0%, #FF8A1F 54%, #F26608 100%)",
                    color: "#FFF",
                    px: 4,
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: 600,
                    textTransform: "none",
                    transition: "all 200ms ease-in-out",
                    boxShadow: `0 0 0 0 ${alpha("#F97316", 0.3)}`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 24px ${alpha("#F97316", 0.3)}`,
                    },
                  }}
                >
                  Bắt đầu hỏi món
                </Button>
              </Link>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                sx={{
                  borderColor: alpha("#FFF7ED", 0.2),
                  color: "#FFF7ED",
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: "none",
                  backdropFilter: "blur(18px)",
                  backgroundColor: alpha("#1C1917", 0.6),
                  transition: "all 200ms ease-in-out",
                  "&:hover": {
                    backgroundColor: alpha("#1C1917", 0.8),
                    borderColor: alpha("#FFF7ED", 0.3),
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Khám phá món ăn
              </Button>
            </Box>

            {/* Trust indicators */}
            <Box
              sx={{
                display: "flex",
                gap: 3,
                pt: 2,
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#FFF7ED",
                  }}
                >
                  5+
                </Typography>
                <Typography sx={{ fontSize: 13, color: alpha("#FFF7ED", 0.5) }}>
                  Món gợi ý mỗi lượt
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#FFF7ED",
                  }}
                >
                  Hồ sơ
                </Typography>
                <Typography sx={{ fontSize: 13, color: alpha("#FFF7ED", 0.5) }}>
                  Cá nhân hoá
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#FFF7ED",
                  }}
                >
                  Địa điểm
                </Typography>
                <Typography sx={{ fontSize: 13, color: alpha("#FFF7ED", 0.5) }}>
                  Quán gần bạn
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right column - Food image collage */}
          <Box
            sx={{
              display: { xs: "none", lg: "block" },
              position: "relative",
              height: 540,
            }}
          >
            {/* Main large food image */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "73%",
                height: "76%",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: `0 24px 64px ${alpha("#000000", 0.4)}`,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=700&h=560&q=85&auto=format&fit=crop"
                alt="Phở bò Việt Nam"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.35))",
                }}
              />
            </Box>

            {/* Secondary image — bottom left */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "54%",
                height: "52%",
                borderRadius: "20px",
                overflow: "hidden",
                border: `4px solid #1C1917`,
                boxShadow: `0 12px 40px ${alpha("#000000", 0.4)}`,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1597345637412-9fd611e758f3?w=500&h=380&q=80&auto=format&fit=crop"
                alt="Ẩm thực Đà Nẵng"
                fill
                style={{ objectFit: "cover" }}
              />
            </Box>

            {/* Floating badge — match score */}
            <Box
              sx={{
                position: "absolute",
                bottom: "36%",
                right: "-4%",
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${alpha("#1C1917", 0.75)}, ${alpha("#292524", 0.65)})`,
                backdropFilter: "blur(20px)",
                border: `1px solid ${alpha("#FFF7ED", 0.1)}`,
                boxShadow: `0 8px 32px ${alpha("#000000", 0.3)}`,
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: 200,
                animation: "floatA 4s ease-in-out infinite",
                "@keyframes floatA": {
                  "0%,100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "10px",
                  background: alpha("#F97316", 0.2),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                🎯
              </Box>
              <Box>
                <Typography sx={{ fontSize: 11, color: alpha("#FFF7ED", 0.5) }}>
                  Độ phù hợp
                </Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#FFB25C" }}>
                  87% với bạn
                </Typography>
              </Box>
            </Box>

            {/* Floating badge — location */}
            <Box
              sx={{
                position: "absolute",
                top: "6%",
                right: "-2%",
                borderRadius: "14px",
                background: `linear-gradient(135deg, ${alpha("#1C1917", 0.75)}, ${alpha("#292524", 0.65)})`,
                backdropFilter: "blur(20px)",
                border: `1px solid ${alpha("#FFF7ED", 0.1)}`,
                boxShadow: `0 8px 24px ${alpha("#000000", 0.3)}`,
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                animation: "floatB 5s ease-in-out infinite",
                "@keyframes floatB": {
                  "0%,100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(8px)" },
                },
              }}
            >
              <Typography sx={{ fontSize: 20 }}>📍</Typography>
              <Box>
                <Typography sx={{ fontSize: 11, color: alpha("#FFF7ED", 0.5) }}>
                  Quán gần bạn
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#FFF7ED" }}>
                  Hải Châu, Đà Nẵng
                </Typography>
              </Box>
            </Box>

            {/* Dot grid decoration */}
            <Box
              sx={{
                position: "absolute",
                bottom: "10%",
                right: "8%",
                width: 80,
                height: 80,
                opacity: 0.12,
                backgroundImage: `radial-gradient(circle, #F97316 1.5px, transparent 1.5px)`,
                backgroundSize: "10px 10px",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
