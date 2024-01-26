import React from "react";
import {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
  useLayoutEffect,
} from "react";

interface CommandItemProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight;
  const itemHeight = item ? item.offsetHeight : 0;

  const top = item.offsetTop;
  const bottom = top + itemHeight;

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5;
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5;
  }
};

export const CommandMenu = React.forwardRef(
  (
    {
      items,
      command,
      editor,
    }: {
      items: CommandItemProps[];
      command: (item: CommandItemProps) => void;
      editor: any;
    },
    ref
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = useCallback(
      (index: number) => {
        const item = items[index];
        if (item) {
          command(item);
        }
      },
      [command, editor, items]
    );

    React.useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
        if (event.key === "Enter") {
          if (!items.length || selectedIndex === -1) {
            return false;
          }

          selectItem(selectedIndex);

          return true;
        }

        return false;
      },
    }));

    useEffect(() => {
      const navigationKeys = ["ArrowUp", "ArrowDown"];
      const onKeyDown = (e: KeyboardEvent) => {
        if (navigationKeys.includes(e.key)) {
          e.preventDefault();
          if (e.key === "ArrowUp") {
            setSelectedIndex((selectedIndex + items.length - 1) % items.length);
            return true;
          }
          if (e.key === "ArrowDown") {
            setSelectedIndex((selectedIndex + 1) % items.length);
            return true;
          }
          return false;
        }
      };
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [items, selectedIndex, setSelectedIndex, selectItem]);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    const commandListContainer = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const container = commandListContainer?.current;

      const item = container?.children[selectedIndex] as HTMLElement;

      if (item && container) updateScrollView(container, item);
    }, [selectedIndex]);

    return items.length > 0 ? (
      <div
        id="slash-command"
        ref={commandListContainer}
        className="eddies-z-50 eddies-h-auto eddies-max-h-[330px] eddies-w-72 eddies-overflow-y-auto eddies-rounded-md eddies-bg-color-bg eddies-px-1 eddies-py-2 eddies-transition-all"
      >
        {items.map((item: CommandItemProps, index: number) => {
          return (
            <button
              className={`eddies-flex eddies-w-full eddies-items-center eddies-space-x-2 eddies-rounded-md eddies-px-2 eddies-py-1 eddies-text-left eddies-text-sm eddies-text-color-text hover:eddies-bg-color-bg-secondary ${
                index === selectedIndex
                  ? "eddies-bg-stone-100 eddies-text-color-text-secondary"
                  : ""
              }`}
              key={index}
              onClick={() => selectItem(index)}
            >
              <div className="eddies-flex eddies-h-10 eddies-w-10 eddies-items-center eddies-justify-center eddies-rounded-md eddies-border eddies-border-border eddies-bg-color-bg-secondary">
                {/* @ts-ignore */}
                <item.icon className={"eddies-h-5.5 eddies-w-5.5"} />
              </div>
              <div>
                <p className="eddies-font-medium">{item.title}</p>
                <p className="eddies-text-xs">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    ) : null;
  }
);
