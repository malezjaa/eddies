---
outline: deep
---

# Slash Command Item

```ts
export type SlashCommandItem = {
  /**
   * Title of the slash command
   */
  title: string;

  /**
   * Description of the slash command
   */
  description?: string;

  /**
   * Alias of the slash command
   */
  alias?: string[];

  /**
   * Icon from lucide-react
   */
  icon: LucideIcon;

  /**
   * Function to execute the command
   * @param editor
   */
  command: (editor: Editor) => void;
};
```
