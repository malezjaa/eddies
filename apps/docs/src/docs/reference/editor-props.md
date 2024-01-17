---
outline: deep
---

# Editor Props

```ts
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

  /**
   * Triggered when the editor is ready.
   */
  onReady?: (editor: EddiesEditor) => void;

  /**
   * Triggered on every content change.
   */
  onContentChange?: (editor: EddiesEditor) => void;

  /**
   * Content shown every time the editor is created.
   */
  initialValue?: Content;

  /**
   * Extensions to add to the editor.
   */
  extensions: Extensions;

  /**
   * The placeholder text when the editor is empty.
   */
  placeholder?: PlaceholderOptions;

  /**
   * Disables the editor.
   */
  isEditable?: boolean;

  /**
   * Auto focus settings
   * @see https://tiptap.dev/docs/editor/api/editor#autofocus
   */
  autofocus?: FocusPosition;

  /**
   * Custom keyboard shortcuts.
   */
  keyboardShortcuts?: Record<string, KeyboardShortcutCommand>;

  /**
   * Editor props to pass to the editor.
   */
  tiptapOptions?: Partial<TiptapEditorOptions>;
};
```
