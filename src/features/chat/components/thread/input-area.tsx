import { Button } from "@/shared/components/ui/button/index";
import { Box } from "@mui/material";
import { Label } from "@/shared/components/ui/label/index";
import { Switch } from "@/shared/components/ui/switch/index";
import { Typography } from "@/shared/components/ui/typography/index";
import {
  ArrowUp,
  FileText,
  LoaderCircle,
  Paperclip,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { styles } from "../../_styles";

export interface ComposerAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
}

interface InputAreaProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onHideToolCallsChange: (checked: boolean) => void;
  hideToolCalls: boolean;
  isLoading: boolean;
  onCancel?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  attachments: ComposerAttachment[];
  onAttachmentsChange: (attachments: ComposerAttachment[]) => void;
  onPromptSelect?: (prompt: string) => void;
}

export function InputArea({
  input,
  onInputChange,
  onSubmit,
  onHideToolCallsChange,
  hideToolCalls,
  isLoading,
  onCancel,
  onKeyDown,
  attachments,
  onAttachmentsChange,
  onPromptSelect,
}: InputAreaProps) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const quickPrompts = [
    "Gợi ý bữa tối nhẹ bụng trong 15 phút",
    "Lên thực đơn 3 ngày ít dầu mỡ",
    "Tìm món phù hợp cho người đang ăn kiêng",
  ];

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFilesSelected = (files: FileList | null) => {
    if (!files?.length) return;

    const nextAttachments = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      type: file.type || "Tệp",
      size: file.size,
    }));

    onAttachmentsChange([...attachments, ...nextAttachments]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    onAttachmentsChange(attachments.filter((item) => item.id !== id));
  };

  return (
    <Box sx={styles.inputShellStyles}>
      <Box sx={styles.inputInnerStyles}>
        <Box sx={styles.composerStyles}>
          <form
            onSubmit={onSubmit}
            style={{
              display: "grid",
              gridTemplateRows: "1fr auto",
              gap: 8,
              padding: 12,
            }}
          >
            {attachments.length > 0 && (
              <Box sx={styles.attachmentRowStyles}>
                {attachments.map((attachment) => (
                  <Box key={attachment.id} sx={styles.attachmentChipStyles}>
                    <FileText className="size-4 text-orange-500" />
                    <Typography
                      as="span"
                      sx={{
                        maxWidth: "12rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: 700,
                      }}
                    >
                      {attachment.name}
                    </Typography>
                    <Typography
                      as="span"
                      sx={{ color: "var(--muted-foreground)" }}
                    >
                      {formatSize(attachment.size)}
                    </Typography>
                    <Box
                      component="button"
                      type="button"
                      onClick={() => removeAttachment(attachment.id)}
                      sx={{
                        display: "grid",
                        placeItems: "center",
                        border: 0,
                        borderRadius: "999px",
                        p: 0.4,
                        color: "var(--muted-foreground)",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                        "&:hover": {
                          color: "var(--foreground)",
                          backgroundColor: "var(--accent)",
                        },
                      }}
                      aria-label={`Xóa ${attachment.name}`}
                    >
                      <X className="size-3.5" />
                    </Box>
                  </Box>
                ))}
              </Box>
            )}

            <Box
              component="textarea"
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey &&
                  !e.metaKey &&
                  !e.nativeEvent.isComposing
                ) {
                  e.preventDefault();
                  const el = e.target as HTMLElement | undefined;
                  const form = el?.closest("form");
                  form?.requestSubmit();
                }
                onKeyDown?.(e);
              }}
              placeholder="Bạn muốn ăn món gì, khẩu vị ra sao?"
              sx={styles.textareaStyles}
              rows={1}
            />

            <Box sx={styles.composerFooterStyles}>
              <Box sx={styles.composerToolsStyles}>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFilesSelected(e.target.files)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  sx={styles.headerIconButtonStyles}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  aria-label="Đính kèm tệp"
                >
                  <Paperclip className="size-4" />
                </Button>
                <Box sx={{ position: "relative" }}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    sx={styles.headerIconButtonStyles}
                    onClick={() => setToolsOpen((open) => !open)}
                    disabled={isLoading}
                    aria-label="Mở công cụ"
                  >
                    <SlidersHorizontal className="size-4" />
                  </Button>

                  {toolsOpen && (
                    <Box sx={styles.toolsPanelStyles}>
                      <Typography
                        as="span"
                        sx={{
                          display: "block",
                          px: 1,
                          py: 0.75,
                          color: "var(--muted-foreground)",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        Prompt nhanh
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.4,
                        }}
                      >
                        {quickPrompts.map((prompt) => (
                          <Box
                            key={prompt}
                            component="button"
                            type="button"
                            sx={styles.quickPromptButtonStyles}
                            onClick={() => {
                              onPromptSelect?.(prompt);
                              setToolsOpen(false);
                            }}
                          >
                            <Sparkles className="size-4 text-orange-500" />
                            <span>{prompt}</span>
                          </Box>
                        ))}
                      </Box>
                      <Box
                        sx={{
                          mt: 1,
                          borderTop: "1px solid var(--border)",
                          pt: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderRadius: "12px",
                            px: 1,
                            py: 1,
                          }}
                        >
                          <Label
                            htmlFor="render-tool-calls"
                            className="text-sm text-foreground cursor-pointer"
                          >
                            Ẩn tool calls
                          </Label>
                          <Switch
                            id="render-tool-calls"
                            checked={hideToolCalls ?? false}
                            onCheckedChange={onHideToolCallsChange}
                            disabled={isLoading}
                          />
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Switch
                    id="render-tool-calls-inline"
                    checked={hideToolCalls ?? false}
                    onCheckedChange={onHideToolCallsChange}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="render-tool-calls-inline"
                    className="cursor-pointer"
                  >
                    Ẩn tool calls
                  </Label>
                </Box>
              </Box>
              {isLoading ? (
                <Button
                  type="button"
                  key="stop"
                  onClick={onCancel}
                  variant="outline"
                  size="sm"
                  sx={{ borderRadius: "999px" }}
                >
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  <span className="ml-2">Dừng</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  sx={styles.sendButtonStyles}
                  aria-label="Gửi tin nhắn"
                >
                  <ArrowUp className="size-4" />
                </Button>
              )}
            </Box>
          </form>
        </Box>

        <Typography as="p" sx={styles.composerHintStyles}>
          Enter để gửi, Shift + Enter để xuống dòng
        </Typography>
      </Box>
    </Box>
  );
}
