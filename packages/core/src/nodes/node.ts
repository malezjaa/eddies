import { Editor, JSONContent, getNodeType } from "@tiptap/core";
import { Node } from "@tiptap/pm/model";

export enum NodeEnum {
  blockquote = "blockquote",
  bulletList = "bulletList",
  codeBlock = "codeBlock",
  details = "details",
  detailsSummary = "detailsSummary",
  detailsContent = "detailsContent",
  document = "document",
  emoji = "emoji",
  hardBreak = "hardBreak",
  heading = "heading",
  horizontalRule = "horizontalRule",
  image = "image",
  listItem = "listItem",
  mention = "mention",
  orderedList = "orderedList",
  paragraph = "paragraph",
  table = "table",
  tableRow = "tableRow",
  tableCell = "tableCell",
  taskList = "taskList",
  taskItem = "taskItem",
  text = "text",
  youTube = "youTube",
}

export type PlaceholderNodes = Pick<
  typeof NodeEnum,
  | "heading"
  | "text"
  | "paragraph"
  | "listItem"
  | "orderedList"
  | "taskList"
  | "taskItem"
>;

export const getNode = (id: string, content: JSONContent): JSONContent => {
  const node = content?.content?.find((node) => node?.attrs?.id === id);
  if (!node) {
    throw new Error(`Node with id ${id} not found`);
  }
  return node;
};

export const deleteNode = (id: string, content: JSONContent): JSONContent => {
  const node = getNode(id, content);
  const index = content.content?.indexOf(node);
  if (index === undefined) {
    throw new Error(`Node with id ${id} not found`);
  }

  content.content?.splice(index, 1);
  return content;
};

export const getNodes = (
  content: JSONContent,
  ids?: string[]
): JSONContent[] => {
  return ids ? ids.map((id) => getNode(id, content)) : content.content || [];
};

/**
 * Insert a node before or after another node.
 * @param toInsert Node to insert.
 * @param node Id of the existing node that will be used as a reference.
 * @param placement Where to insert the new node.
 * @param content Current editor content.
 */
export const insertNode = (
  toInsert: JSONContent,
  referenceNode: string,
  placement: "before" | "after",
  content: JSONContent
) => {
  const referenceNodeIndex = content.content?.findIndex(
    (node) => node?.attrs?.id === referenceNode
  );
  if (referenceNodeIndex === undefined) {
    throw new Error(`Node with id ${referenceNode} not found`);
  }

  const index =
    placement === "before" ? referenceNodeIndex : referenceNodeIndex + 1;
  content.content?.splice(index, 0, toInsert);
  return content;
};
