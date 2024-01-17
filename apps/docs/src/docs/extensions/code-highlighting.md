---
outline: deep
---

# Overview

Code highlighting extends `Code Block` plugin from [Tiptap](https://tiptap.dev/). It adds syntax highlighting to code blocks.
This extension uses [Shikiji](https://shikiji.netlify.app/) for code highlighting.

## Installation

::: code-group

```bash [npm]
$ npm install @eddieseditor/code-highlight
```

```bash [yarn]
$ yarn install @eddieseditor/code-highlight
```

```bash [pnpm]
$ pnpm install @eddieseditor/code-highlight
```

:::

## Usage

`1.` First you initialize the highlighter with the languages and themes you want to use.

`2.` Then you add the extension to the editor and pass the highlighter instance to it.

`3.` Define which of the loaded themes should be used as default.

```tsx
"use client";

import { Editor } from "eddies";
import { CodeHighlight, useHighlighter } from "@eddieseditor/code-highlight";

export default function Page() {
  const { data, isLoading } = useHighlighter({
    langs: ["html", "css", "js", "ts", "jsx", "tsx", "json"],
    themes: ["vitesse-dark"],
  });

  return (
    <>
      {!isLoading && (
        <Editor
          extensions={[
            CodeHighlight.configure({
              defaultTheme: "vitesse-dark",
              HTMLAttributes: {
                class: "eddies-code-block",
              },
            }),
          ]}
          initialValue={"# welcome to eddies\n\neddies is a markdown editor"}
        />
      )}
    </>
  );
}
```
