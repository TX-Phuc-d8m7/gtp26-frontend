/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Trash2, X } from "lucide-react";

import { Box } from "@/shared/components/ui/box/index";
import { Button } from "@/shared/components/ui/button/index";
import { Typography } from "@/shared/components/ui/typography/index";

import { DeleteFoodDialogProps, styles } from ".";

export default function DeleteFoodDialog({
  food,
  isDeleting,
  open,
  onClose,
  onConfirm,
}: DeleteFoodDialogProps) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: styles.paperStyles } }}
    >
      <DialogTitle sx={styles.titleStyles}>Xóa món ăn?</DialogTitle>
      <DialogContent>
        <Typography as="p" sx={styles.contentStyles}>
          Thao tác này sẽ xóa vĩnh viễn món{" "}
          <Box component="span" sx={styles.foodNameStyles}>
            {food?.name ?? "đang chọn"}
          </Box>{" "}
          khỏi kho dữ liệu. Embedding và ảnh liên quan phía backend cũng có thể
          bị xóa theo.
        </Typography>
      </DialogContent>
      <DialogActions sx={styles.actionsStyles}>
        <Button
          type="button"
          variant="ghost"
          sx={styles.cancelButtonStyles}
          disabled={isDeleting}
          onClick={onClose}
        >
          <X size={16} />
          Hủy
        </Button>
        <Button
          type="button"
          variant="destructive"
          sx={styles.dangerButtonStyles}
          disabled={isDeleting}
          onClick={onConfirm}
        >
          {isDeleting ? <CircularProgress size={16} /> : <Trash2 size={16} />}
          Xóa món
        </Button>
      </DialogActions>
    </Dialog>
  );
}
