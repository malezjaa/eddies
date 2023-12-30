import { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { Markdown } from "tiptap-markdown";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { InputRule } from "@tiptap/core";
import { Underline } from "./underline";
import { Bold } from "./bold";
import { Italic } from "./italic";

export const defaultExtensions: Extensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class:
          "eddies-list-disc eddies-list-outside eddies-leading-3 eddies--mt-2",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class:
          "eddies-list-decimal eddies-list-outside eddies-leading-3 eddies--mt-2",
      },
    },
    listItem: {
      HTMLAttributes: {
        class: "eddies-leading-normal eddies--mb-2",
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: "eddies-border-l-4 eddies-border-stone-700",
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
    gapcursor: false,
  }),
  TiptapLink.configure({
    HTMLAttributes: {
      class:
        "eddies-text-stone-400 eddies-underline eddies-underline-offset-[3px] hover:eddies-text-stone-600 eddies-transition-colors eddies-cursor-pointer",
    },
  }),
  TiptapImage.configure({
    allowBase64: true,
    HTMLAttributes: {
      class: "eddies-rounded-lg eddies-border eddies-border-border",
    },
  }),
  TextStyle,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: "eddies-not-prose eddies-pl-2",
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: "eddies-flex eddies-items-start eddies-my-4",
    },
    nested: true,
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: "eddies-mt-4 eddies-mb-6 eddies-border-t eddies-border-stone-300",
    },
  }),
  //markdown
  Underline,
  Bold,
  Italic,
];
