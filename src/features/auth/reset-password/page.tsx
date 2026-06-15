/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Form } from "@/shared/components/ui/form/index";
import { Input } from "@/shared/components/ui/input/index";
import { Label } from "@/shared/components/ui/label/index";
import { Typography } from "@/shared/components/ui/typography/index";

import {
  backLinkStyles,
  containerStyles,
  descriptionStyles,
  errorTextStyles,
  eyeToggleButtonStyles,
  fieldStyles,
  footerLinkStyles,
  footerStyles,
  formStyles,
  headerStyles,
  inputIconStyles,
  inputIconWrapperStyles,
  inputStyles,
  inputWrapperStyles,
  invalidTokenDescStyles,
  invalidTokenIconStyles,
  invalidTokenStyles,
  invalidTokenTitleStyles,
  labelStyles,
  loadingIconStyles,
  pageBackgroundStyles,
  pageShellStyles,
  passwordStrengthStyles,
  serverErrorBannerStyles,
  submitButtonStyles,
  submitIconStyles,
  titleStyles,
  tokenNoticeStyles,
} from "./_styles";
import { useResetPassword } from "./_use-reset-password";

export default function ResetPassword() {
  const {
    errors,
    handleSubmit,
    hasToken,
    isLoading,
    onSubmit,
    register,
    serverError,
  } = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Box sx={pageShellStyles}>
      <Box sx={pageBackgroundStyles} />
      <Box sx={containerStyles}>
        <Box sx={headerStyles}>
          <Typography as="h2" sx={titleStyles}>
            Đặt lại mật khẩu
          </Typography>
          <Typography sx={descriptionStyles}>
            Nhập mật khẩu mới cho tài khoản của bạn
          </Typography>
        </Box>

        {!hasToken ? (
          /* Trường hợp truy cập thẳng không có token */
          <Box sx={invalidTokenStyles}>
            <Box component={ShieldAlert} sx={[invalidTokenIconStyles, { width: 40, height: 40 }]} />
            <Typography as="p" sx={invalidTokenTitleStyles}>
              Link không hợp lệ
            </Typography>
            <Typography as="p" sx={invalidTokenDescStyles}>
              Link đặt lại mật khẩu không đúng hoặc đã hết hạn.
              <br />
              Vui lòng gửi lại yêu cầu.
            </Typography>
            <Box
              component={Link}
              href="/forgot-password"
              sx={[submitButtonStyles, {
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "auto",
                px: 3,
                textDecoration: "none",
                mt: 1,
              }]}
            >
              <KeyRound size={16} />
              Gửi lại yêu cầu
            </Box>
          </Box>
        ) : (
          <Form onSubmit={handleSubmit(onSubmit)} sx={formStyles}>
            {serverError && (
              <Box sx={serverErrorBannerStyles}>
                <Box
                  component={AlertCircle}
                  sx={{ width: 16, height: 16, flexShrink: 0, mt: "1px" }}
                />
                {serverError}
              </Box>
            )}

            {/* Mật khẩu mới */}
            <Box sx={fieldStyles}>
              <Label sx={labelStyles} htmlFor="newPassword">
                Mật khẩu mới
              </Label>
              <Box sx={inputWrapperStyles}>
                <Box sx={inputIconWrapperStyles}>
                  <Box component={Lock} sx={inputIconStyles} />
                </Box>
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  sx={inputStyles(Boolean(errors.newPassword), true)}
                  {...register("newPassword")}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  style={eyeToggleButtonStyles}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </Box>
              {errors.newPassword ? (
                <Typography sx={errorTextStyles}>
                  {errors.newPassword.message}
                </Typography>
              ) : (
                <Typography sx={passwordStrengthStyles}>
                  Ít nhất 8 ký tự, gồm chữ hoa, chữ thường và số.
                </Typography>
              )}
            </Box>

            {/* Xác nhận mật khẩu */}
            <Box sx={fieldStyles}>
              <Label sx={labelStyles} htmlFor="confirmNewPassword">
                Xác nhận mật khẩu mới
              </Label>
              <Box sx={inputWrapperStyles}>
                <Box sx={inputIconWrapperStyles}>
                  <Box component={Lock} sx={inputIconStyles} />
                </Box>
                <Input
                  id="confirmNewPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  sx={inputStyles(Boolean(errors.confirmNewPassword), true)}
                  {...register("confirmNewPassword")}
                />
                <button
                  type="button"
                  aria-label={showConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  style={eyeToggleButtonStyles}
                  onClick={() => setShowConfirm((v) => !v)}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </Box>
              {errors.confirmNewPassword && (
                <Typography sx={errorTextStyles}>
                  {errors.confirmNewPassword.message}
                </Typography>
              )}
            </Box>

            <Button
              type="submit"
              disabled={isLoading}
              sx={submitButtonStyles}
            >
              {isLoading ? (
                <>
                  <Box component={Loader2} sx={loadingIconStyles} />
                  Đang xử lý...
                </>
              ) : (
                <>
                  Đặt lại mật khẩu
                  <Box component={ArrowRight} sx={submitIconStyles} />
                </>
              )}
            </Button>
          </Form>
        )}

        <Typography sx={[footerStyles, { marginTop: hasToken ? "2rem" : "1.5rem" }]}>
          <Box component={Link} href="/login" sx={backLinkStyles}>
            <Box component={ArrowLeft} sx={{ width: 14, height: 14 }} />
            Quay lại đăng nhập
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
