/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { v4 as uuidv4 } from "uuid";

import { apiFetch, isLoggedIn } from "@/features/auth/_api";
import type {
  BackendFoodResult,
  BackendSearchResponse,
  ChatApiAdapter,
  ChatFeedback,
  ChatMessage,
  ChatRole,
  ChatSendPayload,
  ChatSendResponse,
  ChatThread,
  FoodLocation,
} from "../_interface";

const FOOD_AI_API_URL =
  process.env.NEXT_PUBLIC_FOOD_AI_API_URL ?? "http://localhost:8000";
const STORAGE_KEY = "foodie-suggest:chat-store:v1";
const SEARCH_API_TIMEOUT_MS = 30000;

const FALLBACK_FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=900",
  "https://images.unsplash.com/photo-1582878826629-29b7ad1cb431?auto=format&fit=crop&q=80&w=900",
  "https://images.unsplash.com/photo-1626804475297-4160ebbaea4b?auto=format&fit=crop&q=80&w=900",
  "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=900",
  "https://images.unsplash.com/photo-1603046891744-1f76eb10aec4?auto=format&fit=crop&q=80&w=900",
] as const;

const MOCK_FOOD_METADATA: Record<
  string,
  Pick<
    BackendFoodResult,
    | "image"
    | "cookingTime"
    | "difficulty"
    | "servings"
    | "calories"
    | "protein"
    | "carbs"
    | "fat"
    | "tags"
    | "reason"
  >
> = {
  "mì quảng": {
    image:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=900",
    cookingTime: 25,
    difficulty: "medium",
    servings: 1,
    calories: 520,
    protein: 26,
    carbs: 68,
    fat: 16,
    tags: ["đậm vị", "đặc sản", "bữa trưa"],
    reason:
      "Mì Quảng được đưa vào danh sách demo vì có hương vị đặc trưng Đà Nẵng, no lâu và có thể điều chỉnh topping theo dị ứng hoặc khẩu vị.",
  },
  "bún chả cá": {
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cb431?auto=format&fit=crop&q=80&w=900",
    cookingTime: 18,
    difficulty: "easy",
    servings: 1,
    calories: 430,
    protein: 24,
    carbs: 58,
    fat: 10,
    tags: ["ít dầu", "món nước", "bữa sáng"],
    reason:
      "Bún chả cá hợp để demo gợi ý món nhẹ hơn vì nước dùng thanh, ít dầu và dễ ăn vào buổi sáng hoặc khi cần món dễ tiêu.",
  },
  "bánh xèo": {
    image:
      "https://images.unsplash.com/photo-1626804475297-4160ebbaea4b?auto=format&fit=crop&q=80&w=900",
    cookingTime: 30,
    difficulty: "medium",
    servings: 2,
    calories: 640,
    protein: 22,
    carbs: 54,
    fat: 34,
    tags: ["ăn nhóm", "giòn", "món chiên"],
    reason:
      "Bánh xèo phù hợp khi người dùng muốn món trải nghiệm hoặc ăn nhóm, nhưng UI vẫn hiển thị cảnh báo dinh dưỡng vì món này nhiều dầu hơn.",
  },
  "bánh tráng cuốn thịt heo": {
    image:
      "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=900",
    cookingTime: 20,
    difficulty: "easy",
    servings: 2,
    calories: 480,
    protein: 30,
    carbs: 42,
    fat: 18,
    tags: ["nhiều rau", "món cuốn", "ít dầu"],
    reason:
      "Món cuốn này được dùng làm dummy recommendation vì có nhiều rau, dễ chia sẻ và cân bằng hơn so với các món chiên.",
  },
  "bánh mì": {
    image:
      "https://images.unsplash.com/photo-1603046891744-1f76eb10aec4?auto=format&fit=crop&q=80&w=900",
    cookingTime: 8,
    difficulty: "easy",
    servings: 1,
    calories: 390,
    protein: 18,
    carbs: 52,
    fat: 14,
    tags: ["ăn nhanh", "giá rẻ", "mang đi"],
    reason:
      "Bánh mì là lựa chọn demo tốt cho tình huống cần món nhanh, rẻ và tiện mang đi trong lúc di chuyển.",
  },
};

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

const DEFAULT_MOCK_LOCATIONS: Omit<FoodLocation, "foodId">[] = [
  {
    id: "demo-location-hai-chau",
    name: "Quán địa phương gần bạn",
    address: "Trung tâm Hải Châu, Đà Nẵng",
    lat: 16.06778,
    lng: 108.22083,
    distanceMeters: 850,
    rating: 4.3,
    openingHours: "06:30 - 21:30",
  },
  {
    id: "demo-location-thanh-khe",
    name: "Điểm ăn gợi ý Foodie Suggest",
    address: "Thanh Khê, Đà Nẵng",
    lat: 16.07062,
    lng: 108.21018,
    distanceMeters: 1600,
    rating: 4.1,
    openingHours: "07:00 - 22:00",
  },
];

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

function getMatchedFoodKey(foodName: string) {
  const normalizedName = foodName.toLowerCase();
  return Object.keys({
    ...MOCK_FOOD_METADATA,
    ...MOCK_FOOD_LOCATIONS,
  }).find((key) => normalizedName.includes(key));
}

function buildFallbackMetadata(
  food: BackendFoodResult,
  index: number,
): Required<
  Pick<
    BackendFoodResult,
    | "image"
    | "cookingTime"
    | "difficulty"
    | "servings"
    | "calories"
    | "protein"
    | "carbs"
    | "fat"
    | "tags"
    | "reason"
  >
> {
  return {
    image: FALLBACK_FOOD_IMAGES[index % FALLBACK_FOOD_IMAGES.length],
    cookingTime: 12 + (index % 4) * 6,
    difficulty: index % 3 === 0 ? "easy" : index % 3 === 1 ? "medium" : "hard",
    servings: index % 2 === 0 ? 1 : 2,
    calories: 360 + (index % 5) * 55,
    protein: 16 + (index % 4) * 4,
    carbs: 42 + (index % 5) * 6,
    fat: 9 + (index % 4) * 5,
    tags: ["demo", "phù hợp", index % 2 === 0 ? "ít dầu" : "đậm vị"],
    reason: `Dữ liệu demo: ${food.name} được hiển thị để kiểm tra UI giải thích gợi ý. Khi backend trả reason thật, nội dung này sẽ tự được thay thế.`,
  };
}

function enhanceMockFoodResults(results: BackendSearchResponse["results"]) {
  return (results ?? []).map((food, index) => {
    const matchedMetadataKey = getMatchedFoodKey(food.name);
    const metadata = matchedMetadataKey
      ? MOCK_FOOD_METADATA[matchedMetadataKey]
      : undefined;
    const fallbackMetadata = buildFallbackMetadata(food, index);

    return {
      ...food,
      image: food.image ?? metadata?.image ?? fallbackMetadata.image,
      cookingTime:
        food.cookingTime ??
        metadata?.cookingTime ??
        fallbackMetadata.cookingTime,
      difficulty:
        food.difficulty ?? metadata?.difficulty ?? fallbackMetadata.difficulty,
      servings:
        food.servings ?? metadata?.servings ?? fallbackMetadata.servings,
      calories:
        food.calories ?? metadata?.calories ?? fallbackMetadata.calories,
      protein: food.protein ?? metadata?.protein ?? fallbackMetadata.protein,
      carbs: food.carbs ?? metadata?.carbs ?? fallbackMetadata.carbs,
      fat: food.fat ?? metadata?.fat ?? fallbackMetadata.fat,
      tags: food.tags?.length
        ? food.tags
        : (metadata?.tags ?? fallbackMetadata.tags),
      reason: food.reason ?? metadata?.reason ?? fallbackMetadata.reason,
      locations: (food.locations ?? []).map((location) => ({
        ...location,
        foodId: food.id,
        mapUrl:
          location.mapUrl ??
          `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
      })),
    };
  });
}

function enhanceStoredMessages(messages: ChatMessage[]) {
  return messages.map((message) =>
    message.foods?.length
      ? {
          ...message,
          foods: enhanceMockFoodResults(message.foods),
        }
      : message,
  );
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
    foods: enhanceMockFoodResults(response.results),
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
    return enhanceStoredMessages(
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
  disclaimer?: string | null;
  created_at: string;
}

interface BESendResponse {
  user_message: BEMessage;
  assistant_message: BEMessage;
  search_result: {
    query: string;
    ai_insight: BackendSearchResponse["ai_insight"];
    results: Record<string, unknown>[];
    disclaimer: string;
    ai_response?: string | null;
  };
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

function beFoodResultToFE(f: Record<string, unknown>): BackendFoodResult {
  return {
    id: String(f.id ?? ""),
    name: String(f.name ?? ""),
    description: String(f.description ?? ""),
    matchScore:
      typeof f.matchScore === "number"
        ? f.matchScore
        : typeof f.match_score === "number"
          ? f.match_score
          : 0,
    image: (f.img_url as string | undefined) ?? (f.image as string | undefined),
    tags: Array.isArray(f.soft_tags)
      ? (f.soft_tags as string[])
      : Array.isArray(f.tags)
        ? (f.tags as string[])
        : [],
    reason: (f.reason as string | undefined) ?? undefined,
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

    // Build assistant message — enrich with search_result fields
    const assistantMessage: ChatMessage = {
      ...beMessageToFE(data.assistant_message),
      foods: data.search_result.results.map(beFoodResultToFE),
      aiInsight: data.search_result.ai_insight,
      disclaimer: data.search_result.disclaimer,
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
};
