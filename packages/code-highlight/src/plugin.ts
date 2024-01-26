// modfied version from https://tiptap.dev/docs/editor/api/nodes/code-block-lowlight

import { findChildren } from "@tiptap/core";
import { Node as ProsemirrorNode } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { CodeHighlightOptions } from ".";
import { Highlighter } from "shikiji";

function parseHtml(
  nodes: any[],
  props: Record<string, string> = {}
): { text: string; properties: Record<string, string> }[] {
  return nodes
    .map((node) => {
      const properties: Record<string, string> = {
        ...props,
        ...node.properties,
      };

      if (node.children) {
        return parseHtml(node.children, properties);
      }

      return {
        text: node.value,
        properties: properties,
      };
    })
    .flat();
}

function getDecorations({
  doc,
  name,
  options,
  highlighter,
}: {
  doc: ProsemirrorNode;
  name: string;
  options: CodeHighlightOptions;
  highlighter: Highlighter;
}) {
  const decorations: Decoration[] = [];

  findChildren(doc, (node) => node.type.name === name).forEach(
    async (block) => {
      let from = block.pos + 1;
      const language = block.node.attrs.language;
      const html = highlighter.codeToHast(block.node.textContent, {
        lang: language,
        theme: options.defaultTheme,
      });

      parseHtml(html.children).forEach((node) => {
        const to = from + node.text.length;

        if (node.properties) {
          const decoration = Decoration.inline(from, to, {
            ...node.properties,
          });

          decorations.push(decoration);
        }

        from = to;
      });
    }
  );
  return DecorationSet.create(doc, decorations);
}

export function HighlightPlugin(
  options: CodeHighlightOptions & {
    name: string;
  }
) {
  if (!options.shikiji) {
    throw new Error(
      "Please provide a shikiji instance using useHighlighter hook exported from this package"
    );
  }

  if (!options.defaultTheme) {
    throw new Error("Please provide a default theme");
  }

  const codeHighlightPlugin: Plugin<any> = new Plugin({
    key: new PluginKey("codeHighlight"),

    state: {
      init: (_, { doc }) =>
        getDecorations({
          doc,
          name: options.name,
          options,
          highlighter: options.shikiji,
        }),
      apply: (transaction, decorationSet, oldState, newState) => {
        const oldNodeName = oldState.selection.$head.parent.type.name;
        const newNodeName = newState.selection.$head.parent.type.name;
        const oldNodes = findChildren(
          oldState.doc,
          (node) => node.type.name === options.name
        );
        const newNodes = findChildren(
          newState.doc,
          (node) => node.type.name === options.name
        );

        if (
          transaction.docChanged &&
          // Apply decorations if:
          // selection includes named node,
          ([oldNodeName, newNodeName].includes(options.name) ||
            // OR transaction adds/removes named node,
            newNodes.length !== oldNodes.length ||
            // OR transaction has changes that completely encapsulte a node
            // (for example, a transaction that affects the entire document).
            // Such transactions can happen during collab syncing via y-prosemirror, for example.
            transaction.steps.some((step) => {
              // @ts-ignore
              return (
                // @ts-ignore
                step.from !== undefined &&
                // @ts-ignore
                step.to !== undefined &&
                oldNodes.some((node) => {
                  // @ts-ignore
                  return (
                    // @ts-ignore
                    node.pos >= step.from &&
                    // @ts-ignore
                    node.pos + node.node.nodeSize <= step.to
                  );
                })
              );
            }))
        ) {
          return getDecorations({
            doc: transaction.doc,
            name: options.name,
            options,
            highlighter: options.shikiji,
          });
        }

        return decorationSet.map(transaction.mapping, transaction.doc);
      },
    },

    props: {
      decorations(state) {
        return codeHighlightPlugin.getState(state);
      },
    },
  });

  return codeHighlightPlugin;
}
