"use client";

import BubbleMenuComponment from "./components/bubble-menu/bubble-menu";
import BubbleMenuButton from "./components/bubble-menu/bubble-menu";
import NodeSelectorComponent from "./components/node-selector/node-selector";
export * from "./editor";
export * from "./components/bubble-menu/bubble-menu";
export * from "./components/bubble-menu/bubble-button";
export * from "./components/drag-menu/drag-menu";
export * from "./hooks/useEditor";
export * from "./types";
export { EditorContent } from "@tiptap/react";
export { EddiesEditor } from "@eddieseditor/core";
export const BubbleMenu = BubbleMenuComponment;
export const BubbleButton = BubbleMenuButton;
export const NodeSelector = NodeSelectorComponent;
