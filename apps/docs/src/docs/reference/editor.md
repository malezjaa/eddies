---
outline: deep
---

# Editor

Editor is an instance of TipTap editor with some extra methods.

```ts
export type EditorType = TiptapEditor & {
  /**
   * Returns the markdown representation of the editor's content.
   */
  getMarkdown: () => string;
};
```
