import { Box, Typography, Button } from "@mui/material";
import { AlertCircle, Search, Plus } from "lucide-react";

interface EmptyStateProps {
  type: "no-results" | "error" | "no-history" | "loading-failed";
  title?: string;
  description?: string;
  onRetry?: () => void;
  onStartNew?: () => void;
}

const emptyStateConfig = {
  "no-results": {
    icon: Search,
    defaultTitle: "Không tìm thấy kết quả",
    defaultDescription:
      "Hãy thử điều chỉnh tìm kiếm của bạn hoặc cung cấp thêm thông tin về sở thích.",
    color: "#2563eb",
    bg: "rgba(37, 99, 235, 0.08)",
  },
  error: {
    icon: AlertCircle,
    defaultTitle: "Có lỗi xảy ra",
    defaultDescription: "Chúng tôi gặp sự cố trong khi xử lý yêu cầu của bạn.",
    color: "#dc2626",
    bg: "rgba(220, 38, 38, 0.08)",
  },
  "no-history": {
    icon: Plus,
    defaultTitle: "Chưa có lịch sử chat",
    defaultDescription:
      "Bắt đầu một cuộc trò chuyện mới để nhận gợi ý món ăn được cá nhân hóa.",
    color: "#16a34a",
    bg: "rgba(22, 163, 74, 0.08)",
  },
  "loading-failed": {
    icon: AlertCircle,
    defaultTitle: "Không thể tải dữ liệu",
    defaultDescription: "Vui lòng kiểm tra kết nối của bạn và thử lại.",
    color: "#ea580c",
    bg: "rgba(234, 88, 12, 0.08)",
  },
};

export function EmptyState({
  type,
  title,
  description,
  onRetry,
  onStartNew,
}: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const IconComponent = config.icon;

  return (
    <Box
      sx={{
        backgroundColor: config.bg,
        borderRadius: 2,
        p: 4,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: "999px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <IconComponent size={32} style={{ color: config.color }} />
        </Box>
      </Box>

      <Typography
        variant="h6"
        sx={{ fontWeight: 700, mb: 1, color: config.color }}
      >
        {title || config.defaultTitle}
      </Typography>

      <Typography
        sx={{
          color: "var(--muted-foreground)",
          mb: 3,
          maxWidth: 448,
          mx: "auto",
        }}
      >
        {description || config.defaultDescription}
      </Typography>

      {(onRetry || onStartNew) && (
        <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap" }}>
          {onRetry && (
            <Button
              variant="outlined"
              onClick={onRetry}
              sx={{
                borderColor: "rgba(15, 23, 42, 0.16)",
                color: "var(--foreground)",
                textTransform: "none",
              }}
            >
              Thử lại
            </Button>
          )}
          {onStartNew && (
            <Button
              variant="contained"
              onClick={onStartNew}
              sx={{
                backgroundColor: "#ea580c",
                color: "#fff",
                textTransform: "none",
                "&:hover": { backgroundColor: "#c2410c" },
              }}
            >
              Bắt đầu cuộc trò chuyện mới
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}
