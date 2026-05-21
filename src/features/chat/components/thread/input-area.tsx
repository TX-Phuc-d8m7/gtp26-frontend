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
  X,
  Clock3,
  Leaf,
  Flame,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
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
  onUseHealthProfileChange: (checked: boolean) => void;
  useHealthProfile: boolean;
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
  onUseHealthProfileChange,
  useHealthProfile,
  isLoading,
  onCancel,
  onKeyDown,
  attachments,
  onAttachmentsChange,
  onPromptSelect,
}: InputAreaProps) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolsRef.current &&
        !toolsRef.current.contains(event.target as Node)
      ) {
        setToolsOpen(false);
      }
    };

    // Chỉ gắn event listener khi panel đang mở để tối ưu hiệu suất
    if (toolsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toolsOpen]);

  const quickPrompts = [
    {
      prompt: "Gợi ý bữa tối nhẹ bụng trong 15 phút",
      label: "Bữa tối nhanh",
      meta: "15 phút · ít dầu mỡ",
      icon: Clock3,
      color: "#ea580c",
    },
    {
      prompt: "Lên thực đơn 3 ngày ít dầu mỡ",
      label: "Nhẹ bụng hơn",
      meta: "3 ngày · dịu vị",
      icon: Leaf,
      color: "#16a34a",
    },
    {
      prompt: "Tìm món phù hợp cho người đang ăn kiêng",
      label: "Ăn kiêng lành mạnh",
      meta: "cao đạm · ít calo",
      icon: Flame,
      color: "#dc2626",
    },
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
                    <FileText size={16} color="#f97316" />
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
                      <X size={14} />
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
              aria-label="Nhập yêu cầu gợi ý món ăn"
              name="food-chat-message"
              autoComplete="off"
              placeholder="Bạn muốn ăn món gì, khẩu vị ra sao…"
              sx={styles.textareaStyles}
              rows={1}
            />

            <Box sx={styles.composerFooterStyles}>
              <Box sx={styles.composerToolsStyles}>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  aria-label="Chọn tệp đính kèm"
                  style={{ display: "none" }}
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
                  <Paperclip size={16} />
                </Button>
                <Box ref={toolsRef} sx={{ position: "relative" }}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    sx={styles.headerIconButtonStyles}
                    onClick={() => setToolsOpen((open) => !open)}
                    disabled={isLoading}
                    aria-label="Mở công cụ"
                  >
                    <SlidersHorizontal size={16} />
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
                        {quickPrompts.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <Box
                              key={item.prompt}
                              component="button"
                              type="button"
                              sx={{
                                ...styles.quickPromptButtonStyles,
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                py: 2,
                                px: 2,
                              }}
                              onClick={() => {
                                onPromptSelect?.(item.prompt);
                                setToolsOpen(false);
                              }}
                            >
                              <IconComponent size={20} color={item.color} />
                              <Box sx={{ textAlign: "left", flex: 1 }}>
                                <Typography
                                  as="div"
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: "0.875rem",
                                    color: "var(--foreground)",
                                  }}
                                >
                                  {item.label}
                                </Typography>
                                <Typography
                                  as="div"
                                  sx={{
                                    fontSize: "0.75rem",
                                    color: "var(--muted-foreground)",
                                  }}
                                >
                                  {item.meta}
                                </Typography>
                              </Box>
                            </Box>
                          );
                        })}
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
                            htmlFor="use-health-profile"
                            sx={{
                              color: "var(--foreground)",
                              cursor: "pointer",
                            }}
                          >
                            Lọc theo hồ sơ sức khỏe
                          </Label>
                          <Switch
                            id="use-health-profile"
                            checked={useHealthProfile ?? true}
                            onCheckedChange={onUseHealthProfileChange}
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
                    id="use-health-profile-inline"
                    checked={useHealthProfile ?? true}
                    onCheckedChange={onUseHealthProfileChange}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="use-health-profile-inline"
                    sx={{ cursor: "pointer" }}
                  >
                    Lọc theo hồ sơ sức khỏe
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
                  <LoaderCircle
                    size={16}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  <Box component="span" sx={{ ml: 1 }}>
                    Dừng
                  </Box>
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  sx={styles.sendButtonStyles}
                  aria-label="Gửi tin nhắn"
                >
                  <ArrowUp size={16} />
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
