import { v4 as uuidv4 } from "uuid";
import { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { useStreamContext } from "@/features/chat/providers/stream-provider";
import { useState, FormEvent } from "react";
import { Button } from "@/shared/components/ui/button/index";
import { Box } from "@mui/material";
import { Typography } from "@/shared/components/ui/typography/index";
import type { SxProps, Theme } from "@mui/material/styles";
import { Checkpoint } from "@langchain/langgraph-sdk";
import { AssistantMessage, AssistantMessageLoading } from "./messages/ai";
import { HumanMessage } from "./messages/human";
import { DO_NOT_RENDER_ID_PREFIX } from "@/features/chat/lib/ensure-tool-responses";
import {
  ArrowDown,
  Copy,
  CopyCheck,
  Paperclip,
  RefreshCcw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useQueryState, parseAsBoolean } from "nuqs";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import ThreadHistory from "./history";
import { toast } from "sonner";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { Header } from "./header";
import { ComposerAttachment, InputArea } from "./input-area";
import { styles } from "../../_styles";

interface BackendFoodResult {
  id: string;
  name: string;
  description: string;
  matchScore: number;
}

interface BackendSearchResponse {
  query: string;
  ai_insight?: {
    warning_message?: string | null;
  };
  results: BackendFoodResult[];
  ai_response?: string | null;
}

interface LocalChatMessage {
  id: string;
  type: "human" | "ai";
  content: string;
  foods?: BackendFoodResult[];
  attachments?: ComposerAttachment[];
  feedback?: "like" | "dislike";
  sourceQuery?: string;
}

const FOOD_AI_API_URL =
  process.env.NEXT_PUBLIC_FOOD_AI_API_URL ?? "http://localhost:8000";
const SEARCH_API_TIMEOUT_MS = 30000;
const EMPTY_STATE_PROMPTS = [
  "Gợi ý món tối nhanh, ít dầu mỡ",
  "Tạo thực đơn 3 ngày cho sinh viên",
  "Món phù hợp khi bị đau dạ dày",
  "Tìm món nhiều đạm nhưng không quá ngấy",
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function LocalMessageActions({
  content,
  feedback,
  isAiMessage,
  isLoading,
  onFeedback,
  onRetry,
}: {
  content: string;
  feedback?: "like" | "dislike";
  isAiMessage?: boolean;
  isLoading: boolean;
  onFeedback?: (feedback: "like" | "dislike") => void;
  onRetry?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <Box sx={styles.messageActionsStyles}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        sx={{ width: 30, height: 30, borderRadius: "999px" }}
        onClick={handleCopy}
        disabled={isLoading}
        aria-label="Sao chép tin nhắn"
      >
        {copied ? (
          <CopyCheck className="size-4 text-green-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </Button>
      {isAiMessage && (
        <>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            sx={{
              width: 30,
              height: 30,
              borderRadius: "999px",
              ...(feedback === "like"
                ? {
                    backgroundColor: "rgba(47, 143, 70, 0.12)",
                    color: "var(--success)",
                  }
                : {}),
            }}
            onClick={() => onFeedback?.("like")}
            disabled={isLoading}
            aria-label="Câu trả lời hữu ích"
          >
            <ThumbsUp className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            sx={{
              width: 30,
              height: 30,
              borderRadius: "999px",
              ...(feedback === "dislike"
                ? {
                    backgroundColor: "rgba(255, 68, 68, 0.12)",
                    color: "var(--destructive)",
                  }
                : {}),
            }}
            onClick={() => onFeedback?.("dislike")}
            disabled={isLoading}
            aria-label="Câu trả lời chưa phù hợp"
          >
            <ThumbsDown className="size-4" />
          </Button>
          {onRetry && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              sx={{ width: 30, height: 30, borderRadius: "999px" }}
              onClick={onRetry}
              disabled={isLoading}
              aria-label="Tạo lại câu trả lời"
            >
              <RefreshCcw className="size-4" />
            </Button>
          )}
        </>
      )}
    </Box>
  );
}

function StickyToBottomContent(props: {
  content: ReactNode;
  className?: string;
  contentClassName?: string;
  sx?: SxProps<Theme>;
}) {
  const context = useStickToBottomContext();
  return (
    <Box ref={context.scrollRef} className={props.className} sx={props.sx}>
      <div ref={context.contentRef} className={props.contentClassName}>
        {props.content}
      </div>
    </Box>
  );
}

function ScrollToBottom(props: { className?: string }) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  if (isAtBottom) return null;
  return (
    <Button
      variant="outline"
      size="sm"
      className={props.className}
      sx={styles.scrollToBottomButtonStyles}
      onClick={() => scrollToBottom()}
    >
      <ArrowDown className="w-4 h-4" />
      <span>Xuống cuối</span>
    </Button>
  );
}

export function Thread() {
  const [threadId, setThreadId] = useQueryState("threadId");
  const [chatHistoryOpen, setChatHistoryOpen] = useQueryState(
    "chatHistoryOpen",
    parseAsBoolean.withDefault(false),
  );
  const [hideToolCalls, setHideToolCalls] = useQueryState(
    "hideToolCalls",
    parseAsBoolean.withDefault(false),
  );
  const [input, setInput] = useState("");
  const [firstTokenReceived, setFirstTokenReceived] = useState(false);
  const [localMessages, setLocalMessages] = useState<LocalChatMessage[]>([]);
  const [isBackendLoading, setIsBackendLoading] = useState(false);
  const [attachments, setAttachments] = useState<ComposerAttachment[]>([]);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const backendAbortController = useRef<AbortController | null>(null);

  const stream = useStreamContext();
  const messages = stream.messages;
  const isStreamLoading = stream.isLoading;
  const isLoading = isStreamLoading || isBackendLoading;

  const renderHighlightedText = (
    text: string,
    foods: BackendFoodResult[] = [],
  ) => {
    if (!foods.length || !text.trim()) {
      return <>{text}</>;
    }

    const names = foods
      .map((food) => food.name.trim())
      .filter(Boolean)
      .sort((a, b) => b.length - a.length);

    if (!names.length) {
      return <>{text}</>;
    }

    const pattern = new RegExp(`(${names.map(escapeRegExp).join("|")})`, "gi");
    const parts = text.split(pattern);

    return (
      <>
        {parts.map((part, idx) => {
          const matched = names.find(
            (name) => name.toLowerCase() === part.toLowerCase(),
          );
          if (!matched) {
            return <span key={`txt-${idx}`}>{part}</span>;
          }
          return (
            <span
              key={`hit-${idx}`}
              className="font-semibold text-orange-600 dark:text-orange-400"
            >
              {part}
            </span>
          );
        })}
      </>
    );
  };

  const lastError = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!stream.error) {
      lastError.current = undefined;
      return;
    }
    try {
      const message = (stream.error as any).message;
      if (!message || lastError.current === message) {
        return;
      }

      lastError.current = message;
      toast.error("An error occurred. Please try again.", {
        description: (
          <p>
            <strong>Error:</strong> <code>{message}</code>
          </p>
        ),
        richColors: true,
        closeButton: true,
      });
    } catch {
      // no-op
    }
  }, [stream.error]);

  const prevMessageLength = useRef(0);
  useEffect(() => {
    if (
      messages.length !== prevMessageLength.current &&
      messages?.length &&
      messages[messages.length - 1].type === "ai"
    ) {
      setFirstTokenReceived(true);
    }

    prevMessageLength.current = messages.length;
  }, [messages]);

  const requestFoodResponse = async (
    userQuery: string,
    options?: { replaceMessageId?: string },
  ) => {
    setFirstTokenReceived(false);
    setIsBackendLoading(true);

    const controller = new AbortController();
    backendAbortController.current = controller;
    const timeoutId = setTimeout(
      () => controller.abort(),
      SEARCH_API_TIMEOUT_MS,
    );

    try {
      const res = await fetch(
        `${FOOD_AI_API_URL}/foods/search?q=${encodeURIComponent(userQuery)}`,
        { signal: controller.signal },
      );

      if (!res.ok) {
        throw new Error(`API trả về mã lỗi ${res.status}`);
      }

      const data: BackendSearchResponse = await res.json();
      const suggestionNames = (data.results ?? [])
        .slice(0, 5)
        .map((item) => item.name);
      const adviceText =
        data.ai_response?.trim() ||
        "Mình đã tìm được một số món phù hợp cho bạn.";
      const warningText = data.ai_insight?.warning_message?.trim();
      const suggestionText = suggestionNames.length
        ? `\n\nGợi ý nhanh: ${suggestionNames.join(", ")}.`
        : "\n\nHiện chưa có món phù hợp trong dữ liệu.";

      const aiMessage: LocalChatMessage = {
        id: uuidv4(),
        type: "ai",
        content: `${warningText ? `${warningText}\n\n` : ""}${adviceText}${suggestionText}`,
        foods: data.results ?? [],
        sourceQuery: userQuery,
      };
      setLocalMessages((prev) =>
        options?.replaceMessageId
          ? prev.map((message) =>
              message.id === options.replaceMessageId
                ? { ...aiMessage, id: message.id }
                : message,
            )
          : [...prev, aiMessage],
      );
      setFirstTokenReceived(true);
    } catch (error) {
      const errorText =
        error instanceof Error && error.name === "AbortError"
          ? "Yêu cầu đã bị dừng hoặc backend phản hồi quá 30 giây, vui lòng thử lại."
          : "Không gọi được API backend để tra cứu món ăn, vui lòng kiểm tra server.";
      const aiErrorMessage: LocalChatMessage = {
        id: uuidv4(),
        type: "ai",
        content: errorText,
        sourceQuery: userQuery,
      };
      setLocalMessages((prev) =>
        options?.replaceMessageId
          ? prev.map((message) =>
              message.id === options.replaceMessageId
                ? { ...aiErrorMessage, id: message.id }
                : message,
            )
          : [...prev, aiErrorMessage],
      );
      setFirstTokenReceived(true);
    } finally {
      clearTimeout(timeoutId);
      setIsBackendLoading(false);
      if (backendAbortController.current === controller) {
        backendAbortController.current = null;
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userQuery = input.trim();
    const messageAttachments = attachments;
    const newHumanMessage: LocalChatMessage = {
      id: uuidv4(),
      type: "human",
      content: userQuery,
      attachments: messageAttachments,
    };

    setLocalMessages((prev) => [...prev, newHumanMessage]);
    setInput("");
    setAttachments([]);
    await requestFoodResponse(userQuery);
  };

  const handleLocalRegenerate = (message: LocalChatMessage) => {
    if (!message.sourceQuery || isLoading) return;

    setLocalMessages((prev) =>
      prev.map((item) =>
        item.id === message.id
          ? {
              ...item,
              content: "Đang tạo lại câu trả lời...",
              foods: undefined,
              feedback: undefined,
            }
          : item,
      ),
    );
    void requestFoodResponse(message.sourceQuery, {
      replaceMessageId: message.id,
    });
  };

  const handleLocalFeedback = (
    messageId: string,
    feedback: "like" | "dislike",
  ) => {
    setLocalMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? {
              ...message,
              feedback: message.feedback === feedback ? undefined : feedback,
            }
          : message,
      ),
    );
    toast.success(
      feedback === "like"
        ? "Đã ghi nhận câu trả lời hữu ích."
        : "Đã ghi nhận phản hồi để cải thiện gợi ý.",
    );
  };

  const handleNewThread = () => {
    setThreadId(null);
    setLocalMessages([]);
    setAttachments([]);
    setInput("");
    backendAbortController.current?.abort();
  };

  const handleCancel = () => {
    backendAbortController.current?.abort();
    stream.stop();
  };

  const handleRegenerate = (
    parentCheckpoint: Checkpoint | null | undefined,
  ) => {
    prevMessageLength.current = prevMessageLength.current - 1;
    setFirstTokenReceived(false);
    stream.submit(undefined, {
      checkpoint: parentCheckpoint,
      streamMode: ["values"],
    });
  };

  const chatStarted =
    !!threadId || !!messages.length || localMessages.length > 0;

  return (
    <Box sx={styles.appShellStyles}>
      <Header
        chatHistoryOpen={chatHistoryOpen}
        onToggleChatHistory={() => setChatHistoryOpen((p) => !p)}
        onNewThread={handleNewThread}
        chatStarted={chatStarted}
        isLargeScreen={isLargeScreen}
      />

      <Box sx={styles.mainContentStyles}>
        <Box sx={styles.desktopSidebarContainerStyles}>
          <Box
            component={motion.div}
            sx={styles.desktopSidebarMotionStyles}
            style={{ width: 300 }}
            animate={{
              x: chatHistoryOpen ? 0 : -300,
            }}
            initial={{ x: -300 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            <Box sx={{ position: "relative", height: "100%", width: 300 }}>
              <ThreadHistory />
            </Box>
          </Box>
        </Box>

        <Box
          component={motion.div}
          sx={styles.chatAreaStyles}
          animate={{
            marginLeft: chatHistoryOpen ? (isLargeScreen ? 300 : 0) : 0,
            width: chatHistoryOpen
              ? isLargeScreen
                ? "calc(100% - 300px)"
                : "100%"
              : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {!chatStarted && (
            <Box sx={styles.emptyStateStyles}>
              <Box sx={styles.emptyHeroPanelStyles}>
                <Typography as="span" sx={styles.emptyEyebrowStyles}>
                  <Sparkles className="size-4" />
                  Food assistant cho Đà Nẵng
                </Typography>
                <Typography as="h1" sx={styles.emptyTitleStyles}>
                  # Hôm nay bạn ăn gì?
                </Typography>
                <Typography as="p" sx={styles.emptyDescriptionStyles}>
                  Nói khẩu vị, nguyên liệu, sức khỏe hoặc ngân sách. Mình sẽ gợi
                  ý món phù hợp và giữ câu trả lời ngắn gọn như một người bạn
                  rành đồ ăn địa phương.
                </Typography>
                <Box sx={styles.promptGridStyles}>
                  {EMPTY_STATE_PROMPTS.map((prompt) => (
                    <Box
                      key={prompt}
                      component="button"
                      type="button"
                      sx={styles.promptCardStyles}
                      onClick={() => setInput(prompt)}
                    >
                      <Box sx={styles.promptIconStyles}>
                        <Sparkles className="size-4" />
                      </Box>
                      <Typography as="span" sx={styles.promptTextStyles}>
                        {prompt}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}

          <StickToBottom className="relative flex-1 overflow-hidden">
            <StickyToBottomContent
              className={cn(!chatStarted && "empty-chat-scroll")}
              contentClassName="chat-message-content"
              sx={styles.messageScrollStyles(chatStarted)}
              content={
                <Box sx={styles.messageContentStyles}>
                  {localMessages.map((message) =>
                    message.type === "human" ? (
                      <Box
                        key={message.id}
                        className="group"
                        sx={styles.localHumanGroupStyles}
                      >
                        <Box sx={styles.localHumanBubbleStyles}>
                          <Typography as="p" sx={{ whiteSpace: "pre-wrap" }}>
                            {message.content}
                          </Typography>
                          {message.attachments &&
                            message.attachments.length > 0 && (
                              <Box
                                sx={{
                                  mt: 1.5,
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                }}
                              >
                                {message.attachments.map((attachment) => (
                                  <Box
                                    key={attachment.id}
                                    sx={{
                                      display: "inline-flex",
                                      maxWidth: "100%",
                                      alignItems: "center",
                                      gap: 0.75,
                                      borderRadius: "999px",
                                      backgroundColor: "rgba(255,255,255,0.16)",
                                      px: 1.25,
                                      py: 0.5,
                                      color: "rgba(255,255,255,0.95)",
                                      fontSize: "0.75rem",
                                    }}
                                  >
                                    <Paperclip className="size-3.5" />
                                    <Typography
                                      as="span"
                                      sx={{
                                        maxWidth: "12rem",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {attachment.name}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            )}
                        </Box>
                        <LocalMessageActions
                          content={message.content}
                          isLoading={isLoading}
                        />
                      </Box>
                    ) : (
                      <Box
                        key={message.id}
                        className="group"
                        sx={styles.localAssistantGroupStyles}
                      >
                        <Box sx={styles.assistantAvatarStyles}>
                          <Sparkles className="size-4" />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            minWidth: 0,
                            flexDirection: "column",
                            gap: 0.75,
                          }}
                        >
                          <Box sx={styles.localAssistantBubbleStyles}>
                            <Typography as="p" sx={{ whiteSpace: "pre-wrap" }}>
                              {renderHighlightedText(
                                message.content,
                                message.foods,
                              )}
                            </Typography>

                            {message.foods && message.foods.length > 0 && (
                              <Box
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: "1fr",
                                  gap: 1.2,
                                  mt: 2,
                                }}
                              >
                                {message.foods.map((food) => (
                                  <Box
                                    key={food.id}
                                    sx={styles.foodResultCardStyles}
                                  >
                                    <Box sx={styles.foodResultHeaderStyles}>
                                      <Typography
                                        as="h4"
                                        sx={styles.foodResultTitleStyles}
                                      >
                                        {food.name}
                                      </Typography>
                                      <Typography
                                        as="span"
                                        sx={styles.scorePillStyles}
                                      >
                                        {food.matchScore.toFixed(1)}%
                                      </Typography>
                                    </Box>
                                    <Typography
                                      as="p"
                                      sx={{
                                        mt: 1,
                                        color: "var(--muted-foreground)",
                                        fontSize: "0.78rem",
                                        lineHeight: 1.6,
                                      }}
                                    >
                                      {food.description}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </Box>
                          <LocalMessageActions
                            content={message.content}
                            feedback={message.feedback}
                            isAiMessage
                            isLoading={isLoading}
                            onFeedback={(feedback) =>
                              handleLocalFeedback(message.id, feedback)
                            }
                            onRetry={
                              message.sourceQuery
                                ? () => handleLocalRegenerate(message)
                                : undefined
                            }
                          />
                        </Box>
                      </Box>
                    ),
                  )}
                  {messages
                    .filter((m) => !m.id?.startsWith(DO_NOT_RENDER_ID_PREFIX))
                    .map((message, index) =>
                      message.type === "human" ? (
                        <HumanMessage
                          key={message.id || `${message.type}-${index}`}
                          message={message}
                          isLoading={isLoading}
                        />
                      ) : (
                        <AssistantMessage
                          key={message.id || `${message.type}-${index}`}
                          message={message}
                          isLoading={isLoading}
                          handleRegenerate={handleRegenerate}
                        />
                      ),
                    )}
                  {isLoading && !firstTokenReceived && (
                    <AssistantMessageLoading />
                  )}
                </Box>
              }
            />

            <Box sx={styles.scrollToBottomWrapStyles}>
              <ScrollToBottom />
            </Box>
          </StickToBottom>

          <InputArea
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onHideToolCallsChange={setHideToolCalls}
            hideToolCalls={hideToolCalls}
            isLoading={isLoading}
            onCancel={handleCancel}
            attachments={attachments}
            onAttachmentsChange={setAttachments}
            onPromptSelect={setInput}
          />
        </Box>
      </Box>
    </Box>
  );
}
