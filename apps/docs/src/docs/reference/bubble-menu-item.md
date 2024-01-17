---
outline: deep
---

# Bubble Menu Item

```ts
export interface BubbleMenuItem {
  name: string;
  /**
   * Icon from lucide-react
   */
  icon: typeof BoldIcon;
  /**
   * Function that returns boolean based on whether the command is active
   * @param editor
   */
  isActive: (editor: EddiesEditor) => boolean;
  /**
   * Function to execute the command
   * @param editor
   */
  command: (editor: EddiesEditor) => void;
}
```
