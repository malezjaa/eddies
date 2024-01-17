---
outline: deep
---

# Quick Start

There are two ways to get started:

## React component

```tsx
"use client";

import { Editor } from "eddies";

export default function Page() {
  return (
    <div className="m-5">
      <Editor theme={"dark"} />
    </div>
  );
}
```

This is great for getting started quickly, it has everything you need.

## React hook

```tsx
import { EditorContent } from "@tiptap/react";
import { useEditor } from "eddies";

export default function Page() {
  const editor = useEditor({
    /** options */
  });

  return (
    <div className="m-5">
      <EditorContent editor={editor?.tiptap} />
    </div>
  );
}
```

Using hooks you will have to render the editor yourself, but you have more control over the editor.
