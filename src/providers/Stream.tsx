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
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", type: "ai", content: "Hello! I am a mock AI. How can I help you? I can mock responses for you to test the UI." as string }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = async (data: any, options?: any) => {
    if (data?.messages) {
      setMessages(data.messages);
    }
    setIsLoading(true);
    
    try {
      const lastMsg = data?.messages?.[data.messages.length - 1]?.content || "";
      if (!lastMsg) {
        setIsLoading(false);
        return;
      }
      
      const response = await fetch(`http://localhost:3006/foods/search?q=${encodeURIComponent(lastMsg)}`);
      if (!response.ok) {
        throw new Error(`Lỗi HTTP! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Xử lý dữ liệu trả về thành chuỗi markdown để hiển thị
      let formattedContent = "";
      if (Array.isArray(result)) {
         formattedContent = result.length === 0 
           ? "Không tìm thấy kết quả nào." 
           : result.map((item: any) => {
               const name = item.name || item.title || item.foodName || 'Món ăn';
               const desc = item.description || item.price || item.detail || '';
               return `- **${name}**${desc ? `: ${desc}` : ''}`;
             }).join('\n');
      } else {
         // Nếu kết quả trả về là text hoặc object
         formattedContent = typeof result === 'string' ? result : "```json\n" + JSON.stringify(result, null, 2) + "\n```";
      }

      setMessages(prev => [
        ...prev, 
        { id: Math.random().toString(), type: "ai", content: formattedContent }
      ]);
    } catch (e: any) {
       console.error("Lỗi khi fetch BE:", e);
       setMessages(prev => [
         ...prev, 
         { id: Math.random().toString(), type: "ai", content: "❌ Không thể kết nối tới Backend (localhost:3006). Lỗi: " + e.message + "\n\n*(Lưu ý: Hãy chắc chắn BE của bạn đang chạy và đã bật CORS)*" }
       ]);
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
