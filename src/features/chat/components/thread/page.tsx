/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useStreamContext } from "@/features/chat/providers/stream-provider";
import { useThreads } from "@/features/chat/providers/thread-provider";
import { isLoggedIn } from "@/features/auth/_api";
import { useState, FormEvent } from "react";
import { Button } from "@/shared/components/ui/button/index";
import { Box } from "@mui/material";
import { Typography } from "@/shared/components/ui/typography/index";
import { GeminiSparkleSVG } from "@/shared/components/icons/gemini-sparkle";
import {
  ArrowDown,
  Check,
  CircleAlert,
  Clock3,
  Copy,
  CopyCheck,
  Leaf,
  MapPinned,
  Paperclip,
  Pencil,
  RefreshCcw,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  WalletCards,
  X,
} from "lucide-react";
import { useQueryState, parseAsBoolean } from "nuqs";
import { StickToBottom, useStickToBottomContext } from "use-stick-to-bottom";
import { ThreadHistory } from "@/features/chat/components/thread/history";
import { toast } from "sonner";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { Header } from "./header";
import { ComposerAttachment, InputArea } from "./input-area";
import { MapInsightPanel } from "./map-insight-panel";
import { FoodCard } from "../food-card";
import { RecommendationFeedbackDialog } from "../recommendation-feedback-dialog";
import type {
  BackendFoodResult,
  ChatFeedback,
  ChatMessage,
  FoodRecommendationFeedbackPayload,
  FoodRecommendationFeedbackResult,
} from "../../_interface";
import { DEFAULT_ASSISTANT_DISCLAIMER } from "../../_interface";
import type {
  EmptyStatePrompt,
  FoodRecommendationCardProps,
  LocalMessageActionsProps,
  StickyToBottomContentProps,
} from ".";
import { styles } from ".";

const EMPTY_STATE_PROMPTS: EmptyStatePrompt[] = [
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
  onEdit,
  onFeedback,
  onRetry,
}: LocalMessageActionsProps) {
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
          <CopyCheck size={16} color="var(--success)" />
        ) : (
          <Copy size={16} />
        )}
      </Button>
      {!isAiMessage && onEdit && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          sx={{ width: 30, height: 30, borderRadius: "999px" }}
          onClick={onEdit}
          disabled={isLoading}
          aria-label="Chỉnh sửa câu hỏi"
        >
          <Pencil size={16} />
        </Button>
      )}
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
            <ThumbsUp size={16} />
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
            <ThumbsDown size={16} />
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
              <RefreshCcw size={16} />
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
  recommendationFeedback,
  message,
  onOpenLocations,
  onOpenFeedback,
}: FoodRecommendationCardProps) {
  return (
    <FoodCard
      food={food}
      index={index}
      recommendationFeedback={recommendationFeedback}
      onOpenFeedback={(nextFood) => onOpenFeedback(nextFood, message)}
      onOpenLocations={onOpenLocations}
    />
  );
}

function StickyToBottomContent(props: StickyToBottomContentProps) {
  const context = useStickToBottomContext();
  return (
    <Box ref={context.scrollRef} sx={props.sx}>
      <Box ref={context.contentRef} sx={styles.stickyContentInnerStyles}>
        {props.content}
      </Box>
    </Box>
  );
}

function ScrollToBottom() {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  if (isAtBottom) return null;
  return (
    <Button
      variant="outline"
      size="sm"
      sx={styles.scrollToBottomButtonStyles}
      onClick={() => scrollToBottom()}
    >
      <ArrowDown size={16} />
      <span>Cuộn xuống dưới</span>
    </Button>
  );
}

export default function Thread() {
  const [threadId, setThreadId] = useQueryState("threadId");
  const [chatHistoryOpen, setChatHistoryOpen] = useQueryState(
    "chatHistoryOpen",
    parseAsBoolean.withDefault(false),
  );
  const [useHealthProfile, setUseHealthProfile] = useQueryState(
    "useHealthProfile",
    parseAsBoolean.withDefault(true),
  );
  const [input, setInput] = useState("");
  const [firstTokenReceived, setFirstTokenReceived] = useState(false);
  const [attachments, setAttachments] = useState<ComposerAttachment[]>([]);
  const [mapFood, setMapFood] = useState<BackendFoodResult | null>(null);
  const [feedbackTarget, setFeedbackTarget] = useState<{
    food: BackendFoodResult;
    message: ChatMessage;
  } | null>(null);
  const [isSubmittingFoodFeedback, setIsSubmittingFoodFeedback] =
    useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const shouldReduceMotion = useReducedMotion();
  const backendAbortController = useRef<AbortController | null>(null);
  const {
    messagesByThreadId,
    loadMessages,
    createThread,
    sendMessage,
    editMessageAndResend,
    updateMessageFeedback,
    submitFoodRecommendationFeedback,
    isSendingMessage,
    messagesLoading,
  } = useThreads();

  const stream = useStreamContext();
  const isStreamLoading = stream.isLoading;
  const isLoading = isStreamLoading || isSendingMessage || messagesLoading;
  const isAwaitingAssistant =
    (isStreamLoading || isSendingMessage) && !firstTokenReceived;
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
            <Box
              component="span"
              key={`hit-${idx}`}
              sx={styles.highlightedFoodNameStyles}
            >
              {part}
            </Box>
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
        skipProfile: !useHealthProfile,
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
        skipProfile: !useHealthProfile,
        signal: controller.signal,
      });
      setFirstTokenReceived(true);
    } finally {
      if (backendAbortController.current === controller) {
        backendAbortController.current = null;
      }
    }
  };

  const handleStartEditMessage = (message: ChatMessage) => {
    if (isLoading) return;
    setEditingMessageId(message.id);
    setEditingContent(message.content);
  };

  const handleCancelEditMessage = () => {
    setEditingMessageId(null);
    setEditingContent("");
  };

  const handleSubmitEditedMessage = async (message: ChatMessage) => {
    const nextContent = editingContent.trim();
    if (!nextContent || isLoading) return;

    if (nextContent === message.content.trim()) {
      handleCancelEditMessage();
      return;
    }

    const controller = new AbortController();
    backendAbortController.current = controller;
    setFirstTokenReceived(false);

    try {
      await editMessageAndResend({
        threadId: message.threadId,
        messageId: message.id,
        content: nextContent,
        skipProfile: !useHealthProfile,
        signal: controller.signal,
      });
      setFirstTokenReceived(true);
      handleCancelEditMessage();
      toast.success("Đã cập nhật câu hỏi và tạo lại gợi ý.");
    } catch (error) {
      toast.error("Không chỉnh sửa được câu hỏi.", {
        description:
          error instanceof Error
            ? error.message
            : "Vui lòng thử lại sau ít phút.",
      });
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

  const handleOpenFoodFeedback = (
    food: BackendFoodResult,
    message: ChatMessage,
  ) => {
    if (!isLoggedIn()) {
      toast.error("Vui lòng đăng nhập để đánh giá gợi ý món ăn.");
      return;
    }

    setFeedbackTarget({ food, message });
  };

  const getFoodFeedbackForMessage = (
    message: ChatMessage,
    food: BackendFoodResult,
  ): FoodRecommendationFeedbackResult | undefined =>
    message.foodRecommendationFeedbacks?.find(
      (feedback) => feedback.foodId === food.id,
    );

  const handleSubmitFoodFeedback = async (
    value: Omit<
      FoodRecommendationFeedbackPayload,
      "threadId" | "messageId" | "foodId"
    >,
  ) => {
    if (!feedbackTarget) return;

    setIsSubmittingFoodFeedback(true);
    try {
      await submitFoodRecommendationFeedback({
        ...value,
        threadId: feedbackTarget.message.threadId,
        messageId: feedbackTarget.message.id,
        foodId: feedbackTarget.food.id,
      });
      setFeedbackTarget(null);
      toast.success("Đã ghi nhận đánh giá cho món gợi ý.");
    } catch (err) {
      toast.error("Không gửi được đánh giá món gợi ý.", {
        description:
          err instanceof Error ? err.message : "Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmittingFoodFeedback(false);
    }
  };

  const handleNewThread = () => {
    setThreadId(null);
    setAttachments([]);
    setInput("");
    handleCancelEditMessage();
    backendAbortController.current?.abort();
  };

  const handleCancel = () => {
    backendAbortController.current?.abort();
    stream.stop();
  };

  const chatStarted = !!threadId || localMessages.length > 0;

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
                  <Sparkles size={16} />
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
                          <PromptIcon size={16} />
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
            <StickToBottom style={styles.stickToBottomStyles}>
              <StickyToBottomContent
                sx={styles.messageScrollStyles(chatStarted)}
                content={
                  <Box sx={styles.messageContentStyles}>
                    {localMessages.map((message) => {
                      const isEditingMessage = editingMessageId === message.id;

                      return message.role === "human" ? (
                        <Box
                          key={message.id}
                          data-message-group="true"
                          sx={styles.localHumanGroupStyles}
                        >
                          <Box sx={styles.localHumanBubbleStyles}>
                            {isEditingMessage ? (
                              <Box
                                component="form"
                                sx={styles.humanMessageEditFormStyles}
                                onSubmit={(event) => {
                                  event.preventDefault();
                                  void handleSubmitEditedMessage(message);
                                }}
                              >
                                <Box
                                  component="textarea"
                                  value={editingContent}
                                  onChange={(event) =>
                                    setEditingContent(event.target.value)
                                  }
                                  onKeyDown={(event) => {
                                    if (
                                      event.key === "Enter" &&
                                      !event.shiftKey &&
                                      !event.metaKey &&
                                      !event.nativeEvent.isComposing
                                    ) {
                                      event.preventDefault();
                                      void handleSubmitEditedMessage(message);
                                    }
                                  }}
                                  autoFocus
                                  aria-label="Chỉnh sửa câu hỏi đã gửi"
                                  placeholder="Nhập lại câu hỏi..."
                                  sx={styles.humanMessageEditTextareaStyles}
                                />
                                <Box sx={styles.humanMessageEditActionsStyles}>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    sx={
                                      styles.humanMessageEditCancelButtonStyles
                                    }
                                    onClick={handleCancelEditMessage}
                                  >
                                    <X size={15} />
                                    Hủy
                                  </Button>
                                  <Button
                                    type="submit"
                                    size="sm"
                                    sx={
                                      styles.humanMessageEditSubmitButtonStyles
                                    }
                                    disabled={
                                      !editingContent.trim() || isLoading
                                    }
                                  >
                                    <Check size={15} />
                                    Gửi lại
                                  </Button>
                                </Box>
                              </Box>
                            ) : (
                              <Typography
                                as="p"
                                sx={{ whiteSpace: "pre-wrap" }}
                              >
                                {message.content}
                              </Typography>
                            )}
                            {!isEditingMessage &&
                              message.attachments &&
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
                                      <Paperclip size={14} />
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
                          {!isEditingMessage && (
                            <LocalMessageActions
                              content={message.content}
                              isLoading={isLoading}
                              onEdit={() => handleStartEditMessage(message)}
                            />
                          )}
                        </Box>
                      ) : (
                        <Box
                          key={message.id}
                          data-message-group="true"
                          sx={styles.localAssistantGroupStyles}
                        >
                          <Box sx={styles.assistantAvatarStyles}>
                            <Sparkles size={16} />
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              minWidth: 0,
                              flexDirection: "column",
                              gap: 0.75,
                            }}
                          >
                            {(() => {
                              const disclaimerText =
                                message.disclaimer?.trim() ||
                                DEFAULT_ASSISTANT_DISCLAIMER;

                              return (
                                <Box sx={styles.disclaimerNoticeStyles}>
                                  <Box sx={styles.disclaimerIconStyles}>
                                    <CircleAlert size={24} />
                                  </Box>
                                  <Typography
                                    as="p"
                                    sx={styles.disclaimerTextStyles}
                                  >
                                    {disclaimerText}
                                  </Typography>
                                </Box>
                              );
                            })()}
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
                                      message={message}
                                      recommendationFeedback={getFoodFeedbackForMessage(
                                        message,
                                        food,
                                      )}
                                      onOpenFeedback={handleOpenFoodFeedback}
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
                      );
                    })}
                    {isAwaitingAssistant && <AssistantMessageLoading />}
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
            onUseHealthProfileChange={setUseHealthProfile}
            useHealthProfile={useHealthProfile}
            isLoading={isLoading}
            onCancel={handleCancel}
            attachments={attachments}
            onAttachmentsChange={setAttachments}
            onPromptSelect={setInput}
          />
        </Box>
      </Box>
      <MapInsightPanel food={mapFood} onClose={() => setMapFood(null)} />
      <RecommendationFeedbackDialog
        foodName={feedbackTarget?.food.name ?? ""}
        initialValue={
          feedbackTarget
            ? getFoodFeedbackForMessage(feedbackTarget.message, feedbackTarget.food)
            : undefined
        }
        isLoading={isSubmittingFoodFeedback}
        open={Boolean(feedbackTarget)}
        onClose={() => setFeedbackTarget(null)}
        onSubmit={handleSubmitFoodFeedback}
      />
    </Box>
  );
}

export function AssistantMessageLoading() {
  return (
    <Box
      role="status"
      aria-live="polite"
      aria-label="AI đang tìm câu trả lời phù hợp"
      sx={styles.assistantLoadingGroupStyles}
    >
      <Box
        sx={[styles.assistantAvatarStyles, styles.assistantLoadingAvatarStyles]}
      >
        <GeminiSparkleSVG width={18} height={18} color="#f97316" />
      </Box>
      <Box sx={styles.assistantLoadingBubbleStyles}>
        <Typography as="p" sx={styles.assistantLoadingTitleStyles}>
          AI đang tìm câu trả lời phù hợp
          <Box component="span" sx={styles.assistantLoadingDotsStyles}>
            {[0, 120, 240].map((delay) => (
              <Box
                key={delay}
                component="span"
                sx={styles.assistantLoadingDotStyles(delay)}
              />
            ))}
          </Box>
        </Typography>
        <Typography as="p" sx={styles.assistantLoadingMetaStyles}>
          Đang phân tích khẩu vị, hồ sơ sức khỏe và món ăn phù hợp nhất.
        </Typography>
      </Box>
    </Box>
  );
}
