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

Code highlighting extends `Code Block` plugin from [Tiptap](https://tiptap.dev/). It adds syntax highlighting to code blocks.
This extension uses [Shikiji](https://shikiji.netlify.app/) for code highlighting.

## Quick start

```bash
pnpm install @eddieseditor/code-highlight
```

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

[MIT][license] © [malezjaa][author]

Logo by [iconixar](https://www.flaticon.com/authors/iconixar)

[license]: license
[author]: https://github.com/malezjaa
