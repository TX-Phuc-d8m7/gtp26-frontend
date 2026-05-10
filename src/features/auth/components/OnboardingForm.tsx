"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  onboardingSchema,
  OnboardingFormData,
  ALLERGY_OPTIONS,
  FAVORITE_OPTIONS,
  DISLIKE_OPTIONS,
} from "@/features/auth/schemas/onboarding";
import { Loader2, Check, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function OnboardingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { control, handleSubmit } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      allergies: [],
      favorites: [],
      dislikes: [],
    },
  });

  const onSubmit = async (data: OnboardingFormData) => {
    setIsLoading(true);
    try {
      // Giả lập gọi API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Onboarding Data:", data);

      toast.success("Đã lưu thông tin sở thích!");
      router.push("/");
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const MultiSelectPills = ({
    options,
    value,
    onChange,
    variant = "default",
  }: {
    options: string[];
    value: string[];
    onChange: (val: string[]) => void;
    variant?: "default" | "danger" | "success";
  }) => {
    const toggleOption = (opt: string) => {
      if (value.includes(opt)) {
        onChange(value.filter((v) => v !== opt));
      } else {
        onChange([...value, opt]);
      }
    };

    const getColors = () => {
      switch (variant) {
        case "danger":
          return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
        case "success":
          return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
        default:
          return "bg-primary/10 text-primary border-primary/20";
      }
    };

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((opt) => {
          const isSelected = value.includes(opt);
          return (
            <button
              type="button"
              key={opt}
              onClick={() => toggleOption(opt)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors flex items-center gap-1 ${
                isSelected
                  ? getColors()
                  : "bg-background text-muted-foreground border-border hover:bg-secondary"
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5" />}
              {opt}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Cá nhân hóa trải nghiệm
        </h2>
        <p className="text-muted-foreground">
          Chọn sở thích ẩm thực để chúng tôi gợi ý món ăn phù hợp nhất với bạn.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Allergies */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-foreground flex items-center gap-2">
            Dị ứng thực phẩm
            <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              Không bắt buộc
            </span>
          </label>
          <p className="text-sm text-muted-foreground">
            Chọn các nguyên liệu bạn bị dị ứng (nếu có).
          </p>
          <Controller
            name="allergies"
            control={control}
            render={({ field }) => (
              <MultiSelectPills
                options={ALLERGY_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                variant="danger"
              />
            )}
          />
        </div>

        {/* Favorites */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-foreground flex items-center gap-2">
            Món ăn yêu thích
            <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
              Nhiều lựa chọn
            </span>
          </label>
          <p className="text-sm text-muted-foreground">
            Bạn thường thích ăn những loại thức ăn nào?
          </p>
          <Controller
            name="favorites"
            control={control}
            render={({ field }) => (
              <MultiSelectPills
                options={FAVORITE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                variant="success"
              />
            )}
          />
        </div>

        {/* Dislikes */}
        <div className="space-y-2">
          <label className="text-base font-semibold text-foreground flex items-center gap-2">
            Không thích ăn
          </label>
          <p className="text-sm text-muted-foreground">
            Những nguyên liệu hoặc món bạn không bao giờ muốn ăn.
          </p>
          <Controller
            name="dislikes"
            control={control}
            render={({ field }) => (
              <MultiSelectPills
                options={DISLIKE_OPTIONS}
                value={field.value}
                onChange={field.onChange}
                variant="danger"
              />
            )}
          />
        </div>

        <div className="pt-4 border-t border-border flex gap-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-secondary hover:text-secondary-foreground h-11 border border-border"
          >
            Bỏ qua
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-[2] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                Hoàn tất & Khám phá
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
