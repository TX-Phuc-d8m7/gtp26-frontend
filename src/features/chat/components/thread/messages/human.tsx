import { useStreamContext } from "@/features/chat/providers/stream-provider";
import { Message } from "@langchain/langgraph-sdk";
import { useState } from "react";
import { getContentString } from "../utils";
import { Textarea } from "@/shared/components/ui/textarea/index";
import { BranchSwitcher, CommandBar } from "./shared";
import { Box } from "@mui/material";
import { Typography } from "@/shared/components/ui/typography/index";
import { styles } from "../../../_styles";

function EditableContent({
  value,
  setValue,
  onSubmit,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <Textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      sx={{
        "&:focus-visible": {
          outline: "none",
          boxShadow: "none",
        },
      }}
    />
  );
}

export function HumanMessage({
  message,
  isLoading,
}: {
  message: Message;
  isLoading: boolean;
}) {
  const thread = useStreamContext();
  const meta = thread.getMessagesMetadata(message);
  const parentCheckpoint = meta?.firstSeenState?.parent_checkpoint;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");
  const contentString = getContentString(message.content);

  const handleSubmitEdit = () => {
    setIsEditing(false);

    const newMessage: Message = { type: "human", content: value };
    thread.submit(
      { messages: [newMessage] },
      {
        checkpoint: parentCheckpoint,
        streamMode: ["values"],
        optimisticValues: (prev: any) => {
          const values = meta?.firstSeenState?.values;
          if (!values) return prev;

          return {
            ...values,
            messages: [...(values.messages ?? []), newMessage],
          };
        },
      },
    );
  };

  return (
    <Box
      sx={{
        ...styles.langchainHumanGroupStyles,
        ...(isEditing ? { width: "100%" } : {}),
        "&:hover [data-command-bar], &:focus-within [data-command-bar]": {
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          ...(isEditing ? { width: "100%" } : {}),
        }}
      >
        {isEditing ? (
          <EditableContent
            value={value}
            setValue={setValue}
            onSubmit={handleSubmitEdit}
          />
        ) : (
          <Box component="div" sx={{ animation: "fadeIn 180ms ease-out both" }}>
            <Typography as="p" sx={styles.langchainHumanBubbleStyles}>
              {contentString}
            </Typography>
          </Box>
        )}

        <Box
          data-command-bar
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            ml: "auto",
            opacity: isEditing ? 1 : 0,
            transition: "opacity 180ms ease",
          }}
        >
          <BranchSwitcher
            branch={meta?.branch}
            branchOptions={meta?.branchOptions}
            onSelect={(branch) => thread.setBranch(branch)}
            isLoading={isLoading}
          />
          <CommandBar
            isLoading={isLoading}
            content={contentString}
            isEditing={isEditing}
            setIsEditing={(c) => {
              if (c) {
                setValue(contentString);
              }
              setIsEditing(c);
            }}
            handleSubmitEdit={handleSubmitEdit}
            isHumanMessage={true}
          />
        </Box>
      </Box>
    </Box>
  );
}
