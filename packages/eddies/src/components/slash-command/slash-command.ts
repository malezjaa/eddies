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

export type SlashCommandGroup = {
  /**
   * Title of the slash command group
   */
  title: string;

  /**
   * Slash commands
   */
  commands: SlashCommandItem[];
};

export const SlashCommand = Extension.create<{
  slashCommands?: SlashCommandGroup[];
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
          const str = query.toLowerCase();
          const items: SlashCommandGroup[] = [];

          const groups: SlashCommandGroup[] = this.options
            .slashCommands!.map((group) => ({
              ...group,
              commands: group.commands.filter(
                (command) =>
                  command.title.toLowerCase().includes(str) ||
                  command.description?.toLowerCase().includes(str) ||
                  command.alias?.some((alias) => alias.includes(str))
              ),
            }))
            .filter((group) => group.commands.length > 0);

          return groups;
        },
        render: () => {
          let component: any = null;
          let popup: any | null = null;

          return {
            onStart: (props) => {
              component = new ReactRenderer(CommandMenu, {
                props,
                editor: props.editor,
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
              });
            },
            onUpdate: (props) => {
              component?.updateProps(props);

              popup &&
                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
            },
            onKeyDown: (props) => {
              if (props.event.key === "Escape") {
                popup?.[0].hide();

                return true;
              }

              return component?.ref?.onKeyDown(props);
            },
            onExit: () => {
              popup?.[0].destroy();

              component?.destroy();
            },
          };
        },
      }),
    ];
  },
});
