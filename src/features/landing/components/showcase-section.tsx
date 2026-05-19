"use client";

import { Box, Typography, alpha, Container, Tabs, Tab } from "@mui/material";
import { useState } from "react";

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);

  const showcaseItems = [
    {
      id: "chat",
      label: "AI Chat Interface",
      description: "Trò chuyện tự nhiên với AI trợ lý sức khỏe của bạn",
      content: "Nói cho tôi biết về mục tiêu sức khỏe của bạn...",
    },
    {
      id: "nutrition",
      label: "Nutrition Tracking",
      description: "Theo dõi dinh dưỡng hàng ngày tự động",
      content: "Chia sẻ những gì bạn ăn và chúng tôi sẽ phân tích...",
    },
    {
      id: "analytics",
      label: "Health Analytics",
      description: "Xem biểu đồ chi tiết về tiến độ sức khỏe",
      content: "Dữ liệu được cập nhật theo thời gian thực...",
    },
  ];

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
            Giao Diện Hiện Đại & Trực Quan
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: alpha("#FFF7ED", 0.6),
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Thiết kế được tối ưu hóa cho trải nghiệm người dùng tốt nhất
          </Typography>
        </Box>

        {/* Tab navigation */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 6,
            borderBottom: `1px solid ${alpha("#FFF7ED", 0.1)}`,
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            sx={{
              "& .MuiTabs-indicator": {
                background:
                  "linear-gradient(135deg, #FFB25C 0%, #FF8A1F 54%, #F26608 100%)",
              },
            }}
          >
            {showcaseItems.map((item, index) => (
              <Tab
                key={item.id}
                label={item.label}
                sx={{
                  color: alpha("#FFF7ED", 0.5),
                  textTransform: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  "&.Mui-selected": {
                    color: "#FFF7ED",
                  },
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Showcase content */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 6,
            alignItems: "center",
          }}
        >
          {/* Left - Info */}
          <Box sx={{ display: "grid", gap: 3 }}>
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  color: "#FB923C",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  mb: 2,
                }}
              >
                {showcaseItems[activeTab].label}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 28, md: 36 },
                  fontWeight: 800,
                  color: "#FFF7ED",
                  mb: 2,
                }}
              >
                {showcaseItems[activeTab].description}
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  color: alpha("#FFF7ED", 0.6),
                  lineHeight: 1.7,
                }}
              >
                Trải nghiệm mình sẽ mất từ 2-3 phút. Chỉ cần nhập thông tin cơ bản về bạn và bắt đầu nhận lời khuyên được tùy chỉnh.
              </Typography>
            </Box>

            {/* Feature points */}
            <Box sx={{ display: "grid", gap: 2 }}>
              {[
                "Giao diện thân thiện, dễ sử dụng",
                "Được tối ưu hóa cho mobile và desktop",
                "Cập nhật dữ liệu theo thời gian thực",
              ].map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 20,
                      color: "#FFB25C",
                      mt: 0.5,
                    }}
                  >
                    ✓
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 16,
                      color: alpha("#FFF7ED", 0.7),
                    }}
                  >
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right - Visual mockup */}
          <Box
            sx={{
              position: "relative",
              height: { xs: 400, md: 500 },
              borderRadius: "20px",
              overflow: "hidden",
              background: `linear-gradient(135deg, ${alpha(
                "#1C1917",
                0.5,
              )} 0%, ${alpha("#292524", 0.4)} 100%)`,
              border: `1px solid ${alpha("#FFF7ED", 0.1)}`,
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 20px 48px ${alpha("#000000", 0.3)}`,
            }}
          >
            {/* Mockup content */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
                gap: 3,
              }}
            >
              {activeTab === 0 && (
                // Chat interface
                <Box sx={{ width: "100%" }}>
                  <Typography
                    sx={{
                      fontSize: 48,
                      textAlign: "center",
                      mb: 3,
                    }}
                  >
                    💬
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 18,
                      color: "#FFB25C",
                      fontWeight: 600,
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    AI Assistant
                  </Typography>
                  <Box
                    sx={{
                      background: alpha("#1C1917", 0.8),
                      border: `1px solid ${alpha("#FFF7ED", 0.15)}`,
                      borderRadius: "12px",
                      p: 3,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 14,
                        color: alpha("#FFF7ED", 0.7),
                      }}
                    >
                      &quot;Dựa trên lịch sử của bạn, tôi khuyên bạn nên thêm nhiều protein hơn vào bữa tối...&quot;
                    </Typography>
                  </Box>
                </Box>
              )}

              {activeTab === 1 && (
                // Nutrition tracking
                <Box sx={{ width: "100%" }}>
                  <Typography
                    sx={{
                      fontSize: 48,
                      textAlign: "center",
                      mb: 3,
                    }}
                  >
                    📊
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 18,
                      color: "#FFB25C",
                      fontWeight: 600,
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    Nutrition Today
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: alpha("#FFF7ED", 0.5),
                          mb: 1,
                        }}
                      >
                        Protein
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#FFB25C",
                        }}
                      >
                        45g / 50g
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: alpha("#FFF7ED", 0.5),
                          mb: 1,
                        }}
                      >
                        Calories
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#FFB25C",
                        }}
                      >
                        1800 / 2000
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}

              {activeTab === 2 && (
                // Analytics
                <Box sx={{ width: "100%" }}>
                  <Typography
                    sx={{
                      fontSize: 48,
                      textAlign: "center",
                      mb: 3,
                    }}
                  >
                    📈
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 18,
                      color: "#FFB25C",
                      fontWeight: 600,
                      textAlign: "center",
                      mb: 2,
                    }}
                  >
                    Weekly Progress
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 2,
                      height: 100,
                      justifyContent: "space-around",
                    }}
                  >
                    {[40, 65, 50, 75, 85, 90, 88].map((height, i) => (
                      <Box
                        key={i}
                        sx={{
                          flex: 1,
                          height: `${height}%`,
                          background: `linear-gradient(180deg, #FFB25C 0%, #FF8A1F 100%)`,
                          borderRadius: "4px",
                          opacity: 0.8,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
