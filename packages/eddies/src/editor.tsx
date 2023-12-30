"use client";

import {
  useEditor,
  EditorContent,
  Extensions,
  Content,
  Editor as TiptapEditor,
} from "@tiptap/react";
import { defaultExtensions } from "./extensions";
import { EditorProps as TiptapEditorProps } from "@tiptap/pm/view";
import Placeholder from "@tiptap/extension-placeholder";
import "./styles/index.css";
import { cn } from "./utils";
import CharacterCount from "@tiptap/extension-character-count";
import BubbleMenu from "./bubble-menu/bubble-menu";

export type EditorProps = {
  /**
   * The class name to use for the editor.
   */
  className?: string;

  /**
   * The initial value of the editor.
   */
  initialValue?: Content;

  /**
   * The placeholder text when the editor is empty.
   */
  placeholder?: string;

  /**
   * Array of extensions to use with the default provided by `eddies`.
   */
  extensions?: Extensions;

  /**
   * Editor props to pass to the editor.
   */
  editorProps?: TiptapEditorProps & {
    attributes?: {
      class?: string;
    };
  };

  /**
   * Defines the editor's theme.
   */
  theme?: "light" | "dark";

  /**
   * Handles the editor's value change.
   */
  onChange?: (editor: EditorType) => void | Promise<void>;

  /**
   * Show character count.
   */
  showCharacterCount?: boolean;

  /**
   * The limit of characters.
   */
  limit?: number;
};

export type EditorType = TiptapEditor & {
  /**
   * Returns the markdown representation of the editor's content.
   */
  getMarkdown: () => string;
};

export function Editor({
  initialValue,
  placeholder,
  extensions = [],
  editorProps = {},
  className = "",
  theme = "dark",
  showCharacterCount = false,
  limit = showCharacterCount ? 3000 : 0,
  onChange = (editor: EditorType) =>
    console.log("You should provide an onChange handler to the editor."),
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      ...extensions,
      ...defaultExtensions,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return `Heading ${node.attrs.level}`;
          }
          return placeholder ?? "Start typing...";
        },
        includeChildren: true,
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
    onUpdate: (e) => {
      //@ts-ignore
      onChange({
        ...e.editor,
        getMarkdown: () => e.editor.storage.markdown.getMarkdown(),
      });
    },
    editorProps: {
      ...editorProps,
      attributes: {
        class: cn(
          editorProps.attributes?.class,
          `eddies-prose-lg eddies-prose-stone dark:eddies-prose-invert prose-headings:eddies-font-title eddies-font-default focus:eddies-outline-none eddies-max-w-full`
        ),
      },
    },
    content: initialValue ?? "",
  }) as EditorType;

  return (
    <div suppressContentEditableWarning suppressHydrationWarning>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className={`${
          theme === "dark" ? "dark-theme" : ""
        } eddies-relative eddies-min-h-[500px] eddies-bg-color-bg eddies-w-full eddies-max-w-screen-lg sm:eddies-mb-[calc(20vh)] eddies-rounded-lg sm:eddies-border eddies-border-border sm:eddies-shadow-lg ${className}`}
      >
        {showCharacterCount && (
          <div className="absolute right-5 top-5 mb-5 z-10 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400 rounded-t-lg eddies-bg-color-bg-secondary eddies-text-color-text-secondary">
            {editor?.storage.characterCount.characters()}/{limit}
          </div>
        )}
        {editor && <BubbleMenu editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
