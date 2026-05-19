import { Box, Button, Typography, alpha, Container } from "@mui/material";
import Link from "next/link";
import { landingColors, gradients } from "../theme-colors";

export function CtaSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: 2,
        background: `
          radial-gradient(circle at 30% 70%, ${alpha(landingColors.dark.secondary, 0.06)} 0%, transparent 40%),
          radial-gradient(circle at 70% 30%, ${alpha(landingColors.dark.secondary, 0.04)} 0%, transparent 50%),
          linear-gradient(180deg, ${landingColors.dark.bg.secondary} 0%, ${landingColors.dark.bg.primary} 100%)
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
                landingColors.dark.bg.secondary,
                0.5,
              )} 0%, ${alpha(landingColors.dark.bg.tertiary, 0.4)} 100%)`,
              border: `1px solid ${landingColors.dark.border.secondary}`,
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
                color: landingColors.dark.text.primary,
              }}
            >
              Hãy Bắt Đầu Sống Khỏe Mạnh Ngay Hôm Nay
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: landingColors.dark.text.secondary,
                maxWidth: 600,
                mx: "auto",
              }}
            >
              Không cần thẻ tín dụng. Không cần đăng ký phức tạp. Chỉ cần 2 phút để bắt đầu nhận lời khuyên sức khỏe được tùy chỉnh.
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
              <Link href="/chat" style={{ textDecoration: "none", flex: { xs: 1, sm: "auto" } }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    background: gradients.dark.primary,
                    color: "#fff",
                    px: { xs: 3, sm: 4 },
                    py: 1.5,
                    fontSize: 16,
                    textTransform: "none",
                    fontWeight: 600,
                    transition: "all 200ms ease-in-out",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: `0 12px 24px ${alpha(landingColors.dark.primary, 0.3)}`,
                    },
                  }}
                >
                  Bắt Đầu Miễn Phí
                </Button>
              </Link>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                sx={{
                  borderColor: alpha(landingColors.dark.text.primary, 0.2),
                  color: landingColors.dark.text.primary,
                  px: { xs: 3, sm: 4 },
                  py: 1.5,
                  fontSize: 16,
                  textTransform: "none",
                  fontWeight: 600,
                  backdropFilter: "blur(18px)",
                  backgroundColor: alpha(landingColors.dark.bg.secondary, 0.6),
                  transition: "all 200ms ease-in-out",
                  "&:hover": {
                    backgroundColor: alpha(landingColors.dark.bg.secondary, 0.8),
                    borderColor: alpha(landingColors.dark.text.primary, 0.3),
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Xem Demo
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
                  color: landingColors.dark.text.primary,
                  mb: 0.5,
                }}
              >
                10K+
              </Typography>
              <Typography sx={{ fontSize: 13, color: landingColors.dark.text.muted }}>
                Người dùng
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: landingColors.dark.text.primary,
                  mb: 0.5,
                }}
              >
                95%
              </Typography>
              <Typography sx={{ fontSize: 13, color: landingColors.dark.text.muted }}>
                Hài lòng
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: landingColors.dark.text.primary,
                  mb: 0.5,
                }}
              >
                30 ngày
              </Typography>
              <Typography sx={{ fontSize: 13, color: landingColors.dark.text.muted }}>
                Hoàn tiền
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
