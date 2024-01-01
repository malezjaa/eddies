---
outline: deep
---

# Overview

Eddies comes with many of useful extensions. You can also create your own extensions or add already existing ones.
Find more ready to use extensions [here](https://tiptap.dev/docs/editor/extensions)

## Extending editor

```tsx
import { Editor } from "eddies";
import Mention from "@tiptap/extension-mention";

export default function Page() {
  return (
    <Editor
      extensions={[
        Mention.configure({
          HTMLAttributes: {
            class: "my-custom-class",
          },
        }),
      ]}
    />
  );
}
```
