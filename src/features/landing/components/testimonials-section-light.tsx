import {
  Box,
  Card,
  CardContent,
  Typography,
  alpha,
  Container,
} from "@mui/material";

const testimonials = [
  {
    name: "Minh Tuấn",
    role: "Sinh viên · Hải Châu, Đà Nẵng",
    avatar: "🎒",
    content:
      "Mình hay phân vân không biết ăn gì mỗi sáng. App gợi ý đúng khẩu vị, lại còn chỉ quán gần ký túc xá — tiện lắm!",
    rating: 5,
  },
  {
    name: "Lan Anh",
    role: "Nhân viên văn phòng · Sơn Trà",
    avatar: "👩‍💼",
    content:
      "Mình bị dị ứng giáp xác. Chỉ cần điền vào hồ sơ một lần, hệ thống tự lọc món phù hợp mà không cần nhắc lại.",
    rating: 5,
  },
  {
    name: "Bác Thanh Hà",
    role: "Nội trợ · Cẩm Lệ, Đà Nẵng",
    avatar: "🍳",
    content:
      "Chồng bị cao huyết áp nên tôi hay phải cân nhắc từng bữa. App gợi ý món thanh đạm, ít muối rất phù hợp cho gia đình tôi.",
    rating: 5,
  },
  {
    name: "Hoàng Nam",
    role: "Du khách · Đến thăm Đà Nẵng",
    avatar: "🗺️",
    content:
      "Lần đầu đến Đà Nẵng, không biết nên thử đặc sản gì. App gợi ý Mì Quảng, bánh xèo và chỉ ngay quán gần khách sạn.",
    rating: 5,
  },
];

const stats = [
  { label: "Độ phù hợp gợi ý", value: "87%+", icon: "🎯" },
  { label: "Món đặc sản Đà Nẵng", value: "50+", icon: "🍜" },
  { label: "Quán ăn được cập nhật", value: "200+", icon: "📍" },
  { label: "Lọc hồ sơ sức khỏe", value: "Tự động", icon: "🛡️" },
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
            Người Dùng Nói Gì Về Chúng Tôi
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: alpha("#27251F", 0.65),
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Hàng nghìn người Đà Nẵng đang tin tưởng Foodie Suggest để tìm món mỗi ngày
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
