<p align="center">
  <p align="center">
   <img style="border-radius: 50%;" width="150" height="150" src="https://github.com/malezjaa/eddies/blob/main/apps/docs/src/public/logo.png?raw=true" alt="Logo">
  </p>
	<h1 align="center"><b>Eddies</b></h1>
	<p align="center">
	Fully featured, modern and extensible editor
  </p>
</p>

> If you encounter any error with the documentation or with the code itself please report it.

## Overview

This simple extension converts glyphs like `:)` to emojis like 😊 and `:rocket:` to 🚀.

## Quick start

```bash
pnpm install @eddieseditor/emojis
```

## Usage

```tsx
"use client";

import { Editor } from "eddies";
import { Emojis } from "@eddieseditor/emojis";

export default function Page() {
  return (
    <div className="m-5">
      <Editor
        theme={"dark"}
        extensions={[
          Emojis.configure({
            mode: "override", //when set to "merge" it will merge with default rules
            emojiReplacements: [{ find: /:skrull: $/, replace: "💀 " }],
          }),
        ]}
      />
    </div>
  );
}
```

## Props

| Prop                 | Type                                        | Description                  |
| -------------------- | ------------------------------------------- | ---------------------------- |
| `mode?`              | `"override" \| "merge"`                     | Mode of emoji replacement.   |
| `emojiReplacements?` | `Array<{ find: RegExp; replace: string; }>` | Array of emoji replacements. |

[MIT][license] © [malezjaa][author]

Logo by [iconixar](https://www.flaticon.com/authors/iconixar)

[license]: license
[author]: https://github.com/malezjaa
