import { BoldExtension } from "./extensions/marks/bold";
import {
  Content,
  Extension,
  Extensions,
  FocusPosition,
  JSONContent,
  KeyboardShortcutCommand,
  TextSerializer,
  Editor as TiptapEditor,
  EditorOptions as TiptapEditorOptions,
} from "@tiptap/core";
import { Placeholder, PlaceholderOptions } from "./extensions/placeholder";
import { EditorProps } from "@tiptap/pm/view";
import { mergeCss } from "./utils";
import { Node } from "@tiptap/pm/model";
import { deleteNode, getNode, insertNode } from "./nodes/node";
import { UniqueID } from "./extensions/unique-id";
import { eddiesDefaultExtensions } from "./extensions";

export type EditorOptions = {
  /**
   * Triggered when the editor is ready.
   */
  onReady?: (editor: EddiesEditor) => void;

  /**
   * Triggered on every content change.
   */
  onContentChange?: (editor: EddiesEditor) => void;

  /**
   * Content shown every time the editor is created.
   */
  initialValue?: Content;

  /**
   * Extensions to add to the editor.
   */
  extensions?: Extensions;

  /**
   * The placeholder text when the editor is empty.
   */
  placeholder?: PlaceholderOptions;

  /**
   * Disables the editor.
   */
  isEditable?: boolean;

  /**
   * Auto focus settings
   * @see https://tiptap.dev/docs/editor/api/editor#autofocus
   */
  autofocus?: FocusPosition;

  /**
   * Custom keyboard shortcuts.
   */
  keyboardShortcuts?: Record<string, KeyboardShortcutCommand>;

  /**
   * Editor props to pass to the editor.
   */
  tiptapOptions?: Partial<TiptapEditorOptions>;
};

export class EddiesEditor {
  public readonly tiptap: TiptapEditor & {
    contentComponent: any;
  };

  constructor(options: EditorOptions) {
    let placeholderExtension = Placeholder.configure(options.placeholder ?? {});
    let keyboardShortcuts = Extension.create({
      name: "EddiesKeyboardShortcuts",
      addKeyboardShortcuts() {
        return {
          ...options.keyboardShortcuts,
        };
      },
    });

    let configurableExtensions: Extensions = [
      UniqueID.configure({
        types: ["paragraph", "heading", "listItem", "taskItem"],
      }),
      keyboardShortcuts,
    ];

    if (options.placeholder?.enabled) {
      configurableExtensions.push(placeholderExtension);
    }

    let tiptapOptions: Partial<TiptapEditorOptions> = {
      content:
        options.initialValue !== null
          ? (options.initialValue as JSONContent)
          : {
            type: "doc",
            content: [
              {
                type: "heading",
                id: UniqueID.options.generateID(),
                attrs: {
                  textAlign: "left",
                  level: 1,
                },
                content: [
                  {
                    type: "text",
                    text: "Hello world 🌍",
                  },
                ],
              },
            ],
          },
      onUpdate: (e) => {
        options.tiptapOptions?.onUpdate?.(e);
        options.onContentChange?.(this);
        this.tiptap.state.doc = Node.fromJSON(
          this.tiptap.schema,
          e.editor.getJSON()
        );
      },
      onCreate: ({ editor }) => {
        options.tiptapOptions?.onCreate?.({
          editor,
        });
        options.onReady?.(this);
      },
      autofocus: options.autofocus,
      editable: options.isEditable,
      editorProps: {
        attributes: {
          class: mergeCss(
            (
              options.tiptapOptions?.editorProps?.attributes as {
                [key: string]: string;
              }
            )?.class,
            "eddies-editor"
          ),
          ...options?.tiptapOptions?.editorProps?.attributes,
        },
      },
      extensions: [
        ...eddiesDefaultExtensions,
        ...options?.extensions!,
        ...configurableExtensions,
      ],
      ...options.tiptapOptions,
    };

    this.tiptap = new TiptapEditor(tiptapOptions) as TiptapEditor & {
      contentComponent: any;
    };
  }

  focus() {
    this.tiptap.view.focus();
  }

  isFocused() {
    return this.tiptap.view.hasFocus();
  }

  isEditable() {
    return this.tiptap.isEditable;
  }

  setEditable(editable: boolean) {
    this.tiptap.setEditable(editable);
  }

  /**
   * Return current content as JSON
   */
  getJSON = () => this.tiptap.getJSON();

  /**
   * Return current content as HTML
   */
  getHTML = () => this.tiptap.getHTML();

  /**
   * Return current content as plain text
   */
  getText = (options?: {
    blockSeparator?: string;
    textSerializers?: Record<string, TextSerializer>;
  }) => this.tiptap.getText(options);

  /**
   * Get node by id.
   */
  getNode = (id: string): JSONContent | undefined =>
    getNode(id, this.tiptap.state.doc.toJSON() as JSONContent);

  /**
   * Remove node by id.
   */
  deleteNode = (id: string) =>
    deleteNode(id, this.tiptap.state.doc.toJSON() as JSONContent);

  /**
   * Insert a node before or after another node.
   * @param toInsert Node to insert.
   * @param node Id of the existing node that will be used as a reference.
   * @param placement Where to insert the new node.
   * @param content Current editor content.
   */
  insertNode = (
    toInsert: JSONContent,
    referenceNode: string,
    placement: "before" | "after"
  ) =>
    insertNode(
      toInsert,
      referenceNode,
      placement,
      this.tiptap.state.doc.toJSON() as JSONContent
    );
}

export { eddiesDefaultExtensions as defaultCoreExtensions };