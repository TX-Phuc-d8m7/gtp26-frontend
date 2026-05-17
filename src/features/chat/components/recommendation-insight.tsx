import { Box, Alert, Typography } from "@mui/material";
import { Lightbulb, CheckCircle, AlertCircle } from "lucide-react";

interface RecommendationInsightProps {
  title?: string;
  items: string[];
  type?: "info" | "success" | "warning";
}

const typeConfig = {
  info: {
    icon: Lightbulb,
    bg: "rgba(59, 130, 246, 0.1)",
    border: "rgba(59, 130, 246, 0.3)",
    color: "#3b82f6",
    textColor: "#1e40af",
  },
  success: {
    icon: CheckCircle,
    bg: "rgba(34, 197, 94, 0.1)",
    border: "rgba(34, 197, 94, 0.3)",
    color: "#22c55e",
    textColor: "#166534",
  },
  warning: {
    icon: AlertCircle,
    bg: "rgba(251, 146, 60, 0.1)",
    border: "rgba(251, 146, 60, 0.3)",
    color: "#fb923c",
    textColor: "#92400e",
  },
};

export function RecommendationInsight({
  title = "Tại sao lại gợi ý món này?",
  items,
  type = "info",
}: RecommendationInsightProps) {
  const config = typeConfig[type];
  const IconComponent = config.icon;

  if (!items || items.length === 0) return null;

  return (
    <Box
      sx={{
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: "8px",
        padding: "12px 16px",
        marginBottom: "16px",
      }}
    >
      <div className="flex gap-3">
        <IconComponent
          className="w-5 h-5 flex-shrink-0 mt-0.5"
          style={{ color: config.color }}
        />
        <div className="flex-1">
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: config.textColor,
              marginBottom: "8px",
            }}
          >
            {title}
          </Typography>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex gap-2 text-sm">
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 text-xs font-semibold"
                  style={{
                    backgroundColor: config.color,
                    color: "white",
                  }}
                >
                  {index + 1}
                </span>
                <span style={{ color: config.textColor }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Box>
  );
}
