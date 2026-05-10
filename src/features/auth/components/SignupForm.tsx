"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "@/features/auth/schemas/auth";
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      // Giả lập gọi API 2s
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Signup Data:", data);

      toast.success("Đăng ký thành công! Hãy chọn sở thích ẩm thực của bạn.");
      router.push("/onboarding");
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-card border border-border shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Tạo tài khoản
        </h2>
        <p className="text-muted-foreground">
          Tham gia cùng chúng tôi để tìm món ngon
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            htmlFor="fullName"
          >
            Họ và tên
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <User className="h-5 w-5" />
            </div>
            <input
              id="fullName"
              type="text"
              placeholder="Nguyễn Văn A"
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                errors.fullName
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-input"
              }`}
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="text-sm text-red-500 font-medium mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <input
              id="email"
              type="email"
              placeholder="nhapemail@example.com"
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                errors.email
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-input"
              }`}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 font-medium mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            htmlFor="password"
          >
            Mật khẩu
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Lock className="h-5 w-5" />
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-input"
              }`}
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 font-medium mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            htmlFor="confirmPassword"
          >
            Xác nhận mật khẩu
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
              <Lock className="h-5 w-5" />
            </div>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${
                errors.confirmPassword
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-input"
              }`}
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 font-medium mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 w-full mt-4"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            <>
              Đăng ký
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Đã có tài khoản?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-primary/80 transition-colors hover:underline"
        >
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
}
