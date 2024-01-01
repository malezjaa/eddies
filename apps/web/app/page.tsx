"use client";

import { Editor } from "eddies";
import { useState } from "react";
import { Accessibility } from "lucide-react";

export default function Page() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  return (
    <div className="m-5">
      <Editor onChange={(editor) => console.log(editor.getHTML())} />

      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </div>
  );
}
