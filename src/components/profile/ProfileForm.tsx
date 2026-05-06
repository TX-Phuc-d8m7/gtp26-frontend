"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ALLERGY_OPTIONS, FAVORITE_OPTIONS, DISLIKE_OPTIONS } from "@/schemas/onboarding";
import { Loader2, Check, User, Mail, Lock, ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Schema cho Profile (Gộp thông tin cá nhân và sở thích)
const profileSchema = z.object({
  fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().min(1, "Email không được để trống").email("Email không đúng định dạng"),
  password: z.string().optional(),
  allergies: z.array(z.string()).default([]),
  favorites: z.array(z.string()).default([]),
  dislikes: z.array(z.string()).default([]),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "Người dùng Khách",
      email: "user@example.com",
      password: "",
      allergies: ["Sữa"],
      favorites: ["Phở", "Trà sữa"],
      dislikes: ["Hành lá"],
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // Giả lập gọi API cập nhật profile
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Updated Profile Data:", data);
      
      toast.success("Cập nhật thông tin thành công!");
    } catch (error) {
      toast.error("Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const MultiSelectPills = ({ 
    options, 
    value, 
    onChange,
    variant = "default" 
  }: { 
    options: string[], 
    value: string[], 
    onChange: (val: string[]) => void,
    variant?: "default" | "danger" | "success" 
  }) => {
    const toggleOption = (opt: string) => {
      if (value.includes(opt)) {
        onChange(value.filter(v => v !== opt));
      } else {
        onChange([...value, opt]);
      }
    };

    const getColors = () => {
      switch (variant) {
        case "danger": return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
        case "success": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
        default: return "bg-primary/10 text-primary border-primary/20";
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
    <div className="w-full max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-lg mt-8">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
        <button 
          onClick={() => router.push("/")}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Hồ sơ cá nhân</h2>
          <p className="text-muted-foreground">Quản lý thông tin và thiết lập sở thích ẩm thực</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        
        {/* Account Info Section */}
        <section>
          <h3 className="text-lg font-semibold text-foreground mb-4">Thông tin cơ bản</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Họ và tên</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.fullName ? "border-red-500" : "border-input"}`}
                  {...register("fullName")}
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${errors.email ? "border-red-500" : "border-input"}`}
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-foreground flex justify-between">
                <span>Đổi mật khẩu mới</span>
                <span className="text-xs text-muted-foreground font-normal">Bỏ trống nếu không đổi</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border-input"
                  {...register("password")}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground mb-1">Sở thích ẩm thực</h3>
          <p className="text-sm text-muted-foreground mb-6">Chatbot sẽ dựa vào thông tin này để gọi ý món ăn phù hợp với bạn.</p>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Dị ứng thực phẩm</label>
              <Controller
                name="allergies"
                control={control}
                render={({ field }) => (
                  <MultiSelectPills options={ALLERGY_OPTIONS} value={field.value} onChange={field.onChange} variant="danger" />
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Món ăn yêu thích</label>
              <Controller
                name="favorites"
                control={control}
                render={({ field }) => (
                  <MultiSelectPills options={FAVORITE_OPTIONS} value={field.value} onChange={field.onChange} variant="success" />
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Món không thích</label>
              <Controller
                name="dislikes"
                control={control}
                render={({ field }) => (
                  <MultiSelectPills options={DISLIKE_OPTIONS} value={field.value} onChange={field.onChange} variant="danger" />
                )}
              />
            </div>
          </div>
        </section>

        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-8"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang lưu...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Lưu thay đổi
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
