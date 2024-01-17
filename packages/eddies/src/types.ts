import {
  Extensions,
  Content,
  Editor as TiptapEditor,
  FocusPosition,
} from "@tiptap/react";
import { EditorProps as TiptapEditorProps } from "@tiptap/pm/view";
import { BubbleMenuItem } from "./components/bubble-menu/bubble-menu";
import { Editor as CoreEditor } from "@tiptap/react";
import { EditorOptions } from "@eddieseditor/core";

export type EditorProps = {
  /**
   * The class name to use for the editor.
   */
  className?: string;

  /**
   * Defines the editor's theme.
   */
  theme?: "light" | "dark";

  /**
   * Show character count.
   */
  showCharacterCount?: boolean;

  /**
   * The limit of characters.
   */
  limit?: number;

  /**
   * Shows menu above the editor.
   */
  menu?: boolean;

  /**
   * Items that will be displayed in bubble menu.
   */
  bubbleMenuItems?:
    | BubbleMenuItem[]
    | {
        /**
         * Shows default bubble menu items.
         */
        includeDefault?: boolean;

        items?: BubbleMenuItem[];
      };
} & EditorOptions;
