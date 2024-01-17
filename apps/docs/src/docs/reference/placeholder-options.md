---
outline: deep
---

# Placeholder Options

```ts
export type PlaceholderOptions = {
  /**
   * Enable placeholder.
   * @default true
   */
  enabled?: boolean;

  /**
   * The placeholder text when the editor is empty.
   * This is default text for all nodes, but you can customize it for each node.
   */
  text?: string;

  /**
   * The placeholder text for nodes.
   */
  nodes?: Partial<Record<keyof PlaceholderNodes, string>>;

  emptyEditorClass?: string;
  emptyNodeClass?: string;
  showOnlyWhenEditable?: boolean;
  showOnlyCurrent?: boolean;
  includeChildren?: boolean;
};
```
