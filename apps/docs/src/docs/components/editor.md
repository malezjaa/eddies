---
outline: deep
---

# Editor

## Usage

```tsx
import { Editor } from "eddies";

export default function Page() {
  return (
    <div className="m-5">
      <Editor />
    </div>
  );
}
```

## Props

- Reference: [EditorProps](/docs/reference/editor-props)

<!-- export type EditorProps = {
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
}

create table with prop name type and description
 -->

## EditorOptions

| Prop                  | Type                                                                          | Description                                     |
| --------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------- |
| `className?`          | `string`                                                                      | The class name to use for the editor.           |
| `theme?`              | `"light" \| "dark"`                                                           | Defines the editor's theme.                     |
| `showCharacterCount?` | `boolean`                                                                     | Show character count.                           |
| `limit?`              | `number`                                                                      | The limit of characters.                        |
| `menu?`               | `boolean`                                                                     | Shows menu above the editor.                    |
| `bubbleMenuItems?`    | `BubbleMenuItem[] \| { includeDefault?: boolean; items?: BubbleMenuItem[]; }` | Items that will be displayed in bubble menu.    |
| `onReady?`            | `(editor: EddiesEditor) => void`                                              | Triggered when the editor is ready.             |
| `onContentChange?`    | `(editor: EddiesEditor) => void`                                              | Triggered on every content change.              |
| `initialValue?`       | `Content`                                                                     | Content shown every time the editor is created. |
| `extensions`          | `Extensions`                                                                  | Extensions to add to the editor.                |
| `placeholder?`        | `PlaceholderOptions`                                                          | The placeholder text when the editor is empty.  |
| `isEditable?`         | `boolean`                                                                     | Disables the editor.                            |
| `autofocus?`          | `FocusPosition`                                                               | Auto focus settings                             |
| `keyboardShortcuts?`  | `Record<string, KeyboardShortcutCommand>`                                     | Custom keyboard shortcuts.                      |
| `tiptapOptions?`      | `Partial<TiptapEditorOptions>`                                                | Editor props to pass to the editor.             |
