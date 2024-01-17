import { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import { Markdown } from "tiptap-markdown";
import Highlight from "@tiptap/extension-highlight";

export const defaultExtensions: Extensions = [
  StarterKit.configure({
    paragraph: {
      HTMLAttributes: {
        class: "eddies-paragraph",
      },
    },
    heading: {
      HTMLAttributes: {
        class: "eddies-heading",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class:
          "eddies-list-disc eddies-list-outside eddies-leading-3 eddies--mt-2 eddies-bullet-list",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class:
          "eddies-list-decimal eddies-list-outside eddies-leading-3 eddies--mt-2 eddies-ordered-list",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "eddies-leading-normal eddies--mb-2 eddies-list-item",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "eddies-border-l-4 eddies-border-stone-700 eddies-blockquote",
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: "eddies-code-block",
      },
    },
    code: {
      HTMLAttributes: {
        class: "eddies-code",
        spellcheck: "false",
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: "#DBEAFE",
      width: 4,
    },
    italic: false,
    bold: false,
    strike: false,
    gapcursor: false,
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "eddies-text-stone-400 eddies-underline eddies-underline-offset-[3px] hover:eddies-text-stone-600 eddies-transition-colors eddies-cursor-pointer eddies-link",
    },
  }),
  TiptapImage.configure({
    allowBase64: true,
    HTMLAttributes: {
      class:
        "eddies-rounded-lg eddies-border eddies-border-border eddies-image",
    },
  }),
  TextStyle,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "eddies-not-prose eddies-pl-2 eddies-task-list",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "eddies-flex eddies-items-start eddies-my-4 eddies-task-list-item",
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
    transformPastedText: true,
  }),
  TextAlign.configure({
    alignments: ["left", "center", "right"],
    types: [
      "paragraph",
      "heading",
      "codeBlock",
      "blockquote",
      "listItem",
      "code",
      "link",
      "image",
      "taskItem",
      "taskList",
      "bulletList",
      "orderedList",
    ],
  }),
];
