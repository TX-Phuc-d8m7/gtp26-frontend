import { Button } from "@/shared/components/ui/button/index";
import { Box } from "@mui/material";
import { Typography } from "@/shared/components/ui/typography/index";
import { useThreads } from "@/features/chat/providers/thread-provider";
import { Thread } from "@langchain/langgraph-sdk";
import { useEffect } from "react";

import { getContentString } from "../utils";
import { useQueryState, parseAsBoolean } from "nuqs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/components/ui/sheet/index";
import { Skeleton } from "@/shared/components/ui/skeleton/index";
import { PanelRightOpen, PanelRightClose } from "lucide-react";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import { styles } from "../../../_styles";

function ThreadList({
  threads,
  onThreadClick,
}: {
  threads: Thread[];
  onThreadClick?: (threadId: string) => void;
}) {
  const [threadId, setThreadId] = useQueryState("threadId");

  return (
    <Box sx={styles.historyListStyles}>
      {threads.map((t) => {
        let itemText = t.thread_id;
        if (
          typeof t.values === "object" &&
          t.values &&
          "messages" in t.values &&
          Array.isArray(t.values.messages) &&
          t.values.messages?.length > 0
        ) {
          const firstMessage = t.values.messages[0];
          itemText = getContentString(firstMessage.content);
        }
        return (
          <Box key={t.thread_id} sx={{ width: "100%" }}>
            <Button
              variant="ghost"
              sx={styles.historyItemButtonStyles(t.thread_id === threadId)}
              onClick={(e) => {
                e.preventDefault();
                onThreadClick?.(t.thread_id);
                if (t.thread_id === threadId) return;
                setThreadId(t.thread_id);
              }}
            >
              <Typography
                as="span"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "0.86rem",
                  fontWeight: t.thread_id === threadId ? 700 : 500,
                }}
              >
                {itemText}
              </Typography>
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}

function ThreadHistoryLoading() {
  return (
    <Box sx={styles.historyListStyles}>
      {Array.from({ length: 30 }).map((_, i) => (
        <Skeleton key={`skeleton-${i}`} className="w-[280px] h-10" />
      ))}
    </Box>
  );
}

export default function ThreadHistory() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const [chatHistoryOpen, setChatHistoryOpen] = useQueryState(
    "chatHistoryOpen",
    parseAsBoolean.withDefault(false),
  );

  const { getThreads, threads, setThreads, threadsLoading, setThreadsLoading } =
    useThreads();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setThreadsLoading(true);
    getThreads()
      .then(setThreads)
      .catch(console.error)
      .finally(() => setThreadsLoading(false));
  }, []);

  return (
    <>
      <Box sx={{ display: { xs: "none", lg: "flex" } }}>
        <Box sx={styles.historyShellStyles}>
          <Box sx={styles.historyHeaderStyles}>
            <Box sx={styles.historyTitleStyles}>
              <Typography
                as="span"
                sx={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.05rem",
                  fontWeight: 800,
                }}
              >
                Bếp trò chuyện
              </Typography>
              <Typography
                as="span"
                sx={{ color: "var(--muted-foreground)", fontSize: "0.76rem" }}
              >
                Các lần hỏi món gần đây
              </Typography>
            </Box>
            <Button
              variant="ghost"
              size="icon"
              sx={styles.headerIconButtonStyles}
              onClick={() => setChatHistoryOpen((p) => !p)}
              aria-label="Thu gọn lịch sử"
            >
              {chatHistoryOpen ? (
                <PanelRightOpen className="size-5" />
              ) : (
                <PanelRightClose className="size-5" />
              )}
            </Button>
          </Box>
          {threadsLoading ? (
            <ThreadHistoryLoading />
          ) : (
            <ThreadList threads={threads} />
          )}
        </Box>
      </Box>
      <div className="lg:hidden">
        <Sheet
          open={!!chatHistoryOpen && !isLargeScreen}
          onOpenChange={(open) => {
            if (isLargeScreen) return;
            setChatHistoryOpen(open);
          }}
        >
          <SheetContent side="left" className="lg:hidden flex">
            <SheetHeader>
              <SheetTitle>Bếp trò chuyện</SheetTitle>
            </SheetHeader>
            <ThreadList
              threads={threads}
              onThreadClick={() => setChatHistoryOpen((o) => !o)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
