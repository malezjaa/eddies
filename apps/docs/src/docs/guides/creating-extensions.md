---
outline: deep
---

# Overview

There are three types of extensions that you can create:

- [`Node`](https://tiptap.dev/docs/editor/api/nodes) - a node is a building block of the editor's content. It can be a paragraph, a heading, a list, a table
- [`Mark`](https://tiptap.dev/docs/editor/api/marks) - a mark is a formatting element that can be applied to a node. It can be bold, italic, underline, strikethrough
- [`Extension`](https://tiptap.dev/docs/editor/api/extensions) - Extensions add new capabilities to Tiptap. It can be bubble menu, floating menu, etc.

## Creating custom extension

:::info Note
More on options that you can pass to the extension can be found [here](https://tiptap.dev/docs/editor/guide/custom-extensions#create-new-extensions)
:::

### Node

```tsx
import { Node } from "@tiptap/core";

const CustomNode = Node.create({
  name: "customNode",

  // Your code goes here.
});
```

### Mark

```tsx
import { Mark } from "@tiptap/core";

const CustomMark = Mark.create({
  name: "customMark",

  // Your code goes here.
});
```

### Extension

```tsx
import { Extension } from "@tiptap/core";

const CustomExtension = Extension.create({
  name: "customExtension",

  // Your code goes here.
});
```
