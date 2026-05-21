import React, { createContext, useContext, ReactNode, useState } from "react";
import { type Message } from "@langchain/langgraph-sdk";

export type StreamUiMessage = {
  id: string;
  metadata?: {
    message_id?: string;
  };
};

type StreamContextType = {
  messages: Message[];
  isLoading: boolean;
  submit: (...args: any[]) => Promise<void>;
  stop: () => void;
  error: unknown;
  ui: StreamUiMessage[];
  getMessagesMetadata: (msg: unknown) => any;
  setBranch: (branch: string) => void;
  interrupt: any;
  values: { ui: StreamUiMessage[] };
};
const StreamContext = createContext<StreamContextType | undefined>(undefined);

export const StreamProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    // The chat UI now calls backend directly in Thread component.
    // Keep this as no-op for compatibility with existing consumers.
  };

  const stop = () => {
    setIsLoading(false);
  };

  const streamValue: StreamContextType = {
    messages,
    isLoading,
    submit,
    stop,
    error,
    ui: [],
    getMessagesMetadata: (msg: any) => ({
      branch: "main",
      branchOptions: ["main"],
      firstSeenState: { parent_checkpoint: null, values: { messages: [] } },
    }),
    setBranch: (branch: string) => {},
    interrupt: null,
    values: { ui: [] },
  };

  return (
    <StreamContext.Provider value={streamValue}>
      {children}
    </StreamContext.Provider>
  );
};

// Create a custom hook to use the context
export const useStreamContext = (): StreamContextType => {
  const context = useContext(StreamContext);
  if (context === undefined) {
    throw new Error("useStreamContext must be used within a StreamProvider");
  }
  return context;
};

export default StreamContext;
