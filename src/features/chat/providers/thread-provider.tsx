/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";

import { isAuthSessionError } from "@/features/auth/_api";
import type {
  ChatEditAndResendPayload,
  ChatFeedback,
  ChatMessage,
  ChatSendPayload,
  ChatSendResponse,
  ChatThread,
  FoodRecommendationFeedbackPayload,
} from "../_interface";
import { chatApiAdapter } from "../lib/chat-api-adapter";

function mergeMessagesById(
  currentMessages: ChatMessage[],
  incomingMessages: ChatMessage[],
): ChatMessage[] {
  const seen = new Set<string>();
  const merged: ChatMessage[] = [];

  for (const message of [...currentMessages, ...incomingMessages]) {
    if (seen.has(message.id)) continue;
    seen.add(message.id);
    merged.push(message);
  }

  return merged;
}

function createThreadPreview(content: string): string | null {
  const preview = content.replace(/\s+/g, " ").trim();
  if (!preview) return null;
  return preview.length > 84 ? `${preview.slice(0, 81)}...` : preview;
}

function getLatestMessagePreview(messages: ChatMessage[]): {
  preview: string | null;
  createdAt: string | null;
} {
  const latestMessage = [...messages]
    .reverse()
    .find((message) => Boolean(message.content.trim()));

  return {
    preview: latestMessage ? createThreadPreview(latestMessage.content) : null,
    createdAt: latestMessage?.createdAt ?? null,
  };
}

function isGenericThreadPreview(preview: string): boolean {
  return (
    preview === "Chưa có tin nhắn" ||
    /^\d+\s+tin nhắn trong cuộc trò chuyện$/.test(preview)
  );
}

function mergeThreadPreview(
  incomingThread: ChatThread,
  currentThread?: ChatThread,
): ChatThread {
  if (!currentThread) return incomingThread;
  if (
    isGenericThreadPreview(incomingThread.lastMessagePreview) &&
    !isGenericThreadPreview(currentThread.lastMessagePreview)
  ) {
    return {
      ...incomingThread,
      lastMessagePreview: currentThread.lastMessagePreview,
    };
  }
  return incomingThread;
}

interface ThreadContextType {
  threads: ChatThread[];
  messagesByThreadId: Record<string, ChatMessage[]>;
  threadsLoading: boolean;
  messagesLoading: boolean;
  isSendingMessage: boolean;
  error: string | null;
  getThreads: () => Promise<ChatThread[]>;
  refreshThreads: () => Promise<ChatThread[]>;
  createThread: (initialMessage?: string) => Promise<ChatThread>;
  loadMessages: (threadId: string) => Promise<ChatMessage[]>;
  sendMessage: (payload: ChatSendPayload) => Promise<ChatSendResponse>;
  editMessageAndResend: (
    payload: ChatEditAndResendPayload,
  ) => Promise<ChatSendResponse>;
  renameThread: (threadId: string, title: string) => Promise<void>;
  deleteThread: (threadId: string) => Promise<void>;
  updateMessageFeedback: (
    threadId: string,
    messageId: string,
    feedback?: ChatFeedback,
  ) => Promise<void>;
  submitFoodRecommendationFeedback: (
    payload: FoodRecommendationFeedbackPayload,
  ) => Promise<void>;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export function ThreadProvider({ children }: { children: ReactNode }) {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [messagesByThreadId, setMessagesByThreadId] = useState<
    Record<string, ChatMessage[]>
  >({});
  const [threadsLoading, setThreadsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshThreads = useCallback(async () => {
    setThreadsLoading(true);
    setError(null);
    try {
      const nextThreads = await chatApiAdapter.listThreads();
      setThreads((prev) =>
        nextThreads.map((thread) =>
          mergeThreadPreview(
            thread,
            prev.find((item) => item.id === thread.id),
          ),
        ),
      );
      return nextThreads;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Không tải được lịch sử chat.";
      setError(message);
      if (isAuthSessionError(err)) {
        setThreads([]);
        setMessagesByThreadId({});
        return [];
      }
      throw err;
    } finally {
      setThreadsLoading(false);
    }
  }, []);

  const loadMessages = useCallback(async (threadId: string) => {
    setMessagesLoading(true);
    setError(null);
    try {
      const messages = await chatApiAdapter.getMessages(threadId);
      const latestMessage = getLatestMessagePreview(messages);
      setMessagesByThreadId((prev) => ({
        ...prev,
        [threadId]: messages,
      }));
      setThreads((prev) =>
        prev.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                updatedAt: latestMessage.createdAt ?? thread.updatedAt,
                lastMessagePreview:
                  latestMessage.preview ?? thread.lastMessagePreview,
              }
            : thread,
        ),
      );
      return messages;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Không tải được tin nhắn.";
      setError(message);
      if (isAuthSessionError(err)) {
        setMessagesByThreadId({});
        return [];
      }
      throw err;
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  const createThread = useCallback(async (initialMessage?: string) => {
    setError(null);
    const thread = await chatApiAdapter.createThread(initialMessage);
    setThreads((prev) => [
      thread,
      ...prev.filter((item) => item.id !== thread.id),
    ]);
    setMessagesByThreadId((prev) => ({
      ...prev,
      [thread.id]: prev[thread.id] ?? [],
    }));
    return thread;
  }, []);

  const sendMessage = useCallback(async (payload: ChatSendPayload) => {
    setIsSendingMessage(true);
    setError(null);
    if (!payload.replaceMessageId) {
      const optimisticMessage: ChatMessage = {
        id: `optimistic-${Date.now()}`,
        threadId: payload.threadId,
        role: "human",
        content: payload.content,
        attachments: payload.attachments,
        status: "sending",
        createdAt: new Date().toISOString(),
      };
      setMessagesByThreadId((prev) => ({
        ...prev,
        [payload.threadId]: [
          ...(prev[payload.threadId] ?? []),
          optimisticMessage,
        ],
      }));
    }

    try {
      const response = await chatApiAdapter.sendMessage(payload);
      setThreads((prev) => {
        const currentThread = prev.find(
          (item) => item.id === response.thread.id,
        );
        const nextThread: ChatThread = {
          ...response.thread,
          // Giữ title hiện tại nếu response trả về placeholder, tránh overwrite
          // title đã set (do user rename hoặc từ lượt gửi tin trước).
          title:
            response.thread.title !== "Cuộc trò chuyện mới"
              ? response.thread.title
              : (currentThread?.title ?? response.thread.title),
          createdAt: currentThread?.createdAt ?? response.thread.createdAt,
        };
        return [
          nextThread,
          ...prev.filter((item) => item.id !== response.thread.id),
        ];
      });
      setMessagesByThreadId((prev) => {
        const currentMessages = prev[payload.threadId] ?? [];

        if (payload.replaceMessageId) {
          const hasMessageToReplace = currentMessages.some(
            (message) => message.id === payload.replaceMessageId,
          );
          const nextMessages = hasMessageToReplace
            ? currentMessages.map((message) =>
                message.id === payload.replaceMessageId
                  ? response.assistantMessage
                  : message,
              )
            : mergeMessagesById(currentMessages, [response.assistantMessage]);

          return {
            ...prev,
            [payload.threadId]: nextMessages,
          };
        }

        const withoutOptimisticMessage = currentMessages.filter(
          (message) => !message.id.startsWith("optimistic-"),
        );

        return {
          ...prev,
          [payload.threadId]: mergeMessagesById(
            withoutOptimisticMessage,
            response.messages,
          ),
        };
      });
      return response;
    } catch (err) {
      // Rollback — xóa optimistic message để UI không bị treo
      setMessagesByThreadId((prev) => ({
        ...prev,
        [payload.threadId]: (prev[payload.threadId] ?? []).filter(
          (m) => !m.id.startsWith("optimistic-"),
        ),
      }));
      const message =
        err instanceof Error ? err.message : "Không gửi được tin nhắn.";
      toast.error(message);
      setError(message);
      throw err;
    } finally {
      setIsSendingMessage(false);
    }
  }, []);

  const editMessageAndResend = useCallback(
    async (payload: ChatEditAndResendPayload) => {
      const previousMessages = messagesByThreadId[payload.threadId] ?? [];
      const targetIndex = previousMessages.findIndex(
        (message) =>
          message.id === payload.messageId && message.role === "human",
      );

      if (targetIndex === -1) {
        throw new Error("Không tìm thấy câu hỏi cần chỉnh sửa.");
      }

      setIsSendingMessage(true);
      setError(null);
      setMessagesByThreadId((prev) => ({
        ...prev,
        [payload.threadId]: [
          ...previousMessages.slice(0, targetIndex),
          {
            ...previousMessages[targetIndex],
            content: payload.content,
            status: "complete",
          },
        ],
      }));

      try {
        const response = await chatApiAdapter.editMessageAndResend(payload);
        setThreads((prev) => {
          const currentThread = prev.find(
            (item) => item.id === response.thread.id,
          );
          const nextThread = currentThread
            ? {
                ...response.thread,
                title:
                  response.thread.title === "Cuộc trò chuyện mới"
                    ? currentThread.title
                    : response.thread.title,
                createdAt: currentThread.createdAt,
              }
            : response.thread;

          return [
            nextThread,
            ...prev.filter((item) => item.id !== response.thread.id),
          ];
        });
        setMessagesByThreadId((prev) => {
          const currentMessages = prev[payload.threadId] ?? [];
          const currentTargetIndex = currentMessages.findIndex(
            (message) =>
              message.id === payload.messageId && message.role === "human",
          );
          const prefix =
            currentTargetIndex >= 0
              ? currentMessages.slice(0, currentTargetIndex)
              : [];

          return {
            ...prev,
            [payload.threadId]: mergeMessagesById(prefix, response.messages),
          };
        });
        return response;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Không chỉnh sửa được câu hỏi.";
        setError(message);
        setMessagesByThreadId((prev) => ({
          ...prev,
          [payload.threadId]: previousMessages,
        }));
        throw err;
      } finally {
        setIsSendingMessage(false);
      }
    },
    [messagesByThreadId],
  );

  const renameThread = useCallback(async (threadId: string, title: string) => {
    setError(null);
    const thread = await chatApiAdapter.renameThread(threadId, title);
    setThreads((prev) =>
      prev.map((item) =>
        item.id === threadId
          ? {
              ...thread,
              lastMessagePreview: item.lastMessagePreview,
            }
          : item,
      ),
    );
  }, []);

  const deleteThread = useCallback(async (threadId: string) => {
    setError(null);
    await chatApiAdapter.deleteThread(threadId);
    setThreads((prev) => prev.filter((item) => item.id !== threadId));
    setMessagesByThreadId((prev) => {
      const { [threadId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const updateMessageFeedback = useCallback(
    async (threadId: string, messageId: string, feedback?: ChatFeedback) => {
      setError(null);
      const message = await chatApiAdapter.updateMessageFeedback(
        threadId,
        messageId,
        feedback,
      );
      setMessagesByThreadId((prev) => ({
        ...prev,
        [threadId]: (prev[threadId] ?? []).map((item) =>
          item.id === messageId ? message : item,
        ),
      }));
    },
    [],
  );

  const submitFoodRecommendationFeedback = useCallback(
    async (payload: FoodRecommendationFeedbackPayload) => {
      setError(null);
      const feedback =
        await chatApiAdapter.submitFoodRecommendationFeedback(payload);

      setMessagesByThreadId((prev) => ({
        ...prev,
        [payload.threadId]: (prev[payload.threadId] ?? []).map((message) => {
          if (message.id !== payload.messageId) return message;

          const currentFeedbacks = message.foodRecommendationFeedbacks ?? [];
          const nextFeedbacks = [
            feedback,
            ...currentFeedbacks.filter(
              (item) =>
                !(
                  item.assistantMessageId === feedback.assistantMessageId &&
                  item.foodId === feedback.foodId
                ),
            ),
          ];

          return {
            ...message,
            foodRecommendationFeedbacks: nextFeedbacks,
          };
        }),
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      threads,
      messagesByThreadId,
      threadsLoading,
      messagesLoading,
      isSendingMessage,
      error,
      getThreads: refreshThreads,
      refreshThreads,
      createThread,
      loadMessages,
      sendMessage,
      editMessageAndResend,
      renameThread,
      deleteThread,
      updateMessageFeedback,
      submitFoodRecommendationFeedback,
    }),
    [
      threads,
      messagesByThreadId,
      threadsLoading,
      messagesLoading,
      isSendingMessage,
      error,
      refreshThreads,
      createThread,
      loadMessages,
      sendMessage,
      editMessageAndResend,
      renameThread,
      deleteThread,
      updateMessageFeedback,
      submitFoodRecommendationFeedback,
    ],
  );

  return (
    <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
  );
}

export function useThreads() {
  const context = useContext(ThreadContext);
  if (context === undefined) {
    throw new Error("useThreads must be used within a ThreadProvider");
  }
  return context;
}
