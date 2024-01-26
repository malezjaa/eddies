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

## EditorOptions

| Prop                  | Type                                      | Description                                     |
| --------------------- | ----------------------------------------- | ----------------------------------------------- |
| `className?`          | `string`                                  | The class name to use for the editor.           |
| `theme?`              | `"light" \| "dark"`                       | Defines the editor's theme.                     |
| `showCharacterCount?` | `boolean`                                 | Show character count.                           |
| `limit?`              | `number`                                  | The limit of characters.                        |
| `menu?`               | `boolean`                                 | Shows menu above the editor.                    |
| `bubbleMenuItems?`    | `BubbleMenuItem[]`                        | Items that will be displayed in bubble menu.    |
| `slashMenuCommands?`  | `SlashCommandItem[]`                      | Slash menu commands.                            |
| `onReady?`            | `(editor: EddiesEditor) => void`          | Triggered when the editor is ready.             |
| `onContentChange?`    | `(editor: EddiesEditor) => void`          | Triggered on every content change.              |
| `initialValue?`       | `Content`                                 | Content shown every time the editor is created. |
| `extensions`          | `Extensions`                              | Extensions to add to the editor.                |
| `placeholder?`        | `PlaceholderOptions`                      | The placeholder text when the editor is empty.  |
| `isEditable?`         | `boolean`                                 | Disables the editor.                            |
| `autofocus?`          | `FocusPosition`                           | Auto focus settings                             |
| `keyboardShortcuts?`  | `Record<string, KeyboardShortcutCommand>` | Custom keyboard shortcuts.                      |
| `tiptapOptions?`      | `Partial<TiptapEditorOptions>`            | Editor props to pass to the editor.             |
