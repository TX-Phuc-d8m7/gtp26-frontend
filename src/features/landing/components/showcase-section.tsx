"use client";

import { Box, Typography, alpha, Container, Tabs, Tab } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0);

  const showcaseItems = [
    {
      id: "suggest",
      label: "Gợi Ý AI",
      description: "Nhận gợi ý món ăn phù hợp với bạn",
      content: "Tôi bị đau dạ dày, sáng mai nên ăn món gì?",
      image: "https://images.unsplash.com/photo-1631709497146-a239ef373cf1?w=600&h=500&q=80&auto=format&fit=crop",
      imageAlt: "Phở bò Đà Nẵng",
    },
    {
      id: "search",
      label: "Tìm Kiếm Món",
      description: "Tìm theo tên, nguyên liệu và tag",
      content: "Mì Quảng, ít dầu, hải sản, dễ tiêu...",
      image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&h=500&q=80&auto=format&fit=crop",
      imageAlt: "Cơm tấm Đà Nẵng",
    },
    {
      id: "map",
      label: "Quán Gần Bạn",
      description: "Quán ăn gần vị trí của bạn",
      content: "Bánh xèo Bà Dưỡng · 2.1km",
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
            Trải Nghiệm Tìm Món Thông Minh
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 16, md: 18 },
              color: alpha("#FFF7ED", 0.6),
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Từ câu hỏi tự nhiên đến món ăn, lý do gợi ý và địa điểm bán gần bạn
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
                Người dùng có thể bắt đầu bằng một câu hỏi rất đời thường. Hệ
                thống sẽ trả lời ngắn gọn, hiển thị món phù hợp, lý do gợi ý và
                các quán có thể ghé.
              </Typography>
            </Box>

            {/* Feature points */}
            <Box sx={{ display: "grid", gap: 2 }}>
              {[
                "Hỗ trợ lịch sử nhiều cuộc trò chuyện",
                "Food cards có điểm phù hợp, lý do và địa điểm",
                "Có thể bật phần phân tích gợi ý để demo backend",
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

          {/* Right - Food image */}
          <Box
            sx={{
              position: "relative",
              height: { xs: 400, md: 480 },
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: `0 20px 56px ${alpha("#000000", 0.4)}`,
            }}
          >
            <Image
              src={showcaseItems[activeTab].image}
              alt={showcaseItems[activeTab].imageAlt}
              fill
              style={{ objectFit: "cover" }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.5))",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                borderRadius: "12px",
                background: `linear-gradient(135deg,${alpha("#1C1917", 0.82)},${alpha("#292524", 0.72)})`,
                backdropFilter: "blur(16px)",
                border: `1px solid ${alpha("#FFF7ED", 0.1)}`,
                px: 2.5,
                py: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  fontSize: 20,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  background: alpha("#F97316", 0.2),
                }}
              >
                {activeTab === 0 ? "🎯" : activeTab === 1 ? "🔍" : "📍"}
              </Box>
              <Box>
                <Typography sx={{ fontSize: 11, color: alpha("#FFF7ED", 0.5) }}>
                  {showcaseItems[activeTab].label}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#FFB25C" }}>
                  {showcaseItems[activeTab].imageAlt}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
