/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { v4 as uuidv4 } from "uuid";

import type {
  BackendSearchResponse,
  ChatApiAdapter,
  ChatFeedback,
  ChatMessage,
  ChatSendPayload,
  ChatSendResponse,
  ChatThread,
  FoodLocation,
} from "../_interface";

const FOOD_AI_API_URL =
  process.env.NEXT_PUBLIC_FOOD_AI_API_URL ?? "http://localhost:8000";
const STORAGE_KEY = "foodie-suggest:chat-store:v1";
const SEARCH_API_TIMEOUT_MS = 30000;

const MOCK_FOOD_LOCATIONS: Record<string, Omit<FoodLocation, "foodId">[]> = {
  "mì quảng": [
    {
      id: "mi-quang-ba-mua",
      name: "Mì Quảng Bà Mua",
      address: "19 Trần Bình Trọng, Hải Châu, Đà Nẵng",
      lat: 16.06402,
      lng: 108.21956,
      distanceMeters: 950,
      rating: 4.5,
      openingHours: "06:00 - 21:30",
    },
    {
      id: "mi-quang-ba-vi",
      name: "Mì Quảng Bà Vị",
      address: "166 Lê Đình Dương, Hải Châu, Đà Nẵng",
      lat: 16.0605,
      lng: 108.21705,
      distanceMeters: 1200,
      rating: 4.4,
      openingHours: "06:30 - 21:00",
    },
    {
      id: "mi-quang-dung",
      name: "Mì Quảng Dung",
      address: "121 Đống Đa, Hải Châu, Đà Nẵng",
      lat: 16.07822,
      lng: 108.21912,
      distanceMeters: 2100,
      rating: 4.3,
      openingHours: "07:00 - 20:30",
    },
  ],
  "bún chả cá": [
    {
      id: "bun-cha-ca-ba-lu",
      name: "Bún chả cá Bà Lữ",
      address: "319 Hùng Vương, Thanh Khê, Đà Nẵng",
      lat: 16.0692,
      lng: 108.21361,
      distanceMeters: 1400,
      rating: 4.4,
      openingHours: "06:00 - 22:00",
    },
    {
      id: "bun-cha-ca-hon",
      name: "Bún chả cá Hờn",
      address: "113/3 Nguyễn Chí Thanh, Hải Châu, Đà Nẵng",
      lat: 16.07114,
      lng: 108.22157,
      distanceMeters: 1700,
      rating: 4.2,
      openingHours: "06:00 - 21:00",
    },
  ],
  "bánh xèo": [
    {
      id: "banh-xeo-ba-duong",
      name: "Bánh xèo Bà Dưỡng",
      address: "K280/23 Hoàng Diệu, Hải Châu, Đà Nẵng",
      lat: 16.05667,
      lng: 108.21611,
      distanceMeters: 800,
      rating: 4.6,
      openingHours: "09:30 - 21:30",
    },
    {
      id: "banh-xeo-co-muoi",
      name: "Bánh xèo Cô Mười",
      address: "23 Châu Thị Vĩnh Tế, Ngũ Hành Sơn, Đà Nẵng",
      lat: 16.04998,
      lng: 108.23925,
      distanceMeters: 2900,
      rating: 4.3,
      openingHours: "10:00 - 22:00",
    },
  ],
  "bánh tráng cuốn thịt heo": [
    {
      id: "banh-trang-mau",
      name: "Bánh tráng thịt heo Mậu",
      address: "35 Đỗ Thúc Tịnh, Cẩm Lệ, Đà Nẵng",
      lat: 16.03478,
      lng: 108.21032,
      distanceMeters: 2400,
      rating: 4.5,
      openingHours: "09:00 - 21:00",
    },
    {
      id: "banh-trang-tran",
      name: "Đặc sản Trần",
      address: "04 Lê Duẩn, Hải Châu, Đà Nẵng",
      lat: 16.07304,
      lng: 108.22242,
      distanceMeters: 1900,
      rating: 4.4,
      openingHours: "07:00 - 22:00",
    },
  ],
  "cao lầu": [
    {
      id: "cao-lau-hoi-an-da-nang",
      name: "Cao lầu Hội An",
      address: "267 Thái Thị Bôi, Thanh Khê, Đà Nẵng",
      lat: 16.0662,
      lng: 108.20268,
      distanceMeters: 1800,
      rating: 4.2,
      openingHours: "07:00 - 20:30",
    },
  ],
};

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

function attachMockLocations(results: BackendSearchResponse["results"]) {
  return (results ?? []).map((food) => {
    const normalizedName = food.name.toLowerCase();
    const matchedKey = Object.keys(MOCK_FOOD_LOCATIONS).find((key) =>
      normalizedName.includes(key),
    );
    if (!matchedKey) return food;

    return {
      ...food,
      locations: MOCK_FOOD_LOCATIONS[matchedKey].map((location) => ({
        ...location,
        foodId: food.id,
        mapUrl:
          location.mapUrl ??
          `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
      })),
    };
  });
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
    const response = await fetch(
      `${FOOD_AI_API_URL}/foods/search?q=${encodeURIComponent(payload.content)}`,
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
    foods: attachMockLocations(response.results),
    aiInsight: response.ai_insight,
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
    return readStore().messagesByThreadId[threadId] ?? [];
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

    const nextMessages = payload.replaceMessageId
      ? messagesBeforeAssistant.map((message) =>
          message.id === payload.replaceMessageId ? assistantMessage : message,
        )
      : [...messagesBeforeAssistant, assistantMessage];

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
          [payload.threadId]: nextMessages,
        },
      },
      nextThread,
    );
    writeStore(store);

    return {
      thread: nextThread,
      messages: nextMessages,
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
};
