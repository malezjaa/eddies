---
outline: deep
---

# Bubble Button

Bubble button is used in the [`bubble menu`](/docs/components/bubble-menu) to change formatting of the selected text.

## Usage

```tsx
import { BubbleButton } from "eddies";

export default function Page() {
  return <BubbleButton editor={editor} item={bMenuItem} />;
}
```

## Props

| Prop              | Type                                                    | Description                                   |
| ----------------- | ------------------------------------------------------- | --------------------------------------------- |
| `editor`          | `Editor`                                                | Editor instance                               |
| `item`            | [`BubbleMenuItem`](/docs/reference/bubble-menu-item.md) | Bubble menu item                              |
| `contextVariant?` | `boolean`                                               | Based on this variable buttons changes styles |
