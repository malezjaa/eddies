---
outline: deep
---

# Overview

Eddies support four different ways of outputting and inputting data: `markdown`, `html`, `json` and `text`.

## Markdown

Not every extension supports markdown output. Some `marks` or `nodes` might return plain text instead of markdown.

```tsx
import { Editor } from "eddies";

export default function Page() {
  return (
    <Editor
      onChange={(editor) => console.log(editor.getMarkdown())}
      initialValue={`# Hello world`}
    />
  );
}
```

## HTML

```tsx
import { Editor } from "eddies";

export default function Page() {
  return (
    <Editor
      onChange={(editor) => console.log(editor.getHTML())}
      initialValue={`<h1>Hello world</h1>`}
    />
  );
}
```

## JSON

```tsx
import { Editor } from "eddies";

export default function Page() {
  return (
    <Editor
      onChange={(editor) => console.log(editor.getJSON())}
      initialValue={{
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Hello world",
              },
            ],
          },
        ],
      }}
    />
  );
}
```

:::tip Tip
You can also set `initialValue` later by using:

```tsx
editor.commands.setContent(`<p>Example Text</p>`);
```

- Only available when using `useEditor` hook.

:::
