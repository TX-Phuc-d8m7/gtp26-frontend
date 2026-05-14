import { ReactNode, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useStreamContext } from "@/features/chat/providers/stream-provider";
import { useThreads } from "@/features/chat/providers/thread-provider";
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
  Clock3,
  Copy,
  CopyCheck,
  Leaf,
  MapPinned,
  Paperclip,
  RefreshCcw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  WalletCards,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useQueryState, parseAsBoolean } from "nuqs";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import ThreadHistory from "./history";
import { toast } from "sonner";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { Header } from "./header";
import { ComposerAttachment, InputArea } from "./input-area";
import { MapInsightPanel } from "./map-insight-panel";
import type {
  BackendFoodResult,
  ChatFeedback,
  ChatMessage,
} from "../../_interface";
import { styles } from "../../_styles";
const EMPTY_STATE_PROMPTS: {
  title: string;
  meta: string;
  prompt: string;
  Icon: LucideIcon;
}[] = [
  {
    title: "Bữa tối nhanh",
    meta: "15 phút · ít dầu mỡ",
    prompt: "Gợi ý món tối nhanh, ít dầu mỡ",
    Icon: Clock3,
  },
  {
    title: "Sinh viên tiết kiệm",
    meta: "3 ngày · dễ mua",
    prompt: "Tạo thực đơn 3 ngày cho sinh viên",
    Icon: WalletCards,
  },
  {
    title: "Nhẹ bụng hơn",
    meta: "dịu vị · dễ tiêu",
    prompt: "Món phù hợp khi bị đau dạ dày",
    Icon: Leaf,
  },
  {
    title: "Đậm chất Đà Nẵng",
    meta: "địa phương · nhiều đạm",
    prompt: "Tìm món nhiều đạm nhưng không quá ngấy",
    Icon: MapPinned,
  },
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
  feedback?: ChatFeedback;
  isAiMessage?: boolean;
  isLoading: boolean;
  onFeedback?: (feedback: ChatFeedback) => void;
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

function FoodRecommendationCard({
  food,
  index,
  onOpenLocations,
}: {
  food: BackendFoodResult;
  index: number;
  onOpenLocations: (food: BackendFoodResult) => void;
}) {
  const score = Math.max(0, Math.min(100, food.matchScore));
  const locationCount = food.locations?.length ?? 0;
  const scoreLabel = new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: 1,
  }).format(score);

  return (
    <Box sx={styles.foodResultCardStyles}>
      <Box sx={styles.foodResultIconStyles}>
        <Typography as="span">{index + 1}</Typography>
      </Box>
      <Box sx={styles.foodResultContentStyles}>
        <Box sx={styles.foodResultHeaderStyles}>
          <Box sx={{ minWidth: 0 }}>
            <Typography as="span" sx={styles.foodResultMetaStyles}>
              Gợi ý món phù hợp
            </Typography>
            <Typography as="h4" sx={styles.foodResultTitleStyles}>
              {food.name}
            </Typography>
          </Box>
          <Typography as="span" sx={styles.scorePillStyles}>
            {scoreLabel}% hợp
          </Typography>
        </Box>
        <Typography as="p" sx={styles.foodResultDescriptionStyles}>
          {food.description}
        </Typography>
        <Box sx={styles.foodResultScoreTrackStyles}>
          <Box sx={styles.foodResultScoreFillStyles(score)} />
        </Box>
        {locationCount > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            sx={styles.foodLocationButtonStyles}
            onClick={() => onOpenLocations(food)}
          >
            <MapPinned className="size-4" />
            <span>{locationCount} quán gần bạn</span>
          </Button>
        )}
      </Box>
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
      <span>Cuộn xuống dưới</span>
    </Button>
  );
}

export function Thread() {
  const [threadId, setThreadId] = useQueryState("threadId");
  const [chatHistoryOpen, setChatHistoryOpen] = useQueryState(
    "chatHistoryOpen",
    parseAsBoolean.withDefault(false),
  );
  const [showRecommendationAnalysis, setShowRecommendationAnalysis] =
    useQueryState(
      "showRecommendationAnalysis",
      parseAsBoolean.withDefault(false),
    );
  const [input, setInput] = useState("");
  const [firstTokenReceived, setFirstTokenReceived] = useState(false);
  const [attachments, setAttachments] = useState<ComposerAttachment[]>([]);
  const [mapFood, setMapFood] = useState<BackendFoodResult | null>(null);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const shouldReduceMotion = useReducedMotion();
  const backendAbortController = useRef<AbortController | null>(null);
  const {
    messagesByThreadId,
    loadMessages,
    createThread,
    sendMessage,
    updateMessageFeedback,
    isSendingMessage,
    messagesLoading,
  } = useThreads();

  const stream = useStreamContext();
  const messages = stream.messages;
  const isStreamLoading = stream.isLoading;
  const isLoading = isStreamLoading || isSendingMessage || messagesLoading;
  const localMessages = threadId ? (messagesByThreadId[threadId] ?? []) : [];

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

  useEffect(() => {
    if (!threadId || messagesByThreadId[threadId]) return;
    loadMessages(threadId).catch(console.error);
  }, [loadMessages, messagesByThreadId, threadId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userQuery = input.trim();
    const messageAttachments = attachments;

    setInput("");
    setAttachments([]);

    const controller = new AbortController();
    backendAbortController.current = controller;
    setFirstTokenReceived(false);

    try {
      let activeThread = threadId;
      if (!activeThread) {
        const thread = await createThread(userQuery);
        activeThread = thread.id;
      }
      if (!threadId) {
        setThreadId(activeThread);
      }

      await sendMessage({
        threadId: activeThread,
        content: userQuery,
        attachments: messageAttachments,
        signal: controller.signal,
      });
      setFirstTokenReceived(true);
    } finally {
      if (backendAbortController.current === controller) {
        backendAbortController.current = null;
      }
    }
  };

  const handleLocalRegenerate = async (message: ChatMessage) => {
    if (!message.sourceQuery || isLoading) return;

    const controller = new AbortController();
    backendAbortController.current = controller;
    setFirstTokenReceived(false);

    try {
      await sendMessage({
        threadId: message.threadId,
        content: message.sourceQuery,
        replaceMessageId: message.id,
        signal: controller.signal,
      });
      setFirstTokenReceived(true);
    } finally {
      if (backendAbortController.current === controller) {
        backendAbortController.current = null;
      }
    }
  };

  const handleLocalFeedback = async (
    message: ChatMessage,
    feedback: ChatFeedback,
  ) => {
    await updateMessageFeedback(
      message.threadId,
      message.id,
      message.feedback === feedback ? undefined : feedback,
    );
    toast.success(
      feedback === "like"
        ? "Đã ghi nhận câu trả lời hữu ích."
        : "Đã ghi nhận phản hồi để cải thiện gợi ý.",
    );
  };

  const handleNewThread = () => {
    setThreadId(null);
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
              ...(shouldReduceMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }),
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
            ...(shouldReduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }),
          }}
        >
          {!chatStarted && (
            <Box sx={styles.emptyStateStyles}>
              <Box sx={styles.emptyHeroPanelStyles}>
                <Typography as="span" sx={styles.emptyEyebrowStyles}>
                  <Sparkles className="size-4" />
                  Food assistant cho món Đà Nẵng
                </Typography>
                <Typography as="h1" sx={styles.emptyTitleStyles}>
                  Hôm nay bạn ăn gì?
                </Typography>
                <Typography as="p" sx={styles.emptyDescriptionStyles}>
                  Nói khẩu vị, nguyên liệu, sức khỏe hoặc ngân sách. Mình sẽ gợi
                  ý món phù hợp và giữ câu trả lời ngắn gọn như một người bạn
                  rành đồ ăn địa phương.
                </Typography>
                <Box sx={styles.emptySignalRowStyles}>
                  {["Khẩu vị", "Ngân sách", "Sức khỏe", "Địa điểm"].map(
                    (signal) => (
                      <Typography
                        key={signal}
                        as="span"
                        sx={styles.emptySignalChipStyles}
                      >
                        {signal}
                      </Typography>
                    ),
                  )}
                </Box>
                <Box sx={styles.promptGridStyles}>
                  {EMPTY_STATE_PROMPTS.map((prompt) => {
                    const PromptIcon = prompt.Icon;

                    return (
                      <Box
                        key={prompt.title}
                        component={motion.button}
                        type="button"
                        sx={styles.promptCardStyles}
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : { y: -3, scale: 1.01 }
                        }
                        whileTap={
                          shouldReduceMotion ? undefined : { scale: 0.99 }
                        }
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        onClick={() => setInput(prompt.prompt)}
                        aria-label={`Dùng prompt: ${prompt.prompt}`}
                      >
                        <Box sx={styles.promptIconStyles}>
                          <PromptIcon className="size-4" />
                        </Box>
                        <Box sx={styles.promptCardContentStyles}>
                          <Typography as="span" sx={styles.promptTextStyles}>
                            {prompt.title}
                          </Typography>
                          <Typography as="span" sx={styles.promptTagStyles}>
                            {prompt.meta}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          )}

          {chatStarted && (
            <StickToBottom className="relative flex-1 overflow-hidden">
              <StickyToBottomContent
                contentClassName="chat-message-content"
                sx={styles.messageScrollStyles(chatStarted)}
                content={
                  <Box sx={styles.messageContentStyles}>
                    {localMessages.map((message) =>
                      message.role === "human" ? (
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
                                        backgroundColor:
                                          "rgba(255,255,255,0.16)",
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
                              <Typography
                                as="p"
                                sx={{ whiteSpace: "pre-wrap" }}
                              >
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
                                  {message.foods.map((food, index) => (
                                    <FoodRecommendationCard
                                      key={food.id}
                                      food={food}
                                      index={index}
                                      onOpenLocations={setMapFood}
                                    />
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
                                handleLocalFeedback(message, feedback)
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
          )}

          <InputArea
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onShowRecommendationAnalysisChange={setShowRecommendationAnalysis}
            showRecommendationAnalysis={showRecommendationAnalysis}
            isLoading={isLoading}
            onCancel={handleCancel}
            attachments={attachments}
            onAttachmentsChange={setAttachments}
            onPromptSelect={setInput}
          />
        </Box>
      </Box>
      <MapInsightPanel food={mapFood} onClose={() => setMapFood(null)} />
    </Box>
  );
}
