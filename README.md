<p align="center">
  <p align="center">
   <img style="border-radius: 50%;" width="150" height="150" src="./apps/docs/src/public/logo.png" alt="Logo">
  </p>
	<h1 align="center"><b>Eddies</b></h1>
	<p align="center">
<a href="https://www.npmjs.com/package/eddies" target="_blank"><img src="https://img.shields.io/npm/v/eddies.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/eddies" target="_blank"><img src="https://img.shields.io/npm/dt/eddies.svg" alt="NPM Downloads" /></a>
<a href="https://www.npmjs.com/package/eddies" target="_blank"><img src="https://img.shields.io/github/issues-closed/malezjaa/eddies.svg" alt="Issues closed" /></a>
<a href="https://github.com/malezjaa/eddies/graphs/commit-activity" target="_blank"><img src="https://img.shields.io/github/commit-activity/m/malezjaa/eddies.svg" alt="Commit activity" /></a>
<a href="https://github.com/malezjaa/eddies/stargazers" target="_blank"><img src="https://img.shields.io/github/stars/malezjaa/eddies.svg" alt="Stars" /></a>
  </p>
</p>

<p align="center">
<img style="border-radius: 10px;" src=".github/preview.png" alt="Logo">
<p>

## Quick start

```bash
pnpm install eddies
```

## Why Eddies?

The reason to use Eddies is very easy implementation. For those who don't want to build the whole editor from scratch, Eddies allows you to use editor with one line of code. Eddies has support for different types of markup (bold, italic, underline, etc.), also has visual components that make writing easier (bubble menu, text counter, etc.) and extensions (syntax highlighting, emojis). You can style the editor very easily with css variables or classes.

## Using editor:

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

## Contributing

Pull requests and stars are always welcome. See [`contributing.md`](.github/contributing.md) for ways to get started.

This repository has a [`code of conduct`](.github/CODE_OF_CONDUCT.md). By interacting with this repository, organization, or community you agree to abide by its terms.

[MIT][license] © [malezjaa][author]

Logo by [iconixar](https://www.flaticon.com/authors/iconixar)

[license]: license
[author]: https://github.com/malezjaa
