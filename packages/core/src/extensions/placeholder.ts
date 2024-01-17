import { PlaceholderNodes } from "@/nodes/node";

import { Editor, Extension } from "@tiptap/core";
import { Node as ProsemirrorNode } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

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

export const Placeholder = Extension.create<PlaceholderOptions>({
  name: "placeholder",

  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      placeholder: "Write something …",
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
      includeChildren: false,
      nodes: {},
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("placeholder"),
        props: {
          decorations: ({ doc, selection }) => {
            const active =
              this.editor.isEditable || !this.options.showOnlyWhenEditable;
            const { anchor } = selection;
            const decorations: Decoration[] = [];

            if (!active) {
              return null;
            }

            const emptyDocInstance = doc.type.createAndFill();
            const isEditorEmpty =
              emptyDocInstance?.sameMarkup(doc) &&
              emptyDocInstance.content.findDiffStart(doc.content) === null;

            doc.descendants((node, pos) => {
              const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
              const isEmpty = !node.isLeaf && !node.childCount;

              if ((hasAnchor || !this.options.showOnlyCurrent) && isEmpty) {
                const classes = [this.options.emptyNodeClass];

                if (isEditorEmpty) {
                  classes.push(this.options.emptyEditorClass);
                }

                let nodeName = node.type.name as keyof PlaceholderNodes;
                let name =
                  this?.options?.nodes?.[nodeName] || this.options.text;

                const decoration = Decoration.node(pos, pos + node.nodeSize, {
                  class: classes.join(" "),
                  "data-placeholder": name,
                });

                decorations.push(decoration);
              }

              return this.options.includeChildren;
            });

            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});
