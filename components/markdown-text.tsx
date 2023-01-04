import ReactMarkdown from "react-markdown";
import markdownStyles from "./markdown-styles.module.css";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import { duotoneSpace as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rangeParser from "parse-numeric-range";
import cn from "classnames";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

type Props = {
  content: string;
};

export const Markdown = ({ content }: Props) => {
  const MarkdownComponents: object = {
    code({ node, inline, className, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;

      const applyHighlights: object = (applyHighlights: number) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, "");
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : "0";
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data: string = highlight.includes(applyHighlights)
            ? "highlight"
            : null;
          return { data };
        } else {
          return {};
        }
      };

      return match ? (
        <SyntaxHighlighter
          style={theme}
          language={match[1]}
          PreTag="div"
          className={cn("syntax rounded-2xl drop-shadow-xl shadow-slate-500")}
          showLineNumbers={true}
          wrapLines={true}
          useInlineStyles={true}
          lineProps={applyHighlights}
          children={[]}
          {...props}
        />
      ) : (
        <code className={className} {...props} />
      );
    },
  };
  return (
    <ReactMarkdown
      components={MarkdownComponents}
      className={markdownStyles["markdown"]}
    >
      {content}
    </ReactMarkdown>
  );
};
