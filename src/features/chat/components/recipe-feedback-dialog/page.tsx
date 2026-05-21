/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

import { StarRating } from "../star-rating";
import { RecipeFeedbackDialogProps, styles } from ".";

export default function RecipeFeedbackDialog({
  open,
  recipeName,
  onClose,
  onSubmit,
  isLoading = false,
}: RecipeFeedbackDialogProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [tried, setTried] = useState(false);

  const resetForm = () => {
    setRating(0);
    setComment("");
    setTried(false);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao");
      return;
    }
    onSubmit({ rating, comment, tried });
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: { sx: styles.paperSx },
        backdrop: { sx: styles.backdropSx },
      }}
    >
      <DialogTitle sx={styles.titleSx}>Đánh giá: {recipeName}</DialogTitle>
      <DialogContent sx={styles.contentSx}>
        <Box sx={styles.stackSx}>
          <Box>
            <StarRating
              onRate={setRating}
              currentRating={rating}
              showLabel={true}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={styles.fieldLabelSx}>
              Bạn đã nấu món này chưa?
            </Typography>
            <Box sx={styles.triedRowSx}>
              <Button
                variant={tried ? "contained" : "outlined"}
                size="small"
                onClick={() => setTried(true)}
                sx={styles.getTriedButtonSx(tried)}
              >
                Đã nấu
              </Button>
              <Button
                variant={!tried ? "contained" : "outlined"}
                size="small"
                onClick={() => setTried(false)}
                sx={styles.getTriedButtonSx(!tried)}
              >
                Chưa nấu
              </Button>
            </Box>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={styles.fieldLabelSx}>
              Bình luận (tùy chọn)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Chia sẻ ý kiến của bạn về công thức này..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              size="small"
              sx={styles.textFieldSx}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={styles.actionsSx}>
        <Button
          onClick={handleClose}
          disabled={isLoading}
          sx={styles.cancelButtonSx}
        >
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading || rating === 0}
          sx={styles.submitButtonSx}
        >
          {isLoading ? "Đang gửi..." : "Gửi đánh giá"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
