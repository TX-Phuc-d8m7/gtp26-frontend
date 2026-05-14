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

import type {
  ChatFeedback,
  ChatMessage,
  ChatSendPayload,
  ChatSendResponse,
  ChatThread,
} from "../_interface";
import { localChatApiAdapter } from "../lib/chat-api-adapter";

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
  renameThread: (threadId: string, title: string) => Promise<void>;
  deleteThread: (threadId: string) => Promise<void>;
  updateMessageFeedback: (
    threadId: string,
    messageId: string,
    feedback?: ChatFeedback,
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
      const nextThreads = await localChatApiAdapter.listThreads();
      setThreads(nextThreads);
      return nextThreads;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Không tải được lịch sử chat.";
      setError(message);
      throw err;
    } finally {
      setThreadsLoading(false);
    }
  }, []);

  const loadMessages = useCallback(async (threadId: string) => {
    setMessagesLoading(true);
    setError(null);
    try {
      const messages = await localChatApiAdapter.getMessages(threadId);
      setMessagesByThreadId((prev) => ({
        ...prev,
        [threadId]: messages,
      }));
      return messages;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Không tải được tin nhắn.";
      setError(message);
      throw err;
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  const createThread = useCallback(async (initialMessage?: string) => {
    setError(null);
    const thread = await localChatApiAdapter.createThread(initialMessage);
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
      const response = await localChatApiAdapter.sendMessage(payload);
      setThreads((prev) => [
        response.thread,
        ...prev.filter((item) => item.id !== response.thread.id),
      ]);
      setMessagesByThreadId((prev) => ({
        ...prev,
        [payload.threadId]: response.messages,
      }));
      return response;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Không gửi được tin nhắn.";
      setError(message);
      throw err;
    } finally {
      setIsSendingMessage(false);
    }
  }, []);

  const renameThread = useCallback(async (threadId: string, title: string) => {
    setError(null);
    const thread = await localChatApiAdapter.renameThread(threadId, title);
    setThreads((prev) =>
      prev.map((item) => (item.id === threadId ? thread : item)),
    );
  }, []);

  const deleteThread = useCallback(async (threadId: string) => {
    setError(null);
    await localChatApiAdapter.deleteThread(threadId);
    setThreads((prev) => prev.filter((item) => item.id !== threadId));
    setMessagesByThreadId((prev) => {
      const { [threadId]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const updateMessageFeedback = useCallback(
    async (threadId: string, messageId: string, feedback?: ChatFeedback) => {
      setError(null);
      const message = await localChatApiAdapter.updateMessageFeedback(
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
      renameThread,
      deleteThread,
      updateMessageFeedback,
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
      renameThread,
      deleteThread,
      updateMessageFeedback,
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
