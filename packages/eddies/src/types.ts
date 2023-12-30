import { Extensions, Content, Editor as TiptapEditor } from "@tiptap/react";
import { EditorProps as TiptapEditorProps } from "@tiptap/pm/view";

export type EditorProps = {
  /**
   * The class name to use for the editor.
   */
  className?: string;

  /**
   * The initial value of the editor.
   */
  initialValue?: Content;

  /**
   * The placeholder text when the editor is empty.
   */
  placeholder?: string;

  /**
   * Array of extensions to use with the default provided by `eddies`.
   */
  extensions?: Extensions;

  /**
   * Editor props to pass to the editor.
   */
  editorProps?: TiptapEditorProps & {
    attributes?: {
      class?: string;
    };
  };

  /**
   * Defines the editor's theme.
   */
  theme?: "light" | "dark";

  /**
   * Handles the editor's value change.
   */
  onChange?: (editor: EditorType) => void | Promise<void>;

  /**
   * Show character count.
   */
  showCharacterCount?: boolean;

  /**
   * The limit of characters.
   */
  limit?: number;
};

export type EditorType = TiptapEditor & {
  /**
   * Returns the markdown representation of the editor's content.
   */
  getMarkdown: () => string;
};

export type CustomEditorProps = Pick<
  EditorProps,
  | "limit"
  | "editorProps"
  | "extensions"
  | "placeholder"
  | "onChange"
  | "initialValue"
  | "showCharacterCount"
>;
