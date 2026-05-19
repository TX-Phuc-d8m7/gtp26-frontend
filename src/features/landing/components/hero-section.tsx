import { Box, Button, Typography, alpha, Container } from "@mui/material";
import Link from "next/link";
import { landingColors, gradients } from "../theme-colors";

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
          radial-gradient(circle at 20% 80%, ${alpha(landingColors.dark.primary, 0.08)} 0%, transparent 40%),
          radial-gradient(circle at 80% 20%, ${alpha(landingColors.dark.secondary, 0.06)} 0%, transparent 50%),
          linear-gradient(180deg, ${landingColors.dark.bg.primary} 0%, ${landingColors.dark.bg.secondary} 50%, ${landingColors.dark.bg.primary} 100%)
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
            radial-gradient(circle at 1px 1px, ${alpha(landingColors.dark.text.primary, 0.03)} 1px, transparent 1px)
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
                  color: landingColors.dark.secondary,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                AI Health Agent
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 44, sm: 52, md: 60, lg: 64 },
                fontWeight: 800,
                color: landingColors.dark.text.primary,
                lineHeight: 1.1,
              }}
            >
              Trợ Lý Sức Khoẻ{" "}
              <Box
                component="span"
                sx={{
                  background: gradients.dark.primary,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                AI
              </Box>{" "}
              Của Bạn
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 16, md: 18 },
                color: landingColors.dark.text.secondary,
                lineHeight: 1.7,
                maxWidth: 520,
              }}
            >
              Lập kế hoạch dinh dưỡng cá nhân, theo dõi tiến độ sức khỏe, và nhận lời khuyên từ AI được huấn luyện. Đạt được mục tiêu sức khỏe của bạn nhanh hơn.
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
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
                  color: "#FFF",
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: "none",
                  transition: "all 200ms ease-in-out",
                  boxShadow: `0 0 0 0 ${alpha(landingColors.dark.primary, 0.3)}`,
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
                  px: 4,
                  py: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  textTransform: "none",
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
                    color: landingColors.dark.text.primary,
                  }}
                >
                  10K+
                </Typography>
                <Typography sx={{ fontSize: 13, color: landingColors.dark.text.muted }}>
                  Người dùng
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: landingColors.dark.text.primary,
                  }}
                >
                  4.8/5
                </Typography>
                <Typography sx={{ fontSize: 13, color: landingColors.dark.text.muted }}>
                  Xếp hạng
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: landingColors.dark.text.primary,
                  }}
                >
                  24/7
                </Typography>
                <Typography sx={{ fontSize: 13, color: landingColors.dark.text.muted }}>
                  Hỗ trợ
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right column - Visual showcase */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              height: 500,
            }}
          >
            {/* Floating cards animation */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              {/* Card 1 - Meal Plan */}
              <Box
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 40,
                  width: 280,
                  borderRadius: "16px",
                  background: `linear-gradient(135deg, ${alpha(
                    landingColors.dark.bg.secondary,
                    0.6,
                  )} 0%, ${alpha(landingColors.dark.bg.tertiary, 0.5)} 100%)`,
                  border: `1px solid ${landingColors.dark.border.secondary}`,
                  backdropFilter: "blur(20px)",
                  padding: "20px",
                  boxShadow: `0 8px 32px ${alpha(landingColors.dark.shadow, 0.3)}`,
                  animation: "float1 4s ease-in-out infinite",
                  "@keyframes float1": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: landingColors.dark.secondary,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    mb: 1,
                  }}
                >
                  Kế hoạch hôm nay
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: landingColors.dark.text.primary,
                    mb: 2,
                  }}
                >
                  Gà nướng + Cơm lứt + Rau luộc
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: landingColors.dark.text.muted,
                        mb: 0.5,
                      }}
                    >
                      Protein
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: landingColors.dark.secondary }}>
                      45g
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: landingColors.dark.text.muted,
                        mb: 0.5,
                      }}
                    >
                      Calories
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: landingColors.dark.secondary }}>
                      650kcal
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Card 2 - Health Stats */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 40,
                  left: 20,
                  width: 260,
                  borderRadius: "16px",
                  background: `linear-gradient(135deg, ${alpha(
                    landingColors.dark.bg.secondary,
                    0.6,
                  )} 0%, ${alpha(landingColors.dark.bg.tertiary, 0.5)} 100%)`,
                  border: `1px solid ${landingColors.dark.border.secondary}`,
                  backdropFilter: "blur(20px)",
                  padding: "20px",
                  boxShadow: `0 8px 32px ${alpha(landingColors.dark.shadow, 0.3)}`,
                  animation: "float2 5s ease-in-out infinite",
                  "@keyframes float2": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(15px)" },
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: landingColors.dark.secondary,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                >
                  Tiến độ tuần này
                </Typography>
                <Box sx={{ display: "grid", gap: 2 }}>
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: landingColors.dark.text.secondary,
                        }}
                      >
                        Mục tiêu
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: landingColors.dark.secondary,
                          fontWeight: 600,
                        }}
                      >
                        85%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        height: 4,
                        borderRadius: "2px",
                        background: landingColors.dark.border.secondary,
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: "85%",
                          background: gradients.dark.secondary,
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        height: 4,
                        borderRadius: "2px",
                        background: alpha("#FFF7ED", 0.1),
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          height: "100%",
                          width: "85%",
                          background:
                            "linear-gradient(90deg, #FFB25C, #FF8A1F)",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Center glow effect */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${alpha(
                    landingColors.dark.primary,
                    0.15,
                  )} 0%, transparent 70%)`,
                  filter: "blur(40px)",
                  zIndex: -1,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
