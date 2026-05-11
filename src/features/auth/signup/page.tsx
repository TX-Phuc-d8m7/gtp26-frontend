/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { ArrowRight, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material/styles";
import type { UseFormRegisterReturn } from "react-hook-form";

import { styles, useSignup } from ".";
import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Form } from "@/shared/components/ui/form/index";
import { Input } from "@/shared/components/ui/input/index";
import { Label } from "@/shared/components/ui/label/index";
import { Typography } from "@/shared/components/ui/typography/index";

export default function Signup() {
  const { register, handleSubmit, errors, isLoading, onSubmit } = useSignup();

  return (
    <Box sx={styles.containerStyles}>
      <Box sx={styles.headerStyles}>
        <Typography as="h2" sx={styles.titleStyles}>
          Tạo tài khoản
        </Typography>
        <Typography sx={styles.descriptionStyles}>
          Tham gia cùng chúng tôi để tìm món ngon
        </Typography>
      </Box>

      <Form onSubmit={handleSubmit(onSubmit)} sx={styles.formStyles}>
        <SignupField
          id="fullName"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          icon={<Box component={User} sx={styles.inputIconStyles} />}
          error={errors.fullName?.message}
          inputSx={styles.inputStyles(Boolean(errors.fullName))}
          registerProps={register("fullName")}
        />
        <SignupField
          id="email"
          label="Email"
          type="email"
          placeholder="nhapemail@example.com"
          icon={<Box component={Mail} sx={styles.inputIconStyles} />}
          error={errors.email?.message}
          inputSx={styles.inputStyles(Boolean(errors.email))}
          registerProps={register("email")}
        />
        <SignupField
          id="password"
          label="Mật khẩu"
          type="password"
          placeholder="••••••••"
          icon={<Box component={Lock} sx={styles.inputIconStyles} />}
          error={errors.password?.message}
          inputSx={styles.inputStyles(Boolean(errors.password))}
          registerProps={register("password")}
        />
        <SignupField
          id="confirmPassword"
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="••••••••"
          icon={<Box component={Lock} sx={styles.inputIconStyles} />}
          error={errors.confirmPassword?.message}
          inputSx={styles.inputStyles(Boolean(errors.confirmPassword))}
          registerProps={register("confirmPassword")}
        />

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
              Đăng ký
              <Box component={ArrowRight} sx={styles.submitIconStyles} />
            </>
          )}
        </Button>
      </Form>

      <Typography sx={styles.footerStyles}>
        Đã có tài khoản?{" "}
        <Box component={Link} href="/login" sx={styles.footerLinkStyles}>
          Đăng nhập ngay
        </Box>
      </Typography>
    </Box>
  );
}

function SignupField({
  id,
  label,
  icon,
  inputSx,
  registerProps,
  error,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  icon: ReactNode;
  inputSx: SxProps<Theme>;
  registerProps: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <Box sx={styles.fieldStyles}>
      <Label sx={styles.labelStyles} htmlFor={id}>
        {label}
      </Label>
      <Box sx={styles.inputWrapperStyles}>
        <Box sx={styles.inputIconWrapperStyles}>{icon}</Box>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          sx={inputSx}
          {...registerProps}
        />
      </Box>
      {error && <Typography sx={styles.errorTextStyles}>{error}</Typography>}
    </Box>
  );
}
