import { Box, Card, CardContent, Button, Typography, Chip } from "@mui/material";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  type: "allergies" | "favorites" | "dislikes" | "dietary";
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
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-8">
        {/* Progress Bar */}
        <Box className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <Typography variant="caption" className="!text-muted-foreground">
              Bước {currentStep + 1}/{steps.length}
            </Typography>
            <Typography variant="caption" className="!text-muted-foreground">
              {Math.round(progress)}%
            </Typography>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </Box>

        {/* Step Header */}
        <Box className="mb-8 text-center">
          <Typography
            variant="h5"
            className="!font-bold !text-foreground !mb-3"
          >
            {step.title}
          </Typography>
          <Typography className="!text-muted-foreground !text-sm">
            {step.description}
          </Typography>
        </Box>

        {/* Step Content */}
        <Box className="mb-8 min-h-[200px]">
          <div className="space-y-3">
            {step.options.map((option) => {
              const isSelected = (answers[step.id] || []).includes(
                option.value
              );
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected
                      ? "border-orange-600 bg-orange-50"
                      : "border-gray-200 bg-white hover:border-orange-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-orange-600 border-orange-600"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span
                      className={`font-medium ${
                        isSelected
                          ? "text-orange-600"
                          : "text-foreground"
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </Box>

        {/* Selection Count */}
        {selectedCount > 0 && (
          <Box className="mb-6 text-center">
            <Chip
              label={`${selectedCount} mục được chọn`}
              color="primary"
              className="!bg-orange-100 !text-orange-700"
            />
          </Box>
        )}

        {/* Navigation Buttons */}
        <Box className="flex gap-3 justify-between">
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={currentStep === 0 || isLoading}
            className="!border-gray-300 !text-foreground"
          >
            Quay lại
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            endIcon={<ArrowRight className="w-4 h-4" />}
            disabled={isLoading}
            className="!bg-orange-600 hover:!bg-orange-700 !text-white"
          >
            {isLoading ? "Đang xử lý..." : isLastStep ? "Hoàn thành" : "Tiếp tục"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
