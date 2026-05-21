import { Box, Button, Typography, alpha, Container } from "@mui/material";
import Link from "next/link";

export function CtaSectionLight() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: 2,
        background: `
          radial-gradient(circle at 30% 70%, ${alpha("#F97316", 0.06)} 0%, transparent 40%),
          radial-gradient(circle at 70% 30%, ${alpha("#F97316", 0.04)} 0%, transparent 50%),
          linear-gradient(180deg, #F5F3F0 0%, #FAFAF8 100%)
        `,
        position: "relative",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gap: 4,
            textAlign: "center",
          }}
        >
          {/* Main CTA box */}
          <Box
            sx={{
              display: "grid",
              gap: 3,
              background: `linear-gradient(135deg, ${alpha(
                "#FAFAF8",
                0.6,
              )} 0%, ${alpha("#F5F3F0", 0.5)} 100%)`,
              border: `1px solid ${alpha("#27251F", 0.08)}`,
              backdropFilter: "blur(24px)",
              borderRadius: "24px",
              p: { xs: 4, md: 8 },
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: 32, md: 44 },
                fontWeight: 800,
                color: "#27251F",
              }}
            >
              Bắt Đầu Tìm Món Đà Nẵng Phù Hợp Với Bạn
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: alpha("#27251F", 0.65),
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Mở chat, nói khẩu vị hoặc tình trạng ăn uống hiện tại. Foodie
              Suggest sẽ gợi ý món, giải thích lý do và hiển thị địa điểm khi có
              dữ liệu.
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
                      "linear-gradient(135deg, #EA580C 0%, #D84315 54%, #B71C1C 100%)",
                    color: "#fff",
                    px: { xs: 3, sm: 4 },
                    py: 1.5,
                    fontSize: 16,
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 200ms ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 24px ${alpha("#EA580C", 0.25)}`,
                    },
                  }}
                >
                  Vào màn chat
                </Button>
              </Link>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                sx={{
                  borderColor: alpha("#27251F", 0.15),
                  color: "#27251F",
                  px: { xs: 3, sm: 4 },
                  py: 1.5,
                  fontSize: 16,
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
                Xem luồng tìm kiếm
              </Button>
            </Box>
          </Box>

          {/* Trust indicators */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: { xs: 2, md: 4 },
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#27251F",
                  mb: 0.5,
                }}
              >
                Chat
              </Typography>
              <Typography sx={{ fontSize: 13, color: alpha("#27251F", 0.5) }}>
                Nhiều thread
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#27251F",
                  mb: 0.5,
                }}
              >
                Food
              </Typography>
              <Typography sx={{ fontSize: 13, color: alpha("#27251F", 0.5) }}>
                Gợi ý món
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#27251F",
                  mb: 0.5,
                }}
              >
                Map
              </Typography>
              <Typography sx={{ fontSize: 13, color: alpha("#27251F", 0.5) }}>
                Quán gần bạn
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
