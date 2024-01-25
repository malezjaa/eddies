"use client";

import { absoluteRect, getNodeAtCoords, nodePosAtDOM } from "@/utils";
import { NodeSelection } from "@tiptap/pm/state";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
//@ts-ignore
import { __serializeForClipboard } from "@tiptap/pm/view";
import { EddiesEditor } from "@eddieseditor/core";

export default function DragMenu({ editor }: { editor: EddiesEditor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pos, setPos] = useState<{
    top: number;
    left: number;
    width: number;
  }>();

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const view = editor.tiptap.view;

      if (!view.editable) {
        return;
      }

      //TODO: add drag handle width options
      const node = getNodeAtCoords({
        x: event.clientX + 50,
        y: event.clientY,
      });

      if (!(node instanceof Element) || node.matches("ul, ol")) {
        setIsOpen(false);
        setPos({
          top: 0,
          left: 0,
          width: 0,
        });
        return;
      }

      const compStyle = window.getComputedStyle(node);
      const lineHeight = parseInt(compStyle.lineHeight, 10);
      const paddingTop = parseInt(compStyle.paddingTop, 10);

      const rect = absoluteRect(node);

      rect.top += (lineHeight - 24) / 2;
      rect.top += paddingTop;
      if (node.matches("ul:not([data-type=taskList]) li, ol li")) {
        rect.left -= 24;
      }
      rect.width = 24;

      setIsOpen(true);
      setPos(rect);
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  useEffect(() => {
    const dragStart = (event: DragEvent) => {
      const view = editor.tiptap.view;
      view.focus();

      if (!event.dataTransfer) return;

      const node = getNodeAtCoords({
        x: event.clientX + 50,
        y: event.clientY,
      });

      if (!(node instanceof Element)) return;

      const nodePos = nodePosAtDOM(node, view);
      if (nodePos == null || nodePos < 0) return;

      view.dispatch(
        view.state.tr.setSelection(
          NodeSelection.create(view.state.doc, nodePos)
        )
      );

      const slice = view.state.selection.content();
      const { dom, text } = __serializeForClipboard(view, slice);

      event.dataTransfer.clearData();
      event.dataTransfer.setData("text/html", dom.innerHTML);
      event.dataTransfer.setData("text/plain", text);
      event.dataTransfer.effectAllowed = "copyMove";

      event.dataTransfer.setDragImage(node, 0, 0);

      view.dragging = { slice, move: event.ctrlKey };
    };
    window?.addEventListener("dragstart", dragStart);
    return () => {
      window?.removeEventListener("dragstart", dragStart);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div
          draggable={true}
          className="eddies-flex eddies-group eddies-items-center eddies-justify-center eddies-border eddies-text-sm eddies-font-semibold eddies-rounded-md eddies-whitespace-nowrap eddies-bg-color-bg eddies-border-border eddies-text-neutral-500 eddies-h-7 eddies-gap-1 eddies-min-w-[1.7rem] eddies-px-1.5 eddies-w-auto eddies-drag-handle eddies-fixed eddies-opacity-100 eddies-z-[100] eddies-cursor-pointer eddies-text-color-text hover:eddies-bg-color-bg-secondary"
          style={{
            left: `${pos?.left! - pos?.width! - 13}px`,
            top: `${pos?.top!}px`,
          }}
        >
          ⠿
        </div>
      )}
    </>
  );
}
