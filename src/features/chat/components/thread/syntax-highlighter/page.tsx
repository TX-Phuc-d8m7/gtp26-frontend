/*
 * Copyright (c) 2026 GTP26
 * All rights reserved.
 */
import { PrismAsyncLight as SyntaxHighlighterPrism } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { FC } from "react";
import { SyntaxHighlighterProps, styles } from ".";

// Register languages you want to support
SyntaxHighlighterPrism.registerLanguage("js", tsx);
SyntaxHighlighterPrism.registerLanguage("jsx", tsx);
SyntaxHighlighterPrism.registerLanguage("ts", tsx);
SyntaxHighlighterPrism.registerLanguage("tsx", tsx);
SyntaxHighlighterPrism.registerLanguage("python", python);

const SyntaxHighlighter: FC<SyntaxHighlighterProps> = ({
  children,
  language,
}) => {
  return (
    <SyntaxHighlighterPrism
      language={language}
      style={coldarkDark}
      customStyle={styles.syntaxHighlighterCustomStyles}
    >
      {children}
    </SyntaxHighlighterPrism>
  );
};

export default SyntaxHighlighter;
