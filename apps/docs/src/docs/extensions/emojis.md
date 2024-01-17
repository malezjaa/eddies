---
outline: deep
---

# Overview

This simple extension converts glyphs like `:)` to emojis like 😊 and `:rocket:` to 🚀.

## Installation

::: code-group

```bash [npm]
$ npm install @eddieseditor/emojis
```

```bash [yarn]
$ yarn install @eddieseditor/emojis
```

```bash [pnpm]
$ pnpm install @eddieseditor/emojis
```

:::

## Usage

```tsx
"use client";

import { Editor } from "eddies";
import { Emojis } from "@eddieseditor/emojis";

export default function Page() {
  return (
    <div className="m-5">
      <Editor theme={"dark"} extensions={[Emojis]} />
    </div>
  );
}
```

## Own emojis rules

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
