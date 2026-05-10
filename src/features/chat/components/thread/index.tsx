import { v4 as uuidv4 } from "uuid";
import { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { useStreamContext } from "@/features/chat/providers/stream-provider";
import { useState, FormEvent } from "react";
import { Button } from "@/shared/components/ui/button";
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
    <div className="flex items-center gap-1 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 rounded-full text-muted-foreground"
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
            className={cn(
              "size-7 rounded-full text-muted-foreground",
              feedback === "like" &&
                "bg-green-500/10 text-green-600 dark:text-green-400",
            )}
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
            className={cn(
              "size-7 rounded-full text-muted-foreground",
              feedback === "dislike" &&
                "bg-red-500/10 text-red-600 dark:text-red-400",
            )}
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
              className="size-7 rounded-full text-muted-foreground"
              onClick={onRetry}
              disabled={isLoading}
              aria-label="Tạo lại câu trả lời"
            >
              <RefreshCcw className="size-4" />
            </Button>
          )}
        </>
      )}
    </div>
  );
}

function StickyToBottomContent(props: {
  content: ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  const context = useStickToBottomContext();
  return (
    <div
      ref={context.scrollRef}
      style={{ width: "100%", height: "100%" }}
      className={props.className}
    >
      <div ref={context.contentRef} className={props.contentClassName}>
        {props.content}
      </div>
    </div>
  );
}

function ScrollToBottom(props: { className?: string }) {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  if (isAtBottom) return null;
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("rounded-full", props.className)}
      onClick={() => scrollToBottom()}
    >
      <ArrowDown className="w-4 h-4" />
      <span>Scroll to bottom</span>
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
    <div className="flex w-full h-screen flex-col overflow-hidden bg-background">
      {/* Header */}
      <Header
        chatHistoryOpen={chatHistoryOpen}
        onToggleChatHistory={() => setChatHistoryOpen((p) => !p)}
        onNewThread={handleNewThread}
        chatStarted={chatStarted}
        isLargeScreen={isLargeScreen}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="relative lg:flex hidden">
          <motion.div
            className="absolute h-full border-r border-border bg-background overflow-hidden z-20"
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
            <div className="relative h-full" style={{ width: 300 }}>
              <ThreadHistory />
            </div>
          </motion.div>
        </div>

        {/* Chat Area */}
        <motion.div
          className="flex-1 flex flex-col min-w-0 overflow-hidden relative"
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
          {/* Empty State */}
          {!chatStarted && (
            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-orange-500 to-rose-500 text-transparent bg-clip-text">
                  # Hôm nay bạn ăn gì?
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-base">
                  Chọn một gợi ý hoặc nhập nhu cầu ăn uống của bạn.
                </p>
              </div>
              <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
                {EMPTY_STATE_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="group flex min-h-20 items-start gap-3 rounded-2xl border border-border bg-card/70 p-4 text-left shadow-sm transition hover:border-orange-500/50 hover:bg-orange-500/5"
                    onClick={() => setInput(prompt)}
                  >
                    <span className="mt-0.5 rounded-full bg-orange-500/10 p-2 text-orange-600 dark:text-orange-400">
                      <Sparkles className="size-4" />
                    </span>
                    <span className="text-sm font-medium leading-6 text-foreground group-hover:text-orange-600 dark:group-hover:text-orange-400">
                      {prompt}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages Area */}
          <StickToBottom className="relative flex-1 overflow-hidden">
            <StickyToBottomContent
              className={cn(
                "absolute px-4 inset-0 overflow-y-scroll [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700 [&::-webkit-scrollbar-track]:bg-transparent",
                !chatStarted && "flex flex-col items-stretch justify-center",
              )}
              contentClassName="py-8 px-4 max-w-3xl mx-auto flex flex-col gap-4 w-full"
              content={
                <>
                  {localMessages.map((message) =>
                    message.type === "human" ? (
                      <div
                        key={message.id}
                        className="group ml-auto flex max-w-[85%] flex-col items-end gap-1"
                      >
                        <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm text-white shadow-sm">
                          <p className="whitespace-pre-wrap">
                            {message.content}
                          </p>
                          {message.attachments &&
                            message.attachments.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {message.attachments.map((attachment) => (
                                  <span
                                    key={attachment.id}
                                    className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs text-white/95"
                                  >
                                    <Paperclip className="size-3.5" />
                                    <span className="max-w-[12rem] truncate">
                                      {attachment.name}
                                    </span>
                                  </span>
                                ))}
                              </div>
                            )}
                        </div>
                        <LocalMessageActions
                          content={message.content}
                          isLoading={isLoading}
                        />
                      </div>
                    ) : (
                      <div
                        key={message.id}
                        className="group mr-auto flex max-w-[90%] gap-3"
                      >
                        <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                          <Sparkles className="size-4" />
                        </div>
                        <div className="flex min-w-0 flex-col gap-1">
                          <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground/90 shadow-sm">
                            <p className="whitespace-pre-wrap">
                              {renderHighlightedText(
                                message.content,
                                message.foods,
                              )}
                            </p>

                            {message.foods && message.foods.length > 0 && (
                              <div className="mt-4 grid grid-cols-1 gap-3">
                                {message.foods.map((food) => (
                                  <div
                                    key={food.id}
                                    className="rounded-xl border border-border/70 bg-background/70 p-3"
                                  >
                                    <div className="flex items-start justify-between gap-3">
                                      <h4 className="font-semibold text-orange-600 dark:text-orange-400">
                                        {food.name}
                                      </h4>
                                      <span className="text-xs font-medium rounded-full bg-secondary px-2 py-1 whitespace-nowrap">
                                        {food.matchScore.toFixed(1)}%
                                      </span>
                                    </div>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                      {food.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
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
                        </div>
                      </div>
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
                </>
              }
            />

            {/* Scroll to Bottom Button */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10">
              <ScrollToBottom />
            </div>
          </StickToBottom>

          {/* Input Area */}
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
        </motion.div>
      </div>
    </div>
  );
}
