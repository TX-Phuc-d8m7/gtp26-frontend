import { Box, Typography, alpha, Container, Tabs, Tab } from "@mui/material";
import { useState } from "react";

export function ShowcaseSectionLight() {
  const [activeTab, setActiveTab] = useState(0);

  const showcaseItems = [
    {
      label: "AI Chat Assistant",
      icon: "💬",
      title: "Trò Chuyện Thông Minh Với AI",
      description:
        "Đặt câu hỏi về dinh dưỡng, sức khỏe, công thức nấu ăn. AI sẽ đưa ra lời khuyên cá nhân hóa dựa trên hồ sơ của bạn.",
      features: [
        "Phản hồi tức thì 24/7",
        "Hiểu được ngữ cảnh cá nhân",
        "Gợi ý dựa trên khoa học",
      ],
    },
    {
      label: "Nutrition Tracking",
      icon: "📱",
      title: "Theo Dõi Dinh Dưỡng Dễ Dàng",
      description:
        "Quét mã vạch hoặc tìm kiếm thực phẩm để ghi lại một cách nhanh chóng. Theo dõi tất cả chỉ số dinh dưỡng của bạn.",
      features: [
        "Cơ sở dữ liệu 500K+ thực phẩm",
        "Ghi lại nhanh bằng barcode",
        "Phân tích macro thực tế",
      ],
    },
    {
      label: "Health Analytics",
      icon: "📊",
      title: "Phân Tích Sức Khỏe Chi Tiết",
      description:
        "Xem biểu đồ tương tác về lịch sử sức khỏe, xu hướng, và thành tích hàng tháng.",
      features: [
        "Biểu đồ xu hướng hàng ngày",
        "So sánh tuần/tháng/năm",
        "Báo cáo sức khỏe toàn diện",
      ],
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
            Giao Diện Được Thiết Kế Cho Sức Khỏe
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: alpha("#27251F", 0.65),
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Công cụ mạnh mẽ nhưng đơn giản để sử dụng hàng ngày
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
              <Tab
                key={index}
                label={`${item.icon} ${item.label}`}
              />
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

              {/* Right - Visual showcase */}
              <Box
                sx={{
                  position: "relative",
                  height: 400,
                  borderRadius: "16px",
                  background: `linear-gradient(135deg, ${alpha(
                    "#FAFAF8",
                    0.6,
                  )} 0%, ${alpha("#F5F3F0", 0.5)} 100%)`,
                  border: `1px solid ${alpha("#27251F", 0.08)}`,
                  backdropFilter: "blur(20px)",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    display: "grid",
                    gap: 2,
                  }}
                >
                  <Typography sx={{ fontSize: 80, lineHeight: 1 }}>
                    {item.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 16,
                      color: alpha("#27251F", 0.6),
                      fontWeight: 500,
                    }}
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
