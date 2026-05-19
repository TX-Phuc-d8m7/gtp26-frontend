import { Box, Button, Typography, alpha } from "@mui/material";
import Link from "next/link";

export function CtaSection() {
  return (
    <Box
      component="section"
      sx={{
        py: 10,
        px: 2,
        background: `
          radial-gradient(circle at 30% 70%, ${alpha("#F97316", 0.06)} 0%, transparent 40%),
          radial-gradient(circle at 70% 30%, ${alpha("#F97316", 0.04)} 0%, transparent 50%),
          linear-gradient(180deg, #151110 0%, #0C0A09 100%)
        `,
        position: "relative",
      }}
    >
      <Box
        sx={{
          maxWidth: 768,
          mx: "auto",
          textAlign: "center",
          display: "grid",
          gap: 4,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: 2,
            background: `linear-gradient(135deg, ${alpha(
              "#1C1917",
              0.5,
            )} 0%, ${alpha("#292524", 0.4)} 100%)`,
            border: `1px solid ${alpha("#FFF7ED", 0.1)}`,
            backdropFilter: "blur(24px)",
            borderRadius: "24px",
            p: 6,
          }}
        >
          <Typography
            component="h2"
            sx={{
              fontSize: 36,
              fontWeight: 800,
              color: "#FFF7ED",
            }}
          >
            Sẵn Sàng Thay Đổi Thói Quen Ăn Uống Của Bạn?
          </Typography>
          <Typography
            sx={{
              fontSize: 18,
              color: alpha("#FFF7ED", 0.6),
            }}
          >
            Tham gia hàng ngàn người dùng đang khám phá những bữa ăn giúp họ cảm
            thấy tuyệt vời. Hãy bắt đầu trò chuyện với trợ lý sức khỏe thực phẩm
            cá nhân của bạn ngay hôm nay.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Link href="/chat" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: { xs: "100%", sm: "auto" },
                background:
                  "linear-gradient(135deg, #FFB25C 0%, #FF8A1F 54%, #F26608 100%)",
                color: "#fff",
                px: 4,
                py: 1.5,
                fontSize: 18,
                textTransform: "none",
                fontWeight: 600,
                transition: "all 200ms ease-in-out",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: `0 12px 24px ${alpha("#F97316", 0.3)}`,
                },
              }}
            >
              Bắt Đầu Miễn Phí
            </Button>
          </Link>
          <Button
            variant="outlined"
            size="large"
            sx={{
              width: { xs: "100%", sm: "auto" },
              borderColor: alpha("#FFF7ED", 0.2),
              color: "#FFF7ED",
              px: 4,
              py: 1.5,
              fontSize: 18,
              textTransform: "none",
              fontWeight: 600,
              backdropFilter: "blur(18px)",
              backgroundColor: alpha("#1C1917", 0.6),
              transition: "all 200ms ease-in-out",
              "&:hover": {
                backgroundColor: alpha("#1C1917", 0.8),
                borderColor: alpha("#FFF7ED", 0.3),
                transform: "translateY(-2px)",
              },
            }}
          >
            Xem Ví Dụ
          </Button>
        </Box>

        <Typography
          sx={{
            fontSize: 14,
            color: alpha("#FFF7ED", 0.5),
          }}
        >
          Không cần thẻ tín dụng. Bắt đầu nhận gợi ý bữa ăn được cá nhân hóa ngay
          lập tức.
        </Typography>
      </Box>
    </Box>
  );
}
