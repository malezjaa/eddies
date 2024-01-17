//modified code from https://github.com/ueberdosis/tiptap/blob/main/packages/react/src/useEditor.ts

import { EddiesEditor, EditorOptions } from "@eddieseditor/core";
import { DependencyList, useEffect, useRef, useState } from "react";

function useForceUpdate() {
  const [, setValue] = useState(0);

  return () => setValue((value) => value + 1);
}

export const useEditor = (
  options: EditorOptions,
  deps: DependencyList = []
) => {
  const [editor, setEditor] = useState<EddiesEditor | null>(null);

  const forceUpdate = useForceUpdate();

  const {
    onBeforeCreate,
    onBlur,
    onCreate,
    onDestroy,
    onFocus,
    onSelectionUpdate,
    onTransaction,
    onUpdate,
  } = options.tiptapOptions ?? {};

  const onBeforeCreateRef = useRef(onBeforeCreate);
  const onBlurRef = useRef(onBlur);
  const onCreateRef = useRef(onCreate);
  const onDestroyRef = useRef(onDestroy);
  const onFocusRef = useRef(onFocus);
  const onSelectionUpdateRef = useRef(onSelectionUpdate);
  const onTransactionRef = useRef(onTransaction);
  const onUpdateRef = useRef(onUpdate);

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (onBeforeCreate) {
      editor.tiptap.off("beforeCreate", onBeforeCreateRef.current);
      editor.tiptap.on("beforeCreate", onBeforeCreate);
      onBeforeCreateRef.current = onBeforeCreate;
    }

    if (onBlur) {
      editor.tiptap.off("blur", onBlurRef.current);
      editor.tiptap.on("blur", onBlur);
      onBlurRef.current = onBlur;
    }

    if (onCreate) {
      editor.tiptap.off("create", onCreateRef.current);
      editor.tiptap.on("create", onCreate);
      onCreateRef.current = onCreate;
    }

    if (onDestroy) {
      editor.tiptap.off("destroy", onDestroyRef.current);
      editor.tiptap.on("destroy", onDestroy);
      onDestroyRef.current = onDestroy;
    }

    if (onFocus) {
      editor.tiptap.off("focus", onFocusRef.current);
      editor.tiptap.on("focus", onFocus);
      onFocusRef.current = onFocus;
    }

    if (onSelectionUpdate) {
      editor.tiptap.off("selectionUpdate", onSelectionUpdateRef.current);
      editor.tiptap.on("selectionUpdate", onSelectionUpdate);
      onSelectionUpdateRef.current = onSelectionUpdate;
    }

    if (onTransaction) {
      editor.tiptap.off("transaction", onTransactionRef.current);
      editor.tiptap.on("transaction", onTransaction);
      onTransactionRef.current = onTransaction;
    }

    if (onUpdate) {
      editor.tiptap.off("update", onUpdateRef.current);
      editor.tiptap.on("update", onUpdate);
      onUpdateRef.current = onUpdate;
    }
  }, [
    onBeforeCreate,
    onBlur,
    onCreate,
    onDestroy,
    onFocus,
    onSelectionUpdate,
    onTransaction,
    onUpdate,
    editor,
  ]);

  useEffect(() => {
    let isMounted = true;

    const instance = new EddiesEditor(options);

    setEditor(instance);

    instance.tiptap.on("transaction", () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isMounted) {
            forceUpdate();
          }
        });
      });
    });

    return () => {
      isMounted = false;
    };
  }, deps);

  useEffect(() => {
    return () => {
      editor?.tiptap.destroy();
    };
  }, [editor]);

  return editor;
};
