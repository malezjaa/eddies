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

| Prop                  | Type                                                                                                                                                | Description                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `className?`          | `string`                                                                                                                                            | The class name to use for the editor.                             |
| `initialValue?`       | `Content`                                                                                                                                           | The initial value of the editor.                                  |
| `placeholder?`        | `string`                                                                                                                                            | The placeholder text when the editor is empty.                    |
| `extensions?`         | `Extensions`                                                                                                                                        | Array of extensions to use with the default provided by `eddies`. |
| `editorProps?`        | `TiptapEditorProps & { attributes?: { class?: string; }; }`                                                                                         | Editor props to pass to the editor.                               |
| `theme?`              | `"light" or "dark"`                                                                                                                                 | Defines the editor's theme.                                       |
| `showCharacterCount?` | `boolean`                                                                                                                                           | Show character count.                                             |
| `limit?`              | `number`                                                                                                                                            | The limit of characters.                                          |
| `menu?`               | `boolean`                                                                                                                                           | Shows menu above the editor.                                      |
| `bubbleMenuItems?`    | [BubbleMenuItem[]](/docs/reference/bubble-menu-item) or { includeDefault?: boolean; items?: [BubbleMenuItem[]](/docs/reference/bubble-menu-item); } | Items that will be displayed in bubble menu.                      |
