import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  type: "healthRisks" | "favorites" | "tastePreferences" | "dishTypes";
  options: Array<{ label: string; value: string; color?: string }>;
}

interface OnboardingStepsProps {
  steps: OnboardingStep[];
  onComplete: (answers: Record<string, string[]>) => void;
  isLoading?: boolean;
}

export function OnboardingStepsFlow({
  steps,
  onComplete,
  isLoading = false,
}: OnboardingStepsProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleSelect = (value: string) => {
    const currentAnswers = answers[step.id] || [];
    const newAnswers = currentAnswers.includes(value)
      ? currentAnswers.filter((v) => v !== value)
      : [...currentAnswers, value];
    setAnswers({
      ...answers,
      [step.id]: newAnswers,
    });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const selectedCount = (answers[step.id] || []).length;

  return (
    <Card sx={{ width: "100%", maxWidth: 672, mx: "auto" }}>
      <CardContent sx={{ p: 4 }}>
        {/* Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: "var(--muted-foreground)" }}
            >
              Bước {currentStep + 1}/{steps.length}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "var(--muted-foreground)" }}
            >
              {Math.round(progress)}%
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: 8,
              backgroundColor: "#e5e7eb",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #f97316, #ea580c)",
                transition: "width 500ms ease",
              }}
            />
          </Box>
        </Box>

        {/* Step Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "var(--foreground)", mb: 1.5 }}
          >
            {step.title}
          </Typography>
          <Typography sx={{ color: "var(--muted-foreground)", fontSize: 14 }}>
            {step.description}
          </Typography>
        </Box>

        {/* Step Content */}
        <Box sx={{ mb: 4, minHeight: 200 }}>
          <Box sx={{ display: "grid", gap: 1.5 }}>
            {step.options.map((option) => {
              const isSelected = (answers[step.id] || []).includes(
                option.value,
              );
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  style={{
                    width: "100%",
                    padding: 16,
                    borderRadius: 8,
                    border: `2px solid ${isSelected ? "#ea580c" : "#e5e7eb"}`,
                    backgroundColor: isSelected ? "#fff7ed" : "#ffffff",
                    textAlign: "left",
                    transition:
                      "border-color 180ms ease, background-color 180ms ease",
                    cursor: "pointer",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: 1,
                        border: `2px solid ${isSelected ? "#ea580c" : "#d1d5db"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isSelected ? "#ea580c" : "transparent",
                        transition:
                          "border-color 180ms ease, background-color 180ms ease",
                      }}
                    >
                      {isSelected && <CheckCircle size={16} color="#fff" />}
                    </Box>
                    <Box
                      component="span"
                      sx={{
                        fontWeight: 600,
                        color: isSelected ? "#ea580c" : "var(--foreground)",
                      }}
                    >
                      {option.label}
                    </Box>
                  </Box>
                </button>
              );
            })}
          </Box>
        </Box>

        {/* Selection Count */}
        {selectedCount > 0 && (
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Chip
              label={`${selectedCount} mục được chọn`}
              color="primary"
              sx={{ backgroundColor: "#ffedd5", color: "#c2410c" }}
            />
          </Box>
        )}

        {/* Navigation Buttons */}
        <Box
          sx={{ display: "flex", gap: 1.5, justifyContent: "space-between" }}
        >
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={currentStep === 0 || isLoading}
            sx={{
              borderColor: "#d1d5db",
              color: "var(--foreground)",
              textTransform: "none",
            }}
          >
            Quay lại
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={<ArrowRight size={16} />}
            disabled={isLoading}
            sx={{
              backgroundColor: "#ea580c",
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: "#c2410c" },
            }}
          >
            {isLoading
              ? "Đang xử lý..."
              : isLastStep
                ? "Hoàn thành"
                : "Tiếp tục"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
