import { Editor } from "@tiptap/core";
import {
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
  ListOrdered,
  TextIcon,
  Code,
  CheckSquare,
} from "lucide-react";
import * as Popover from "@radix-ui/react-popover";
import { Dispatch, FC, SetStateAction, useState } from "react";

export default function NodeSelector({ editor }: { editor: Editor }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems: any[] = [
    {
      name: "Text",
      icon: TextIcon,
      command: () =>
        editor.chain().focus().toggleNode("paragraph", "paragraph").run(),
      isActive: () =>
        editor.isActive("paragraph") &&
        !editor.isActive("bulletList") &&
        !editor.isActive("orderedList"),
    },
    {
      name: "Heading 1",
      icon: Heading1,
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      name: "Heading 2",
      icon: Heading2,
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      name: "Heading 3",
      icon: Heading3,
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    {
      name: "Bullet List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      name: "Numbered List",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
  ];

  const activeItem = menuItems.find((item) => item.isActive()) || {
    name: "Multiple",
  };

  return (
    <Popover.Root open={isOpen}>
      <div className="eddies-relative eddies-h-full">
        <Popover.Trigger
          className="eddies-flex eddies-h-full eddies-rounded-md h-[30px] eddies-items-center hover:eddies-bg-hover eddies-gap-1 eddies-whitespace-nowrap eddies-p-1 eddies-text-sm eddies-font-medium eddies-text-color-text-secondary active:eddies-muted"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{activeItem.name}</span>
          <ChevronDown className="eddies-h-4 eddies-w-4" />
        </Popover.Trigger>

        <Popover.Content
          align="start"
          className="eddies-shadow-custom eddies-bg-color-bg-secondary eddies-text-color-text-secondary eddies-z-[99999] eddies-my-1 eddies-flex eddies-max-h-80 eddies-w-48 eddies-flex-col eddies-overflow-hidden eddies-overflow-y-auto eddies-rounded eddies-border eddies-border-border eddies-p-1 eddies-animate-in eddies-fade-in eddies-slide-in-from-top-1 eddies-mt-2"
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsOpen(false);
              }}
              className={`eddies-flex eddies-items-center eddies-justify-between eddies-rounded-sm eddies-py-2 eddies-px-1.5 eddies-text-sm eddies-text-color-text-secondary hover:eddies-text-color-text ${
                activeItem.name === item.name ? "active" : ""
              }`}
              type="button"
            >
              <div className="flex items-center space-x-2">
                <div className="eddies-flex eddies-items-center eddies-space-x-2">
                  {" "}
                  <item.icon className="eddies-h-3 eddies-w-3" />
                </div>
                <span>{item.name}</span>
              </div>
              {activeItem.name === item.name && (
                <Check className="eddies-h-4 eddies-w-4" />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
}
