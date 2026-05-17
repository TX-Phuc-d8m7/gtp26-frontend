import { ReactNode } from "react";
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
          <Card className="!border-red-200 !bg-red-50">
            <CardContent className="p-6">
              <Box className="flex gap-4">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <Typography variant="h6" className="!font-bold !text-red-900 !mb-2">
                    Có lỗi xảy ra
                  </Typography>
                  <Typography className="!text-red-800 !text-sm !mb-4">
                    {this.state.error?.message ||
                      "Có sự cố không mong muốn. Vui lòng thử lại."}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<RefreshCw className="w-4 h-4" />}
                    onClick={this.handleReset}
                    className="!bg-red-600 hover:!bg-red-700 !text-white"
                  >
                    Thử lại
                  </Button>
                </div>
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
  fallback?: ReactNode
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
