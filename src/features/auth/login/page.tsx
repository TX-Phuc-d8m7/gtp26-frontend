/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";

import { styles, useLogin } from ".";
import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Form } from "@/shared/components/ui/form/index";
import { Input } from "@/shared/components/ui/input/index";
import { Label } from "@/shared/components/ui/label/index";
import { Typography } from "@/shared/components/ui/typography/index";

export default function Login() {
  const { register, handleSubmit, errors, isLoading, onSubmit } = useLogin();

  return (
    <Box sx={styles.pageShellStyles}>
      <Box sx={styles.pageBackgroundStyles} />
      <Box sx={styles.containerStyles}>
        <Box sx={styles.headerStyles}>
          <Typography as="h2" sx={styles.titleStyles}>
            Chào mừng trở lại
          </Typography>
          <Typography sx={styles.descriptionStyles}>
            Đăng nhập để khám phá ẩm thực Đà Nẵng
          </Typography>
        </Box>

        <Form onSubmit={handleSubmit(onSubmit)} sx={styles.formStyles}>
          <Box sx={styles.fieldStyles}>
            <Label sx={styles.labelStyles} htmlFor="email">
              Email
            </Label>
            <Box sx={styles.inputWrapperStyles}>
              <Box sx={styles.inputIconWrapperStyles}>
                <Box component={Mail} sx={styles.inputIconStyles} />
              </Box>
              <Input
                id="email"
                type="email"
                placeholder="nhapemail@example.com"
                sx={styles.inputStyles(Boolean(errors.email))}
                {...register("email")}
              />
            </Box>
            {errors.email && (
              <Typography sx={styles.errorTextStyles}>
                {errors.email.message}
              </Typography>
            )}
          </Box>

          <Box sx={styles.fieldStyles}>
            <Label sx={styles.labelStyles} htmlFor="password">
              Mật khẩu
            </Label>
            <Box sx={styles.inputWrapperStyles}>
              <Box sx={styles.inputIconWrapperStyles}>
                <Box component={Lock} sx={styles.inputIconStyles} />
              </Box>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                sx={styles.inputStyles(Boolean(errors.password))}
                {...register("password")}
              />
            </Box>
            {errors.password && (
              <Typography sx={styles.errorTextStyles}>
                {errors.password.message}
              </Typography>
            )}
          </Box>

          <Box sx={styles.optionsRowStyles}>
            <Box sx={styles.rememberWrapperStyles}>
              <Input
                type="checkbox"
                id="rememberMe"
                sx={styles.checkboxStyles}
                {...register("rememberMe")}
              />
              <Label htmlFor="rememberMe" sx={styles.rememberLabelStyles}>
                Ghi nhớ đăng nhập
              </Label>
            </Box>
            <Box component={Link} href="#" sx={styles.forgotLinkStyles}>
              Quên mật khẩu?
            </Box>
          </Box>

          <Button
            type="submit"
            disabled={isLoading}
            sx={styles.submitButtonStyles}
          >
            {isLoading ? (
              <>
                <Box component={Loader2} sx={styles.loadingIconStyles} />
                Đang xử lý...
              </>
            ) : (
              <>
                Đăng nhập
                <Box component={ArrowRight} sx={styles.submitIconStyles} />
              </>
            )}
          </Button>
        </Form>

        <Typography sx={styles.footerStyles}>
          Chưa có tài khoản?{" "}
          <Box component={Link} href="/signup" sx={styles.footerLinkStyles}>
            Đăng ký ngay
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
