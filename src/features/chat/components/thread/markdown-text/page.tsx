/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { FC, memo, useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { SyntaxHighlighter } from "@/features/chat/components/thread/syntax-highlighter";
import { Box } from "@mui/material";

import { TooltipIconButton } from "@/features/chat/components/thread/tooltip-icon-button";
import {
  CodeHeaderProps,
  MarkdownTextProps,
  UseCopyToClipboardOptions,
  styles,
} from ".";

import "katex/dist/katex.min.css";

const useCopyToClipboard = ({
  copiedDuration = 3000,
}: UseCopyToClipboardOptions = {}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyToClipboard = (value: string) => {
    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), copiedDuration);
    });
  };

  return { isCopied, copyToClipboard };
};

const CodeHeader: FC<CodeHeaderProps> = ({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const onCopy = () => {
    if (!code || isCopied) return;
    copyToClipboard(code);
  };

  return (
    <Box
      sx={styles.codeHeaderStyles}
    >
      <Box
        component="span"
        sx={styles.codeLanguageStyles}
      >
        {language}
      </Box>
      <TooltipIconButton tooltip="Copy" onClick={onCopy}>
        {!isCopied && <CopyIcon />}
        {isCopied && <CheckIcon />}
      </TooltipIconButton>
    </Box>
  );
};

const defaultComponents: any = {
  h1: (props: { className?: string }) => (
    <Box
      component="h1"
      sx={{
        mb: 4,
        scrollMargin: 80,
        fontSize: 36,
        fontWeight: 800,
        letterSpacing: 0,
        "&:last-child": { mb: 0 },
      }}
      {...props}
    />
  ),
  h2: (props: { className?: string }) => (
    <Box
      component="h2"
      sx={{
        mb: 2,
        mt: 4,
        scrollMargin: 80,
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: 0,
        "&:first-of-type": { mt: 0 },
        "&:last-child": { mb: 0 },
      }}
      {...props}
    />
  ),
  h3: (props: { className?: string }) => (
    <Box
      component="h3"
      sx={{
        mb: 2,
        mt: 3,
        scrollMargin: 80,
        fontSize: 24,
        fontWeight: 700,
        letterSpacing: 0,
        "&:first-of-type": { mt: 0 },
        "&:last-child": { mb: 0 },
      }}
      {...props}
    />
  ),
  h4: (props: { className?: string }) => (
    <Box
      component="h4"
      sx={{
        mb: 2,
        mt: 3,
        scrollMargin: 80,
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: 0,
        "&:first-of-type": { mt: 0 },
        "&:last-child": { mb: 0 },
      }}
      {...props}
    />
  ),
  h5: (props: { className?: string }) => (
    <Box
      component="h5"
      sx={{
        my: 2,
        fontSize: 18,
        fontWeight: 700,
        "&:first-of-type": { mt: 0 },
        "&:last-child": { mb: 0 },
      }}
      {...props}
    />
  ),
  h6: (props: { className?: string }) => (
    <Box
      component="h6"
      sx={{
        my: 2,
        fontWeight: 700,
        "&:first-of-type": { mt: 0 },
        "&:last-child": { mb: 0 },
      }}
      {...props}
    />
  ),
  p: (props: { className?: string }) => (
    <Box
      component="p"
      sx={{
        mb: 2.5,
        mt: 2.5,
        lineHeight: 1.75,
        "&:first-of-type": { mt: 0 },
        "&:last-child": { mb: 0 },
      }}
      {...props}
    />
  ),
  a: (props: { className?: string }) => (
    <Box
      component="a"
      sx={{
        color: "var(--primary)",
        fontWeight: 600,
        textDecoration: "underline",
        textUnderlineOffset: 4,
      }}
      {...props}
    />
  ),
  blockquote: (props: { className?: string }) => (
    <Box
      component="blockquote"
      sx={{ borderLeft: "2px solid var(--border)", pl: 3, fontStyle: "italic" }}
      {...props}
    />
  ),
  ul: (props: { className?: string }) => (
    <Box
      component="ul"
      sx={{ my: 2.5, ml: 3, listStyleType: "disc", "& > li": { mt: 1 } }}
      {...props}
    />
  ),
  ol: (props: { className?: string }) => (
    <Box
      component="ol"
      sx={{ my: 2.5, ml: 3, listStyleType: "decimal", "& > li": { mt: 1 } }}
      {...props}
    />
  ),
  hr: (props: { className?: string }) => (
    <Box
      component="hr"
      sx={{ my: 2.5, border: 0, borderBottom: "1px solid var(--border)" }}
      {...props}
    />
  ),
  table: ({ children, ...props }: { className?: string; children?: React.ReactNode }) => (
    <Box
      sx={{
        my: 2.5,
        width: "100%",
        overflowX: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <Box
        component="table"
        sx={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
        {...props}
      >
        {children}
      </Box>
    </Box>
  ),
  th: (props: { className?: string }) => (
    <Box
      component="th"
      sx={{
        backgroundColor: "var(--muted)",
        px: 2,
        py: 1,
        textAlign: "left",
        fontWeight: 700,
        "&:first-of-type": { borderTopLeftRadius: 8 },
        "&:last-of-type": { borderTopRightRadius: 8 },
        "&[align='center']": { textAlign: "center" },
        "&[align='right']": { textAlign: "right" },
      }}
      {...props}
    />
  ),
  td: (props: { className?: string }) => (
    <Box
      component="td"
      sx={{
        borderBottom: "1px solid var(--border)",
        borderLeft: "1px solid var(--border)",
        px: 2,
        py: 1,
        textAlign: "left",
        "&:last-of-type": { borderRight: "1px solid var(--border)" },
        "&[align='center']": { textAlign: "center" },
        "&[align='right']": { textAlign: "right" },
      }}
      {...props}
    />
  ),
  tr: (props: { className?: string }) => (
    <Box
      component="tr"
      sx={{
        m: 0,
        p: 0,
        borderBottom: "1px solid var(--border)",
        "&:first-of-type": { borderTop: "1px solid var(--border)" },
        "&:last-child > td:first-of-type": { borderBottomLeftRadius: 8 },
        "&:last-child > td:last-of-type": { borderBottomRightRadius: 8 },
      }}
      {...props}
    />
  ),
  sup: (props: { className?: string }) => (
    <Box
      component="sup"
      sx={{ "& > a": { fontSize: 12, textDecoration: "none" } }}
      {...props}
    />
  ),
  pre: (props: { className?: string }) => (
    <Box
      component="pre"
      sx={{
        overflowX: "auto",
        borderRadius: 2,
        backgroundColor: "#000",
        color: "#fff",
        maxWidth: 896,
      }}
      {...props}
    />
  ),
  code: ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    const match = /language-(\w+)/.exec(className || "");

    if (match) {
      const language = match[1];
      const code = String(children).replace(/\n$/, "");

      return (
        <>
          <CodeHeader language={language} code={code} />
          <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>
        </>
      );
    }

    return (
      <Box
        component="code"
        sx={styles.inlineCodeStyles}
        {...props}
      >
        {children}
      </Box>
    );
  },
};

const MarkdownTextImpl: FC<MarkdownTextProps> = ({ children }) => {
  return (
    <Box>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={defaultComponents}
      >
        {children}
      </ReactMarkdown>
    </Box>
  );
};

const MarkdownText = memo(MarkdownTextImpl);

export default MarkdownText;
