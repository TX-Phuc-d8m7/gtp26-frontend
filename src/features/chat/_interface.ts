/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import type { ReactNode } from "react";
import type { ComposerAttachment } from "./components/thread/input-area";

export interface ChatProps {
  fallback?: ReactNode;
}

export interface BackendFoodResult {
  id: string;
  name: string;
  description: string;
  matchScore: number;
  locations?: FoodLocation[];
  // Enhanced metadata
  image?: string;
  cookingTime?: number; // in minutes
  difficulty?: "easy" | "medium" | "hard";
  servings?: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  tags?: string[]; // e.g., ["vegetarian", "low-carb", "quick"]
  reason?: string; // why this recipe was recommended
}

export interface FoodLocation {
  id: string;
  foodId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distanceMeters?: number;
  rating?: number;
  openingHours?: string;
  mapUrl?: string;
}

export interface BackendSearchResponse {
  query: string;
  ai_insight?: {
    warning_message?: string | null;
    exclude?: string[];
    include?: string[];
    prefer?: string[];
  };
  results: BackendFoodResult[];
  ai_response?: string | null;
}

export type ChatRole = "human" | "assistant" | "system";

export type ChatMessageStatus = "sending" | "streaming" | "complete" | "error";

export type ChatFeedback = "like" | "dislike";

export type ChatThreadStatus = "idle" | "running" | "error";

export interface ChatThread {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  lastMessagePreview: string;
  status: ChatThreadStatus;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  role: ChatRole;
  content: string;
  createdAt: string;
  foods?: BackendFoodResult[];
  aiInsight?: BackendSearchResponse["ai_insight"];
  feedback?: ChatFeedback;
  attachments?: ComposerAttachment[];
  status: ChatMessageStatus;
  sourceQuery?: string;
}

export interface ChatSendPayload {
  threadId: string;
  content: string;
  attachments?: ComposerAttachment[];
  replaceMessageId?: string;
  signal?: AbortSignal;
}

export interface ChatSendResponse {
  thread: ChatThread;
  messages: ChatMessage[];
  assistantMessage: ChatMessage;
}

export interface ChatApiAdapter {
  listThreads: () => Promise<ChatThread[]>;
  createThread: (initialMessage?: string) => Promise<ChatThread>;
  getMessages: (threadId: string) => Promise<ChatMessage[]>;
  sendMessage: (payload: ChatSendPayload) => Promise<ChatSendResponse>;
  renameThread: (threadId: string, title: string) => Promise<ChatThread>;
  deleteThread: (threadId: string) => Promise<void>;
  updateMessageFeedback: (
    threadId: string,
    messageId: string,
    feedback?: ChatFeedback,
  ) => Promise<ChatMessage>;
}
