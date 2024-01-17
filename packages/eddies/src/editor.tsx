"use client";
import { EditorContent, Editor as TiptapEditor } from "@tiptap/react";
import { defaultExtensions } from "./extensions";
import "./styles/index.css";
import BubbleMenu, {
  defaultBubbleMenuItems,
} from "./components/bubble-menu/bubble-menu";
import BubbleButton from "./components/bubble-menu/bubble-button";
import { EditorProps } from "./types";
import DragMenu from "./components/drag-menu/drag-menu";
import { EddiesEditor, EditorOptions } from "@eddieseditor/core";
import CharacterCount from "@tiptap/extension-character-count";
import { useEffect, useMemo, useRef } from "react";
import { useEditor } from "./hooks/useEditor";

export function Editor({
  initialValue,
  placeholder,
  extensions = [],
  className = "",
  theme = "dark",
  showCharacterCount = false,
  limit = showCharacterCount ? 3000 : 0,
  menu = true,
  bubbleMenuItems = defaultBubbleMenuItems,
  isEditable = true,
  autofocus = false,
  onReady = () => console.log(""),
  tiptapOptions = {
    editorProps: {
      attributes: {
        class: `eddies-prose-lg eddies-prose-stone dark:eddies-prose-invert prose-headings:eddies-font-title eddies-font-default focus:eddies-outline-none eddies-max-w-full`,
      },
    },
  },
  onContentChange = (editor: EddiesEditor) => console.log(""),
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      ...defaultExtensions,
      ...extensions,
      CharacterCount.configure({
        limit,
      }),
    ],
    initialValue,
    placeholder,
    isEditable,
    autofocus,
    onContentChange,
    onReady,
    tiptapOptions,
  });

  const bMenuItems = !Array.isArray(bubbleMenuItems)
    ? bubbleMenuItems.includeDefault
      ? [...defaultBubbleMenuItems, ...bubbleMenuItems.items!]
      : bubbleMenuItems.items
    : bubbleMenuItems;

  if (!editor) return;

  return (
    <div suppressContentEditableWarning suppressHydrationWarning>
      <div
        onClick={() => {
          editor?.tiptap?.chain().focus().run();
        }}
        className={`${
          theme === "dark" ? "dark-theme" : ""
        } eddies-relative eddies-min-h-[500px] eddies-bg-color-bg eddies-w-full eddies-max-w-screen-lg eddies-rounded-lg eddies-border eddies-border-border eddies-shadow-lg ${className}`}
      >
        {editor && <BubbleMenu editor={editor} items={bMenuItems} />}
        {editor && <DragMenu editor={editor} />}
        <div className="eddies-flex eddies-justify-between eddies-items-center eddies-px-8 sm:eddies-px-12 eddies-m-0.5 eddies-mt-6 eddies-pt-3">
          {editor?.tiptap && menu ? (
            <div className="eddies-flex eddies-m-[2px] eddies-flex-row eddies-flex-wrap eddies-gap-1">
              {bMenuItems?.map((item, index) => (
                <BubbleButton
                  key={index}
                  item={item}
                  editor={editor}
                  contextVariant={true}
                />
              ))}
            </div>
          ) : (
            <div></div>
          )}

          {showCharacterCount && editor?.tiptap && (
            <div className="eddies-flex eddies-z-10 eddies-rounded-lg eddies-border eddies-border-border eddies-px-2 eddies-py-1 eddies-text-sm eddies-bg-color-bg-secondary eddies-text-color-text-secondary">
              {editor?.tiptap?.storage.characterCount.characters()}/{limit}
            </div>
          )}
        </div>
        <EditorContent editor={editor?.tiptap!} />
      </div>
    </div>
  );
}
