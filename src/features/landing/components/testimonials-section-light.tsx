import { Box, Card, CardContent, Typography, alpha, Container } from "@mui/material";

const testimonials = [
  {
    name: "Nguyễn Hương",
    role: "Nhân viên văn phòng",
    avatar: "👩‍💼",
    content:
      "Tôi đã sử dụng ứng dụng này trong 3 tháng và đã giảm 8kg! AI đưa ra những gợi ý bữa ăn rất hợp lý và dễ thực hiện.",
    rating: 5,
  },
  {
    name: "Trần Minh Tuấn",
    role: "Huấn luyện viên Fitness",
    avatar: "🧑‍🏫",
    content:
      "Tuyệt vời cho khách hàng của tôi. Lúc đầu có chút hoài nghi nhưng kết quả nói lên tất cả. Rất chi tiết và chuyên nghiệp.",
    rating: 5,
  },
  {
    name: "Lê Thảo Vy",
    role: "Sinh viên",
    avatar: "👩‍🎓",
    content:
      "Giao diện dễ sử dụng, AI thực sự hiểu nhu cầu của tôi. Đã giới thiệu cho cả gia đình. Mọi người đều yêu thích!",
    rating: 5,
  },
  {
    name: "Phạm Duy Anh",
    role: "Bác sĩ",
    avatar: "👨‍⚕️",
    content:
      "Từ góc độ y tế, tôi rất ấn tượng với độ chính xác của lời khuyên. Tôi đang đề xuất cho bệnh nhân của tôi.",
    rating: 5,
  },
];

const stats = [
  { label: "Người dùng hoạt động", value: "10K+", icon: "👥" },
  { label: "Bữa ăn được lập kế hoạch", value: "2.3M+", icon: "🍽️" },
  { label: "Điểm đánh giá trung bình", value: "4.8", icon: "⭐" },
  { label: "Tỷ lệ hoàn thành mục tiêu", value: "92%", icon: "🎯" },
];

export function TestimonialsSectionLight() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: 2,
        background: `
          linear-gradient(180deg, #F5F3F0 0%, #FAFAF8 50%, #F5F3F0 100%)
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
              color: "#27251F",
              mb: 3,
            }}
          >
            Được Yêu Thích Bởi Hàng Ngàn Người
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: alpha("#27251F", 0.65),
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Đọc những câu chuyện thành công từ những người dùng thực tế
          </Typography>
        </Box>

        {/* Stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 3,
            mb: { xs: 8, md: 12 },
          }}
        >
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                p: 4,
                borderRadius: "12px",
                background: `linear-gradient(135deg, ${alpha(
                  "#FAFAF8",
                  0.5,
                )} 0%, ${alpha("#F5F3F0", 0.4)} 100%)`,
                border: `1px solid ${alpha("#27251F", 0.06)}`,
                textAlign: "center",
                display: "grid",
                gap: 1.5,
              }}
            >
              <Typography sx={{ fontSize: 32 }}>{stat.icon}</Typography>
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: "#EA580C",
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  color: alpha("#27251F", 0.6),
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Testimonials grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
            gap: 4,
          }}
        >
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              sx={{
                background: `linear-gradient(135deg, ${alpha(
                  "#FAFAF8",
                  0.6,
                )} 0%, ${alpha("#F5F3F0", 0.5)} 100%)`,
                border: `1px solid ${alpha("#27251F", 0.08)}`,
                backdropFilter: "blur(18px)",
                transition: "all 300ms ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  background: `linear-gradient(135deg, ${alpha(
                    "#FAFAF8",
                    0.8,
                  )} 0%, ${alpha("#F5F3F0", 0.7)} 100%)`,
                  borderColor: alpha("#27251F", 0.12),
                  boxShadow: `0 12px 32px ${alpha("#000000", 0.08)}`,
                },
              }}
            >
              <CardContent sx={{ p: 4, display: "grid", gap: 3 }}>
                {/* Rating */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.5,
                  }}
                >
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <Typography
                        key={i}
                        sx={{
                          fontSize: 16,
                          color: "#FFB25C",
                        }}
                      >
                        ★
                      </Typography>
                    ))}
                </Box>

                {/* Content */}
                <Typography
                  sx={{
                    fontSize: 15,
                    color: "#27251F",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}
                >
                  "{testimonial.content}"
                </Typography>

                {/* Author */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                    borderTop: `1px solid ${alpha("#27251F", 0.06)}`,
                    pt: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: alpha("#EA580C", 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}
                  >
                    {testimonial.avatar}
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#27251F",
                      }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: alpha("#27251F", 0.5),
                      }}
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
