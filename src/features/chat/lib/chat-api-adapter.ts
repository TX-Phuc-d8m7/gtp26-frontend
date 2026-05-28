/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { v4 as uuidv4 } from "uuid";

import { apiFetch, isLoggedIn } from "@/features/auth/_api";
import type {
  ChatEditAndResendPayload,
  BackendFoodResult,
  BackendSearchResponse,
  ChatApiAdapter,
  ChatFeedback,
  ChatMessage,
  ChatRole,
  ChatSendPayload,
  ChatSendResponse,
  ChatThread,
  FoodRecommendationFeedbackResult,
} from "../_interface";

const FOOD_AI_API_URL =
  process.env.NEXT_PUBLIC_FOOD_AI_API_URL ?? "http://localhost:8000";
const STORAGE_KEY = "foodie-suggest:chat-store:v1";
const SEARCH_API_TIMEOUT_MS = 30000;

interface ChatStorageState {
  threads: ChatThread[];
  messagesByThreadId: Record<string, ChatMessage[]>;
}

const emptyStore: ChatStorageState = {
  threads: [],
  messagesByThreadId: {},
};

function isBrowser() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

function readStore(): ChatStorageState {
  if (!isBrowser()) return emptyStore;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...emptyStore, messagesByThreadId: {} };
    const parsed = JSON.parse(raw) as Partial<ChatStorageState>;
    return {
      threads: Array.isArray(parsed.threads) ? parsed.threads : [],
      messagesByThreadId:
        parsed.messagesByThreadId &&
        typeof parsed.messagesByThreadId === "object"
          ? parsed.messagesByThreadId
          : {},
    };
  } catch {
    return { ...emptyStore, messagesByThreadId: {} };
  }
}

function writeStore(store: ChatStorageState) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function sortThreads(threads: ChatThread[]) {
  return [...threads].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

function createThreadTitle(initialMessage?: string) {
  const title = initialMessage?.trim();
  if (!title) return "Cuộc trò chuyện mới";
  return title.length > 46 ? `${title.slice(0, 43)}...` : title;
}

function createPreview(content: string) {
  const preview = content.replace(/\s+/g, " ").trim();
  if (!preview) return "Chưa có tin nhắn";
  return preview.length > 84 ? `${preview.slice(0, 81)}...` : preview;
}

function upsertThread(store: ChatStorageState, thread: ChatThread) {
  const nextThreads = store.threads.some((item) => item.id === thread.id)
    ? store.threads.map((item) => (item.id === thread.id ? thread : item))
    : [thread, ...store.threads];

  return {
    ...store,
    threads: sortThreads(nextThreads),
  };
}

function createThreadWithId(id: string, initialMessage?: string): ChatThread {
  const now = new Date().toISOString();
  return {
    id,
    title: createThreadTitle(initialMessage),
    createdAt: now,
    updatedAt: now,
    lastMessagePreview: initialMessage
      ? createPreview(initialMessage)
      : "Chưa có tin nhắn",
    status: "idle",
  };
}

function buildAssistantContent(data: BackendSearchResponse) {
  const suggestionNames = (data.results ?? [])
    .slice(0, 5)
    .map((item) => item.name);
  const adviceText =
    data.ai_response?.trim() || "Mình đã tìm được một số món phù hợp cho bạn.";
  const warningText = data.ai_insight?.warning_message?.trim();
  const suggestionText = suggestionNames.length
    ? `\n\nGợi ý nhanh: ${suggestionNames.join(", ")}.`
    : "\n\nHiện chưa có món phù hợp trong dữ liệu.";

  return `${warningText ? `${warningText}\n\n` : ""}${adviceText}${suggestionText}`;
}

async function requestFoodSearch(payload: ChatSendPayload) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    SEARCH_API_TIMEOUT_MS,
  );
  const abortFromPayload = () => controller.abort();
  payload.signal?.addEventListener("abort", abortFromPayload, { once: true });

  try {
    const searchParams = new URLSearchParams({
      q: payload.content,
      skip_profile: payload.skipProfile ? "true" : "false",
    });

    const response = await fetch(
      `${FOOD_AI_API_URL}/foods/search?${searchParams.toString()}`,
      { signal: controller.signal },
    );

    if (!response.ok) {
      throw new Error(`API trả về mã lỗi ${response.status}`);
    }

    return (await response.json()) as BackendSearchResponse;
  } finally {
    window.clearTimeout(timeoutId);
    payload.signal?.removeEventListener("abort", abortFromPayload);
  }
}

function buildAssistantMessage(
  payload: ChatSendPayload,
  response: BackendSearchResponse,
  id = uuidv4(),
): ChatMessage {
  return {
    id,
    threadId: payload.threadId,
    role: "assistant",
    content: buildAssistantContent(response),
    foods: (response.results ?? []).map((food) =>
      beFoodResultToFE(food as unknown as Record<string, unknown>),
    ),
    aiInsight: response.ai_insight,
    disclaimer: response.disclaimer,
    status: "complete",
    sourceQuery: payload.content,
    createdAt: new Date().toISOString(),
  };
}

function buildAssistantErrorMessage(
  payload: ChatSendPayload,
  id = uuidv4(),
): ChatMessage {
  return {
    id,
    threadId: payload.threadId,
    role: "assistant",
    content:
      "Không gọi được API backend để tra cứu món ăn, vui lòng kiểm tra server.",
    status: "error",
    sourceQuery: payload.content,
    createdAt: new Date().toISOString(),
  };
}

function normalizeStoredMessages(messages: ChatMessage[]) {
  return messages.map((message) =>
    message.foods?.length
      ? {
          ...message,
          foods: message.foods.map((food) =>
            beFoodResultToFE(food as unknown as Record<string, unknown>),
          ),
        }
      : message,
  );
}

function normalizeLocalIntentText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildLocalIntentAssistantMessage(
  payload: ChatSendPayload,
  id = uuidv4(),
): ChatMessage | null {
  const query = normalizeLocalIntentText(payload.content);
  const isShortGreeting =
    query.length <= 36 &&
    /^(xin chao|chao|chao ban|hello|hi|hey|alo|ban oi)( ban)?$/.test(query);

  if (!isShortGreeting) return null;

  return {
    id,
    threadId: payload.threadId,
    role: "assistant",
    content:
      "Chào bạn, mình sẵn sàng gợi ý món ăn theo khẩu vị, nguyên liệu, sức khỏe hoặc địa điểm ở Đà Nẵng. Bạn đang muốn ăn món nhẹ, món no bụng hay có tiêu chí cụ thể nào cho bữa này không?",
    foods: [],
    aiInsight: {
      exclude: [],
      include: [],
      prefer: [],
    },
    status: "complete",
    sourceQuery: payload.content,
    createdAt: new Date().toISOString(),
  };
}

export const localChatApiAdapter: ChatApiAdapter = {
  async listThreads() {
    return sortThreads(readStore().threads);
  },

  async createThread(initialMessage) {
    const store = readStore();
    const now = new Date().toISOString();
    const thread: ChatThread = {
      id: uuidv4(),
      title: createThreadTitle(initialMessage),
      createdAt: now,
      updatedAt: now,
      lastMessagePreview: initialMessage
        ? createPreview(initialMessage)
        : "Chưa có tin nhắn",
      status: "idle",
    };

    writeStore(
      upsertThread(
        {
          ...store,
          messagesByThreadId: {
            ...store.messagesByThreadId,
            [thread.id]: store.messagesByThreadId[thread.id] ?? [],
          },
        },
        thread,
      ),
    );

    return thread;
  },

  async getMessages(threadId) {
    return normalizeStoredMessages(
      readStore().messagesByThreadId[threadId] ?? [],
    );
  },

  async sendMessage(payload): Promise<ChatSendResponse> {
    let store = readStore();
    const now = new Date().toISOString();
    const existingThread =
      store.threads.find((item) => item.id === payload.threadId) ??
      createThreadWithId(payload.threadId, payload.content);

    const currentMessages = store.messagesByThreadId[payload.threadId] ?? [];
    const humanMessage: ChatMessage = {
      id: uuidv4(),
      threadId: payload.threadId,
      role: "human",
      content: payload.content,
      attachments: payload.attachments,
      status: "complete",
      createdAt: now,
    };
    const messagesBeforeAssistant = payload.replaceMessageId
      ? currentMessages
      : [...currentMessages, humanMessage];

    let assistantMessage: ChatMessage;
    const localIntentMessage = buildLocalIntentAssistantMessage(
      payload,
      payload.replaceMessageId,
    );

    if (localIntentMessage) {
      assistantMessage = localIntentMessage;
    } else {
      try {
        const data = await requestFoodSearch(payload);
        assistantMessage = buildAssistantMessage(
          payload,
          data,
          payload.replaceMessageId,
        );
      } catch (error) {
        const isAbortError =
          error instanceof Error && error.name === "AbortError";
        assistantMessage = {
          ...buildAssistantErrorMessage(payload, payload.replaceMessageId),
          content: isAbortError
            ? "Yêu cầu đã bị dừng hoặc backend phản hồi quá lâu, vui lòng thử lại."
            : "Không gọi được API backend để tra cứu món ăn, vui lòng kiểm tra server.",
        };
      }
    }

    const nextMessages = payload.replaceMessageId
      ? messagesBeforeAssistant.map((message) =>
          message.id === payload.replaceMessageId ? assistantMessage : message,
        )
      : [...messagesBeforeAssistant, assistantMessage];
    const normalizedNextMessages = normalizeStoredMessages(nextMessages);

    const nextThread: ChatThread = {
      ...existingThread,
      title:
        existingThread.title === "Cuộc trò chuyện mới"
          ? createThreadTitle(payload.content)
          : existingThread.title,
      updatedAt: new Date().toISOString(),
      lastMessagePreview: createPreview(assistantMessage.content),
      status: assistantMessage.status === "error" ? "error" : "idle",
    };

    store = upsertThread(
      {
        ...store,
        messagesByThreadId: {
          ...store.messagesByThreadId,
          [payload.threadId]: normalizedNextMessages,
        },
      },
      nextThread,
    );
    writeStore(store);

    return {
      thread: nextThread,
      messages: normalizedNextMessages,
      assistantMessage,
    };
  },

  async editMessageAndResend(
    payload: ChatEditAndResendPayload,
  ): Promise<ChatSendResponse> {
    let store = readStore();
    const existingThread =
      store.threads.find((item) => item.id === payload.threadId) ??
      createThreadWithId(payload.threadId, payload.content);

    const currentMessages = store.messagesByThreadId[payload.threadId] ?? [];
    const targetIndex = currentMessages.findIndex(
      (message) => message.id === payload.messageId && message.role === "human",
    );

    if (targetIndex === -1) {
      throw new Error("Không tìm thấy câu hỏi cần chỉnh sửa.");
    }

    const editedHumanMessage: ChatMessage = {
      ...currentMessages[targetIndex],
      content: payload.content,
      status: "complete",
    };
    const messagesBeforeAssistant = [
      ...currentMessages.slice(0, targetIndex),
      editedHumanMessage,
    ];

    let assistantMessage: ChatMessage;
    const localIntentMessage = buildLocalIntentAssistantMessage(payload);

    if (localIntentMessage) {
      assistantMessage = localIntentMessage;
    } else {
      try {
        const data = await requestFoodSearch(payload);
        assistantMessage = buildAssistantMessage(payload, data);
      } catch (error) {
        const isAbortError =
          error instanceof Error && error.name === "AbortError";
        assistantMessage = {
          ...buildAssistantErrorMessage(payload),
          content: isAbortError
            ? "Yêu cầu đã bị dừng hoặc backend phản hồi quá lâu, vui lòng thử lại."
            : "Không gọi được API backend để tra cứu món ăn, vui lòng kiểm tra server.",
        };
      }
    }

    const normalizedNextMessages = normalizeStoredMessages([
      ...messagesBeforeAssistant,
      assistantMessage,
    ]);
    const nextThread: ChatThread = {
      ...existingThread,
      title:
        targetIndex === 0
          ? createThreadTitle(payload.content)
          : existingThread.title,
      updatedAt: new Date().toISOString(),
      lastMessagePreview: createPreview(assistantMessage.content),
      status: assistantMessage.status === "error" ? "error" : "idle",
    };

    store = upsertThread(
      {
        ...store,
        messagesByThreadId: {
          ...store.messagesByThreadId,
          [payload.threadId]: normalizedNextMessages,
        },
      },
      nextThread,
    );
    writeStore(store);

    return {
      thread: nextThread,
      messages: normalizedNextMessages,
      assistantMessage,
    };
  },

  async renameThread(threadId, title) {
    const store = readStore();
    const thread = store.threads.find((item) => item.id === threadId);
    if (!thread) {
      throw new Error("Không tìm thấy cuộc trò chuyện.");
    }

    const nextThread: ChatThread = {
      ...thread,
      title: title.trim() || "Cuộc trò chuyện mới",
      updatedAt: new Date().toISOString(),
    };
    writeStore(upsertThread(store, nextThread));
    return nextThread;
  },

  async deleteThread(threadId) {
    const store = readStore();
    const { [threadId]: _, ...messagesByThreadId } = store.messagesByThreadId;
    writeStore({
      threads: store.threads.filter((item) => item.id !== threadId),
      messagesByThreadId,
    });
  },

  async updateMessageFeedback(threadId, messageId, feedback?: ChatFeedback) {
    const store = readStore();
    const messages = store.messagesByThreadId[threadId] ?? [];
    const target = messages.find((message) => message.id === messageId);
    if (!target) {
      throw new Error("Không tìm thấy tin nhắn.");
    }

    const nextMessage: ChatMessage = {
      ...target,
      feedback,
    };
    const nextMessages = messages.map((message) =>
      message.id === messageId ? nextMessage : message,
    );

    writeStore({
      ...store,
      messagesByThreadId: {
        ...store.messagesByThreadId,
        [threadId]: nextMessages,
      },
    });

    return nextMessage;
  },

  async submitFoodRecommendationFeedback() {
    throw new Error("Vui lòng đăng nhập để đánh giá gợi ý món ăn.");
  },
};

// ---------------------------------------------------------------------------
// Remote adapter — dùng backend API thật khi user đã đăng nhập
// ---------------------------------------------------------------------------

/** Inline backend raw types (chỉ những field FE cần) */
interface BEThread {
  id: string;
  title: string | null;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
  message_count: number;
  last_message_at: string | null;
}

interface BEMessage {
  id: string;
  thread_id: string;
  role: string; // "user" | "assistant"
  content: string;
  food_results: Record<string, unknown>[] | null;
  feedback: string | null;
  food_recommendation_feedbacks?: BEFoodRecommendationFeedback[] | null;
  disclaimer?: string | null;
  created_at: string;
}

interface BEFoodRecommendationFeedback {
  id: string;
  user_id: string;
  thread_id: string;
  assistant_message_id: string;
  food_id: string;
  verdict: "like" | "neutral" | "dislike";
  rating?: number | null;
  reasons?: string[] | null;
  comment?: string | null;
  tried: boolean;
  created_at: string;
  updated_at: string;
}

interface BESendResponse {
  user_message: BEMessage;
  assistant_message: BEMessage;
  search_result?: {
    query: string;
    ai_insight: BackendSearchResponse["ai_insight"];
    results: Record<string, unknown>[];
    disclaimer?: string | null;
    ai_response?: string | null;
  } | null;
}

function beThreadToFE(t: BEThread): ChatThread {
  return {
    id: String(t.id),
    title: t.title ?? "Cuộc trò chuyện mới",
    createdAt: t.created_at,
    updatedAt: t.updated_at,
    lastMessagePreview: "Chưa có tin nhắn",
    status: "idle",
  };
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function stringArrayFromUnknown(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function beFoodResultToFE(f: Record<string, unknown>): BackendFoodResult {
  const softTags = stringArrayFromUnknown(f.soft_tags);
  const imgUrl = optionalString(f.img_url) ?? null;

  return {
    id: String(f.id ?? ""),
    name: String(f.name ?? ""),
    description: String(f.description ?? ""),
    img_url: imgUrl,
    core_ingredients: stringArrayFromUnknown(f.core_ingredients),
    soft_tags: softTags,
    taste_profile: stringArrayFromUnknown(f.taste_profile),
    meal_context: stringArrayFromUnknown(f.meal_context),
    occasion_context: stringArrayFromUnknown(f.occasion_context),
    matchScore:
      typeof f.matchScore === "number"
        ? f.matchScore
        : typeof f.match_score === "number"
          ? f.match_score
          : 0,
    reason: (f.reason as string | null | undefined) ?? null,
  };
}

function beFoodRecommendationFeedbackToFE(
  feedback: BEFoodRecommendationFeedback,
): FoodRecommendationFeedbackResult {
  return {
    id: String(feedback.id),
    userId: String(feedback.user_id),
    threadId: String(feedback.thread_id),
    assistantMessageId: String(feedback.assistant_message_id),
    foodId: String(feedback.food_id),
    verdict: feedback.verdict,
    rating: feedback.rating ?? null,
    reasons: Array.isArray(feedback.reasons) ? feedback.reasons : [],
    comment: feedback.comment ?? null,
    tried: Boolean(feedback.tried),
    createdAt: feedback.created_at,
    updatedAt: feedback.updated_at,
  };
}

function beMessageToFE(m: BEMessage): ChatMessage {
  const role: ChatRole = m.role === "user" ? "human" : (m.role as ChatRole);
  return {
    id: String(m.id),
    threadId: String(m.thread_id),
    role,
    content: m.content,
    createdAt: m.created_at,
    foods: m.food_results ? m.food_results.map(beFoodResultToFE) : undefined,
    feedback: (m.feedback ?? undefined) as ChatFeedback | undefined,
    foodRecommendationFeedbacks: (m.food_recommendation_feedbacks ?? []).map(
      beFoodRecommendationFeedbackToFE,
    ),
    disclaimer: m.disclaimer ?? undefined,
    status: "complete",
  };
}

async function parseApiError(res: Response, fallback: string): Promise<string> {
  try {
    const body = await res.json();
    if (typeof body.detail === "string") return body.detail;
    if (Array.isArray(body.detail))
      return body.detail.map((e: { msg: string }) => e.msg).join("; ");
  } catch {
    /* ignore */
  }
  return fallback;
}

export const remoteChatApiAdapter: ChatApiAdapter = {
  async listThreads() {
    const res = await apiFetch("/chat/threads?limit=100&pinned_first=true");
    if (!res.ok)
      throw new Error(await parseApiError(res, "Không tải được lịch sử chat."));
    const data = await res.json();
    return (data.items as BEThread[]).map(beThreadToFE);
  },

  async createThread(initialMessage) {
    const title = initialMessage?.trim()
      ? initialMessage.trim().slice(0, 100)
      : undefined;
    const res = await apiFetch("/chat/threads", {
      method: "POST",
      body: JSON.stringify({ title: title ?? null }),
    });
    if (!res.ok)
      throw new Error(
        await parseApiError(res, "Không tạo được cuộc trò chuyện."),
      );
    return beThreadToFE(await res.json());
  },

  async getMessages(threadId) {
    const res = await apiFetch(`/chat/threads/${threadId}/messages?limit=200`);
    if (!res.ok)
      throw new Error(await parseApiError(res, "Không tải được tin nhắn."));
    const data = await res.json();
    return (data.items as BEMessage[]).map(beMessageToFE);
  },

  async sendMessage(payload) {
    let res: Response;

    if (payload.replaceMessageId) {
      // Regenerate assistant message
      res = await apiFetch(
        `/chat/threads/${payload.threadId}/messages/${payload.replaceMessageId}/regenerate`,
        {
          method: "POST",
          body: JSON.stringify({ skip_profile: payload.skipProfile ?? false }),
        },
      );
    } else {
      // New message
      res = await apiFetch(`/chat/threads/${payload.threadId}/messages`, {
        method: "POST",
        body: JSON.stringify({
          query: payload.content,
          skip_profile: payload.skipProfile ?? false,
        }),
      });
    }

    if (!res.ok)
      throw new Error(await parseApiError(res, "Không gửi được tin nhắn."));

    const data: BESendResponse = await res.json();

    const baseAssistantMessage = beMessageToFE(data.assistant_message);
    const searchResult = data.search_result;

    const assistantMessage: ChatMessage = {
      ...baseAssistantMessage,
      foods:
        searchResult?.results?.map(beFoodResultToFE) ??
        baseAssistantMessage.foods,
      aiInsight: searchResult?.ai_insight ?? baseAssistantMessage.aiInsight,
      disclaimer: searchResult?.disclaimer ?? baseAssistantMessage.disclaimer,
      sourceQuery: payload.content,
    };

    const userMessage = beMessageToFE(data.user_message);
    const allMessages = payload.replaceMessageId
      ? [assistantMessage]
      : [userMessage, assistantMessage];

    const thread: ChatThread = {
      id: payload.threadId,
      title: "Cuộc trò chuyện mới",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastMessagePreview:
        assistantMessage.content.length > 84
          ? `${assistantMessage.content.slice(0, 81)}...`
          : assistantMessage.content,
      status: "idle",
    };

    return { thread, messages: allMessages, assistantMessage };
  },

  async editMessageAndResend(payload) {
    const res = await apiFetch(
      `/chat/threads/${payload.threadId}/messages/${payload.messageId}/edit`,
      {
        method: "POST",
        signal: payload.signal,
        body: JSON.stringify({
          query: payload.content,
          skip_profile: payload.skipProfile ?? false,
        }),
      },
    );

    if (!res.ok)
      throw new Error(
        await parseApiError(res, "Không chỉnh sửa được câu hỏi."),
      );

    const data: BESendResponse = await res.json();
    const userMessage = beMessageToFE(data.user_message);
    const baseAssistantMessage = beMessageToFE(data.assistant_message);
    const searchResult = data.search_result;

    const assistantMessage: ChatMessage = {
      ...baseAssistantMessage,
      foods:
        searchResult?.results?.map(beFoodResultToFE) ??
        baseAssistantMessage.foods,
      aiInsight: searchResult?.ai_insight ?? baseAssistantMessage.aiInsight,
      disclaimer: searchResult?.disclaimer ?? baseAssistantMessage.disclaimer,
      sourceQuery: payload.content,
    };

    const thread: ChatThread = {
      id: payload.threadId,
      title: "Cuộc trò chuyện mới",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastMessagePreview:
        assistantMessage.content.length > 84
          ? `${assistantMessage.content.slice(0, 81)}...`
          : assistantMessage.content,
      status: "idle",
    };

    return {
      thread,
      messages: [userMessage, assistantMessage],
      assistantMessage,
    };
  },

  async renameThread(threadId, title) {
    const res = await apiFetch(`/chat/threads/${threadId}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
    });
    if (!res.ok)
      throw new Error(
        await parseApiError(res, "Không đổi tên được cuộc trò chuyện."),
      );
    return beThreadToFE(await res.json());
  },

  async deleteThread(threadId) {
    const res = await apiFetch(`/chat/threads/${threadId}`, {
      method: "DELETE",
    });
    if (!res.ok && res.status !== 404)
      throw new Error(
        await parseApiError(res, "Không xóa được cuộc trò chuyện."),
      );
  },

  async updateMessageFeedback(threadId, messageId, feedback) {
    const res = await apiFetch(
      `/chat/threads/${threadId}/messages/${messageId}/feedback`,
      {
        method: "PATCH",
        body: JSON.stringify({ feedback: feedback ?? null }),
      },
    );
    if (!res.ok)
      throw new Error(
        await parseApiError(res, "Không cập nhật được phản hồi."),
      );
    return beMessageToFE(await res.json());
  },

  async submitFoodRecommendationFeedback(payload) {
    const res = await apiFetch(
      `/chat/threads/${payload.threadId}/messages/${payload.messageId}/food-feedback`,
      {
        method: "POST",
        body: JSON.stringify({
          food_id: payload.foodId,
          verdict: payload.verdict,
          rating: payload.rating ?? null,
          reasons: payload.reasons,
          comment: payload.comment ?? null,
          tried: payload.tried,
        }),
      },
    );
    if (!res.ok) {
      throw new Error(
        await parseApiError(res, "Không gửi được đánh giá món gợi ý."),
      );
    }
    return beFoodRecommendationFeedbackToFE(await res.json());
  },
};

// ---------------------------------------------------------------------------
// Smart adapter — tự chọn remote (đã login) hoặc local (chưa login)
// ---------------------------------------------------------------------------

export const chatApiAdapter: ChatApiAdapter = {
  listThreads: () =>
    isLoggedIn()
      ? remoteChatApiAdapter.listThreads()
      : localChatApiAdapter.listThreads(),

  createThread: (initialMessage) =>
    isLoggedIn()
      ? remoteChatApiAdapter.createThread(initialMessage)
      : localChatApiAdapter.createThread(initialMessage),

  getMessages: (threadId) =>
    isLoggedIn()
      ? remoteChatApiAdapter.getMessages(threadId)
      : localChatApiAdapter.getMessages(threadId),

  sendMessage: (payload) =>
    isLoggedIn()
      ? remoteChatApiAdapter.sendMessage(payload)
      : localChatApiAdapter.sendMessage(payload),

  editMessageAndResend: (payload) =>
    isLoggedIn()
      ? remoteChatApiAdapter.editMessageAndResend(payload)
      : localChatApiAdapter.editMessageAndResend(payload),

  renameThread: (threadId, title) =>
    isLoggedIn()
      ? remoteChatApiAdapter.renameThread(threadId, title)
      : localChatApiAdapter.renameThread(threadId, title),

  deleteThread: (threadId) =>
    isLoggedIn()
      ? remoteChatApiAdapter.deleteThread(threadId)
      : localChatApiAdapter.deleteThread(threadId),

  updateMessageFeedback: (threadId, messageId, feedback) =>
    isLoggedIn()
      ? remoteChatApiAdapter.updateMessageFeedback(
          threadId,
          messageId,
          feedback,
        )
      : localChatApiAdapter.updateMessageFeedback(
          threadId,
          messageId,
          feedback,
        ),
  submitFoodRecommendationFeedback: (payload) =>
    isLoggedIn()
      ? remoteChatApiAdapter.submitFoodRecommendationFeedback(payload)
      : localChatApiAdapter.submitFoodRecommendationFeedback(payload),
};
