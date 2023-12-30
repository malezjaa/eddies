import { Editor, BubbleMenu as TiptapBubbleMenu } from "@tiptap/react";
import BubbleButton from "./bubble-button";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from "lucide-react";

export interface BubbleMenuItem {
  name: string;
  icon: typeof BoldIcon;
}

export default function BubbleMenu({ editor }: { editor: Editor }) {
  const items: BubbleMenuItem[] = [
    {
      name: "bold",
      icon: BoldIcon,
    },
    {
      name: "italic",
      icon: ItalicIcon,
    },
    {
      name: "underline",
      icon: UnderlineIcon,
    },
    {
      name: "strike",
      icon: StrikethroughIcon,
    },
    {
      name: "code",
      icon: CodeIcon,
    },
  ];

  return (
    <>
      <TiptapBubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="eddies-flex eddies-w-fit eddies-bg-color-bg-secondary eddies-rounded-lg eddies-border-[1.2px] eddies-border-border eddies-shadow-lg eddies-z-20"
      >
        <div className="eddies-flex eddies-m-[2px] rounded-xl">
          {items.map((item, index) => (
            <BubbleButton key={index} item={item} editor={editor} />
          ))}
        </div>
      </TiptapBubbleMenu>
    </>
  );
}