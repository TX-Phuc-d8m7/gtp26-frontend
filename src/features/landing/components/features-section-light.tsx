import { Box, Card, CardContent, Typography, alpha } from "@mui/material";

const features = [
  {
    icon: "🎯",
    title: "Gợi Ý Được Cá Nhân Hóa",
    description:
      "AI tìm hiểu sở thích của bạn và gợi ý công thức nấu ăn hoàn hảo phù hợp với mục tiêu sức khỏe và nhu cầu dinh dưỡng.",
  },
  {
    icon: "⚡",
    title: "Trả Lời Tức Thì",
    description:
      "Chat với AI của chúng tôi để nhận gợi ý công thức nấu ăn, mẹo nấu ăn và lời khuyên dinh dưỡng theo thời gian thực.",
  },
  {
    icon: "❤️",
    title: "Tập Trung Vào Sức Khỏe",
    description:
      "Mỗi gợi ý đều xem xét mục tiêu wellness của bạn—dù là giảm cân, tăng cơ hay kiểm soát các tình trạng sức khỏe.",
  },
  {
    icon: "👨‍🍳",
    title: "Dễ Nấu",
    description:
      "Từ những bữa ăn 15 phút nhanh gọn đến những bữa ăn hoành tráng, tìm công thức phù hợp với kỹ năng nấu ăn của bạn.",
  },
];

export function FeaturesSectionLight() {
  return (
    <Box
      component="section"
      sx={{
        py: 10,
        px: 2,
        background: `
          linear-gradient(180deg, #F5F3F0 0%, #FAFAF8 50%, #F5F3F0 100%)
        `,
        position: "relative",
      }}
    >
      <Box sx={{ maxWidth: 1152, mx: "auto", position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: 36,
              fontWeight: 800,
              color: "#27251F",
              mb: 2,
            }}
          >
            Tại Sao Chọn FoodHealth AI?
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              color: alpha("#27251F", 0.65),
              maxWidth: 672,
              mx: "auto",
            }}
          >
            Trải nghiệm sự kết hợp hoàn hảo giữa khoa học dinh dưỡng và chuyên
            môn ẩm thực
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
                background: `linear-gradient(135deg, ${alpha(
                  "#FAFAF8",
                  0.6,
                )} 0%, ${alpha("#F5F3F0", 0.5)} 100%)`,
                border: `1px solid ${alpha("#27251F", 0.08)}`,
                backdropFilter: "blur(18px)",
                transition: "all 200ms ease-in-out",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  background: `linear-gradient(135deg, ${alpha(
                    "#FAFAF8",
                    0.8,
                  )} 0%, ${alpha("#F5F3F0", 0.7)} 100%)`,
                  borderColor: alpha("#27251F", 0.12),
                  boxShadow: `0 20px 48px ${alpha("#000000", 0.06)}`,
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography sx={{ fontSize: 48, mb: 2, lineHeight: 1 }}>
                  {feature.icon}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                    color: "#27251F",
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography sx={{ color: alpha("#27251F", 0.65) }}>
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
