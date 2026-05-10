import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
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
    <div className="sticky flex flex-col items-center gap-6 bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent pb-6 pt-4">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-zinc-100/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-2xl border border-zinc-200 dark:border-zinc-800/50 shadow-2xl relative transition-all focus-within:border-orange-500/50 dark:focus-within:border-orange-500/80 focus-within:shadow-[0_0_20px_rgba(249,115,22,0.15)] dark:focus-within:shadow-[0_0_35px_rgba(249,115,22,0.35)]">
          <form
            onSubmit={onSubmit}
            className="grid grid-rows-[1fr_auto] gap-2 p-3"
          >
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 px-1">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex max-w-full items-center gap-2 rounded-xl border border-zinc-200 bg-white/80 px-3 py-2 text-xs text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-200"
                  >
                    <FileText className="size-4 text-orange-500" />
                    <span className="max-w-[12rem] truncate font-medium">
                      {attachment.name}
                    </span>
                    <span className="text-muted-foreground">
                      {formatSize(attachment.size)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeAttachment(attachment.id)}
                      className="rounded-full p-0.5 text-muted-foreground hover:bg-zinc-200 hover:text-foreground dark:hover:bg-zinc-800"
                      aria-label={`Xóa ${attachment.name}`}
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <textarea
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
              placeholder="Gõ tin nhắn của bạn..."
              className="p-3.5 pb-0 border-none bg-transparent field-sizing-content shadow-none ring-0 outline-none focus:outline-none focus:ring-0 resize-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 max-h-48 min-h-12 overflow-y-auto"
              rows={1}
            />

            <div className="flex items-center justify-between gap-3 p-2 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50">
              <div className="flex min-w-0 items-center gap-1.5">
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
                  className="size-9 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  aria-label="Đính kèm tệp"
                >
                  <Paperclip className="size-4" />
                </Button>
                <div className="relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-full"
                    onClick={() => setToolsOpen((open) => !open)}
                    disabled={isLoading}
                    aria-label="Mở công cụ"
                  >
                    <SlidersHorizontal className="size-4" />
                  </Button>

                  {toolsOpen && (
                    <div className="absolute bottom-11 left-0 z-20 w-72 rounded-xl border border-border bg-popover p-2 text-popover-foreground shadow-xl">
                      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                        Prompt nhanh
                      </div>
                      <div className="flex flex-col gap-1">
                        {quickPrompts.map((prompt) => (
                          <button
                            key={prompt}
                            type="button"
                            className="flex items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-accent"
                            onClick={() => {
                              onPromptSelect?.(prompt);
                              setToolsOpen(false);
                            }}
                          >
                            <Sparkles className="size-4 text-orange-500" />
                            <span>{prompt}</span>
                          </button>
                        ))}
                      </div>
                      <div className="mt-2 border-t border-border pt-2">
                        <div className="flex items-center justify-between rounded-lg px-2 py-2">
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="hidden items-center space-x-2 sm:flex">
                  <Switch
                    id="render-tool-calls-inline"
                    checked={hideToolCalls ?? false}
                    onCheckedChange={onHideToolCallsChange}
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="render-tool-calls-inline"
                    className="text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
                  >
                    Ẩn tool calls
                  </Label>
                </div>
              </div>
              {isLoading ? (
                <Button
                  type="button"
                  key="stop"
                  onClick={onCancel}
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                >
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  <span className="ml-2">Dừng</span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="size-9 rounded-full border-0 bg-gradient-to-r from-orange-500 to-rose-500 p-0 text-white shadow-lg shadow-orange-500/20 transition-all hover:opacity-90"
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  aria-label="Gửi tin nhắn"
                >
                  <ArrowUp className="size-4" />
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
          Enter để gửi, Shift + Enter để xuống dòng
        </p>
      </div>
    </div>
  );
}
