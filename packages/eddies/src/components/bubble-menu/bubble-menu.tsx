"use client";

import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import BubbleButton from "./bubble-button";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LucideIcon,
} from "lucide-react";
import NodeSelector from "../node-selector/node-selector";
import { EddiesEditor } from "@eddieseditor/core";

export interface BubbleMenuItem {
  name: string;
  /**
   * Icon from lucide-react
   */
  icon: LucideIcon;
  /**
   * Function that boolean based on whether the command is active
   * @param editor
   */
  isActive: (editor: EddiesEditor) => boolean;
  /**
   * Function to execute the command
   * @param editor
   */
  command: (editor: EddiesEditor) => void;
}

export const defaultBubbleMenuItems: BubbleMenuItem[] = [
  {
    name: "bold",
    icon: BoldIcon,
    isActive: (editor) => editor.tiptap.isActive("bold"),
    command: (editor) => editor.tiptap.chain().focus().toggleBold().run(),
  },
  {
    name: "italic",
    icon: ItalicIcon,
    isActive: (editor) => {
      return editor.tiptap.isActive("italic");
    },
    command: (editor) => editor.tiptap.chain().focus().toggleItalic().run(),
  },
  {
    name: "underline",
    icon: UnderlineIcon,
    isActive: (editor) => editor.tiptap.isActive("underline"),
    //@ts-ignore
    command: (editor) => editor.tiptap.chain().focus().toggleUnderline().run(),
  },
  {
    name: "strike",
    icon: StrikethroughIcon,
    isActive: (editor) => editor.tiptap.isActive("strike"),
    command: (editor) => editor.tiptap.chain().focus().toggleStrike().run(),
  },
  {
    name: "code",
    icon: CodeIcon,
    isActive: (editor) => editor.tiptap.isActive("code"),
    command: (editor) => editor.tiptap.chain().focus().toggleCode().run(),
  },
  {
    name: "left",
    icon: AlignLeft,
    isActive: (editor) => editor.tiptap.isActive({ textAlign: "left" }),
    command: (editor) =>
      editor.tiptap.chain().focus().setTextAlign("left").run(),
  },
  {
    name: "center",
    icon: AlignCenter,
    isActive: (editor) => editor.tiptap.isActive({ textAlign: "center" }),
    command: (editor) =>
      editor.tiptap.chain().focus().setTextAlign("center").run(),
  },
  {
    name: "right",
    icon: AlignRight,
    isActive: (editor) => editor.tiptap.isActive({ textAlign: "right" }),
    command: (editor) =>
      editor.tiptap.chain().focus().setTextAlign("right").run(),
  },
];

export default function BubbleMenu({
  editor,
  items,
}: {
  editor: EddiesEditor;
  items: BubbleMenuItem[] | undefined;
}) {
  return (
    <>
      <TiptapBubbleMenu
        editor={editor.tiptap}
        tippyOptions={{ duration: 100 }}
        shouldShow={({ editor, state }) => {
          if (
            !editor.isEditable ||
            editor.isActive("image") ||
            state.selection.empty
          ) {
            return false;
          }

          return true;
        }}
        className="eddies-border eddies-border-border eddies-shadow-custom eddies-p-0.5 eddies-px-1 eddies-rounded-[.375rem] eddies-border-box eddies-flex eddies-bg-color-bg-secondary eddies-gap-[3px] eddies-w-fit"
      >
        <NodeSelector editor={editor} />
        <div className="eddies-flex">
          {items?.map((item, index) => (
            <BubbleButton key={index} item={item} editor={editor} />
          ))}
        </div>
      </TiptapBubbleMenu>
    </>
  );
}
