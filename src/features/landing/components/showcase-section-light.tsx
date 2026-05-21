import { Box, Typography, alpha, Container, Tabs, Tab } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export function ShowcaseSectionLight() {
  const [activeTab, setActiveTab] = useState(0);

  const showcaseItems = [
    {
      label: "Gợi Ý AI",
      icon: "🎯",
      title: "Nhận Gợi Ý Món Ăn Phù Hợp Với Bạn",
      description:
        "Mô tả khẩu vị, nguyên liệu có sẵn, ngân sách hoặc tình trạng sức khỏe. AI phân tích hồ sơ của bạn và gợi ý món ăn Đà Nẵng tối ưu nhất.",
      features: [
        "Gợi ý dựa trên hồ sơ cá nhân hoá",
        "Cảnh báo an toàn khi liên quan sức khỏe",
        "Giải thích lý do gợi ý minh bạch",
      ],
      image: "https://images.unsplash.com/photo-1631709497146-a239ef373cf1?w=600&h=500&q=80&auto=format&fit=crop",
      imageAlt: "Phở bò Đà Nẵng",
    },
    {
      label: "Tìm Kiếm Món",
      icon: "🔍",
      title: "Tìm Món Theo Tên, Nguyên Liệu Và Tag",
      description:
        "Tìm Mì Quảng, bún chả cá, bánh xèo hoặc lọc theo nhu cầu như ít dầu, dễ tiêu, giá rẻ — kết quả hiển thị bằng food cards đẹp mắt.",
      features: [
        "Tìm kiếm theo ngữ nghĩa và tag mềm",
        "Đặc sản Đà Nẵng phong phú",
        "Food cards với đầy đủ thông tin",
      ],
      image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&h=500&q=80&auto=format&fit=crop",
      imageAlt: "Cơm tấm Đà Nẵng",
    },
    {
      label: "Quán Gần Bạn",
      icon: "📍",
      title: "Quán Ăn Gần Vị Trí Của Bạn",
      description:
        "Mỗi gợi ý món ăn đều đi kèm danh sách các quán bán gần bạn nhất, hiển thị trên bản đồ để dễ tìm đường.",
      features: [
        "Danh sách quán gần bạn theo khoảng cách",
        "Bản đồ tích hợp dễ xem",
        "Thông tin giờ mở cửa và đánh giá",
      ],
      image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=600&h=500&q=80&auto=format&fit=crop",
      imageAlt: "Gỏi cuốn tôm thịt",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: 2,
        background: `
          linear-gradient(180deg, #FAFAF8 0%, #F5F3F0 50%, #FAFAF8 100%)
        `,
        position: "relative",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section header */}
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}>
          <Typography
            component="h2"
            sx={{
              fontSize: { xs: 36, md: 48 },
              fontWeight: 800,
              color: "#27251F",
              mb: 2,
            }}
          >
            Trải Nghiệm Tìm Món Thông Minh
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: alpha("#27251F", 0.65),
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Từ câu hỏi tự nhiên đến món ăn, lý do gợi ý và địa điểm bán gần bạn
          </Typography>
        </Box>

        {/* Tabs for showcase */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              borderBottom: `1px solid ${alpha("#27251F", 0.08)}`,
              justifyContent: "center",
              "& .MuiTabs-flexContainer": {
                justifyContent: "center",
              },
              "& .MuiTab-root": {
                color: alpha("#27251F", 0.6),
                textTransform: "none",
                fontSize: 16,
                fontWeight: 600,
                px: 3,
                py: 1.5,
                "&.Mui-selected": {
                  color: "#EA580C",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#EA580C",
              },
            }}
          >
            {showcaseItems.map((item, index) => (
              <Tab key={index} label={`${item.icon} ${item.label}`} />
            ))}
          </Tabs>

          {/* Showcase content */}
          {showcaseItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: activeTab === index ? "grid" : "none",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                gap: { xs: 4, lg: 6 },
                alignItems: "center",
              }}
            >
              {/* Left - Content */}
              <Box sx={{ display: "grid", gap: 3 }}>
                <Typography
                  sx={{
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#27251F",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    color: alpha("#27251F", 0.65),
                    lineHeight: 1.7,
                  }}
                >
                  {item.description}
                </Typography>
                <Box sx={{ display: "grid", gap: 2 }}>
                  {item.features.map((feature, fIndex) => (
                    <Box
                      key={fIndex}
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: alpha("#EA580C", 0.2),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#EA580C",
                          fontWeight: 700,
                          fontSize: 14,
                        }}
                      >
                        ✓
                      </Box>
                      <Typography
                        sx={{
                          color: "#27251F",
                          fontWeight: 500,
                        }}
                      >
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Right - Food image */}
              <Box
                sx={{
                  position: "relative",
                  height: 420,
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: `0 16px 48px ${alpha("#000000", 0.1)}`,
                }}
              >
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg,transparent 55%,rgba(0,0,0,0.3))",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(12px)",
                    px: 2,
                    py: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 18 }}>{item.icon}</Typography>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 700, color: "#27251F" }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
