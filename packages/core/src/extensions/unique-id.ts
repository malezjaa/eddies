/**
 * This is modified version of https://github.com/TypeCellOS/BlockNote/blob/main/packages/core/src/extensions/UniqueID/UniqueID.ts
 * Please read note in BlockNote's file
 */

import {
  Extension,
  combineTransactionSteps,
  findChildrenInRange,
  getChangedRanges,
} from "@tiptap/core";
import { Fragment, Slice } from "@tiptap/pm/model";
import { Plugin, PluginKey, Transaction } from "@tiptap/pm/state";
import { v4 } from "uuid";

export type UniqueIDOptions = {
  /**
   * Function that generates the unique ID.
   */
  generateID: () => string;
  /**
   * Nodes that UniqueId applies to.
   */
  types: string[];
  /**
   * Attribute that id is applied to.
   * @example <p id="unique-id">...</p>
   */
  attributeName: string;

  /**
   * Filter transaction.
   */
  filterTransaction?: ((transaction: Transaction) => boolean) | null;
};

/**
 * Removes duplicated values within an array.
 * Supports numbers, strings and objects.
 */
function removeDuplicates(array: any, by = JSON.stringify) {
  const seen: any = {};
  return array.filter((item: any) => {
    const key = by(item);
    return Object.prototype.hasOwnProperty.call(seen, key)
      ? false
      : (seen[key] = true);
  });
}

/**
 * Returns a list of duplicated items within an array.
 */
function findDuplicates(items: any) {
  const filtered = items.filter(
    (el: any, index: number) => items.indexOf(el) !== index
  );
  const duplicates = removeDuplicates(filtered);
  return duplicates;
}

export const UniqueID = Extension.create<UniqueIDOptions>({
  name: "uniqueID",
  priority: 99999,
  addOptions() {
    return {
      generateID: () => {
        return v4();
      },
      types: [],
      attributeName: "id",
      filterTransaction: null,
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          [this.options.attributeName]: {
            default: null,
            parseHTML: (element) =>
              element.getAttribute(`data-${this.options.attributeName}`),
            renderHTML: (attributes) => ({
              [`data-${this.options.attributeName}`]:
                attributes[this.options.attributeName],
            }),
          },
        },
      },
    ];
  },
  addProseMirrorPlugins() {
    let dragSourceElement: any = null;
    let transformPasted = false;
    return [
      new Plugin({
        key: new PluginKey("uniqueID"),
        appendTransaction: (transactions, oldState, newState) => {
          const docChanges =
            transactions.some((transaction) => transaction.docChanged) &&
            !oldState.doc.eq(newState.doc);
          const filterTransactions =
            this.options.filterTransaction &&
            transactions.some((tr) => {
              let _a, _b;
              return !((_b = (_a = this.options).filterTransaction) === null ||
              _b === void 0
                ? void 0
                : _b.call(_a, tr));
            });
          if (!docChanges || filterTransactions) {
            return;
          }
          const { tr } = newState;
          const { types, attributeName, generateID } = this.options;
          const transform = combineTransactionSteps(
            oldState.doc,
            transactions as any
          );
          const { mapping } = transform;
          const changes = getChangedRanges(transform);

          changes.forEach(({ newRange }) => {
            const newNodes = findChildrenInRange(
              newState.doc,
              newRange,
              (node) => {
                return types.includes(node.type.name);
              }
            );
            const newIds = newNodes
              .map(({ node }) => node.attrs[attributeName])
              .filter((id) => id !== null);
            const duplicatedNewIds = findDuplicates(newIds);
            newNodes.forEach(({ node, pos }) => {
              let _a;
              const id =
                (_a = tr.doc.nodeAt(pos)) === null || _a === void 0
                  ? void 0
                  : _a.attrs[attributeName];
              if (id === null) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [attributeName]: generateID(),
                });
                return;
              }
              const { deleted } = mapping.invert().mapResult(pos);
              const newNode = deleted && duplicatedNewIds.includes(id);
              if (newNode) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [attributeName]: generateID(),
                });
              }
            });
          });
          if (!tr.steps.length) {
            return;
          }
          return tr;
        },
        view(view) {
          const handleDragstart = (event: any) => {
            let _a;
            dragSourceElement = (
              (_a = view.dom.parentElement) === null || _a === void 0
                ? void 0
                : _a.contains(event.target)
            )
              ? view.dom.parentElement
              : null;
          };
          window.addEventListener("dragstart", handleDragstart);
          return {
            destroy() {
              window.removeEventListener("dragstart", handleDragstart);
            },
          };
        },
        props: {
          handleDOMEvents: {
            drop: (view, event: any) => {
              let _a;
              if (
                dragSourceElement !== view.dom.parentElement ||
                ((_a = event.dataTransfer) === null || _a === void 0
                  ? void 0
                  : _a.effectAllowed) === "copy"
              ) {
                dragSourceElement = null;
                transformPasted = true;
              }
              return false;
            },
            paste: () => {
              transformPasted = true;
              return false;
            },
          },
          transformPasted: (slice) => {
            if (!transformPasted) {
              return slice;
            }
            const { types, attributeName } = this.options;
            const removeId = (fragment: any) => {
              const list: any[] = [];
              fragment.forEach((node: any) => {
                if (node.isText) {
                  list.push(node);
                  return;
                }
                if (!types.includes(node.type.name)) {
                  list.push(node.copy(removeId(node.content)));
                  return;
                }
                const nodeWithoutId = node.type.create(
                  {
                    ...node.attrs,
                    [attributeName]: null,
                  },
                  removeId(node.content),
                  node.marks
                );
                list.push(nodeWithoutId);
              });
              return Fragment.from(list);
            };
            transformPasted = false;
            return new Slice(
              removeId(slice.content),
              slice.openStart,
              slice.openEnd
            );
          },
        },
      }),
    ];
  },
});
