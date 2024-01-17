"use client";

import { Editor } from "eddies";
import { useState } from "react";
import Link from "next/link";
import { Emojis } from "@eddieseditor/emojis";
import { CodeHighlight, useHighlighter } from "@eddieseditor/code-highlight";

export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const { data, isLoading } = useHighlighter({
    langs: ["html", "css", "js", "ts", "jsx", "tsx", "json"],
    themes: ["vitesse-dark"],
  });

  return (
    <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(10vh)] bg-[#353535]">
      <Link href="https://github.com/malezjaa/eddies" target="_blank">
        <button
          className={`absolute top-5 left-5 z-10 max-h-fit dark-theme bg-color-bg-secondary hover:bg-hover border border-border flex justify-center items-center p-2 text-color-text-secondary h-[30px] rounded-md`}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </button>
      </Link>

      <button
        className={`absolute top-5 right-5 z-10 max-h-fit dark-theme bg-color-bg-secondary hover:bg-hover border border-border flex justify-center items-center p-2 py-4 text-color-text-secondary h-[30px] rounded-md`}
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Change theme
      </button>
      <div className="relative w-full max-w-screen-lg pt-20">
        {!isLoading && (
          <Editor
            showCharacterCount={true}
            extensions={[
              Emojis.configure({
                mode: "override",
                emojiReplacements: [{ find: /:skrull: $/, replace: "💀 " }],
              }),
              CodeHighlight.configure({
                defaultTheme: "vitesse-dark",
                HTMLAttributes: {
                  class: "eddies-code-block",
                },
                shikiji: data,
              }),
            ]}
            theme={theme}
            limit={3000}
            placeholder={{
              enabled: true,
              text: "Type something here...",
              nodes: {
                heading: "Heading",
              },
            }}
            initialValue={{
              type: "doc",
              content: [
                {
                  type: "heading",
                  attrs: {
                    id: "913d4edc-7c83-4711-aaea-aca6723f58dc",
                    textAlign: "left",
                    level: 1,
                  },
                  content: [
                    {
                      type: "text",
                      text: "Hello world 🌍",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  attrs: {
                    id: null,
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                      text: "bold",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  attrs: {
                    id: null,
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "italic",
                        },
                      ],
                      text: "italic",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  attrs: {
                    id: null,
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "underline",
                        },
                      ],
                      text: "underline",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  attrs: {
                    id: null,
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "strike",
                        },
                      ],
                      text: "strike",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  attrs: {
                    id: null,
                    textAlign: "left",
                  },
                  content: [
                    {
                      type: "text",
                      marks: [
                        {
                          type: "code",
                          attrs: {
                            textAlign: "left",
                          },
                        },
                      ],
                      text: "code",
                    },
                  ],
                },
                {
                  type: "codeBlock",
                  attrs: {
                    textAlign: "left",
                    language: "ts",
                  },
                  content: [
                    {
                      type: "text",
                      text: 'export const useHighlighter = (options: {\n  langs: string[];\n  themes: string[];\n}) =>\n  useSWR(\n    "-",\n    async () => {\n      const highlighter = await initHighlighter(options.langs, options.themes);\n\n      return highlighter;\n    },\n    { revalidateOnFocus: false }\n  );',
                    },
                  ],
                },
              ],
            }}
            onContentChange={(content) => console.log(content.getJSON())}
          />
        )}
      </div>
    </div>
  );
}
