import { Box, Card, CardContent, Typography, alpha, Container } from "@mui/material";

const mainFeatures = [
  {
    icon: "📊",
    title: "Theo Dõi Dinh Dưỡng Thông Minh",
    description:
      "Tự động ghi lại thực phẩm và theo dõi macro, vitamin, chất xơ theo thời gian thực.",
    color: "#FFB25C",
  },
  {
    icon: "💪",
    title: "Lập Kế Hoạch Tập Luyện",
    description:
      "Nhận bài tập được tùy chỉnh dựa trên mục tiêu fitness và trình độ của bạn.",
    color: "#FFB25C",
  },
  {
    icon: "🏥",
    title: "Lời Khuyên Y Tế",
    description:
      "Nhận gợi ý từ AI được huấn luyện bởi các chuyên gia y tế và dinh dưỡng.",
    color: "#FFB25C",
  },
  {
    icon: "📈",
    title: "Phân Tích Sâu Sắc",
    description:
      "Xem biểu đồ chi tiết về tiến độ sức khỏe, thói quen ăn uống hàng tuần và hàng tháng.",
    color: "#FFB25C",
  },
];

export function FeaturesSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: 2,
        background: `
          linear-gradient(180deg, #0C0A09 0%, #151110 50%, #0C0A09 100%)
        `,
        position: "relative",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <Box sx={{ textAlign: "center", mb: { xs: 8, md: 10 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 36, md: 48 },
              fontWeight: 800,
              color: "#FFF7ED",
              mb: 3,
            }}
          >
            Tính Năng Nổi Bật
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: alpha("#FFF7ED", 0.6),
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Công cụ mạnh mẽ để giúp bạn đạt mục tiêu sức khỏe
          </Typography>
        </Box>

        {/* Features grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
            gap: 4,
            mb: 12,
          }}
        >
          {mainFeatures.map((feature, index) => (
            <Card
              key={index}
              sx={{
                background: `linear-gradient(135deg, ${alpha(
                  "#1C1917",
                  0.5,
                )} 0%, ${alpha("#292524", 0.4)} 100%)`,
                border: `1px solid ${alpha("#FFF7ED", 0.1)}`,
                backdropFilter: "blur(18px)",
                transition: "all 300ms ease-in-out",
                cursor: "pointer",
                height: "100%",
                "&:hover": {
                  transform: "translateY(-8px)",
                  background: `linear-gradient(135deg, ${alpha(
                    "#1C1917",
                    0.65,
                  )} 0%, ${alpha("#292524", 0.55)} 100%)`,
                  borderColor: alpha("#FFF7ED", 0.2),
                  boxShadow: `0 20px 48px ${alpha("#000000", 0.32)}, 0 0 0 2px ${alpha(
                    feature.color,
                    0.2,
                  )}`,
                },
              }}
            >
              <CardContent sx={{ p: 4, display: "grid", gap: 2 }}>
                <Typography sx={{ fontSize: 40, lineHeight: 1 }}>
                  {feature.icon}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "#FFF7ED",
                    fontSize: 18,
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ color: alpha("#FFF7ED", 0.6), fontSize: 14 }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Key benefits section */}
        <Box
          sx={{
            borderTop: `1px solid ${alpha("#FFF7ED", 0.1)}`,
            pt: { xs: 8, md: 10 },
          }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              component="h3"
              sx={{
                fontSize: { xs: 28, md: 36 },
                fontWeight: 800,
                color: "#FFF7ED",
                mb: 2,
              }}
            >
              Tại Sao Người Dùng Yêu Thích Chúng Tôi
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 4,
            }}
          >
            {[
              {
                title: "Kết Quả Thực Tế",
                description:
                  "Người dùng báo cáo cải thiện sức khỏe trong vòng 2-4 tuần.",
                stat: "92%",
              },
              {
                title: "Dễ Sử Dụng",
                description:
                  "Giao diện trực quan được thiết kế cho bất kỳ ai sử dụng.",
                stat: "4.8★",
              },
              {
                title: "Hỗ Trợ Tận Tâm",
                description:
                  "Đội hỗ trợ 24/7 sẵn sàng giúp bạn bất kỳ lúc nào.",
                stat: "24/7",
              },
            ].map((benefit, index) => (
              <Box
                key={index}
                sx={{
                  p: 4,
                  borderRadius: "16px",
                  background: `linear-gradient(135deg, ${alpha(
                    "#1C1917",
                    0.4,
                  )} 0%, ${alpha("#292524", 0.3)} 100%)`,
                  border: `1px solid ${alpha("#FFF7ED", 0.08)}`,
                  backdropFilter: "blur(12px)",
                  display: "grid",
                  gap: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 700,
                    color: "#FFB25C",
                  }}
                >
                  {benefit.stat}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#FFF7ED",
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    color: alpha("#FFF7ED", 0.6),
                  }}
                >
                  {benefit.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
