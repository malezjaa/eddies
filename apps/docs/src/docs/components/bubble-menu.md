---
outline: deep
---

# Bubble Menu

Bubble menu is a component that renders above selected text. It can be used to change formatting of the selected text.

## Usage

```tsx
import { BubbleMenu } from "eddies";

export default function Page() {
  return <BubbleMenu editor={editor} items={bMenuItems} />;
}
```

## Props

| Prop     | Type                                                      | Description                |
| -------- | --------------------------------------------------------- | -------------------------- |
| `editor` | `Editor`                                                  | Editor instance            |
| `items`  | [`BubbleMenuItem[]`](/docs/reference/bubble-menu-item.md) | Array of bubble menu items |
