---
outline: deep
---

# Overview

From [1.0.7](https://github.com/malezjaa/eddies/releases/tag/1.0.7) Eddies supports slash commands. When you type `/` in the editor, a menu will appear with all available commands.
You can customize the commands by passing the `slashMenuCommands` prop to the editor.

Default commands are available to import from `eddies` package.

:::info
`command` field only returns `TiptapEditor` instance, instead of `EddiesEditor` instance.
:::

## Usage

```tsx
"use client";

import { Editor, defaultSlashCommands } from "eddies";

export default function Page() {
  return (
    <Editor
      slashMenuCommands={[
        ...defaultSlashCommands,
        {
          title: "Custom group",
          commands: [
            {
              title: "Image",
              command: (editor) => /** Add an image */,
              description: "Add image",
              icon: AlertCircle,
            }
          ]
        }
      ]}
    />
  );
}
```
