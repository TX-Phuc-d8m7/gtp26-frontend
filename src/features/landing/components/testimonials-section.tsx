import { Box, Typography, alpha, Container, Rating } from "@mui/material";

const testimonials = [
  {
    name: "Nguyễn Thảo",
    role: "Lập trình viên",
    content:
      "Tôi đã sử dụng ứng dụng này trong 3 tháng và đã giảm 8kg. Lời khuyên về dinh dưỡng rất chính xác và dễ theo dõi.",
    rating: 5,
  },
  {
    name: "Trần Minh",
    role: "Huấn luyện viên fitness",
    content:
      "Công cụ theo dõi macro này rất tuyệt vời. Nó giúp tôi và những khách hàng của tôi có thể đạt mục tiêu nhanh hơn.",
    rating: 5,
  },
  {
    name: "Hoàng Linh",
    role: "Quản lý dự án",
    content:
      "Giao diện dễ sử dụng và AI luôn đưa ra những gợi ý thông minh. Tôi khuyên tất cả bạn bè của tôi sử dụng nó.",
    rating: 5,
  },
  {
    name: "Phạm Hùng",
    role: "Sinh viên",
    content:
      "Nó không chỉ giúp tôi quản lý sức khỏe mà còn học được về dinh dưỡng. Rất đáng giá!",
    rating: 5,
  },
];

export function TestimonialsSection() {
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
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 32, md: 44 },
              fontWeight: 800,
              color: "#FFF7ED",
              mb: 2,
            }}
          >
            Người Dùng Yêu Thích Chúng Tôi
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: alpha("#FFF7ED", 0.6),
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Đọc những câu chuyện thực tế từ những người dùng của chúng tôi
          </Typography>
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
            <Box
              key={index}
              sx={{
                p: 4,
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${alpha(
                  "#1C1917",
                  0.5,
                )} 0%, ${alpha("#292524", 0.4)} 100%)`,
                border: `1px solid ${alpha("#FFF7ED", 0.1)}`,
                backdropFilter: "blur(18px)",
                display: "grid",
                gap: 3,
                transition: "all 300ms ease-in-out",
                "&:hover": {
                  transform: "translateY(-4px)",
                  background: `linear-gradient(135deg, ${alpha(
                    "#1C1917",
                    0.65,
                  )} 0%, ${alpha("#292524", 0.55)} 100%)`,
                  borderColor: alpha("#FFF7ED", 0.2),
                  boxShadow: `0 20px 48px ${alpha("#000000", 0.32)}`,
                },
              }}
            >
              {/* Rating */}
              <Rating
                value={testimonial.rating}
                readOnly
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "#FFB25C",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: alpha("#FFF7ED", 0.2),
                  },
                }}
              />

              {/* Content */}
              <Typography
                sx={{
                  fontSize: 15,
                  color: alpha("#FFF7ED", 0.7),
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                &quot;{testimonial.content}&quot;
              </Typography>

              {/* Author info */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#FFF7ED",
                  }}
                >
                  {testimonial.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: alpha("#FFF7ED", 0.5),
                  }}
                >
                  {testimonial.role}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Stats section */}
        <Box
          sx={{
            mt: 12,
            pt: 8,
            borderTop: `1px solid ${alpha("#FFF7ED", 0.1)}`,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: 4,
            }}
          >
            {[
              { value: "10K+", label: "Người dùng hoạt động" },
              { value: "92%", label: "Tỷ lệ hài lòng" },
              { value: "2.3M+", label: "Bữa ăn được lập kế hoạch" },
              { value: "4.8★", label: "Xếp hạng trung bình" },
            ].map((stat, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: "12px",
                  background: alpha("#1C1917", 0.3),
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 24, md: 32 },
                    fontWeight: 800,
                    color: "#FFB25C",
                    mb: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: alpha("#FFF7ED", 0.6),
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
