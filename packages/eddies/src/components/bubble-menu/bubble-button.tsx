import { Editor } from "@tiptap/react";
import { capitalize, cn } from "../../utils";
import { BubbleMenuItem } from "./bubble-menu";

export default function BubbleButton({
  item,
  editor,
  contextVariant = false,
}: {
  item: BubbleMenuItem;
  editor: Editor;
  contextVariant?: boolean;
}) {
  return (
    <button
      onClick={() => item.command(editor)}
      className={`eddies-flex eddies-justify-center eddies-items-center eddies-p-2 eddies-text-color-text-secondary h-[30px] hover:eddies-bg-color-bg-secondary/40 eddies-rounded-md ${
        contextVariant
          ? "eddies-rounded-md eddies-border eddies-border-border"
          : ""
      } ${
        item.isActive(editor)
          ? "eddies-bg-muted"
          : "eddies-bg-color-bg-secondary hover:eddies-bg-hover"
      }`}
      type="button"
    >
      <item.icon className={"eddies-h-4 eddies-w-4"} />
    </button>
  );
}
