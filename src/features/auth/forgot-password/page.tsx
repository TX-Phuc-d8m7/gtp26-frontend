/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import Link from "next/link";

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
  fieldStyles,
  footerLinkStyles,
  footerStyles,
  formStyles,
  headerStyles,
  infoBannerStyles,
  inputIconStyles,
  inputIconWrapperStyles,
  inputStyles,
  inputWrapperStyles,
  labelStyles,
  loadingIconStyles,
  pageBackgroundStyles,
  pageShellStyles,
  serverErrorBannerStyles,
  submitButtonStyles,
  submitIconStyles,
  titleStyles,
} from "./_styles";
import { useForgotPassword } from "./_use-forgot-password";

export default function ForgotPassword() {
  const {
    demoToken,
    errors,
    handleSubmit,
    isLoading,
    onSubmit,
    register,
    serverError,
  } = useForgotPassword();

  return (
    <Box sx={pageShellStyles}>
      <Box sx={pageBackgroundStyles} />
      <Box sx={containerStyles}>
        <Box sx={headerStyles}>
          <Typography as="h2" sx={titleStyles}>
            Quên mật khẩu
          </Typography>
          <Typography sx={descriptionStyles}>
            Nhập email để nhận hướng dẫn đặt lại mật khẩu
          </Typography>
        </Box>

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

          {demoToken === "__sent__" && (
            <Box sx={infoBannerStyles}>
              <Box
                component={CheckCircle2}
                sx={{ width: 16, height: 16, flexShrink: 0, mt: "1px" }}
              />
              Nếu email tồn tại trong hệ thống, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu.
            </Box>
          )}

          <Box sx={fieldStyles}>
            <Label sx={labelStyles} htmlFor="email">
              Email
            </Label>
            <Box sx={inputWrapperStyles}>
              <Box sx={inputIconWrapperStyles}>
                <Box component={Mail} sx={inputIconStyles} />
              </Box>
              <Input
                id="email"
                type="email"
                placeholder="nhapemail@example.com"
                sx={inputStyles(Boolean(errors.email))}
                {...register("email")}
              />
            </Box>
            {errors.email && (
              <Typography sx={errorTextStyles}>
                {errors.email.message}
              </Typography>
            )}
          </Box>

          <Button
            type="submit"
            disabled={isLoading || demoToken === "__sent__"}
            sx={submitButtonStyles}
          >
            {isLoading ? (
              <>
                <Box component={Loader2} sx={loadingIconStyles} />
                Đang xử lý...
              </>
            ) : (
              <>
                Gửi yêu cầu
                <Box component={ArrowRight} sx={submitIconStyles} />
              </>
            )}
          </Button>
        </Form>

        <Typography sx={footerStyles}>
          <Box component={Link} href="/login" sx={backLinkStyles}>
            <Box component={ArrowLeft} sx={{ width: 14, height: 14 }} />
            Quay lại đăng nhập
          </Box>
        </Typography>

        <Typography sx={[footerStyles, { marginTop: "0.5rem" }]}>
          Chưa có tài khoản?{" "}
          <Box component={Link} href="/signup" sx={footerLinkStyles}>
            Đăng ký ngay
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
