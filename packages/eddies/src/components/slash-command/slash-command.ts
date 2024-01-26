import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import tippy from "tippy.js";
import { Extension, Editor } from "@tiptap/core";
import { CommandMenu } from "./menu";
import { PluginKey } from "@tiptap/pm/state";
import { defaultSlashCommands } from "./default-items";
import { LucideIcon } from "lucide-react";

export type SlashCommandItem = {
  /**
   * Title of the slash command
   */
  title: string;

  /**
   * Description of the slash command
   */
  description?: string;

  /**
   * Alias of the slash command
   */
  alias?: string[];

  /**
   * Icon from lucide-react
   */
  icon: LucideIcon;

  /**
   * Function to execute the command
   * @param editor
   */
  command: (editor: Editor) => void;
};

export const SlashCommand = Extension.create<{
  slashCommands?: SlashCommandItem[];
}>({
  name: "slash-command",
  priority: 300,

  addProseMirrorPlugins() {
    return [
      Suggestion({
        char: "/",
        allowSpaces: true,
        startOfLine: true,
        editor: this.editor,
        pluginKey: new PluginKey("slash-command"),
        command: ({ editor, props }: { editor: Editor; props: any }) => {
          const { view, state } = editor;
          const { $head, $from } = view.state.selection;

          const end = $from.pos;
          const from = $head?.nodeBefore
            ? end -
              ($head.nodeBefore.text?.substring(
                $head.nodeBefore.text?.indexOf("/")
              ).length ?? 0)
            : $from.start();

          const tr = state.tr.deleteRange(from, end);
          view.dispatch(tr);

          props.command(editor);
          view.focus();
        },
        items: ({ query }: { query: string }) => {
          return (this.options.slashCommands ?? []).filter((item) => {
            if (typeof query === "string" && query.length > 0) {
              const search = query.toLowerCase();
              return (
                item.title.toLowerCase().includes(search) ||
                item.description?.toLowerCase().includes(search) ||
                (item.alias &&
                  item.alias.some((term: string) => term.includes(search)))
              );
            }
            return true;
          });
        },
        render: () => {
          let component: any = null;
          let popup: any | null = null;
          let scrollHandler: (() => void) | null = null;

          return {
            onStart: (props) => {
              component = new ReactRenderer(CommandMenu, {
                props,
                editor: props.editor,
                // @ts-ignore
                theme: this.options.theme,
              });

              // @ts-ignore
              popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.querySelector(".eddies-editor"),
                content: component.element,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
                showOnCreate: true,
                theme: "slash-command",
                popperOptions: {
                  strategy: "fixed",
                  modifiers: [
                    {
                      name: "flip",
                      enabled: false,
                    },
                  ],
                },
              });

              scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              };

              props.editor.view.dom.parentElement?.addEventListener(
                "scroll",
                scrollHandler
              );

              popup[0].show();
            },
            onUpdate: (props) => {
              component?.updateProps(props);

              let scrollHandler = () => {
                popup?.[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              };

              props.editor.view.dom.parentElement?.addEventListener(
                "scroll",
                scrollHandler
              );

              popup &&
                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
            },
            onKeyDown(props) {
              if (props.event.key === "Escape") {
                popup?.[0].hide();

                return true;
              }

              if (!popup?.[0].state.isShown) {
                popup?.[0].show();
              }

              return component?.ref?.onKeyDown(props);
            },
            onExit: (props) => {
              popup?.[0].hide();
              if (scrollHandler) {
                const { view } = props.editor;
                view.dom.parentElement?.removeEventListener(
                  "scroll",
                  scrollHandler
                );
              }
              component?.destroy();
            },
          };
        },
      }),
    ];
  },
});
