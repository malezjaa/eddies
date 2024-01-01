import { Editor, BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
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
} from "lucide-react";
import NodeSelector from "../node-selector/node-selector";

export interface BubbleMenuItem {
  name: string;
  /**
   * Icon from lucide-react
   */
  icon: typeof BoldIcon;
  /**
   * Function that boolean based on whether the command is active
   * @param editor
   */
  isActive: (editor: Editor) => boolean;
  /**
   * Function to execute the command
   * @param editor
   */
  command: (editor: any) => void;
}

export const defaultBubbleMenuItems: BubbleMenuItem[] = [
  {
    name: "bold",
    icon: BoldIcon,
    isActive: (editor) => editor.isActive("bold"),
    command: (editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    name: "italic",
    icon: ItalicIcon,
    isActive: (editor) => editor.isActive("italic"),
    command: (editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    name: "underline",
    icon: UnderlineIcon,
    isActive: (editor) => editor.isActive("underline"),
    command: (editor) => editor.chain().focus().toggleUnderline().run(),
  },
  {
    name: "strike",
    icon: StrikethroughIcon,
    isActive: (editor) => editor.isActive("strike"),
    command: (editor) => editor.chain().focus().toggleStrike().run(),
  },
  {
    name: "code",
    icon: CodeIcon,
    isActive: (editor) => editor.isActive("code"),
    command: (editor) => editor.chain().focus().toggleCode().run(),
  },
  {
    name: "left",
    icon: AlignLeft,
    isActive: (editor) => editor.isActive({ textAlign: "left" }),
    command: (editor) => editor.chain().focus().setTextAlign("left").run(),
  },
  {
    name: "center",
    icon: AlignCenter,
    isActive: (editor) => editor.isActive({ textAlign: "center" }),
    command: (editor) => editor.chain().focus().setTextAlign("center").run(),
  },
  {
    name: "right",
    icon: AlignRight,
    isActive: (editor) => editor.isActive({ textAlign: "right" }),
    command: (editor) => editor.chain().focus().setTextAlign("right").run(),
  },
];

export default function BubbleMenu({
  editor,
  items,
}: {
  editor: Editor;
  items: BubbleMenuItem[] | undefined;
}) {
  return (
    <>
      <TiptapBubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="eddies-m-0.5 eddies-mx-1 eddies-rounded-xl eddies-border-box eddies-flex eddies-flex-row eddies-items-center eddies-justify-center eddies-bg-color-bg-secondary eddies-shadow-custom eddies-gap-[2px] eddies-w-fit"
      >
        <NodeSelector editor={editor} />
        {items?.map((item, index) => (
          <BubbleButton key={index} item={item} editor={editor} />
        ))}
      </TiptapBubbleMenu>
    </>
  );
}
