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
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <IconComponent
          size={20}
          style={{ color: config.color, flexShrink: 0, marginTop: 2 }}
        />
        <Box sx={{ flex: 1 }}>
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
          <Box component="ul" sx={{ display: "grid", gap: 1, m: 0, p: 0 }}>
            {items.map((item, index) => (
              <Box
                component="li"
                key={index}
                sx={{
                  display: "flex",
                  gap: 1,
                  fontSize: 14,
                  listStyle: "none",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 20,
                    height: 20,
                    borderRadius: "999px",
                    flexShrink: 0,
                    fontSize: 12,
                    fontWeight: 700,
                    backgroundColor: config.color,
                    color: "white",
                  }}
                >
                  {index + 1}
                </Box>
                <span style={{ color: config.textColor }}>{item}</span>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
