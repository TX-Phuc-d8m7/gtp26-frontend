import React, { createContext, useContext, ReactNode, useState } from "react";
import { useStream } from "@langchain/langgraph-sdk/react";
import { type Message } from "@langchain/langgraph-sdk";
import {
  uiMessageReducer,
  type UIMessage,
  type RemoveUIMessage,
} from "@langchain/langgraph-sdk/react-ui";
import { useQueryState } from "nuqs";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { LangGraphLogoSVG } from "@/shared/components/icons/langgraph";
import { Label } from "@/shared/components/ui/label";
import { ArrowRight } from "lucide-react";
import { PasswordInput } from "@/shared/components/ui/password-input";
import { getApiKey } from "@/features/chat/lib/api-key";
import { useThreads } from "./thread-provider";
import { toast } from "sonner";

export type StateType = { messages: Message[]; ui?: UIMessage[] };

const useTypedStream = useStream<
  StateType,
  {
    UpdateType: {
      messages?: Message[] | Message | string;
      ui?: (UIMessage | RemoveUIMessage)[] | UIMessage | RemoveUIMessage;
    };
    CustomEventType: UIMessage | RemoveUIMessage;
  }
>;

type StreamContextType = ReturnType<typeof useTypedStream>;
const StreamContext = createContext<StreamContextType | undefined>(undefined);

async function checkGraphStatus(
  apiUrl: string,
  apiKey: string | null,
): Promise<boolean> {
  try {
    const res = await fetch(`${apiUrl}/info`, {
      ...(apiKey && {
        headers: {
          "X-Api-Key": apiKey,
        },
      }),
    });

    return res.ok;
  } catch (e) {
    console.error(e);
    return false;
  }
}

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

  const streamValue = {
    messages,
    isLoading,
    submit,
    stop,
    error,
    ui: [],
    getMessagesMetadata: (msg: any) => ({
      branch: "main",
      branchOptions: ["main"],
      firstSeenState: { parent_checkpoint: null },
    }),
    setBranch: (branch: string) => {},
    interrupt: null,
    values: { ui: [] },
  } as any;

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
