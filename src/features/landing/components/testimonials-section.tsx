import { Box, Typography, alpha, Container, Rating } from "@mui/material";

const testimonials = [
  {
    name: "Minh Tuấn",
    role: "Sinh viên · Hải Châu, Đà Nẵng",
    content:
      "Mình hay phân vân không biết ăn gì mỗi sáng. App gợi ý đúng khẩu vị, lại còn chỉ quán gần ký túc xá — tiện lắm!",
    rating: 5,
  },
  {
    name: "Lan Anh",
    role: "Nhân viên văn phòng · Sơn Trà",
    content:
      "Mình bị dị ứng hải sản. Chỉ cần điền vào hồ sơ một lần, hệ thống tự lọc món phù hợp mà không cần nhắc lại.",
    rating: 5,
  },
  {
    name: "Bác Thanh Hà",
    role: "Nội trợ · Cẩm Lệ, Đà Nẵng",
    content:
      "Chồng bị tiểu đường nên tôi hay phải cân nhắc từng bữa. App gợi ý món ít đường, ít muối rất phù hợp cho gia đình tôi.",
    rating: 5,
  },
  {
    name: "Hoàng Nam",
    role: "Du khách · Đến thăm Đà Nẵng",
    content:
      "Lần đầu đến Đà Nẵng, không biết nên thử đặc sản gì. App gợi ý Mì Quảng, bánh xèo và chỉ ngay quán gần khách sạn.",
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
            Các Tình Huống Hệ Thống Hỗ Trợ Tốt
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: alpha("#FFF7ED", 0.6),
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Landing page này mô tả đúng các luồng chính đang có trong frontend
            hiện tại
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
              { value: "Multi", label: "Thread trò chuyện" },
              { value: "Food", label: "Cards gợi ý món" },
              { value: "Map", label: "Panel quán gần bạn" },
              { value: "Safe", label: "Lọc hồ sơ sức khỏe" },
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
