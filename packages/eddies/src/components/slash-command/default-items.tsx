import { Editor, Range } from "@tiptap/core";
import { SlashCommandItem } from "./slash-command";
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Text,
  TextQuote,
  Code,
} from "lucide-react";

export const defaultSlashCommands: SlashCommandItem[] = [
  {
    title: "Text",
    description: "Just start typing with plain text.",
    alias: ["p", "paragraph"],
    icon: Text,
    command: (editor) => {
      editor.chain().focus().toggleNode("paragraph", "paragraph").run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    alias: ["title", "big", "large"],
    icon: Heading1,
    command: (editor) => {
      editor.chain().focus().setNode("heading", { level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    alias: ["subtitle", "medium"],
    icon: Heading2,
    command: (editor) => {
      editor.chain().focus().setNode("heading", { level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    alias: ["subtitle", "small"],
    icon: Heading3,
    command: (editor) => {
      editor.chain().focus().setNode("heading", { level: 3 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    alias: ["unordered", "point"],
    icon: List,
    command: (editor) => {
      editor.chain().focus().toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    alias: ["ordered"],
    icon: ListOrdered,
    command: (editor) => {
      editor.chain().focus().toggleOrderedList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    alias: ["blockquote"],
    icon: TextQuote,
    command: (editor) =>
      editor
        .chain()
        .focus()
        .toggleNode("paragraph", "paragraph")
        .toggleBlockquote()
        .run(),
  },
  {
    title: "Code",
    description: "Create a code snippet.",
    alias: ["codeblock"],
    icon: Code,
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
  },
];
