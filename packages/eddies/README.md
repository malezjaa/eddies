<p align="center">
  <p align="center">
   <img style="border-radius: 50%;" width="150" height="150" src="https://github.com/malezjaa/eddies/blob/main/apps/docs/src/public/logo.png?raw=true" alt="Logo">
  </p>
	<h1 align="center"><b>Eddies</b></h1>
	<p align="center">
	Fully featured, modern and extensible editor
  </p>
</p>

## Quick start

```bash
pnpm install eddies
```

Using editor:

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

[MIT][license] © [malezjaa][author]

Logo by [iconixar](https://www.flaticon.com/authors/iconixar)

[license]: license
[author]: https://github.com/malezjaa
