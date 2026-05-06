import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useStream } from "@langchain/langgraph-sdk/react";
import { type Message } from "@langchain/langgraph-sdk";
import {
  uiMessageReducer,
  type UIMessage,
  type RemoveUIMessage,
} from "@langchain/langgraph-sdk/react-ui";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LangGraphLogoSVG } from "@/components/icons/langgraph";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { getApiKey } from "@/lib/api-key";
import { useThreads } from "./Thread";
import { toast } from "sonner";
import { MOCK_MESSAGES } from "@/lib/mock-messages";

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

async function sleep(ms = 4000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (data: any, options?: any) => {
    // Add user message
    if (data?.messages && Array.isArray(data.messages)) {
      const lastMessage = data.messages[data.messages.length - 1];
      if (lastMessage?.type === "human") {
        setMessages(prev => [...prev, lastMessage]);
      }
    }

    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generate simple mock response
      const mockResponses = [
        "Đây là một câu trả lời tự động! Tôi đang ở chế độ demo. Bạn có thể thay đổi mock messages trong `src/lib/mock-messages.ts` để test các scenario khác nhau.",
        "Tôi đồng ý với bạn! Đây là một UI test đơn giản để kiểm tra giao diện chat. Hãy thử gửi thêm nhiều tin nhắn nữa.",
        "Cảm ơn câu hỏi của bạn! Trong chế độ demo này, tôi sẽ trả lời với những câu mẫu. Khi bạn kết nối API thực, tôi sẽ trả lời từ server.",
      ];

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          type: "ai",
          content: randomResponse
        }
      ]);
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setIsLoading(false);
    }
  };

  const stop = () => { setIsLoading(false); };

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
      firstSeenState: { parent_checkpoint: null }
    }),
    setBranch: (branch: string) => { },
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
