---
outline: deep
---

# Theming

Eddies takes `theme` as a prop, this is a string that can be either `light` or `dark`. This will change the color of the editor.
But you will have to specify the colors yourself in your css file.

## Example

::: code-group

```tsx [page.tsx]
import { Editor } from "eddies";

export default function Page() {
  return (
    <div className="m-5">
      <Editor theme={"dark"} />
    </div>
  );
}
```

```css [styles.css]
:root {
  --eddies-bg-color: white !important;
  --eddies-text-color: black !important;
  --eddies-bg-secondary-color: rgb(224, 221, 221) !important;
  --eddies-text-secondary-color: rgb(124, 121, 119) !important;
  --eddies-border: rgba(236, 236, 238, 0.856) !important;
  --eddies-muted: #d8d8d8 !important;
  --eddies-hover: #ecebeb !important;
  --edies-box-shadow: rgb(207, 207, 207) 0px 4px 12px !important;
}

.dark-theme {
  --eddies-bg-color: #222222 !important;
  --eddies-text-color: #e1f7f1 !important;
  --eddies-bg-secondary-color: #2e2e2e !important;
  --eddies-text-secondary-color: rgb(185, 182, 181) !important;
  --eddies-border: rgba(226, 232, 255, 0.07) !important;
  --eddies-muted: rgb(26, 26, 26) !important;
  --eddies-hover: rgb(46, 45, 45) !important;
  --edies-box-shadow: rgb(15, 15, 15) 0px 4px 12px !important;
}
```

:::

## Overriding styles

Each `node` like `paragraph` or `heading` has a `className` that you can use to override the styles of that node.

```css
.eddies-paragraph {
  color: red !important;
}
```

## Full list of classes

- `.eddies-paragraph` - Paragraph
- `.eddies-heading` - Heading
- `.eddies-bullet-list` - Bullet list
- `.eddies-ordered-list` - Ordered list
- `.eddies-list-item` - List item
- `.eddies-blockquote` - Blockquote
- `.eddies-code-block` - Code block
- `.eddies-code` - Code
- `.eddies-link` - Link
- `.eddies-image` - Image
- `.eddies-task-list` - Task list
- `.eddies-task-list-item` - Task list item
