import React from "react";
import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useLayoutEffect,
} from "react";
import { SlashCommandGroup, SlashCommandItem } from "./slash-command";
//https://github.com/steven-tey/novel from steven-tey helped a lot with this implmentation

export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 15;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 15;
  }
};

export const CommandMenu = React.forwardRef(
  (
    {
      items,
      command,
      editor,
    }: {
      items: SlashCommandGroup[];
      command: (item: SlashCommandItem) => void;
      editor: any;
    },
    ref
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [groupIndex, setGroupIndex] = useState(0);

    const selectItem = useCallback(
      (index: number, groupIndex: number) => {
        const item = items[groupIndex]?.commands[index];
        if (item) {
          command(item);
        }
      },
      [command, editor, items]
    );

    React.useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
        if (event.key === "Enter") {
          if (!items.length || selectedIndex === -1 || groupIndex === -1) {
            return false;
          }

          selectItem(selectedIndex, groupIndex);

          return true;
        }

        return false;
      },
    }));

    useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowUp") {
          e.preventDefault();
          let newCommandIndex = selectedIndex - 1;
          let newGroupIndex = groupIndex;

          if (newCommandIndex < 0) {
            newGroupIndex = groupIndex - 1;
            newCommandIndex = items[newGroupIndex]?.commands.length - 1 || 0;
          }

          if (newGroupIndex < 0) {
            newGroupIndex = items.length - 1;
            newCommandIndex = items[newGroupIndex].commands.length - 1;
          }

          setSelectedIndex(newCommandIndex);
          setGroupIndex(newGroupIndex);

          return true;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();

          const commands = items[groupIndex].commands;

          let newCommandIndex = selectedIndex + 1;
          let newGroupIndex = groupIndex;

          if (commands.length - 1 < newCommandIndex) {
            newCommandIndex = 0;
            newGroupIndex = groupIndex + 1;
          }

          if (items.length - 1 < newGroupIndex) {
            newGroupIndex = 0;
          }

          setSelectedIndex(newCommandIndex);
          setGroupIndex(newGroupIndex);

          return true;
        }
        return false;
      };
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [items, selectedIndex, setSelectedIndex, selectItem]);

    useEffect(() => {
      setSelectedIndex(0);
      setGroupIndex(0);
    }, [items]);

    const commandListContainer = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const container = commandListContainer?.current;

      const item = container?.children[groupIndex]?.children[selectedIndex];

      if (container && item) {
        updateScrollView(container, item as HTMLElement);
      }
    }, [selectedIndex]);

    return items.length > 0 ? (
      <div
        id="slash-command"
        ref={commandListContainer}
        className="eddies-border eddies-border-border eddies-shadow-custom eddies-z-50 eddies-h-auto eddies-max-h-[330px] eddies-w-72 eddies-overflow-y-auto eddies-rounded-[.375rem] eddies-bg-color-bg-secondary eddies-px-2 eddies-py-3 eddies-transition-all"
      >
        {items.map((group: SlashCommandGroup, mainIndex: number) => {
          return (
            <div key={mainIndex} className="eddies-flex eddies-flex-col">
              <p className="eddies-text-xs eddies-font-medium eddies-text-color-text-secondary eddies-pl-2.5">
                {group.title}
              </p>
              <div className="eddies-mt-2">
                {group.commands.map((item, index) => (
                  <button
                    className={`eddies-mb-2 eddies-flex eddies-w-full eddies-items-center eddies-space-x-2 eddies-rounded-[4px] eddies-px-2.5 eddies-py-1.5 eddies-text-left eddies-text-sm eddies-text-color-text ${
                      index === selectedIndex && groupIndex === mainIndex
                        ? "eddies-bg-color-bg eddies-text-color-text-secondary"
                        : "hover:eddies-bg-color-bg"
                    }`}
                    key={index}
                    onClick={() => selectItem(index, groupIndex)}
                  >
                    <div className="eddies-flex eddies-h-10 eddies-w-10 eddies-items-center eddies-justify-center eddies-rounded-[4px] eddies-bg-color-bg">
                      {/* @ts-ignore */}
                      <item.icon className={"eddies-h-5.5 eddies-w-5.5"} />
                    </div>
                    <div>
                      <p className="eddies-text-base eddies-font-medium">
                        {item.title}
                      </p>
                      <p className="eddies-text-xs eddies-font-light">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    ) : null;
  }
);
