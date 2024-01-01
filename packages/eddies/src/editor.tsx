"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import { defaultExtensions } from "./extensions";
import Placeholder from "@tiptap/extension-placeholder";
import "./styles/index.css";
import { cn } from "./utils";
import CharacterCount from "@tiptap/extension-character-count";
import BubbleMenu, {
  defaultBubbleMenuItems,
} from "./components/bubble-menu/bubble-menu";
import BubbleButton from "./components/bubble-menu/bubble-button";
import { EditorProps, EditorType } from "./types";

export function Editor({
  initialValue,
  placeholder,
  extensions = [],
  editorProps = {},
  className = "",
  theme = "dark",
  showCharacterCount = false,
  limit = showCharacterCount ? 3000 : 0,
  menu = true,
  bubbleMenuItems = defaultBubbleMenuItems,
  onChange = (editor: EditorType) =>
    console.log("You should provide an onChange handler to the editor."),
}: EditorProps) {
  const editor = useCustomEditor({
    initialValue,
    placeholder,
    extensions,
    editorProps,
    showCharacterCount,
    limit,
    onChange,
  });

  const bMenuItems = !Array.isArray(bubbleMenuItems)
    ? bubbleMenuItems.includeDefault
      ? [...defaultBubbleMenuItems, ...bubbleMenuItems.items!]
      : bubbleMenuItems.items
    : bubbleMenuItems;

  return (
    <div suppressContentEditableWarning suppressHydrationWarning>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className={`${
          theme === "dark" ? "dark-theme" : ""
        } eddies-relative eddies-min-h-[500px] eddies-bg-color-bg eddies-w-full eddies-max-w-screen-lg sm:eddies-mb-[calc(20vh)] eddies-rounded-lg eddies-border eddies-border-border eddies-shadow-lg ${className}`}
      >
        <div className="eddies-flex eddies-justify-between eddies-items-center eddies-px-8 sm:eddies-px-12 eddies-m-0.5 eddies-mt-6 eddies-pt-3">
          {editor && menu ? (
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

          {showCharacterCount && editor && (
            <div className="eddies-flex eddies-z-10 eddies-rounded-lg eddies-border eddies-border-border eddies-px-2 eddies-py-1 eddies-text-sm eddies-bg-color-bg-secondary eddies-text-color-text-secondary">
              {editor?.storage.characterCount.characters()}/{limit}
            </div>
          )}
        </div>

        {editor && <BubbleMenu editor={editor} items={bMenuItems} />}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

/**
 * This hook exposes the editor instance and allows you to render it however you want.
 */
export const useCustomEditor = ({
  initialValue,
  placeholder,
  extensions = [],
  editorProps = {},
  showCharacterCount = false,
  limit = showCharacterCount ? 3000 : 0,
  onChange = (editor: EditorType) =>
    console.log("You should provide an onChange handler to the editor."),
}: EditorProps) => {
  return useEditor({
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
};
