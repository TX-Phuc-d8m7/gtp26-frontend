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
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  error: {
    icon: AlertCircle,
    defaultTitle: "Có lỗi xảy ra",
    defaultDescription: "Chúng tôi gặp sự cố trong khi xử lý yêu cầu của bạn.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  "no-history": {
    icon: Plus,
    defaultTitle: "Chưa có lịch sử chat",
    defaultDescription:
      "Bắt đầu một cuộc trò chuyện mới để nhận gợi ý món ăn được cá nhân hóa.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  "loading-failed": {
    icon: AlertCircle,
    defaultTitle: "Không thể tải dữ liệu",
    defaultDescription: "Vui lòng kiểm tra kết nối của bạn và thử lại.",
    color: "text-orange-600",
    bg: "bg-orange-50",
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
    <Box className={`${config.bg} rounded-lg p-8 text-center`}>
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-white/50">
          <IconComponent className={`w-8 h-8 ${config.color}`} />
        </div>
      </div>

      <Typography
        variant="h6"
        className={`!font-bold !mb-2 ${config.color.replace(
          "text-",
          "!text-"
        )}`}
      >
        {title || config.defaultTitle}
      </Typography>

      <Typography className="!text-muted-foreground !mb-6 max-w-md mx-auto">
        {description || config.defaultDescription}
      </Typography>

      {(onRetry || onStartNew) && (
        <div className="flex gap-3 justify-center flex-wrap">
          {onRetry && (
            <Button
              variant="outlined"
              onClick={onRetry}
              className="!border-gray-300 !text-foreground"
            >
              Thử lại
            </Button>
          )}
          {onStartNew && (
            <Button
              variant="contained"
              onClick={onStartNew}
              className="!bg-orange-600 hover:!bg-orange-700"
            >
              Bắt đầu cuộc trò chuyện mới
            </Button>
          )}
        </div>
      )}
    </Box>
  );
}
