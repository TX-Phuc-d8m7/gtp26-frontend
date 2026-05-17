import React, { ReactNode } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  level?: "error" | "warning";
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Card
            sx={{
              border: "1px solid rgba(220, 38, 38, 0.24)",
              backgroundColor: "rgba(220, 38, 38, 0.08)",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flexShrink: 0 }}>
                  <AlertTriangle size={24} style={{ color: "#dc2626" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#7f1d1d", mb: 1 }}
                  >
                    Có lỗi xảy ra
                  </Typography>
                  <Typography sx={{ color: "#991b1b", fontSize: 14, mb: 2 }}>
                    {this.state.error?.message ||
                      "Có sự cố không mong muốn. Vui lòng thử lại."}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<RefreshCw size={16} />}
                    onClick={this.handleReset}
                    sx={{
                      backgroundColor: "#dc2626",
                      color: "#fff",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#b91c1c" },
                    }}
                  >
                    Thử lại
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        )
      );
    }

    return this.props.children;
  }
}

// Functional wrapper for error handling
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
