import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { StarRating } from "./star-rating";
import { useState } from "react";

interface RecipeFeedbackDialogProps {
  open: boolean;
  recipeName: string;
  onClose: () => void;
  onSubmit: (feedback: {
    rating: number;
    comment: string;
    tried: boolean;
  }) => void;
  isLoading?: boolean;
}

export function RecipeFeedbackDialog({
  open,
  recipeName,
  onClose,
  onSubmit,
  isLoading = false,
}: RecipeFeedbackDialogProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [tried, setTried] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao");
      return;
    }
    onSubmit({ rating, comment, tried });
    setRating(0);
    setComment("");
    setTried(false);
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    setTried(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle className="!font-bold !text-lg">
        Đánh giá: {recipeName}
      </DialogTitle>
      <DialogContent className="!py-6">
        <Box className="space-y-6">
          {/* Rating Section */}
          <Box>
            <StarRating
              onRate={setRating}
              currentRating={rating}
              showLabel={true}
            />
          </Box>

          {/* Tried Section */}
          <Box>
            <Typography variant="subtitle2" className="!font-semibold !text-muted-foreground !text-xs !mb-3">
              Bạn đã nấu món này chưa?
            </Typography>
            <Box className="flex gap-2">
              <Button
                variant={tried ? "contained" : "outlined"}
                size="small"
                onClick={() => setTried(true)}
                className={tried ? "!bg-orange-600" : ""}
              >
                Đã nấu
              </Button>
              <Button
                variant={!tried ? "contained" : "outlined"}
                size="small"
                onClick={() => setTried(false)}
              >
                Chưa nấu
              </Button>
            </Box>
          </Box>

          {/* Comment Section */}
          <Box>
            <Typography variant="subtitle2" className="!font-semibold !text-muted-foreground !text-xs !mb-2">
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
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className="!p-4">
        <Button onClick={handleClose} disabled={isLoading}>
          Hủy
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          className="!bg-orange-600 hover:!bg-orange-700"
          disabled={isLoading || rating === 0}
        >
          {isLoading ? "Đang gửi..." : "Gửi đánh giá"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
