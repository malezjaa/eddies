<p align="center">
  <p align="center">
   <img style="border-radius: 50%;" width="150" height="150" src="https://github.com/malezjaa/eddies/blob/main/apps/docs/src/public/logo.png" alt="Logo">
  </p>
	<h1 align="center"><b>Eddies</b></h1>
	<p align="center">
	Fully featured, modern and extensible editor
  </p>
</p>

> If you encounter any error with the documentation or with the code itself please report it.

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

| Prop                  | Type                                                                        | Description                                                       |
| --------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `className?`          | `string`                                                                    | The class name to use for the editor.                             |
| `initialValue?`       | `Content`                                                                   | The initial value of the editor.                                  |
| `placeholder?`        | `string`                                                                    | The placeholder text when the editor is empty.                    |
| `extensions?`         | `Extensions`                                                                | Array of extensions to use with the default provided by `eddies`. |
| `editorProps?`        | `TiptapEditorProps & { attributes?: { class?: string; }; }`                 | Editor props to pass to the editor.                               |
| `theme?`              | `"light" or "dark"`                                                         | Defines the editor's theme.                                       |
| `showCharacterCount?` | `boolean`                                                                   | Show character count.                                             |
| `limit?`              | `number`                                                                    | The limit of characters.                                          |
| `menu?`               | `boolean`                                                                   | Shows menu above the editor.                                      |
| `bubbleMenuItems?`    | BubbleMenuItem[] or { includeDefault?: boolean; items?: BubbleMenuItem[]; } | Items that will be displayed in bubble menu.                      |

[MIT][license] © [malezjaa][author]

Logo by [iconixar](https://www.flaticon.com/authors/iconixar)

[license]: license
[author]: https://github.com/malezjaa
