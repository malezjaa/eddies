import CodeBlock, { CodeBlockOptions } from "@tiptap/extension-code-block";

import { HighlightPlugin } from "./plugin";
import { type Highlighter } from "shikiji";

export type CodeHighlightOptions = {
  /**
   * Default theme
   */
  defaultTheme: string;
  /**
   * Shikiji instance
   */
  shikiji: Highlighter;
} & CodeBlockOptions;

export const CodeHighlight = CodeBlock.extend<CodeHighlightOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      languages: ["typescript"],
      themes: ["vitesse-dark"],
      defaultTheme: "vitesse-dark",
    };
  },

  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() || []),
      HighlightPlugin({
        name: this.name,
        ...this.options,
      }),
    ];
  },
});

export * from "./useHighlighter";
