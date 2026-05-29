/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

import { StarRating } from "../star-rating";
import type {
  RecommendationFeedbackDialogProps,
  RecommendationFeedbackDialogValue,
  VerdictOption,
} from ".";
import { styles } from ".";

const VERDICT_OPTIONS: VerdictOption[] = [
  {
    value: "like",
    label: "Phù hợp",
    description: "Món này đúng nhu cầu",
  },
  {
    value: "neutral",
    label: "Tạm được",
    description: "Có thể dùng nhưng chưa tối ưu",
  },
  {
    value: "dislike",
    label: "Không phù hợp",
    description: "Cần tránh hoặc gợi ý lại",
  },
];

const REASON_OPTIONS = [
  "Không hợp khẩu vị",
  "Không phù hợp bệnh lý/dị ứng",
  "Quá đắt",
  "Khó tìm quán",
  "Không đúng bữa ăn",
  "Đã từng ăn rồi",
  "Gợi ý tốt",
];

export default function RecommendationFeedbackDialog({
  foodName,
  initialValue,
  isLoading = false,
  onClose,
  onSubmit,
  open,
}: RecommendationFeedbackDialogProps) {
  const [verdict, setVerdict] =
    useState<RecommendationFeedbackDialogValue["verdict"]>("like");
  const [rating, setRating] = useState(0);
  const [reasons, setReasons] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [tried, setTried] = useState(false);

  useEffect(() => {
    if (!open) return;
    setVerdict(initialValue?.verdict ?? "like");
    setRating(initialValue?.rating ?? 0);
    setReasons(initialValue?.reasons ?? []);
    setComment(initialValue?.comment ?? "");
    setTried(initialValue?.tried ?? false);
  }, [initialValue, open]);

  const title = useMemo(
    () =>
      initialValue
        ? `Cập nhật đánh giá: ${foodName}`
        : `Đánh giá gợi ý: ${foodName}`,
    [foodName, initialValue],
  );

  const toggleReason = (reason: string) => {
    setReasons((current) =>
      current.includes(reason)
        ? current.filter((item) => item !== reason)
        : [...current, reason],
    );
  };

  const handleSubmit = () => {
    onSubmit({
      verdict,
      rating: rating > 0 ? rating : null,
      reasons,
      comment: comment.trim() || null,
      tried,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: { sx: styles.paperSx },
        backdrop: { sx: styles.backdropSx },
      }}
    >
      <DialogTitle sx={styles.titleSx}>{title}</DialogTitle>
      <Typography sx={styles.subtitleSx}>
        Phản hồi này giúp admin biết món nào thật sự phù hợp với nhu cầu của
        bạn và món nào cần review lại dữ liệu gợi ý.
      </Typography>
      <DialogContent sx={styles.contentSx}>
        <Box sx={styles.stackSx}>
          <Box>
            <Typography sx={styles.fieldLabelSx}>
              Món này có phù hợp không?
            </Typography>
            <Box sx={styles.verdictGridSx}>
              {VERDICT_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  onClick={() => setVerdict(option.value)}
                  sx={styles.getVerdictButtonSx(
                    option.value,
                    verdict === option.value,
                  )}
                >
                  <Box component="span">
                    <Box component="span" sx={styles.verdictTitleSx}>
                      {option.label}
                    </Box>
                    <Box component="span" sx={styles.verdictDescriptionSx}>
                      {option.description}
                    </Box>
                  </Box>
                </Button>
              ))}
            </Box>
          </Box>

          <Box>
            <StarRating onRate={setRating} currentRating={rating} showLabel />
          </Box>

          <Box>
            <Typography sx={styles.fieldLabelSx}>Lý do</Typography>
            <Box sx={styles.reasonWrapSx}>
              {REASON_OPTIONS.map((reason) => (
                <Chip
                  key={reason}
                  label={reason}
                  onClick={() => toggleReason(reason)}
                  sx={styles.getReasonChipSx(reasons.includes(reason))}
                />
              ))}
            </Box>
          </Box>

          <Box>
            <Typography sx={styles.fieldLabelSx}>Ghi chú thêm</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Ví dụ: món này không hợp vì nước chấm ngọt, hoặc rất phù hợp vì nhẹ bụng..."
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              sx={styles.textFieldSx}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={styles.actionsSx}>
        <Button onClick={onClose} disabled={isLoading} sx={styles.cancelButtonSx}>
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
          sx={styles.submitButtonSx}
        >
          {isLoading ? "Đang gửi..." : "Gửi đánh giá"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
